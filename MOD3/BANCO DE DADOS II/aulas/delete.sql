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

DELETE FROM professor
WHERE salario > 7000 OR salario < 6000 ;

DELETE FROM professor
WHERE titulacao = 'Mestre';

DELETE FROM professor
WHERE titulacao = 'Doutor' OR salario > 7500 AND salario < 7600 ;

DELETE FROM professor
WHERE titulacao = 'Mestre' OR (salario > 6000 AND salario < 6500);

DELETE FROM professor
WHERE nome LIKE 'J%' OR nome LIKE 'M%' ;

UPDATE professor
SET salario = 20000
WHERE nome LIKE 'W%' AND titulacao = 'Doutor';

--A PORCENTAGEM EM LIKE BUSCA SOMENTE A PRIMEIRA LETRA DO NOME
--JA AS 2 PORCETAGENS FAZEM A BUSCA MESMO APOS ENCONTRAR O F NO COMEÇO
UPDATE professor
SET salario = 20000
WHERE nome LIKE '%Y%' OR nome LIKE '%y%';

UPDATE professor
SET salario = 20000
WHERE titulacao = 'Mestre' AND nome LIKE '%Y%' OR nome LIKE '%y%';

UPDATE professor
SET salario = 15000, titulacao = 'Doutor'
WHERE (titulacao = 'Especialista' OR titulacao = 'Mestre') AND (nome LIKE '%E%' OR nome LIKE '%e%');