
const http = require('http');
const app = require('./index');

//create server for crud
const server = http.createServer(app);

// to read .env file
require('dotenv').config();

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
