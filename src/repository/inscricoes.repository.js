import database from "../config/sqlite.config.js";

async function inscricaoSeletivo(dados){
    return new Promise(function (resolve, reject){
        database.run();
    });
}



export  {inscricaoSeletivo}

