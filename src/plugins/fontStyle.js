'use strict'

const fontStyle = {
    toBold: () => {
        restoreSel();
        document.execCommand('bold');
    }
}

const savedRange = () => {
    return window.getSelection().getRangeAt(0);
}

const restoreSel = () => {
    document.getElementById('ce-editable-content').focus()
    if (savedRange() != null) {
            window.getSelection().addRange(savedRange());
    }
}

export const bold = () => {
    document.getElementById("ce-icon-font-bold").addEventListener("click", function(event) {
        fontStyle.toBold()
    });
}
