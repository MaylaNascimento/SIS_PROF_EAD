import { Router } from "express";
import { login, logoff } from "../controller/autenticacao.controller.js";

const auth = Router();

auth.post("/login", login);
auth.post("/logoff", logoff);
auth.get("/", (req, res) => {
  res.status(401).send({ code: 401, message: "Acesso negado, verifique as permissões." });
});


export default auth;