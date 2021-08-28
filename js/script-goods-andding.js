// FUNCTIONS
var modalButtons = document.querySelectorAll(".js-open-modal");

modalButtons.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    
    var modalId = this.getAttribute("data-modal"),
        modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

    for (let modal of document.querySelectorAll(".modal")) {
      modal.classList.remove("active");
    }

    modalElem.classList.add("active");

    let yesBtn = modalElem.children[1].children[0];
    modalFunc = () => {
      switch (modalId) {
        case "1":
          // some action for first modal window
          console.log("Modal 1 YES button pressed");
          break;
        case "2":
          console.log("Modal 2 YES button pressed");
          break;
        case "3":
          console.log("Modal 3 YES button pressed");
          break;
        default:
          console.log("Yes button pressed");
          break;
      }
    }

    // setting YES button actions
    yesBtn.addEventListener('click', modalFunc);
    
  }); 

});

let closeModal = () => {
  try {
    document.querySelector(".modal.active").classList.remove("active");
  } catch {
      // no modal windows on page
  }
};

//  button YES pressed - default action
// document.querySelectorAll(".modal__button_yes").forEach((item) => {
//   item.addEventListener("click", () => {
//     closeModal();
//   });
// })

//  button NO pressed - default action
document.querySelectorAll(".modal__button_no").forEach((item) => {
  item.addEventListener("click", () => {
    closeModal();
  });
});

let makeSearch = (inputId, tableId) => {
  let phrase = document.getElementById(inputId);
  let table = document.getElementById(tableId);

  phrase.addEventListener("input", () => {
    let regPhrase = new RegExp(phrase.value, "i");
    let flag = false;

    for (let i = 1; i < table.rows.length; i++) {
      flag = false;

      for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
        flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
        if (flag) break;
      }

      flag
        ? (table.rows[i].style.display = "")
        : (table.rows[i].style.display = "none");
    }
  });
};

let makeSidebar = (btnId, sidebarId) => {
  let btn = document.getElementById(btnId);
  let sidebar = document.getElementById(sidebarId);
  let sidebarBlocks = document.getElementsByClassName("sidebar__block");

  btn.addEventListener("click", function () {
    showSidebar();
    for (let block of sidebarBlocks) {
      block.style.display = "none";
    }
    sidebar.style.display = "block";
  });
};
let showSidebar = () => {
  document.body.classList.add("on-modal-body");
  document.getElementById("dimming").classList.add("on-modal-dimming");
  document.getElementById("sidebarS").classList.add("on-modal-sidebar");
};

let closeSidebar = () => {
  document.body.classList.remove("on-modal-body");
  document.getElementById("dimming").classList.remove("on-modal-dimming");
  document.getElementById("sidebarS").classList.remove("on-modal-sidebar");
};

// sidebar close button
document
  .getElementById("sidebar-close-btn")
  .addEventListener("click", function () {
    closeSidebar();
    // openModal();
  });
//  sidebar closing
document.body.addEventListener("click", function () {
  let target = arguments[0].target;
  let sidebar = document.getElementById("sidebarS");

  let modals = document.getElementsByClassName('modal');
  let flag = false;
  for(let modal of modals){
    if (target == modal || modal.contains(target)) {
      flag = true;
      break;
    }
  }
  if (
    !sidebar.contains(target) &&
    !target.classList.contains("ico") &&
    !target.classList.contains("t-item") &&
    target.tagName !== "A" &&
    !target.getAttribute("data-sidebar") == "1" && !flag
  ) {
    
    closeSidebar();
    closeModal();
    
  }
});

// CHOICE FIELD / SELECT

let select = function () {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItem = document.querySelectorAll(".select__item");

  selectHeader.forEach((item) => {
    if (!item.classList.contains("select__header_unclickable"))
      item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  function selectToggle() {
    let selects = document.getElementsByClassName("select__header");
    for (let select of selects) {
      if (this != select) select.parentElement.classList.remove("is-active");
    }

    this.parentElement.classList.toggle("is-active");
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest(".select"),
      currentText = select.querySelector(".select__current");
    currentText.innerText = text;
    select.classList.remove("is-active");
  }
};

select();
 
 // SETTINGS POP-UP

let settings = document.getElementById("settings"),
    settingsBlock = document.getElementById("settings-block"),
    closeSettingsBtn = document.getElementById("close-settings");

let openSettings = () => {
  settingsBlock.style.display = "flex";
};

let closeSettings = () => {
  settingsBlock.style.display = "none";
};

settings.addEventListener("click", function() {
    if (settingsBlock.style.display == "flex") {
      closeSettings();
    } else {
      openSettings();
    }
});

closeSettingsBtn.addEventListener('click', function () {
    closeSettings();
});


// POP-UPS CLOSING

document.body.addEventListener('click', function () {
    let target = arguments[0].target;
    if (!settingsBlock.contains(target) && target != settings && !target.classList.contains('ico')) {
        closeSettings();
    }
});


// SETTING-UP SIDEBARS

makeSidebar("question", "sidebar-question");
makeSidebar("information", "sidebar-information");

makeSidebar("supplier-add-btn", "sidebar-add-supplier");
makeSidebar("supplier-add-btn-2", "sidebar-add-supplier");
makeSidebar("warehouse-add-btn", "sidebar-add-warehouse");
makeSidebar("warehouse-add-btn-2", "sidebar-add-warehouse");

makeSidebar("goods-count-1", "sidebar-goods-count");
makeSidebar("goods-count-2", "sidebar-goods-count");
makeSidebar("goods-count-3", "sidebar-goods-count");

for(let i = 1; i <= 10; i++){
  makeSidebar(`goods-view-${i}`, "sidebar-goods-view");
}

makeSidebar("cell-menu", "sidebar-goods-count");

makeSidebar("excel-download", "sidebar-excel-download");

makeSidebar("download-goods-excel", "sidebar-download-goods-excel");
makeSidebar("prices-setting", "sidebar-prices-setting");


makeSearch("prices-search", "prices-main-table");
makeSearch("filters-search", "filters-table");
 
 let inputs = document.querySelectorAll("input[type='file']");
let labels = document.querySelectorAll("label");

for (let ind = 0; ind < inputs.length; ind++) {
  let input = inputs[ind];
  
  input.addEventListener("change", () => {
    for (let label of labels) {
      if (label.getAttribute("data-label") === input.getAttribute("data-label")) {
        filename = input.files[0].name;
        label.setAttribute('title', filename);
        if (filename.length > 15) {
          filename = filename.slice(0, 11) + "...";
        }
        label.innerHTML = filename;
        
        break;
      }
    }
  });
}
 
 // SLIDER
let slides = document.querySelectorAll(".slide");
let btns = document.querySelectorAll(".btn");
let currentSlide = 1;

let manualNav = function (manual) {
  slides.forEach((slide) => {
    slide.classList.remove("active-slide");

    btns.forEach((btn) => {
      btn.classList.remove("active-slide");
    });
  });

  slides[manual].classList.add("active-slide");
  btns[manual].classList.add("active-slide");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});
 