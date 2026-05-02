import express from "express";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.post("/usuario", (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      erro: "Nome é obrigatório"
    });
  }

  res.status(200).json({ mensagem: "Usuário criado" });
});

app.get("/perfil", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      erro: "Usuário não autenticado"
    });
  }

  res.status(200).json({ mensagem: "Perfil acessado" });
});

app.get("/admin", (req, res) => {
  const tipoUsuario = "comum"; // simulação

  if (tipoUsuario !== "admin") {
    return res.status(403).json({
      erro: "Acesso negado"
    });
  }

  res.status(200).json({ mensagem: "Bem-vindo admin" });
});

app.get("/produto/:id", (req, res) => {
  const produto = null; // simulação

  if (!produto) {
    return res.status(404).json({
      erro: "Produto não encontrado"
    });
  }

  res.status(200).json(produto);
});

app.get("/erro", (req, res) => {
  try {
    const obj: any = null;

    // Isso vai gerar erro
    console.log(obj.nome);

    res.status(200).json({ mensagem: "Tudo certo" });
  } catch (e) {
    res.status(500).json({
      erro: "Erro interno do servidor"
    });
  }
});