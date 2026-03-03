export function setSaveButtonText(
  button,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = "Saving...";
  } else {
    button.textContent = "Save";
  }
}

export function setDeleteButtonText(
  button,
  isLoading,
  defaultText = "Delete",
  loadingText = "Deleting..."
) {
  if (isLoading) {
    button.textContent = "Deleting...";
  } else {
    button.textContent = "Delete";
  }
}
