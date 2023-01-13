document.querySelector("#cargo-input").addEventListener("input", () => {
  document.querySelectorAll(".weight-inputs").forEach((input) => {
    input.classList.remove("hidden");
  });
  document.querySelector("#docs-weight-input").classList.add("hidden");
});

document.querySelector("#docs-input").addEventListener("input", () => {
  document.querySelectorAll(".weight-inputs").forEach((input) => {
    input.classList.add("hidden");
  });
  document.querySelector("#docs-weight-input").classList.remove("hidden");
});
