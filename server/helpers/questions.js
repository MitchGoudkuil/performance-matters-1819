function getAll() {
  return [{
    id: 1,
    img: "./img/",
    question: "Do you want to watch a movie or a serie?",
    tag: "First question",
    answers: [{answer: 'movie', img:"./../server/assets/img/film.svg"}, {answer:'serie', img:"./../img/television.svg"}]
  },
  {
    id: 2,
    img: "./img/genre.jpg",
    question: "What genre would you like to watch?",
    tag: "Second question",
    answers: [{answer: 'thriller', img:"./../img/knife.svg"},{answer: 'drama', img:"./../img/drama.svg"},{answer:'horror', img:"./../img/skull.svg"},{answer: 'comedy', img:"./../img/laughing.svg"}]
  }
]
}

module.exports.getAll = getAll
