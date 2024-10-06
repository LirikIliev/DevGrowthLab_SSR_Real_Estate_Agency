const express = require('express');
const { port } = require('./config/config');
const cookieParser = require('cookie-parser');
const router = require('./router/router');
const { databaseConnection } = require('./database/databaseConnection');
const errorHandle = require('./middleware/errorHandle');

const app = express();

//* set view engine system to can work with templates
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//* set public file directory 
app.use('/static', express.static('public'));
//* set urlencoded to can get info from post request comes from forms.
app.use(express.urlencoded({ extended: true }));
//* set third party library to can create and managing cookies.
app.use(cookieParser());
//* route systems
app.use(router);

//* error handling middleware
app.use(errorHandle)

//* server and database connection.
const serverConnection = () => app.listen(port, () => console.log(`Server is listening on port : ${port}`))
databaseConnection(serverConnection);