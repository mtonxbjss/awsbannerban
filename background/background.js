browser.runtime.onMessage.addListener(async (message, sender) => {
  // get current enabled status
  let items = await browser.storage.session.get({ enabled: "enabled" });
  let bannerban_enabled = items.enabled;

  if (message.get_enabled) {
    return bannerban_enabled;
  }

  // set enabled status, if requested
  if (message.set_enabled) {
    await browser.storage.session.set({ enabled: message.set_enabled });
    icon =
      message.set_enabled == "enabled"
        ? "icons/bannerban-default.png"
        : "icons/bannerban-disabled.png";
    browser.browserAction.setIcon({
      path: { 32: icon },
    });
    return true;
  }

  if (message.banned) {
    if (bannerban_enabled == "disabled") {
      return false;
    }
    switch (message.banned) {
      case "0":
        browser.browserAction.setIcon({
          path: { 32: "icons/bannerban-default.png" },
        });
        break;
      case "1":
      case "2":
      case "3":
        browser.browserAction.setIcon({
          path: { 32: `icons/bannerban-${message.banned}.png` },
        });
        break;
      default:
        browser.browserAction.setIcon({
          path: { 32: "icons/bannerban-3.png" },
        });
        break;
    }
  }
});
