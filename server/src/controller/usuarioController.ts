import { DataSource } from "typeorm";
import { Treinador } from "../entity/Treinador";
import { myDataSource } from "../app-data-source";

const userRepository = myDataSource.getRepository(Treinador);

export class UsuarioConstroller {
    
    async salvar(usuario: Treinador){

        const existingUser = await userRepository.findOne({ where: { userName: usuario.userName } });
        if (existingUser) {
            return ("Já existe um usuário com esse nome");
        }

        const usuariosalvo = await userRepository.save(usuario);
        return usuariosalvo;
    }

    async recuperarTodos() {
        const usuarios = await userRepository.find();
        return usuarios;
    }

    async recuperarUm(userName: string){
        const usuario = await userRepository.findOne({ where: { userName } });
        if (!usuario) {
            return('usuário não existe');
        }
        return usuario;
    }
}
