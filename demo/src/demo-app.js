import "../../tabs.js";
import "../../accordion.js";
import "../../disclosure.js";
import "../../dialog.js";
import "../../skiplink.js";
import "../../alert.js";
import "../../switch.js";

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
