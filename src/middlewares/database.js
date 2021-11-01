const mongoose=require('mongoose')

const mongouri='mongodb+srv://admin:MongoAtlasDB@cluster0.lhtsk.gcp.mongodb.net/petland?retryWrites=true&w=majority'
//const mongouri=process.env.DB_URI

//const mongouri='mongodb+srv://admin:MongoAtlasDB@cluster0.lhtsk.gcp.mongodb.net/petlandTest?retryWrites=true&w=majority'


mongoose.connect(mongouri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db=>console.log('conected to db'))
    .catch(error=>console.log(error))

module.exports=mongoose
