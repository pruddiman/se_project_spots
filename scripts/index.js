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
