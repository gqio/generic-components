import { K as KEYCODES } from './keycodes-7142cdc2.js';

class EventTargetShim {
  constructor() {
    const delegate = document.createDocumentFragment();
    this.addEventListener = delegate.addEventListener.bind(delegate);
    this.dispatchEvent = delegate.dispatchEvent.bind(delegate);
    this.removeEventListener = delegate.removeEventListener.bind(delegate);
  }

}

function queryShadowRoot(root,skipNode,isMatch,maxDepth=20,depth=0){let matches=[];if(depth>=maxDepth){return matches}const traverseSlot=$slot=>{const assignedNodes=$slot.assignedNodes().filter(node=>node.nodeType===1);if(assignedNodes.length>0){return queryShadowRoot(assignedNodes[0].parentElement,skipNode,isMatch,maxDepth,depth+1)}return []};const children=Array.from(root.children||[]);for(const $child of children){if(skipNode($child)){continue}if(isMatch($child)){matches.push($child);}if($child.shadowRoot!=null){matches.push(...queryShadowRoot($child.shadowRoot,skipNode,isMatch,maxDepth,depth+1));}else if($child.tagName==="SLOT"){matches.push(...traverseSlot($child));}else {matches.push(...queryShadowRoot($child,skipNode,isMatch,maxDepth,depth+1));}}return matches}function isHidden($elem){return $elem.hasAttribute("hidden")||$elem.hasAttribute("aria-hidden")&&$elem.getAttribute("aria-hidden")!=="false"||$elem.style.display===`none`||$elem.style.opacity===`0`||$elem.style.visibility===`hidden`||$elem.style.visibility===`collapse`}function isDisabled($elem){return $elem.hasAttribute("disabled")||$elem.hasAttribute("aria-disabled")&&$elem.getAttribute("aria-disabled")!=="false"}function isFocusable($elem){if($elem.getAttribute("tabindex")==="-1"||isHidden($elem)||isDisabled($elem)){return false}return $elem.hasAttribute("tabindex")||($elem instanceof HTMLAnchorElement||$elem instanceof HTMLAreaElement)&&$elem.hasAttribute("href")||($elem instanceof HTMLButtonElement||$elem instanceof HTMLInputElement||$elem instanceof HTMLTextAreaElement||$elem instanceof HTMLSelectElement)||$elem instanceof HTMLIFrameElement}const timeouts=new Map;function debounce(cb,ms,id){const timeout=timeouts.get(id);if(timeout!=null){window.clearTimeout(timeout);}timeouts.set(id,window.setTimeout(()=>{cb();timeouts.delete(id);},ms));}const template=document.createElement("template");template.innerHTML=`\n\t<div id="start"></div>\n\t<div id="backup"></div>\n\t<slot></slot>\n\t<div id="end"></div>\n`;class FocusTrap extends HTMLElement{constructor(){super();this.debounceId=Math.random().toString();this._focused=false;const shadow=this.attachShadow({mode:"open"});shadow.appendChild(template.content.cloneNode(true));this.$backup=shadow.querySelector("#backup");this.$start=shadow.querySelector("#start");this.$end=shadow.querySelector("#end");this.focusLastElement=this.focusLastElement.bind(this);this.focusFirstElement=this.focusFirstElement.bind(this);this.onFocusIn=this.onFocusIn.bind(this);this.onFocusOut=this.onFocusOut.bind(this);}static get observedAttributes(){return ["inactive"]}get inactive(){return this.hasAttribute("inactive")}set inactive(value){value?this.setAttribute("inactive",""):this.removeAttribute("inactive");}get focused(){return this._focused}connectedCallback(){this.$start.addEventListener("focus",this.focusLastElement);this.$end.addEventListener("focus",this.focusFirstElement);this.addEventListener("focusin",this.onFocusIn);this.addEventListener("focusout",this.onFocusOut);this.render();}disconnectedCallback(){this.$start.removeEventListener("focus",this.focusLastElement);this.$end.removeEventListener("focus",this.focusFirstElement);this.removeEventListener("focusin",this.onFocusIn);this.removeEventListener("focusout",this.onFocusOut);}attributeChangedCallback(){this.render();}focusFirstElement(){this.trapFocus();}focusLastElement(){this.trapFocus(true);}getFocusableElements(){return queryShadowRoot(this,isHidden,isFocusable)}trapFocus(trapToEnd){if(this.inactive)return;let focusableChildren=this.getFocusableElements();if(focusableChildren.length>0){if(trapToEnd){focusableChildren[focusableChildren.length-1].focus();}else {focusableChildren[0].focus();}this.$backup.setAttribute("tabindex","-1");}else {this.$backup.setAttribute("tabindex","0");this.$backup.focus();}}onFocusIn(){this.updateFocused(true);}onFocusOut(){this.updateFocused(false);}updateFocused(value){debounce(()=>{if(this.focused!==value){this._focused=value;this.render();}},0,this.debounceId);}render(){this.$start.setAttribute("tabindex",!this.focused||this.inactive?`-1`:`0`);this.$end.setAttribute("tabindex",!this.focused||this.inactive?`-1`:`0`);this.focused?this.setAttribute("focused",""):this.removeAttribute("focused");}}window.customElements.define("focus-trap",FocusTrap);var index=Object.freeze({__proto__:null,queryShadowRoot:queryShadowRoot,isHidden:isHidden,isDisabled:isDisabled,isFocusable:isFocusable,FocusTrap:FocusTrap});

// eslint-disable-next-line
const template$1 = document.createElement("template");
template$1.innerHTML = `
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
class GenericDialogOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template$1.content.cloneNode(true));
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
    ["click", "blur"].forEach(event => {
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
    if (!e.composedPath().includes(this.dialog) && dialog.__dialogOpen && dialog.__closeOnOutsideClick) {
      dialog.close();
    }
  }

}
customElements.define("generic-dialog-overlay", GenericDialogOverlay);

class Dialog extends EventTargetShim {
  open({
    closeOnEscape = true,
    closeOnOutsideClick = true,
    invokerNode,
    content
  }) {
    this.__dialogOpen = true;
    this.__invokerNode = invokerNode;
    this.__closeOnEscape = closeOnEscape;
    this.__closeOnOutsideClick = closeOnOutsideClick;

    if (this.__closeOnEscape) {
      window.addEventListener('keydown', this.__onKeyDown.bind(this), true);
    }

    [...document.body.children].forEach(node => {
      if (node.localName !== 'script') {
        if (!node.hasAttribute('aria-hidden')) {
          node.setAttribute('dialog-disabled', '');
          node.setAttribute('aria-hidden', 'true');
          node.setAttribute('inert', '');
        }
      }
    });
    const dialogOverlay = document.createElement('generic-dialog-overlay');
    this.__dialogOverlay = dialogOverlay;

    if (this.__closeOnOutsideClick) {
      dialogOverlay.setAttribute('close-on-outside-click', '');
    }

    document.body.appendChild(dialogOverlay);
    content(dialogOverlay);
    this.dispatchEvent(new Event('dialog-opened'));
  } // eslint-disable-next-line


  close() {
    this.__dialogOpen = false;
    [...document.body.children].forEach(node => {
      if (node.localName !== 'script') {
        if (node.hasAttribute('dialog-disabled')) {
          node.removeAttribute('dialog-disabled');
          node.removeAttribute('aria-hidden');
          node.removeAttribute('inert');
        }
      }
    });
    document.querySelector('generic-dialog-overlay').remove();

    this.__invokerNode.focus();

    this.__invokerNode = null;
    this.dispatchEvent(new Event('dialog-closed'));
  }

  __onKeyDown(e) {
    if (e.keyCode === KEYCODES.ESC && this.__dialogOpen && this.__closeOnEscape) {
      this.close();
      window.removeEventListener('keydown', this.__onKeyDown.bind(this), true);
    }
  }

}

const dialog = new Dialog();

const template$2 = document.createElement('template');
template$2.innerHTML = `
  <slot name="invoker">
    <button>open dialog</button>
  </slot>

  <slot hidden name="content">
  </slot>
`;
class GenericDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
  }

  close() {
    this.content.forEach(element => {
      element.setAttribute('hidden', '');
      element.setAttribute('slot', 'content');
      this.append(element);
    });
    dialog.close();
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template$2.content.cloneNode(true));
    const invoker = this.shadowRoot.querySelector('slot[name="invoker"]');
    this.content = this.shadowRoot.querySelector('slot[name="content"]').assignedNodes();
    invoker.addEventListener('click', e => {
      dialog.open({
        invokerNode: e.target,
        closeOnEscape: this.hasAttribute('close-on-escape'),
        closeOnOutsideClick: this.hasAttribute('close-on-outside-click'),
        content: dialogNode => {
          this.content.forEach(element => {
            element.removeAttribute('hidden');
            element.removeAttribute('slot');
            dialogNode.append(element);
          });
        }
      });
    });
    dialog.addEventListener('dialog-opened', () => {
      this.dispatchEvent(new CustomEvent('dialog-opened', {
        detail: true
      }));
    });
    dialog.addEventListener('dialog-closed', () => {
      this.dispatchEvent(new CustomEvent('dialog-closed', {
        detail: true
      }));
    });
  }

}

customElements.define('generic-dialog', GenericDialog);

export { dialog as d };
