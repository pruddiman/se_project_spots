const initialCards = [
  [
    "Val Thorens",
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  ],
  [
    "Restaurant terrace",
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  ],
  [
    "An outdoor cafe",
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  ],
  [
    "A very long bridge, over the forest and through the trees",
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  ],
  [
    "Tunnel with morning light",
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  ],
  [
    "Mountain house",
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  ],
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

const addCardFormElement = newPostModal.querySelector("#newpost-form");
const captionInput = newPostModal.querySelector("#caption-post");
const linkInput = newPostModal.querySelector("#image-post");

//EDIT PROFILE

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// NEW POST

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(captionInput.value);
  console.log(linkInput.value);

  captionInput.value = "";
  linkInput.value = "";

  newPostModal.classList.remove("modal_is-opened");
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

//BUTTON HANDLERS

closeProfileButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

closeNewPostButton.addEventListener("click", function () {
  captionInput.value = "";
  linkInput.value = "";
  newPostModal.classList.remove("modal_is-opened");
});

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

// initialCards array -- use forEach() that loops through the entire array and log the name of the current array item to the console to check

initialCards.forEach(function (initialCard, index) {
  console.log(`Object ${index}: ${initialCard}`);
});
