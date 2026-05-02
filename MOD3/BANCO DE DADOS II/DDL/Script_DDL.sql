--Script DDL para criação de Base de dados FACULDADE
--Nome completo aluno: Wesley Tiago Medeiros Lustosa
--Disciplina: Banco de Dados 2
--ADS - MOD III
--Atividade 1
--------------------------------------------------------------------

--Seleciona o banco de dados correto, para postgres caso esteja em outro
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
----------------------------------------------------------------