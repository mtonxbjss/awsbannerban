browser.runtime.onMessage.addListener(async (message, sender) => {
  // get current enabled status
  let items = await browser.storage.local.get({ enabled: "enabled" });
  let bannerban_enabled = items.enabled;

  // return enabled status, if requested
  if (message.get_enabled) {
    return bannerban_enabled;
  }

  // set enabled status, if requested
  if (message.set_enabled) {
    await browser.storage.local.set({ enabled: message.set_enabled });
    icon =
      message.set_enabled == "enabled"
        ? "icons/bannerban-default.png"
        : "icons/bannerban-disabled.png";
    browser.browserAction.setIcon({
      path: { 32: icon },
    });
    return true;
  }

  // update the extension icon in response to banned banners
  if (message.banned) {
    if (bannerban_enabled == "disabled") {
      return false;
    } else if (message.banned == "0") {
      browser.browserAction.setIcon({
        path: { 32: "icons/bannerban-default.png" },
      });
    } else {
      browser.browserAction.setIcon({
        path: { 32: `icons/bannerban-${Math.min(message.banned, 3)}.png` },
      });
    }
    return true;
  }
});
