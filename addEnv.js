var whiteListUrls = ["localhost"];

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const addButton = document.getElementById("add");
    addButton.disabled = true;
    addButton.addEventListener("click", add, false);
    document.getElementById("add").addEventListener("click", add, false);
    document.getElementById("back").addEventListener("click", back, false);
    document.getElementById("envName").addEventListener("input", validName);
    document.getElementById("envUrl").addEventListener("input", validURL);
  },
  false
);

function add() {
  const envName = document.getElementById("envName").value;
  const envUrl = document.getElementById("envUrl").value;
  const newEnv = {
    id: Date.now(),
    envName: envName,
    envUrl: envUrl,
  };
  // validate name and url not existing
  localStorage.setItem(envName, JSON.stringify(newEnv));
  window.history.back();
}

function back() {
  window.history.back();
}

function validURL(e) {
  const str = e.target.value;
  let html = "";

  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  const isValid = !!pattern.test(str);
  if (!isValid && !whiteListUrls.some((url) => str.includes(url))) {
    html = `<span id="invalidUrl" style="color: red">Not valid url</span>`;
  }

  document.querySelector("#validationUrl").innerHTML = html;

  validateAddButton();
}

function validName(e) {
  const str = e.target.value;
  const isValid = str.trim().length > 0;
  let html = "";

  if (!isValid) {
    html = `<span id="invalidName" style="color: red">Name is required</span>`;
  }

  document.querySelector("#validationName").innerHTML = html;

  validateAddButton();
}

function validateAddButton() {
  const envName = document.getElementById("envName").value;
  const envUrl = document.getElementById("envUrl").value;

  document.getElementById("add").disabled =
    validateDivHasErrors("validationName", "invalidName") ||
    validateDivHasErrors("validationUrl", "invalidUrl") ||
    !envName ||
    !envUrl;
}

function validateDivHasErrors(divName, spanName) {
  let span = document.getElementById(spanName);
  return document.getElementById(divName).contains(span);
}
