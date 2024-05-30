browser.runtime.onMessage.addListener(async (message, sender) => {
  // get current enabled status
  let items = await browser.storage.session.get({ enabled: "enabled" });
  let bannernuke_enabled = items.enabled;

  if (message.get_enabled) {
    return bannernuke_enabled;
  }

  // set enabled status, if requested
  if (message.set_enabled) {
    await browser.storage.session.set({ enabled: message.set_enabled });
    icon =
      message.set_enabled == "enabled"
        ? "icons/bannernuke-default.png"
        : "icons/bannernuke-disabled.png";
    browser.browserAction.setIcon({
      path: { 32: icon },
    });
    return true;
  }

  if (message.nuked) {
    if (bannernuke_enabled == "disabled") {
      return false;
    }
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
