// 获取元素
function getElem(selector) {
  return document.querySelector(selector);
}
function getAllElem(selector) {
  return document.querySelectorAll(selector);
}

// 获取元素样式
function getCls(element) {
  return element.getAttribute("class");
}

// 设置元素样式
function setCls(element, cls) {
  return element.setAttribute("class", cls);
}

// 为元素添加样式
function addCls(element, cls) {
  var baseCls = getCls(element);
  if (baseCls.indexOf(cls) === -1) {
    setCls(element, baseCls + " " + cls);
  }
}

// 为元素删除样式
function delCls(element, cls) {
  var baseCls = getCls(element);
  if (baseCls.indexOf(cls) != -1) {
    setCls(element, baseCls.split(cls).join(" ").replace(/\s+/g, " "));
  }
}

// 第一步：初始化样式 init

var screenAnimateElements = {
  // 当前屏哪些元素有动画
  ".screen-1": [".screen-1__heading", ".screen-1__phone", ".screen-1__shadow"],
  ".screen-2": [
    ".screen-2__heading",
    ".screen-2__subheading",
    ".screen-2__phone",
    ".screen-2__point",
    ".screen-2__point_i_1",
    ".screen-2__point_i_2",
    ".screen-2__point_i_3",
  ],
  ".screen-3": [
    ".screen-3__heading",
    ".screen-3__subheading",
    ".screen-3__phone",
    ".screen-3__box",
    ".screen-3__box__item",
  ],
  ".screen-4": [
    ".screen-4__heading",
    ".screen-4__subheading",
    ".screen-4__phone__item1",
    ".screen-4__phone__item2",
    ".screen-4__phone__item3",
    ".screen-4__phone__item4",
  ],
  ".screen-5": [
    ".screen-5__heading",
    ".screen-5__subheading",
    ".screen-5__phone",
  ],
};

// 设置屏内元素为初始状态
function setScreenAnimateInit(screenCls) {
  var screen = document.querySelector(screenCls); // 获取当前是第几屏
  var animateElements = screenAnimateElements[screenCls]; //需要设置动画的元素

  for (var i = 0; i < animateElements.length; i++) {
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute("class");

    element.setAttribute(
      "class",
      baseCls + " " + animateElements[i].substr(1) + "_animate_init"
    );
  }
}

// 设置播放屏内的元素动画
function playScreenAnimateDone(screenCls) {
  var screen = document.querySelector(screenCls); // 获取当前是第几屏
  var animateElements = screenAnimateElements[screenCls]; //需要设置动画的元素

  for (var i = 0; i < animateElements.length; i++) {
    var element = document.querySelector(animateElements[i]);
    var baseCls = element.getAttribute("class");

    element.setAttribute(
      "class",
      baseCls.replace("_animate_init", "_animate_done")
    );
  }
}

window.onload = function () {
  for (k in screenAnimateElements) {
    if(k === '.screen-1'){
      continue;
    }
    setScreenAnimateInit(k);
  }
};

setTimeout(() => {
  playScreenAnimateDone('.screen-1');
}, 500);

// 第二步：滚动到的地方播放动画
var navItems = getAllElem(".header__nav-item");
var outlineItems = getAllElem(".outline__item");

function switchNavItemsActive(idx) {
  for (var i = 0; i < navItems.length; i++) {
    delCls(navItems[i], "header__nav-item_status_active");
  }
  addCls(navItems[idx], "header__nav-item_status_active");

  for (var i = 0; i < navItems.length; i++) {
    delCls(outlineItems[i], "outline__item_status_active");
  }
  addCls(outlineItems[idx], "outline__item_status_active");
}

switchNavItemsActive(0);
window.onscroll = function () {
  var top = document.documentElement.scrollTop;
  switchNavItemsActive(0);

  if (top > 80) {
    addCls(getElem(".header"), "header_status_back");
    addCls(getElem(".outline"), "outline_status_in");
  } else {
    delCls(getElem(".header"), "header_status_back");
    delCls(getElem(".outline"), "outline_status_in");
  }

  if (top > 1) {
    playScreenAnimateDone(".screen-1");
    // switchNavItemsActive(0);
  }
  if (top > 800 - 100) {
    playScreenAnimateDone(".screen-2");
    switchNavItemsActive(1);
  }
  if (top > 800 * 2 - 100) {
    playScreenAnimateDone(".screen-3");
    switchNavItemsActive(2);
  }
  if (top > 800 * 3 - 100) {
    playScreenAnimateDone(".screen-4");
    switchNavItemsActive(3);
  }
  if (top > 800 * 4 - 100) {
    playScreenAnimateDone(".screen-5");
    switchNavItemsActive(4);
  }
};

// 第三步：双向定位

function setNavJump(i, lib) {
  var item = lib[i];
  item.onclick = function () {
    document.documentElement.scrollTop = i * 800;
  };
}

for (var i = 0; i < navItems.length; i++) {
  setNavJump(i, navItems);
}
for (var i = 0; i < outlineItems.length; i++) {
  setNavJump(i, outlineItems);
}

// 第四步，滑动门特效
var navTip = getElem(".header__nav-tip");

function setTip(idx, lib) {
  var activeIdx = 0;

  lib[idx].onmouseover = function () {
    navTip.style.left = idx * 75 + "px";
  };
  lib[idx].onmouseout = function () {
    for(let i = 0; i < lib.length; i++){
      if(getCls(lib[i]).indexOf('header__nav-item_status_active') > -1){
        activeIdx = i;
        break;
      }
    }
    navTip.style.left = (activeIdx * 75) + "px";

  };
}

for (let i = 0; i < navItems.length; i++) {
  setTip(i, navItems);
}
