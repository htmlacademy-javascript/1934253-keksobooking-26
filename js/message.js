import { isEscapeKey } from './utils.js';
import { resetForm } from './validate-form.js';

const SUCCESS_POPUP_TEMPLATE = `<div class="success js-success">
  <p class="success__message">Ваше объявление<br>успешно размещено!</p>
</div>`;

const getErrorPopupTemplate = (message) => `<div class="error js-error">
  <p class="error__message">${message}</p>
  <button type="button" class="error__button">Попробовать снова</button>
</div>`;

const addListenersByPopup = (popup) => {
  const onDocumentKeyDown = (evt) => {
    document.removeEventListener('keydown', onDocumentKeyDown);

    if(isEscapeKey(evt)) {
      popup.remove();
    }
  };

  document.addEventListener('keydown', onDocumentKeyDown);

  popup.addEventListener('click', () => {
    popup.remove();
  });
};

export const openSuccessPopup = () => {
  document.querySelector('body').insertAdjacentHTML('beforeend', SUCCESS_POPUP_TEMPLATE );
  const successPopup = document.querySelector('.js-success');
  addListenersByPopup(successPopup);
  resetForm();
};

export const openErrorPopup = (message)  => {
  document.querySelector('body').insertAdjacentHTML('beforeend', getErrorPopupTemplate(message));

  const errorPopup = document.querySelector('.js-error');

  addListenersByPopup(errorPopup);
};
