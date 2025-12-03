const fs = require('fs');
const path = require('path');

const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const nextDir = path.join(process.cwd(), '.next');
const outputDir = path.join(nextDir, 'server', 'app');

if (fs.existsSync(outputDir)) {
  const publicDir = path.join(process.cwd(), 'public');
  const staticDir = path.join(nextDir, 'static');
  
  if (fs.existsSync(publicDir)) {
    console.log('Copying public folder to output...');
    copyDir(publicDir, path.join(outputDir, '..', '..', 'public'));
  }
  
  if (fs.existsSync(staticDir)) {
    console.log('Copying static folder to output...');
    copyDir(staticDir, path.join(outputDir, '..', '..', 'static'));
  }
  
  console.log('Assets copied successfully!');
} else {
  console.error('Output directory not found:', outputDir);
  process.exit(1);
}

