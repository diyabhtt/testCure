const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware for CORS
app.use(cors());

// Upload route
app.post('/upload_image', upload.single('file'), (req, res) => {
  const { file, body } = req;
  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = path.join(__dirname, 'uploads', file.filename);

  // You can process the file or save it to a database
  res.json({ message: 'Image uploaded successfully', filePath });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
