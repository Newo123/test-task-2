const toggleMenu = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');
const shadowMenu = document.querySelector('.shadow');
const header = document.querySelector('.header');
const tabs = document.querySelector('.tabs');
const linkMenu = document.querySelectorAll('.menu__item a');

for (let i = 0; i < linkMenu.length; i++) {
  linkMenu[i].addEventListener('click', () => {
    closeMenu();
  });
}

const closeMenu = () => {
  menu.classList.remove('open__menu');
  menu.classList.add('close__menu');
  shadowMenu.classList.remove('visible-shadow');
  shadowMenu.classList.add('hide-shadow');
  document.body.removeAttribute('style');
  toggleMenu.classList.remove('active');

  if (header.classList.contains('fixed')) {
    if (window.scrollY < 38) {
      header.classList.remove('fixed');
    }
    tabs.style.transform = 'translateY(0)';
  }
};

const openMenu = () => {
  menu.classList.add('open__menu');
  menu.classList.remove('close__menu');
  shadowMenu.classList.add('visible-shadow');
  shadowMenu.classList.remove('hide-shadow');
  document.body.style.overflowY = 'hidden';
  toggleMenu.classList.add('active');

  if (!header.classList.contains('fixed')) {
    header.classList.add('fixed');
    tabs.style.transform = 'translateY(-100%)';
  }
};

const mobileOrDesktop = () => {
  if (window.innerWidth <= 768) {
    menu.classList.remove('hide-shadow');
    menu.classList.add('visible-shadow');
  } else {
    menu.classList.add('hide-shadow');
    menu.classList.remove('visible-shadow');
  }
};

shadowMenu.addEventListener('click', () => {
  closeMenu();
});

toggleMenu.addEventListener('click', () => {
  if (!menu.classList.contains('open__menu')) {
    openMenu();
  } else {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  mobileOrDesktop();
});

document.addEventListener('DOMContentLoaded', () => {
  mobileOrDesktop();
});
