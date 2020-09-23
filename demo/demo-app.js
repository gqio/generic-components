import '../SelectedMixin-ae217ba9.js';
import '../keycodes-7142cdc2.js';
import '../generic-tabs/index.js';
import '../generic-accordion/index.js';
import '../index-849026ac.js';
import '../generic-disclosure/index.js';
import '../visually-hidden-42b48050.js';
import '../generic-skiplink/index.js';
import '../generic-alert/index.js';
import '../generic-switch/index.js';

switchEl.addEventListener("checked-changed", e => {
  if (e.detail) {
    switchAlert.style.display = "block";
  } else {
    switchAlert.style.display = "none";
  }
});
closebtn.addEventListener("click", () => {
  myDialog.close();
});
