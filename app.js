const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const Cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const goodsRoutes = require('./routes/goods.routes');
const todoRoutes = require('./routes/todo.routes');


const app = express();
app.use(express.json({ extended: true }));
app.use(Cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/goods', goodsRoutes);
app.use('/api/todo', todoRoutes);

const PORT = process.env.PORT || config.get('port');

async function start() {
  try {
    await mongoose.connect(config.get('diplomaDB'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();
