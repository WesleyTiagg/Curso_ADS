\c postgres 

--Vai excluir a database faculdade se ela existir
DROP DATABASE IF EXISTS faculdade;

--Crtia a dataabse faculdade novamente
CREATE DATABASE faculdade;

--Acessa a database 
\c faculdade

--Cria as tabelas dentro da database faculdade com 4 colunas
CREATE TABLE professor (
    matricula_professor INT PRIMARY KEY,
    nome VARCHAR(50),
    titulacao VARCHAR(20),
    salario DECIMAL (10,2)
);

INSERT INTO professor(matricula_professor,nome,titulacao,salario)
VALUES(11,'Iallen Gabio','Doutor',7540.00),
(22,'Jefferson Soares','Mestre',6250.00),
(33,'Jonathas Jivago','Mestre',6415.00),
(44,'Marcos Ramon','Especialista',5680.00),
(55,'Mayllon Veras','Mestre',6990.00),
(66,'Maykol Sampaio','Mestre',6110.00),
(77,'Ricardo Sekeff','Doutor',7850.00),
(88,'Wanderson Leonardo','Mestre',6700.00),
(99,'Wanderson de Vasconcelos','Doutor',7120.00);

SELECT * FROM professor; 

--TESTES FORA DO BANCO DE DADOS CENTRAL-----------------------------------------------------------------
UPDATE professor
SET titulacao = 'Doutor';

SELECT * FROM professor; 

UPDATE professor
SET salario = 10000;

SELECT * FROM professor; 

UPDATE professor
SET salario = 15000, titulacao = 'Doutor';

SELECT * FROM professor; 

UPDATE professor
faculdade-# SET salario = 15000
faculdade-# where titulacao = 'Doutor';

SELECT * FROM professor; 

UPDATE professor
SET salario = 20000
WHERE matricula_professor = 11;

UPDATE professor
SET salario = 8000 , titulacao = 'Mestre'
WHERE matricula_professor = 44;

UPDATE professor
SET salario = 10000
WHERE salario >= 7000 AND salario <= 7500;

UPDATE professor
SET salario = 10000
WHERE salario >= 7500 AND titulacao = 'Doutor';

UPDATE professor
SET salario = 10000
WHERE titulacao = 'Especialista' OR titulacao = 'Mestre';