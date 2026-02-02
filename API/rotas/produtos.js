const express = require('express');
const fs = require("fs");
const path = require("path");
const router = express.Router();

const PROD_FILE = path.join(__dirname, "../data/produtos.json");

// Listar produtos
router.get("/", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(PROD_FILE, "utf-8"));
  res.json(produtos);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fs = require("fs");
  const path = require("path");

  try {
    const data = fs.readFileSync(PROD_FILE, "utf8");
    const produtos = JSON.parse(data);
    const produto = produtos.find((p) => p.id === id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (err) {
    console.error("Erro ao ler arquivo de produtos:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Adicionar produto
router.post("/", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(PROD_FILE, "utf-8"));
  const { nome, preco, tipo, descricao, linkimagem } = req.body;
  const novo = { id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1, nome, preco, tipo, descricao, linkimagem };
  produtos.push(novo);
  fs.writeFileSync(PROD_FILE, JSON.stringify(produtos, null, 2));
  res.json({ success: true });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, preco, tipo, descricao, linkimagem } = req.body;
  const produtos = JSON.parse(fs.readFileSync("./data/produtos.json", "utf8"));

  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  produtos[index] = { id, nome, preco, tipo, descricao, linkimagem };

  fs.writeFileSync("./data/produtos.json", JSON.stringify(produtos, null, 2));
  res.json({ message: "Produto atualizado com sucesso" });
});

// Excluir produto
router.delete("/:id", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(PROD_FILE, "utf-8"));
  const id = parseInt(req.params.id);
  const filtrados = produtos.filter((p) => p.id !== id);
  fs.writeFileSync(PROD_FILE, JSON.stringify(filtrados, null, 2));
  res.json({ success: true });
});

module.exports = router;
