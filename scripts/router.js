// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */

router.setState = function(entry) {
  //setting page
  if(window.location.hash == "#settings"){
    document.querySelector("body").setAttribute("class", "settings");
    document.querySelector('h1').innerHTML = "Settings";
  }
  //home page
  else if(window.location.hash == "") {
    document.querySelector("body").setAttribute("class", "");
    document.querySelector('h1').innerHTML = "Journal Entries";
  }
  //entry page
  else {
    let numEntry = router.numEntry(entry);
    document.querySelector("body").setAttribute("class", "single-entry");
    document.querySelector('h1').innerHTML = "Entry " + numEntry;

    document.querySelector("entry-page").remove();
    let p = document.createElement("entry-page");
    document.querySelector("body").appendChild(p);
    document.querySelector("entry-page").entry =entry;
    
  }
}


router.numEntry = function(entry) {
  let entries = document.querySelector("main").children;
  let numEntry = 0;
  //console.log(entry.length);
  if(entry) {
    for (let i = 0; i < entries.length; i++) {
      if(entries[i].entry.title == entry.title) {
        numEntry = i + 1;
      }
    }
  }
  //console.log("From router " + numEntry);
  return numEntry;
}