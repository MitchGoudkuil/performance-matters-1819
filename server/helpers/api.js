const axios = require('axios');

async function getMovie() {
  // let data = await axios.get(`https://www.food2fork.com/api/search?key=8dd190f9de013f50b8709ccbd68ee782&q=${ingrArray.toString()}`)
  let data = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc?&api_key=c7cf7b22f11d0091d015ec5e5bbe8ca2`)
  console.log(data.data.results);
  return data.data.results
}

module.exports.getMovie = getMovie

async function getDetails(id) {
  let data = await axios.get(`http://api.themoviedb.org/3/movie/${id}?api_key=c7cf7b22f11d0091d015ec5e5bbe8ca2`)
  console.log(data.data);
  return data.data
}

module.exports.getDetails = getDetails
