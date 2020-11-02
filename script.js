const { FaceRecognitionNet, FaceLandmark68Net, ssdMobilenetv1 } = require("face-api.js")
const { DrawFaceLandmarksOptions } = require("face-api.js/build/commonjs/draw")

const imageUpload = document.getElementById('imageUpload')

Promise.all([
    faceRecognitionNet.loadFromUri('/models'),
    faceLandmark68Net.loadFromUri('/models'),
    ssdMobilenetv1.loadFromUri('/models')
    
]).then(start)

function start() {
    document.body.append('loaded')

}

