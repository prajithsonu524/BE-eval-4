const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const contentTypes = require('./src/routes/contentTypes');
const collections = require('./src/routes/collections');
app.use(cors());
app.use(express.json());
app.use('/contentTypes', contentTypes);
app.use('/collections', collections);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);

