import { Router } from 'express'
import { UsuarioConstroller } from '../controller/usuarioController';
import { Treinador } from '../entity/Treinador';
import { myDataSource } from '../app-data-source';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioConstroller();

routerUsuario.post('/', async (req, res) => {
    const dados = req.body
    const usuario = new Treinador(dados.username, dados.team)
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);
    res.json(usuarioSalvo);
});

routerUsuario.get('/:username', async (req, res) => {
    const { username } = req.params;
    const treinador = await usuarioCtrl.recuperarUm(username);
    return res.json(treinador);
});


routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
})