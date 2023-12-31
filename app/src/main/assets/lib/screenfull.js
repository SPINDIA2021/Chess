/*!
 * screenfull
 * v5.0.2 - 2020-02-13
 * (c) Sindre Sorhus; MIT License
 */

! function() {
    "use strict";
    var u = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
        e = "undefined" != typeof module && module.exports,
        c = function() {
            for (var e, n = [
                    ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                    ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                    ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                    ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                    ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                ], r = 0, l = n.length, t = {}; r < l; r++)
                if ((e = n[r]) && e[1] in u) {
                    for (r = 0; r < e.length; r++) t[n[0][r]] = e[r];
                    return t
                }
            return !1
        }(),
        l = {
            change: c.fullscreenchange,
            error: c.fullscreenerror
        },
        n = {
            request: function(t) {
                return new Promise(function(e, n) {
                    var r = function() {
                        this.off("change", r), e()
                    }.bind(this);
                    this.on("change", r);
                    var l = (t = t || u.documentElement)[c.requestFullscreen]();
                    l instanceof Promise && l.then(r).catch(n)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(e, n) {
                    if (this.isFullscreen) {
                        var r = function() {
                            this.off("change", r), e()
                        }.bind(this);
                        this.on("change", r);
                        var l = u[c.exitFullscreen]();
                        l instanceof Promise && l.then(r).catch(n)
                    } else e()
                }.bind(this))
            },
            toggle: function(e) {
                return this.isFullscreen ? this.exit() : this.request(e)
            },
            onchange: function(e) {
                this.on("change", e)
            },
            onerror: function(e) {
                this.on("error", e)
            },
            on: function(e, n) {
                var r = l[e];
                r && u.addEventListener(r, n, !1)
            },
            off: function(e, n) {
                var r = l[e];
                r && u.removeEventListener(r, n, !1)
            },
            raw: c
        };
    c ? (Object.defineProperties(n, {
        isFullscreen: {
            get: function() {
                return Boolean(u[c.fullscreenElement])
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return u[c.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return Boolean(u[c.fullscreenEnabled])
            }
        }
    }), e ? module.exports = n : window.screenfull = n) : e ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}();
