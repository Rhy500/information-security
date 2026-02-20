const express = require('express');
const app = express();
const helmet = require("helmet");

app.use(helmet.xssFilter());
app.get("/", (req, res) => {
  res.send("Hello Secure cat");
});

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());
app.get("/", function(req, res) {
  res.send("Secure Download Protection");
});

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
// Gunakan HSTS
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);
app.get("/", function(req, res) {
  res.send("HSTS Enabled");
});

// Nonaktifkan DNS Prefetch
app.use(helmet.dnsPrefetchControl());
app.get("/", function(req, res) {
  res.send("DNS Prefetch Disabled");
});

app.use(helmet.noCache());
app.get("/", function(req, res) {
  res.send("No Cache Enabled");
});

module.exports = app;

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  })
);
app.get("/", function(req, res) {
  res.send("CSP Enabled");
});
module.exports = app;

app.use(
  helmet({
    frameguard: {
      action: "deny"
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"]
      }
    },
    dnsPrefetchControl: false
  })
);
// noCache perlu ditambahkan manual
app.use(helmet.noCache());
app.get("/", function (req, res) {
  res.send("All Security Enabled");
});
module.exports = app;

const password = "mySecretPassword";

// cost = 12
const saltRounds = 12;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.log(err);
  } else {
    console.log("Hashed password:", hash);
  }
});

const myPlaintextPassword = "passw0rd!";
const saltRounds = 13;
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hash:", hash);
    // Compare password setelah hash selesai
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      if (err) {
        console.error(err);
      
      } else {
        console.log("Match result:", res);
      }
    });
  }
});

var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log("Sync Hash:", hash);

var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log("Sync Compare Result:", result);save


module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
