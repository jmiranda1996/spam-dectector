// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs-node');
const tokenize = require('./tokenize');

const loadModel = async (message) => {
    const model = await tf.loadLayersModel('https://assetshub.blob.core.windows.net/models/model.json');
    const lowercaseSentenceArray = message.toLowerCase().replace(/[^\w\s]/g, ' ').split(' ');
    const inputTensor = tf.tensor(tokenize(lowercaseSentenceArray));
    // console.log(inputTensor);
    const prediction = model.predict(inputTensor);
    // console.log(prediction);
    // console.log(prediction.dataSync());
    const sentiment = prediction.dataSync()[1] > 0.5 ? 'SPAM' : 'NO SPAM';
    console.log(`${message}: ${sentiment}`);
}

loadModel("mano a que hora vienes por el pan");
loadModel("BCP te informa que tienes una deuda pendiente, ingresa a este enlace http");
loadModel("Tu tarjeta ha sido bloqueada, por favor enviame tu toquen");
loadModel("tu tarjeta ha sido bloqueada, por favor enviame tu token o comunicate al 999");
loadModel("llamaste a pablo? avisame porfa");