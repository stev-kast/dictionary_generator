// https://github.com/dwyl/english-words

const fs = require("fs");
const fsPath = require("path");

const ruta = fsPath.join(__dirname, "dic_common_ES");
const ruta_save = fsPath.join(__dirname, "dic_common_5Upper_ES");

const readABC = async () => {
  if (fs.existsSync(ruta)) {
    let lectura = fs.readFileSync(ruta);
    let abc = await lectura.toString();
    return abc;
  }
};

function checkAlphabet(word) {
  let arr = [...word].filter((l) => l.toLowerCase() != l.toUpperCase());
  if (arr.length == 5) {
    return true;
  } else {
    return false;
  }
}

async function trunk5() {
  let abc = await readABC();

  abc = removeAccents(abc);

  let abc_array = abc.split("\n");

  let abc5 = await abc_array.filter(
    (word) => word.length === 5 && checkAlphabet(word)
  );
  let abc5Upper = [];
  await abc5.forEach((word) => {
    abc5Upper.push(word.toUpperCase());
  });

  console.log(abc5Upper.filter((w) => w == "ARROW"));

  let save = JSON.stringify(abc5Upper);

  fs.writeFileSync(ruta_save, save);
}

const removeAccents = (str) => {
  let no_accents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return no_accents;
};

trunk5();
