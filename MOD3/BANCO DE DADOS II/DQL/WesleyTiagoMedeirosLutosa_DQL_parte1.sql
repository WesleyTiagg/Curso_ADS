-- Instituto Federal do Piauí – IFPI Campus Piripiri
-- Curso: Tecnologia em Análise e Desenvolvimento de Sistemas
-- Disciplina: Banco de Dados II
-- Professor: Wanderson de Vasconcelos
-- Atividade 06 – DQL Parte 01
-- Nome: Wesley Tiago Medeiros Lutosa

-- Conectar à base padrão 'postgres' para dropar a base de teste, se existir
\c postgres

-- Remove o banco de dados HOTEL caso exista
DROP DATABASE IF EXISTS hotel;

-- Cria o banco de dados HOTEL
CREATE DATABASE hotel;

-- Conecta na base de dados HOTEL criada
\c hotel

--Lista todos os tipos de quartos cadastrados sem repetição, ordenando os resultados em ordem alfabética crescente.
SELECT DISTINCT tipo
FROM QUARTOS
ORDER BY tipo ASC;

--Lista o número do quarto, tipo, status e valor da diária dos quartos que:
-- possuam diária maior que 200;
-- não estejam com status “Ocupado”;
-- exibição do mais caro para o mais barato.
SELECT numero, tipo, status, valor_diaria
FROM QUARTOS
WHERE valor_diaria> 200 
AND status <> 'Ocupado'
ORDER BY valor_diaria DESC;

--Lista todos os hóspedes que:
-- possuem telefone cadastrado;
-- possuem nome iniciado pela letra “M”.
--Exiba:
--nome;
--telefone;
--email.
--Ordena pelo nome em ordem crescente.
SELECT nome, telefone, email
FROM HOSPEDES
WHERE telefone IS NOT NULL 
AND nome LIKE 'M%'
ORDER BY nome ASC;

--Lista todas as reservas que:
--possuem valor total entre 800 e 2500;
--tenham data de entrada após 01/01/2024.
--Exiba:
--id;
--hospede_id;
--numero_quarto;
--valor_total;
--data_entrada.
--Ordena:
--primeiro pelo valor total do maior para o menor;
--em caso de empate, pela data de entrada mais recente.
SELECT id, hospede_id, numero_quarto, valor_total, data_entrada
FROM RESERVAS
WHERE valor_total BETWEEN 800 AND 2500
AND data_entrada > '01-01-2024'
ORDER BY valor_total DESC, data_entrada DESC;

--Lista os quartos cadastrados obedecendo às regras abaixo:
--ordenar pelo valor da diária do mais caro para o mais barato;
--ignorar os 3 primeiros registros;
--exibir apenas os próximos 5 registros.
--Exiba:
--numero;
--tipo;
--valor_diaria;
--status.
SELECT numero, tipo, valor_diaria, status
FROM QUARTOS
ORDER BY valor_diaria DESC
OFFSET 3
LIMIT 5;

--Lista os hóspedes que atendam às seguintes condições:
--nasceram antes de 1995;
--possuem email cadastrado;
--e:
--o nome começa com “A”
--OU começa com “J”.
--Exiba:
--nome;
--data_nascimento;
--email.
--Ordena pelo nome em ordem alfabética.
SELECT nome, data_nascimento, email
FROM HOSPEDES
WHERE data_nascimento < '01-01-1995' 
AND email IS NOT NULL AND(nome LIKE 'A%' OR nome LIKE 'J%')
ORDER BY nome ASC;

--Lista os quartos exibindo:
--numero como quarto;
--tipo como categoria;
--valor_diaria como preco_noite;
--o valor de 5 diárias calculado como valor_5_noites.
--Ordena pelo valor da diária do maior para o menor.
SELECT numero AS quarto, tipo AS categoria, valor_diaria AS preco_noite, valor_diaria*5 AS valor_5_noites
FROM QUARTOS
ORDER BY valor_diaria DESC;

--Calcula:
--a quantidade de reservas;
--a soma dos valores totais;
--a média dos valores totais.
--Considere apenas reservas:
--com valor total maior que 1000;
--e data de entrada após 01/06/2023.
--Utiliza alias apropriados para todos os resultados.
SELECT COUNT(*) AS total_reservas,
SUM(valor_total) AS soma_reservas,
AVG(valor_total) AS media_reservas
FROM RESERVAS
WHERE (valor_total > 1000 AND data_entrada > '01-06-2023');

--Calcula a média das diárias dos quartos que:
--não estejam em manutenção;
--possuam diária maior que 150.
--A consulta deve:
--arredondar o resultado para 2 casas decimais;
--exibir o resultado concatenando o texto “R$ ” com TO_CHAR().
--O nome da coluna deve ser: média diárias
SELECT 'R$' || TO_CHAR(ROUND(AVG(valor_diaria),2),'999G999D00') AS "média diárias"
FROM QUARTOS
WHERE status <> 'Manutenção' AND valor_diaria > 150;

--Lista os hóspedes que:
--possuem telefone cadastrado;
--possuem email cadastrado;
--não possuem nome terminado com “Silva”;
--nasceram entre 01/01/1980 e 31/12/2000.
--Exiba:
--id;
--nome;
--telefone;
--email;
--data_nascimento formatada como DD/MM/YYYY utilizando TO_CHAR().
--Além disso:
--ordena os resultados do mais velho para o mais novo;
--ignora os 2 primeiros registros;
--mostra apenas os próximos 6 resultados.

SELECT id, nome, telefone, email, TO_CHAR(data_nascimento, 'DD/MM/YYYY') AS data_nascimento
FROM HOSPEDES
WHERE telefone IS NOT NULL 
AND email IS NOT NULL 
AND nome NOT LIKE '%Silva'
AND data_nascimento BETWEEN '01-01-1980'AND '31-12-2000' 
ORDER BY data_nascimento ASC
OFFSET 2
LIMIT 6;