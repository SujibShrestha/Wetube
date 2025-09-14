
import dotenv from 'dotenv'
import  connectDB  from './db/index.js'
import app from './app.js'

dotenv.config({
    path: './.env'
})
//Conecting to database 

connectDB()
.then(()=>{
    app.listen(process.env.PORT  || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db failed !!",err)
})



//FIRST APPROACH
/*
import express from 'express'

const app = express()

//semicolon for cleaning purpose
 ;(async()=>{
try {
   await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`) 
   app.on("error",(error)=>{
console.log('err:',error)
throw error
   })

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

} catch (error) {
    console.error("Error: ",error)
    throw err
}
 })()*/