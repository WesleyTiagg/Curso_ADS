--Sistema de Reserva de Hotel- TESTE
--Aluno: Wesley Tiago Medeiros Lustosa
--Disciplina: Banco de Dados 2
--Professor: Wanderson de Vasconcelos
--ADS - MOD III
--Atividade 03
--------------------------------------------------------------------
INSERT INTO hospedes(nome,cpf,data_nascimento,tefefone,email)
VALUES('Juliana lima',1,'2026-05-15',8699565689,'juju123@gmail.com'),
('Wesley Tiago',2,'2003-08-14',869496562,'wes321@gmail.com');

SELECT * FROM hospedes;

INSERT INTO quartos(tipo,valor_diaria,status)
VALUES('Casal',50,'ocupado'),
('Suite Premium',1000,'livre');

SELECT * FROM quartos;

INSERT INTO reservas(data_entrada,data_saida,valor_total)
VALUES('2026-04-07','2026-04-13',2000),
('2026-04-01','2026-04-07',300);

SELECT * FROM reservas;

INSERT INTO servicos(descricao,valor)
VALUES('Serviço de quarto premium',1000),
('Serviço de quarto basico',50);

SELECT * FROM servicos;

INSERT INTO consumos(quantidade)
VALUES(5),
(10);

SELECT * FROM consumos; 
