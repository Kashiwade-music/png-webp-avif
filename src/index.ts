import * as utils from "./utils";
import * as fs from "fs";
import * as path from "path";

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

main();
