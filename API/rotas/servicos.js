const express = require('express');
const router = express.Router();
const servicos = require('../data/servicos.json');


router.get('/', (req, res) => {
  res.json(servicos);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const servico = servicos.find(s => s.id === id);

  if (servico) {
    res.json(servico);
  } else {
    res.status(404).json({ erro: 'Serviço não encontrado' });
  }
});

module.exports = router;
