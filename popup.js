"use strict";
var url;

document.addEventListener(
  "DOMContentLoaded",
  function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0]; 
      url = tab.url;
      loadEnvironments();
    });
  },
  false
);

function loadEnvironments() {
  const environments = allStorage();
  const environmentsSorted = environments.sort((a, b) =>
    a.envName.localeCompare(b.envName, undefined, { sensitivity: "base" })
  );

  if (environmentsSorted && environmentsSorted.length) {
    var html = environmentsSorted
      .map(function (environment) {
        return `<div class="environment">
        <button type="button" id="${environment.id}" title="${environment.envUrl}" class="btn btn-desktop">Open ${environment.envName}</button>
        <a id="remove-${environment.id}" href="#" title="remove env"><img src="images/bin.png" alt="remove env" class="remove"/><a>
        </div>`;
      })
      .join("");
  } else {
    var html = `<p>No environments added yet, click on + to add one</p>`;
  }

  document.querySelector("#environments").innerHTML = html;

  environments.forEach((environment) => {
    const key = environment.key;
    const id = environment.id.toString();
    const removeId = `remove-${id}`;
    document.getElementById(id).addEventListener(
      "click",
      function () {
        let fullUrl = url;
        let pathArray = fullUrl.split("/");
        let protocol = pathArray[0];
        let host = pathArray[2];
        let baseUrl = protocol + "//" + host;
        let newFullUrl = fullUrl
          .toLocaleLowerCase()
          .replace(
            baseUrl.toLocaleLowerCase(),
            environment.envUrl.toLocaleLowerCase()
          );
        newFullUrl = newFullUrl.startsWith("http")
          ? newFullUrl
          : `https://${newFullUrl}`;
        window.open(newFullUrl, "_blank");
      },
      false
    );
    document.getElementById(removeId).addEventListener(
      "click",
      function () {
        localStorage.removeItem(key);
        loadEnvironments();
      },
      false
    );
  });
}

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    const item = JSON.parse(localStorage.getItem(keys[i]));
    const itemWithKey = { ...item, key: keys[i] };
    values.push(itemWithKey);
  }

  return values;
}
