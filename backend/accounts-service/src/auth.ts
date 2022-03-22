import bcrypt from 'bcryptjs';
import jwt, {VerifyOptions} from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
const jwtAlgorithm = 'RS256';

function hashPassword(password: string){
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string){
    return bcrypt.compareSync(password, hashPassword);
}

type token = { accountId: number }; 

function sign(accountId: number){
    const token : token = {accountId};
    return jwt.sign(token, privateKey, {expiresIn: jwtExpires, algorithm: jwtAlgorithm});
}

async function verify(token: string){
    try {
        const decoded = await jwt.verify(token, publicKey, {algorithm: [jwtAlgorithm]} as VerifyOptions) as token
        return { account: decoded.accountId}
    } catch(error) {
        console.log(`verify: ${error}`)
        return null  
    }
}

export default {hashPassword, comparePassword, sign, verify}