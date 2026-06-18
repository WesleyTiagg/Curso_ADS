--SELECT coluna1,coluna2,...
==FROM tabela
--[WHERE condição]
==[ORDER BY coluna]
==[GROUP BY coluna]
--DISTINCT 
--SELECT DISTINCT coluna1,coluna2,...
--FROM nome_tabela;
SELECT DISTINCT(TIPO) FROM QUARTOS;
SELECT DISTINCT(STATUS) FROM QUARTOS;

SELECT DISTINCT(STATUS,TIPO) FROM QUARTOS;

--Ordenar em crescente
SELECT DISTINCT tipo
FROM QUARTOS
ORDER BY tipo ASC;

--Ordenar em decrescente
SELECT DISTINCT tipo
FROM QUARTOS
ORDER BY tipo DESC;

--Mostra apenas os 5 priemiros hospedes cadastrados
SELECT id,nome,cpf
FROM hospedes
ORDER BY id
LIMIT 5;

SELECT nome
FROM hospedes
ORDER BY id
LIMIT 5;

SELECT nome
FROM hospedes
ORDER BY nome 
LIMIT 10;

SELECT id,nome,cpf
FROM hospedes
ORDER BY ID 
LIMIT 10
OFFSET 20;

SELECT id, DESCRICAO
FROM SERVICOS
ORDER BY ID 
LIMIT 10;

SELECT id, HOSPEDE_ID
FROM RESERVAS
ORDER BY ID 
LIMIT 5
OFFSET 10;

SELECT VALOR_DIARIA
FROM QUARTOS
ORDER BY VALOR_DIARIA DESC
LIMIT 3;

SELECT numero, tipo, valor_diaria AS preco
FROM QUARTOS;

SELECT h.nome, r.data_entrada, q.tipo
FROM hospedes AS h
JOIN reservas AS r ON h.id = r.hospede_id
JOIN quartos AS q ON r.numero_quarto = q.numero;