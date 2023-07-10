const cookie = document.querySelector('.cookies');
const accept = document.querySelector('#accept');
const close = document.querySelector('#close');
const decline = document.querySelector('#decline');
const shadow = document.querySelector('.shadow');

const closeCookie = () => {
  cookie.classList.add('hide');
  cookie.classList.remove('visible');
  shadow.classList.remove('visible-shadow');
  shadow.classList.add('hide-shadow');
  if (window.innerWidth <= 768) {
    document.body.removeAttribute('style');
  }
};

accept.addEventListener('click', closeCookie);
close.addEventListener('click', closeCookie);
decline.addEventListener('click', closeCookie);
shadow.addEventListener('click', closeCookie);

document.addEventListener('DOMContentLoaded', () => {
  cookie.classList.remove('hide');
  cookie.classList.add('visible');

  if (window.innerWidth <= 768) {
    shadow.classList.remove('hide-shadow');
    shadow.classList.add('visible-shadow');
    document.body.style.overflowY = 'hidden';
  } else {
    shadow.classList.remove('visible-shadow');
    shadow.classList.add('hide-shadow');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    if (cookie.classList.contains('visible')) {
      shadow.classList.remove('hide-shadow');
      shadow.classList.add('visible-shadow');
    } else {
      shadow.classList.remove('visible-shadow');
      shadow.classList.add('hide-shadow');
    }
  } else {
    shadow.classList.remove('visible-shadow');
    shadow.classList.add('hide-shadow');
  }
});
