CREATE DATABASE teste;
\c teste;
-- dps de  criar é só conec
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY, -- valor int e autoincrementado, o próprio sgbd se preocupa com isso
    descricao TEXT NOT NULL, -- text para descrições longas
    data_criacao DATE DEFAULT CURRENT_DATE, -- default para info padrão se o user ñ colocar nada e current é uma function q pega a data atual 
    hora_criacao TIME DEFAULT CURRENT_TIME,
    momento_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO tarefas (descricao) VALUES ('Estudar para Banco de Dados 2'); -- entre aspas pois é uma string

SELECT * FROM tarefas;

INSERT INTO tarefas (descricao, data_criacao, hora_criacao, momento_criacao) VALUES ('Estudar para Banco de Dados 2', '2021-01-01', '12:00:00', '2021-01-01 12:00:00');

SELECT descricao, data_criacao, hora_criacao, momento_criacao FROM tarefas;

CREATE DATABASE faculdade;
\c faculdade;

CREATE TABLE professor (
    matricula_professor INT PRIMARY KEY,
    nome VARCHAR(50),
    titulacao VARCHAR(20),
    cpf VARCHAR (11)
);

CREATE TABLE disciplina (
    codigo INT PRIMARY KEY,
    nome VARCHAR,
    matricula INT,
    FOREIGN KEY (matricula) REFERENCES professor(matricula_professor)
);

CREATE TABLE alunos (
    AlunoID INT PRIMARY KEY, 
    Nome VARCHAR(100) NOT NULL,          
    DataNascimento DATE,                  
    Email VARCHAR(100) UNIQUE           
);

CREATE TABLE cursos (
    CursoID INT PRIMARY KEY, 
    NomeCurso VARCHAR(100) NOT NULL,     
    DuracaoSemestres INT,                 
    Coordenador VARCHAR(100)             
);

CREATE TABLE matriculas (
     MatriculaID INT PRIMARY KEY,
    AlunoID INT, 
    CursoID INT,
    DataMatricula DATE  
);

INSERT INTO professor VALUES (202511, 'Ana Pereira Chaves', 'Doutorado');
INSERT INTO disciplina VALUES (1977, 'Banco de Dados 1', 202511);

SELECT * FROM professor;

INSERT INTO professor (matricula_professor, nome, titulacao) VALUES 

-- CASCATE -> exclui tabela e restrição de chave estrangeira

ALTER TABLE professor 
ALTER COLUMN titulacao TYPE VARCHAR(40);

-- não pode dropar uma  tabela que já tenha dados

ALTER TABLE professor ALTER COLUMN titulacao SET DEFAULT 'graduado';
