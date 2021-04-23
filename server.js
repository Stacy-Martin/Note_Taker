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
app.use(express.static('public'))
// Router points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// functionality for delete button, makes use of the items unique id
app.delete('/api/notes/:id', (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  for (const [i, element] of db.entries()) {
    if (element.id === id) {
      db.splice(i, 1);
      fs.writeFile('db/db.json', JSON.stringify(db), (err) => {
        if (err)
          console.log(err);
        else {
          return res.json(db)
        }
      })
    }
  }
})

// Listener code effectively "starts" our server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
