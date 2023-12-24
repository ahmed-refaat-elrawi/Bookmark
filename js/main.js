var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitButton = document.getElementById("submit");
var currentIndex;
var regexName = /^[a-zA-Z].{3,15}$/;
var regexURL =
  /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._]*)*\/?$/;
var alertName = document.getElementById("alertName");
var alertURL = document.getElementById("alertURL");
var searchInput = document.getElementById("searchInput");
var websiteList = [];
if (JSON.parse(localStorage.getItem("sites")) != null) {
  websiteList = JSON.parse(localStorage.getItem("sites"));
  showData();
} else {
  websiteList = [];
}

submitButton.addEventListener("click", function () {
  addData();
});
function addData() {
  if (
    isValid(regexName, siteName, alertName) &&
    isValid(regexURL, siteURL, alertURL)
  ) {
    var webSite = {
      name: siteName.value,
      url: siteURL.value,
    };

    websiteList.push(webSite);
    localStorage.setItem("sites", JSON.stringify(websiteList));
    clearForm();
    showData();
  }
}

function showData() {
  var temp = "";
  for (i = 0; i < websiteList.length; i++) {
    temp += ` <tr>
        <td>${i}</td>
        <td>${websiteList[i].name}</td>
        <td>
          <a href="${websiteList[i].url}" target = "_blank">
            <button type="button" class="btn btn-success">
              <i class="fa-solid fa-eye me-2"></i>Visit
            </button>
          </a>
        </td>
        <td>
          <button type="button" onclick = "updateData(${i})" class="btn btn-warning">
            Update
          </button>
        </td>
        <td>
          <button type="button" onclick = "deleteData(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash me-2"></i>Delete
          </button>
        </td>
      </tr>`;
  }
  document.getElementById("tableData").innerHTML = temp;
}

function deleteData(i) {
  websiteList.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(websiteList));
  showData();
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

function updateData(i) {
  currentIndex = i;
  siteName.value = websiteList[i].name;
  siteURL.value = websiteList[i].url;
  document.getElementById("submit").classList.remove("z-1");
}

function addUpdatedData() {
  if (
    isValid(regexName, siteName, alertName) &&
    isValid(regexURL, siteURL, alertURL)
  ) {
    var updatedData = {
      name: siteName.value,
      url: siteURL.value,
    };
    websiteList.splice(currentIndex, 1, updatedData);

    localStorage.setItem("sites", JSON.stringify(websiteList));
    clearForm();
    showData();
    document.getElementById("submit").classList.add("z-1");
  }
}

siteName.addEventListener("change", function () {
  isValid(regexName, siteName, alertName);
});

siteURL.addEventListener("change", function () {
  isValid(regexURL, siteURL, alertURL);
});

function isValid(regEX, regexInput, alert) {
  if (regEX.test(regexInput.value) == true) {
    regexInput.classList.add("is-valid");
    regexInput.classList.remove("is-invalid");
    alert.classList.add("d-none");
    return true;
  } else {
    regexInput.classList.add("is-invalid");
    regexInput.classList.remove("is-valid", "mb-3");
    alert.classList.remove("d-none");
    return false;
  }
}

function searchData() {
  var searchVal = searchInput.value.toLowerCase();
  var temp = "";
  for (i = 0; i < websiteList.length; i++) {
    if (websiteList[i].name.toLowerCase().includes(searchVal)) {
      temp +=
        `<tr>
          <td>` +
        i +
        `</td>
          <td>` +
        websiteList[i].name
          .toLowerCase()
          .replace(
            searchVal,
            "<span class='bg-info'>" + searchVal + "</span>"
          ) +
        `</td>
          <td>` +
        `</td>
          <td>
          <a href="${websiteList[i].url}" target = "_blank">
            <button type="button" class="btn btn-success">
              <i class="fa-solid fa-eye me-2"></i>Visit
            </button>
          </a>
        </td>
          <td>
            <button type="button" onclick = "updateData(${i})" class="btn btn-warning">
              Update
            </button>
          </td>
          <td>
            <button type="button" onclick = "deleteData(${i})" class="btn btn-danger">
              <i class="fa-solid fa-trash me-2"></i>Delete
            </button>
          </td>
      </tr>`;
    }
  }
  document.getElementById("tableData").innerHTML = temp;
}
