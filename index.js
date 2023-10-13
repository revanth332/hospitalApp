const express = require('express');
const mongoose = require('mongoose');
const patientsRouter = require('./routes/patients');
const autheticateRouter = require('./routes/authenticate');
const authorizeRouter = require('./routes/authorize')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:["http://localhost:3000",process.env.APP_FRONTEND_URL],
})
)
app.use(cors());

mongoose.connect('mongodb://localhost:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Routes
app.use('/api/patients', patientsRouter);
app.use('/authorize',authorizeRouter);
app.use('/authenticate',autheticateRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
