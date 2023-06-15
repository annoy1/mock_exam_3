// server.js

const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const questionsData = require('./questionsData'); // Import your existing questions data module

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

app.post('/upload-questions', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Process the data and add questions to your questionsData
    // Assuming the Excel file has columns 'question', 'options', and 'correctAnswer'
    const newQuestions = data.map((row) => ({
      questionText: row.question,
      options: row.options.split(','),
      correctAnswer: row.correctAnswer
    }));

    questionsData.push(...newQuestions);

    return res.json({ message: 'Questions uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process the file' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
