import express from 'express';
const app = express();
const cors = require('cors');

import routes from './src/routes';
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(3001, () => {
    console.log("App is listening on 3001 Port");
})