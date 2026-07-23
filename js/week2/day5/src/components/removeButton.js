import binSvg from "./svg/binSvg.js";

export default function removeButton(){
    return `<button class="rm-btn" data-action="remove-task">
                                ${binSvg()}
                            </button>`
}