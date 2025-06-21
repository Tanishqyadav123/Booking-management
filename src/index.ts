import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { PORT } from './config';
import router from './routes';
import errorMiddleware from './handlers/error.handler';
const app = express();


// Adding the middleware for extracting data :-
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/v1/', router)


// Introducing the middleware for error :-
app.use(errorMiddleware)
app.listen(PORT , () =>{
     console.log(`Server is  running on the PORT : ${PORT}`)
})