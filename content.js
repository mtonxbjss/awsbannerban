// This const defines all HTML elements that manifest the annoying blue
// AWS flash messages that appear at the top of the page and the even
// more annoying popups that appear when hovering over the bell icon.

const selectors = [
  'div[data-itemid="opt_out_banner"]',
  'div[data-testid="bellIcon-tooltip-popover"]',
  'div[data-testid="account-services-tooltip-popover"]',
  "li.awsui_flash-list-item_1q84n_9srp5_301",
  "li.awsui_flash-list-item_1q84n_n0k4e_301",
  "li.awsui_flash-list-item_1q84n_9srp5_301",
  "li.awsui_flash-list-item_1q84n_1q5xi_301",
  "li.awsui_flash-type-info_1q84n_1q5xi_913",
  "div.awsui_flashbar_1q84n_1q5xi_723",
  "div#aperture-csat-container",
];

function hideDivsWithClass() {
  let hiddenBanners = 0;

  selectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    console.log(divs);
    divs.forEach((div) => {
      div.style.display = "none";
      hiddenBanners++;
    });
  });

  console.info(`${hiddenBanners} AWS Flash banners hidden`);

  // Send a message to the background script
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
