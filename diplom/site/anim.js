function openModal(info) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = getInfoText(info);
    modal.style.display = "flex";
    modal.style.animation = "fadeIn 0.3s";
}

function closeModal() {
    const modal = document.getElementById("modal");
    setTimeout(() => {
        modal.style.display = "none";
    }, 0);
}

function getInfoText(info) {
    const infoTexts = {
        "info1": "Таинственное пророчество грядет...",
        "info2": "Смерть приходит ко всем...",
        "info3": "очко хахахахахаха"
    };
    return infoTexts[info] || "Неизвестная тайна...";
}

function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    if (chatInput.value.trim() !== "") {
        const message = document.createElement("p");
        message.textContent = chatInput.value;
        chatBox.appendChild(message);
        chatInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
