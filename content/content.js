// This const defines all HTML elements that manifest the annoying blue
// AWS flash messages that appear at the top of the page and the even
// more annoying popups that appear when hovering over the bell icon.

const selectors = [
  'div[data-itemid="opt_out_banner"]',
  'div[data-testid="bellIcon-tooltip-popover"]',
  'div[data-testid="account-services-tooltip-popover"]',
  "div#aperture-csat-container",
  'div[data-itemid="CisAnnouncement"]',
  'div[data-itemid="AgentlessAnnouncement"]',
  'div[data-itemid="PullDateAnnouncement"]',
  'div[data-itemid="ActivateExistingAccountEc2DeepScanInfo"]'
];


// do not use... used by red error boxes
// 'div[data-analytics-flashbar="info"]',
// "li.awsui_flash-list-item_1q84n_1q5xi_301",
// "div.awsui_flashbar_1q84n_1q5xi_723",

let hiddenBanners = 0;

async function hideDivsWithClass() {
  let enabledStatus = await browser.runtime.sendMessage({ get_enabled: true });

  selectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      console.info(sel);
      if (enabledStatus == "enabled") {
        div.style.display = "none";
        div.remove();
      }
      hiddenBanners++;
    });
  });
  
  console.info(`${hiddenBanners} AWS Flash banners ${enabledStatus == "disabled" ? "would have been" : ""} hidden`);
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
