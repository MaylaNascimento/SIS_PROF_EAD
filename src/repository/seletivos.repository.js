import database from "../config/sqlite.config.js";

async function cadastrarSeletivo(){
    return new Promise(function (resolve, reject){
        database.run(`INSERT INTO usuarios(funcao, unidade, carga_horaria, req_minimo, 
            vagas_ac, vagas_cra, vagas_cd, vagas_ci, final_inscricao) VALUES (?,?,?,?,?,?,?,?,?)`, dados, function (err){
            if(err) {reject('Erro No Banco de dados');};
            if(this.changes == 0) resolve(false);
            resolve(true); 
        });
    });
}

async function listarTodosSeletivos(){
    return new Promise(function (resolve, reject){
        database.all(`SELECT funcao, unidade, carga_horaria, req_minimo, 
        (vagas_ac + vagas_cra + vagas_cd + vagas_ci) as vagas_total,  final_inscricao, status
        from seletivo`,  (err, rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
}

async function listarSeletivosAtivos(){
    return new Promise(function (resolve, reject){
        database.all(`SELECT funcao, unidade, carga_horaria, req_minimo, 
        (vagas_ac + vagas_cra + vagas_cd + vagas_ci) as vagas_total,  final_inscricao, status
        from seletivo where status = 1`,  (err, rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
}

async function listarSeletivoEspecifico(){
    return new Promise(function (resolve, reject){
        database.all(`SELECT funcao, unidade, carga_horaria, req_minimo, 
        (vagas_ac + vagas_cra + vagas_cd + vagas_ci) as vagas_total,  final_inscricao, status
        from seletivo 
        join 
        where status = 1`,  (err, rows)=>{
            if(err) reject(err);
            resolve(rows);
        })
    })
}

export {listarTodosSeletivos, listarSeletivosAtivos, listarSeletivoEspecifico, cadastrarSeletivo}