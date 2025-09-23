require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const companyRoutes  = require('./routes/company.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express()
const PORT = process.env.PORT || 5050

app.use(cors())
app.use(express.json());

app.use('/api/companies', companyRoutes)

//404
app.use(notFound)

// Error Handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
};

startServer();
