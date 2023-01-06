import { Router } from "express";

const seletivo = new Router();

seletivo.get("/listar-seletivos"); //listar todos os seletivos
seletivo.get("/seletivo"); //listar especifico
seletivo.put("/adicionar-seletivo");
auth.get("/", (req, res) => {
  res.status(401).send({ code: 401, message: "Acesso negado, verifique as permissões." });
});


export default seletivo;