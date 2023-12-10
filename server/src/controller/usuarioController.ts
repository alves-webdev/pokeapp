import { DataSource } from "typeorm";
import { Treinador } from "../entity/Treinador";
import { myDataSource } from "../app-data-source";
import * as bcrypt from 'bcrypt';

const userRepository = myDataSource.getRepository(Treinador);

export class UsuarioConstroller {

    async register(usuario: Treinador) {
        console.log('Received registration request:', usuario);

        // Existing code...

        try {
            // Hash the password before saving
            console.log('Hashing password...');
            usuario.password = await bcrypt.hash(usuario.password, 10);

            console.log('Saving user to the database:', usuario);
            const usuarioSalvo = await userRepository.save(usuario);
            return usuarioSalvo;
        } catch (error) {
            console.error(error);
            return { error: "Erro ao salvar o usuário" };
        }
    }



    async addPokemonToTeam(username: string, pokemonNumber: number) {
        const usuario = await userRepository.findOne({ where: { userName: username } });
        if (!usuario) {
            return { error: 'Usuário não encontrado' };
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
