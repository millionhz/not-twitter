const { readFile, unlink } = require('node:fs/promises');

const readImage = (path) => readFile(path);

const deleteImage = (path) => unlink(path);

module.exports = { readImage, deleteImage };
