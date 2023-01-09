import { Router } from "express";
import { checker } from "../controller/autenticacao.controller.js";

const admin = Router();

// API

// UI 
admin.get('/', checker, function (req, res) {
  res.render('dashboard', {user: req.user});
});


export default admin;