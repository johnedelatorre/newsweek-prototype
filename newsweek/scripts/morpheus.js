(function(p) {
  var a = {
    m: "//apex.go.sonobi.com",
    r: navigator.userAgent.match(/webOS|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile/i) ? 2E3 : 1500,
    c: {},
    cmd: [],
    k: !1,
    d: {
      timeout: "",
      s: "//sync.go.sonobi.com/uc.js",
      j: ""
    },
    l: {},
    p: !0,
    h: !0,
    e: !1,
    q: function() {
      a.a = {};
      window.googletag = window.googletag || {};
      googletag.cmd = googletag.cmd || [];
      googletag.cmd.push(function() {
        a.a.b = googletag.pubads();
        a.a.b.disableInitialLoad();
        a.stop = -1 != googletag.debug_log.getAllEvents().map(function(a) {
          return a.getMessage().getMessageId()
        }).indexOf(50);
        a.a.b.addEventListener("slotRenderEnded", function() {
          a.stop = !0
        });
        if (!a.stop) {
          a.a.b.old_refresh = a.a.b.refresh;
          googletag.old_display = googletag.display;
          a.p || a.e || a.g();
          if (0 < a.cmd.length)
            for (var d = 0; d < a.cmd.length; d++)
              if ("function" == typeof a.cmd[d]) a.cmd[d]();
          a.cmd = {
            push: function(a) {
              "function" == typeof a && a()
            }
          }
        }
      })
    },
    n: function() {
      try {
        if ("undefined" != typeof window.sbi_trinity) {
          for (var d = 0 < arguments.length ? arguments[0] : a.a.b.getSlots(), h = 0; h < d.length; h++) {
            var c = d[h].getSlotId().getDomId(),
              e = d[h].getTargetingMap();
            d[h].clearTargeting();
            for (var b in e) "sbi" == b.substr(0, 3) && delete e[b];
            if (c in window.sbi_trinity)
              for (b in window.sbi_trinity[c]) e[b] = ["" + window.sbi_trinity[c][b]];
            for (b in e) d[h].setTargeting(b, e[b])
          }
          a.a.b.setTargeting("sbi_dc", window.sbi_dc)
        }
      } catch (k) {}
    },
    f: function(d, h) {
      if (null != d) {
        null == h && (h = function() {});
        try {
          var c = document.createElement("script");
          c.type = "text/javascript";
          c.async = !0;
          c.src = d;
          if (h != function() {}) {
            var e = setTimeout(function() {
              "" != a.d.timeout && a.f(a.d.timeout, null);
              try {
                h()
              } catch (c) {}
              h =
                function() {}
            }, a.r);
            c.readyState ? c.onreadystatechange = function() {
              clearTimeout(e);
              if ("loaded" == c.readyState || "complete" == c.readyState) {
                c.onreadystatechange = null;
                try {
                  h()
                } catch (a) {}
                h = function() {}
              }
            } : c.onload = function() {
              clearTimeout(e);
              try {
                h()
              } catch (a) {}
              h = function() {}
            }
          }
          var b = document.getElementsByTagName("script")[0];
          b.parentNode.insertBefore(c, b)
        } catch (k) {}
      }
    },
    o: function(d) {
      return d in a.l ? a.l[d]() : !1
    },
    register: function(d, h) {
      a.c[d] = h
    },
    enableReactiveSizes: function() {
      a.k = !0
    },
    callOperator: function(d) {
      function h() {
        c +=
          1;
        var e = "undefined" != typeof a.a.b;
        if (e) {
          var b = -1 != googletag.debug_log.getAllEvents().map(function(a) {
            return a.getMessage().getMessageId()
          }).indexOf(48);
          if (!a.o("callOperator")) {
            var k = 0 < Object.keys(a.c).length,
              g = 0 < a.a.b.getSlots().length,
              f = d || Object.keys(a.c).length <= a.a.b.getSlots().length;
            if (e && b && k && g && (f || 200 < c)) {
              f = a.a.b.getSlots();
              b = {};
              e = {};
              k = {};
              for (g = 0; g < f.length; g++) b[f[g].getSlotId().getDomId()] = f[g];
              for (var l in a.c)
                if (l in b) {
                  k[l] = !0;
                  e[l] = "" + a.c[l];
                  for (var f = [], r = b[l].getSizes(window.innerWidth ||
                      document.documentElement.clientWidth || document.body.clientWidth, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight), g = 0; g < r.length; g++) f.push(r[g].getWidth() + "x" + r[g].getHeight());
                  f = f.join(",");
                  a.k && "" != r && (e[l] += "|" + f)
                } else k[l] = !1;
                "" != a.d.j && a.f(a.d.j + JSON.stringify(k), null);
              l = function() {
                a.n();
                a.stop || (a.a.b.old_refresh(), a.h || a.i(), a.e && a.g())
              };
              0 == Object.keys(e).length ? a.stop || (a.a.b.old_refresh(), a.h || a.i(), a.e && a.g()) : a.f(a.m + "/trinity.js?key_maker=" + JSON.stringify(e) +
                "&s=" + Math.floor(1E3 * Math.random()), l)
            } else if (500 < c || 200 < c && !k) try {
              a.stop || (a.a.b.old_refresh(), a.h || a.i(), a.e && a.g())
            } catch (v) {
              a.stop || (a.a.b.refresh(), a.h || a.i(), a.e && a.g())
            } else setTimeout(h, 2)
          }
        } else setTimeout(h, 2)
      }
      var c = 0;
      h()
    },
    g: function() {
      a.a.b.refresh = function() {
        function d() {
          a.n.apply(a, h);
          a.a.b.old_refresh.apply(a.a.b, h)
        }
        for (var h = arguments, c = h[0] || a.a.b.getSlots(), e = {}, b = {}, k = {}, g = 0; g < c.length; g++) e[c[g].getSlotId().getDomId()] = c[g];
        for (var f in a.c)
          if (f in e) {
            k[f] = !0;
            b[f] = "" + a.c[f];
            for (var c = [], l = e[f].getSizes(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight), g = 0; g < l.length; g++) c.push(l[g].getWidth() + "x" + l[g].getHeight());
            c = c.join(",");
            a.k && "" != l && (b[f] += "|" + c)
          } else k[f] = !1;
          "" != a.d.j && a.f(a.d.j + JSON.stringify(k), null);
        0 == Object.keys(a.c).length || 0 == Object.keys(b).length ? a.a.b.old_refresh.apply(a.a.b, h) : a.f(a.m + "/trinity.js?key_maker=" + JSON.stringify(b) + "&s=" + Math.floor(1E3 *
          Math.random()), d)
      }
    },
    i: function() {
      googletag.display = function() {
        googletag.old_display.apply(null, arguments);
        var d = a.a.b.getSlots().map(function(a) {
            return a.getSlotId().getDomId()
          }).indexOf(arguments[0]),
          d = a.a.b.getSlots()[d];
        a.a.b.old_refresh([d])
      }
    }
  };
  if (p in window)
    for (var q in a) "cmd" == q ? a[q] = window[p][q] : window[p][q] = a[q];
  window[p] = a;
  "object" != typeof JSON && (JSON = {});
  (function() {
    function d(a) {
      return 10 > a ? "0" + a : a
    }

    function h(a) {
      return b.lastIndex = 0, b.test(a) ? '"' + a.replace(b, function(a) {
        var c = f[a];
        return "string" ==
          typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
      }) + '"' : '"' + a + '"'
    }

    function c(a, b) {
      var d, e, f, t, n, u = k,
        m = b[a];
      switch (m && "object" == typeof m && "function" == typeof m.toJSON && (m = m.toJSON(a)), "function" == typeof l && (m = l.call(b, a, m)), typeof m) {
        case "string":
          return h(m);
        case "number":
          return isFinite(m) ? m + "" : "null";
        case "boolean":
        case "null":
          return m + "";
        case "object":
          if (!m) return "null";
          if (k += g, n = [], "[object Array]" === Object.prototype.toString.apply(m)) {
            t = m.length;
            for (d = 0; t > d; d += 1) n[d] = c(d, m) || "null";
            return f = 0 === n.length ? "[]" : k ? "[\n" + k + n.join(",\n" + k) + "\n" + u + "]" : "[" + n.join(",") + "]", k = u, f
          }
          if (l && "object" == typeof l)
            for (t = l.length, d = 0; t > d; d += 1) "string" == typeof l[d] && (e = l[d], f = c(e, m), f && n.push(h(e) + (k ? ": " : ":") + f));
          else
            for (e in m) Object.prototype.hasOwnProperty.call(m, e) && (f = c(e, m), f && n.push(h(e) + (k ? ": " : ":") + f));
          return f = 0 === n.length ? "{}" : k ? "{\n" + k + n.join(",\n" + k) + "\n" + u + "}" : "{" + n.join(",") + "}", k = u, f
      }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
      return isFinite(a.valueOf()) ?
        a.getUTCFullYear() + "-" + d(a.getUTCMonth() + 1) + "-" + d(a.getUTCDate()) + "T" + d(a.getUTCHours()) + ":" + d(a.getUTCMinutes()) + ":" + d(a.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
      return a.valueOf()
    });
    var e, b, k, g, f, l;
    "function" != typeof JSON.stringify && (b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = {
      "\b": "\\b",
      "    ": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    }, JSON.stringify = function(a, d, b) {
      var e;
      if (k = "", g = "", "number" == typeof b)
        for (e = 0; b > e; e += 1) g += " ";
      else "string" == typeof b && (g = b);
      if (l = d, d && "function" != typeof d && ("object" != typeof d || "number" != typeof d.length)) throw Error("JSON.stringify");
      return c("", {
        "": a
      })
    });
    "function" != typeof JSON.parse && (e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(a, d) {
      function c(a, b) {
        var e, g, f = a[b];
        if (f && "object" == typeof f)
          for (e in f) Object.prototype.hasOwnProperty.call(f,
            e) && (g = c(f, e), void 0 !== g ? f[e] = g : delete f[e]);
        return d.call(a, b, f)
      }
      var b;
      if (a += "", e.lastIndex = 0, e.test(a) && (a = a.replace(e, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return b = eval("(" + a + ")"), "function" == typeof d ? c({
        "": b
      }, "") : b;
      throw new SyntaxError("JSON.parse");
    })
  })();
  Object.keys ||
    (Object.keys = function() {
      var a = Object.prototype.hasOwnProperty,
        h = !{
          toString: null
        }.propertyIsEnumerable("toString"),
        c = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
        e = c.length;
      return function(b) {
        if ("object" !== typeof b && ("function" !== typeof b || null === b)) throw new TypeError("Object.keys called on non-object");
        var k = [],
          g;
        for (g in b) a.call(b, g) && k.push(g);
        if (h)
          for (g = 0; g < e; g++) a.call(b, c[g]) && k.push(c[g]);
        return k
      }
    }());
  Array.prototype.map || (Array.prototype.map =
    function(d, h) {
      var c, e, b;
      if (null == a) throw new TypeError(" obj is null or not defined");
      var k = Object(a),
        g = k.length >>> 0;
      if ("function" !== typeof d) throw new TypeError(d + " is not a function");
      1 < arguments.length && (c = h);
      e = Array(g);
      for (b = 0; b < g;) {
        var f;
        b in k && (f = k[b], f = d.call(c, f, b, k), e[b] = f);
        b++
      }
      return e
    });
  Array.prototype.indexOf || (Array.prototype.indexOf = function(d, h) {
    var c;
    if (null == a) throw new TypeError('"obj" is null or not defined');
    var e = Object(a),
      b = e.length >>> 0;
    if (0 === b) return -1;
    c = +h || 0;
    Infinity ===
      Math.abs(c) && (c = 0);
    if (c >= b) return -1;
    for (c = Math.max(0 <= c ? c : b - Math.abs(c), 0); c < b;) {
      if (c in e && e[c] === d) return c;
      c++
    }
    return -1
  });
  window[p].q()
})("sbi_morpheus");