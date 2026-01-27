const express = require('express');
const morgan = require("morgan");
const { sequelize } = require('./models');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.use(cookieParser());

const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');
app.use('/users', userRoutes);
app.use('/expense', expenseRoutes);


//test db connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

app.get('/', (req, res) => {
  res.json({
    message: 'API connection successfull',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5002);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
