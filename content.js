// This const defines all HTML elements that manifest the annoying blue 
// AWS flash messages that appear at the top of the page and the even
// more annoying popups that appear when hovering over the bell icon.
const selectors = [
  'div[data-itemid="opt_out_banner"]',
  'div[data-testid="bellIcon-tooltip-popover"]',
  'div[data-testid="account-services-tooltip-popover"]',
  'li.awsui_flash-list-item_1q84n_9srp5_301',
  'li.awsui_flash-list-item_1q84n_n0k4e_301',
  'li.awsui_flash-list-item_1q84n_9srp5_301',
  'div#aperture-csat-container'
];

function hideDivsWithClass() {
  selectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    console.log(divs);
    divs.forEach((div) => {
      div.style.display = "none";
    });
  });
  console.info("AWS Flash banners hidden");
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
