import app from './app';
import database from 'ms-commons/data/db';

(async () =>{
    try {
        const port = parseInt(`${process.env.PORT}`);

        await database.sync({ force: true })
        console.log(`Running database ${process.env.DB_NAME} ok!`);

        await app.listen(port);
        console.log(`Running ${process.env.MS_NAME} on ${port} ok!`);
        
    } catch(error) {
        console.log(`${error}`)
    }
})();