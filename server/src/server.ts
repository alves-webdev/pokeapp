import { app } from './app';

const PORTA = 3000;

const server = 
    app.listen(PORTA, () => console.log(`App ouvindo a porta ${PORTA}`));

    process.on('SIGINT', () =>{
        server.close();
    });