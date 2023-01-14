/*!***************************************************
 * google-translate.js v1.0.3
 * https://Get-Web.Site/
 * author: Vitalii P.
 *****************************************************/

const googleTranslateConfig = {
  /* Original language */
  lang: "ru",
  /* The language we translate into on the first visit*/
  /* Язык, на который переводим при первом посещении */
  langFirstVisit: "ru",
  /* Если скрипт не работает на поддомене, 
    раскомментируйте и
    укажите основной домен в свойстве domain */
  /* domain: "Get-Web.Site" */
};

function TranslateInit() {
  if (googleTranslateConfig.langFirstVisit && !Cookies.get("googtrans")) {
    // Если установлен язык перевода для первого посещения и куки не назначены
    TranslateCookieHandler("/auto/" + googleTranslateConfig.langFirstVisit);
  }

  let code = TranslateGetCode();
  localStorage.setItem("lang", code);
  changeFlag(localStorage.getItem("lang"));
  // Находим флаг с выбранным языком для перевода и добавляем к нему активный класс
  if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
    document
      .querySelector('[data-google-lang="' + code + '"]')
      .classList.add("language__img_active");
  }

  if (code == googleTranslateConfig.lang) {
    // Если язык по умолчанию, совпадает с языком на который переводим
    // То очищаем куки
    TranslateCookieHandler(null, googleTranslateConfig.domain);
  }

  // Инициализируем виджет с языком по умолчанию
  new google.translate.TranslateElement({
    pageLanguage: googleTranslateConfig.lang,
  });

  // Вешаем событие  клик на флаги
  TranslateEventHandler("click", "[data-google-lang]", function (e) {
    TranslateCookieHandler(
      "/" + googleTranslateConfig.lang + "/" + e.getAttribute("data-google-lang"),
      googleTranslateConfig.domain,
    );
    // Перезагружаем страницу
    window.location.reload();
  });
}

function changeFlag(flag = "ru") {
  const currentLang = document.querySelector(".current-lang");
  const currentFlag = currentLang.querySelector(".lang-icon");
  const currentLangName = currentLang.querySelector(".current-lang-name");
  const ruAnotherLang = document.querySelector(".ru-another-lang");
  const enAnotherLang = document.querySelector(".en-another-lang");

  if (flag === "ru") {
    currentFlag.classList.remove("en-icon");
    currentFlag.classList.add("ru-icon");
    currentLangName.textContent = "Русский";
    ruAnotherLang.classList.add("active-lang");
    enAnotherLang.classList.remove("active-lang");
  } else {
    currentFlag.classList.add("en-icon");
    currentFlag.classList.remove("ru-icon");
    currentLangName.textContent = "Английский";
    ruAnotherLang.classList.remove("active-lang");
    enAnotherLang.classList.add("active-lang");
  }
}

function TranslateGetCode() {
  // Если куки нет, то передаем дефолтный язык
  let lang =
    Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
      ? Cookies.get("googtrans")
      : googleTranslateConfig.lang;
  return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
  // Записываем куки /язык_который_переводим/язык_на_который_переводим
  Cookies.set("googtrans", val);
  Cookies.set("googtrans", val, {
    domain: "." + document.domain,
  });

  if (domain == "undefined") return;
  // записываем куки для домена, если он назначен в конфиге
  Cookies.set("googtrans", val, {
    domain: domain,
  });

  Cookies.set("googtrans", val, {
    domain: "." + domain,
  });
}

function TranslateEventHandler(event, selector, handler) {
  document.addEventListener(event, function (e) {
    let el = e.target.closest(selector);
    if (el) handler(el);
  });
}