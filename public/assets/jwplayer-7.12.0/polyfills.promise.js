webpackJsonpjwplayer([11], {
    57: function(t, n, e) {
        var o, r, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        o = [e(1)], r = function(t) {
            function n(t, n) {
                return function() {
                    t.apply(n, arguments)
                }
            }

            function e(t) {
                if ("object" !== i(this)) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof t) throw new TypeError("not a function");
                this._state = null, this._value = null, this._deferreds = [], l(t, n(r, this), n(f, this))
            }

            function o(t) {
                var n = this;
                return null === this._state ? void this._deferreds.push(t) : void s(function() {
                    var e = n._state ? t.onFulfilled : t.onRejected;
                    if (null === e) return void(n._state ? t.resolve : t.reject)(n._value);
                    var o;
                    try {
                        o = e(n._value)
                    } catch (r) {
                        return void t.reject(r)
                    }
                    t.resolve(o)
                })
            }

            function r(t) {
                try {
                    if (t === this) throw new TypeError("A promise cannot be resolved with itself.");
                    if (t && ("object" === ("undefined" == typeof t ? "undefined" : i(t)) || "function" == typeof t)) {
                        var e = t.then;
                        if ("function" == typeof e) return void l(n(e, t), n(r, this), n(f, this))
                    }
                    this._state = !0, this._value = t, u.call(this)
                } catch (o) {
                    f.call(this, o)
                }
            }

            function f(t) {
                this._state = !1, this._value = t, u.call(this)
            }

            function u() {
                for (var t = 0, n = this._deferreds.length; t < n; t++) o.call(this, this._deferreds[t]);
                this._deferreds = null
            }

            function c(t, n, e, o) {
                this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof n ? n : null, this.resolve = e, this.reject = o
            }

            function l(t, n, e) {
                var o = !1;
                try {
                    t(function(t) {
                        o || (o = !0, n(t))
                    }, function(t) {
                        o || (o = !0, e(t))
                    })
                } catch (r) {
                    if (o) return;
                    o = !0, e(r)
                }
            }
            var s = t.defer,
                a = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };
            e.prototype["catch"] = function(t) {
                return this.then(null, t)
            }, e.prototype.then = function(t, n) {
                var r = this;
                return new e(function(e, i) {
                    o.call(r, new c(t, n, e, i))
                })
            }, e.all = function() {
                var t = Array.prototype.slice.call(1 === arguments.length && a(arguments[0]) ? arguments[0] : arguments);
                return new e(function(n, e) {
                    function o(f, u) {
                        try {
                            if (u && ("object" === ("undefined" == typeof u ? "undefined" : i(u)) || "function" == typeof u)) {
                                var c = u.then;
                                if ("function" == typeof c) return void c.call(u, function(t) {
                                    o(f, t)
                                }, e)
                            }
                            t[f] = u, 0 === --r && n(t)
                        } catch (l) {
                            e(l)
                        }
                    }
                    if (0 === t.length) return n([]);
                    for (var r = t.length, f = 0; f < t.length; f++) o(f, t[f])
                })
            }, e.resolve = function(t) {
                return t && "object" === ("undefined" == typeof t ? "undefined" : i(t)) && t.constructor === e ? t : new e(function(n) {
                    n(t)
                })
            }, e.reject = function(t) {
                return new e(function(n, e) {
                    e(t)
                })
            }, e.race = function(t) {
                return new e(function(n, e) {
                    for (var o = 0, r = t.length; o < r; o++) t[o].then(n, e)
                })
            }, e._setImmediateFn = function(t) {
                s = t
            }, window.Promise || (window.Promise = e)
        }.apply(n, o), !(void 0 !== r && (t.exports = r))
    }
});