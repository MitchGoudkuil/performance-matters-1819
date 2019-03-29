function getAll() {
  return [{
    id: 1,
    img: "./img/",
    question: "Do you want to watch a movie or a serie?",
    tag: "First question",
    answers: [{answer: 'movie', img:"/assets/img/film.svg"}, {answer:'serie', img:"/assets/img/television.svg"}]
  },
  {
    id: 2,
    img: "./img/genre.jpg",
    question: "What genre would you like to watch?",
    tag: "Second question",
    answers: [{answer: 'thriller', img:"/assets/img/knife.svg"},{answer: 'drama', img:"/assets/img/drama.svg"},{answer:'horror', img:"/assets/img/skull.svg"},{answer: 'comedy', img:"/assets/img/laughing.svg"}]
  }
]
}

module.exports.getAll = getAll
