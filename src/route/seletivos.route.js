import { Router } from "express";

const seletivo = new Router();

seletivo.get("/listar-seletivos"); //listar todos os seletivos
seletivo.get("/seletivo"); //listar especifico
seletivo.put("/adicionar-seletivo");

export default seletivo;