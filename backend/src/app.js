const express = require('express');
const QRCode = require('qrcode');

const app = express();
app.use(express.json());

// Habilitar CORS para permitir solicitudes desde http://localhost:3000
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // Permitir métodos necesarios
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Responder a solicitudes preflight
  }
  next();
});

const PORT = 3001;

app.post('/generate-qr', async (req, res) => {
  const { folderUrl } = req.body;

  if (!folderUrl) {
    return res.status(400).json({ error: 'URL de la carpeta es requerida' });
  }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(folderUrl);
    res.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el QR' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});