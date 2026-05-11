--Atividade 05: Comandos TCL - HOTEL
--Aluno: Wesley Tiago Medeiros Lustosa
--Disciplina: Banco de Dados 2
--Prof.: Dr. Wanderson de Vasconcelos
--ADS - MOD III
--Data da entrega: 11/05/2026
--------------------------------------------------------------------
-- Conectar à base padrão postgres
\c postgres

-- Remove o banco HOTEL caso já exista
DROP DATABASE IF EXISTS hotel;

-- Cria o banco HOTEL
CREATE DATABASE hotel;

-- Conecta ao banco HOTEL
\c hotel

-- Tabela de hóspedes
CREATE TABLE hospedes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- Tabela de quartos
CREATE TABLE quartos (
    numero SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL
);

-- Tabela de reservas
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    hospede_id INTEGER NOT NULL,
    numero_quarto INTEGER NOT NULL,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (hospede_id) REFERENCES hospedes(id),
    FOREIGN KEY (numero_quarto) REFERENCES quartos(numero)
);

-- Tabela de serviços
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

-- Tabela de consumos
CREATE TABLE consumos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL,
    servico_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id)
);

-- Inserção inicial de quartos
INSERT INTO quartos (tipo, valor_diaria, status)
VALUES ('Simples', 150.00, 'Livre'),
('Luxo', 300.00, 'Livre'),
('Premium', 500.00, 'Livre');

SELECT * FROM quartos;

-- BEGIN inicia uma transação
BEGIN;

-- Insere um novo hóspede
INSERT INTO hospedes(nome, cpf, data_nascimento, telefone, email)
VALUES('Afonsinha','111.111.111-11','1995-07-31','(86)99999-1111','afon@gmail.com');

SELECT * FROM hospedes;

-- Insere uma reserva para o hóspede criado
INSERT INTO reservas(hospede_id, numero_quarto, data_entrada, data_saida, valor_total)
VALUES(1,1,'2026-05-11','2026-05-15',600.00);

SELECT * FROM reservas;

-- COMMIT salva permanentemente as alterações
COMMIT;

-- Inicia a transação
BEGIN;

-- Insere um novo hóspede
INSERT INTO hospedes(nome, cpf, data_nascimento, telefone, email)
VALUES('Ygona','222.222.222-22','1996-09-19','(86)99999-2222','Ygona@gmail.com');

SELECT * FROM hospedes;

-- Insere uma reserva vinculada ao hóspede
INSERT INTO reservas(hospede_id, numero_quarto, data_entrada, data_saida, valor_total)
VALUES(2,2,'2026-06-01','2026-06-05',1200.00);

SELECT * FROM reservas;

-- ROLLBACK desfaz toda a transação
ROLLBACK;

-- SELECT para demonstrar que os dados não foram persistidos
SELECT * FROM hospedes;
SELECT * FROM reservas;

-- Inicia a transação
BEGIN;

-- Insere um hóspede
INSERT INTO hospedes(nome, cpf, data_nascimento, telefone, email)
VALUES('Juju','333.333.333-33','1995-03-01','(86)99999-3333','juju@gmail.com');

SELECT * FROM hospedes;

-- Insere uma reserva
INSERT INTO reservas(hospede_id, numero_quarto, data_entrada, data_saida, valor_total)
VALUES(3,3,'2026-07-01','2026-07-04',1500.00);

SELECT * FROM reservas;

-- Insere um serviço
INSERT INTO servicos(descricao, valor)
VALUES('Serviço de quarto', 80.00);

SELECT * FROM servicos;

-- Registra um consumo
INSERT INTO consumos(reserva_id, servico_id, quantidade)
VALUES(2,1,2);

SELECT * FROM consumos;

-- Atualiza o valor total da reserva
UPDATE reservas
SET valor_total = valor_total + 160.00
WHERE id = 2;

SELECT * FROM reservas;

-- salva todas as operações realizadas
COMMIT;

-- Inicia a transação
BEGIN;

-- Insere um hóspede
INSERT INTO hospedes(nome, cpf, data_nascimento, telefone, email)
VALUES('Malevola','444.444.444-44','1995-06-05','(86)99999-4444','malevola@gmail.com');

SELECT * FROM hospedes;

-- Insere uma reserva
INSERT INTO reservas(hospede_id,numero_quarto,data_entrada,data_saida,valor_total)
VALUES(4,1,'2026-08-01','2026-08-03',300.00);

SELECT * FROM reservas;

-- cria um ponto de retorno parcial
SAVEPOINT sp1;

-- Insere um serviço
INSERT INTO servicos(descricao, valor)
VALUES('Lavanderia',50.00);

SELECT * FROM servicos;

-- Registra um consumo
INSERT INTO consumos(reserva_id, servico_id, quantidade)
VALUES(3,2,1);

SELECT * FROM consumos;

-- Cria um segundo SAVEPOINT
SAVEPOINT sp2;

-- Operação adicional
UPDATE reservas
SET valor_total = valor_total + 50.00
WHERE id = 3;

SELECT * FROM reservas;

-- Retorna ao SAVEPOINT sp2
ROLLBACK TO SAVEPOINT sp2;

SELECT * FROM reservas;

-- Retorna ao SAVEPOINT sp1
ROLLBACK TO SAVEPOINT sp1;

SELECT * FROM servicos;
SELECT * FROM consumos;

-- Finaliza a transação
COMMIT;

-- Inicia a transação
BEGIN;

-- Insere um hóspede
INSERT INTO hospedes(nome, cpf, data_nascimento, telefone, email)
VALUES('Bigbig','555.555.555-55','1970-01-09','(86)99999-5555','bigbig@gmail.com');

SELECT * FROM hospedes;

-- Tentativa de inserir reserva com hospede_id inexistente
INSERT INTO reservas( hospede_id, numero_quarto, data_entrada, data_saida, valor_total)
VALUES(999,2,'2026-09-01','2026-09-05',1200.00);

-- Desfaz toda a transação após o erro
ROLLBACK;

-- Verifica que os dados não foram salvos
SELECT * FROM hospedes;
SELECT * FROM reservas;