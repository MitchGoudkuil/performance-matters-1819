const express = require('express')
const app = express()
const api = require('./server/helpers/api.js')
const questions = require('./server/helpers/questions.js')
const hbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const compression = require('compression')

app.use(compression())
app.use((req, res, next) => {
  if (req.headers.accept && !req.headers.accept.includes('text/html')) {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 *
    60 + " ,public");
  }
 next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + 'server/public'))

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/server/views/layouts' }))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/server/views')

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
      mainLogo: true
    });
  }
})

app.get('/movie/:id/', async function(req, res) {
  res.render('detail-template', {
    detailData: await api.getDetails(req.params.id),
    mainLogo: true
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


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
