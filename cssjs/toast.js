const notifications = document.querySelector(".notifications");

const toastDetails = {
  timer: 5000,
  success: {
    icon: 'fa-circle-check',
    text: 'Success: This is a success toast.',
  },
  error: {
    icon: 'fa-circle-xmark',
    text: 'Error: This is an error toast.',
  },
  warning: {
    icon: 'fa-triangle-exclamation',
    text: 'Warning: This is a warning toast.',
  },
  info: {
    icon: 'fa-circle-info',
    text: 'Info: This is an information toast.',
  }
}

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
  setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id, text) => {
  // Getting the icon and text for the toast based on the id passed
  const { icon } = toastDetails[id];
  const toast = document.createElement("li"); // Creating a new 'li' element for the toast
  toast.className = `toast ${id}`; // Setting the classes for the toast
  // Setting the inner HTML for the toast
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast); // Append the toast to the notification ul
  // Setting a timeout to remove the toast after the specified duration
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// Adding a click event listener to each button to create a toast when click





function passShow(id1, id2) {

  var passwordShow = document.getElementById(id1)

  const type = passwordShow.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordShow.setAttribute('type', type);
  // toggle the eye slash icon
  document.getElementById(id2).classList.toggle('fa-eye');
  document.getElementById(id2).classList.toggle('fa-eye-slash');
}





function disableAllButtons() {
  var buttons = document.querySelectorAll("button"); // Select all buttons on the page
  buttons.forEach(function(button) {
    button.disabled = true;
  });
}

// Function to enable all buttons
function enableAllButtons() {
  var buttons = document.querySelectorAll("button"); // Select all buttons on the page
  buttons.forEach(function(button) {
    button.disabled = false;
  });
}






