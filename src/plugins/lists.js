"use strict";
import * as Helpers from "../core/helpers.js";

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
            throw `The plugin list "${functionName}" is not available \n ${e} \n Documentation: https://github.com/AlexcastroDev/castro-wysiwyg/wiki`;
        }
    });
}

const createMainListener = () => {
    const el = document.getElementById("ce-settings-wrapper");
    const instructions = () => {
        window.castroEditorStore.current_setting = "lists";
        Object.values(el.getElementsByClassName("ce-icon")).forEach(
            (element) => {
                element.id == "ce-s-lists"
                    ? element.classList.add("ce-icon-active")
                    : element.classList.remove("ce-icon-active");
            }
        );
    };

    if (document.getElementById("ce-s-lists") != null) {
        return;
    }

    el.innerHTML += `<div class="ce-icon" id="ce-s-lists">
        <i class="ce-icon-dark icon-list"></i>
    </div>`;

    window.castroEditorStore.listeners["lists"] = () => {
        Helpers.addClickEvents(
            {
                id: "ce-s-lists",
                origin: "lists",
                instructions,
            },
            true
        );
    };
};

const methods = [
    {
        id: "ce-s-list-unordered",
        icon: "icon-list-unordered",
        constName: "unordered",
        origin: "lists",
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
                        document.execCommand("insertUnorderedList");
                    },
                });
        },
    },
    {
        id: "ce-s-list-ordered",
        icon: "icon-list-ordered",
        constName: "ordered",
        origin: "lists",
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
                        document.execCommand("insertorderedlist");
                    },
                });
        },
    },
];
