const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const POPUP_ACTIVE_CLASS = 'popup_active';
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
const editPopup = document.querySelector('.popup_type_edit');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const popupEditForm = popup.querySelector('#form-edit');
const nameProfile = document.querySelector('.profile__name');
const nameInput = popup.querySelector('.popup__text_type_name');
const descriptionProfile = document.querySelector('.profile__description');
const descriptionInput = popup.querySelector('.popup__text_type_description');
const containerCard = document.querySelector('.elements__container');
const elementTemplate = document.querySelector('#tempalate-card').content;
const addPopup = document.querySelector('.popup_type_add');
const addPopupBtn = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('#form-add');
const locInput = document.querySelector('.popup__text_type_loc');
const linkInput = document.querySelector('.popup__text_type_link');
const imgPopup = document.querySelector('.popup_type_img');

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

popupCloseBtn.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

openEditPopupBtn.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
});

popupEditForm.addEventListener('submit', event => {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
});

initialCards.forEach(elementPlace =>
  renderCard(containerCard, createCard(elementPlace.name, elementPlace.link))
);

function renderCard(containerCard, elementPlace) {
  containerCard.prepend(elementPlace);
}

function createCard(name, link) {
  const elementPlace = elementTemplate.querySelector('.elements__card').cloneNode(true);
  const elementCardTitle = elementPlace.querySelector('.elements__text');
  elementCardTitle.textContent = name;
  const elementCardImg = elementPlace.querySelector('.elements__image');
  elementCardImg.src = link;
  elementCardImg.alt = name;

  const deleteButton = elementPlace.querySelector('.elements__remove-button');
  deleteButton.addEventListener('click', evt => {
    elementPlace.remove();
  });

  const likeButton = elementPlace.querySelector('.elements__like-button');
  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('elements__like-button_active');
  });

  elementCardImg.addEventListener('click', () => {
    const fullCardImg = document.querySelector('.popup__full-photo');
    const descriptionCardImg = document.querySelector('.popup__full-photo-description');
    fullCardImg.setAttribute('src', link);
    fullCardImg.setAttribute('alt', name);
    descriptionCardImg.textContent = name;
    openPopup(imgPopup);
  });

  return elementPlace;
}

addPopupBtn.addEventListener('click', () => {
  openPopup(addPopup);
});

popupAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const newName = locInput.value;
  const newLink = linkInput.value;
  renderCard(containerCard, createCard(newName, newLink));
  closePopup(addPopup);
  evt.target.reset();
});
