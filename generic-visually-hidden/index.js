import { _ as _visuallyHidden } from '../visually-hidden-42b48050.js';

/** For usage inside a web component */

const hostVisuallyHidden = `
  :host {
    ${_visuallyHidden}
  }
`;

class GenericVisuallyHidden extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    this.removeAttribute('hidden');
    this.shadowRoot.innerHTML = `
      <style>
        ${hostVisuallyHidden}
      </style>

      <slot></slot>
    `;
  }

}

customElements.define('generic-visually-hidden', GenericVisuallyHidden);
