// DEPENDENCIES
// We need to include the path package to get the correct file path for our html;
const fs = require('fs')
//this is deconstruction of the uuid object
//we're just retrieving the v4 method which generates a unique id
const {v4} = require('uuid');
// ROUTING

module.exports = (app) => {
  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content

  //retrieval of information
  app.get('/api/notes', (req, res) => {

    let data = fs.readFileSync('./db/db.json', 'utf-8');
    data = JSON.parse(data);
    return res.json(data)
  });


  //creation of new data as requested by the user
  app.post('/api/notes', (req, res) => {
      //req.body is what the user requested to be added to our database
      //this is an json object already
    console.log(req.body);
    //data is our db.json file, we're storing it in memory temporarily into the data variable
    let data = fs.readFileSync('./db/db.json', 'utf-8');
    //this is our array of notes
    data = JSON.parse(data);
    //we're adding the new note to our data 
    let newNote = req.body;
    //we can add new attributes to objects by just inferring to an property name
    //with dot notation
    //if it doesn't exist, it will create a new one
    newNote.id = v4();
    data.push(newNote);
    console.log(newNote)

    //this will overwrite permenantly db.json with our new note added 
    //have to convert it to text before we can write to our file
    fs.writeFileSync('./db/db.json', JSON.stringify(data))
    //this is the new note that we got from the user input, we're just sending it back
    return res.json(req.body);
  });
};