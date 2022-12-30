import * as jwt from 'jsonwebtoken';
import { selectUsuario } from '../repository/usuario.repository';

async function login(req, res){
    const {login, senha} = req.query;
    await selectUsuario(Array(login, md5(senha)))
    .then(function (resultado) {
        const id = resultado.id;
        const token = jwt.sign({id}, process.env.JWT_TOKEN, {
            expiresIn: 86400
        });
        return { code: 200, auth: true, token: token, permissao: 0 };        
      })
      .catch((e) =>{
        res.status(501).send({
          code: 501,
          mensagem: e,
          timestamp: new Date(Date.now()).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })
        });
      });
}

async function logoff(){
    return {auth: false, token: null, permissao: -1}
}

async function checker(req, res, next){
    try{
        const token = req.headers["authorization"];
        jwt.verify(token, process.env.JWT_TOKEN);
        next();
    }catch(e){
        console.error(e);
        return;
    }
}

export {login, logoff, checker}