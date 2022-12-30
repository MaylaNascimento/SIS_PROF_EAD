import md5 from "md5";
import { insertUsuario } from "../repository/usuario.repository.js";

async function cadastrarUsuario(req, res) {
  const { email, nome, senha } = req.body;
  await insertUsuario(Array(nome, email, md5(senha)))
  .then(function (resultado) {
    console.log(resultado);
    if (resultado) {
      res.status(201).send({
        code: 201,
        mensagem: "Usuario Cadastrado",
        timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
      });
    } else {
      res.status(200).send({
        code: 304,
        mensagem: "Usuario Existente",
        timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
      });
    }
  })
  .catch((e) =>{
    res.status(501).send({
      code: 501,
      mensagem: e,
      timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza",}),
    });
  });
}

async function alterarPermissao(req, res){
  const {userID, novaPermissao} = req.body;
  await alterarPermissao(Array(userID, novaPermissao))
  .then(function (resultado) {
    console.log(resultado);
    if (resultado) {
      res.status(201).send({
        code: 201,
        mensagem: "Permissões Alteradas",
        timestamp: new Date(Date.now()).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })
      });
    }
  })
  .catch((e) =>{
    res.status(501).send({
      code: 501,
      mensagem: e,
      timestamp: new Date(Date.now()).toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })
    });
  });
}

export { cadastrarUsuario, verificarUsuario, alterarPermissao };
