"use strict";
import castroEditor from "./core/setup.js";

const initCastroEditor = (elementId, settings) => {
    castroEditor(document.getElementById(elementId), settings);
};

window.castroEditor = initCastroEditor;
