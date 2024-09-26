if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('Sanity check: service Worker registered');
        })
        .catch(error => {
            console.log('Sanity check: service Worker not registered');
            console.log(error)
        });
}

document.getElementById('photoButton').addEventListener('click', () => {
    // browser support
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then((stream) => {
                // picture capture element
                // console.log('aaa 1')
                const pictureElement = document.createElement('video');
                // console.log('aaaa 2: ' + pictureElement)
                pictureElement.srcObject = stream;
                pictureElement.play();
                document.body.appendChild(pictureElement)

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // console.log('aaaaaa 3')
                pictureElement.addEventListener('loadedmetadata', () => {
                    canvas.width = pictureElement.videoWidth;
                    canvas.height = pictureElement.videoHeight;
                    // console.log('dims before:', canvas.width, canvas.height)
                    ctx.drawImage(pictureElement, 0, 0, canvas.width, canvas.height);
                    // console.log('dims after:', canvas.width, canvas.height)
                    const capturedPhotoElement = document.getElementById('capturedPhoto');
                    capturedPhotoElement.src = canvas.toDataURL('image/png');
                    // console.log(capturedPhotoElement.src)
                    capturedPhotoElement.style.display = 'block';

                    stream.getTracks().forEach(track => track.stop());
                    pictureElement.remove();
                });
            })
            .catch((error) => {
                // console.log('aaaaaa')
                // console.log('Camera not allowed error');
                const mediaNotSupportedParagraph = document.getElementById('mediaNotSupported');
                mediaNotSupportedParagraph.style.display = 'block';
                // console.log(error)
            });
    } else {
        // console.log('Media Capture API not supported.');
        const mediaNotSupportedParagraph = document.getElementById('mediaNotSupported');
        mediaNotSupportedParagraph.style.display = 'block';
        // console.log('aaaaaa 6')
    }
});