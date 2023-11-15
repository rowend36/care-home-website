const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { output } = require("../webpack.config");

const imageFolder = "./src/assets"; // Adjust this to your image folder path
const outputFolder = "./dist/assets"; // Adjust this to your image folder path
const sizes = [480, 640, 1024, 1920]; //largest screen we need

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
          const x = sharp(imagePath).webp({ quality: 90 });
          await Promise.all(
            sizes.map(async (e) => {
              x.resize(e, null, {
                fit: "inside",
                withoutEnlargement: true,
              }).toFile(
                outputPath.replace(/\.(jpg|jpeg|png)$/, "-" + e + "$&")
              );
            })
          );
          await x.toFile(outputPath);
          console.log(`Optimized: ${file}`);
        } else await fs.promises.copyFile(imagePath, outputPath);
      })
    );
    const m = fs.readFileSync(path.join("dist", "index.html"), "utf-8");
    fs.writeFileSync(
      path.join("dist", "index.html"),
      m.replace(
        /src=(['"])(\.\/assets\/(?:(?!\1|\\).|\\.)+)\.(jpg|jpeg|png)\1/g,
        "src=$1$2.$3$1" +
          "srcset=$1" +
          sizes.map((e) => "$2-" + e + ".$3 " + e + "w").join(",") +
          "$1" +
          "sizes=" +
          sizes
            .slice(0, -1)
            .map((e) => "(max-width:" + Math.floor(e * 0.9) + "px)" + e + "px")
            .join(",") +
          "," +
          sizes[sizes.length - 1] +
          "px"
      )
    );
  } catch (error) {
    console.error("Error optimizing images:", error.message);
    process.exit(1);
  }
};

optimizeImages();
