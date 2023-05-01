// import * as tf from '@tensorflow/tfjs';
const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const tokenize = require('./tokenize');

let model;
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('port', 3000);

app.post('/predict', async (req, res) => {    
    const message = req.body.message;
    const result = await loadModel(message);
    res.json(result).end();
})

const loadModel = async (message) => {
    const lowercaseSentenceArray = message.toLowerCase().replace(/[^\w\s]/g, ' ').split(' ');
    const padding = lowercaseSentenceArray.splice(0, 19);
    const inputTensor = tf.tensor(tokenize(padding));
    const prediction = model.predict(inputTensor);
    const result = prediction.dataSync()[1] > 0.5 ? 'SPAM' : 'NO SPAM';
    console.log(`${message}: ${result}`);
    return { result, prediction: prediction.dataSync()[1] };
}

// loadModel("mano a que hora vienes por el pan");
// loadModel("BCP te informa que tienes una deuda pendiente, ingresa a este enlace http");
// loadModel("Tu tarjeta ha sido bloqueada, por favor enviame tu toquen");
// loadModel("tu tarjeta ha sido bloqueada, por favor enviame tu token o comunicate al 999");
// loadModel("llamaste a pablo? avisame porfa");

app.listen(app.get('port'), async ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
    model = await tf.loadLayersModel('https://assetshub.blob.core.windows.net/models/model.json');
});