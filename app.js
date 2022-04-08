const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
  fs.readFile('polls.json', 'utf8', (err, data) => {
    let pollList = JSON.parse(data)
    pollList.reverse();

    res.render('index', {
      data: pollList
    });
  });
});

let votesAns = [];

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.post('/admin', (req, res) => {
  fs.readFile('polls.json', 'utf8', (err, data) => {
    let pollList = JSON.parse(data);
    let arr = {  
      "pollID": uuidv4(),
      "creator": req.body.creator,
      "question": req.body.question,
      "answerA": req.body.answerA,
      "answerB": req.body.answerB,
      "votes": votesAns
    }
    pollList.push(arr);
    let pollNew = JSON.stringify(pollList, null, 2);
    fs.writeFile("polls.json", pollNew, 'utf8', cb => {});
  });

  res.render('admin');
});


let pollVotesA;
let pollVotesB;
let paramsID;

app.post('/:id', (req, res) => {
  votesAns.push(req.body.answer)
  paramsID = req.params.id;
  fs.readFile('polls.json', 'utf8', (err, data) => {
    let pollList = JSON.parse(data);
    pollList.forEach(item => {
      if(item.pollID === paramsID) {
        item.votes.push(req.body.answer);
        pollVotesA = item.votes.filter(vote => vote === item.answerA).length;
        pollVotesB = item.votes.filter(vote => vote === item.answerB).length;
      }
    })
    let pollNew = JSON.stringify(pollList, null, 2);
    fs.writeFile("polls.json", pollNew, 'utf8', cb => {});
  });

  res.redirect('/results')
});

app.get('/results', (req, res) => {
  fs.readFile('polls.json', 'utf8', (err, data) => {
    let pollList = JSON.parse(data);
    pollList.forEach(item => {
      if(item.pollID === paramsID) {
        res.render('results', {
          votesA: pollVotesA,
          votesB: pollVotesB,
          data: item
        });
      }
    });
  });
});

