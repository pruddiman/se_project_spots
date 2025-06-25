const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const newPostModal = document.querySelector("#new-post-modal");
const newPostButton = document.querySelector(".profile__new-post");
const closeNewPostButton = newPostModal.querySelector(".modal__close-button");

closeProfileButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

closeNewPostButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

newPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
