require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;
const redisClient = require('./src/redis/redisConnection');
const mongodbConnection = require('./src/config/mongodbConnection');

async function startServer(){
  await redisClient.connect();
  await mongodbConnection();
  console.log(`Server is running on port ${port}`);
}

app.listen(port, startServer);