// This function hides all div elements with the class 'awsui-context-flashbar', which are the annoying blue AWS flash messages that appear at the top of the page.
function hideDivsWithClass() {
  const selectors = [
    'div[data-analytics-flashbar="info"]',
    'div[data-itemid="opt_out_banner"]',
  ];

  selectors.forEach((sel) => {
    const divs = document.querySelectorAll(sel);
    divs.forEach((div) => {
      div.style.display = "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  hideDivsWithClass();
});

const observer = new MutationObserver((mutations) => {
  hideDivsWithClass();
});

observer.observe(document.body, { childList: true, subtree: true });

// Call the function to hide the divs
hideDivsWithClass();
