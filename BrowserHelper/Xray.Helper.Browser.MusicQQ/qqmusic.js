!function() {
    "use strict";
    !function() {
        "http:" === location.protocol && -1 == location.search.indexOf("debug=1") && 1 != window._use_http && "n.y.qq.com" != location.hostname && location.replace(location.href.replace("http:", "https:"));
        try {
            e = decodeURI(location.href),
            t = decodeURI(document.referrer),
            ((n = new RegExp("['\"<>`]|script:")).test(e) || n.test(t)) && (location.href = e.replace(/['\"<>`]|script:/gi, ""))
        } catch (e) {
            console.error(e)
        }
        var e, t, n
    }();
    var n = document
      , o = setTimeout
      , e = window
      , t = window.performance
      , i = ((t && t.timing || {}).navigationStart,
    navigator.userAgent)
      , r = JSON.stringify
      , a = "complete" === n.readyState
      , s = a ? null : [];
    e.addEventListener("load", function() {
        a = !0,
        s.forEach(function(e) {
            return e()
        })
    });
    var c = /\bQQMusic\//i.test(i);
    function l(e) {
        return e && e.toLocaleLowerCase()
    }
    var u, d, p = location;
    (d = i.match(/QQMUSIC\/(\d[\.\d]*)/i)) ? u = "music" : (d = i.match(/MicroMessenger\/(\d[\.\d]*)/i)) ? u = "weixin" : (d = i.match(/(?:iPad|iPhone|iPod).*? (?:IPad)?QQ\/([\d\.]+)/) || i.match(/\bV1_AND_SQI?_(?:[\d\.]+)(?:.*? QQ\/([\d\.]+))?/)) ? u = "mqq" : (d = i.match(/\bqmkege\/(\d[\.\d]*)/i)) ? u = "qmkege" : /Qzone\//.test(i) ? u = "qzone" : /\/[\w. ]+MQQBrowser\//i.test(i) ? u = "qqbrowser" : /Weibo\ \(*/i.test(i) && (u = "weibo");
    var m, f, h = u || "other", g = d ? d[1] : "";
    (f = i.match(/(?:Android);?[\s\/]+([\d.]+)?/)) ? m = "android" : (f = i.match(/(?:iPad).*OS\s([\d_]+)/) || i.match(/(?:iPod)(?:.*OS\s([\d_]+))?/) || i.match(/(?:iPhone\sOS)\s([\d_]+)/)) && (m = "ios");
    var _ = m || ""
      , w = f ? f[1] : "";
    function b(e) {
        var t = n.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)"));
        return t ? t[2] : ""
    }
    var v, y, q, x, k = "ios" === _, S = n.cookie.match(/\blogin_type=(\d+)/), T = (v = i.match(/\bNetType\/(\w+)/i)) ? v[1] : "unknown", C = "getDeviceInfo", E = "getGuid", D = {
        _appid: "qqmusic",
        _uid: (x = b("uin") || b("p_uin") || 0,
        2 == b("login_type") && (x = b("wxuin") || b("uin") || 0),
        x && (x = x.replace(/^o/, ""),
        !/^\d+$/.test(x) || x < 1e4 ? x = 0 : x.length < 14 && (x = parseInt(x, 10))),
        x),
        _platform: k ? 1 : 11,
        _account_source: S ? S[1] : "0",
        _os_version: w || "",
        _app_version: g,
        _channelid: (y = "channelId",
        q = p.href.split("#")[0].match(new RegExp("(\\?|&)" + y + "=(.*?)(#|&|$)","i")),
        decodeURIComponent(q ? q[2] : "")),
        _os: _,
        _app: h,
        _opertime: (Date.now() / 1e3 | 0).toString(),
        _network_type: l(T)
    }, I = function() {
        return new Promise(function(e) {
            if (c && window.M) {
                var t = function(r) {
                    return new Promise(function(t) {
                        var e, n, o, i;
                        e = "device",
                        n = r,
                        o = function(e) {
                            r === C ? (D._mobile_factory = e.modelVersion,
                            D._mobile_type = e.modelVersion,
                            D._os_version = e.systemVersion) : r === E ? (D._deviceid = e.imei,
                            D._mnc = e.isp) : D._network_type = l(e.type),
                            t()
                        }
                        ,
                        window.M.client.invoke(e, n, i || {}, function(e) {
                            o(e && 0 == e.code && e.data || {})
                        })
                    }
                    )
                };
                Promise.all([t(C), t(E), t("getNetworkType")]).then(function() {
                    e(D)
                })
            } else
                e(D)
        }
        )
    };
    var j, R = [], P = function(t, e) {
        var n;
        Array.isArray(e) ? e.forEach(function(e) {
            R.push(Object.assign({
                _key: t,
                _opertime: (Date.now() / 1e3 | 0).toString()
            }, e))
        }) : R.push(Object.assign({
            _key: t,
            _opertime: (Date.now() / 1e3 | 0).toString()
        }, e)),
        n = function() {
            j && clearTimeout(j),
            j = o(function() {
                I().then(function(e) {
                    !function(e, t) {
                        t = r(t);
                        var n = new XMLHttpRequest;
                        n.open("POST", e),
                        n.send(t)
                    }("//stat.y.qq.com/sdk/fcgi-bin/sdk.fcg", {
                        common: e,
                        items: R
                    }),
                    R.length = 0
                })
            }, 500)
        }
        ,
        a ? n() : s.push(n)
    };
    window.debug || /\bdebug=1\b/.test(location.search) || (window.onerror = function(o, i, r, a) {
        try {
            var e = ""
              , t = arguments.callee.caller;
            if (t) {
                for (var n, s = []; t; )
                    n = t,
                    s.push(n.toString().replace(/[\t\n\r]/g, "").substring(0, 100) + "..."),
                    t = t.caller;
                e = "; 堆栈：" + s.join(" --\x3e ")
            }
            o += e.substring(0, 600)
        } catch (e) {
            console.error(e)
        }
        return function(e, t) {
            var n = "";
            if (t = t || function() {}
            ,
            /^http.*\.(?:js|html)(?:\?|#|$)/.test(e)) {
                var o = new XMLHttpRequest;
                o.onreadystatechange = function() {
                    if (4 == o.readyState && (o.onreadystatechange = null,
                    200 <= o.status && o.status < 300 || 304 == o.status))
                        try {
                            n = o.getResponseHeader("X-Server-Ip") || o.getResponseHeader("x-server-ip") || "",
                            t(n)
                        } catch (e) {
                            t(n)
                        }
                }
                ;
                var i = Math.random();
                e += /\?/.test(e) ? "&r=" + i : "?r=" + i,
                o.open("head", e),
                o.send(null)
            } else
                t(n)
        }(i, function(e) {
            var t = location.protocol + "//stat.y.qq.com/monitor/report_err?msg=" + encodeURIComponent(o) + "&file=" + encodeURIComponent(i) + "&line=" + r + (e ? "&file_ip=" + e : "");
            if (window.M && "function" == typeof M.report)
                M.report(t, null, 1);
            else {
                var n = new Image;
                n.src = t,
                n.onload = n.onerror = function() {
                    n = null
                }
            }
            window.M && M.browser && M.browser.music && 0 <= M.compare(M.browser.appVer, "9.9.5") && M.client.open("debug", "sendJSError", {
                msg: o,
                file: i,
                line: r,
                col: a,
                file_ip: e
            })
        }),
        !0
    }
    ,
    window.addEventListener("error", function(e) {
        var t, n, o, i = e.message, r = e.filename, a = e.lineno, s = e.colno, c = e.error, l = document.createElement("a");
        l.href = r,
        t = r,
        n = function(e) {
            P("web_error", {
                host: location.host,
                pathname: location.pathname,
                search: location.search,
                protocol: location.protocol,
                hash: location.hash,
                message: i,
                stack: c && c.stack || "",
                line: a + "",
                column: s + "",
                file_host: l.host,
                file_pathname: l.pathname,
                file_search: l.search,
                file_ip: e
            })
        }
        ,
        (o = new XMLHttpRequest).onreadystatechange = function() {
            if (4 == o.readyState && (200 <= o.status && o.status < 300 || 304 == o.status)) {
                var e = o.getResponseHeader("X-Server-Ip") || o.getResponseHeader("x-server-ip") || "";
                n(e)
            }
        }
        ,
        o.open("head", t),
        o.send()
    })),
    function() {
        if (window != window.top && !window.allowIframe) {
            var e = new Image;
            e.src = location.protocol + "//stat.y.qq.com/monitor/report_err?msg=page_be_iframe&file=" + encodeURIComponent(top.location.href),
            e.onload = function() {
                e = null
            }
            ,
            top.location = self.location
        }
        /http:|https:/.test(location.protocol) && !/^(.*\.)?(qq\.com|gtimg\.cn|qzone\.com|oa\.com|cm\.com|localhost)$/.test(location.hostname) && (location.href = location.protocol + "//m.y.qq.com/?ADTAG=hostname_err")
    }(),
    function() {
        var e = preact.options
          , m = function() {}
          , f = /UIWebView/gi.test(navigator.userAgent)
          , o = ["onTap", "onLongTap", "onSwipe", "onSwipeLeft", "onSwipeRight", "onSwipeUp", "onSwipeDown"]
          , i = e.vnode
          , h = !1
          , g = 750
          , _ = void 0;
        function w() {
            _ && clearTimeout(_),
            _ = null
        }
        function r(e) {
            var o = {}
              , t = e.onTouchStart || m
              , n = e.onTouchMove || m
              , i = e.onTouchEnd || m
              , r = e.onTap || m
              , a = e.onLongTap || m
              , s = e.onSwipe || m
              , c = e.onSwipeLeft || m
              , l = e.onSwipeRight || m
              , u = e.onSwipeUp || m
              , d = e.onSwipeDown || m
              , p = e.onClick || m;
            delete e.onTap,
            delete e.onLongTap,
            delete e.onSwipe,
            delete e.onSwipeLeft,
            delete e.onSwipeRight,
            delete e.onSwipeUp,
            delete e.onSwipeDown,
            f && (e.onClick = function(e) {
                r(e),
                p(e)
            }
            ),
            e.onTouchStart = function(e) {
                w(),
                t(e),
                o.isMove = !1,
                h = !1,
                o.startTime = Date.now(),
                o.x1 = e.touches[0].pageX,
                o.y1 = e.touches[0].pageY,
                _ = setTimeout(function() {
                    return a(e)
                }, g)
            }
            ,
            e.onTouchMove = function(e) {
                w(),
                n(e),
                o.isMove = !0,
                o.x2 = e.touches[0].pageX,
                o.y2 = e.touches[0].pageY
            }
            ,
            e.onTouchEnd = function(e) {
                w(),
                i(e);
                var t = e.changedTouches[0].pageX - o.x1
                  , n = e.changedTouches[0].pageY - o.y1;
                Date.now() - o.startTime < 250 && Math.abs(t) < 30 && Math.abs(n) < 30 ? !h && !f && r(e) : (30 <= Math.abs(t) || 30 <= Math.abs(n)) && setTimeout(function() {
                    h || (s(e),
                    Math.abs(t) >= Math.abs(n) ? 0 < t ? l(e) : c(e) : 0 < n ? d(e) : u(e))
                }, 0),
                o = {}
            }
        }
        window.addEventListener("scroll", function() {
            h = !0
        }),
        e.vnode = function(e) {
            var t = e.attributes;
            if (t)
                for (var n in t)
                    if (t.hasOwnProperty(n) && -1 < o.indexOf(n)) {
                        r(t);
                        break
                    }
            i && i(e)
        }
    }(),
    window.M = window.M || {},
    M.loadUrl = function(e, t, n, o) {
        var i = /\.css(?:\?|#|$)/i.test(e)
          , r = document.createElement(i ? "link" : "script");
        n && (r.charset = n),
        r.onload = r.onerror = r.onreadystatechange = function(e) {
            /^(?:loaded|complete|undefined)$/.test(r.readyState) && (r.onload = r.onerror = r.onreadystatechange = null,
            i || document.body.removeChild(r),
            r = null,
            t && t(e))
        }
        ,
        i ? (r.rel = "stylesheet",
        r.href = e) : (r.async = !0,
        r.src = e,
        o && (r.crossorigin = "true")),
        document.body.appendChild(r)
    }
    ,
    M.getNetType = function() {
        var e = navigator.userAgent.match(/\bNetType\/(\w+)/i);
        return (e = e && e[1]) || "unknown"
    }
    ,
    M.extend = function(e) {
        var t = !1
          , n = e
          , o = [].slice.call(arguments, 1);
        return "boolean" == typeof e && (t = e,
        n = o.shift()),
        o.forEach(function(e) {
            !function e(t, n, o) {
                for (var i in n) {
                    var r = n[i];
                    o && M.isPlainObject(r) || M.isArray(r) ? (M.isPlainObject(r) && !M.isPlainObject(t[i]) && (t[i] = {}),
                    M.isArray(n[i]) && !M.isArray(t[i]) && (t[i] = []),
                    e(t[i], n[i], o)) : void 0 !== r && (t[i] = r)
                }
            }(n, e, t)
        }),
        n
    }
    ,
    M.offset = function(e) {
        var t = e.getBoundingClientRect();
        return {
            left: t.left + window.pageXOffset,
            top: t.top + window.pageYOffset,
            width: Math.round(t.width),
            height: Math.round(t.height)
        }
    }
    ,
    M.contains = function(e, t) {
        return e !== t && e.contains(t)
    }
    ,
    M.each = function(e, t) {
        var n, o;
        if ("number" == typeof e.length) {
            for (n = 0; n < e.length; n++)
                if (!1 === t.call(e[n], n, e[n]))
                    return e
        } else
            for (o in e)
                if (!1 === t.call(e[o], o, e[o]))
                    return e;
        return e
    }
    ,
    M.fixUrl = function(e) {
        var t = location.protocol;
        return e && M.isString(e) && (/^http(s?):\/\//i.test(e) && (e = e.replace(/^http(s?):/i, t)),
        /^\/\//.test(e) && (e = t + e),
        /\.(jpg|png|gif|css|js)$/i.test(e) && (e += "?max_age=2592000"),
        /\.(jpg|png|gif|css|js)\?/i.test(e) && !e.match(/^http(s?):\/\/y\.qq\.com\//i) && e.match(/^http(s?):\/\/[^\/]+\/(music|mediastyle)\//i) && (e = e.replace(new RegExp("^(" + t + ")\\/\\/[^\\/]+\\/(music|mediastyle)\\/","i"), function() {
            return RegExp.$1 + "//y.qq.com/" + RegExp.$2 + "/"
        }))),
        e
    }
    ,
    M.getACSRFToken = function(e, t) {
        e = e || "skey";
        var n = ""
          , o = 5381;
        if (n = t ? M.cookie.get("qqmusic_key") || M.cookie.get("p_skey") || M.cookie.get("skey") || M.cookie.get("p_lskey") || M.cookie.get("lskey") : M.cookie.get(e) || M.cookie.get("skey") || M.cookie.get("qqmusic_key"))
            for (var i = 0, r = n.length; i < r; ++i)
                o += (o << 5) + n.charCodeAt(i);
        return 2147483647 & o
    }
    ,
    M.param = function(e) {
        var n = []
          , t = function(e, t) {
            n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
        };
        for (var o in e) {
            var i = e[o];
            t(o, "object" == typeof i ? M.param(i) : i)
        }
        return n.join("&").replace(/%20/g, "+")
    }
    ,
    M.inherits = function(e, t) {
        if ("function" != typeof e && null !== t)
            throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    }
    ,
    M.createClass = function(t, e, n, o) {
        function i(e, t) {
            for (var n in t)
                Object.defineProperty(e, n, {
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                    value: t[n]
                })
        }
        function r(e) {
            if (!(instance instanceof t))
                throw new TypeError("Cannot call a class as a function");
            t.call(this, e)
        }
        return r.constructor = t,
        e && M.inherits(r, e),
        n && i(t.prototype, n),
        o && i(t, o),
        r
    }
    ,
    M.createComponent = function(e) {
        var n = preact.Component;
        function t(e, t) {
            n.call(this, e, t),
            this.state = this.getInitialState ? this.getInitialState() : {},
            this.refs = {},
            this._refProxies = {}
        }
        function o() {}
        return (e = M.extend({
            constructor: t
        }, e)).statics && M.extend(t, e.statics),
        e.propTypes && (t.propTypes = e.propTypes),
        e.defaultProps && (t.defaultProps = e.defaultProps),
        e.getDefaultProps && (t.defaultProps = e.getDefaultProps.call(t)),
        o.prototype = n.prototype,
        t.prototype = M.extend(new o, e),
        t.displayName = e.displayName || "Component",
        t
    }
    ,
    M.getPic = function(e, t, n) {
        var o = location.protocol + "//y.qq.com/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000";
        return M.isString(t) && 14 <= t.length && (e = "album" == e ? "T002" : "singer" == e ? "T001" : e,
        o = location.protocol + "//y.qq.com/music/photo_new/" + e + "R" + (n || 68) + "x" + (n || 68) + "M000" + t + ".jpg?max_age=2592000"),
        o
    }
    ,
    M.compare = function(e, t) {
        for (e = ("" + e).split("."),
        t = ("" + t).split("."); e.length + t.length; ) {
            var n = e.shift() || "0"
              , o = t.shift() || "0";
            if (0 <= n && 0 <= o && (n = ~~n,
            o = ~~o),
            o < n)
                return 1;
            if (n < o)
                return -1
        }
        return 0
    }
    ;
    var A = function() {
        if ("undefined" != typeof self)
            return self;
        if ("undefined" != typeof window)
            return window;
        if ("undefined" != typeof global)
            return global;
        throw new Error("unable to locate global object")
    }();
    A.__sign_hash_20200305 = function(e) {
        function d(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }
        function s(e, t, n, o, i, r) {
            return d((a = d(d(t, e), d(o, r))) << (s = i) | a >>> 32 - s, n);
            var a, s
        }
        function p(e, t, n, o, i, r, a) {
            return s(t & n | ~t & o, e, t, i, r, a)
        }
        function m(e, t, n, o, i, r, a) {
            return s(t & o | n & ~o, e, t, i, r, a)
        }
        function f(e, t, n, o, i, r, a) {
            return s(t ^ n ^ o, e, t, i, r, a)
        }
        function h(e, t, n, o, i, r, a) {
            return s(n ^ (t | ~o), e, t, i, r, a)
        }
        function t(e) {
            return function(e) {
                var t, n = "";
                for (t = 0; t < 32 * e.length; t += 8)
                    n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
                return n
            }(function(e, t) {
                e[t >> 5] |= 128 << t % 32,
                e[14 + (t + 64 >>> 9 << 4)] = t;
                var n, o, i, r, a, s = 1732584193, c = -271733879, l = -1732584194, u = 271733878;
                for (n = 0; n < e.length; n += 16)
                    c = h(c = h(c = h(c = h(c = f(c = f(c = f(c = f(c = m(c = m(c = m(c = m(c = p(c = p(c = p(c = p(i = c, l = p(r = l, u = p(a = u, s = p(o = s, c, l, u, e[n], 7, -680876936), c, l, e[n + 1], 12, -389564586), s, c, e[n + 2], 17, 606105819), u, s, e[n + 3], 22, -1044525330), l = p(l, u = p(u, s = p(s, c, l, u, e[n + 4], 7, -176418897), c, l, e[n + 5], 12, 1200080426), s, c, e[n + 6], 17, -1473231341), u, s, e[n + 7], 22, -45705983), l = p(l, u = p(u, s = p(s, c, l, u, e[n + 8], 7, 1770035416), c, l, e[n + 9], 12, -1958414417), s, c, e[n + 10], 17, -42063), u, s, e[n + 11], 22, -1990404162), l = p(l, u = p(u, s = p(s, c, l, u, e[n + 12], 7, 1804603682), c, l, e[n + 13], 12, -40341101), s, c, e[n + 14], 17, -1502002290), u, s, e[n + 15], 22, 1236535329), l = m(l, u = m(u, s = m(s, c, l, u, e[n + 1], 5, -165796510), c, l, e[n + 6], 9, -1069501632), s, c, e[n + 11], 14, 643717713), u, s, e[n], 20, -373897302), l = m(l, u = m(u, s = m(s, c, l, u, e[n + 5], 5, -701558691), c, l, e[n + 10], 9, 38016083), s, c, e[n + 15], 14, -660478335), u, s, e[n + 4], 20, -405537848), l = m(l, u = m(u, s = m(s, c, l, u, e[n + 9], 5, 568446438), c, l, e[n + 14], 9, -1019803690), s, c, e[n + 3], 14, -187363961), u, s, e[n + 8], 20, 1163531501), l = m(l, u = m(u, s = m(s, c, l, u, e[n + 13], 5, -1444681467), c, l, e[n + 2], 9, -51403784), s, c, e[n + 7], 14, 1735328473), u, s, e[n + 12], 20, -1926607734), l = f(l, u = f(u, s = f(s, c, l, u, e[n + 5], 4, -378558), c, l, e[n + 8], 11, -2022574463), s, c, e[n + 11], 16, 1839030562), u, s, e[n + 14], 23, -35309556), l = f(l, u = f(u, s = f(s, c, l, u, e[n + 1], 4, -1530992060), c, l, e[n + 4], 11, 1272893353), s, c, e[n + 7], 16, -155497632), u, s, e[n + 10], 23, -1094730640), l = f(l, u = f(u, s = f(s, c, l, u, e[n + 13], 4, 681279174), c, l, e[n], 11, -358537222), s, c, e[n + 3], 16, -722521979), u, s, e[n + 6], 23, 76029189), l = f(l, u = f(u, s = f(s, c, l, u, e[n + 9], 4, -640364487), c, l, e[n + 12], 11, -421815835), s, c, e[n + 15], 16, 530742520), u, s, e[n + 2], 23, -995338651), l = h(l, u = h(u, s = h(s, c, l, u, e[n], 6, -198630844), c, l, e[n + 7], 10, 1126891415), s, c, e[n + 14], 15, -1416354905), u, s, e[n + 5], 21, -57434055), l = h(l, u = h(u, s = h(s, c, l, u, e[n + 12], 6, 1700485571), c, l, e[n + 3], 10, -1894986606), s, c, e[n + 10], 15, -1051523), u, s, e[n + 1], 21, -2054922799), l = h(l, u = h(u, s = h(s, c, l, u, e[n + 8], 6, 1873313359), c, l, e[n + 15], 10, -30611744), s, c, e[n + 6], 15, -1560198380), u, s, e[n + 13], 21, 1309151649), l = h(l, u = h(u, s = h(s, c, l, u, e[n + 4], 6, -145523070), c, l, e[n + 11], 10, -1120210379), s, c, e[n + 2], 15, 718787259), u, s, e[n + 9], 21, -343485551),
                    s = d(s, o),
                    c = d(c, i),
                    l = d(l, r),
                    u = d(u, a);
                return [s, c, l, u]
            }(function(e) {
                var t, n = [];
                for (n[(e.length >> 2) - 1] = void 0,
                t = 0; t < n.length; t += 1)
                    n[t] = 0;
                for (t = 0; t < 8 * e.length; t += 8)
                    n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
                return n
            }(e), 8 * e.length))
        }
        function n(e) {
            return t(unescape(encodeURIComponent(e)))
        }
        return function(e) {
            var t, n, o = "0123456789abcdef", i = "";
            for (n = 0; n < e.length; n += 1)
                t = e.charCodeAt(n),
                i += o.charAt(t >>> 4 & 15) + o.charAt(15 & t);
            return i
        }(n(e))
    }
    ,
    function s(c, l, u, d, p) {
        p = p || [[this], [{}]];
        for (var t = [], n = null, e = [function() {
            return !0
        }
        , function() {}
        , function() {
            p.length = u[l++]
        }
        , function() {
            p.push(u[l++])
        }
        , function() {
            p.pop()
        }
        , function() {
            var e = u[l++]
              , t = p[p.length - 2 - e];
            p[p.length - 2 - e] = p.pop(),
            p.push(t)
        }
        , function() {
            p.push(p[p.length - 1])
        }
        , function() {
            p.push([p.pop(), p.pop()].reverse())
        }
        , function() {
            p.push([d, p.pop()])
        }
        , function() {
            p.push([p.pop()])
        }
        , function() {
            var e = p.pop();
            p.push(e[0][e[1]])
        }
        , function() {
            p.push(p[p.pop()[0]][0])
        }
        , function() {
            var e = p[p.length - 2];
            e[0][e[1]] = p[p.length - 1]
        }
        , function() {
            p[p[p.length - 2][0]][0] = p[p.length - 1]
        }
        , function() {
            var e = p.pop()
              , t = p.pop();
            p.push([t[0][t[1]], e])
        }
        , function() {
            var e = p.pop();
            p.push([p[p.pop()][0], e])
        }
        , function() {
            var e = p.pop();
            p.push(delete e[0][e[1]])
        }
        , function() {
            var e = [];
            for (var t in p.pop())
                e.push(t);
            p.push(e)
        }
        , function() {
            p[p.length - 1].length ? p.push(p[p.length - 1].shift(), !0) : p.push(void 0, !1)
        }
        , function() {
            var e = p[p.length - 2]
              , t = Object.getOwnPropertyDescriptor(e[0], e[1]) || {
                configurable: !0,
                enumerable: !0
            };
            t.get = p[p.length - 1],
            Object.defineProperty(e[0], e[1], t)
        }
        , function() {
            var e = p[p.length - 2]
              , t = Object.getOwnPropertyDescriptor(e[0], e[1]) || {
                configurable: !0,
                enumerable: !0
            };
            t.set = p[p.length - 1],
            Object.defineProperty(e[0], e[1], t)
        }
        , function() {
            l = u[l++]
        }
        , function() {
            var e = u[l++];
            p[p.length - 1] && (l = e)
        }
        , function() {
            throw p[p.length - 1]
        }
        , function() {
            var e = u[l++]
              , t = e ? p.slice(-e) : [];
            p.length -= e,
            p.push(p.pop().apply(d, t))
        }
        , function() {
            var e = u[l++]
              , t = e ? p.slice(-e) : [];
            p.length -= e;
            var n = p.pop();
            p.push(n[0][n[1]].apply(n[0], t))
        }
        , function() {
            var e = u[l++]
              , t = e ? p.slice(-e) : [];
            p.length -= e,
            t.unshift(null),
            p.push(new (Function.prototype.bind.apply(p.pop(), t)))
        }
        , function() {
            var e = u[l++]
              , t = e ? p.slice(-e) : [];
            p.length -= e,
            t.unshift(null);
            var n = p.pop();
            p.push(new (Function.prototype.bind.apply(n[0][n[1]], t)))
        }
        , function() {
            p.push(!p.pop())
        }
        , function() {
            p.push(~p.pop())
        }
        , function() {
            p.push(typeof p.pop())
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] == p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] === p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] > p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] >= p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] << p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] >> p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] >>> p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] + p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] - p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] * p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] / p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] % p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] | p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] & p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] ^ p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2]in p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2]instanceof p.pop()
        }
        , function() {
            p[p[p.length - 1][0]] = void 0 === p[p[p.length - 1][0]] ? [] : p[p[p.length - 1][0]]
        }
        , function() {
            for (var o = u[l++], i = [], e = u[l++], t = u[l++], r = [], n = 0; n < e; n++)
                i[u[l++]] = p[u[l++]];
            for (var a = 0; a < t; a++)
                r[a] = u[l++];
            p.push(function e() {
                var t = i.slice(0);
                t[0] = [this],
                t[1] = [arguments],
                t[2] = [e];
                for (var n = 0; n < r.length && n < arguments.length; n++)
                    0 < r[n] && (t[r[n]] = [arguments[n]]);
                return s(c, o, u, d, t)
            })
        }
        , function() {
            t.push([u[l++], p.length, u[l++]])
        }
        , function() {
            t.pop()
        }
        , function() {
            return !!n
        }
        , function() {
            n = null
        }
        , function() {
            p[p.length - 1] += String.fromCharCode(u[l++])
        }
        , function() {
            p.push("")
        }
        , function() {
            p.push(void 0)
        }
        , function() {
            p.push(null)
        }
        , function() {
            p.push(!0)
        }
        , function() {
            p.push(!1)
        }
        , function() {
            p.length -= u[l++]
        }
        , function() {
            p[p.length - 1] = u[l++]
        }
        , function() {
            var e = p.pop()
              , t = p[p.length - 1];
            t[0][t[1]] = p[e[0]][0]
        }
        , function() {
            var e = p.pop()
              , t = p[p.length - 1];
            t[0][t[1]] = e[0][e[1]]
        }
        , function() {
            var e = p.pop()
              , t = p[p.length - 1];
            p[t[0]][0] = p[e[0]][0]
        }
        , function() {
            var e = p.pop()
              , t = p[p.length - 1];
            p[t[0]][0] = e[0][e[1]]
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] < p.pop()
        }
        , function() {
            p[p.length - 2] = p[p.length - 2] <= p.pop()
        }
        ]; ; )
            try {
                for (; !e[u[l++]]();) {
                    if (p.length > 9) {
                        if (p[9] == "CJBPACrRuNy7") {
                            debugger;
                        }
                    }
                }
                    ;
                if (n)
                    throw n;
                return p.pop()
            } catch (e) {
                var o = t.pop();
                if (void 0 === o)
                    throw e;
                n = e,
                l = o[0],
                p.length = o[1],
                o[2] && (p[o[2]][0] = n)
            }
    }(120731, 0, [21, 34, 50, 100, 57, 50, 102, 50, 98, 99, 101, 52, 54, 97, 52, 99, 55, 56, 52, 49, 57, 54, 57, 49, 56, 98, 102, 100, 100, 48, 48, 55, 55, 102, 2, 10, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 61, 8, 9, 48, 61, 9, 9, 48, 4, 21, 427, 54, 2, 15, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 61, 8, 9, 48, 61, 9, 9, 48, 61, 10, 9, 48, 61, 11, 9, 48, 61, 12, 9, 48, 61, 13, 9, 48, 61, 14, 9, 48, 61, 10, 9, 55, 54, 97, 54, 98, 54, 99, 54, 100, 54, 101, 54, 102, 54, 103, 54, 104, 54, 105, 54, 106, 54, 107, 54, 108, 54, 109, 54, 110, 54, 111, 54, 112, 54, 113, 54, 114, 54, 115, 54, 116, 54, 117, 54, 118, 54, 119, 54, 120, 54, 121, 54, 122, 54, 48, 54, 49, 54, 50, 54, 51, 54, 52, 54, 53, 54, 54, 54, 55, 54, 56, 54, 57, 13, 4, 61, 11, 9, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 102, 54, 108, 54, 111, 54, 111, 54, 114, 14, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 114, 54, 97, 54, 110, 54, 100, 54, 111, 54, 109, 14, 25, 0, 3, 4, 9, 11, 3, 3, 9, 11, 39, 3, 1, 38, 40, 3, 3, 9, 11, 38, 25, 1, 13, 4, 61, 12, 9, 55, 13, 4, 61, 13, 9, 3, 0, 13, 4, 4, 3, 13, 9, 11, 3, 11, 9, 11, 66, 22, 306, 4, 21, 422, 24, 4, 3, 14, 9, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 102, 54, 108, 54, 111, 54, 111, 54, 114, 14, 55, 54, 77, 54, 97, 54, 116, 54, 104, 8, 55, 54, 114, 54, 97, 54, 110, 54, 100, 54, 111, 54, 109, 14, 25, 0, 3, 10, 9, 55, 54, 108, 54, 101, 54, 110, 54, 103, 54, 116, 54, 104, 15, 10, 40, 25, 1, 13, 4, 61, 12, 9, 6, 11, 3, 10, 9, 3, 14, 9, 11, 15, 10, 38, 13, 4, 61, 13, 9, 6, 11, 6, 5, 1, 5, 0, 3, 1, 38, 13, 4, 61, 0, 5, 0, 43, 4, 21, 291, 61, 3, 12, 9, 11, 0, 3, 9, 9, 49, 72, 0, 2, 3, 4, 13, 4, 61, 8, 9, 21, 721, 3, 2, 8, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 4, 55, 54, 115, 54, 101, 54, 108, 54, 102, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 510, 4, 21, 523, 22, 4, 55, 54, 115, 54, 101, 54, 108, 54, 102, 8, 10, 0, 55, 54, 119, 54, 105, 54, 110, 54, 100, 54, 111, 54, 119, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 566, 4, 21, 583, 3, 4, 55, 54, 119, 54, 105, 54, 110, 54, 100, 54, 111, 54, 119, 8, 10, 0, 55, 54, 103, 54, 108, 54, 111, 54, 98, 54, 97, 54, 108, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 626, 4, 21, 643, 25, 4, 55, 54, 103, 54, 108, 54, 111, 54, 98, 54, 97, 54, 108, 8, 10, 0, 55, 54, 69, 54, 114, 54, 114, 54, 111, 54, 114, 8, 55, 54, 117, 54, 110, 54, 97, 54, 98, 54, 108, 54, 101, 54, 32, 54, 116, 54, 111, 54, 32, 54, 108, 54, 111, 54, 99, 54, 97, 54, 116, 54, 101, 54, 32, 54, 103, 54, 108, 54, 111, 54, 98, 54, 97, 54, 108, 54, 32, 54, 111, 54, 98, 54, 106, 54, 101, 54, 99, 54, 116, 27, 1, 23, 56, 0, 49, 444, 0, 0, 24, 0, 13, 4, 61, 8, 9, 55, 54, 95, 54, 95, 54, 103, 54, 101, 54, 116, 54, 83, 54, 101, 54, 99, 54, 117, 54, 114, 54, 105, 54, 116, 54, 121, 54, 83, 54, 105, 54, 103, 54, 110, 15, 21, 1126, 49, 2, 14, 3, 2, 9, 48, 61, 3, 9, 48, 61, 4, 9, 48, 61, 5, 9, 48, 61, 6, 9, 48, 61, 7, 9, 48, 61, 8, 9, 48, 61, 9, 9, 48, 61, 10, 9, 48, 61, 11, 9, 48, 61, 9, 9, 55, 54, 108, 54, 111, 54, 99, 54, 97, 54, 116, 54, 105, 54, 111, 54, 110, 8, 10, 30, 55, 54, 117, 54, 110, 54, 100, 54, 101, 54, 102, 54, 105, 54, 110, 54, 101, 54, 100, 32, 28, 22, 862, 21, 932, 21, 4, 55, 54, 108, 54, 111, 54, 99, 54, 97, 54, 116, 54, 105, 54, 111, 54, 110, 8, 55, 54, 104, 54, 111, 54, 115, 54, 116, 14, 55, 54, 105, 54, 110, 54, 100, 54, 101, 54, 120, 54, 79, 54, 102, 14, 55, 54, 121, 54, 46, 54, 113, 54, 113, 54, 46, 54, 99, 54, 111, 54, 109, 25, 1, 3, 0, 3, 1, 39, 32, 22, 963, 4, 55, 54, 67, 54, 74, 54, 66, 54, 80, 54, 65, 54, 67, 54, 114, 54, 82, 54, 117, 54, 78, 54, 121, 54, 55, 21, 974, 50, 4, 3, 12, 9, 11, 3, 8, 3, 10, 24, 2, 13, 4, 61, 10, 9, 3, 13, 9, 55, 54, 95, 54, 95, 54, 115, 54, 105, 54, 103, 54, 110, 54, 95, 54, 104, 54, 97, 54, 115, 54, 104, 54, 95, 54, 50, 54, 48, 54, 50, 54, 48, 54, 48, 54, 51, 54, 48, 54, 53, 15, 10, 22, 1030, 21, 1087, 22, 4, 3, 13, 9, 55, 54, 95, 54, 95, 54, 115, 54, 105, 54, 103, 54, 110, 54, 95, 54, 104, 54, 97, 54, 115, 54, 104, 54, 95, 54, 50, 54, 48, 54, 50, 54, 48, 54, 48, 54, 51, 54, 48, 54, 53, 15, 3, 9, 9, 11, 3, 3, 9, 11, 38, 25, 1, 13, 4, 61, 11, 9, 3, 12, 9, 11, 3, 10, 3, 53, 3, 37, 39, 24, 2, 13, 4, 4, 55, 54, 122, 54, 122, 54, 97, 3, 11, 9, 11, 38, 3, 10, 9, 11, 38, 0, 49, 771, 2, 1, 12, 9, 13, 8, 3, 12, 4, 4, 56, 0], A);
    var O, Q, L, z, U, N, F, B, J, W, V, H, G, X, Z, Y, K, ee, te, ne, oe, ie, re, ae, se, ce, le, ue, de, pe, me, fe, he, ge, _e, we, be, ve, ye, qe, xe, ke, Se, Te, Ce, Me, Ee, De, Ie, je, Re, Pe, Ae, Oe, Qe, Le = A.__getSecuritySign;
    delete A.__getSecuritySign,
    M.getSecuritySign = Le,
    O = {
        set: function(e, t, n, o, i) {
            if (i) {
                var r = new Date;
                r.setTime(r.getTime() + 36e5 * i)
            }
            document.cookie = e + "=" + t + "; " + (r ? "expires=" + r.toGMTString() + ";" : "") + "domain=" + (n || location.host) + ";path=" + (o || "/") + ";"
        },
        get: function(e) {
            var t;
            return function(e) {
                if (!e)
                    return e;
                for (; e != decodeURIComponent(e); )
                    e = decodeURIComponent(e);
                for (var t = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], o = 0; o < t.length; o++)
                    e = e.replace(new RegExp(t[o],"gi"), n[o]);
                return e
            }((t = document.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)"))) ? decodeURIComponent(t[2]) : "")
        },
        del: function(e, t, n) {
            document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT;" + (n ? "path=" + n + "; " : "path=/; ") + "domain=" + (t || location.host) + ";"
        }
    },
    M.cookie = O,
    function(e) {
        var n;
        function o(e) {
            return 65535 < e ? String.fromCodePoint ? String.fromCodePoint(e) : null == (t = "&#" + e + ";") || "" == t ? "" : (n || (n = document.createElement("div")),
            n.innerHTML = t,
            n.textContent || n.innerText) : String.fromCharCode(e);
            var t
        }
        e.encodeHTML = function(e) {
            for (var t = "", n = 0; n < e.length; n++)
                /\W/.test(e[n]) && e.charCodeAt(n) < 256 ? t += "&#" + e.charCodeAt(n) + ";" : t += e[n];
            return t
        }
        ,
        e.decodeHTML = function(e) {
            return (t = e,
            null == t ? "" : t + "").replace(/&amp;/g, "&#38;").replace(/&lt;/g, "&#60;").replace(/&gt;/g, "&#62;").replace(/&quot;/g, "&#34;").replace(/&apos;/g, "&#39;").replace(/&nbsp;/g, "&#160;").replace(/&#(\d+);?/g, function(e, t) {
                return o(t)
            }).replace(/&#x([0-9a-f]+);?/gi, function(e, t) {
                return o(parseInt(t, 16))
            });
            var t
        }
        ,
        e.base64DecodeUnicode = function(e) {
            return decodeURIComponent(atob(e).split("").map(function(e) {
                return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        }
        ,
        e.base64EncodeUnicode = function(e) {
            return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
                return String.fromCharCode("0x" + t)
            }))
        }
    }(M),
    (Q = M).getParam = function(e, t) {
        var n = (t || location.href).split("#")[0]
          , o = new RegExp("(\\?|&)" + e + "=(.*?)(#|&|$)","i")
          , i = n.match(o);
        return decodeURIComponent(i ? i[2] : "")
    }
    ,
    Q.delParam = function(e, t) {
        var n = new RegExp("(\\?|#|&)(" + e + "=.*?)(#|&|$)")
          , o = (t = t || location.href).match(n);
        if (o && 3 <= o.length && o[2]) {
            var i = o[0]
              , r = o[2];
            return "&" == i.charAt(0) && (r = "&" + r),
            t.replace(r, "")
        }
        return t
    }
    ,
    Q.addParam = function(e, t) {
        if (t = t || location.href,
        "object" != typeof e && !e)
            return t;
        var n = e;
        if ("object" == typeof e) {
            for (var o in n = [],
            e)
                n.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
            n = n.join("&")
        }
        return t = /\?/.test(t) || /#/.test(t) ? /\?/.test(t) && !/#/.test(t) ? t + "&" + n : !/\?/.test(t) && /#/.test(t) ? t.replace("#", "?" + n + "#") : t.replace("?", "?" + n + "&") : t + "?" + n
    }
    ,
    Q.param2Obj = function(e) {
        var t = (e + "").trim().match(/([^?#]*)(#.*)?$/);
        if (!t)
            return {};
        var n = t[1].split("&")
          , i = {};
        return n.forEach(function(e) {
            var t;
            if (t = e.split("=", 1)[0]) {
                var n = decodeURIComponent(t)
                  , o = e.substring(n.length + 1);
                void 0 !== o && (o = decodeURIComponent(o)),
                n in i ? (i[n].constructor != Array && (i[n] = [i[n]]),
                i[n].push(o)) : i[n] = o
            }
        }),
        i
    }
    ,
    L = M,
    Array.prototype.forEach.call("Object,Function,String,Number,Boolean,Date,Undefined,Null,Array,File".split(","), function(t, e) {
        L["is" + t] || (L["is" + t] = function(e) {
            return Object.prototype.toString.call(e) === "[object " + t + "]"
        }
        )
    }),
    L.isPlainObject = function(e) {
        return L.isObject(e) && null != e && e != e.window && Object.getPrototypeOf(e) == Object.prototype
    }
    ,
    L.isTrueEmpty = function(e) {
        return null == e || "" === e || L.isNumber(e) && isNaN(e)
    }
    ,
    L.isEmpty = function(e) {
        if (L.isTrueEmpty(e))
            return !0;
        if (L.isObject(e)) {
            for (var t in e)
                return !t && !0;
            return !0
        }
        return L.isArray(e) ? 0 === e.length : L.isString(e) ? 0 === e.length : L.isNumber(e) ? 0 === e : !!L.isBoolean(e) && !e
    }
    ,
    L.type = function(e) {
        return isNaN(e) ? "nan" : Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
    }
    ,
    function(w) {
        var b = /\bH5Proxy\[1\]/i.test(navigator.userAgent)
          , v = 0
          , e = function() {}
          , y = document.createElement("a");
        y.href = window.location.href;
        var q = {
            url: window.location.toString(),
            type: "GET",
            data: {},
            dataType: "json",
            beforeSend: e,
            success: e,
            error: e,
            complete: e,
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: "application/json",
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0
        };
        function x(e, t, n) {
            t.success.call(window, e, n),
            t.complete.call(window, n)
        }
        function k(e, t, n, o) {
            n.error.call(window, o, t, e),
            n.complete.call(window, o)
        }
        w._ajax = function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
              , o = w.extend(!0, {}, e);
            for (var t in q)
                void 0 === o[t] ? o[t] = q[t] : o[t] = o[t];
            var n = o.dataType.toLowerCase();
            o.url = w.addParam({
                _: Date.now()
            }, o.url),
            w.browser && w.browser.mqq && (o.url = o.url.replace(/^(?:https?:)?\/\/(sh|sz)?(u|c)?.y.qq.com\//, "//$1$26.y.qq.com/")),
            e.data && o.processData && !w.isString(o.data) && (o.data = w.param(o.data)),
            o.type = null == o.type ? "GET" : o.type.toString();
            var i, r, a, s, c, l = o.type.toUpperCase();
            if ("GET" === l ? (o.url = w.addParam(o.data, o.url),
            delete o.data) : "POST" === l && b && /^(?:https?:)?\/\/(?:u|c)6?.y.qq.com\//i.test(o.url) && (o.url = o.url.replace(/\/\/(.*?)\//, "//ct.y.qq.com/$1/")),
            "jsonp" == n)
                return r = (i = o).jsonpCallback || "jsonp" + ++v,
                a = document.createElement("script"),
                s = null,
                c = 0,
                window[r] = function() {
                    s = arguments
                }
                ,
                a.src = w.addParam((i.jsonp || "jsonpCallback") + "=" + r, i.url),
                void (!(a.onload = a.onerror = function(e) {
                    clearTimeout(c),
                    a.parentNode.removeChild(a),
                    "error" != e.type && s ? x(s[0], i, a) : k(e, "error", i, a),
                    s = null
                }
                ) !== i.beforeSend() ? (document.head.appendChild(a),
                0 < i.timeout && (c = setTimeout(function() {
                    k(null, "timeout", i, a)
                }, i.timeout))) : k(null, "abort", i, a));
            var u = q.accepts[n]
              , d = {}
              , p = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol
              , m = new XMLHttpRequest
              , f = 0;
            if (d.Accept = u || "*/*",
            !o.crossDomain) {
                var h = document.createElement("a");
                h.href = o.url,
                o.crossDomain = y.protocol + "//" + y.host != h.protocol + "//" + h.host
            }
            if (o.mimeType && (-1 < (u = o.mimeType).indexOf(",") && (u = u.split(",", 2)[0]),
            m.overrideMimeType && m.overrideMimeType(u)),
            (o.contentType || !1 !== o.contentType && o.data && "GET" != o.type.toUpperCase()) && (d["Content-Type"] = o.contentType || "application/x-www-form-urlencoded"),
            o.crossDomain || (d["X-Requested-With"] = "XMLHttpRequest"),
            o.headers)
                for (var g in o.headers)
                    d[g] = o.headers[g];
            if (!(m.onreadystatechange = function() {
                if (4 == m.readyState) {
                    clearTimeout(f);
                    var t = null
                      , e = null;
                    if (200 <= m.status && m.status <= 300 || 304 == m.status || 0 == m.status && "file:" == p) {
                        var n = u || m.getResponseHeader("content-type");
                        e = m.responseText;
                        try {
                            /^(?:text|application)\/xml/i.test(n) ? e = m.responseXML : "application/json" == n && (e = /^\s*$/.test(e) ? null : JSON.parse(e))
                        } catch (e) {
                            t = e
                        }
                        t ? k(t, "parsererror", o, m) : x(e, o, m)
                    } else
                        k(m.statusText || null, m.status ? "error" : "abort", o, m)
                }
            }
            ) !== o.beforeSend()) {
                for (var _ in m.open(o.type, o.url, o.async || !0, o.username, o.password),
                o.withCredentials && (m.withCredentials = !0),
                d)
                    m.setRequestHeader(_, d[_]);
                0 < o.timeout && (f = setTimeout(function() {
                    m.abort()
                }, o.timeout)),
                m.send(o.data || null)
            } else
                m.abort()
        }
        ,
        w.ajax = function() {
            var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
              , i = {
                report: void 0 === o.H5LogReport ? /\.fcg/.test(o.url) : o.H5LogReport
            }
              , e = w.user.getSession()
              , t = /shop\.y\.qq\.com/.test(o.url) || /c6?\.y\.qq\.com\/shop/.test(o.url) ? "p_skey" : "";
            !/^post$/i.test(o.type) && o.postType && delete o.postType;
            var r = {
                data: {
                    g_tk: w.getACSRFToken(t, /^(https?:)?\/\/u6?.y.qq.com\//.test(o.url)),
                    g_tk_new_20200303: w.getACSRFToken("", !0),
                    uin: e.uin || 0,
                    format: "json",
                    inCharset: "utf-8",
                    outCharset: "utf-8",
                    notice: 0,
                    platform: "h5",
                    needNewCode: 1
                },
                timeout: 1e4,
                withCredentials: 1,
                cache: !1
            };
            w.browser.music && (r.data.ct = 23,
            r.data.cv = 0),
            w.browser.qmkege && (r.data.g_tk_openkey = w.getACSRFToken("openkey")),
            o.postType && (r.data = {
                comm: r.data
            }),
            o.data && "string" == typeof o.data && (o.data = w.param2Obj(o.data)),
            w.extend(!0, r, o);
            var n = document.createElement("a");
            n.href = r.url || "";
            var a = {
                domain: n.hostname,
                cgi: n.protocol + "//" + n.host + n.pathname,
                timeout: r.timeout,
                report: 0 != o.reportCode,
                retry: 0 != o.retry,
                error: []
            };
            n = null,
            setTimeout(function() {
                try {
                    w.tj.sendClick("cgidomain." + a.domain.replace(/\./g, "_"))
                } catch (e) {
                    console.log("cgi domain report error")
                }
            }, 10),
            a.retry && (a.retry = /^(?:sz|sh)?[cu]6?.y.qq.com$/.test(a.domain));
            var s = /^(?:sz|sh)?[cu]6.y.qq.com$/.test(a.domain)
              , c = function(e, t, n) {
                try {
                    n || (n = "code"),
                    null != e && (a[n] = e)
                } catch (e) {
                    console.log(e)
                }
            };
            return r.success = function(e) {
                w.browser.music && r.timestamp && i.report && (0 != e.code || e.retcode && 0 != e.retcode) && (i.code = void 0 === e.code ? e.retcode : e.code,
                i.data = e,
                i.status = "error"),
                a.report && (a.endTime = +new Date),
                e && c(null != e.code ? e.code : e.retcode),
                !(a.retry && a.code < 0) || a.retry_sh && a.retry_sz ? w.isFunction(o.success) && o.success.apply(this, arguments) : a.needRetry = 1
            }
            ,
            r.error = function(e, t) {
                var n = {
                    abort: -601,
                    error: -602,
                    parsererror: -603,
                    timeout: -604
                };
                w.browser.music && r.timestamp && i.report && (i.data = e,
                i.status = t || "error",
                e.status && 200 != e.status ? i.code = -e.status : i.code = n[t] || -500),
                a.report && (a.endTime = +new Date,
                a.error.push(t),
                e.status && 200 != e.status ? c(-e.status) : c(n[t] || -500),
                !a.retry || a.retry_sh && a.retry_sz ? a.retry && !a._extraTry && -604 == a.code && /fcg_mpay_buy_item|fcg_dmrp_draw_lottery|fcg_dmrp_get_userinfo|fcg_dmrp_send_lottery|fcg_mmrp_cdkey_new/.test(a.cgi) ? (a.needRetry = 1,
                a.tryArea = "sz",
                a._extraTry = 1) : w.isFunction(o.error) && o.error.apply(this, arguments) : a.needRetry = 1)
            }
            ,
            r.complete = function(e) {
                if (a.retry) {
                    /sh/.test(a.domain) ? a.area = "sh" : /sz/.test(a.domain) ? a.area = "sz" : a.area = e.getResponseHeader && e.getResponseHeader("area");
                    var t = a.area || "none";
                    if (a[t + "_startTime"] = a.startTime,
                    a[t + "_endTime"] = a.endTime,
                    a[t + "_code"] = a.code,
                    a[t + "_time"] = a.endTime - a.startTime,
                    a.needRetry)
                        return /^sh|sz$/.test(a.area) ? (a["time_" + a.area] = a.endTime - a.startTime,
                        c(a.code, 0, "code_" + a.area),
                        a["retry_" + a.area] = 1,
                        a.area = "sh" == a.area ? "sz" : "sh") : a.area = Math.random() < .5 ? "sh" : "sz",
                        a["retry_" + a.area] = 1,
                        a.domain = a.area + (/c6?.y/.test(a.domain) ? "c" : "u") + (s ? "6" : "") + ".y.qq.com",
                        r.url = r.url.replace(/(?:sz|sh)?[cu]6?.y.qq.com/, a.domain),
                        delete a.needRetry,
                        delete r.beforeSend,
                        void setTimeout(function() {
                            a.startTime = +new Date,
                            i && i.report && (r.timestamp = +new Date),
                            w._ajax(r)
                        }, 0)
                }
                a.report && !1 !== e.reportCode && ((a = w.extend(a, w.isObject(o.reportCode) && o.reportCode, w.isObject(e.reportCode) && e.reportCode)).time = a.endTime - a.startTime,
                a.totaltime = a.endTime - a._startTime,
                function(e) {
                    try {
                        w.reportCode(e)
                    } catch (e) {
                        console.log(e)
                    }
                }(a)),
                i && i.report && i.data && w.ajaxReport(r, i),
                w.isFunction(o.complete) && o.complete.apply(this, arguments)
            }
            ,
            i && i.report && (r.timestamp = +new Date),
            r.postType && (r.data = JSON.stringify(r.data)),
            a.report && (a._startTime = a.startTime = +new Date),
            w._ajax(r),
            w
        }
    }(M),
    (z = M).uajax = function() {
        var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
          , u = {
            report: void 0 === o.H5LogReport || o.H5LogReport
        }
          , a = []
          , n = []
          , d = []
          , p = []
          , m = {
            type: "post",
            url: "//u.y.qq.com/cgi-bin/musics.fcg",
            comm: {
                g_tk: z.getACSRFToken("", !0),
                uin: z.user.getUin() || 0,
                format: "json",
                platform: "h5"
            },
            dataType: "json",
            timeout: 1e4,
            withCredentials: 1,
            retry: !0,
            report: !0
        };
        z.browser.music && (m.comm.ct = 23,
        m.comm.cv = 0),
        m = z.extend(!0, m, o);
        var t = /post/i.test(m.type)
          , f = {
            report: 0 != m.report,
            retry: 0 != m.retry
        };
        if (f.report || f.retry) {
            var e = document.createElement("a");
            e.href = m.url,
            f.domain = e.hostname,
            f.cgi = e.protocol + "//" + e.host + e.pathname,
            f = z.extend({}, m.report, f),
            e = null
        }
        f.retry && (f.retry = /^(?:sz|sh)?u6?.y.qq.com$/.test(f.domain));
        window.xxy = z.getSecuritySign;
        var h = /^(?:sz|sh)?u6.y.qq.com$/.test(f.domain)
          , g = ""
          , _ = /^(https?:)?\/\/u6?.y.qq.com\/cgi-bin\/musics.fcg/.test(m.url)
          , w = function(e) {
            t ? (e.comm = m.comm,
            m.data = JSON.stringify(e),
            _ && (g = z.getSecuritySign(m.data))) : (m.data = z.extend({}, m.comm),
            m.data.data = JSON.stringify(e),
            _ && (g = z.getSecuritySign(m.data.data)))
        }
          , b = function(t) {
            n.forEach(function(e) {
                e(t, d)
            }),
            n.length = 0
        }
          , i = function() {
            var i = !0
              , r = {}
              , s = {};
            if (a.forEach(function(e, t) {
                var n = e.data;
                if (n.module && n.method) {
                    var o = "req_" + t;
                    e.index = t,
                    f.report && (e.report = z.extend({}, m.report, {
                        cgi: n.module + "." + n.method
                    })),
                    n.param || (n.param = {}),
                    s[o] = e,
                    r[o] = n,
                    i = 0
                } else
                    e.callback && e.callback()
            }),
            a = null,
            i)
                return b();
            w(r);
            var c = void 0
              , l = void 0;
            m.success = function(e) {
                z.browser.music && m.timestamp && u.report && (0 != e.code || e.retcode && 0 != e.retcode) && (u.code = void 0 === e.code ? e.retcode : e.code,
                u.data = e,
                u.status = "error"),
                f.endTime = +new Date,
                l = e || {}
            }
            ,
            m.error = function(e, t) {
                z.browser.music && m.timestamp && u.report && (u.data = e,
                u.status = t || "error",
                e.status && 200 != e.status ? u.code = -e.status : u.code = {
                    abort: -601,
                    error: -602,
                    parsererror: -603,
                    timeout: -604
                }[t] || -500),
                f.endTime = +new Date,
                c = t
            }
            ,
            m.complete = function(e) {
                var t;
                f.report && (f.time = f.endTime - f.startTime,
                f.totaltime = f.endTime - f._startTime),
                c ? t = e.status && 200 != e.status ? -e.status : {
                    abort: -601,
                    error: -602,
                    parsererror: -603,
                    timeout: -604
                }[c] || -500 : l && 0 != l.code && (t = l.code,
                c = l),
                f.code = t || 0,
                (f.retry || f.report) && (/sh/.test(f.domain) ? f.area = "sh" : /sz/.test(f.domain) ? f.area = "sz" : f.area = e.getResponseHeader && e.getResponseHeader("area"),
                f.area && (f["retry_" + f.area] = 1));
                var n = {}
                  , o = 0;
                for (var i in s) {
                    var r = s[i]
                      , a = l && l[i];
                    d[r.index] = a,
                    r.code = t || a && a.code,
                    a && (a.ts = l.ts),
                    f.report && (r.report.code = r.code,
                    r.report.time = f.time,
                    r.report.totaltime = f.totaltime,
                    r.report.area = f.area),
                    !f.retry || !(c || r.code < 0) || f.retry_sh && f.retry_sz ? (r.callback && r.callback(c, a),
                    p.push(r.report),
                    delete s[i]) : (n[i] = r.data,
                    o = 1,
                    f.area && (r.report["time_" + f.area] = f.time,
                    r.report["code_" + f.area] = r.code))
                }
                o ? (/^sh|sz$/.test(f.area) ? (f["time_" + f.area] = f.endTime - f.startTime,
                f["code_" + f.area] = f.code,
                f.area = "sh" == f.area ? "sz" : "sh") : f.area = Math.random() < .5 ? "sh" : "sz",
                f.domain = "//" + f.area + (h ? "u6" : "u") + ".y.qq.com",
                m.url = m.url.replace(/\/\/(?:sz|sh)?u6?.y.qq.com/, f.domain),
                delete m.beforeSend,
                l = c = null,
                w(n),
                setTimeout(function() {
                    u && u.report && (m.timestamp = +new Date),
                    f.startTime = +new Date,
                    _ && (m.url = z.addParam({
                        sign: g
                    }, m.url)),
                    z._ajax(m)
                }, 0)) : (u && u.report && u.data && z.ajaxReport(m, u),
                f.report && (z.reportCode(f),
                p.forEach(z.reportCode),
                p.length = 0),
                b(c))
            }
            ,
            u && u.report && (m.timestamp = +new Date),
            f._startTime = f.startTime = +new Date,
            _ && (m.url = z.addParam({
                sign: g
            }, m.url)),
            z._ajax(m)
        };
        return {
            request: function(e, t) {
                if (a) {
                    var n = 0 === a.length;
                    return a.push({
                        data: e || {},
                        callback: z.isFunction(t) && t
                    }),
                    n && setTimeout(function() {
                        i()
                    }, 0),
                    this
                }
                return z.uajax(o).request(e, t)
            },
            complete: function(e) {
                return z.isFunction(e) && (n ? n.push(e) : e()),
                this
            }
        }
    }
    ,
    function(a) {
        a.fn = a.fn || {},
        a.matches = function(e, t) {
            if (!t || !e || 1 !== e.nodeType)
                return !1;
            var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
            if (n)
                return n.call(e, t);
            var o, i = e.parentNode, r = !i;
            return r && (i = tempParent).appendChild(e),
            o = ~a.qsa(i, t).indexOf(e),
            r && tempParent.removeChild(e),
            o
        }
        ;
        var s = /^[\w-]*$/
          , c = [].slice
          , o = /([A-Z])/g;
        function l(e) {
            return null != e && e.nodeType == e.DOCUMENT_NODE
        }
        function i(e) {
            return "object" == a.type(e)
        }
        a._z = function(e, t) {
            return e = e || [],
            (e = a.extend(e, a.fn)).selector = t || "",
            e
        }
        ,
        a.qsa = function(e, t) {
            var n, o = "#" == t[0], i = !o && "." == t[0], r = o || i ? t.slice(1) : t, a = s.test(r);
            return l(e) && a && o ? (n = e.getElementById(r)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : c.call(a && !o ? i ? e.getElementsByClassName(r) : e.getElementsByTagName(t) : e.querySelectorAll(t))
        }
        ,
        a.fn.closest = function(e, t) {
            var n = this[0]
              , o = !1;
            for ("object" == typeof e && (o = $(e)); n && !(o ? 0 <= o.indexOf(n) : a.matches(n, e)); )
                n = n !== t && !l(n) && n.parentNode;
            return a.select(n)
        }
        ,
        a.fn.data = function(e, t) {
            var n = this.attr("data-" + e.replace(o, "-$1").toLowerCase(), t);
            return null !== n ? function(t) {
                var e;
                try {
                    return t ? "true" == t || "false" != t && ("null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? $.parseJSON(t) : t : e) : t
                } catch (e) {
                    return t
                }
            }(n) : void 0
        }
        ,
        a.fn.attr = function(t, n) {
            var e;
            return "string" == typeof t && void 0 === n ? 0 == this.length || 1 !== this[0].nodeType ? void 0 : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(e = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : e : this.each(function(e) {
                if (1 === this.nodeType)
                    if (i(t))
                        for (key in t)
                            setAttribute(this, key, t[key]);
                    else
                        setAttribute(this, t, funcArg(this, n, e, this.getAttribute(t)))
            })
        }
        ,
        a.select = function(e) {
            var t, n = void 0;
            if (!e)
                return a._z();
            if ("string" == typeof e)
                e = e.trim(),
                n = a.qsa(document, e);
            else {
                if (!i(e) && (null == (t = e) || t.nodeType != t.ELEMENT_NODE))
                    return e;
                n = [e],
                e = null
            }
            return a._z(n, e)
        }
    }(M),
    function(u) {
        var t = 1
          , d = void 0
          , c = Array.prototype.slice
          , l = u.isFunction
          , p = function(e) {
            return "string" == typeof e
        }
          , m = {}
          , r = {}
          , n = "onfocusin"in window
          , o = {
            focus: "focusin",
            blur: "focusout"
        }
          , f = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        function h(e) {
            return e._zid || (e._zid = t++)
        }
        function a(e, t, n, o) {
            var i, r = void 0;
            return (t = g(t)).ns && (i = t.ns,
            r = new RegExp("(?:^| )" + i.replace(" ", " .* ?") + "(?: |$)")),
            (m[h(e)] || []).filter(function(e) {
                return e && (!t.e || e.e == t.e) && (!t.ns || r.test(e.ns)) && (!n || h(e.fn) === h(n)) && (!o || e.sel == o)
            })
        }
        function g(e) {
            var t = ("" + e).split(".");
            return {
                e: t[0],
                ns: t.slice(1).sort().join(" ")
            }
        }
        function _(e, t) {
            return e.del && !n && e.e in o || !!t
        }
        function w(e) {
            return f[e] || n && o[e] || e
        }
        function b(i, e, t, r, a, s, c) {
            var n = h(i)
              , l = m[n] || (m[n] = []);
            e.split(/\s/).forEach(function(e) {
                var n = g(e);
                n.fn = t,
                n.sel = a,
                n.e in f && (t = function(e) {
                    var t = e.relatedTarget;
                    if (!t || t !== this && !u.contains(this, t))
                        return n.fn.apply(this, arguments)
                }
                );
                var o = (n.del = s) || t;
                n.proxy = function(e) {
                    if (!(e = q(e)).isImmediatePropagationStopped()) {
                        e.data = r;
                        var t = o.apply(i, e._args == d ? [e] : [e].concat(e._args));
                        return !1 === t && (e.preventDefault(),
                        e.stopPropagation()),
                        t
                    }
                }
                ,
                n.i = l.length,
                l.push(n),
                "addEventListener"in i && i.addEventListener(w(n.e), n.proxy, _(n, c))
            })
        }
        function v(t, e, n, o, i) {
            var r = h(t);
            (e || "").split(/\s/).forEach(function(e) {
                a(t, e, n, o).forEach(function(e) {
                    delete m[r][e.i],
                    "removeEventListener"in t && t.removeEventListener(w(e.e), e.proxy, _(e, i))
                })
            })
        }
        r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents",
        u.event = {
            add: b,
            remove: v
        },
        u.proxy = function(e, t) {
            if (l(e)) {
                var n = function() {
                    return e.apply(t, arguments)
                };
                return n._zid = h(e),
                n
            }
            if (p(t))
                return u.proxy(e[t], e);
            throw new TypeError("expected function")
        }
        ,
        u.fn.bind = function(e, t, n) {
            return this.on(e, t, n)
        }
        ,
        u.fn.unbind = function(e, t) {
            return this.off(e, t)
        }
        ,
        u.fn.one = function(e, t, n, o) {
            return this.on(e, t, n, o, 1)
        }
        ;
        var s = function() {
            return !0
        }
          , y = function() {
            return !1
        }
          , i = /^([A-Z]|returnValue$|layer[XY]$)/
          , e = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        function q(o, i) {
            return !i && o.isDefaultPrevented || (i || (i = o),
            u.each(e, function(e, t) {
                var n = i[e];
                o[e] = function() {
                    return this[t] = s,
                    n && n.apply(i, arguments)
                }
                ,
                o[t] = y
            }),
            (i.defaultPrevented !== d ? i.defaultPrevented : "returnValue"in i ? !1 === i.returnValue : i.getPreventDefault && i.getPreventDefault()) && (o.isDefaultPrevented = s)),
            o
        }
        function x(e) {
            var t = void 0
              , n = {
                originalEvent: e
            };
            for (t in e)
                i.test(t) || e[t] === d || (n[t] = e[t]);
            return q(n, e)
        }
        u.fn.delegate = function(e, t, n) {
            return this.on(t, e, n)
        }
        ,
        u.fn.undelegate = function(e, t, n) {
            return this.off(t, e, n)
        }
        ,
        u.fn.on = function(e, i, t, r, n) {
            var a = void 0
              , s = void 0;
            return p(i) || l(r) || !1 === r || (r = t,
            t = i,
            i = d),
            (l(t) || !1 === t) && (r = t,
            t = d),
            !1 === r && (r = y),
            this.forEach(function(o) {
                n && (a = function(e) {
                    return v(o, e.type, r),
                    r.apply(this, arguments)
                }
                ),
                i && (s = function(e) {
                    var t = void 0
                      , n = u.select(e.target).closest(i, o)[0];
                    if (n && n !== o)
                        return t = u.extend(x(e), {
                            currentTarget: n,
                            liveFired: o
                        }),
                        (a || r).apply(n, [t].concat(c.call(arguments, 1)))
                }
                ),
                b(o, e, r, t, i, s || a)
            })
        }
        ,
        u.fn.off = function(t, n, o) {
            return p(n) || l(o) || !1 === o || (o = n,
            n = d),
            !1 === o && (o = y),
            this.forEach(function(e) {
                v(e, t, o, n)
            }),
            this
        }
        ,
        u.fn.trigger = function(t, n) {
            return (t = p(t) || u.isPlainObject(t) ? u.event(t) : q(t))._args = n,
            this.forEach(function(e) {
                "dispatchEvent"in e ? e.dispatchEvent(t) : u.selector(e).triggerHandler(t, n)
            })
        }
        ,
        u.fn.triggerHandler = function(t, n) {
            var o = void 0
              , i = void 0;
            return this.forEach(function(e) {
                (o = x(p(t) ? u.event(t) : t))._args = n,
                o.target = e,
                u.each(a(e, t.type || t), function(e, t) {
                    if (i = t.proxy(o),
                    o.isImmediatePropagationStopped())
                        return !1
                })
            }),
            i
        }
        ,
        "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
            u.fn[t] = function(e) {
                return e ? this.bind(t, e) : this.trigger(t)
            }
        }),
        ["focus", "blur"].forEach(function(t) {
            u.fn[t] = function(e) {
                return e ? this.bind(t, e) : this.forEach(function() {
                    try {
                        this[t]()
                    } catch (e) {}
                }),
                this
            }
        }),
        u.event = function(e, t) {
            p(e) || (e = (t = e).type);
            var n = document.createEvent(r[e] || "Events")
              , o = !0;
            if (t)
                for (var i in t)
                    "bubbles" == i ? o = !!t[i] : n[i] = t[i];
            return n.initEvent(e, o, !0),
            q(n)
        }
    }(M),
    U = M,
    N = U.os = {},
    F = U.browser = {},
    B = navigator.userAgent,
    J = navigator.platform,
    W = B.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    V = B.match(/(Android);?[\s\/]+([\d.]+)?/),
    H = !!B.match(/\(Macintosh\; Intel /),
    G = B.match(/(iPad).*OS\s([\d_]+)/),
    X = B.match(/(iPod)(.*OS\s([\d_]+))?/),
    Z = !G && B.match(/(iPhone\sOS)\s([\d_]+)/),
    Y = B.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    K = /Win\d{2}|Windows/.test(J),
    ee = B.match(/Windows Phone ([\d.]+)/),
    te = Y && B.match(/TouchPad/),
    ne = B.match(/Kindle\/([\d.]+)/),
    oe = B.match(/Silk\/([\d._]+)/),
    ie = B.match(/(BlackBerry).*Version\/([\d.]+)/),
    re = B.match(/(BB10).*Version\/([\d.]+)/),
    ae = B.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    se = B.match(/PlayBook/),
    ce = B.match(/Chrome\/([\d.]+)/) || B.match(/CriOS\/([\d.]+)/),
    le = B.match(/Firefox\/([\d.]+)/),
    ue = B.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    de = B.match(/MSIE\s([\d.]+)/) || B.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    pe = !ce && B.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    me = pe || B.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),
    (F.webkit = !!W) && (F.version = W[1]),
    V && (N.android = !0,
    N.version = V[2]),
    Z && !X && (N.ios = N.iphone = !0,
    N.version = Z[2].replace(/_/g, ".")),
    G && (N.ios = N.ipad = !0,
    N.version = G[2].replace(/_/g, ".")),
    X && (N.ios = N.ipod = !0,
    N.version = X[3] ? X[3].replace(/_/g, ".") : null),
    ee && (N.wp = !0,
    N.version = ee[1]),
    Y && (N.webos = !0,
    N.version = Y[2]),
    te && (N.touchpad = !0),
    ie && (N.blackberry = !0,
    N.version = ie[2]),
    re && (N.bb10 = !0,
    N.version = re[2]),
    ae && (N.rimtabletos = !0,
    N.version = ae[2]),
    se && (F.playbook = !0),
    ne && (N.kindle = !0,
    N.version = ne[1]),
    oe && (F.silk = !0,
    F.version = oe[1]),
    !oe && N.android && B.match(/Kindle Fire/) && (F.silk = !0),
    ce && (F.chrome = !0,
    F.version = ce[1]),
    le && (F.firefox = !0,
    F.version = le[1]),
    ue && (N.firefoxos = !0,
    N.version = ue[1]),
    de && (F.ie = !0,
    F.version = de[1]),
    me && (H || N.ios || K) && (F.safari = !0,
    N.ios || (F.version = me[1])),
    pe && (F.webview = !0),
    N.tablet = !!(G || se || V && !B.match(/Mobile/) || le && B.match(/Tablet/) || de && !B.match(/Phone/) && B.match(/Touch/)),
    N.phone = !(N.tablet || N.ipod || !(V || Z || Y || ie || re || ce && B.match(/Android/) || ce && B.match(/CriOS\/([\d.]+)/) || le && B.match(/Mobile/) || de && B.match(/Touch/))),
    function(e) {
        e.browser.platform = "other";
        var t = navigator.userAgent
          , n = t.match(/\bQQMUSIC\/(\d[\.\d]*)/i) || t.match(/QQMUSIC\/(\d[\.\d]*)/i);
        n && (e.browser.platform = "music",
        e.browser.music = !0,
        n[1] && (parseInt(n[1]) < 1e3 ? (e.browser.ver = e.browser.version = parseFloat(n[1]),
        e.browser.appVer = n[1]) : e.browser.appVer = e.browser.ver = e.browser.version = parseFloat(n[1].replace("0", "."))));
        var o = t.match(/MicroMessenger\/(\d[\.\d]*)/i);
        o && (e.browser.platform = "weixin",
        e.browser.weixin = !0,
        o[1] && (e.browser.ver = e.browser.version = parseFloat(o[1]),
        e.browser.appVer = o[1]));
        var i, r, a, s, c, l, u = /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/, d = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/;
        (u.test(t) || d.test(t)) && (e.browser.platform = "mqq",
        e.browser.mqq = !0,
        e.os.ios ? (i = t.match(u),
        e.browser.appVer = i && i.length && i[3] || "0") : (i = t.match(d),
        e.browser.appVer = i && i.length && (0 <= e.compare(i[1], i[3]) ? i[1] : i[3]) || "0"));
        /Qzone\//.test(t) && (e.browser.platform = "qzone",
        e.browser.qzone = !0,
        e.browser.mqq = !1,
        e.browser.appVer = e.browser.ver = e.browser.version = (c = (s = t).split("Qzone/")[1],
        l = 0,
        (/V1_AND_QZ_/gi.test(s) || /V1_IPH_QZ/gi.test(s)) && (l = (c = c.split("_"))[3] + "." + c[4]),
        l),
        e.browser.qua = (a = (r = t).match(/Qzone\/([^\s]+)/)) && a[1] ? a[1] : r.split("Qzone/")[1].split(/\s+/)[0]);
        var p = t.match(/\bqmkege\/(\d[\.\d]*)/i);
        p && (e.browser.platform = "qmkege",
        e.browser.qmkege = !0,
        p[1] && (e.browser.appVer = p[1])),
        /\bReleased\[0\]/i.test(t) && (e.browser.iosReviewing = !0),
        /WeSecure|MQQSecure/.test(t) && (e.browser.platform = "tcs",
        e.browser.tcs = !0),
        /\/[\w. ]+MQQBrowser\//i.test(t) && (e.browser.platform = "qqbrowser",
        e.browser.qqbrowser = !0),
        /\bUCBrowser\/(\d[\.\d]*)/i.test(t) && (e.browser.platform = "uc",
        e.browser.uc = !0),
        /Weibo\ \(*/i.test(t) && (e.browser.platform = "weibo",
        e.browser.weibo = !0)
    }(M),
    fe = M,
    he = preact.render,
    ge = fe.createComponent({
        render: function() {
            return preact.h("style", null, '.qui_dialog__mask{position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;background:rgba(0,0,0,.6)}.qui_dialog__box{position:relative;display:-webkit-box;-webkit-box-orient:vertical;width:296px;max-height:68%;font:300 12px/1.5 sans-serif;color:#000;border-radius:5px;background:#fff}.qui_dialog__media{overflow:hidden;border-radius:5px 5px 0 0}.qui_dialog--only_pic .qui_dialog__media{border-radius:5px}.qui_dialog__img{display:block;width:100%}.qui_dialog__hd{margin-bottom:-19px;padding-top:25px}.qui_dialog__tit{margin:0 30px;text-align:center;font-weight:400;font-size:20px}.qui_dialog__bd{-webkit-box-flex:1;overflow:auto;margin:26px 0 18px;-webkit-overflow-scrolling:touch}.qui_dialog__para{margin:0 30px 8px;text-align:justify;word-wrap:break-word;word-break:break-all;font-size:16px}.qui_dialog__para--center{text-align:center}.qui_dialog__ft{position:relative;display:-webkit-box}.qui_dialog__btn{position:relative;display:block;-webkit-box-flex:1;width:0;height:45px;line-height:45px;text-align:center;text-decoration:none;font-size:16px;color:#000;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none}.qui_dialog__btn::after{content:"";position:absolute;top:0;left:0;right:0;z-index:1;height:1px;background:#E2E3E7}.qui_dialog__btn:last-child::before{content:"";position:absolute;top:1px;left:0;bottom:0;z-index:1;width:1px;background:#E2E3E7}.qui_dialog__ft--three{-webkit-box-orient:vertical}.qui_dialog__ft--three .qui_dialog__btn{width:100%;-webkit-box-flex:0}.qui_dialog__ft--three .qui_dialog__btn:last-child::before{display:none}.qui_dialog__btn--primary{color:#31c27c}.qui_dialog__btn_pill{display:block;height:40px;margin:0 30px 30px;line-height:40px;text-align:center;text-decoration:none;font-size:18px;color:#fff;border-radius:40px;background:#31c27c;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none}.qui_dialog__close{position:absolute;left:50%;bottom:-84px;-webkit-transform:translateX(-50%);-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none}.qui_dialog__close_txt{position:relative;display:block;width:37px;height:37px;margin:5px;line-height:999px;overflow:hidden;border:solid 1px #fff;border-radius:33px}.qui_dialog__close_txt::after,.qui_dialog__close_txt::before{content:"";position:absolute;background:#fff;-webkit-transform:rotate(45deg)}.qui_dialog__close_txt::before{width:1px;height:19px;top:9px;left:18px}.qui_dialog__close_txt::after{width:19px;height:1px;top:18px;left:9px}.noscroll,.noscroll body{height:100%;overflow:hidden}@media only screen and (max-width:320px){.qui_dialog__box{width:256px}.qui_dialog__hd{margin-bottom:-15px;padding-top:20px}.qui_dialog__tit{margin:0 24px;font-size:18px}.qui_dialog__bd{margin:20px 0 12px}.qui_dialog__para{margin:0 24px 4px;font-size:14px}.qui_dialog__btn{height:40px;line-height:40px;font-size:14px}.qui_dialog__btn_pill{height:36px;margin:0 24px 24px;line-height:36px;font-size:16px}}@media only screen and (-webkit-min-device-pixel-ratio:2){.qui_dialog__btn::after{-webkit-transform:scaleY(.5)}.qui_dialog__btn:last-child::before{-webkit-transform:scaleX(.5)}}a.qui_dialog__btn{text-decoration:none}.qui_dialog :focus{outline:none}')
        }
    }),
    _e = fe.createComponent({
        render: function() {
            var e = this.props
              , t = e.color
              , n = e.className
              , o = e.text;
            return preact.h("a", {
                href: "javascript:;",
                onTap: this.props.handleTap,
                class: "qui_dialog__btn " + n,
                style: t ? "color:" + t : ""
            }, o)
        }
    }),
    we = fe.createComponent({
        getInitialState: function() {
            return {
                active: 0,
                img: "",
                title: "",
                html: "",
                message: "",
                close: !1,
                forceHideClose: !1,
                center: !1,
                cb: null,
                contentComponent: "",
                btn: []
            }
        },
        componentWillMount: function() {
            var n = this;
            fe.dialog = {
                show: function(e) {
                    null == e ? e = {
                        title: "QQ音乐"
                    } : fe.isObject(e) || (e = {
                        message: "" + e
                    });
                    var t = fe.extend({
                        active: 1,
                        img: "",
                        title: "",
                        html: "",
                        message: "",
                        close: !1,
                        forceHideClose: !1,
                        center: !1,
                        cb: null,
                        contentComponent: "",
                        btn: []
                    });
                    n.setState(fe.extend(t, e))
                },
                close: function() {
                    n.setState({
                        active: 0
                    })
                },
                alert: function(e) {
                    fe.dialog.close();
                    var t = {
                        title: "QQ音乐",
                        message: "",
                        btn: "我知道了"
                    };
                    fe.isObject(e) ? t = fe.extend(t, e) : t.message = "" + e,
                    fe.dialog.show(t)
                },
                confirm: function(e) {
                    fe.dialog.close();
                    var t = {
                        title: "QQ音乐",
                        message: "",
                        btn: ["取消", "确定"]
                    };
                    fe.isObject(e) ? t = fe.extend(t, e) : t.message = e + "",
                    fe.isArray(t.btn) || (t.btn = "" + t.btn),
                    fe.isArray(t.btn) && 2 < t.btn.length && (t.btn = [t.btn[0]]),
                    fe.dialog.show(t)
                }
            },
            fe.alert = fe.dialog.alert,
            fe.confirm = fe.dialog.confirm
        },
        handleTap: function(e, t) {
            t.stopImmediatePropagation(),
            fe.dialog.close(),
            this.state.cb && this.state.cb(e)
        },
        render: function() {
            var i = this;
            if (!this.state.active)
                return preact.h("section", {
                    id: "js_mod_dialog",
                    class: "qui_dialog"
                });
            var r = fe.isArray(this.state.btn) ? this.state.btn : [this.state.btn]
              , e = [];
            this.state.img && e.push(preact.h("div", {
                class: "qui_dialog__media"
            }, preact.h("img", {
                class: "qui_dialog__img",
                onTap: this.handleTap.bind(this, r.length),
                src: this.state.img
            }))),
            this.state.title && e.push(preact.h("div", {
                class: "qui_dialog__hd"
            }, preact.h("h4", {
                class: "qui_dialog__tit"
            }, this.state.title)));
            var t = "qui_dialog__para" + (this.state.center ? " qui_dialog__para--center" : "");
            if (fe.isFunction(this.state.contentComponent))
                e.push(preact.h("div", {
                    class: "qui_dialog__bd"
                }, this.state.contentComponent()));
            else if (this.state.html)
                e.push(preact.h("div", {
                    class: "qui_dialog__bd"
                }, preact.h("div", {
                    class: t,
                    dangerouslySetInnerHTML: {
                        __html: this.state.html
                    }
                })));
            else if (this.state.message) {
                var n = fe.isArray(this.state.message) ? this.state.message : ("" + this.state.message).split("\n")
                  , o = [];
                n.forEach(function(e) {
                    o.push(preact.h("p", {
                        class: t
                    }, e))
                }),
                e.push(preact.h("div", {
                    class: "qui_dialog__bd"
                }, o))
            }
            var a = [];
            return r.forEach(function(e, t) {
                if (e) {
                    var n = fe.isObject(e) ? e.text : e
                      , o = "";
                    1 == e.type ? o = "qui_dialog__btn_pill" : 0 < t && t === r.length - 1 && (o = "qui_dialog__btn--primary"),
                    a.push(preact.h(_e, {
                        color: e.color,
                        text: n,
                        className: o,
                        handleTap: i.handleTap.bind(i, t)
                    }))
                }
            }),
            e.push(preact.h("div", {
                class: "qui_dialog__ft"
            }, a)),
            a.length && !this.state.close || this.state.forceHideClose || e.push(preact.h("a", {
                href: "javascript:;",
                class: "qui_dialog__close",
                onTap: this.handleTap.bind(this, -1)
            }, preact.h("span", {
                class: "qui_dialog__close_txt"
            }, "关闭"))),
            preact.h("section", {
                id: "js_mod_dialog",
                class: "qui_dialog"
            }, preact.h("div", {
                class: "qui_dialog__mask"
            }, preact.h("div", {
                class: "qui_dialog__box"
            }, e)))
        }
    }),
    he(preact.h(ge, null), document.head),
    he(preact.h(we, null), document.body),
    be = M,
    ve = preact.render,
    ye = be.createComponent({
        render: function() {
            return preact.h("style", null, '@charset "utf-8";.qui_toast{display:none}.qui_toast__mask{position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center}.qui_toast__box{padding:20px 20px 16px;font:300 12px/1.5 sans-serif;color:#fff;border-radius:5px;background:rgba(0,0,0,.8);opacity:0;-webkit-transform:scale(.7)}.qui_toast__tit{margin:0;text-align:center;max-width:10em;min-width:6em;max-height:48px;overflow:hidden;line-height:1.5;word-wrap:break-word;font-size:16px;font-weight:300}.qui_toast__icon{display:-webkit-box;-webkit-box-orient:vertical;-webkit-box-pack:center;-webkit-box-align:center;width:28px;height:28px;margin:0 auto 11px;border-radius:28px;border:solid 2px}.qui_toast__icon::after,.qui_toast__icon::before{content:"";display:block;background:currentColor}.qui_toast__icon--warn{color:#FD7072}.qui_toast__icon--info::before,.qui_toast__icon--warn::after{width:2px;height:2px;border-radius:2px;margin:2px 0;-webkit-transform:scale(1.5)}.qui_toast__icon--info::after,.qui_toast__icon--warn::before{width:2px;height:10px;margin:1px 0}.qui_toast__icon--success{position:relative}.qui_toast__icon--success::after,.qui_toast__icon--success::before{position:absolute;-webkit-transform:rotate(-45deg);-webkit-transform-origin:0 100%}.qui_toast__icon--success::before{top:13px;left:12px;width:2px;height:8px}.qui_toast__icon--success::after{top:19px;left:12px;width:14px;height:2px}.qui_toast--active{display:block}.qui_toast--active .qui_toast__box{-webkit-animation:ani_toast_scaleOut 350ms cubic-bezier(.17,.89,.32,1.27) forwards,ani_toast_fadeIn 350ms cubic-bezier(0,0,.2,1) forwards,ani_toast_scaleIn .2s cubic-bezier(.4,.8,.74,1) 1.15s,ani_toast_fadeOut .2s cubic-bezier(.4,.8,.74,1) 1.15s}@-webkit-keyframes ani_toast_scaleOut{0%{-webkit-transform:scale(.7)}72%{-webkit-transform:scale(1.03)}100%{-webkit-transform:scale(1)}}@-webkit-keyframes ani_toast_scaleIn{0%{-webkit-transform:scale(1)}100%{-webkit-transform:scale(.7)}}@-webkit-keyframes ani_toast_fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes ani_toast_fadeOut{0%{opacity:1}100%{opacity:0}}')
        }
    }),
    qe = be.createComponent({
        getInitialState: function() {
            return {
                active: 0,
                message: "",
                type: 0
            }
        },
        componentWillMount: function() {
            var n = this;
            be.tips = function(e, t) {
                n.setState({
                    message: e,
                    type: t,
                    active: 1
                }),
                setTimeout(function() {
                    n.close()
                }, 1350)
            }
        },
        close: function() {
            this.setState({
                active: 0
            })
        },
        render: function() {
            var e = this.state
              , t = e.message
              , n = e.type
              , o = e.active
              , i = "info";
            return 1 == n ? i = "success" : 2 == n && (i = "warn"),
            preact.h("div", {
                id: "js_mod_toast",
                class: "qui_toast " + (o ? "qui_toast--active" : "")
            }, preact.h("div", {
                class: "qui_toast__mask"
            }, preact.h("div", {
                class: "qui_toast__box"
            }, preact.h("i", {
                class: "qui_toast__icon qui_toast__icon--" + i
            }), preact.h("h6", {
                class: "qui_toast__tit"
            }, t))))
        }
    }),
    ve(preact.h(ye, null), document.head),
    ve(preact.h(qe, null), document.body),
    (xe = M).domReady = function(e) {
        /complete|loaded|interactive/.test(document.readyState) && document.body ? e() : document.addEventListener("DOMContentLoaded", function() {
            e()
        }, !1)
    }
    ,
    xe.ready = function(e) {
        e = e || function() {}
        ,
        xe.browser.music ? xe.musicReady(function() {
            e()
        }) : xe.browser.mqq ? xe.mqqReady(function() {
            e()
        }) : xe.browser.weixin ? xe.weixinReady(function() {
            e()
        }) : xe.browser.qzone ? xe.qzoneReady(function() {
            e()
        }) : xe.browser.tcs ? xe.tcsReady(function() {
            e()
        }) : xe.domReady(function() {
            e()
        })
    }
    ,
    ke = M,
    Se = !1,
    Te = [],
    Ce = function() {
        Te.forEach(function(e) {
            e()
        })
    }
    ,
    ke.weixinReady = function(e) {
        var t, n;
        if (ke.browser.weixin && (Te.push(e),
        !Se))
            if (0 <= ke.compare(ke.browser.appVer, "6")) {
                if ("object" == typeof wx)
                    return void e();
                Se = !0;
                var o = 0
                  , i = null
                  , r = null
                  , a = function() {
                    Se = !1;
                    var e = i
                      , t = e.timestamp
                      , n = e.nonceStr
                      , o = e.signature;
                    wx.config({
                        beta: !0,
                        debug: !1,
                        appId: "wx076851c9874e3112",
                        timestamp: t,
                        nonceStr: n,
                        signature: o,
                        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareWeibo", "getInstallState", "launchApplication", "addDownloadTask", "installDownloadTask"]
                    }),
                    wx.ready(function() {
                        r || Ce()
                    }),
                    wx.error(function(e) {
                        r = e,
                        console.error("weixinjssdk config error", e)
                    })
                };
                n = function() {
                    2 == (o += 1) && i && a()
                }
                ,
                ke.loadUrl("//res.wx.qq.com/open/js/jweixin-1.4.0.js?max_age=2592000", function(e) {
                    "error" == e.type ? ke.loadUrl("//res2.wx.qq.com/open/js/jweixin-1.4.0.js?max_age=2592000", n) : n()
                }),
                t = function(e) {
                    i = e,
                    2 == (o += 1) && i && a()
                }
                ,
                ke.ajax({
                    url: "//c.y.qq.com/base/fcgi-bin/fcg_weixin_get_jsticket.fcg",
                    data: {
                        format: "json",
                        signurl: window.location.href.split("#")[0]
                    },
                    dataType: "json",
                    success: function(e) {
                        0 == e.code && t(e.data)
                    }
                })
            } else
                "object" == typeof WeixinJSBridge ? Ce() : document.addEventListener("WeixinJSBridgeReady", function() {
                    Ce()
                })
    }
    ,
    (Me = M).musicReady = function(e) {
        Me.browser.music && ("undefined" == typeof WebViewJavascriptBridge ? document.addEventListener("WebViewJavascriptBridgeReady", function() {
            e && e()
        }) : e && e())
    }
    ,
    Me.musicReady(function() {
        Me.bridge = WebViewJavascriptBridge,
        Me.bridge.init(),
        Me.bridge.onApp || (Me.bridge.onApp = Me.bridge.onAPP)
    }),
    Me.bridgeCall = function(t, n, o) {
        Me.musicReady(function() {
            var e = ("" + t).match(/(\w+)\.(\w+)/);
            e ? Me.client.open(e[1], e[2], n, o) : Me.bridge.callHandler(t, n, o)
        })
    }
    ,
    (Ee = M).mqqReady = Ee.loadSQAPI = function(e) {
        Ee.browser.mqq && ("object" == typeof mqq ? e() : Ee.loadUrl("//pub.idqqimg.com/qqmobile/qqapi.wk.js?_bid=152", function() {
            return e()
        }))
    }
    ,
    (De = M).qzoneReady = function(e) {
        De.browser.qzone && ("object" == typeof QZAppExternal ? e && e() : De.loadUrl("//qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js?max_age=2529000", function() {
            e && e()
        }))
    }
    ,
    Ie = window,
    je = document,
    (Re = M).tcsReady = function(e) {
        Re.browser.tcs && Re.isFunction(e) && (Ie.TcsJSBridge && Re.isFunction(TcsJSBridge.invoke) ? e() : je.addEventListener("TcsJSBridgeReady", e, !1))
    }
    ,
    (Pe = M).qqbrowserReady = function(e) {
        "object" == typeof window.browser ? Pe.isFunction(e) && e() : Pe.loadUrl(location.protocol + "//jsapi.qq.com/get?api=app.isInstallApk", function() {
            Pe.isFunction(e) && e()
        })
    }
    ,
    (Ae = M).checkInstall = function() {

    }
    ,
    Ae.isInstall = function(t, e, n) {
        Ae.checkInstall(function(e) {
            1 == e ? t && t(!0) : t && t(!1)
        }, e, n)
    }
    ,
    function(o) {
        function a(e) {
            if (!o.isNumber(e))
                return console.log("t is not number"),
                0;
            var t = parseInt(e / 60, 10)
              , n = e % 60;
            return (t < 10 ? "0" + t : t) + ":" + (n < 10 ? "0" + n : n)
        }
        o.formatMusic = function(e) {
            if ("string" == typeof e)
                try {
                    e = JSON.parse(e)
                } catch (e) {
                    console.error(e)
                }
            if ("object" == typeof e) {
                if (e.formatted)
                    return e;
                0 == e.type || void 0 !== e.switch && 0 != e.switch || (e.switch = 403);
                var t = e.switch.toString(2).split("");
                t.pop(),
                t.reverse();
                var n = ["play_lq", "play_hq", "play_sq", "down_lq", "down_hq", "down_sq", "soso", "fav", "share", "bgm", "ring", "sing", "radio", "try", "give"];
                e.action = {
                    switch: e.switch
                };
                for (var o = 0; o < n.length; o++)
                    e.action[n[o]] = parseInt(t[o], 10) || 0;
                e.pay = e.pay || {},
                e.preview = e.preview || {},
                e.playTime = a(e.interval),
                e.action.play = 0,
                (e.action.play_lq || e.action.play_hq || e.action.play_sq) && (e.action.play = 1),
                e.tryPlay = 0,
                e.action.try && 0 < e.preview.trysize && (e.tryPlay = 1),
                e.anyPlay = 0,
                (e.action.play || e.tryPlay) && (e.anyPlay = 1),
                e.tryIcon = 0,
                e.disabled = 0,
                e.action.play || e.pay.payplay || (e.tryPlay ? e.tryIcon = 1 : e.disabled = 1);
                var i = [];
                if (e.singer)
                    for (var r = 0; r < e.singer.length; r++)
                        i.push(e.singer[r].name);
                e.singername = i.join(" / "),
                e.formatted = 1
            }
            return e
        }
        ,
        o.makePlayTime = a
    }(M),
    function(h) {
        h || (h = {}),
        h.client || function(d) {
            var e = navigator.userAgent
              , l = "qqmusic://"
              , u = "qq.com"
              , a = Array.prototype.slice
              , p = /[\?&]debug=1/i.test(location.search)
              , m = d.__aFunctions || {}
              , t = e.match(/QQMUSIC\/(\d[\.\d]*)/i);
            function f() {}
            function s(e, t, n, o, i) {
                h.isFunction(n) ? (i = o,
                o = n,
                n = null) : h.isFunction(n && n.callback) && !h.isFunction(o) && (o = n.callback);
                var r = l + (u + "/");
                if (e && t && (r += encodeURIComponent(e) + "/" + encodeURIComponent(t),
                h.isObject(n))) {
                    try {
                        n = function e(t) {
                            if (null != t)
                                if ("object" == typeof t)
                                    for (var n in t)
                                        t[n] = e(t[n]);
                                else
                                    "function" != typeof t && (t = String(t));
                            return t
                        }(n)
                    } catch (e) {
                        console.error(e)
                    }
                    n = JSON.stringify(n),
                    r += "&p=" + encodeURIComponent(n)
                }
                var a = h.getParam("ADTAG")
                  , s = h.getParam("ADTAG", window.SOURCE_PAGE)
                  , c = window.SOURCE_PAGE || location.href;
                a && s && a != s && (c = h.addParam({
                    ADTAG: a + "|" + s
                }, h.delParam("ADTAG", window.SOURCE_PAGE))),
                r = (r + "&source=" + encodeURIComponent(c)).replace(/[?&]/, "?"),
                h.browser.music || !p ? h.checkInstall(function(e) {
                    1 == e ? h.openScheme(r) : -1 == e ? h.download(i) : h.hackOpen(r, i)
                }) : console.log(r)
            }
            d.__aFunctions = m,
            d.__scheme = l,
            d.version = "20160419001",
            d.clientVersion = t && t[1] && parseFloat(t[1].replace("0", ".")),
            0 < d.clientVersion || (d.clientVersion = "0"),
            h.extend(d, {
                invoke: function(e, t, n, o, i) {
                    var r = m[e + "." + t];
                    return h.isFunction(r) ? r.apply(this, a.call(arguments, 2)) : s.apply(this, a.call(arguments))
                },
                invokeClient: s,
                build: function(e, t) {
                    var n, o, i, r = null, a = e.split("."), s = e.lastIndexOf("."), c = a[a.length - 2], l = a[a.length - 1], u = (n = e.substring(0, s),
                    o = n.split("."),
                    i = d,
                    o.forEach(function(e) {
                        !i[e] && (i[e] = {}),
                        i = i[e]
                    }),
                    i);
                    !t.ios && t.iOS && (t.ios = t.iOS),
                    t.support && !t.support.ios && t.support.iOS && (t.support.ios = t.support.iOS),
                    (r = h.os.ios && t.ios) || (r = h.os.android && t.android),
                    r && 0 != t.supportInvoke && (m[c + "." + l] = r),
                    u[l] = r || f
                }
            })
        }(h.client = {});
        var e = function(t, n) {
            h.client.on ? h.musicReady(function() {
                h.client.invoke("ui", "setActionBtn", {
                    type: "icon",
                    content: "share"
                }, function() {
                    var e = "callShareWeb";
                    t && t.type && ("song" == t.type ? e = "callShareSong" : "img" == t.type ? e = "callShareImg" : "video" == t.type && (e = "callShareVideo")),
                    h.client.invoke("other", e, t, n)
                })
            }) : (t && (t.img = t.img || t.imgUrl),
            h.share && h.share.init(t))
        };
        h.client.build("other.setShare", {
            supportInvoke: !0,
            android: e,
            ios: e
        }),
        h.musicReady(function() {
            h.os.ipad && (h.client.off("loginState"),
            h.client.on("loginState", function() {
                location.reload()
            }))
        }),
        h.client.open = function(e, t, n, o, i) {
            var r = arguments;
            function a() {
                h.client.invoke.apply(h.client, r)
            }
            h.browser.music ? h.musicReady(function() {
                e && t && a()
            }) : a()
        }
    }(M),
    function(c) {
        var n = {
            ios: "https://itunes.apple.com/app/apple-store/id414603431?pt=69276&mt=8&ct=QQmusic",
            tablet: "http://dldir1.qq.com/music/clntupate/qqmusic_android_pad_h5.apk",
            androidBase: "http://misc.wcd.qq.com/app?packageName=com.tencent.qqmusic&channelId="
        }
          , e = c.getParam("channelId") || c.getParam("channelid")
          , l = e
          , u = c.getParam("ADTAG") || "";
        function r(e) {
            c.report("//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg", {
                platform: c.browser.platform,
                os: c.os.ios ? "ios" : "android",
                data_type: 291,
                data: e || 3,
                data2: 9,
                reserve6: c.user.getUin(),
                reserve7: location.origin + location.pathname,
                reserve8: document.title
            })
        }
        function d(e, n) {
            if (c.isFunction(n) || (n = null),
            c.isString(e)) {
                if (c.browser.weixin && 0 <= c.compare(c.browser.appVer, "6.5.6"))
                    c.weixinReady(function() {
                        WeixinJSBridge.invoke("launchApplication", {
                            schemeUrl: e
                        }, function(e) {
                            if (n) {
                                var t = e && e.err_msg || "error";
                                n(/launchApplication:ok/.test(t) ? null : t)
                            }
                        })
                    });
                else {
                    var t = void 0;
                    if (c.os.ios)
                        t = +new Date,
                        location.href = e;
                    else {
                        var o = document.createElement("iframe");
                        o.style.width = o.style.height = "1px",
                        o.style.display = "none",
                        o.src = e,
                        t = +new Date,
                        document.body.appendChild(o)
                    }
                    n && setTimeout(function() {
                        n(+new Date - t < 1550 ? "timeout" : null)
                    }, 1500)
                }
                r(3)
            }
        }
        function a(e, t, n) {
            c.isFunction(t) && (n = t,
            t = null),
            c.isString(e) && d(e, function(e) {
                "timeout" == e && (c.isFunction(n) ? n() : c.download(t))
            })
        }
        function p(e) {
            e && c.tj && c.tj.sendClick && c.tj.sendClick(e, {
                virtualDomain: "y.qq.com"
            })
        }
        function m(e) {
            e && window.downloadTjPrefix && p("downloadAppByWX." + window.downloadTjPrefix + "." + e)
        }
        0 < l || (c.browser.mqq ? l = 10000609 : c.browser.weixin ? l = 10023178 : c.browser.weibo ? (l = 10039229,
        u = "sinaweibomr") : l = 10031709),
        n.android = n.androidBase + l;
        var o, f = function(t) {
            c.isFunction(t) && (o ? t(o) : c.mqqReady(function() {
                mqq.device.getDeviceInfo(function(e) {
                    o = e && e.qimei,
                    t(o)
                })
            }))
        };
        var s = {
            get: function(e, t) {
                try {
                    var n = localStorage.getItem(e);
                    return t && (n = n ? JSON.parse(n) : ""),
                    n
                } catch (e) {
                    console.log(e)
                }
            },
            set: function(e, t, n) {
                try {
                    n && (t = t ? JSON.stringify(t) : ""),
                    localStorage.setItem(e, t)
                } catch (e) {
                    console.log(e)
                }
            }
        };
        function h(t, e) {
            c.isFunction(t) || (t = null);
            var n = +new Date
              , o = parseInt(new Date / 36e5)
              , i = void 0
              , r = void 0;
            e || (r = s.get("_download_cfg_ver"),
            o == r && (i = s.get("_download_cfg", !0)),
            n = o),
            i ? t && t(i) : c.ajax({
                type: "GET",
                url: "//y.qq.com/m/client/mm_cfg/download.json?max_age=3600&v=" + n,
                dataType: "jsonp",
                jsonpCallback: "download",
                success: function(e) {
                    s.set("_download_cfg_ver", o),
                    s.set("_download_cfg", e, !0),
                    t && t(e)
                },
                error: function() {
                    t && t()
                }
            })
        }
        function g(e) {
            e = 0 < e ? e : l;
            var t = "";
            return c.os.ios ? t = n.ios + e : c.os.android && (t = c.os.tablet ? n.tablet : n.androidBase + e),
            t
        }
        setTimeout(function() {
            1 == c.getParam("_gene_config") && h(null, !0)
        }, 0),
        c.openMusic = function(e, t) {
          
        }
        ;
        var t = c.getParam("openinqqmusic")
          , i = parseInt(c.getParam("delayopeninqqmusic"));
        if (!c.browser.music) {
            var _ = 0;
            1 != t || window.forbidOpenInMusic ? 0 < i && !window.forbidDelayOpenInMusic && (_ = 1e3 * i) : _ = 1e3,
            0 < _ && setTimeout(function() {
                c.client.open("ui", "openUrl", {
                    url: location.href
                })
            }, _)
        }
        c.setChannelId = function(e) {
            0 < e && (l = e)
        }
        ,
        c.openMusic.downloadUrl = n,
        c.download = function(s) {
            var t, n, o, i;
            s = 0 < s ? s : l,
            t = function(e, t) {
                switch (p("download.h5." + (t || e || "web")),
                e) {
                case "tcs":
                    a = s,
                    c.tcsReady(function() {
                        TcsJSBridge.invoke("download", {
                            url: g(a),
                            pkgName: "com.tencent.qqmusic",
                            categoryId: "0",
                            channel_id: "",
                            extStr: ""
                        }, function(e) {
                            /not_allow/.test(e.err_msg) ? (delete c.browser.tcs,
                            c.download(a)) : "ok" == e.err_msg && 0 == e.ret || c.alert({
                                center: 1,
                                title: "",
                                message: "下载失败 ，err_msg: " + e.err_msg
                            })
                        })
                    });
                    break;
                case "market":
                    f(function(e) {
                        var t, n = navigator.userAgent.toLowerCase();
                        if (~n.indexOf("oppo") || ~n.indexOf("pacm00"))
                            t = "oppo",
                            d("softmarket://market_appdetail?pn=com.oppo.market&gb=1&params=enter_id%3d6%26enter_params%3dout_operator%23ac20180309%26out_package_name%3dcom.tencent.qqmusic%26out_start_download%3dtrue");
                        else if (~n.indexOf("vivo"))
                            t = "vivo",
                            d("vivoMarket://details?id=com.tencent.qqmusic");
                        else {
                            if (!~n.indexOf("huawei"))
                                return;
                            t = "huawei",
                            d('hiapp://com.huawei.appmarket?activityName=activityUri|appdetail.activity&params={"params":[{"name":"uri","type":"String","value":"app|C10220136"}]}&channelId=70124')
                        }
                        p("market_download." + t);
                        var o = new Image;
                        o.onload = o.onerror = function() {
                            o = null
                        }
                        ,
                        o.src = "//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg?" + c.param({
                            data_type: 266,
                            data2: 23,
                            reserve6: e,
                            reserve7: u,
                            reserve8: t
                        })
                    });
                    break;
                case "mqq":
                    mqq.app.downloadApp({
                        appid: "1101079856",
                        url: g(s),
                        packageName: "com.tencent.qqmusic",
                        actionCode: "2",
                        via: "ANDROIDQQ.QQMUSIC.GENE",
                        appName: "QQMUSIC"
                    }, function(e) {
                        e && 4 == e.state && mqq.app.downloadApp({
                            appid: "1101079856",
                            url: g(s),
                            packageName: "com.tencent.qqmusic",
                            actionCode: "5",
                            via: "ANDROIDQQ.QQMUSIC.GENE",
                            appName: "QQMUSIC"
                        }, function(e) {})
                    });
                    break;
                case "weixin":
                    m("cid_" + (o = s) + "_startdownload"),
                    i = o = 0 < o ? o : l,
                    r = function(e) {
                        var t = 0;
                        WeixinJSBridge.invoke("addDownloadTask", {
                            task_name: "QQ音乐",
                            task_url: e.download_url,
                            thumb_url: "https://y.gtimg.cn/music/common/upload/t_cm3_photo_publish/295599.png?max_age=2592000",
                            file_md5: e.download_md5
                        }, function(e) {
                            (t = e.download_id || 0) && c.tips("正在下载QQ音乐，请稍候"),
                            m("cid_" + o + "_addDownloadTask_res_" + (e.err_msg || "success"))
                        }),
                        WeixinJSBridge.on("wxdownload:state_change", function(e) {
                            "download_succ" === e.state && WeixinJSBridge.invoke("installDownloadTask", {
                                download_id: t
                            }, function(e) {
                                m("cid_" + o + "_state_change_res_" + ((e || {
                                    err_msg: "undefined"
                                }).err_msg || "success"))
                            })
                        })
                    }
                    ,
                    c.ajax({
                        url: "//c.y.qq.com/base/fcgi-bin/fcg_wxdownload_config.fcg?chid=" + i,
                        dataType: "json",
                        success: function(e) {
                            e && 0 == e.code ? ("function" == typeof r && r(e || {}),
                            m("cid_" + i + "_download_md5_" + e.download_md5)) : (m("cid_" + i + "_cgi_code_" + (e || {
                                code: "undefined"
                            }).code),
                            c.alert({
                                center: 1,
                                title: "",
                                message: "获取App信息失败 code:" + e.code
                            }))
                        },
                        error: function() {
                            m("cid_" + i + "_cgi_error"),
                            c.alert({
                                center: 1,
                                title: "",
                                message: "获取App信息失败，网络繁忙，请稍候再试！"
                            })
                        }
                    });
                    break;
                default:
                    var n = g(s);
                    n && (location.href = n)
                }
                var o, i, r, a
            }
            ,
            n = function() {
                if (c.os.android && c.browser.mqq && "undefined" != typeof mqq && 0 <= mqq.compare("4.6") && mqq.app.downloadApp)
                    return "mqq"
            }
            ,
            o = function() {
                if (c.os.android && c.browser.weixin && WeixinJSBridge && WeixinJSBridge.invoke)
                    return "weixin"
            }
            ,
            i = navigator.userAgent,
            c.os.android && c.browser.tcs ? t("tcs") : c.os.android && c.browser.mqq && !e && /oppo|pacm00|vivo|huawei/i.test(i) ? h(function(e) {
                e || (e = {}),
                1 == e.oppo && /oppo|pacm00/i.test(i) ? t("market", "oppo") : 1 == e.vivo && /vivo/i.test(i) ? t("market", "vivo") : 1 == e.huawei && /huawei/i.test(i) ? t("market", "huawei") : t(n() || o())
            }) : t(n() || o()),
            r(4)
        }
        ,
        c.hackOpen = a,
        c.openScheme = d
    }(M),
    function(s) {
        function c() {
            if (s.USE_QQ_CONNECT)
                return function() {
                    s.tj.sendClick("webqqconnectlogin.click");
                    var e = {
                        response_type: "code",
                        client_id: "100497308",
                        redirect_uri: location.protocol + "//y.qq.com/m/login/redirect.html?is_qq_connect=1&login_type=1&surl=" + encodeURIComponent(s.delParam("access_token", s.delParam("mmkey", location.href)).replace(/\?&+/, "?")),
                        state: "state",
                        display: "mobile"
                    };
                    setTimeout(function() {
                        location.href = "https://graph.qq.com/oauth2.0/authorize?" + s.param(e)
                    }, 50)
                }();
            s.tj.sendClick("weblogin.click");
            var e = {
                pt_no_auth: 1,
                pt_wxtest: 1,
                pt_no_onekey: s.browser.weibo || s.browser.qmkege || s.getParam("no_onekey") ? 1 : 0,
                daid: 384,
                style: 9,
                hln_css: "https://y.gtimg.cn/music/common/upload/t_cm3_photo_publish/1117688.png?max_age=2592000",
                appid: 83886593,
                s_url: location.protocol + "//y.qq.com/m/login/redirect.html?login_type=1&surl=" + encodeURIComponent(s.delParam("access_token", s.delParam("mmkey", location.href)).replace(/\?&+/, "?"))
            };
            s.browser.music && (e.low_login_enable = 1,
            e.pt_ttype = 1),
            setTimeout(function() {
                location.href = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/login?" + s.param(e)
            }, 50)
        }
        function l() {
            s.tj.sendClick("wxlogin.click"),
            setTimeout(function() {
                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" + s.param({
                    appid: "wx2b878669d2ea531c",
                    redirect_uri: location.protocol + "//y.qq.com/m/login/redirect.html?login_type=2&surl=" + encodeURIComponent(s.delParam("access_token", s.delParam("mmkey", location.href)).replace(/\?&+/, "?")),
                    response_type: "code",
                    scope: "snsapi_userinfo"
                }) + "#wechat_redirect"
            }, 50)
        }
        function u(e) {
            s.ready(function() {
                window.SOURCE_PAGE = s.addParam({
                    ADTAG: "morendenglu"
                }, s.delParam("ADTAG")),
                s.client.open("ui", "openUrl", {
                    url: location.href
                }, function() {}, 10036164)
            }),
            s.tj.sendClick("qmLogin.click")
        }
        function e() {
            var e = s.cookie.get("uin") || s.cookie.get("p_uin") || 0;
            return 2 == s.cookie.get("login_type") && (e = s.cookie.get("wxuin") || s.cookie.get("uin") || 0),
            e && (0 == e.indexOf("o") && (e = e.substring(1, e.length)),
            !/^\d+$/.test(e) || e < 1e4 ? e = 0 : ("" + e).length < 14 && (e = parseInt(e, 10))),
            e
        }
        setTimeout(function() {
            if (!s.browser.music) {
                var e = localStorage.getItem("CHECK_QQ_LOGIN_TYPE_ID");
                e || (e = (new Date).getTime(),
                localStorage.setItem("CHECK_QQ_LOGIN_TYPE_ID", e)),
                s.uajax({
                    comm: {
                        ct: 23,
                        cv: 0
                    }
                }).request({
                    module: "QQConnectLogin.LoginMethod",
                    method: "GetLoginMethod",
                    param: {
                        id: parseInt(e, 10)
                    }
                }, function(e, t) {
                    e || 0 != t.code || (s.USE_QQ_CONNECT = 2 == t.data.method)
                })
            }
        }),
        function() {
            if (s.browser.music) {
                var e = s.cookie.get("uin") || s.cookie.get("p_uin") || 0
                  , t = s.cookie.get("wxuin") || 0
                  , n = s.cookie.get("wxopenid");
                2 == (s.cookie.get("login_type") || 0) && n && e != t && s.musicReady(function() {
                    s.bridgeCall("resetCookie", {}, function(e) {})
                })
            }
        }();
        var i = e()
          , r = {}
          , n = s.createComponent({
            render: function(e) {
                var t = s.browser.weibo
                  , n = e.param
                  , o = "";
                (t || -1 != e.installStatus && !n.noQMBtn) && (o = preact.h("div", {
                    style: "text-align:center;font-size:15px;margin-bottom:10px;padding:0 15%;"
                }, preact.h("p", {
                    style: "border-bottom:1px solid #F3F3F3;margin:-10px 20% 24px;"
                }, preact.h("span", {
                    style: "font-size:12px;line-height:24px;background-color:#FFFFFF;display:inline-block;margin-bottom:-12px;padding:0 10px;vertical-align:bottom;"
                }, "或")), preact.h("a", {
                    onTap: u,
                    href: "javascript:;",
                    style: "color:#FFFFFF;text-align:center;line-height:46px;text-decoration:none;background:linear-gradient(60deg, #24CCAA 10%, #31C27C 110%);display:block;border-radius:40px;"
                }, "打开QQ音乐 一键登录")),
                setTimeout(function() {
                    s.tj.sendClick("qmLogin.show")
                }, 500));
                var i = n.loginType
                  , r = void 0
                  , a = [];
                return t ? r = "为获得完整体验，建议你" : (r = "QQ/微信账号资产和特权不互通",
                1 == i ? r += "，本页面限QQ登录" : 2 == i && (r += "，本页面限微信登录")),
                t || 1 == i || (a.push(preact.h("a", {
                    onTap: l,
                    href: "javascript:;",
                    style: "color:#00AE57;text-decoration:none;display:block;margin-bottom:16px;border-radius:40px;border:1px solid #00AE57;"
                }, "微信帐号登录")),
                setTimeout(function() {
                    s.tj.sendClick("wxlogin.show")
                }, 500)),
                (t || 2 != i) && (a.push(preact.h("a", {
                    onTap: c,
                    href: "javascript:;",
                    style: "color:#4994EA;text-decoration:none;display:block;border-radius:40px;border:1px solid #4994EA;"
                }, "QQ帐号登录")),
                setTimeout(function() {
                    s.tj.sendClick("webLogin.show")
                }, 500)),
                preact.h("div", null, preact.h("div", {
                    style: "text-align:center;line-height:36px;font-size:14px;margin:20px 0 0;padding:0 15% 14px;"
                }, preact.h("p", {
                    style: "font-size:14px;line-height:1.5em;margin:15px 0;"
                }, r), a), o)
            }
        });
        s.user = {
            getUin: function() {
                return e() || i
            },
            isLogin: function(e) {
                return e ? (function() {
                    var e = s.cookie.get("uin") || s.cookie.get("p_uin");
                    if (/^\d{5,12}$/.test(e)) {
                        var t = "o" + "00000".substr(0, 10 - e.length) + e;
                        s.cookie.set("uin", t, "qq.com")
                    }
                }(),
                !!s.cookie.get("qm_keyst") || !(!s.cookie.get("skey") || !/^o\d{5,12}$/.test(s.cookie.get("uin")))) : !!s.cookie.get("qm_keyst") || !!s.cookie.get("wxopenid") || !!s.cookie.get("skey") || !!s.cookie.get("p_skey") || s.browser.qmkege && !!s.cookie.get("openkey")
            },
            getSession: function() {
                return {
                    uin: this.getUin(),
                    mmskey: ""
                }
            },
            showLogin: function() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {
                    loginType: 0,
                    noConfirm: 0,
                    forceLogin: 0,
                    noQMBtn: !1
                };
                s.checkInstall(function(e) {
                    s.dialog.show({
                        title: "登录QQ音乐",
                        forceHideClose: t.noConfirm,
                        contentComponent: function() {
                            return preact.h(n, {
                                param: t,
                                installStatus: e
                            })
                        }
                    })
                })
            },
            login: function(e, t, n, o) {
                var i, r = e && s.isObject(e) ? e : {
                    cb: e,
                    loginType: 0,
                    noConfirm: t,
                    forceLogin: o,
                    noQMBtn: !1
                }, a = r.cb || function() {}
                ;
                i = "",
                s.getParam("no_wxlogin") || s.browser.music || s.browser.mqq || !(s.browser.weixin || s.browser.safari || s.browser.weibo || s.browser.qqbrowser || s.browser.uc) ? s.browser.music ? 0 <= s.compare(s.browser.appVer, 4.8) && s.compare(s.browser.appVer, 6.2) <= 0 ? (r.forceLogin && (i = {
                    force: "1"
                }),
                s.bridgeCall("JS_CMD_DO_LOGIN", i, function(e) {
                    0 == e.RESPONSE_CODE ? a(!0, e) : a(!1, e)
                })) : 0 < s.compare(s.browser.appVer, 6.2) ? (i = {},
                r.forceLogin && (i.force = 1),
                1 == r.loginType && (i.forbiddenWeixin = 1),
                2 == r.loginType && (i.forbiddenQQ = 1),
                s.client.open("ui", "login", i, function(e) {
                    0 == e.code ? a(!0, e) : a(!1, e)
                })) : c() : c() : s.user.showLogin(r)
            },
            logindo: function(t, e) {
                if (s.browser.music && 4.8 <= s.browser.ver) {
                    var n = e ? {
                        force: "1"
                    } : "";
                    s.bridgeCall("JS_CMD_DO_LOGIN", n, function(e) {
                        0 == e.RESPONSE_CODE ? t(!0, e) : t(!1, e)
                    })
                } else
                    c()
            },
            buyLogin: function(e, t, n) {
                this.login(e, t, !0, n)
            },
            getUserInfo: function(e, t, n) {
                t = s.isFunction(e) && e || t,
                e = s.isObject(e) && e || {};
                var o = (e = s.extend({
                    format: "json",
                    source: 4001
                }, e)).uin || i;
                n && r[o] ? t && t(r[o]) : s.ajax({
                    url: "//c.y.qq.com/portalcgi/fcgi-bin/music_mini_portal/fcg_getuser_infoEx.fcg",
                    dataType: "json",
                    data: e,
                    success: function(e) {
                        r[o] = e,
                        t && t(e)
                    }
                })
            }
        }
    }(M),
    function(c) {
        var o = c.user.getUin();
        function t(e, t) {
            var n = 9;
            if (2 == e && t)
                switch (t.data && t.data.target) {
                case "weixin":
                    n = 1;
                    break;
                case "timeline":
                    n = 2;
                    break;
                case "qq":
                    n = 3;
                    break;
                case "qzone":
                    n = 4;
                    break;
                case "sina":
                    n = 5;
                    break;
                case "qmim":
                    n = 6;
                    break;
                case "copy":
                    n = 7;
                    break;
                case "qmcode":
                    n = 8;
                    break;
                default:
                    n = 9
                }
            c.report("//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg", {
                platform: c.browser.platform,
                os: c.os.ios ? "ios" : "android",
                data_type: 291,
                data: e || 1,
                data2: n,
                reserve6: o,
                reserve7: location.origin + location.pathname,
                reserve8: document.title
            })
        }
        setTimeout(function() {
            t()
        }, 1e3),
        c.musicReady(function() {
            c.client.on("share", function(e) {
                e && 0 == e.code && t(2, e)
            })
        }),
        c.share = {
            isInit: !0,
            mqqMenu: !0,
            showCtrl: !1,
            onshare: function() {},
            _onshare: function(e) {
                !c.browser.music && e && 0 == e.code && t(2, e),
                c.isFunction(this.onshare) && this.onshare(e)
            },
            shareData: {
                appid: "wx5aa333606550dfd5",
                img_width: 173,
                img_height: 173,
                img: location.protocol + "//y.gtimg.cn/mediastyle/musicprotal/extra/logo.png?max_age=2592000",
                link: location.href
            },
            init: function(e) {
                var n = this;
                for (var t in e)
                    this.shareData[t] = e[t];
                this.shareData.link = c.delParam("mmkey", this.shareData.link),
                this.shareData.link = c.delParam("sid", this.shareData.link),
                /^https?\:/.test(this.shareData.link) || (this.shareData.link = location.protocol + "//" + this.shareData.link.replace(/^\/\//, "")),
                this.shareData.share_url = this.shareData.link,
                this.shareData.img = c.fixUrl(this.shareData.img),
                this.shareData.shareBigImg && (this.shareData.shareBigImg = c.fixUrl(this.shareData.shareBigImg)),
                c.browser.music && c.os.android && c.isString(this.shareData.img) && /^https:/i.test(this.shareData.img) && (this.shareData.img = this.shareData.img.replace(/^https/i, "http")),
                this.shareData.wxTimelineTitle = this.shareData.wxTimelineTitle || this.shareData.pengyouquanTitle || this.shareData.title,
                this.shareData.imgUrl = this.shareData.image_url = this.shareData.img_url = this.shareData.img,
                !1 === this.shareData.isInit && (this.isInit = !1),
                !1 === this.shareData.mqqMenu && (this.mqqMenu = !1),
                this.shareData.showCtrl && (this.showCtrl = !0),
                c.browser.mqq && (this.shareData.appid = 100497308),
                c.weixinReady(function() {
                    n.weixinInit()
                }),
                c.musicReady(function() {
                    n.musicInit()
                }),
                c.browser.mqq && c.mqqReady(function() {
                    n.shareData.back = !0,
                    mqq.ui.setOnShareHandler(function(t) {
                        n.shareData.share_type = t,
                        mqq.ui.shareMessage(n.shareData, function(e) {
                            e.target = 1 == t ? "qzone" : 2 == t ? "weixin" : 3 == t ? "timeline" : "qq",
                            n._onshare({
                                code: 0 == e.retCode ? 0 : -1,
                                data: e
                            })
                        })
                    })
                }),
                c.browser.qzone && this.qzoneInit(),
                c.browser.mqq || c.browser.music || (this.shareLayer && this.shareLayer.parentNode.removeChild(this.shareLayer),
                this.shareLayer = document.createElement("div"),
                this.shareLayer.style.cssText = "display:none;position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.8);z-index:9999",
                this.shareLayer.innerHTML = c.browser.weixin || c.browser.qzone || c.browser.qmkege ? '<img id="shareimgup" style="position:absolute;top:10px;right:27px;width:263px;height:auto" src="//y.gtimg.cn/mediastyle/mobile/event/20140318_ceremony_live/img/share_top.png?max_age=2592000">' : '<img id="shareimgdown" style="position:absolute;bottom:10px;right:27px;width:263px;height:auto" src="//y.gtimg.cn/mediastyle/mobile/event/20140318_ceremony_live/img/share_bottom.png?max_age=2592000">',
                document.body.appendChild(this.shareLayer),
                this.shareLayer.addEventListener("touchstart", function(e) {
                    this.style.display = "none"
                })),
                c.browser.qmkege && (location.href = "qmkege://kege.com?action=setshare&" + c.param({
                    title: this.shareData.title,
                    content: this.shareData.desc,
                    link: this.shareData.link,
                    cover: this.shareData.img
                }))
            },
            call: function() {
                var t = this;
                c.browser.music ? c.client.open("other", "callShareWeb", t.shareData, function(e) {
                    t._onshare(e)
                }) : c.browser.weixin || c.browser.qzone || c.browser.qmkege ? this.shareLayer.style.display = "block" : c.browser.mqq ? c.mqqReady(function() {
                    "5.2" <= mqq.QQVersion && t.mqqMenu ? mqq.ui.showShareMenu() : c.alert("你的手Q版本太低,请点击右上角分享!")
                }) : c.confirm({
                    message: "当前环境暂不支持分享, 是否前往手机QQ分享!",
                    cb: function(e) {
                        e && (location.href = "mqqapi://forward/url?url_prefix=" + btoa(location.href) + "&version=1&src_type=web")
                    }
                })
            },
            weixinInit: function() {
                var n = this;
                n.shareData.success = function(e) {
                    n._onshare({
                        code: 0,
                        data: e
                    })
                }
                ,
                n.shareData.cancel = function(e) {
                    n._onshare({
                        code: -1,
                        data: e
                    })
                }
                ;
                var e, t, o, i, r, a, s;
                0 <= c.compare(c.browser.appVer, "6") ? (e = n.shareData,
                t = e.title,
                o = e.desc,
                i = e.link,
                r = e.imgUrl,
                a = e.wxTimelineTitle,
                s = r,
                c.isString(r) && c.os && c.os.android && (s = r.replace(/^https/, "http")),
                wx.updateAppMessageShareData({
                    title: t,
                    desc: o,
                    link: i,
                    imgUrl: s,
                    success: function(e) {
                        e.target = "weixin",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "wx_friend"
                        })
                    }
                }),
                wx.updateTimelineShareData({
                    title: a,
                    link: i,
                    imgUrl: r,
                    success: function(e) {
                        e.target = "timeline",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "wx_timeline"
                        })
                    }
                }),
                wx.onMenuShareWeibo({
                    title: t,
                    desc: o,
                    link: i,
                    imgUrl: r,
                    success: function(e) {
                        e.target = "weibo",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "weibo"
                        })
                    }
                })) : window.WeixinJSBridge && (WeixinJSBridge.on("menu:share:appmessage", function() {
                    WeixinJSBridge.invoke("sendAppMessage", n.shareData, function(e) {
                        e.target = "weixin",
                        n._onshare({
                            code: /\:(confirm|ok)/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "wx_friend"
                        })
                    })
                }),
                WeixinJSBridge.on("menu:share:timeline", function(e) {
                    var t = n.shareData;
                    t.wxTimelineTitle && t.wxTimelineTitle != t.title && (t = c.extend({}, t, {
                        title: t.wxTimelineTitle
                    })),
                    WeixinJSBridge.invoke("shareTimeline", t, function(e) {
                        e.target = "timeline",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "wx_timeline"
                        })
                    })
                }),
                WeixinJSBridge.on("menu:share:qq", function(e) {
                    WeixinJSBridge.invoke("shareQQ", n.shareData, function(e) {
                        e.target = "qq",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "qq"
                        })
                    })
                }),
                WeixinJSBridge.on("menu:share:QZone", function(e) {
                    WeixinJSBridge.invoke("shareQZone", n.shareData, function(e) {
                        e.target = "qzone",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "qzone"
                        })
                    })
                }),
                WeixinJSBridge.on("menu:share:weiboApp", function(e) {
                    WeixinJSBridge.invoke("shareWeiboApp", n.shareData, function(e) {
                        e.target = "weibo",
                        n._onshare({
                            code: /\:ok/.test(e.err_msg) ? 0 : -1,
                            data: e,
                            to: "weibo"
                        })
                    })
                }))
            },
            musicInit: function() {
                var t = this;
                t.isInit && c.client.open("ui", "setActionBtn", {
                    type: "icon",
                    content: "share"
                }, function(e) {
                    e && 0 == e.code && t.call()
                })
            },
            qzoneInit: function() {
                var r = this;
                c.qzoneReady(function() {
                    if (window.QZAppExternal && QZAppExternal.setShare) {
                        var e = r.shareData.title
                          , t = r.shareData.wxTimelineTitle || r.shareData.title
                          , n = r.shareData.img_url
                          , o = r.shareData.desc
                          , i = r.shareData.link;
                        QZAppExternal.setShare(function() {}, {
                            type: "share",
                            image: [n, n, n, n, n],
                            title: [e, e, e, e, t],
                            summary: [o, o, o, o, o],
                            shareURL: [i, i, i, i, i]
                        })
                    }
                })
            }
        }
    }(M),
    function(t) {
        var e = preact.render
          , s = function(e) {
            if (/^[0-9a-f]{1,8}$/i.test(e)) {
                for (var t = 0, n = 8 - e.length; t < n; t++)
                    e = "0" + e;
                return e.replace(/(?:[0-9a-f]{2})/gi, function(e, t) {
                    return e = parseInt(e, 16),
                    0 == t ? "rgba(" + e : "," + (t < 6 ? e : e / 255 + ")")
                })
            }
            return ""
        };
        if (window.pageFollowSkin) {
            var n = t.createComponent({
                getInitialState: function() {
                    return {
                        highlightColor: ""
                    }
                },
                updateTheme: function() {
                    var a = this;
                    t.client && t.client.open("theme", "getThemeSetting", {
                        type: ["theme"]
                    }, function(e) {
                        if (e && e.data && (a.setState({
                            highlightColor: s(e.data.detail && e.data.detail.color),
                            barBgColor: s(e.data.detail && e.data.detail.bcolor),
                            curTheme: e.data.theme
                        }),
                        e.data.theme)) {
                            var t = document.getElementById("js_theme_link")
                              , n = window.personalSkinCssFile || t && t.getAttribute("href") || ""
                              , o = "//y.gtimg.cn/mediastyle/musiccm/skin/" + (e.data.detail && e.data.detail.skin_css ? e.data.detail.skin_css : "skin_" + e.data.theme) + ".css?max_age=2592000";
                            if (o != n) {
                                var i = document.getElementsByTagName("head")[0]
                                  , r = document.createElement("link");
                                r.href = o,
                                r.rel = "stylesheet",
                                document.querySelector("#js_theme_style") ? i.insertBefore(r, document.querySelector("#js_theme_style")) : i.appendChild(r),
                                window.personalSkinCssFile = o
                            }
                        }
                    })
                },
                componentDidMount: function() {
                    var e = this;
                    t.musicReady(function() {
                        t.client.on && t.client.on("themeStateChange", function() {
                            e.updateTheme()
                        }),
                        e.updateTheme()
                    })
                },
                isLightColor: function(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 510;
                    if (!e)
                        return "";
                    var n = e.match(/\d+/g);
                    if (n && 3 <= n.length) {
                        var o = n.slice(0, 3);
                        return t < parseInt(n[0]) + parseInt(o[1]) + parseInt(o[2]) ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"
                    }
                    return ""
                },
                render: function(e, t) {
                    if (t.barBgColor || t.highlightColor) {
                        var n = [];
                        if (t.barBgColor && 4 == t.curTheme) {
                            if (t.highlightColor) {
                                var o = this.isLightColor(t.highlightColor);
                                o && n.push(".c_btn2{color:" + o + ";background-color:" + t.highlightColor + "; }")
                            }
                            n.push(".c_bg3{background-color:" + t.barBgColor + "}")
                        }
                        return t.highlightColor && n.push(".c_txt3{color:" + t.highlightColor + "}"),
                        n.join("")
                    }
                }
            })
              , o = document.createElement("style");
            o.id = "js_theme_style",
            document.head.appendChild(o),
            e(preact.h(n, null), document.querySelector("#js_theme_style"))
        }
    }(M),
    Oe = M,
    Qe = {
        _checkpingFlag: !1,
        _pingUrl: "//y.qq.com/music/h5/lib/js/async/ping.js?max_age=25920000",
        pv: function(e) {
            e = e || window.tj_param || {},
            this.checkping(function() {
                window.pgvMain("", {
                    virtualDomain: e.virtualDomain || location.host,
                    virtualURL: e.virtualURL || "",
                    ADTAG: e.ADTAG || "",
                    repeat: e.repeat || !1,
                    useRefUrl: !0,
                    careSameDomainRef: !0
                })
            })
        },
        sendClick: function(e, t) {
            e && (t = t || window.tj_param || {},
            this.checkping(function() {
                Oe.isFunction(window.pgvSendClick) && window.pgvSendClick({
                    virtualDomain: t.virtualDomain || location.host,
                    virtualURL: t.virtualURL || "",
                    hottag: (e + (t.no_os ? "" : "." + (Oe.os.ios ? "ios" : "android"))).toUpperCase()
                })
            }))
        },
        checkping: function(e) {
            var t = this
              , n = e || function() {}
            ;
            Oe.isFunction(window.pgvMain) ? n() : Oe.loadUrl(this._pingUrl, function() {
                Oe.isFunction(window.pgvMain) ? n() : t._checkpingFlag || (t._checkpingFlag = !0,
                t._pingUrl = "//y.qq.com/music/h5/lib/js/async/ping.js?max_age=25920000&r=" + Math.random(),
                t.checkping(n))
            })
        }
    },
    document.addEventListener("DOMContentLoaded", function() {
        window.tj_param && window.tj_param.noAuto || setTimeout(function() {
            Qe.pv()
        }, 100)
    }, !1),
    Oe.tj = Qe;
    var ze = document
      , Ue = location
      , Ne = setTimeout
      , Fe = window
      , Be = navigator
      , Je = window
      , We = Je.localStorage
      , Ve = Je.performance
      , He = Je.Promise
      , $e = Ve && Ve.timing || {}
      , Ge = $e.navigationStart
      , Xe = navigator.userAgent
      , Ze = location.pathname
      , Ye = JSON.stringify
      , Ke = "Start"
      , et = "End"
      , tt = "unloadEvent"
      , nt = "redirect"
      , ot = "domainLookup"
      , it = "connect"
      , rt = "response"
      , at = "domContentLoadedEvent"
      , st = "loadEvent"
      , ct = [tt + Ke, tt + et, nt + Ke, nt + et, "fetch" + Ke, ot + Ke, ot + et, it + Ke, it + et, "request" + Ke, rt + Ke, rt + et, "domLoading", "domInteractive", at + Ke, at + et, "domComplete", st + Ke, st + et]
      , lt = 3e4
      , ut = "spd-" + Ze
      , dt = 10
      , pt = 100;
    var mt, ft, ht = "complete" === ze.readyState, gt = ht ? null : [];
    function _t(e) {
        ht ? e() : gt.push(e)
    }
    Fe.addEventListener("load", function() {
        ht = !0,
        gt.forEach(function(e) {
            return e()
        })
    }),
    ze.addEventListener("DOMContentLoaded", function() {
        mt = !0,
        ft && ft()
    });
    var wt, bt, vt = /\bQQMusic\//i.test(Xe);
    function yt(e) {
        Fe.WebViewJavascriptBridge ? e() : ze.addEventListener("WebViewJavascriptBridgeReady", e)
    }
    function qt(e, t, n, o) {
        M.client.invoke(e, t, o || {}, function(e) {
            n(e && 0 == e.code && e.data || {})
        })
    }
    (bt = Xe.match(/QQMUSIC\/(\d[\.\d]*)/i)) ? wt = "music" : (bt = Xe.match(/MicroMessenger\/(\d[\.\d]*)/i)) ? wt = "weixin" : (bt = Xe.match(/(?:iPad|iPhone|iPod).*? (?:IPad)?QQ\/([\d\.]+)/) || Xe.match(/\bV1_AND_SQI?_(?:[\d\.]+)(?:.*? QQ\/([\d\.]+))?/)) ? wt = "mqq" : (bt = Xe.match(/\bqmkege\/(\d[\.\d]*)/i)) ? wt = "qmkege" : /Qzone\//.test(Xe) ? wt = "qzone" : /\/[\w. ]+MQQBrowser\//i.test(Xe) ? wt = "qqbrowser" : /Weibo\ \(*/i.test(Xe) && (wt = "weibo");
    var xt, kt, St = wt || "other", Tt = bt ? bt[1] : "";
    (kt = Xe.match(/(?:Android);?[\s\/]+([\d.]+)?/)) ? xt = "android" : (kt = Xe.match(/(?:iPad).*OS\s([\d_]+)/) || Xe.match(/(?:iPod)(?:.*OS\s([\d_]+))?/) || Xe.match(/(?:iPhone\sOS)\s([\d_]+)/)) && (xt = "ios");
    var Ct = xt || ""
      , Mt = kt ? kt[1] : "";
    function Et(e) {
        var t = ze.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)"));
        return t ? t[2] : ""
    }
    var Dt, It, jt, Rt = Fe.SPD, Pt = [];
    function At(e, t) {
        0 <= t && t < lt && (Rt.timing[e] = 0 | t)
    }
    function Ot(n) {
        function e() {
            var g = Rt.flag
              , e = Rt.timing
              , t = g && 3 <= g.length;
            e.length && (t || n) && (Pt.push(e.slice(0)),
            e.length = 0,
            t && _t(function() {
                var e = Fe.QMFE_SPD_RATE
                  , h = 0 < e ? e : dt;
                Pt.forEach(function(e) {
                    var t, n, o = [], c = "ios" === Ct, l = (n = Xe.match(/\bNetType\/(\w+)/i)) ? n[1] : "unknown", i = "//stat.y.qq.com/", r = i + "sdk/fcgi-bin/sdk.fcg", a = e[20] || 0, s = e[21] || 0, u = e[22] || 0, d = e[23] || 0;
                    for (var p in e)
                        o.push(p + "=" + e[p]);
                    var m = encodeURIComponent("flag1=" + g[0] + "&flag2=" + g[1] + "&flag3=" + g[2] + "&flag5=" + (g[4] || 1) + "&" + o.join("&"))
                      , f = "weixin" === St ? "wechat" : St;
                    (new Image).src = i + "sp/r.png?speedparams=" + m + "&platform=" + Ct + "&app=" + f + "&apn=" + l,
                    (a || s || u || d) && h * Math.random() < 1 && (t || (t = new He(function(t) {
                        var e, n, o, i, r = ze.cookie.match(/\blogin_type=(\d+)/), a = {
                            _appid: "qqmusic",
                            _uid: (i = Et("uin") || Et("p_uin") || 0,
                            2 == Et("login_type") && (i = Et("wxuin") || Et("uin") || 0),
                            i && (i = i.replace(/^o/, ""),
                            !/^\d+$/.test(i) || i < 1e4 ? i = 0 : i.length < 14 && (i = parseInt(i, 10))),
                            i),
                            _platform: c ? 1 : 11,
                            _account_source: r ? r[1] : "0",
                            _os_version: Mt || "",
                            _app_version: Tt,
                            _channelid: (n = "channelId",
                            o = Ue.href.split("#")[0].match(new RegExp("(\\?|&)" + n + "=(.*?)(#|&|$)","i")),
                            decodeURIComponent(o ? o[2] : "")),
                            _os: Ct,
                            _app: St,
                            _opertime: "" + (Date.now() / 1e3 | 0),
                            _network_type: (e = l,
                            e && e.toLocaleLowerCase())
                        }, s = "getDeviceInfo";
                        vt ? yt(function() {
                            function e(n) {
                                return new He(function(t) {
                                    qt("device", n, function(e) {
                                        n === s ? (a._mobile_factory = e.model,
                                        a._mobile_type = e.modelVersion,
                                        a._os_version = e.systemVersion) : (a._deviceid = e.imei,
                                        a._mnc = e.isp),
                                        t()
                                    })
                                }
                                )
                            }
                            He.all([e(s), e("getGuid")]).then(function() {
                                t(a)
                            })
                        }) : t(a)
                    }
                    )),
                    t.then(function(e) {
                        var t = Ye({
                            common: e,
                            items: [{
                                _key: "webcs",
                                id: g[0] + "-" + g[1] + "-" + g[2],
                                url: Ze,
                                rate: h,
                                webview: a,
                                fcp: s,
                                fmp: u,
                                tti: d
                            }]
                        });
                        if (c || !Be.sendBeacon) {
                            var n = new XMLHttpRequest;
                            n.open("POST", r),
                            n.send(t)
                        } else
                            Be.sendBeacon(r, t)
                    }))
                }),
                Pt.length = 0
            }))
        }
        n ? e() : (clearTimeout(Dt),
        Dt = Ne(e, pt))
    }
    function Qt(e) {
        if (e) {
            var t = e.webview
              , n = e.fcp
              , o = e.fmp
              , i = e.tti;
            (t || n || o || i) && (At(20, t),
            At(21, n),
            At(22, o),
            At(23, i),
            Ot(!0))
        }
    }
    function Lt(o) {
        vt ? yt(function() {
            qt("core", "support", function(e) {
                1 == e.isSupport ? qt("debug", "report", function(e) {
                    var t = e && e.time || 0
                      , n = Rt.result;
                    0 < t && (n.webview = t,
                    function(e) {
                        if (e)
                            try {
                                We.setItem(ut, Ye(e))
                            } catch (e) {}
                    }(n)),
                    o(t)
                }, {
                    tag: "navigationStart",
                    timestamp: Ge,
                    url: Ue.href
                }) : o()
            }, {
                apiName: "debug.report"
            })
        }) : o()
    }
    Rt && 4 <= Rt.version && Rt.enabled && (Rt.report = Ot,
    It = function() {
        Qt(Rt.last),
        He.all([new He(Lt), new He(function(m) {
            _t(function() {
                try {
                    if ($e) {
                        for (var e = 0; e < ct.length; e++) {
                            At(e + 1, $e[ct[e]] - Ge)
                        }
                        var t = $e[ct[7]]
                          , n = $e[ct[8]]
                          , o = $e[ct[9]]
                          , i = $e[ct[10]]
                          , r = $e[ct[11]];
                        At(28, n - t),
                        At(29, i - o),
                        At(30, r - i)
                    }
                    if (Ve.getEntries) {
                        var a, s, c, l, u = Ve.getEntries(), d = !1, p = ze.body.querySelector("script[src]");
                        p && (l = p.src),
                        u.forEach(function(e) {
                            var t = e.name
                              , n = e.initiatorType
                              , o = e.responseEnd;
                            "first-paint" === t && (d = !0),
                            d || "link" !== n ? "script" === n && (t === l && (s = e.startTime,
                            l = null),
                            c = o < c ? c : o) : a = o
                        }),
                        At(31, a),
                        At(32, s),
                        At(33, c)
                    }
                } catch (e) {}
                Ot(),
                Rt.ready(m)
            })
        }
        )]).then(function() {
            Qt(Rt.result)
        })
    }
    ,
    mt ? It() : ft = It),
    jt = M,
    window.SPD || (window.SPD = {}),
    SPD.start || jt.extend(window.SPD, {
        flag: [],
        pointTime: {},
        markStart: function(e, t) {
            this.pointTime[e] = t || Date.now()
        },
        markEnd: function(e, t) {
            this.pointTime[e] && this._timing && (this._timing[e] = (t || Date.now()) - this.pointTime[e],
            this.send(),
            this.pointTime[e] = 0)
        },
        send: function(e) {
            var t = e || this._timing;
            if (!this.flag.length)
                return !1;
            var n = jt.isArray(t) ? t.join("&") : jt.param(t);
            n && (jt.report("//stat.y.qq.com/sp/r.png", {
                appid: 10013,
                speedparams: this.flag.join("&") + "&" + n,
                platform: jt.os.ios ? "ios" : "android",
                app: jt.browser.mqq ? "mqq" : jt.browser.weixin ? "wechat" : jt.browser.qzone ? "mqzone" : "other",
                apn: jt.getNetType()
            }),
            e || (this._timing = {}))
        },
        init: function(e) {
            var a = this;
            e && jt.isArray(e.flag) && (this.flag.push("flag1=" + (e.flag[0] || 0)),
            this.flag.push("flag2=" + (e.flag[1] || 0)),
            this.flag.push("flag3=" + (e.flag[2] || 0)),
            e.flag[3] && this.flag.push("flag4=" + e.flag[3]),
            this.flag.push("flag5=" + (e.flag[4] || 1)),
            window.addEventListener("load", function() {
                setTimeout(function() {
                    var e = {};
                    if (a._timing && window.performance && performance.timing)
                        try {
                            for (var t = performance.timing, n = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"], o = t.navigationStart, i = 0; i < n.length; i++) {
                                if (void 0 !== t[n[i]] && 0 < t[n[i]]) {
                                    var r = t[n[i]] - o;
                                    if (0 < r && r < 6e4) {
                                        e[i] = r;
                                        continue
                                    }
                                }
                                e[i] = 0
                            }
                            a._timing[28] = t.connectEnd - t.connectStart,
                            a._timing[29] = t.responseStart - t.requestStart,
                            a._timing[30] = t.responseEnd - t.responseStart
                        } catch (e) {
                            console.error(e)
                        }
                    jt.extend(a._timing, e),
                    SPD.send()
                }, 100)
            }))
        }
    }),
    function(n) {
        null == window.rtpid && (window.rtpid = 4);
        var t = []
          , o = 0
          , i = 100
          , r = {}
          , a = window.debug || 1 == n.getParam("debug");
        function s(e) {
            e && t.push(e),
            0 == o && ((e = t.shift()) && (a && console.log("report：", e),
            n.report("//stat.y.qq.com/ext/fcgi-bin/fcg_web_access_stat.fcg", e, 0, 1)),
            o = setTimeout(function() {
                o = 0,
                t.length && s()
            }, i))
        }
        function c(e) {
            return e && (e < 0 || 400 <= e && e <= 699)
        }
        var l, u, d = (u = [],
        function(e) {
            n.isFunction(e) && (u.push(e),
            1 === u.length && n._ajax({
                type: "head",
                url: "https://u.y.qq.com/connectiontest",
                dataType: "text",
                cache: !1,
                timeout: 5e3,
                success: function() {
                    return l = !0
                },
                error: function() {
                    return l = !1
                },
                complete: function() {
                    u.forEach(function(e) {
                        return e(l)
                    }),
                    u.length = 0
                }
            }))
        }
        );
        n.reportCode = function(e) {
            if ((e = e || {}).cgi && null != e.code && !isNaN(e.time)) {
                var t = {
                    pid: 0 < window.rtpid ? window.rtpid : 4,
                    os: n.os.android ? "android" : n.os.ios ? "ios" : "other",
                    cgi: ("" + e.cgi).split("?")[0],
                    code: e.code,
                    time: e.time || 0
                };
                if (0 < e.pid && (t.pid = parseInt(e.pid)),
                0 < e.rate ? t.rate = parseInt(e.rate) : t.rate = 20,
                null != e.totaltime && (t.totaltime = e.totaltime),
                null != e.code_sh && (t.code_sh = e.code_sh),
                null != e.code_sz && (t.code_sz = e.code_sz),
                null != e.time_sh && (t.time_sh = e.time_sh),
                null != e.time_sz && (t.time_sz = e.time_sz),
                e.area && (t.area = e.area),
                (c(e.code) || c(e.code_sh) || c(e.time_sh)) && (t.rate = 1,
                e.one = !1),
                e.one) {
                    if (r[t.cgi])
                        return;
                    r[t.cgi] = 1
                }
                0 === t.rate || "0" === t.rate || 1 < t.rate && 0 < parseInt(Math.random() * t.rate) || (-604 == t.code ? d(function(e) {
                    e || (t.code = 1000007,
                    -604 == t.code_sz && (t.code_sz = 1000007),
                    -604 == t.code_sh && (t.code_sh = 1000007)),
                    s(t)
                }) : s(t))
            }
        }
    }(M),
    function(i) {
        function r(t) {
            setTimeout(function() {
                var e = new Image;
                e.onload = e.onerror = e.onabort = function() {
                    e = e.onload = e.onerror = e.onabort = null
                }
                ,
                e.src = t
            })
        }
        i.winLoaded = function(e) {
            i.isFunction(e) && ("complete" == document.readyState ? e() : window.addEventListener("load", e))
        }
        ,
        i.report = function(e, t, n, o) {
            e && (i.os.ios && (o = !1),
            o && i.isFunction(navigator.sendBeacon) ? navigator.sendBeacon(e, t ? i.param(t) : null) : (t && (e = i.addParam(t, e)),
            n ? r(e) : i.winLoaded(function() {
                r(e)
            })))
        }
        ,
        i.musicReport = function(t, n, o) {
            t && i.browser.music && i.client.open("core", "support", {
                apiName: "debug.report"
            }, function(e) {
                try {
                    if (e && e.data && 1 == e.data.isSupport) {
                        if (t = "" + t,
                        n = parseInt(n),
                        sessionStorage.getItem("debug.report:" + t))
                            return;
                        window.performance && 0 < !n && (n = performance.timing[t]),
                        0 < n && (i.client.open("debug", "report", {
                            tag: t,
                            timestamp: n
                        }, o),
                        sessionStorage.setItem("debug.report:" + t, "" + n))
                    }
                } catch (e) {
                    console.error(e)
                }
            })
        }
        ,
        i.h5Log = function(e) {
            var t = i.extend({
                type: "H5",
                uin: i.user.getUin(),
                href: window.location.href,
                timestamp: 0 + new Date
            }, e);
            t = "***" + t.type + "***:" + JSON.stringify(t),
            i.browser.music && i.client && i.client.open && i.client.open("debug", "H5Log", {
                content: t
            }, function() {})
        }
        ,
        i.ajaxReport = function(e, t) {
            if (e.timestamp) {
                var n = {
                    type: "ajaxReport",
                    href: window.location.href,
                    url: e.url,
                    zrequestData: JSON.stringify(e.data),
                    timestamp: e.timestamp,
                    subtype: "request"
                };
                t && (n.subtype = "respond",
                n.status = t.status,
                n.code = t.code,
                n.zrespondData = t.data),
                i.h5Log && i.h5Log(n)
            }
        }
        ;
        var e = parseFloat(i.getParam("_fpsrate"))
          , t = 10;
        if (0 < e && e < 1 && (t = Math.pow(10, e.toString().split(".")[1].length)),
        i.browser.music && (/\benableReportFps\/1/i.test(navigator.userAgent) || !(/\benableReportFps\/|\bH5TestFPS\//i.test(navigator.userAgent) && e <= 0) && Math.floor(100 * Math.random() * t) < (e || .1) * t)) {
            var n = 0
              , o = 0
              , a = []
              , s = 0
              , c = null
              , l = 0
              , u = function e() {
                o = Date.now(),
                a.push(o - n),
                n = o,
                s && requestAnimationFrame(e)
            }
              , d = function(e) {
                if (!s)
                    return s = e,
                    n = Date.now(),
                    a = [],
                    requestAnimationFrame(u),
                    !0
            }
              , p = function(e) {
                i.client.open("debug", "reportFPS", {
                    url: location.origin + location.pathname,
                    position: 1 == e ? "0" : "1",
                    frameTimeList: a
                })
            }
              , m = function(t) {
                s = 0,
                console.log((1 == t ? "首次进入页面帧间隔：" : "滚动页面帧间隔：") + a.join(",")),
                1 == l ? p(t) : 0 == l && i.client.open("core", "support", {
                    apiName: "debug.reportFPS"
                }, function(e) {
                    l = e && e.data && 1 == e.data.isSupport ? (p(t),
                    1) : -1
                })
            };
            setTimeout(function() {
                d(1) && setTimeout(function() {
                    m(1)
                }, 1e3)
            }, 5e3),
            window.addEventListener("scroll", function() {
                d(2),
                c && clearTimeout(c),
                c = setTimeout(function() {
                    m(2)
                }, 300)
            })
        }
        if (i.browser.music) {
            var f = window.history && 1 == window.history.length;
            if (f)
                try {
                    f = !sessionStorage.getItem("debug_spd"),
                    sessionStorage.setItem("debug_spd", 1)
                } catch (e) {
                    console.log(e)
                }
            var h = /n2\/m\/client\/cmt_list\/index/i.test(location.href);
            if (f && (0 === parseInt(Math.random() * (h ? 10 : 100)) || /debug_spd=1/.test(location.search))) {
                var g = window.performance && performance.timing || {}
                  , _ = g.navigationStart;
                0 < _ && setTimeout(function() {
                    i.client.open("core", "support", {
                        apiName: "debug.report"
                    }, function(e) {
                        e && e.data && 1 == e.data.isSupport && i.client.open("debug", "report", {
                            tag: "navigationStart",
                            timestamp: _,
                            url: location.href
                        }, function(e) {
                            var t = e ? e.data && e.data.time : 0;
                            if (0 < t && t < 2e4) {
                                var o = _ - t;
                                ["navigationStart", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive"].forEach(function(e) {
                                    var t = g[e];
                                    if (0 < t) {
                                        var n = t - o;
                                        i.reportCode({
                                            rate: 1,
                                            code: 0,
                                            time: n,
                                            cgi: "spdtest.all." + e
                                        }),
                                        h && i.reportCode({
                                            rate: 1,
                                            code: 0,
                                            time: n,
                                            cgi: "spdtest.cmt." + e
                                        })
                                    }
                                })
                            }
                        })
                    })
                }, 100)
            }
        }
    }(M),
    window.Promise && Object.assign && Array.from || document.write('<script src="//y.qq.com/lib/polyfill/es6-shim.js?max_age=2592000"><\/script>')
}();
