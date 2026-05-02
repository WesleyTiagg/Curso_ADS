--Atividade 03: Sistema de Reserva de Hotel
--Aluno: Wesley Tiago Medeiros Lustosa
--Disciplina: Banco de Dados 2
--Professor: Wanderson de Vasconcelos
--ADS - MOD III
--------------------------------------------------------------------

\c postgres 

--Vai excluir a database faculdade se ela existir
DROP DATABASE IF EXISTS hotel;

--Crtia a dataabse faculdade novamente
CREATE DATABASE hotel;

--Acessa a database 
\c hotel

CREATE TABLE hospedes(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    tefefone VARCHAR(15),
    email VARCHAR (100)
);

CREATE TABLE quartos(
    numero SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE reservas(
    id SERIAL PRIMARY KEY,
    hospede_id INT,
    numero_quarto INT,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (hospede_id) REFERENCES hospedes(id),
    FOREIGN KEY (numero_quarto) REFERENCES quartos(numero)
);

CREATE TABLE servicos(
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE consumos(
    id SERIAL PRIMARY KEY,
    reserva_id INT,
    servico_id INT,
    quantidade INT NOT NULL,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id)
);