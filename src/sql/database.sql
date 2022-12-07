CREATE TABLE "usuarios" (
	"id"	INTEGER NOT NULL,
	"nome_completo"	TEXT NOT NULL,
	"login"	TEXT NOT NULL,
	"senha"	TEXT NOT NULL,
	"id_permissao"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "permissoes" (
	"id"	INTEGER,
	"nome"	INTEGER,
	PRIMARY KEY("id")
);

INSERT INTO permissoes values(1,'Candidato');
INSERT INTO permissoes values(2,'Avaliador');
INSERT INTO permissoes values(3,'Coordenador de Curso');
INSERT INTO permissoes values(4,'Administrador');