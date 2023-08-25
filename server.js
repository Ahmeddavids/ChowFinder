require('./database/database');
const express = require('express');
const userRouter = require('./routes/userRouter');
const menuRouter = require('./routes/menuRouter')
const restaurantrouter = require('./routes/restaurantRouter')
const locationRouter = require('./routes/locationRouter')
const categoryRouter = require('./routes/categoryRouter')
const fileUpload = require("express-fileupload");
const cors = require('cors');
const morgan = require("morgan");


const PORT = 1800;

const app = express();
app.use(morgan("dev"))
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true
}));
// app.use(cors({origin: "*"}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(cors({origin: "http://127.0.0.1:5173"}));



app.use('/api', userRouter);
app.use('/api', menuRouter);
app.use('/api', restaurantrouter);
app.use('/api', locationRouter);
app.use('/api', categoryRouter)


app.listen(PORT, () => {
    console.log(`Server is listening to PORT: ${PORT}`);
})
