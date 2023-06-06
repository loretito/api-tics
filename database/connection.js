const mongoose = require('mongoose')

const connection = async() => {

    try {
        //contrasenia oculta, no te va a funcionar ele codigo
        await mongoose.connect("mongodb+srv://loreto:<password>@arduino-db-connection.gnu7ysr.mongodb.net/arduino")

        console.log('Conectado a la db')
        
    } catch (error) {
        console.log(error)
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    connection
}