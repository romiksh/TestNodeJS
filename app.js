const http = require('http');

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
var counter = 0;
var fs = require("fs");
var counter_file = "data/counter.dat"

// Fuction save counter value to file
function WriteCounter() {
  fs.writeFile(counter_file, counter, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Counter saved');
  });
}

// Check if the counter file is readable.
fs.access(counter_file, fs.constants.R_OK, (err) => {
  console.log(`${counter_file} ${err ? 'is not readable' : 'is readable'}`);
  if (err) {
    fs.mkdir('data', (err) => {
      if (err) throw err;
    });
    WriteCounter();
  }
});

fs.readFile(counter_file, function(err, data) {
  if (err) {
    return console.log(err);
  }
  counter = data;
  console.log('Counter loaded');
});


const server = http.createServer((req, res) => {

  if (req.url != '/favicon.ico') {
    counter++;
    WriteCounter();
    console.log('Connection detected');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<HTML><head>');
    res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
    res.write('</head><body>');

    res.write('<div class = "container"> <div class = "row justify-content-center"> <div class = "col col-5"> \
          <h1 class = "alert alert-primary">  Counter value is: <span class = "badge badge-secondary"> ' + counter + ' </span> </h1> \
          </div> </div> </div>');
    res.write('</body></HTML>');
    res.end('');
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
