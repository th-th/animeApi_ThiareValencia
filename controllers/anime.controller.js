const fs = require("fs/promises");
const path = require("path");

async function leerData() {
  try {
    const data = await fs.readFile(
      path.resolve(__dirname, "../database/anime.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.log("Error leyendo el archivo: ", err);
  }
}

async function escribirData(json) {
  try {
    const data = JSON.stringify(json, null, 2);
    await fs.writeFile(
      path.resolve(__dirname, "../database/anime.json"),
      data,
      "utf8"
    );
  } catch (err) {
    console.log("Error escribiendo el archivo: ", err);
  }
}

async function findAll(req, res) {
  const data = await leerData();
  res.json(data);
}

async function findById(req, res) {
  const id = req.params.id;
  const data = await leerData();
  const anime = data[id];

  if (!anime) {
    return res.status(404).json({ error: "No se ha encontrado el anime" });
  }

  res.json(anime);
}

async function create(req, res) {
  const nuevoAnime = req.body;
  const data = await leerData();

  if (
    !nuevoAnime.id ||
    !nuevoAnime.nombre ||
    !nuevoAnime.genero ||
    !nuevoAnime.año ||
    !nuevoAnime.autor
  ) {
    return res.status(404).json({ error: "Faltan datos en el anime" });
  }

  if (data[nuevoAnime.id]) {
    return res.status(404).json({ error: "Ya existe un anime con esa ID" });
  }

  data[nuevoAnime.id] = {
    nombre: nuevoAnime.nombre,
    genero: nuevoAnime.genero,
    año: nuevoAnime.año,
    autor: nuevoAnime.autor,
  };

  await escribirData(data);
  res.status(200).json(nuevoAnime);
}

async function editById(req, res) {
  const id = req.params.id;
  const data = await leerData();

  if (!data[id]) {
    return res.status(404).json({ error: "No se ha encontrado el anime" });
  }

  const animeActualizado = {
    nombre: req.body.nombre ?? data[id].nombre,
    genero: req.body.genero ?? data[id].genero,
    año: req.body.año ?? data[id].año,
    autor: req.body.autor ?? data[id].autor,
  };

  data[id] = {
    nombre: animeActualizado.nombre,
    genero: animeActualizado.genero,
    año: animeActualizado.año,
    autor: animeActualizado.autor,
  };

  await escribirData(data);
  res.json(animeActualizado);
}

async function deleteById(req, res) {
  const id = req.params.id;
  const data = await leerData();

  if (!data[id]) {
    return res.status(404).json({ error: "No se ha encontrado el anime" });
  }

  delete data[id];

  await escribirData(data);

  res.sendStatus(200);
}

module.exports = {
  findAll,
  findById,
  create,
  editById,
  deleteById,
};
