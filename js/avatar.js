const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('input[type=file]');
const preview = document.querySelector('.js-avatar');
const houseChooser = document.querySelector('#images');
const photoBox = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

houseChooser.addEventListener('change', () => {
  photoBox.innerHTML='<img class="js-photo" src="" alt="Фото жилья" style="height: inherit">';
  const file = houseChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const photoHouse = document.querySelector('.js-photo');
    photoHouse.src = URL.createObjectURL(file);
  }
});
