"use strict";
import fontStyle from "./../plugins/fontStyle.js";
import colors from "./../plugins/colors.js";
import alignment from "../plugins/alignment.js";

function castroEditor(element, context) {
    try {
        window.castroEditorStore = {
            current_setting: "",
            model: false,
            listeners: {},
        };
        createComponent(element);
        installPlugins(context);
        Object.values(window.castroEditorStore.listeners).forEach((listeners) =>
            listeners()
        );
    } catch (e) {
        throw `[castro editor]: ${e}`;
    }
}

function createComponent(element) {
    window.castroEditorStore.counter = counter;
    element.innerHTML = `<div id="ce-wrapper">
        <div class="ce-panel">
            <div class="ce-settings" id="ce-settings-wrapper"></div>
        </div>
        <div class="ce-panel-items" id="ce-panel-wrapper">
            <div class="ce-settings sub-settings" id="ce-sub-settings-wrapper"></div>
        </div>
        <div class="ce-editable" onkeyup="window.castroEditorStore.counter()">
            <div id="ce-editable-content" contenteditable="true"></div>
        </div>
        <div class="ce-panel ce-panel-footer">
            <div id="counter">
                <span> Characters: <strong>0</strong></span>
            </div>
        </div>

        </div>
    </div>`;
}

function counter() {
    const trim = (string) => {
        return string.replace(/\s/g, "");
    };
    let el = document.getElementById("ce-editable-content").innerText;
    let char = (trim(el) || "").length;
    el = document.getElementById("counter");
    el.getElementsByTagName("strong")[0].innerText = char;
}

function installPlugins({ plugins }) {
    let plugs = plugins || {};
    fontStyle(plugs.fontStyle || []);
    colors(plugs.colors || []);
    alignment(plugs.aligment || []);
}

export default castroEditor;
