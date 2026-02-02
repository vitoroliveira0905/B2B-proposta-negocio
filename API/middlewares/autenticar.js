// validators/authValidator.js

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const passwordRuleRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

function validateUserData({ usuario, senha, empresa }) {
  const errors = {};

  // email
  if (!usuario) {
    errors.usuario = "O campo e-mail é obrigatório.";
  } else if (!isValidEmail(usuario)) {
    errors.usuario = "Formato de e-mail inválido.";
  }

  // senha
  if (!senha) {
    errors.senha = "O campo senha é obrigatório.";
  } else if (!passwordRuleRegex.test(senha)) {
    errors.senha =
      "A senha precisa ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.";
  }

  // empresa (apenas para registro)
  if (empresa !== undefined && (!empresa || empresa.trim() === "")) {
    errors.empresa = "O nome da empresa é obrigatório.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = { validateUserData };
