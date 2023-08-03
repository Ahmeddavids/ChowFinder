require('./database/database');
const express = require('express');
const userRouter = require('./routes/userRouter');
const menuRouter = require('./routes/menuRouter')
const restaurantrouter = require('./routes/restaurantRouter')
const locationRouter = require('./routes/locationRouter')
const fileUpload = require("express-fileupload");
const cors = require('cors')

const PORT = 1800;

const app = express();
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true
}));
app.use(cors({origin: "*"}));

app.use('/api', userRouter);
app.use('/api', menuRouter);
app.use('/api', restaurantrouter);
app.use('/api', locationRouter);


app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})
