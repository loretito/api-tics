const mongoose = require('mongoose')

const connection = async() => {

    try {
        await mongoose.connect("mongodb+srv://loreto:yjuXTQfbEJoUBkw3@arduino-db-connection.gnu7ysr.mongodb.net/arduino")

        console.log('Conectado a la db')
        
    } catch (error) {
        console.log(error)
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    connection
}
