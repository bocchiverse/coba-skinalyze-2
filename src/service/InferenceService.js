const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(image) {
    try {
        const tensor = tf.node
            .decodeImage(image)
            .resizeNearestNeighbor([256, 256])
            .expandDims()
            .toFloat();

        const label = z

        console.log("Label: ", label);

        let suggestion;
        if (label === "Acne") {
            suggestion = 
                "ini Acne";
        }
        if (label === "Bags") {
            suggestion = 
                "ini Bags";
        }
        if (label === "Bopeng") {
            suggestion = 
                "ini Bopeng";
        }
        if (label === "Bruntusan") {
            suggestion = 
                "ini Bruntusan";
        }
        if (label === "Milia") {
            suggestion = 
                "ini Milia";
        }
        if (label === "Redness") {
            suggestion = 
                "ini Redness";
        }

        return {
            label,
            suggestion: suggestion,
        };
        
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi')
    }
}

module.exports = predictClassification;