// Import babel patches for async functions
// import "core-js/stable";
// import "regenerator-runtime/runtime";

// Import the app(routes)
const http = require("http");
const app = require("./app/app");
// Import the database connection
const db = require("./database/database");

// create a server which hosts both

const port = process.env.PORT || 3000;

// Connect to the database(in database.js), then start the server with the app compiled from app.js
db.connect().then(() => {
    const server = http.createServer(app);

    server.listen(port, () => console.log(`Server started on port ${port}`));
});
