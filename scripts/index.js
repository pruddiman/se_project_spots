const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);

const profileFormElement = editProfileModal.querySelector("#editprofile-form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-description-input");

const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__subtitle");

const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__new-post");
const closeNewPostButton = newPostModal.querySelector(".modal__close-button");
const saveSubmitButton = newPostModal.querySelector(".modal__save-button");

const addCardFormElement = newPostModal.querySelector("#newpost-form");
const captionInput = newPostModal.querySelector("#caption-post");
const linkInput = newPostModal.querySelector("#image-post");

const previewModal = document.querySelector("#preview-modal");
const previewModalContainer = previewModal.querySelector(".modal__container");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-button");

//EDIT PROFILE

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(editProfileModal);
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// NEW POST

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };

  const newCard = getCardElement(newCardData);
  cardsList.prepend(newCard);
  captionInput.value = "";
  linkInput.value = "";
  addCardFormElement.reset();
  disableButton(saveSubmitButton, settings);
  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

//BUTTON HANDLERS

closeProfileButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

closeNewPostButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function handleEscKeyDown(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscKeyDown);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscKeyDown);
}

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardElementLikeBtn = cardElement.querySelector(".card__button");
  cardElementLikeBtn.addEventListener("click", function () {
    cardElementLikeBtn.classList.toggle("card__button_liked");
  });

  const cardElementDeleteBtn = cardElement.querySelector(
    ".card__button-delete"
  );
  cardElementDeleteBtn.addEventListener("click", function () {
    cardElementDeleteBtn.closest(".card").remove();
  });

  cardImageEl.addEventListener("click", function () {
    openModal(previewModal);
    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
  });

  return cardElement;
}

const cardsList = document.querySelector(".cards__list");

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
