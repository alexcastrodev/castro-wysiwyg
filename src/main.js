'use strict'
import castroEditor from './plugins/castroEditor.js'
import { bold } from './plugins/fontStyle.js'

const initCastroEditor = (elementId) => {
    castroEditor(document.getElementById(elementId));
    createListeners()
}

function createListeners() {
    bold();
}

window.castroEditor = initCastroEditor;
