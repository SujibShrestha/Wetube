import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,//ONLY ALLOW FROM THIS
    credentials: true,
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,
    limit:'16kb'
}))
app.use(express.static('public'))
app.use(cookieParser())


//routes
import userRouter from './routes/user.routes.js'


//route declaration (IN URL)
app.use('/api/v1/users',userRouter)//MIDDLEWARE 

export default app