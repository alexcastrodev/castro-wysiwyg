"use strict";
import castroEditor from "./core/setup.js";

const initCastroEditor = (elementId, settings = {}) => {
    try {
        castroEditor(document.getElementById(elementId), settings);
    } catch (e) {
        console.warn("[Castro Editor]:" + e);
    }
};

window.castroEditor = initCastroEditor;
