const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});