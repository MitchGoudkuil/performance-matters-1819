function getAll() {
  return [{
    id: 1,
    img: "./img/brain.jpg",
    question: "Do you want to watch a movie or a serie?",
    tag: "First question",
    answers: ['movie', 'serie']
  },
  {
    id: 2,
    img: "./img/genre.jpg",
    question: "What genre would you like to watch?",
    tag: "Second question",
    answers: ['thriller', 'animation','horror', 'comedy']
  }
]
}

module.exports.getAll = getAll
