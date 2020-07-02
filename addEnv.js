document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("add").addEventListener("click", add, false);
    document.getElementById("cancel").addEventListener("click", cancel, false);
  },
  false
);

function add() {
  const envName = document.getElementById("envName").value;
  const envUrl = document.getElementById("envUrl").value;
  const newEnv = { id: Date.now(), envName: envName, envUrl: envUrl };
  //validate name and url not existing
  localStorage.setItem(envName, JSON.stringify(newEnv));
  window.history.back();
}

function cancel() {
  window.history.back();
}
