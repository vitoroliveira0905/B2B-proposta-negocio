const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require("fs");
const bcrypt = require('bcrypt');
const logger = require('./middlewares/logger');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(logger);

const { validateUserData } = require('./middlewares/autenticar');
const DATA_FILE = path.join(__dirname, "data", "usuarios.json");


const ADMIN_USER = {
  usuario: "admin@rubotz.com",
  senha: "$2b$10$SJwMwIEcBD1HUF0FqcA4NOytFL70BXKMCaalaJ3Cyis/IqTZc5VPW" //Senha123@
};

function saveUsers(users) {
  const dataString = JSON.stringify(users, null, 2);
  fs.writeFile(DATA_FILE, dataString, 'utf8', err => {
    if (err) {
      console.error('Erro ao escrever o arquivo:', err);
      return;
    }
  });
}

const produtosRouter = require('./rotas/produtos');
app.use('/api/produtos', produtosRouter);

app.post("/api/registrar", async (req, res) => {
  const { empresa, usuario, senha } = req.body;

  const { valid, errors } = validateUserData({ empresa, usuario, senha });
  if (!valid) {
    return res.status(400).json({ message: "Erro de validação", errors });
  }

  fs.readFile(DATA_FILE, 'utf8', async (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo: ', err);
      return res.status(500).json({ message: "Erro ao ler banco de dados" });
    }
    try {
      const users = JSON.parse(data);
      const existingUser = users.find((u) => u.usuario === usuario);
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já cadastrado!" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      users.push({ empresa, usuario, senha: hashedPassword });
      saveUsers(users);

      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
      console.error('Erro ao converter o JSON: ', error);
      res.status(500).json({ message: "Erro interno" });
    }
  });
});


app.post("/api/login", (req, res) => {
  const { usuario, senha } = req.body;

  const { valid, errors } = validateUserData({ usuario, senha });
  if (!valid) {
    return res.status(400).json({ message: "Erro de validação", errors });
  }

  fs.readFile(DATA_FILE, 'utf8', async (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo: ', err);
      return res.status(500).json({ message: "Erro ao ler banco de dados" });
    }
    try {
      const users = JSON.parse(data);


      if (usuario === ADMIN_USER.usuario) {
        const adminMatch = await bcrypt.compare(senha, ADMIN_USER.senha);
        if (adminMatch) {
          return res.json({
            success: true,
            message: "Login de administrador bem-sucedido!",
            role: "admin",
            nomeEmpresa: "Administrador",
          });
        }
      }


      const user = users.find((u) => u.usuario === usuario);

      if (user) {
        const userMatch = await bcrypt.compare(senha, user.senha);
        if (userMatch) {
          return res.json({
            success: true,
            message: "Login realizado com sucesso!",
            nomeEmpresa: user.empresa
          });
        }
      }


      res.status(401).json({ message: "Usuário ou senha incorretos." });

    } catch (error) {
      console.error('Erro ao converter o JSON: ', error);
      res.status(500).json({ message: "Erro interno" });
    }
  });
});


const servicosRoutes = require('./rotas/servicos');
app.use('/api/servicos', servicosRoutes);

const servicosMarcas = require('./rotas/marcas');
app.use('/api/marcas', servicosMarcas);

app.get('/', (req, res) => {
  res.send('🚀 API do site da empresa está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});