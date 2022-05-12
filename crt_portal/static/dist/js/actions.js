/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./crt_portal/static/js/components/bulk_actions.js":
/*!*********************************************************!*\
  !*** ./crt_portal/static/js/components/bulk_actions.js ***!
  \*********************************************************/
/***/ (function() {

(function (root, dom) {
  var select = document.getElementById('id_assigned_to');
  AriaAutocomplete(select, {});
  var comment_field = document.getElementById('id_comment');

  comment_field.oninput = function (event) {
    var buttons = document.querySelectorAll('.complaint-page .usa-button');

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];

      if (event.target.value) {
        button.removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', 'disabled');
      }
    }
  };

  var actions_section = document.getElementById('bulk_actions_section');
  var warning_section = document.getElementById('warning_section');
  var warning_count_partial = document.getElementById('warning_count_partial');
  var warning_count_all = document.getElementById('warning_count_all');
  var confirm_button = document.getElementById('confirm_button');

  var update_warning = function update_warning(is_partial) {
    actions_section.setAttribute('hidden', 'hidden');
    warning_section.removeAttribute('hidden');

    if (is_partial) {
      warning_count_all.setAttribute('hidden', 'hidden');
      warning_count_partial.removeAttribute('hidden');
      confirm_button.setAttribute('value', 'none');
    } else {
      warning_count_all.removeAttribute('hidden');
      warning_count_partial.setAttribute('hidden', 'hidden');
      confirm_button.setAttribute('value', 'confirm_all');
    }
  };

  var show_warning_section = document.getElementById('show_warning_section');

  if (show_warning_section) {
    show_warning_section.onclick = function (event) {
      event.preventDefault();
      update_warning(false);
    };
  }

  var show_warning_section_partial = document.getElementById('show_warning_section_partial');

  if (show_warning_section_partial) {
    show_warning_section_partial.onclick = function (event) {
      event.preventDefault();
      update_warning(true);
    };
  }

  var cancel_warning_section = document.getElementById('cancel_warning_section');

  if (cancel_warning_section) {
    cancel_warning_section.onclick = function (event) {
      event.preventDefault();
      actions_section.removeAttribute('hidden');
      warning_section.setAttribute('hidden', 'hidden');
    };
  }

  var assigned_section = document.getElementById('id_assigned_section');
  var original_statute_value = document.getElementById('id_primary_statute').value;

  assigned_section.onchange = function (event) {
    var status = document.getElementById('id_status');
    status.value = 'new';
    status.setAttribute('disabled', 'disabled');
    var primaryStatute = document.getElementById('id_primary_statute');
    primaryStatute.value = original_statute_value;
    primaryStatute.setAttribute('disabled', 'disabled');
    var selectElement = document.getElementById('id_assigned_to');
    selectElement.value = '';
    selectElement.setAttribute('disabled', 'disabled');
    var actualSelectElement = document.getElementById('id_assigned_toaria-autocomplete-1-input');
    actualSelectElement.value = '';
    actualSelectElement.setAttribute('disabled', 'disabled');
  }; // disable "Multiple" selection for section


  assigned_section.options[0].setAttribute('disabled', 'disabled');
})(window, document);

/***/ }),

/***/ "./crt_portal/static/js/components/modal.js":
/*!**************************************************!*\
  !*** ./crt_portal/static/js/components/modal.js ***!
  \**************************************************/
/***/ (function() {

(function (root, dom) {
  root.CRT = root.CRT || {};
  var previous_onkeydown = dom.onkeydown;
  var focusable_elements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  root.CRT.openModal = function (modal_el) {
    dom.onkeydown = function (event) {
      event = event || window.event;
      var isEscape = false;

      if ('key' in event) {
        isEscape = event.key === 'Escape' || event.key === 'Esc';
      } else {
        isEscape = event.keyCode === 27;
      }

      if (isEscape) {
        root.CRT.closeModal(modal_el);
      }

      var isTab = false;

      if ('key' in event) {
        isTab = event.key === 'Tab';
      } else {
        isTab = event.keyCode === 9;
      }

      if (isTab) {
        var first = modal_el.querySelectorAll(focusable_elements)[0];
        var focusable_content = modal_el.querySelectorAll(focusable_elements);
        var last = focusable_content[focusable_content.length - 1];

        if (event.shiftKey) {
          // browse clickable elements moving backwards
          if (document.activeElement === first) {
            last.focus();
            event.preventDefault();
          }
        } else {
          // browse clickable elements moving forwards
          if (document.activeElement === last) {
            first.focus();
            event.preventDefault();
          }
        }
      }
    };

    modal_el.removeAttribute('hidden'); // get first input in this modal so we can focus on it

    var first = modal_el.querySelectorAll(focusable_elements)[0];
    first.focus();
    dom.body.classList.add('is-modal');
  };

  root.CRT.closeModal = function (modal_el) {
    dom.onkeydown = previous_onkeydown;
    modal_el.setAttribute('hidden', 'hidden');
    dom.body.classList.remove('is-modal');
  };

  root.CRT.cancelModal = function (modal_el, cancel_el, form_el) {
    var dismissModal = function dismissModal(event) {
      if (form_el) {
        form_el.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
        form_el.focus();
      }

      event.preventDefault();
      root.CRT.closeModal(modal_el);
    };

    cancel_el.addEventListener('click', dismissModal);
  };
})(window, document);

/***/ }),

/***/ "./crt_portal/static/js/components/print_report.js":
/*!*********************************************************!*\
  !*** ./crt_portal/static/js/components/print_report.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./crt_portal/static/js/components/modal.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_js__WEBPACK_IMPORTED_MODULE_0__);


(function (root, dom) {
  var complaint_page = document.querySelector('.complaint-show-body');
  var option_mapping_to_section = {
    id_options_0: '.crt-correspondent-card',
    id_options_1: '.crt-report-card',
    id_options_2: '.crt-description-card',
    id_options_3: '.crt-activities-card',
    id_options_4: '.crt-summary-card'
  };
  var modal = document.getElementById('print_report');
  var original_beforeprint = root.onbeforeprint;
  var original_afterprint = root.onafterprint;

  var showModal = function showModal(event) {
    event.preventDefault();

    if (modal.getAttribute('hidden') !== null) {
      // set up before and after print handlers so that we can
      // selectively hide or show sections.
      root.onbeforeprint = function (event) {
        for (var option_id in option_mapping_to_section) {
          var el = document.getElementById(option_id);
          var classname = option_mapping_to_section[option_id];
          var sections = complaint_page.querySelectorAll(classname);

          if (!el.checked) {
            sections.forEach(function (section) {
              section.setAttribute('hidden', 'hidden');
            });
          }
        }
      };

      root.onafterprint = function (event) {
        for (var option_id in option_mapping_to_section) {
          var el = document.getElementById(option_id);
          var classname = option_mapping_to_section[option_id];
          var sections = complaint_page.querySelectorAll(classname);

          if (!el.checked) {
            sections.forEach(function (section) {
              section.removeAttribute('hidden');
            });
          }
        }
      };

      root.CRT.openModal(modal);
    } else {
      // reset before and after print handlers.
      root.onbeforeprint = original_beforeprint;
      root.onafterprint = original_afterprint;
      root.CRT.closeModal(modal);
    }
  };

  var report = document.getElementById('printout_report');
  report.addEventListener('click', showModal);
  var cancel_modal = document.getElementById('print_report_cancel');
  root.CRT.cancelModal(modal, cancel_modal); // if no options are clicked, disable the print button.

  var print_buttons = document.querySelectorAll('.print-report-button');

  for (var option_id in option_mapping_to_section) {
    var el = document.getElementById(option_id);

    el.onclick = function (event) {
      var selected = modal.querySelectorAll('input[type=checkbox]:checked');

      for (var i = 0; i < print_buttons.length; i++) {
        var print_button = print_buttons[i];

        if (selected.length == 0) {
          print_button.setAttribute('disabled', 'disabled');
        } else {
          print_button.removeAttribute('disabled');
        }
      }
    };
  }

  for (var i = 0; i < print_buttons.length; i++) {
    var print_button = print_buttons[i];

    print_button.onclick = function (event) {
      // display extra reports only if user hits "print all"
      var print_all = event.target.value === 'print_all';
      var extra_reports = document.querySelectorAll('.bulk-print-report-extra');

      for (var j = 0; j < extra_reports.length; j++) {
        var report = extra_reports[j];

        if (print_all) {
          report.removeAttribute('hidden');
        } else {
          report.setAttribute('hidden', 'hidden');
        }
      } // hide the modal lest we print the modal itself.


      dom.body.classList.remove('is-modal');
      modal.setAttribute('hidden', 'hidden');
      root.print();
    };
  }
})(window, document);

/***/ }),

/***/ "./crt_portal/static/vendor/aria-autocomplete-1.2.3.min.js":
/*!*****************************************************************!*\
  !*** ./crt_portal/static/vendor/aria-autocomplete-1.2.3.min.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

!function (e, t) {
  if ("object" == ( false ? 0 : _typeof(exports)) && "object" == ( false ? 0 : _typeof(module))) module.exports = t();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var s, i; }
}(window, function () {
  return function (e) {
    var t = {};

    function i(s) {
      if (t[s]) return t[s].exports;
      var n = t[s] = {
        i: s,
        l: !1,
        exports: {}
      };
      return e[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
    }

    return i.m = e, i.c = t, i.d = function (e, t, s) {
      i.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: s
      });
    }, i.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, i.t = function (e, t) {
      if (1 & t && (e = i(e)), 8 & t) return e;
      if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
      var s = Object.create(null);
      if (i.r(s), Object.defineProperty(s, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var n in e) {
        i.d(s, n, function (t) {
          return e[t];
        }.bind(null, n));
      }
      return s;
    }, i.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return i.d(t, "a", t), t;
    }, i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, i.p = "", i(i.s = 2);
  }([function (e, t, i) {
    window, e.exports = function (e) {
      var t = {};

      function i(s) {
        if (t[s]) return t[s].exports;
        var n = t[s] = {
          i: s,
          l: !1,
          exports: {}
        };
        return e[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
      }

      return i.m = e, i.c = t, i.d = function (e, t, s) {
        i.o(e, t) || Object.defineProperty(e, t, {
          enumerable: !0,
          get: s
        });
      }, i.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(e, "__esModule", {
          value: !0
        });
      }, i.t = function (e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
        var s = Object.create(null);
        if (i.r(s), Object.defineProperty(s, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e) for (var n in e) {
          i.d(s, n, function (t) {
            return e[t];
          }.bind(null, n));
        }
        return s;
      }, i.n = function (e) {
        var t = e && e.__esModule ? function () {
          return e.default;
        } : function () {
          return e;
        };
        return i.d(t, "a", t), t;
      }, i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }, i.p = "", i(i.s = 0);
    }([function (e, t, i) {
      "use strict";

      var s;

      function n(e, t) {
        if (e) for (var i in t) {
          var s = "number" == typeof t[i] ? t[i] + "px" : t[i];
          e.style[i] = s + "";
        }
      }

      i.r(t), i.d(t, "InputAutoWidth", function () {
        return r;
      });

      var r = function () {
        function e(e, t) {
          this.cache = {}, this.options = t, this.input = e, this.trigger(), this.eventHandler = this.trigger.bind(this), this.input.addEventListener("blur", this.eventHandler), this.input.addEventListener("input", this.eventHandler), this.input.addEventListener("keyup", this.eventHandler), this.input.addEventListener("keydown", this.eventHandler);
        }

        return e.prototype.measureString = function (e) {
          return e ? this.cache && "number" == typeof this.cache[e] ? this.cache[e] : (s || (n(s = document.createElement("span"), {
            position: "absolute",
            top: -99999,
            left: -99999,
            width: "auto",
            padding: 0,
            whiteSpace: "pre"
          }), document.body.appendChild(s)), s.textContent = e, function (e, t, i) {
            if (e && t) {
              var s = getComputedStyle(e),
                  r = {};
              if (i && i.length) for (var l = 0, o = i.length; l < o; l += 1) {
                r[i[l]] = s[i[l]];
              } else r = s;
              n(t, r);
            }
          }(this.input, s, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]), s.offsetWidth || s.clientWidth) : 0;
        }, e.prototype.trigger = function (e) {
          if (void 0 === e && (e = {}), !e.metaKey && !e.altKey) {
            var t,
                i,
                s = this.input.value;

            if (e.type && "keydown" === e.type.toLowerCase()) {
              var n = e.keyCode,
                  r = 46 === n,
                  l = 8 === n;

              if (r || l) {
                var o = function (e) {
                  var t = {};
                  if ("selectionStart" in e) t.start = e.selectionStart, t.length = e.selectionEnd - t.start;else if (document.selection) {
                    e.focus();
                    var i = document.selection.createRange(),
                        s = i.text.length;
                    i.moveStart("character", -e.value.length), t.start = i.text.length - s, t.length = s;
                  }
                  return t;
                }(this.input);

                o.length ? s = s.substring(0, o.start) + s.substring(o.start + o.length) : l && o.start ? s = s.substring(0, o.start - 1) + s.substring(o.start + 1) : r && void 0 !== o.start && (s = s.substring(0, o.start) + s.substring(o.start + 1));
              } else if ((t = n) >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 96 && t <= 111 || t >= 186 && t <= 222 || 32 === t || 8 === t || 46 === t) {
                var a = String.fromCharCode(n);
                s += a = e.shiftKey ? a.toUpperCase() : a.toLowerCase();
              }
            }

            !s && (i = this.input.getAttribute("placeholder")) && (s = i);
            var h = this.measureString(s) + 4;
            this.options && this.options.cache && this.cache && (this.cache[s] = h);
            var u = this.options && this.options.minWidth;
            "number" == typeof u && h < u && (h = u);
            var c = this.options && this.options.maxWidth;
            "number" == typeof c && h > c && (h = c), h !== this.currentWidth && (this.currentWidth = h, this.input.style.width = h + "px");
          }
        }, e.prototype.destroy = function () {
          this.input.removeEventListener("blur", this.eventHandler), this.input.removeEventListener("input", this.eventHandler), this.input.removeEventListener("keyup", this.eventHandler), this.input.removeEventListener("keydown", this.eventHandler), this.input = this.cache = null;
        }, e;
      }();

      t.default = r;
    }]);
  }, function (e, t) {
    var i = Element.prototype;
    i.matches || (i.matches = i.msMatchesSelector || i.webkitMatchesSelector), i.closest || (i.closest = function (e) {
      var t = this;

      do {
        if (t.matches(e)) return t;
        t = t.parentElement || t.parentNode;
      } while (null !== t && 1 === t.nodeType);

      return null;
    });
  }, function (e, t, i) {
    "use strict";

    i.r(t), i.d(t, "AriaAutocomplete", function () {
      return V;
    });
    var s = i(0),
        n = i.n(s),
        r = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function l(e, t) {
      if (e && 1 === e.nodeType && "string" == typeof t) !function (e, t) {
        for (var i = e.getAttribute && e.getAttribute("class") || "", s = " " + i + " ", n = 0, l = t.split(" "), o = l.length; n < o; n += 1) {
          s = s.replace(" " + l[n] + " ", " ");
        }

        var a;
        i !== (s = null == (a = s) ? "" : (a + "").replace(r, "")) && e.setAttribute("class", s);
      }(e, t);else if (e && "number" == typeof e.length) for (var i = 0, s = e.length; i < s; i += 1) {
        l(e[i], t);
      }
    }

    var o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function a(e, t) {
      if (e && 1 === e.nodeType && "string" == typeof t) !function (e, t) {
        for (var i = e.getAttribute && e.getAttribute("class") || "", s = " " + i + " ", n = "", r = 0, l = t.split(" "), a = l.length; r < a; r += 1) {
          "" !== l[r] && -1 === s.indexOf(" " + l[r] + " ") && (n += " " + l[r]);
        }

        var h;
        i !== (n = null == (h = i + n) ? "" : (h + "").replace(o, "")) && e.setAttribute("class", n);
      }(e, t);else if (e && "number" == typeof e.length) for (var i = 0, s = e.length; i < s; i += 1) {
        a(e[i], t);
      }
    }

    var h = function h(e) {
      for (var t in void 0 === e && (e = {}), this.sourceMapping = {}, this.alsoSearchIn = [], this.create = !1, this.delay = 100, this.minLength = 1, this.maxResults = 9999, this.showAllControl = !1, this.confirmOnBlur = !0, this.multiple = !1, this.autoGrow = !1, this.maxItems = 9999, this.multipleSeparator = ",", this.deleteOnBackspace = !1, this.deleteAllControl = !1, this.deleteAllText = "Delete all", this.asyncQueryParam = "q", this.asyncMaxResultsParam = "limit", this.noResultsText = "No results", this.cssNameSpace = "aria-autocomplete", this.srAutoClear = 5e3, this.srDeleteText = "delete", this.srDeletedText = "deleted", this.srShowAllText = "Show all", this.srSelectedText = "selected", this.srListLabelText = "Search suggestions", this.srAssistiveText = "When results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.", this.srResultsText = function (e) {
        return e + " " + (1 === e ? "result" : "results") + " available.";
      }, e) {
        e.hasOwnProperty(t) && void 0 !== e[t] && (this[t] = e[t]);
      }
    },
        u = "_ariaAutocompleteCleanedLabel",
        c = "_ariaAutocompleteSelectedOption",
        p = 8,
        d = 13,
        f = 27,
        m = 32,
        v = 35,
        b = 36,
        y = 38,
        g = 40,
        A = 46,
        S = /[&<>"']/g,
        w = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    },
        E = function () {
      function e(e) {
        this.list = e.list, this.input = e.input, this.wrapper = e.wrapper, this.options = e.options, this.selected = e.selected, this.open = this.open.bind(e), this.close = this.close.bind(e), this.enable = this.enable.bind(e), this.disable = this.disable.bind(e), this.filter = this.filter.bind(e), this.destroy = this.destroy.bind(e), e.element.ariaAutocomplete = this;
      }

      return e.prototype.open = function () {
        this.show.call(this);
      }, e.prototype.close = function () {
        this.hide.call(this);
      }, e.prototype.enable = function () {
        this.enable.call(this);
      }, e.prototype.disable = function (e) {
        this.disable.call(this, e);
      }, e.prototype.filter = function (e) {
        this.filter.call(this, e);
      }, e.prototype.destroy = function () {
        this.destroy.call(this);
      }, e;
    }(),
        x = 0,
        T = function T(e, t, i) {
      x += 1, this.ELEMENT = e;
      var s = i || e || "";
      this.PREFIX = s + "aria-autocomplete-" + x, this.LIST = this.PREFIX + "-list", this.BUTTON = this.PREFIX + "-button", this.OPTION = this.PREFIX + "-option", this.WRAPPER = this.PREFIX + "-wrapper", this.LABEL = t || this.PREFIX + "-label", this.INPUT = i || this.PREFIX + "-input", this.SR_ASSISTANCE = this.PREFIX + "-sr-assistance", this.OPTION_SELECTED = this.PREFIX + "-option-selected", this.SR_ANNOUNCEMENTS = this.PREFIX + "-sr-announcements";
    };

    i(1);

    function O(e) {
      return null == e ? "" : (e + "").trim();
    }

    function _(e) {
      return "string" == typeof e && e ? e.replace(S, function (e) {
        return w[e];
      }) : "";
    }

    var C = /&/g,
        I = /\s\s+/g,
        L = /[\u2018\u2019',:\u2013-]/g,
        N = /[\-\[\]{}()*+?.,\\\^$|#\s]/g;

    function P(e, t) {
      return void 0 === t && (t = !1), e = O(e).toLowerCase().replace(L, "").replace(C, "and").replace(I, " "), t && (e = e.replace(N, "\\$&")), e;
    }

    function F() {
      for (var e = [], t = 0; t < arguments.length; t++) {
        e[t] = arguments[t];
      }

      var i = {};
      return e.forEach(function (e) {
        for (var t in e) {
          e.hasOwnProperty(t) && void 0 !== e[t] && (i[t] = e[t]);
        }
      }), i;
    }

    function k(e, t) {
      if ("createEvent" in document) {
        var i = document.createEvent("HTMLEvents");
        i.initEvent(t, !0, !0), e.dispatchEvent(i);
      } else e.fireEvent("on" + t);
    }

    function R(e) {
      return e && e.children ? Array.prototype.slice.call(e.children) : [];
    }

    function D(e, t, i) {
      t = !!t, e && ("INPUT" === e.nodeName && "checked" in e && e.checked !== t && (e.checked = t, k(e, "change")), "OPTION" === e.nodeName && "selected" in e && e.selected !== t && (e.selected = t, clearTimeout(i.elementChangeEventTimer), i.elementChangeEventTimer = setTimeout(function () {
        k(e.closest("select"), "change");
      }, 1)));
    }

    function B(e, t) {
      void 0 === t && (t = {});
      var i = {},
          s = t.value,
          n = t.label;
      return "string" == typeof e ? i.value = i.label = e : ((i = F(e)).value = (i[s] || i.value || i.label || "").toString(), i.label = (i[n] || i.label || i.value || "").toString()), i[u] = P(i.label), i;
    }

    function M(e, t) {
      return void 0 === t && (t = {}), Array.isArray(e) ? e.map(function (e) {
        return B(e, t);
      }) : e ? [e] : [];
    }

    function j(e, t, i) {
      if ("string" == typeof e) return function (e, t, i) {
        return i !== u && (e = P(e, !1)), -1 !== e.search(t);
      }(e, t, i);
      if (Array.isArray(e)) for (var s = 0, n = e.length; s < n; s += 1) {
        if (j(e[s], t)) return !0;
      }
      return !1;
    }

    var K = function () {
      function e(e, t) {
        e && this.init(e, t);
      }

      return e.prototype.triggerOptionCallback = function (e, t, i) {
        if (void 0 === t && (t = []), void 0 === i && (i = this.api), "function" == typeof this.options[e]) return this.options[e].apply(i, t);
      }, e.prototype.show = function (e) {
        if (e) return l(e, this.cssNameSpace + "--hide hide hidden"), e.removeAttribute("aria-hidden"), void e.removeAttribute("hidden");

        if (this.input.setAttribute("aria-expanded", "true"), this.showAll) {
          var t = (!!this.forceShowAll).toString();
          this.showAll.setAttribute("aria-expanded", t);
        }

        this.menuOpen || (this.show(this.list), this.menuOpen = !0, this.triggerOptionCallback("onOpen", [this.list]), this.documentClickBound || (this.documentClickBound = !0, document.addEventListener("click", this.documentClick)));
      }, e.prototype.hide = function (e) {
        if (e) return a(e, this.cssNameSpace + "--hide hide hidden"), e.setAttribute("aria-hidden", "true"), void e.setAttribute("hidden", "hidden");
        this.currentSelectedIndex = -1, this.input.setAttribute("aria-expanded", "false"), this.showAll && this.showAll.setAttribute("aria-expanded", "false"), this.menuOpen && (this.hide(this.list), this.menuOpen = !1, this.triggerOptionCallback("onClose", [this.list]));
      }, e.prototype.enable = function () {
        if (this.disabled) {
          this.disabled = !1, this.input.disabled = !1;
          var e = this.cssNameSpace;
          l(this.input, e + "__input--disabled disabled"), l(this.wrapper, e + "__wrapper--disabled disabled"), this.showAll && (this.showAll.setAttribute("tabindex", "0"), l(this.showAll, e + "__show-all--disabled disabled"));
        }

        this.enableDeletions();
      }, e.prototype.disable = function (e) {
        if (void 0 === e && (e = !1), !this.disabled) {
          this.disabled = !0, this.input.disabled = !0;
          var t = this.cssNameSpace;
          a(this.input, t + "__input--disabled disabled"), a(this.wrapper, t + "__wrapper--disabled disabled"), this.showAll && (this.showAll.setAttribute("tabindex", "-1"), a(this.showAll, t + "__show-all--disabled disabled"));
        }

        e && this.disableDeletions();
      }, e.prototype.enableDeletions = function () {
        if (this.deletionsDisabled) {
          this.deletionsDisabled = !1;
          var e = this.cssNameSpace;
          l(this.wrapper, e + "__wrapper--deletions-disabled"), this.getSelectedElems().forEach(function (t) {
            l(t, e + "__selected--disabled"), t.setAttribute("tabindex", "0");
          }), this.deleteAll && (l(this.deleteAll, e + "__delete-all--disabled " + e + "__selected--disabled"), this.deleteAll.setAttribute("tabindex", "0"));
        }
      }, e.prototype.disableDeletions = function () {
        if (!this.deletionsDisabled) {
          this.deletionsDisabled = !0;
          var e = this.cssNameSpace;
          a(this.wrapper, e + "__wrapper--deletions-disabled"), this.getSelectedElems().forEach(function (t) {
            a(t, e + "__selected--disabled"), t.setAttribute("tabindex", "-1");
          }), this.deleteAll && (a(this.deleteAll, e + "__delete-all--disabled " + e + "__selected--disabled"), this.deleteAll.setAttribute("tabindex", "-1"));
        }
      }, e.prototype.triggerAutoGrow = function () {
        this.autoGrow && this.inputAutoWidth && "function" == typeof this.inputAutoWidth.trigger && this.inputAutoWidth.trigger();
      }, e.prototype.setInputValue = function (e, t) {
        void 0 === t && (t = !1), this.input.value = this.term = e, t && (this.inputPollingValue = e), this.triggerAutoGrow();
      }, e.prototype.indexOfValueIn = function (e, t, i) {
        if (void 0 === t && (t = this.input.value), void 0 === i && (i = "label"), e.length && (t = O(t).toLowerCase())) for (var s = 0, n = e.length; s < n; s += 1) {
          if (O(e[s][i]).toLowerCase() === t) return s;
        }
        return -1;
      }, e.prototype.clearAnnouncement = function (e) {
        var t = this;
        clearTimeout(this.clearAnnouncementTimer), this.clearAnnouncementTimer = setTimeout(function () {
          t.srAnnouncements && (t.srAnnouncements.textContent = "");
        }, e);
      }, e.prototype.announce = function (e, t) {
        var i = this;

        if (void 0 === t && (t = 400), this.srAnnouncements && e && "string" == typeof e) {
          var s = function s() {
            i.srAnnouncements.textContent = e;
            var t = i.options.srAutoClear;
            (!0 === t || "number" == typeof t && t > -1) && i.clearAnnouncement("number" == typeof t ? t : 5e3);
          };

          0 !== t ? (clearTimeout(this.announcementTimer), this.announcementTimer = setTimeout(function () {
            return s();
          }, t)) : s();
        }
      }, e.prototype.isSelectedElem = function (e) {
        var t = e && e[c];
        return !(!this.multiple || "object" != _typeof(t));
      }, e.prototype.getSelectedElems = function () {
        for (var e = [], t = 0, i = this.wrapper.childNodes.length; t < i; t += 1) {
          var s = this.wrapper.childNodes[t];
          1 === s.nodeType && this.isSelectedElem(s) && e.push(s);
        }

        return e;
      }, e.prototype.deleteAllSelected = function () {
        if (!this.deletionsDisabled) {
          for (var e = this.selected.length; e--;) {
            var t = F(this.selected[e]);
            D(t.element, !1, this), this.triggerOptionCallback("onDelete", [t]);
          }

          this.selected.splice(0), this.setSourceElementValues(), this.buildMultiSelected(), this.triggerAutoGrow(), this.announce(this.options.srDeletedText, 0);
        }
      }, e.prototype.removeEntryFromSelected = function (e, t) {
        if (void 0 === t && (t = !1), !this.deletionsDisabled) {
          var i = this.selected.indexOf(e);
          if (-1 === i) for (var s = 0, n = this.selected.length; s < n; s += 1) {
            if (this.selected[s].value === e.value) {
              i = s;
              break;
            }
          }

          if (i > -1 && this.selected[i]) {
            var r = F(this.selected[i]),
                l = r.label;
            D(r.element, !1, this), this.selected.splice(i, 1), this.triggerOptionCallback("onDelete", [r]), this.setSourceElementValues(), this.buildMultiSelected(t ? i : null), this.triggerAutoGrow(), this.announce(l + " " + this.options.srDeletedText, 0);
          }
        }
      }, e.prototype.createSelectedElemFrom = function (e, t) {
        var i = e.label,
            s = this.cssNameSpace,
            n = s + "__selected",
            r = document.createElement("span"),
            l = t ? s + "__delete-all " + n + " " + n + "--delete-all" : n;
        return r.setAttribute("aria-describedby", this.ids.LABEL), r.setAttribute("class", l), r.setAttribute("role", "button"), r.setAttribute("tabindex", "0"), r.textContent = i, t || (r.setAttribute("aria-label", this.options.srDeleteText + " " + i), r[c] = e), r;
      }, e.prototype.buildMultiSelected = function (e) {
        var t = this;

        if (this.multiple) {
          this.multiple && this.selected.length >= this.options.maxItems ? this.disable() : this.enable();
          var i = this.getSelectedElems();

          if (this.selected.length || i.length) {
            var s = [];
            i.forEach(function (e) {
              for (var i = e[c], n = 0, r = t.selected.length; n < r; n += 1) {
                var l = t.selected[n];
                if (l === i || l.value === i.value) return void s.push(e);
              }

              e.parentNode.removeChild(e);
            });
            var n = document.createDocumentFragment();
            this.selected.forEach(function (e) {
              for (var i = 0, r = s.length; i < r; i += 1) {
                var l = s[i][c];
                if (l === e || l.value === e.value) return;
              }

              n.appendChild(t.createSelectedElemFrom(e));
            }), n.childNodes && n.childNodes.length && this.wrapper.insertBefore(n, this.srAssistance);
            var r = this.getSelectedElems(),
                l = r.map(function (e, i) {
              var s = t.ids.OPTION_SELECTED + "-" + i;
              return e.setAttribute("id", s), s;
            });

            if (l.push(this.ids.LIST), this.input.setAttribute("aria-owns", l.join(" ")), this.autoGrow && this.selected.length ? this.input.removeAttribute("placeholder") : this.options.placeholder && this.input.setAttribute("placeholder", this.options.placeholder), this.selected.length <= 1 ? this.deleteAll && (this.deleteAll.parentNode.removeChild(this.deleteAll), this.deleteAll = null) : this.options.deleteAllControl && !this.deleteAll && r[0] && (this.deleteAll = this.createSelectedElemFrom({
              label: this.options.deleteAllText
            }, !0), r[0].parentNode.insertBefore(this.deleteAll, r[0])), "number" == typeof e) {
              var o = r[e] || r[e - 1] || r[0];
              o && "function" == typeof o.focus && o.focus();
            }
          }
        }
      }, e.prototype.resetOptionAttributes = function (e) {
        void 0 === e && (e = R(this.list));
        var t = this.cssNameSpace + "__option--focused focused focus";
        e.forEach(function (e) {
          e.setAttribute("aria-selected", "false"), l(e, t);
        });
      }, e.prototype.setOptionFocus = function (e, t, i) {
        void 0 === i && (i = !0);
        var s = R(this.list);
        if (this.resetOptionAttributes(s), t < 0 || !s.length) return this.currentSelectedIndex = -1, void (e && e.target !== this.input && this.input.focus());
        if (t >= s.length) return this.currentSelectedIndex = s.length - 1, void this.setOptionFocus(e, this.currentSelectedIndex);
        var n = s[t];
        if (n && "string" == typeof n.getAttribute("tabindex")) return this.currentSelectedIndex = t, a(n, this.cssNameSpace + "__option--focused focused focus"), n.setAttribute("aria-selected", "true"), void (i && n.focus());
        this.currentSelectedIndex = -1;
      }, e.prototype.setSourceElementValues = function () {
        for (var e = [], t = 0, i = this.selected.length; t < i; t += 1) {
          var s = this.selected[t];
          e.push(s.value), D(s.element, !0, this);
        }

        if (this.elementIsInput) {
          var n = e.join(this.options.multipleSeparator);
          n !== this.element.value && (this.element.value = n, k(this.element, "change"));
        }

        !this.selected.length && this.sourceFromSelect && (this.element.value = ""), this.triggerOptionCallback("onChange", [this.selected]);
      }, e.prototype.handleOptionSelect = function (e, t, i) {
        if (void 0 === i && (i = !0), !("number" != typeof t || t < 0 || this.multiple && this.selected.length >= this.options.maxItems) && this.filteredSource.length && this.filteredSource[t]) {
          for (var s = F(this.filteredSource[t]), n = !1, r = 0, l = this.selected.length; r < l; r += 1) {
            if (this.selected[r].value === s.value) {
              n = !0;
              break;
            }
          }

          n || this.multiple || this.selected.splice(0), n || (this.addResultsEntryToDomAndSource(s), this.selected.push(s), this.setSourceElementValues(), this.buildMultiSelected()), this.setInputValue(this.multiple ? "" : s.label, !0), this.triggerOptionCallback("onConfirm", [s]), this.announce(s.label + " " + this.options.srSelectedText, 0), this.disabled || !1 === i || this.input.focus(), this.hide();
        }
      }, e.prototype.removeSelectedFromResults = function (e) {
        var t = this;
        if (!this.multiple || !this.selected.length) return e;
        var i = [];
        return e.forEach(function (e) {
          for (var s = t.selected, n = 0, r = s.length; n < r; n += 1) {
            if (e.label === s[n].label && e.value === s[n].value) return;
          }

          i.push(e);
        }), i;
      }, e.prototype.addResultsEntryToDomAndSource = function (e) {
        var t = this.options.create,
            i = this.sourceFromSelect,
            s = this.sourceFromCheckboxList;

        if (t && e && e.value && Array.isArray(this.source) && (i || s)) {
          var n = e.label,
              r = e.value;

          if (!(this.indexOfValueIn(this.source, r, "value") > -1 || this.indexOfValueIn(this.source, n, "label") > -1)) {
            var l;

            if (i) {
              var o = this.element.querySelector("option"),
                  a = o.cloneNode(!0);
              a.textContent = n, a.value = r, l = a, o.parentNode.insertBefore(a, o);
            } else if (s) {
              var h = this.element.querySelector('input[type="checkbox"]'),
                  u = h.cloneNode(!0),
                  c = h.closest("label"),
                  p = document.createElement("label");
              p.textContent = n, u.value = r, l = u, p.appendChild(u);
              var d = c || h;
              d.parentNode.insertBefore(p, d);
            }

            l && (e.element = l, l.removeAttribute("id")), this.source.unshift(e);
          }
        }
      }, e.prototype.prependEntryInCreateMode = function (e, t) {
        var i = this.options.create;

        if ((!0 === i || "function" == typeof i) && P(e)) {
          var s,
              n = O(e),
              r = this.options.sourceMapping;

          if (!0 === i && (s = B(n, r)), "function" == typeof i) {
            var l = i(n),
                o = _typeof(l);

            l && ("string" === o || "object" === o && !Array.isArray(l)) && (s = B(l, r));
          }

          !s || !s.label || !s.value || this.indexOfValueIn(t, s[u], u) > -1 || this.indexOfValueIn(t, s.value, "value") > -1 || t.unshift(s);
        }
      }, e.prototype.setListOptions = function (e) {
        var t = this.options.sourceMapping;
        this.prependEntryInCreateMode(this.term, e);
        var i = this.removeSelectedFromResults(e),
            s = this.triggerOptionCallback("onResponse", [i]);
        this.filteredSource = Array.isArray(s) ? M(s, t) : i;

        for (var n = this.ids.OPTION, r = this.cssNameSpace, o = r + "__option", h = this.filteredSource.length, u = "function" == typeof this.options.onItemRender, c = this.forceShowAll ? 9999 : this.options.maxResults, p = c < h ? c : h, d = [], f = 0; f < p; f += 1) {
          var m = this.filteredSource[f],
              v = u && this.triggerOptionCallback("onItemRender", [m]),
              b = "string" == typeof v ? v : m.label;
          d.push('<li tabindex="-1" aria-selected="false" role="option" class="' + o + '" id="' + n + "--" + f + '" aria-posinset="' + (f + 1) + '" aria-setsize="' + p + '">' + _(b) + "</li>");
        }

        var y,
            g = !d.length;
        g ? (l(this.list, r + "__list--has-results"), a(this.list, r + "__list--no-results")) : (a(this.list, r + "__list--has-results"), l(this.list, r + "__list--no-results"));
        var A = this.options.noResultsText;
        g && "string" == typeof A && A.length && (y = A, d.push('<li class="' + o + " " + o + '--no-results">' + _(A) + "</li>")), this.cancelFilterPrep(), y || (y = this.triggerOptionCallback("srResultsText", [p])), y && this.announce(y);
        var S = d.join("");
        if (this.currentListHtml !== S ? (this.currentListHtml = S, this.list.innerHTML = S) : this.resetOptionAttributes(), !d.length) return this.hide(), void (this.forceShowAll = !1);
        this.show(), this.forceShowAll = !1;
      }, e.prototype.handleAsync = function (e, t) {
        var i = this;
        void 0 === t && (t = !1), this.xhr && "function" == typeof this.xhr.abort && this.xhr.abort();
        var s = new XMLHttpRequest(),
            n = this.forceShowAll,
            r = t ? null : this.api,
            l = this.multiple ? this.selected.length : 0,
            o = n || t || 9999 === this.options.maxResults,
            a = this.source + (/\?/.test(this.source) ? "&" : "?") + encodeURIComponent(this.options.asyncQueryParam) + "=" + encodeURIComponent(e) + "&" + encodeURIComponent(this.options.asyncMaxResultsParam) + "=" + (o ? 9999 : l + this.options.maxResults),
            h = this.triggerOptionCallback("onAsyncPrep", [a, s, t], r);
        h && "string" == typeof h && (a = h), s.open("GET", a), s.onload = function () {
          if (s.readyState === s.DONE && s.status >= 200 && s.status < 300) {
            i.forceShowAll = n;
            var l = M(i.triggerOptionCallback("onAsyncSuccess", [e, s, t], r) || s.responseText, i.options.sourceMapping);
            t ? (i.prepSelectedFromArray(l), i.setInputStartingStates(!1)) : i.setListOptions(l), i.triggerOptionCallback("onAsyncComplete", [e, s, t], r);
          }
        }, s.onerror = function () {
          i.triggerOptionCallback("onAsyncError", [e, s, t], r);
        }, t || (this.xhr = s), this.triggerOptionCallback("onAsyncBeforeSend", [e, s, t], r), s.send();
      }, e.prototype.filter = function (e) {
        var t = this;

        if ("string" == typeof e) {
          var i = this.forceShowAll;

          if (!i) {
            var s = this.triggerOptionCallback("onSearch", [e]);
            "string" == typeof s && (e = s);
          }

          if (this.term = e, "string" == typeof this.source && this.source.length) return this.handleAsync(e), void (this.forceShowAll = !1);

          if ("function" != typeof this.source) {
            e || (i = !0);
            var n = [],
                r = this.source;

            if (r && r.length) {
              var l = [u];

              if (!i) {
                e = P(e, !0);
                var o = this.options.alsoSearchIn;
                Array.isArray(o) && o.length && (l = function (e) {
                  var t = [];
                  return e.forEach(function (e) {
                    if ("string" == typeof e) {
                      for (var i = O(e), s = "label" !== i, n = 0, r = t.length; s && n < r; n += 1) {
                        s = t[r] !== i;
                      }

                      s && t.push(i);
                    }
                  }), t;
                }(l.concat(o)));
              }

              r.forEach(function (t) {
                (i || function (e, t, i) {
                  for (var s in e) {
                    if (e.hasOwnProperty(s)) {
                      var n = e[s];
                      if (("string" == typeof n || Array.isArray(n)) && i.indexOf(s) > -1 && j(n, t, s)) return !0;
                    }
                  }

                  return !1;
                }(t, e, l)) && n.push(t);
              });
            }

            this.setListOptions(n);
          } else {
            var a = function a(e) {
              var i = M(e, t.options.sourceMapping);
              t.setListOptions(i);
            },
                h = this.source.call(this.api, this.term, a, !1);

            h && "function" == typeof h.then && h.then(function (e) {
              return a(e);
            });
          }
        } else this.cancelFilterPrep();
      }, e.prototype.cancelFilterPrep = function () {
        clearTimeout(this.filterTimer), l(this.wrapper, this.cssNameSpace + "__wrapper--loading loading"), l(this.input, this.cssNameSpace + "__input--loading loading"), this.filtering = !1;
      }, e.prototype.filterPrep = function (e, t, i) {
        var s = this;
        void 0 === t && (t = !1), void 0 === i && (i = !1);
        var n = this.forceShowAll,
            r = n || i ? 0 : this.options.delay;
        this.cancelFilterPrep(), this.filtering = !0, this.filterTimer = setTimeout(function () {
          var i = s.input.value;
          if (s.inputPollingValue = i, (n || "" === i || t && !s.multiple && s.selected.length && O(s.selected[0].label) === O(i)) && (i = ""), !n && i.length < s.options.minLength) s.hide();else {
            var r;

            try {
              var l = e;
              r = e && "keydown" === e.type && (l.altKey || l.ctrlKey || l.metaKey);
            } catch (e) {}

            var o = "" !== i && i === s.term;
            !o || o && !s.menuOpen && !r ? (a(s.wrapper, s.cssNameSpace + "__wrapper--loading loading"), a(s.input, s.cssNameSpace + "__input--loading loading"), s.currentSelectedIndex = -1, s.filter(i)) : s.cancelFilterPrep();
          }
        }, r);
      }, e.prototype.filterPrepShowAll = function (e) {
        var t = this;
        this.disabled || (clearTimeout(this.showAllPrepTimer), this.showAllPrepTimer = setTimeout(function () {
          t.componentBlurTimer && clearTimeout(t.componentBlurTimer), e.preventDefault(), t.forceShowAll = !0, t.filterPrep(e, !1, !0);
        }, 0));
      }, e.prototype.handleComponentBlur = function (e, t) {
        var i = this;
        void 0 === t && (t = !1), clearTimeout(this.componentBlurTimer);
        var s = t ? 0 : 100;
        this.componentBlurTimer = setTimeout(function () {
          var e = document.activeElement;

          if (t || !e || i.deleteAll && i.deleteAll === e || i.isSelectedElem(e) || !i.wrapper.contains(e)) {
            if (i.xhr && "function" == typeof i.xhr.abort && i.xhr.abort(), !t && i.options.confirmOnBlur && i.menuOpen) {
              var s = i.currentSelectedIndex;
              "number" == typeof s && -1 !== s || (s = i.indexOfValueIn.call(i, i.filteredSource, i.term, "label")), i.handleOptionSelect({}, s, !1);
            }

            if (i.cancelFilterPrep(), i.hide(), !i.multiple && -1 === i.indexOfValueIn.call(i, i.selected)) {
              i.selected.length && i.removeEntryFromSelected(i.selected[0]);
              var n = i.elementIsInput || i.sourceFromSelect,
                  r = i.element;
              n && "" !== r.value && (r.value = "", k(r, "change")), i.setInputValue("", !0);
            }

            i.multiple && i.setInputValue("", !0), i.documentClickBound && (i.documentClickBound = !1, document.removeEventListener("click", i.documentClick)), i.triggerOptionCallback("onBlur", [i.wrapper]), i.isFocused = !1;
          }
        }, s);
      }, e.prototype.handleUpKey = function (e) {
        e.preventDefault(), !this.disabled && this.menuOpen && "number" == typeof this.currentSelectedIndex && this.setOptionFocus(e, this.currentSelectedIndex - 1);
      }, e.prototype.handleDownKey = function (e) {
        if (e.preventDefault(), !this.menuOpen) {
          var t = this.options.minLength;
          this.forceShowAll = t < 1, (this.forceShowAll || this.input.value.length >= t) && this.filterPrep(e);
        }

        if (this.menuOpen && !this.filtering) {
          var i = this.currentSelectedIndex;
          "number" != typeof i || i < 0 ? this.setOptionFocus(e, 0) : this.setOptionFocus(e, i + 1);
        }
      }, e.prototype.handleEndKey = function (e) {
        if (!this.disabled && this.menuOpen && e.target !== this.input) {
          var t = R(this.list);
          t.length && (e.preventDefault(), this.setOptionFocus(e, t.length - 1));
        }
      }, e.prototype.handleHomeKey = function (e) {
        !this.disabled && this.menuOpen && e.target !== this.input && (e.preventDefault(), this.setOptionFocus(e, 0));
      }, e.prototype.handleEnterKey = function (e) {
        var t = e.target;
        this.isSelectedElem(t) ? this.removeEntryFromSelected(t[c], !0) : this.deleteAll && t === this.deleteAll ? this.deleteAllSelected() : this.disabled || (this.showAll && t === this.showAll ? this.filterPrepShowAll(e) : (this.menuOpen && (e.preventDefault(), this.currentSelectedIndex > -1 && this.handleOptionSelect(e, this.currentSelectedIndex)), t === this.input && this.filterPrep(e, !1, !0)));
      }, e.prototype.handleKeyDownDefault = function (e) {
        var t = e.keyCode,
            i = e.target === this.input;
        if (t === m && !i || this.isSelectedElem(e.target) && t === A) return e.preventDefault(), void this.handleEnterKey(e);

        if (!this.disabled) {
          var s = this.selected && this.selected.length;
          this.options.deleteOnBackspace && t === p && "" === this.input.value && s && i && this.multiple && this.removeEntryFromSelected(this.selected[s - 1]);

          var n = function (e) {
            return e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 96 && e <= 111 || e >= 186 && e <= 222 || 32 === e || 8 === e || 46 === e;
          }(t),
              r = !i && n;

          r && this.input.focus(), (r || i && n) && this.filterPrep(e);
        }
      }, e.prototype.prepKeyDown = function (e) {
        switch (e.keyCode) {
          case y:
            this.handleUpKey(e);
            break;

          case g:
            this.handleDownKey(e);
            break;

          case v:
            this.handleEndKey(e);
            break;

          case b:
            this.handleHomeKey(e);
            break;

          case d:
            this.handleEnterKey(e);
            break;

          case f:
            this.handleComponentBlur(e, !0);
            break;

          default:
            this.handleKeyDownDefault(e);
        }
      }, e.prototype.cancelPolling = function () {
        clearTimeout(this.pollingTimer);
      }, e.prototype.startPolling = function () {
        var e = this;
        this.filtering || this.input.value === this.inputPollingValue || this.filterPrep({}), this.pollingTimer = setTimeout(function () {
          e.startPolling();
        }, 200);
      }, e.prototype.bindEvents = function () {
        var e = this;
        this.wrapper.addEventListener("focusout", function (t) {
          e.handleComponentBlur(t, !1);
        }), this.wrapper.addEventListener("focusin", function (t) {
          e.list.contains(t.target) || (e.currentSelectedIndex = -1), e.isFocused || e.triggerOptionCallback("onFocus", [e.wrapper]), e.isFocused = !0;
        }), this.wrapper.addEventListener("keydown", function (t) {
          e.prepKeyDown(t);
        }), this.wrapper.addEventListener("click", function (t) {
          t.target !== e.wrapper ? (e.isSelectedElem(t.target) && e.removeEntryFromSelected(t.target[c], !0), e.deleteAll && t.target === e.deleteAll && e.deleteAllSelected()) : e.input.focus();
        });
        var t = this.cssNameSpace + "__wrapper--focused focused focus",
            i = this.cssNameSpace + "__input--focused focused focus";
        this.input.addEventListener("blur", function () {
          l(e.wrapper, t), l(e.input, i), e.cancelPolling();
        }), this.input.addEventListener("input", function (t) {
          document.activeElement === e.input && e.filterPrep(t);
        }), this.input.addEventListener("click", function (t) {
          !e.menuOpen && e.input.value.length >= e.options.minLength && e.filterPrep(t, !0);
        }), this.input.addEventListener("focusin", function (s) {
          a(e.wrapper, t), a(e.input, i), e.startPolling(), e.disabled || e.menuOpen || e.filterPrep(s, !0);
        }), this.showAll && this.showAll.addEventListener("click", function (t) {
          e.filterPrepShowAll(t);
        }), this.list.addEventListener("mouseenter", function (t) {
          e.resetOptionAttributes();
        }), this.list.addEventListener("click", function (t) {
          if (t.target !== e.list) {
            var i = R(e.list);

            if (i.length) {
              var s = i.indexOf(t.target);
              e.handleOptionSelect(t, s);
            }
          }
        }), this.autoGrow && (this.inputAutoWidth = new n.a(this.input));
      }, e.prototype.prepListSourceCheckboxes = function () {
        this.multiple = !0, this.source = [];

        for (var e = this.element.querySelectorAll('input[type="checkbox"]'), t = 0, i = e.length; t < i; t += 1) {
          var s = e[t];

          if (s.value) {
            var n = {
              value: s.value
            },
                r = s.closest("label");
            !r && s.id && (r = document.querySelector('[for="' + s.id + '"]')), r && (n.label = r.textContent);
            var l = B(n);
            l.element = s, this.source.push(l), s.checked && this.selected.push(l);
          }
        }
      }, e.prototype.prepListSourceDdl = function () {
        var e = this.element.multiple;
        e && !this.multiple && (this.multiple = !0), !e && this.multiple && this.options.maxItems > 1 && (this.options.maxItems = 1), this.source = [];

        for (var t = this.element.querySelectorAll("option"), i = 0, s = t.length; i < s; i += 1) {
          var n = t[i];

          if (n.value) {
            var r = B({
              value: n.value,
              label: n.textContent
            });
            r.element = n, this.source.push(r), n.selected && this.selected.push(r);
          }
        }
      }, e.prototype.prepSelectedFromArray = function (e) {
        var t = this,
            i = this.elementIsInput && this.element.value;

        if (i && Array.isArray(e) && e.length) {
          var s = this.options,
              n = s.multiple,
              r = s.multipleSeparator,
              l = n ? i.split(r) : [i],
              o = e.slice();
          l.forEach(function (e) {
            if (-1 === t.indexOfValueIn(t.selected, e, "value")) {
              t.prependEntryInCreateMode(e, o);
              var i = t.indexOfValueIn(o, e, "value");
              i > -1 && t.selected.push(o[i]);
            }
          });
        }
      }, e.prototype.prepListSourceArray = function () {
        this.source = M(this.source, this.options.sourceMapping), this.prepSelectedFromArray(this.source);
      }, e.prototype.prepListSourceAsync = function () {
        var e = this.element;
        this.elementIsInput && e.value && this.handleAsync(e.value, !0);
      }, e.prototype.prepListSourceFunction = function () {
        var e = this,
            t = this.element;

        if (this.elementIsInput && t.value) {
          var i = function i(t) {
            var i = M(t, e.options.sourceMapping);
            e.prepSelectedFromArray(i), e.setInputStartingStates(!1);
          },
              s = this.source.call(void 0, t.value, i, !0);

          s && "function" == typeof s.then && s.then(function (e) {
            return i(e);
          });
        }
      }, e.prototype.prepListSource = function () {
        return "function" == typeof this.source ? this.prepListSourceFunction() : "string" == typeof this.source && this.source.length ? this.prepListSourceAsync() : Array.isArray(this.source) && this.source.length ? this.prepListSourceArray() : (this.sourceFromSelect = "SELECT" === this.element.nodeName, this.sourceFromSelect ? this.prepListSourceDdl() : (this.sourceFromCheckboxList = !!this.element.querySelector('input[type="checkbox"]'), this.sourceFromCheckboxList ? this.prepListSourceCheckboxes() : void (this.source = [])));
      }, e.prototype.setInputStartingStates = function (e) {
        if (void 0 === e && (e = !0), e) {
          this.label && (this.label._ariaAutocompleteLabelOriginallyFor = this.ids.ELEMENT, this.label.setAttribute("for", this.ids.INPUT));
          var t = this.element.getAttribute("aria-describedby");
          t && this.input.setAttribute("aria-describedby", t);
          var i = this.element.getAttribute("aria-labelledby");
          i && this.input.setAttribute("aria-labelledby", i);
        }

        this.selected.length && (this.multiple ? (this.buildMultiSelected(), this.triggerAutoGrow()) : this.setInputValue(this.selected[0].label || "", !0)), this.element.disabled && this.disable(!0);
      }, e.prototype.setHtml = function () {
        var e = this.options,
            t = this.cssNameSpace,
            i = e.wrapperClassName ? " " + e.wrapperClassName : "",
            s = ['<div id="' + this.ids.WRAPPER + '" class="' + t + "__wrapper" + i + '">'];
        s.push('<p class="sr-only ' + t + "__sr-only " + t + '__sr-announcements" id="' + this.ids.SR_ANNOUNCEMENTS + '" aria-live="polite" aria-atomic="true"></p>');
        var n = e.name ? ' name="' + e.name + '"' : "",
            r = e.inputClassName ? " " + e.inputClassName : "",
            l = e.placeholder ? ' placeholder="' + e.placeholder + '" aria-placeholder="' + e.placeholder + '"' : "";
        s.push('<input type="text" autocomplete="off" aria-expanded="false" aria-autocomplete="list" aria-describedby="' + this.ids.SR_ASSISTANCE + '" role="combobox" id="' + this.ids.INPUT + '" aria-owns="' + this.ids.LIST + '" class="' + t + "__input" + r + '"' + n + l + " />"), e.showAllControl && s.push('<span role="button" tabindex="0" id="' + this.ids.BUTTON + '" aria-label="' + e.srShowAllText + '" class="' + t + '__show-all" aria-describedby="' + this.ids.LABEL + '" aria-expanded="false"></span>');
        var o = e.srListLabelText,
            a = e.listClassName ? " " + e.listClassName : "",
            h = o ? ' aria-label="' + o + '"' : "";
        s.push('<ul id="' + this.ids.LIST + '" class="' + t + "__list" + a + '" role="listbox" aria-describedby="' + this.ids.LABEL + '" aria-hidden="true" hidden="hidden"' + h + "></ul>"), s.push('<p id="' + this.ids.SR_ASSISTANCE + '" style="display:none;">' + _(e.srAssistiveText) + "</p>"), s.push("</div>"), this.element.insertAdjacentHTML("afterend", s.join(""));
      }, e.prototype.destroy = function () {
        var e = this;
        this.label && this.label._ariaAutocompleteLabelOriginallyFor && (this.label.setAttribute("for", this.label._ariaAutocompleteLabelOriginallyFor), delete this.label._ariaAutocompleteLabelOriginallyFor), this.documentClickBound && document.removeEventListener("click", this.documentClick), this.autoGrow && this.inputAutoWidth && this.inputAutoWidth.destroy(), this.wrapper.parentNode.removeChild(this.wrapper), delete this.element.ariaAutocomplete, this.show(this.element), clearTimeout(this.filterTimer), clearTimeout(this.pollingTimer), clearTimeout(this.showAllPrepTimer), clearTimeout(this.announcementTimer), clearTimeout(this.componentBlurTimer), clearTimeout(this.clearAnnouncementTimer), clearTimeout(this.elementChangeEventTimer), ["list", "input", "label", "element", "wrapper", "showAll", "deleteAll", "srAssistance", "srAnnouncements"].forEach(function (t) {
          return e[t] = null;
        });
      }, e.prototype.init = function (e, t) {
        this.selected = [], this.element = e, this.label = document.querySelector('[for="' + this.element.id + '"]'), this.ids = new T(this.element.id, this.label ? this.label.id : null, t.id), this.elementIsInput = "INPUT" === e.nodeName, this.options = new h(t), this.label && !this.label.id && (this.label.id = this.ids.LABEL), this.source = this.options.source, this.multiple = this.options.multiple, this.autoGrow = this.options.autoGrow, this.cssNameSpace = this.options.cssNameSpace, this.documentClick = this.handleComponentBlur.bind(this), this.setHtml(), this.list = document.getElementById(this.ids.LIST), this.input = document.getElementById(this.ids.INPUT), this.wrapper = document.getElementById(this.ids.WRAPPER), this.showAll = document.getElementById(this.ids.BUTTON), this.srAssistance = document.getElementById(this.ids.SR_ASSISTANCE), this.srAnnouncements = document.getElementById(this.ids.SR_ANNOUNCEMENTS), this.prepListSource();
        var i = [];
        this.options.showAllControl && i.push(this.cssNameSpace + "__wrapper--show-all"), this.autoGrow && i.push(this.cssNameSpace + "__wrapper--autogrow"), this.multiple && i.push(this.cssNameSpace + "__wrapper--multiple"), i.length && a(this.wrapper, i.join(" ")), this.hide(this.list), this.hide(this.element), this.setInputStartingStates(), this.bindEvents(), this.api = new E(this), this.triggerOptionCallback("onReady", [this.wrapper]);
      }, e;
    }();

    function V(e, t) {
      return e && e.ariaAutocomplete && e.ariaAutocomplete.open ? e.ariaAutocomplete : new K(e, t).api;
    }

    t.default = V;
  }]);
});

/***/ })

/******/ 	});
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*****************************************!*\
  !*** ./crt_portal/static/js/actions.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_aria_autocomplete_1_2_3_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/aria-autocomplete-1.2.3.min.js */ "./crt_portal/static/vendor/aria-autocomplete-1.2.3.min.js");
/* harmony import */ var _vendor_aria_autocomplete_1_2_3_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_aria_autocomplete_1_2_3_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_bulk_actions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/bulk_actions.js */ "./crt_portal/static/js/components/bulk_actions.js");
/* harmony import */ var _components_bulk_actions_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_bulk_actions_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/modal.js */ "./crt_portal/static/js/components/modal.js");
/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_modal_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_print_report_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/print_report.js */ "./crt_portal/static/js/components/print_report.js");




}();
/******/ })()
;
//# sourceMappingURL=actions.js.map