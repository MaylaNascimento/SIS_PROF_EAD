import { Router } from "express";
import {alterarPermissao, cadastrarUsuario} from "../controller/usuario.controller.js";
import { checker, login } from "../controller/autenticacao.controller.js";

const usuario = Router();

usuario.post("/cadastro", cadastrarUsuario);
usuario.put("/alterarPermissao", checker, alterarPermissao);
usuario.post("/login", login);
usuario.get("/", (req, res) => {
  res.status(401).send({ 
    code: 401, 
    message: "Acesso negado, verifique as permissões." 
  });
});

export default usuario;
