# What to eat readme
By: Mitch Goudkuil

Rebuild of the oba project with a new api but same concept.
A server side rendered application with the function to get a recipe based on your chosen preferences. The data is gathered from the ricePuppy food API.

![Image from the interface](/img/app.png)

---

### Table of contents

* [Live Demo](#The-assignment)
* [Install](#install)
* [Usage](#Usage)
   * [Dynamically render questions](#Dynamically-render-questions)
   * [Setup questions](#Setup-questions)
* [External data Resources](#External-data-Resources)
* [Features list](#Features-list)
   * [Wishlist](#wishlist)

### Live Demo
<!-- [PokeSearch](https://mitchgoudkuil.github.io/web-app-from-scratch-18-19/week2) -->   

### Install
```bash
# git clone
git clone https://github.com/MitchGoudkuil/performance-matters-1819.git

cd performance-matters-1819.git

# dependencies
npm install

# start server
npm run dev

```

### Usage

##### Dynamically render questions
When params is equal to the last in the questions array the question-template will be rendered.

```javascript
app.get('/question/:number', async function(req, res) {
  // console.log(ingrArray);
  if (Number(req.params.number) === questionData.slice(-1).pop().id) {
    res.render('list-template', {
      savedData: await api.getRecipe(ingrArray)
    })
  } else {
    res.render('question-template', {
      currentQuestionData: questionData[Number(req.params.number)],
      nextQuestion: Number(req.params.number) + 1
    });
  }
})
```

##### Setup questions
To set up the questions go to the questions.js file in the helpers directory and add questions like below. Answers can be as much as needed.
```javascript
{
  id: 1,
  question: "Choose your first spice",
  tag: "Question 1",
  answers: ['pepper', 'salt','sugar', 'cinnamon' ]
}
```

### External data Resources
Npm packages used:
- axios
- Bodyparser
- express
- express-handlebars

Dev dependencies:
- nodemon

---

### Features list

- [X] Dynamically render the questions
- [ ] Possibility to change the food and the ingredients to your liking
- [ ] Randomly pick a recipe if the user can't choose.

### wishlist

- [ ] Save recipe's to your personal page
- [ ] Save used settings
- [ ] Edit made choices in ingredients etc
- [ ] Make the application user friendly
- [ ] Possibility to use the website while being offline
