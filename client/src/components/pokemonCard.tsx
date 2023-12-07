import { Link } from "react-router-dom";
import { PokemonDetails } from "../types/PokemonDetails";

function PokemonCardComponent({ pokemon }: { pokemon: PokemonDetails }) {
  const defaultImageSrc =
    "https://www.shareicon.net/data/128x128/2016/08/05/807336_gaming_512x512.png";

  const imageSrc =
    pokemon?.sprites.versions["generation-v"]["black-white"].animated.front_default ||
    pokemon?.sprites.front_default ||
    defaultImageSrc;

  return (
    <div className="w-40 h-48 bg-yellow-400 border-2 rounded-xl p-2 flex flex-col items-center justify-center transition duration-300 transform hover:scale-105 overflow-hidden border-red-900">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img
          className="w-20 h-20 mb-2 cursor-pointer"
          src={imageSrc}
          alt={pokemon.name}
        />
      </Link>
      <h1 className="text-xl font-bold text-black">{pokemon.name}</h1>
      <div className="flex flex-row">
        <button className="shadow-lg bg-red-500 mt-4 rounded-md p-1 hover:bg-red-300 transition-all">
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default PokemonCardComponent;
