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
        window.castroEditorStore.current_setting = "colors";
        Object.values(el.getElementsByClassName("ce-icon")).forEach(
            (element) => {
                element.id == "ce-s-colors"
                    ? element.classList.add("ce-icon-active")
                    : element.classList.remove("ce-icon-active");
            }
        );
    };

    if (document.getElementById("ce-s-colors") != null) {
        return;
    }

    el.innerHTML += `<div class="ce-icon" id="ce-s-colors">
        <i class="ce-icon-dark icon-brush"></i>
    </div>`;

    window.castroEditorStore.listeners["colors"] = () => {
        Helpers.addClickEvents(
            {
                id: "ce-s-colors",
                origin: "colors",
                instructions,
            },
            true
        );
    };
};

const methods = [
    {
        id: "ce-s-colors-textColor",
        icon: "icon-paint-bucket",
        constName: "textcolor",
        origin: "colors",
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
                        document.createElement("div");
                        let colorPicker = document.createElement("div");
                        document
                            .getElementById("ce-sub-settings-wrapper")
                            .appendChild(colorPicker)
                            .classList.add("color-picker");
                        let divsColors = ["fff", "000", "ccc", "13c4a3"]
                            .map(
                                (color, key) =>
                                    `<div style='background-color: #${color}' class='color-round color-${key}'></div>`
                            )
                            .join("");
                        document.getElementsByClassName(
                            "color-picker"
                        )[0].innerHTML += `<div id="color-picker-list">${divsColors}<input type="color" placeholder='#ffffff'></div>`;
                    },
                });
        },
    },
    {
        id: "ce-s-colors-backgroundColor",
        icon: "icon-background-color",
        constName: "backgroundcolor",
        origin: "colors",
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
                        document.execCommand(
                            "backgroundColor",
                            false,
                            "#bbbbbb"
                        );
                    },
                });
        },
    },
];
