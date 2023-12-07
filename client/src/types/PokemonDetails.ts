type Stat = {
  stat: {
    name: string;
    url: string;
  };
  base_stat: number;
 };

 export type PokemonDetails = {
  stats: Stat[];
  name: string;
  id: number;
  types: string[];
  sprites: {
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string;
          };
        };
      };
    };
    front_default: string;
  };
 };


export interface EvolutionDetails {
  min_level: number;
  trigger: {
    name: string;
    url: string;
  };
}

export interface EvolvesTo {
  evolution_details: EvolutionDetails[];
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolvesTo[];
}

export interface EvolutionData {
  chain: EvolutionChain;
}
