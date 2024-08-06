const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/vuenodecrud');


const itemsRouter = require('./router/Item');
app.use('/api/items', itemsRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
