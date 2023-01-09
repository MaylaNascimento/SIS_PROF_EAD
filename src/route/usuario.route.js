import { Router } from "express";
import {alterarPermissao, cadastrarUsuario} from "../controller/usuario.controller.js";
import { checker } from "../controller/autenticacao.controller.js";

const usuario = Router();

usuario.post("/cadastro", cadastrarUsuario);
usuario.put("/alterarPermissao", alterarPermissao);

export default usuario;
