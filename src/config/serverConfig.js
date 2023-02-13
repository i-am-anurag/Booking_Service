const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT:process.env.PORT,
    FLIFHT_SERVICE_PATH: process.env.FLIFHT_SERVICE_PATH,

}