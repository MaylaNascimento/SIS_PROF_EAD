import { cadastrarSeletivo, listarSeletivoEspecifico, listarSeletivosAtivos, listarTodosSeletivos } from "../repository/seletivos.repository.js";

async function cadastrarSeletivoController(req,res){
    const {funcao, unidade, carga_horaria, total_vagas, inicio, fim} = req.body;
    await cadastrarSeletivo(Array(funcao, unidade, carga_horaria, (total_vagas * 0.6), (total_vagas * 0.2), (total_vagas * 0.1), (total_vagas * 0.1), inicio, fim))
    .then(function (resultado) {
        console.log(resultado);
        if (resultado) {
          res.status(201).send({
            code: 201,
            mensagem: "Seletivo Cadastrado",
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
          });
        } else {
          res.status(200).send({
            code: 304,
            mensagem: "Seletivo já cadastrado",
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
          });
        }
      })
      .catch((e) =>{
        res.status(501).send({
          code: 501,
          mensagem: e,
          timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza",}),
        });
      });
}

async function listarTodosSeletivosController(req,res){
    await listarTodosSeletivos()
    .then(function (resultado) {
        if (resultado) {
          res.status(200).send({
            code: 200,
            data: resultado,
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
          });
        }
      })
      .catch((e) =>{
        res.status(500).send({
          code: 500,
          mensagem: e,
          timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza",}),
        });
      });
}

async function listarSeletivosAtivosController(req,res){
    await listarSeletivosAtivos()
    .then(function (resultado) {
        console.log(resultado);
        if (resultado) {
          res.status(200).send({
            code: 200,
            mensagem: resultado,
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
          });
        }
      })
      .catch((e) =>{
        res.status(500).send({
          code: 500,
          mensagem: e,
          timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza",}),
        });
      });
}

async function listarSeletivoEspecificoController(req,res, numeroSeletivoReq){
    const {numeroSeletivo} = req.query ;
    await listarSeletivoEspecifico(Array(numeroSeletivo || numeroSeletivoReq))
    .then(function (resultado) {
        console.log(resultado);
        if (resultado) {
          res.status(200).send({
            code: 200,
            mensagem: resultado,
            timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza"})
          });
        }
      })
      .catch((e) =>{
        res.status(500).send({
          code: 500,
          mensagem: e,
          timestamp: new Date(Date.now()).toLocaleString("pt-BR", {timeZone: "America/Fortaleza",}),
        });
      });
}

export {listarSeletivoEspecificoController, listarSeletivosAtivosController, listarTodosSeletivosController, cadastrarSeletivoController}