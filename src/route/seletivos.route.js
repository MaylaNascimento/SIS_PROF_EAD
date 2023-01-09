import { Router } from "express";
import { checker } from "../controller/autenticacao.controller.js";
import { listarTodosSeletivosController, listarSeletivoEspecificoController } from "../controller/seletivos.controller.js";

const seletivo = new Router();

seletivo.get("/all", checker, listarTodosSeletivosController); 
seletivo.get("/:id", checker, function (req, res) {
  const seletivo = listarSeletivoEspecificoController(req, res, req.params.id)
  res.render('seletivo', {user: req.user, seletivo: seletivo});
});

seletivo.put("/adicionar-seletivo");
seletivo.get("/", (req, res) => {
  res.status(401).send({ code: 401, message: "Acesso negado, verifique as permissões." });
});


export default seletivo;