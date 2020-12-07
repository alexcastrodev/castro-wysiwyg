"use strict";
import * as Helpers from "./../core/helpers.js";

const AVAILABLE_FUNCTIONS = ["bold"];

/**
 *
 * @param {array} context
 */
export default function (context) {
    context.forEach((functionName) => {
        functionName = functionName.toLowerCase();
        try {
            eval(functionName)();
        } catch (e) {
            throw `The plugin FontStyle "${functionName}" is not available \n ${e} \n Documentation: Not available yet`;
        }
    });
}

/**
 * Bold
 */

const bold = () => {
    let el = document.getElementById("ce-settings-wrapper");
    let el2 = document.getElementById("ce-sub-settings-wrapper");

    if (document.getElementById("ce-s-fontStyle") == null) {
        el.innerHTML =
            el.innerHTML +
            `<div class="ce-icon" id="ce-s-fontStyle">
            <div class="ce-icon-font"></div>
        </div>`;
    }

    el2.innerHTML =
        el2.innerHTML +
        ` <button class="ce-icon" id="ce-s-fontStyle-bold">
            <div class="ce-icon-font-bold"></div>
        </button>`;

    const instructions = () => {
        window.castroEditorStore.current_setting = "fontStyle";
    };

    Helpers.addClickEvents(
        {
            id: "ce-s-fontStyle",
            origin: "fontStyle",
            instructions,
        },
        true
    );

    const instructionsBold = () => {
        document.getElementById("ce-editable-content").focus();

        let range = window.getSelection().getRangeAt(0);
        if (range != null) {
            window.getSelection().addRange(range);
        }
        document.execCommand("bold");
    };

    Helpers.addClickEvents({
        id: "ce-s-fontStyle-bold",
        origin: "fontStyle",
        instructions: instructionsBold,
    });
};

/**
 * Italic
 */
