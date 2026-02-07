import "../pages/index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setSaveButtonText, setDeleteButtonText } from "../utils/helpers.js";

// //const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },

//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "aa83986d-576a-4a53-b076-409379292fdc",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    console.log(cards);
    cards.forEach((item) => {
      const cardElement = getCardElement(item, userInfo._id);
      cardsList.append(cardElement);
    });

    const avatarElement = document.querySelector(".profile__avatar");
    avatarElement.style.backgroundImage = `url(${userInfo.avatar})`;
    profileNameElement.textContent = userInfo.name;
    profileJobElement.textContent = userInfo.about;
  })
  .catch(console.error);

let selectedCard;
let selectedCardId;

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editAvatarBtn = document.querySelector(".profile__avatar-btn");

const profileFormElement = editProfileModal.querySelector("#editprofile-form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-description-input");

const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__subtitle");

const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__new-post");
const closeNewPostButton = newPostModal.querySelector(".modal__close-button");
const cardSubmitButton = newPostModal.querySelector(".modal__save-button");

const addCardFormElement = newPostModal.querySelector("#newpost-form");
const captionInput = newPostModal.querySelector("#caption-post");
const linkInput = newPostModal.querySelector("#image-post");

const previewModal = document.querySelector("#preview-modal");
const previewModalContainer = previewModal.querySelector(".modal__container");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-button");

// Delete Form Elements

const deleteModal = document.querySelector("#delete-modal");
const deleteButton = deleteModal.querySelector(".modal__delete-button");
const cancelButton = deleteModal.querySelector(".modal__cancel-button");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-button");
const deleteForm = document.querySelector("#delete-form");
console.log("deleteForm:", deleteForm);

const previewAvatarModal = document.querySelector("#avatar-modal");
const avatarForm = previewAvatarModal.querySelector(".modal__form");
const avatarSubmitBtn = previewAvatarModal.querySelector(".modal__save-button");
const avatarInput = previewAvatarModal.querySelector("#profile-avatar-input");
const previewAvatarModalCloseBtn = previewAvatarModal.querySelector(
  ".modal__close-button"
);

//EDIT PROFILE

function handleProfileFormSubmit(evt) {
  const avatarSubmitBtn = evt.submitter;
  setSaveButtonText(avatarSubmitBtn, true, "Save", "Saving...");
  evt.preventDefault();
  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setSaveButtonText(avatarSubmitBtn, false);
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// NEW POST

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setSaveButtonText(submitBtn, true, "Save", "Saving...");

  const newCardData = {
    name: captionInput.value,
    link: linkInput.value,
  };
  api
    .addNewCard(newCardData)
    .then((cardFromServer) => {
      const newCard = getCardElement(cardFromServer);
      cardsList.prepend(newCard);

      addCardFormElement.reset();
      disableButton(cardSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setSaveButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  console.log(avatarInput.value);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      document.querySelector(
        ".profile__avatar"
      ).style.backgroundImage = `url(${data.avatar})`;
      closeModal(previewAvatarModal);
    })
    .catch(console.error);
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
  resetValidation(profileFormElement, [nameInput, jobInput], settings);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

editAvatarBtn.addEventListener("click", function () {
  openModal(previewAvatarModal);
  resetValidation(avatarForm, [avatarInput], settings);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

previewAvatarModalCloseBtn.addEventListener("click", function () {
  closeModal(previewAvatarModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

cancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

function handleImageClick(data) {
  api
    .handleImageClick(data)
    .then(() => {
      openModal(previewModal);
      previewModalCaption.textContent = data.name;
      previewModalImage.src = data.link;
      previewModalImage.alt = data.name;
    })
    .catch(console.error);
}

function handleDeleteSubmit(evt) {
  const deleteButton = evt.submitter;
  setDeleteButtonText(deleteButton, true, "Delete", "Deleting...");
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove(); // Remove the card element from the DOM
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setDeleteButtonText(deleteButton, false);
    });
}

function handleLike(evt, id) {
  const likeBtn = evt.target;
  const isLiked = likeBtn.classList.contains("card__button_liked");
  api
    .handleLike(id, isLiked)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        likeBtn.classList.add("card__button_liked");
      } else {
        likeBtn.classList.remove("card__button_liked");
      }
    })
    .catch(console.error);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

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

function getCardElement(data, myUserId) {
  console.log("CARD DATA:", data);
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardElementLikeBtn = cardElement.querySelector(".card__button");
  //TODO - if the card is liked, set the active class on the card like button

  if (data.isLiked) {
    cardElementLikeBtn.classList.add("card__button_liked");
  }

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardElementDeleteBtn = cardElement.querySelector(
    ".card__button-delete"
  );
  cardElementDeleteBtn.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardElementLikeBtn.addEventListener("click", (evt) =>
    handleLike(evt, data._id)
  );
  cardImageEl.addEventListener("click", () => handleImageClick(data));

  cardImageEl.addEventListener("click", function () {
    openModal(previewModal);
    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
  });

  return cardElement;
}

const cardsList = document.querySelector(".cards__list");

enableValidation(settings);
