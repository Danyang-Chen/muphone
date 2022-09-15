// 当前屏哪些元素有动画
var screenAnimateElements = {
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

function setScreenAnimate(screenCls) {
  var screen = document.querySelector(screenCls); // 获取当前是第几屏
  var animateElements = screenAnimateElements[screenCls]; //需要设置动画的元素

  var isSetAnimateClass = false; //是否有初始化子元素的样式
  var isAnimateDone = false; //当前屏下所有子元素的状态是done嘛？

  screen.onclick = function () {
    // 初始化样式，增加init
    if (isSetAnimateClass === false) {
      for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute("class");

        element.setAttribute(
          "class",
          baseCls + " " + animateElements[i].substr(1) + "_animate_init"
        );
      }
      isSetAnimateClass = true;
      return;
    }

    // 切换所有 animateElements 的 init -> done

    if (isAnimateDone === false) {
      for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute("class");

        element.setAttribute(
          "class",
          baseCls.replace("_animate_init", "_animate_done")
        );
      }
      isAnimateDone = true;
      return;
    }

    // 切换所有 animateElements 的 done -> init

    if (isAnimateDone === true) {
      for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute("class");

        element.setAttribute(
          "class",
          baseCls.replace("_animate_done", "_animate_init")
        );
      }
      isAnimateDone = false;
      return;
    }
  };
}

// 执行函数，for in 遍历出对象的key
// setScreenAnimate('.screen-1');
// setScreenAnimate('.screen-2');
for (k in screenAnimateElements) {
  setScreenAnimate(k);
}
