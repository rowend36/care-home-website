const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { output } = require("../webpack.config");

const imageFolder = "./src/assets"; // Adjust this to your image folder path
const outputFolder = "./dist/assets"; // Adjust this to your image folder path
const targetSize = 1920; //largest screen we need

const optimizeImages = async () => {
  try {
    const files = fs.readdirSync(imageFolder);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    await Promise.all(
      files.map(async (file) => {
        const imagePath = path.join(imageFolder, file);
        const outputPath = path.join(outputFolder, file);
        if (file.match(/\.(jpg|jpeg|png)$/)) {
          await sharp(imagePath)
            .resize(targetSize, null, {
              fit: "inside",
              withoutEnlargement: true,
            })
            .toFile(outputPath);
          console.log(`Optimized: ${file}`);
        } else await fs.promises.copyFile(imagePath, outputPath);
      })
    );
  } catch (error) {
    console.error("Error optimizing images:", error.message);
    process.exit(1);
  }
};

optimizeImages();
