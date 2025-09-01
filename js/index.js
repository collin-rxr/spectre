
//        written by collin for spectre v0.1         //
//           last updated on 01-09-2025              //

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
  "/s": "https://open.spotify.com/search/",
  "/gh": "https://github.com/search?q=",
  "/ddg": "https://duckduckgo.com/?q="
}

const commands_help = {
  "/g": "Search with Google",
  "/ai": "Ask Perplexity AI",
  "/gpt": "Ask ChatGPT",
  "/yt": "Search YouTube",
  "/n": "Search Netflix",
  "/mk": "Search Megakino",
  "/s": "Search Spotify",
  "/gh": "Search GitHub",
  "/ddg": "Search with DuckDuckGo"
}

// ------------------------------------------------- //

function updateGreeting() {
  var date = new Date();
  var current_hour = date.getHours()
  if ( current_hour < 13 ) {
    greeting.innerText = "Good morning.";
  } else if ( current_hour < 21 ) {
    greeting.innerText = "Good afternoon.";
  } else {
    greeting.innerText = "Good evening.";
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
  h.innerHTML = command + " - " + commands_help[command];
  helplist.appendChild(h);
}

function clearHelpList ( command ) {
  helplist.innerHTML = ""
}

// ------------------------------------------------- //

searchbar.addEventListener("input", function () {
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

updateGreeting()

window.onload = function() {
  searchbar.focus();
};
