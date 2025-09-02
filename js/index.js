
//        written by collin for spectre v0.5         //
//           last updated on 02-09-2025              //

const spectre_version = "v0.5" 

const searchbar = document.getElementById("searchbar")
const greeting = document.getElementById("greeting")
const helplist = document.getElementById("helplist")
const footer = document.getElementById("footer")

const commands = {
  "/g": "https://google.com/search?q=",   
  "/ai": "https://perplexity.ai/search?q=",
  "/gpt": "https://chatgpt.com/?prompt=",
  "/yt": "https://youtube.com/results?search_query=",
  "/iv": "https://yewtu.be/search?q=",
  "/n": "https://netflix.com/search?q=",
  "/mk": "https://megakino.org/browse?keyword=",
  "/fp": "https://filmpalast.to/search/title/",
  "/s": "https://open.spotify.com/search/",
  "/gh": "https://github.com/search?q=",
  "/ddg": "https://duckduckgo.com/?q=",
  "/version": 'javascript:alert("Spectre "+spectre_version);location.reload();//',
  "/help": 'javascript:var _ = "";Object.keys(commands).forEach(command => { _ = _ + command + " - " + commands_en[command] + "\\n" });searchbar.value="";alert(_);location.reload();//'
}

const commands_en = {
  "/g": "Search with Google",
  "/ai": "Ask Perplexity AI",
  "/gpt": "Ask ChatGPT",
  "/yt": "Search YouTube",
  "/iv": "Search Invidious",
  "/n": "Search Netflix",
  "/mk": "Search Megakino",
  "/fp": "Search Filmpalast",
  "/s": "Search Spotify",
  "/gh": "Search GitHub",
  "/ddg": "Search with DuckDuckGo",
  "/version": "Show current version",
  "/help": "Show all commands"
}

const commands_de = {
  "/g": "Mit Google suchen",
  "/ai": "Perplexity KI fragen",
  "/gpt": "ChatGPT fragen",
  "/yt": "YouTube durchsuchen",
  "/iv": "Invidious durchsuchen",
  "/n": "Netflix durchsuchen",
  "/mk": "Megakino durchsuchen",
  "/fp": "Filmpalast durchsuchen",
  "/s": "Spotify durchsuchen",
  "/gh": "GitHub durchsuchen",
  "/ddg": "Mit DuckDuckGo suchen",
  "/version": "Aktuelle Version anzeigen",
  "/help": "Alle Befehle zeigen"
}

var helplist_found_results = false

// ------------------------------------------------- //

function updateGreeting() {
  var date = new Date();
  var current_hour = date.getHours()
  if ( current_hour < 13 ) {
    if ( navigator.language == "de-DE" ) {
      var g = "Guten Morgen.";
    } else {
      var g = "Good morning.";
    }
  } else if ( current_hour < 19 ) {
    if ( navigator.language == "de-DE" ) {
      var g = "Guten Nachmittag.";
    } else {
      var g = "Good afternoon.";
    }
  } else {
    if ( navigator.language == "de-DE" ) {
      var g = "Guten Abend.";
    } else {
      var g = "Good evening.";
    }
  }

  greeting.innerText = g;
  document.title = g;
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
  if ( navigator.language == "de-DE" ) {
    h.innerHTML = command + " · " + commands_de[command];
  } else {
    h.innerHTML = command + " · " + commands_en[command];
  }
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
    
    footer.style.marginBottom = "0px"

    updateGreeting();
  } else {
    greeting.style.color = "#333";
    greeting.style.transform = "scale(0.7)";

    greeting.style.marginTop = "42vh";
    greeting.style.marginBottom = "-50px";
    greeting.style.marginLeft = "-40px";

    footer.style.marginBottom = "-30px"
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
  if ( navigator.language == "de-DE" ) {
    searchbar.placeholder = "Was liegt dir so auf dem Herzen?";
  }

  footer.innerText = "Spectre "+spectre_version+" · /help"

  updateGreeting()
  setInterval(function(){
    updateGreeting()
  }, 30000)

  searchbar.focus();
};
