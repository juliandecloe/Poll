# Poll

For the last assignment I had the opportunity to choose between a few cases. I chose for creating a poll. It is kind of a cool concept that people can create a poll and others can answer them. I need to work with saving data to a specific file which I have never done before, so it seems like a fun experiment! In this readme you will find my most important insights and explanations about specific parts of my work.

## Table of Contents
- [Demo](#demo-only-local)
- [User Story](#user-story)
- [Demo](#wireflow)
- [Core Functionality](#core-functionality)
- [Progressive Enhancement](#progressive-enhancement)

## Demo (only local)
*Only available on friday april 7th 2022*

## User Story
> I want to be able to present a poll to students with questions and answers during a lecture, and show the results immediately.

## Wireflow
![Poll-Wireflow](proces/wireflow.png)

## Core Functionality
In the wireflow above you can see the most important functionalities of the website. 
**There are three functions that fulfill the purpose of a poll:**
- Creating a poll
- Answering a poll
- See the results of a poll

It doesn't matter if javascript or css is disabled. These functions should always work on the website no matter what. If these functions work you got yourself a beautiful poll website right? Well... yes, but wouldn't it be way more beautiful if the website looks cooler and has some cool extra features? Of course it would, so keep on reading!

<p float="center">
  <img src="/proces/core-home.png" width="200" />
  <img src="/proces/core-admin.png" width="200" /> 
  <img src="/proces/core-results.png" width="200" />
</p>

## Progressive Enhancement

### What is Progressive Enhancement?
Once you have achieved the core functionality of your website, you can please the users using browsers with additional browser features by giving them extra features and styling that older or less advanced broswers don't have. It is a luxury really... but don't we love luxery!

### Progressive Enhancement for poll

#### Scroll To Top
I made a simple button that makes sure the user can go back up to the top of the page after scrolling for a while. I used `scrollTo` to set the new scrollposition.

```
function scrollingTop() {
    scrollBtn.classList.add('to-top')
    window.scrollTo(0, 0);
    setTimeout(function() { scrollBtn.classList.remove('to-top') }, 2000);
}

scrollBtn.addEventListener('click', function() {
    scrollingTop();
});

window.addEventListener('scroll', () => {
    if(window.location.pathname === "/") {
        if (window.scrollY < 50) {
            scrollBtn.classList.remove('show');
        } else {
            scrollBtn.classList.add('show'); 
        }
    } 
});
```

![ScrollToTop](proces/scrolltop.gif)

#### Darkmode
For the users that don't like a light themed website, I also made a dark mode option. To make sure it stays dark on every page and also on reload, I used `localStorage` as a checker to see if the darkmode option has been selected before. Everytime the users comes to the website, the website will still be darkmode.

```
let localDarkMode = localStorage.getItem('Dark Mode');

if(localDarkMode === 'on') {
    document.body.classList.add('darkmode');
    darkmodeSVG.forEach(svg => svg.classList.toggle('hide'));
}

function darkMode() {
    darkmodeSVG.forEach(svg => svg.classList.toggle('hide'));
    document.body.classList.toggle('darkmode');
    if(localDarkMode === 'on') {
        localDarkMode = 'off';
    } else {
        localDarkMode = 'on';
    }
    console.log(localDarkMode)
    localStorage.setItem('Dark Mode', localDarkMode);
}

darkmodeBtn.addEventListener('click', darkMode);
```

![Darkmode](proces/darkmode.gif)








