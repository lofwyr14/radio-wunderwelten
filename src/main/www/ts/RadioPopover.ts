class RadioPopover extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.info("popover connectedCallback()");
        // @ts-ignore
        // console.info("Popover", Popover);
        // @ts-ignore
        const popover = new bootstrap.Popover(this);
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    window.customElements.define("radio-popover", RadioPopover);
});
