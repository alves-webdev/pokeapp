import { useEffect, useState } from "react";
import { PokemonDetails } from "../types/PokemonDetails";
import PokemonCardComponent from "../components/pokemonCard";
import store from "../redux/store";

function User() {
  const userName = store.getState().user.user
  const userPokemonTeamNumbers = store.getState().user.team 

  const [userPokemonTeam, setUserPokemonTeam] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    async function fetchUserPokemonTeam() {
      const teamDetails = await Promise.all(
        userPokemonTeamNumbers.map(async (pokemonNumber) => {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
          );
          if (res.ok) {
            const data = await res.json();
            return data;
          }
          return null;
        })
      );

      setUserPokemonTeam(teamDetails.filter((pokemon) => pokemon !== null));
    }


    fetchUserPokemonTeam();
  }, [userPokemonTeamNumbers]);

  console.log(store.getState().user.team)

  return (
    <div className="bg-red-500 min-h-screen p-4 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-4xl">Welcome, {userName}!</h1>
        <h2>Your Pokémon Team:</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {userPokemonTeam.map((pokemon, index) => (
            <PokemonCardComponent
              key={index}
              pokemon={pokemon}
              showAddButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
