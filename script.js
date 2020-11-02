//const { FaceRecognitionNet, FaceLandmark68Net, ssdMobilenetv1 } = require("face-api.js")
//const { DrawFaceLandmarksOptions } = require("face-api.js/build/commonjs/draw")

const imageUpload = document.getElementById('imageUpload')

Promise.all([
    
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    
]).then(start)

async function start() {
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    document.body.append('loaded')
    //// HIER VERDER GAAN
    imageUpload.addEventListener('change', async () => {
        const image = await faceapi.bufferToImage(imageUpload.files[0])
        container.append(image)
        const canvas = faceapi.createCanvasFromMedia(image)
        container.append(canvas)
        const displaySize = { width: image.width, height: image.height}
        faceapi.matchDimensions(canvas, displaySize)

        const detections = await faceapi.detectAllFaces(image)
        .withFaceLandmarks().withFaceDescriptors()
        const resizedDectections = faceapi.resizeResults(detections,displaySize)
        resizedDectections.forEach(detection => {
            const box = detection.detection.box
            const drawBox = new faceapi.draw.DrawBox(box, {label : 'Hallo'})
            drawBox.draw(canvas)
        })
        
    })
}

function loadLabeledImages() {
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i=1;i<2;i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptors()
                descriptions.push(dections.descriptor)

            }
           return new faceapi.LabeledFaceDescriptors(label,descriptions) 
        })
    )

    
}