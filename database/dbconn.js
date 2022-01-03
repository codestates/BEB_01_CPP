const express = require('express');
const app = express();
const { userRouter,postRouter,commentRouter,erc20Router } = require('./routes');
const mongoose = require('mongoose');


const MONGO_URI = 'mongodb+srv://mongo:beb1234@beb-mongo.n2fb4.mongodb.net/BlockchainCommunity?retryWrites=true&w=majority';

const server = async() => {
  try {
    await mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, useUnifiedTopology: true
    });
    mongoose.set('debug', true);
    console.log('MongoDB connected');
    app.use(express.json());
    
    app.use('/user', userRouter);
    app.use('/posts', postRouter);
    app.use('/comment', commentRouter); 
    app.use('/erc20', erc20Router);

    app.listen(3000, () => console.log('server is running on port 3000'))
  } catch (err){
    console.log(err)
  }
}

server();