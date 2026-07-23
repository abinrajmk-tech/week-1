import tickSvg from "./svg/tickSvg.js";

export default function completeButton(){
    return ` <div class="completeBtn">
                                <button class="complete " data-action='complete'>
                                    ${tickSvg()}
                                    <span class="complete-text">Complete</span>
                                </button>
                            </div>`
}