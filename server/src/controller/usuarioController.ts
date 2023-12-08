import { DataSource } from "typeorm";
import { Treinador } from "../entity/Treinador";
import { myDataSource } from "../app-data-source";
import * as bcrypt from 'bcrypt';

const userRepository = myDataSource.getRepository(Treinador);

export class UsuarioConstroller {

    async register(usuario: Treinador) {
        const existingUser = await userRepository.findOne({ where: { userName: usuario.userName } });
        if (existingUser) {
            return "Já existe um usuário com esse nome";
        }
        usuario.team = usuario.team || [];
        
        const usuarioSalvo = await userRepository.save(usuario);
        return usuarioSalvo;
    }

    async login(userName: string, password: string) {
        const usuario = await userRepository.findOne({ where: { userName } });
        if (!usuario) {
            return ('Usuário não existe');
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return ('Senha incorreta');
        }

        return usuario;
    }

    async recuperarTodos() {
        const usuarios = await userRepository.find();
        return usuarios;
    }

    async recuperarUm(userName: string) {
        const usuario = await userRepository.findOne({ where: { userName } });
        if (!usuario) {
            return ('usuário não existe');
        }
        return usuario;
    }
}
