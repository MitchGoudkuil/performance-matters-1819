# Assignments Week 2
Minor Web Development - Performance Matters


### Assignment 1: Optimize the perceived performance
To optimize the percieved performance I had a look at the First view and the Repeat view. I chose to do those two because I think it's important to make your site as accessible as possible. This means making the website load fast so the bounce rate drops and to save some of the website in the cache memory so if the user revisits the page will get loaded in quicker.

#### First view:

###### Css minify:
To speed up the loading time of the home screen I started with minifying the css. I used sass during development so I could just run sass compressed to get the minified css file.
Before compiling the filesize was 9kb, not that much at all but I still wanted to look how small I could make it.
![Image from the interface](/img/css1.png)

After running :
Sass –watch style.scss:style.css –style compressed the filesize changed from 9kb to 6kb.  
![Image from the interface](/img/css2.png)

If my css file was bigger than this the result would be much higher but its still 30% reduction in filesize.

###### JS minify:
All the javascript that I used was server side rendered so I chose to import the greensock library so I had some javascript to minify. The GSAP library filesize is 377kb at the start with a 6ms loadingspeed.
![Image from the interface](/img/js1.png)

I used gulp to minify the file and change the name from gsap.js to gsap-min.js. After minify the filesize changed from 377kb to 113kb, which is a 60% reduction. As shown below:

![Image from the interface](/img/js2.png)

After minifying the css and the js files I used gzip Compression to change the content encoding. Now both of the files got another reduction in file size, changing the css file from 6 kb to 2.2kb and the gsap library from 113 to 38.3kb. This means that:
•	Css from 9kb  to  2.2kb  = almost 4 times faster
•	JS from 377kb to 38.3kb = almost 10 times faster


##### Repeat view
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



#### Resources
