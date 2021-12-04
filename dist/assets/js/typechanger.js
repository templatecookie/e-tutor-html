// input type changer
function showPassword(id, el) {
  let x = document.getElementById(id);
  if (x.type === 'password') {
    x.type = 'text';
    el.innerHTML = `<img src="assets/images/svg-icon/eye-close.svg" alt="eye-icon">`;
  } else {
    x.type = 'password';
    el.innerHTML = `<img src="assets/images/svg-icon/eye-open.svg" alt="eye-icon">`;
  }
}
