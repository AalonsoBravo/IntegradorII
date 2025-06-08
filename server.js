const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const connectDB = require('./conexion/connectionMongo');

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_ATLAS;
connectDB(MONGO_URI);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});