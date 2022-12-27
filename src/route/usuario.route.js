import { Router } from "express";
import { cadastrarUsuario, verificarUsuario } from "../controller/usuario.controller.js";

const usuario = Router();

usuario.get("/checarusuario", verificarUsuario);
usuario.post("/cadastro", cadastrarUsuario);
usuario.delete("/deletarusuario");
usuario.put("/alterarusuario");
usuario.get("/", (req,res)=>{
    res.status(401).send({"code": 401, "message": "Acesso negado, verifique as permissões."});
});

export default usuario;
