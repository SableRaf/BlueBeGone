function updateIcon(isEnabled) {
    const path = isEnabled
    ? {
        "16": "../assets/icon16.png",
        "48": "../assets/icon48.png",
        "128": "../assets/icon128.png",
    }
    : {
        "16": "../assets/icon_gray16.png",
        "48": "../assets/icon_gray48.png",
        "128": "../assets/icon_gray128.png",
    };
    
    chrome.action.setIcon({ path: path });
}

function updateToggle(isEnabled) {
    const toggle = document.getElementById("toggle");
    if (isEnabled) {
        toggle.textContent = "ON";
        toggle.style.backgroundColor = "#4cb34c";
        toggle.style.color = "#ffffff";
    } else {
        toggle.textContent = "OFF";
        toggle.style.backgroundColor = "#b34c4c";
        toggle.style.color = "#c8c8c8";
    }
}

async function toggle(){
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.storage.sync.get(["isEnabled"], (result) => {
        const isEnabled = !result.isEnabled;
        chrome.storage.sync.set({ isEnabled: isEnabled }, () => {
            updateIcon(isEnabled);
            updateToggle(isEnabled);
            chrome.tabs.sendMessage(tab.id, { isEnabled: isEnabled });
        });
    });
}

document.getElementById("toggle").addEventListener("click", toggle);
    
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["isEnabled"], (result) => {
        if(result.isEnabled !== undefined){
            updateIcon(result.isEnabled);
            updateToggle(result.isEnabled);
        }
        else{
            updateIcon(true);
            updateToggle(true);
            chrome.storage.sync.set({ isEnabled: true });
        }
    });
});