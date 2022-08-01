const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('input[type=file]');
const previewAvatar = document.querySelector('.js-avatar');
const houseChooser = document.querySelector('#images');
const previewHouse = document.querySelector('.js-photo');

const avatarLoad = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

const previewPhotoLoader = () => {
  avatarChooser.addEventListener('change', () => {
    avatarLoad(avatarChooser, previewAvatar);
  });

  houseChooser.addEventListener('change', ()=>{
    avatarLoad (houseChooser, previewHouse);
    previewHouse.classList.remove('hidden');
  });
};

const resetImages = () => {
  previewAvatar.src = 'img/muffin-grey.svg';
  previewHouse.classList.add('hidden');
};

export { previewPhotoLoader, resetImages} ;
