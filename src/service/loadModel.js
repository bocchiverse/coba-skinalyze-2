const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    return tf.loadGraphModel('../services/tf');
}

module.exports = loadModel;