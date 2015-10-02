import {
  MESSAGES,
  SITES,
} from "./constants";


function notifySupportedSite(tab) {
  const url = tab.url;

  Object.keys(SITES).map((name) => {
    const domain = SITES[name];
    if (url && url.indexOf(domain) > -1) {
      chrome.tabs.sendMessage(tab.id, {
        "type": MESSAGES.ON_MANGA_SITE,
        "url": tab.url,
        "name": name,
      });
    }
  });
}

// tab load
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    notifySupportedSite(tab);
  }
});

// tab change
chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (tab) => {
    notifySupportedSite(tab);
  });
});
