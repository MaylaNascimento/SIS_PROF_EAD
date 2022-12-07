import database from "../config/sqlite.config.js";

async function insertUsuario(){

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