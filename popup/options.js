var chkEnabled = document.getElementById("chkEnabled");
var lblEnabled = document.getElementById("lblEnabled");

document.addEventListener("DOMContentLoaded", async () => {
  let enabledStatus = await browser.runtime.sendMessage({ get_enabled: true });
  chkEnabled.checked = enabledStatus == "enabled" ? true : false;
  lblEnabled.innerText = enabledStatus;
});

chkEnabled.addEventListener("change", async (event) => {
  let enabledStatus = event.target.checked ? "enabled" : "disabled";
  lblEnabled.innerText = enabledStatus;
  await browser.runtime.sendMessage({ set_enabled: enabledStatus });
});
