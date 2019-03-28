const express = require('express')
const app = express()
const api = require('./helpers/api.js')
const questions = require('./helpers/questions.js')
const shrinkRay = require('shrink-ray-current')
const hbs = require('express-handlebars');
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
// app.use(shrinkRay({
//   filter: (req) => req.headers['accept'].includes(['text/html'])
// }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('server/assets'))

// app.get(['*.js', '*.css'], (req, res, next) => {
//   const encoding = req.headers['accept-encoding']
//   const extensionIndex = req.originalUrl.lastIndexOf('.')
//   const extension = req.originalUrl.slice(extensionIndex)
//
//   if (encoding && encoding.includes('br')) {
//     req.url = `${req.url}.br`
//     res.set('Content-Encoding', 'br')
//   } else if (encoding && encoding.includes('gzip')) {
//     req.url = `${req.url}.gz`
//     res.set('Content-Encoding', 'gzip')
//   }
//
//   res.set('Content-Type', extension === '.js' ? 'text/javascript' : 'text/css')
//   next()
// })

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts' }))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

const questionData = questions.getAll()
let ingrArray = []

app.get('/', function(req, res) {
  ingrArray = []
  res.render('index', {
    questions: questionData,
    nextQuestion: 0,
    mainLogo: false
  });
})

app.get('/offline', function(req, res) {
  ingrArray = []
  res.render('offline');
})

app.get('/question/:number', async function(req, res) {
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

app.get('/offline', async function(req, res) {
  res.render('offline', {
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

var server = app.listen(3000, function() {
  console.log('server running at http://localhost:' + server.address().port)
})
