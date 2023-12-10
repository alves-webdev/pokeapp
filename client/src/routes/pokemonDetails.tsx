import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonDetails } from "../types/PokemonDetails";

interface Evolution {
  species_name: string;
  min_level: number;
  trigger_name: string | null;
  item: string | null;
}

const statEmojis: { [key: string]: string } = {
  hp: "❤️",
  attack: "⚔️",
  defense: "🛡️",
  "special-attack": "🔮",
  "special-defense": "🛡️",
  speed: "🏃",
};

function PokemonDetailsPage() {
  const { id } = useParams();

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [evoChain, setEvoChain] = useState<Evolution[]>([]);
  const [evoChainDetails, setEvoChainDetails] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const defaultImageSrc =
    "https://www.shareicon.net/data/128x128/2016/08/05/807336_gaming_512x512.png";

  const imageSrc =
    pokemonDetails?.sprites.versions["generation-v"]["black-white"].animated
      .front_default ||
    pokemonDetails?.sprites.front_default ||
    defaultImageSrc;

  useEffect(() => {
    setIsLoading(true);
    async function fetchPokemonDetails() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPokemonDetails(data);
      }
    }

    async function getEvolutions() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonDetails?.name}`
      );
      if (res.ok) {
        const data = await res.json();
        const evolutionChain = data.evolution_chain;
        const res2 = await fetch(evolutionChain.url);
        console.log(res2);
        if (res2.ok) {
          const evolutiondata = await res2.json();
          const evoChain = [];
          let evoData = evolutiondata.chain;
          do {
            const evoDetails = evoData["evolution_details"][0];

            evoChain.push({
              species_name: evoData.species.name,
              min_level: !evoDetails ? 1 : evoDetails.min_level,
              trigger_name: !evoDetails ? null : evoDetails.trigger.name,
              item: !evoDetails ? null : evoDetails.item,
            });
            const res3 = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${evoData.species.name}`
            );
            if (res3.ok) {
              const evoDetails = await res3.json();
              setEvoChainDetails((prevDetails) => [...prevDetails, evoDetails]);
            }
            evoData = evoData["evolves_to"][0];
          } while (
            !!evoData &&
            Object.prototype.hasOwnProperty.call(evoData, "evolves_to")
          );
          setEvoChain(evoChain);
        }
      }
    }

    fetchPokemonDetails();
    getEvolutions();
    setIsLoading(false);
  }, [id, pokemonDetails?.name]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-red-500">
      <div className="bg-red-500 min-h-screen min-w-screen p-4 flex flex-col justify-center items-center">
        <div className="flex flex-row gap-12">
          <div className="text-center">
            <img
              className="w-40 h-40 mb-2 cursor-pointer "
              src={imageSrc}
              alt={pokemonDetails.name}
            />
            <h1 className="font-bold text-4xl">{pokemonDetails.name}</h1>
            <p>#{pokemonDetails.id}</p>
          </div>
          <div className="text-center">
            <p>✨Stats:</p>
            <ul>
              {pokemonDetails.stats.map((stat, index) => (
                <li key={index}>
                  {statEmojis[stat.stat.name]} {stat.stat.name}:{" "}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {evoChain.length > 0 && (
          <div className="flex flex-col justify-center text-center">
            <h2>Arvore de evolução: </h2>
            {isLoading ? (
              <div>loading...</div>
            ) : (
              <div className="flex flex-row gap-2">
                {evoChainDetails
                  .slice(0, evoChain.length)
                  .map((evoDetail, index) => (
                    <Link to={`/pokemon/${evoDetail.id}`}>
                      <div
                        key={index}
                        className={`w-40 h-48 cursor-pointer p-2 flex flex-col items-center justify-center transition duration-300 transform overflow-hidden rounded-lg bg-yellow-500 ${
                          evoDetail.name === pokemonDetails.name
                            ? "border-4 border-blue-500" // Add a border for the selected Pokémon
                            : "border-2 border-red-900"
                        }`}
                      >
                        <img
                          src={evoDetail.sprites.front_default}
                          alt={evoDetail.name}
                        />
                        <h2 className="text-xl">{evoDetail.name}</h2>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
