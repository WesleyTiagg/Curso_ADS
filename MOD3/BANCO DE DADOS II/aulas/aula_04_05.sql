-- UPDATE nome_da_tabela
-- SET coluna1 = valor1, coluna2 = valor...
-- WHERE condição

\c postgres 

-- Vai excluir a database faculdade se ela existir
DROP DATABASE IF EXISTS faculdade;

-- Cria a database faculdade novamente
CREATE DATABASE faculdade;

-- Acessa a database 
\c faculdade

-- Cria a tabela professor
CREATE TABLE professor (
    matricula_professor INT PRIMARY KEY,
    nome VARCHAR(50),
    titulacao VARCHAR(20),
    salario DECIMAL(10,2)
);

-- Inserção de dados
INSERT INTO professor(matricula_professor, nome, titulacao, salario)
VALUES
(11, 'Iallen Gabio', 'Doutor', 7540.00),
(22, 'Jefferson Soares', 'Mestre', 6250.00),
(33, 'Jonathas Jivago', 'Mestre', 6415.00),
(44, 'Marcos Ramon', 'Especialista', 5680.00),
(55, 'Mayllon Veras', 'Mestre', 6990.00),
(66, 'Maykol Sampaio', 'Mestre', 6110.00),
(77, 'Ricardo Sekeff', 'Doutor', 7850.00),
(88, 'Wanderson Leonardo', 'Mestre', 6700.00),
(99, 'Wanderson de Vasconcelos', 'Doutor', 7120.00);

SELECT * FROM professor;

-- UPDATE e DELETE normalmente usam WHERE
-- BEGIN inicia uma transação
-- COMMIT salva permanentemente
-- ROLLBACK desfaz alterações não confirmadas

BEGIN;

UPDATE professor 
SET titulacao = 'Doutor'
WHERE matricula_professor = 123;

COMMIT;

-- Exemplo de UPDATE com ROLLBACK

BEGIN;

UPDATE professor
SET salario = 10000
WHERE matricula_professor = 55;

SELECT * FROM professor;

ROLLBACK;

-- Exemplo de UPDATE com COMMIT

BEGIN;

UPDATE professor
SET titulacao = 'Mestre'
WHERE matricula_professor = 44;

SELECT * FROM professor;

UPDATE professor
SET salario = 7000
WHERE matricula_professor = 44;

SELECT * FROM professor;

COMMIT;

SELECT * FROM professor;

-- Exemplo de DELETE com ROLLBACK

BEGIN;

DELETE FROM professor
WHERE titulacao LIKE 'Mestre';

SELECT * FROM professor;

ROLLBACK;

SELECT * FROM professor;

-- ROLLBACK TO retorna até determinado SAVEPOINT

-- Utilizando SAVEPOINT

BEGIN;

INSERT INTO professor (matricula_professor, nome, titulacao, salario)
VALUES (100, 'Remus Lupin', 'Doutor', 9000);

SELECT * FROM professor;

SAVEPOINT inserir_lupin;

UPDATE professor
SET salario = 7000
WHERE titulacao = 'Especialista';

SELECT * FROM professor;

ROLLBACK TO inserir_lupin;

SELECT * FROM professor;

UPDATE professor
SET salario = 8000
WHERE titulacao LIKE 'Mestre';

SELECT * FROM professor;

ROLLBACK TO inserir_lupin;

SELECT * FROM professor;