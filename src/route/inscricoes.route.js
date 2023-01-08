import { Router } from "express";
import upload from "../config/multer.config.js";
import { inscricao } from "../controller/inscricoes.controller.js";

const inscricoes = Router();

inscricoes.post('/nova', upload.array('userParamName', 10),inscricao);

export default inscricoes;