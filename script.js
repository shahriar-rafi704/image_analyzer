const imageInput = document.getElementById('imageInput');
const chooseImageButton = document.getElementById('chooseImageButton');
const checkButton = document.getElementById('checkButton');
const imageContainer = document.getElementById('imageContainer');
const uploadedImage = document.getElementById('uploadedImage');
const resultDiv = document.getElementById('result');

resultDiv.style.display = 'none';
imageContainer.style.display = 'none';

chooseImageButton.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', () => {
    const uploadedImageFile = imageInput.files[0];
    if (uploadedImageFile) {
        const img = new Image();
        img.src = URL.createObjectURL(uploadedImageFile);
        
        img.onload = function () {
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
           
           

            const maxImageSize = 200;
            const scaleFactor = Math.min(1, maxImageSize / width, maxImageSize / height);
            uploadedImage.style.width = `${width * scaleFactor}px`;
            uploadedImage.style.height = `${height * scaleFactor}px`;
            uploadedImage.src = URL.createObjectURL(uploadedImageFile);
            imageContainer.style.display = 'block';
            resultDiv.style.display = 'none';
        };
    } else {
        uploadedImage.src = '';
        imageContainer.style.display = 'none';
    }
});

checkButton.addEventListener('click', () => {
    const uploadedImageFile = imageInput.files[0];
    if (!uploadedImageFile) {
        resultDiv.innerHTML = 'Select an image.';
        resultDiv.style.display = 'block';
        return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(uploadedImageFile);
    
    img.onload = function () {
        const width = img.width;
        const height = img.height;
        const aspectRatio = width / height;

        resultDiv.innerHTML = `
            <span class="label">Width:</span>
            <span class="value">${width}px</span><br>
            <span class="label">Height:</span>
            <span class="value">${height}px</span><br>
            <span class="label">Aspect Ratio:</span>
            <span class="value">${aspectRatio.toFixed(2)}</span>
        `;
        const labels = document.querySelectorAll('.label');
        const values = document.querySelectorAll('.value');
        labels.forEach(label => {
            label.style.color = '#888';
        });
        values.forEach(value => {
            value.style.color = '#000';
            value.style.fontWeight = 'bold';
        });

        resultDiv.style.display = 'block';
    };
});