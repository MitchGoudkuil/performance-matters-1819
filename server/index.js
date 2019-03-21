const express = require('express')
const app = express()
const api = require('./helpers/api.js')
const questions = require('./helpers/questions.js')
const hbs = require('express-handlebars');
const bodyParser = require('body-parser')
const compression = require('compression')
app.use(compression())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts' }))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

const questionData = questions.getAll()
let ingrArray = []

/* routes */

app.get('/', function(req, res) {
  ingrArray = []
  res.render('index', {
    questions: questionData,
    nextQuestion: 0,
    mainLogo: false
  });
})

app.get('/question/:number', async function(req, res) {
  // console.log(ingrArray);
  if (Number(req.params.number) === questionData.slice(-1).pop().id) {
    res.render('list-template', {
      savedData: await api.getMovie(),
      ingredients: ingrArray,
      mainLogo: true
    })
  } else {
    res.render('question-template', {
      currentQuestionData: questionData[Number(req.params.number)],
      nextQuestion: Number(req.params.number) + 1,
      mainLogo: false
    });
  }
})

app.get('/movie/:id/', async function(req, res) {
  res.render('detail-template', {
    detailData: await api.getDetails(req.params.id),
    mainLogo: false
  });
})

app.post('/question/:number', function(req, res) {
  ingrArray.push(req.body.ingr)
  res.redirect(`/question/${req.params.number}`)
})

/* 404 error handling */
app.get('*', function(req, res){
  res.render('error');
});


var server = app.listen(3000, function() {
  console.log('server running at http://localhost:' + server.address().port)
})
