document.querySelectorAll("form").forEach((form) => {
  const nameInput = form.querySelector(".user-field input");
  const emailInput = form.querySelector(".email-field input");
  const passInput = form.querySelector(".password-field input");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isFormValid = true;

    if (nameInput) {
      const value = nameInput.value.trim();
      const isValid = value !== "";
      updateFieldState(nameInput, isValid, "This field cannot be empty");
      if (!isValid) isFormValid = false;
    }

    if (emailInput) {
      const email = emailInput.value;
      const isValid = validateEmail(email);
      updateFieldState(emailInput, isValid, "This is not a valid email");
      if (!isValid) isFormValid = false;
    }

    if (passInput) {
      const password = passInput.value;
      const isValid = validatePassword(password);
      updateFieldState(
        passInput,
        isValid,
        "Password must contain at least one special character, one digit, one lowercase and uppercase"
      );
      if (!isValid) isFormValid = false;
    }
  });
});

function updateFieldState(input, isValid, message) {
  const errorMessage = input.parentElement.nextElementSibling;
  if (isValid) {
    input.classList.add("success");
    input.classList.remove("error");
    if (errorMessage) {
      errorMessage.style.display = "none";
      errorMessage.textContent = "";
    }
  } else {
    input.classList.add("error");
    input.classList.remove("success");
    if (errorMessage) {
      errorMessage.style.display = "block";
      errorMessage.textContent = message;
    }
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}

// Password visibility toggler
document.querySelectorAll(".toggler").forEach((tglr) => {
  const passwordInput = tglr.previousElementSibling;
  tglr.addEventListener("click", () => {
    const show = passwordInput.type === "password";
    passwordInput.type = show ? "text" : "password";
    tglr.classList.toggle("ri-eye-line", show);
    tglr.classList.toggle("ri-eye-close-line", !show);
  });
});

// Form switchers
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

document.getElementById("login-link")?.addEventListener("click", () => {
  loginForm?.style.setProperty("display", "none");
  signupForm?.style.setProperty("display", "flex");
});

document.getElementById("signup-link")?.addEventListener("click", () => {
  signupForm?.style.setProperty("display", "none");
  loginForm?.style.setProperty("display", "flex");
});
