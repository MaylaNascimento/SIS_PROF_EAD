import jsonwebtoken from 'jsonwebtoken';
import { selectUsuario } from '../repository/usuario.repository.js';
import md5 from 'md5';

async function login(req, res){
    const {email, password} = req.body;    
    await selectUsuario(Array(email, md5(password)))
    .then(function (resultado) {
        if(resultado == undefined) {
            res.status(404).send({
                code: 404, 
                message: 'Usuario não cadastrado', 
                timestamp: new Date(Date.now()).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })
            })
            return;
        }
        const id = resultado.id;
        const token = jsonwebtoken.sign({id}, process.env.JWT_TOKEN, { expiresIn: 86400 });
        res.send({ code: 200, auth: true, token: token, permissao: resultado.permissao_id, usuario_id: resultado.id}); 
      })
    .catch((e) =>{
        console.log(e);
        res.status(500).send({
            code: 500,
            mensagem: e,
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })
        });
    });
}

async function logoff(req,res){
    res.status(200).send({auth: false, token: null, permissao: -1});
}

async function checker(req, res, next){
    try{
        const token = req.headers["authorization"];
        jsonwebtoken.verify(token, process.env.JWT_TOKEN);
        next();
    }catch(e){
        console.error(e);
        return;
    }
}

export {login, logoff, checker}