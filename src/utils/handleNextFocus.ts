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

  const inputs = document.querySelectorAll("input");

  const inputArray = Array.from(inputs);
  const index = inputArray.findIndex(
    (input) => input.getAttribute("data-focus") === focusName
  );

  if (index !== -1 && inputArray[index + 1]) {
    inputArray[index + 1].focus();
    return;
  }
  cb(e);
};
