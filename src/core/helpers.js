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
        let buttonsAvailable = document.getElementsByClassName(
            "ce-panel-items"
        )[0];

        Object.values(buttonsAvailable.getElementsByTagName("button")).forEach(
            (element) => {
                if (element.dataset.segment == origin && isMain) {
                    element.style.display = "block";
                }

                if (element.dataset.segment != origin && isMain) {
                    element.style.display = "none";
                }
            }
        );

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

export function createButtonIcon(origin, id, icon) {
    return `<button data-segment="${origin}" class="ce-icon" id="${id}">
            <div class="ce-icon-dark ${icon}"></div>
        </button>`;
}

export function getMethod(methods, constName) {
    return methods.find((method) => method.constName == constName);
}
