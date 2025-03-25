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
  var n, i = document, l = "securitypolicyviolation", a = function(d) {
    var c = new URL(o, location.href), s = d.blockedURI;
    s !== c.href && s !== c.protocol.slice(0, -1) && s !== c.origin || (n = d, u());
  };
  i.addEventListener(l, a);
  var u = function() {
    return i.removeEventListener(l, a);
  };
  return Promise.resolve().then(e).then(function(d) {
    return u(), d;
  }, function(d) {
    return new Promise(function(c) {
      var s = new MessageChannel();
      s.port1.onmessage = function() {
        return c();
      }, s.port2.postMessage(null);
    }).then(function() {
      if (u(), n) return t(n);
      throw d;
    });
  });
}
var M = { default: "endpoint" }, B = { default: "tlsEndpoint" }, V = "Client timeout", x = "Network connection error", Y = "Network request aborted", j = "Response cannot be parsed", T = "Blocked by CSP", A = "The endpoint parameter is not a valid URL";
function p(o) {
  for (var e = "", t = 0; t < o.length; ++t) if (t > 0) {
    var r = o[t].toLowerCase();
    r !== o[t] ? e += " ".concat(r) : e += o[t];
  } else e += o[t].toUpperCase();
  return e;
}
var H = /* @__PURE__ */ p("WrongRegion"), $ = /* @__PURE__ */ p("SubscriptionNotActive"), q = /* @__PURE__ */ p("UnsupportedVersion"), W = /* @__PURE__ */ p("InstallationMethodRestricted"), X = /* @__PURE__ */ p("HostnameRestricted"), z = /* @__PURE__ */ p("IntegrationFailed"), J = /* @__PURE__ */ p("NetworkRestricted"), Q = /* @__PURE__ */ p("InvalidProxyIntegrationSecret"), Z = /* @__PURE__ */ p("InvalidProxyIntegrationHeaders"), S = "API key required", N = "API key not found", b = "API key expired", ee = "Request cannot be parsed", te = "Request failed", re = "Request failed to process", ne = "Too many requests, rate limit exceeded", oe = "Not available for this origin", ie = "Not available with restricted header", se = S, ae = N, ue = b, ce = "3.11.8", w = "Failed to load the JS script of the agent", y = "9319";
function le(o, e) {
  var t, r, n, i, l, a, u, d = [], c = (t = function(E) {
    var f = U([], E, !0);
    return { current: function() {
      return f[0];
    }, postpone: function() {
      var R = f.shift();
      R !== void 0 && f.push(R);
    }, exclude: function() {
      f.shift();
    } };
  }(o), i = 100, l = 3e3, a = 0, r = function() {
    return Math.random() * Math.min(l, i * Math.pow(2, a++));
  }, n = /* @__PURE__ */ new Set(), [t.current(), function(E, f) {
    var R, h = f instanceof Error ? f.message : "";
    if (h === T || h === A) t.exclude(), R = 0;
    else if (h === y) t.exclude();
    else if (h === w) {
      var I = Date.now() - E.getTime() < 50, O = t.current();
      O && I && !n.has(O) && (n.add(O), R = 0), t.postpone();
    } else t.postpone();
    var v = t.current();
    return v === void 0 ? void 0 : [v, R ?? E.getTime() + r() - Date.now()];
  }]), s = c[0], _ = c[1];
  if (s === void 0) return Promise.reject(new TypeError("The list of script URL patterns is empty"));
  var g = function(E) {
    var f = /* @__PURE__ */ new Date(), R = function(I) {
      return d.push({ url: E, startedAt: f, finishedAt: /* @__PURE__ */ new Date(), error: I });
    }, h = e(E);
    return h.then(function() {
      return R();
    }, R), h.catch(function(I) {
      if (u != null || (u = I), d.length >= 5) throw u;
      var O = _(f, I);
      if (!O) throw u;
      var v, D = O[0], K = O[1];
      return (v = K, new Promise(function(G) {
        return setTimeout(G, v);
      })).then(function() {
        return g(D);
      });
    });
  };
  return g(s).then(function(E) {
    return [E, d];
  });
}
var L = "https://fpnpmcdn.net/v<version>/<apiKey>/loader_v<loaderVersion>.js", de = L;
function Re(o) {
  var e;
  o.scriptUrlPattern;
  var t = o.token, r = o.apiKey, n = r === void 0 ? t : r, i = C(o, ["scriptUrlPattern", "token", "apiKey"]), l = (e = F(o, "scriptUrlPattern")) !== null && e !== void 0 ? e : L, a = function() {
    var c = [], s = function() {
      c.push({ time: /* @__PURE__ */ new Date(), state: document.visibilityState });
    }, _ = function(g, E, f, R) {
      return g.addEventListener(E, f, R), function() {
        return g.removeEventListener(E, f, R);
      };
    }(document, "visibilitychange", s);
    return s(), [c, _];
  }(), u = a[0], d = a[1];
  return Promise.resolve().then(function() {
    if (!n || typeof n != "string") throw new Error(S);
    var c = function(s, _) {
      return (Array.isArray(s) ? s : [s]).map(function(g) {
        return function(E, f) {
          var R = encodeURIComponent;
          return E.replace(/<[^<>]+>/g, function(h) {
            return h === "<version>" ? "3" : h === "<apiKey>" ? R(f) : h === "<loaderVersion>" ? R(ce) : h;
          });
        }(String(g), _);
      });
    }(l, n);
    return le(c, fe);
  }).catch(function(c) {
    throw d(), function(s) {
      return s instanceof Error && s.message === y ? new Error(w) : s;
    }(c);
  }).then(function(c) {
    var s = c[0], _ = c[1];
    return d(), s.load(m(m({}, i), { ldi: { attempts: _, visibilityStates: u } }));
  });
}
function fe(o) {
  return k(o, function() {
    return function(e) {
      return new Promise(function(t, r) {
        if (function(a) {
          if (URL.prototype) try {
            return new URL(a, location.href), !1;
          } catch (u) {
            if (u instanceof Error && u.name === "TypeError") return !0;
            throw u;
          }
        }(e)) throw new Error(A);
        var n = document.createElement("script"), i = function() {
          var a;
          return (a = n.parentNode) === null || a === void 0 ? void 0 : a.removeChild(n);
        }, l = document.head || document.getElementsByTagName("head")[0];
        n.onload = function() {
          i(), t();
        }, n.onerror = function() {
          i(), r(new Error(w));
        }, n.async = !0, n.src = e, l.appendChild(n);
      });
    }(o);
  }, function() {
    throw new Error(T);
  }).then(Ee);
}
function Ee() {
  var o = window, e = "__fpjs_p_l_b", t = o[e];
  if (function(r, n) {
    var i, l = (i = Object.getOwnPropertyDescriptor) === null || i === void 0 ? void 0 : i.call(Object, r, n);
    l?.configurable ? delete r[n] : l && !l.writable || (r[n] = void 0);
  }(o, e), typeof t?.load != "function") throw new Error(y);
  return t;
}
var he = { load: Re, defaultScriptUrlPattern: de, ERROR_SCRIPT_LOAD_FAIL: w, ERROR_API_KEY_EXPIRED: b, ERROR_API_KEY_INVALID: N, ERROR_API_KEY_MISSING: S, ERROR_BAD_REQUEST_FORMAT: ee, ERROR_BAD_RESPONSE_FORMAT: j, ERROR_CLIENT_TIMEOUT: V, ERROR_CSP_BLOCK: T, ERROR_FORBIDDEN_ENDPOINT: X, ERROR_FORBIDDEN_HEADER: ie, ERROR_FORBIDDEN_ORIGIN: oe, ERROR_GENERAL_SERVER_FAILURE: te, ERROR_INSTALLATION_METHOD_RESTRICTED: W, ERROR_INTEGRATION_FAILURE: z, ERROR_INVALID_ENDPOINT: A, ERROR_INVALID_PROXY_INTEGRATION_HEADERS: Z, ERROR_INVALID_PROXY_INTEGRATION_SECRET: Q, ERROR_NETWORK_ABORT: Y, ERROR_NETWORK_CONNECTION: x, ERROR_NETWORK_RESTRICTED: J, ERROR_RATE_LIMIT: ne, ERROR_SERVER_TIMEOUT: re, ERROR_SUBSCRIPTION_NOT_ACTIVE: $, ERROR_TOKEN_EXPIRED: ue, ERROR_TOKEN_INVALID: ae, ERROR_TOKEN_MISSING: se, ERROR_UNSUPPORTED_VERSION: q, ERROR_WRONG_REGION: H, defaultEndpoint: M, defaultTlsEndpoint: B };
const P = () => typeof window > "u";
function pe(o) {
  return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(
    o
  );
}
class _e {
  constructor(e) {
    this._fingerPrint = "", this._loadPromise = null, this.STORAGE_KEY = e.storageKey, this.MIN_VALUE_LENGTH = e.minLength, this.PUBLIC_KEY = e.publicKey, this.COOKIE_MANAGER = e.cookie;
  }
  get fingerPrint() {
    return this._fingerPrint;
  }
  /**
   * @remarks
   * Сюда передается промис, который создается при загрузке фингер принта
   * Сделано это для того, что бы не было гонки данных (когда запускается 5 загрузчиков, и записываются данные последнего выполненного)
   * Когда мы вызываем метод.load(), мы всегда гарантируем что не будет гонки данных
   * @private
   */
  get loadPromise() {
    return this._loadPromise;
  }
  setLoadPromise(e) {
    this._loadPromise = e;
  }
  setFingerPrint(e) {
    this._fingerPrint = e;
  }
  set(e) {
    this.COOKIE_MANAGER.set(this.STORAGE_KEY, e), localStorage.setItem(this.STORAGE_KEY, e), sessionStorage.setItem(this.STORAGE_KEY, e), this.setFingerPrint(e);
  }
  get() {
    const e = this.fingerPrint, t = this.COOKIE_MANAGER.get(this.STORAGE_KEY);
    if (P())
      return t;
    const r = localStorage.getItem(this.STORAGE_KEY), n = sessionStorage.getItem(this.STORAGE_KEY);
    return t || n || r || e;
  }
  isValid(e) {
    return e ? !!(e && e.length >= this.MIN_VALUE_LENGTH) : !1;
  }
  async buildCustomFingerprint() {
    if (P())
      throw new Error(
        "The FingerprintService.getCustom method cannot be called on the server side, the method is client side"
      );
    const { userAgent: e, language: t } = navigator, { screen: r } = window, n = "_", i = Date.now(), l = Intl.DateTimeFormat().resolvedOptions().timeZone, a = `
          ${i.toString()}
          ${e}
          ${r.availWidth.toString()}
          ${r.availHeight.toString()}
          ${t}
          ${l}
        `, { SHA3: u } = await import("./index-MsQujxTd.mjs").then((s) => s.i), d = u(a).toString().slice(0, this.MIN_VALUE_LENGTH);
    return `${pe(window.navigator.userAgent) ? "_bot" : ""}${n}${d}`;
  }
  async load(e) {
    if (P())
      throw new Error(
        "The FingerprintService.load method cannot be called on the server side, the method is client side"
      );
    const t = this.get();
    if (t)
      return t;
    if (this.loadPromise)
      return await this.loadPromise;
    const r = he.load({
      apiKey: this.PUBLIC_KEY,
      ...e
    }), i = (async () => {
      try {
        const a = await r.then(
          (d) => d.get()
        ), { visitorId: u } = a;
        if (!this.isValid(u))
          throw new Error(
            `fingerprintAPI return from request invalid visitorId: ${u}`
          );
        return this.set(u), u;
      } catch {
        const a = await this.buildCustomFingerprint();
        return this.set(a), a;
      }
    })();
    this.setLoadPromise(i);
    const l = await i;
    return this.setLoadPromise(null), l;
  }
}
export {
  _e as FingerPrintService
};
