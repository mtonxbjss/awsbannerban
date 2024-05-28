browser.runtime.onMessage.addListener(async (message, sender) => {
  // set enabled status, if requested
  if (message.set_enabled) {
    await browser.storage.session.set({ enabled: message.set_enabled });
    return true;
  }

  if (message.get_enabled) {
    // get current enabled status
    let items = await browser.storage.session.get({ enabled: "enabled" });
    return items.enabled;
  }

  // get current enabled status
  let items = await browser.storage.session.get({ enabled: "enabled" });
  let bannernuke_enabled = items.enabled;

  // return early if disabled
  if (!bannernuke_enabled) {
    return false;
  }

  if (message.nuked) {
    switch (message.nuked) {
      case "0":
        browser.browserAction.setIcon({
          path: { 32: "icons/bannernuke-default.png" },
        });
        break;
      case "1":
      case "2":
      case "3":
        browser.browserAction.setIcon({
          path: { 32: `icons/bannernuke-${message.nuked}.png` },
        });
        break;
      default:
        browser.browserAction.setIcon({
          path: { 32: "icons/bannernuke-3.png" },
        });
        break;
    }
  }
});
