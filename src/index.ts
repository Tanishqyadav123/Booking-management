import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { PORT } from './config';
import router from './routes';
import errorMiddleware from './handlers/error.handler';
const app = express();


app.get('/hello-guys' , (req : Request , res : Response , next : NextFunction) =>{
     res.send({
          message : "I am Live"
     })
})

app.use('/api/v1/', router)


// Introducing the middleware for error :-
app.use(errorMiddleware)
app.listen(PORT , () =>{
     console.log(`Server is  running on the PORT : ${PORT}`)
})