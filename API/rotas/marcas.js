const express = require('express');
const router = express.Router();
const marcas = require('../data/marcas.json');


router.get('/', (req, res) => {
  res.json(marcas);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const marca = marcas.find(s => s.id === id);

  if (marca) {
    res.json(marca);
  } else {
    res.status(404).json({ erro: 'Serviço não encontrado' });
  }
});

module.exports = router;
