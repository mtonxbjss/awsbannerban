// This function hides all div elements with the class 'awsui-context-flashbar', which are the annoying blue AWS flash messages that appear at the top of the page.
const selectors = [
  'div[data-analytics-flashbar="info"]',
  'div[data-itemid="opt_out_banner"]',
  'div[data-testid="bellIcon-tooltip-popover"]',
  'div[data-testid="account-services-tooltip-popover"]',
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
