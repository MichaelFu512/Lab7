// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

//Copy and pasted from https://developers.google.com/web/fundamentals/primers/service-workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        //Change to entry when clicked
        newPost.addEventListener('click', () => {
          let numEntry = router.numEntry(entry); 
          window.history.pushState({page_id: 1, entry: entry}, "", "#entry" + numEntry); 
          setState(entry); 
        });
      });
    });

    //click title 
    document.querySelector("h1").addEventListener("click", ()=> {
      window.history.pushState({page_id:0}, "", window.origin);
      setState();
    });

    //click setting
    document.querySelector("img").addEventListener("click", ()=> {
        window.history.pushState({page_id: 2}, "", "#settings");
        setState();
    });

    //click back arrow
    window.addEventListener("popstate", (event) => {
      if(event.state == null) {
        setState();
      }
    });
});
