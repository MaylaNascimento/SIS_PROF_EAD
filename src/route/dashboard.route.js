import { Router } from "express";
import { checker, login, logoff } from "../controller/autenticacao.controller.js";

const auth = Router();

// API
auth.post("/login", login);
auth.post("/logoff", checker, logoff);

// UI 
auth.get('/login', function (req, res) {
  res.render('index');
});

auth.get('/register', function (req, res) {
  res.render('register');
});

auth.get('/forgot-password', function (req, res) {
  res.render('forgot-password');
});


export default auth;