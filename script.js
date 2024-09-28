const importBtn = document.getElementById('importBtn');
const exportBtn = document.getElementById('exportBtn');
const imagePreview = document.getElementById('imagePreview');
const frameForm = document.getElementById('frame-form');
const gridLayer = document.getElementById('gridLayer');
const gridCanvas = document.getElementById('gridCanvas');
let uploadedImage = null;

// Import Image
importBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            uploadedImage = new Image();
            uploadedImage.src = event.target.result;
            uploadedImage.onload = () => {
                imagePreview.src = uploadedImage.src;
                updateGrid();
                exportBtn.disabled = false;
            };
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

// Update Grid Layer
function updateGrid() {
    const frameWidth = parseInt(document.getElementById('frameWidth').value);
    const frameHeight = parseInt(document.getElementById('frameHeight').value);
    const startX = parseInt(document.getElementById('startX').value);  // Lấy giá trị startX
    const startY = parseInt(document.getElementById('startY').value);  // Lấy giá trị startY
    const offsetX = parseInt(document.getElementById('offsetX').value);  // Lấy giá trị offsetX
    const offsetY = parseInt(document.getElementById('offsetY').value);  // Lấy giá trị offsetY
    const numFrames = parseInt(document.getElementById('numFrames').value);

    if (!uploadedImage || isNaN(frameWidth) || isNaN(frameHeight) || isNaN(numFrames)) return;

    const originalWidth = uploadedImage.width;
    const originalHeight = uploadedImage.height;

    const previewWidth = imagePreview.clientWidth;
    const previewHeight = imagePreview.clientHeight;

    gridCanvas.style.width = previewWidth + 'px';
    gridCanvas.style.height = previewHeight + 'px';

    gridCanvas.width = originalWidth;
    gridCanvas.height = originalHeight;

    const ctx = gridCanvas.getContext('2d');
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.75)';

    const cols = Math.floor(originalWidth / frameWidth); 
    const rows = Math.floor(originalHeight / frameHeight);

    let frameCount = 0;

    // Vẽ grid với start_x, start_y, offset_x, offset_y
    for (let row = 0; row < rows && frameCount < numFrames; row++) {
        for (let col = 0; col < cols && frameCount < numFrames; col++) {
            const x = startX + col * (frameWidth + offsetX);  // Bắt đầu từ startX và thêm offsetX
            const y = startY + row * (frameHeight + offsetY); // Bắt đầu từ startY và thêm offsetY

            // Chỉ vẽ grid nếu vị trí nằm trong kích thước ảnh
            if (x + frameWidth <= originalWidth && y + frameHeight <= originalHeight) {
                ctx.strokeRect(x, y, frameWidth, frameHeight);
                frameCount++;
            } else {
                break;  // Dừng nếu vị trí vượt quá kích thước ảnh
            }
        }
    }

    gridLayer.classList.add('visible');
}

// Export Frames as ZIP
frameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const frameWidth = parseInt(document.getElementById('frameWidth').value);
    const frameHeight = parseInt(document.getElementById('frameHeight').value);
    const outputName = document.getElementById('outputName').value;
    const numFrames = parseInt(document.getElementById('numFrames').value);

    if (!uploadedImage || isNaN(frameWidth) || isNaN(frameHeight) || numFrames <= 0) {
        alert('Invalid inputs!');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const zip = new JSZip();
    let frameCount = 0;

    for (let y = 0; y < uploadedImage.height && frameCount < numFrames; y += frameHeight) {
        for (let x = 0; x < uploadedImage.width && frameCount < numFrames; x += frameWidth) {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the cropped image
            ctx.drawImage(uploadedImage, x, y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            // Convert canvas to Blob and add to ZIP
            const blob = await new Promise(resolve => canvas.toBlob(resolve));
            zip.file(`${outputName}_${frameCount}.png`, blob);

            frameCount++;
        }
    }

    // Generate ZIP and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${outputName}_frames.zip`;
        link.click();
    });
});
