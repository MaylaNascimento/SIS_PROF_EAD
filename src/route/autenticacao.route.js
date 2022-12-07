import * as jwt from 'jsonwebtoken';

async function login(login, senha){
    //Estrutura de conexão com o banco de dados
    const id = 1;
    const token = jwt.sign({id}, process.env.JWT_TOKEN, {
        expiresIn: 86400
    });
    return { code: 200, auth: true, token: token, permissao: 0 };
}

async function logoff(){
    return {auth: false, token: null, permissao: -1}
}

async function checker(token){
    try{
        jwt.verify(token, process.env.JWT_TOKEN);
    }catch(e){
        return e;
    }
}

export {login, logoff, checker}