import { Router } from "express";
import { checker } from "../controller/autenticacao.controller.js";
import { listarTodosSeletivosController } from "../controller/seletivos.controller.js";

const seletivo = new Router();

seletivo.get("/all", checker, listarTodosSeletivosController); 
seletivo.get("/seletivo"); //listar especifico
seletivo.put("/adicionar-seletivo");
seletivo.get("/", (req, res) => {
  res.status(401).send({ code: 401, message: "Acesso negado, verifique as permissões." });
});


export default seletivo;