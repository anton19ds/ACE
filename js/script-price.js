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
 
let stagesBlocks = document.getElementsByClassName("stages");
let allStages = document.getElementsByClassName("stage");

for(let stage of allStages) {
    
    stage.addEventListener('click', () => {
        let dataBlock = stage.parentElement.getAttribute("data-block");
        let block = document.querySelectorAll(
          '.stages[data-block="' + dataBlock + '"]'
        )[0];
        for (let st of allStages) {
            if (block.contains(st)) {
                st.classList.remove("stage-primary");
            }
        }
        stage.classList.add("stage-primary");
        
        if (dataBlock < 4) {
            let nextBlock = document.querySelectorAll(
              '.stages[data-block="' + Number(Number(dataBlock) + 1) + '"]'
            )[0];
              
            let headerHint = block.parentElement.children[0].children[1].children[0];
           
            headerHint.innerHTML = stage.children[1].innerHTML;
            nextBlock.previousElementSibling.previousElementSibling.click();
        }
        
    });
}

let makeGroup = (groupHeaderId) => {
  let group = document.getElementById(groupHeaderId);
  let groupStages = group.nextElementSibling.nextElementSibling;
  let groupBlock = group.parentElement;
  group.addEventListener("click", function () {
    for (let block of document.getElementsByClassName("sidebar__subblock")) {
      block.classList.remove("active");
    }
    groupBlock.classList.add("active");
    groupStages.classList.add("active");

    let subblocks = document.getElementsByClassName("sidebar__subblock");
    let flag = false;
    let ind = -1;
    let beforeBlockoffset = "-19rem";
    let afterBlockoffset = "10rem";
    for (let block of subblocks) {
      if (!flag) {
        block.style.left = `calc(${beforeBlockoffset} + ` + ind * 2 + "rem)";

        block.style.borderTop = "2px solid rgba(0, 0, 0, 1)";
        block.style.borderBottom = "none";
      } else {
        block.style.left = `calc(${afterBlockoffset} + ` + ind * 3 + "rem)";
        block.style.borderBottom = "2px solid rgba(0, 0, 0, 1)";
        block.style.borderTop = "none";
      }

      if (window.screen.width <= 768) {
        block.style.borderBottom = "2px solid rgba(0, 0, 0, 1)";
        block.style.borderTop = "none";
        block.style.marginBottom = "1rem";
      }
      if (block.classList.contains("active")) {
        flag = true;
        block.style.border = "none";
        if (window.screen.width <= 768) {
          block.style.position = "initial";
          block.style.margin = 0;
        }
      }
      ind++;
    }
  });
};

// NEXT GROUP BUTTONS
// for (let i = 1; i < 4; i++) {
//   let nextBtn = document.getElementById("stage-next-btn-" + i);
//   nextBtn.addEventListener("click", function () {
//     document
//       .getElementById(
//         "goods-group-header-" + (Number(this.id[this.id.length - 1]) + 1)
//       )
//       .click();
//   });
// }

let nextBtns = document.getElementsByClassName("stage-next-btn");

for (let btn of nextBtns) {
  btn.addEventListener("click", () => {
    let nextBlock = Number(btn.parentElement.parentElement.getAttribute("data-block")) + 1;
    let block = document.querySelectorAll(
      '.stages[data-block="' + nextBlock + '"]'
    )[0];
    block.previousElementSibling.previousElementSibling.click();
  });
}

// TEXTAREA SYMBOLS COUNTER
let makeSymbolsCounter = (textareaId, counterId) => {
  let textarea = document.getElementById(textareaId);
  textarea.addEventListener("input", function () {
    let currentLength = this.value.length;
    document.getElementById(counterId).innerHTML = currentLength;
  });
};

// SETTING-UP SYMBOLS COUNTERS
makeSymbolsCounter("textarea-goods-desc", "textarea-symbols-cnt");
makeSymbolsCounter("textarea-goods-desc-2", "textarea-symbols-cnt-2");

// SETTING-UP SIDEBARS
makeSidebar("question-catalog", "sidebar-question-catalog");
makeSidebar("goods-view", "sidebar-goods-view");
makeSidebar("excel-download-suggest", "sidebar-excel-download");
makeSidebar("excel-download", "sidebar-excel-download");
makeSidebar("goods-group-1", "sidebar-goods-group");
makeSidebar("goods-group-2", "sidebar-goods-group");
makeSidebar("goods-desc-1", "sidebar-goods-desc-1");
makeSidebar("goods-brand-1", "sidebar-goods-brand-1");

makeSidebar("goods-adding", "sidebar-goods-adding");
makeSidebar("goods-adding-download", "sidebar-excel-download");

// SETTING-UP GOODS GROUPS

makeGroup("goods-group-header-1");
makeGroup("goods-group-header-2");
makeGroup("goods-group-header-3");
makeGroup("goods-group-header-4");
 
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
 