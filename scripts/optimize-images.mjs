
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const assetsDir = path.resolve("src/assets");

const imageExtensions = new Set([".png"]);

const settings = {
  quality: 82,
  effort: 5,
};

async function findImages(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedImages = await findImages(fullPath);
      images.push(...nestedImages);
    } else if (
      entry.isFile() &&
      imageExtensions.has(
        path.extname(entry.name).toLowerCase()
      )
    ) {
      images.push(fullPath);
    }
  }

  return images;
}

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

async function optimizeImages() {
  console.log("Starting NexaMart image optimization...\n");

  const images = await findImages(assetsDir);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let convertedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const imagePath of images) {
    const parsedPath = path.parse(imagePath);

    const outputPath = path.join(
      parsedPath.dir,
      `${parsedPath.name}.webp`
    );

    try {
      const originalStats = await fs.stat(imagePath);

      const outputBuffer = await sharp(imagePath)
        .rotate()
        .webp({
          quality: settings.quality,
          effort: settings.effort,
        })
        .toBuffer();

      // Do not replace a smaller PNG with a larger WebP.
      if (outputBuffer.length >= originalStats.size) {
        skippedCount++;

        console.log(
          `SKIPPED: ${parsedPath.base} (WebP not smaller)`
        );

        continue;
      }

      await fs.writeFile(outputPath, outputBuffer);

      totalOriginalSize += originalStats.size;
      totalOptimizedSize += outputBuffer.length;
      convertedCount++;

      const reduction =
        (1 - outputBuffer.length / originalStats.size) *
        100;

      console.log(
        `Converted: ${parsedPath.base}`
      );

      console.log(
        `  ${formatSize(originalStats.size)} → ` +
        `${formatSize(outputBuffer.length)} ` +
        `(${reduction.toFixed(1)}% smaller)\n`
      );
    } catch (error) {
      failedCount++;

      console.error(
        `FAILED: ${parsedPath.base} — ${error.message}`
      );
    }
  }

  const totalReduction =
    totalOriginalSize > 0
      ? (1 - totalOptimizedSize / totalOriginalSize) * 100
      : 0;

  console.log("\nOptimization Summary");
  console.log("--------------------");
  console.log(`Images found: ${images.length}`);
  console.log(`Converted: ${convertedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);

  console.log(
    `Original total: ${formatSize(totalOriginalSize)}`
  );

  console.log(
    `Optimized total: ${formatSize(totalOptimizedSize)}`
  );

  console.log(
    `Reduction: ${totalReduction.toFixed(1)}%`
  );
}

optimizeImages().catch((error) => {
  console.error("Optimization failed:", error);
  process.exitCode = 1;
});
