const form = document.querySelector('.form');
const formContainer = document.querySelector('.form__container');
const allInputs = form.querySelectorAll('input');
const allButtons = document.querySelectorAll('.modal__btn');
const formShadow = document.querySelector('.shadow');
const menuMobile = document.querySelector('.menu');
const burger = document.querySelector('.header__burger');
const formClose = document.querySelector('.form__close');
const superBlock = document.querySelector('.super');
const next = document.querySelector('.super__button');
const superClose = document.querySelector('.super__close');
const phoneField = document.getElementById('phone');

let errorCount = 0;
let isErrorForm = true;
const isField = {
  name: false,
  email: false,
  phone: false,
};

const maskOptions = {
  mask: '+{7} (000) 000 00 00',
  lazy: false,
};
const mask = new IMask(phoneField, maskOptions);

const inputsForValidation = Array.from(allInputs).filter(input => {
  if (input.id === 'email' || input.id === 'name' || input.id === 'phone') {
    return input;
  }
});

for (let input of inputsForValidation) {
  input.addEventListener('input', () => handleInput(input));
}

const handleInput = input => {
  if (input.value.length > 0) {
    if (input.id === 'phone') {
      if (mask.masked.isComplete) {
        isField[input.id] = true;
      } else if (!mask.masked.isComplete) {
        isField[input.id] = false;
      } else {
        return;
      }
    } else {
      isField[input.id] = true;
    }
  } else {
    isField[input.id] = false;
  }
  isTrue();
};

const isTrue = () => {
  for (let key in isField) {
    if (!isField[key]) {
      document.getElementById('submit').setAttribute('disabled', true);
      return;
    }
  }

  document.getElementById('submit').removeAttribute('disabled');
};

const removeError = input => {
  if (input.id === 'phone') {
    input.parentNode.nextElementSibling.remove();
    console.log(input.parentNode.nextElementSibling);
  } else {
    input.nextElementSibling.remove();
  }
  console.log(document.querySelectorAll('.error__input'));

  if (document.querySelectorAll('.error__input').length === 0) {
    document.getElementById('error__form').remove();
    isErrorForm = true;
  }
};

for (let button of allButtons) {
  button.addEventListener('click', () => {
    form.classList.add('form__active');
    formShadow.classList.add('visible-shadow');
    formShadow.style.zIndex = '13';
    menuMobile.classList.add('close__menu');
    burger.classList.remove('active');
    formShadow.classList.remove('hide-shadow');
    formShadow.classList.add('visible-shadow');
    document.body.style.overflow = 'hidden';
  });
}

for (let input of allInputs) {
  input.addEventListener('input', () => {
    if (input.id === 'phone') {
      if (input.parentNode.nextElementSibling) removeError(input.parentNode);
    } else {
      if (input.nextElementSibling) removeError(input);
    }
  });
}

const errorRequired = parent => {
  try {
    throw new Error('This field is required.');
  } catch (error) {
    const span = document.createElement('span');
    span.textContent = error.toString().split(':')[1];
    span.classList.add('error__input');
    parent.append(span);

    if (isErrorForm) {
      isErrorForm = false;
      formContainer.insertAdjacentHTML(
        'afterend',
        '<span id="error__form" class="error__form">Please fill in all required fields</span>',
      );
    }
  }
};

const validateField = (value, parent) => {
  if (value.trim() === '') {
    errorRequired(parent);
    errorCount++;
  }
};

const validation = () => {
  for (let input of allInputs) {
    if (input.id === 'name') {
      validateField(input.value, input.parentNode);
    } else if (input.id === 'email') {
      validateField(input.value, input.parentNode);
    } else if (input.id === 'phone') {
      validateField(input.value, input.parentNode.parentNode);
    } else {
      return !!errorCount;
    }
  }
};

const closeSuper = () => {
  superBlock.classList.remove('super__visible');
  formShadow.classList.remove('visible-shadow');
  formShadow.classList.add('hide-shadow');
};

const onClose = () => {
  form.classList.remove('form__active');
  formShadow.removeAttribute('style');
  document.body.removeAttribute('style');
};

const onNext = () => {
  form.classList.remove('form__active');
  superBlock.classList.add('super__visible');

  setTimeout(() => {
    closeSuper();
    onClose();
  }, 3000);
};

formClose.addEventListener('click', () => {
  onClose();
  formShadow.classList.remove('visible-shadow');
  formShadow.classList.add('hide-shadow');
});

formShadow.addEventListener('click', () => {
  closeSuper();
  onClose();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validation()) {
    onNext();
  }
});

next.addEventListener('click', closeSuper);
superClose.addEventListener('click', closeSuper);
