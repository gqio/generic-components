import { dialog } from "../dialog.js";
import "../index.js";
import {
  render,
  html,
} from "https://unpkg.com/lit-html@1.2.1/lit-html.js?module";

console.log("error");
closebtn.addEventListener("click", () => {
  myDialog.close();
});
closebtn2.addEventListener("click", () => {
  myDialog.close();
});
closebtn3.addEventListener("click", () => {
  myDialog.close();
});

defaultExample.addEventListener("click", (e) => {
  dialog.open({
    invokerNode: e.target,
    content: (dialogNode) => {
      dialogNode.innerHTML =
        "default example, closes on escape, and on outside click";

      const button = document.createElement("button");
      button.innerHTML = "close";

      button.addEventListener("click", () => {
        dialog.close();
      });

      dialogNode.appendChild(button);
    },
  });
});

closeOnEscape.addEventListener("click", (e) => {
  dialog.open({
    invokerNode: e.target,
    closeOnOutsideClick: false,
    content: (dialogNode) => {
      dialogNode.innerHTML = "only closes on escape";
      const button = document.createElement("button");
      button.innerHTML = "close";

      button.addEventListener("click", () => {
        dialog.close();
      });

      dialogNode.appendChild(button);
    },
  });
});

closeOnButtonClick.addEventListener("click", (e) => {
  dialog.open({
    invokerNode: e.target,
    closeOnEscape: false,
    closeOnOutsideClick: false,
    content: (dialogNode) => {
      dialogNode.innerHTML = "doesnt close on escape or outside click";
      const button = document.createElement("button");
      button.innerHTML = "close";

      button.addEventListener("click", () => {
        dialog.close();
      });

      dialogNode.appendChild(button);
    },
  });
});

litHtml.addEventListener("click", (e) => {
  dialog.open({
    invokerNode: e.target,
    content: (dialogNode) => {
      render(
        html`
          <h1>Im rendered by lit-html!</h1>
          <button @click=${() => dialog.close()}>Close</button>
          <button @click=${() => dialog.close()}>Close</button>
          <button @click=${() => dialog.close()}>Close</button>
        `,
        dialogNode
      );
    },
  });
});

dialog.addEventListener("dialog-opened", () => {
  console.log("dialog opened!");
});

dialog.addEventListener("dialog-closed", () => {
  console.log("dialog closed!");
});
