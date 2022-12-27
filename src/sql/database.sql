CREATE TABLE IF NOT EXISTS "usuarios" (
	"id"	INTEGER NOT NULL,
	"nome"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"senha"	TEXT NOT NULL,
	"id_permissao"	INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "permissoes" (
	"id"	INTEGER,
	"nome"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "dados_pessoais" (
	"id"	INTEGER,
	"nome_completo"	TEXT,
	"rg"	INTEGER NOT NULL,
	"orgao_rg"	TEXT,
	"data_emissao_rg"	TEXT,
	"cpf"	INTEGER NOT NULL,
	"sexo"	INTEGER,
	"data_nascimento"	TEXT,
	"titulo_eleitor"	INTEGER,
	"secao"	INTEGER,
	"zona"	INTEGER,
	"uf"	TEXT,
	"estado_nascimento"	TEXT,
	"municipio_nascimento"	TEXT,
	"profissao"	TEXT,
	"estado_civil"	TEXT,
	"nome_conjuge"	TEXT DEFAULT 'SOLTEIRX',
	"nome_pai"	TEXT DEFAULT 'INEXISTENTE/VAZIO',
	"nome_mae"	INTEGER,
	"id_usuario"	INTEGER,
	PRIMARY KEY("rg","cpf")
);
CREATE TABLE IF NOT EXISTS "contato" (
	"id"	INTEGER NOT NULL,
	"end_residencial"	TEXT,
	"numero"	INTEGER,
	"complemento"	TEXT,
	"cep"	INTEGER,
	"bairro"	TEXT,
	"municipio"	TEXT,
	"uf"	TEXT,
	"telefone1"	INTEGER,
	"telefone2"	INTEGER,
	"email"	TEXT,
	"disponibilidade_presencial"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "seletivo" (
	"id"	INTEGER NOT NULL,
	"funcao"	TEXT,
	"unidade"	TEXT,
	"carga_horaria"	INTEGER,
	"req_minimo"	TEXT,
	"vagas_ac"	INTEGER,
	"vagas_cra"	INTEGER,
	"vagas_cd"	INTEGER,
	"vagas_ci"	INTEGER,
	"inicio_inscricao"	TEXT,
	"final_inscricao"	TEXT,
	"status"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "status_inscricao" (
	"id"	INTEGER NOT NULL,
	"tipo"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT IGNORE INTO permissoes values (1,'Candidato');
INSERT IGNORE INTO permissoes values (2,'Avaliador');
INSERT IGNORE INTO permissoes values (3,'Coordenador de Curso');
INSERT IGNORE INTO permissoes values (4,'Administrador');
-- Permissões Especiais
INSERT IGNORE INTO permissoes values  (4,'Coordenador Avaliador');
-- Status dos Seletivos
INSERT IGNORE INTO status_inscricao values (1,'Aberto');
INSERT IGNORE INTO status_inscricao values (2,'Fechado');
INSERT IGNORE INTO status_inscricao values (3,'Previsto');
INSERT IGNORE INTO status_inscricao values (4,'Cancelado');

