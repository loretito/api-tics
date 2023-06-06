const mongoose = require('mongoose');

const dispositivoSchema = new mongoose.Schema({
  id_dispositivo: {
    type: String,
    required: true
  },
  temp: [{
    hora: {
      type: Date,
      default: Date.now
    },
    temperatura: {
      type: Number,
      required: true
    }
  }],
  ph: [{
    hora: {
      type: Date,
      default: Date.now
    },
    ph: {
      type: Number,
      required: true
    }
  }]
});

const Dispositivo = mongoose.model('Dispositivo', dispositivoSchema);

module.exports = Dispositivo;
