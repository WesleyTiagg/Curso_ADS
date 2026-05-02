--Atividade 04:Controle de Acesso no Banco HOTEL
--Nome completo aluno: Wesley Tiago Medeiros Lustosa
--Disciplina: Banco de Dados 2
--Prof.: Dr. Wanderson de Vasconcelos
--ADS - MOD III
--Data da entrega: 28/04/2026
--------------------------------------------------------------------

-- Conectar à base padrão 'postgres' para dropar a base de teste, se existir
\c postgres

-- Remove o banco de dados HOTEL caso exista
DROP DATABASE IF EXISTS hotel;

-- Cria o banco de dados HOTEL
CREATE DATABASE hotel;

-- Conecta na base de dados HOTEL criada
\c hotel

-- Criação da Tabela hospedes
CREATE TABLE hospedes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- Criação da Tabela quartos
CREATE TABLE quartos (
    numero SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL
    -- Exemplos de status: Livre, Ocupado, Manutenção
);

-- Criação da Tabela reservas
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

-- Criação da Tabela servicos
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

-- Criação da Tabela consumos
CREATE TABLE consumos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL,
    servico_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id)
);

--GRUPOS DE USUARIO QUE FACILITAM O GERENCIAMENTO DE PERMISSÃO
CREATE ROLE role_recepcionista;
CREATE ROLE role_gerente;
CREATE ROLE role_auditor;

--CRIAR USUARIOS
CREATE USER ana_recepcao WITH PASSWORD '1234';
CREATE USER bruno_gerencia WITH PASSWORD '1234';
CREATE USER carlos_auditoria WITH PASSWORD '1234';

--COLOCA O USUARIO DENTRO DO AGRUPAMENTO
GRANT role_recepcionista TO ana_recepcao;
GRANT role_gerente TO bruno_gerencia;
GRANT role_auditor TO carlos_auditoria;

--FORNRCER PERMISSÕES AOS USUARIOS
GRANT SELECT 
ON quartos, hospedes, reservas
TO ana_recepcao;

--PERMISSÃO PARA INSERIR NOVAS RESERVAS NA TABELA RESERVAS
GRANT INSERT 
ON reservas
TO ana_recepcao;

--PERMISSÃO PARA CONULTAR TODAS AS TABELAS
GRANT SELECT 
ON quartos, hospedes, reservas, servicos, consumos
TO bruno_gerencia;

--PERMISSÃO PARA INSERIR, ATUALIZAR E DELETAR
GRANT INSERT, UPDATE, DELETE
ON quartos, reservas, servicos
TO bruno_gerencia;

--PERMISSÃO PARA CONULTAR TODAS AS TABELAS
GRANT SELECT 
ON quartos, hospedes, reservas, servicos, consumos
TO carlos_auditoria;

--REVOGAÇÃO PARA INSERIR DA ROLE RECEPCIONISTA
REVOKE INSERT
ON reservas
FROM role_recepcionista;

--REVOGAÇÃO PARA DELETE DA ROLE GERENCIA
REVOKE DELETE
ON servicos
FROM role_gerente;