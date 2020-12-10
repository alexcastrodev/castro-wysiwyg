"use strict";
import * as Helpers from "./../core/helpers.js";

/**
 *
 * @param {array} context
 */
export default function (context) {
    context.forEach((functionName) => {
        createMainListener();
        functionName = functionName.toLowerCase();
        try {
            eval(functionName)();
        } catch (e) {
            throw `The plugin FontStyle "${functionName}" is not available \n ${e} \n Documentation: https://github.com/AlexcastroDev/castro-wysiwyg/wiki`;
        }
    });

    context.forEach((context) => {
        let fn = setInstructions.find((event) => event.name == context);
        fn.event();
    });
}

const createMainListener = () => {
    const el = document.getElementById("ce-settings-wrapper");
    const instructions = () => {
        window.castroEditorStore.current_setting = "fontStyle";
        Object.values(el.getElementsByClassName("ce-icon")).forEach(
            (element) => {
                element.id == "ce-s-fontStyle"
                    ? element.classList.add("ce-icon-active")
                    : element.classList.remove("ce-icon-active");
            }
        );
    };

    if (document.getElementById("ce-s-fontStyle") != null) {
        return;
    }

    el.innerHTML += `<div class="ce-icon" id="ce-s-fontStyle">
        <i class="ce-icon-dark icon-fontstyle"></i>
    </div>`;

    Helpers.addClickEvents(
        {
            id: "ce-s-fontStyle",
            origin: "fontStyle",
            instructions,
        },
        true
    );
};

/**
 *  Instructions
 */

const setInstructions = [
    {
        name: "bold",
        event: () => {
            Helpers.addClickEvents({
                id: "ce-s-fontStyle-bold",
                origin: "fontStyle",
                instructions: () => {
                    document.getElementById("ce-editable-content").focus();
                    document.execCommand("bold");
                },
            });
        },
    },
    {
        name: "italic",
        event: () => {
            Helpers.addClickEvents({
                id: "ce-s-fontStyle-italic",
                origin: "fontStyle",
                instructions: () => {
                    document.getElementById("ce-editable-content").focus();
                    document.execCommand("italic");
                },
            });
        },
    },
];

/**
 * Bold
 */

const bold = () => {
    let element = document.getElementById("ce-sub-settings-wrapper");

    element.innerHTML += ` <button class="ce-icon" id="ce-s-fontStyle-bold">
            <div class="ce-icon-dark icon-bold"></div>
        </button>`;
};

/**
 * Italic
 */

const italic = () => {
    let el = document.getElementById("ce-sub-settings-wrapper");

    el.innerHTML =
        el.innerHTML +
        ` <button class="ce-icon" id="ce-s-fontStyle-italic">
            <div class="ce-icon-dark icon-italic"></div>
        </button>`;
};
