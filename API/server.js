const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require("fs");
const logger = require('./middlewares/logger');


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(logger);

const { validateUserData } = require('./middlewares/autenticar');
const DATA_FILE = path.join(__dirname, "data", "usuarios.json");
const ADMIN_USER = { usuario: "admin@rubotz.com", senha: "#Willian10" };




function saveUsers(users) {
  data = JSON.stringify(users, null, 2);
  fs.writeFile("./data/usuarios.json", data, 'utf8', err => {
    if (err) {
      console.error('Erro ao escrever o arquivo:', err);
      return;
    }
  });
}

const produtosRouter = require('./rotas/produtos');

app.use('/api/produtos', produtosRouter);

app.post("/api/registrar", (req, res) => {
  const { empresa, usuario, senha } = req.body;

  const { valid, errors } = validateUserData({ empresa, usuario, senha });
  if (!valid) {
    return res.status(400).json({ message: "Erro de validação", errors });
  }


  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo: ', err);
      return;
    }
    try {
      users = JSON.parse(data);
      const existingUser = users.find((u) => u.usuario === usuario);
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já cadastrado!" });
      }

      users.push({ empresa, usuario, senha });
      saveUsers(users);
      res.status(201).json(users);
      res.json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
      console.error('Erro ao converter o JSON: ', error);

    }
  });
});

// Rota para login
app.post("/api/login", (req, res) => {
  const { usuario, senha } = req.body;

  const { valid, errors } = validateUserData({ usuario, senha });
  if (!valid) {
    return res.status(400).json({ message: "Erro de validação", errors });
  }


  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo: ', err);
      return;
    }
    try {
      users = JSON.parse(data);

  // Login admin
  if (usuario === ADMIN_USER.usuario && senha === ADMIN_USER.senha) {
    return res.json({
      success: true,
      message: "Login de administrador bem-sucedido!",
      role: "admin",
      nomeEmpresa: "Administrador",
    });
  }

      const user = users.find((u) => u.usuario === usuario && u.senha === senha);

        if (user) {
    res.json({
      success: true,
      message: "Login realizado com sucesso!",
      nomeEmpresa: user.empresa
    });
  } else {
    res.status(401).json({ message: "Usuário ou senha incorretos." });
  }
    } catch (error) {
      console.error('Erro ao converter o JSON: ', error);

    }
  });
});


// Importa as rotas
const servicosRoutes = require('./rotas/servicos');
app.use('/api/servicos', servicosRoutes);

const servicosMarcas = require('./rotas/marcas');

app.use('/api/marcas', servicosMarcas);

// Rota base
app.get('/', (req, res) => {
  res.send('🚀 API do site da empresa está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
