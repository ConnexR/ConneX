var cookie_usr = localStorage.getItem('_cookie_usr');


if (cookie_usr === null) {

  fetch('asset/user.json')
    .then(response => response.json())
    .then(data => {
      window.location.href = `${window.location.origin}/ConneX/${data.usrhome}`
    })
  //document.getElementById('log_out').style.display = 'null';
} else {
  document.getElementById('log_out').style.display = 'block';
  //console.log('Ok cookie')
}
//Log upt funtion

document.getElementById('log_out').addEventListener('click', () => {
  localStorage.removeItem('_cookie_usr');
  fetch('asset/user.json')
    .then(response => response.json())
    .then(data => {
      window.location.href = `${window.location.origin}/ConneX/${data.usrhome}`
    })
})
//pad funtion
function pad(input, length, padChar, padEnd = false) {
  const inputString = String(input);

  if (inputString.length >= length) {
    return inputString;
  }

  const padding = padChar.repeat(length - inputString.length);

  return padEnd ? inputString + padding : padding + inputString;
}

function check() {
  loading()
  var link = "https://script.google.com/macros/s/AKfycbzulPTFww9ndGOt9j1RS8yog3Muyfeh9z7190AiSlx3Q60N-zYFrzvOXk73h7wYtgXs/exec"
  const queryParams = new URLSearchParams({
    cookie_usr: cookie_usr
  });

  const url = `${link}?${queryParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => reTurn(data))
    .catch(error => {
      createToast('error', 'Network conection Error | Cookie Error ')
    })



  function reTurn(responseData) {
    if (responseData.sto === true) {
      setup(responseData.vAlue);
    } else {

      createToast('error', 'Wrong Password or invaild ID 🚫');
    };
  }

};

check();


function setup(resobj) {
  //console.log(resobj);
  home()
  taka = 0 + resobj.money;


  profilelink = resobj.img;
  username = resobj.name;
  userid = pad(resobj.id, 6, '0');
  tref = resobj.tref;
  usermail = resobj.email;
  userdivision = resobj.division;

  const inputDate = new Date(resobj.date);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = inputDate.getUTCDate();
  const month = months[inputDate.getUTCMonth()];

  const formattedDate = `${day} ${month}`;

  userdate = formattedDate;
  refferid = pad(resobj.reffer, 6, '0');;
};



function cashout() {
  disableAllButtons()
  var link = 'https://script.google.com/macros/s/AKfycbwq4PcWCap0vCw_EtALQ6Au7tXyg43V0C6beLMaJwfIzg83pqbsKODRe9A1c3SwpfxR/exec';
  var outby = document.getElementById('admin');
  var bkash = document.getElementById('bkash');
  var number = document.getElementById('input0');
  var amount = document.getElementById('input1');

  var regex = /^\d{11}$/;

  if (!(regex.test(number.value))) {
    createToast('info', 'Pls , Enter correct Number !')
    return;
  };
  if (amount.value < 100) {
    createToast('info', 'Minimum withdrawal amount is 100 tk')
    return;
  };
  if (amount.value > taka) {
    createToast('info', 'You have not Enough Money');
    withdraw();
    return
  }
  const queryParams = new URLSearchParams({
    cookie_usr: cookie_usr,
    outby: outby.value,
    bkash: bkash.value,
    number: number.value,
    amount: amount.value

  });

  const url = `${link}?${queryParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => reTurn1(data))
    .catch(error => {
      enableAllButtons()
      createToast('error', 'Network conection Error | Cookie Error ');
    })



  function reTurn1(responseData) {
    enableAllButtons()
    if (responseData.sto === true) {
      createToast('success', 'Your Request Pending . See History !');
      taka = responseData.amount
      money()
    } else {
      createToast('error', 'You have not Enough Amount');
    };
  }

};


function uploadData() {

  let url = "https://script.google.com/macros/s/AKfycbzfxLybQDj_E-1fMItboRRxc-x8-UZjb7V2-MRXVjBxd_ccoE31xo9ZKwgPGyZnrscmEA/exec";
  let file = document.getElementById('fileSeam');
  //let img = document.querySelector("img");


  file.addEventListener('change', () => {
    if (file.files[0].size >= 1048576) {
      createToast('info', 'Image size must be less than 1 MB')
      return;
    }
    document.getElementById('buttons').innerHTML = '<div class="button">Changing.........</div>'
    let fr = new FileReader();
    fr.addEventListener('loadend', () => {
      let res = fr.result;
      console.log(res)
      //img.src = res;
      let spt = res.split("base64,")[1];
      let obj = {
        base64Data: spt,
        cookie_usr: cookie_usr
      }
      console.log(obj)
      fetch(url, {
          method: "POST",
          body: JSON.stringify(obj)
        })
        .then(r => r.json())
        .then(data => reTurnpro(data))

    })
    fr.readAsDataURL(file.files[0])
  })

};

function reTurnpro(data) {
  if (data.success == true) {
    document.getElementById('buttons').innerHTML = '<div class="button">Changed</div>'
    document.getElementById('imgpro').src = `https://drive.google.com/uc?export=download&id=${data.fileid}`;
    createToast('success', 'Photo uploaded successfully')
  } else {
    document.getElementById('buttons').innerHTML = '<div class="button">Failed to change</div>'
    createToast('error', 'Photo upload Unsuccessful')
  }
};


function changePass() {
  var val1 = document.getElementById('password11')
  var val2 = document.getElementById('password22')

  let url = "https://script.google.com/macros/s/AKfycbzefp1_CMK3Z2_YsBtls5TDuq8leYlLPev6sF1FaiHwMK508T6QqUbV3HnRCrl3cu3r_g/exec"
  let obj = {
    oldpassword: val1.value,
    newpassword: val2.value,
    cookie_usr: cookie_usr
  }
  console.log(obj)
  fetch(url, {
      method: "POST",
      body: JSON.stringify(obj)
    })
    .then(r => r.json())
    .then(data => {
      if (data.success == true) {
        createToast('success', 'Password changed successfully ✅')
      } else {
        createToast('error', 'Password did not matched 🚫')
      }
    })
};