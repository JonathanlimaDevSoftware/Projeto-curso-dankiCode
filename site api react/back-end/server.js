import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

/* Criar usuário */
app.post('/usuarios', async (req, resp) => {
  try {
    const usuario = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    });
    resp.status(201).json(usuario);
  } catch (error) {
    resp.status(400).json({ error: 'Erro ao criar usuário', details: error });
  }
});







/* Buscar todos os usuários */
app.get('/usuarios', async (req, resp) => {
  try {
    const users = await prisma.user.findMany();
    resp.status(200).json(users); // 🔹 Corrigido de "user" para "users"
  } catch (error) {
    resp.status(500).json({ error: 'Erro ao buscar usuários', details: error });
  }
});






/* edite usuário */
app.put('/usuarios/:id', async (req, resp) => {
  try {

      await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    });

    resp.status(200).json(usuario); // Sucesso!
  } catch (error) {
    resp.status(400).json({
      error: 'Erro ao atualizar usuário',
      details: error.message || error
    });
  }
});


/* deletar usuário */
app.delete('/usuarios/:id', async (req, resp) => {
  try {

      await prisma.user.delete({
      where: { id: req.params.id },
      
    });

    resp.status(200).json({message:"usuario deletado"}); // Sucesso!
  } catch (error) {
    resp.status(400).json({
      error: 'Erro ao atualizar usuário',
      details: error.message || error
    });
  }
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


/* 
db_users
icNesbMRZquYqvs7

*/