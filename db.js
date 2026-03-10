const sqLite3 = require('sqlite3').verbosa;

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error conectando:', err.message);
  } else {
    console.log('Base de datos conectada');
  }
});


db.run(`CREATE TABLE IF NOT EXISTS Estudiantes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT,
  Apellido TEXT,
  Genero TEXT,
  Email TEXT UNIQUE
)`);
/*
db.run(`CREATE TABLE IF NOT EXISTS Materias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT,
  Apellido TEXT,

)`);


db.run(`CREATE TABLE IF NOT EXISTS Estudiantes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT,
  Apellido TEXT,
  Genero TEXT,
  Email TEXT UNIQUE
)`);
*/

module.exports = db;