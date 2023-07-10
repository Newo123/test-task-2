// Плавный якорь до верха

const footerLogo = document.querySelector('#footer-logo');
const headerLogo = document.querySelector('#footer-logo');

const scrollTo = headerLogo => {
  window.scroll({
    left: 0,
    top: headerLogo,
    behavior: 'smooth',
  });
};

footerLogo.addEventListener('click', () => {
  scrollTo(headerLogo);
});

// Движение по скроллу задних элементов в секции how

const how = document.querySelector('.how');
const green = document.querySelector('.how__items-green');
const purple = document.querySelector('.how__items-purple');
const orange = document.querySelector('.how__items-orange');

// Фиксация шапки по скроллу
const header = document.querySelector('.header');
let headerH = header.clientHeight;

window.addEventListener('scroll', () => {
  let howY = how.getBoundingClientRect();
  let scroll = window.scrollY;

  if (scroll + 33 > headerH) {
    header.classList.add('fixed');
    document.body.style.paddingTop = '71px';
  } else {
    header.classList.remove('fixed');
    document.body.removeAttribute('style');
  }

  green.style.transform = `translateX(${
    scroll / how.offsetHeight - howY.top / 5
  }%)`;
  purple.style.transform = `translateX(${
    scroll / how.offsetHeight + howY.top / 5 - 10
  }%)`;
  orange.style.transform = `translateX(${
    scroll / how.offsetHeight - howY.top / 5 + 10
  }%)`;
});
