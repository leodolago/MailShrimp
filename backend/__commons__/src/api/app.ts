import express, {Router} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';

function getCorsOrigin() {
    const origin = process.env.CORS_ORIGIN;
    if(!origin) throw new Error('CORS_ORIGIN is a required env var.')

    if(origin ==='*') return origin;

    return new RegExp(origin);
}

export default (router: Router) =>{
    const app = express();
    app.use(logger('dev'));
    app.use(helmet());

    const corsOptions = {
        origin: getCorsOrigin(),
        optionsSuccessStatus: 200
    }

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(router);

    router.get('/health', (req, res) => {
        res.json({message: `${process.env.MS_NAME} + is up and running!`})
    } );
    
    return app;
}

