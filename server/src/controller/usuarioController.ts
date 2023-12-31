import { DataSource } from "typeorm";
import { Treinador } from "../entity/Treinador";
import { myDataSource } from "../app-data-source";
import * as bcrypt from 'bcrypt';

const userRepository = myDataSource.getRepository(Treinador);

export class UsuarioConstroller {

    async register(usuario: Treinador) {

        try {
            const existingUser = await userRepository.findOne({ where: { userName: usuario.userName } });
            if (existingUser) {
                return { error: 'Usuário já existe' };
            }

            usuario.password = await bcrypt.hash(usuario.password, 10);

            const usuarioSalvo = await userRepository.save(usuario);
            return usuarioSalvo;
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao salvar o usuário' };
        }
    }




    async addPokemonToTeam(username: string, pokemonNumber: number) {
        const usuario = await userRepository.findOne({ where: { userName: username } });
        if (!usuario) {
            return { error: 'Usuário não encontrado' };
        }

        if (usuario.team.includes(pokemonNumber)) {
            return { error: 'Este Pokémon já está na sua equipe' };
        }

        if (usuario.team.length >= 5) {
            return { error: 'A equipe já possui o número máximo de Pokémon (5)' };
        }

        usuario.team.push(pokemonNumber);

        try {
            await userRepository.save(usuario);
            return 'Pokemon adicionado com sucesso';
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao adicionar Pokemon à equipe' };
        }
    }



    async deletePokemonFromTeam(username: string, pokemonNumber: number) {
        const usuario = await userRepository.findOne({ where: { userName: username } });
        if (!usuario) {
            return { error: 'Usuário não encontrado' };
        }

        usuario.team = usuario.team.filter(number => number !== pokemonNumber);

        try {
            await userRepository.save(usuario);
            return 'Pokemon removido com sucesso';
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao remover Pokemon da equipe' };
        }
    }

    async login(userName: string, password: string) {
        const usuario = await userRepository.findOne({ where: { userName } });
        if (!usuario) {
            return { error: 'Usuário não existe' };
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);


        if (!passwordMatch) {
            return { error: 'Senha incorreta' };
        }

        return usuario;
    }




    async recuperarTodos() {
        try {
            const usuarios = await userRepository.find();
            return usuarios;
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao recuperar todos os usuários' };
        }
    }

    async recuperarUm(userName: string) {
        try {
            const usuario = await userRepository.findOne({ where: { userName } });
            if (!usuario) {
                return { error: 'Usuário não existe' };
            }
            return usuario;
        } catch (error) {
            console.error(error);
            return { error: 'Erro ao recuperar o usuário' };
        }
    }
}
