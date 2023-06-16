const express = require("express");
const app = express();
const port = 4002;
const routes = require('./api/routes/routes');
const bodyParser = require('body-parser');
const multer = require('multer');
const forms = multer({ dest: 'uploads/' });
const dotenv = require('dotenv');
const moment = require('moment-timezone');
const https = require("http");
const WebSocket = require("./api/config/webSocket");
const os = require("os");

require('./api/database/connection');
require('./api/database/models/index');

moment.tz.setDefault('UTC');
dotenv.config();

var cors = require('cors');
app.use(cors({
    origin: '*'
}));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

const upload = multer({
    dest: 'uploads/',
}).fields([{ name: "image" }, { name: "banner" }]);

// app.use(upload);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(forms.array());

const httpsServer = https.createServer(app);
new WebSocket(httpsServer);

app.use('/api/v1', routes);

httpsServer.listen(port);
