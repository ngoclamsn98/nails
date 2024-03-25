export const handleNextFocus = (e, cb) => {
  e.preventDefault();
  const activeElement = document.activeElement;
  if (!activeElement || !activeElement.getAttribute) {
    cb(e);
    return;
  }

  const focusName = activeElement.getAttribute("data-focus");
  if (!focusName) {
    cb(e);
    return;
  }

  const inputs = document.querySelectorAll("[data-focus]");

  const inputArray = Array.from(inputs) as HTMLInputElement[];
  const index = inputArray.findIndex(
    (input) => input.getAttribute("data-focus") === focusName
  );

  if (index !== -1 && inputArray[index + 1]) {
    inputArray[index + 1].focus();
    return;
  }
  cb(e);
};
