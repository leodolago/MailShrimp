import jwt, {VerifyOptions} from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(path.join(findKeysPath(__dirname), 'public.key'), 'utf8');
const jwtAlgorithm = 'RS256';

function findKeysPath(currentPath: string) : string {
    const keysPath = path.join(currentPath, 'keys');
    if(fs.existsSync(keysPath)) return keysPath;
    else 
    return findKeysPath(path.join(currentPath, '..'));
}

export type Token = { accountId: number }; 

async function verify(token: string){
    try {
        const decoded: Token = await jwt.verify(token, publicKey, {algorithm: [jwtAlgorithm]} as VerifyOptions) as Token;

        return { accountId: decoded.accountId}

    } catch(error) {
        console.log(`verify: ${error}`)
        return null  
    }
}

export default {verify, findKeysPath}