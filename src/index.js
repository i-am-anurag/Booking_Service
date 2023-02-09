const express  = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const apiroutes = require('./routes/index');
const app = express();
const db = require('./models/index');

const setupandStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api',apiroutes);
    app.listen(PORT,()=>{
        console.log(`Server is running at No:${PORT}`);

        if(process.env.DB_SYNC)
        {
            db.sync({alert:true});
        }
    });
}

setupandStartServer();
