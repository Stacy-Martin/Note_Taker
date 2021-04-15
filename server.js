// DEPENDENCIES
const express = require('express');
const fs = require('fs');

// Tells node that we are creating an "express" server
const app = express();

// establish port, used in listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require('./Develop/db/db.json')(app);

// Listener code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
