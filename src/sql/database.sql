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
)