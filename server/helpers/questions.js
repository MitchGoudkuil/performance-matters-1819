function getAll() {
  return [{
    id: 1,
    img: "./img/brain.jpg",
    question: "Choose your first spice",
    tag: "Vraag 1",
    answers: ['pepper', 'salt','sugar', 'cinnamon' ]
  },
  {
    id: 2,
    img: "./img/genre.jpg",
    question: "Choose your second spice?",
    tag: "Vraag 2",
    answers: ['pepper', 'salt','sugar', 'cinnamon' ]
  },
  {
    id: 3,
    img: "./img/seamless.jpg",
    question: "Choose your first ingredient",
    tag: "Vraag 3",
    answers: ['cheese', 'bacon', 'onion', 'tomato'],
  },
  {
    id: 4,
    img: "./img/seamless.jpg",
    question: "Choose your second ingredient",
    tag: "Vraag 3",
    answers: ['cheese', 'bacon', 'onion', 'tomato'],
  }]
}

module.exports.getAll = getAll
