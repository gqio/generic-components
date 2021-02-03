import "~/generic-tabs/index.js";
import "~/generic-accordion/index.js";
import "~/generic-disclosure/index.js";
import "~/generic-dialog/index.js";
import "~/generic-skiplink/index.js";
import "~/generic-alert/index.js";
import "~/generic-switch/index.js";

switchEl.addEventListener("checked-changed", (e) => {
  if (e.detail) {
    switchAlert.style.display = "block";
  } else {
    switchAlert.style.display = "none";
  }
});
closebtn.addEventListener("click", () => {
  myDialog.close();
});
