
// Для добавления картинки под инпутом file
const mainForm = document.forms.main;
const mainFormFile = mainForm.nameFile;


mainFormFile.addEventListener('change', (e) => {
    let selectedFile = mainFormFile.files[0];

    // получаем URL изображения
    let fileUrl = URL.createObjectURL(selectedFile);

    mainFormFile.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="main-form__image">
            <img alt="" title="${selectedFile.name}" src="${fileUrl}">
        </div>`
    );
});