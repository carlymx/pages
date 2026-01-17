const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generateImage, generateMultipleImages } = require('./imageGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'API de generación de imágenes NFT funcionando' });
});

app.post('/api/generate', async (req, res) => {
  try {
    const params = req.body;
    const imageData = await generateImage(params);
    res.json({ success: true, image: imageData });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/generate-multiple', async (req, res) => {
  try {
    const params = req.body;
    const images = await generateMultipleImages(params);
    res.json({ success: true, images });
  } catch (error) {
    console.error('Error generating multiple images:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});