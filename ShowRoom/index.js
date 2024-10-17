import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import itemRoute from './BikeRoutes/rotues.js'; 

dotenv.config()

const app = express(); 

app.use(express.json()); 
app.use(cors()) 

const PORT = process.env.PORT || 8000; 

app.get('/bike', (req,res)=>{
   console.log('request recived')
   res.send("Welcome to Bike ShowRoom")
})

app.use('/api/store', itemRoute)

app.listen(PORT, ()=>{
    console.log(`The server is running ${PORT}`) 
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));