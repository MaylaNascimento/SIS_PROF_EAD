import { Router } from "express";

const usuario = Router();

usuario.get("/checarusuario");
usuario.post("/inserirusuario");
usuario.delete("/deletarusuario");
usuario.put("/alterarusuario");

usuario.get("/", (req,res)=>{
    res.status(401).send({"code": 401, "message": "Acesso negado, verifique as permissões."});
});

export default usuario;
