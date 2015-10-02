import {
  MESSAGES,
} from "./constants";
import readers from "./readers";


const ID = "yomimashou";

function loadReader(name, url) {
  if (document.getElementById(ID)) {
    // We already enhanced that page
    return;
  }
  // Set some kind of marker to not redo the whole thing
  const span = document.createElement("span");
  span.id = ID;
  document.getElementsByTagName("body")[0].appendChild(span);

  // ENHANCE!
  const reader = new readers[name](url);
  reader.enhance();
}

chrome.runtime.onMessage.addListener((request) => {
  switch (request.type) {
    case MESSAGES.ON_MANGA_SITE:
      loadReader(request.name, request.url);
      break;
    default:
      break;
  }
});
