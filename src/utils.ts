import sharp from "sharp";
import path from "path";
import { execSync } from "child_process";

// function that get img file path and convert it to webp by using ffmepg cli and save
// see https://imagemagick.org/script/webp.php
export const convertToWebp = async (
  imgPath: string,
  outputDir: string,
  lossless: boolean = false,
  quality: number = 80
) => {
  const imgNameWithoutExt = path.basename(imgPath).split(".")[0];
  const webpPath = path.join(outputDir, `${imgNameWithoutExt}.webp`);
  execSync(
    `magick ${imgPath} -define webp:lossless=${lossless} -define webp:quality=${quality} ${webpPath}`
  );
};

// function that get img file path and convert it to avif and save
export const convertToAvif = async (
  imgPath: string,
  outputDir: string,
  quality: number = 80
) => {
  const imgNameWithoutExt = path.basename(imgPath).split(".")[0];
  const avifPath = path.join(outputDir, `${imgNameWithoutExt}.avif`);
  execSync(`magick ${imgPath} -define avif:quality=${quality} ${avifPath}`);
};
