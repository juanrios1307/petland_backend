const express=require('express')
const app=express()
const morgan=require('morgan')
const cors= require('cors')
const bodyparser=require('body-parser')


require('./middlewares/database')

app.set('Port',5000)

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(cors({origin:true}))


//Declaracion de rutas para manejo de api
app.use('/api/adopt',require('./routes/AdopcionRoute'))
app.use('/api/pet',require('./routes/PetRoute'))
app.use('/api/products',require('./routes/ProductosRoute'))
app.use('/api/user',require('./routes/UserRoute'))

//start server
app.listen(process.env.PORT || 5000,()=>{
    console.log('Listen in the port ',process.env.PORT || 5000)
})

module.exports = app
