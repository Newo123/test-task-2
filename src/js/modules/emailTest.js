
const mainForm = document.forms.main;
const mainFormInput = mainForm.nameInput;

// Проверяем ввод email, выводим ошибку
mainForm.addEventListener('submit', (e) => {
    if (emailTest(mainFormInput)) {
        mainFormInput.parentElement.insertAdjacentHTML(
            'beforeend',
            `<div class="main-form__error">
                Введите email
            </div>`
        );
        e.preventDefault();
    }
});

mainFormInput.addEventListener('focus', (e) => {
    if (mainFormInput.nextElementSibling) {
        mainFormInput.nextElementSibling.remove();
    }
});

// Тест email
const emailTest = input => {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}