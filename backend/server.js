const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 1250;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Configuración de MongoDB
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'tienda_juegos';
const COLLECTION_NAME = 'juegos';

let db;
let juegosCollection;

// Conectar a MongoDB
async function conectarDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db(DB_NAME);
    juegosCollection = db.collection(COLLECTION_NAME);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
}

// Rutas API

// Obtener todos los juegos
app.get('/api/juegos', async (req, res) => {
  try {
    const juegos = await juegosCollection.find({}).toArray();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener juegos', error: error.message });
  }
});

// Obtener un juego por ID
app.get('/api/juegos/:id', async (req, res) => {
  try {
    const juego = await juegosCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json(juego);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el juego', error: error.message });
  }
});

// Crear un nuevo juego
app.post('/api/juegos', async (req, res) => {
  try {
    const nuevoJuego = {
      ...req.body,
      fechaCreacion: new Date()
    };
    const resultado = await juegosCollection.insertOne(nuevoJuego);
    res.status(201).json({ 
      mensaje: 'Juego creado exitosamente',
      id: resultado.insertedId 
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el juego', error: error.message });
  }
});

// Actualizar un juego
app.put('/api/juegos/:id', async (req, res) => {
  try {
    const resultado = await juegosCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    
    if (resultado.matchedCount === 0) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    
    res.json({ mensaje: 'Juego actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el juego', error: error.message });
  }
});

// Eliminar un juego
app.delete('/api/juegos/:id', async (req, res) => {
  try {
    const resultado = await juegosCollection.deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    
    res.json({ mensaje: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el juego', error: error.message });
  }
});

// Ruta para servir el frontend (debe ir al final)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Iniciar servidor
conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});