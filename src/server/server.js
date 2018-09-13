const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const JiraClient = require('jira-connector');
const btoa = require('btoa');
const base64 = require('b64-lite');

app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post('/login', (req, res, next) => {
  const jira = new JiraClient({
    host: 'jira.expedia.biz',
    basic_auth: {
      username: req.body.username,
      password: req.body.password
    },
  });

  jira.myself.getMyself().then((currentUser) => {
    currentUser.token = btoa(req.body.username + ':' + req.body.password);

    res.status(200).send(currentUser);
    next();
  }, (error) => {
    res.status(401).send('Unauthorized');
  });
});

app.post('/production-bugs', (req, res, next) => {
  getAllProdBugs(req.body.token).then(function (bugs) {
    res.status(200).send(bugs);
    next();
  }, function (error) {
    res.send(error);
  });
});

function getAllProdBugs(token) {
  return new Promise((resolve, reject) => {
    let bugs = [];
    getBugs(token, bugs, (err, allBugs) => {
      if (err) {
        reject(err);
      } else {
        resolve(allBugs);
      }
    })
  });
}

function getBugs(token, bugs, callback) {
  const jira = getJIRAClient(token);

  jira.search.search({
    jql: 'project=EGE AND issuetype = Bug AND "Production Issue" = Yes  AND status changed TO Resolved BY ("akalam", "raramakrishna", "rgrover", "risharma", "yagoyal", "schugh", "anechawla", "ttewari") AFTER startOfYear()',
    timeout: 100000
  }).then((response) => {
    bugs.push(response);
    callback(null, bugs);
  }, (error) => {
    callback(error);
  });
}

function getJIRAClient(token) {
  const jira = new JiraClient({
    host: 'jira.expedia.biz',
    basic_auth: {
      base64: token
    },
  });

  return jira;
}

// Create a Server
let server = app.listen(4201, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
