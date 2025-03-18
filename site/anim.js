import { supabase, signUp, signIn, getCurrentUser } from './supabaseClient.js';

window.register = async function() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;

  if (password !== confirm) {
    alert("Пароли не совпадают!");
    return;
  }

  const { error } = await registerUser(email, password);
  if (!error) {
    alert("Регистрация успешна!");
    closeRegisterModal();
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log("Статус подтверждения:", user?.email_confirmed_at);
  }
};

function openPhotoModal(info, imageUrl) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  
  modalText.innerHTML = `
    <div class="modal-content-wrapper">
      <img src="${imageUrl}" class="modal-image">
      <div class="modal-text-content">${info}</div>
    </div>
  `;
  
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

window.sendMessage = async function() {
  const chatInput = document.getElementById("chat-input");
  const messageText = chatInput.value.trim();

  if (!messageText) return;

  const { data: { user } } = await getCurrentUser();
  
  if (!user) {
    alert("Войдите в аккаунт!");
    return;
  }

  const { error } = await supabase
    .from('messages')
    .insert([{ 
      content: messageText,
      user_id: user.id 
    }]);

  if (error) {
    alert("Ошибка отправки: " + error.message);
  } else {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("p");
    messageElement.textContent = `${user.email}: ${messageText}`;
    chatBox.appendChild(messageElement);
    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
};

  document.querySelectorAll(".photo-icon").forEach((img) => {
      img.addEventListener("click", function(event) {
          event.stopPropagation();
          const info = this.getAttribute("data-info");
          const imageUrl = this.getAttribute("data-image");
          openPhotoModal(info, imageUrl);
      });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".center-panel-toggle").forEach((button) => {
      button.addEventListener("click", function() {
        const panel = this.nextElementSibling;
        panel.classList.toggle("active");
        
        document.querySelectorAll(".center-panel").forEach(otherPanel => {
          if(otherPanel !== panel) otherPanel.classList.remove("active");
        });
      });
    });
  
    document.querySelectorAll(".close-panel").forEach(btn => {
      btn.addEventListener("click", function() {
        this.closest(".center-panel").classList.remove("active");
      });
    });
  });

function openPanel() {
  document.getElementById("sidePanel").classList.add("active");
}

function closePanel() {
  document.getElementById("sidePanel").classList.remove("active");
}

function toggleCenterPanel(panelId) {
  document.getElementById(panelId).classList.toggle("active");
}

document.querySelectorAll(".center-panel-button").forEach((button) => {
  button.addEventListener("click", function () {
    const panel = document.getElementById(this.dataset.target);
    panel.classList.toggle("active");
  });
});

document.querySelectorAll(".close-center-panel").forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".center-panel").classList.remove("active");
  });
});

document.querySelectorAll(".panel-icons .photo-icon").forEach((img) => {
  img.addEventListener("click", function (event) {
    event.stopPropagation();
    const info = this.getAttribute("data-info");
    const imageUrl = this.getAttribute("data-image");
    openPhotoModal(info, imageUrl); 
  });
});

  document.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");

    if (
      modal.style.display === "flex" &&
      !modalContent.contains(event.target) &&
      event.target !== modalContent
    ) {
      closeModal();
    }
  });

  document.querySelector(".close").addEventListener("click", function (event) {
    event.stopPropagation();
    closeModal();
  });

document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.getElementById("chat-input");

  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  document.querySelectorAll(".panel-icons .icon").forEach((icon) => {
    icon.addEventListener("click", function (event) {
      event.stopPropagation();
      const info = this.getAttribute("data-info");
      openModal(info);
    });
  });

  document.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");

    if (
      modal.style.display === "flex" &&
      !modalContent.contains(event.target) &&
      event.target !== modalContent
    ) {
      closeModal();
    }
  });

  document.querySelector(".close").addEventListener("click", function (event) {
    event.stopPropagation();
    closeModal();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".login a")
    .addEventListener("click", function (event) {
      event.preventDefault();
      openLoginModal();
    });
});

window.openLoginModal = function() {
  document.getElementById("login-modal").style.display = "flex";
};

window.closeLoginModal = function() {
  document.getElementById("login-modal").style.display = "none";
};

window.register = async function() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;

  if (password !== confirm) {
    alert("Пароли не совпадают!");
    return;
  }

  const { error } = await signUp(email, password); 
  if (error) {
    alert("Ошибка: " + error.message);
  } else {
    alert("Подтвердите email!");
    closeRegisterModal();
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log("Статус подтверждения:", user?.email_confirmed_at);
  }
};

function openRegisterModal() {
  closeLoginModal();
  document.getElementById("register-modal").style.display = "flex";
}

function closeRegisterModal() {
  document.getElementById("register-modal").style.display = "none";
}

async function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;

  if(password !== confirm) {
    alert("Пароли не совпадают!");
    return;
  }

  const { error } = await supabase
    .from('users')
    .insert([{ login: email, password: password }]);

  if (error) {
    alert("Ошибка регистрации: " + error.message);
  } else {
    alert("Регистрация успешна!");
    closeRegisterModal();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".nav-button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let page = this.getAttribute("data-page");
      window.location.href = page;
    });
  });
});

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input');
      let isValid = true;

      inputs.forEach(input => {
          if(!input.checkValidity()) {
              input.classList.add('invalid');
              isValid = false;
          }
      });

      if(!isValid) {
          e.preventDefault();
          alert('Заполните все поля корректно!');
      }
  });
});

const passwordFields = document.querySelectorAll('input[type="password"]');
passwordFields.forEach(field => {
  field.addEventListener('input', function() {
      if(this.name === 'confirm_password' && 
         this.value !== document.querySelector('[name="password"]').value) {
          this.setCustomValidity('Пароли не совпадают');
      } else {
          this.setCustomValidity('');
      }
  });
});

window.openRegisterModal = function() {
  closeLoginModal();
  document.getElementById("register-modal").style.display = "flex";
};

window.closeRegisterModal = function() {
  document.getElementById("register-modal").style.display = "none";
};

document.addEventListener("DOMContentLoaded", async () => {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('content, user_id, profiles (email)')
    .order('created_at', { ascending: true });

  if (!error) {
    const chatBox = document.getElementById("chat-box");
    messages.forEach(msg => {
      const messageElement = document.createElement("p");
      messageElement.textContent = `${msg.profiles.email}: ${msg.content}`;
      chatBox.appendChild(messageElement);
    });
  }
});

supabase.auth.onAuthStateChange(async (event) => {
  const user = (await supabase.auth.getUser()).data.user;
  
  const loginLink = document.getElementById("login-link");
  const accountLink = document.getElementById("account-link");
  const logoutBtn = document.getElementById("logout-btn");
  
  if (user) {
    accountLink.style.display = "inline";
    logoutBtn.style.display = "inline";
    loginLink.style.display = "none";
    closeLoginModal();
    closeRegisterModal();
  } else {
    accountLink.style.display = "none";
    logoutBtn.style.display = "none";
    loginLink.style.display = "inline";
  }
});

window.logout = async function() {
  await supabase.auth.signOut();
  
  document.getElementById("account-link").style.display = "none";
  document.getElementById("logout-btn").style.display = "none";
  document.getElementById("login-link").style.display = "inline";
  
  if (window.location.pathname.endsWith('/account.html')) {
    window.location.href = 'index.html';
  }
};

window.login = async function() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { error } = await signIn(email, password);

  if (!error) {
      window.location.href = 'index.html';
      const loginButton = document.getElementById('loginButton');
      if (loginButton) {
          loginButton.textContent = 'Личный кабинет';
          loginButton.onclick = function() {
              window.location.href = 'account.html';
          };
      }
  }
};


window.resendConfirmation = async function() {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email: document.getElementById("register-email").value
  });

  if (error) {
    alert("Ошибка: " + error.message);
  } else {
    alert("Письмо отправлено повторно!");
  }
};

document.querySelectorAll(".photo-icon").forEach(img => {
  img.style.transition = "transform 0.3s, box-shadow 0.3s";
});

//  ▄▄▄       ██░ ██ ▄▄▄█████▓ ▒█████   ██░ ██
// ▒████▄    ▓██░ ██▒▓  ██▒ ▓▒▒██▒  ██▒▓██░ ██▒
// ▒██  ▀█▄  ▒██▀▀██░▒ ▓██░ ▒░▒██░  ██▒▒██▀▀██░
// ░██▄▄▄▄██ ░▓█ ░██ ░ ▓██▓ ░ ▒██   ██░░▓█ ░██
//  ▓█   ▓██▒░▓█▒░██▓  ▒██▒ ░ ░ ████▓▒░░▓█▒░██▓
//  ▒▒   ▓▒█░ ▒ ░░▒░▒  ▒ ░░   ░ ▒░▒░▒░  ▒ ░░▒░▒
//   ▒   ▒▒ ░ ▒ ░▒░ ░    ░      ░ ▒ ▒░  ▒ ░▒░ ░
//   ░   ▒    ░  ░░ ░  ░      ░ ░ ░ ▒   ░  ░░ ░
//       ░  ░ ░  ░  ░             ░ ░   ░  ░  ░
//                              .-----.
//                             /   .  (
//                            /   .-.  \
//                           /   /   \  \
//                          / `  )   (   )
//                         / `   )   ).  \
//                       .'  _.   \_/  . |
//      .--.           .' _.' )`.        |
//     (    `---...._.'   `---.'_)    ..  \
//      \            `----....___    `. \  |
//       `.           _ ----- _   `._  )/  |
//         `.       /"  \   /"  \`.  `._   |
//           `.    (( )` ) (( )` ) `.   `._\
//             `-- '`---'   `---' )  `.    `-.
//                /                  ` \      `-.
//              .'                      `.       `.
//             /                     `  ` `.       `-.
//      .--.   \ ===._____.======. `    `   `. .___.--`     .''''.
//     ' .` `-. `.                )`. `   ` ` \          .' . '   )
//    (   .  ` `-.`.               ( .  ` `  .`\      .'  '    ' /
//     \  `. `    `-.               ) ` .   ` ` \  .'   ' .  '  /
//      \ ` `.  ` . \`.    .--.     |  ` ) `   .``/   '  // .  /
//       `.  ``. .   \ \   .-- `.  (  ` /_   ` . / ' .  '/   .'
//         `. ` \  `  \ \  '-.   `-'  .'  `-.  `   .  .'/  .'
//           \ `.`.  ` \ \    ) /`._.`       `.  ` .  .'  /
//            |  `.`. . \ \  (.'               `.   .'  .'
//         __/  .. \ \ ` ) \                     \.' .. \__
//  .-._.-'     '"  ) .-'   `.                   (  '"     `-._.--.
// (_________.-====' / .' /\_)`--..__________..-- `====-. _________)
//                 (.'(.'
