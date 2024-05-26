browser.runtime.onMessage.addListener(notify);

function notify(message) {
  switch(message) {
    case "1":
      browser.browserAction.setIcon({ path: "icons/awsbannernuke-32-1.png" });
    case "2":
      browser.browserAction.setIcon({ path: "icons/awsbannernuke-32-2.png" });
    case "3":
      browser.browserAction.setIcon({ path: "icons/awsbannernuke-32-3.png" });
    default:
      browser.browserAction.setIcon({ path: "icons/awsbannernuke-32.png" });
  }
}
