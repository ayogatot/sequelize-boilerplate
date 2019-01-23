const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', require('./routes/users'))

app.listen(PORT, () => console.log(`Running on http://localhost:8000`));
