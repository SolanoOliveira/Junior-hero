// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const db = require('./database'); // Importe a variável db de database.js
app.use(cors());

app.use(express.json());

// Rota para criar uma vaga
app.post('/vagas', (req, res) => {
  const { nome_empresa, nome_vaga, resposta, feedback } = req.body;
  const query = `
    INSERT INTO vagas (nome_empresa, nome_vaga, resposta, feedback)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [nome_empresa, nome_vaga, resposta, feedback], (err) => {
    if (err) {
      console.error('Erro ao inserir vaga:', err);
      res.status(500).json({ error: 'Erro ao inserir vaga' });
    } else {
      res.status(201).json({ message: 'Vaga criada com sucesso' });
    }
  });
});

// Rota para obter todas as vagas
app.get('/vagas', (req, res) => {
  const query = 'SELECT * FROM vagas';
  db.all(query, (err, vagas) => {
    if (err) {
      console.error('Erro ao buscar vagas:', err);
      res.status(500).json({ error: 'Erro ao buscar vagas' });
    } else {
      res.status(200).json(vagas);
    }
  });
});

// Rota para atualizar uma vaga
app.put('/vagas/:id', (req, res) => {
  const { nome_empresa, nome_vaga, resposta, feedback } = req.body;
  const { id } = req.params;
  const query = `
    UPDATE vagas
    SET nome_empresa = ?, nome_vaga = ?, resposta = ?, feedback = ?
    WHERE id = ?
  `;
  db.run(query, [nome_empresa, nome_vaga, resposta, feedback, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar vaga:', err);
      res.status(500).json({ error: 'Erro ao atualizar vaga' });
    } else {
      res.status(200).json({ message: 'Vaga atualizada com sucesso' });
    }
  });
});

// Rota para deletar uma vaga
app.delete('/vagas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM vagas WHERE id = ?';
  db.run(query, id, (err) => {
    if (err) {
      console.error('Erro ao deletar vaga:', err);
      res.status(500).json({ error: 'Erro ao deletar vaga' });
    } else {
      res.status(200).json({ message: 'Vaga deletada com sucesso' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
