import { dnsPrefetchControl } from "helmet";
import database from "../config/sqlite.config.js";

async function insertUsuario(dados){
    return new Promise(function (resolve, reject){
        database.run('INSERT OR IGNORE INTO usuarios(nome_completo, email, senha) VALUES (?,?,?)', dados, function (err){
            if(err) {reject('Erro No Banco de dados');};
            if(this.changes == 0) {resolve(false);}
            resolve(true); 
        });
    })
    
}

async function selectUsuario(){
    return new Promise((resolve, reject) =>{
        database.get(
            `select u.nome_completo, u.login, u.id_permissao, p.nome
            from usuarios u join permissoes p on u.id_permissao = p.id`, 
            (err, rows)=>{
                if (err) reject(err);
                if (rows.length == 0) reject(new Error('Usuario não encontrado'));
                resolve(rows);
        })
    })
}

export {insertUsuario, selectUsuario}