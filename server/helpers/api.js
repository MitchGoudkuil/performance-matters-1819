const axios = require('axios');

async function getRecipe(ingrArray) {
  let data = await axios.get(`http://www.recipepuppy.com/api/?i=${ingrArray.toString()}&q=omelet&p=1`)
  console.log(data.data.results);
  return data.data.results
}

module.exports.getRecipe = getRecipe
