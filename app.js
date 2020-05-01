const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const foodsRoute = require('./src/routes/foods');
const authRoute = require('./src/routes/auth');

const PORT = 3001;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/foods', cors(corsOptions), foodsRoute);
app.use('/user/', cors(corsOptions), authRoute);

app.listen(PORT, () => {
  console.log('Start server at port 3001.');
});
