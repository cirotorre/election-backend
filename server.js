require('dotenv').config();
const express=require('express');
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');
const pool=require('./db');

const app=express();
app.use(cors());
app.use(express.json());

const server=http.createServer(app);
const io=new Server(server,{cors:{origin:'*'}});

// ROUTES
app.use('/votes',require('./routes/votes')(io));

// STATS
app.get('/stats',async(req,res)=>{
 const sindaci=await pool.query("SELECT sindaco_id, COUNT(*) voti FROM voti GROUP BY sindaco_id");
 const liste=await pool.query("SELECT lista_id, COUNT(*) voti FROM voti GROUP BY lista_id");
 res.json({sindaci:sindaci.rows,liste:liste.rows});
});

server.listen(process.env.PORT||3001,()=>console.log("SERVER OK"));
