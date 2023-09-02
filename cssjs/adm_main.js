var newUserPasswordField = document.getElementById("newUserPassword");
var toggleNewUserPasswordButton = document.getElementById("toggleNewUserPassword");
const modal = document.getElementById('deleteModal');
toggleNewUserPasswordButton.addEventListener("click", function() {
  if (newUserPasswordField.type === "password") {
    newUserPasswordField.type = "text";
    toggleNewUserPasswordButton.textContent = "Hide";
  } else {
    newUserPasswordField.type = "password";
    toggleNewUserPasswordButton.textContent = "Show";
  }
});


// Id name email division byref create money img tref
function openImageModal(img) {
  var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
  imageModal.show();
  document.getElementById('image').src = `https://drive.google.com/uc?id=${img}&export=download`;
}



//New User


var input1 = document.getElementById('newUserName');
var input2 = document.getElementById('newUserEmail');
var input3 = document.getElementById('newUserDivision');
var input4 = document.getElementById('newUserPassword');
var input5 = document.getElementById('newUserRefcd');

fetch('asset/user.json')
  .then(response => response.json())
  .then(data => { cheack(data) })

function cheack(homeJson) {
  if (localStorage.getItem('_cookie_adm')) {
    return;
  } else {
    //window.location.href = `${window.location.origin}/ConneX/${homeJson.admhome}`
  }
}


function validation(event) {

  const inputValue1 = input1.value.trim();
  const inputValue2 = input2.value.trim();
  const inputValue3 = input3.value.trim();
  const inputValue4 = input4.value.trim();
  const inputValue5 = input5.value.trim();
  if (inputValue1 === '') {
    createToast("info", "Pls , Enter a Name !");
    return;
  }


  if (inputValue2 === '') {
    createToast("info", "Pls , Enter a Email !");
    return;
  }

  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (pattern.test(inputValue2) !== true) {
    createToast('info', 'Enter correct Email')
    return;
  }

  if (!(inputValue2.includes('@hotmail.') || inputValue2.includes('@gmail.'))) {
    createToast('info', 'Only available Google and hotmail ')
    return;
  }
  if (inputValue3 === '') {
    createToast("info", "Pls , Enter a Division !");
    return;
  }

  if (inputValue4 === '') {
    createToast("info", "Password must not be empty !");
    return;
  }


  if (inputValue5.length !== 6) {
    createToast("info", "Reffer ID's Length is 6 character !");
    event.preventDefault();
    return;
  };
  event.preventDefault();
  login(input1.value, input2.value, input3.value, inputValue4, input5.value);
};


function login(var1, var2, var3, var4, var5) {
  /* get True or False or hash code for save in local storage */

  //localStorage.setItem('_cookie_adm','sha256');
  disableAllButtons()
  var useragent = navigator.userAgent;
  var cookie_admin = localStorage.getItem('_cookie_adm');

  var link = "https://script.google.com/macros/s/AKfycbzryN-l8BjO1OqIy4ZVZvD2gIZ2CU1ZB0y9n_o5V-U9s19VL8oCEeeIKGmm-IpKruG2BQ/exec";
  const queryParams = new URLSearchParams({
    cookie_adm: cookie_admin,
    userAgent: useragent,
    name: var1,
    email: var2,
    division: var3,
    password: var4,
    refferid: var5
  });

  const url = `${link}?${queryParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => reTurn(data))
    .catch(error => createToast('error', 'Network Connection Error '));

  function reTurn(data) {
    if (data.sto) {
      var textToCopy = `ID : ${data.usr_id}\nPassword : ${data.usr_pas}`;
      copyToClipboard(textToCopy);
      createToast('success', 'Data Submitted Successfully ✅');
      addNewUser(data.usr_id, var1, var2, var3, var4, var5);
      enableAllButtons();
      modalcls(1);
    } else {
      document.getElementById('create').innerHTML = `<div class="title">Auth Error !</div>`;
      createToast('error', 'You have no access to Create Account 🚫');
      enableAllButtons();
    }
  };

};

function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};
// Function to add a new user
function addNewUser(id, var1, var2, var3, var4, var5) {
  // Generate a unique ID (you may need a more robust method in a real application)
  var newUserId = data123.length + 1;

  // Create a new user object
  var newUser = {
    id: parseInt(id),
    name: var1,
    email: var2,
    division: var3,
    byref: parseInt(var5),
    money: 0,
    img: '',
    tref: 0,
    date: new Date().toLocaleDateString('en-US', { month: 'short' })
  };
  // Add the new user to the data array
  data123.push(newUser);

  // Repopulate the table to display the new user
  populateTable(data123);
  document.getElementById('newUserform').reset();
};



function editRow(i) {
  document.getElementById('editUserName').value = data123[i].name;
  document.getElementById('editUserEmail').value = data123[i].email;
  document.getElementById('editUserDivision').value = data123[i].division;
  document.getElementById('fordel').setAttribute('onclick', `ser_editRow(${data123[i].id})`)
}

function ser_editRow(id) {
  disableAllButtons()
  var useragent = navigator.userAgent;
  var cookie_admin = localStorage.getItem('_cookie_adm');

  var link = "https://script.google.com/macros/s/AKfycbx7S3lqxS7JimMJpzLB2yc1MCexjfxpBdu__cV4tl0XW9AuqWHhI8AZuxU5EzqoHPcWww/exec";
  const queryParams = new URLSearchParams({
    cookie_adm: cookie_admin,
    userAgent: useragent,
    id: parseInt(id),
    name: document.getElementById('editUserName').value,
    email: document.getElementById('editUserEmail').value,
    division: document.getElementById('editUserDivision').value

  });
  const url = `${link}?${queryParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.sto) {
        enableAllButtons()
        createToast('success', 'Data Update Success Fully');
        modalcls(2);
      } else {
        enableAllButtons()
        createToast('info', 'Auth Error')
      }
    })
    .catch(error => {enableAllButtons()
      createToast('error', 'Network Error !')});
};
/////
var modal1 = document.getElementById('addUserModal');
var bootstrapModal1 = new bootstrap.Modal(modal1);
var modal2 = document.getElementById('updateUserModal');
var bootstrapModal2 = new bootstrap.Modal(modal2);

function modalcls(id) {
  if (id == 1) {
    bootstrapModal1.hide();
  }else{
    bootstrapModal2.hide();
  }
}