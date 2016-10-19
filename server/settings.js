"use script";
const winston = require('winston');
winston.level = 'debug';
const settings = {
  log: winston,
  port: 5000

};
module.exports = settings;

