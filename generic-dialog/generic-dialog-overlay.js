// eslint-disable-next-line
import { dialog } from "./dialog.js";
import "@a11y/focus-trap";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
    }

    [part="dialog"] {
      width: auto;
      height: auto;
      background-color: white;
    }
  </style>
  <focus-trap>
    <div role="dialog" part="dialog"><slot></slot></div>
  </focus-trap>
`;

export class GenericDialogOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.__onClick = this.__onClick.bind(this);
    this.__onFocusIn = this.__onFocusIn.bind(this);
  }

  connectedCallback() {
    if (this.hasAttribute("close-on-outside-click")) {
      this.addEventListener("click", this.__onClick, true);
    }

    this.dialog = this.shadowRoot.querySelector("[role='dialog']");
    this.dialog.setAttribute("tabindex", "-1");
    this.dialog.focus();

    ["click", "blur"].forEach((event) => {
      this.dialog.addEventListener(event, () => {
        this.dialog.removeAttribute("tabindex");
      });
    });

    window.addEventListener("focusin", this.__onFocusIn);
  }

  disconnectedCallback() {
    window.removeEventListener("focusin", this.__onFocusIn);
  }

  __onFocusIn() {
    if (dialog.__dialogOpen) {
      if (!this.contains(document.activeElement)) {
        this.dialog.setAttribute("tabindex", "-1");
        this.dialog.focus();
      }
    }
  }

  __onClick(e) {
    if (
      !e.composedPath().includes(this.dialog) &&
      dialog.__dialogOpen &&
      dialog.__closeOnOutsideClick
    ) {
      dialog.close();
    }
  }
}

customElements.define("generic-dialog-overlay", GenericDialogOverlay);
