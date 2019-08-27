(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var a, b;
"undefined" != typeof navigator && (a = window || {}, b = function b(window) {
  "use strict";

  var svgNS = "http://www.w3.org/2000/svg",
      locationHref = "",
      initialDefaultFrame = -999999,
      subframeEnabled = !0,
      expressionsPlugin,
      isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      cachedColors = {},
      bm_rounder = Math.round,
      bm_rnd,
      bm_pow = Math.pow,
      bm_sqrt = Math.sqrt,
      bm_abs = Math.abs,
      bm_floor = Math.floor,
      bm_max = Math.max,
      bm_min = Math.min,
      blitter = 10,
      BMMath = {};

  function ProjectInterface() {
    return {};
  }

  !function () {
    var t,
        e = Object.getOwnPropertyNames(Math),
        r = e.length;

    for (t = 0; t < r; t += 1) {
      BMMath[e[t]] = Math[e[t]];
    }
  }(), BMMath.random = Math.random, BMMath.abs = function (t) {
    if ("object" === _typeof(t) && t.length) {
      var e,
          r = createSizedArray(t.length),
          i = t.length;

      for (e = 0; e < i; e += 1) {
        r[e] = Math.abs(t[e]);
      }

      return r;
    }

    return Math.abs(t);
  };
  var defaultCurveSegments = 150,
      degToRads = Math.PI / 180,
      roundCorner = .5519;

  function roundValues(t) {
    bm_rnd = t ? Math.round : function (t) {
      return t;
    };
  }

  function styleDiv(t) {
    t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d";
  }

  function BMEnterFrameEvent(t, e, r, i) {
    this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1;
  }

  function BMCompleteEvent(t, e) {
    this.type = t, this.direction = e < 0 ? -1 : 1;
  }

  function BMCompleteLoopEvent(t, e, r, i) {
    this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1;
  }

  function BMSegmentStartEvent(t, e, r) {
    this.type = t, this.firstFrame = e, this.totalFrames = r;
  }

  function BMDestroyEvent(t, e) {
    this.type = t, this.target = e;
  }

  roundValues(!1);
  var createElementID = (D = 0, function () {
    return "__lottie_element_" + ++D;
  }),
      D;

  function HSVtoRGB(t, e, r) {
    var i, s, a, n, o, h, l, p;

    switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
      case 0:
        i = r, s = p, a = h;
        break;

      case 1:
        i = l, s = r, a = h;
        break;

      case 2:
        i = h, s = r, a = p;
        break;

      case 3:
        i = h, s = l, a = r;
        break;

      case 4:
        i = p, s = h, a = r;
        break;

      case 5:
        i = r, s = h, a = l;
    }

    return [i, s, a];
  }

  function RGBtoHSV(t, e, r) {
    var i,
        s = Math.max(t, e, r),
        a = Math.min(t, e, r),
        n = s - a,
        o = 0 === s ? 0 : n / s,
        h = s / 255;

    switch (s) {
      case a:
        i = 0;
        break;

      case t:
        i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
        break;

      case e:
        i = r - t + 2 * n, i /= 6 * n;
        break;

      case r:
        i = t - e + 4 * n, i /= 6 * n;
    }

    return [i, o, h];
  }

  function addSaturationToRGB(t, e) {
    var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
    return r[1] += e, 1 < r[1] ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
  }

  function addBrightnessToRGB(t, e) {
    var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
    return r[2] += e, 1 < r[2] ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
  }

  function addHueToRGB(t, e) {
    var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
    return r[0] += e / 360, 1 < r[0] ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
  }

  var rgbToHex = function () {
    var t,
        e,
        i = [];

    for (t = 0; t < 256; t += 1) {
      e = t.toString(16), i[t] = 1 == e.length ? "0" + e : e;
    }

    return function (t, e, r) {
      return t < 0 && (t = 0), e < 0 && (e = 0), r < 0 && (r = 0), "#" + i[t] + i[e] + i[r];
    };
  }();

  function BaseEvent() {}

  BaseEvent.prototype = {
    triggerEvent: function triggerEvent(t, e) {
      if (this._cbs[t]) for (var r = this._cbs[t].length, i = 0; i < r; i++) {
        this._cbs[t][i](e);
      }
    },
    addEventListener: function addEventListener(t, e) {
      return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
        this.removeEventListener(t, e);
      }.bind(this);
    },
    removeEventListener: function removeEventListener(t, e) {
      if (e) {
        if (this._cbs[t]) {
          for (var r = 0, i = this._cbs[t].length; r < i;) {
            this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
          }

          this._cbs[t].length || (this._cbs[t] = null);
        }
      } else this._cbs[t] = null;
    }
  };
  var createTypedArray = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
    return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0;
  } : function (t, e) {
    var r,
        i = 0,
        s = [];

    switch (t) {
      case "int16":
      case "uint8c":
        r = 1;
        break;

      default:
        r = 1.1;
    }

    for (i = 0; i < e; i += 1) {
      s.push(r);
    }

    return s;
  };

  function createSizedArray(t) {
    return Array.apply(null, {
      length: t
    });
  }

  function createNS(t) {
    return document.createElementNS(svgNS, t);
  }

  function createTag(t) {
    return document.createElement(t);
  }

  function DynamicPropertyContainer() {}

  DynamicPropertyContainer.prototype = {
    addDynamicProperty: function addDynamicProperty(t) {
      -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
    },
    iterateDynamicProperties: function iterateDynamicProperties() {
      this._mdf = !1;
      var t,
          e = this.dynamicProperties.length;

      for (t = 0; t < e; t += 1) {
        this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
      }
    },
    initDynamicPropertyContainer: function initDynamicPropertyContainer(t) {
      this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
    }
  };

  var getBlendMode = (Ma = {
    1: "multiply",
    2: "screen",
    3: "overlay",
    4: "darken",
    5: "lighten",
    6: "color-dodge",
    7: "color-burn",
    8: "hard-light",
    9: "soft-light",
    10: "difference",
    11: "exclusion",
    12: "hue",
    13: "saturation",
    14: "color",
    15: "luminosity"
  }, function (t) {
    return Ma[t] || "";
  }),
      Ma,
      Matrix = function () {
    var s = Math.cos,
        a = Math.sin,
        n = Math.tan,
        i = Math.round;

    function t() {
      return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
    }

    function e(t) {
      if (0 === t) return this;
      var e = s(t),
          r = a(t);
      return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    function r(t) {
      if (0 === t) return this;
      var e = s(t),
          r = a(t);
      return this._t(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1);
    }

    function o(t) {
      if (0 === t) return this;
      var e = s(t),
          r = a(t);
      return this._t(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1);
    }

    function h(t) {
      if (0 === t) return this;
      var e = s(t),
          r = a(t);
      return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    function l(t, e) {
      return this._t(1, e, t, 1, 0, 0);
    }

    function p(t, e) {
      return this.shear(n(t), n(e));
    }

    function m(t, e) {
      var r = s(e),
          i = a(e);
      return this._t(r, i, 0, 0, -i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, n(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(r, -i, 0, 0, i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    function f(t, e, r) {
      return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1);
    }

    function c(t, e, r, i, s, a, n, o, h, l, p, m, f, c, d, u) {
      return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = m, this.props[12] = f, this.props[13] = c, this.props[14] = d, this.props[15] = u, this;
    }

    function d(t, e, r) {
      return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this;
    }

    function u(t, e, r, i, s, a, n, o, h, l, p, m, f, c, d, u) {
      var y = this.props;
      if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === m) return y[12] = y[12] * t + y[15] * f, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;
      var g = y[0],
          v = y[1],
          b = y[2],
          E = y[3],
          x = y[4],
          P = y[5],
          S = y[6],
          _ = y[7],
          C = y[8],
          A = y[9],
          T = y[10],
          D = y[11],
          k = y[12],
          M = y[13],
          w = y[14],
          F = y[15];
      return y[0] = g * t + v * s + b * h + E * f, y[1] = g * e + v * a + b * l + E * c, y[2] = g * r + v * n + b * p + E * d, y[3] = g * i + v * o + b * m + E * u, y[4] = x * t + P * s + S * h + _ * f, y[5] = x * e + P * a + S * l + _ * c, y[6] = x * r + P * n + S * p + _ * d, y[7] = x * i + P * o + S * m + _ * u, y[8] = C * t + A * s + T * h + D * f, y[9] = C * e + A * a + T * l + D * c, y[10] = C * r + A * n + T * p + D * d, y[11] = C * i + A * o + T * m + D * u, y[12] = k * t + M * s + w * h + F * f, y[13] = k * e + M * a + w * l + F * c, y[14] = k * r + M * n + w * p + F * d, y[15] = k * i + M * o + w * m + F * u, this._identityCalculated = !1, this;
    }

    function y() {
      return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity;
    }

    function g(t) {
      for (var e = 0; e < 16;) {
        if (t.props[e] !== this.props[e]) return !1;
        e += 1;
      }

      return !0;
    }

    function v(t) {
      var e;

      for (e = 0; e < 16; e += 1) {
        t.props[e] = this.props[e];
      }
    }

    function b(t) {
      var e;

      for (e = 0; e < 16; e += 1) {
        this.props[e] = t[e];
      }
    }

    function E(t, e, r) {
      return {
        x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
        y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
        z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
      };
    }

    function x(t, e, r) {
      return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12];
    }

    function P(t, e, r) {
      return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13];
    }

    function S(t, e, r) {
      return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14];
    }

    function _(t) {
      var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
          r = this.props[5] / e,
          i = -this.props[1] / e,
          s = -this.props[4] / e,
          a = this.props[0] / e,
          n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
          o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
      return [t[0] * r + t[1] * s + n, t[0] * i + t[1] * a + o, 0];
    }

    function C(t) {
      var e,
          r = t.length,
          i = [];

      for (e = 0; e < r; e += 1) {
        i[e] = _(t[e]);
      }

      return i;
    }

    function A(t, e, r) {
      var i = createTypedArray("float32", 6);
      if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];else {
        var s = this.props[0],
            a = this.props[1],
            n = this.props[4],
            o = this.props[5],
            h = this.props[12],
            l = this.props[13];
        i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l;
      }
      return i;
    }

    function T(t, e, r) {
      return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]];
    }

    function D(t, e) {
      if (this.isIdentity()) return t + "," + e;
      var r = this.props;
      return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100;
    }

    function k() {
      for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) {
        r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
      }

      return r;
    }

    function M(t) {
      return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? i(1e4 * t) / 1e4 : t;
    }

    function w() {
      var t = this.props;
      return "matrix(" + M(t[0]) + "," + M(t[1]) + "," + M(t[4]) + "," + M(t[5]) + "," + M(t[12]) + "," + M(t[13]) + ")";
    }

    return function () {
      this.reset = t, this.rotate = e, this.rotateX = r, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = m, this.shear = l, this.scale = f, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = E, this.applyToX = x, this.applyToY = P, this.applyToZ = S, this.applyToPointArray = T, this.applyToTriplePoints = A, this.applyToPointStringified = D, this.toCSS = k, this.to2dCSS = w, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = C, this.inversePoint = _, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
    };
  }();

  !function (o, h) {
    var l,
        p = this,
        m = 256,
        f = 6,
        c = "random",
        d = h.pow(m, f),
        u = h.pow(2, 52),
        y = 2 * u,
        g = m - 1;

    function v(t) {
      var e,
          r = t.length,
          n = this,
          i = 0,
          s = n.i = n.j = 0,
          a = n.S = [];

      for (r || (t = [r++]); i < m;) {
        a[i] = i++;
      }

      for (i = 0; i < m; i++) {
        a[i] = a[s = g & s + t[i % r] + (e = a[i])], a[s] = e;
      }

      n.g = function (t) {
        for (var e, r = 0, i = n.i, s = n.j, a = n.S; t--;) {
          e = a[i = g & i + 1], r = r * m + a[g & (a[i] = a[s = g & s + e]) + (a[s] = e)];
        }

        return n.i = i, n.j = s, r;
      };
    }

    function b(t, e) {
      return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e;
    }

    function E(t, e) {
      for (var r, i = t + "", s = 0; s < i.length;) {
        e[g & s] = g & (r ^= 19 * e[g & s]) + i.charCodeAt(s++);
      }

      return x(e);
    }

    function x(t) {
      return String.fromCharCode.apply(0, t);
    }

    h["seed" + c] = function (t, e, r) {
      var i = [],
          s = E(function t(e, r) {
        var i,
            s = [],
            a = _typeof(e);

        if (r && "object" == a) for (i in e) {
          try {
            s.push(t(e[i], r - 1));
          } catch (t) {}
        }
        return s.length ? s : "string" == a ? e : e + "\0";
      }((e = !0 === e ? {
        entropy: !0
      } : e || {}).entropy ? [t, x(o)] : null === t ? function () {
        try {
          if (l) return x(l.randomBytes(m));
          var t = new Uint8Array(m);
          return (p.crypto || p.msCrypto).getRandomValues(t), x(t);
        } catch (t) {
          var e = p.navigator,
              r = e && e.plugins;
          return [+new Date(), p, r, p.screen, x(o)];
        }
      }() : t, 3), i),
          a = new v(i),
          n = function n() {
        for (var t = a.g(f), e = d, r = 0; t < u;) {
          t = (t + r) * m, e *= m, r = a.g(1);
        }

        for (; y <= t;) {
          t /= 2, e /= 2, r >>>= 1;
        }

        return (t + r) / e;
      };

      return n.int32 = function () {
        return 0 | a.g(4);
      }, n.quick = function () {
        return a.g(4) / 4294967296;
      }, n["double"] = n, E(x(a.S), o), (e.pass || r || function (t, e, r, i) {
        return i && (i.S && b(i, a), t.state = function () {
          return b(a, {});
        }), r ? (h[c] = t, e) : t;
      })(n, s, "global" in e ? e.global : this == h, e.state);
    }, E(h.random(), o);
  }([], BMMath);

  var BezierFactory = function () {
    var t = {
      getBezierEasing: function getBezierEasing(t, e, r, i, s) {
        var a = s || ("bez_" + t + "_" + e + "_" + r + "_" + i).replace(/\./g, "p");
        if (o[a]) return o[a];
        var n = new h([t, e, r, i]);
        return o[a] = n;
      }
    },
        o = {};
    var l = 11,
        p = 1 / (l - 1),
        e = "function" == typeof Float32Array;

    function i(t, e) {
      return 1 - 3 * e + 3 * t;
    }

    function s(t, e) {
      return 3 * e - 6 * t;
    }

    function a(t) {
      return 3 * t;
    }

    function m(t, e, r) {
      return ((i(e, r) * t + s(e, r)) * t + a(e)) * t;
    }

    function f(t, e, r) {
      return 3 * i(e, r) * t * t + 2 * s(e, r) * t + a(e);
    }

    function h(t) {
      this._p = t, this._mSampleValues = e ? new Float32Array(l) : new Array(l), this._precomputed = !1, this.get = this.get.bind(this);
    }

    return h.prototype = {
      get: function get(t) {
        var e = this._p[0],
            r = this._p[1],
            i = this._p[2],
            s = this._p[3];
        return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : m(this._getTForX(t), r, s);
      },
      _precompute: function _precompute() {
        var t = this._p[0],
            e = this._p[1],
            r = this._p[2],
            i = this._p[3];
        this._precomputed = !0, t === e && r === i || this._calcSampleValues();
      },
      _calcSampleValues: function _calcSampleValues() {
        for (var t = this._p[0], e = this._p[2], r = 0; r < l; ++r) {
          this._mSampleValues[r] = m(r * p, t, e);
        }
      },
      _getTForX: function _getTForX(t) {
        for (var e = this._p[0], r = this._p[2], i = this._mSampleValues, s = 0, a = 1, n = l - 1; a !== n && i[a] <= t; ++a) {
          s += p;
        }

        var o = s + (t - i[--a]) / (i[a + 1] - i[a]) * p,
            h = f(o, e, r);
        return .001 <= h ? function (t, e, r, i) {
          for (var s = 0; s < 4; ++s) {
            var a = f(e, r, i);
            if (0 === a) return e;
            e -= (m(e, r, i) - t) / a;
          }

          return e;
        }(t, o, e, r) : 0 === h ? o : function (t, e, r, i, s) {
          for (var a, n, o = 0; 0 < (a = m(n = e + (r - e) / 2, i, s) - t) ? r = n : e = n, 1e-7 < Math.abs(a) && ++o < 10;) {
            ;
          }

          return n;
        }(t, s, s + p, e, r);
      }
    }, t;
  }();

  function extendPrototype(t, e) {
    var r,
        i,
        s = t.length;

    for (r = 0; r < s; r += 1) {
      for (var a in i = t[r].prototype) {
        i.hasOwnProperty(a) && (e.prototype[a] = i[a]);
      }
    }
  }

  function getDescriptor(t, e) {
    return Object.getOwnPropertyDescriptor(t, e);
  }

  function createProxyFunction(t) {
    function e() {}

    return e.prototype = t, e;
  }

  function bezFunction() {
    Math;

    function g(t, e, r, i, s, a) {
      var n = t * i + e * s + r * a - s * i - a * t - r * e;
      return -.001 < n && n < .001;
    }

    var p = function p(t, e, r, i) {
      var s,
          a,
          n,
          o,
          h,
          l,
          p = defaultCurveSegments,
          m = 0,
          f = [],
          c = [],
          d = bezier_length_pool.newElement();

      for (n = r.length, s = 0; s < p; s += 1) {
        for (h = s / (p - 1), a = l = 0; a < n; a += 1) {
          o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bm_pow(h, 2) * i[a] + bm_pow(h, 3) * e[a], f[a] = o, null !== c[a] && (l += bm_pow(f[a] - c[a], 2)), c[a] = f[a];
        }

        l && (m += l = bm_sqrt(l)), d.percents[s] = h, d.lengths[s] = m;
      }

      return d.addedLength = m, d;
    };

    function v(t) {
      this.segmentLength = 0, this.points = new Array(t);
    }

    function b(t, e) {
      this.partialLength = t, this.point = e;
    }

    var E,
        t = (E = {}, function (t) {
      var e = t.s,
          r = t.e,
          i = t.to,
          s = t.ti,
          a = (e[0] + "_" + e[1] + "_" + r[0] + "_" + r[1] + "_" + i[0] + "_" + i[1] + "_" + s[0] + "_" + s[1]).replace(/\./g, "p");
      if (E[a]) t.bezierData = E[a];else {
        var n,
            o,
            h,
            l,
            p,
            m,
            f,
            c = defaultCurveSegments,
            d = 0,
            u = null;
        2 === e.length && (e[0] != r[0] || e[1] != r[1]) && g(e[0], e[1], r[0], r[1], e[0] + i[0], e[1] + i[1]) && g(e[0], e[1], r[0], r[1], r[0] + s[0], r[1] + s[1]) && (c = 2);
        var y = new v(c);

        for (h = i.length, n = 0; n < c; n += 1) {
          for (f = createSizedArray(h), p = n / (c - 1), o = m = 0; o < h; o += 1) {
            l = bm_pow(1 - p, 3) * e[o] + 3 * bm_pow(1 - p, 2) * p * (e[o] + i[o]) + 3 * (1 - p) * bm_pow(p, 2) * (r[o] + s[o]) + bm_pow(p, 3) * r[o], f[o] = l, null !== u && (m += bm_pow(f[o] - u[o], 2));
          }

          d += m = bm_sqrt(m), y.points[n] = new b(m, f), u = f;
        }

        y.segmentLength = d, t.bezierData = y, E[a] = y;
      }
    });

    function k(t, e) {
      var r = e.percents,
          i = e.lengths,
          s = r.length,
          a = bm_floor((s - 1) * t),
          n = t * e.addedLength,
          o = 0;
      if (a === s - 1 || 0 === a || n === i[a]) return r[a];

      for (var h = i[a] > n ? -1 : 1, l = !0; l;) {
        if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || s - 1 <= a) {
          if (a === s - 1) return r[a];
          l = !1;
        }
      }

      return r[a] + (r[a + 1] - r[a]) * o;
    }

    var M = createTypedArray("float32", 8);
    return {
      getSegmentsLength: function getSegmentsLength(t) {
        var e,
            r = segments_length_pool.newElement(),
            i = t.c,
            s = t.v,
            a = t.o,
            n = t.i,
            o = t._length,
            h = r.lengths,
            l = 0;

        for (e = 0; e < o - 1; e += 1) {
          h[e] = p(s[e], s[e + 1], a[e], n[e + 1]), l += h[e].addedLength;
        }

        return i && o && (h[e] = p(s[e], s[0], a[e], n[0]), l += h[e].addedLength), r.totalLength = l, r;
      },
      getNewSegment: function getNewSegment(t, e, r, i, s, a, n) {
        var o,
            h = k(s = s < 0 ? 0 : 1 < s ? 1 : s, n),
            l = k(a = 1 < a ? 1 : a, n),
            p = t.length,
            m = 1 - h,
            f = 1 - l,
            c = m * m * m,
            d = h * m * m * 3,
            u = h * h * m * 3,
            y = h * h * h,
            g = m * m * f,
            v = h * m * f + m * h * f + m * m * l,
            b = h * h * f + m * h * l + h * m * l,
            E = h * h * l,
            x = m * f * f,
            P = h * f * f + m * l * f + m * f * l,
            S = h * l * f + m * l * l + h * f * l,
            _ = h * l * l,
            C = f * f * f,
            A = l * f * f + f * l * f + f * f * l,
            T = l * l * f + f * l * l + l * f * l,
            D = l * l * l;

        for (o = 0; o < p; o += 1) {
          M[4 * o] = Math.round(1e3 * (c * t[o] + d * r[o] + u * i[o] + y * e[o])) / 1e3, M[4 * o + 1] = Math.round(1e3 * (g * t[o] + v * r[o] + b * i[o] + E * e[o])) / 1e3, M[4 * o + 2] = Math.round(1e3 * (x * t[o] + P * r[o] + S * i[o] + _ * e[o])) / 1e3, M[4 * o + 3] = Math.round(1e3 * (C * t[o] + A * r[o] + T * i[o] + D * e[o])) / 1e3;
        }

        return M;
      },
      getPointInSegment: function getPointInSegment(t, e, r, i, s, a) {
        var n = k(s, a),
            o = 1 - n;
        return [Math.round(1e3 * (o * o * o * t[0] + (n * o * o + o * n * o + o * o * n) * r[0] + (n * n * o + o * n * n + n * o * n) * i[0] + n * n * n * e[0])) / 1e3, Math.round(1e3 * (o * o * o * t[1] + (n * o * o + o * n * o + o * o * n) * r[1] + (n * n * o + o * n * n + n * o * n) * i[1] + n * n * n * e[1])) / 1e3];
      },
      buildBezierData: t,
      pointOnLine2D: g,
      pointOnLine3D: function pointOnLine3D(t, e, r, i, s, a, n, o, h) {
        if (0 === r && 0 === a && 0 === h) return g(t, e, i, s, n, o);
        var l,
            p = Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - e, 2) + Math.pow(a - r, 2)),
            m = Math.sqrt(Math.pow(n - t, 2) + Math.pow(o - e, 2) + Math.pow(h - r, 2)),
            f = Math.sqrt(Math.pow(n - i, 2) + Math.pow(o - s, 2) + Math.pow(h - a, 2));
        return -1e-4 < (l = m < p ? f < p ? p - m - f : f - m - p : m < f ? f - m - p : m - p - f) && l < 1e-4;
      }
    };
  }

  !function () {
    for (var a = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
      window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
    }

    window.requestAnimationFrame || (window.requestAnimationFrame = function (t, e) {
      var r = new Date().getTime(),
          i = Math.max(0, 16 - (r - a)),
          s = setTimeout(function () {
        t(r + i);
      }, i);
      return a = r + i, s;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    });
  }();
  var bez = bezFunction();

  function dataFunctionManager() {
    function c(t, e) {
      for (var r = 0, i = e.length; r < i;) {
        if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
        r += 1;
      }
    }

    function d(t) {
      var e, r, i;

      for (e = t.length - 1; 0 <= e; e -= 1) {
        if ("sh" == t[e].ty) {
          if (t[e].ks.k.i) u(t[e].ks.k);else for (i = t[e].ks.k.length, r = 0; r < i; r += 1) {
            t[e].ks.k[r].s && u(t[e].ks.k[r].s[0]), t[e].ks.k[r].e && u(t[e].ks.k[r].e[0]);
          }
          !0;
        } else "gr" == t[e].ty && d(t[e].it);
      }
    }

    function u(t) {
      var e,
          r = t.i.length;

      for (e = 0; e < r; e += 1) {
        t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1];
      }
    }

    function o(t, e) {
      var r = e ? e.split(".") : [100, 100, 100];
      return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && void 0));
    }

    var h,
        r = function () {
      var i = [4, 4, 14];

      function s(t) {
        var e,
            r,
            i,
            s = t.length;

        for (e = 0; e < s; e += 1) {
          5 === t[e].ty && (r = t[e], void 0, i = r.t.d, r.t.d = {
            k: [{
              s: i,
              t: 0
            }]
          });
        }
      }

      return function (t) {
        if (o(i, t.v) && (s(t.layers), t.assets)) {
          var e,
              r = t.assets.length;

          for (e = 0; e < r; e += 1) {
            t.assets[e].layers && s(t.assets[e].layers);
          }
        }
      };
    }(),
        i = (h = [4, 7, 99], function (t) {
      if (t.chars && !o(h, t.v)) {
        var e,
            r,
            i,
            s,
            a,
            n = t.chars.length;

        for (e = 0; e < n; e += 1) {
          if (t.chars[e].data && t.chars[e].data.shapes) for (i = (a = t.chars[e].data.shapes[0].it).length, r = 0; r < i; r += 1) {
            (s = a[r].ks.k).__converted || (u(a[r].ks.k), s.__converted = !0);
          }
        }
      }
    }),
        s = function () {
      var i = [4, 1, 9];

      function a(t) {
        var e,
            r,
            i,
            s = t.length;

        for (e = 0; e < s; e += 1) {
          if ("gr" === t[e].ty) a(t[e].it);else if ("fl" === t[e].ty || "st" === t[e].ty) if (t[e].c.k && t[e].c.k[0].i) for (i = t[e].c.k.length, r = 0; r < i; r += 1) {
            t[e].c.k[r].s && (t[e].c.k[r].s[0] /= 255, t[e].c.k[r].s[1] /= 255, t[e].c.k[r].s[2] /= 255, t[e].c.k[r].s[3] /= 255), t[e].c.k[r].e && (t[e].c.k[r].e[0] /= 255, t[e].c.k[r].e[1] /= 255, t[e].c.k[r].e[2] /= 255, t[e].c.k[r].e[3] /= 255);
          } else t[e].c.k[0] /= 255, t[e].c.k[1] /= 255, t[e].c.k[2] /= 255, t[e].c.k[3] /= 255;
        }
      }

      function s(t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) {
          4 === t[e].ty && a(t[e].shapes);
        }
      }

      return function (t) {
        if (o(i, t.v) && (s(t.layers), t.assets)) {
          var e,
              r = t.assets.length;

          for (e = 0; e < r; e += 1) {
            t.assets[e].layers && s(t.assets[e].layers);
          }
        }
      };
    }(),
        a = function () {
      var i = [4, 4, 18];

      function l(t) {
        var e, r, i;

        for (e = t.length - 1; 0 <= e; e -= 1) {
          if ("sh" == t[e].ty) {
            if (t[e].ks.k.i) t[e].ks.k.c = t[e].closed;else for (i = t[e].ks.k.length, r = 0; r < i; r += 1) {
              t[e].ks.k[r].s && (t[e].ks.k[r].s[0].c = t[e].closed), t[e].ks.k[r].e && (t[e].ks.k[r].e[0].c = t[e].closed);
            }
            !0;
          } else "gr" == t[e].ty && l(t[e].it);
        }
      }

      function s(t) {
        var e,
            r,
            i,
            s,
            a,
            n,
            o = t.length;

        for (r = 0; r < o; r += 1) {
          if ((e = t[r]).hasMask) {
            var h = e.masksProperties;

            for (s = h.length, i = 0; i < s; i += 1) {
              if (h[i].pt.k.i) h[i].pt.k.c = h[i].cl;else for (n = h[i].pt.k.length, a = 0; a < n; a += 1) {
                h[i].pt.k[a].s && (h[i].pt.k[a].s[0].c = h[i].cl), h[i].pt.k[a].e && (h[i].pt.k[a].e[0].c = h[i].cl);
              }
            }
          }

          4 === e.ty && l(e.shapes);
        }
      }

      return function (t) {
        if (o(i, t.v) && (s(t.layers), t.assets)) {
          var e,
              r = t.assets.length;

          for (e = 0; e < r; e += 1) {
            t.assets[e].layers && s(t.assets[e].layers);
          }
        }
      };
    }();

    var t = {};
    return t.completeData = function (t, e) {
      t.__complete || (s(t), r(t), i(t), a(t), function t(e, r, i) {
        var s,
            a,
            n,
            o,
            h,
            l,
            p,
            m = e.length;

        for (a = 0; a < m; a += 1) {
          if ("ks" in (s = e[a]) && !s.completed) {
            if (s.completed = !0, s.tt && (e[a - 1].td = s.tt), s.hasMask) {
              var f = s.masksProperties;

              for (o = f.length, n = 0; n < o; n += 1) {
                if (f[n].pt.k.i) u(f[n].pt.k);else for (l = f[n].pt.k.length, h = 0; h < l; h += 1) {
                  f[n].pt.k[h].s && u(f[n].pt.k[h].s[0]), f[n].pt.k[h].e && u(f[n].pt.k[h].e[0]);
                }
              }
            }

            0 === s.ty ? (s.layers = c(s.refId, r), t(s.layers, r, i)) : 4 === s.ty ? d(s.shapes) : 5 == s.ty && (0 !== (p = s).t.a.length || "m" in p.t.p || (p.singleShape = !0));
          }
        }
      }(t.layers, t.assets, e), t.__complete = !0);
    }, t;
  }

  var dataManager = dataFunctionManager(),
      FontManager = function () {
    var a = {
      w: 0,
      size: 0,
      shapes: []
    },
        t = [];

    function u(t, e) {
      var r = createTag("span");
      r.style.fontFamily = e;
      var i = createTag("span");
      i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
      var s = i.offsetWidth;
      return i.style.fontFamily = t + ", " + e, {
        node: i,
        w: s,
        parent: r
      };
    }

    t = t.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);

    var e = function e() {
      this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now();
    };

    return e.getCombinedCharacterCodes = function () {
      return t;
    }, e.prototype.addChars = function (t) {
      if (t) {
        this.chars || (this.chars = []);
        var e,
            r,
            i,
            s = t.length,
            a = this.chars.length;

        for (e = 0; e < s; e += 1) {
          for (r = 0, i = !1; r < a;) {
            this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
          }

          i || (this.chars.push(t[e]), a += 1);
        }
      }
    }, e.prototype.addFonts = function (t, e) {
      if (t) {
        if (this.chars) return this.isLoaded = !0, void (this.fonts = t.list);
        var r,
            i,
            s,
            a,
            n = t.list,
            o = n.length,
            h = o;

        for (r = 0; r < o; r += 1) {
          var l,
              p,
              m = !0;

          if (n[r].loaded = !1, n[r].monoCase = u(n[r].fFamily, "monospace"), n[r].sansCase = u(n[r].fFamily, "sans-serif"), n[r].fPath) {
            if ("p" === n[r].fOrigin || 3 === n[r].origin) {
              if (0 < (l = document.querySelectorAll('style[f-forigin="p"][f-family="' + n[r].fFamily + '"], style[f-origin="3"][f-family="' + n[r].fFamily + '"]')).length && (m = !1), m) {
                var f = createTag("style");
                f.setAttribute("f-forigin", n[r].fOrigin), f.setAttribute("f-origin", n[r].origin), f.setAttribute("f-family", n[r].fFamily), f.type = "text/css", f.innerHTML = "@font-face {font-family: " + n[r].fFamily + "; font-style: normal; src: url('" + n[r].fPath + "');}", e.appendChild(f);
              }
            } else if ("g" === n[r].fOrigin || 1 === n[r].origin) {
              for (l = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), p = 0; p < l.length; p++) {
                -1 !== l[p].href.indexOf(n[r].fPath) && (m = !1);
              }

              if (m) {
                var c = createTag("link");
                c.setAttribute("f-forigin", n[r].fOrigin), c.setAttribute("f-origin", n[r].origin), c.type = "text/css", c.rel = "stylesheet", c.href = n[r].fPath, document.body.appendChild(c);
              }
            } else if ("t" === n[r].fOrigin || 2 === n[r].origin) {
              for (l = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), p = 0; p < l.length; p++) {
                n[r].fPath === l[p].src && (m = !1);
              }

              if (m) {
                var d = createTag("link");
                d.setAttribute("f-forigin", n[r].fOrigin), d.setAttribute("f-origin", n[r].origin), d.setAttribute("rel", "stylesheet"), d.setAttribute("href", n[r].fPath), e.appendChild(d);
              }
            }
          } else n[r].loaded = !0, h -= 1;

          n[r].helper = (i = e, s = n[r], a = void 0, (a = createNS("text")).style.fontSize = "100px", a.setAttribute("font-family", s.fFamily), a.setAttribute("font-style", s.fStyle), a.setAttribute("font-weight", s.fWeight), a.textContent = "1", s.fClass ? (a.style.fontFamily = "inherit", a.className = s.fClass) : a.style.fontFamily = s.fFamily, i.appendChild(a), createTag("canvas").getContext("2d").font = s.fWeight + " " + s.fStyle + " 100px " + s.fFamily, a), n[r].cache = {}, this.fonts.push(n[r]);
        }

        0 === h ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
      } else this.isLoaded = !0;
    }, e.prototype.getCharData = function (t, e, r) {
      for (var i = 0, s = this.chars.length; i < s;) {
        if (this.chars[i].ch === t && this.chars[i].style === e && this.chars[i].fFamily === r) return this.chars[i];
        i += 1;
      }

      return console && console.warn && console.warn("Missing character from exported characters list: ", t, e, r), a;
    }, e.prototype.getFontByName = function (t) {
      for (var e = 0, r = this.fonts.length; e < r;) {
        if (this.fonts[e].fName === t) return this.fonts[e];
        e += 1;
      }

      return this.fonts[0];
    }, e.prototype.measureText = function (t, e, r) {
      var i = this.getFontByName(e),
          s = t.charCodeAt(0);

      if (!i.cache[s + 1]) {
        var a = i.helper;

        if (" " === t) {
          a.textContent = "|" + t + "|";
          var n = a.getComputedTextLength();
          a.textContent = "||";
          var o = a.getComputedTextLength();
          i.cache[s + 1] = (n - o) / 100;
        } else a.textContent = t, i.cache[s + 1] = a.getComputedTextLength() / 100;
      }

      return i.cache[s + 1] * r;
    }, e.prototype.checkLoadedFonts = function () {
      var t,
          e,
          r,
          i = this.fonts.length,
          s = i;

      for (t = 0; t < i; t += 1) {
        this.fonts[t].loaded ? s -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, e.offsetWidth !== r ? (s -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, e.offsetWidth !== r && (s -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
      }

      0 !== s && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function () {
        this.isLoaded = !0;
      }.bind(this), 0);
    }, e.prototype.loaded = function () {
      return this.isLoaded;
    }, e;
  }(),
      PropertyFactory = function () {
    var m = initialDefaultFrame,
        s = Math.abs;

    function f(t, e) {
      var r,
          i = this.offsetTime;
      "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));

      for (var s, a, n, o, h, l, p, m, f = e.lastIndex, c = f, d = this.keyframes.length - 1, u = !0; u;) {
        if (s = this.keyframes[c], a = this.keyframes[c + 1], c === d - 1 && t >= a.t - i) {
          s.h && (s = a), f = 0;
          break;
        }

        if (a.t - i > t) {
          f = c;
          break;
        }

        c < d - 1 ? c += 1 : (f = 0, u = !1);
      }

      var y,
          g,
          v,
          b,
          E,
          x,
          P,
          S,
          _,
          C = a.t - i,
          A = s.t - i;

      if (s.to) {
        s.bezierData || bez.buildBezierData(s);
        var T = s.bezierData;

        if (C <= t || t < A) {
          var D = C <= t ? T.points.length - 1 : 0;

          for (o = T.points[D].point.length, n = 0; n < o; n += 1) {
            r[n] = T.points[D].point[n];
          }
        } else {
          s.__fnct ? m = s.__fnct : (m = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, s.__fnct = m), h = m((t - A) / (C - A));
          var k,
              M = T.segmentLength * h,
              w = e.lastFrame < t && e._lastBezierData === T ? e._lastAddedLength : 0;

          for (p = e.lastFrame < t && e._lastBezierData === T ? e._lastPoint : 0, u = !0, l = T.points.length; u;) {
            if (w += T.points[p].partialLength, 0 === M || 0 === h || p === T.points.length - 1) {
              for (o = T.points[p].point.length, n = 0; n < o; n += 1) {
                r[n] = T.points[p].point[n];
              }

              break;
            }

            if (w <= M && M < w + T.points[p + 1].partialLength) {
              for (k = (M - w) / T.points[p + 1].partialLength, o = T.points[p].point.length, n = 0; n < o; n += 1) {
                r[n] = T.points[p].point[n] + (T.points[p + 1].point[n] - T.points[p].point[n]) * k;
              }

              break;
            }

            p < l - 1 ? p += 1 : u = !1;
          }

          e._lastPoint = p, e._lastAddedLength = w - T.points[p].partialLength, e._lastBezierData = T;
        }
      } else {
        var F, I, V, R, B;
        if (d = s.s.length, this.sh && 1 !== s.h) {
          if (C <= t) r[0] = s.e[0], r[1] = s.e[1], r[2] = s.e[2];else if (t <= A) r[0] = s.s[0], r[1] = s.s[1], r[2] = s.s[2];else {
            var L = z(s.s),
                G = z(s.e);
            y = r, g = function (t, e, r) {
              var i,
                  s,
                  a,
                  n,
                  o,
                  h = [],
                  l = t[0],
                  p = t[1],
                  m = t[2],
                  f = t[3],
                  c = e[0],
                  d = e[1],
                  u = e[2],
                  y = e[3];
              (s = l * c + p * d + m * u + f * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y);
              o = 1e-6 < 1 - s ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, Math.sin(r * i) / a) : (n = 1 - r, r);
              return h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * m + o * u, h[3] = n * f + o * y, h;
            }(L, G, (t - A) / (C - A)), v = g[0], b = g[1], E = g[2], x = g[3], P = Math.atan2(2 * b * x - 2 * v * E, 1 - 2 * b * b - 2 * E * E), S = Math.asin(2 * v * b + 2 * E * x), _ = Math.atan2(2 * v * x - 2 * b * E, 1 - 2 * v * v - 2 * E * E), y[0] = P / degToRads, y[1] = S / degToRads, y[2] = _ / degToRads;
          }
        } else for (c = 0; c < d; c += 1) {
          1 !== s.h && (h = C <= t ? 1 : t < A ? 0 : (s.o.x.constructor === Array ? (s.__fnct || (s.__fnct = []), s.__fnct[c] ? m = s.__fnct[c] : (F = void 0 === _typeof(s.o.x[c]) ? s.o.x[0] : s.o.x[c], I = void 0 === _typeof(s.o.y[c]) ? s.o.y[0] : s.o.y[c], V = void 0 === _typeof(s.i.x[c]) ? s.i.x[0] : s.i.x[c], R = void 0 === _typeof(s.i.y[c]) ? s.i.y[0] : s.i.y[c], m = BezierFactory.getBezierEasing(F, I, V, R).get, s.__fnct[c] = m)) : s.__fnct ? m = s.__fnct : (F = s.o.x, I = s.o.y, V = s.i.x, R = s.i.y, m = BezierFactory.getBezierEasing(F, I, V, R).get, s.__fnct = m), m((t - A) / (C - A)))), B = 1 === s.h ? s.s[c] : s.s[c] + (s.e[c] - s.s[c]) * h, 1 === d ? r = B : r[c] = B;
        }
      }

      return e.lastIndex = f, r;
    }

    function z(t) {
      var e = t[0] * degToRads,
          r = t[1] * degToRads,
          i = t[2] * degToRads,
          s = Math.cos(e / 2),
          a = Math.cos(r / 2),
          n = Math.cos(i / 2),
          o = Math.sin(e / 2),
          h = Math.sin(r / 2),
          l = Math.sin(i / 2);
      return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l];
    }

    function c() {
      var t = this.comp.renderedFrame - this.offsetTime,
          e = this.keyframes[0].t - this.offsetTime,
          r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;

      if (!(t === this._caching.lastFrame || this._caching.lastFrame !== m && (this._caching.lastFrame >= r && r <= t || this._caching.lastFrame < e && t < e))) {
        this._caching.lastFrame >= t && (this._caching._lastBezierData = null, this._caching.lastIndex = 0);
        var i = this.interpolateValue(t, this._caching);
        this.pv = i;
      }

      return this._caching.lastFrame = t, this.pv;
    }

    function d(t) {
      var e;
      if ("unidimensional" === this.propType) e = t * this.mult, 1e-5 < s(this.v - e) && (this.v = e, this._mdf = !0);else for (var r = 0, i = this.v.length; r < i;) {
        e = t[r] * this.mult, 1e-5 < s(this.v[r] - e) && (this.v[r] = e, this._mdf = !0), r += 1;
      }
    }

    function u() {
      if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);else {
        this.lock = !0, this._mdf = this._isFirstFrame;
        var t,
            e = this.effectsSequence.length,
            r = this.kf ? this.pv : this.data.k;

        for (t = 0; t < e; t += 1) {
          r = this.effectsSequence[t](r);
        }

        this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
      }
    }

    function y(t) {
      this.effectsSequence.push(t), this.container.addDynamicProperty(this);
    }

    function n(t, e, r, i) {
      this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = u, this.setVValue = d, this.addEffect = y;
    }

    function o(t, e, r, i) {
      this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
      var s,
          a = e.k.length;
      this.v = createTypedArray("float32", a), this.pv = createTypedArray("float32", a);
      createTypedArray("float32", a);

      for (this.vel = createTypedArray("float32", a), s = 0; s < a; s += 1) {
        this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
      }

      this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = u, this.setVValue = d, this.addEffect = y;
    }

    function h(t, e, r, i) {
      this.propType = "unidimensional", this.keyframes = e.k, this.offsetTime = t.data.st, this.frameId = -1, this._caching = {
        lastFrame: m,
        lastIndex: 0,
        value: 0,
        _lastBezierData: null
      }, this.k = !0, this.kf = !0, this.data = e, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.v = m, this.pv = m, this._isFirstFrame = !0, this.getValue = u, this.setVValue = d, this.interpolateValue = f, this.effectsSequence = [c.bind(this)], this.addEffect = y;
    }

    function l(t, e, r, i) {
      this.propType = "multidimensional";
      var s,
          a,
          n,
          o,
          h,
          l = e.k.length;

      for (s = 0; s < l - 1; s += 1) {
        e.k[s].to && e.k[s].s && e.k[s].e && (a = e.k[s].s, n = e.k[s].e, o = e.k[s].to, h = e.k[s].ti, (2 === a.length && (a[0] !== n[0] || a[1] !== n[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) || 3 === a.length && (a[0] !== n[0] || a[1] !== n[1] || a[2] !== n[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], a[0] + o[0], a[1] + o[1], a[2] + o[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], n[0] + h[0], n[1] + h[1], n[2] + h[2])) && (e.k[s].to = null, e.k[s].ti = null), a[0] === n[0] && a[1] === n[1] && 0 === o[0] && 0 === o[1] && 0 === h[0] && 0 === h[1] && (2 === a.length || a[2] === n[2] && 0 === o[2] && 0 === h[2]) && (e.k[s].to = null, e.k[s].ti = null));
      }

      this.effectsSequence = [c.bind(this)], this.keyframes = e.k, this.offsetTime = t.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.getValue = u, this.setVValue = d, this.interpolateValue = f, this.frameId = -1;
      var p = e.k[0].s.length;

      for (this.v = createTypedArray("float32", p), this.pv = createTypedArray("float32", p), s = 0; s < p; s += 1) {
        this.v[s] = m, this.pv[s] = m;
      }

      this._caching = {
        lastFrame: m,
        lastIndex: 0,
        value: createTypedArray("float32", p)
      }, this.addEffect = y;
    }

    return {
      getProp: function getProp(t, e, r, i, s) {
        var a;
        if (0 === e.a) a = 0 === r ? new n(t, e, i, s) : new o(t, e, i, s);else if (1 === e.a) a = 0 === r ? new h(t, e, i, s) : new l(t, e, i, s);else if (e.k.length) {
          if ("number" == typeof e.k[0]) a = new o(t, e, i, s);else switch (r) {
            case 0:
              a = new h(t, e, i, s);
              break;

            case 1:
              a = new l(t, e, i, s);
          }
        } else a = new n(t, e, i, s);
        return a.effectsSequence.length && s.addDynamicProperty(a), a;
      }
    };
  }(),
      TransformPropertyFactory = function () {
    function i(t, e, r) {
      if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), e.r) this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this);else if (e.rx) {
        if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
          var i,
              s = e.or.k.length;

          for (i = 0; i < s; i += 1) {
            e.or.k[i].to = e.or.k[i].ti = null;
          }
        }

        this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0;
      }
      e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), e.a && (this.a = PropertyFactory.getProp(t, e.a, 1, 0, this)), e.s && (this.s = PropertyFactory.getProp(t, e.s, 1, .01, this)), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
        _mdf: !1,
        v: 1
      }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
    }

    return i.prototype = {
      applyToMatrix: function applyToMatrix(t) {
        var e = this._mdf;
        this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
      },
      getValue: function getValue(t) {
        if (this.elem.globalData.frameId !== this.frameId) {
          if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || t) {
            if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
              var e,
                  r,
                  i = this.elem.globalData.frameRate;
              if (this.p && this.p.keyframes && this.p.getValueAtTime) r = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / i, 0), this.p.getValueAtTime(this.p.keyframes[0].t / i, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i, 0), this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / i, 0)) : (e = this.p.pv, this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / i, this.p.offsetTime));else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                e = [], r = [];
                var s = this.px,
                    a = this.py;
                s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (e[0] = s.getValueAtTime((s.keyframes[0].t + .01) / i, 0), e[1] = a.getValueAtTime((a.keyframes[0].t + .01) / i, 0), r[0] = s.getValueAtTime(s.keyframes[0].t / i, 0), r[1] = a.getValueAtTime(a.keyframes[0].t / i, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (e[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / i, 0), e[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / i, 0), r[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / i, 0), r[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / i, 0)) : (e = [s.pv, a.pv], r[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / i, s.offsetTime), r[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / i, a.offsetTime));
              }
              this.v.rotate(-Math.atan2(e[1] - r[1], e[0] - r[0]));
            }

            this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
          }

          this.frameId = this.elem.globalData.frameId;
        }
      },
      precalculateMatrix: function precalculateMatrix() {
        if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
          if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
            if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
            this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
          }

          if (this.r) {
            if (this.r.effectsSequence.length) return;
            this.pre.rotate(-this.r.v), this.appliedTransformations = 4;
          } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
        }
      },
      autoOrient: function autoOrient() {}
    }, extendPrototype([DynamicPropertyContainer], i), i.prototype.addDynamicProperty = function (t) {
      this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0;
    }, i.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
      getTransformProperty: function getTransformProperty(t, e, r) {
        return new i(t, e, r);
      }
    };
  }();

  function ShapePath() {
    this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
  }

  ShapePath.prototype.setPathData = function (t, e) {
    this.c = t, this.setLength(e);

    for (var r = 0; r < e;) {
      this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1;
    }
  }, ShapePath.prototype.setLength = function (t) {
    for (; this._maxLength < t;) {
      this.doubleArrayLength();
    }

    this._length = t;
  }, ShapePath.prototype.doubleArrayLength = function () {
    this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
  }, ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
    var a;

    switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
      case "v":
        a = this.v;
        break;

      case "i":
        a = this.i;
        break;

      case "o":
        a = this.o;
    }

    (!a[i] || a[i] && !s) && (a[i] = point_pool.newElement()), a[i][0] = t, a[i][1] = e;
  }, ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
    this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o);
  }, ShapePath.prototype.reverse = function () {
    var t = new ShapePath();
    t.setPathData(this.c, this._length);
    var e = this.v,
        r = this.o,
        i = this.i,
        s = 0;
    this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
    var a,
        n = this._length - 1,
        o = this._length;

    for (a = s; a < o; a += 1) {
      t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;
    }

    return t;
  };

  var ShapePropertyFactory = function () {
    var s = -999999;

    function t(t, e, r) {
      var i,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f = r.lastIndex,
          c = this.keyframes;
      if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, f = 0;else if (t >= c[c.length - 1].t - this.offsetTime) i = 1 === c[c.length - 2].h ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;else {
        for (var d, u, y = f, g = c.length - 1, v = !0; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t));) {
          y < g - 1 ? y += 1 : v = !1;
        }

        if (f = y, !(a = 1 === d.h)) {
          if (t >= u.t - this.offsetTime) p = 1;else if (t < d.t - this.offsetTime) p = 0;else {
            var b;
            d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)));
          }
          s = d.e[0];
        }

        i = d.s[0];
      }

      for (h = e._length, l = i.i[0].length, r.lastIndex = f, n = 0; n < h; n += 1) {
        for (o = 0; o < l; o += 1) {
          m = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = m, m = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = m, m = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = m;
        }
      }
    }

    function a() {
      this.paths = this.localShapeCollection;
    }

    function e(t) {
      (function (t, e) {
        if (t._length !== e._length || t.c !== e.c) return !1;
        var r,
            i = t._length;

        for (r = 0; r < i; r += 1) {
          if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
        }

        return !0;
      })(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
    }

    function r() {
      if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);else {
        this.lock = !0, this._mdf = !1;
        var t,
            e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
            r = this.effectsSequence.length;

        for (t = 0; t < r; t += 1) {
          e = this.effectsSequence[t](e);
        }

        this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId;
      }
    }

    function n(t, e, r) {
      this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
      var i = 3 === r ? e.pt.k : e.ks.k;
      this.v = shape_pool.clone(i), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = a, this.effectsSequence = [];
    }

    function i(t) {
      this.effectsSequence.push(t), this.container.addDynamicProperty(this);
    }

    function o(t, e, r) {
      this.propType = "shape", this.comp = t.comp, this.elem = t, this.container = t, this.offsetTime = t.data.st, this.keyframes = 3 === r ? e.pt.k : e.ks.k, this.k = !0, this.kf = !0;
      var i = this.keyframes[0].s[0].i.length;
      this.keyframes[0].s[0].i[0].length;
      this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, i), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = s, this.reset = a, this._caching = {
        lastFrame: s,
        lastIndex: 0
      }, this.effectsSequence = [function () {
        var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
            i = this._caching.lastFrame;
        return i !== s && (i < e && t < e || r < i && r < t) || (this._caching.lastIndex = i < t ? this._caching.lastIndex : 0, this.interpolateShape(t, this.pv, this._caching)), this._caching.lastFrame = t, this.pv;
      }.bind(this)];
    }

    n.prototype.interpolateShape = t, n.prototype.getValue = r, n.prototype.setVValue = e, n.prototype.addEffect = i, o.prototype.getValue = r, o.prototype.interpolateShape = t, o.prototype.setVValue = e, o.prototype.addEffect = i;

    var h = function () {
      var n = roundCorner;

      function t(t, e) {
        this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
      }

      return t.prototype = {
        reset: a,
        getValue: function getValue() {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
        },
        convertEllToPath: function convertEllToPath() {
          var t = this.p.v[0],
              e = this.p.v[1],
              r = this.s.v[0] / 2,
              i = this.s.v[1] / 2,
              s = 3 !== this.d,
              a = this.v;
          a.v[0][0] = t, a.v[0][1] = e - i, a.v[1][0] = s ? t + r : t - r, a.v[1][1] = e, a.v[2][0] = t, a.v[2][1] = e + i, a.v[3][0] = s ? t - r : t + r, a.v[3][1] = e, a.i[0][0] = s ? t - r * n : t + r * n, a.i[0][1] = e - i, a.i[1][0] = s ? t + r : t - r, a.i[1][1] = e - i * n, a.i[2][0] = s ? t + r * n : t - r * n, a.i[2][1] = e + i, a.i[3][0] = s ? t - r : t + r, a.i[3][1] = e + i * n, a.o[0][0] = s ? t + r * n : t - r * n, a.o[0][1] = e - i, a.o[1][0] = s ? t + r : t - r, a.o[1][1] = e + i * n, a.o[2][0] = s ? t - r * n : t + r * n, a.o[2][1] = e + i, a.o[3][0] = s ? t - r : t + r, a.o[3][1] = e - i * n;
        }
      }, extendPrototype([DynamicPropertyContainer], t), t;
    }(),
        l = function () {
      function t(t, e) {
        this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
      }

      return t.prototype = {
        reset: a,
        getValue: function getValue() {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
        },
        convertStarToPath: function convertStarToPath() {
          var t,
              e,
              r,
              i,
              s = 2 * Math.floor(this.pt.v),
              a = 2 * Math.PI / s,
              n = !0,
              o = this.or.v,
              h = this.ir.v,
              l = this.os.v,
              p = this.is.v,
              m = 2 * Math.PI * o / (2 * s),
              f = 2 * Math.PI * h / (2 * s),
              c = -Math.PI / 2;
          c += this.r.v;
          var d = 3 === this.data.d ? -1 : 1;

          for (t = this.v._length = 0; t < s; t += 1) {
            r = n ? l : p, i = n ? m : f;
            var u = (e = n ? o : h) * Math.cos(c),
                y = e * Math.sin(c),
                g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
            u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d;
          }
        },
        convertPolygonToPath: function convertPolygonToPath() {
          var t,
              e = Math.floor(this.pt.v),
              r = 2 * Math.PI / e,
              i = this.or.v,
              s = this.os.v,
              a = 2 * Math.PI * i / (4 * e),
              n = -Math.PI / 2,
              o = 3 === this.data.d ? -1 : 1;

          for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
            var h = i * Math.cos(n),
                l = i * Math.sin(n),
                p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                m = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
            h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - m * a * s * o, h + p * a * s * o, l + m * a * s * o, t, !0), n += r * o;
          }

          this.paths.length = 0, this.paths[0] = this.v;
        }
      }, extendPrototype([DynamicPropertyContainer], t), t;
    }(),
        p = function () {
      function t(t, e) {
        this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
      }

      return t.prototype = {
        convertRectToPath: function convertRectToPath() {
          var t = this.p.v[0],
              e = this.p.v[1],
              r = this.s.v[0] / 2,
              i = this.s.v[1] / 2,
              s = bm_min(r, i, this.r.v),
              a = s * (1 - roundCorner);
          this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)));
        },
        getValue: function getValue(t) {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
        },
        reset: a
      }, extendPrototype([DynamicPropertyContainer], t), t;
    }();

    var m = {
      getShapeProp: function getShapeProp(t, e, r) {
        var i;

        if (3 === r || 4 === r) {
          var s = 3 === r ? e.pt : e.ks,
              a = s.k;
          i = 1 === s.a || a.length ? new o(t, e, r) : new n(t, e, r);
        } else 5 === r ? i = new p(t, e) : 6 === r ? i = new h(t, e) : 7 === r && (i = new l(t, e));

        return i.k && t.addDynamicProperty(i), i;
      },
      getConstructorFunction: function getConstructorFunction() {
        return n;
      },
      getKeyframedConstructorFunction: function getKeyframedConstructorFunction() {
        return o;
      }
    };
    return m;
  }(),
      ShapeModifiers = (Tr = {}, Ur = {}, Tr.registerModifier = function (t, e) {
    Ur[t] || (Ur[t] = e);
  }, Tr.getModifier = function (t, e, r) {
    return new Ur[t](e, r);
  }, Tr),
      Tr,
      Ur;

  function ShapeModifier() {}

  function TrimModifier() {}

  function RoundCornersModifier() {}

  function RepeaterModifier() {}

  function ShapeCollection() {
    this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
  }

  function DashProperty(t, e, r, i) {
    this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
    var s,
        a,
        n = e.length || 0;

    for (s = 0; s < n; s += 1) {
      a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
        n: e[s].n,
        p: a
      };
    }

    this.k || this.getValue(!0), this._isAnimated = this.k;
  }

  function GradientProperty(t, e, r) {
    this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
    var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
    this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
  }

  ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
    if (!this.closed) {
      var e = {
        shape: t.sh,
        data: t,
        localShapeCollection: shapeCollection_pool.newShapeCollection()
      };
      this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
    }
  }, ShapeModifier.prototype.init = function (t, e) {
    this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
  }, ShapeModifier.prototype.processKeys = function () {
    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
  }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
    this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
  }, TrimModifier.prototype.addShapeToModifier = function (t) {
    t.pathsData = [];
  }, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
    var a = [];
    e <= 1 ? a.push({
      s: t,
      e: e
    }) : 1 <= t ? a.push({
      s: t - 1,
      e: e - 1
    }) : (a.push({
      s: t,
      e: 1
    }), a.push({
      s: 0,
      e: e - 1
    }));
    var n,
        o,
        h = [],
        l = a.length;

    for (n = 0; n < l; n += 1) {
      var p, m;
      if ((o = a[n]).e * s < i || o.s * s > i + r) ;else p = o.s * s <= i ? 0 : (o.s * s - i) / r, m = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, m]);
    }

    return h.length || h.push([0, 0]), h;
  }, TrimModifier.prototype.releasePathsData = function (t) {
    var e,
        r = t.length;

    for (e = 0; e < r; e += 1) {
      segments_length_pool.release(t[e]);
    }

    return t.length = 0, t;
  }, TrimModifier.prototype.processShapes = function (t) {
    var e, r, i;

    if (this._mdf || t) {
      var s = this.o.v % 360 / 360;

      if (s < 0 && (s += 1), e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + s, (r = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + s) < e) {
        var a = e;
        e = r, r = a;
      }

      e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r;
    } else e = this.sValue, r = this.eValue;

    var n,
        o,
        h,
        l,
        p,
        m,
        f = this.shapes.length,
        c = 0;
    if (r === e) for (n = 0; n < f; n += 1) {
      this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
    } else if (1 === r && 0 === e || 0 === r && 1 === e) {
      if (this._mdf) for (n = 0; n < f; n += 1) {
        this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0;
      }
    } else {
      var d,
          u,
          y = [];

      for (n = 0; n < f; n += 1) {
        if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
          if (h = (i = d.shape.paths)._length, m = 0, !d.shape._mdf && d.pathsData.length) m = d.totalShapeLength;else {
            for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) {
              p = bez.getSegmentsLength(i.shapes[o]), l.push(p), m += p.totalLength;
            }

            d.totalShapeLength = m, d.pathsData = l;
          }
          c += m, d.shape._mdf = !0;
        } else d.shape.paths = d.localShapeCollection;
      }

      var g,
          v = e,
          b = r,
          E = 0;

      for (n = f - 1; 0 <= n; n -= 1) {
        if ((d = this.shapes[n]).shape._mdf) {
          for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && 1 < f ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, E, c), E += d.totalShapeLength) : g = [[v, b]], h = g.length, o = 0; o < h; o += 1) {
            v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
              s: d.totalShapeLength * v,
              e: d.totalShapeLength * b
            }) : 1 <= v ? y.push({
              s: d.totalShapeLength * (v - 1),
              e: d.totalShapeLength * (b - 1)
            }) : (y.push({
              s: d.totalShapeLength * v,
              e: d.totalShapeLength
            }), y.push({
              s: 0,
              e: d.totalShapeLength * (b - 1)
            }));
            var x = this.addShapes(d, y[0]);

            if (y[0].s !== y[0].e) {
              if (1 < y.length) if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                var P = x.pop();
                this.addPaths(x, u), x = this.addShapes(d, y[1], P);
              } else this.addPaths(x, u), x = this.addShapes(d, y[1]);
              this.addPaths(x, u);
            }
          }

          d.shape.paths = u;
        }
      }
    }
  }, TrimModifier.prototype.addPaths = function (t, e) {
    var r,
        i = t.length;

    for (r = 0; r < i; r += 1) {
      e.addShape(t[r]);
    }
  }, TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
    s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1);
  }, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
    e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1);
  }, TrimModifier.prototype.addShapes = function (t, e, r) {
    var i,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m = t.pathsData,
        f = t.shape.paths.shapes,
        c = t.shape.paths._length,
        d = 0,
        u = [],
        y = !0;

    for (p = r ? (o = r._length, r._length) : (r = shape_pool.newElement(), o = 0), u.push(r), i = 0; i < c; i += 1) {
      for (h = m[i].lengths, r.c = f[i].c, a = f[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1) {
        if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;else {
          if (d > e.e) {
            r.c = !1;
            break;
          }

          e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(f[i].v[s - 1], f[i].o[s - 1], f[i].i[s], f[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[s - 1], f[i].v[s], f[i].o[s - 1], f[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1;
        }
      }

      if (f[i].c && h.length) {
        if (n = h[s - 1], d <= e.e) {
          var g = h[s - 1].addedLength;
          e.s <= d && e.e >= d + g ? (this.addSegment(f[i].v[s - 1], f[i].o[s - 1], f[i].i[0], f[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[s - 1], f[i].v[0], f[i].o[s - 1], f[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1);
        } else r.c = !1;

        d += n.addedLength, o += 1;
      }

      if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
      i < c - 1 && (r = shape_pool.newElement(), y = !0, u.push(r), o = 0);
    }

    return u;
  }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
  }, RoundCornersModifier.prototype.processPath = function (t, e) {
    var r = shape_pool.newElement();
    r.c = t.c;
    var i,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m,
        f,
        c,
        d,
        u,
        y = t._length,
        g = 0;

    for (i = 0; i < y; i += 1) {
      s = t.v[i], n = t.o[i], a = t.i[i], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== i && i !== y - 1 || t.c ? (o = 0 === i ? t.v[y - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, m = u = s[1] - (s[1] - o[1]) * l, f = p - (p - s[0]) * roundCorner, c = m - (m - s[1]) * roundCorner, r.setTripleAt(p, m, f, c, d, u, g), g += 1, o = i === y - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = f = s[0] + (o[0] - s[0]) * l, m = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = m - (m - s[1]) * roundCorner, r.setTripleAt(p, m, f, c, d, u, g)) : r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g) : r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), g += 1;
    }

    return r;
  }, RoundCornersModifier.prototype.processShapes = function (t) {
    var e,
        r,
        i,
        s,
        a,
        n,
        o = this.shapes.length,
        h = this.rd.v;
    if (0 !== h) for (r = 0; r < o; r += 1) {
      if ((a = this.shapes[r]).shape.paths, n = a.localShapeCollection, a.shape._mdf || this._mdf || t) for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) {
        n.addShape(this.processPath(e[i], h));
      }
      a.shape.paths = a.localShapeCollection;
    }
    this.dynamicProperties.length || (this._mdf = !1);
  }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
  }, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
    var n = a ? -1 : 1,
        o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
        h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
    t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
  }, RepeaterModifier.prototype.init = function (t, e, r, i) {
    this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);

    for (; 0 < r;) {
      r -= 1, this._elements.unshift(e[r]), 1;
    }

    this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
  }, RepeaterModifier.prototype.resetElements = function (t) {
    var e,
        r = t.length;

    for (e = 0; e < r; e += 1) {
      t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it);
    }
  }, RepeaterModifier.prototype.cloneElements = function (t) {
    t.length;
    var e = JSON.parse(JSON.stringify(t));
    return this.resetElements(e), e;
  }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
    var r,
        i = t.length;

    for (r = 0; r < i; r += 1) {
      t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e);
    }
  }, RepeaterModifier.prototype.processShapes = function (t) {
    var e, r, i, s, a;

    if (this._mdf || t) {
      var n,
          o = Math.ceil(this.c.v);

      if (this._groups.length < o) {
        for (; this._groups.length < o;) {
          var h = {
            it: this.cloneElements(this._elements),
            ty: "gr"
          };
          h.it.push({
            a: {
              a: 0,
              ix: 1,
              k: [0, 0]
            },
            nm: "Transform",
            o: {
              a: 0,
              ix: 7,
              k: 100
            },
            p: {
              a: 0,
              ix: 2,
              k: [0, 0]
            },
            r: {
              a: 1,
              ix: 6,
              k: [{
                s: 0,
                e: 0,
                t: 0
              }, {
                s: 0,
                e: 0,
                t: 1
              }]
            },
            s: {
              a: 0,
              ix: 3,
              k: [100, 100]
            },
            sa: {
              a: 0,
              ix: 5,
              k: 0
            },
            sk: {
              a: 0,
              ix: 4,
              k: 0
            },
            ty: "tr"
          }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1;
        }

        this.elem.reloadShapes();
      }

      for (i = a = 0; i <= this._groups.length - 1; i += 1) {
        n = a < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), a += 1;
      }

      this._currentCopies = o;
      var l = this.o.v,
          p = l % 1,
          m = 0 < l ? Math.floor(l) : Math.ceil(l),
          f = (this.tr.v.props, this.pMatrix.props),
          c = this.rMatrix.props,
          d = this.sMatrix.props;
      this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
      var u,
          y,
          g = 0;

      if (0 < l) {
        for (; g < m;) {
          this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
        }

        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p);
      } else if (l < 0) {
        for (; m < g;) {
          this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
        }

        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p);
      }

      for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
        if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
          for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), u = 0; u < y; u += 1) {
            r[u] = this.matrix.props[u];
          }

          this.matrix.reset();
        } else for (this.matrix.reset(), u = 0; u < y; u += 1) {
          r[u] = this.matrix.props[u];
        }

        g += 1, a -= 1, i += s;
      }
    } else for (a = this._currentCopies, i = 0, s = 1; a;) {
      r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s;
    }
  }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
    this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
  }, ShapeCollection.prototype.releaseShapes = function () {
    var t;

    for (t = 0; t < this._length; t += 1) {
      shape_pool.release(this.shapes[t]);
    }

    this._length = 0;
  }, DashProperty.prototype.getValue = function (t) {
    if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
      var e = 0,
          r = this.dataProps.length;

      for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) {
        "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
      }
    }
  }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
    for (var r = 0, i = this.o.length / 2; r < i;) {
      if (.01 < Math.abs(t[4 * r] - t[4 * e + 2 * r])) return !1;
      r += 1;
    }

    return !0;
  }, GradientProperty.prototype.checkCollapsable = function () {
    if (this.o.length / 2 != this.c.length / 4) return !1;
    if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
      if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
      t += 1;
    } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
    return !0;
  }, GradientProperty.prototype.getValue = function (t) {
    if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
      var e,
          r,
          i,
          s = 4 * this.data.p;

      for (e = 0; e < s; e += 1) {
        r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
      }

      if (this.o.length) for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) {
        r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
      }
      this._mdf = !t;
    }
  }, extendPrototype([DynamicPropertyContainer], GradientProperty);

  var buildShapeString = function buildShapeString(t, e, r, i) {
    if (0 === e) return "";
    var s,
        a = t.o,
        n = t.i,
        o = t.v,
        h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);

    for (s = 1; s < e; s += 1) {
      h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);
    }

    return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h;
  },
      ImagePreloader = function () {
    var s = function () {
      var t = createTag("canvas");
      t.width = 1, t.height = 1;
      var e = t.getContext("2d");
      return e.fillStyle = "#FF0000", e.fillRect(0, 0, 1, 1), t;
    }();

    function t() {
      this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
    }

    function e(t) {
      var e = function (t, e, r) {
        var i = "";
        if (t.e) i = t.p;else if (e) {
          var s = t.p;
          -1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s;
        } else i = r, i += t.u ? t.u : "", i += t.p;
        return i;
      }(t, this.assetsPath, this.path),
          r = createTag("img");

      r.crossOrigin = "anonymous", r.addEventListener("load", this._imageLoaded.bind(this), !1), r.addEventListener("error", function () {
        i.img = s, this._imageLoaded();
      }.bind(this), !1), r.src = e;
      var i = {
        img: r,
        assetData: t
      };
      return i;
    }

    function r(t, e) {
      this.imagesLoadedCb = e;
      var r,
          i = t.length;

      for (r = 0; r < i; r += 1) {
        t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])));
      }
    }

    function i(t) {
      this.path = t || "";
    }

    function a(t) {
      this.assetsPath = t || "";
    }

    function n(t) {
      for (var e = 0, r = this.images.length; e < r;) {
        if (this.images[e].assetData === t) return this.images[e].img;
        e += 1;
      }
    }

    function o() {
      this.imagesLoadedCb = null, this.images.length = 0;
    }

    function h() {
      return this.totalImages === this.loadedAssets;
    }

    return function () {
      this.loadAssets = r, this.setAssetsPath = a, this.setPath = i, this.loaded = h, this.destroy = o, this.getImage = n, this._createImageData = e, this._imageLoaded = t, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
    };
  }(),
      featureSupport = (lw = {
    maskType: !0
  }, (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (lw.maskType = !1), lw),
      lw,
      filtersFactory = (mw = {}, mw.createFilter = function (t) {
    var e = createNS("filter");
    return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
  }, mw.createAlphaToLuminanceFilter = function () {
    var t = createNS("feColorMatrix");
    return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
  }, mw),
      mw,
      assetLoader = function () {
    function a(t) {
      return t.response && "object" == _typeof(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0;
    }

    return {
      load: function load(t, e, r) {
        var i,
            s = new XMLHttpRequest();
        s.open("GET", t, !0), s.responseType = "json", s.send(), s.onreadystatechange = function () {
          if (4 == s.readyState) if (200 == s.status) i = a(s), e(i);else try {
            i = a(s), e(i);
          } catch (t) {
            r && r(t);
          }
        };
      }
    };
  }();

  function TextAnimatorProperty(t, e, r) {
    this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
      alignment: {}
    }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r);
  }

  function TextAnimatorDataProperty(t, e, r) {
    var i = {
      propType: !1
    },
        s = PropertyFactory.getProp,
        a = e.a;
    this.a = {
      r: a.r ? s(t, a.r, 0, degToRads, r) : i,
      rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
      ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
      sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
      sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
      s: a.s ? s(t, a.s, 1, .01, r) : i,
      a: a.a ? s(t, a.a, 1, 0, r) : i,
      o: a.o ? s(t, a.o, 0, .01, r) : i,
      p: a.p ? s(t, a.p, 1, 0, r) : i,
      sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
      sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
      fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
      fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
      fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
      fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
      t: a.t ? s(t, a.t, 0, 0, r) : i
    }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t;
  }

  function LetterProps(t, e, r, i, s, a) {
    this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
      o: !0,
      sw: !!e,
      sc: !!r,
      fc: !!i,
      m: !0,
      p: !0
    };
  }

  function TextProperty(t, e) {
    this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
      ascent: 0,
      boxWidth: this.defaultBoxWidth,
      f: "",
      fStyle: "",
      fWeight: "",
      fc: "",
      j: "",
      justifyOffset: "",
      l: [],
      lh: 0,
      lineWidths: [],
      ls: "",
      of: "",
      s: "",
      sc: "",
      sw: 0,
      t: 0,
      tr: 0,
      sz: 0,
      ps: null,
      fillColorAnim: !1,
      strokeColorAnim: !1,
      strokeWidthAnim: !1,
      yOffset: 0,
      finalSize: 0,
      finalText: [],
      finalLineHeight: 0,
      __complete: !1
    }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
  }

  TextAnimatorProperty.prototype.searchProperties = function () {
    var t,
        e,
        r = this._textData.a.length,
        i = PropertyFactory.getProp;

    for (t = 0; t < r; t += 1) {
      e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
    }

    this._textData.p && "m" in this._textData.p ? (this._pathData = {
      f: i(this._elem, this._textData.p.f, 0, 0, this),
      l: i(this._elem, this._textData.p.l, 0, 0, this),
      r: this._textData.p.r,
      m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
    }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this);
  }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
    if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
      this._isFirstFrame = !1;
      var r,
          i,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f,
          c,
          d,
          u,
          y,
          g,
          v,
          b,
          E,
          x = this._moreOptions.alignment.v,
          P = this._animatorsData,
          S = this._textData,
          _ = this.mHelper,
          C = this._renderType,
          A = this.renderedLetters.length,
          T = (this.data, t.l);

      if (this._hasMaskedPath) {
        if (E = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
          var D,
              k = E.v;

          for (this._pathData.r && (k = k.reverse()), n = {
            tLength: 0,
            segments: []
          }, a = k._length - 1, s = g = 0; s < a; s += 1) {
            D = {
              s: k.v[s],
              e: k.v[s + 1],
              to: [k.o[s][0] - k.v[s][0], k.o[s][1] - k.v[s][1]],
              ti: [k.i[s + 1][0] - k.v[s + 1][0], k.i[s + 1][1] - k.v[s + 1][1]]
            }, bez.buildBezierData(D), n.tLength += D.bezierData.segmentLength, n.segments.push(D), g += D.bezierData.segmentLength;
          }

          s = a, E.v.c && (D = {
            s: k.v[s],
            e: k.v[0],
            to: [k.o[s][0] - k.v[s][0], k.o[s][1] - k.v[s][1]],
            ti: [k.i[0][0] - k.v[0][0], k.i[0][1] - k.v[0][1]]
          }, bez.buildBezierData(D), n.tLength += D.bezierData.segmentLength, n.segments.push(D), g += D.bezierData.segmentLength), this._pathData.pi = n;
        }

        if (n = this._pathData.pi, o = this._pathData.f.v, m = 1, p = !(l = f = 0), u = n.segments, o < 0 && E.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), m = (d = u[f = u.length - 1].bezierData.points).length - 1; o < 0;) {
          o += d[m].partialLength, (m -= 1) < 0 && (m = (d = u[f -= 1].bezierData.points).length - 1);
        }
        c = (d = u[f].bezierData.points)[m - 1], y = (h = d[m]).partialLength;
      }

      a = T.length, i = r = 0;
      var M,
          w,
          F,
          I,
          V = 1.2 * t.finalSize * .714,
          R = !0;
      F = P.length;
      var B,
          L,
          G,
          z,
          N,
          O,
          H,
          j,
          q,
          W,
          Y,
          X,
          J,
          U = -1,
          $ = o,
          K = f,
          Z = m,
          Q = -1,
          tt = "",
          et = this.defaultPropsArray;

      if (2 === t.j || 1 === t.j) {
        var rt = 0,
            it = 0,
            st = 2 === t.j ? -.5 : -1,
            at = 0,
            nt = !0;

        for (s = 0; s < a; s += 1) {
          if (T[s].n) {
            for (rt && (rt += it); at < s;) {
              T[at].animatorJustifyOffset = rt, at += 1;
            }

            nt = !(rt = 0);
          } else {
            for (w = 0; w < F; w += 1) {
              (M = P[w].a).t.propType && (nt && 2 === t.j && (it += M.t.v * st), (B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? rt += M.t.v * B[0] * st : rt += M.t.v * B * st);
            }

            nt = !1;
          }
        }

        for (rt && (rt += it); at < s;) {
          T[at].animatorJustifyOffset = rt, at += 1;
        }
      }

      for (s = 0; s < a; s += 1) {
        if (_.reset(), N = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = $, R = !1, 0, this._hasMaskedPath && (m = Z, c = (d = u[f = K].bezierData.points)[m - 1], y = (h = d[m]).partialLength, l = 0), J = W = X = tt = "", et = this.defaultPropsArray;else {
          if (this._hasMaskedPath) {
            if (Q !== T[s].line) {
              switch (t.j) {
                case 1:
                  o += g - t.lineWidths[T[s].line];
                  break;

                case 2:
                  o += (g - t.lineWidths[T[s].line]) / 2;
              }

              Q = T[s].line;
            }

            U !== T[s].ind && (T[U] && (o += T[U].extra), o += T[s].an / 2, U = T[s].ind), o += x[0] * T[s].an / 200;
            var ot = 0;

            for (w = 0; w < F; w += 1) {
              (M = P[w].a).p.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? ot += M.p.v[0] * B[0] : ot += M.p.v[0] * B), M.a.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? ot += M.a.v[0] * B[0] : ot += M.a.v[0] * B);
            }

            for (p = !0; p;) {
              o + ot <= l + y || !d ? (v = (o + ot - l) / h.partialLength, G = c.point[0] + (h.point[0] - c.point[0]) * v, z = c.point[1] + (h.point[1] - c.point[1]) * v, _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100), p = !1) : d && (l += h.partialLength, (m += 1) >= d.length && (m = 0, d = u[f += 1] ? u[f].bezierData.points : E.v.c ? u[f = m = 0].bezierData.points : (l -= h.partialLength, null)), d && (c = h, y = (h = d[m]).partialLength));
            }

            L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0);
          } else L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0), _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100, 0);

          for (T[s].l / 2, w = 0; w < F; w += 1) {
            (M = P[w].a).t.propType && (B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? B.length ? o += M.t.v * B[0] : o += M.t.v * B : B.length ? r += M.t.v * B[0] : r += M.t.v * B));
          }

          for (T[s].l / 2, t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), w = 0; w < F; w += 1) {
            (M = P[w].a).a.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? _.translate(-M.a.v[0] * B[0], -M.a.v[1] * B[1], M.a.v[2] * B[2]) : _.translate(-M.a.v[0] * B, -M.a.v[1] * B, M.a.v[2] * B));
          }

          for (w = 0; w < F; w += 1) {
            (M = P[w].a).s.propType && ((B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars)).length ? _.scale(1 + (M.s.v[0] - 1) * B[0], 1 + (M.s.v[1] - 1) * B[1], 1) : _.scale(1 + (M.s.v[0] - 1) * B, 1 + (M.s.v[1] - 1) * B, 1));
          }

          for (w = 0; w < F; w += 1) {
            if (M = P[w].a, B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars), M.sk.propType && (B.length ? _.skewFromAxis(-M.sk.v * B[0], M.sa.v * B[1]) : _.skewFromAxis(-M.sk.v * B, M.sa.v * B)), M.r.propType && (B.length ? _.rotateZ(-M.r.v * B[2]) : _.rotateZ(-M.r.v * B)), M.ry.propType && (B.length ? _.rotateY(M.ry.v * B[1]) : _.rotateY(M.ry.v * B)), M.rx.propType && (B.length ? _.rotateX(M.rx.v * B[0]) : _.rotateX(M.rx.v * B)), M.o.propType && (B.length ? N += (M.o.v * B[0] - N) * B[0] : N += (M.o.v * B - N) * B), t.strokeWidthAnim && M.sw.propType && (B.length ? H += M.sw.v * B[0] : H += M.sw.v * B), t.strokeColorAnim && M.sc.propType) for (q = 0; q < 3; q += 1) {
              B.length ? O[q] = O[q] + (M.sc.v[q] - O[q]) * B[0] : O[q] = O[q] + (M.sc.v[q] - O[q]) * B;
            }

            if (t.fillColorAnim && t.fc) {
              if (M.fc.propType) for (q = 0; q < 3; q += 1) {
                B.length ? j[q] = j[q] + (M.fc.v[q] - j[q]) * B[0] : j[q] = j[q] + (M.fc.v[q] - j[q]) * B;
              }
              M.fh.propType && (j = B.length ? addHueToRGB(j, M.fh.v * B[0]) : addHueToRGB(j, M.fh.v * B)), M.fs.propType && (j = B.length ? addSaturationToRGB(j, M.fs.v * B[0]) : addSaturationToRGB(j, M.fs.v * B)), M.fb.propType && (j = B.length ? addBrightnessToRGB(j, M.fb.v * B[0]) : addBrightnessToRGB(j, M.fb.v * B));
            }
          }

          for (w = 0; w < F; w += 1) {
            (M = P[w].a).p.propType && (B = P[w].s.getMult(T[s].anIndexes[w], S.a[w].s.totalChars), this._hasMaskedPath ? B.length ? _.translate(0, M.p.v[1] * B[0], -M.p.v[2] * B[1]) : _.translate(0, M.p.v[1] * B, -M.p.v[2] * B) : B.length ? _.translate(M.p.v[0] * B[0], M.p.v[1] * B[1], -M.p.v[2] * B[2]) : _.translate(M.p.v[0] * B, M.p.v[1] * B, -M.p.v[2] * B));
          }

          if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
            if (_.translate(0, -t.ls), _.translate(0, x[1] * V / 100 + i, 0), S.p.p) {
              b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
              var ht = 180 * Math.atan(b) / Math.PI;
              h.point[0] < c.point[0] && (ht += 180), _.rotate(-ht * Math.PI / 180);
            }

            _.translate(G, z, 0), o -= x[0] * T[s].an / 200, T[s + 1] && U !== T[s + 1].ind && (o += T[s].an / 2, o += t.tr / 1e3 * t.finalSize);
          } else {
            switch (_.translate(r, i, 0), t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
              case 1:
                _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);

                break;

              case 2:
                _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0);

            }

            _.translate(0, -t.ls), _.translate(L, 0, 0), _.translate(x[0] * T[s].an / 200, x[1] * V / 100, 0), r += T[s].l + t.tr / 1e3 * t.finalSize;
          }

          "html" === C ? tt = _.toCSS() : "svg" === C ? tt = _.to2dCSS() : et = [_.props[0], _.props[1], _.props[2], _.props[3], _.props[4], _.props[5], _.props[6], _.props[7], _.props[8], _.props[9], _.props[10], _.props[11], _.props[12], _.props[13], _.props[14], _.props[15]], J = N;
        }
        this.lettersChangedFlag = A <= s ? (I = new LetterProps(J, W, Y, X, tt, et), this.renderedLetters.push(I), A += 1, !0) : (I = this.renderedLetters[s]).update(J, W, Y, X, tt, et) || this.lettersChangedFlag;
      }
    }
  }, TextAnimatorProperty.prototype.getValue = function () {
    this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
  }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, s, a) {
    this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1;
    var n = this._mdf.p = !1;
    return this.o !== t && (this.o = t, n = this._mdf.o = !0), this.sw !== e && (this.sw = e, n = this._mdf.sw = !0), this.sc !== r && (this.sc = r, n = this._mdf.sc = !0), this.fc !== i && (this.fc = i, n = this._mdf.fc = !0), this.m !== s && (this.m = s, n = this._mdf.m = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, n = this._mdf.p = !0), n;
  }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
    for (var r in e) {
      e.hasOwnProperty(r) && (t[r] = e[r]);
    }

    return t;
  }, TextProperty.prototype.setCurrentData = function (t) {
    t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
  }, TextProperty.prototype.searchProperty = function () {
    return this.searchKeyframes();
  }, TextProperty.prototype.searchKeyframes = function () {
    return this.kf = 1 < this.data.d.k.length, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
  }, TextProperty.prototype.addEffect = function (t) {
    this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
  }, TextProperty.prototype.getValue = function (t) {
    if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
      this.currentData.t = this.data.d.k[this.keysIndex].s.t;
      var e = this.currentData,
          r = this.keysIndex;
      if (this.lock) this.setCurrentData(this.currentData);else {
        this.lock = !0, this._mdf = !1;
        var i,
            s = this.effectsSequence.length,
            a = t || this.data.d.k[this.keysIndex].s;

        for (i = 0; i < s; i += 1) {
          a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
        }

        e !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId;
      }
    }
  }, TextProperty.prototype.getKeyframeValue = function () {
    for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) {
      r += 1;
    }

    return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
  }, TextProperty.prototype.buildFinalText = function (t) {
    for (var e = FontManager.getCombinedCharacterCodes(), r = [], i = 0, s = t.length; i < s;) {
      -1 !== e.indexOf(t.charCodeAt(i)) ? r[r.length - 1] += t.charAt(i) : r.push(t.charAt(i)), i += 1;
    }

    return r;
  }, TextProperty.prototype.completeTextData = function (t) {
    t.__complete = !0;
    var e,
        r,
        i,
        s,
        a,
        n,
        o,
        h = this.elem.globalData.fontManager,
        l = this.data,
        p = [],
        m = 0,
        f = l.m.g,
        c = 0,
        d = 0,
        u = 0,
        y = [],
        g = 0,
        v = 0,
        b = h.getFontByName(t.f),
        E = 0,
        x = b.fStyle ? b.fStyle.split(" ") : [],
        P = "normal",
        S = "normal";

    for (r = x.length, e = 0; e < r; e += 1) {
      switch (x[e].toLowerCase()) {
        case "italic":
          S = "italic";
          break;

        case "bold":
          P = "700";
          break;

        case "black":
          P = "900";
          break;

        case "medium":
          P = "500";
          break;

        case "regular":
        case "normal":
          P = "400";
          break;

        case "light":
        case "thin":
          P = "200";
      }
    }

    t.fWeight = b.fWeight || P, t.fStyle = S, r = t.t.length, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), t.finalLineHeight = t.lh;

    var _,
        C = t.tr / 1e3 * t.finalSize;

    if (t.sz) for (var A, T, D = !0, k = t.sz[0], M = t.sz[1]; D;) {
      g = A = 0, r = (T = this.buildFinalText(t.t)).length, C = t.tr / 1e3 * t.finalSize;
      var w = -1;

      for (e = 0; e < r; e += 1) {
        _ = T[e].charCodeAt(0), i = !1, " " === T[e] ? w = e : 13 !== _ && 3 !== _ || (i = !(g = 0), A += t.finalLineHeight || 1.2 * t.finalSize), k < g + (E = h.chars ? (o = h.getCharData(T[e], b.fStyle, b.fFamily), i ? 0 : o.w * t.finalSize / 100) : h.measureText(T[e], t.f, t.finalSize)) && " " !== T[e] ? (-1 === w ? r += 1 : e = w, A += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, w === e ? 1 : 0, "\r"), w = -1, g = 0) : (g += E, g += C);
      }

      A += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && M < A ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, r = t.finalText.length, D = !1);
    }
    g = -C;
    var F,
        I = E = 0;

    for (e = 0; e < r; e += 1) {
      if (i = !1, _ = (F = t.finalText[e]).charCodeAt(0), " " === F ? s = "\xa0" : 13 === _ || 3 === _ ? (I = 0, y.push(g), v = v < g ? g : v, g = -2 * C, i = !(s = ""), u += 1) : s = t.finalText[e], E = h.chars ? (o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily), i ? 0 : o.w * t.finalSize / 100) : h.measureText(s, t.f, t.finalSize), " " === F ? I += E + C : (g += E + C + I, I = 0), p.push({
        l: E,
        an: E,
        add: c,
        n: i,
        anIndexes: [],
        val: s,
        line: u,
        animatorJustifyOffset: 0
      }), 2 == f) {
        if (c += E, "" === s || "\xa0" === s || e === r - 1) {
          for ("" !== s && "\xa0" !== s || (c -= E); d <= e;) {
            p[d].an = c, p[d].ind = m, p[d].extra = E, d += 1;
          }

          m += 1, c = 0;
        }
      } else if (3 == f) {
        if (c += E, "" === s || e === r - 1) {
          for ("" === s && (c -= E); d <= e;) {
            p[d].an = c, p[d].ind = m, p[d].extra = E, d += 1;
          }

          c = 0, m += 1;
        }
      } else p[m].ind = m, p[m].extra = 0, m += 1;
    }

    if (t.l = p, v = v < g ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;else switch (t.boxWidth = v, t.j) {
      case 1:
        t.justifyOffset = -t.boxWidth;
        break;

      case 2:
        t.justifyOffset = -t.boxWidth / 2;
        break;

      default:
        t.justifyOffset = 0;
    }
    t.lineWidths = y;
    var V,
        R,
        B = l.a;
    n = B.length;
    var L,
        G,
        z = [];

    for (a = 0; a < n; a += 1) {
      for ((V = B[a]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), G = 0, L = V.s.b, e = 0; e < r; e += 1) {
        (R = p[e]).anIndexes[a] = G, (1 == L && "" !== R.val || 2 == L && "" !== R.val && "\xa0" !== R.val || 3 == L && (R.n || "\xa0" == R.val || e == r - 1) || 4 == L && (R.n || e == r - 1)) && (1 === V.s.rn && z.push(G), G += 1);
      }

      l.a[a].s.totalChars = G;
      var N,
          O = -1;
      if (1 === V.s.rn) for (e = 0; e < r; e += 1) {
        O != (R = p[e]).anIndexes[a] && (O = R.anIndexes[a], N = z.splice(Math.floor(Math.random() * z.length), 1)[0]), R.anIndexes[a] = N;
      }
    }

    t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100;
  }, TextProperty.prototype.updateDocumentData = function (t, e) {
    e = void 0 === e ? this.keysIndex : e;
    var r = this.copyData({}, this.data.d.k[e].s);
    r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this);
  }, TextProperty.prototype.recalculate = function (t) {
    var e = this.data.d.k[t].s;
    e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e);
  }, TextProperty.prototype.canResizeFont = function (t) {
    this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
  }, TextProperty.prototype.setMinimumFontSize = function (t) {
    this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
  };

  var TextSelectorProp = function () {
    var l = Math.max,
        p = Math.min,
        m = Math.floor;

    function i(t, e) {
      this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
        k: 0
      }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
        v: 100
      }, this.o = PropertyFactory.getProp(t, e.o || {
        k: 0
      }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
        k: 0
      }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
        k: 0
      }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue();
    }

    return i.prototype = {
      getMult: function getMult(t) {
        this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
        var e = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
            r = 0,
            i = this.finalS,
            s = this.finalE,
            a = this.data.sh;
        if (2 == a) r = e(r = s === i ? s <= t ? 1 : 0 : l(0, p(.5 / (s - i) + (t - i) / (s - i), 1)));else if (3 == a) r = e(r = s === i ? s <= t ? 0 : 1 : 1 - l(0, p(.5 / (s - i) + (t - i) / (s - i), 1)));else if (4 == a) s === i ? r = 0 : (r = l(0, p(.5 / (s - i) + (t - i) / (s - i), 1))) < .5 ? r *= 2 : r = 1 - 2 * (r - .5), r = e(r);else if (5 == a) {
          if (s === i) r = 0;else {
            var n = s - i,
                o = -n / 2 + (t = p(l(0, t + .5 - i), s - i)),
                h = n / 2;
            r = Math.sqrt(1 - o * o / (h * h));
          }
          r = e(r);
        } else r = 6 == a ? e(r = s === i ? 0 : (t = p(l(0, t + .5 - i), s - i), (1 + Math.cos(Math.PI + 2 * Math.PI * t / (s - i))) / 2)) : (t >= m(i) && (r = t - i < 0 ? 1 - (i - t) : l(0, p(s - t, 1))), e(r));
        return r * this.a.v;
      },
      getValue: function getValue(t) {
        this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
        var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
            r = this.o.v / e,
            i = this.s.v / e + r,
            s = this.e.v / e + r;

        if (s < i) {
          var a = i;
          i = s, s = a;
        }

        this.finalS = i, this.finalE = s;
      }
    }, extendPrototype([DynamicPropertyContainer], i), {
      getTextSelectorProp: function getTextSelectorProp(t, e, r) {
        return new i(t, e, r);
      }
    };
  }(),
      pool_factory = function pool_factory(t, e, r, i) {
    var s = 0,
        a = t,
        n = createSizedArray(a);

    function o() {
      return s ? n[s -= 1] : e();
    }

    return {
      newElement: o,
      release: function release(t) {
        s === a && (n = pooling["double"](n), a *= 2), r && r(t), n[s] = t, s += 1;
      }
    };
  },
      pooling = {
    "double": function double(t) {
      return t.concat(createSizedArray(t.length));
    }
  },
      point_pool = pool_factory(8, function () {
    return createTypedArray("float32", 2);
  }),
      shape_pool = (xA = pool_factory(4, function () {
    return new ShapePath();
  }, function (t) {
    var e,
        r = t._length;

    for (e = 0; e < r; e += 1) {
      point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
    }

    t._length = 0, t.c = !1;
  }), xA.clone = function (t) {
    var e,
        r = xA.newElement(),
        i = void 0 === t._length ? t.v.length : t._length;

    for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) {
      r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
    }

    return r;
  }, xA),
      xA,
      shapeCollection_pool = (GA = {
    newShapeCollection: function newShapeCollection() {
      var t;
      t = HA ? JA[HA -= 1] : new ShapeCollection();
      return t;
    },
    release: function release(t) {
      var e,
          r = t._length;

      for (e = 0; e < r; e += 1) {
        shape_pool.release(t.shapes[e]);
      }

      t._length = 0, HA === IA && (JA = pooling["double"](JA), IA *= 2);
      JA[HA] = t, HA += 1;
    }
  }, HA = 0, IA = 4, JA = createSizedArray(IA), GA),
      GA,
      HA,
      IA,
      JA,
      segments_length_pool = pool_factory(8, function () {
    return {
      lengths: [],
      totalLength: 0
    };
  }, function (t) {
    var e,
        r = t.lengths.length;

    for (e = 0; e < r; e += 1) {
      bezier_length_pool.release(t.lengths[e]);
    }

    t.lengths.length = 0;
  }),
      bezier_length_pool = pool_factory(8, function () {
    return {
      addedLength: 0,
      percents: createTypedArray("float32", defaultCurveSegments),
      lengths: createTypedArray("float32", defaultCurveSegments)
    };
  });

  function BaseRenderer() {}

  function SVGRenderer(t, e) {
    this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
    var r = createNS("defs");
    this.svgElement.appendChild(r);
    var i = createNS("g");
    this.svgElement.appendChild(i), this.layerElement = i, this.renderConfig = {
      preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
      imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
      progressiveLoad: e && e.progressiveLoad || !1,
      hideOnTransparent: !e || !1 !== e.hideOnTransparent,
      viewBoxOnly: e && e.viewBoxOnly || !1,
      viewBoxSize: e && e.viewBoxSize || !1,
      className: e && e.className || ""
    }, this.globalData = {
      _mdf: !1,
      frameNum: -1,
      defs: r,
      renderConfig: this.renderConfig
    }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
  }

  function CanvasRenderer(t, e) {
    this.animationItem = t, this.renderConfig = {
      clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
      context: e && e.context || null,
      progressiveLoad: e && e.progressiveLoad || !1,
      preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
      imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
      className: e && e.className || ""
    }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
      frameNum: -1,
      _mdf: !1,
      renderConfig: this.renderConfig,
      currentGlobalAlpha: -1
    }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = !1, this.rendererType = "canvas";
  }

  function HybridRenderer(t, e) {
    this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
      className: e && e.className || "",
      imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
      hideOnTransparent: !e || !1 !== e.hideOnTransparent
    }, this.globalData = {
      _mdf: !1,
      frameNum: -1,
      renderConfig: this.renderConfig
    }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
  }

  function MaskElement(t, e, r) {
    this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
    var i,
        s = this.globalData.defs,
        a = this.masksProperties ? this.masksProperties.length : 0;
    this.viewData = createSizedArray(a), this.solidPath = "";
    var n,
        o,
        h,
        l,
        p,
        m,
        f,
        c = this.masksProperties,
        d = 0,
        u = [],
        y = createElementID(),
        g = "clipPath",
        v = "clip-path";

    for (i = 0; i < a; i++) {
      if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k) && (v = g = "mask"), "s" != c[i].mode && "i" != c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != c[i].mode) {
        var b;

        if (d += 1, n.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (v = g = "mask", f = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (m = createNS("feMorphology")).setAttribute("operator", "dilate"), m.setAttribute("in", "SourceGraphic"), m.setAttribute("radius", "0"), p.appendChild(m), s.appendChild(p), n.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : f = m = null, this.storedData[i] = {
          elem: n,
          x: f,
          expan: m,
          lastPath: "",
          lastOperator: "",
          filterId: b,
          lastRadius: 0
        }, "i" == c[i].mode) {
          h = u.length;
          var E = createNS("g");

          for (o = 0; o < h; o += 1) {
            E.appendChild(u[o]);
          }

          var x = createNS("mask");
          x.setAttribute("mask-type", "alpha"), x.setAttribute("id", y + "_" + d), x.appendChild(n), s.appendChild(x), E.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(E);
        } else u.push(n);

        c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
          elem: n,
          lastPath: "",
          op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
          prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
          invRect: l
        }, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i]);
      } else this.viewData[i] = {
        op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
        prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
        elem: n,
        lastPath: ""
      }, s.appendChild(n);
    }

    for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1) {
      this.maskElement.appendChild(u[i]);
    }

    0 < d && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
  }

  function HierarchyElement() {}

  function FrameElement() {}

  function TransformElement() {}

  function RenderableElement() {}

  function RenderableDOMElement() {}

  function ProcessedElement(t, e) {
    this.elem = t, this.pos = e;
  }

  function SVGStyleData(t, e) {
    this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null;
  }

  function SVGShapeData(t, e, r) {
    this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;

    for (var i = 0, s = t.length; i < s;) {
      if (t[i].mProps.dynamicProperties.length) {
        this._isAnimated = !0;
        break;
      }

      i += 1;
    }
  }

  function SVGTransformData(t, e, r) {
    this.transform = {
      mProps: t,
      op: e,
      container: r
    }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
  }

  function SVGStrokeStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated;
  }

  function SVGFillStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r;
  }

  function SVGGradientFillStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r);
  }

  function SVGGradientStrokeStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated;
  }

  function ShapeGroupData() {
    this.it = [], this.prevViewData = [], this.gr = createNS("g");
  }

  BaseRenderer.prototype.checkLayers = function (t) {
    var e,
        r,
        i = this.layers.length;

    for (this.completeLayers = !0, e = i - 1; 0 <= e; e--) {
      this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
    }

    this.checkPendingElements();
  }, BaseRenderer.prototype.createItem = function (t) {
    switch (t.ty) {
      case 2:
        return this.createImage(t);

      case 0:
        return this.createComp(t);

      case 1:
        return this.createSolid(t);

      case 3:
        return this.createNull(t);

      case 4:
        return this.createShape(t);

      case 5:
        return this.createText(t);

      case 13:
        return this.createCamera(t);
    }

    return this.createNull(t);
  }, BaseRenderer.prototype.createCamera = function () {
    throw new Error("You're using a 3d camera. Try the html renderer.");
  }, BaseRenderer.prototype.buildAllItems = function () {
    var t,
        e = this.layers.length;

    for (t = 0; t < e; t += 1) {
      this.buildItem(t);
    }

    this.checkPendingElements();
  }, BaseRenderer.prototype.includeLayers = function (t) {
    this.completeLayers = !1;
    var e,
        r,
        i = t.length,
        s = this.layers.length;

    for (e = 0; e < i; e += 1) {
      for (r = 0; r < s;) {
        if (this.layers[r].id == t[e].id) {
          this.layers[r] = t[e];
          break;
        }

        r += 1;
      }
    }
  }, BaseRenderer.prototype.setProjectInterface = function (t) {
    this.globalData.projectInterface = t;
  }, BaseRenderer.prototype.initItems = function () {
    this.globalData.progressiveLoad || this.buildAllItems();
  }, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
    for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) {
      s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1;
    }
  }, BaseRenderer.prototype.addPendingElement = function (t) {
    this.pendingElements.push(t);
  }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
    var e,
        r = t.length;

    for (e = 0; e < r; e += 1) {
      if (t[e].xt) {
        var i = this.createComp(t[e]);
        i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
      }
    }
  }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
    this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
      w: t.w,
      h: t.h
    };
  }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
    return new NullElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createShape = function (t) {
    return new SVGShapeElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createText = function (t) {
    return new SVGTextElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createImage = function (t) {
    return new IImageElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createComp = function (t) {
    return new SVGCompElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createSolid = function (t) {
    return new ISolidElement(t, this.globalData, this);
  }, SVGRenderer.prototype.configAnimation = function (t) {
    this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
    var e = this.globalData.defs;
    this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
    var r = createNS("clipPath"),
        i = createNS("rect");
    i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
    var s = createElementID();
    r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length);
  }, SVGRenderer.prototype.destroy = function () {
    this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
    var t,
        e = this.layers ? this.layers.length : 0;

    for (t = 0; t < e; t++) {
      this.elements[t] && this.elements[t].destroy();
    }

    this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
  }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
    var e = this.elements;

    if (!e[t] && 99 != this.layers[t].ty) {
      e[t] = !0;
      var r = this.createItem(this.layers[t]);
      e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)));
    }
  }, SVGRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      var t = this.pendingElements.pop();
      if (t.checkParenting(), t.data.tt) for (var e = 0, r = this.elements.length; e < r;) {
        if (this.elements[e] === t) {
          t.setMatte(this.elements[e - 1].layerId);
          break;
        }

        e += 1;
      }
    }
  }, SVGRenderer.prototype.renderFrame = function (t) {
    if (this.renderedFrame !== t && !this.destroyed) {
      null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
      var e,
          r = this.layers.length;

      for (this.completeLayers || this.checkLayers(t), e = r - 1; 0 <= e; e--) {
        (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
      }

      if (this.globalData._mdf) for (e = 0; e < r; e += 1) {
        (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
      }
    }
  }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
    var r = t.getBaseElement();

    if (r) {
      for (var i, s = 0; s < e;) {
        this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;
      }

      i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r);
    }
  }, SVGRenderer.prototype.hide = function () {
    this.layerElement.style.display = "none";
  }, SVGRenderer.prototype.show = function () {
    this.layerElement.style.display = "block";
  }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
    return new CVShapeElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createText = function (t) {
    return new CVTextElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createImage = function (t) {
    return new CVImageElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createComp = function (t) {
    return new CVCompElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createSolid = function (t) {
    return new CVSolidElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
    if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) if (this.renderConfig.clearCanvas) {
      this.transformMat.cloneFromProps(t);
      var e = this.contextData.cTr.props;
      this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
      var r = this.contextData.cTr.props;
      this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
    } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
  }, CanvasRenderer.prototype.ctxOpacity = function (t) {
    if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void (this.globalData.currentGlobalAlpha = this.contextData.cO);
    this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO);
  }, CanvasRenderer.prototype.reset = function () {
    this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore();
  }, CanvasRenderer.prototype.save = function (t) {
    if (this.renderConfig.clearCanvas) {
      t && this.canvasContext.save();
      var e = this.contextData.cTr.props;
      this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
      var r,
          i = this.contextData.saved[this.contextData.cArrPos];

      for (r = 0; r < 16; r += 1) {
        i[r] = e[r];
      }

      this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1;
    } else this.canvasContext.save();
  }, CanvasRenderer.prototype.restore = function (t) {
    if (this.renderConfig.clearCanvas) {
      t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
      var e,
          r = this.contextData.saved[this.contextData.cArrPos],
          i = this.contextData.cTr.props;

      for (e = 0; e < 16; e += 1) {
        i[e] = r[e];
      }

      this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r);
    } else this.canvasContext.restore();
  }, CanvasRenderer.prototype.configAnimation = function (t) {
    this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
      w: t.w,
      h: t.h,
      sx: 0,
      sy: 0,
      tx: 0,
      ty: 0
    }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, (this.globalData.renderer = this).globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize();
  }, CanvasRenderer.prototype.updateContainerSize = function () {
    var t, e, r, i;

    if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
      var s = this.renderConfig.preserveAspectRatio.split(" "),
          a = s[1] || "meet",
          n = s[0] || "xMidYMid",
          o = n.substr(0, 4),
          h = n.substr(4);
      r = t / e, i = this.transformCanvas.w / this.transformCanvas.h, this.transformCanvas.sy = r < i && "meet" === a || i < r && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === a || r < i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === a || r < i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (r < i && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (r < i && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0;
    } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0;

    this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip();
  }, CanvasRenderer.prototype.destroy = function () {
    var t;

    for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; 0 <= t; t -= 1) {
      this.elements[t] && this.elements[t].destroy();
    }

    this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0;
  }, CanvasRenderer.prototype.renderFrame = function (t) {
    if (!(this.renderedFrame == t && !0 === this.renderConfig.clearCanvas || this.destroyed || -1 === t)) {
      this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas, this.globalData.projectInterface.currentFrame = t;
      var e,
          r = this.layers.length;

      for (this.completeLayers || this.checkLayers(t), e = 0; e < r; e++) {
        (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
      }

      if (this.globalData._mdf) {
        for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), e = r - 1; 0 <= e; e -= 1) {
          (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        }

        !0 !== this.renderConfig.clearCanvas && this.restore();
      }
    }
  }, CanvasRenderer.prototype.buildItem = function (t) {
    var e = this.elements;

    if (!e[t] && 99 != this.layers[t].ty) {
      var r = this.createItem(this.layers[t], this, this.globalData);
      (e[t] = r).initExpressions();
    }
  }, CanvasRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      this.pendingElements.pop().checkParenting();
    }
  }, CanvasRenderer.prototype.hide = function () {
    this.animationItem.container.style.display = "none";
  }, CanvasRenderer.prototype.show = function () {
    this.animationItem.container.style.display = "block";
  }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      this.pendingElements.pop().checkParenting();
    }
  }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
    var r = t.getBaseElement();

    if (r) {
      var i = this.layers[e];
      if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);else if (this.threeDElements) this.addTo3dContainer(r, e);else {
        for (var s, a, n = 0; n < e;) {
          this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
        }

        s ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, s) : i.ddd && this.supports3d || this.layerElement.appendChild(r);
      }
    }
  }, HybridRenderer.prototype.createShape = function (t) {
    return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createText = function (t) {
    return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createCamera = function (t) {
    return this.camera = new HCameraElement(t, this.globalData, this), this.camera;
  }, HybridRenderer.prototype.createImage = function (t) {
    return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createComp = function (t) {
    return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createSolid = function (t) {
    return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
    for (var e = 0, r = this.threeDElements.length; e < r;) {
      if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
      e += 1;
    }
  }, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
    var r = createTag("div");
    styleDiv(r);
    var i = createTag("div");
    styleDiv(i), "3d" === e && (r.style.width = this.globalData.compSize.w + "px", r.style.height = this.globalData.compSize.h + "px", r.style.transformOrigin = r.style.mozTransformOrigin = r.style.webkitTransformOrigin = "50% 50%", i.style.transform = i.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"), r.appendChild(i);
    var s = {
      container: i,
      perspectiveElem: r,
      startPos: t,
      endPos: t,
      type: e
    };
    return this.threeDElements.push(s), s;
  }, HybridRenderer.prototype.build3dContainers = function () {
    var t,
        e,
        r = this.layers.length,
        i = "";

    for (t = 0; t < r; t += 1) {
      this.layers[t].ddd && 3 !== this.layers[t].ty ? "3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")) : "2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t);
    }

    for (t = (r = this.threeDElements.length) - 1; 0 <= t; t--) {
      this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
    }
  }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
    for (var r = 0, i = this.threeDElements.length; r < i;) {
      if (e <= this.threeDElements[r].endPos) {
        for (var s, a = this.threeDElements[r].startPos; a < e;) {
          this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
        }

        s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
        break;
      }

      r += 1;
    }
  }, HybridRenderer.prototype.configAnimation = function (t) {
    var e = createTag("div"),
        r = this.animationItem.wrapper;
    e.style.width = t.w + "px", e.style.height = t.h + "px", styleDiv(this.resizerElem = e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), e.style.overflow = "hidden";
    var i = createNS("svg");
    i.setAttribute("width", "1"), i.setAttribute("height", "1"), styleDiv(i), this.resizerElem.appendChild(i);
    var s = createNS("defs");
    i.appendChild(s), this.data = t, this.setupGlobalData(t, i), this.globalData.defs = s, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize();
  }, HybridRenderer.prototype.destroy = function () {
    this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
    var t,
        e = this.layers ? this.layers.length : 0;

    for (t = 0; t < e; t++) {
      this.elements[t].destroy();
    }

    this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
  }, HybridRenderer.prototype.updateContainerSize = function () {
    var t,
        e,
        r,
        i,
        s = this.animationItem.wrapper.offsetWidth,
        a = this.animationItem.wrapper.offsetHeight;
    i = s / a < this.globalData.compSize.w / this.globalData.compSize.h ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, r = 0, (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)";
  }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
    this.resizerElem.style.display = "none";
  }, HybridRenderer.prototype.show = function () {
    this.resizerElem.style.display = "block";
  }, HybridRenderer.prototype.initItems = function () {
    if (this.buildAllItems(), this.camera) this.camera.setup();else {
      var t,
          e = this.globalData.compSize.w,
          r = this.globalData.compSize.h,
          i = this.threeDElements.length;

      for (t = 0; t < i; t += 1) {
        this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px";
      }
    }
  }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
    var e,
        r = t.length,
        i = createTag("div");

    for (e = 0; e < r; e += 1) {
      if (t[e].xt) {
        var s = this.createComp(t[e], i, this.globalData.comp, null);
        s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
      }
    }
  }, MaskElement.prototype.getMaskProperty = function (t) {
    return this.viewData[t].prop;
  }, MaskElement.prototype.renderFrame = function (t) {
    var e,
        r = this.element.finalTransform.mat,
        i = this.masksProperties.length;

    for (e = 0; e < i; e++) {
      if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -r.props[12]), this.viewData[e].invRect.setAttribute("y", -r.props[13])), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
        var s = this.storedData[e].expan;
        this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
      }
    }
  }, MaskElement.prototype.getMaskelement = function () {
    return this.maskElement;
  }, MaskElement.prototype.createLayerSolidPath = function () {
    var t = "M0,0 ";
    return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ";
  }, MaskElement.prototype.drawPath = function (t, e, r) {
    var i,
        s,
        a = " M" + e.v[0][0] + "," + e.v[0][1];

    for (s = e._length, i = 1; i < s; i += 1) {
      a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
    }

    if (e.c && 1 < s && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
      var n = "";
      r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a;
    }
  }, MaskElement.prototype.destroy = function () {
    this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
  }, HierarchyElement.prototype = {
    initHierarchy: function initHierarchy() {
      this.hierarchy = [], this._isParent = !1, this.checkParenting();
    },
    setHierarchy: function setHierarchy(t) {
      this.hierarchy = t;
    },
    setAsParent: function setAsParent() {
      this._isParent = !0;
    },
    checkParenting: function checkParenting() {
      void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
    }
  }, FrameElement.prototype = {
    initFrame: function initFrame() {
      this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
    },
    prepareProperties: function prepareProperties(t, e) {
      var r,
          i = this.dynamicProperties.length;

      for (r = 0; r < i; r += 1) {
        (e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
      }
    },
    addDynamicProperty: function addDynamicProperty(t) {
      -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
    }
  }, TransformElement.prototype = {
    initTransform: function initTransform() {
      this.finalTransform = {
        mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
          o: 0
        },
        _matMdf: !1,
        _opMdf: !1,
        mat: new Matrix()
      }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
    },
    renderTransform: function renderTransform() {
      if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
        var t,
            e = this.finalTransform.mat,
            r = 0,
            i = this.hierarchy.length;
        if (!this.finalTransform._matMdf) for (; r < i;) {
          if (this.hierarchy[r].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = !0;
            break;
          }

          r += 1;
        }
        if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) {
          t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
        }
      }
    },
    globalToLocal: function globalToLocal(t) {
      var e = [];
      e.push(this.finalTransform);

      for (var r = !0, i = this.comp; r;) {
        i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;
      }

      var s,
          a,
          n = e.length;

      for (s = 0; s < n; s += 1) {
        a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
      }

      return t;
    },
    mHelper: new Matrix()
  }, RenderableElement.prototype = {
    initRenderable: function initRenderable() {
      this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
    },
    addRenderableComponent: function addRenderableComponent(t) {
      -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
    },
    removeRenderableComponent: function removeRenderableComponent(t) {
      -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
    },
    prepareRenderableFrame: function prepareRenderableFrame(t) {
      this.checkLayerLimits(t);
    },
    checkTransparency: function checkTransparency() {
      this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
    },
    checkLayerLimits: function checkLayerLimits(t) {
      this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
    },
    renderRenderable: function renderRenderable() {
      var t,
          e = this.renderableComponents.length;

      for (t = 0; t < e; t += 1) {
        this.renderableComponents[t].renderFrame(this._isFirstFrame);
      }
    },
    sourceRectAtTime: function sourceRectAtTime() {
      return {
        top: 0,
        left: 0,
        width: 100,
        height: 100
      };
    },
    getLayerSize: function getLayerSize() {
      return 5 === this.data.ty ? {
        w: this.data.textData.width,
        h: this.data.textData.height
      } : {
        w: this.data.width,
        h: this.data.height
      };
    }
  }, extendPrototype([RenderableElement, createProxyFunction({
    initElement: function initElement(t, e, r) {
      this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
    },
    hide: function hide() {
      this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0);
    },
    show: function show() {
      this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0);
    },
    renderFrame: function renderFrame() {
      this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
    },
    renderInnerContent: function renderInnerContent() {},
    prepareFrame: function prepareFrame(t) {
      this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
    },
    destroy: function destroy() {
      this.innerElem = null, this.destroyBaseElement();
    }
  })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
    this.d = "", this._mdf = !1;
  }, SVGShapeData.prototype.setAsAnimated = function () {
    this._isAnimated = !0;
  }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
    this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
      k: 0
    }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
      k: 0
    }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated;
  }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
    var r = createElementID(),
        i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
    i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
    var s,
        a,
        n,
        o = [];

    for (n = 4 * e.g.p, a = 0; a < n; a += 4) {
      s = createNS("stop"), i.appendChild(s), o.push(s);
    }

    t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o;
  }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
    if (this.g._hasOpacity && !this.g._collapsable) {
      var r,
          i,
          s,
          a = createNS("mask"),
          n = createNS("path");
      a.appendChild(n);
      var o = createElementID(),
          h = createElementID();
      a.setAttribute("id", h);
      var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
      l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
      var p = this.stops;

      for (i = 4 * t.g.p; i < s; i += 2) {
        (r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
      }

      n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n;
    }
  }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);

  var SVGElementsRenderer = function () {
    var y = new Matrix(),
        g = new Matrix();

    function e(t, e, r) {
      (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS());
    }

    function r(t, e, r) {
      var i,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f,
          c,
          d = e.styles.length,
          u = e.lvl;

      for (h = 0; h < d; h += 1) {
        if (n = e.sh._mdf || r, e.styles[h].lvl < u) {
          for (p = g.reset(), f = u - e.styles[h].lvl, c = e.transformers.length - 1; !n && 0 < f;) {
            n = e.transformers[c].mProps._mdf || n, f--, c--;
          }

          if (n) for (f = u - e.styles[h].lvl, c = e.transformers.length - 1; 0 < f;) {
            m = e.transformers[c].mProps.v.props, p.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), f--, c--;
          }
        } else p = y;

        if (s = (l = e.sh.paths)._length, n) {
          for (a = "", i = 0; i < s; i += 1) {
            (o = l.shapes[i]) && o._length && (a += buildShapeString(o, o._length, o.c, p));
          }

          e.caches[h] = a;
        } else a = e.caches[h];

        e.styles[h].d += !0 === t.hd ? "" : a, e.styles[h]._mdf = n || e.styles[h]._mdf;
      }
    }

    function i(t, e, r) {
      var i = e.style;
      (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v);
    }

    function s(t, e, r) {
      a(t, e, r), n(t, e, r);
    }

    function a(t, e, r) {
      var i,
          s,
          a,
          n,
          o,
          h = e.gf,
          l = e.g._hasOpacity,
          p = e.s.v,
          m = e.e.v;

      if (e.o._mdf || r) {
        var f = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
        e.style.pElem.setAttribute(f, e.o.v);
      }

      if (e.s._mdf || r) {
        var c = 1 === t.t ? "x1" : "cx",
            d = "x1" === c ? "y1" : "cy";
        h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]));
      }

      if (e.g._cmdf || r) {
        i = e.cst;
        var u = e.g.c;

        for (a = i.length, s = 0; s < a; s += 1) {
          (n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")");
        }
      }

      if (l && (e.g._omdf || r)) {
        var y = e.g.o;

        for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) {
          n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1]);
        }
      }

      if (1 === t.t) (e.e._mdf || r) && (h.setAttribute("x2", m[0]), h.setAttribute("y2", m[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", m[0]), e.of.setAttribute("y2", m[1])));else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
        o || (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)));
        var g = Math.atan2(m[1] - p[1], m[0] - p[0]),
            v = o * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
            b = Math.cos(g + e.a.v) * v + p[0],
            E = Math.sin(g + e.a.v) * v + p[1];
        h.setAttribute("fx", b), h.setAttribute("fy", E), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E));
      }
    }

    function n(t, e, r) {
      var i = e.style,
          s = e.d;
      s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v));
    }

    return {
      createRenderFunction: function createRenderFunction(t) {
        t.ty;

        switch (t.ty) {
          case "fl":
            return i;

          case "gf":
            return a;

          case "gs":
            return s;

          case "st":
            return n;

          case "sh":
          case "el":
          case "rc":
          case "sr":
            return r;

          case "tr":
            return e;
        }
      }
    };
  }();

  function ShapeTransformManager() {
    this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
  }

  function CVShapeData(t, e, r, i) {
    this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
    var s = 4;
    "rc" == e.ty ? s = 5 : "el" == e.ty ? s = 6 : "sr" == e.ty && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
    var a,
        n,
        o = r.length;

    for (a = 0; a < o; a += 1) {
      r[a].closed || (n = {
        transforms: i.addTransformSequence(r[a].transforms),
        trNodes: []
      }, this.styledShapes.push(n), r[a].elements.push(n));
    }
  }

  function BaseElement() {}

  function NullElement(t, e, r) {
    this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy();
  }

  function SVGBaseElement() {}

  function IShapeElement() {}

  function ITextElement() {}

  function ICompElement() {}

  function IImageElement(t, e, r) {
    this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r);
  }

  function ISolidElement(t, e, r) {
    this.initElement(t, e, r);
  }

  function SVGCompElement(t, e, r) {
    this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }

  function SVGTextElement(t, e, r) {
    this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r);
  }

  function SVGShapeElement(t, e, r) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = [];
  }

  function SVGTintFilter(t, e) {
    this.filterManager = e;
    var r = createNS("feColorMatrix");

    if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
      var i,
          s = createNS("feMerge");
      t.appendChild(s), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(i);
    }
  }

  function SVGFillFilter(t, e) {
    this.filterManager = e;
    var r = createNS("feColorMatrix");
    r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r;
  }

  function SVGStrokeEffect(t, e) {
    this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = [];
  }

  function SVGTritoneFilter(t, e) {
    this.filterManager = e;
    var r = createNS("feColorMatrix");
    r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
    var i = createNS("feComponentTransfer");
    i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
    var s = createNS("feFuncR");
    s.setAttribute("type", "table"), i.appendChild(s), this.feFuncR = s;
    var a = createNS("feFuncG");
    a.setAttribute("type", "table"), i.appendChild(a), this.feFuncG = a;
    var n = createNS("feFuncB");
    n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n;
  }

  function SVGProLevelsFilter(t, e) {
    this.filterManager = e;
    var r = this.filterManager.effectElements,
        i = createNS("feComponentTransfer");
    (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i));
  }

  function SVGDropShadowEffect(t, e) {
    t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "400%"), t.setAttribute("height", "400%"), this.filterManager = e;
    var r = createNS("feGaussianBlur");
    r.setAttribute("in", "SourceAlpha"), r.setAttribute("result", "drop_shadow_1"), r.setAttribute("stdDeviation", "0"), this.feGaussianBlur = r, t.appendChild(r);
    var i = createNS("feOffset");
    i.setAttribute("dx", "25"), i.setAttribute("dy", "0"), i.setAttribute("in", "drop_shadow_1"), i.setAttribute("result", "drop_shadow_2"), this.feOffset = i, t.appendChild(i);
    var s = createNS("feFlood");
    s.setAttribute("flood-color", "#00ff00"), s.setAttribute("flood-opacity", "1"), s.setAttribute("result", "drop_shadow_3"), this.feFlood = s, t.appendChild(s);
    var a = createNS("feComposite");
    a.setAttribute("in", "drop_shadow_3"), a.setAttribute("in2", "drop_shadow_2"), a.setAttribute("operator", "in"), a.setAttribute("result", "drop_shadow_4"), t.appendChild(a);
    var n,
        o = createNS("feMerge");
    t.appendChild(o), n = createNS("feMergeNode"), o.appendChild(n), (n = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = n, this.feMerge = o, this.originalNodeAdded = !1, o.appendChild(n);
  }

  ShapeTransformManager.prototype = {
    addTransformSequence: function addTransformSequence(t) {
      var e,
          r = t.length,
          i = "_";

      for (e = 0; e < r; e += 1) {
        i += t[e].transform.key + "_";
      }

      var s = this.sequences[i];
      return s || (s = {
        transforms: [].concat(t),
        finalTransform: new Matrix(),
        _mdf: !1
      }, this.sequences[i] = s, this.sequenceList.push(s)), s;
    },
    processSequence: function processSequence(t, e) {
      for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
        if (t.transforms[i].transform.mProps._mdf) {
          a = !0;
          break;
        }

        i += 1;
      }

      if (a) for (t.finalTransform.reset(), i = s - 1; 0 <= i; i -= 1) {
        r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
      }
      t._mdf = a;
    },
    processSequences: function processSequences(t) {
      var e,
          r = this.sequenceList.length;

      for (e = 0; e < r; e += 1) {
        this.processSequence(this.sequenceList[e], t);
      }
    },
    getNewKey: function getNewKey() {
      return "_" + this.transform_key_count++;
    }
  }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
    checkMasks: function checkMasks() {
      if (!this.data.hasMask) return !1;

      for (var t = 0, e = this.data.masksProperties.length; t < e;) {
        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
        t += 1;
      }

      return !1;
    },
    initExpressions: function initExpressions() {
      this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
      var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
      this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
    },
    setBlendMode: function setBlendMode() {
      var t = getBlendMode(this.data.bm);
      (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
    },
    initBaseData: function initBaseData(t, e, r) {
      this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
    },
    getType: function getType() {
      return this.type;
    }
  }, NullElement.prototype.prepareFrame = function (t) {
    this.prepareProperties(t, !0);
  }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
    return null;
  }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
    initRendererElement: function initRendererElement() {
      this.layerElement = createNS("g");
    },
    createContainerElements: function createContainerElements() {
      this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
      var t,
          e,
          r,
          i = null;

      if (this.data.td) {
        if (3 == this.data.td || 1 == this.data.td) {
          var s = createNS("mask");
          s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), i = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, s.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"));
        } else if (2 == this.data.td) {
          var a = createNS("mask");
          a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
          var n = createNS("g");
          a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
          var o = createNS("feColorMatrix");
          o.setAttribute("type", "matrix"), o.setAttribute("color-interpolation-filters", "sRGB"), o.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1"), e.appendChild(o), this.globalData.defs.appendChild(e);
          var h = createNS("rect");
          h.setAttribute("width", this.comp.data.w), h.setAttribute("height", this.comp.data.h), h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("fill", "#ffffff"), h.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(h), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(h), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(a);
        }
      } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;

      if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
        var l = createNS("clipPath"),
            p = createNS("path");
        p.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
        var m = createElementID();

        if (l.setAttribute("id", m), l.appendChild(p), this.globalData.defs.appendChild(l), this.checkMasks()) {
          var f = createNS("g");
          f.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")"), f.appendChild(this.layerElement), this.transformedElement = f, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
        } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")");
      }

      0 !== this.data.bm && this.setBlendMode();
    },
    renderElement: function renderElement() {
      this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
    },
    destroyBaseElement: function destroyBaseElement() {
      this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
    },
    getBaseElement: function getBaseElement() {
      return this.data.hd ? null : this.baseElement;
    },
    createRenderableComponents: function createRenderableComponents() {
      this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this);
    },
    setMatte: function setMatte(t) {
      this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")");
    }
  }, IShapeElement.prototype = {
    addShapeToModifiers: function addShapeToModifiers(t) {
      var e,
          r = this.shapeModifiers.length;

      for (e = 0; e < r; e += 1) {
        this.shapeModifiers[e].addShape(t);
      }
    },
    isShapeInAnimatedModifiers: function isShapeInAnimatedModifiers(t) {
      for (var e = this.shapeModifiers.length; 0 < e;) {
        if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
      }

      return !1;
    },
    renderModifiers: function renderModifiers() {
      if (this.shapeModifiers.length) {
        var t,
            e = this.shapes.length;

        for (t = 0; t < e; t += 1) {
          this.shapes[t].sh.reset();
        }

        for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1) {
          this.shapeModifiers[t].processShapes(this._isFirstFrame);
        }
      }
    },
    lcEnum: {
      1: "butt",
      2: "round",
      3: "square"
    },
    ljEnum: {
      1: "miter",
      2: "round",
      3: "bevel"
    },
    searchProcessedElement: function searchProcessedElement(t) {
      for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
        if (e[r].elem === t) return e[r].pos;
        r += 1;
      }

      return 0;
    },
    addProcessedElement: function addProcessedElement(t, e) {
      for (var r = this.processedElements, i = r.length; i;) {
        if (r[i -= 1].elem === t) return void (r[i].pos = e);
      }

      r.push(new ProcessedElement(t, e));
    },
    prepareFrame: function prepareFrame(t) {
      this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
    }
  }, ITextElement.prototype.initElement = function (t, e, r) {
    this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
  }, ITextElement.prototype.prepareFrame = function (t) {
    this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
  }, ITextElement.prototype.createPathShape = function (t, e) {
    var r,
        i,
        s = e.length,
        a = "";

    for (r = 0; r < s; r += 1) {
      i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t);
    }

    return a;
  }, ITextElement.prototype.updateDocumentData = function (t, e) {
    this.textProperty.updateDocumentData(t, e);
  }, ITextElement.prototype.canResizeFont = function (t) {
    this.textProperty.canResizeFont(t);
  }, ITextElement.prototype.setMinimumFontSize = function (t) {
    this.textProperty.setMinimumFontSize(t);
  }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
    switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
      case 1:
        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
        break;

      case 2:
        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0);
    }

    e.translate(i, s, 0);
  }, ITextElement.prototype.buildColor = function (t) {
    return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
  }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
    this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide();
  }, ICompElement.prototype.prepareFrame = function (t) {
    if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
      if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;else {
        var e = this.tm.v;
        e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
      }
      var r,
          i = this.elements.length;

      for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; 0 <= r; r -= 1) {
        (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
      }
    }
  }, ICompElement.prototype.renderInnerContent = function () {
    var t,
        e = this.layers.length;

    for (t = 0; t < e; t += 1) {
      (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
    }
  }, ICompElement.prototype.setElements = function (t) {
    this.elements = t;
  }, ICompElement.prototype.getElements = function () {
    return this.elements;
  }, ICompElement.prototype.destroyElements = function () {
    var t,
        e = this.layers.length;

    for (t = 0; t < e; t += 1) {
      this.elements[t] && this.elements[t].destroy();
    }
  }, ICompElement.prototype.destroy = function () {
    this.destroyElements(), this.destroyBaseElement();
  }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
    var t = this.globalData.getAssetsPath(this.assetData);
    this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
  }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
    var t = createNS("rect");
    t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
  }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
    this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
  }, SVGTextElement.prototype.buildTextContents = function (t) {
    for (var e = 0, r = t.length, i = [], s = ""; e < r;) {
      t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;
    }

    return i.push(s), i;
  }, SVGTextElement.prototype.buildNewText = function () {
    var t,
        e,
        r = this.textProperty.currentData;
    this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
    var i = this.globalData.fontManager.getFontByName(r.f);
    if (i.fClass) this.layerElement.setAttribute("class", i.fClass);else {
      this.layerElement.setAttribute("font-family", i.fFamily);
      var s = r.fWeight,
          a = r.fStyle;
      this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s);
    }
    var n,
        o = r.l || [],
        h = !!this.globalData.fontManager.chars;
    e = o.length;
    var l,
        p = this.mHelper,
        m = "",
        f = this.data.singleShape,
        c = 0,
        d = 0,
        u = !0,
        y = r.tr / 1e3 * r.finalSize;

    if (!f || h || r.sz) {
      var g,
          v,
          b = this.textSpans.length;

      for (t = 0; t < e; t += 1) {
        h && f && 0 !== t || (n = t < b ? this.textSpans[t] : createNS(h ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), f && (o[t].n && (c = -y, d += r.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, c, d), c += o[t].l || 0, c += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], f ? m += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (f && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
      }

      f && n && n.setAttribute("d", m);
    } else {
      var E = this.textContainer,
          x = "start";

      switch (r.j) {
        case 1:
          x = "end";
          break;

        case 2:
          x = "middle";
      }

      E.setAttribute("text-anchor", x), E.setAttribute("letter-spacing", y);
      var P = this.buildTextContents(r.finalText);

      for (e = P.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1) {
        (n = this.textSpans[t] || createNS("tspan")).textContent = P[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", E.appendChild(n), this.textSpans[t] = n, d += r.finalLineHeight;
      }

      this.layerElement.appendChild(E);
    }

    for (; t < this.textSpans.length;) {
      this.textSpans[t].style.display = "none", t += 1;
    }

    this._sizeChanged = !0;
  }, SVGTextElement.prototype.sourceRectAtTime = function (t) {
    if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
      this._sizeChanged = !1;
      var e = this.layerElement.getBBox();
      this.bbox = {
        top: e.y,
        left: e.x,
        width: e.width,
        height: e.height
      };
    }

    return this.bbox;
  }, SVGTextElement.prototype.renderInnerContent = function () {
    if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
      var t, e;
      this._sizeChanged = !0;
      var r,
          i,
          s = this.textAnimator.renderedLetters,
          a = this.textProperty.currentData.l;

      for (e = a.length, t = 0; t < e; t += 1) {
        a[t].n || (r = s[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc));
      }
    }
  }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
  }, SVGShapeElement.prototype.filterUniqueShapes = function () {
    var t,
        e,
        r,
        i,
        s = this.shapes.length,
        a = this.stylesList.length,
        n = [],
        o = !1;

    for (r = 0; r < a; r += 1) {
      for (i = this.stylesList[r], o = !1, t = n.length = 0; t < s; t += 1) {
        -1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
      }

      1 < n.length && o && this.setShapesAsAnimated(n);
    }
  }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
    var e,
        r = t.length;

    for (e = 0; e < r; e += 1) {
      t[e].setAsAnimated();
    }
  }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
    var r,
        i = new SVGStyleData(t, e),
        s = i.pElem;
    if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);else if ("gf" === t.ty || "gs" === t.ty) {
      r = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"));
    }
    return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r;
  }, SVGShapeElement.prototype.createGroupElement = function (t) {
    var e = new ShapeGroupData();
    return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e;
  }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
    var r = TransformPropertyFactory.getTransformProperty(this, t, this),
        i = new SVGTransformData(r, r.o, e);
    return this.addToAnimatedContents(t, i), i;
  }, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
    var i = 4;
    "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
    var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
    return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s;
  }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
    for (var r = 0, i = this.animatedContents.length; r < i;) {
      if (this.animatedContents[r].element === e) return;
      r += 1;
    }

    this.animatedContents.push({
      fn: SVGElementsRenderer.createRenderFunction(t),
      element: e,
      data: t
    });
  }, SVGShapeElement.prototype.setElementStyles = function (t) {
    var e,
        r = t.styles,
        i = this.stylesList.length;

    for (e = 0; e < i; e += 1) {
      this.stylesList[e].closed || r.push(this.stylesList[e]);
    }
  }, SVGShapeElement.prototype.reloadShapes = function () {
    this._isFirstFrame = !0;
    var t,
        e = this.itemsData.length;

    for (t = 0; t < e; t += 1) {
      this.prevViewData[t] = this.itemsData[t];
    }

    for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
      this.dynamicProperties[t].getValue();
    }

    this.renderModifiers();
  }, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
    var o,
        h,
        l,
        p,
        m,
        f,
        c = [].concat(a),
        d = t.length - 1,
        u = [],
        y = [];

    for (o = d; 0 <= o; o -= 1) {
      if ((f = this.searchProcessedElement(t[o])) ? e[o] = r[f - 1] : t[o]._render = n, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) f ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);else if ("gr" == t[o].ty) {
        if (f) for (l = e[o].it.length, h = 0; h < l; h += 1) {
          e[o].prevViewData[h] = e[o].it[h];
        } else e[o] = this.createGroupElement(t[o]);
        this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr);
      } else "tr" == t[o].ty ? (f || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (f || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (f ? (m = e[o]).closed = !1 : ((m = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = m, this.shapeModifiers.push(m)), y.push(m)) : "rp" == t[o].ty && (f ? (m = e[o]).closed = !0 : (m = ShapeModifiers.getModifier(t[o].ty), (e[o] = m).init(this, t, o, e), this.shapeModifiers.push(m), n = !1), y.push(m));
      this.addProcessedElement(t[o], o + 1);
    }

    for (d = u.length, o = 0; o < d; o += 1) {
      u[o].closed = !0;
    }

    for (d = y.length, o = 0; o < d; o += 1) {
      y[o].closed = !0;
    }
  }, SVGShapeElement.prototype.renderInnerContent = function () {
    this.renderModifiers();
    var t,
        e = this.stylesList.length;

    for (t = 0; t < e; t += 1) {
      this.stylesList[t].reset();
    }

    for (this.renderShape(), t = 0; t < e; t += 1) {
      (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
    }
  }, SVGShapeElement.prototype.renderShape = function () {
    var t,
        e,
        r = this.animatedContents.length;

    for (t = 0; t < r; t += 1) {
      e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame);
    }
  }, SVGShapeElement.prototype.destroy = function () {
    this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
  }, SVGTintFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[0].p.v,
          r = this.filterManager.effectElements[1].p.v,
          i = this.filterManager.effectElements[2].p.v / 100;
      this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
    }
  }, SVGFillFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[2].p.v,
          r = this.filterManager.effectElements[6].p.v;
      this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0");
    }
  }, SVGStrokeEffect.prototype.initialize = function () {
    var t,
        e,
        r,
        i,
        s = this.elem.layerElement.children || this.elem.layerElement.childNodes;

    for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) {
      t = createNS("path"), e.appendChild(t), this.paths.push({
        p: t,
        m: r
      });
    }

    if (3 === this.filterManager.effectElements[10].p.v) {
      var a = createNS("mask"),
          n = createElementID();
      a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
      var o = createNS("g");

      for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) {
        o.appendChild(s[0]);
      }

      this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff");
    } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
      if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) {
        this.elem.layerElement.removeChild(s[0]);
      }
      this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
    }

    this.initialized = !0, this.pathMasker = e;
  }, SVGStrokeEffect.prototype.renderFrame = function (t) {
    this.initialized || this.initialize();
    var e,
        r,
        i,
        s = this.paths.length;

    for (e = 0; e < s; e += 1) {
      if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
        var a;

        if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
          var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
              o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
              h = i.getTotalLength();
          a = "0 0 0 " + h * n + " ";
          var l,
              p = h * (o - n),
              m = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
              f = Math.floor(p / m);

          for (l = 0; l < f; l += 1) {
            a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
          }

          a += "0 " + 10 * h + " 0 0";
        } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;

        i.setAttribute("stroke-dasharray", a);
      }
    }

    if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
      var c = this.filterManager.effectElements[3].p.v;
      this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * c[0]) + "," + bm_floor(255 * c[1]) + "," + bm_floor(255 * c[2]) + ")");
    }
  }, SVGTritoneFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[0].p.v,
          r = this.filterManager.effectElements[1].p.v,
          i = this.filterManager.effectElements[2].p.v,
          s = i[0] + " " + r[0] + " " + e[0],
          a = i[1] + " " + r[1] + " " + e[1],
          n = i[2] + " " + r[2] + " " + e[2];
      this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
    }
  }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
    var r = createNS(t);
    return r.setAttribute("type", "table"), e.appendChild(r), r;
  }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
    for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
      length: 256
    }), m = 0, f = s - i, c = e - t; o <= 256;) {
      n = (a = o / 256) <= h ? c < 0 ? s : i : l <= a ? c < 0 ? i : s : i + f * Math.pow((a - t) / c, 1 / r), p[m++] = n, o += 256 / 255;
    }

    return p.join(" ");
  }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e,
          r = this.filterManager.effectElements;
      this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e));
    }
  }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
        var e = this.filterManager.effectElements[0].p.v;
        this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
      }

      if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
        var r = this.filterManager.effectElements[3].p.v,
            i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
            s = r * Math.cos(i),
            a = r * Math.sin(i);
        this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a);
      }
    }
  };
  var _svgMatteSymbols = [];

  function SVGMatte3Effect(t, e, r) {
    this.initialized = !1, this.filterManager = e, this.filterElem = t, (this.elem = r).matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement;
  }

  function SVGEffects(t) {
    var e,
        r,
        i = t.data.ef ? t.data.ef.length : 0,
        s = createElementID(),
        a = filtersFactory.createFilter(s),
        n = 0;

    for (this.filters = [], e = 0; e < i; e += 1) {
      r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty && (r = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t)), r && this.filters.push(r);
    }

    n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this);
  }

  function CVContextData() {
    this.saved = [], this.cArrPos = 0, this.cTr = new Matrix(), this.cO = 1;
    var t;

    for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) {
      this.saved[t] = createTypedArray("float32", 16);
    }

    this._length = 15;
  }

  function CVBaseElement() {}

  function CVImageElement(t, e, r) {
    this.failed = !1, this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r);
  }

  function CVCompElement(t, e, r) {
    this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }

  function CVMaskElement(t, e) {
    this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
    var r,
        i = this.masksProperties.length,
        s = !1;

    for (r = 0; r < i; r++) {
      "n" !== this.masksProperties[r].mode && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
    }

    (this.hasMasks = s) && this.element.addRenderableComponent(this);
  }

  function CVShapeElement(t, e, r) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(t, e, r);
  }

  function CVSolidElement(t, e, r) {
    this.initElement(t, e, r);
  }

  function CVTextElement(t, e, r) {
    this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
      fill: "rgba(0,0,0,0)",
      stroke: "rgba(0,0,0,0)",
      sWidth: 0,
      fValue: ""
    }, this.initElement(t, e, r);
  }

  function CVEffects() {}

  function HBaseElement(t, e, r) {}

  function HSolidElement(t, e, r) {
    this.initElement(t, e, r);
  }

  function HCompElement(t, e, r) {
    this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }

  function HShapeElement(t, e, r) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
      x: 999999,
      y: -999999,
      h: 0,
      w: 0
    };
  }

  function HTextElement(t, e, r) {
    this.textSpans = [], this.textPaths = [], this.currentBBox = {
      x: 999999,
      y: -999999,
      h: 0,
      w: 0
    }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r);
  }

  function HImageElement(t, e, r) {
    this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r);
  }

  function HCameraElement(t, e, r) {
    this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
    var i = PropertyFactory.getProp;

    if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
      var s,
          a = t.ks.or.k.length;

      for (s = 0; s < a; s += 1) {
        t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null;
      }
    }

    this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix(), this._prevMat = new Matrix(), this._isFirstFrame = !0;
  }

  function HEffects() {}

  SVGMatte3Effect.prototype.findSymbol = function (t) {
    for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
      if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
      e += 1;
    }

    return null;
  }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
    var r = t.layerElement.parentNode;

    if (r) {
      for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) {
        a += 1;
      }

      a <= n - 2 && (i = s[a + 1]);
      var o = createNS("use");
      o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o);
    }
  }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
    if (!this.findSymbol(e)) {
      var r = createElementID(),
          i = createNS("mask");
      i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
      var s = t.globalData.defs;
      s.appendChild(i);
      var a = createNS("symbol");
      a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
      var n = createNS("use");
      n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show();
    }

    t.setMatte(e.layerId);
  }, SVGMatte3Effect.prototype.initialize = function () {
    for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) {
      e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
    }

    this.initialized = !0;
  }, SVGMatte3Effect.prototype.renderFrame = function () {
    this.initialized || this.initialize();
  }, SVGEffects.prototype.renderFrame = function (t) {
    var e,
        r = this.filters.length;

    for (e = 0; e < r; e += 1) {
      this.filters[e].renderFrame(t);
    }
  }, CVContextData.prototype.duplicate = function () {
    var t = 2 * this._length,
        e = this.savedOp;
    this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
    var r = 0;

    for (r = this._length; r < t; r += 1) {
      this.saved[r] = createTypedArray("float32", 16);
    }

    this._length = t;
  }, CVContextData.prototype.reset = function () {
    this.cArrPos = 0, this.cTr.reset(), this.cO = 1;
  }, CVBaseElement.prototype = {
    createElements: function createElements() {},
    initRendererElement: function initRendererElement() {},
    createContainerElements: function createContainerElements() {
      this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this);
    },
    createContent: function createContent() {},
    setBlendMode: function setBlendMode() {
      var t = this.globalData;

      if (t.blendMode !== this.data.bm) {
        t.blendMode = this.data.bm;
        var e = getBlendMode(this.data.bm);
        t.canvasContext.globalCompositeOperation = e;
      }
    },
    createRenderableComponents: function createRenderableComponents() {
      this.maskManager = new CVMaskElement(this.data, this);
    },
    hideElement: function hideElement() {
      this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0);
    },
    showElement: function showElement() {
      this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0);
    },
    renderFrame: function renderFrame() {
      this.hidden || this.data.hd || (this.renderTransform(), this.renderRenderable(), this.setBlendMode(), this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1));
    },
    destroy: function destroy() {
      this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy();
    },
    mHelper: new Matrix()
  }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
    if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
      var t = createTag("canvas");
      t.width = this.assetData.w, t.height = this.assetData.h;
      var e,
          r,
          i = t.getContext("2d"),
          s = this.img.width,
          a = this.img.height,
          n = s / a,
          o = this.assetData.w / this.assetData.h,
          h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
      o < n && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = a) * o : r = (e = s) / o, i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t;
    }
  }, CVImageElement.prototype.renderInnerContent = function (t) {
    this.failed || this.canvasContext.drawImage(this.img, 0, 0);
  }, CVImageElement.prototype.destroy = function () {
    this.img = null;
  }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
    var t;

    for (t = this.layers.length - 1; 0 <= t; t -= 1) {
      (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
    }
  }, CVCompElement.prototype.destroy = function () {
    var t;

    for (t = this.layers.length - 1; 0 <= t; t -= 1) {
      this.elements[t] && this.elements[t].destroy();
    }

    this.layers = null, this.elements = null;
  }, CVMaskElement.prototype.renderFrame = function () {
    if (this.hasMasks) {
      var t,
          e,
          r,
          i,
          s = this.element.finalTransform.mat,
          a = this.element.canvasContext,
          n = this.masksProperties.length;

      for (a.beginPath(), t = 0; t < n; t++) {
        if ("n" !== this.masksProperties[t].mode) {
          this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i = this.viewData[t].v, e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0), a.moveTo(e[0], e[1]);
          var o,
              h = i._length;

          for (o = 1; o < h; o++) {
            r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
          }

          r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
        }
      }

      this.element.globalData.renderer.save(!0), a.clip();
    }
  }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
    this.element = null;
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
    opacity: 1,
    _opMdf: !1
  }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
  }, CVShapeElement.prototype.createStyleElement = function (t, e) {
    var r = {
      data: t,
      type: t.ty,
      preTransforms: this.transformsManager.addTransformSequence(e),
      transforms: [],
      elements: [],
      closed: !0 === t.hd
    },
        i = {};

    if ("fl" == t.ty || "st" == t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bm_floor(i.c.v[0]) + "," + bm_floor(i.c.v[1]) + "," + bm_floor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
      k: 0
    }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
      k: 0
    }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
      if (r.lc = this.lcEnum[t.lc] || "round", r.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
        var s = new DashProperty(this, t.d, "canvas");
        i.d = s, i.d.k || (r.da = i.d.dashArray, r["do"] = i.d.dashoffset[0]);
      }
    } else r.r = 2 === t.r ? "evenodd" : "nonzero";

    return this.stylesList.push(r), i.style = r, i;
  }, CVShapeElement.prototype.createGroupElement = function (t) {
    return {
      it: [],
      prevViewData: []
    };
  }, CVShapeElement.prototype.createTransformElement = function (t) {
    return {
      transform: {
        opacity: 1,
        _opMdf: !1,
        key: this.transformsManager.getNewKey(),
        op: PropertyFactory.getProp(this, t.o, 0, .01, this),
        mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
      }
    };
  }, CVShapeElement.prototype.createShapeElement = function (t) {
    var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
    return this.shapes.push(e), this.addShapeToModifiers(e), e;
  }, CVShapeElement.prototype.reloadShapes = function () {
    this._isFirstFrame = !0;
    var t,
        e = this.itemsData.length;

    for (t = 0; t < e; t += 1) {
      this.prevViewData[t] = this.itemsData[t];
    }

    for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
      this.dynamicProperties[t].getValue();
    }

    this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
  }, CVShapeElement.prototype.addTransformToStyleList = function (t) {
    var e,
        r = this.stylesList.length;

    for (e = 0; e < r; e += 1) {
      this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
    }
  }, CVShapeElement.prototype.removeTransformFromStyleList = function () {
    var t,
        e = this.stylesList.length;

    for (t = 0; t < e; t += 1) {
      this.stylesList[t].closed || this.stylesList[t].transforms.pop();
    }
  }, CVShapeElement.prototype.closeStyles = function (t) {
    var e,
        r = t.length;

    for (e = 0; e < r; e += 1) {
      t[e].closed = !0;
    }
  }, CVShapeElement.prototype.searchShapes = function (t, e, r, i, s) {
    var a,
        n,
        o,
        h,
        l,
        p,
        m = t.length - 1,
        f = [],
        c = [],
        d = [].concat(s);

    for (a = m; 0 <= a; a -= 1) {
      if ((h = this.searchProcessedElement(t[a])) ? e[a] = r[h - 1] : t[a]._shouldRender = i, "fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), f.push(e[a].style);else if ("gr" == t[a].ty) {
        if (h) for (o = e[a].it.length, n = 0; n < o; n += 1) {
          e[a].prevViewData[n] = e[a].it[n];
        } else e[a] = this.createGroupElement(t[a]);
        this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d);
      } else "tr" == t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" == t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), (e[a] = l).init(this, t, a, e), this.shapeModifiers.push(l), i = !1), c.push(l));
      this.addProcessedElement(t[a], a + 1);
    }

    for (this.removeTransformFromStyleList(), this.closeStyles(f), m = c.length, a = 0; a < m; a += 1) {
      c[a].closed = !0;
    }
  }, CVShapeElement.prototype.renderInnerContent = function () {
    this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
  }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
    (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0);
  }, CVShapeElement.prototype.drawLayer = function () {
    var t,
        e,
        r,
        i,
        s,
        a,
        n,
        o,
        h,
        l = this.stylesList.length,
        p = this.globalData.renderer,
        m = this.globalData.canvasContext;

    for (t = 0; t < l; t += 1) {
      if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
        for (p.save(), a = h.elements, "st" === o || "gs" === o ? (m.strokeStyle = "st" === o ? h.co : h.grd, m.lineWidth = h.wi, m.lineCap = h.lc, m.lineJoin = h.lj, m.miterLimit = h.ml || 0) : m.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && m.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e = 0; e < r; e += 1) {
          for ("st" !== o && "gs" !== o || (m.beginPath(), h.da && (m.setLineDash(h.da), m.lineDashOffset = h["do"])), s = (n = a[e].trNodes).length, i = 0; i < s; i += 1) {
            "m" == n[i].t ? m.moveTo(n[i].p[0], n[i].p[1]) : "c" == n[i].t ? m.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : m.closePath();
          }

          "st" !== o && "gs" !== o || (m.stroke(), h.da && m.setLineDash(this.dashResetter));
        }

        "st" !== o && "gs" !== o && m.fill(h.r), p.restore();
      }
    }
  }, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
    var s, a;

    for (a = t, s = e.length - 1; 0 <= s; s -= 1) {
      "tr" == e[s].ty ? (a = r[s].transform, this.renderShapeTransform(t, a)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], r[s]) : "fl" == e[s].ty ? this.renderFill(e[s], r[s], a) : "st" == e[s].ty ? this.renderStroke(e[s], r[s], a) : "gf" == e[s].ty || "gs" == e[s].ty ? this.renderGradientFill(e[s], r[s], a) : "gr" == e[s].ty ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
    }

    i && this.drawLayer();
  }, CVShapeElement.prototype.renderStyledShape = function (t, e) {
    if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
      var r,
          i,
          s,
          a = t.trNodes,
          n = e.paths,
          o = n._length;
      a.length = 0;
      var h = t.transforms.finalTransform;

      for (s = 0; s < o; s += 1) {
        var l = n.shapes[s];

        if (l && l.v) {
          for (i = l._length, r = 1; r < i; r += 1) {
            1 === r && a.push({
              t: "m",
              p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
            }), a.push({
              t: "c",
              pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
            });
          }

          1 === i && a.push({
            t: "m",
            p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
          }), l.c && i && (a.push({
            t: "c",
            pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
          }), a.push({
            t: "z"
          }));
        }
      }

      t.trNodes = a;
    }
  }, CVShapeElement.prototype.renderPath = function (t, e) {
    if (!0 !== t.hd && t._shouldRender) {
      var r,
          i = e.styledShapes.length;

      for (r = 0; r < i; r += 1) {
        this.renderStyledShape(e.styledShapes[r], e.sh);
      }
    }
  }, CVShapeElement.prototype.renderFill = function (t, e, r) {
    var i = e.style;
    (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity);
  }, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
    var i = e.style;

    if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
      var s = this.globalData.canvasContext,
          a = e.s.v,
          n = e.e.v;
      if (1 === t.t) f = s.createLinearGradient(a[0], a[1], n[0], n[1]);else var o = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)),
          h = Math.atan2(n[1] - a[1], n[0] - a[0]),
          l = o * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
          p = Math.cos(h + e.a.v) * l + a[0],
          m = Math.sin(h + e.a.v) * l + a[1],
          f = s.createRadialGradient(p, m, 0, a[0], a[1], o);
      var c,
          d = t.g.p,
          u = e.g.c,
          y = 1;

      for (c = 0; c < d; c += 1) {
        e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * c + 1]), f.addColorStop(u[4 * c] / 100, "rgba(" + u[4 * c + 1] + "," + u[4 * c + 2] + "," + u[4 * c + 3] + "," + y + ")");
      }

      i.grd = f;
    }

    i.coOp = e.o.v * r.opacity;
  }, CVShapeElement.prototype.renderStroke = function (t, e, r) {
    var i = e.style,
        s = e.d;
    s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i["do"] = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v);
  }, CVShapeElement.prototype.destroy = function () {
    this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
    var t = this.canvasContext;
    t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh);
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
    var t = this.textProperty.currentData;
    this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
    var e = !1;
    t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
    var r = !1;
    t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
    var i,
        s,
        a = this.globalData.fontManager.getFontByName(t.f),
        n = t.l,
        o = this.mHelper;
    this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
    var h,
        l,
        p,
        m,
        f,
        c,
        d,
        u,
        y,
        g,
        v = this.data.singleShape,
        b = t.tr / 1e3 * t.finalSize,
        E = 0,
        x = 0,
        P = !0,
        S = 0;

    for (i = 0; i < s; i += 1) {
      for (l = (h = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), v && n[i].n && (E = -b, x += t.yOffset, x += P ? 1 : 0, P = !1), d = (f = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, n[i].line, E, x), y = createSizedArray(d), c = 0; c < d; c += 1) {
        for (m = f[c].ks.k.i.length, u = f[c].ks.k, g = [], p = 1; p < m; p += 1) {
          1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
        }

        g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[c] = g;
      }

      v && (E += n[i].l, E += b), this.textSpans[S] ? this.textSpans[S].elem = y : this.textSpans[S] = {
        elem: y
      }, S += 1;
    }
  }, CVTextElement.prototype.renderInnerContent = function () {
    var t,
        e,
        r,
        i,
        s,
        a,
        n = this.canvasContext;
    this.finalTransform.mat.props;
    n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
    var o,
        h = this.textAnimator.renderedLetters,
        l = this.textProperty.currentData.l;
    e = l.length;
    var p,
        m,
        f = null,
        c = null,
        d = null;

    for (t = 0; t < e; t += 1) {
      if (!l[t].n) {
        if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
          for (o && o.fc ? f !== o.fc && (f = o.fc, n.fillStyle = o.fc) : f !== this.values.fill && (f = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1) {
            for (a = (m = p[r]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) {
              this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
            }
          }

          this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
        }

        if (this.stroke) {
          for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? c !== o.sc && (c = o.sc, n.strokeStyle = o.sc) : c !== this.values.stroke && (c = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1) {
            for (a = (m = p[r]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) {
              this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
            }
          }

          this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
        }

        o && this.globalData.renderer.restore();
      }
    }
  }, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = {
    checkBlendMode: function checkBlendMode() {},
    initRendererElement: function initRendererElement() {
      this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement);
    },
    createContainerElements: function createContainerElements() {
      this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode();
    },
    renderElement: function renderElement() {
      this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v);
    },
    renderFrame: function renderFrame() {
      this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
    },
    destroy: function destroy() {
      this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null);
    },
    createRenderableComponents: function createRenderableComponents() {
      this.maskManager = new MaskElement(this.data, this, this.globalData);
    },
    addEffects: function addEffects() {},
    setMatte: function setMatte() {}
  }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
    var t;
    this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t);
  }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
    this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement;
  }, HCompElement.prototype.addTo3dContainer = function (t, e) {
    for (var r, i = 0; i < e;) {
      this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
    }

    r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t);
  }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
    var t;
    if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;else {
      t = createNS("svg");
      var e = this.comp.data ? this.comp.data : this.globalData.compSize;
      t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t);
    }
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t;
  }, HShapeElement.prototype.getTransformedPoint = function (t, e) {
    var r,
        i = t.length;

    for (r = 0; r < i; r += 1) {
      e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
    }

    return e;
  }, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
    var r,
        i,
        s,
        a,
        n,
        o = t.sh.v,
        h = t.transformers,
        l = o._length;

    if (!(l <= 1)) {
      for (r = 0; r < l - 1; r += 1) {
        i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, s, a, n, e);
      }

      o.c && (i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, s, a, n, e));
    }
  }, HShapeElement.prototype.checkBounds = function (t, e, r, i, s) {
    this.getBoundsOfCurve(t, e, r, i);
    var a = this.shapeBoundingBox;
    s.x = bm_min(a.left, s.x), s.xMax = bm_max(a.right, s.xMax), s.y = bm_min(a.top, s.y), s.yMax = bm_max(a.bottom, s.yMax);
  }, HShapeElement.prototype.shapeBoundingBox = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }, HShapeElement.prototype.tempBoundingBox = {
    x: 0,
    xMax: 0,
    y: 0,
    yMax: 0,
    width: 0,
    height: 0
  }, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
    for (var s, a, n, o, h, l, p, m = [[t[0], i[0]], [t[1], i[1]]], f = 0; f < 2; ++f) {
      if (a = 6 * t[f] - 12 * e[f] + 6 * r[f], s = -3 * t[f] + 9 * e[f] - 9 * r[f] + 3 * i[f], n = 3 * e[f] - 3 * t[f], a |= 0, n |= 0, 0 !== (s |= 0)) (h = a * a - 4 * n * s) < 0 || (0 < (l = (-a + bm_sqrt(h)) / (2 * s)) && l < 1 && m[f].push(this.calculateF(l, t, e, r, i, f)), 0 < (p = (-a - bm_sqrt(h)) / (2 * s)) && p < 1 && m[f].push(this.calculateF(p, t, e, r, i, f)));else {
        if (0 === a) continue;
        0 < (o = -n / a) && o < 1 && m[f].push(this.calculateF(o, t, e, r, i, f));
      }
    }

    this.shapeBoundingBox.left = bm_min.apply(null, m[0]), this.shapeBoundingBox.top = bm_min.apply(null, m[1]), this.shapeBoundingBox.right = bm_max.apply(null, m[0]), this.shapeBoundingBox.bottom = bm_max.apply(null, m[1]);
  }, HShapeElement.prototype.calculateF = function (t, e, r, i, s, a) {
    return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bm_pow(t, 2) * i[a] + bm_pow(t, 3) * s[a];
  }, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
    var r,
        i = t.length;

    for (r = 0; r < i; r += 1) {
      t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e);
    }
  }, HShapeElement.prototype.currentBoxContains = function (t) {
    return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height;
  }, HShapeElement.prototype.renderInnerContent = function () {
    if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
      var t = this.tempBoundingBox,
          e = 999999;
      if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
      var r = !1;
      this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), (r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)");
    }
  }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
    if (this.isMasked = this.checkMasks(), this.isMasked) {
      this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
      var t = createNS("g");
      this.maskedElement.appendChild(t), this.innerElem = t;
    } else this.renderType = "html", this.innerElem = this.layerElement;

    this.checkParenting();
  }, HTextElement.prototype.buildNewText = function () {
    var t = this.textProperty.currentData;
    this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
    var e = this.innerElem.style;
    e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
    var r,
        i,
        s = this.globalData.fontManager.getFontByName(t.f);
    if (!this.globalData.fontManager.chars) if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", s.fClass) this.innerElem.className = s.fClass;else {
      e.fontFamily = s.fFamily;
      var a = t.fWeight,
          n = t.fStyle;
      e.fontStyle = n, e.fontWeight = a;
    }
    var o,
        h,
        l,
        p = t.l;
    i = p.length;
    var m,
        f = this.mHelper,
        c = "",
        d = 0;

    for (r = 0; r < i; r += 1) {
      if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? l = (h = this.textSpans[d]).children[0] : (h = createTag("div"), (l = createNS("svg")).appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (styleDiv(h = createTag("span")), styleDiv(o = createTag("span")), h.appendChild(o)), this.globalData.fontManager.chars) {
        var u,
            y = this.globalData.fontManager.getCharData(t.finalText[r], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
        if (u = y ? y.data : null, f.reset(), u && u.shapes && (m = u.shapes[0].it, f.scale(t.finalSize / 100, t.finalSize / 100), c = this.createPathShape(f, m), o.setAttribute("d", c)), this.isMasked) this.innerElem.appendChild(o);else {
          if (this.innerElem.appendChild(h), u && u.shapes) {
            document.body.appendChild(l);
            var g = l.getBBox();
            l.setAttribute("width", g.width + 2), l.setAttribute("height", g.height + 2), l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", p[r].yOffset = g.y - 1;
          } else l.setAttribute("width", 1), l.setAttribute("height", 1);

          h.appendChild(l);
        }
      } else o.textContent = p[r].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");

      this.isMasked ? this.textSpans[d] = o : this.textSpans[d] = h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1;
    }

    for (; d < this.textSpans.length;) {
      this.textSpans[d].style.display = "none", d += 1;
    }
  }, HTextElement.prototype.renderInnerContent = function () {
    if (this.data.singleShape) {
      if (!this._isFirstFrame && !this.lettersChangedFlag) return;
      this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)");
    }

    if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
      var t,
          e,
          r,
          i,
          s,
          a = 0,
          n = this.textAnimator.renderedLetters,
          o = this.textProperty.currentData.l;

      for (e = o.length, t = 0; t < e; t += 1) {
        o[t].n ? a += 1 : (i = this.textSpans[t], s = this.textPaths[t], r = n[a], a += 1, r._mdf.m && (this.isMasked ? i.setAttribute("transform", r.m) : i.style.transform = i.style.webkitTransform = r.m), i.style.opacity = r.o, r.sw && r._mdf.sw && s.setAttribute("stroke-width", r.sw), r.sc && r._mdf.sc && s.setAttribute("stroke", r.sc), r.fc && r._mdf.fc && (s.setAttribute("fill", r.fc), s.style.color = r.fc));
      }

      if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
        var h = this.innerElem.getBBox();
        this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));
        this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2, this.currentBBox.h = h.height + 2, this.currentBBox.x = h.x - 1, this.currentBBox.y = h.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)");
      }
    }
  }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
    var t = this.globalData.getAssetsPath(this.assetData),
        e = new Image();
    this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln);
  }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
    var t,
        e,
        r = this.comp.threeDElements.length;

    for (t = 0; t < r; t += 1) {
      "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
  }, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
    var t,
        e,
        r = this._isFirstFrame;
    if (this.hierarchy) for (e = this.hierarchy.length, t = 0; t < e; t += 1) {
      r = this.hierarchy[t].finalTransform.mProp._mdf || r;
    }

    if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
      if (this.mat.reset(), this.hierarchy) for (t = e = this.hierarchy.length - 1; 0 <= t; t -= 1) {
        var i = this.hierarchy[t].finalTransform.mProp;
        this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }

      if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
        var s = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
            a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
            n = [s[0] / a, s[1] / a, s[2] / a],
            o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
            h = Math.atan2(n[1], o),
            l = Math.atan2(n[0], -n[2]);
        this.mat.rotateY(l).rotateX(-h);
      }

      this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
      var p = !this._prevMat.equals(this.mat);

      if ((p || this.pe._mdf) && this.comp.threeDElements) {
        var m;

        for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) {
          "3d" === (m = this.comp.threeDElements[t]).type && (p && (m.container.style.transform = m.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (m.perspectiveElem.style.perspective = m.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
        }

        this.mat.clone(this._prevMat);
      }
    }

    this._isFirstFrame = !1;
  }, HCameraElement.prototype.prepareFrame = function (t) {
    this.prepareProperties(t, !0);
  }, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.initExpressions = function () {}, HCameraElement.prototype.getBaseElement = function () {
    return null;
  }, HEffects.prototype.renderFrame = function () {};

  var animationManager = function () {
    var t = {},
        s = [],
        i = 0,
        a = 0,
        n = 0,
        o = !0,
        h = !1;

    function r(t) {
      for (var e = 0, r = t.target; e < a;) {
        s[e].animation === r && (s.splice(e, 1), e -= 1, a -= 1, r.isPaused || m()), e += 1;
      }
    }

    function l(t, e) {
      if (!t) return null;

      for (var r = 0; r < a;) {
        if (s[r].elem == t && null !== s[r].elem) return s[r].animation;
        r += 1;
      }

      var i = new AnimationItem();
      return f(i, t), i.setData(t, e), i;
    }

    function p() {
      n += 1, d();
    }

    function m() {
      n -= 1;
    }

    function f(t, e) {
      t.addEventListener("destroy", r), t.addEventListener("_active", p), t.addEventListener("_idle", m), s.push({
        elem: e,
        animation: t
      }), a += 1;
    }

    function c(t) {
      var e,
          r = t - i;

      for (e = 0; e < a; e += 1) {
        s[e].animation.advanceTime(r);
      }

      i = t, n && !h ? window.requestAnimationFrame(c) : o = !0;
    }

    function e(t) {
      i = t, window.requestAnimationFrame(c);
    }

    function d() {
      !h && n && o && (window.requestAnimationFrame(e), o = !1);
    }

    return t.registerAnimation = l, t.loadAnimation = function (t) {
      var e = new AnimationItem();
      return f(e, null), e.setParams(t), e;
    }, t.setSpeed = function (t, e) {
      var r;

      for (r = 0; r < a; r += 1) {
        s[r].animation.setSpeed(t, e);
      }
    }, t.setDirection = function (t, e) {
      var r;

      for (r = 0; r < a; r += 1) {
        s[r].animation.setDirection(t, e);
      }
    }, t.play = function (t) {
      var e;

      for (e = 0; e < a; e += 1) {
        s[e].animation.play(t);
      }
    }, t.pause = function (t) {
      var e;

      for (e = 0; e < a; e += 1) {
        s[e].animation.pause(t);
      }
    }, t.stop = function (t) {
      var e;

      for (e = 0; e < a; e += 1) {
        s[e].animation.stop(t);
      }
    }, t.togglePause = function (t) {
      var e;

      for (e = 0; e < a; e += 1) {
        s[e].animation.togglePause(t);
      }
    }, t.searchAnimations = function (t, e, r) {
      var i,
          s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
          a = s.length;

      for (i = 0; i < a; i += 1) {
        r && s[i].setAttribute("data-bm-type", r), l(s[i], t);
      }

      if (e && 0 === a) {
        r || (r = "svg");
        var n = document.getElementsByTagName("body")[0];
        n.innerHTML = "";
        var o = createTag("div");
        o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), l(o, t);
      }
    }, t.resize = function () {
      var t;

      for (t = 0; t < a; t += 1) {
        s[t].animation.resize();
      }
    }, t.goToAndStop = function (t, e, r) {
      var i;

      for (i = 0; i < a; i += 1) {
        s[i].animation.goToAndStop(t, e, r);
      }
    }, t.destroy = function (t) {
      var e;

      for (e = a - 1; 0 <= e; e -= 1) {
        s[e].animation.destroy(t);
      }
    }, t.freeze = function () {
      h = !0;
    }, t.unfreeze = function () {
      h = !1, d();
    }, t.getRegisteredAnimations = function () {
      var t,
          e = s.length,
          r = [];

      for (t = 0; t < e; t += 1) {
        r.push(s[t].animation);
      }

      return r;
    }, t;
  }(),
      AnimationItem = function AnimationItem() {
    this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader();
  };

  extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
    t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
    var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";

    switch (e) {
      case "canvas":
        this.renderer = new CanvasRenderer(this, t.rendererSettings);
        break;

      case "svg":
        this.renderer = new SVGRenderer(this, t.rendererSettings);
        break;

      default:
        this.renderer = new HybridRenderer(this, t.rendererSettings);
    }

    this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && ("json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), t.path += "data.json"), -1 != t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
      this.trigger("data_failed");
    }.bind(this)));
  }, AnimationItem.prototype.setData = function (t, e) {
    var r = {
      wrapper: t,
      animationData: e ? "object" == _typeof(e) ? e : JSON.parse(e) : null
    },
        i = t.attributes;
    r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
    var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
    "" === s || (r.loop = "false" !== s && ("true" === s || parseInt(s)));
    var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
    r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r);
  }, AnimationItem.prototype.includeLayers = function (t) {
    t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
    var e,
        r,
        i = this.animationData.layers,
        s = i.length,
        a = t.layers,
        n = a.length;

    for (r = 0; r < n; r += 1) {
      for (e = 0; e < s;) {
        if (i[e].id == a[r].id) {
          i[e] = a[r];
          break;
        }

        e += 1;
      }
    }

    if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (s = t.assets.length, e = 0; e < s; e += 1) {
      this.animationData.assets.push(t.assets[e]);
    }
    this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment();
  }, AnimationItem.prototype.loadNextSegment = function () {
    var t = this.animationData.segments;
    if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
    var e = t.shift();
    this.timeCompleted = e.time * this.frameRate;
    var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
    this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function () {
      this.trigger("data_failed");
    }.bind(this));
  }, AnimationItem.prototype.loadSegments = function () {
    this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
  }, AnimationItem.prototype.imagesLoaded = function () {
    this.trigger("loaded_images"), this.checkLoaded();
  }, AnimationItem.prototype.preloadImages = function () {
    this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
  }, AnimationItem.prototype.configAnimation = function (t) {
    this.renderer && (this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.renderer.searchExtraCompositions(t.assets), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded());
  }, AnimationItem.prototype.waitForFontsLoaded = function () {
    this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
  }, AnimationItem.prototype.checkLoaded = function () {
    this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
      this.trigger("DOMLoaded");
    }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play());
  }, AnimationItem.prototype.resize = function () {
    this.renderer.updateContainerSize();
  }, AnimationItem.prototype.setSubframe = function (t) {
    this.subframeEnabled = !!t;
  }, AnimationItem.prototype.gotoFrame = function () {
    this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
  }, AnimationItem.prototype.renderFrame = function () {
    !1 !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame);
  }, AnimationItem.prototype.play = function (t) {
    t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")));
  }, AnimationItem.prototype.pause = function (t) {
    t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"));
  }, AnimationItem.prototype.togglePause = function (t) {
    t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause());
  }, AnimationItem.prototype.stop = function (t) {
    t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
  }, AnimationItem.prototype.goToAndStop = function (t, e, r) {
    r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
  }, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
    this.goToAndStop(t, e, r), this.play();
  }, AnimationItem.prototype.advanceTime = function (t) {
    if (!0 !== this.isPaused && !1 !== this.isLoaded) {
      var e = this.currentRawFrame + t * this.frameModifier,
          r = !1;
      e >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
    }
  }, AnimationItem.prototype.adjustSegment = function (t, e) {
    this.playCount = 0, t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart");
  }, AnimationItem.prototype.setSegment = function (t, e) {
    var r = -1;
    this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0);
  }, AnimationItem.prototype.playSegments = function (t, e) {
    if (e && (this.segments.length = 0), "object" == _typeof(t[0])) {
      var r,
          i = t.length;

      for (r = 0; r < i; r += 1) {
        this.segments.push(t[r]);
      }
    } else this.segments.push(t);

    this.segments.length && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
  }, AnimationItem.prototype.resetSegments = function (t) {
    this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
  }, AnimationItem.prototype.checkSegments = function (t) {
    return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
  }, AnimationItem.prototype.destroy = function (t) {
    t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null);
  }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
    this.currentRawFrame = t, this.gotoFrame();
  }, AnimationItem.prototype.setSpeed = function (t) {
    this.playSpeed = t, this.updaFrameModifier();
  }, AnimationItem.prototype.setDirection = function (t) {
    this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
  }, AnimationItem.prototype.updaFrameModifier = function () {
    this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
  }, AnimationItem.prototype.getPath = function () {
    return this.path;
  }, AnimationItem.prototype.getAssetsPath = function (t) {
    var e = "";
    if (t.e) e = t.p;else if (this.assetsPath) {
      var r = t.p;
      -1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r;
    } else e = this.path, e += t.u ? t.u : "", e += t.p;
    return e;
  }, AnimationItem.prototype.getAssetData = function (t) {
    for (var e = 0, r = this.assets.length; e < r;) {
      if (t == this.assets[e].id) return this.assets[e];
      e += 1;
    }
  }, AnimationItem.prototype.hide = function () {
    this.renderer.hide();
  }, AnimationItem.prototype.show = function () {
    this.renderer.show();
  }, AnimationItem.prototype.getDuration = function (t) {
    return t ? this.totalFrames : this.totalFrames / this.frameRate;
  }, AnimationItem.prototype.trigger = function (t) {
    if (this._cbs && this._cbs[t]) switch (t) {
      case "enterFrame":
        this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult));
        break;

      case "loopComplete":
        this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
        break;

      case "complete":
        this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
        break;

      case "segmentStart":
        this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
        break;

      case "destroy":
        this.triggerEvent(t, new BMDestroyEvent(t, this));
        break;

      default:
        this.triggerEvent(t);
    }
    "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
  };
  var Expressions = (XV = {}, XV.initExpressions = function (t) {
    var e = 0,
        r = [];

    function i() {
      var t,
          e = r.length;

      for (t = 0; t < e; t += 1) {
        r[t].release();
      }

      r.length = 0;
    }

    t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
      e += 1;
    }, t.renderer.globalData.popExpression = function () {
      0 == (e -= 1) && i();
    }, t.renderer.globalData.registerExpressionProperty = function (t) {
      -1 === r.indexOf(t) && r.push(t);
    };
  }, XV),
      XV;
  expressionsPlugin = Expressions;

  var ExpressionManager = function () {
    var ob = {},
        Math = BMMath,
        window = null,
        document = null;

    function $bm_isInstanceOfArray(t) {
      return t.constructor === Array || t.constructor === Float32Array;
    }

    function isNumerable(t, e) {
      return "number" === t || "boolean" === t || "string" === t || e instanceof Number;
    }

    function $bm_neg(t) {
      var e = _typeof(t);

      if ("number" === e || "boolean" === e || t instanceof Number) return -t;

      if ($bm_isInstanceOfArray(t)) {
        var r,
            i = t.length,
            s = [];

        for (r = 0; r < i; r += 1) {
          s[r] = -t[r];
        }

        return s;
      }
    }

    var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
        easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
        easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

    function sum(t, e) {
      var r = _typeof(t),
          i = _typeof(e);

      if ("string" === r || "string" === i) return t + e;
      if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
      if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
      if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;

      if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
        for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) {
          ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
        }

        return o;
      }

      return 0;
    }

    var add = sum;

    function sub(t, e) {
      var r = _typeof(t),
          i = _typeof(e);

      if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t)), "string" === i && (e = parseInt(e)), t - e;
      if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
      if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;

      if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
        for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) {
          ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
        }

        return o;
      }

      return 0;
    }

    function mul(t, e) {
      var r,
          i,
          s,
          a = _typeof(t),
          n = _typeof(e);

      if (isNumerable(a, t) && isNumerable(n, e)) return t * e;

      if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
        for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
          r[i] = t[i] * e;
        }

        return r;
      }

      if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
        for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
          r[i] = t * e[i];
        }

        return r;
      }

      return 0;
    }

    function div(t, e) {
      var r,
          i,
          s,
          a = _typeof(t),
          n = _typeof(e);

      if (isNumerable(a, t) && isNumerable(n, e)) return t / e;

      if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
        for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
          r[i] = t[i] / e;
        }

        return r;
      }

      if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
        for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) {
          r[i] = t / e[i];
        }

        return r;
      }

      return 0;
    }

    function mod(t, e) {
      return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e;
    }

    function clamp(t, e, r) {
      if (r < e) {
        var i = r;
        r = e, e = i;
      }

      return Math.min(Math.max(t, e), r);
    }

    function radiansToDegrees(t) {
      return t / degToRads;
    }

    var radians_to_degrees = radiansToDegrees;

    function degreesToRadians(t) {
      return t * degToRads;
    }

    var degrees_to_radians = radiansToDegrees,
        helperLengthArray = [0, 0, 0, 0, 0, 0];

    function length(t, e) {
      if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
      e || (e = helperLengthArray);
      var r,
          i = Math.min(t.length, e.length),
          s = 0;

      for (r = 0; r < i; r += 1) {
        s += Math.pow(e[r] - t[r], 2);
      }

      return Math.sqrt(s);
    }

    function normalize(t) {
      return div(t, length(t));
    }

    function rgbToHsl(t) {
      var e,
          r,
          i = t[0],
          s = t[1],
          a = t[2],
          n = Math.max(i, s, a),
          o = Math.min(i, s, a),
          h = (n + o) / 2;
      if (n == o) e = r = 0;else {
        var l = n - o;

        switch (r = .5 < h ? l / (2 - n - o) : l / (n + o), n) {
          case i:
            e = (s - a) / l + (s < a ? 6 : 0);
            break;

          case s:
            e = (a - i) / l + 2;
            break;

          case a:
            e = (i - s) / l + 4;
        }

        e /= 6;
      }
      return [e, r, h, t[3]];
    }

    function hue2rgb(t, e, r) {
      return r < 0 && (r += 1), 1 < r && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
    }

    function hslToRgb(t) {
      var e,
          r,
          i,
          s = t[0],
          a = t[1],
          n = t[2];
      if (0 === a) e = r = i = n;else {
        var o = n < .5 ? n * (1 + a) : n + a - n * a,
            h = 2 * n - o;
        e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3);
      }
      return [e, r, i, t[3]];
    }

    function linear(t, e, r, i, s) {
      if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
        var a = r;
        r = e, e = a;
      }

      if (t <= e) return i;
      if (r <= t) return s;
      var n = r === e ? 0 : (t - e) / (r - e);
      if (!i.length) return i + (s - i) * n;
      var o,
          h = i.length,
          l = createTypedArray("float32", h);

      for (o = 0; o < h; o += 1) {
        l[o] = i[o] + (s[o] - i[o]) * n;
      }

      return l;
    }

    function random(t, e) {
      if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
        var r,
            i = e.length;
        t || (t = createTypedArray("float32", i));
        var s = createTypedArray("float32", i),
            a = BMMath.random();

        for (r = 0; r < i; r += 1) {
          s[r] = t[r] + a * (e[r] - t[r]);
        }

        return s;
      }

      return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
    }

    function createPath(t, e, r, i) {
      var s,
          a = t.length,
          n = shape_pool.newElement();
      n.setPathData(!!i, a);
      var o,
          h,
          l = [0, 0];

      for (s = 0; s < a; s += 1) {
        o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
      }

      return n;
    }

    function initiateExpression(elem, data, property) {
      var val = data.x,
          needsVelocity = /velocity(?![\w\d])/.test(val),
          _needsRandom = -1 !== val.indexOf("random"),
          elemType = elem.data.ty,
          transform,
          $bm_transform,
          content,
          effect,
          thisProperty = property;

      thisProperty.valueAtTime = thisProperty.getValueAtTime, elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
      var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
          outPoint = elem.data.op / elem.comp.globalData.frameRate,
          width = elem.data.sw ? elem.data.sw : 0,
          height = elem.data.sh ? elem.data.sh : 0,
          name = elem.data.nm,
          loopIn,
          loop_in,
          loopOut,
          loop_out,
          toWorld,
          fromWorld,
          fromComp,
          toComp,
          fromCompToSurface,
          position,
          rotation,
          anchorPoint,
          scale,
          thisLayer,
          thisComp,
          mask,
          valueAtTime,
          velocityAtTime,
          __expression_functions = [],
          scoped_bm_rt;

      if (data.xf) {
        var i,
            len = data.xf.length;

        for (i = 0; i < len; i += 1) {
          __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())");
        }
      }

      var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
          numKeys = property.kf ? data.k.length : 0,
          active = !this.data || !0 !== this.data.hd,
          wiggle = function (t, e) {
        var r,
            i,
            s = this.pv.length ? this.pv.length : 1,
            a = createTypedArray("float32", s);
        var n = Math.floor(5 * time);

        for (i = r = 0; r < n;) {
          for (i = 0; i < s; i += 1) {
            a[i] += -e + 2 * e * BMMath.random();
          }

          r += 1;
        }

        var o = 5 * time,
            h = o - Math.floor(o),
            l = createTypedArray("float32", s);

        if (1 < s) {
          for (i = 0; i < s; i += 1) {
            l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
          }

          return l;
        }

        return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
      }.bind(this);

      function loopInDuration(t, e) {
        return loopIn(t, e, !0);
      }

      function loopOutDuration(t, e) {
        return loopOut(t, e, !0);
      }

      thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
      var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
          time,
          velocity,
          value,
          text,
          textIndex,
          textTotal,
          selectorValue;

      function lookAt(t, e) {
        var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
            i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
        return [-Math.atan2(r[1], r[2]) / degToRads, i, 0];
      }

      function easeOut(t, e, r, i, s) {
        return applyEase(easeOutBez, t, e, r, i, s);
      }

      function easeIn(t, e, r, i, s) {
        return applyEase(easeInBez, t, e, r, i, s);
      }

      function ease(t, e, r, i, s) {
        return applyEase(easeInOutBez, t, e, r, i, s);
      }

      function applyEase(t, e, r, i, s, a) {
        void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r);
        var n = t(e = 1 < e ? 1 : e < 0 ? 0 : e);

        if ($bm_isInstanceOfArray(s)) {
          var o,
              h = s.length,
              l = createTypedArray("float32", h);

          for (o = 0; o < h; o += 1) {
            l[o] = (a[o] - s[o]) * n + s[o];
          }

          return l;
        }

        return (a - s) * n + s;
      }

      function nearestKey(t) {
        var e,
            r,
            i,
            s = data.k.length;
        if (data.k.length && "number" != typeof data.k[0]) {
          if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;else {
            for (e = 0; e < s - 1; e += 1) {
              if (t === data.k[e].t) {
                r = e + 1, i = data.k[e].t;
                break;
              }

              if (t > data.k[e].t && t < data.k[e + 1].t) {
                i = t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, data.k[e + 1].t) : (r = e + 1, data.k[e].t);
                break;
              }
            }

            -1 === r && (r = e + 1, i = data.k[e].t);
          }
        } else i = r = 0;
        var a = {};
        return a.index = r, a.time = i / elem.comp.globalData.frameRate, a;
      }

      function key(t) {
        var e, r, i, s;
        if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);

        for (t -= 1, e = {
          time: data.k[t].t / elem.comp.globalData.frameRate
        }, i = (s = t !== data.k.length - 1 || data.k[t].h ? data.k[t].s : data.k[t - 1].e).length, r = 0; r < i; r += 1) {
          e[r] = s[r];
        }

        return e;
      }

      function framesToTime(t, e) {
        return e || (e = elem.comp.globalData.frameRate), t / e;
      }

      function timeToFrames(t, e) {
        return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
      }

      function seedRandom(t) {
        BMMath.seedrandom(randSeed + t);
      }

      function sourceRectAtTime() {
        return elem.sourceRectAtTime();
      }

      function substring(t, e) {
        return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : "";
      }

      function substr(t, e) {
        return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : "";
      }

      var index = elem.data.ind,
          hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
          parent,
          randSeed = Math.floor(1e6 * Math.random()),
          globalData = elem.globalData;

      function executeExpression(t) {
        return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), ($bm_transform = transform) && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt);
      }

      return executeExpression;
    }

    return ob.initiateExpression = initiateExpression, ob;
  }();

  !function () {
    function o() {
      return this.pv;
    }

    function h(t, e, r) {
      if (!this.k || !this.keyframes) return this.pv;
      t = t ? t.toLowerCase() : "";
      var i,
          s,
          a,
          n,
          o,
          h = this.comp.renderedFrame,
          l = this.keyframes,
          p = l[l.length - 1].t;
      if (h <= p) return this.pv;

      if (r ? s = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
        if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0);
      } else {
        if ("offset" === t) {
          var m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
              f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
              d = Math.floor((h - s) / i);

          if (this.pv.length) {
            for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) {
              o[a] = (f[a] - m[a]) * d + c[a];
            }

            return o;
          }

          return (f - m) * d + c;
        }

        if ("continue" === t) {
          var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);

          if (this.pv.length) {
            for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) {
              o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
            }

            return o;
          }

          return u + (h - p) / .001 * (u - y);
        }
      }

      return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0);
    }

    function l(t, e, r) {
      if (!this.k) return this.pv;
      t = t ? t.toLowerCase() : "";
      var i,
          s,
          a,
          n,
          o,
          h = this.comp.renderedFrame,
          l = this.keyframes,
          p = l[0].t;
      if (p <= h) return this.pv;

      if (r ? s = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
        if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0);
      } else {
        if ("offset" === t) {
          var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
              d = Math.floor((p - h) / i) + 1;

          if (this.pv.length) {
            for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) {
              o[a] = c[a] - (f[a] - m[a]) * d;
            }

            return o;
          }

          return c - (f - m) * d;
        }

        if ("continue" === t) {
          var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
              y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);

          if (this.pv.length) {
            for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) {
              o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
            }

            return o;
          }

          return u + (u - y) * (p - h) / .001;
        }
      }

      return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0);
    }

    function p(t) {
      return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value;
    }

    function m(t) {
      if (void 0 !== this.vel) return this.vel;
      var e,
          r,
          i = this.getValueAtTime(t),
          s = this.getValueAtTime(t + -.001);
      if (i.length) for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) {
        e[r] = (s[r] - i[r]) / -.001;
      } else e = (s - i) / -.001;
      return e;
    }

    function f(t) {
      this.propertyGroup = t;
    }

    function c(t, e, r) {
      e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)));
    }

    var i = function () {
      function r(t, e) {
        return this.textIndex = t + 1, this.textTotal = e, this.getValue(), this.v;
      }

      return function (t, e) {
        this.pv = 1, this.comp = t.comp, this.elem = t, this.mult = .01, this.propType = "textSelector", this.textTotal = e.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], c.bind(this)(t, e, this), this.getMult = r, this.getVelocityAtTime = m, this.kf ? this.getValueAtTime = p.bind(this) : this.getValueAtTime = o.bind(this), this.setGroupProperty = f;
      };
    }(),
        s = TransformPropertyFactory.getTransformProperty;

    TransformPropertyFactory.getTransformProperty = function (t, e, r) {
      var i = s(t, e, r);
      return i.dynamicProperties.length ? i.getValueAtTime = function (t) {
        console.warn("Transform at time not supported");
      }.bind(i) : i.getValueAtTime = function (t) {}.bind(i), i.setGroupProperty = f, i;
    };

    var d = PropertyFactory.getProp;

    PropertyFactory.getProp = function (t, e, r, i, s) {
      var a = d(t, e, r, i, s);
      a.kf ? a.getValueAtTime = p.bind(a) : a.getValueAtTime = o.bind(a), a.setGroupProperty = f, a.loopOut = h, a.loopIn = l, a.getVelocityAtTime = m.bind(a), a.getSpeedAtTime = function (t) {
        var e = this.getValueAtTime(t),
            r = this.getValueAtTime(t + -.01),
            i = 0;

        if (e.length) {
          var s;

          for (s = 0; s < e.length; s += 1) {
            i += Math.pow(r[s] - e[s], 2);
          }

          i = 100 * Math.sqrt(i);
        } else i = 0;

        return i;
      }.bind(a), a.numKeys = 1 === e.a ? e.k.length : 0, a.propertyIndex = e.ix;
      var n = 0;
      return 0 !== r && (n = createTypedArray("float32", 1 === e.a ? e.k[0].s.length : e.k.length)), a._cachingAtTime = {
        lastFrame: initialDefaultFrame,
        lastIndex: 0,
        value: n
      }, c(t, e, a), a.k && s.addDynamicProperty(a), a;
    };

    var t = ShapePropertyFactory.getConstructorFunction(),
        e = ShapePropertyFactory.getKeyframedConstructorFunction();

    function r() {}

    r.prototype = {
      vertices: function vertices(t, e) {
        this.k && this.getValue();
        var r = this.v;
        void 0 !== e && (r = this.getValueAtTime(e, 0));
        var i,
            s = r._length,
            a = r[t],
            n = r.v,
            o = createSizedArray(s);

        for (i = 0; i < s; i += 1) {
          o[i] = "i" === t || "o" === t ? [a[i][0] - n[i][0], a[i][1] - n[i][1]] : [a[i][0], a[i][1]];
        }

        return o;
      },
      points: function points(t) {
        return this.vertices("v", t);
      },
      inTangents: function inTangents(t) {
        return this.vertices("i", t);
      },
      outTangents: function outTangents(t) {
        return this.vertices("o", t);
      },
      isClosed: function isClosed() {
        return this.v.c;
      },
      pointOnPath: function pointOnPath(t, e) {
        var r = this.v;
        void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));

        for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
          if (l + a[o].addedLength > n) {
            var p = o,
                m = r.c && o === h - 1 ? 0 : o + 1,
                f = (n - l) / a[o].addedLength;
            i = bez.getPointInSegment(r.v[p], r.v[m], r.o[p], r.i[m], f, a[o]);
            break;
          }

          l += a[o].addedLength, o += 1;
        }

        return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i;
      },
      vectorOnPath: function vectorOnPath(t, e, r) {
        t = 1 == t ? this.v.c ? 0 : .999 : t;
        var i = this.pointOnPath(t, e),
            s = this.pointOnPath(t + .001, e),
            a = s[0] - i[0],
            n = s[1] - i[1],
            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
        return "tangent" === r ? [a / o, n / o] : [-n / o, a / o];
      },
      tangentOnPath: function tangentOnPath(t, e) {
        return this.vectorOnPath(t, e, "tangent");
      },
      normalOnPath: function normalOnPath(t, e) {
        return this.vectorOnPath(t, e, "normal");
      },
      setGroupProperty: f,
      getValueAtTime: o
    }, extendPrototype([r], t), extendPrototype([r], e), e.prototype.getValueAtTime = function (t) {
      return this._cachingAtTime || (this._cachingAtTime = {
        shapeValue: shape_pool.clone(this.pv),
        lastIndex: 0,
        lastTime: initialDefaultFrame
      }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
    }, e.prototype.initiateExpression = ExpressionManager.initiateExpression;
    var n = ShapePropertyFactory.getShapeProp;

    ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
      var a = n(t, e, r, i, s);
      return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? c(t, e.pt, a) : 4 === r && c(t, e.ks, a), a.k && t.addDynamicProperty(a), a;
    };

    var a = TextSelectorProp.getTextSelectorProp;

    TextSelectorProp.getTextSelectorProp = function (t, e, r) {
      return 1 === e.t ? new i(t, e, r) : a(t, e, r);
    };
  }(), TextProperty.prototype.getExpressionValue = function (t, e) {
    var r = this.calculateExpression(e);
    if (t.t === r) return t;
    var i = {};
    return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i;
  }, TextProperty.prototype.searchProperty = function () {
    var t = this.searchKeyframes(),
        e = this.searchExpressions();
    return this.kf = t || e, this.kf;
  }, TextProperty.prototype.searchExpressions = function () {
    if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0;
  };

  var ShapeExpressionInterface = function () {
    function m(t, e, r) {
      var i,
          s = [],
          a = t ? t.length : 0;

      for (i = 0; i < a; i += 1) {
        "gr" == t[i].ty ? s.push(n(t[i], e[i], r)) : "fl" == t[i].ty ? s.push(o(t[i], e[i], r)) : "st" == t[i].ty ? s.push(h(t[i], e[i], r)) : "tm" == t[i].ty ? s.push(l(t[i], e[i], r)) : "tr" == t[i].ty || ("el" == t[i].ty ? s.push(p(t[i], e[i], r)) : "sr" == t[i].ty ? s.push(f(t[i], e[i], r)) : "sh" == t[i].ty ? s.push(y(t[i], e[i], r)) : "rc" == t[i].ty ? s.push(c(t[i], e[i], r)) : "rd" == t[i].ty ? s.push(d(t[i], e[i], r)) : "rp" == t[i].ty && s.push(u(t[i], e[i], r)));
      }

      return s;
    }

    function n(t, e, r) {
      var i = function i(t) {
        switch (t) {
          case "ADBE Vectors Group":
          case "Contents":
          case 2:
            return i.content;

          default:
            return i.transform;
        }
      };

      i.propertyGroup = function (t) {
        return 1 === t ? i : r(t - 1);
      };

      var s,
          a,
          n,
          o,
          h,
          l = (s = t, a = e, n = i.propertyGroup, (h = function h(t) {
        for (var e = 0, r = o.length; e < r;) {
          if (o[e]._name === t || o[e].mn === t || o[e].propertyIndex === t || o[e].ix === t || o[e].ind === t) return o[e];
          e += 1;
        }

        if ("number" == typeof t) return o[t - 1];
      }).propertyGroup = function (t) {
        return 1 === t ? h : n(t - 1);
      }, o = m(s.it, a.it, h.propertyGroup), h.numProperties = o.length, h.propertyIndex = s.cix, h._name = s.nm, h),
          p = function (e, t, r) {
        function i(t) {
          return 1 == t ? s : r(--t);
        }

        t.transform.mProps.o.setGroupProperty(i), t.transform.mProps.p.setGroupProperty(i), t.transform.mProps.a.setGroupProperty(i), t.transform.mProps.s.setGroupProperty(i), t.transform.mProps.r.setGroupProperty(i), t.transform.mProps.sk && (t.transform.mProps.sk.setGroupProperty(i), t.transform.mProps.sa.setGroupProperty(i));

        function s(t) {
          return e.a.ix === t || "Anchor Point" === t ? s.anchorPoint : e.o.ix === t || "Opacity" === t ? s.opacity : e.p.ix === t || "Position" === t ? s.position : e.r.ix === t || "Rotation" === t || "ADBE Vector Rotation" === t ? s.rotation : e.s.ix === t || "Scale" === t ? s.scale : e.sk && e.sk.ix === t || "Skew" === t ? s.skew : e.sa && e.sa.ix === t || "Skew Axis" === t ? s.skewAxis : void 0;
        }

        return t.transform.op.setGroupProperty(i), Object.defineProperties(s, {
          opacity: {
            get: ExpressionPropertyInterface(t.transform.mProps.o)
          },
          position: {
            get: ExpressionPropertyInterface(t.transform.mProps.p)
          },
          anchorPoint: {
            get: ExpressionPropertyInterface(t.transform.mProps.a)
          },
          scale: {
            get: ExpressionPropertyInterface(t.transform.mProps.s)
          },
          rotation: {
            get: ExpressionPropertyInterface(t.transform.mProps.r)
          },
          skew: {
            get: ExpressionPropertyInterface(t.transform.mProps.sk)
          },
          skewAxis: {
            get: ExpressionPropertyInterface(t.transform.mProps.sa)
          },
          _name: {
            value: e.nm
          }
        }), s.ty = "tr", s.mn = e.mn, s;
      }(t.it[t.it.length - 1], e.it[e.it.length - 1], i.propertyGroup);

      return i.content = l, i.transform = p, Object.defineProperty(i, "_name", {
        get: function get() {
          return t.nm;
        }
      }), i.numProperties = t.np, i.propertyIndex = t.ix, i.nm = t.nm, i.mn = t.mn, i;
    }

    function o(t, e, r) {
      function i(t) {
        return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0;
      }

      return Object.defineProperties(i, {
        color: {
          get: ExpressionPropertyInterface(e.c)
        },
        opacity: {
          get: ExpressionPropertyInterface(e.o)
        },
        _name: {
          value: t.nm
        },
        mn: {
          value: t.mn
        }
      }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i;
    }

    function h(t, e, r) {
      function i(t) {
        return 1 === t ? ob : r(t - 1);
      }

      function s(t) {
        return 1 === t ? h : i(t - 1);
      }

      var a,
          n,
          o = t.d ? t.d.length : 0,
          h = {};

      for (a = 0; a < o; a += 1) {
        n = a, Object.defineProperty(h, t.d[n].nm, {
          get: ExpressionPropertyInterface(e.d.dataProps[n].p)
        }), e.d.dataProps[a].p.setGroupProperty(s);
      }

      function l(t) {
        return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0;
      }

      return Object.defineProperties(l, {
        color: {
          get: ExpressionPropertyInterface(e.c)
        },
        opacity: {
          get: ExpressionPropertyInterface(e.o)
        },
        strokeWidth: {
          get: ExpressionPropertyInterface(e.w)
        },
        dash: {
          get: function get() {
            return h;
          }
        },
        _name: {
          value: t.nm
        },
        mn: {
          value: t.mn
        }
      }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), l;
    }

    function l(e, t, r) {
      function i(t) {
        return 1 == t ? s : r(--t);
      }

      function s(t) {
        return t === e.e.ix || "End" === t || "end" === t ? s.end : t === e.s.ix ? s.start : t === e.o.ix ? s.offset : void 0;
      }

      return s.propertyIndex = e.ix, t.s.setGroupProperty(i), t.e.setGroupProperty(i), t.o.setGroupProperty(i), s.propertyIndex = e.ix, Object.defineProperties(s, {
        start: {
          get: ExpressionPropertyInterface(t.s)
        },
        end: {
          get: ExpressionPropertyInterface(t.e)
        },
        offset: {
          get: ExpressionPropertyInterface(t.o)
        },
        _name: {
          value: e.nm
        }
      }), s.mn = e.mn, s;
    }

    function p(e, t, r) {
      function i(t) {
        return 1 == t ? a : r(--t);
      }

      a.propertyIndex = e.ix;
      var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;

      function a(t) {
        return e.p.ix === t ? a.position : e.s.ix === t ? a.size : void 0;
      }

      return s.s.setGroupProperty(i), s.p.setGroupProperty(i), Object.defineProperties(a, {
        size: {
          get: ExpressionPropertyInterface(s.s)
        },
        position: {
          get: ExpressionPropertyInterface(s.p)
        },
        _name: {
          value: e.nm
        }
      }), a.mn = e.mn, a;
    }

    function f(e, t, r) {
      function i(t) {
        return 1 == t ? a : r(--t);
      }

      var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;

      function a(t) {
        return e.p.ix === t ? a.position : e.r.ix === t ? a.rotation : e.pt.ix === t ? a.points : e.or.ix === t || "ADBE Vector Star Outer Radius" === t ? a.outerRadius : e.os.ix === t ? a.outerRoundness : !e.ir || e.ir.ix !== t && "ADBE Vector Star Inner Radius" !== t ? e.is && e.is.ix === t ? a.innerRoundness : void 0 : a.innerRadius;
      }

      return a.propertyIndex = e.ix, s.or.setGroupProperty(i), s.os.setGroupProperty(i), s.pt.setGroupProperty(i), s.p.setGroupProperty(i), s.r.setGroupProperty(i), e.ir && (s.ir.setGroupProperty(i), s.is.setGroupProperty(i)), Object.defineProperties(a, {
        position: {
          get: ExpressionPropertyInterface(s.p)
        },
        rotation: {
          get: ExpressionPropertyInterface(s.r)
        },
        points: {
          get: ExpressionPropertyInterface(s.pt)
        },
        outerRadius: {
          get: ExpressionPropertyInterface(s.or)
        },
        outerRoundness: {
          get: ExpressionPropertyInterface(s.os)
        },
        innerRadius: {
          get: ExpressionPropertyInterface(s.ir)
        },
        innerRoundness: {
          get: ExpressionPropertyInterface(s.is)
        },
        _name: {
          value: e.nm
        }
      }), a.mn = e.mn, a;
    }

    function c(e, t, r) {
      function i(t) {
        return 1 == t ? a : r(--t);
      }

      var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;

      function a(t) {
        return e.p.ix === t ? a.position : e.r.ix === t ? a.roundness : e.s.ix === t || "Size" === t || "ADBE Vector Rect Size" === t ? a.size : void 0;
      }

      return a.propertyIndex = e.ix, s.p.setGroupProperty(i), s.s.setGroupProperty(i), s.r.setGroupProperty(i), Object.defineProperties(a, {
        position: {
          get: ExpressionPropertyInterface(s.p)
        },
        roundness: {
          get: ExpressionPropertyInterface(s.r)
        },
        size: {
          get: ExpressionPropertyInterface(s.s)
        },
        _name: {
          value: e.nm
        }
      }), a.mn = e.mn, a;
    }

    function d(e, t, r) {
      var i = t;

      function s(t) {
        if (e.r.ix === t || "Round Corners 1" === t) return s.radius;
      }

      return s.propertyIndex = e.ix, i.rd.setGroupProperty(function (t) {
        return 1 == t ? s : r(--t);
      }), Object.defineProperties(s, {
        radius: {
          get: ExpressionPropertyInterface(i.rd)
        },
        _name: {
          value: e.nm
        }
      }), s.mn = e.mn, s;
    }

    function u(e, t, r) {
      function i(t) {
        return 1 == t ? a : r(--t);
      }

      var s = t;

      function a(t) {
        return e.c.ix === t || "Copies" === t ? a.copies : e.o.ix === t || "Offset" === t ? a.offset : void 0;
      }

      return a.propertyIndex = e.ix, s.c.setGroupProperty(i), s.o.setGroupProperty(i), Object.defineProperties(a, {
        copies: {
          get: ExpressionPropertyInterface(s.c)
        },
        offset: {
          get: ExpressionPropertyInterface(s.o)
        },
        _name: {
          value: e.nm
        }
      }), a.mn = e.mn, a;
    }

    function y(t, e, r) {
      var i = e.sh;

      function s(t) {
        if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path;
      }

      return i.setGroupProperty(function (t) {
        return 1 == t ? s : r(--t);
      }), Object.defineProperties(s, {
        path: {
          get: function get() {
            return i.k && i.getValue(), i;
          }
        },
        shape: {
          get: function get() {
            return i.k && i.getValue(), i;
          }
        },
        _name: {
          value: t.nm
        },
        ix: {
          value: t.ix
        },
        mn: {
          value: t.mn
        }
      }), s;
    }

    return function (t, e, r) {
      var i;

      function s(t) {
        if ("number" == typeof t) return i[t - 1];

        for (var e = 0, r = i.length; e < r;) {
          if (i[e]._name === t) return i[e];
          e += 1;
        }
      }

      return s.propertyGroup = r, i = m(t, e, s), s;
    };
  }(),
      TextExpressionInterface = function TextExpressionInterface(e) {
    var r;

    function t() {}

    return Object.defineProperty(t, "sourceText", {
      get: function get() {
        e.textProperty.getValue();
        var t = e.textProperty.currentData.t;
        return void 0 !== t && (e.textProperty.currentData.t = void 0, (r = new String(t)).value = t || new String(t)), r;
      }
    }), t;
  },
      LayerExpressionInterface = function () {
    function s(t, e) {
      var r = new Matrix();

      if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
        var i,
            s = this._elem.hierarchy.length;

        for (i = 0; i < s; i += 1) {
          this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
        }

        return r.applyToPointArray(t[0], t[1], t[2] || 0);
      }

      return r.applyToPointArray(t[0], t[1], t[2] || 0);
    }

    function a(t, e) {
      var r = new Matrix();

      if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
        var i,
            s = this._elem.hierarchy.length;

        for (i = 0; i < s; i += 1) {
          this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
        }

        return r.inversePoint(t);
      }

      return r.inversePoint(t);
    }

    function n(t) {
      var e = new Matrix();

      if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
        var r,
            i = this._elem.hierarchy.length;

        for (r = 0; r < i; r += 1) {
          this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
        }

        return e.inversePoint(t);
      }

      return e.inversePoint(t);
    }

    function o() {
      return [1, 1, 1, 1];
    }

    return function (e) {
      var r;

      function i(t) {
        switch (t) {
          case "ADBE Root Vectors Group":
          case "Contents":
          case 2:
            return i.shapeInterface;

          case 1:
          case 6:
          case "Transform":
          case "transform":
          case "ADBE Transform Group":
            return r;

          case 4:
          case "ADBE Effect Parade":
          case "effects":
          case "Effects":
            return i.effect;
        }
      }

      i.toWorld = s, i.fromWorld = a, i.toComp = s, i.fromComp = n, i.sampleImage = o, i.sourceRectAtTime = e.sourceRectAtTime.bind(e);
      var t = getDescriptor(r = TransformExpressionInterface((i._elem = e).finalTransform.mProp), "anchorPoint");
      return Object.defineProperties(i, {
        hasParent: {
          get: function get() {
            return e.hierarchy.length;
          }
        },
        parent: {
          get: function get() {
            return e.hierarchy[0].layerInterface;
          }
        },
        rotation: getDescriptor(r, "rotation"),
        scale: getDescriptor(r, "scale"),
        position: getDescriptor(r, "position"),
        opacity: getDescriptor(r, "opacity"),
        anchorPoint: t,
        anchor_point: t,
        transform: {
          get: function get() {
            return r;
          }
        },
        active: {
          get: function get() {
            return e.isInRange;
          }
        }
      }), i.startTime = e.data.st, i.index = e.data.ind, i.source = e.data.refId, i.height = 0 === e.data.ty ? e.data.h : 100, i.width = 0 === e.data.ty ? e.data.w : 100, i.inPoint = e.data.ip / e.comp.globalData.frameRate, i.outPoint = e.data.op / e.comp.globalData.frameRate, i._name = e.data.nm, i.registerMaskInterface = function (t) {
        i.mask = new MaskManagerInterface(t, e);
      }, i.registerEffectsInterface = function (t) {
        i.effect = t;
      }, i;
    };
  }(),
      CompExpressionInterface = function CompExpressionInterface(i) {
    function t(t) {
      for (var e = 0, r = i.layers.length; e < r;) {
        if (i.layers[e].nm === t || i.layers[e].ind === t) return i.elements[e].layerInterface;
        e += 1;
      }

      return null;
    }

    return Object.defineProperty(t, "_name", {
      value: i.data.nm
    }), (t.layer = t).pixelAspect = 1, t.height = i.data.h || i.globalData.compSize.h, t.width = i.data.w || i.globalData.compSize.w, t.pixelAspect = 1, t.frameDuration = 1 / i.globalData.frameRate, t.displayStartTime = 0, t.numLayers = i.layers.length, t;
  },
      TransformExpressionInterface = function TransformExpressionInterface(t) {
    function e(t) {
      switch (t) {
        case "scale":
        case "Scale":
        case "ADBE Scale":
        case 6:
          return e.scale;

        case "rotation":
        case "Rotation":
        case "ADBE Rotation":
        case "ADBE Rotate Z":
        case 10:
          return e.rotation;

        case "ADBE Rotate X":
          return e.xRotation;

        case "ADBE Rotate Y":
          return e.yRotation;

        case "position":
        case "Position":
        case "ADBE Position":
        case 2:
          return e.position;

        case "ADBE Position_0":
          return e.xPosition;

        case "ADBE Position_1":
          return e.yPosition;

        case "ADBE Position_2":
          return e.zPosition;

        case "anchorPoint":
        case "AnchorPoint":
        case "Anchor Point":
        case "ADBE AnchorPoint":
        case 1:
          return e.anchorPoint;

        case "opacity":
        case "Opacity":
        case 11:
          return e.opacity;
      }
    }

    if (Object.defineProperty(e, "rotation", {
      get: ExpressionPropertyInterface(t.r || t.rz)
    }), Object.defineProperty(e, "zRotation", {
      get: ExpressionPropertyInterface(t.rz || t.r)
    }), Object.defineProperty(e, "xRotation", {
      get: ExpressionPropertyInterface(t.rx)
    }), Object.defineProperty(e, "yRotation", {
      get: ExpressionPropertyInterface(t.ry)
    }), Object.defineProperty(e, "scale", {
      get: ExpressionPropertyInterface(t.s)
    }), t.p) var r = ExpressionPropertyInterface(t.p);
    return Object.defineProperty(e, "position", {
      get: function get() {
        return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
      }
    }), Object.defineProperty(e, "xPosition", {
      get: ExpressionPropertyInterface(t.px)
    }), Object.defineProperty(e, "yPosition", {
      get: ExpressionPropertyInterface(t.py)
    }), Object.defineProperty(e, "zPosition", {
      get: ExpressionPropertyInterface(t.pz)
    }), Object.defineProperty(e, "anchorPoint", {
      get: ExpressionPropertyInterface(t.a)
    }), Object.defineProperty(e, "opacity", {
      get: ExpressionPropertyInterface(t.o)
    }), Object.defineProperty(e, "skew", {
      get: ExpressionPropertyInterface(t.sk)
    }), Object.defineProperty(e, "skewAxis", {
      get: ExpressionPropertyInterface(t.sa)
    }), Object.defineProperty(e, "orientation", {
      get: ExpressionPropertyInterface(t.or)
    }), e;
  },
      ProjectInterface = function () {
    function e(t) {
      this.compositions.push(t);
    }

    return function () {
      function t(t) {
        for (var e = 0, r = this.compositions.length; e < r;) {
          if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
          e += 1;
        }
      }

      return t.compositions = [], t.currentFrame = 0, t.registerComposition = e, t;
    };
  }(),
      EffectsExpressionInterface = function () {
    function l(s, t, e, r) {
      var i,
          a = [],
          n = s.ef.length;

      for (i = 0; i < n; i += 1) {
        5 === s.ef[i].ty ? a.push(l(s.ef[i], t.effectElements[i], t.effectElements[i].propertyGroup, r)) : a.push(p(t.effectElements[i], s.ef[i].ty, r, o));
      }

      function o(t) {
        return 1 === t ? h : e(t - 1);
      }

      var h = function h(t) {
        for (var e = s.ef, r = 0, i = e.length; r < i;) {
          if (t === e[r].nm || t === e[r].mn || t === e[r].ix) return 5 === e[r].ty ? a[r] : a[r]();
          r += 1;
        }

        return a[0]();
      };

      return h.propertyGroup = o, "ADBE Color Control" === s.mn && Object.defineProperty(h, "color", {
        get: function get() {
          return a[0]();
        }
      }), Object.defineProperty(h, "numProperties", {
        get: function get() {
          return s.np;
        }
      }), h.active = h.enabled = 0 !== s.en, h;
    }

    function p(t, e, r, i) {
      var s = ExpressionPropertyInterface(t.p);
      return t.p.setGroupProperty && t.p.setGroupProperty(i), function () {
        return 10 === e ? r.comp.compInterface(t.p.v) : s();
      };
    }

    return {
      createEffectsInterface: function createEffectsInterface(s, t) {
        if (s.effectsManager) {
          var e,
              a = [],
              r = s.data.ef,
              i = s.effectsManager.effectElements.length;

          for (e = 0; e < i; e += 1) {
            a.push(l(r[e], s.effectsManager.effectElements[e], t, s));
          }

          return function (t) {
            for (var e = s.data.ef || [], r = 0, i = e.length; r < i;) {
              if (t === e[r].nm || t === e[r].mn || t === e[r].ix) return a[r];
              r += 1;
            }
          };
        }
      }
    };
  }(),
      MaskManagerInterface = function () {
    function a(t, e) {
      this._mask = t, this._data = e;
    }

    Object.defineProperty(a.prototype, "maskPath", {
      get: function get() {
        return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
      }
    });
    return function (e, t) {
      var r,
          i = createSizedArray(e.viewData.length),
          s = e.viewData.length;

      for (r = 0; r < s; r += 1) {
        i[r] = new a(e.viewData[r], e.masksProperties[r]);
      }

      return function (t) {
        for (r = 0; r < s;) {
          if (e.masksProperties[r].nm === t) return i[r];
          r += 1;
        }
      };
    };
  }(),
      ExpressionPropertyInterface = function () {
    var s = {
      pv: 0,
      v: 0,
      mult: 1
    },
        n = {
      pv: [0, 0, 0],
      v: [0, 0, 0],
      mult: 1
    };

    function o(i, s, a) {
      Object.defineProperty(i, "velocity", {
        get: function get() {
          return s.getVelocityAtTime(s.comp.currentFrame);
        }
      }), i.numKeys = s.keyframes ? s.keyframes.length : 0, i.key = function (t) {
        if (i.numKeys) {
          var e = "";
          e = "s" in s.keyframes[t - 1] ? s.keyframes[t - 1].s : "e" in s.keyframes[t - 2] ? s.keyframes[t - 2].e : s.keyframes[t - 2].s;
          var r = "unidimensional" === a ? new Number(e) : Object.assign({}, e);
          return r.time = s.keyframes[t - 1].t / s.elem.comp.globalData.frameRate, r;
        }

        return 0;
      }, i.valueAtTime = s.getValueAtTime, i.speedAtTime = s.getSpeedAtTime, i.velocityAtTime = s.getVelocityAtTime, i.propertyGroup = s.propertyGroup;
    }

    function e() {
      return s;
    }

    return function (t) {
      return t ? "unidimensional" === t.propType ? function (t) {
        t && "pv" in t || (t = s);
        var e = 1 / t.mult,
            r = t.pv * e,
            i = new Number(r);
        return i.value = r, o(i, t, "unidimensional"), function () {
          return t.k && t.getValue(), r = t.v * e, i.value !== r && ((i = new Number(r)).value = r, o(i, t, "unidimensional")), i;
        };
      }(t) : function (e) {
        e && "pv" in e || (e = n);
        var r = 1 / e.mult,
            i = e.pv.length,
            s = createTypedArray("float32", i),
            a = createTypedArray("float32", i);
        return s.value = a, o(s, e, "multidimensional"), function () {
          e.k && e.getValue();

          for (var t = 0; t < i; t += 1) {
            s[t] = a[t] = e.v[t] * r;
          }

          return s;
        };
      }(t) : e;
    };
  }();

  function SliderEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }

  function AngleEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }

  function ColorEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
  }

  function PointEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
  }

  function LayerIndexEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }

  function MaskIndexEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }

  function CheckboxEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }

  function NoValueEffect() {
    this.p = {};
  }

  function EffectsManager() {}

  function EffectsManager(t, e) {
    var r = t.ef || [];
    this.effectElements = [];
    var i,
        s,
        a = r.length;

    for (i = 0; i < a; i++) {
      s = new GroupEffect(r[i], e), this.effectElements.push(s);
    }
  }

  function GroupEffect(t, e) {
    this.init(t, e);
  }

  extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
    this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
    var r,
        i,
        s = this.data.ef.length,
        a = this.data.ef;

    for (r = 0; r < s; r += 1) {
      switch (i = null, a[r].ty) {
        case 0:
          i = new SliderEffect(a[r], e, this);
          break;

        case 1:
          i = new AngleEffect(a[r], e, this);
          break;

        case 2:
          i = new ColorEffect(a[r], e, this);
          break;

        case 3:
          i = new PointEffect(a[r], e, this);
          break;

        case 4:
        case 7:
          i = new CheckboxEffect(a[r], e, this);
          break;

        case 10:
          i = new LayerIndexEffect(a[r], e, this);
          break;

        case 11:
          i = new MaskIndexEffect(a[r], e, this);
          break;

        case 5:
          i = new EffectsManager(a[r], e, this);
          break;

        default:
          i = new NoValueEffect(a[r], e, this);
      }

      i && this.effectElements.push(i);
    }
  };

  var lottiejs = {},
      _isFrozen = !1;

  function setLocationHref(t) {
    locationHref = t;
  }

  function searchAnimations() {
    !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
  }

  function setSubframeRendering(t) {
    subframeEnabled = t;
  }

  function loadAnimation(t) {
    return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
  }

  function setQuality(t) {
    if ("string" == typeof t) switch (t) {
      case "high":
        defaultCurveSegments = 200;
        break;

      case "medium":
        defaultCurveSegments = 50;
        break;

      case "low":
        defaultCurveSegments = 10;
    } else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
    roundValues(!(50 <= defaultCurveSegments));
  }

  function inBrowser() {
    return "undefined" != typeof navigator;
  }

  function installPlugin(t, e) {
    "expressions" === t && (expressionsPlugin = e);
  }

  function getFactory(t) {
    switch (t) {
      case "propertyFactory":
        return PropertyFactory;

      case "shapePropertyFactory":
        return ShapePropertyFactory;

      case "matrix":
        return Matrix;
    }
  }

  function checkReady() {
    "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
  }

  function getQueryVariable(t) {
    for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
      var i = e[r].split("=");
      if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1]);
    }
  }

  lottiejs.play = animationManager.play, lottiejs.pause = animationManager.pause, lottiejs.setLocationHref = setLocationHref, lottiejs.togglePause = animationManager.togglePause, lottiejs.setSpeed = animationManager.setSpeed, lottiejs.setDirection = animationManager.setDirection, lottiejs.stop = animationManager.stop, lottiejs.searchAnimations = searchAnimations, lottiejs.registerAnimation = animationManager.registerAnimation, lottiejs.loadAnimation = loadAnimation, lottiejs.setSubframeRendering = setSubframeRendering, lottiejs.resize = animationManager.resize, lottiejs.goToAndStop = animationManager.goToAndStop, lottiejs.destroy = animationManager.destroy, lottiejs.setQuality = setQuality, lottiejs.inBrowser = inBrowser, lottiejs.installPlugin = installPlugin, lottiejs.freeze = animationManager.freeze, lottiejs.unfreeze = animationManager.unfreeze, lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottiejs.__getFactory = getFactory, lottiejs.version = "5.4.3";
  var standalone = "__[STANDALONE]__",
      animationData = "__[ANIMATIONDATA]__",
      renderer = "";

  if (standalone) {
    var scripts = document.getElementsByTagName("script"),
        index = scripts.length - 1,
        myScript = scripts[index] || {
      src: ""
    },
        queryString = myScript.src.replace(/^[^\?]+\??/, "");
    renderer = getQueryVariable("renderer");
  }

  var readyStateCheckInterval = setInterval(checkReady, 100);
  return lottiejs;
},  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  return b(a);
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined);

/***/ })

}]);
//# sourceMappingURL=lottie.de02791e7aeee079eb86.bundle.js.map