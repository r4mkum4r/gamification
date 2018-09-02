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
  const jira = new JiraClient({
    host: 'jira.expedia.biz',
    basic_auth: {
      base64: req.body.token
    },
  });

  jira.search.search({
    jql: 'project=EGE AND issuetype= Bug AND "Production Issue" = Yes  AND status changed TO Resolved BY currentUser()'
  }).then((response) => {
    res.status(200).send(response);
    next();
  }, (error) => {
    res.send(error);
  });
});

// Create a Server
let server = app.listen(4201, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
