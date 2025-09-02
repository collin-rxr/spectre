
//        written by collin for spectre v0.3         //
//           last updated on 02-09-2025              //

const spectre_version = "v0.3" 

const searchbar = document.getElementById("searchbar")
const greeting = document.getElementById("greeting")
const helplist = document.getElementById("helplist")

const commands = {
  "/g": "https://google.com/search?q=",   
  "/ai": "https://perplexity.ai/search?q=",
  "/gpt": "https://chatgpt.com/?prompt=",
  "/yt": "https://youtube.com/results?search_query=",
  "/n": "https://netflix.com/search?q=",
  "/mk": "https://megakino.org/browse?keyword=",
  "/fp": "https://filmpalast.to/search/title/",
  "/s": "https://open.spotify.com/search/",
  "/gh": "https://github.com/search?q=",
  "/ddg": "https://duckduckgo.com/?q=",
  "/version": 'javascript:alert("Currently running spectre "+spectre_version);location.reload();//',
  "/help": 'javascript:var _ = "";Object.keys(commands).forEach(command => { _ = _ + command + " - " + commands_help[command] + "\\n" });searchbar.value="";alert(_);location.reload();//'
}

const commands_help = {
  "/g": "Search with Google",
  "/ai": "Ask Perplexity AI",
  "/gpt": "Ask ChatGPT",
  "/yt": "Search YouTube",
  "/n": "Search Netflix",
  "/mk": "Search Megakino",
  "/fp": "Search Filmpalast",
  "/s": "Search Spotify",
  "/gh": "Search GitHub",
  "/ddg": "Search with DuckDuckGo",
  "/version": "Show current version",
  "/help": "Show all commands"
}

var helplist_found_results = false

// ------------------------------------------------- //

function updateGreeting() {
  var date = new Date();
  var current_hour = date.getHours()
  if ( current_hour < 13 ) {
    greeting.innerText = "good morning.";
    document.title = "good morning.";
  } else if ( current_hour < 21 ) {
    greeting.innerText = "good afternoon.";
    document.title = "good afternoon.";
  } else {
    greeting.innerText = "good evening.";
    document.title = "good evening.";
  }
}

// ------------------------------------------------- //

function showHelpList () {
  helplist.style.display = "block";
}

function hideHelpList () {
  helplist.style.display = "none";
}

// ------------------------------------------------- //

function createHelpListEntry ( command ) {
  var h = document.createElement('p');
  h.innerHTML = command + " · " + commands_help[command];
  helplist.appendChild(h);
}

function clearHelpList ( command ) {
  helplist.innerHTML = ""
}

// ------------------------------------------------- //

searchbar.addEventListener("input", function () {
  if ( searchbar.value == "" ) {
    greeting.style.color = "#aaa";
    greeting.style.transform = "scale(1)";
    
    greeting.style.marginTop = "40vh";
    greeting.style.marginBottom = "20px";
    greeting.style.marginLeft = "0px";

    updateGreeting();
  } else {
    greeting.style.color = "#333";
    greeting.style.transform = "scale(0.7)";

    greeting.style.marginTop = "42vh";
    greeting.style.marginBottom = "-50px";
    greeting.style.marginLeft = "-40px";

    document.title = searchbar.value;
  }


  helplist_found_results = false;

  Object.keys(commands).forEach(command => {
    if ( searchbar.value.startsWith(command) ) {
      searchbar.style.color = "#ddd";

      helplist_found_results = true;
      clearHelpList();
      createHelpListEntry(command);
      showHelpList();
    }
  });

  if ( helplist_found_results == false ) {
    searchbar.style.color = "#aaa"
    clearHelpList();
    hideHelpList();
  }
});

// ------------------------------------------------- //

searchbar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if ( searchbar.value == "" ) {
      return
    }

    redirect = "https://google.com/search?q=" + encodeURIComponent(searchbar.value);

    Object.keys(commands).forEach(command => {
      if ( searchbar.value.startsWith(command) ) {
        var query = searchbar.value.replace(command, "").trim();
        redirect = commands[command] + encodeURIComponent(query);
      }
    });

    location.href = redirect;
  }
});

// ------------------------------------------------- //

searchbar.addEventListener("focus", function () {
  if ( helplist_found_results ) {
    showHelpList();
  } else {
    hideHelpList();
  }
});

searchbar.addEventListener("focusout", function () {
  hideHelpList();
});


// ------------------------------------------------- //

document.addEventListener('touchstart', function(e){
  e.preventDefault()
});

document.addEventListener('touchmove', function(e){
  e.preventDefault()
});


// ------------------------------------------------- //

window.onload = function() {
  updateGreeting()
  searchbar.focus();
};
