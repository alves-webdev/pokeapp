import { Router } from 'express'
import { UsuarioConstroller } from '../controller/usuarioController';
import { Treinador } from '../entity/Treinador';
import { myDataSource } from '../app-data-source';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioConstroller();

routerUsuario.post('/register', async (req, res) => {
    const dados = req.body;
    const usuario = new Treinador(dados.userName, dados.team, dados.password);
    const usuarioSalvo = await usuarioCtrl.register(usuario);
    res.json(usuarioSalvo);
});

routerUsuario.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    const usuario = await usuarioCtrl.login(userName, password);
    res.json(usuario);
});

routerUsuario.get('/:username', async (req, res) => {
    const { username } = req.params;
    const treinador = await usuarioCtrl.recuperarUm(username);
    return res.json(treinador);
});

routerUsuario.post('/:username/add-pokemon', async (req, res) => {
    const { username } = req.params;
    const { pokemonNumber } = req.body;
    const result = await usuarioCtrl.addPokemonToTeam(username, pokemonNumber);

    res.json(result);
});

routerUsuario.delete('/:username/delete-pokemon', async (req, res) => {
    const { username } = req.params;
    const { pokemonNumber } = req.body;

    const result = await usuarioCtrl.deletePokemonFromTeam(username, pokemonNumber);

    res.json(result);
});

routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
})