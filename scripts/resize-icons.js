const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'icon.png');

async function generateIcons() {
  if (!fs.existsSync(inputPath)) {
    console.error('Source icon.png not found at', inputPath);
    return;
  }

  // Create a cropped base image removing the text and white space
  const cropped = sharp(inputPath).extract({ left: 144, top: 540, width: 1600, height: 1600 });

  // Mobile Icons
  await cropped.clone()
    .resize(1024, 1024)
    .toFile(path.join(__dirname, '..', 'mobile', 'assets', 'icon.png'));
    
  await cropped.clone()
    .resize(1024, 1024)
    .toFile(path.join(__dirname, '..', 'mobile', 'assets', 'adaptive-icon.png'));

  // Web Favicon
  await cropped.clone()
    .resize(64, 64)
    .toFile(path.join(__dirname, '..', 'web', 'public', 'favicon.png'));

  // Create public dir if doesn't exist
  if (!fs.existsSync(path.join(__dirname, '..', 'web', 'public'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'web', 'public'));
  }

  console.log('Icons generated successfully.');
}

generateIcons().catch(console.error);
