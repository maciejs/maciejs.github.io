// Color palette functionality
let selectedColor = 'black';
const colorUsage = {};

document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.getAttribute('data-color');
    });
});

// Pixel canvas functionality
const canvas = document.getElementById('pixel-canvas');
const colorUsageDiv = document.getElementById('color-usage');
let isDrawing = false;

for (let i = 0; i < 100; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.dataset.index = i + 1;
    pixel.addEventListener('mousedown', () => {
        isDrawing = true;
        const previousColor = pixel.style.backgroundColor;
        pixel.style.backgroundColor = selectedColor;
        updateColorUsage(pixel.dataset.index, selectedColor, previousColor);
    });
    pixel.addEventListener('mouseover', () => {
        if (isDrawing) {
            const previousColor = pixel.style.backgroundColor;
            pixel.style.backgroundColor = selectedColor;
            updateColorUsage(pixel.dataset.index, selectedColor, previousColor);
        }
    });
    pixel.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    canvas.appendChild(pixel);
}

document.body.addEventListener('mouseup', () => {
    isDrawing = false;
});

const colorNames = {
    red: 'czerwony',
    orange: 'pomarańczowy',
    gold: 'żółty',
    green: 'zielony',
    blue: 'niebieski',
    purple: 'fioletowy',
    deepskyblue: 'błękitny',
    hotpink: 'różowy',
    brown: 'brązowy',
    gray: 'szary',
    black: 'czarny',
    white: 'MYDŁO'
};

function updateColorUsage(pixelIndex, newColor, previousColor) {
    if (previousColor !== 'white' && previousColor !== '') {
        colorUsage[previousColor] = colorUsage[previousColor].filter(index => index != pixelIndex);
        if (colorUsage[previousColor].length === 0) {
            delete colorUsage[previousColor];
        }
    }
    if (newColor !== 'white') {
        if (!colorUsage[newColor]) {
            colorUsage[newColor] = [];
        }
        colorUsage[newColor].push(pixelIndex);
        colorUsage[newColor].sort((a, b) => a - b);
    }
    renderColorUsage();
}

function renderColorUsage() {
    colorUsageDiv.innerHTML = '';
    for (const [color, indices] of Object.entries(colorUsage)) {
        const colorInfo = document.createElement('div');
        const colorNameSpan = document.createElement('span');
        colorNameSpan.textContent = colorNames[color];
        colorNameSpan.style.color = color;
        const indicesSpan = document.createElement('span');
        indicesSpan.textContent = `: ${indices.join(', ')}`;
        colorInfo.appendChild(colorNameSpan);
        colorInfo.appendChild(indicesSpan);
        colorUsageDiv.appendChild(colorInfo);
    }
}