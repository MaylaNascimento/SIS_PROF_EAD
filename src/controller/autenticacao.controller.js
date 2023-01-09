import jsonwebtoken from 'jsonwebtoken';
import { selectUsuario } from '../repository/usuario.repository.js';
import md5 from 'md5';
import { serialize } from 'cookie';


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

        const token = jsonwebtoken.sign({userId:resultado.id, nome: resultado.nome, cargo: resultado.cargo, permissionId: resultado.permissao_id || process.env.PERMISSION_CANDIDATE_ID || 1 }, process.env.JWT_TOKEN, { expiresIn: 86400 });
        res.setHeader('Set-Cookie', cookieSerializer('token', token));
        
        res.status(200).json({code: 200, auth: true, permissao: resultado.permissao_id || process.env.PERMISSION_CANDIDATE_ID || 1, usuario_id: resultado.id}); 
      }).catch((e) =>{
        console.log(e);
        res.status(500).send({
            code: 500,
            mensagem: e,
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })
        });
    });
}

async function logoff(req,res){
    const { cookies } = req;
    const jwt = cookies.token;
  
    if (!jwt) {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthorized',
      });
    }
  
    const serialized = serialize('token', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Logged out',
    });
}

async function checker(req, res, next){
    try{

        const jwt = req.cookies && req.cookies.token || false;
        if (!jwt) {
            return res.sendStatus(401);
        }

        jsonwebtoken.verify(jwt, process.env.JWT_TOKEN, (err, user) => {        
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
          });
    }catch(e){
        console.error(e);
        return;
    }
}

function cookieSerializer(cookieName, value) {
    return serialize(cookieName, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge:  60 * 60 * 24 * 30,
        path: '/',
      });
}

export {login, logoff, checker}