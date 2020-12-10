"use strict";

const toggleSubmenu = () => {
    if (window.castroEditorStore.model) {
        document
            .getElementById("ce-panel-wrapper")
            .classList.add("ce-panel-items__active");
    } else {
        document
            .getElementById("ce-panel-wrapper")
            .classList.remove("ce-panel-items__active");
    }
};

/**
 *
 * @param {Function} instructions
 * @param {Boolean} isMain
 */
export function addClickEvents({ id, origin, instructions }, isMain = false) {
    document.getElementById(id).addEventListener("click", function () {
        if (
            (window.castroEditorStore.current_setting == origin && isMain) ||
            (window.castroEditorStore.current_setting.length == 0 && isMain)
        ) {
            window.castroEditorStore.model = !window.castroEditorStore.model;
        }

        instructions();
        toggleSubmenu();
    });
}
