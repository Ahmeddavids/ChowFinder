require('./database/database');
const express = require('express');
const userRouter = require('./routes/userRouter');
const cors = require('cors')

const PORT = 1800;

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use('/api', userRouter);


app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})
