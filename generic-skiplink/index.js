import { _ as _visuallyHidden } from '../visually-hidden-42b48050.js';

const skiplink = `
  a[skiplink] {
    ${_visuallyHidden}
  }

  a[skiplink]:focus {
    position: absolute;
    top: 0px;
    left: 0px;
    height: auto;
    width: auto;
    margin: auto;
    opacity: 1;
    pointer-events: auto;
    background-color: white;
  }
`;

/**
 * @element generic-skiplink
 *
 * @csspart anchor
 */

class GenericSkiplink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['for'];
  }

  attributeChangedCallback(name) {
    if (name === 'for') {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${skiplink}
      </style>

      <a
        skiplink
        part="anchor"
        class="skiplink"
        href="#${this.getAttribute('for')}">
          <slot>Continue to main</slot>
      </a>
    `;
  }

}

customElements.define('generic-skiplink', GenericSkiplink);
