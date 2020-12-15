"use strict";
import * as Helpers from "./../core/helpers.js";

/**
 *
 * @param {array} context
 */
export default function (context) {
    context.forEach((functionName) => {
        try {
            createMainListener();
            functionName = functionName.toLowerCase();
            let method = Helpers.getMethod(methods, functionName);
            method.documentBuilder(method);
            method.documentEvent(method);
        } catch (e) {
            throw `The plugin colors "${functionName}" is not available \n ${e} \n Documentation: https://github.com/AlexcastroDev/castro-wysiwyg/wiki`;
        }
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

    window.castroEditorStore.listeners["fontStyle"] = () => {
        Helpers.addClickEvents(
            {
                id: "ce-s-fontStyle",
                origin: "fontStyle",
                instructions,
            },
            true
        );
    };
};

const methods = [
    {
        id: "ce-s-fontStyle-bold",
        icon: "icon-bold",
        origin: "fontStyle",
        constName: "bold",
        documentBuilder: (method) => {
            let el = document.getElementById("ce-sub-settings-wrapper");

            el.innerHTML =
                el.innerHTML +
                Helpers.createButtonIcon(method.origin, method.id, method.icon);
        },
        documentEvent: (method) => {
            window.castroEditorStore.listeners[method.constName] = () =>
                Helpers.addClickEvents({
                    id: method.id,
                    origin: method.constName,
                    instructions: () => {
                        document.getElementById("ce-editable-content").focus();
                        document.execCommand("bold");
                    },
                });
        },
    },
    {
        id: "ce-s-fontStyle-italic",
        icon: "icon-italic",
        constName: "italic",
        origin: "fontStyle",
        documentBuilder: (method) => {
            let el = document.getElementById("ce-sub-settings-wrapper");

            el.innerHTML =
                el.innerHTML +
                Helpers.createButtonIcon(method.origin, method.id, method.icon);
        },
        documentEvent: (method) => {
            window.castroEditorStore.listeners[method.constName] = () =>
                Helpers.addClickEvents({
                    id: method.id,
                    origin: method.constName,
                    instructions: () => {
                        document.getElementById("ce-editable-content").focus();
                        document.execCommand("italic");
                    },
                });
        },
    },
];
