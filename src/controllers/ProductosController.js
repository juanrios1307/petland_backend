
const Productos={}

Productos.getProducts = async(req,res)=>{

    /*const data =
        [
           {
               Cantidad: 70,
               Id:1,
               Precio:420,
               Producto:"Comida"
            },
          {
              Cantidad: 450,
              Id:2,
              Precio:500,
              Producto:"Shampu"
            },
            {
                Cantidad: 89,
                Id:3,
                Precio:300,
                Producto:"Hueso"
            },
            {
                Cantidad: 36,
                Id:4,
                Precio:456,
                Producto:"Arena"
            },
        ]*/

    var axios = require('axios');


    var config = {
        method: 'get',
        url: 'https://inventorywebservices.herokuapp.com/webService/inventarioDisp.json?user=a',
    };

    const response = await axios(config)

    const data = response.data.Products


    res.status(200).json({status: "ok", data:data})

}

//Se exporta controlador
module.exports=Productos
