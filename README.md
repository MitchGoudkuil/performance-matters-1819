# What to watch
By: Mitch Goudkuil

Rebuild of the oba project but with a new concept. Answer questions and get movies based on your preferences. A project with the purpose of getting to know compressions, minifying, and a lot more.

![Image from the interface](/img/whatto2.png) | ![Image from the interface](/img/whatto.png)
---|---

---

### Table of contents

* [Live Demo](#The-assignment)
* [Install](#install)
* [Usage](#Usage)
   * [Dynamically render questions](#Dynamically-render-questions)
   * [Setup questions](#Setup-questions)
* [External data Resources](#External-data-Resources)
* [First view](#First-view)
* [Repeat view](#Repeat-view)
* [Features list](#Features-list)
   * [Wishlist](#wishlist)

### Live Demo
<!-- [PokeSearch](https://mitchgoudkuil.github.io/web-app-from-scratch-18-19/week2) -->   

### Install
```bash
# git clone
git clone https://github.com/MitchGoudkuil/performance-matters-1819.git

cd performance-matters-1819

# dependencies
npm install

# start server
npm run dev
```

### Optimization

##### Dynamically render questions
When params is equal to the last in the questions array the question-template will be rendered.

```javascript
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
```

##### Setup questions
To set up the questions go to the questions.js file in the helpers directory and add questions like below. Answers can be as much as needed.
```javascript
{
  id: 1,
  img: "./img/",
  question: "Do you want to watch a movie or a serie?",
  tag: "First question",
  answers: [{answer: 'movie', img:"../img/film.svg"}, {answer:'serie', img:"../img/television.svg"}]
}
```

### Optimizations
To optimize the perceived performance I had a look at the First view and the Repeat view. I chose to do those two because I think it's important to make your site as accessible as possible. This means making the website load fast so the bounce rate drops and to save some of the website in the cache memory so if the user revisits the page will get loaded in quicker.

#### First view

##### Css minify:
To speed up the loading time of the home screen I started with minifying the css. I used sass during development so I could just run sass compressed to get the minified css file.
Before compiling the filesize was 9kb, not that much at all but I still wanted to look how small I could make it.
![Image from the interface](/img/css1.png)

After running :
Sass –watch style.scss:style.css –style compressed the filesize changed from 9kb to 6kb.  
![Image from the interface](/img/css2.png)

If my css file was bigger than this the result would be much higher but its still 30% reduction in filesize.

##### JS minify:
All the javascript that I used was server side rendered so I chose to import the greensock library so I had some javascript to minify. The GSAP library filesize is 377kb at the start with a 6ms loadingspeed.
![Image from the interface](/img/js1.png)

I used gulp to minify the file and change the name from gsap.js to gsap-min.js. After minify the filesize changed from 377kb to 113kb, which is a 60% reduction. As shown below:

![Image from the interface](/img/js2.png)


##### Compression
After minifying the css and the js files I used gzip Compression to change the content encoding. Now both of the files got another reduction in file size, changing the css file from 6 kb to 2.2kb and the gsap library from 113 to 38.3kb. This means that:
•	Css from 9kb  to  2.2kb  = almost 4 times faster
•	JS from 377kb to 38.3kb = almost 10 times faster

After gzip I tried to install the Brotli pre/compression but I failed doing so. I got it working in the project together with another student but somehow it didn't work for mine.


#### Repeat view
For the repeated view I wanted to cache files like css, images and custom fonts. At first I installed a npm package named express-cache-controller, but after being stuck and asking the teacher I found out that this was totally unnecessary.
I could just add the below piece of code which checks if the content stored in the cache is not a html structure. If it is, the file will not be excluded.
All files stored in the cache is stored there for a year.

```javascript

app.use((req, res, next) => {
  if (!req.headers.accept.includes('text/html')) {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 *
    60 + " ,public");
  }
 next();
});

```

##### Service worker
We had to install a service worker so we could show a page when surfing the wesite offline. The service worker caches the css, the home and offline page. Now if the application is offline you can still go to the home page.


### External data Resources
Npm packages used:
- axios
- Bodyparser
- compression
- clean-css-cli
- express
- express-handlebars
- gulp
- shrink-ray-current

Dev dependencies:
- nodemon
- gulp-clean-css
- gulp-cssnano
- gulp-rev-replace
- gulp-rename
- gulp-uglify
- readable-stream

---

### Features list

- [X] Minify files
- [X] Add compression
- [ ] Add Manifest
- [ ] add brotli compression and pre-compression
- [X] Dynamically render the questions
- [ ] Possibility to change the type of video and genre's to your liking
- [ ] Randomly pick a movie if the user can't choose.

### wishlist

- [ ] Save movies to your personal page
- [ ] Save used settings
- [ ] Edit made choices in genre's etc
- [ ] Make the application user friendly
- [X] Possibility to use the website while being offline
