import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import logger from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/', express.static(__dirname + '/../public/'));
app.use(router);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

export default server;
