import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as logger from 'morgan';
import { ConnectDB } from "./config/db";
import { routerUsuario } from "./routes/usuario";

export const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(logger('dev'));
ConnectDB();

app.use('/usuario', routerUsuario);


app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/', (req, res) => res.send('API pokeapp'));
