const ENABLED = "enabled";
const DISABLED = "disabled";
const DEFAULT_ICON = "icons/bannerban-default.png";
const DISABLED_ICON = "icons/bannerban-disabled.png";

function getIconPath(bannedCount) {
  if (bannedCount === "0") {
    return DEFAULT_ICON;
  } else {
    return `icons/bannerban-${Math.min(bannedCount, 3)}.png`;
  }
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  try {
    // get current enabled status
    let items = await browser.storage.local.get({ enabled: ENABLED });
    let bannerban_enabled = items.enabled;

    // return enabled status, if requested
    if (message.get_enabled) {
      return bannerban_enabled;
    }

    // set enabled status, if requested
    if (message.set_enabled) {
      await browser.storage.local.set({ enabled: message.set_enabled });
      let icon = message.set_enabled == ENABLED ? DEFAULT_ICON : DISABLED_ICON;
      browser.browserAction.setIcon({ path: { 32: icon } });
      return true;
    }

    // update the extension icon in response to banned banners
    if (message.banned) {
      if (bannerban_enabled == DISABLED) {
        return false;
      } else {
        let icon = getIconPath(message.banned);
        browser.browserAction.setIcon({ path: { 32: icon } });
        return true;
      }
    }
  } catch (err) {
    console.error(`An error occurred in the background script: ${err}`);
  }
});
