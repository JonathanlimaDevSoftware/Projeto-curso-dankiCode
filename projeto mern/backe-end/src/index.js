require('dotenv').config(); // Carregar variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express(); // 🔥 Inicializar o Express antes de usar `app`

// Configuração do CORS para permitir apenas o frontend do Vite
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Permitir Live Server
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions)); // 🔥 Agora `app` já foi inicializado

app.use(express.json());

const port = process.env.PORT || 3100; // Pegar a porta do .env ou padrão 3100
const mongoURI = process.env.MONGO_URI; // Pegar a URI do .env

// Modelo do MongoDB
const Film = mongoose.model('Film', {
  title: String,
  description: String,
  url_imagem: String,
  trailer_url: String 
});

// Rota para adicionar um filme
app.post("/", async (req, res) => {
  try {
    const film = new Film(req.body);
    await  film.save();
    res.status(201).json(film);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar filme" });
  }
});

// Rota para listar filmes
app.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    return res.json(films);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// Rota para deletar um filme por ID
app.delete('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);

    if (!film) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    return res.status(200).json({ message: "Filme deletado com sucesso", film });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar filme" });
  }
});

// Rota para atualizar um filme por ID
app.put('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(
      req.params.id, 
      req.body, // Passando os dados do corpo da requisição
      { new: true } // Retorna o documento atualizado
    );

    if (!film) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    return res.status(200).json({ message: "Filme atualizado com sucesso", film });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar filme" });
  }
});

// Conectar ao MongoDB e iniciar o servidor
mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB!");
    app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
  })
  .catch(error => console.error("Erro ao conectar ao MongoDB:", error));
