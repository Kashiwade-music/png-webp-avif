import * as utils from "./utils";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const img_dir = "./png";

const main = async () => {
  // not use utils
  const imgPaths = fs.readdirSync(img_dir).map((imgName) => {
    return path.join(img_dir, imgName);
  });

  // create dir
  if (!fs.existsSync("./webp")) {
    fs.mkdirSync("./webp");
  }
  if (!fs.existsSync("./avif")) {
    fs.mkdirSync("./avif");
  }
  for (const imgPath of imgPaths) {
    await utils.convertToWebp(imgPath, "./webp");
    await utils.convertToAvif(imgPath, "./avif");
  }
};

// work dir which contain a lot of img files, calc statistics of img files(like size, format, height, width, whole pixels number, etc.)
const calcStatistics = async () => {
  const imgPaths = fs.readdirSync(img_dir).map((imgName) => {
    return path.join(img_dir, imgName);
  });
  const imgInfos = imgPaths.map((imgPath) => {
    const img = sharp(imgPath);
    return img.metadata();
  });
  const imgInfo = await Promise.all(imgInfos);

  const totalSize = imgInfo.reduce((acc, cur) => {
    const size = cur.size ?? 0;
    return acc + size;
  }, 0);
  const averageSize = totalSize / imgInfo.length;
  const pngNum = imgInfo.filter((info) => info.format === "png").length;
  const jpgNum = imgInfo.filter((info) => info.format === "jpeg").length;
  const averageHeight =
    imgInfo.reduce((acc, cur) => {
      const height = cur.height ?? 0;
      return acc + height;
    }, 0) / imgInfo.length;
  const averageWidth =
    imgInfo.reduce((acc, cur) => {
      const width = cur.width ?? 0;
      return acc + width;
    }, 0) / imgInfo.length;
  // log
  console.log("totalSize: ", totalSize);
  console.log("averageSize: ", averageSize);
  console.log("pngNum: ", pngNum);
  console.log("jpgNum: ", jpgNum);
  console.log("averageHeight: ", averageHeight);
  console.log("averageWidth: ", averageWidth);
};

// main();
calcStatistics();
