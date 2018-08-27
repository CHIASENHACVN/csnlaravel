webpackJsonpjwplayer([1], {
    41: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(140),
            c = n(s);
        a = [i(3), i(6), i(2), i(1)], l = function(e, t, i, n) {
            var a = function(e) {
                var t = i.bounds(e),
                    n = window.pageXOffset;
                return n && i.isAndroid() && document.body.parentElement.getBoundingClientRect().left >= 0 && (t.left -= n, t.right -= n), t
            };
            return function() {
                function l(t, i) {
                    o(this, l), n.extend(this, e), this.className = t + " jw-background-color jw-reset", this.orientation = i, this.dragStartListener = this.dragStart.bind(this), this.dragMoveListener = this.dragMove.bind(this), this.dragEndListener = this.dragEnd.bind(this), this.tapListener = this.tap.bind(this)
                }
                return r(l, [{
                    key: "setup",
                    value: function() {
                        this.el = i.createElement((0, c["default"])(this.className, "jw-slider-" + this.orientation)), this.elementRail = this.el.getElementsByClassName("jw-slider-container")[0], this.elementBuffer = this.el.getElementsByClassName("jw-buffer")[0], this.elementProgress = this.el.getElementsByClassName("jw-progress")[0], this.elementThumb = this.el.getElementsByClassName("jw-knob")[0], this.userInteract = new t(this.element(), {
                            preventScrolling: !0
                        }), this.userInteract.on("dragStart", this.dragStartListener), this.userInteract.on("drag", this.dragMoveListener), this.userInteract.on("dragEnd", this.dragEndListener), this.userInteract.on("tap click", this.tapListener)
                    }
                }, {
                    key: "dragStart",
                    value: function() {
                        this.trigger("dragStart"), this.railBounds = a(this.elementRail)
                    }
                }, {
                    key: "dragEnd",
                    value: function(e) {
                        this.dragMove(e), this.trigger("dragEnd")
                    }
                }, {
                    key: "dragMove",
                    value: function(e) {
                        var t = this.railBounds = this.railBounds ? this.railBounds : a(this.elementRail),
                            n = void 0,
                            o = void 0;
                        "horizontal" === this.orientation ? (n = e.pageX, o = n < t.left ? 0 : n > t.right ? 100 : 100 * i.between((n - t.left) / t.width, 0, 1)) : (n = e.pageY, o = n >= t.bottom ? 0 : n <= t.top ? 100 : 100 * i.between((t.height - (n - t.top)) / t.height, 0, 1));
                        var l = this.limit(o);
                        return this.render(l), this.update(l), !1
                    }
                }, {
                    key: "tap",
                    value: function(e) {
                        this.railBounds = a(this.elementRail), this.dragMove(e)
                    }
                }, {
                    key: "limit",
                    value: function(e) {
                        return e
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        this.trigger("update", {
                            percentage: e
                        })
                    }
                }, {
                    key: "render",
                    value: function(e) {
                        e = Math.max(0, Math.min(e, 100)), "horizontal" === this.orientation ? (this.elementThumb.style.left = e + "%", this.elementProgress.style.width = e + "%") : (this.elementThumb.style.bottom = e + "%", this.elementProgress.style.height = e + "%")
                    }
                }, {
                    key: "updateBuffer",
                    value: function(e) {
                        this.elementBuffer.style.width = e + "%"
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }]), l
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    42: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var o, a, l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }();
        o = [i(3), i(64), i(2), i(1)], a = function(e, t, i, o) {
            return function() {
                function a(i, l, r) {
                    n(this, a), o.extend(this, e), this.el = document.createElement("div");
                    var s = "jw-icon jw-icon-tooltip " + i + " jw-button-color jw-reset";
                    r || (s += " jw-hidden"), t(this.el, l), this.el.className = s, this.container = document.createElement("div"), this.container.className = "jw-overlay jw-reset", this.openClass = "jw-open", this.componentType = "tooltip", this.el.appendChild(this.container)
                }
                return l(a, [{
                    key: "addContent",
                    value: function(e) {
                        this.content && this.removeContent(), this.content = e, this.container.appendChild(e)
                    }
                }, {
                    key: "removeContent",
                    value: function() {
                        this.content && (this.container.removeChild(this.content), this.content = null)
                    }
                }, {
                    key: "hasContent",
                    value: function() {
                        return !!this.content
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }, {
                    key: "openTooltip",
                    value: function(e) {
                        this.trigger("open-" + this.componentType, e, {
                            isOpen: !0
                        }), this.isOpen = !0, i.toggleClass(this.el, this.openClass, this.isOpen)
                    }
                }, {
                    key: "closeTooltip",
                    value: function(e) {
                        this.trigger("close-" + this.componentType, e, {
                            isOpen: !1
                        }), this.isOpen = !1, i.toggleClass(this.el, this.openClass, this.isOpen)
                    }
                }, {
                    key: "toggleOpenState",
                    value: function(e) {
                        this.isOpen ? this.closeTooltip(e) : this.openTooltip(e)
                    }
                }]), a
            }()
        }.apply(t, o), !(void 0 !== a && (e.exports = a))
    },
    43: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return '<div class="jw-display-icon-container jw-display-icon-' + e + ' jw-background-color jw-reset">' + ('<div class="jw-icon jw-icon-' + e + ' jw-button-color jw-reset" role="button" tabindex="0" aria-label="' + t + '"></div>') + "</div>"
        }
    },
    64: function(e, t, i) {
        var n, o;
        n = [], o = function() {
            return function(e, t) {
                e && t && (e.setAttribute("aria-label", t), e.setAttribute("role", "button"), e.setAttribute("tabindex", "0"))
            }
        }.apply(t, n), !(void 0 !== o && (e.exports = o))
    },
    70: function(e, t, i) {
        var n, o;
        n = [i(6)], o = function(e) {
            return function(t, i, n) {
                var o = document.createElement("div");
                return o.className = "jw-icon jw-icon-inline jw-button-color jw-reset " + t, o.setAttribute("role", "button"), o.setAttribute("tabindex", "0"), n && o.setAttribute("aria-label", n), o.style.display = "none", i && new e(o).on("click tap", function() {
                    i()
                }), {
                    element: function() {
                        return o
                    },
                    toggle: function(e) {
                        e ? this.show() : this.hide()
                    },
                    show: function() {
                        o.style.display = ""
                    },
                    hide: function() {
                        o.style.display = "none"
                    }
                }
            }
        }.apply(t, n), !(void 0 !== o && (e.exports = o))
    },
    71: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function a(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function l(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var r, s, c = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            w = i(136),
            u = n(w);
        r = [i(42), i(2), i(1), i(6)], s = function(e, t, i, n) {
            return function(e) {
                function r() {
                    return o(this, r), a(this, (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments))
                }
                return l(r, e), c(r, [{
                    key: "setup",
                    value: function(e, o, a) {
                        a = a || {}, this.iconUI || (this.iconUI = new n(this.el, {
                            useHover: !0,
                            directSelect: !0
                        }), this.toggleValueListener = this.toggleValue.bind(this), this.toggleOpenStateListener = this.toggleOpenState.bind(this), this.openTooltipListener = this.openTooltip.bind(this), this.closeTooltipListener = this.closeTooltip.bind(this), this.selectListener = this.select.bind(this)), this.reset(), e = i.isArray(e) ? e : [], t.toggleClass(this.el, "jw-hidden", e.length < 2);
                        var l = e.length > 2 || 2 === e.length && a && a.isToggle === !1,
                            r = !l && 2 === e.length;
                        if (t.toggleClass(this.el, "jw-toggle", r || a.isToggle), t.toggleClass(this.el, "jw-button-color", !r), l) {
                            t.removeClass(this.el, "jw-off"), this.iconUI.on("tap", this.toggleOpenStateListener).on("over", this.openTooltipListener).on("out", this.closeTooltipListener);
                            var s = (0, u["default"])(e),
                                c = t.createElement(s);
                            this.addContent(c), this.contentUI = new n(this.content).on("click tap", this.selectListener)
                        } else r && this.iconUI.on("click tap", this.toggleValueListener);
                        this.selectItem(o)
                    }
                }, {
                    key: "toggleValue",
                    value: function() {
                        this.trigger("toggleValue")
                    }
                }, {
                    key: "select",
                    value: function(e) {
                        if (e.target.parentElement === this.content) {
                            var n = t.classList(e.target),
                                o = i.find(n, function(e) {
                                    return 0 === e.indexOf("jw-item")
                                });
                            o && (this.trigger("select", parseInt(o.split("-")[2])), this.closeTooltipListener())
                        }
                    }
                }, {
                    key: "selectItem",
                    value: function(e) {
                        if (this.content)
                            for (var i = 0; i < this.content.children.length; i++) t.toggleClass(this.content.children[i], "jw-active-option", e === i);
                        t.toggleClass(this.el, "jw-off", 0 === e)
                    }
                }, {
                    key: "reset",
                    value: function() {
                        t.addClass(this.el, "jw-off"), this.iconUI.off(), this.contentUI && this.contentUI.off().destroy(), this.removeContent()
                    }
                }]), r
            }(e)
        }.apply(t, r), !(void 0 !== s && (e.exports = s))
    },
    72: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var o, a, l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }();
        o = [i(4), i(5), i(3), i(22), i(2), i(1), i(70), i(126), i(128), i(127), i(132), i(131), i(129), i(130), i(175)], a = function(e, t, o, a, r, s, c, w, u, d, p, j, h, g, f) {
            var m = r.isMobile() ? 4e3 : 2e3,
                y = function() {
                    return {
                        reason: "interaction"
                    }
                },
                b = !1;
            return function() {
                function t(e, a) {
                    var l = this;
                    n(this, t), s.extend(this, o), this.activeTimeout = -1, this.context = e, this.controlbar = null, this.displayContainer = null, this.dock = null, this.enabled = !0, this.instreamState = null, this.keydownCallback = null, this.mute = null, this.nextUpToolTip = null, this.playerContainer = a, this.rightClickMenu = null, this.showing = !1, this.unmuteCallback = null, this.div = null, this.right = null, this.activeListeners = {
                        mousemove: function() {
                            return clearTimeout(l.activeTimeout)
                        },
                        mouseout: function() {
                            return l.userActive()
                        }
                    }, this.dimensions = {}, b || (b = !0, i(184))
                }
                return l(t, [{
                    key: "enable",
                    value: function(t, i) {
                        function n(e) {
                            var n = 0,
                                o = i.get("duration"),
                                l = i.get("position");
                            "DVR" === i.get("streamType") && (n = o, o = Math.max(l, a.dvrSeekLimit));
                            var s = r.between(l + e, n, o);
                            t.seek(s, y())
                        }

                        function o(e) {
                            var n = r.between(i.get("volume") + e, 0, 100);
                            t.setVolume(n)
                        }
                        var l = this,
                            s = this.context.createElement("div");
                        s.className = "jw-controls jw-reset", this.div = s;
                        var m = i.get("touchMode");
                        if (!this.displayContainer) {
                            var b = new d,
                                v = new p(i, t),
                                k = new j(i),
                                x = new h(i, t);
                            k.on("click tap", function() {
                                l.trigger(e.JWPLAYER_DISPLAY_CLICK), l.userActive(1e3), t.play(y())
                            }), r.isChrome() && !m && (k.el.style.pointerEvents = "none", k.icon.style.pointerEvents = "none"), b.addButton(v), b.addButton(k), b.addButton(x), this.div.appendChild(b.element()), this.displayContainer = b
                        }
                        var C = this.context.createElement("div");
                        C.className = "jw-controls-right jw-reset", s.appendChild(C), this.right = C;
                        var _ = this.dock = new u(i);
                        this.right.appendChild(_.element()), m ? r.addClass(this.playerContainer, "jw-flag-touch") : (this.rightClickMenu = new f, i.change("flashBlocked", function(e, t) {
                            t ? l.rightClickMenu.destroy() : l.rightClickMenu.setup(e, l.playerContainer, l.playerContainer)
                        }));
                        var T = this.controlbar = new w(t, i);
                        if (T.on(e.JWPLAYER_USER_ACTION, function() {
                            return l.userActive()
                        }), i.get("nextUpDisplay") && !T.nextUpToolTip) {
                            var E = new g(i, t, this.playerContainer);
                            E.on("all", this.trigger, this), E.setup(this.context), T.nextUpToolTip = E, this.div.appendChild(E.element())
                        }
                        if (this.addActiveListeners(T.element()), this.div.appendChild(T.element()), i.get("autostartMuted")) {
                            var O = function() {
                                return l.unmuteAutoplay(t, i)
                            };
                            this.mute = c("jw-autostart-mute jw-off", O, i.get("localization").volume), this.mute.show(), this.div.appendChild(this.mute.element()), T.renderVolume(!0, i.get("volume")), r.addClass(this.playerContainer, "jw-flag-autostart"), i.on("change:autostartFailed change:autostartMuted change:mute", O), this.unmuteCallback = O
                        }
                        var M = function(e) {
                            if (e.ctrlKey || e.metaKey) return !0;
                            switch (l.instreamState || l.userActive(), e.keyCode) {
                                case 27:
                                    t.setFullscreen(!1);
                                    break;
                                case 13:
                                case 32:
                                    t.play(y());
                                    break;
                                case 37:
                                    l.instreamState || n(-5);
                                    break;
                                case 39:
                                    l.instreamState || n(5);
                                    break;
                                case 38:
                                    o(10);
                                    break;
                                case 40:
                                    o(-10);
                                    break;
                                case 67:
                                    var a = t.getCaptionsList(),
                                        r = a.length;
                                    if (r) {
                                        var s = (t.getCurrentCaptions() + 1) % r;
                                        t.setCurrentCaptions(s)
                                    }
                                    break;
                                case 77:
                                    t.setMute();
                                    break;
                                case 70:
                                    t.setFullscreen();
                                    break;
                                default:
                                    if (e.keyCode >= 48 && e.keyCode <= 59) {
                                        var c = e.keyCode - 48,
                                            w = c / 10 * i.get("duration");
                                        t.seek(w, y())
                                    }
                            }
                            return /13|32|37|38|39|40/.test(e.keyCode) ? (e.preventDefault(), !1) : void 0
                        };
                        this.playerContainer.addEventListener("keydown", M), this.keydownCallback = M, this.userActive(), this.playerContainer.appendChild(this.div)
                    }
                }, {
                    key: "disable",
                    value: function() {
                        this.off(), clearTimeout(this.activeTimeout), this.div.parentNode && (r.removeClass(this.playerContainer, "jw-flag-touch"), this.playerContainer.removeChild(this.div)), this.controlbar && this.removeActiveListeners(this.controlbar.element()), this.rightClickMenu && this.rightClickMenu.destroy(), this.keydownCallback && this.playerContainer.removeEventListener("keydown", this.keydownCallback);
                        var e = this.nextUpToolTip;
                        e && e.destroy()
                    }
                }, {
                    key: "controlbarHeight",
                    value: function() {
                        return this.dimensions.cbHeight || (this.dimensions.cbHeight = this.controlbar.element().clientHeight), this.dimensions.cbHeight
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.div
                    }
                }, {
                    key: "logoContainer",
                    value: function() {
                        return this.right
                    }
                }, {
                    key: "resize",
                    value: function() {
                        this.dimensions = {}
                    }
                }, {
                    key: "unmuteAutoplay",
                    value: function(e, t) {
                        var i = !t.get("autostartFailed"),
                            n = t.get("mute");
                        i ? n = !1 : t.set("playOnViewable", !1), this.unmuteCallback && (t.off("change:autostartFailed change:autostartMuted change:mute", this.unmuteCallback), this.unmuteCallback = null), t.set("autostartFailed", void 0), t.set("autostartMuted", void 0), e.setMute(n), this.controlbar.renderVolume(n, t.get("volume")), this.mute.hide(), r.removeClass(this.playerContainer, "jw-flag-autostart")
                    }
                }, {
                    key: "addActiveListeners",
                    value: function(e) {
                        e && !r.isMobile() && (e.addEventListener("mousemove", this.activeListeners.mousemove), e.addEventListener("mouseout", this.activeListeners.mouseout))
                    }
                }, {
                    key: "removeActiveListeners",
                    value: function(e) {
                        e && (e.removeEventListener("mousemove", this.activeListeners.mousemove), e.removeEventListener("mouseout", this.activeListeners.mouseout))
                    }
                }, {
                    key: "userActive",
                    value: function(e) {
                        var t = this;
                        clearTimeout(this.activeTimeout), this.activeTimeout = setTimeout(function() {
                            return t.userInactive()
                        }, e || m), this.showing || (r.removeClass(this.playerContainer, "jw-flag-user-inactive"), this.showing = !0, this.trigger("userActive"))
                    }
                }, {
                    key: "userInactive",
                    value: function() {
                        clearTimeout(this.activeTimeout), this.showing = !1, this.controlbar && this.controlbar.closeMenus({
                            type: "userInactive"
                        }), r.addClass(this.playerContainer, "jw-flag-user-inactive"), this.trigger("userInactive")
                    }
                }]), t
            }()
        }.apply(t, o), !(void 0 !== a && (e.exports = a))
    },
    84: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.PLAYBACK_RATE_ICON = '<svg viewBox="112 -44 1024 684"><g><path d="M735.2,41.2c-143,0-258.8,115.9-258.8,258.8s115.9,258.8,258.8,258.8S994,443,994,300S878.1,41.2,735.2,41.2z M899.9,323.5H758.7h-47.1v-47.1V135.3h47.1v141.2h141.2V323.5z"/><rect x="288.1" y="135.3" width="141.2" height="47.1"/><rect x="194" y="276.5" width="188.2" height="47.1"/><rect x="288.1" y="417.7" width="141.2" height="47.1"/></g></svg>'
    },
    121: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var o, a, l = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }();
        o = [i(1), i(2), i(35)], a = function(e, t, i) {
            var o = function() {
                function e(t, i) {
                    n(this, e), this.time = t, this.text = i, this.el = document.createElement("div"), this.el.className = "jw-cue jw-reset"
                }
                return l(e, [{
                    key: "align",
                    value: function(e) {
                        if ("%" === this.time.toString().slice(-1)) this.pct = this.time;
                        else {
                            var t = this.time / e * 100;
                            this.pct = t + "%"
                        }
                        this.el.style.left = this.pct
                    }
                }]), e
            }();
            return {
                loadChapters: function(e) {
                    t.ajax(e, this.chaptersLoaded.bind(this), this.chaptersFailed, {
                        plainText: !0
                    })
                },
                chaptersLoaded: function(t) {
                    var n = i(t.responseText);
                    e.isArray(n) && (e.each(n, this.addCue, this), this.drawCues())
                },
                chaptersFailed: function() {},
                addCue: function(e) {
                    this.cues.push(new o(e.begin, e.text))
                },
                drawCues: function() {
                    var t = this,
                        i = this._model.get("duration");
                    return !i || i <= 0 ? void this._model.once("change:duration", this.drawCues, this) : void e.each(this.cues, function(e) {
                        e.align(i), e.el.addEventListener("mouseover", function() {
                            t.activeCue = e
                        }), e.el.addEventListener("mouseout", function() {
                            t.activeCue = null
                        }), t.elementRail.appendChild(e.el)
                    })
                },
                resetChapters: function() {
                    e.each(this.cues, function(e) {
                        e.el.parentNode && e.el.parentNode.removeChild(e.el)
                    }), this.cues = []
                }
            }
        }.apply(t, o), !(void 0 !== a && (e.exports = a))
    },
    122: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function a(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function l(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var r, s, c = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            w = function p(e, t, i) {
                null === e && (e = Function.prototype);
                var n = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === n) {
                    var o = Object.getPrototypeOf(e);
                    return null === o ? void 0 : p(o, t, i)
                }
                if ("value" in n) return n.value;
                var a = n.get;
                if (void 0 !== a) return a.call(i)
            },
            u = i(139),
            d = n(u);
        r = [i(71), i(2)], s = function(e, t) {
            return function(e) {
                function i(e, n, l) {
                    o(this, i);
                    var r = a(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e, n, !1)),
                        s = (0, d["default"])(l),
                        c = t.createElement(s);
                    return r.defaultIcon = c.getElementsByClassName("jw-menu-selection-icon")[0], r.selectionText = c.getElementsByClassName("jw-menu-selection-text")[0], r.el.insertBefore(c, r.container), t.addClass(r.el, "jw-selection-menu"), t.removeClass(r.el, "jw-icon"), r
                }
                return l(i, e), c(i, [{
                    key: "setup",
                    value: function(e, n, o) {
                        this.list = e, this.defaultIndex = o && o.defaultIndex > -1 ? o.defaultIndex : -1, w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "setup", this).call(this, e, n, o), t.addClass(this.el, "jw-button-color")
                    }
                }, {
                    key: "selectItem",
                    value: function(e) {
                        w(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "selectItem", this).call(this, e);
                        var n = e !== this.defaultIndex && e !== -1;
                        n && (this.selectionText.textContent = this.list[e].label), t.toggleClass(this.defaultIcon, "jw-hidden", n), t.toggleClass(this.selectionText, "jw-hidden", !n)
                    }
                }]), i
            }(e)
        }.apply(t, r), !(void 0 !== s && (e.exports = s))
    },
    123: function(e, t, i) {
        var n, o;
        n = [i(1), i(2), i(35)], o = function(e, t, i) {
            function n(e) {
                this.begin = e.begin, this.end = e.end, this.img = e.text
            }
            return {
                loadThumbnails: function(e) {
                    e && (this.vttPath = e.split("?")[0].split("/").slice(0, -1).join("/"), this.individualImage = null, t.ajax(e, this.thumbnailsLoaded.bind(this), this.thumbnailsFailed.bind(this), {
                        plainText: !0
                    }))
                },
                thumbnailsLoaded: function(t) {
                    var o = i(t.responseText);
                    e.isArray(o) && (e.each(o, function(e) {
                        this.thumbnails.push(new n(e))
                    }, this), this.drawCues())
                },
                thumbnailsFailed: function() {},
                chooseThumbnail: function(t) {
                    var i = e.sortedIndex(this.thumbnails, {
                        end: t
                    }, e.property("end"));
                    i >= this.thumbnails.length && (i = this.thumbnails.length - 1);
                    var n = this.thumbnails[i].img;
                    return n.indexOf("://") < 0 && (n = this.vttPath ? this.vttPath + "/" + n : n), n
                },
                loadThumbnail: function(t) {
                    var i = this.chooseThumbnail(t),
                        n = {
                            display: "block",
                            margin: "0 auto",
                            backgroundPosition: "0 0"
                        },
                        o = i.indexOf("#xywh");
                    if (o > 0) try {
                        var a = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(i);
                        i = a[1], n.backgroundPosition = a[2] * -1 + "px " + a[3] * -1 + "px", n.width = a[4], n.height = a[5]
                    } catch (l) {
                        return
                    } else this.individualImage || (this.individualImage = new Image, this.individualImage.onload = e.bind(function() {
                        this.individualImage.onload = null, this.timeTip.image({
                            width: this.individualImage.width,
                            height: this.individualImage.height
                        }), this.timeTip.setWidth(this.individualImage.width)
                    }, this), this.individualImage.src = i);
                    return n.backgroundImage = 'url("' + i + '")', n
                },
                showThumbnail: function(e) {
                    this.thumbnails.length < 1 || this.timeTip.image(this.loadThumbnail(e))
                },
                resetThumbnails: function() {
                    this.timeTip.image({
                        backgroundImage: "",
                        width: 0,
                        height: 0
                    }), this.thumbnails = []
                }
            }
        }.apply(t, n), !(void 0 !== o && (e.exports = o))
    },
    124: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var l, r, s = function w(e, t, i) {
                null === e && (e = Function.prototype);
                var n = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === n) {
                    var o = Object.getPrototypeOf(e);
                    return null === o ? void 0 : w(o, t, i)
                }
                if ("value" in n) return n.value;
                var a = n.get;
                if (void 0 !== a) return a.call(i)
            },
            c = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }();
        l = [i(1), i(2), i(22), i(6), i(41), i(42), i(121), i(123)], r = function(e, t, i, l, r, w, u, d) {
            function p() {
                return {
                    reason: "interaction"
                }
            }
            var j = function(e) {
                    function i() {
                        return n(this, i), o(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments))
                    }
                    return a(i, e), c(i, [{
                        key: "setup",
                        value: function() {
                            this.text = document.createElement("span"), this.text.className = "jw-text jw-reset", this.img = document.createElement("div"), this.img.className = "jw-reset", this.containerWidth = 0, this.textLength = 0, this.dragJustReleased = !1;
                            var e = document.createElement("div");
                            e.className = "jw-time-tip jw-background-color jw-reset", e.appendChild(this.img), e.appendChild(this.text), this.addContent(e)
                        }
                    }, {
                        key: "image",
                        value: function(e) {
                            t.style(this.img, e)
                        }
                    }, {
                        key: "update",
                        value: function(e) {
                            this.text.textContent = e
                        }
                    }, {
                        key: "getWidth",
                        value: function() {
                            return this.containerWidth || this.setWidth(), this.containerWidth
                        }
                    }, {
                        key: "setWidth",
                        value: function(e) {
                            return e ? void(this.containerWidth = e + 16) : void(this.container && (this.containerWidth = t.bounds(this.container).width))
                        }
                    }, {
                        key: "resetWidth",
                        value: function() {
                            this.containerWidth = 0
                        }
                    }]), i
                }(w),
                h = function(r) {
                    function w(t, i) {
                        n(this, w);
                        var a = o(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, "jw-slider-time", "horizontal"));
                        return a._model = t, a._api = i, a.timeTip = new j("jw-tooltip-time", null, (!0)), a.timeTip.setup(), a.cues = [], a.seekThrottled = e.throttle(a.performSeek, 400), a.mobileHoverDistance = 5, a.setup(), a
                    }
                    return a(w, r), c(w, [{
                        key: "setup",
                        value: function() {
                            s(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "setup", this).apply(this, arguments), this._model.on("duration", this.onDuration, this).change("playlistItem", this.onPlaylistItem, this).change("position", this.onPosition, this).change("buffer", this.onBuffer, this), this.elementRail.appendChild(this.timeTip.element()), this.elementUI = new l(this.el, {
                                useHover: !0,
                                useMove: !0
                            }).on("drag move over", this.showTimeTooltip.bind(this), this).on("dragEnd out", this.hideTimeTooltip.bind(this), this)
                        }
                    }, {
                        key: "limit",
                        value: function(t) {
                            if (this.activeCue && e.isNumber(this.activeCue.pct)) return this.activeCue.pct;
                            var n = this._model.get("duration"),
                                o = this._model.get("streamType");
                            if ("DVR" === o) {
                                var a = (1 - t / 100) * n,
                                    l = this._model.get("position"),
                                    r = Math.min(a, Math.max(i.dvrSeekLimit, l)),
                                    s = 100 * r / n;
                                return 100 - s
                            }
                            return t
                        }
                    }, {
                        key: "update",
                        value: function(e) {
                            this.seekTo = e, this.seekThrottled(), s(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "update", this).apply(this, arguments)
                        }
                    }, {
                        key: "dragStart",
                        value: function() {
                            this._model.set("scrubbing", !0), s(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "dragStart", this).apply(this, arguments)
                        }
                    }, {
                        key: "dragEnd",
                        value: function() {
                            s(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "dragEnd", this).apply(this, arguments), this._model.set("scrubbing", !1), this.dragJustReleased = !0
                        }
                    }, {
                        key: "onSeeked",
                        value: function() {
                            this._model.get("scrubbing") && this.performSeek()
                        }
                    }, {
                        key: "onBuffer",
                        value: function(e, t) {
                            this.updateBuffer(t)
                        }
                    }, {
                        key: "onPosition",
                        value: function(e, t) {
                            return this.dragJustReleased ? void(this.dragJustReleased = !1) : void this.updateTime(t, e.get("duration"))
                        }
                    }, {
                        key: "onDuration",
                        value: function(e, t) {
                            this.updateTime(e.get("position"), t)
                        }
                    }, {
                        key: "updateTime",
                        value: function(e, t) {
                            var i = 0;
                            if (t) {
                                var n = this._model.get("streamType");
                                "DVR" === n ? i = (t - e) / t * 100 : "VOD" === n && (i = e / t * 100)
                            }
                            this.render(i)
                        }
                    }, {
                        key: "onPlaylistItem",
                        value: function(t, i) {
                            if (i) {
                                this.reset(), t.mediaModel.on("seeked", this.onSeeked, this);
                                var n = i.tracks;
                                e.each(n, function(e) {
                                    e && e.kind && "thumbnails" === e.kind.toLowerCase() ? this.loadThumbnails(e.file) : e && e.kind && "chapters" === e.kind.toLowerCase() && this.loadChapters(e.file)
                                }, this)
                            }
                        }
                    }, {
                        key: "performSeek",
                        value: function() {
                            var e, t = this.seekTo,
                                i = this._model.get("duration"),
                                n = this._model.get("streamType");
                            0 === i ? this._api.play(p()) : "DVR" === n ? (e = (100 - t) / 100 * i, this._api.seek(e, p())) : (e = t / 100 * i, this._api.seek(Math.min(e, i - .25), p()))
                        }
                    }, {
                        key: "showTimeTooltip",
                        value: function(n) {
                            var o = this._model.get("duration");
                            if (0 !== o) {
                                var a = this._model.get("containerWidth"),
                                    r = t.bounds(this.elementRail),
                                    s = n.pageX ? n.pageX - r.left : n.x;
                                s = t.between(s, 0, r.width);
                                var c = s / r.width,
                                    w = o * c;
                                o < 0 && (w = o - w);
                                var u;
                                if ("touch" === l.getPointerType(n.sourceEvent) && (this.activeCue = e.reduce(this.cues, function(e, t) {
                                    return Math.abs(s - parseInt(t.pct) / 100 * r.width) < this.mobileHoverDistance ? t : e
                                }.bind(this), void 0)), this.activeCue) u = this.activeCue.text;
                                else {
                                    var d = !0;
                                    u = t.timeFormat(w, d), o < 0 && w > i.dvrSeekLimit && (u = "Live")
                                }
                                var p = this.timeTip;
                                p.update(u), this.textLength !== u.length && (this.textLength = u.length, p.resetWidth()), this.showThumbnail(w), t.addClass(p.el, "jw-open");
                                var j = p.getWidth(),
                                    h = r.width / 100,
                                    g = a - r.width,
                                    f = 0;
                                j > g && (f = (j - g) / (200 * h));
                                var m = 100 * Math.min(1 - f, Math.max(f, c)).toFixed(3);
                                t.style(p.el, {
                                    left: m + "%"
                                })
                            }
                        }
                    }, {
                        key: "hideTimeTooltip",
                        value: function() {
                            t.removeClass(this.timeTip.el, "jw-open")
                        }
                    }, {
                        key: "reset",
                        value: function() {
                            this.resetChapters(), this.resetThumbnails(), this.timeTip.resetWidth(), this.textLength = 0
                        }
                    }]), w
                }(r);
            return e.extend(h.prototype, u, d), h
        }.apply(t, l), !(void 0 !== r && (e.exports = r))
    },
    125: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var l, r, s = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }();
        l = [i(42), i(41), i(6), i(2)], r = function(e, t, i) {
            return function(e) {
                function l(e, a, r) {
                    n(this, l);
                    var s = o(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, a, r, !0));
                    return s._model = e, s.volumeSlider = new t("jw-slider-volume jw-volume-tip", "vertical"), s.volumeSlider.setup(), s.addContent(s.volumeSlider.element()), s.volumeSlider.on("update", function(e) {
                        this.trigger("update", e)
                    }, s), new i(s.el, {
                        useHover: !0,
                        directSelect: !0
                    }).on("click", s.toggleValue, s).on("tap", s.toggleOpenState, s).on("over", s.openTooltip, s).on("out", s.closeTooltip, s), s._model.on("change:volume", s.onVolume, s), s
                }
                return a(l, e), s(l, [{
                    key: "toggleValue",
                    value: function() {
                        this.trigger("toggleValue")
                    }
                }]), l
            }(e)
        }.apply(t, l), !(void 0 !== r && (e.exports = r))
    },
    126: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var o, a, l = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            r = i(84);
        o = [i(2), i(1), i(3), i(22), i(6), i(64), i(41), i(124), i(71), i(122), i(125), i(70)], a = function(e, t, i, o, a, s, c, w, u, d, p, j) {
            function h(e, t) {
                var i = document.createElement("span");
                return i.className = "jw-text jw-reset " + e, t && i.setAttribute("role", t), i
            }

            function g(e, t) {
                return new u(e, t)
            }

            function f(t, i) {
                if (!e.isChrome() || e.isIOS()) return j("jw-icon-airplay jw-off", t, i.airplay);
                var n = i.cast,
                    o = document.createElement("button", "google-cast-button");
                o.className = "jw-button-color jw-icon-inline", s(o, n);
                var a = document.createElement("div");
                return a.className = "jw-reset jw-icon-cast", a.style.display = "none", a.style.cursor = "pointer", a.appendChild(o), {
                    element: function() {
                        return a
                    },
                    toggle: function(e) {
                        e ? this.show() : this.hide()
                    },
                    show: function() {
                        a.style.display = ""
                    },
                    hide: function() {
                        a.style.display = "none"
                    },
                    button: o
                }
            }

            function m() {
                return {
                    reason: "interaction"
                }
            }

            function y(e, i) {
                var n = document.createElement("div");
                return n.className = "jw-group jw-controlbar-" + e + "-group jw-reset", t.each(i, function(e) {
                    e.element && (e = e.element()), n.appendChild(e)
                }), n
            }
            return function() {
                function s(l, u) {
                    n(this, s), t.extend(this, i), this._api = l, this._model = u, this._isMobile = e.isMobile(), this._localization = u.get("localization"), this.nextUpToolTip = null;
                    var b = new w(u, l),
                        v = void 0,
                        k = void 0,
                        x = void 0,
                        C = this._localization.play,
                        _ = this._localization.next,
                        T = this._localization.volume,
                        E = this._localization.rewind;
                    this._isMobile || (v = new c("jw-slider-volume", "horizontal"), v.setup(), k = new p(u, "jw-icon-volume", T)), u.get("sdkplatform") || e.isIOS(8) || e.isIOS(9) || (x = j("jw-icon-volume", l.setMute, T));
                    var O = j("jw-icon-next", l.next.bind(this), _);
                    u.get("nextUpDisplay") && new a(O.element(), {
                        useHover: !0,
                        directSelect: !0
                    }).on("over", function() {
                        var e = this.nextUpToolTip;
                        e && e.toggle(!0, "hover")
                    }, this).on("out", function() {
                        var e = this.nextUpToolTip;
                        if (e) {
                            if (e.nextUpSticky) return;
                            e.toggle(!1)
                        }
                    }, this), this.elements = {
                        alt: h("jw-text-alt", "status"),
                        play: j("jw-icon-playback", l.play.bind(this, m()), C),
                        rewind: j("jw-icon-rewind", this.rewind.bind(this), E),
                        next: O,
                        elapsed: h("jw-text-elapsed", "timer"),
                        countdown: h("jw-text-countdown", "timer"),
                        time: b,
                        duration: h("jw-text-duration", "timer"),
                        durationLeft: h("jw-text-duration", "timer"),
                        hd: g("jw-icon-hd", this._localization.hd),
                        cc: g("jw-icon-cc", this._localization.cc),
                        audiotracks: g("jw-icon-audio-tracks", this._localization.audioTracks),
                        playbackrates: new d("jw-icon-playback-rate", this._localization.playbackRates, r.PLAYBACK_RATE_ICON),
                        mute: x,
                        volume: v,
                        volumetooltip: k,
                        cast: f(l.castToggle, this._localization),
                        fullscreen: j("jw-icon-fullscreen", l.setFullscreen, this._localization.fullscreen)
                    }, this.layout = {
                        left: [this.elements.play, this.elements.rewind, this.elements.elapsed, this.elements.durationLeft, this.elements.countdown],
                        center: [this.elements.time, this.elements.alt],
                        right: [this.elements.duration, this.elements.next, this.elements.hd, this.elements.cc, this.elements.audiotracks, this.elements.playbackrates, this.elements.mute, this.elements.cast, this.elements.volume, this.elements.volumetooltip, this.elements.fullscreen]
                    }, this.menus = t.compact([this.elements.hd, this.elements.cc, this.elements.audiotracks, this.elements.playbackrates, this.elements.volumetooltip]), this.layout.left = t.compact(this.layout.left), this.layout.center = t.compact(this.layout.center), this.layout.right = t.compact(this.layout.right), this.el = document.createElement("div"), this.el.className = "jw-controlbar jw-background-color jw-reset", this.elements.left = y("left", this.layout.left), this.elements.center = y("center", this.layout.center), this.elements.right = y("right", this.layout.right), this.el.appendChild(this.elements.left), this.el.appendChild(this.elements.center), this.el.appendChild(this.elements.right), this.elements.play.show(),
                        this.elements.fullscreen.show(), this.elements.mute && this.elements.mute.show(), u.change("volume", this.onVolume, this), u.change("mute", this.onMute, this), u.change("playlistItem", this.onPlaylistItem, this), u.change("mediaModel", this.onMediaModel, this), u.change("castAvailable", this.onCastAvailable, this), u.change("castActive", this.onCastActive, this), u.change("duration", this.onDuration, this), u.change("position", this.onElapsed, this), u.change("fullscreen", this.onFullscreen, this), u.change("captionsList", this.onCaptionsList, this), u.change("captionsIndex", this.onCaptionsIndex, this), u.change("streamType", this.onStreamTypeChange, this), u.change("nextUp", this.onNextUp, this), u.change("cues", this.addCues, this), u.change("altText", this.setAltText, this), this.elements.volume && this.elements.volume.on("update", function(e) {
                        var t = e.percentage;
                        this._api.setVolume(t)
                    }, this), this.elements.volumetooltip && (this.elements.volumetooltip.on("update", function(e) {
                        var t = e.percentage;
                        this._api.setVolume(t)
                    }, this), this.elements.volumetooltip.on("toggleValue", function() {
                        this._api.setMute()
                    }, this)), this.elements.cast.button && new a(this.elements.cast.button).on("click tap", function() {
                        this._model.set("castClicked", !0)
                    }, this), this.elements.hd.on("select", function(e) {
                        this._model.getVideo().setCurrentQuality(e)
                    }, this), this.elements.hd.on("toggleValue", function() {
                        this._model.getVideo().setCurrentQuality(0 === this._model.getVideo().getCurrentQuality() ? 1 : 0)
                    }, this), this.elements.cc.on("select", function(e) {
                        this._api.setCurrentCaptions(e)
                    }, this), this.elements.cc.on("toggleValue", function() {
                        var e = this._model.get("captionsIndex");
                        this._api.setCurrentCaptions(e ? 0 : 1)
                    }, this), this.elements.audiotracks.on("select", function(e) {
                        this._model.getVideo().setCurrentAudioTrack(e)
                    }, this);
                    var M = u.get("playbackRateControls");
                    if (M) {
                        var L = M.indexOf(this._model.get("playbackRate")),
                            I = M.map(function(e) {
                                return {
                                    label: e + "x",
                                    rate: e
                                }
                            });
                        this.elements.playbackrates.setup(I, L, {
                            defaultIndex: M.indexOf(1),
                            isToggle: !1
                        }), u.change("streamType provider", this.togglePlaybackRateControls, this), u.change("playbackRate", this.onPlaybackRate, this), this.elements.playbackrates.on("select", function(e) {
                            this._model.setPlaybackRate(M[e])
                        }, this), this.elements.playbackrates.on("toggleValue", function() {
                            var e = M.indexOf(this._model.get("playbackRate"));
                            this._model.setPlaybackRate(M[e ? 0 : 1])
                        }, this)
                    }
                    new a(this.elements.duration).on("click tap", function() {
                        if ("DVR" === this._model.get("streamType")) {
                            var e = this._model.get("position");
                            this._api.seek(Math.max(o.dvrSeekLimit, e), m())
                        }
                    }, this), new a(this.elements.durationLeft).on("click tap", function() {
                        if ("DVR" === this._model.get("streamType")) {
                            var e = this._model.get("position");
                            this._api.seek(Math.max(o.dvrSeekLimit, e))
                        }
                    }, this), new a(this.el).on("click tap drag", function() {
                        this.trigger("userAction")
                    }, this), t.each(this.menus, function(e) {
                        e.on("open-tooltip", this.closeMenus, this)
                    }, this)
                }
                return l(s, [{
                    key: "onCaptionsList",
                    value: function(e, t) {
                        var i = e.get("captionsIndex");
                        this.elements.cc.setup(t, i, {
                            isToggle: !0
                        })
                    }
                }, {
                    key: "onCaptionsIndex",
                    value: function(e, t) {
                        this.elements.cc.selectItem(t)
                    }
                }, {
                    key: "togglePlaybackRateControls",
                    value: function(t) {
                        var i = t.getVideo().supportsPlaybackRate && "LIVE" !== t.get("streamType") && t.get("playbackRateControls").length > 1;
                        e.toggleClass(this.elements.playbackrates.el, "jw-hidden", !i)
                    }
                }, {
                    key: "onPlaybackRate",
                    value: function(e, t) {
                        this.elements.playbackrates.selectItem(e.get("playbackRateControls").indexOf(t))
                    }
                }, {
                    key: "onPlaylistItem",
                    value: function() {
                        this.elements.audiotracks.setup()
                    }
                }, {
                    key: "onMediaModel",
                    value: function(e, i) {
                        i.on("change:levels", function(e, t) {
                            this.elements.hd.setup(t, e.get("currentLevel"))
                        }, this), i.on("change:currentLevel", function(e, t) {
                            this.elements.hd.selectItem(t)
                        }, this), i.on("change:audioTracks", function(e, i) {
                            var n = t.map(i, function(e) {
                                return {
                                    label: e.name
                                }
                            });
                            this.elements.audiotracks.setup(n, e.get("currentAudioTrack"), {
                                isToggle: !1
                            })
                        }, this), i.on("change:currentAudioTrack", function(e, t) {
                            this.elements.audiotracks.selectItem(t)
                        }, this)
                    }
                }, {
                    key: "onVolume",
                    value: function(e, t) {
                        this.renderVolume(e.get("mute"), t)
                    }
                }, {
                    key: "onMute",
                    value: function(e, t) {
                        this.renderVolume(t, e.get("volume"))
                    }
                }, {
                    key: "renderVolume",
                    value: function(t, i) {
                        this.elements.mute && e.toggleClass(this.elements.mute.element(), "jw-off", t), this.elements.volume && this.elements.volume.render(t ? 0 : i), this.elements.volumetooltip && (this.elements.volumetooltip.volumeSlider.render(t ? 0 : i), e.toggleClass(this.elements.volumetooltip.element(), "jw-off", t))
                    }
                }, {
                    key: "onCastAvailable",
                    value: function(e, t) {
                        this.elements.cast.toggle(t)
                    }
                }, {
                    key: "onCastActive",
                    value: function(t, i) {
                        this.elements.fullscreen.toggle(!i), this.elements.cast.button && e.toggleClass(this.elements.cast.button, "jw-off", !i)
                    }
                }, {
                    key: "onElapsed",
                    value: function(t, i) {
                        var n = void 0,
                            o = void 0,
                            a = t.get("duration");
                        "DVR" === t.get("streamType") ? n = o = "-" + e.timeFormat(-a) : (n = e.timeFormat(i), o = e.timeFormat(a - i)), this.elements.elapsed.textContent = n, this.elements.countdown.textContent = o
                    }
                }, {
                    key: "onDuration",
                    value: function(t, i) {
                        var n = void 0;
                        n = "DVR" === t.get("streamType") ? "Live" : e.timeFormat(i), this.elements.duration.textContent = n, this.elements.durationLeft.textContent = n
                    }
                }, {
                    key: "onFullscreen",
                    value: function(t, i) {
                        e.toggleClass(this.elements.fullscreen.element(), "jw-off", i)
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }, {
                    key: "setAltText",
                    value: function(e, t) {
                        this.elements.alt.textContent = t
                    }
                }, {
                    key: "addCues",
                    value: function(e, i) {
                        this.elements.time && (t.each(i, function(e) {
                            this.elements.time.addCue(e)
                        }, this), this.elements.time.drawCues())
                    }
                }, {
                    key: "closeMenus",
                    value: function(e) {
                        t.each(this.menus, function(t) {
                            e && e.target === t.el || t.closeTooltip(e)
                        })
                    }
                }, {
                    key: "rewind",
                    value: function() {
                        var e = this._model.get("position"),
                            t = this._model.get("duration"),
                            i = e - 10,
                            n = 0;
                        "DVR" === this._model.get("streamType") && (n = t), this._api.seek(Math.max(i, n), m())
                    }
                }, {
                    key: "onStreamTypeChange",
                    value: function(e) {
                        var t = e.get("streamType");
                        this.elements.rewind.toggle("LIVE" !== t), "DVR" === t && (this.elements.duration.textContent = "Live", this.elements.durationLeft.textContent = "Live");
                        var i = e.get("duration");
                        this.onDuration(e, i)
                    }
                }, {
                    key: "onNextUp",
                    value: function(e, t) {
                        this.elements.next.toggle(!!t)
                    }
                }]), s
            }()
        }.apply(t, o), !(void 0 !== a && (e.exports = a))
    },
    127: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(134),
            c = n(s);
        a = [i(2)], l = function(e) {
            return function() {
                function t() {
                    o(this, t), this.el = e.createElement((0, c["default"])()), this.container = this.el.querySelector(".jw-display-controls")
                }
                return r(t, [{
                    key: "addButton",
                    value: function(e) {
                        this.container.appendChild(e.el)
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }]), t
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    128: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(135),
            c = n(s);
        a = [i(2), i(1), i(6)], l = function(e, t, i) {
            function n(t) {
                return e.hasClass(t.target, "jw-dock-button") ? t.target : e.hasClass(t.target, "jw-dock-text") ? t.target.parentElement.parentElement : t.target.parentElement
            }

            function a(t) {
                var i = (0, c["default"])(t);
                return e.createElement(i)
            }
            return function() {
                function l(t) {
                    var n = this;
                    o(this, l), this.model = t;
                    var r = this.model.get("dock");
                    this.el = a(r), new i(this.el).on("click tap", this.click, this), this.model.on("change:dock", function(t, i) {
                        var o = a(i);
                        e.emptyElement(n.el);
                        for (var l = o.childNodes.length; l--;) n.el.appendChild(o.firstChild)
                    }, this)
                }
                return r(l, [{
                    key: "click",
                    value: function(e) {
                        var i = n(e),
                            o = i.getAttribute("button"),
                            a = this.model.get("dock"),
                            l = t.findWhere(a, {
                                id: o
                            });
                        l && l.callback && l.callback(e)
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }]), l
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    129: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(43),
            c = n(s);
        a = [i(2), i(6)], l = function(e, t) {
            return function() {
                function i(n, a) {
                    o(this, i);
                    var l = e.createElement((0, c["default"])("next", n.get("localization").next));
                    this.iconUI = new t(l).on("click tap", function() {
                        a.next()
                    }), n.change("nextUp", function(e, t) {
                        l.style.display = t ? "" : "none"
                    }), this.el = l
                }
                return r(i, [{
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }]), i
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    130: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(137),
            c = n(s);
        a = [i(14), i(6), i(1), i(3), i(2)], l = function(e, t, i, n, a) {
            return function() {
                function l(e, t, a) {
                    o(this, l), i.extend(this, n), this._model = e, this._api = t, this._playerElement = a, this.nextUpText = e.get("localization").nextUp, this.nextUpClose = e.get("localization").nextUpClose, this.state = "tooltip", this.enabled = !1, this.shown = !1, this.reset()
                }
                return r(l, [{
                    key: "setup",
                    value: function(e) {
                        this.container = e.createElement("div"), this.container.className = "jw-nextup-container jw-reset";
                        var i = a.createElement((0, c["default"])());
                        this.addContent(i), this.closeButton = this.content.querySelector(".jw-nextup-close"), this.closeButton.setAttribute("aria-label", this.nextUpClose), this.tooltip = this.content.querySelector(".jw-nextup-tooltip");
                        var n = this._model;
                        this.enabled = !1, n.on("change:nextUp", this.onNextUp, this), n.change("duration", this.onDuration, this), n.change("position", this.onElapsed, this), n.change("streamType", this.onStreamType, this), n.change("mediaModel", this.onMediaModel, this), new t(this.closeButton, {
                            directSelect: !0
                        }).on("click tap", function() {
                            this.nextUpSticky = !1, this.toggle(!1)
                        }, this), new t(this.tooltip).on("click tap", this.click, this)
                    }
                }, {
                    key: "loadThumbnail",
                    value: function(e) {
                        return this.nextUpImage = new Image, this.nextUpImage.onload = function() {
                            this.nextUpImage.onload = null
                        }.bind(this), this.nextUpImage.src = e, {
                            backgroundImage: 'url("' + e + '")'
                        }
                    }
                }, {
                    key: "click",
                    value: function() {
                        this.reset(), this._api.next()
                    }
                }, {
                    key: "toggle",
                    value: function(t, i) {
                        if (this.enabled && (e.toggleClass(this.container, "jw-nextup-sticky", !!this.nextUpSticky), this.shown !== t)) {
                            this.shown = t, e.toggleClass(this.container, "jw-nextup-container-visible", t), e.toggleClass(this._playerElement, "jw-flag-nextup", t);
                            var n = this._model.get("nextUp");
                            t && n && this.trigger("nextShown", {
                                mode: n.mode,
                                ui: "nextup",
                                itemsShown: [n],
                                feedData: n.feedData,
                                reason: i
                            })
                        }
                    }
                }, {
                    key: "setNextUpItem",
                    value: function(t) {
                        var i = this;
                        setTimeout(function() {
                            if (i.thumbnail = i.content.querySelector(".jw-nextup-thumbnail"), e.toggleClass(i.thumbnail, "jw-nextup-thumbnail-visible", !!t.image), t.image) {
                                var n = i.loadThumbnail(t.image);
                                a.style(i.thumbnail, n)
                            }
                            i.header = i.content.querySelector(".jw-nextup-header"), i.header.innerText = i.nextUpText, i.title = i.content.querySelector(".jw-nextup-title");
                            var o = t.title;
                            i.title.innerText = o ? a.createElement(o).textContent : ""
                        }, 500)
                    }
                }, {
                    key: "onNextUp",
                    value: function(e, t) {
                        this.reset(), t && (this.enabled = !(!t.title && !t.image), this.enabled && (t.showNextUp || (this.nextUpSticky = !1, this.toggle(!1)), this.setNextUpItem(t)))
                    }
                }, {
                    key: "onDuration",
                    value: function(e, t) {
                        if (t) {
                            var i = a.seconds(e.get("nextupoffset") || -10);
                            i < 0 && (i += t), this.offset = i
                        }
                    }
                }, {
                    key: "onMediaModel",
                    value: function(e, t) {
                        t.change("state", function(e, t) {
                            "complete" === t && this.toggle(!1)
                        }, this)
                    }
                }, {
                    key: "onElapsed",
                    value: function(e, t) {
                        var i = this.nextUpSticky;
                        if (this.enabled && i !== !1) {
                            var n = t >= this.offset;
                            n && void 0 === i ? (this.nextUpSticky = n, this.toggle(n, "time")) : !n && i && this.reset()
                        }
                    }
                }, {
                    key: "onStreamType",
                    value: function(e, t) {
                        "VOD" !== t && (this.nextUpSticky = !1, this.toggle(!1))
                    }
                }, {
                    key: "element",
                    value: function() {
                        return this.container
                    }
                }, {
                    key: "addContent",
                    value: function(e) {
                        this.content && this.removeContent(), this.content = e, this.container.appendChild(e)
                    }
                }, {
                    key: "removeContent",
                    value: function() {
                        this.content && (this.container.removeChild(this.content), this.content = null)
                    }
                }, {
                    key: "reset",
                    value: function() {
                        this.nextUpSticky = void 0, this.toggle(!1)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.off(), this._model.off(null, null, this)
                    }
                }]), l
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    131: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(43),
            c = n(s);
        a = [i(2), i(3), i(6), i(1)], l = function(e, t, i, n) {
            return function() {
                function a(l) {
                    var r = this;
                    o(this, a), n.extend(this, t);
                    var s = l.get("localization"),
                        w = e.createElement((0, c["default"])("display", s.playback)),
                        u = w.getElementsByClassName("jw-icon-display")[0];
                    w.style.cursor = "pointer", this.icon = u, this.el = w, this.iconUI = new i(this.el).on("click tap", function(e) {
                        r.trigger(e.type)
                    }), l.on("change:state", function(e, t) {
                        var i = void 0;
                        switch (t) {
                            case "buffering":
                                i = s.buffer;
                                break;
                            case "playing":
                                i = s.pause;
                                break;
                            case "paused":
                                i = s.playback;
                                break;
                            case "complete":
                                i = s.replay;
                                break;
                            default:
                                i = ""
                        }
                        "" === i ? u.removeAttribute("aria-label") : u.setAttribute("aria-label", i)
                    })
                }
                return r(a, [{
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }]), a
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    132: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(43),
            c = n(s);
        a = [i(2), i(6)], l = function(e, t) {
            return function() {
                function i(n, a) {
                    o(this, i), this.el = e.createElement((0, c["default"])("rewind", n.get("localization").playback)), this.iconUI = new t(this.el).on("click tap", function() {
                        var e = n.get("position"),
                            t = n.get("duration"),
                            i = e - 10,
                            o = 0;
                        "DVR" === n.get("streamType") && (o = t), a.seek(Math.max(i, o))
                    })
                }
                return r(i, [{
                    key: "element",
                    value: function() {
                        return this.el
                    }
                }]), i
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    133: function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a, l, r = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            s = i(138),
            c = n(s);
        a = [i(2), i(6), i(28)], l = function(e, t, i) {
            return function() {
                function n() {
                    o(this, n)
                }
                return r(n, [{
                    key: "buildArray",
                    value: function() {
                        var t = i.split("+"),
                            n = t[0],
                            o = {
                                items: [{
                                    title: "Powered by JW Player " + n,
                                    featured: !0,
                                    showLogo: !0,
                                    link: ""
                                }]
                            },
                            a = n.indexOf("-") > 0,
                            l = t[1];
                        if (a && l) {
                            var r = l.split(".");
                            o.items.push({
                                title: "build: (" + r[0] + "." + r[1] + ")",
                                link: "#"
                            })
                        }
                        var s = this.model.get("provider");
                        if (s && s.name.indexOf("flash") >= 0) {
                            var c = "Flash Version " + e.flashVersion();
                            o.items.push({
                                title: c,
                                link: "http://www.adobe.com/software/flash/about/"
                            })
                        }
                        return o
                    }
                }, {
                    key: "rightClick",
                    value: function(e) {
                        return this.lazySetup(), !this.mouseOverContext && (this.hideMenu(), this.showMenu(e), !1)
                    }
                }, {
                    key: "getOffset",
                    value: function(e) {
                        for (var t = e.target, i = e.offsetX || e.layerX, n = e.offsetY || e.layerY; t !== this.playerElement;) i += t.offsetLeft, n += t.offsetTop, t = t.parentNode;
                        return {
                            x: i,
                            y: n
                        }
                    }
                }, {
                    key: "showMenu",
                    value: function(t) {
                        var i = this,
                            n = this.getOffset(t);
                        return this.el.style.left = n.x + "px", this.el.style.top = n.y + "px", e.addClass(this.playerElement, "jw-flag-rightclick-open123"), e.addClass(this.el, "jw-open"), clearTimeout(this._menuTimeout), this._menuTimeout = setTimeout(function() {
                            return i.hideMenu()
                        }, 3e3), !1
                    }
                }, {
                    key: "hideMenu",
                    value: function() {
                        return this.elementUI.off("out", this.hideMenu, this), this.mouseOverContext ? void this.elementUI.on("out", this.hideMenu, this) : (e.removeClass(this.playerElement, "jw-flag-rightclick-open123"), void e.removeClass(this.el, "jw-open"))
                    }
                }, {
                    key: "lazySetup",
                    value: function() {
                        var i = (0, c["default"])(this.buildArray());
                        if (this.el) {
                            if (this.html !== i) {
                                this.html = i;
                                var n = e.createElement(i);
                                e.emptyElement(this.el);
                                for (var o = n.childNodes.length; o--;) this.el.appendChild(n.firstChild)
                            }
                        } else this.html = i, this.el = e.createElement(this.html), this.layer.appendChild(this.el), this.hideMenuHandler = this.hideMenu.bind(this), this.addOffListener(this.playerElement), this.addOffListener(document), this.elementUI = new t(this.el, {
                            useHover: !0
                        }).on("over", function() {
                            this.mouseOverContext = !0
                        }, this).on("out", function() {
                            this.mouseOverContext = !1
                        }, this)
                    }
                }, {
                    key: "setup",
                    value: function(e, t, i) {
                        this.playerElement = t, this.model = e, this.mouseOverContext = !1, this.layer = i, t.oncontextmenu = this.rightClick.bind(this)
                    }
                }, {
                    key: "addOffListener",
                    value: function(e) {
                        e.addEventListener("mousedown", this.hideMenuHandler), e.addEventListener("touchstart", this.hideMenuHandler), e.addEventListener("pointerdown", this.hideMenuHandler)
                    }
                }, {
                    key: "removeOffListener",
                    value: function(e) {
                        e.removeEventListener("mousedown", this.hideMenuHandler), e.removeEventListener("touchstart", this.hideMenuHandler), e.removeEventListener("pointerdown", this.hideMenuHandler)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        clearTimeout(this._menuTimeout), this.el && (this.hideMenu(), this.elementUI.off(), this.removeOffListener(this.playerElement), this.removeOffListener(document), this.hideMenuHandler = null, this.el = null), this.playerElement && (this.playerElement.oncontextmenu = null, this.playerElement = null), this.model && (this.model = null)
                    }
                }]), n
            }()
        }.apply(t, a), !(void 0 !== l && (e.exports = l))
    },
    134: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            return '<div class="jw-display jw-reset"><div class="jw-display-container jw-reset"><div class="jw-display-controls jw-reset"></div></div></div>'
        }
    },
    135: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = e.map(function(e) {
                    return i(e.btnClass, e.id, e.img, e.tooltip)
                }).join("");
            return '<div class="jw-dock jw-reset">' + t + "</div>"
        };
        var i = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    i = arguments[2],
                    o = arguments[3],
                    a = i ? 'style="background-image: url(' + i + ')"' : "",
                    l = o ? n(o) : "",
                    r = o ? 'aria-label="' + o + '" role="button" tabindex="0"' : "";
                // return '<div class="jw-dock-button jw-background-color jw-reset ' + e + '" button="' + t + '">' + ('<div class="jw-icon jw-dock-image jw-button-color jw-reset" ' + a + " " + r + "></div>") + '<div class="jw-arrow jw-reset"></div>' + l + "</div>"
            },
            n = function(e) {
                // return '<div class="jw-overlay jw-background-color jw-reset">' + ('<span class="jw-text jw-dock-text jw-reset">' + e + "</span>") + "</div>"
            }
    },
    136: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = e.map(function(e, t) {
                    return i(t, e.label)
                }).join("");
            return '<ul class="jw-menu jw-background-color jw-reset">' + t + "</ul>"
        };
        var i = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return "<li class='jw-text jw-option jw-item-" + e + " jw-reset'>" + t + "</li>"
        }
    },
    137: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return '<div class="jw-nextup jw-reset"><div class="jw-nextup-tooltip jw-reset">' + ('<div class="jw-nextup-header jw-reset">' + e + "</div>") + '<div class="jw-nextup-body jw-background-color jw-reset"><div class="jw-nextup-thumbnail jw-reset"></div>' + ('<div class="jw-nextup-title jw-reset">' + t + "</div>") + "</div></div>" + ('<button class="jw-icon jw-nextup-close jw-reset" aria-label="' + i + '"></button>') + "</div>"
        }
    },
    138: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function(e) {
            var t = e.items,
                n = void 0 === t ? [] : t,
                o = n.map(function(e) {
                    return i(e.link, e.title, e.featured, e.showLogo)
                }).join("");
            // return '<div class="jw-rightclick jw-reset"><ul class="jw-reset">' + o + "</ul></div>"
        };
        var i = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                i = arguments[2],
                n = arguments[3],
                o = n ? '<span class="jw-icon jw-rightclick-logo jw-reset"></span>' : "";
            // return '<li class="jw-reset ' + (i ? "jw-featured" : "") + '">' + ('<a href="' + e + '" class="jw-reset" target="_blank">') + ("" + o) + ("" + t) + "</a></li>"
        }
    },
    139: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function(e) {
            return '<div class="jw-selection-menu-icon-container">' + ('<div class="jw-menu-selection-icon jw-reset">' + e + "</div>") + '<div class="jw-menu-selection-text jw-reset"></div></div>'
        }
    },
    140: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return '<div class="' + e + " " + t + ' jw-reset" aria-hidden="true"><div class="jw-slider-container jw-reset"><div class="jw-rail jw-reset"></div><div class="jw-buffer jw-reset"></div><div class="jw-progress jw-reset"></div><div class="jw-knob jw-reset"></div></div></div>'
        }
    },
    175: function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        var l, r, s = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            c = function w(e, t, i) {
                null === e && (e = Function.prototype);
                var n = Object.getOwnPropertyDescriptor(e, t);
                if (void 0 === n) {
                    var o = Object.getPrototypeOf(e);
                    return null === o ? void 0 : w(o, t, i)
                }
                if ("value" in n) return n.value;
                var a = n.get;
                if (void 0 !== a) return a.call(i)
            };
        l = [i(133)], r = function(e) {
            return function(e) {
                function t() {
                    return n(this, t), o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return a(t, e), s(t, [{
                    key: "buildArray",
                    value: function() {
                        var e = c(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "buildArray", this).call(this);
                        if (this.model.get("abouttext")) {
                            e.items[0].showLogo = !1, e.items.push(e.items.shift());
                            var i = {
                                title: this.model.get("abouttext"),
                                link: this.model.get("aboutlink") || e.items[0].link
                            };
                            e.items.unshift(i)
                        }
                        return e
                    }
                }]), t
            }(e)
        }.apply(t, l), !(void 0 !== r && (e.exports = r))
    },
    178: function(e, t, i) {
        t = e.exports = i(82)(), t.push([e.id, "@font-face{font-family:jw-icons;src:url(" + i(181) + ') format("woff"),url(' + i(180) + ') format("truetype")}.jw-icon{font-family:jw-icons;font-style:normal;font-weight:400;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.jw-icon-audio-tracks:before{content:"\\E600"}.jw-icon-buffer:before{content:"\\E601"}.jw-icon-airplay.jw-off:before,.jw-icon-airplay:before{content:"\\E901"}.jw-icon-cc:before{content:"\\E605"}.jw-icon-error:before{content:"\\E607"}.jw-icon-fullscreen:before{content:"\\E608"}.jw-icon-fullscreen.jw-off:before{content:"\\E613"}.jw-icon-hd:before{content:"\\E60A"}.jw-rightclick-logo:before{content:"\\E60B"}.jw-icon-next:before{content:"\\E60C"}.jw-icon-pause:before{content:"\\E60D"}.jw-icon-play:before{content:"\\E60E"}.jw-icon-replay:before{content:"\\E610"}.jw-icon-volume:before{content:"\\E612"}.jw-icon-volume.jw-off:before{content:"\\E611"}.jw-icon-close:before{content:"\\E615"}.jw-icon-rewind:before{content:"\\E900";font-size:24px}.jw-overlays{cursor:auto;pointer-events:none}.jw-controls{overflow:hidden;pointer-events:none}.jw-controls .jw-controls-right{position:absolute;top:0;right:0;left:0;bottom:2.5em}.jw-controls,.jw-overlays{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jw-flag-small-player .jw-controls{text-align:center}.jw-icon-playback:before{content:"\\E60E"}.jw-text{height:1em;font-family:Arial,Helvetica,sans-serif;font-size:.75em;font-style:normal;font-weight:400;color:#fff;text-align:center;font-variant:normal;font-stretch:normal}.jw-autostart-mute,.jw-controlbar,.jw-display-icon-container,.jw-display-icon-container .jw-icon,.jw-dock .jw-dock-button,.jw-nextup-container,.jw-overlays .jw-plugin,.jw-skip{pointer-events:all}.jw-error .jw-display-icon-container,.jwplayer .jw-display-icon-container{width:auto;height:auto;box-sizing:content-box}.jw-display{display:table;height:100%;padding:2.5em 0;position:relative;width:100%}.jw-flag-dragging .jw-display{display:none}.jw-display-container{display:table-cell;height:100%;text-align:center;vertical-align:middle}.jw-display-controls{display:inline-block}.jwplayer .jw-display-icon-container{float:left}.jw-display-icon-container{display:inline-block;margin:0 .25em}.jw-display-icon-container .jw-icon{cursor:pointer;width:75px;height:75px;line-height:75px;text-align:center}.jw-display-icon-container .jw-icon.jw-icon-rewind:before{padding:.2em .05em}.jw-display-icon-container .jw-icon:before{font-size:33px;position:relative}.jw-state-idle .jw-display-icon-container .jw-icon.jw-icon-display:before,.jw-state-paused .jw-display-icon-container .jw-icon.jw-icon-display:before{left:1px}.jw-breakpoint-0 .jw-display-icon-next,.jw-breakpoint-0 .jw-display-icon-rewind{display:none}.jw-breakpoint-0 .jw-display .jw-icon{height:44px;line-height:44px;width:44px}.jw-breakpoint-0 .jw-display .jw-icon:before{font-size:22px}.jw-breakpoint-1 .jw-display .jw-icon{height:55px;line-height:55px;width:55px}.jw-breakpoint-1 .jw-display .jw-icon:before{font-size:22px}.jw-breakpoint-1 .jw-display .jw-icon.jw-icon-rewind:before{font-size:33px}.jw-breakpoint-3 .jw-display .jw-icon{height:77px;line-height:77px;width:77px}.jw-breakpoint-3 .jw-display .jw-icon:before{font-size:38.5px}.jw-breakpoint-4 .jw-display .jw-icon,.jw-breakpoint-5 .jw-display .jw-icon,.jw-breakpoint-6 .jw-display .jw-icon,.jw-breakpoint-7 .jw-display .jw-icon{height:88px;line-height:88px;width:88px}.jw-breakpoint-4 .jw-display .jw-icon:before,.jw-breakpoint-5 .jw-display .jw-icon:before,.jw-breakpoint-6 .jw-display .jw-icon:before,.jw-breakpoint-7 .jw-display .jw-icon:before{font-size:44px}.jw-controlbar{display:table;position:absolute;left:0;bottom:0;height:2.5em;width:100%;padding:0 .5em}.jw-slider-horizontal{background-color:transparent}.jw-group{display:table-cell}.jw-controlbar-center-group{padding:0 .5em;position:relative;width:100%}.jw-controlbar-center-group .jw-slider-time,.jw-controlbar-center-group .jw-text-alt{padding:0}.jw-controlbar-center-group .jw-text-alt{display:none;position:absolute;top:-1px;bottom:0;width:100%;height:auto;line-height:2.5em;margin:.5em 0;padding-right:.5em;overflow:hidden;text-align:left;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap}.jw-controlbar-left-group,.jw-controlbar-right-group{white-space:nowrap}.jw-icon-inline,.jw-icon-tooltip,.jw-slider-horizontal,.jw-text-countdown,.jw-text-duration,.jw-text-elapsed{display:inline-block;height:2.5em;position:relative;line-height:2.5em;vertical-align:middle;cursor:pointer;padding:0 .5em}.jw-selection-menu{padding:0 .25em}.jw-icon-inline,.jw-icon-tooltip{min-width:1.5625em;text-align:center}.jw-icon-display:hover,.jw-icon-inline:hover,.jw-icon-tooltip:hover,.jw-knob:hover,.jw-option:before:hover{color:#fff}.jw-controlbar-left-group .jw-text-duration{display:none}.jw-icon-playback{min-width:2.25em}.jw-icon-volume{min-width:1.75em;text-align:left}.jw-time-tip{line-height:1em;pointer-events:none}.jw-icon-cast{display:none;margin:0;padding:0}.jw-icon-cast button{background-color:transparent;border:none;cursor:pointer;font-size:inherit;width:2.25em}.jw-breakpoint-0 .jw-controlbar .jw-text-duration,.jw-breakpoint-0 .jw-controlbar .jw-text-elapsed,.jw-breakpoint-1:not(.jw-flag-time-slider-above) .jw-controlbar .jw-text-duration,.jw-breakpoint-1:not(.jw-flag-time-slider-above) .jw-controlbar .jw-text-elapsed,.jw-flag-small-player:not(.jw-flag-audio-player) .jw-group>.jw-icon-next,.jw-flag-small-player:not(.jw-flag-audio-player) .jw-group>.jw-icon-playback,.jw-flag-small-player:not(.jw-flag-audio-player) .jw-group>.jw-icon-rewind,.jw-icon-inline.jw-icon-volume,.jw-slider-volume.jw-slider-horizontal,.jwplayer .jw-text-countdown{display:none}.jw-flag-ads-vpaid:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar,.jw-flag-autostart:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar,.jw-flag-user-inactive.jw-state-buffering:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar,.jw-flag-user-inactive.jw-state-playing:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar{visibility:hidden;pointer-events:none;opacity:0}.jw-dock{clear:right;margin:.75em;display:block;opacity:1}.jw-dock:after{content:"";clear:both;display:block}.jw-dock-button{cursor:pointer;float:right;height:2.5em;margin:.5em;position:relative;width:2.5em}.jw-dock-button .jw-arrow{bottom:-.2em;width:.5em;height:.2em;left:50%;margin-left:-.25em}.jw-dock-button .jw-arrow,.jw-dock-button .jw-overlay{visibility:hidden;opacity:0;pointer-events:none;position:absolute}.jw-dock-button .jw-overlay{top:2.5em;right:0;margin-top:.25em;padding:.5em;white-space:nowrap}.jw-dock-button:hover .jw-arrow,.jw-dock-button:hover .jw-overlay{visibility:visible;opacity:1}.jw-dock-image{width:100%;height:100%;background-position:50% 50%;background-repeat:no-repeat;opacity:.75}.jw-flag-small-player .jw-dock{margin:0}.jw-flag-small-player .jw-dock-button{margin:1px;height:44px;width:44px}.jw-breakpoint-1 .jw-dock{padding:0 1%}.jw-breakpoint-1 .jw-dock-button{margin:2% 1%}.jw-slider-container{height:1em;width:100%;position:relative;-ms-touch-action:none;touch-action:none}.jw-buffer,.jw-progress,.jw-rail{position:absolute;cursor:pointer}.jw-progress{background-color:#fff}.jw-rail{background-color:hsla(0,0%,100%,.2)}.jw-buffer{background-color:hsla(0,0%,100%,.3)}.jw-cue{cursor:pointer;height:.3em;background-color:rgba(33,33,33,.9);border-radius:25%;width:.5em}.jw-cue,.jw-knob{position:absolute}.jw-knob{pointer-events:none;width:.6em;height:.6em;border-radius:.3em}.jw-slider-horizontal{height:.3em;padding:0}.jw-slider-horizontal.jw-slider-volume{width:4em;margin:0 .5em}.jw-slider-horizontal .jw-rail{width:100%}.jw-slider-horizontal .jw-knob{top:-.15em;margin-left:-.3em}.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-rail{height:.3em}.jw-slider-vertical{padding:.66666667em 1em;position:absolute}.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-rail{bottom:0;height:100%;left:0;right:0;margin:0 auto}.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-slider-container{width:.3em}.jw-slider-vertical .jw-slider-container{height:4em}.jw-slider-vertical .jw-knob{right:0;left:-.15em;margin-bottom:-.3em}.jw-slider-time{width:100%}.jw-tooltip-time{position:absolute}.jw-slider-volume .jw-buffer{display:none}.jwplayer .jw-rightclick{display:none;position:absolute;white-space:nowrap}.jwplayer .jw-rightclick.jw-open{display:block}.jwplayer .jw-rightclick ul{list-style:none;font-weight:700;border-radius:.15em;margin:0;border:1px solid #444;padding:0}.jwplayer .jw-rightclick ul li{background-color:#000;border-bottom:1px solid #444;margin:0}.jwplayer .jw-rightclick ul li .jw-rightclick-logo{font-size:2em;color:#ff0147;vertical-align:middle;padding-right:.3em;margin-right:.3em;border-right:1px solid #444}.jwplayer .jw-rightclick ul li a{color:#fff;text-decoration:none;padding:1em;display:block;font-size:.6875em;line-height:1em;border:0}.jwplayer .jw-rightclick ul li:last-child{border-bottom:none}.jwplayer .jw-rightclick ul li:hover{background-color:#1a1a1a;cursor:pointer}.jwplayer .jw-rightclick ul .jw-featured{background-color:#252525;vertical-align:middle}.jwplayer .jw-rightclick ul .jw-featured a{color:#777}.jw-icon-tooltip.jw-open .jw-overlay{opacity:1;visibility:visible}.jw-overlay:before{position:absolute;top:0;bottom:0;left:-50%;width:100%;background-color:transparent;content:" "}.jw-slider-time .jw-overlay:before{height:1em;top:auto}.jw-time-tip,.jw-volume-tip,.jwplayer .jw-menu{position:relative;left:-50%;margin:0}.jw-volume-tip{width:100%;height:100%;display:block}.jw-time-tip{text-align:center;font-family:inherit;bottom:1.25em;padding:.5em;border-radius:.3em}.jw-time-tip .jw-text{color:#fff;line-height:1em}.jw-controlbar .jw-overlay{margin:0;position:absolute;bottom:2.5em;left:50%;opacity:0;visibility:hidden}.jw-controlbar .jw-overlay .jw-contents{position:relative}.jw-controlbar .jw-option{position:relative;white-space:nowrap;cursor:pointer;list-style:none;height:1.5em;font-family:inherit;line-height:1.5em;padding:0 .5em;font-size:.8em;margin:0}.jw-controlbar .jw-option:before{padding-right:.125em}.jw-selection-menu{display:inline-block;width:2.5em;height:2.5em}.jw-selection-menu .jw-selection-menu-icon-container{pointer-events:none;height:inherit}.jw-selection-menu .jw-menu-selection-text{vertical-align:baseline;font-size:.75em;height:100%;line-height:3.335em;text-align:center}.jw-selection-menu .jw-menu-selection-icon{height:100%}.jw-selection-menu .jw-menu-selection-icon svg{height:100%;width:100%}.jw-skip{cursor:default;position:absolute;float:right;display:inline-block;right:.75em;bottom:3em;padding:.5em}.jw-skip.jw-skippable{cursor:pointer}.jw-skip .jw-skip-icon{display:none;margin-left:-.75em}.jw-skip .jw-skip-icon:before{content:"\\E60C"}.jw-skip .jw-skip-icon,.jw-skip .jw-text{color:hsla(0,0%,100%,.6);vertical-align:middle;line-height:1.5em;font-size:.7em}.jw-skip.jw-skippable:hover{cursor:pointer}.jw-skip.jw-skippable:hover .jw-skip-icon,.jw-skip.jw-skippable:hover .jw-text{color:#fff}.jw-skip.jw-skippable .jw-skip-icon{display:inline;margin:0}.jw-cast{background-size:cover;display:none;height:100%;position:relative;width:100%}.jw-cast-container{background:-webkit-linear-gradient(top,rgba(25,25,25,.75),rgba(25,25,25,.25),rgba(25,25,25,0));background:linear-gradient(180deg,rgba(25,25,25,.75),rgba(25,25,25,.25),rgba(25,25,25,0));left:0;padding:20px 20px 80px;position:absolute;top:0;width:100%}.jw-cast-text{color:#fff;font-size:1.6em}.jw-breakpoint-0 .jw-cast-text{font-size:1.15em}.jw-breakpoint-1 .jw-cast-text,.jw-breakpoint-2 .jw-cast-text,.jw-breakpoint-3 .jw-cast-text{font-size:1.3em}.jw-nextup-container{background-color:transparent;bottom:2.5em;cursor:pointer;left:0;margin:0 auto;opacity:0;padding:5px .5em;position:absolute;right:0;text-align:right;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);-webkit-transition:all .15s ease;transition:all .15s ease;visibility:hidden;width:100%;pointer-events:none}.jw-flag-small-player .jw-nextup-container{display:none}.jw-nextup-container-visible{opacity:1;-webkit-transform:translateY(5px);-ms-transform:translateY(5px);transform:translateY(5px);visibility:visible}.jw-nextup{border-radius:0;display:inline-block;overflow:hidden;position:relative;max-width:300px;width:100%;pointer-events:all}.jw-nextup-header{background:rgba(33,33,33,.8);box-sizing:border-box;color:#fff;font-size:12px;font-weight:700;line-height:normal;padding:8px}.jw-nextup-body{background:rgba(0,0,0,.8);color:#fff;overflow:hidden}.jw-nextup-thumbnail{background-position:50%;background-size:cover;display:none;float:left;height:60px;width:45%}.jw-nextup-thumbnail-visible{display:block}.jw-nextup-title{box-sizing:border-box;float:left;font-size:12px;font-weight:700;line-height:1.3;overflow:hidden;padding:5px 6px;position:relative;text-overflow:ellipsis;white-space:nowrap;width:100%}.jw-nextup-thumbnail-visible+.jw-nextup-title{height:60px;white-space:normal;width:55%}.jw-nextup-thumbnail-visible+.jw-nextup-title:after{background:-webkit-linear-gradient(top,transparent,#000);background:linear-gradient(-180deg,transparent,#000);bottom:0;content:"";height:30px;left:0;position:absolute;width:100%}.jw-nextup-close{border:none;color:hsla(0,0%,100%,.6);font-size:13px;opacity:0;position:absolute;right:5px;top:6px;-webkit-transition:color .15s ease,opacity .15s ease,visibility .15s ease;transition:color .15s ease,opacity .15s ease,visibility .15s ease;visibility:hidden}.jw-nextup-close:before{content:"\\E615"}.jw-nextup-close:active,.jw-nextup-close:hover{color:#fff}.jw-nextup-sticky .jw-nextup-close{opacity:1;visibility:visible}.jw-autostart-mute{min-width:1.75em;text-align:left;position:absolute;bottom:.5em;right:.5em;height:44px;width:44px;text-align:center}.jw-autostart-mute:before{content:"\\E612"}.jw-autostart-mute.jw-off:before{content:"\\E611"}.jw-autostart-mute:before{background-color:rgba(33,33,33,.8);padding:5px 4px 5px 6px}.jwplayer.jw-flag-autostart:not(.jw-flag-media-audio) .jw-nextup,.jwplayer.jw-flag-autostart:not(.jw-flag-media-audio):not(.jw-state-buffering):not(.jw-state-error):not(.jw-state-complete) .jw-display{display:none}.jw-state-setup .jw-controls{visibility:hidden}.jw-state-idle:not(.jw-flag-cast-available) .jw-display{padding:0}.jwplayer.jw-state-buffering .jw-display-icon-display .jw-icon{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.jwplayer.jw-state-buffering .jw-display-icon-display .jw-icon:before{content:"\\E601"}@-webkit-keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.jwplayer.jw-state-buffering .jw-icon-playback:before,.jwplayer.jw-state-playing .jw-display .jw-icon-display:before,.jwplayer.jw-state-playing .jw-icon-playback:before{content:"\\E60D"}.jwplayer.jw-state-paused .jw-autostart-mute{display:none}.jwplayer.jw-state-complete .jw-display .jw-icon-display:before{content:"\\E610"}.jwplayer.jw-state-complete .jw-display .jw-text{display:none}.jw-state-idle .jw-icon-display:before,.jwplayer.jw-state-complete .jw-icon-playback:before,.jwplayer.jw-state-paused .jw-icon-display:before,.jwplayer.jw-state-paused .jw-icon-playback:before{content:"\\E60E"}.jw-state-idle .jw-display-icon-next,.jw-state-idle .jw-display-icon-rewind,.jwplayer.jw-state-buffering .jw-display-icon-next,.jwplayer.jw-state-buffering .jw-display-icon-rewind,.jwplayer.jw-state-complete .jw-display-icon-next,.jwplayer.jw-state-complete .jw-display-icon-rewind,body .jw-error .jw-display-icon-next,body .jw-error .jw-display-icon-rewind,body .jwplayer.jw-state-error .jw-display-icon-next,body .jwplayer.jw-state-error .jw-display-icon-rewind{display:none}body .jw-error .jw-icon-display,body .jwplayer.jw-state-error .jw-icon-display{cursor:default}body .jw-error .jw-icon-display:before,body .jwplayer.jw-state-error .jw-icon-display:before{content:"\\E607"}body .jw-error .jw-icon-container{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-preview{display:none}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-title{padding-top:4px}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-title-primary{width:auto;display:inline-block;padding-right:0}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-title-secondary{width:auto;display:inline-block;padding-left:0}.jwplayer.jw-state-idle:not(.jw-flag-audio-player):not(.jw-flag-casting):not(.jw-flag-cast-available) .jw-controlbar,body .jwplayer.jw-state-error .jw-controlbar{display:none}.jwplayer.jw-state-playing.jw-flag-user-inactive .jw-display{visibility:hidden;pointer-events:none;opacity:0}.jwplayer.jw-state-buffering .jw-display-icon-display .jw-text,.jwplayer.jw-state-complete .jw-display .jw-text,.jwplayer.jw-state-paused:not(.jw-flag-touch):not(.jw-flag-small-player):not(.jw-flag-casting) .jw-display,.jwplayer.jw-state-playing:not(.jw-flag-touch):not(.jw-flag-small-player):not(.jw-flag-casting) .jw-display{display:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima) .jw-controlbar{display:table}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jw-flag-small-player .jw-display{padding-top:44px;padding-bottom:66px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jw-state-error .jw-display,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jw-state-idle:not(.jw-flag-cast-available) .jw-display{padding:0}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-controlbar{background:-webkit-linear-gradient(top,transparent,rgba(0,0,0,.25) 30%,rgba(0,0,0,.4) 70%,rgba(0,0,0,.5));background:linear-gradient(180deg,transparent,rgba(0,0,0,.25) 30%,rgba(0,0,0,.4) 70%,rgba(0,0,0,.5));border:none;border-radius:0;background-size:auto;height:44px;width:100%;padding:0 10px;box-shadow:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-controlbar .jw-overlay{bottom:44px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-controlbar .jw-overlay:after{content:"";display:block;height:22px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-state-idle:not(.jw-flag-cast-available) .jw-controls,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-state-playing.jw-flag-user-inactive:not(.jw-flag-casting) .jw-controls{background:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads) .jw-controlbar,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-live) .jw-controlbar{height:66px;padding:22px 0 0}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-group>.jw-icon,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-group>.jw-text{height:44px;line-height:40px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-group>.jw-icon{font-size:20px;padding:0 8px;max-width:44px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-group>.jw-icon:before{background-color:transparent;background:none;background-size:auto;border:none;border-radius:0;box-shadow:none;height:auto;padding:0}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-group .jw-icon-cast button{font-size:inherit;height:36px;margin-bottom:.5em;width:44px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live) .jw-controlbar-center-group{height:22px;left:0;padding:0 15px;position:absolute;right:0;top:0;width:100%}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live) .jw-controlbar-center-group .jw-slider-horizontal .jw-knob{border-radius:100%;height:16px;margin-left:-8px;margin-top:-8px;width:16px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live) .jw-controlbar-left-group{padding-left:0}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live) .jw-controlbar-left-group .jw-text-countdown,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live) .jw-controlbar-left-group .jw-text-elapsed{padding:0 .5em}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live) .jw-controlbar-left-group .jw-text-duration{padding:0 .5em 0 0}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-breakpoint-0 .jw-text-countdown{display:inline-block}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-flag-small-player .jw-text-countdown,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-flag-small-player .jw-text-elapsed{padding-left:15px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-breakpoint-0) .jw-text-duration{display:inline-block}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer:not(.jw-breakpoint-0) .jw-text-duration:before{content:"/";display:inline-block;padding-right:.5em}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-controlbar-right-group{padding-right:6px;text-align:right}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-controlbar-right-group .jw-text-duration{display:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-volume.jw-slider-vertical{padding:.5em}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-volume.jw-slider-horizontal{margin-bottom:2px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-small-player .jw-controlbar .jw-slider-volume.jw-slider-horizontal{display:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time{background:none;background-color:transparent;height:22px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-slider-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:22px;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-cue{top:auto}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-buffer,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-knob,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-progress,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-rail{border:none;box-shadow:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-buffer,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-progress,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-rail{height:2px;margin:auto;top:0;bottom:0}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-rail{background-color:hsla(0,0%,100%,.25)}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-buffer{background-color:hsla(0,0%,100%,.5)}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-slider-time .jw-knob{background:none;background-color:#fff;border-radius:100%;box-shadow:0 0 1px 1px rgba(0,0,0,.1);opacity:1;height:16px;margin-left:-8px;margin-top:-8px;top:50%;width:16px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-tooltip-time{bottom:0;height:auto;line-height:normal;padding:0;pointer-events:none;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%)}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-tooltip-time .jw-overlay{bottom:22px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-tooltip-time .jw-overlay:after{content:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-tooltip-time .jw-time-tip{bottom:0;border-radius:.3em}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-controlbar,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-controlbar{padding-right:5px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-controlbar-center-group,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-controlbar-center-group{height:auto}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-group>.jw-text-alt,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-group>.jw-text-alt{display:inline-block;margin:0;line-height:44px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads.jw-ie .jw-text-alt,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live.jw-ie .jw-text-alt{top:-1px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-controlbar .jw-overlay:after,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-text-duration,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-controlbar .jw-overlay:after,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-text-duration{display:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-nextup-container,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-nextup-container{bottom:44px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-controlbar{padding-left:10px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-text-duration,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-live .jw-text-elapsed{display:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-controlbar{pointer-events:none}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-icon,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-slider-horizontal{pointer-events:all}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads .jw-controlbar-left-group{display:table-cell}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer.jw-flag-ads.jw-flag-small-player .jw-group .jw-icon-playback{display:inline-block}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-plugin{bottom:66px}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-captions,.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer video::-webkit-media-text-track-container{max-height:calc(100% - 64px)}.jw-flag-time-slider-above:not(.jw-flag-ads-googleima).jwplayer .jw-nextup-container{bottom:66px;padding:5px 20px}.jwplayer.jw-flag-casting .jw-cast{display:block}.jwplayer.jw-flag-casting .jw-captions,.jwplayer.jw-flag-casting.jw-flag-airplay-casting .jw-display-icon-container,.jwplayer.jw-flag-casting.jw-flag-airplay-casting .jw-icon-volume,.jwplayer.jw-flag-casting .jw-icon-audio-tracks,.jwplayer.jw-flag-casting .jw-icon-fullscreen,.jwplayer.jw-flag-casting .jw-icon-hd{display:none}.jwplayer.jw-flag-casting.jw-flag-airplay-casting .jw-icon-airplay{color:#fff}.jwplayer.jw-flag-casting .jw-sharing-dock-btn{display:none}.jwplayer.jw-state-paused.jw-flag-casting .jw-display,.jwplayer.jw-state-playing.jw-flag-casting .jw-display{display:table}.jwplayer.jw-flag-cast-available .jw-icon-airplay,.jwplayer.jw-flag-cast-available .jw-icon-cast{display:inline-block}.jwplayer.jw-flag-live .jw-controlbar .jw-slider-time,.jwplayer.jw-flag-live .jw-controlbar .jw-text-countdown,.jwplayer.jw-flag-live .jw-controlbar .jw-text-duration,.jwplayer.jw-flag-live .jw-controlbar .jw-text-elapsed,.jwplayer.jw-flag-live .jw-display-icon-rewind{display:none}.jwplayer.jw-flag-live .jw-controlbar .jw-text-alt{display:inline-block}.jwplayer.jw-flag-live.jw-ie .jw-controlbar-center-group{overflow:hidden}.jwplayer.jw-flag-live.jw-ie .jw-controlbar-center-group .jw-text-alt{display:table}.jwplayer.jw-flag-controls-hidden .jw-dock,.jwplayer.jw-flag-controls-hidden .jw-logo.jw-hide{visibility:hidden;pointer-events:none;opacity:0}.jwplayer.jw-flag-controls-hidden:not(.jw-flag-casting) .jw-logo-top-right{top:0}.jwplayer.jw-flag-controls-hidden .jw-nextup-container,.jwplayer.jw-flag-controls-hidden .jw-plugin{bottom:.5em}.jw-flag-controls-hidden .jw-controlbar,.jw-flag-controls-hidden .jw-display{visibility:hidden;pointer-events:none;opacity:0}.jw-flag-controls-hidden .jw-logo{visibility:visible}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-dock,.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-logo.jw-hide{visibility:hidden;pointer-events:none;opacity:0}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing:not(.jw-flag-casting) .jw-logo-top-right{top:0}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-nextup-container,.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-plugin{bottom:.5em}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-captions{max-height:none}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing video::-webkit-media-text-track-container{max-height:none}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-media{cursor:none;-webkit-cursor-visibility:auto-hide}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-casting .jw-display{display:table}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-casting .jw-dock{display:block}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-flag-casting .jw-nextup-container{bottom:2.5em}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-flag-casting.jw-flag-time-slider-above .jw-nextup-container{bottom:66px}.jwplayer.jw-flag-media-audio .jw-autostart-mute,.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-flag-casting.jw-state-idle .jw-nextup-container{display:none}.jw-flag-media-audio .jw-preview{display:block}.jwplayer.jw-flag-ads .jw-autostart-mute,.jwplayer.jw-flag-ads .jw-captions.jw-captions-enabled,.jwplayer.jw-flag-ads .jw-dock,.jwplayer.jw-flag-ads .jw-logo,.jwplayer.jw-flag-ads .jw-nextup-container,.jwplayer.jw-flag-ads .jw-preview{display:none}.jwplayer.jw-flag-ads video::-webkit-media-text-track-container{display:none}.jwplayer.jw-flag-ads.jw-flag-small-player .jw-display-icon-display,.jwplayer.jw-flag-ads.jw-flag-small-player .jw-display-icon-next,.jwplayer.jw-flag-ads.jw-flag-small-player .jw-display-icon-rewind{display:none}.jwplayer.jw-flag-ads.jw-flag-small-player.jw-state-buffering .jw-display-icon-display{display:inline-block}.jwplayer.jw-flag-ads.jw-flag-small-player .jw-controlbar-center-group{padding:0}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-cast,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-horizontal,.jwplayer.jw-flag-ads .jw-controlbar .jw-text{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-fullscreen,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline.jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-playback,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jwplayer.jw-flag-ads .jw-controlbar .jw-text-alt{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-ads.jw-ie .jw-controlbar-center-group{overflow:hidden}.jwplayer.jw-flag-ads.jw-ie .jw-controlbar-center-group .jw-text-alt{display:table}.jwplayer.jw-flag-ads.jw-flag-ads.jw-flag-touch:not(.jw-flag-ads-vpaid) .jw-controls .jw-controlbar,.jwplayer.jw-flag-ads.jw-flag-ads.jw-flag-touch:not(.jw-flag-ads-vpaid).jw-flag-autostart .jw-controls .jw-controlbar{display:table;pointer-events:all;visibility:visible;opacity:1}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-controlbar{font-size:1em}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-display-icon-display,.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-display-icon-display .jw-icon-display{pointer-events:none}.jwplayer.jw-flag-ads-googleima.jw-skin-seven .jw-controlbar{font-size:.9em}.jwplayer.jw-flag-ads-vpaid .jw-display-container,.jwplayer.jw-flag-ads-vpaid .jw-skip,.jwplayer.jw-flag-touch.jw-flag-ads-vpaid .jw-display-container,.jwplayer.jw-flag-touch.jw-flag-ads-vpaid .jw-skip{display:none}.jwplayer.jw-flag-ads-vpaid.jw-flag-small-player .jw-controls{background:none}.jwplayer.jw-flag-ads-hide-controls .jw-controls{display:none!important}.jw-flag-overlay-open-related .jw-controls,.jw-flag-overlay-open-related .jw-title,.jw-flag-overlay-open-sharing.jw-flag-small-player .jw-controls,.jw-flag-overlay-open-sharing.jw-flag-small-player .jw-title,.jw-flag-overlay-open-sharing:not(.jw-flag-small-player) .jw-logo-top-right{display:none}.jwplayer.jw-flag-rightclick-open{overflow:visible}.jwplayer.jw-flag-rightclick-open .jw-rightclick{z-index:16777215}body .jwplayer.jw-flag-flash-blocked .jw-controls,body .jwplayer.jw-flag-flash-blocked .jw-overlays,body .jwplayer.jw-flag-flash-blocked .jw-preview{display:none}.jw-flag-touch.jw-breakpoint-4 .jw-controlbar,.jw-flag-touch.jw-breakpoint-4 .jw-plugin,.jw-flag-touch.jw-breakpoint-4 .jw-skip,.jw-flag-touch.jw-breakpoint-5 .jw-controlbar,.jw-flag-touch.jw-breakpoint-5 .jw-plugin,.jw-flag-touch.jw-breakpoint-5 .jw-skip,.jw-flag-touch.jw-breakpoint-6 .jw-controlbar,.jw-flag-touch.jw-breakpoint-6 .jw-plugin,.jw-flag-touch.jw-breakpoint-6 .jw-skip,.jw-flag-touch.jw-breakpoint-7 .jw-controlbar,.jw-flag-touch.jw-breakpoint-7 .jw-plugin,.jw-flag-touch.jw-breakpoint-7 .jw-skip{font-size:1.5em}.jw-flag-touch.jw-breakpoint-4 .jw-captions,.jw-flag-touch.jw-breakpoint-4 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-5 .jw-captions,.jw-flag-touch.jw-breakpoint-5 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-6 .jw-captions,.jw-flag-touch.jw-breakpoint-6 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-7 .jw-captions,.jw-flag-touch.jw-breakpoint-7 .jw-nextup-container{bottom:4.25em}.jw-flag-touch.jw-breakpoint-4 video::-webkit-media-text-track-container,.jw-flag-touch.jw-breakpoint-5 video::-webkit-media-text-track-container,.jw-flag-touch.jw-breakpoint-6 video::-webkit-media-text-track-container,.jw-flag-touch.jw-breakpoint-7 video::-webkit-media-text-track-container{max-height:calc(100% - 60px)}.jw-flag-touch .jw-controlbar .jw-icon-volume{display:inline-block}.jw-flag-touch .jw-display,.jw-flag-touch .jw-display-container,.jw-flag-touch .jw-display-controls{pointer-events:none}.jw-flag-touch.jw-state-paused.jw-flag-dragging .jw-display,.jw-flag-touch.jw-state-paused:not(.jw-breakpoint-1) .jw-display-icon-next,.jw-flag-touch.jw-state-paused:not(.jw-breakpoint-1) .jw-display-icon-rewind,.jw-flag-touch.jw-state-playing:not(.jw-breakpoint-1) .jw-display-icon-next,.jw-flag-touch.jw-state-playing:not(.jw-breakpoint-1) .jw-display-icon-rewind{display:none}.jw-flag-audio-player{background-color:transparent}.jw-flag-audio-player:not(.jw-flag-flash-blocked) .jw-media{visibility:hidden}.jw-flag-audio-player .jw-title{background:none}.jw-flag-audio-player object{min-height:45px}.jw-flag-audio-player .jw-display,.jw-flag-audio-player .jw-dock,.jw-flag-audio-player .jw-nextup-container,.jw-flag-audio-player .jw-preview,.jw-flag-audio-player .jw-title{display:none}.jw-flag-audio-player .jw-controlbar{vertical-align:middle;display:table;height:100%;left:0;bottom:0;margin:0;width:100%;min-width:100%}.jw-flag-audio-player .jw-controlbar .jw-icon-fullscreen,.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip{display:none}.jw-flag-audio-player .jw-controlbar .jw-icon-inline.jw-icon-volume,.jw-flag-audio-player .jw-controlbar .jw-slider-volume.jw-slider-horizontal{display:inline-block}.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jw-flag-audio-player .jw-icon-inline{height:auto;line-height:normal}.jw-flag-audio-player .jw-group{vertical-align:middle}.jw-flag-audio-player .jw-controlbar-center-group{padding-bottom:2px}.jw-flag-audio-player.jw-flag-small-player .jw-text-duration,.jw-flag-audio-player.jw-flag-small-player .jw-text-elapsed,.jw-hidden{display:none}.jw-controls-right,.jw-display,.jw-dock,.jw-overlay,.jw-plugin-sharing{-webkit-transition:opacity .3s ease,visibility .3s ease;transition:opacity .3s ease,visibility .3s ease}.jw-background-color{-webkit-transition:background-color .3s ease,opacity .3s ease,visibility .3s ease;transition:background-color .3s ease,opacity .3s ease,visibility .3s ease}.jw-button-color{-webkit-transition:color .3s ease,fill .3s ease;transition:color .3s ease,fill .3s ease}.jw-knob{-webkit-transition:opacity .15s ease;transition:opacity .15s ease}.jw-skin-seven .jw-display-icon-container{border-radius:3.5em}.jw-skin-seven .jw-display-icon-container>.jw-icon{color:hsla(0,0%,100%,.9)}.jw-skin-seven.jw-breakpoint-2 .jw-display .jw-icon{width:66px;height:66px;line-height:66px}.jw-skin-seven .jw-dock-button{border-radius:2.5em}.jw-skin-seven .jw-dock-button:hover{background:rgba(33,33,33,.8)}.jw-skin-seven .jw-menu{padding:0}.jw-skin-seven .jw-dock .jw-overlay,.jw-skin-seven .jw-skip{border-radius:.5em}.jw-skin-seven .jw-text{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.jw-skin-seven .jw-slider-container .jw-knob{opacity:0}.jw-skin-seven.jw-flag-touch .jw-knob,.jw-skin-seven .jw-slider-container:hover .jw-knob{opacity:1}', ""]);
    },
    180: function(e, t, i) {
        e.exports = i.p + "jw-icons.ttf"
    },
    181: function(e, t, i) {
        e.exports = i.p + "jw-icons.woff"
    },
    184: function(e, t, i) {
        var n = i(178);
        "string" == typeof n && (n = [
            ["all-players", n, ""]
        ]), i(49).style(n, "all-players"), n.locals && (e.exports = n.locals)
    }
});