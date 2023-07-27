const express = require('express');
require('./database/database')

const PORT = 1800;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})
