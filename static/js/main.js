/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloneJSON: function() { return /* binding */ cloneJSON; },
/* harmony export */   throttle: function() { return /* binding */ throttle; },
/* harmony export */   transformObjectToParams: function() { return /* binding */ transformObjectToParams; },
/* harmony export */   transformToCamelCase: function() { return /* binding */ transformToCamelCase; },
/* harmony export */   transformToKebabCase: function() { return /* binding */ transformToKebabCase; }
/* harmony export */ });
function throttle(fn, thisArg) {
  if (thisArg === void 0) {
    thisArg = window;
  }
  var scheduledAnimationFrame;
  return function () {
    if (scheduledAnimationFrame) {
      return;
    }
    scheduledAnimationFrame = true;
    requestAnimationFrame(function () {
      fn.call(thisArg);
      scheduledAnimationFrame = false;
    });
  };
}
function transformToCamelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}
function transformToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function cloneJSON(json) {
  return JSON.parse(JSON.stringify(json));
}
function transformObjectToParams(obj) {
  return Object.keys(obj).reduce(function (arr, key) {
    return arr.concat(key + "=" + encodeURIComponent(obj[key]));
  }, []).join('&');
}

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ../src/scripts/initializations/update-js-assets-path.js
var _window = window,
  staticJsAssetsPath = _window.staticJsAssetsPath;
if (staticJsAssetsPath) {
  __webpack_require__.p = staticJsAssetsPath;
}
/* harmony default export */ var update_js_assets_path = (null);
;// CONCATENATED MODULE: ../src/scripts/initializations/browser-detect.js
var _document = document,
  html = _document.documentElement;
var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
html.classList.add(isTouch ? 'touch' : 'no-touch');
if (typeof InstallTrigger !== 'undefined') {
  html.classList.add('firefox');
}
var isIOSPlatform = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform);
if (isIOSPlatform || navigator.userAgent.includes('Mac') && isTouch) {
  html.classList.add('ios');
}
var isIE = document.documentMode;
if (isIE) {
  html.classList.add('ie');
}
if (!isIE && window.StyleMedia) {
  html.classList.add('edge');
}
var isChrome = !!window.chrome;
if (isChrome) {
  html.classList.add('chrome');
}
if (isChrome && navigator.userAgent.indexOf('Edg') > -1) {
  html.classList.add('edge-chromium');
}
/* harmony default export */ var browser_detect = (null);
;// CONCATENATED MODULE: ../src/scripts/initializations/import-jquery-plugins.js
/* provided dependency */ var $ = __webpack_require__(0);
window.devj = $;
/* harmony default export */ var import_jquery_plugins = (null);
// EXTERNAL MODULE: ../src/scripts/utils/index.js
var utils = __webpack_require__(1);
;// CONCATENATED MODULE: ../src/scripts/utils/doms.js
/* provided dependency */ var doms_$ = __webpack_require__(0);
var $win = doms_$(window);
var $doc = doms_$(document);
var $html = doms_$('html');
var $body = doms_$('body');
var $canFixed = doms_$(['.header'].join(','));
;// CONCATENATED MODULE: ../src/scripts/breakpoint.json
var breakpoint_namespaceObject = JSON.parse('{"XS":0,"SM":540,"MD":768,"LG":992,"XL":1440}');
;// CONCATENATED MODULE: ../src/scripts/utils/layout.js
/* provided dependency */ var layout_$ = __webpack_require__(0);


var layout_document = document,
  body = layout_document.body,
  layout_html = layout_document.documentElement;
var freezeClass = '--freeze';
var addBorderClass = '--add-fixed-border';
var lockTimeout;
var lastScroll;
var $header = layout_$('.header');
function calculateScrollWidth() {
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.width = '100%';
  div.style.height = '50px';
  body.appendChild(div);
  var fullWidth = div.offsetWidth;
  div.style.overflowY = 'scroll';
  var limitWidth = div.clientWidth;
  body.removeChild(div);
  var scrollWidth = fullWidth - limitWidth;
  layout_html.classList.add("--scroll-" + scrollWidth);
  return scrollWidth;
}
var scrollWidth = calculateScrollWidth();
var lang = layout_html.getAttribute('lang') || '';
var isRTL = layout_html.getAttribute('dir') === 'rtl';
var isIOS = layout_html.classList.contains('ios');
var layout_isIE = layout_html.classList.contains('ie') || layout_html.classList.contains('edge');
/* harmony default export */ var layout = ({
  scrollWidth: scrollWidth,
  lang: lang,
  isRTL: isRTL,
  isIOS: isIOS,
  isIE: layout_isIE,
  get screenWidth() {
    return window.innerWidth;
  },
  get width() {
    return body.clientWidth;
  },
  get height() {
    return window.innerHeight;
  },
  get bodyHeight() {
    return body.offsetHeight;
  },
  get isFrozen() {
    return body.classList.contains(freezeClass);
  },
  get isDesktop() {
    return this.screenWidth >= breakpoint_namespaceObject.LG;
  },
  get isTablet() {
    return this.screenWidth >= breakpoint_namespaceObject.MD;
  },
  get isMobile() {
    return !this.isDesktop;
  },
  get isSmallScreen() {
    return this.screenWidth < breakpoint_namespaceObject.LG;
  },
  get scroll() {
    return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  },
  set scroll(top) {
    window.scrollTo({
      top: top,
      left: 0,
      behavior: 'smooth'
    });
  },
  scrollImmediate: function scrollImmediate(top) {
    window.scrollTo(0, top);
  },
  scrollToElement: function scrollToElement($element, immediately) {
    if (!$element[0]) {
      return;
    }
    if (!$header[0]) {
      $header = layout_$('.header');
    }
    var scrollTo = $element.offset().top - ($header.outerHeight() || 0);
    if (immediately) {
      this.scrollImmediate(scrollTo);
    } else {
      this.scroll = $element.offset().top - ($header.outerHeight() || 0);
    }
  },
  freeze: function freeze(callback) {
    var _this = this;
    clearTimeout(lockTimeout);
    setTimeout(function () {
      window.isFreezing = true;
      var willBeFrozen = !_this.isFrozen;
      if (!willBeFrozen) {
        if (typeof callback === 'function') {
          callback();
        }
        return;
      }
      if (_this.isIOS) {
        lastScroll = _this.scroll;
        body.style.top = -lastScroll + "px";
      }
      body.classList.add(freezeClass);
      if (_this.bodyHeight > _this.height) {
        body.classList.add(addBorderClass);
        $canFixed.each(function (_, element) {
          if (window.getComputedStyle(element).position === 'fixed') {
            element.classList.add(addBorderClass);
          }
        });
      }
      if (_this.isIOS) {
        _this.scrollImmediate(0);
      }
      if (typeof callback === 'function') {
        callback();
      }
    });
  },
  unfreeze: function unfreeze(callback) {
    var _this2 = this;
    clearTimeout(lockTimeout);
    lockTimeout = setTimeout(function () {
      window.isFreezing = false;
      if (!_this2.isFrozen) {
        if (typeof callback === 'function') {
          callback();
        }
        return;
      }
      body.classList.remove(freezeClass);
      body.classList.remove(addBorderClass);
      $canFixed.removeClass(addBorderClass);
      if (_this2.isIOS) {
        body.style.top = '';
        _this2.scrollImmediate(lastScroll);
        if (typeof callback === 'function') {
          setTimeout(function () {
            callback();
          }, 50);
        }
      } else if (typeof callback === 'function') {
        callback();
      }
    });
  }
});
;// CONCATENATED MODULE: ../src/scripts/initializations/improve-window-events.js



var passiveIfSupported = false;
var lastWinScroll = layout.scroll;
var resizeTimeout;
var lastWinWidth = layout.width;
var lastWinHeight = layout.height;
var lastBreakpointIsDesktop = layout.isDesktop;
var RESIZE_TIME = 180;
try {
  var passive = Object.defineProperty({}, 'passive', {
    get: function get() {
      passiveIfSupported = {
        passive: true
      };
      return true;
    }
  });
  window.addEventListener('test', null, passive);
} catch (err) {/**/}
window.addEventListener('scroll', (0,utils.throttle)(function () {
  var currentWinScroll = layout.scroll;
  if (currentWinScroll === lastWinScroll) {
    return;
  }
  var name = currentWinScroll < lastWinScroll ? 'up' : 'down';
  $win.trigger('scrolling', currentWinScroll);
  $win.trigger("scroll:" + name, currentWinScroll);
  lastWinScroll = currentWinScroll;
}), passiveIfSupported);
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  setTimeout(function () {
    var currentWinWidth = layout.width;
    var currentWinHeight = layout.height;
    var isWidthChanged = lastWinWidth !== currentWinWidth;
    var isHeightChanged = lastWinHeight !== currentWinHeight;
    $win.trigger('resized', [currentWinWidth, currentWinHeight]);
    if (isWidthChanged) {
      $win.trigger('width-change', currentWinWidth);
      var currentBreakpointIsDesktop = layout.isDesktop;
      if (lastBreakpointIsDesktop !== currentBreakpointIsDesktop) {
        // Prevent conflict event name with slick
        $win.trigger('breakpoint:change', currentWinWidth);
        var breakpointEvtName = currentBreakpointIsDesktop ? 'desktop' : 'mobile';
        $win.trigger("breakpoint:" + breakpointEvtName, currentWinWidth);
        lastBreakpointIsDesktop = currentBreakpointIsDesktop;
      }
      lastWinWidth = currentWinWidth;
    }
    if (isHeightChanged) {
      $win.trigger('height-change', currentWinHeight);
      lastWinHeight = currentWinHeight;
    }
    if (isWidthChanged && isHeightChanged) {
      $win.trigger('size-change', currentWinWidth, currentWinHeight);
    }
  }, RESIZE_TIME);
}, passiveIfSupported);
// EXTERNAL MODULE: ../src/scripts/_libs/jquery-ui.min.js
var jquery_ui_min = __webpack_require__(3);
// EXTERNAL MODULE: ../src/scripts/_libs/jquery.ui.touch-punch.min.js
var jquery_ui_touch_punch_min = __webpack_require__(4);
;// CONCATENATED MODULE: ../src/scripts/plugins/menu.js
/* provided dependency */ var Plugin = __webpack_require__(5)["default"];
/* provided dependency */ var menu_$ = __webpack_require__(0);
var _dec, _class;

var classes = {
  header: '.header',
  activeHeader: 'active-header',
  activeHeaderMobile: 'active-header-mobile',
  headerBurger: '.header__burger',
  activeSearch: 'open-search',
  activeModal: 'open-modal',
  headerSearch: '.search',
  searchForm: '.search__form',
  iconSearch: '.search__icon',
  btnBook: '.btn-book',
  btnBookMobile: '.header__tools-book',
  headerBook: '.header__button',
  activeBook: 'open-book',
  scrolled: 'scrolled',
  clearSearch: '.search__form-clear',
  inputSearch: '.search__form-input',
  iconSearchMobile: '.search-mobile',
  activeSearchMobile: 'open-search-mobile',
  activeModalMobile: 'open-modal-mobile',
  bottomNav: '.header__bottom-nav',
  navArrow: '.nav-item__arrow',
  navItem: '.nav-item',
  navLink: '.nav-link',
  activeNav: 'active-nav',
  headerMobile: '.header__mobile',
  headerMobileBackLink: '.header__mobile-back-link',
  headerMobileBack: '.header__mobile-back',
  headerMobileClose: '.header__mobile-close',
  msgError: '.msg--error',
  megaMenu: '.mega-menu'
};
var header = classes.header,
  activeHeader = classes.activeHeader,
  activeHeaderMobile = classes.activeHeaderMobile,
  headerBurger = classes.headerBurger,
  activeSearch = classes.activeSearch,
  activeModal = classes.activeModal,
  headerSearch = classes.headerSearch,
  searchForm = classes.searchForm,
  iconSearch = classes.iconSearch,
  btnBook = classes.btnBook,
  btnBookMobile = classes.btnBookMobile,
  headerBook = classes.headerBook,
  activeBook = classes.activeBook,
  scrolled = classes.scrolled,
  clearSearch = classes.clearSearch,
  inputSearch = classes.inputSearch,
  iconSearchMobile = classes.iconSearchMobile,
  activeSearchMobile = classes.activeSearchMobile,
  activeModalMobile = classes.activeModalMobile,
  bottomNav = classes.bottomNav,
  navArrow = classes.navArrow,
  navItem = classes.navItem,
  navLink = classes.navLink,
  activeNav = classes.activeNav,
  headerMobile = classes.headerMobile,
  headerMobileBack = classes.headerMobileBack,
  headerMobileBackLink = classes.headerMobileBackLink,
  headerMobileClose = classes.headerMobileClose,
  msgError = classes.msgError,
  megaMenu = classes.megaMenu;
var Menu = (_dec = Plugin(), _dec(_class = /*#__PURE__*/function () {
  function Menu() {
    this.watch = {
      isMenuActive: function isMenuActive(value) {
        $body.toggleClass(activeHeader, value);
      },
      isSearchActive: function isSearchActive(value) {
        this.$search.toggleClass(activeSearch, value);
      },
      isBookActive: function isBookActive(value) {
        this.$headerBook.toggleClass(activeBook, value);
      },
      isModalActive: function isModalActive(value) {
        this.$header.toggleClass(activeModal, value);
      },
      isSearchMobileActive: function isSearchMobileActive(value) {
        this.$iconSearchMobile.toggleClass(activeSearchMobile, value);
      },
      isModalMobileActive: function isModalMobileActive(value) {
        this.$header.toggleClass(activeModalMobile, value);
      }
    };
  }
  var _proto = Menu.prototype;
  _proto.init = function init() {
    var _this = this;
    this.initState();
    this.initDOM();
    this.initEvents();
    this.addSportTitle();
    this.handleScroll();
    this.handleClearSearchForm();
    this.handleNavItemArrowClick();
    this.handleBackLinkClick();
    this.handleSubmitSearch();
    this.handleOutsideSearchClick();
    this.handleOutsideBtnBookClick();
    this.handleHeaderMobileCloseClick();
    menu_$([this.$iconSearch, this.$btnBook]).each(function (_, el) {
      return _this.handleBtnBookClick(el);
    });
    menu_$([this.$iconSearchMobile, this.$btnBookMobile, this.$burger]).each(function (_, el) {
      _this.handleIconMobileClick(el);
    });
  };
  _proto.initState = function initState() {
    this.addState('isMenuActive', false);
    this.addState('isSearchActive', false);
    this.addState('isBookActive', false);
    this.addState('isModalActive', false);
    this.addState('isSearchMobileActive', false);
    this.addState('isModalMobileActive', false);
  };
  _proto.initDOM = function initDOM() {
    this.$burger = this.$element.find(headerBurger);
    this.$iconSearch = this.$element.find(iconSearch);
    this.$search = this.$element.find(headerSearch);
    this.$searchForm = this.$element.find(searchForm);
    this.$header = menu_$(header);
    this.$btnBook = this.$element.find(btnBook);
    this.$btnBookMobile = this.$element.find(btnBookMobile);
    this.$headerBook = this.$element.find(headerBook);
    this.$iconSearchMobile = this.$element.find(iconSearchMobile);
    this.$clearSearch = this.$element.find(clearSearch);
    this.$bottomNav = this.$element.find(bottomNav);
    this.$headerMobile = this.$element.find(headerMobile);
    this.$headerMobileBack = this.$element.find(headerMobileBack);
    this.$headerMobileBackLink = this.$element.find(headerMobileBackLink);
    this.$headerMobileClose = this.$element.find(headerMobileClose);
    this.$inputSearch = this.$element.find(inputSearch);
    this.$msgError = this.$element.find(msgError);
  };
  _proto.initEvents = function initEvents() {
    this.addEvent(this.$burger, 'click', this.onBurgerClick);
    this.addEvent(this.$iconSearch, 'click', this.onIconSearchClick);
    this.addEvent(this.$btnBook, 'click', this.onBtnBookClick);
    this.addEvent(this.$iconSearchMobile, 'click', this.onIconSearchClick);
    this.addEvent(this.$btnBookMobile, 'click', this.onBtnBookClick);
  };
  _proto.onBurgerClick = function onBurgerClick() {
    if (this.state.isMenuActive) {
      menu_$("." + activeNav).removeClass(activeNav);
    }
    if (!this.state.isMenuActive) {
      this.state.isMenuActive = !this.state.isMenuActive;
    }
    if (this.state.isSearchActive) this.state.isSearchActive = !this.state.isSearchActive;
    if (this.state.isBookActive) this.state.isBookActive = !this.state.isBookActive;
    this.onExceptSearchMobileClick();
  };
  _proto.onIconSearchClick = function onIconSearchClick() {
    this.state.isSearchActive = !this.state.isSearchActive;
    if (this.state.isBookActive) this.state.isBookActive = !this.state.isBookActive;
    if (this.state.isMenuActive) this.state.isMenuActive = !this.state.isMenuActive;
    this.onModalActive();
    this.onIconSearchMobileClick();
  };
  _proto.onIconSearchMobileClick = function onIconSearchMobileClick() {
    this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
    this.onModalMobileActive();
  };
  _proto.onBtnBookClick = function onBtnBookClick() {
    this.state.isBookActive = !this.state.isBookActive;
    if (this.state.isSearchActive) this.state.isSearchActive = !this.state.isSearchActive;
    if (this.state.isMenuActive) this.state.isMenuActive = !this.state.isMenuActive;
    if (this.state.isSearchMobileActive) {
      this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
    }
    this.onModalActive();
    this.onModalMobileActive();
  };
  _proto.onModalActive = function onModalActive() {
    if (this.state.isSearchActive || this.state.isBookActive) this.state.isModalActive = true;
    if (!this.state.isSearchActive && !this.state.isBookActive) this.state.isModalActive = false;
  };
  _proto.onModalMobileActive = function onModalMobileActive() {
    if (this.state.isSearchActive || this.state.isBookActive) this.state.isModalMobileActive = true;
    if (!this.state.isSearchActive && !this.state.isBookActive) {
      this.state.isModalMobileActive = false;
    }
  };
  _proto.onExceptSearchMobileClick = function onExceptSearchMobileClick() {
    if (this.state.isSearchMobileActive) {
      this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
    }
    if (this.state.isModalMobileActive) {
      this.state.isModalMobileActive = !this.state.isModalMobileActive;
    }
  };
  _proto.handleScroll = function handleScroll() {
    var _this2 = this;
    $win.on('scroll', function () {
      if ($doc.scrollTop() > 0) {
        _this2.$header.addClass(scrolled);
      } else {
        _this2.$header.removeClass(scrolled);
      }
    });
  };
  _proto.handleClearSearchForm = function handleClearSearchForm() {
    var _this3 = this;
    this.$inputSearch.on('input', function () {
      if (menu_$(_this3.$inputSearch).val().length > 0) {
        menu_$(_this3.$clearSearch).show();
      }
      if (menu_$(_this3.$inputSearch).val().length === 0) {
        menu_$(_this3.$clearSearch).hide();
      }
    });
    this.$clearSearch.on('click', function (e) {
      var target = e.target.closest(clearSearch);
      if (target) {
        _this3.$element.find(inputSearch).val('');
        menu_$(_this3.$clearSearch).hide();
        menu_$(_this3.$inputSearch).trigger('focus');
      }
    });
  };
  _proto.handleSubmitSearch = function handleSubmitSearch() {
    var _this4 = this;
    this.$searchForm.on('submit', function (e) {
      e.preventDefault();
      if (menu_$(_this4.$inputSearch).val() === '') {
        menu_$(_this4.$inputSearch).trigger('focus');
        menu_$(_this4.$msgError).show();
      }
    });
    this.$inputSearch.on('input', function () {
      return menu_$(_this4.$msgError).hide();
    });
  };
  _proto.handleBtnBookArrow = function handleBtnBookArrow() {
    if (menu_$(this.$headerBook).hasClass(activeBook)) {
      $body.addClass(activeBook);
      menu_$(this.$btnBookMobile).addClass('active');
    } else {
      $body.removeClass(activeBook);
      menu_$(this.$btnBookMobile).removeClass('active');
    }
  };
  _proto.handleIconMobileClick = function handleIconMobileClick(el) {
    var _this5 = this;
    menu_$(el).on('click', function (e) {
      var target = menu_$(e.target).closest(el);
      if (!target.length) return;
      if (_this5.$header.hasClass(activeModalMobile)) {
        $body.addClass(activeHeaderMobile);
      } else {
        $body.removeClass(activeHeaderMobile);
      }
      _this5.handleBtnBookArrow();
    });
  };
  _proto.handleBtnBookClick = function handleBtnBookClick(el) {
    var _this6 = this;
    menu_$(el).on('click', function (e) {
      var target = e.target.closest(btnBook);
      if (!target) return;
      _this6.handleBtnBookArrow();
    });
  };
  _proto.handleNavItemArrowClick = function handleNavItemArrowClick() {
    var _this7 = this;
    this.$bottomNav.on('click', function (e) {
      var target = e.target.closest(navArrow);
      if (!target) return;
      menu_$(target).parent(navItem).addClass(activeNav);
      menu_$(_this7.$headerMobileBack).css({
        visibility: 'visible',
        opacity: 1
      });
    });
  };
  _proto.handleBackLinkClick = function handleBackLinkClick() {
    var _this8 = this;
    this.$headerMobileBackLink.on('click', function (e) {
      var target = e.target.closest(headerMobileBackLink);
      if (!target) return;
      menu_$(navItem).each(function (_, el) {
        menu_$(el).removeClass(activeNav);
      });
      menu_$(_this8.$headerMobileBack).css({
        visibility: 'hidden',
        opacity: 0
      });
    });
  };
  _proto.handleOutsideSearchClick = function handleOutsideSearchClick() {
    var _this9 = this;
    $doc.on('click', function (e) {
      var target = e.target.closest(headerSearch) || e.target.closest(iconSearchMobile);
      if (target) return;
      if (_this9.state.isSearchActive) {
        if (_this9.state.isSearchActive) _this9.state.isSearchActive = !_this9.state.isSearchActive;
        if (_this9.state.isMenuActive) _this9.state.isMenuActive = !_this9.state.isMenuActive;
        if (_this9.state.isSearchMobileActive) {
          _this9.state.isSearchMobileActive = !_this9.state.isSearchMobileActive;
        }
        $body.removeClass(activeHeaderMobile);
        _this9.onModalActive();
        _this9.onModalMobileActive();
      }
    });
  };
  _proto.handleOutsideBtnBookClick = function handleOutsideBtnBookClick() {
    var _this10 = this;
    $doc.on('touchstart click', function (e) {
      var _$;
      var target = e.target.closest(btnBook) || e.target.closest(btnBookMobile) || e.target.closest('.find-play');
      if ((_$ = menu_$(target)) != null && _$.length) return;
      if (_this10.state.isBookActive) {
        if (_this10.state.isBookActive) _this10.state.isBookActive = !_this10.state.isBookActive;
        if (_this10.state.isMenuActive) _this10.state.isMenuActive = !_this10.state.isMenuActive;
        $body.removeClass(activeHeaderMobile);
        _this10.onModalActive();
        _this10.handleBtnBookArrow();
      }
    });
  };
  _proto.addSportTitle = function addSportTitle() {
    menu_$(this.$element).find(navItem).each(function (_, item) {
      if (!menu_$(item).find(megaMenu).get(0)) return;
      var markup = "<p class=\"mega-menu__heading\">" + menu_$(item).find(navLink).text() + "</p>";
      menu_$(item).find(megaMenu).prepend(markup);
    });
  };
  _proto.handleHeaderMobileCloseClick = function handleHeaderMobileCloseClick() {
    var _this11 = this;
    menu_$(this.$headerMobileClose).on('click', function (e) {
      var target = e.target.closest(headerMobileClose);
      if (!target) return;
      if (_this11.state.isMenuActive) {
        menu_$("." + activeNav).removeClass(activeNav);
      }
      _this11.state.isMenuActive = !_this11.state.isMenuActive;
      if (_this11.state.isSearchActive) _this11.state.isSearchActive = !_this11.state.isSearchActive;
      if (_this11.state.isBookActive) _this11.state.isBookActive = !_this11.state.isBookActive;
      menu_$(_this11.$headerMobileBack).css({
        visibility: 'hidden',
        opacity: 0
      });
      _this11.onExceptSearchMobileClick();
    });
  };
  return Menu;
}()) || _class);

;// CONCATENATED MODULE: ../src/scripts/main.js





// libs


// Plugins
// import '@/plugins/global';
// import '@/plugins/template-plugin';
// import '@/plugins/height-content';
// import '@/plugins/card-list-slider';
// import '@/plugins/gallery-slider';
// import '@/plugins/gallery-detail';
// import '@/plugins/modal';

// import '@/plugins/main-slider';
// import '@/plugins/notify';
// import '@/plugins/newsletter';
// import '@/plugins/calendar/calendar-filter';
// import '@/plugins/calendar/calendar-detail';
// import '@/plugins/calendar/calendar-slide';
// import '@/plugins/events-detail';
// import '@/plugins/events-tab';
// import '@/plugins/select';
// import '@/plugins/event-filter';
// import '@/plugins/height-svg';
// import '@/plugins/collapse';
// import '@/plugins/search-form';
// import '@/plugins/toggle-modal';
// import '@/plugins/show-more';
// import '@/plugins/filter-tab';
// import '@/plugins/price-range';
// import '@/plugins/scroll-top';
// import '@/plugins/scroll-policy';
// import '@/plugins/form-submitted-msg';
// import '@/plugins/nav-tabs';
// import '@/plugins/select-tabs';
// import '@/plugins/navbar';
// import '@/plugins/htp-gallery-main';
// import '@/plugins/social-collapse';
// import '@/plugins/list-video-htp';
// import '@/plugins/pricing-tab';
// import '@/plugins/equal-height';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery UI - v1.13.1 - 2022-04-27
* http://jqueryui.com
* Includes: widget.js, keycode.js, widgets/mouse.js, widgets/slider.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

!function (e) {
  "use strict";

   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
}(function (l) {
  "use strict";

  l.ui = l.ui || {};
  l.ui.version = "1.13.1";
  var n,
    i = 0,
    o = Array.prototype.hasOwnProperty,
    h = Array.prototype.slice;
  l.cleanData = (n = l.cleanData, function (e) {
    for (var t, i, s = 0; null != (i = e[s]); s++) (t = l._data(i, "events")) && t.remove && l(i).triggerHandler("remove");
    n(e);
  }), l.widget = function (e, i, t) {
    var s,
      n,
      a,
      o = {},
      h = e.split(".")[0],
      r = h + "-" + (e = e.split(".")[1]);
    return t || (t = i, i = l.Widget), Array.isArray(t) && (t = l.extend.apply(null, [{}].concat(t))), l.expr.pseudos[r.toLowerCase()] = function (e) {
      return !!l.data(e, r);
    }, l[h] = l[h] || {}, s = l[h][e], n = l[h][e] = function (e, t) {
      if (!this || !this._createWidget) return new n(e, t);
      arguments.length && this._createWidget(e, t);
    }, l.extend(n, s, {
      version: t.version,
      _proto: l.extend({}, t),
      _childConstructors: []
    }), (a = new i()).options = l.widget.extend({}, a.options), l.each(t, function (t, s) {
      function n() {
        return i.prototype[t].apply(this, arguments);
      }
      function a(e) {
        return i.prototype[t].apply(this, e);
      }
      o[t] = "function" == typeof s ? function () {
        var e,
          t = this._super,
          i = this._superApply;
        return this._super = n, this._superApply = a, e = s.apply(this, arguments), this._super = t, this._superApply = i, e;
      } : s;
    }), n.prototype = l.widget.extend(a, {
      widgetEventPrefix: s && a.widgetEventPrefix || e
    }, o, {
      constructor: n,
      namespace: h,
      widgetName: e,
      widgetFullName: r
    }), s ? (l.each(s._childConstructors, function (e, t) {
      var i = t.prototype;
      l.widget(i.namespace + "." + i.widgetName, n, t._proto);
    }), delete s._childConstructors) : i._childConstructors.push(n), l.widget.bridge(e, n), n;
  }, l.widget.extend = function (e) {
    for (var t, i, s = h.call(arguments, 1), n = 0, a = s.length; n < a; n++) for (t in s[n]) i = s[n][t], o.call(s[n], t) && void 0 !== i && (l.isPlainObject(i) ? e[t] = l.isPlainObject(e[t]) ? l.widget.extend({}, e[t], i) : l.widget.extend({}, i) : e[t] = i);
    return e;
  }, l.widget.bridge = function (a, t) {
    var o = t.prototype.widgetFullName || a;
    l.fn[a] = function (i) {
      var e = "string" == typeof i,
        s = h.call(arguments, 1),
        n = this;
      return e ? this.length || "instance" !== i ? this.each(function () {
        var e,
          t = l.data(this, o);
        return "instance" === i ? (n = t, !1) : t ? "function" != typeof t[i] || "_" === i.charAt(0) ? l.error("no such method '" + i + "' for " + a + " widget instance") : (e = t[i].apply(t, s)) !== t && void 0 !== e ? (n = e && e.jquery ? n.pushStack(e.get()) : e, !1) : void 0 : l.error("cannot call methods on " + a + " prior to initialization; attempted to call method '" + i + "'");
      }) : n = void 0 : (s.length && (i = l.widget.extend.apply(null, [i].concat(s))), this.each(function () {
        var e = l.data(this, o);
        e ? (e.option(i || {}), e._init && e._init()) : l.data(this, o, new t(i, this));
      })), n;
    };
  }, l.Widget = function () {}, l.Widget._childConstructors = [], l.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      classes: {},
      disabled: !1,
      create: null
    },
    _createWidget: function _createWidget(e, t) {
      t = l(t || this.defaultElement || this)[0], this.element = l(t), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = l(), this.hoverable = l(), this.focusable = l(), this.classesElementLookup = {}, t !== this && (l.data(t, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function remove(e) {
          e.target === t && this.destroy();
        }
      }), this.document = l(t.style ? t.ownerDocument : t.document || t), this.window = l(this.document[0].defaultView || this.document[0].parentWindow)), this.options = l.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
    },
    _getCreateOptions: function _getCreateOptions() {
      return {};
    },
    _getCreateEventData: l.noop,
    _create: l.noop,
    _init: l.noop,
    destroy: function destroy() {
      var i = this;
      this._destroy(), l.each(this.classesElementLookup, function (e, t) {
        i._removeClass(t, e);
      }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
    },
    _destroy: l.noop,
    widget: function widget() {
      return this.element;
    },
    option: function option(e, t) {
      var i,
        s,
        n,
        a = e;
      if (0 === arguments.length) return l.widget.extend({}, this.options);
      if ("string" == typeof e) if (a = {}, e = (i = e.split(".")).shift(), i.length) {
        for (s = a[e] = l.widget.extend({}, this.options[e]), n = 0; n < i.length - 1; n++) s[i[n]] = s[i[n]] || {}, s = s[i[n]];
        if (e = i.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
        s[e] = t;
      } else {
        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
        a[e] = t;
      }
      return this._setOptions(a), this;
    },
    _setOptions: function _setOptions(e) {
      for (var t in e) this._setOption(t, e[t]);
      return this;
    },
    _setOption: function _setOption(e, t) {
      return "classes" === e && this._setOptionClasses(t), this.options[e] = t, "disabled" === e && this._setOptionDisabled(t), this;
    },
    _setOptionClasses: function _setOptionClasses(e) {
      var t, i, s;
      for (t in e) s = this.classesElementLookup[t], e[t] !== this.options.classes[t] && s && s.length && (i = l(s.get()), this._removeClass(s, t), i.addClass(this._classes({
        element: i,
        keys: t,
        classes: e,
        add: !0
      })));
    },
    _setOptionDisabled: function _setOptionDisabled(e) {
      this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
    },
    enable: function enable() {
      return this._setOptions({
        disabled: !1
      });
    },
    disable: function disable() {
      return this._setOptions({
        disabled: !0
      });
    },
    _classes: function _classes(n) {
      var a = [],
        o = this;
      function e(e, t) {
        for (var i, s = 0; s < e.length; s++) i = o.classesElementLookup[e[s]] || l(), i = n.add ? (function () {
          var i = [];
          n.element.each(function (e, t) {
            l.map(o.classesElementLookup, function (e) {
              return e;
            }).some(function (e) {
              return e.is(t);
            }) || i.push(t);
          }), o._on(l(i), {
            remove: "_untrackClassesElement"
          });
        }(), l(l.uniqueSort(i.get().concat(n.element.get())))) : l(i.not(n.element).get()), o.classesElementLookup[e[s]] = i, a.push(e[s]), t && n.classes[e[s]] && a.push(n.classes[e[s]]);
      }
      return (n = l.extend({
        element: this.element,
        classes: this.options.classes || {}
      }, n)).keys && e(n.keys.match(/\S+/g) || [], !0), n.extra && e(n.extra.match(/\S+/g) || []), a.join(" ");
    },
    _untrackClassesElement: function _untrackClassesElement(i) {
      var s = this;
      l.each(s.classesElementLookup, function (e, t) {
        -1 !== l.inArray(i.target, t) && (s.classesElementLookup[e] = l(t.not(i.target).get()));
      }), this._off(l(i.target));
    },
    _removeClass: function _removeClass(e, t, i) {
      return this._toggleClass(e, t, i, !1);
    },
    _addClass: function _addClass(e, t, i) {
      return this._toggleClass(e, t, i, !0);
    },
    _toggleClass: function _toggleClass(e, t, i, s) {
      var n = "string" == typeof e || null === e,
        i = {
          extra: n ? t : i,
          keys: n ? e : t,
          element: n ? this.element : e,
          add: s = "boolean" == typeof s ? s : i
        };
      return i.element.toggleClass(this._classes(i), s), this;
    },
    _on: function _on(n, a, e) {
      var o,
        h = this;
      "boolean" != typeof n && (e = a, a = n, n = !1), e ? (a = o = l(a), this.bindings = this.bindings.add(a)) : (e = a, a = this.element, o = this.widget()), l.each(e, function (e, t) {
        function i() {
          if (n || !0 !== h.options.disabled && !l(this).hasClass("ui-state-disabled")) return ("string" == typeof t ? h[t] : t).apply(h, arguments);
        }
        "string" != typeof t && (i.guid = t.guid = t.guid || i.guid || l.guid++);
        var s = e.match(/^([\w:-]*)\s*(.*)$/),
          e = s[1] + h.eventNamespace,
          s = s[2];
        s ? o.on(e, s, i) : a.on(e, i);
      });
    },
    _off: function _off(e, t) {
      t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(t), this.bindings = l(this.bindings.not(e).get()), this.focusable = l(this.focusable.not(e).get()), this.hoverable = l(this.hoverable.not(e).get());
    },
    _delay: function _delay(e, t) {
      var i = this;
      return setTimeout(function () {
        return ("string" == typeof e ? i[e] : e).apply(i, arguments);
      }, t || 0);
    },
    _hoverable: function _hoverable(e) {
      this.hoverable = this.hoverable.add(e), this._on(e, {
        mouseenter: function mouseenter(e) {
          this._addClass(l(e.currentTarget), null, "ui-state-hover");
        },
        mouseleave: function mouseleave(e) {
          this._removeClass(l(e.currentTarget), null, "ui-state-hover");
        }
      });
    },
    _focusable: function _focusable(e) {
      this.focusable = this.focusable.add(e), this._on(e, {
        focusin: function focusin(e) {
          this._addClass(l(e.currentTarget), null, "ui-state-focus");
        },
        focusout: function focusout(e) {
          this._removeClass(l(e.currentTarget), null, "ui-state-focus");
        }
      });
    },
    _trigger: function _trigger(e, t, i) {
      var s,
        n,
        a = this.options[e];
      if (i = i || {}, (t = l.Event(t)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), t.target = this.element[0], n = t.originalEvent) for (s in n) s in t || (t[s] = n[s]);
      return this.element.trigger(t, i), !("function" == typeof a && !1 === a.apply(this.element[0], [t].concat(i)) || t.isDefaultPrevented());
    }
  }, l.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function (a, o) {
    l.Widget.prototype["_" + a] = function (t, e, i) {
      var s,
        n = (e = "string" == typeof e ? {
          effect: e
        } : e) ? !0 !== e && "number" != typeof e && e.effect || o : a;
      "number" == typeof (e = e || {}) ? e = {
        duration: e
      } : !0 === e && (e = {}), s = !l.isEmptyObject(e), e.complete = i, e.delay && t.delay(e.delay), s && l.effects && l.effects.effect[n] ? t[a](e) : n !== a && t[n] ? t[n](e.duration, e.easing, i) : t.queue(function (e) {
        l(this)[a](), i && i.call(t[0]), e();
      });
    };
  });
  l.widget, l.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  }, l.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
  var a = !1;
  l(document).on("mouseup", function () {
    a = !1;
  });
  l.widget("ui.mouse", {
    version: "1.13.1",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function _mouseInit() {
      var t = this;
      this.element.on("mousedown." + this.widgetName, function (e) {
        return t._mouseDown(e);
      }).on("click." + this.widgetName, function (e) {
        if (!0 === l.data(e.target, t.widgetName + ".preventClickEvent")) return l.removeData(e.target, t.widgetName + ".preventClickEvent"), e.stopImmediatePropagation(), !1;
      }), this.started = !1;
    },
    _mouseDestroy: function _mouseDestroy() {
      this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function _mouseDown(e) {
      if (!a) {
        this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
        var t = this,
          i = 1 === e.which,
          s = !("string" != typeof this.options.cancel || !e.target.nodeName) && l(e.target).closest(this.options.cancel).length;
        return i && !s && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          t.mouseDelayMet = !0;
        }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === l.data(e.target, this.widgetName + ".preventClickEvent") && l.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
          return t._mouseMove(e);
        }, this._mouseUpDelegate = function (e) {
          return t._mouseUp(e);
        }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), a = !0)) : !0;
      }
    },
    _mouseMove: function _mouseMove(e) {
      if (this._mouseMoved) {
        if (l.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button) return this._mouseUp(e);
        if (!e.which) if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;else if (!this.ignoreMissingWhich) return this._mouseUp(e);
      }
      return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
    },
    _mouseUp: function _mouseUp(e) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && l.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, a = !1, e.preventDefault();
    },
    _mouseDistanceMet: function _mouseDistanceMet(e) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function _mouseDelayMet() {
      return this.mouseDelayMet;
    },
    _mouseStart: function _mouseStart() {},
    _mouseDrag: function _mouseDrag() {},
    _mouseStop: function _mouseStop() {},
    _mouseCapture: function _mouseCapture() {
      return !0;
    }
  }), l.widget("ui.slider", l.ui.mouse, {
    version: "1.13.1",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      classes: {
        "ui-slider": "ui-corner-all",
        "ui-slider-handle": "ui-corner-all",
        "ui-slider-range": "ui-corner-all ui-widget-header"
      },
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    numPages: 5,
    _create: function _create() {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1;
    },
    _refresh: function _refresh() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
    },
    _createHandles: function _createHandles() {
      var e,
        t = this.options,
        i = this.element.find(".ui-slider-handle"),
        s = [],
        n = t.values && t.values.length || 1;
      for (i.length > n && (i.slice(n).remove(), i = i.slice(0, n)), e = i.length; e < n; e++) s.push("<span tabindex='0'></span>");
      this.handles = i.add(l(s.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (e) {
        l(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
      });
    },
    _createRange: function _createRange() {
      var e = this.options;
      e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : Array.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
        left: "",
        bottom: ""
      })) : (this.range = l("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), "min" !== e.range && "max" !== e.range || this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null);
    },
    _setupEvents: function _setupEvents() {
      this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);
    },
    _destroy: function _destroy() {
      this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
    },
    _mouseCapture: function _mouseCapture(e) {
      var i,
        s,
        n,
        a,
        t,
        o,
        h = this,
        r = this.options;
      return !r.disabled && (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), o = {
        x: e.pageX,
        y: e.pageY
      }, i = this._normValueFromMouse(o), s = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
        var t = Math.abs(i - h.values(e));
        (t < s || s === t && (e === h._lastChangedValue || h.values(e) === r.min)) && (s = t, n = l(this), a = e);
      }), !1 !== this._start(e, a) && (this._mouseSliding = !0, this._handleIndex = a, this._addClass(n, null, "ui-state-active"), n.trigger("focus"), t = n.offset(), o = !l(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = o ? {
        left: 0,
        top: 0
      } : {
        left: e.pageX - t.left - n.width() / 2,
        top: e.pageY - t.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, i), this._animateOff = !0));
    },
    _mouseStart: function _mouseStart() {
      return !0;
    },
    _mouseDrag: function _mouseDrag(e) {
      var t = {
          x: e.pageX,
          y: e.pageY
        },
        t = this._normValueFromMouse(t);
      return this._slide(e, this._handleIndex, t), !1;
    },
    _mouseStop: function _mouseStop(e) {
      return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1;
    },
    _detectOrientation: function _detectOrientation() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
    },
    _normValueFromMouse: function _normValueFromMouse(e) {
      var t,
        e = "horizontal" === this.orientation ? (t = this.elementSize.width, e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
        e = e / t;
      return (e = 1 < e ? 1 : e) < 0 && (e = 0), "vertical" === this.orientation && (e = 1 - e), t = this._valueMax() - this._valueMin(), t = this._valueMin() + e * t, this._trimAlignValue(t);
    },
    _uiHash: function _uiHash(e, t, i) {
      var s = {
        handle: this.handles[e],
        handleIndex: e,
        value: void 0 !== t ? t : this.value()
      };
      return this._hasMultipleValues() && (s.value = void 0 !== t ? t : this.values(e), s.values = i || this.values()), s;
    },
    _hasMultipleValues: function _hasMultipleValues() {
      return this.options.values && this.options.values.length;
    },
    _start: function _start(e, t) {
      return this._trigger("start", e, this._uiHash(t));
    },
    _slide: function _slide(e, t, i) {
      var s,
        n = this.value(),
        a = this.values();
      this._hasMultipleValues() && (s = this.values(t ? 0 : 1), n = this.values(t), 2 === this.options.values.length && !0 === this.options.range && (i = 0 === t ? Math.min(s, i) : Math.max(s, i)), a[t] = i), i !== n && !1 !== this._trigger("slide", e, this._uiHash(t, i, a)) && (this._hasMultipleValues() ? this.values(t, i) : this.value(i));
    },
    _stop: function _stop(e, t) {
      this._trigger("stop", e, this._uiHash(t));
    },
    _change: function _change(e, t) {
      this._keySliding || this._mouseSliding || (this._lastChangedValue = t, this._trigger("change", e, this._uiHash(t)));
    },
    value: function value(e) {
      return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), void this._change(null, 0)) : this._value();
    },
    values: function values(e, t) {
      var i, s, n;
      if (1 < arguments.length) return this.options.values[e] = this._trimAlignValue(t), this._refreshValue(), void this._change(null, e);
      if (!arguments.length) return this._values();
      if (!Array.isArray(e)) return this._hasMultipleValues() ? this._values(e) : this.value();
      for (i = this.options.values, s = e, n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(s[n]), this._change(null, n);
      this._refreshValue();
    },
    _setOption: function _setOption(e, t) {
      var i,
        s = 0;
      switch ("range" === e && !0 === this.options.range && ("min" === t ? (this.options.value = this._values(0), this.options.values = null) : "max" === t && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), Array.isArray(this.options.values) && (s = this.options.values.length), this._super(e, t), e) {
        case "orientation":
          this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(t), this.handles.css("horizontal" === t ? "bottom" : "left", "");
          break;
        case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
          break;
        case "values":
          for (this._animateOff = !0, this._refreshValue(), i = s - 1; 0 <= i; i--) this._change(null, i);
          this._animateOff = !1;
          break;
        case "step":
        case "min":
        case "max":
          this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
          break;
        case "range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1;
      }
    },
    _setOptionDisabled: function _setOptionDisabled(e) {
      this._super(e), this._toggleClass(null, "ui-state-disabled", !!e);
    },
    _value: function _value() {
      var e = this.options.value;
      return e = this._trimAlignValue(e);
    },
    _values: function _values(e) {
      var t, i;
      if (arguments.length) return e = this.options.values[e], e = this._trimAlignValue(e);
      if (this._hasMultipleValues()) {
        for (t = this.options.values.slice(), i = 0; i < t.length; i += 1) t[i] = this._trimAlignValue(t[i]);
        return t;
      }
      return [];
    },
    _trimAlignValue: function _trimAlignValue(e) {
      if (e <= this._valueMin()) return this._valueMin();
      if (e >= this._valueMax()) return this._valueMax();
      var t = 0 < this.options.step ? this.options.step : 1,
        i = (e - this._valueMin()) % t,
        e = e - i;
      return 2 * Math.abs(i) >= t && (e += 0 < i ? t : -t), parseFloat(e.toFixed(5));
    },
    _calculateNewMax: function _calculateNewMax() {
      var e = this.options.max,
        t = this._valueMin(),
        i = this.options.step;
      (e = Math.round((e - t) / i) * i + t) > this.options.max && (e -= i), this.max = parseFloat(e.toFixed(this._precision()));
    },
    _precision: function _precision() {
      var e = this._precisionOf(this.options.step);
      return e = null !== this.options.min ? Math.max(e, this._precisionOf(this.options.min)) : e;
    },
    _precisionOf: function _precisionOf(e) {
      var t = e.toString(),
        e = t.indexOf(".");
      return -1 === e ? 0 : t.length - e - 1;
    },
    _valueMin: function _valueMin() {
      return this.options.min;
    },
    _valueMax: function _valueMax() {
      return this.max;
    },
    _refreshRange: function _refreshRange(e) {
      "vertical" === e && this.range.css({
        width: "",
        left: ""
      }), "horizontal" === e && this.range.css({
        height: "",
        bottom: ""
      });
    },
    _refreshValue: function _refreshValue() {
      var t,
        i,
        e,
        s,
        n,
        a = this.options.range,
        o = this.options,
        h = this,
        r = !this._animateOff && o.animate,
        u = {};
      this._hasMultipleValues() ? this.handles.each(function (e) {
        i = (h.values(e) - h._valueMin()) / (h._valueMax() - h._valueMin()) * 100, u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", l(this).stop(1, 1)[r ? "animate" : "css"](u, o.animate), !0 === h.options.range && ("horizontal" === h.orientation ? (0 === e && h.range.stop(1, 1)[r ? "animate" : "css"]({
          left: i + "%"
        }, o.animate), 1 === e && h.range[r ? "animate" : "css"]({
          width: i - t + "%"
        }, {
          queue: !1,
          duration: o.animate
        })) : (0 === e && h.range.stop(1, 1)[r ? "animate" : "css"]({
          bottom: i + "%"
        }, o.animate), 1 === e && h.range[r ? "animate" : "css"]({
          height: i - t + "%"
        }, {
          queue: !1,
          duration: o.animate
        }))), t = i;
      }) : (e = this.value(), s = this._valueMin(), n = this._valueMax(), i = n !== s ? (e - s) / (n - s) * 100 : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[r ? "animate" : "css"](u, o.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
        width: i + "%"
      }, o.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
        width: 100 - i + "%"
      }, o.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
        height: i + "%"
      }, o.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[r ? "animate" : "css"]({
        height: 100 - i + "%"
      }, o.animate));
    },
    _handleEvents: {
      keydown: function keydown(e) {
        var t,
          i,
          s,
          n = l(e.target).data("ui-slider-handle-index");
        switch (e.keyCode) {
          case l.ui.keyCode.HOME:
          case l.ui.keyCode.END:
          case l.ui.keyCode.PAGE_UP:
          case l.ui.keyCode.PAGE_DOWN:
          case l.ui.keyCode.UP:
          case l.ui.keyCode.RIGHT:
          case l.ui.keyCode.DOWN:
          case l.ui.keyCode.LEFT:
            if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(l(e.target), null, "ui-state-active"), !1 === this._start(e, n))) return;
        }
        switch (s = this.options.step, t = i = this._hasMultipleValues() ? this.values(n) : this.value(), e.keyCode) {
          case l.ui.keyCode.HOME:
            i = this._valueMin();
            break;
          case l.ui.keyCode.END:
            i = this._valueMax();
            break;
          case l.ui.keyCode.PAGE_UP:
            i = this._trimAlignValue(t + (this._valueMax() - this._valueMin()) / this.numPages);
            break;
          case l.ui.keyCode.PAGE_DOWN:
            i = this._trimAlignValue(t - (this._valueMax() - this._valueMin()) / this.numPages);
            break;
          case l.ui.keyCode.UP:
          case l.ui.keyCode.RIGHT:
            if (t === this._valueMax()) return;
            i = this._trimAlignValue(t + s);
            break;
          case l.ui.keyCode.DOWN:
          case l.ui.keyCode.LEFT:
            if (t === this._valueMin()) return;
            i = this._trimAlignValue(t - s);
        }
        this._slide(e, n, i);
      },
      keyup: function keyup(e) {
        var t = l(e.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(e, t), this._change(e, t), this._removeClass(l(e.target), null, "ui-state-active"));
      }
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var $ = __webpack_require__(0);
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function (a) {
  function f(a, b) {
    if (!(a.originalEvent.touches.length > 1)) {
      a.preventDefault();
      var c = a.originalEvent.changedTouches[0],
        d = document.createEvent("MouseEvents");
      d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d);
    }
  }
  if (a.support.touch = "ontouchend" in document, a.support.touch) {
    var e,
      b = a.ui.mouse.prototype,
      c = b._mouseInit,
      d = b._mouseDestroy;
    b._touchStart = function (a) {
      var b = this;
      !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"));
    }, b._touchMove = function (a) {
      e && (this._touchMoved = !0, f(a, "mousemove"));
    }, b._touchEnd = function (a) {
      e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1);
    }, b._mouseInit = function () {
      var b = this;
      b.element.bind({
        touchstart: a.proxy(b, "_touchStart"),
        touchmove: a.proxy(b, "_touchMove"),
        touchend: a.proxy(b, "_touchEnd")
      }), c.call(b);
    }, b._mouseDestroy = function () {
      var b = this;
      b.element.unbind({
        touchstart: a.proxy(b, "_touchStart"),
        touchmove: a.proxy(b, "_touchMove"),
        touchend: a.proxy(b, "_touchEnd")
      }), d.call(b);
    };
  }
}($);

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Plugin; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* provided dependency */ var $ = __webpack_require__(0);


var states = {
  loading: 0,
  interactive: 1,
  complete: 2
};
var READY_STATE = 'DOMContentLoaded';
function getElementData(el) {
  var elDataset = el.dataset;
  return Object.keys(elDataset).reduce(function (obj, key) {
    var data = {};
    if (elDataset[key]) {
      data[key] = '';
      try {
        data[key] = JSON.parse(elDataset[key]);
      } catch (err) {
        data[key] = elDataset[key];
      }
    }
    return (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, obj, data);
  }, {});
}
function setupClass(Class, name) {
  Class.prototype.$__pluginName = name;
  Class.prototype.addEvent = function ($element, event, trigger, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
      forceOff = _ref.forceOff,
      delegate = _ref.delegate,
      namespace = _ref.namespace;
    var eventNamespace = namespace || name;
    var element = $element[0];
    var isGlobalElement = element === window || element === document || element === document.body;
    if (forceOff || !isGlobalElement) {
      $element.off(event + "." + eventNamespace, delegate);
    }
    $element.on(event + "." + eventNamespace, delegate, trigger.bind(this));
  };
  Class.prototype.addState = function (stateName, defaultValue, forceUpdate) {
    var _this = this;
    var state = defaultValue;
    Object.defineProperty(this.state, stateName, {
      enumerable: true,
      configurable: true,
      get: function get() {
        return state;
      },
      set: function set(value) {
        var _this$watch;
        var lastValue = state;
        state = value;
        var shouldUpdate = lastValue !== state;
        if (!forceUpdate && !shouldUpdate) {
          return;
        }
        if (typeof ((_this$watch = _this.watch) == null ? void 0 : _this$watch[stateName]) === 'function') {
          _this.watch[stateName].call(_this, state);
        }
      }
    });
  };
}
function setupInstance(Class, element, props, pluginName) {
  var instance = new Class();
  instance.$element = $(element);
  instance.props = $.extend({}, $.fn[pluginName].defaults, getElementData(element), props);
  instance.state = {};
  if (typeof instance.init === 'function') {
    instance.init();
  }
  return instance;
}
function Plugin(param) {
  function runPlugin(Class) {
    var baseName = Class.name;
    var name = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.transformToKebabCase)(baseName);
    var props = (param == null ? void 0 : param.props) || {};
    var loadEvent = (param == null ? void 0 : param.when) || READY_STATE;
    var selector = param == null ? void 0 : param.selector;
    setupClass(Class, name);
    function init() {
      if (typeof selector === 'string') {
        $(selector)[name]();
      } else {
        $("[data-" + name + "]")[name]();
      }
    }
    $.fn[name] = function (opts, params) {
      var instanceName = name + "-instance";
      return this.each(function () {
        var instance = $.data(this, instanceName);
        if (!(instance instanceof Class)) {
          $.data(this, instanceName, setupInstance(Class, this, opts, name));
          return;
        }
        if (typeof instance[opts] !== 'function') {
          console.error("This element has been initialized with plugin " + baseName + ", please provide a correct method");
          return;
        }
        instance[opts](params);
      });
    };
    $.fn[name].defaults = props;
    if (loadEvent === READY_STATE && states[document.readyState] > 0) {
      init();
    } else {
      window.addEventListener(loadEvent, init);
    }
    return Class;
  }
  return typeof param === 'function' ? runPlugin(param) : runPlugin;
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [1], function() { return __webpack_require__(2); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map