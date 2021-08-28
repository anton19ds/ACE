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

for(let i = 1; i <=7; i++)  
    makeSidebar(`goods-view-${i}`, "sidebar-goods-view");
    
makeSearch("goods-search", "main-table");
 
let main = document.getElementsByTagName("main")[0];
let menuButton = document.getElementById("menu-btn");

let adaptTable = () => {
    if (document.documentElement.clientWidth <= 1375) {
      document.getElementById("nav").style.display = "none";
      menuButton.style.display = "block";
      menuButton.style.top = "calc(10vh + 1.5rem)";

      main.style.width = "100%";
      main.style.left = "0";
      main.style.top = "calc(10vh + 4rem)";
    }
    if (document.documentElement.clientWidth <= 1024) {
      menuButton.style.top = "1rem";
      main.style.top = "0rem";
    }
}

window.onresize = function () {
    adaptTable()
};
adaptTable();
 
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

// MOBILE MENU

// let menuBtn = document.getElementById("menu-btn");
// let closeMenuBtn = document.getElementById("close-menu-btn");
// let menu = document.getElementById("menu");

// menuBtn.addEventListener("click", function () {
//   menu.classList.toggle("menu-active");
//   menuBtn.style.display = "none";
// });

// closeMenuBtn.addEventListener("click", function () {
//   menu.classList.remove("menu-active");
//   menuBtn.style.display = "block";
// });
  
 