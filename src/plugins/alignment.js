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
            throw `The plugin alignment "${functionName}" is not available \n ${e} \n Documentation: https://github.com/AlexcastroDev/castro-wysiwyg/wiki`;
        }
    });
}

const createMainListener = () => {
    const el = document.getElementById("ce-settings-wrapper");
    const instructions = () => {
        window.castroEditorStore.current_setting = "alignment";
        Object.values(el.getElementsByClassName("ce-icon")).forEach(
            (element) => {
                element.id == "ce-s-alignment"
                    ? element.classList.add("ce-icon-active")
                    : element.classList.remove("ce-icon-active");
            }
        );
    };

    if (document.getElementById("ce-s-alignment") != null) {
        return;
    }

    el.innerHTML += `<div class="ce-icon" id="ce-s-alignment">
        <i class="ce-icon-dark icon-align-justify"></i>
    </div>`;

    window.castroEditorStore.listeners["alignment"] = () => {
        Helpers.addClickEvents(
            {
                id: "ce-s-alignment",
                origin: "alignment",
                instructions,
            },
            true
        );
    };
};

const methods = [
    {
        id: "ce-s-alignment-alignLeft",
        icon: "icon-align-left",
        constName: "alignleft",
        origin: "alignment",
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
                        document.execCommand("JustifyLeft", false, "");
                    },
                });
        },
    },
    {
        id: "ce-s-alignment-alignCenter",
        icon: "icon-align-center",
        constName: "aligncenter",
        origin: "alignment",
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
                        document.execCommand("JustifyCenter", false, "");
                    },
                });
        },
    },
    {
        id: "ce-s-alignment-alignRight",
        icon: "icon-align-right",
        constName: "alignright",
        origin: "alignment",
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
                        document.execCommand("JustifyRight", false, "");
                    },
                });
        },
    },
];
