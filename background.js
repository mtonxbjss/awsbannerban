browser.runtime.onMessage.addListener((request) => {
  switch (request.nuked) {
    case "0":
      browser.browserAction.setIcon({
        path: { 32: "icons/bannernuke-default.png" },
      });
      break;
    case "1":
      browser.browserAction.setIcon({
        path: { 32: "icons/bannernuke-1.png" },
      });
      break;
    case "2":
      browser.browserAction.setIcon({
        path: { 32: "icons/bannernuke-2.png" },
      });
      break;
    case "3":
      browser.browserAction.setIcon({
        path: { 32: "icons/bannernuke-3.png" },
      });
      break;
    default:
      browser.browserAction.setIcon({
        path: { 32: "icons/bannernuke-3.png" },
      });
      break;
  }
  console.log(`set icon to ${request.nuked}`);
});
