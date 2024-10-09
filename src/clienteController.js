const Joi = require('joi')
const db = require('./db')

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  ano: Joi.string().required(),
  email: Joi.string().required()
});

exports.listarUsuario = (req, res) => {
  db.query('SELECT * FROM usuario', (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuario:', err);
      res.status(500).json({ error: 'Erro interno no Servidor' })
      return
    }
    res.json(result)
  })
}

exports.buscarUsuario = (req, res) => {
  const { id } = req.params //id como parametro na url
  db.query('SELECT * FROM usuario WHERE id = ?', id, (err, result) => {
      if (err) {
          console.error('Erro ao buscar cliente', err);
          res.status(500).json({ error: 'Erro interno no Servidor' })
          return
      }
      if (result.length === 0) {
          res.status(404).json({ error: 'Cliente não encontrado' })
          return
      }
      res.json(result[0])
  })
}

exports.adicionarUsuario = (req, res) => {
  const { nome, ano, email } = req.body;

  const { error } = usuarioSchema.validate({ nome, ano, email }); // Use .validate()

  // Validação dos dados
  if (error) {
    console.error('Dados de usuário inválidos:', error);
    return res.status(400).json({ error: 'Dados de usuario invalido' });
  }

  const novoUsuario = {
    nome,
    ano,
    email
  };

  // Inserção no banco de dados
  db.query('INSERT INTO usuario SET ?', novoUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar usuario:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    // Resposta de sucesso
    return res.json({ message: 'Usuario adicionado com sucesso' });
  });
};

exports.atualizarUsuario = (req, res) => {
  const { id } = req.params; // Assumindo que você passa o id na URL
  const { nome, ano, email } = req.body;
  const anoDate = new Date(ano); // Converte a string em objeto Date

  const { error } = usuarioSchema.validate({ nome, ano: anoDate, email }); // Use .validate()

  if (error) {
    console.error('Dados do usuário inválidos:', error);
    return res.status(400).json({ error: 'Dados do usuario invalido' });
  }

  const usuarioAtualizado = {
    nome, // Inclui nome se for parte da atualização
    ano: anoDate,
    email
  };

  db.query('UPDATE usuario SET ? WHERE id = ?', [usuarioAtualizado, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuario:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    // Verifique se algum registro foi afetado
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuario atualizado com sucesso' });
  });
};

exports.deletarUsuario = (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM usuario WHERE id = ?', id, (err, result) => {
      if (err) {
          console.error('Erro ao deletar cliente', err);
          res.status(500).json({ error: 'Erro interno do Servidor' })
          return
      }
  })
  res.json({ message: 'Cliente deletado com sucesso' })
}
