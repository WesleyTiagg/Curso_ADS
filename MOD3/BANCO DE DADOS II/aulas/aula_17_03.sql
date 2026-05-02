CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    data_criacao DATE
);

CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER,
    curso VARCHAR(100),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);
