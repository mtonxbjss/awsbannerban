const deleteSelectors = [
  'div[data-itemid="opt_out_banner"]',
  'div[data-testid="bellIcon-tooltip-popover"]',
  'div[data-testid="account-services-tooltip-popover"]',
  "div#aperture-csat-container",
  'div[data-itemid="CisAnnouncement"]',
  'div[data-itemid="AgentlessAnnouncement"]',
  'div[data-itemid="PullDateAnnouncement"]',
  'div[data-itemid="ActivateExistingAccountEc2DeepScanInfo"]',
  'div[data-itemid="deeplink-info-flash"]',
  'div[data-test-id="permanent-notification"]',
];

const hideSelectors = [
  'div.awsui-context-flashbar:not([data-analytics-flashbar="error"])',
];

const showSelectors = ['div[data-analytics-flashbar="error"]'];

let hiddenBanners = 0;

async function hideDivsWithClass() {
  let enabledStatus = await browser.runtime.sendMessage({ get_enabled: true });

  deleteSelectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      if (enabledStatus == "enabled") {
        console.info(`aws banner ban is deleting ${sel}`);
        div.remove();
      }
      hiddenBanners++;
    });
  });

  hideSelectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      if (enabledStatus == "enabled") {
        console.info(`aws banner ban is hiding ${sel}`);
        div.style.display = "none";
      }
      hiddenBanners++;
    });
  });

  showSelectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      if (enabledStatus == "enabled") {
        console.info(`aws banner ban is showing ${sel}`);
        div.style.display = "flex";
      }
      hiddenBanners--;
    });
  });

  console.info(
    `${hiddenBanners} AWS Flash banners${
      enabledStatus == "disabled" ? " would have been " : " "
    }hidden`
  );
  browser.runtime.sendMessage({ nuked: hiddenBanners.toString() });
}

// Hide banners that are visible when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  hideDivsWithClass();
});

// Hide banners that are added to the DOM after the page is loaded
const observer = new MutationObserver((mutations) => {
  hideDivsWithClass();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});
