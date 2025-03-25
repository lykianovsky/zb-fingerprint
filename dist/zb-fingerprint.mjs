var m = function() {
  return m = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, m.apply(this, arguments);
};
function C(o, e) {
  var t = {};
  for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && e.indexOf(r) < 0 && (t[r] = o[r]);
  if (o != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(o); n < r.length; n++)
      e.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(o, r[n]) && (t[r[n]] = o[r[n]]);
  return t;
}
function U(o, e, t) {
  if (t || arguments.length === 2) for (var r = 0, n = e.length, i; r < n; r++)
    (i || !(r in e)) && (i || (i = Array.prototype.slice.call(e, 0, r)), i[r] = e[r]);
  return o.concat(i || Array.prototype.slice.call(e));
}
function F(o, e) {
  return function(t, r) {
    return Object.prototype.hasOwnProperty.call(t, r);
  }(o, e) ? o[e] : void 0;
}
function k(o, e, t, r) {
  var n, i = document, l = "securitypolicyviolation", s = function(R) {
    var c = new URL(o, location.href), a = R.blockedURI;
    a !== c.href && a !== c.protocol.slice(0, -1) && a !== c.origin || (n = R, u());
  };
  i.addEventListener(l, s);
  var u = function() {
    return i.removeEventListener(l, s);
  };
  return Promise.resolve().then(e).then(function(R) {
    return u(), R;
  }, function(R) {
    return new Promise(function(c) {
      var a = new MessageChannel();
      a.port1.onmessage = function() {
        return c();
      }, a.port2.postMessage(null);
    }).then(function() {
      if (u(), n) return t(n);
      throw R;
    });
  });
}
var M = { default: "endpoint" }, B = { default: "tlsEndpoint" }, V = "Client timeout", x = "Network connection error", Y = "Network request aborted", j = "Response cannot be parsed", P = "Blocked by CSP", A = "The endpoint parameter is not a valid URL";
function p(o) {
  for (var e = "", t = 0; t < o.length; ++t) if (t > 0) {
    var r = o[t].toLowerCase();
    r !== o[t] ? e += " ".concat(r) : e += o[t];
  } else e += o[t].toUpperCase();
  return e;
}
var H = /* @__PURE__ */ p("WrongRegion"), $ = /* @__PURE__ */ p("SubscriptionNotActive"), q = /* @__PURE__ */ p("UnsupportedVersion"), W = /* @__PURE__ */ p("InstallationMethodRestricted"), X = /* @__PURE__ */ p("HostnameRestricted"), z = /* @__PURE__ */ p("IntegrationFailed"), J = /* @__PURE__ */ p("NetworkRestricted"), Q = /* @__PURE__ */ p("InvalidProxyIntegrationSecret"), Z = /* @__PURE__ */ p("InvalidProxyIntegrationHeaders"), y = "API key required", S = "API key not found", b = "API key expired", ee = "Request cannot be parsed", te = "Request failed", re = "Request failed to process", ne = "Too many requests, rate limit exceeded", oe = "Not available for this origin", ie = "Not available with restricted header", ae = y, se = S, ue = b, ce = "3.11.8", w = "Failed to load the JS script of the agent", N = "9319";
function le(o, e) {
  var t, r, n, i, l, s, u, R = [], c = (t = function(E) {
    var f = U([], E, !0);
    return { current: function() {
      return f[0];
    }, postpone: function() {
      var d = f.shift();
      d !== void 0 && f.push(d);
    }, exclude: function() {
      f.shift();
    } };
  }(o), i = 100, l = 3e3, s = 0, r = function() {
    return Math.random() * Math.min(l, i * Math.pow(2, s++));
  }, n = /* @__PURE__ */ new Set(), [t.current(), function(E, f) {
    var d, h = f instanceof Error ? f.message : "";
    if (h === P || h === A) t.exclude(), d = 0;
    else if (h === N) t.exclude();
    else if (h === w) {
      var I = Date.now() - E.getTime() < 50, O = t.current();
      O && I && !n.has(O) && (n.add(O), d = 0), t.postpone();
    } else t.postpone();
    var v = t.current();
    return v === void 0 ? void 0 : [v, d ?? E.getTime() + r() - Date.now()];
  }]), a = c[0], _ = c[1];
  if (a === void 0) return Promise.reject(new TypeError("The list of script URL patterns is empty"));
  var g = function(E) {
    var f = /* @__PURE__ */ new Date(), d = function(I) {
      return R.push({ url: E, startedAt: f, finishedAt: /* @__PURE__ */ new Date(), error: I });
    }, h = e(E);
    return h.then(function() {
      return d();
    }, d), h.catch(function(I) {
      if (u != null || (u = I), R.length >= 5) throw u;
      var O = _(f, I);
      if (!O) throw u;
      var v, L = O[0], K = O[1];
      return (v = K, new Promise(function(G) {
        return setTimeout(G, v);
      })).then(function() {
        return g(L);
      });
    });
  };
  return g(a).then(function(E) {
    return [E, R];
  });
}
var D = "https://fpnpmcdn.net/v<version>/<apiKey>/loader_v<loaderVersion>.js", Re = D;
function de(o) {
  var e;
  o.scriptUrlPattern;
  var t = o.token, r = o.apiKey, n = r === void 0 ? t : r, i = C(o, ["scriptUrlPattern", "token", "apiKey"]), l = (e = F(o, "scriptUrlPattern")) !== null && e !== void 0 ? e : D, s = function() {
    var c = [], a = function() {
      c.push({ time: /* @__PURE__ */ new Date(), state: document.visibilityState });
    }, _ = function(g, E, f, d) {
      return g.addEventListener(E, f, d), function() {
        return g.removeEventListener(E, f, d);
      };
    }(document, "visibilitychange", a);
    return a(), [c, _];
  }(), u = s[0], R = s[1];
  return Promise.resolve().then(function() {
    if (!n || typeof n != "string") throw new Error(y);
    var c = function(a, _) {
      return (Array.isArray(a) ? a : [a]).map(function(g) {
        return function(E, f) {
          var d = encodeURIComponent;
          return E.replace(/<[^<>]+>/g, function(h) {
            return h === "<version>" ? "3" : h === "<apiKey>" ? d(f) : h === "<loaderVersion>" ? d(ce) : h;
          });
        }(String(g), _);
      });
    }(l, n);
    return le(c, fe);
  }).catch(function(c) {
    throw R(), function(a) {
      return a instanceof Error && a.message === N ? new Error(w) : a;
    }(c);
  }).then(function(c) {
    var a = c[0], _ = c[1];
    return R(), a.load(m(m({}, i), { ldi: { attempts: _, visibilityStates: u } }));
  });
}
function fe(o) {
  return k(o, function() {
    return function(e) {
      return new Promise(function(t, r) {
        if (function(s) {
          if (URL.prototype) try {
            return new URL(s, location.href), !1;
          } catch (u) {
            if (u instanceof Error && u.name === "TypeError") return !0;
            throw u;
          }
        }(e)) throw new Error(A);
        var n = document.createElement("script"), i = function() {
          var s;
          return (s = n.parentNode) === null || s === void 0 ? void 0 : s.removeChild(n);
        }, l = document.head || document.getElementsByTagName("head")[0];
        n.onload = function() {
          i(), t();
        }, n.onerror = function() {
          i(), r(new Error(w));
        }, n.async = !0, n.src = e, l.appendChild(n);
      });
    }(o);
  }, function() {
    throw new Error(P);
  }).then(Ee);
}
function Ee() {
  var o = window, e = "__fpjs_p_l_b", t = o[e];
  if (function(r, n) {
    var i, l = (i = Object.getOwnPropertyDescriptor) === null || i === void 0 ? void 0 : i.call(Object, r, n);
    l?.configurable ? delete r[n] : l && !l.writable || (r[n] = void 0);
  }(o, e), typeof t?.load != "function") throw new Error(N);
  return t;
}
var he = { load: de, defaultScriptUrlPattern: Re, ERROR_SCRIPT_LOAD_FAIL: w, ERROR_API_KEY_EXPIRED: b, ERROR_API_KEY_INVALID: S, ERROR_API_KEY_MISSING: y, ERROR_BAD_REQUEST_FORMAT: ee, ERROR_BAD_RESPONSE_FORMAT: j, ERROR_CLIENT_TIMEOUT: V, ERROR_CSP_BLOCK: P, ERROR_FORBIDDEN_ENDPOINT: X, ERROR_FORBIDDEN_HEADER: ie, ERROR_FORBIDDEN_ORIGIN: oe, ERROR_GENERAL_SERVER_FAILURE: te, ERROR_INSTALLATION_METHOD_RESTRICTED: W, ERROR_INTEGRATION_FAILURE: z, ERROR_INVALID_ENDPOINT: A, ERROR_INVALID_PROXY_INTEGRATION_HEADERS: Z, ERROR_INVALID_PROXY_INTEGRATION_SECRET: Q, ERROR_NETWORK_ABORT: Y, ERROR_NETWORK_CONNECTION: x, ERROR_NETWORK_RESTRICTED: J, ERROR_RATE_LIMIT: ne, ERROR_SERVER_TIMEOUT: re, ERROR_SUBSCRIPTION_NOT_ACTIVE: $, ERROR_TOKEN_EXPIRED: ue, ERROR_TOKEN_INVALID: se, ERROR_TOKEN_MISSING: ae, ERROR_UNSUPPORTED_VERSION: q, ERROR_WRONG_REGION: H, defaultEndpoint: M, defaultTlsEndpoint: B };
const T = () => typeof window > "u";
function pe(o) {
  return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(
    o
  );
}
class _e {
  constructor(e) {
    this._loadPromise = null, this._fingerPrint = "", this.STORAGE_KEY = e.storageKey, this.MIN_VALUE_LENGTH = e.minLength, this.PUBLIC_KEY = e.publicKey, this.COOKIE_MANAGER = e.cookie;
  }
  /** Получает сохраненный отпечаток пользователя. */
  get fingerPrint() {
    return this._fingerPrint;
  }
  /** Устанавливает кешированный отпечаток пользователя. */
  setFingerPrint(e) {
    this._fingerPrint = e;
  }
  /** Записывает отпечаток пользователя в cookie и localStorage. */
  set(e) {
    this.COOKIE_MANAGER.set(this.STORAGE_KEY, e), localStorage.setItem(this.STORAGE_KEY, e), sessionStorage.setItem(this.STORAGE_KEY, e), this.setFingerPrint(e);
  }
  /** Получает отпечаток пользователя из возможных источников (cookie, localStorage, sessionStorage). */
  get() {
    const e = this.fingerPrint, t = this.COOKIE_MANAGER.get(this.STORAGE_KEY);
    if (T())
      return t;
    const r = localStorage.getItem(this.STORAGE_KEY), n = sessionStorage.getItem(this.STORAGE_KEY);
    return t || n || r || e;
  }
  /** Проверяет валидность отпечатка по его длине. */
  isValid(e) {
    return !!(e && e.length >= this.MIN_VALUE_LENGTH);
  }
  /** Создает кастомный отпечаток пользователя на основе данных устройства. */
  async buildCustomFingerprint() {
    if (T())
      throw new Error(
        "The FingerprintService.getCustom method cannot be called on the server side, the method is client side"
      );
    const { userAgent: e, language: t } = navigator, { screen: r } = window, n = "_", i = Date.now(), l = Intl.DateTimeFormat().resolvedOptions().timeZone, s = `
${i}
${e}
${r.availWidth}
${r.availHeight}
${t}
${l}`, { SHA3: u } = await import("./index-MsQujxTd.mjs").then((a) => a.i), R = u(s).toString().slice(0, this.MIN_VALUE_LENGTH);
    return `${pe(window.navigator.userAgent) ? "_bot" : ""}${n}${R}`;
  }
  /** Загружает и возвращает отпечаток пользователя, используя FingerprintJS или кастомный метод. */
  async load(e) {
    if (T())
      throw new Error(
        "The FingerprintService.load method cannot be called on the server side, the method is client side"
      );
    const t = this.get();
    if (t)
      return t;
    if (this._loadPromise)
      return await this._loadPromise;
    const r = he.load({ apiKey: this.PUBLIC_KEY, ...e }), i = (async () => {
      try {
        const s = await r.then((R) => R.get()), { visitorId: u } = s;
        if (!this.isValid(u))
          throw new Error(
            `fingerprintAPI return from request invalid visitorId: ${u}`
          );
        return this.set(u), u;
      } catch {
        const s = await this.buildCustomFingerprint();
        return this.set(s), s;
      }
    })();
    this._loadPromise = i;
    const l = await i;
    return this._loadPromise = null, l;
  }
}
export {
  _e as FingerPrintService
};
