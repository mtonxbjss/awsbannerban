const ENABLED = "enabled";
const DISABLED = "disabled";
const DISPLAY_HIDE = "none";
const DISPLAY_SHOW = "flex";

const deleteSelectors = [
  'div[data-itemid="opt_out_banner"]',
  "div#aperture-csat-container",
  'div[data-itemid="CisAnnouncement"]',
  'div[data-itemid="AgentlessAnnouncement"]',
  'div[data-itemid="PullDateAnnouncement"]',
  'div[data-itemid="ActivateExistingAccountEc2DeepScanInfo"]',
  'div[data-itemid="deeplink-info-flash"]',
  'div[data-test-id="permanent-notification"]',
  "div.awsui-context-alert",
];

const hideSelectors = [
  'div[data-testid="bellIcon-tooltip-popover"]',
  'div[data-testid="account-services-tooltip-popover"]',
  'div.awsui-context-flashbar:not([data-analytics-flashbar="error"])',
];

const showSelectors = ['div[data-analytics-flashbar="error"]'];

let hiddenBanners = 0;

async function manageBanners() {
  let enabledStatus = await browser.runtime.sendMessage({ get_enabled: true });

  deleteSelectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      if (enabledStatus == ENABLED) {
        console.info(`aws banner ban is deleting ${sel}`);
        div.remove();
      }
      hiddenBanners++;
    });
  });

  hideSelectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      if (enabledStatus == ENABLED) {
        console.info(`aws banner ban is hiding ${sel}`);
        div.style.display = DISPLAY_HIDE;
      }
      hiddenBanners++;
    });
  });

  showSelectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      if (enabledStatus == ENABLED) {
        console.info(`aws banner ban is showing ${sel}`);
        div.style.display = DISPLAY_SHOW;
      }
      hiddenBanners--;
    });
  });

  console.info(
    `${hiddenBanners} AWS Flash banners${
      enabledStatus == DISABLED ? " would have been " : " "
    }hidden`
  );
  browser.runtime.sendMessage({ banned: hiddenBanners.toString() });
}

// Hide banners that are visible when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  manageBanners();
});

// Hide banners that are added to the DOM after the page is loaded
const observer = new MutationObserver(async (mutations) => {
  let hideDivs = false;
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      hideDivs = true;
    }
  });
  if (hideDivs) {
    await manageBanners();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
