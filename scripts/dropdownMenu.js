document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
  const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button");
  const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
  const dropdownItems = dropdownList.querySelectorAll(".dropdown__list-item");
  const dropdownInput = dropdownWrapper.querySelector(".dropdown__input_hidden");

  dropdownBtn.addEventListener("click", function () {
    dropdownList.classList.toggle("dropdown__list_visible");
    this.classList.toggle("dropdown__button_active");
  });

  dropdownItems.forEach(function (listItem) {
    listItem.addEventListener("click", function (e) {
      dropdownItems.forEach(function (el) {
        el.classList.remove("dropdown__list-item_active");
      });
      e.target.classList.add("dropdown__list-item_active");
      dropdownBtn.innerText = this.innerText;
      dropdownInput.value = this.dataset.value;
      console.log(dropdownInput.value);
      dropdownList.classList.remove("dropdown__list_visible");
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target !== dropdownBtn) {
      dropdownBtn.classList.remove("dropdown__button_active");
      dropdownList.classList.remove("dropdown__list_visible");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.key === "Escape") {
      dropdownBtn.classList.remove("dropdown__button_active");
      dropdownList.classList.remove("dropdown__list_visible");
    }
  });
});

document.querySelector("#cargo-input").addEventListener("input", () => {
  document.querySelectorAll(".weight-inputs").forEach((input) => {
    input.dataset.disabled = "false";
    input.classList.remove("hidden");
  });
  document.querySelector("#docs-weight-input").dataset.disabled = "true";
  document.querySelector("#docs-weight-input").classList.add("hidden");
});

document.querySelector("#docs-input").addEventListener("input", () => {
  document.querySelectorAll(".weight-inputs").forEach((input) => {
    input.dataset.disabled = "true";
    input.classList.add("hidden");
  });
  document.querySelector("#docs-weight-input").dataset.disabled = "false";
  document.querySelector("#docs-weight-input").classList.remove("hidden");
});

$(".calculator-form").submit((e) => {
  e.preventDefault();
  let flag = true;
  e.target.querySelectorAll("input[type='text']").forEach((input) => {
    if (input.dataset.disabled === "true") return false;

    if (!input.value) {
      flag = false;
      if (input.closest(".dropdown")) {
        input.closest(".dropdown").classList.add("error");
      } else {
        input.classList.add("error");
      }
    } else {
      if (input.closest(".dropdown")) {
        input.closest(".dropdown").classList.remove("error");
      } else {
        input.classList.remove("error");
      }
    }
  });
  if (flag) {
    const data = {};
    $(".loader").removeClass("hidden-loader");
    setTimeout(() => {
      $(".results").removeClass("hidden");
      $(".loader").addClass("hidden-loader");
    }, 2000);
    e.target.querySelectorAll("input").forEach((input) => {
      data[input.name] = input.value;
    });
    console.log(data);
  } else {
    return false;
  }
});
