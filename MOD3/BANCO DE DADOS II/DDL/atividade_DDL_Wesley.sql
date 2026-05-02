--Atividade 1: Sistema de locação de filmes
--Nome completo aluno: Wesley Tiago Medeiros Lustosa
--Disciplina: Banco de Dados 2
--ADS - MOD III
--Data da entrega: 31/03
--------------------------------------------------------------------
\c postgres 

--Vai excluir a database locutation se ela existir
DROP DATABASE IF EXISTS locutation;

--Crtia a database locutation novamente
CREATE DATABASE locutation;

--Acessa a database 
\c locutation

--cria 3 tabelas com 4 elementos cada uando o CREATE DATABASE
CREATE TABLE clientes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    data_nascimento DATE
);

CREATE TABLE filmes(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    genero VARCHAR(50),
    ano_lancamento INT
);

CREATE TABLE locacoes(
    id SERIAL PRIMARY KEY,
    cliente_id INT,
    filme_id INT,
    data_locacao DATE DEFAULT CURRENT_DATE,
    hora_locacao TIME DEFAULT CURRENT_TIME,
    devolvido BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (filme_id) REFERENCES filmes(id)
);

---Modificações com ALTER TABLE
--Renomeie a coluna nome de clientes para nome_completo
ALTER TABLE clientes
RENAME COLUMN nome TO nome_completo;

--Adicione uma nova coluna telefone do tipo VARCHAR(15) à tabela clientes
ALTER TABLE clientes
ADD COLUMN telefone VARCHAR(15);

--Altere o tipo da coluna ano_lancamento para SMALLINT
ALTER TABLE filmes
ALTER COLUMN ano_lancamento TYPE SMALLINT;

--Altere o valor padrão da coluna data_locacao para NOW()
ALTER TABLE locacoes
ALTER COLUMN data_locacao SET DEFAULT NOW();

--Remova a restrição NOT NULL da coluna titulo em filmes
ALTER TABLE filmes
ALTER COLUMN titulo DROP NOT NULL;

--Remova a coluna telefone da tabela clientes
ALTER TABLE clientes
DROP COLUMN telefone;

--Renomeie a tabela clientes para usuarios
ALTER TABLE clientes
RENAME TO usuarios;

--Inserções e TRUNCATE
--Insira pelo menos 1 registro em cada tabela
INSERT INTO usuarios(nome_completo,email,data_nascimento)
VALUES('Juju','Jujupix@gmail.com','2026-03-31');

INSERT INTO filmes(titulo,genero,ano_lancamento)
VALUES('A fuga de JUJU','Action',2026);

INSERT INTO locacoes(cliente_id,filme_id)
VALUES(1,1);

--Execute um comando TRUNCATE em locacoes
TRUNCATE TABLE locacoes;

--Reinsira um registro na tabela locacoes
INSERT INTO locacoes(cliente_id,filme_id)
VALUES(1,1);

--Execute TRUNCATE em filmes e usuarios com CASCADE
TRUNCATE TABLE filmes,usuarios CASCADE;

--Use DROP TABLE para excluir a tabela locacoes
DROP TABLE locacoes;
--Use DROP DATABASE para excluir o banco locadora_filmes (comentado para evitar
--execução acidental) -- DROP DATABASE locadora_filmes;
--DROP DATABASE locutation;