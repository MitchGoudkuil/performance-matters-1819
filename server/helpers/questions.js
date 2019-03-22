function getAll() {
  return [{
    id: 1,
    img: "./img/",
    question: "Do you want to watch a movie or a serie?",
    tag: "First question",
    answers: [{answer: 'movie', img:"../img/film.svg"}, {answer:'serie', img:"../img/television.svg"}]
  },
  {
    id: 2,
    img: "./img/genre.jpg",
    question: "What genre would you like to watch?",
    tag: "Second question",
    answers: [{answer: 'thriller', img:"../img/film.svg"},{answer: 'animation', img:"../img/film.svg"},{answer:'horror', img:"../img/film.svg"},{answer: 'comedy', img:"../img/film.svg"}]
  }
]
}

module.exports.getAll = getAll
