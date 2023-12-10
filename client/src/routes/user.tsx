import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../types/PokemonDetails";
import PokemonCardComponent from "../components/pokemonCard";
import store from "../redux/store";

function User() {
  const { username } = useParams();
  const userName = store.getState().user.user;
  const [userPokemonTeam, setUserPokemonTeam] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    async function fetchUserPokemonTeam() {
      try {
        const response = await fetch(`http://localhost:3000/usuario/${userName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user's team");
        }

        const data = await response.json();

        // Assuming you have a function to fetch Pokemon details by ID
        const teamDetailsPromises = data.team.map(async (pokemonId: number) => {
          const pokemonDetailsResponse = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          if (!pokemonDetailsResponse.ok) {
            throw new Error(`Failed to fetch details for Pokemon ID ${pokemonId}`);
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
