document.addEventListener(
  "DOMContentLoaded",
  function () {
    const addButton = document.getElementById("add");
    addButton.disabled = true;
    addButton.addEventListener("click", add, false);
    document.getElementById("add").addEventListener("click", add, false);
    document.getElementById("cancel").addEventListener("click", cancel, false);
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

function cancel() {
  window.history.back();
}

function validURL(e) {
  const str = e.target.value;
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
  if (!isValid) {
    const html = `<span id="invalidUrl" style="color: red">Not valid url</span>`;
    document.querySelector("#validationUrl").innerHTML = html;
  } else {
    document.querySelector("#validationUrl").innerHTML = "";
  }
  validateAddButton();
}

function validName(e) {
  const str = e.target.value;
  const isValid = str.trim().length > 0;
  if (!isValid) {
    const html = `<span id="invalidName" style="color: red">Name is required</span>`;
    document.querySelector("#validationName").innerHTML = html;
  } else {
    document.querySelector("#validationName").innerHTML = "";
  }
  validateAddButton();
}

function validateAddButton() {
  var nameSpan = document.getElementById("invalidName");
  var hasNameValidation = document
    .getElementById("validationName")
    .contains(nameSpan);

  var urlSpan = document.getElementById("invalidUrl");
  var hasUrlValidation = document
    .getElementById("validationUrl")
    .contains(urlSpan);

  const envName = document.getElementById("envName").value;
  const envUrl = document.getElementById("envUrl").value;

  document.getElementById("add").disabled =
    hasNameValidation || hasUrlValidation || !envName || !envUrl;
}
