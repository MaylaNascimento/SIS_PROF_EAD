import database from "../config/sqlite.config.js";

async function insertUsuario(dados){
    return new Promise(function (resolve, reject){
        database.run('INSERT OR IGNORE INTO usuarios(nome_completo, email, senha) VALUES (?,?,?)', dados, function (err){
            if(err) {reject('Erro No Banco de dados');};
            if(this.changes == 0) {resolve(false);}
            resolve(true); 
        });
    });    
}

async function selectUsuario(dados){
    return new Promise((resolve, reject) =>{
        database.get(
            `select u.id as id, u.nome_completo as nome, u.email as email, u.id_permissao as permissao, p.nome as cargo
            from usuarios u join permissoes p on u.id_permissao = p.id
            where u.email = ? and u.senha = ?`, dados,
            (err, rows)=>{
                if (err) reject('Erro No Banco de dados');
                resolve(rows);
        })
    })
}

async function alterarPermissao(dados){
    return new Promise(function (resolve, reject){
        database.run('UPDATE usuarios SET id_permissao = ? where id = ?', dados, function (err){
            if(err) reject('Erro No Banco de dados');
            resolve(true); 
        });
    });
}

async function castrarContato(dados){
    return new Promise(function (resolve, reject){
        database.run('INSERT OR REPLACE INTO contato (end_residencial, numero, complemento, cep, bairro, municipio, uf, telefone1, telefone2, email, disponibilidade_presencial) VALUES (?,?,?,?,?,?,?,?,?,?,?)', dados, function (err){
            if(err) {reject('Erro No Banco de dados');};
            if(this.changes == 0) {resolve(false);}
            resolve(true); 
        });
    });  
}

async function castrarDadosPessoais(dados){
    return new Promise(function (resolve, reject){
        database.run('INSERT INTO dados_pessoais(nome_completo, rg, orgao_rg, data_emissao_rg, cpf, sexo, '+
                    'data_nascimento, titulo_eleitor, secao, zona, uf, estado_nascimento, municipio_nascimento, '+
                    'profissao, estado_civil, nome_conjuge, nome_pai, nome_mae, id_usuario) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', dados, function (err){
            if(err) {reject('Erro No Banco de dados');};
            if(this.changes == 0) resolve(false);
            resolve(true); 
        });
    });  
}
export {insertUsuario, selectUsuario, alterarPermissao}