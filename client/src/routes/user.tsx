import { useEffect, useState } from "react";
import { PokemonDetails } from "../types/PokemonDetails";
import store from "../redux/store";
import { Link } from "react-router-dom";
import axios from "axios";

function User() {
  const userName = store.getState().user.user;
  const [userPokemonTeam, setUserPokemonTeam] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    async function fetchUserPokemonTeam() {
      try {
        const response = await fetch(
          `http://localhost:3000/usuario/${userName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user's team");
        }

        const data = await response.json();

        const teamDetailsPromises = data.team.map(async (pokemonId: number) => {
          const pokemonDetailsResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
          );
          if (!pokemonDetailsResponse.ok) {
            throw new Error(
              `Failed to fetch details for Pokemon ID ${pokemonId}`
            );
          }

          return pokemonDetailsResponse.json();
        });

        const teamDetails = await Promise.all(teamDetailsPromises);
        setUserPokemonTeam(teamDetails);
      } catch (error) {
        console.error(error);
      }
    }

    if (userName) {
      fetchUserPokemonTeam();
    }
  }, [userName]); 

  useEffect(() => {
    setUserPokemonTeam(userPokemonTeam);
  }, [userPokemonTeam]); 

  const handleRemovePokemon = async (id: number) => {
    const userName = store.getState().user.user;
    const pokemonNumber = id;

    try {
      const response = await axios.delete(
        `http://localhost:3000/usuario/${userName}/delete-pokemon`,
        { data: { pokemonNumber } }
      );
      console.log(response.data);
      setUserPokemonTeam((prevTeam) => prevTeam.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to remove Pokemon from the team", error);
    }
  };

  return (
    <div className="bg-red-500 min-h-screen p-4 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-4xl">Olá, {userName}!</h1>
        <h2>Seu time:</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {userPokemonTeam.map((pokemon, index) => (
            <div
              key={index}
              className="w-40 h-48 bg-yellow-300 border-2 rounded-xl p-2 flex flex-col items-center justify-center transition duration-300 transform hover:scale-110 hover:rotate-3 overflow-hidden border-red-900"
            >
              <Link to={`/pokemon/${pokemon.id}`}>
                <img
                  className="w-20 h-20 mb-2 cursor-pointer"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </Link>
              <h1 className="text-xl font-bold text-black">{pokemon.name}</h1>
              <button
                onClick={() => handleRemovePokemon(pokemon.id)}
                className="shadow-lg bg-red-500 mt-4 rounded-md p-1 hover:bg-red-300"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
