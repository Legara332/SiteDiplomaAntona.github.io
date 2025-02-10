function openModal(info) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = getInfoText(info);
    modal.style.display = "flex";
    modal.style.animation = "fadeIn 0.3s";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fade-out");
    }, 300);
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

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".icon").addEventListener("click", openPanel);
    document.querySelector(".close-panel").addEventListener("click", closePanel);
    
    document.querySelectorAll(".center-panel-toggle").forEach(button => {
        button.addEventListener("click", function() {
            const panel = this.nextElementSibling;
            panel.classList.toggle("active");
        });
    });
    
    document.querySelectorAll(".panel-icons .icon").forEach(icon => {
        icon.addEventListener("click", function() {
            const targetPanel = document.getElementById(this.dataset.target);
            if (targetPanel) {
                targetPanel.classList.toggle("active");
            }
        });
    });
});

function openPanel() {
    document.getElementById("sidePanel").classList.add("active");
}

function closePanel() {
    document.getElementById("sidePanel").classList.remove("active");
}

function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    if (chatInput.value.trim() !== "") {
        const message = document.createElement("div");
        message.textContent = chatInput.value;
        chatBox.appendChild(message);
        chatInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function toggleCenterPanel(panelId) {
    document.getElementById(panelId).classList.toggle("active");
}

document.querySelectorAll(".center-panel-button").forEach(button => {
    button.addEventListener("click", function() {
        const panel = document.getElementById(this.dataset.target);
        panel.classList.toggle("active");
    });
});

document.querySelectorAll(".close-center-panel").forEach(button => {
    button.addEventListener("click", function() {
        this.closest(".center-panel").classList.remove("active");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".panel-icons .icon").forEach(icon => {
        icon.addEventListener("click", function(event) {
            event.stopPropagation();
            const info = this.getAttribute("data-info");
            openModal(info);
        });
    });

    document.addEventListener("click", function(event) {
        const modal = document.getElementById("modal");
        const modalContent = document.querySelector(".modal-content");

        if (modal.style.display === "flex" && !modalContent.contains(event.target) && event.target !== modalContent) {
            closeModal();
        }
    });

    document.querySelector(".close").addEventListener("click", function(event) {
        event.stopPropagation();
        closeModal();
    });
});

function openModal(info) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = getInfoText(info);
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fade-out");
    }, 300);
}

function getInfoText(info) {
    const infoTexts = {
        "info1": "Информация для иконки 1.",
        "info2": "Информация для иконки 2.",
        "info3": "Информация для иконки 3."
    };
    return infoTexts[info] || "Неизвестная информация...";
}

document.addEventListener("DOMContentLoaded", function() {
    const chatInput = document.getElementById("chat-input");

    chatInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Предотвращаем отправку формы
            sendMessage();
        }
    });

    document.querySelectorAll(".panel-icons .icon").forEach(icon => {
        icon.addEventListener("click", function(event) {
            event.stopPropagation();
            const info = this.getAttribute("data-info");
            openModal(info);
        });
    });

    document.addEventListener("click", function(event) {
        const modal = document.getElementById("modal");
        const modalContent = document.querySelector(".modal-content");

        if (modal.style.display === "flex" && !modalContent.contains(event.target) && event.target !== modalContent) {
            closeModal();
        }
    });

    document.querySelector(".close").addEventListener("click", function(event) {
        event.stopPropagation();
        closeModal();
    });
});

function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    if (chatInput.value.trim() !== "") {
        const message = document.createElement("div");
        message.textContent = chatInput.value;
        chatBox.appendChild(message);
        chatInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function openModal(info) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = getInfoText(info);
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("fade-out");
    }, 300);
}

function getInfoText(info) {
    const infoTexts = {
        "info1": "Информация для иконки 1.",
        "info2": "Информация для иконки 2.",
        "info3": "Информация для иконки 3."
    };
    return infoTexts[info] || "Неизвестная информация...";
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".login a").addEventListener("click", function(event) {
        event.preventDefault();
        openLoginModal();
    });
});

function openLoginModal() {
    const modal = document.getElementById("login-modal");
    modal.style.display = "flex";
}

function closeLoginModal() {
    const modal = document.getElementById("login-modal");
    modal.style.display = "none";
}

function login() {
    alert("Вход выполнен!");
    closeLoginModal();
}

function openRegisterModal() {
    alert("Открытие окна регистрации!");
    closeLoginModal();
}
function goToPage(page) {
  window.location.href = page;
}
