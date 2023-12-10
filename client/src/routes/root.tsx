import { useState, useEffect } from "react";
import PokemonCardComponent from "../components/pokemonCard";
import { PokemonDetails } from "../types/PokemonDetails";

type Pokemon = {
  name: string;
  url: string;
};

function Root() {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    async function fetchData(url: string) {
      const res = await fetch(url);
      const data = await res.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: Pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );

      setPokemons(pokemonDetails);
      setNextPage(data.next);
      setPrevPage(data.previous);
    }

    async function fetchPokemonByTypeAndName(type: string, name: string) {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();

      const pokemonDetails = await Promise.all(
        data.pokemon.map(async (pokemon: { pokemon: Pokemon }) => {
          const res = await fetch(pokemon.pokemon.url);
          return res.json();
        })
      );

      const filteredPokemons = pokemonDetails.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );

      setPokemons(filteredPokemons);
    }

    if (selectedType && searchTerm) {
      fetchPokemonByTypeAndName(selectedType, searchTerm);
    } else if (selectedType) {
      fetchPokemonByType(selectedType);
    } else {
      fetchData("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
    }
  }, [selectedType, searchTerm]);

  const handleTypeSelection = async (type: string) => {
    setSelectedType(type);
  };

  const fetchPokemonByType = async (type: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();

    const pokemonDetails = await Promise.all(
      data.pokemon.map(async (pokemon: { pokemon: Pokemon }) => {
        const res = await fetch(pokemon.pokemon.url);
        return res.json();
      })
    );

    setPokemons(pokemonDetails);
  };

  const handlePagination = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: Pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    setPokemons(pokemonDetails);
    setNextPage(data.next);
    setPrevPage(data.previous);
  };

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      handlePagination("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
      return;
    }

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
    );
    if (res.ok) {
      const data = await res.json();
      setPokemons([data]);
      setNextPage(null);
      setPrevPage(null);
    } else {
      setPokemons([]);
    }
  };

  return (
    <>
      <div className="bg-red-500 min-h-screen min-w-screen p-4 flex flex-wrap justify-center gap-1">
        <div className="w-full mb-4">
          <input
            className="w-full p-2 border rounded bg-red-600"
            type="text"
            placeholder="Digite um pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-white border border-red-500 text-red-500 p-2 rounded ml-2"
            onClick={() => handleSearch(searchTerm)}
          >
            Procurar
          </button>
          <select
            className="bg-yellow-300 p-2 rounded"
            value={selectedType}
            onChange={(e) => handleTypeSelection(e.target.value)}
          >
            <option value="">Selecione um tipo</option>
            <option value="normal">Normal</option>
            <option value="fire">fogo</option>
            <option value="water">agua</option>
            <option value="grass">grama</option>
            <option value="flying">voador</option>
            <option value="fighting">lutador</option>
            <option value="poison">veneno</option>
            <option value="electric">elétrico</option>
            <option value="ground">solo</option>
            <option value="rock">pedra</option>
            <option value="psychic">Psiquico</option>
            <option value="ice">gelo</option>
            <option value="bug">inseto</option>
            <option value="ghost">fantasma</option>
            <option value="steel">Aço</option>
            <option value="dragon">dragão</option>
            <option value="dark">escuridão</option>
            <option value="fairy">fada</option>
          </select>
        </div>
        <div className="w-full flex justify-between px-4">
              {prevPage && (
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handlePagination(prevPage)}
                >
                  Anterior
                </button>
              )}
              {nextPage && pokemons.length != 0 && selectedType === "" && (
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handlePagination(nextPage)}
                >
                  Próximo
                </button>
              )}
            </div>
        {pokemons.length == 0 ? (
          <div className="text-black-500 p-4 flex flex-wrap justify-cente">
            <h1>pokémon não encontrado... 😔 </h1>
          </div>
        ) : (
          <div>
            <div className="bg-red-500 min-h-screen min-w-screen p-4 flex flex-wrap justify-center gap-2">
              {pokemons.map((pokemon) => (
                <PokemonCardComponent key={pokemon.name} pokemon={pokemon} showAddButton={true}/>
              ))}
            </div>

          </div>
        )}
      </div>
    </>
  );
}

export default Root;
