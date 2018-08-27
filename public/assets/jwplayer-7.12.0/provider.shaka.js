webpackJsonpjwplayer([3, 13], {
    8: function(t, e, i) {
        var n, r;
        n = [i(1), i(11), i(2), i(13), i(12)], r = function(t, e, i, n, r) {
            function a(e) {
                if (this._currentTextTrackIndex = -1, e) {
                    if (this._textTracks ? (this._textTracks = t.reject(this._textTracks, function(t) {
                        if (this.renderNatively && "nativecaptions" === t._id) return delete this._tracksById[t._id], !0
                    }, this), delete this._tracksById.nativemetadata) : this._initTextTracks(), e.length) {
                        var n = 0,
                            a = e.length;
                        for (n; n < a; n++) {
                            var s = e[n];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind, !s.label && "captions" === s.kind) {
                                        var o = r.createLabel(s, this._unknownCount);
                                        s.name = o.label, this._unknownCount = o.unknownCount
                                    }
                                } else s._id = r.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id])
                                if ("metadata" === s.kind) s.mode = "hidden", s.oncuechange = P.bind(this), this._tracksById[s._id] = s;
                                else if (S(s.kind)) {
                                    var u, h = s.mode;
                                    if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                    if (s.mode = h, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                        for (var c = this._cuesByTrackId[s._id].cues; u = c.shift();) E(this.renderNatively, s, u);
                                        s.mode = h, this._cuesByTrackId[s._id].loaded = !0
                                    }
                                    x.call(this, s)
                                }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || b.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (i.isEdge() || i.isFF() || i.isSafari()) && (this.addTrackHandler = this.addTrackHandler || y.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))), this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function s(t) {
                if (this.renderNatively) {
                    var e = t === this._itemTracks;
                    e || n.cancelXhr(this._itemTracks), this._itemTracks = t, t && (e || (this.disableTextTrack(), _.call(this), this.addTextTracks(t)))
                }
            }

            function o() {
                return this._currentTextTrackIndex
            }

            function u(e) {
                return this.renderNatively ? void(this._textTracks && (0 === e && t.each(this._textTracks, function(t) {
                    t.mode = t.embedded ? "hidden" : "disabled"
                }), this._currentTextTrackIndex !== e - 1 && (this.disableTextTrack(), this._currentTextTrackIndex = e - 1, this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing"), this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                })))) : void(this.setCurrentSubtitleTrack && this.setCurrentSubtitleTrack(e - 1))
            }

            function h(t) {
                if (t.text && t.begin && t.end) {
                    var e = t.trackid.toString(),
                        i = this._tracksById && this._tracksById[e];
                    i || (i = {
                        kind: "captions",
                        _id: e,
                        data: []
                    }, this.addTextTracks([i]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var r;
                    t.useDTS && (i.source || (i.source = t.source || "mpegts")), r = t.begin + "_" + t.text;
                    var a = this._metaCuesByTextTime[r];
                    if (!a) {
                        a = {
                            begin: t.begin,
                            end: t.end,
                            text: t.text
                        }, this._metaCuesByTextTime[r] = a;
                        var s = n.convertToVTTCues([a])[0];
                        i.data.push(s)
                    }
                }
            }

            function c(t) {
                this._tracksById || this._initTextTracks();
                var e = t.track ? t.track : "native" + t.type,
                    i = this._tracksById[e],
                    n = "captions" === t.type ? "Unknown CC" : "ID3 Metadata",
                    r = t.cue;
                if (!i) {
                    var a = {
                        kind: t.type,
                        _id: e,
                        label: n,
                        embedded: !0
                    };
                    i = A.call(this, a), this.renderNatively || "metadata" === i.kind ? this.setTextTracks(this.video.textTracks) : T.call(this, [i])
                }
                C.call(this, i, r) && (this.renderNatively || "metadata" === i.kind ? E(this.renderNatively, i, r) : i.data.push(r))
            }

            function d(t) {
                var e = this._tracksById[t.name];
                if (e) {
                    e.source = t.source;
                    for (var i = t.captions || [], r = [], a = !1, s = 0; s < i.length; s++) {
                        var o = i[s],
                            u = t.name + "_" + o.begin + "_" + o.end;
                        this._metaCuesByTextTime[u] || (this._metaCuesByTextTime[u] = o, r.push(o), a = !0)
                    }
                    a && r.sort(function(t, e) {
                        return t.begin - e.begin
                    });
                    var h = n.convertToVTTCues(r);
                    Array.prototype.push.apply(e.data, h)
                }
            }

            function l(t, e, i) {
                t && (f(t, e, i), this.instreamMode || (t.addEventListener ? t.addEventListener(e, i) : t["on" + e] = i))
            }

            function f(t, e, i) {
                t && (t.removeEventListener ? t.removeEventListener(e, i) : t["on" + e] = null)
            }

            function p() {
                n.cancelXhr(this._itemTracks);
                var t = this._tracksById && this._tracksById.nativemetadata;
                (this.renderNatively || t) && (k(this.renderNatively, this.video.textTracks), t && (t.oncuechange = null)), this._itemTracks = null, this._textTracks = null, this._tracksById = null, this._cuesByTrackId = null, this._metaCuesByTextTime = null, this._unknownCount = 0, this._activeCuePosition = null, this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), k(this.renderNatively, this.video.textTracks))
            }

            function m(t) {
                this._cachedVTTCues[t] && (this._cachedVTTCues[t] = {}, this._tracksById[t].data = [])
            }

            function v() {
                if (this._textTracks) {
                    var t = this._textTracks[this._currentTextTrackIndex];
                    t && (t.mode = "disabled", (t.embedded || "nativecaptions" === t._id) && (t.mode = "hidden"))
                }
            }

            function g() {
                if (this._textTracks) {
                    var t = this._textTracks[this._currentTextTrackIndex];
                    t && (t.mode = "showing")
                }
            }

            function b() {
                var e = this.video.textTracks,
                    i = t.filter(e, function(t) {
                        return (t.inuse || !t._id) && S(t.kind)
                    });
                if (!this._textTracks || N.call(this, i)) return void this.setTextTracks(e);
                for (var n = -1, r = 0; r < this._textTracks.length; r++)
                    if ("showing" === this._textTracks[r].mode) {
                        n = r;
                        break
                    }
                n !== this._currentTextTrackIndex && this.setSubtitlesTrack(n + 1)
            }

            function y() {
                this.setTextTracks(this.video.textTracks)
            }

            function T(t) {
                if (t) {
                    this._textTracks || this._initTextTracks();
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e];
                        if (!i.kind || S(i.kind)) {
                            var r = A.call(this, i);
                            x.call(this, r), i.file && (i.data = [], n.loadFile(i, this.addVTTCuesToTrack.bind(this, r), R))
                        }
                    }
                    this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function w(t, e) {
                if (this.renderNatively) {
                    var i = this._tracksById[t._id];
                    if (!i) return this._cuesByTrackId || (this._cuesByTrackId = {}), void(this._cuesByTrackId[t._id] = {
                        cues: e,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[t._id] || !this._cuesByTrackId[t._id].loaded) {
                        var n;
                        for (this._cuesByTrackId[t._id] = {
                            cues: e,
                            loaded: !0
                        }; n = e.shift();) E(this.renderNatively, i, n)
                    }
                }
            }

            function E(t, e, n) {
                if (!i.isIE() || !t || !window.TextTrackCue) return void e.addCue(n);
                var r = new window.TextTrackCue(n.startTime, n.endTime, n.text);
                e.addCue(r)
            }

            function k(e, n) {
                n && n.length && t.each(n, function(t) {
                    if (!(i.isIE() && e && /^(native|subtitle|cc)/.test(t._id))) {
                        t.mode = "disabled", t.mode = "hidden";
                        for (var n = t.cues.length; n--;) t.removeCue(t.cues[n]);
                        t.embedded || (t.mode = "disabled"), t.inuse = !1
                    }
                })
            }

            function S(t) {
                return "subtitles" === t || "captions" === t
            }

            function I() {
                this._textTracks = [], this._tracksById = {}, this._metaCuesByTextTime = {}, this._cuesByTrackId = {}, this._cachedVTTCues = {}, this._unknownCount = 0
            }

            function A(e) {
                var i, n = r.createLabel(e, this._unknownCount),
                    a = n.label;
                if (this._unknownCount = n.unknownCount, this.renderNatively || "metadata" === e.kind) {
                    var s = this.video.textTracks;
                    i = t.findWhere(s, {
                        label: a
                    }), i ? (i.kind = e.kind, i.language = e.language || "") : i = this.video.addTextTrack(e.kind, a, e.language || ""), i["default"] = e["default"], i.mode = "disabled", i.inuse = !0
                } else i = e, i.data = i.data || [];
                return i._id || (i._id = r.createId(e, this._textTracks.length)), i
            }

            function x(t) {
                this._textTracks.push(t), this._tracksById[t._id] = t
            }

            function _() {
                if (this._textTracks) {
                    var e = t.filter(this._textTracks, function(t) {
                        return t.embedded || "subs" === t.groupid
                    });
                    this._initTextTracks(), t.each(e, function(t) {
                        this._tracksById[t._id] = t
                    }), this._textTracks = e
                }
            }

            function P(i) {
                var n = i.currentTarget.activeCues;
                if (n && n.length) {
                    var r = n[n.length - 1].startTime;
                    if (this._activeCuePosition !== r) {
                        var a = [];
                        if (t.each(n, function(t) {
                            t.startTime < r || (t.data || t.value ? a.push(t) : t.text && this.trigger("meta", {
                                metadataTime: r,
                                metadata: JSON.parse(t.text)
                            }))
                        }, this), a.length) {
                            var s = e.parseID3(a);
                            this.trigger("meta", {
                                metadataTime: r,
                                metadata: s
                            })
                        }
                        this._activeCuePosition = r
                    }
                }
            }

            function C(t, e) {
                var i = t.kind;
                this._cachedVTTCues[t._id] || (this._cachedVTTCues[t._id] = {});
                var n, r = this._cachedVTTCues[t._id];
                switch (i) {
                    case "captions":
                    case "subtitles":
                        n = Math.floor(20 * e.startTime);
                        var a = "_" + e.line,
                            s = Math.floor(20 * e.endTime),
                            o = r[n + a] || r[n + 1 + a] || r[n - 1 + a];
                        return !(o && Math.abs(o - s) <= 1) && (r[n + a] = s, !0);
                    case "metadata":
                        var u = e.data ? new Uint8Array(e.data).join("") : e.text;
                        return n = e.startTime + u, !r[n] && (r[n] = e.endTime, !0);
                    default:
                        return !1
                }
            }

            function N(t) {
                if (t.length > this._textTracks.length) return !0;
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (!i._id || !this._tracksById[i._id]) return !0
                }
                return !1
            }

            function R(t) {
                i.log("CAPTIONS(" + t + ")")
            }
            var L = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: I,
                addTracksListener: l,
                clearTracks: p,
                clearCueData: m,
                disableTextTrack: v,
                enableTextTrack: g,
                getSubtitlesTrack: o,
                removeTracksListener: f,
                addTextTracks: T,
                setTextTracks: a,
                setupSideloadedTracks: s,
                setSubtitlesTrack: u,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: d,
                addCaptionsCue: h,
                addVTTCue: c,
                addVTTCuesToTrack: w,
                renderNatively: !1
            };
            return L
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    9: function(t, e) {
        "use strict";

        function i(t) {
            return {
                bitrate: t.bitrate,
                label: t.label,
                width: t.width,
                height: t.height
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.qualityLevel = i
    },
    17: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.PLAYER = 1, e.SETUP = 2, e.MEDIA = 3, e.NETWORK = 4, e.AD = 5
    },
    18: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.BAD_HTTP_STATUS = 4001, e.CROSSDOMAIN_ERROR = 4002, e.BLOCKED_MIXED_CONTENT = 4003
    },
    19: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.RECOVERABLE = 1, e.FATAL = 2
    },
    24: function(t, e, i) {
        var n, r;
        n = [], r = function() {
            function t(t) {
                return t && t.length ? t.end(t.length - 1) : 0
            }
            return {
                endOfRange: t
            }
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    25: function(t, e, i) {
        var n, r;
        n = [i(36)], r = function(t) {
            function e() {
                return {
                    decode: function(t) {
                        if (!t) return "";
                        if ("string" != typeof t) throw new Error("Error - expected string data.");
                        return decodeURIComponent(encodeURIComponent(t))
                    }
                }
            }

            function i(t) {
                function e(t, e, i, n) {
                    return 3600 * (0 | t) + 60 * (0 | e) + (0 | i) + (0 | n) / 1e3
                }
                var i = t.match(s);
                return i ? i[3] ? e(i[1], i[2], i[3].replace(":", ""), i[4]) : i[1] > 59 ? e(i[1], i[2], 0, i[4]) : e(0, i[1], i[2], i[4]) : null
            }

            function n() {
                this.values = Object.create(null)
            }

            function r(t, e, i, n) {
                for (var r = n ? t.split(n) : [t], a = 0; a <= r.length; a += 1)
                    if ("string" == typeof r[a]) {
                        var s = r[a].split(i);
                        if (2 === s.length) {
                            var o = s[0],
                                u = s[1];
                            e(o, u)
                        }
                    }
            }

            function a(t, e, a) {
                function s() {
                    var e = i(t);
                    if (null === e) throw new Error("Malformed timestamp: " + h);
                    return t = t.replace(c, ""), e
                }

                function o(t, e) {
                    var i = new n;
                    r(t, function(t, e) {
                        switch (t) {
                            case "region":
                                for (var n = a.length - 1; n >= 0; n--)
                                    if (a[n].id === e) {
                                        i.set(t, a[n].region);
                                        break
                                    }
                                break;
                            case "vertical":
                                i.alt(t, e, ["rl", "lr"]);
                                break;
                            case "line":
                                var r = e.split(","),
                                    s = r[0];
                                i.integer(t, s), i.percent(t, s) && i.set("snapToLines", !1), i.alt(t, s, ["auto"]), 2 === r.length && i.alt("lineAlign", r[1], ["start", y, "end"]);
                                break;
                            case "position":
                                r = e.split(","), i.percent(t, r[0]), 2 === r.length && i.alt("positionAlign", r[1], ["start", y, "end", "line-left", "line-right", "auto"]);
                                break;
                            case "size":
                                i.percent(t, e);
                                break;
                            case "align":
                                i.alt(t, e, ["start", y, "end", "left", "right"])
                        }
                    }, d, l), e.region = i.get("region", null), e.vertical = i.get("vertical", "");
                    var s = i.get("line", "auto");
                    "auto" === s && b.line === -1 && (s = -1), e.line = s, e.lineAlign = i.get("lineAlign", "start"), e.snapToLines = i.get("snapToLines", !0), e.size = i.get("size", 100), e.align = i.get("align", y);
                    var o = i.get("position", "auto");
                    "auto" === o && 50 === b.position && (o = "start" === e.align || "left" === e.align ? 0 : "end" === e.align || "right" === e.align ? 100 : 50), e.position = o
                }

                function u() {
                    t = t.replace(f, "")
                }
                var h = t;
                if (u(), e.startTime = s(), u(), "-->" !== t.substr(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + h);
                t = t.substr(3), u(), e.endTime = s(), u(), o(t, e)
            }
            var s = /^(\d+):(\d{2})(:\d{2})?\.(\d{3})/,
                o = /^-?\d+$/,
                u = /\r\n|\n/,
                h = /^NOTE($|[ \t])/,
                c = /^[^\sa-zA-Z-]+/,
                d = /:/,
                l = /\s/,
                f = /^\s+/,
                p = /-->/,
                m = /^WEBVTT([ \t].*)?$/,
                v = window.requestAnimationFrame || function(t) {
                    return window.setTimeout(t, 17)
                },
                g = function(t, i) {
                    this.window = t, this.state = "INITIAL", this.buffer = "", this.decoder = i || new e, this.regionList = [], this.maxCueBatch = 1e3
                };
            n.prototype = {
                set: function(t, e) {
                    this.get(t) || "" === e || (this.values[t] = e)
                },
                get: function(t, e, i) {
                    return i ? this.has(t) ? this.values[t] : e[i] : this.has(t) ? this.values[t] : e
                },
                has: function(t) {
                    return t in this.values
                },
                alt: function(t, e, i) {
                    for (var n = 0; n < i.length; ++n)
                        if (e === i[n]) {
                            this.set(t, e);
                            break
                        }
                },
                integer: function(t, e) {
                    o.test(e) && this.set(t, parseInt(e, 10))
                },
                percent: function(t, e) {
                    return e = parseFloat(e), e >= 0 && e <= 100 && (this.set(t, e), !0)
                }
            };
            var b = new t(0, 0, 0),
                y = "middle" === b.align ? "middle" : "center";
            return g.prototype = {
                parse: function(e, i) {
                    function n() {
                        for (var t = l.buffer, e = 0; e < t.length && "\r" !== t[e] && "\n" !== t[e];) ++e;
                        var i = t.substr(0, e);
                        return "\r" === t[e] && ++e, "\n" === t[e] && ++e, l.buffer = t.substr(e), i
                    }

                    function s(t) {
                        r(t, function(t, e) {
                            switch (t) {
                                case "Region":
                                    console.log("parse region", e)
                            }
                        }, d)
                    }

                    function o() {
                        "CUETEXT" === l.state && l.cue && l.oncue && l.oncue(l.cue), l.cue = null, l.state = "INITIAL" === l.state ? "BADWEBVTT" : "BADCUE"
                    }

                    function c() {
                        try {
                            for (; l.buffer && T <= l.maxCueBatch;) {
                                if (!u.test(l.buffer)) return l.flush(), this;
                                switch (y ? y = !1 : f = n(), l.state) {
                                    case "HEADER":
                                        d.test(f) ? s(f) : f || (l.state = "ID");
                                        break;
                                    case "NOTE":
                                        f || (l.state = "ID");
                                        break;
                                    case "ID":
                                        if (h.test(f)) {
                                            l.state = "NOTE";
                                            break
                                        }
                                        if (!f) break;
                                        if (l.cue = new t(0, 0, ""), l.state = "CUE", !p.test(f)) {
                                            l.cue.id = f;
                                            break
                                        }
                                    case "CUE":
                                        try {
                                            a(f, l.cue, l.regionList)
                                        } catch (e) {
                                            l.cue = null, l.state = "BADCUE";
                                            break
                                        }
                                        l.state = "CUETEXT";
                                        break;
                                    case "CUETEXT":
                                        var r = p.test(f);
                                        if (!f || r && (y = !0)) {
                                            l.oncue && (T += 1, l.oncue(l.cue)), l.cue = null, l.state = "ID";
                                            break
                                        }
                                        l.cue.text && (l.cue.text += "\n"), l.cue.text += f;
                                        break;
                                    case "BADCUE":
                                        f || (l.state = "ID")
                                }
                            }
                            if (T = 0, l.buffer) v(c);
                            else if (!i) return l.flush(), this
                        } catch (e) {
                            return o(e), this
                        }
                    }
                    var l = this;
                    e && (l.buffer += l.decoder.decode(e, {
                        stream: !0
                    }));
                    try {
                        var f;
                        if ("INITIAL" === l.state) {
                            if (!u.test(l.buffer)) return this;
                            f = n();
                            var g = f.match(m);
                            if (!g || !g[0]) throw new Error("Malformed WebVTT signature.");
                            l.state = "HEADER"
                        }
                    } catch (b) {
                        return o(), this
                    }
                    var y = !1,
                        T = 0;
                    c()
                },
                flush: function() {
                    var t = this;
                    try {
                        if (t.buffer += t.decoder.decode(), (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse(void 0, !0)), "INITIAL" === t.state) throw new Error("Malformed WebVTT signature.")
                    } catch (e) {
                        throw e
                    }
                    return t.onflush && t.onflush(), this
                }
            }, g
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    30: function(t, e, i) {
        "use strict";

        function n(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e["default"] = t, e
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Severity = e.Code = e.Category = e.NetworkError = void 0;
        var r = i(32);
        Object.defineProperty(e, "NetworkError", {
            enumerable: !0,
            get: function() {
                return r.NetworkError
            }
        });
        var a = i(17),
            s = n(a),
            o = i(18),
            u = n(o),
            h = i(19),
            c = n(h);
        e.Category = s, e.Code = u, e.Severity = c
    },
    31: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.JWError = function(t, e, i, n) {
            return {
                category: t,
                code: e,
                severity: i,
                message: n
            }
        }
    },
    32: function(t, e, i) {
        "use strict";

        function n(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e["default"] = t, e
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.badStatusMessage = e.networkErrorMessage = e.networkErrorCode = e.NetworkError = void 0;
        var r = i(17),
            a = n(r),
            s = i(18),
            o = n(s),
            u = i(19),
            h = n(u),
            c = i(31),
            d = (e.NetworkError = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    n = d(t, e);
                return (0, c.JWError)(a.NETWORK, n, h.FATAL, l(n, t, i))
            }, e.networkErrorCode = function(t, e) {
                var i = void 0;
                return i = t > 0 ? o.BAD_HTTP_STATUS : e && "http:" === e.substring(0, 5) && "https:" === document.location.protocol ? o.BLOCKED_MIXED_CONTENT : o.CROSSDOMAIN_ERROR
            }),
            l = e.networkErrorMessage = function(t, e, i) {
                var n = "";
                switch (t) {
                    case o.BAD_HTTP_STATUS:
                        n = f(e, i);
                        break;
                    case o.CROSSDOMAIN_ERROR:
                        n = "Crossdomain access denied";
                        break;
                    case o.BLOCKED_MIXED_CONTENT:
                        n = "Unable to fetch HTTP resource over HTTPS";
                        break;
                    default:
                        n = "Unknown Network Error"
                }
                return n
            },
            f = e.badStatusMessage = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    i = "";
                switch (t) {
                    case 403:
                        i = "You do not have permission to access this content";
                        break;
                    case 404:
                        i = "404 Not Found";
                        break;
                    default:
                        i = t + " " + e
                }
                return i
            }
    },
    46: function(t, e, i) {
        var n, r;
        n = [i(2)], r = function(t) {
            return {
                container: null,
                volume: function(e) {
                    e = t.between(e / 100, 0, 1), this.video.volume = e
                },
                mute: function(t) {
                    this.video.muted = !!t, this.video.muted || this.video.removeAttribute("muted")
                },
                resize: function(e, i, n) {
                    if (!(e && i && this.video.videoWidth && this.video.videoHeight)) return !1;
                    if ("uniform" === n) {
                        var r = e / i,
                            a = this.video.videoWidth / this.video.videoHeight,
                            s = null;
                        Math.abs(r - a) < .09 && (s = "fill"), t.style(this.video, {
                            objectFit: s
                        })
                    }
                    return !1
                },
                getContainer: function() {
                    return this.container
                },
                setContainer: function(t) {
                    this.container = t, t.insertBefore(this.video, t.firstChild)
                },
                remove: function() {
                    this.stop(), this.destroy(), this.container === this.video.parentNode && this.container.removeChild(this.video)
                },
                getVideo: function(e, i) {
                    var n = i || document.getElementById(e),
                        r = n ? n.querySelector("video") : null;
                    return r || (r = document.createElement("video"), t.isMobile() && r.setAttribute("jw-gesture-required", "")), r.className = "jw-video jw-reset", this.video = r, r
                }
            }
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    47: function(t, e, i) {
        var n, r;
        n = [i(3), i(10), i(5), i(1), i(24)], r = function(t, e, i, n, r) {
            var a = 256;
            return {
                stallCheckTimeout_: -1,
                lastStalledTime_: NaN,
                trigger: function(e, i) {
                    return t.trigger.call(this, e, i)
                },
                setState: function(t) {
                    return e.setState.call(this, t)
                },
                attachMedia: function() {
                    this.eventsOn_()
                },
                detachMedia: function() {
                    return this.stopStallCheck(), this.eventsOff_(), this.video
                },
                stopStallCheck: function() {
                    clearTimeout(this.stallCheckTimeout_)
                },
                startStallCheck: function() {
                    this.stopStallCheck(), this.stallCheckTimeout_ = setTimeout(this.stalledHandler.bind(this, this.video.currentTime), a)
                },
                stalledHandler: function(t) {
                    t === this.video.currentTime && (this.video.paused || this.video.ended || this.state !== i.LOADING && this.state !== i.ERROR && (this.seeking || (this.atEdgeOfLiveStream() && this.setPlaybackRate(1), this.setState(i.STALLED))))
                },
                atEdgeOfLiveStream: function() {
                    if (!this.isLive()) return !1;
                    var t = 2;
                    return r.endOfRange(this.video.buffered) - this.video.currentTime <= t
                },
                setAutoplayAttributes: function() {
                    this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", "")
                },
                removeAutoplayAttributes: function() {
                    this.video.removeAttribute("autoplay"), this.video.removeAttribute("muted")
                }
            }
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    48: function(t, e, i) {
        var n, r;
        n = [i(2), i(5)], r = function(t, e) {
            return {
                seeking: !1,
                loadedmetadata: function() {
                    var t = {
                            duration: this.getDuration(),
                            height: this.video.videoHeight,
                            width: this.video.videoWidth
                        },
                        e = this.drmUsed;
                    e && (t.drm = e), this.trigger("meta", t)
                },
                timeupdate: function() {
                    this.stopStallCheck();
                    var t = this.video.videoHeight;
                    t !== this._helperLastVideoHeight && this.adaptation && this.adaptation({
                        size: {
                            width: this.video.videoWidth,
                            height: t
                        }
                    }), this._helperLastVideoHeight = t, this.state !== e.STALLED && this.state !== e.LOADING || this.setState(e.PLAYING), this.startStallCheck();
                    var i = this.getCurrentTime(),
                        n = {
                            position: i,
                            duration: this.getDuration()
                        };
                    if (this.getPtsOffset) {
                        var r = this.getPtsOffset();
                        r >= 0 && (n.metadata = {
                            mpegts: r + i
                        })
                    }(this.state === e.PLAYING || this.seeking) && this.trigger("time", n)
                },
                click: function(t) {
                    this.trigger("click", t)
                },
                volumechange: function() {
                    var t = this.video;
                    this.trigger("volume", {
                        volume: Math.round(100 * t.volume)
                    }), this.trigger("mute", {
                        mute: t.muted
                    })
                },
                seeked: function() {
                    this.seeking && (this.seeking = !1, this.trigger("seeked"))
                },
                playing: function() {
                    this.setState(e.PLAYING), this.video.hasAttribute("jw-gesture-required") && this.video.removeAttribute("jw-gesture-required"), this.trigger("providerFirstFrame")
                },
                pause: function() {
                    this.state !== e.COMPLETE && (this.video.ended || this.video.currentTime !== this.video.duration && this.setState(e.PAUSED))
                },
                progress: function() {
                    var e = this.getDuration();
                    if (!(e <= 0 || e === 1 / 0)) {
                        var i = this.video.buffered;
                        if (i && 0 !== i.length) {
                            var n = t.between(i.end(i.length - 1) / e, 0, 1);
                            this.trigger("bufferChange", {
                                bufferPercent: 100 * n,
                                position: this.getCurrentTime(),
                                duration: e
                            })
                        }
                    }
                },
                ratechange: function() {
                    this.trigger("ratechange", {
                        playbackRate: this.video.playbackRate
                    })
                },
                ended: function() {
                    this.stopStallCheck(), this._helperLastVideoHeight = 0, this.state !== e.IDLE && this.state !== e.COMPLETE && this.trigger("complete")
                },
                loadeddata: function() {
                    this.renderNatively && this.setTextTracks(this.video.textTracks), this.video.setAttribute("jw-loaded", "data")
                },
                error: function() {
                    var t = this.video.error && this.video.error.code || -1,
                        e = {
                            1: "Unknown operation aborted",
                            2: "Unknown network error",
                            3: "Unknown decode error",
                            4: "Source not supported"
                        }[t] || "Unknown";
                    this.trigger("mediaError", {
                        code: t,
                        message: "Error playing file: " + e
                    })
                }
            }
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    78: function(t, e, i) {
        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        var r, a, s = i(9),
            o = i(172),
            u = n(o),
            h = i(30);
        r = [i(1), i(23), i(116), i(2), i(5), i(4), i(3), i(48), i(46), i(47), i(8), i(29), i(183)], a = function(t, e, i, n, r, a, c, d, l, f, p, m, v) {
            function g(u, g) {
                function y() {
                    ct.addEventListener("error", I), ct.addEventListener("trackschanged", j), ct.addEventListener("buffering", ht), t.each(pt, function(t, e) {
                        mt.video.addEventListener(e, t, !1)
                    }), o.CueDispatcher.on("cues", st)
                }

                function T(t, e) {
                    return n.generateLabel(t, g.qualityLabels, e)
                }

                function w(t, e) {
                    for (var i = 0, n = Math.abs(e), r = 1; r < mt.jwLevels.length; r++) {
                        var a = Math.abs(e - mt.jwLevels[r].bitrate);
                        a < n && mt.jwLevels[r].height === t && (n = a, i = r)
                    }
                    return i
                }

                function E() {
                    ct.removeEventListener("error", I), ct.removeEventListener("trackschanged", j), ct.removeEventListener("buffering", ht), t.each(pt, function(t, e) {
                        mt.video.removeEventListener(e, t)
                    }), o.CueDispatcher.off("cues", st)
                }

                function k() {
                    var t = mt.video;
                    E(), ct.destroy(), mt.video = mt.video = t, window.VTTCue = b
                }

                function S(t, e) {
                    for (var i = [].concat(t.headers || []).concat(t.licenseRequestHeaders || []), n = t.customData, r = 0; r < i.length; r++) {
                        var a = i[r];
                        e.headers[a.name] = a.value
                    }
                    n && (e.headers.customData = n)
                }

                function I(t) {
                    var e = t.detail ? t.detail.category : t.category,
                        i = t.detail ? t.detail.code : t.code;
                    if (e === v.util.Error.Category.NETWORK) {
                        var n = ut(i, t.data);
                        return void mt.trigger(a.JWPLAYER_MEDIA_ERROR, {
                            message: "Error loading media: " + n
                        })
                    }
                    if (i === v.util.Error.Code.MP4_SIDX_WRONG_BOX_TYPE) {
                        var r = tt();
                        return q(r, mt.jwLevels) && et(r), void console.error("The MP4 SIDX parser found the wrong box type.")
                    }
                    Z(), mt.trigger(a.JWPLAYER_MEDIA_ERROR, {
                        message: "Error playing file: Unknown playback error"
                    })
                }

                function A() {
                    return t.map(mt.jwLevels, function(t) {
                        return (0, s.qualityLevel)(t)
                    })
                }

                function x() {
                    return mt.currentQuality
                }

                function _(t) {
                    return mt._helperLastVideoHeight = 0, v.polyfill.installAll(), new v.Player(t)
                }

                function P(t) {
                    ct || (ct = _(mt.video)), mt.currentAudioIndex = -1, (n.isAndroid() || t.preload && "none" !== t.preload) && (E(), y(), L(t))
                }

                function C(t) {
                    E(), y(), mt.setState(r.LOADING), mt.loadedItem !== t ? (mt.clearTracks(), mt.drmUsed = null, L(t)) : (N(t.tracks), mt.video.currentTime = 0, R())
                }

                function N(t) {
                    mt.video.textTracks && (t && t.length && mt.setupSideloadedTracks(t), mt.setTextTracks(mt.video.textTracks))
                }

                function R() {
                    var t = mt.video.play();
                    t && t["catch"] ? t["catch"](function(t) {
                        console.warn(t), "NotAllowedError" === t.name && mt.video.hasAttribute("jw-gesture-required") && mt.trigger("autoplayFailed")
                    }) : mt.video.hasAttribute("jw-gesture-required") && mt.trigger("autoplayFailed")
                }

                function L(e) {
                    lt = !0, dt = e.sources[0].drm || {}, mt.loadedItem = e, mt.setupSideloadedTracks(e.tracks), mt.on(a.JWPLAYER_PLAYER_STATE, function() {
                        var t = mt.video;
                        mt.state === r.STALLED && t && t.buffered && t.buffered.length > 0 && t.currentTime < t.buffered.start(0) && mt.seek(t.buffered.start(0))
                    }), (e.withCredentials || gt.withCredentials) && ct.getNetworkingEngine().registerRequestFilter(function(t, e) {
                        e.allowCrossSiteCredentials = !0
                    });
                    var i = dt.widevine ? dt.widevine.serverCertificateUrl : void 0;
                    i ? n.ajax({
                        url: i,
                        responseType: "arraybuffer"
                    }, t.partial(M, e), I) : M(e)
                }

                function M() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                            sources: []
                        },
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = void 0;
                    e.response && (n = new Uint8Array(e.response)), ct.configure({
                        drm: F(n),
                        preferredTextLanguage: gt.selectedCaptionCode || i.getCode(gt.captionLabel),
                        abr: {
                            enabled: mt.abr
                        }
                    });
                    var r = t.sources[0].file,
                        a = t.starttime || 0;
                    ct.load(r, a).then(D, I)
                }

                function D() {
                    mt.trigger(a.JWPLAYER_MEDIA_BUFFER_FULL)
                }

                function O(e) {
                    var i = 0 === e;
                    if (q(e, mt.jwLevels)) {
                        var n = mt.jwLevels[e].shakaId,
                            r = t.findWhere(mt.shakaLevels, {
                                id: n
                            });
                        if (r) {
                            var a = r.bandwidth > yt,
                                s = r.language !== bt;
                            yt = r.bandwidth, ct.selectVariantTrack(r, a || s)
                        }
                        mt.abr = i, ct.configure({
                            abr: {
                                enabled: mt.abr
                            }
                        }), U()
                    }
                }

                function U(t) {
                    var e = mt.audioTracks[t || G()];
                    if (e) {
                        var i = mt.shakaAudioTracks[e.shakaIndex];
                        i && (bt = i.language, ct.selectAudioLanguage(bt))
                    }
                }

                function j() {
                    var e = ct.getTextTracks();
                    mt._tracksById && e.length === Object.keys(mt._tracksById).length || (e = e.reduce(function(t, e) {
                        if ("Shaka Player TextTrack" === e.label || e.mimeType.indexOf("vtt") === -1) return t;
                        var n = e;
                        return n.kind += "s", n.embedded = !0, n.label = i.getLabel(n.language), t.push(n), t
                    }, []), e.length && mt.addTextTracks(e));
                    var n = ct.getVariantTracks(),
                        r = t.findWhere(n, {
                            active: !0
                        }),
                        s = t.groupBy(n, "language"),
                        o = "video";
                    mt.tracksByLang = s, t.size(s) && (B(s, r.language), U(mt.currentAudioIndex), r && (H(s[r.language]), O(mt.currentQuality), mt.trigger(a.JWPLAYER_MEDIA_LEVELS, {
                        levels: mt.jwLevels,
                        currentQuality: mt.currentQuality
                    })), r.mimeType.indexOf("audio") > -1 && (o = "audio")), mt.trigger(a.JWPLAYER_MEDIA_TYPE, {
                        mediaType: o
                    })
                }

                function B(e, i) {
                    var n = t.find(e[i], function(t) {
                            return t.active
                        }),
                        r = [];
                    t.forEach(t.keys(e), function(t) {
                        t === i ? r.push(n) : r.push(e[t][0])
                    }), t.isArray(r) && W(r), mt.trigger(a.JWPLAYER_AUDIO_TRACKS, {
                        tracks: mt.audioTracks,
                        currentTrack: mt.currentAudioIndex
                    })
                }

                function F(t) {
                    var e, i, n = {},
                        r = "";
                    if (m.isSupported("clearkey") && dt.clearkey) return i = dt.clearkey, i.keyId = i.keyId ? i.keyId.replace(/-/g, "") : null, n.clearKeys = {}, n.clearKeys[i.keyId] = i.key, n;
                    if (m.isSupported("widevine")) mt.drmUsed = "widevine", e = "com.widevine.alpha", r = "http://widevine-proxy.appspot.com/proxy";
                    else {
                        if (!m.isSupported("playready")) return n;
                        mt.drmUsed = "playready", e = "com.microsoft.playready", r = "http://microsoft-proxy.appspot.com/proxy"
                    }
                    if (i = dt[mt.drmUsed], !i) return n;
                    if (t && (n.advanced = {}, n.advanced[e] = {
                        serverCertificate: t
                    }), n.servers = n.servers || {}, n.servers[e] = i.url || r, i) {
                        var a = i.licenseRequestFilter;
                        ct.getNetworkingEngine().registerRequestFilter(function(t, e) {
                            if (t === v.net.NetworkingEngine.RequestType.LICENSE) {
                                if ("function" == typeof a) {
                                    var n = ct.drmInfo();
                                    a(e, n)
                                }
                                S(i, e)
                            }
                        })
                    }
                    return n
                }

                function H(e) {
                    mt.currentQuality = 0, mt.shakaLevels = e, mt.shakaLevels.sort(function(t, e) {
                        return t.height < e.height || t.bandwidth < e.bandwidth ? 1 : -1
                    });
                    var i = n.hasRedundantLevels(mt.shakaLevels);
                    mt.jwLevels = t.reduce(mt.shakaLevels, function(t, e) {
                        return t.push({
                            shakaId: e.id,
                            bitrate: e.bandwidth,
                            label: T(e, i),
                            height: e.height,
                            width: e.width
                        }), t
                    }, []), mt.shakaLevels.length > 1 && mt.jwLevels.unshift({
                        label: "Auto",
                        shakaId: "auto"
                    })
                }

                function V(e) {
                    return t.map(e, function(r, a) {
                        var s = r.language,
                            o = t.where(e, {
                                language: s
                            }).length > 1,
                            u = i.getLabel(s);
                        return "und" === s ? u = "Unknown" : "dv" === s && (u = "Audio Description"), o && (u += " (" + n.toKbps(r.bandwidth) + " kbps)"), {
                            autoselect: !1,
                            defaulttrack: !!r.active,
                            groupid: "default",
                            language: r.language,
                            name: u,
                            shakaIndex: a,
                            shakaId: r.id
                        }
                    })
                }

                function K() {
                    var e;
                    return q(mt.currentAudioIndex, mt.audioTracks) ? mt.currentAudioIndex : (e = t.find(mt.audioTracks, function(t) {
                        return t.defaulttrack && "dv" !== t.language
                    }), e || (e = t.find(mt.audioTracks, function(t) {
                        return "dv" !== t.language
                    })), e ? e.shakaIndex : 0)
                }

                function q(e, i) {
                    return t.isNumber(e) && !t.isNaN(e) && e >= 0 && e < t.size(i)
                }

                function G() {
                    return q(mt.currentAudioIndex, mt.audioTracks) ? mt.currentAudioIndex : -1
                }

                function X() {
                    return t.isArray(mt.audioTracks) ? mt.audioTracks : []
                }

                function Y(t) {
                    mt.currentAudioIndex = t, q(mt.currentQuality, mt.jwLevels) && et(mt.currentQuality)
                }

                function W(e) {
                    t.isArray(e) && (mt.shakaAudioTracks = e, mt.audioTracks = V(e), mt.currentAudioIndex = K())
                }

                function z() {
                    mt.video.pause(), mt.setState(r.PAUSED)
                }

                function $() {
                    return mt.seeking ? (mt.setState(r.LOADING), void mt.once(a.JWPLAYER_MEDIA_SEEKED, mt.play)) : (R(), void mt.setVisibility(mt))
                }

                function J(t) {
                    if ("LIVE" !== vt) {
                        var e = ct.seekRange(),
                            i = t,
                            n = t;
                        t < 0 && (i = e.end - e.start + t, n = e.end + t), mt.trigger(a.JWPLAYER_MEDIA_SEEK, {
                            position: mt.getCurrentTime(),
                            offset: i
                        }), mt.seeking = !0, mt.video.currentTime = n
                    }
                }

                function Q(t) {
                    t = !!t, t ? e.style(this.container, {
                        visibility: "visible",
                        opacity: 1
                    }) : e.style(this.container, {
                        visibility: "",
                        opacity: 0
                    })
                }

                function Z() {
                    E(), mt.video.pause(), mt.setState(r.IDLE)
                }

                function tt() {
                    var e = t.findWhere(mt.shakaLevels, {
                        active: !0
                    });
                    if (e)
                        for (var i = 0; i < mt.jwLevels.length; i += 1)
                            if (e.id === mt.jwLevels[i].shakaId) return i;
                    return null
                }

                function et(t) {
                    H(mt.tracksByLang[mt.audioTracks[mt.currentAudioIndex].language]), O(t), mt.currentQuality = t
                }

                function it(t) {
                    mt.video.playbackRate = mt.video.defaultPlaybackRate = t, ct && ct.trickPlay(t)
                }

                function nt() {
                    return ct ? ct.getPlaybackRate() : mt.video.playbackRate
                }

                function rt() {
                    return !!ct && ct.isLive()
                }

                function at(t) {
                    ct = t
                }

                function st(e) {
                    var i = ct.getTextTracks(),
                        n = mt.getSubtitlesTrack();
                    if (n < 0) {
                        var r = t.findWhere(i, {
                            active: !0
                        });
                        n = t.indexOf(i, r)
                    }
                    var a = i[n];
                    if (a) {
                        var s = void 0,
                            o = t.findWhere(mt._tracksById, {
                                language: a.language
                            });
                        s = o ? o._id : a.kind + "s" + n, mt.renderNatively || mt.clearCueData(s), e.forEach(function(t) {
                            mt.renderNatively && (t.align = "center"), mt.addVTTCue({
                                type: a.kind + "s",
                                cue: t,
                                track: s
                            })
                        })
                    }
                    return []
                }

                function ot(t) {
                    return n.isChrome() && t
                }

                function ut(t, e) {
                    var i = void 0,
                        n = v.util.Error.Code;
                    switch (t) {
                        case n.BAD_HTTP_STATUS:
                            i = (0, h.NetworkError)(e[1], e[0], e[2]).message;
                            break;
                        default:
                            i = "File could not be played"
                    }
                    return i
                }

                function ht(e) {
                    mt.video.paused || mt.video.ended || (!t.isUndefined(mt.state) && e.buffering ? mt.setState(r.LOADING) : mt.setState(r.PLAYING))
                }
                var ct, dt, lt, ft = this,
                    pt = {},
                    mt = this,
                    vt = "VOD",
                    gt = g,
                    bt = void 0,
                    yt = void 0;
                this.video = l.getVideo.call(mt, u), this.loadedItem = null, this.drmUsed = null, this.position = 0, this.levels = [], this.currentQuality = -1, this.abr = !0, this.supportsPlaybackRate = !0, t.each(d, function(t, e) {
                    "function" == typeof t ? pt[e] = t.bind(mt) : mt[e] = t
                }), mt.adaptation = function(t) {
                    mt.shakaLevels || j();
                    var e = ct.getStats(),
                        i = w(t.size.height, e.streamBandwidth),
                        n = {
                            level: {
                                index: i,
                                label: mt.jwLevels[i].label,
                                bitrate: e.streamBandwidth,
                                width: t.size.width,
                                height: t.size.height
                            },
                            bandwidth: e.estimatedBandwidth,
                            type: "visualQuality"
                        };
                    lt ? (n.reason = "initial choice", n.mode = "auto", lt = !1) : 0 === mt.currentQuality ? n.reason = n.mode = "auto" : (n.reason = "api", n.mode = "manual"), mt.trigger("visualQuality", n)
                }, t.extend(mt, c, l, f, p, {
                    eventsOn_: function() {
                        ct = _(mt.video), y()
                    },
                    eventsOff_: function() {
                        dt && n.isFF() ? (mt.remove(), mt.video = mt.getVideo(u, mt.container), mt.setContainer(mt.container)) : k()
                    },
                    init: P,
                    load: C,
                    pause: z,
                    getQualityLevels: A,
                    getCurrentQuality: x,
                    getAudioTracks: X,
                    getCurrentAudioTrack: G,
                    play: $,
                    seek: J,
                    setCurrentQuality: function(t) {
                        q(t, mt.jwLevels) && t !== mt.currentQuality && (et(t), mt.trigger(a.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                            currentQuality: t,
                            levels: mt.jwLevels
                        }))
                    },
                    setAudioTracks: function(e) {
                        t.isArray(e) && (W(e), mt.trigger(a.JWPLAYER_AUDIO_TRACKS, {
                            tracks: mt.audioTracks,
                            currentTrack: mt.currentAudioIndex
                        }))
                    },
                    setCurrentAudioTrack: function(t) {
                        q(t, mt.audioTracks) && (Y(t), mt.trigger(a.JWPLAYER_AUDIO_TRACKS, {
                            tracks: mt.audioTracks,
                            currentTrack: t
                        }), mt.trigger(a.JWPLAYER_AUDIO_TRACK_CHANGED, {
                            tracks: mt.audioTracks,
                            currentTrack: t
                        }))
                    },
                    setPlaybackRate: it,
                    getPlaybackRate: nt,
                    isLive: rt,
                    setVisibility: Q,
                    stop: Z,
                    getCurrentTime: function() {
                        var t = mt.video.currentTime;
                        return ct.isLive() && "DVR" === vt && (t = -(ct.seekRange().end - t)), t
                    },
                    getDuration: function() {
                        var t = mt.loadedItem.minDvrWindow,
                            e = mt.video.duration;
                        if (ct.isLive()) {
                            var i = ct.seekRange();
                            e = -(i.end - i.start), e = n.isDvr(e, t) ? e : 1 / 0
                        }
                        return vt = n.streamType(e, t), e
                    },
                    setShakaPlayer: at,
                    supportsFullscreen: t.constant(!0),
                    getName: t.constant({
                        name: "shaka"
                    }),
                    destroy: k,
                    renderNatively: ot(gt.renderCaptionsNatively),
                    setSubtitlesTrack: function(t) {
                        p.setSubtitlesTrack.call(ft, t);
                        var e = ct.getTextTracks(),
                            i = e[t - 1];
                        mt.renderNatively || (mt._currentTextTrackIndex = t - 1), i && (ct.selectTextLanguage(i.language), gt.selectedCaptionCode = i.language)
                    }
                }), pt.loadeddata = function() {
                    if (mt.video.textTracks && "Shaka Player TextTrack" === mt.video.textTracks[0].label) {
                        var t = mt.video.textTracks[0];
                        t._id = "shakaTextTrack", t.inuse = !1, t.mode = "hidden", t.embedded = !0
                    }
                    d.loadeddata.call(mt)
                }, pt.playing = function() {
                    ct.isBuffering() || d.playing.call(mt)
                }, pt.timeupdate = function() {
                    ct.isBuffering() || d.timeupdate.call(mt)
                }
            }
            var b = window.VTTCue;
            return v.media.TextEngine.registerParser("text/vtt", u["default"]), v.media.TextEngine.registerParser('text/vtt; codecs="vtt"', u["default"]),
                g.getName = t.constant({
                    name: "shaka"
                }), g
        }.apply(e, r), !(void 0 !== a && (t.exports = a))
    },
    116: function(t, e, i) {
        var n, r, a = i(1);
        n = [], r = function() {
            function t(t) {
                if (t) return 3 === t.length ? t : i[t.slice(0, 2)] || t
            }

            function e(t) {
                return n[t] || ""
            }
            var i = {
                    zh: "Chinese",
                    nl: "Dutch",
                    en: "English",
                    fr: "French",
                    de: "German",
                    it: "Italian",
                    ja: "Japanese",
                    pt: "Portuguese",
                    ru: "Russian",
                    es: "Spanish",
                    el: "Greek"
                },
                n = a.invert(i);
            return {
                getLabel: t,
                getCode: e
            }
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    171: function(t, e, i) {
        var n, r;
        n = [i(25)], r = function(t) {
            var e = this;
            return e.parser = new t(window), e.arrayBufferToString = function(t) {
                var e, i = "";
                if (!t) return "";
                e = new Uint8Array(t), 239 === e[0] && 187 === e[1] && 191 === e[2] && (e = e.subarray(3));
                for (var n = 65535, r = 0; r < e.length; r += n) i += String.fromCharCode.apply(null, e.subarray(r, r + n));
                return window.decodeURIComponent(window.escape(i))
            }, e.parseCuesFromText = function(t) {
                var i = [];
                return e.parser.oncue = function(t) {
                    i.push(t)
                }, e.parser.parse(t), i
            }, e
        }.apply(e, n), !(void 0 !== r && (t.exports = r))
    },
    172: function(t, e, i) {
        "use strict";

        function n() {}
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e["default"] = n;
        var r = i(171),
            a = i(3),
            s = e.CueDispatcher = Object.create(a);
        n.prototype.parseInit = function() {}, n.prototype.parseMedia = function(t) {
            var e = r.arrayBufferToString(t),
                i = void 0;
            return e = e.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n"), i = r.parseCuesFromText(e), s.trigger("cues", i), []
        }
    },
    183: function(t, e, i) {
        var n;
        ! function() {
            var r = {};
            (function(t) {
                function e(t, e) {
                    var i = t.split("."),
                        n = hs;
                    i[0] in n || !n.execScript || n.execScript("var " + i[0]);
                    for (var r; i.length && (r = i.shift());) i.length || void 0 === e ? n = n[r] ? n[r] : n[r] = {} : n[r] = e
                }

                function i(t) {
                    function e() {}
                    var i = pe;
                    e.prototype = i.prototype, t.Ce = i.prototype, t.prototype = new e, t.prototype.constructor = t, t.ze = function(t, e, n) {
                        return i.prototype[e].apply(t, Array.prototype.slice.call(arguments, 2))
                    }
                }

                function n(t) {
                    this.c = Math.exp(Math.log(.5) / t), this.b = this.a = 0
                }

                function r(t, e, i) {
                    var n = Math.pow(t.c, e);
                    i = i * (1 - n) + n * t.a, isNaN(i) || (t.a = i, t.b += e)
                }

                function a(t) {
                    return t.a / (1 - Math.pow(t.c, t.b))
                }

                function s() {
                    this.c = new n(2), this.f = new n(5), this.a = 0, this.b = 5e5
                }

                function o() {}

                function u(t, e, i, n) {
                    this.severity = t, this.category = e, this.code = i, this.data = Array.prototype.slice.call(arguments, 3)
                }

                function h(t) {
                    var e;
                    t instanceof h ? (c(this, t.aa), this.Ca = t.Ca, this.ca = t.ca, d(this, t.Ka), this.W = t.W, l(this, g(t.a)), this.ua = t.ua) : t && (e = String(t).match(cs)) ? (c(this, e[1] || "", !0), this.Ca = f(e[2] || ""), this.ca = f(e[3] || "", !0), d(this, e[4]), this.W = f(e[5] || "", !0), l(this, e[6] || "", !0), this.ua = f(e[7] || "")) : this.a = new v(null)
                }

                function c(t, e, i) {
                    t.aa = i ? f(e, !0) : e, t.aa && (t.aa = t.aa.replace(/:$/, ""))
                }

                function d(t, e) {
                    if (e) {
                        if (e = Number(e), isNaN(e) || 0 > e) throw Error("Bad port number " + e);
                        t.Ka = e
                    } else t.Ka = null
                }

                function l(t, e, i) {
                    e instanceof v ? t.a = e : (i || (e = p(e, ps)), t.a = new v(e))
                }

                function f(t, e) {
                    return t ? e ? decodeURI(t) : decodeURIComponent(t) : ""
                }

                function p(t, e, i) {
                    return "string" == typeof t ? (t = encodeURI(t).replace(e, m), i && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), t) : null
                }

                function m(t) {
                    return t = t.charCodeAt(0), "%" + (t >> 4 & 15).toString(16) + (15 & t).toString(16)
                }

                function v(t) {
                    this.b = t || null
                }

                function g(t) {
                    var e = new v;
                    if (e.b = t.b, t.a) {
                        var i, n = {};
                        for (i in t.a) n[i] = t.a[i].concat();
                        e.a = n, e.c = t.c
                    }
                    return e
                }

                function b(t, e) {
                    return t.reduce(function(t, e, i) {
                        return e["catch"](t.bind(null, i))
                    }.bind(null, e), Promise.reject())
                }

                function y(t, e) {
                    return t.concat(e)
                }

                function T() {}

                function w(t) {
                    return null != t
                }

                function E(t) {
                    return function(e) {
                        return e != t
                    }
                }

                function k(t, e, i) {
                    return i.indexOf(t) == e
                }

                function S(t, e) {
                    if (!e.length) return t;
                    var i = e.map(function(t) {
                        return new h(t)
                    });
                    return t.map(function(t) {
                        return new h(t)
                    }).map(function(t) {
                        return i.map(t.resolve.bind(t))
                    }).reduce(y, []).map(function(t) {
                        return t.toString()
                    })
                }

                function I(t, e) {
                    return {
                        keySystem: t,
                        licenseServerUri: "",
                        distinctiveIdentifierRequired: !1,
                        persistentStateRequired: !1,
                        audioRobustness: "",
                        videoRobustness: "",
                        serverCertificate: null,
                        initData: e || [],
                        keyIds: []
                    }
                }

                function A(t, e, i, n, r) {
                    var a, s = r in n;
                    for (a in e) {
                        var o = r + "." + a,
                            u = s ? n[r] : i[a],
                            h = !!{
                                ".abr.manager": !0
                            }[o] || !!{
                                serverCertificate: !0
                            }[a];
                        (s || a in t) && (void 0 === e[a] ? void 0 === u || s ? delete t[a] : t[a] = u : h ? t[a] = e[a] : "object" == typeof t[a] && "object" == typeof e[a] ? A(t[a], e[a], u, n, o) : typeof e[a] == typeof u && (t[a] = e[a]))
                    }
                }

                function x(t) {
                    return JSON.parse(JSON.stringify(t))
                }

                function _() {
                    var t, e, i = new Promise(function(i, n) {
                        t = i, e = n
                    });
                    return i.resolve = t, i.reject = e, i
                }

                function P(t) {
                    this.f = !1, this.a = [], this.b = [], this.c = [], this.h = t || null
                }

                function C() {
                    return {
                        maxAttempts: 2,
                        baseDelay: 1e3,
                        backoffFactor: 2,
                        fuzzFactor: .5,
                        timeout: 0
                    }
                }

                function N(t, e) {
                    return {
                        uris: t,
                        method: "GET",
                        body: null,
                        headers: {},
                        allowCrossSiteCredentials: !1,
                        retryParameters: e
                    }
                }

                function R(t, e) {
                    for (var i = [], n = 0; n < t.length; ++n) {
                        for (var r = !1, a = 0; a < i.length && !(r = e ? e(t[n], i[a]) : t[n] === i[a]); ++a);
                        r || i.push(t[n])
                    }
                    return i
                }

                function L(t, e, i) {
                    for (var n = 0; n < t.length; ++n)
                        if (i(t[n], e)) return n;
                    return -1
                }

                function M() {
                    this.a = {}
                }

                function D() {
                    this.a = new M
                }

                function O(t, e, i, n) {
                    t.a && (e = new B(e, i, n), t.a.push(i, e))
                }

                function U(t, e, i, n) {
                    O(t, e, i, function(t) {
                        this.ha(e, i), n(t)
                    }.bind(t))
                }

                function j(t) {
                    if (t.a) {
                        var e, i = t.a,
                            n = [];
                        for (e in i.a) n.push.apply(n, i.a[e]);
                        for (i = 0; i < n.length; ++i) n[i].ha();
                        t.a.a = {}
                    }
                }

                function B(t, e, i) {
                    this.target = t, this.type = e, this.a = i, this.target.addEventListener(e, i, !1)
                }

                function F(t) {
                    return !t || !Object.keys(t).length
                }

                function H(t) {
                    return Object.keys(t).map(function(e) {
                        return t[e]
                    })
                }

                function V(t, e) {
                    return Object.keys(t).reduce(function(i, n) {
                        return i[n] = e(t[n], n), i
                    }, {})
                }

                function K(t, e) {
                    return Object.keys(t).every(function(i) {
                        return e(i, t[i])
                    })
                }

                function q(t, e) {
                    Object.keys(t).forEach(function(i) {
                        e(i, t[i])
                    })
                }

                function G(t) {
                    if (!t) return "";
                    t = new Uint8Array(t), 239 == t[0] && 187 == t[1] && 191 == t[2] && (t = t.subarray(3)), t = escape(z(t));
                    try {
                        return decodeURIComponent(t)
                    } catch (e) {
                        throw new u(2, 2, 2004)
                    }
                }

                function X(t, e, i) {
                    if (!t) return "";
                    if (!i && t.byteLength % 2) throw new u(2, 2, 2004);
                    if (t instanceof ArrayBuffer) var n = t;
                    else i = new Uint8Array(t.byteLength), i.set(new Uint8Array(t)), n = i.buffer;
                    t = Math.floor(t.byteLength / 2), i = new Uint16Array(t), n = new DataView(n);
                    for (var r = 0; r < t; r++) i[r] = n.getUint16(2 * r, e);
                    return z(i)
                }

                function Y(t) {
                    var e = new Uint8Array(t);
                    if (239 == e[0] && 187 == e[1] && 191 == e[2]) return G(e);
                    if (254 == e[0] && 255 == e[1]) return X(e.subarray(2), !1);
                    if (255 == e[0] && 254 == e[1]) return X(e.subarray(2), !0);
                    var i = function(t, e) {
                        return t.byteLength <= e || 32 <= t[e] && 126 >= t[e]
                    }.bind(null, e);
                    if (!e[0] && !e[2]) return X(t, !1);
                    if (!e[1] && !e[3]) return X(t, !0);
                    if (i(0) && i(1) && i(2) && i(3)) return G(t);
                    throw new u(2, 2, 2003)
                }

                function W(t) {
                    t = unescape(encodeURIComponent(t));
                    for (var e = new Uint8Array(t.length), i = 0; i < t.length; ++i) e[i] = t.charCodeAt(i);
                    return e.buffer
                }

                function z(t) {
                    for (var e = "", i = 0; i < t.length; i += 16e3) e += String.fromCharCode.apply(null, t.subarray(i, i + 16e3));
                    return e
                }

                function $(t) {
                    this.a = null, this.b = function() {
                        this.a = null, t()
                    }.bind(this)
                }

                function J(t) {
                    t.cancel(), t.a = setTimeout(t.b, 500)
                }

                function Q(e, i) {
                    var n = void 0 == i || i,
                        r = t.btoa(String.fromCharCode.apply(null, e)).replace(/\+/g, "-").replace(/\//g, "_");
                    return n ? r : r.replace(/=*$/, "")
                }

                function Z(e) {
                    e = t.atob(e.replace(/-/g, "+").replace(/_/g, "/"));
                    for (var i = new Uint8Array(e.length), n = 0; n < e.length; ++n) i[n] = e.charCodeAt(n);
                    return i
                }

                function tt(e) {
                    for (var i = new Uint8Array(e.length / 2), n = 0; n < e.length; n += 2) i[n / 2] = t.parseInt(e.substr(n, 2), 16);
                    return i
                }

                function et(t) {
                    for (var e = "", i = 0; i < t.length; ++i) {
                        var n = t[i].toString(16);
                        1 == n.length && (n = "0" + n), e += n
                    }
                    return e
                }

                function it(t, e) {
                    if (!t && !e) return !0;
                    if (!t || !e || t.length != e.length) return !1;
                    for (var i = 0; i < t.length; ++i)
                        if (t[i] != e[i]) return !1;
                    return !0
                }

                function nt(t, e, i, n) {
                    this.l = this.j = this.v = null, this.J = !1, this.b = null, this.f = new D, this.a = [], this.o = [], this.i = new _, this.la = t, this.h = null, this.g = function(t) {
                        this.i.reject(t), e(t)
                    }.bind(this), this.A = {}, this.Da = i, this.ma = n, this.B = new $(this.Kd.bind(this)), this.ka = this.c = !1, this.G = [], this.ja = !1, this.O = setInterval(this.Jd.bind(this), 1e3), this.i["catch"](function() {})
                }

                function rt(t, e) {
                    if (!t.j) return U(t.f, e, "encrypted", function() {
                        this.g(new u(2, 6, 6010))
                    }.bind(t)), Promise.resolve();
                    t.l = e, U(t.f, t.l, "play", t.qd.bind(t));
                    var i = t.l.setMediaKeys(t.j),
                        i = i["catch"](function(t) {
                            return Promise.reject(new u(2, 6, 6003, t.message))
                        }),
                        n = null;
                    return t.b.serverCertificate && (n = t.j.setServerCertificate(t.b.serverCertificate).then(function() {})["catch"](function(t) {
                        return Promise.reject(new u(2, 6, 6004, t.message))
                    })), Promise.all([i, n]).then(function() {
                        return this.c ? Promise.reject() : (st(this), void(this.b.initData.length || this.o.length || O(this.f, this.l, "encrypted", this.fd.bind(this))))
                    }.bind(t))["catch"](function(t) {
                        return this.c ? Promise.resolve() : Promise.reject(t)
                    }.bind(t))
                }

                function at(t, e) {
                    return Promise.all(e.map(function(t) {
                        return pt(this, t).then(function(t) {
                            if (t) {
                                for (var e = new _, i = 0; i < this.a.length; i++)
                                    if (this.a[i].ba == t) {
                                        this.a[i].ia = e;
                                        break
                                    }
                                return Promise.all([t.remove(), e])
                            }
                        }.bind(this))
                    }.bind(t)))
                }

                function st(t) {
                    var e = t.b ? t.b.initData : [];
                    return e.forEach(function(t) {
                        mt(this, t.initDataType, t.initData)
                    }.bind(t)), t.o.forEach(function(t) {
                        pt(this, t)
                    }.bind(t)), e.length || t.o.length || t.i.resolve(), t.i
                }

                function ot(t) {
                    return t.a.map(function(t) {
                        return t.ba.sessionId
                    })
                }

                function ut(e, i, n, r, a) {
                    var s = dt(e);
                    i.periods.forEach(function(e) {
                        e.variants.forEach(function(e) {
                            s && (e.drmInfos = [s]), e.drmInfos.forEach(function(i) {
                                ct(this, i), t.cast && t.cast.__platform__ && "com.microsoft.playready" == i.keySystem && (i.keySystem = "com.chromecast.playready");
                                var s = r[i.keySystem];
                                s || (s = {
                                    audioCapabilities: [],
                                    videoCapabilities: [],
                                    distinctiveIdentifier: "optional",
                                    persistentState: n ? "required" : "optional",
                                    sessionTypes: [n ? "persistent-license" : "temporary"],
                                    label: i.keySystem,
                                    drmInfos: []
                                }, r[i.keySystem] = s, a.push(i.keySystem)), s.drmInfos.push(i), i.distinctiveIdentifierRequired && (s.distinctiveIdentifier = "required"), i.persistentStateRequired && (s.persistentState = "required");
                                var o = [];
                                e.video && o.push(e.video), e.audio && o.push(e.audio), o.forEach(function(t) {
                                    var e = "video" == t.type ? s.videoCapabilities : s.audioCapabilities,
                                        n = ("video" == t.type ? i.videoRobustness : i.audioRobustness) || "",
                                        r = t.mimeType;
                                    t.codecs && (r += '; codecs="' + t.codecs + '"'), e.push({
                                        robustness: n,
                                        contentType: r
                                    })
                                }.bind(this))
                            }.bind(this))
                        }.bind(this))
                    }.bind(e))
                }

                function ht(t, e, i) {
                    if (1 == i.length && "" == i[0]) return Promise.reject(new u(2, 6, 6e3));
                    var n = new _,
                        r = n;
                    return [!0, !1].forEach(function(t) {
                        i.forEach(function(i) {
                            var n = e[i];
                            n.drmInfos.some(function(t) {
                                return !!t.licenseServerUri
                            }) == t && (n.audioCapabilities.length || delete n.audioCapabilities, n.videoCapabilities.length || delete n.videoCapabilities, r = r["catch"](function() {
                                return this.c ? Promise.reject() : navigator.requestMediaKeySystemAccess(i, [n])
                            }.bind(this)))
                        }.bind(this))
                    }.bind(t)), r = r["catch"](function() {
                        return Promise.reject(new u(2, 6, 6001))
                    }), r = r.then(function(t) {
                        if (this.c) return Promise.reject();
                        var i = 0 <= navigator.userAgent.indexOf("Edge/"),
                            n = t.getConfiguration();
                        return this.v = (n.audioCapabilities || []).concat(n.videoCapabilities || []).map(function(t) {
                            return t.contentType
                        }), i && (this.v = null), i = e[t.keySystem], lt(this, t.keySystem, i, i.drmInfos), this.b.licenseServerUri ? t.createMediaKeys() : Promise.reject(new u(2, 6, 6012))
                    }.bind(t)).then(function(t) {
                        return this.c ? Promise.reject() : (this.j = t, void(this.J = !0))
                    }.bind(t))["catch"](function(t) {
                        return this.c ? Promise.resolve() : (this.v = this.b = null, t instanceof u ? Promise.reject(t) : Promise.reject(new u(2, 6, 6002, t.message)))
                    }.bind(t)), n.reject(), r
                }

                function ct(t, e) {
                    var i = e.keySystem;
                    if (i) {
                        if (!e.licenseServerUri) {
                            var n = t.h.servers[i];
                            n && (e.licenseServerUri = n)
                        }
                        e.keyIds || (e.keyIds = []), (i = t.h.advanced[i]) && (e.distinctiveIdentifierRequired || (e.distinctiveIdentifierRequired = i.distinctiveIdentifierRequired), e.persistentStateRequired || (e.persistentStateRequired = i.persistentStateRequired), e.videoRobustness || (e.videoRobustness = i.videoRobustness), e.audioRobustness || (e.audioRobustness = i.audioRobustness), e.serverCertificate || (e.serverCertificate = i.serverCertificate))
                    }
                }

                function dt(e) {
                    if (F(e.h.clearKeys)) return null;
                    var i, n = [],
                        r = [];
                    for (i in e.h.clearKeys) {
                        var a = e.h.clearKeys[i],
                            s = tt(i),
                            a = tt(a),
                            s = {
                                kty: "oct",
                                kid: Q(s, !1),
                                k: Q(a, !1)
                            };
                        n.push(s), r.push(s.kid)
                    }
                    return e = JSON.stringify({
                        keys: n
                    }), r = JSON.stringify({
                        kids: r
                    }), r = [{
                        initData: new Uint8Array(W(r)),
                        initDataType: "keyids"
                    }], {
                        keySystem: "org.w3.clearkey",
                        licenseServerUri: "data:application/json;base64," + t.btoa(e),
                        distinctiveIdentifierRequired: !1,
                        persistentStateRequired: !1,
                        audioRobustness: "",
                        videoRobustness: "",
                        serverCertificate: null,
                        initData: r,
                        keyIds: []
                    }
                }

                function lt(t, e, i, n) {
                    var r = [],
                        a = [],
                        s = [],
                        o = [];
                    ft(n, r, a, s, o), t.b = {
                        keySystem: e,
                        licenseServerUri: r[0],
                        distinctiveIdentifierRequired: "required" == i.distinctiveIdentifier,
                        persistentStateRequired: "required" == i.persistentState,
                        audioRobustness: i.audioCapabilities ? i.audioCapabilities[0].robustness : "",
                        videoRobustness: i.videoCapabilities ? i.videoCapabilities[0].robustness : "",
                        serverCertificate: a[0],
                        initData: s,
                        keyIds: o
                    }
                }

                function ft(t, e, i, n, r) {
                    function a(t, e) {
                        return !(!t.keyId || t.keyId != e.keyId) || t.initDataType == e.initDataType && it(t.initData, e.initData)
                    }
                    t.forEach(function(t) {
                        if (-1 == e.indexOf(t.licenseServerUri) && e.push(t.licenseServerUri), t.serverCertificate && -1 == L(i, t.serverCertificate, it) && i.push(t.serverCertificate), t.initData && t.initData.forEach(function(t) {
                            -1 == L(n, t, a) && n.push(t)
                        }), t.keyIds)
                            for (var s = 0; s < t.keyIds.length; ++s) - 1 == r.indexOf(t.keyIds[s]) && r.push(t.keyIds[s])
                    })
                }

                function pt(t, e) {
                    try {
                        var i = t.j.createSession("persistent-license")
                    } catch (n) {
                        var r = new u(2, 6, 6005, n.message);
                        return t.g(r), Promise.reject(r)
                    }
                    O(t.f, i, "message", t.kc.bind(t)), O(t.f, i, "keystatuseschange", t.ec.bind(t));
                    var a = {
                        initData: null,
                        ba: i,
                        loaded: !1,
                        zb: 1 / 0,
                        ia: null
                    };
                    return t.a.push(a), i.load(e).then(function(t) {
                        if (!this.c) {
                            if (t) return a.loaded = !0, this.a.every(function(t) {
                                return t.loaded
                            }) && this.i.resolve(), i;
                            this.a.splice(this.a.indexOf(a), 1), this.g(new u(2, 6, 6013))
                        }
                    }.bind(t), function(t) {
                        this.c || (this.a.splice(this.a.indexOf(a), 1), this.g(new u(2, 6, 6005, t.message)))
                    }.bind(t))
                }

                function mt(t, e, i) {
                    try {
                        var n = t.ka ? t.j.createSession("persistent-license") : t.j.createSession()
                    } catch (r) {
                        return void t.g(new u(2, 6, 6005, r.message))
                    }
                    O(t.f, n, "message", t.kc.bind(t)), O(t.f, n, "keystatuseschange", t.ec.bind(t)), t.a.push({
                        initData: i,
                        ba: n,
                        loaded: !1,
                        zb: 1 / 0,
                        ia: null
                    }), n.generateRequest(e, i.buffer)["catch"](function(t) {
                        if (!this.c) {
                            for (var e = 0; e < this.a.length; ++e)
                                if (this.a[e].ba == n) {
                                    this.a.splice(e, 1);
                                    break
                                }
                            this.g(new u(2, 6, 6006, t.message))
                        }
                    }.bind(t))
                }

                function vt(t, e) {
                    for (var i, n = e.target, r = 0; r < t.a.length; r++)
                        if (t.a[r].ba == n) {
                            i = t.a[r];
                            break
                        }
                    r = N([t.b.licenseServerUri], t.h.retryParameters), r.body = e.message, r.method = "POST", "com.microsoft.playready" != t.b.keySystem && "com.chromecast.playready" != t.b.keySystem || gt(r), t.la.request(2, r).then(function(t) {
                        return this.c ? Promise.reject() : n.update(t.data).then(function() {
                            i && (i.ia && i.ia.resolve(), setTimeout(function() {
                                i.loaded = !0, this.a.every(function(t) {
                                    return t.loaded
                                }) && this.i.resolve()
                            }.bind(this), 5e3))
                        }.bind(this))
                    }.bind(t), function(t) {
                        return this.c ? Promise.resolve() : (t = new u(2, 6, 6007, t), this.g(t), void(i && i.ia && i.ia.reject(t)))
                    }.bind(t))["catch"](function(t) {
                        return this.c ? Promise.resolve() : (t = new u(2, 6, 6008, t.message), this.g(t), void(i && i.ia && i.ia.reject(t)))
                    }.bind(t))
                }

                function gt(t) {
                    var e = X(t.body, !0, !0);
                    if (-1 == e.indexOf("PlayReadyKeyMessage")) t.headers["Content-Type"] = "text/xml; charset=utf-8";
                    else {
                        for (var e = (new DOMParser).parseFromString(e, "application/xml"), i = e.getElementsByTagName("HttpHeader"), n = 0; n < i.length; ++n) t.headers[i[n].querySelector("name").textContent] = i[n].querySelector("value").textContent;
                        t.body = Z(e.querySelector("Challenge").textContent).buffer
                    }
                }

                function bt() {
                    var t = [],
                        e = [{
                            contentType: 'video/mp4; codecs="avc1.42E01E"'
                        }, {
                            contentType: 'video/webm; codecs="vp8"'
                        }],
                        i = [{
                            videoCapabilities: e,
                            persistentState: "required",
                            sessionTypes: ["persistent-license"]
                        }, {
                            videoCapabilities: e
                        }],
                        n = {};
                    return "org.w3.clearkey com.widevine.alpha com.microsoft.playready com.apple.fps.2_0 com.apple.fps.1_0 com.apple.fps com.adobe.primetime".split(" ").forEach(function(e) {
                        var r = navigator.requestMediaKeySystemAccess(e, i).then(function(t) {
                            var i = t.getConfiguration().sessionTypes,
                                i = !!i && 0 <= i.indexOf("persistent-license");
                            return 0 <= navigator.userAgent.indexOf("Tizen 3") && (i = !1), n[e] = {
                                persistentState: i
                            }, t.createMediaKeys()
                        })["catch"](function() {
                            n[e] = null
                        });
                        t.push(r)
                    }), Promise.all(t).then(function() {
                        return n
                    })
                }

                function yt(t, e) {
                    var i = t.keySystem();
                    return !e.drmInfos.length || e.drmInfos.some(function(t) {
                        return t.keySystem == i
                    })
                }

                function Tt(t, e) {
                    if (!t.length) return e;
                    if (!e.length) return t;
                    for (var i = [], n = 0; n < t.length; n++)
                        for (var r = 0; r < e.length; r++)
                            if (t[n].keySystem == e[r].keySystem) {
                                var a = t[n],
                                    r = e[r],
                                    s = [],
                                    s = s.concat(a.initData || []),
                                    s = s.concat(r.initData || []),
                                    o = [],
                                    o = o.concat(a.keyIds),
                                    o = o.concat(r.keyIds);
                                i.push({
                                    keySystem: a.keySystem,
                                    licenseServerUri: a.licenseServerUri || r.licenseServerUri,
                                    distinctiveIdentifierRequired: a.distinctiveIdentifierRequired || r.distinctiveIdentifierRequired,
                                    persistentStateRequired: a.persistentStateRequired || r.persistentStateRequired,
                                    videoRobustness: a.videoRobustness || r.videoRobustness,
                                    audioRobustness: a.audioRobustness || r.audioRobustness,
                                    serverCertificate: a.serverCertificate || r.serverCertificate,
                                    initData: s,
                                    keyIds: o
                                });
                                break
                            }
                    return i
                }

                function wt(t) {
                    this.f = null, this.c = t, this.h = 0, this.g = 1 / 0, this.a = this.b = null
                }

                function Et(t, e) {
                    bs[t] = e.length ? At.bind(null, e) : e
                }

                function kt(t, e, i) {
                    return t >= e ? null : new VTTCue(t, e, i)
                }

                function St(t, e, i, n) {
                    return Promise.resolve().then(function() {
                        if (this.c)
                            if (null == i || null == n) this.f.parseInit(e);
                            else {
                                for (var t = this.f.parseMedia(e, {
                                    periodStart: this.h,
                                    segmentStart: i,
                                    segmentEnd: n
                                }), r = 0; r < t.length && !(t[r].startTime >= this.g); ++r) this.c.addCue(t[r]);
                                null == this.b && (this.b = i), this.a = Math.min(n, this.g)
                            }
                    }.bind(t))
                }

                function It(t, e) {
                    for (var i = t.c.cues, n = [], r = 0; r < i.length; ++r) e(i[r]) && n.push(i[r]);
                    for (r = 0; r < n.length; ++r) t.c.removeCue(n[r])
                }

                function At(t) {
                    this.Oa = t
                }

                function xt(t) {
                    return !t || 1 == t.length && 1e-6 > t.end(0) - t.start(0) ? null : t.length ? t.end(t.length - 1) : null
                }

                function _t(t, e) {
                    return !(!t || !t.length || 1 == t.length && 1e-6 > t.end(0) - t.start(0)) && (e >= t.start(0) && e <= t.end(t.length - 1))
                }

                function Pt(t, e) {
                    if (!t || !t.length || 1 == t.length && 1e-6 > t.end(0) - t.start(0)) return 0;
                    for (var i = 0, n = t.length - 1; 0 <= n && t.end(n) > e; --n) i += t.end(n) - Math.max(t.start(n), e);
                    return i
                }

                function Ct(t, e, i) {
                    this.f = t, this.N = e, this.i = i, this.c = {}, this.a = null, this.b = {}, this.g = new D, this.h = !1
                }

                function Nt() {
                    var t = {};
                    return 'video/mp4; codecs="avc1.42E01E",video/mp4; codecs="avc3.42E01E",video/mp4; codecs="hvc1.1.6.L93.90",audio/mp4; codecs="mp4a.40.2",audio/mp4; codecs="ac-3",audio/mp4; codecs="ec-3",video/webm; codecs="vp8",video/webm; codecs="vp9",video/webm; codecs="av1",audio/webm; codecs="vorbis",audio/webm; codecs="opus",video/mp2t; codecs="avc1.42E01E",video/mp2t; codecs="avc3.42E01E",video/mp2t; codecs="hvc1.1.6.L93.90",video/mp2t; codecs="mp4a.40.2",video/mp2t; codecs="ac-3",video/mp2t; codecs="ec-3",video/mp2t; codecs="mp4a.40.2",text/vtt,application/mp4; codecs="wvtt",application/ttml+xml,application/mp4; codecs="stpp"'.split(",").forEach(function(e) {
                        t[e] = !!bs[e] || MediaSource.isTypeSupported(e);
                        var i = e.split(";")[0];
                        t[i] = t[i] || t[e]
                    }), t
                }

                function Rt(t, e) {
                    t.a || (t.a = new wt(t.i)), t.a.f = new bs[e]
                }

                function Lt(t, e) {
                    if ("text" == e) var i = t.a.b;
                    else i = Mt(t, e), i = !i || 1 == i.length && 1e-6 > i.end(0) - i.start(0) ? null : 1 == i.length && 0 > i.start(0) ? 0 : i.length ? i.start(0) : null;
                    return i
                }

                function Mt(t, e) {
                    try {
                        return t.c[e].buffered
                    } catch (i) {
                        return null
                    }
                }

                function Dt(t, e, i, n, r) {
                    return "text" == e ? St(t.a, i, n, r) : jt(t, e, t.je.bind(t, e, i))
                }

                function Ot(t, e) {
                    return "text" == e ? t.a.remove(0, 1 / 0) : jt(t, e, t.qc.bind(t, e, 0, t.N.duration))
                }

                function Ut(t, e, i, n) {
                    return "text" == e ? (t.a.h = i, null != n && (t.a.g = n), Promise.resolve()) : (null == n && (n = 1 / 0), Promise.all([jt(t, e, t.Ec.bind(t, e)), jt(t, e, t.$d.bind(t, e, i)), jt(t, e, t.Yd.bind(t, e, n))]))
                }

                function jt(t, e, i) {
                    if (t.h) return Promise.reject();
                    if (i = {
                        start: i,
                        p: new _
                    }, t.b[e].push(i), 1 == t.b[e].length) try {
                        i.start()
                    } catch (n) {
                        "QuotaExceededError" == n.name ? i.p.reject(new u(2, 3, 3017, e)) : i.p.reject(new u(2, 3, 3015, n)), Ft(t, e)
                    }
                    return i.p
                }

                function Bt(t, e) {
                    if (t.h) return Promise.reject();
                    var i, n = [];
                    for (i in t.c) {
                        var r = new _,
                            a = {
                                start: function(t) {
                                    t.resolve()
                                }.bind(null, r),
                                p: r
                            };
                        t.b[i].push(a), n.push(r), 1 == t.b[i].length && a.start()
                    }
                    return Promise.all(n).then(function() {
                        var t;
                        try {
                            e()
                        } catch (i) {
                            var n = Promise.reject(new u(2, 3, 3015, i))
                        }
                        for (t in this.c) Ft(this, t);
                        return n
                    }.bind(t), function() {
                        return Promise.reject()
                    }.bind(t))
                }

                function Ft(t, e) {
                    t.b[e].shift();
                    var i = t.b[e][0];
                    if (i) try {
                        i.start()
                    } catch (n) {
                        i.p.reject(new u(2, 3, 3015, n)), Ft(t, e)
                    }
                }

                function Ht(t, e, i) {
                    return i == e || t >= ys && i == e.split("-")[0] || t >= Ts && i.split("-")[0] == e.split("-")[0]
                }

                function Vt(t) {
                    t = t.toLowerCase().split("-");
                    var e = ws[t[0]];
                    return e && (t[0] = e), t.join("-")
                }

                function Kt(t, e, i) {
                    var n = t.video;
                    return !(n && (n.width < e.minWidth || n.width > e.maxWidth || n.width > i.width || n.height < e.minHeight || n.height > e.maxHeight || n.height > i.height || n.width * n.height < e.minPixels || n.width * n.height > e.maxPixels) || t.bandwidth < e.minBandwidth || t.bandwidth > e.maxBandwidth)
                }

                function qt(t, e, i) {
                    var n = !1;
                    return t.variants.forEach(function(t) {
                        var r = t.allowedByApplication;
                        t.allowedByApplication = Kt(t, e, i), r != t.allowedByApplication && (n = !0)
                    }), n
                }

                function Gt(t, e, i) {
                    var n = e.video,
                        r = e.audio;
                    for (e = 0; e < i.variants.length; ++e) {
                        var a = i.variants[e],
                            s = t,
                            o = r,
                            u = n;
                        (s && s.J && !yt(s, a) ? 0 : Xt(a.audio, s, o) && Xt(a.video, s, u)) || (i.variants.splice(e, 1), --e)
                    }
                    for (e = 0; e < i.textStreams.length; ++e) t = i.textStreams[e], bs[ie(t.mimeType, t.codecs)] || (i.textStreams.splice(e, 1), --e)
                }

                function Xt(t, e, i) {
                    if (!t) return !0;
                    var n = null;
                    return e && e.J && (n = e.v), e = ie(t.mimeType, t.codecs), !(!bs[e] && !MediaSource.isTypeSupported(e) || n && t.encrypted && 0 > n.indexOf(e) || i && (t.mimeType != i.mimeType || t.codecs.split(".")[0] != i.codecs.split(".")[0]))
                }

                function Yt(t, e, i) {
                    var n = null;
                    return Jt(t.variants).map(function(t) {
                        var r;
                        r = t.video && t.audio ? i == t.video.id && e == t.audio.id : t.video && i == t.video.id || t.audio && e == t.audio.id;
                        var a = "";
                        t.video && (a += t.video.codecs), t.audio && ("" != a && (a += ", "), a += t.audio.codecs, n = t.audio.label);
                        var s = t.audio ? t.audio.codecs : null,
                            o = t.video ? t.video.codecs : null,
                            u = null;
                        t.video ? u = t.video.mimeType : t.audio && (u = t.audio.mimeType);
                        var h = null;
                        t.audio ? h = t.audio.kind : t.video && (h = t.video.kind);
                        var c = R((t.audio ? t.audio.roles : []).concat(t.video ? t.video.roles : []));
                        return {
                            id: t.id,
                            active: r,
                            type: "variant",
                            bandwidth: t.bandwidth,
                            language: t.language,
                            label: n,
                            kind: h || null,
                            width: t.video ? t.video.width : null,
                            height: t.video ? t.video.height : null,
                            frameRate: t.video ? t.video.frameRate : void 0,
                            mimeType: u,
                            codecs: a,
                            audioCodec: s,
                            videoCodec: o,
                            primary: t.primary,
                            roles: c,
                            videoId: t.video ? t.video.id : null,
                            audioId: t.audio ? t.audio.id : null
                        }
                    })
                }

                function Wt(t, e) {
                    return t.textStreams.map(function(t) {
                        return {
                            id: t.id,
                            active: e == t.id,
                            type: "text",
                            language: t.language,
                            label: t.label,
                            kind: t.kind,
                            mimeType: t.mimeType,
                            codecs: t.codecs || null,
                            audioCodec: null,
                            videoCodec: null,
                            primary: t.primary,
                            roles: t.roles
                        }
                    })
                }

                function zt(t, e) {
                    for (var i = 0; i < t.variants.length; i++)
                        if (t.variants[i].id == e.id) return t.variants[i];
                    return null
                }

                function $t(t, e) {
                    for (var i = 0; i < t.textStreams.length; i++)
                        if (t.textStreams[i].id == e.id) return t.textStreams[i];
                    return null
                }

                function Jt(t) {
                    return t.filter(function(t) {
                        return t.allowedByApplication && t.allowedByKeySystem
                    })
                }

                function Qt(t, e, i, n) {
                    var r = Jt(t.variants),
                        a = r.filter(function(t) {
                            return t.language == r[0].language
                        });
                    if (t = r.filter(function(t) {
                        return t.primary
                    }), t.length && (a = t), e) {
                        var s = Vt(e);
                        [Ts, ys, 0].forEach(function(t) {
                            var e = !1;
                            r.forEach(function(n) {
                                s = Vt(s);
                                var r = Vt(n.language);
                                Ht(t, s, r) && (e ? a.push(n) : (a = [n], e = !0), i && (i.audio = !0))
                            })
                        })
                    }
                    var o = n || "";
                    return o && (e = a.filter(function(t) {
                        return t.audio && -1 < t.audio.roles.indexOf(o) || t.video && -1 < t.video.roles.indexOf(o)
                    }), e.length) ? e : a
                }

                function Zt(t, e, i, n) {
                    var r = t.textStreams,
                        a = r;
                    if (t = r.filter(function(t) {
                        return t.primary
                    }), t.length && (a = t), e) {
                        var s = Vt(e);
                        [Ts, ys, 0].forEach(function(t) {
                            var e = !1;
                            r.forEach(function(n) {
                                var r = Vt(n.language);
                                Ht(t, s, r) && (e ? a.push(n) : (a = [n], e = !0), i && (i.text = !0))
                            })
                        })
                    }
                    var o = n || "";
                    return o && (e = a.filter(function(t) {
                        return t && -1 < t.roles.indexOf(o)
                    }), e.length) ? e : a
                }

                function te(t, e, i) {
                    for (var n = 0; n < i.length; n++)
                        if (i[n].audio == t && i[n].video == e) return i[n];
                    return null
                }

                function ee(t, e, i) {
                    function n(t, e) {
                        return null == t ? null == e : e.id == t
                    }
                    for (var r = 0; r < i.length; r++)
                        if (n(t, i[r].audio) && n(e, i[r].video)) return i[r];
                    return null
                }

                function ie(t, e) {
                    var i = t;
                    return e && (i += '; codecs="' + e + '"'), i
                }

                function ne(t, e) {
                    for (var i = t.periods.length - 1; 0 < i; --i)
                        if (e + vs >= t.periods[i].startTime) return i;
                    return 0
                }

                function re(t, e) {
                    for (var i = 0; i < t.periods.length; ++i) {
                        var n = t.periods[i];
                        if ("text" == e.type) {
                            for (var r = 0; r < n.textStreams.length; ++r)
                                if (n.textStreams[r] == e) return i
                        } else
                            for (r = 0; r < n.variants.length; ++r) {
                                var a = n.variants[r];
                                if (a.audio == e || a.video == e || a.video && a.video.trickModeVideo == e) return i
                            }
                    }
                    return -1
                }

                function ae() {
                    this.f = null, this.b = !1, this.a = new s, this.h = [], this.g = [], this.j = !1, this.c = null, this.i = {
                        minWidth: 0,
                        maxWidth: 1 / 0,
                        minHeight: 0,
                        maxHeight: 1 / 0,
                        minPixels: 0,
                        maxPixels: 1 / 0,
                        minBandwidth: 0,
                        maxBandwidth: 1 / 0
                    }
                }

                function se(t, e) {
                    return e.filter(function(e) {
                        return Kt(e, t, {
                            width: 1 / 0,
                            height: 1 / 0
                        })
                    }).sort(function(t, e) {
                        return t.bandwidth - e.bandwidth
                    })
                }

                function oe(e, i) {
                    var n, r = i || {};
                    for (n in r) this[n] = r[n];
                    this.defaultPrevented = this.cancelable = this.bubbles = !1, this.timeStamp = t.performance && t.performance.now ? t.performance.now() : Date.now(), this.type = e, this.isTrusted = !1, this.target = this.currentTarget = null, this.a = !1
                }

                function ue(t) {
                    return JSON.stringify(t, function(t, e) {
                        if ("manager" != t && "function" != typeof e) {
                            if (e instanceof Event || e instanceof oe) {
                                var i, n = {};
                                for (i in e) {
                                    var r = e[i];
                                    r && "object" == typeof r || i in Event || (n[i] = r)
                                }
                                return n
                            }
                            if (e instanceof TimeRanges)
                                for (n = {
                                    __type__: "TimeRanges",
                                    length: e.length,
                                    start: [],
                                    end: []
                                }, i = 0; i < e.length; ++i) n.start.push(e.start(i)), n.end.push(e.end(i));
                            else n = "number" == typeof e ? isNaN(e) ? "NaN" : isFinite(e) ? e : 0 > e ? "-Infinity" : "Infinity" : e;
                            return n
                        }
                    })
                }

                function he(t) {
                    return JSON.parse(t, function(t, e) {
                        return "NaN" == e ? NaN : "-Infinity" == e ? -(1 / 0) : "Infinity" == e ? 1 / 0 : e && "object" == typeof e && "TimeRanges" == e.__type__ ? ce(e) : e
                    })
                }

                function ce(t) {
                    return {
                        length: t.length,
                        start: function(e) {
                            return t.start[e]
                        },
                        end: function(e) {
                            return t.end[e]
                        }
                    }
                }

                function de(t, e, i, n, r) {
                    this.J = t, this.l = e, this.B = i, this.G = n, this.v = r, this.c = this.j = this.h = !1, this.A = "", this.a = this.i = null, this.b = {
                        video: {},
                        player: {}
                    }, this.o = 0, this.f = {}, this.g = null
                }

                function le(t) {
                    for (var e in t.f) {
                        var i = t.f[e];
                        delete t.f[e], i.reject(new u(1, 7, 7e3))
                    }
                }

                function fe(t, e) {
                    var i = ue(e);
                    t.a.sendMessage("urn:x-cast:com.google.shaka.v2", i, function() {}, o)
                }

                function pe() {
                    this.nb = new M, this.Ua = this
                }

                function me(t, e, i) {
                    pe.call(this), this.c = t, this.b = e, this.h = this.f = this.g = this.i = this.j = null, this.a = new de(i, this.fe.bind(this), this.ge.bind(this), this.he.bind(this), this.Vb.bind(this)), ve(this)
                }

                function ve(t) {
                    t.a.init(), t.h = new D, Es.forEach(function(t) {
                        O(this.h, this.c, t, this.ue.bind(this))
                    }.bind(t)), As.forEach(function(t) {
                        O(this.h, this.b, t, this.Id.bind(this))
                    }.bind(t)), t.j = {};
                    for (var e in t.c) Object.defineProperty(t.j, e, {
                        configurable: !1,
                        enumerable: !0,
                        get: t.te.bind(t, e),
                        set: t.ve.bind(t, e)
                    });
                    t.i = {};
                    for (e in t.b) Object.defineProperty(t.i, e, {
                        configurable: !1,
                        enumerable: !0,
                        get: t.Hd.bind(t, e)
                    });
                    t.g = new pe, t.g.Ua = t.j, t.f = new pe, t.f.Ua = t.i
                }

                function ge(t, e, i, n) {
                    pe.call(this), this.a = t, this.b = e, this.j = {
                        video: t,
                        player: e
                    }, this.l = i || function() {}, this.o = n || function(t) {
                        return t
                    }, this.i = !1, this.f = !0, this.h = this.g = this.c = null, be(this)
                }

                function be(e) {
                    var i = cast.receiver.CastReceiverManager.getInstance();
                    i.onSenderConnected = e.jc.bind(e), i.onSenderDisconnected = e.jc.bind(e), i.onSystemVolumeChanged = e.Mc.bind(e), e.g = i.getCastMessageBus("urn:x-cast:com.google.cast.media"), e.g.onMessage = e.hd.bind(e), e.c = i.getCastMessageBus("urn:x-cast:com.google.shaka.v2"), e.c.onMessage = e.vd.bind(e), i.start(), Es.forEach(function(t) {
                        this.a.addEventListener(t, this.mc.bind(this, "video"))
                    }.bind(e)), As.forEach(function(t) {
                        this.b.addEventListener(t, this.mc.bind(this, "player"))
                    }.bind(e)), cast.__platform__ && cast.__platform__.canDisplayType('video/mp4; codecs="avc1.640028"; width=3840; height=2160') ? e.b.Jb(3840, 2160) : e.b.Jb(1920, 1080), e.b.addEventListener("loading", function() {
                        this.f = !1, ye(this)
                    }.bind(e)), e.a.addEventListener("playing", function() {
                        this.f = !1, ye(this)
                    }.bind(e)), e.a.addEventListener("pause", function() {
                        ye(this)
                    }.bind(e)), e.b.addEventListener("unloading", function() {
                        this.f = !0, ye(this)
                    }.bind(e)), e.a.addEventListener("ended", function() {
                        t.setTimeout(function() {
                            this.a && this.a.ended && (this.f = !0, ye(this))
                        }.bind(this), 5e3)
                    }.bind(e))
                }

                function ye(t) {
                    Promise.resolve().then(function() {
                        this.dispatchEvent(new oe("caststatuschanged")), Ee(this, 0)
                    }.bind(t))
                }

                function Te(t, e, i) {
                    for (var n in e.player) t.b[n](e.player[n]);
                    t.l(i), i = Promise.resolve();
                    var r = t.a.autoplay;
                    e.manifest && (t.a.autoplay = !1, i = t.b.load(e.manifest, e.startTime), i["catch"](function(t) {
                        this.b.dispatchEvent(new oe("error", {
                            detail: t
                        }))
                    }.bind(t))), i.then(function() {
                        var t;
                        for (t in e.video) {
                            var i = e.video[t];
                            this.a[t] = i
                        }
                        for (t in e.playerAfterLoad) i = e.playerAfterLoad[t], this.b[t](i);
                        this.a.autoplay = r, e.manifest && (this.a.play(), Ee(this, 0))
                    }.bind(t))
                }

                function we(t, e, i, n) {
                    t.i && (t = ue(e), n ? i.getCastChannel(n).send(t) : i.broadcast(t))
                }

                function Ee(t, e, i) {
                    var n = Rs,
                        n = {
                            mediaSessionId: 0,
                            playbackRate: t.a.playbackRate,
                            playerState: t.f ? n.IDLE : t.b.la ? n.Ac : t.a.paused ? n.Bc : n.Cc,
                            currentTime: t.a.currentTime,
                            supportedMediaCommands: 15,
                            volume: {
                                level: t.a.volume,
                                muted: t.a.muted
                            }
                        };
                    i && (n.media = i), we(t, {
                        requestId: e,
                        type: "MEDIA_STATUS",
                        status: [n]
                    }, t.g)
                }

                function ke(t, e) {
                    var i = Se(t, e);
                    return 1 != i.length ? null : i[0]
                }

                function Se(t, e) {
                    return Array.prototype.filter.call(t.childNodes, function(t) {
                        return t.tagName == e
                    })
                }

                function Ie(t) {
                    var e = t.firstChild;
                    return e && e.nodeType == Node.TEXT_NODE ? t.textContent.trim() : null
                }

                function Ae(t, e, i, n) {
                    var r = null;
                    return t = t.getAttribute(e), null != t && (r = i(t)), null == r ? void 0 != n ? n : null : r
                }

                function xe(t) {
                    return t ? (/^\d+\-\d+\-\d+T\d+:\d+:\d+(\.\d+)?$/.test(t) && (t += "Z"), t = Date.parse(t), isNaN(t) ? null : Math.floor(t / 1e3)) : null
                }

                function _e(t) {
                    return t && (t = /^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(t)) ? (t = 31536e3 * Number(t[1] || null) + 2592e3 * Number(t[2] || null) + 86400 * Number(t[3] || null) + 3600 * Number(t[4] || null) + 60 * Number(t[5] || null) + Number(t[6] || null), isFinite(t) ? t : null) : null
                }

                function Pe(t) {
                    var e = /([0-9]+)-([0-9]+)/.exec(t);
                    return e ? (t = Number(e[1]), isFinite(t) ? (e = Number(e[2]), isFinite(e) ? {
                        start: t,
                        end: e
                    } : null) : null) : null
                }

                function Ce(t) {
                    return t = Number(t), t % 1 ? null : t
                }

                function Ne(t) {
                    return t = Number(t), !(t % 1) && 0 < t ? t : null
                }

                function Re(t) {
                    return t = Number(t), !(t % 1) && 0 <= t ? t : null
                }

                function Le(t) {
                    var e;
                    return t = (e = t.match(/^(\d+)\/(\d+)$/)) ? Number(e[1] / e[2]) : Number(t), isNaN(t) ? null : t
                }

                function Me(t, e, i) {
                    t = Ue(t);
                    var n = null,
                        r = null,
                        a = [],
                        s = [],
                        o = t.map(function(t) {
                            return t.keyId
                        }).filter(w);
                    if (0 < o.length && (r = o[0], o.some(E(r)))) throw new u(2, 4, 4010);
                    return i || (s = t.filter(function(t) {
                        return "urn:mpeg:dash:mp4protection:2011" != t.sc || (n = t.init || n, !1)
                    }), 0 < s.length && (a = Oe(n, e, s), a.length || (a = [I("", n)]))), 0 < t.length && (i || !s.length) && (a = H(Ls).map(function(t) {
                        return I(t, n)
                    })), r && a.forEach(function(t) {
                        t.initData.forEach(function(t) {
                            t.keyId = r
                        })
                    }), {
                        Sb: r,
                        Ae: n,
                        drmInfos: a,
                        Ub: !0
                    }
                }

                function De(t, e, i, n) {
                    var r = Me(t, e, n);
                    if (i.Ub) t = 1 == i.drmInfos.length && !i.drmInfos[0].keySystem, e = !r.drmInfos.length, (!i.drmInfos.length || t && !e) && (i.drmInfos = r.drmInfos), i.Ub = !1;
                    else if (0 < r.drmInfos.length && (i.drmInfos = i.drmInfos.filter(function(t) {
                        return r.drmInfos.some(function(e) {
                            return e.keySystem == t.keySystem
                        })
                    }), !i.drmInfos.length)) throw new u(2, 4, 4008);
                    return r.Sb || i.Sb
                }

                function Oe(t, e, i) {
                    return i.map(function(i) {
                        var n = Ls[i.sc];
                        return n ? [I(n, i.init || t)] : e(i.node) || []
                    }).reduce(y, [])
                }

                function Ue(t) {
                    return t.map(function(t) {
                        var e = t.getAttribute("schemeIdUri"),
                            i = t.getAttribute("cenc:default_KID"),
                            n = Se(t, "cenc:pssh").map(Ie);
                        if (!e) return null;
                        if (e = e.toLowerCase(), i && (i = i.replace(/-/g, "").toLowerCase(), 0 <= i.indexOf(" "))) throw new u(2, 4, 4009);
                        var r = [];
                        try {
                            r = n.map(function(t) {
                                return {
                                    initDataType: "cenc",
                                    initData: Z(t),
                                    keyId: null
                                }
                            })
                        } catch (a) {
                            throw new u(2, 4, 4007)
                        }
                        return {
                            node: t,
                            sc: e,
                            keyId: i,
                            init: 0 < r.length ? r : null
                        }
                    }).filter(w)
                }

                function je(e, i, n, r, a) {
                    null != a && (a = Math.round(a));
                    var s = {
                        RepresentationID: i,
                        Number: n,
                        Bandwidth: r,
                        Time: a
                    };
                    return e.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)d)?\$/g, function(e, i, n) {
                        if ("$$" == e) return "$";
                        var r = s[i];
                        return null == r ? e : ("RepresentationID" == i && n && (n = void 0), e = r.toString(), n = t.parseInt(n, 10) || 1, Array(Math.max(0, n - e.length) + 1).join("0") + e);
                    })
                }

                function Be(t, e) {
                    var i = Fe(t, e, "timescale"),
                        n = 1;
                    i && (n = Ne(i) || 1), i = Fe(t, e, "duration"), (i = Ne(i || "")) && (i /= n);
                    var r = Fe(t, e, "startNumber"),
                        a = Fe(t, e, "presentationTimeOffset"),
                        s = Re(r || "");
                    null != r && null != s || (s = 1);
                    var o = He(t, e, "SegmentTimeline"),
                        r = null;
                    if (o) {
                        for (var r = n, u = Number(a), h = t.R.duration || 1 / 0, o = Se(o, "S"), c = [], d = 0, l = 0; l < o.length; ++l) {
                            var f = o[l],
                                p = Ae(f, "t", Re),
                                m = Ae(f, "d", Re),
                                f = Ae(f, "r", Ce);
                            if (null != p && (p -= u), !m) break;
                            if (p = null != p ? p : d, f = f || 0, 0 > f)
                                if (l + 1 < o.length) {
                                    if (f = Ae(o[l + 1], "t", Re), null == f) break;
                                    if (p >= f) break;
                                    f = Math.ceil((f - p) / m) - 1
                                } else {
                                    if (1 / 0 == h) break;
                                    if (p / r >= h) break;
                                    f = Math.ceil((h * r - p) / m) - 1
                                }
                            0 < c.length && p != d && (c[c.length - 1].end = p / r);
                            for (var v = 0; v <= f; ++v) d = p + m, c.push({
                                start: p / r,
                                end: d / r,
                                re: p
                            }), p = d
                        }
                        r = c
                    }
                    return {
                        timescale: n,
                        P: i,
                        Aa: s,
                        presentationTimeOffset: Number(a) / n || 0,
                        Pb: Number(a),
                        F: r
                    }
                }

                function Fe(t, e, i) {
                    return [e(t.w), e(t.S), e(t.T)].filter(w).map(function(t) {
                        return t.getAttribute(i)
                    }).reduce(function(t, e) {
                        return t || e
                    })
                }

                function He(t, e, i) {
                    return [e(t.w), e(t.S), e(t.T)].filter(w).map(function(t) {
                        return ke(t, i)
                    }).reduce(function(t, e) {
                        return t || e
                    })
                }

                function Ve(t, e, i) {
                    this.a = t, this.X = e, this.M = i
                }

                function Ke(t, e, i, n, r, a) {
                    this.position = t, this.startTime = e, this.endTime = i, this.a = n, this.X = r, this.M = a
                }

                function qe(t, e) {
                    this.H = t, this.a = e == Ms, this.u = 0
                }

                function Ge() {
                    throw new u(2, 3, 3e3)
                }

                function Xe() {
                    this.b = [], this.a = []
                }

                function Ye(t) {
                    for (; t.s.Z();) t.Oa.fb(t.start, t.s)
                }

                function We(t) {
                    for (var e = t.s.D(); 0 < e; --e) t.Oa.fb(t.start, t.s)
                }

                function ze(t) {
                    return function(e) {
                        t(e.s.La(e.s.H.byteLength - e.s.u))
                    }
                }

                function $e(t) {
                    for (var e = 0, i = 0; i < t.length; i++) e = e << 8 | t.charCodeAt(i);
                    return e
                }

                function Je(t, e, i, n) {
                    var r, a = (new Xe).da("sidx", function(t) {
                        r = Qe(e, n, i, t)
                    });
                    if (t && a.parse(t), r) return r;
                    throw new u(2, 3, 3004)
                }

                function Qe(t, e, i, n) {
                    var r = [];
                    n.s.I(4);
                    var a = n.s.D();
                    if (!a) throw new u(2, 3, 3005);
                    if (n.version) var s = n.s.Qa(),
                        o = n.s.Qa();
                    else s = n.s.D(), o = n.s.D();
                    n.s.I(2);
                    var h = n.s.oc();
                    for (e = s - e, t = t + n.size + o, o = 0; o < h; o++) {
                        var c = n.s.D();
                        s = (2147483648 & c) >>> 31;
                        var c = 2147483647 & c,
                            d = n.s.D();
                        if (n.s.I(4), 1 == s) throw new u(2, 3, 3006);
                        r.push(new Ke(r.length, e / a, (e + d) / a, function() {
                            return i
                        }, t, t + c - 1)), e += d, t += c
                    }
                    return r
                }

                function Ze(t) {
                    this.a = t
                }

                function ti(t, e) {
                    if (t.a.length) {
                        var i = t.a[t.a.length - 1];
                        i.startTime > e || (t.a[t.a.length - 1] = new Ke(i.position, i.startTime, e, i.a, i.X, i.M))
                    }
                }

                function ei(t) {
                    this.b = t, this.a = new qe(t, 0), Ds || (Ds = [new Uint8Array([255]), new Uint8Array([127, 255]), new Uint8Array([63, 255, 255]), new Uint8Array([31, 255, 255, 255]), new Uint8Array([15, 255, 255, 255, 255]), new Uint8Array([7, 255, 255, 255, 255, 255]), new Uint8Array([3, 255, 255, 255, 255, 255, 255]), new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255])])
                }

                function ii(t) {
                    var e = ni(t);
                    if (7 < e.length) throw new u(2, 3, 3002);
                    for (var i = 0, n = 0; n < e.length; n++) i = 256 * i + e[n];
                    e = i, i = ni(t);
                    t: {
                        for (n = 0; n < Ds.length; n++)
                            if (it(i, Ds[n])) {
                                n = !0;
                                break t
                            }
                        n = !1
                    }
                    if (n) i = t.b.byteLength - t.a.u;
                    else {
                        if (8 == i.length && 224 & i[1]) throw new u(2, 3, 3001);
                        for (var n = i[0] & (1 << 8 - i.length) - 1, r = 1; r < i.length; r++) n = 256 * n + i[r];
                        i = n
                    }
                    return i = t.a.u + i <= t.b.byteLength ? i : t.b.byteLength - t.a.u, n = new DataView(t.b.buffer, t.b.byteOffset + t.a.u, i), t.a.I(i), new ri(e, n)
                }

                function ni(t) {
                    var e, i = t.a.Eb();
                    for (e = 1; 8 >= e && !(i & 1 << 8 - e); e++);
                    if (8 < e) throw new u(2, 3, 3002);
                    var n = new Uint8Array(e);
                    for (n[0] = i, i = 1; i < e; i++) n[i] = t.a.Eb();
                    return n
                }

                function ri(t, e) {
                    this.id = t, this.a = e
                }

                function ai(t) {
                    if (8 < t.a.byteLength) throw new u(2, 3, 3002);
                    if (8 == t.a.byteLength && 224 & t.a.getUint8(0)) throw new u(2, 3, 3001);
                    for (var e = 0, i = 0; i < t.a.byteLength; i++) var n = t.a.getUint8(i),
                        e = 256 * e + n;
                    return e
                }

                function si() {}

                function oi(t, e, i, n, r, a) {
                    function s() {
                        return r
                    }
                    var o = [];
                    t = new ei(t.a);
                    for (var u = -1, h = -1; t.Z();) {
                        var c = ii(t);
                        if (187 == c.id) {
                            var d = ui(c);
                            d && (c = i * (d.se - a), d = e + d.Nd, 0 <= u && o.push(new Ke(o.length, u, c, s, h, d - 1)), u = c, h = d)
                        }
                    }
                    return 0 <= u && o.push(new Ke(o.length, u, n, s, h, null)), o
                }

                function ui(t) {
                    var e = new ei(t.a);
                    if (t = ii(e), 179 != t.id) throw new u(2, 3, 3013);
                    if (t = ai(t), e = ii(e), 183 != e.id) throw new u(2, 3, 3012);
                    for (var e = new ei(e.a), i = 0; e.Z();) {
                        var n = ii(e);
                        if (241 == n.id) {
                            i = ai(n);
                            break
                        }
                    }
                    return {
                        se: t,
                        Nd: i
                    }
                }

                function hi(t, e) {
                    var i = He(t, e, "Initialization");
                    if (!i) return null;
                    var n = t.w.U,
                        r = i.getAttribute("sourceURL");
                    r && (n = S(t.w.U, [r]));
                    var r = 0,
                        a = null;
                    return (i = Ae(i, "range", Pe)) && (r = i.start, a = i.end), new Ve(function() {
                        return n
                    }, r, a)
                }

                function ci(t, e) {
                    var i = Fe(t, li, "presentationTimeOffset"),
                        n = hi(t, li),
                        r = Number(i),
                        a = t.w.contentType,
                        s = t.w.mimeType.split("/")[1];
                    if ("text" != a && "mp4" != s && "webm" != s) throw new u(2, 4, 4006);
                    if ("webm" == s && !n) throw new u(2, 4, 4005);
                    var a = He(t, li, "RepresentationIndex"),
                        o = Fe(t, li, "indexRange"),
                        h = t.w.U,
                        o = Pe(o || "");
                    if (a) {
                        var c = a.getAttribute("sourceURL");
                        c && (h = S(t.w.U, [c])), o = Ae(a, "range", Pe, o)
                    }
                    if (!o) throw new u(2, 4, 4002);
                    return r = di(t, e, n, h, o.start, o.end, s, r), {
                        createSegmentIndex: r.createSegmentIndex,
                        findSegmentPosition: r.findSegmentPosition,
                        getSegmentReference: r.getSegmentReference,
                        initSegmentReference: n,
                        presentationTimeOffset: Number(i) || 0
                    }
                }

                function di(t, e, i, n, r, a, s, o) {
                    var u = t.presentationTimeline,
                        h = !t.Ea || !t.R.ub,
                        c = t.R.duration,
                        d = e,
                        l = null;
                    return {
                        createSegmentIndex: function() {
                            var t = [d(n, r, a), "webm" == s ? d(i.a(), i.X, i.M) : null];
                            return d = null, Promise.all(t).then(function(t) {
                                var e = t[0];
                                t = t[1] || null, e = "mp4" == s ? Je(e, r, n, o) : (new si).parse(e, t, n, o), u.Ia(0, e), l = new Ze(e), h && ti(l, c)
                            })
                        },
                        findSegmentPosition: function(t) {
                            return l.find(t)
                        },
                        getSegmentReference: function(t) {
                            return l.get(t)
                        }
                    }
                }

                function li(t) {
                    return t.Ra
                }

                function fi(t, e) {
                    var i = hi(t, pi),
                        n = vi(t),
                        r = Be(t, pi),
                        a = r.Aa;
                    a || (a = 1);
                    var s = 0;
                    if (r.P ? s = r.P * (a - 1) : r.F && 0 < r.F.length && (s = r.F[0].start), n = {
                        P: r.P,
                        startTime: s,
                        Aa: a,
                        presentationTimeOffset: r.presentationTimeOffset,
                        F: r.F,
                        Ha: n
                    }, !n.P && !n.F && 1 < n.Ha.length) throw new u(2, 4, 4002);
                    if (!n.P && !t.R.duration && !n.F && 1 == n.Ha.length) throw new u(2, 4, 4002);
                    if (n.F && !n.F.length) throw new u(2, 4, 4002);
                    return a = r = null, t.T.id && t.w.id && (a = t.T.id + "," + t.w.id, r = e[a]), s = mi(t.R.duration, n.Aa, t.w.U, n), r ? (r.xb(s), r.qb(t.presentationTimeline.na() - t.R.start)) : (t.presentationTimeline.Ia(0, s), r = new Ze(s), a && t.Ea && (e[a] = r)), t.Ea && t.R.ub || ti(r, t.R.duration), {
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: r.find.bind(r),
                        getSegmentReference: r.get.bind(r),
                        initSegmentReference: i,
                        presentationTimeOffset: n.presentationTimeOffset
                    }
                }

                function pi(t) {
                    return t.pa
                }

                function mi(t, e, i, n) {
                    var r = n.Ha.length;
                    n.F && n.F.length != n.Ha.length && (r = Math.min(n.F.length, n.Ha.length));
                    for (var a = [], s = n.startTime, o = 0; o < r; o++) {
                        var u = n.Ha[o],
                            h = S(i, [u.cd]),
                            c = null != n.P ? s + n.P : n.F ? n.F[o].end : s + t;
                        a.push(new Ke(o + e, s, c, function(t) {
                            return t
                        }.bind(null, h), u.start, u.end)), s = c
                    }
                    return a
                }

                function vi(t) {
                    return [t.w.pa, t.S.pa, t.T.pa].filter(w).map(function(t) {
                        return Se(t, "SegmentURL")
                    }).reduce(function(t, e) {
                        return 0 < t.length ? t : e
                    }).map(function(e) {
                        e.getAttribute("indexRange") && !t.$b && (t.$b = !0);
                        var i = e.getAttribute("media");
                        return e = Ae(e, "mediaRange", Pe, {
                            start: 0,
                            end: null
                        }), {
                            cd: i,
                            start: e.start,
                            end: e.end
                        }
                    })
                }

                function gi(t, e, i, n) {
                    var r = wi(t),
                        a = Be(t, bi),
                        s = Fe(t, bi, "media"),
                        o = Fe(t, bi, "index");
                    if (a = {
                        P: a.P,
                        timescale: a.timescale,
                        Aa: a.Aa,
                        presentationTimeOffset: a.presentationTimeOffset,
                        Pb: a.Pb,
                        F: a.F,
                        wb: s,
                        Na: o
                    }, s = 0 + (a.Na ? 1 : 0), s += a.F ? 1 : 0, s += a.P ? 1 : 0, !s) throw new u(2, 4, 4002);
                    if (1 != s && (a.Na && (a.F = null), a.P = null), !a.Na && !a.wb) throw new u(2, 4, 4002);
                    if (a.Na) {
                        if (i = t.w.mimeType.split("/")[1], "mp4" != i && "webm" != i) throw new u(2, 4, 4006);
                        if ("webm" == i && !r) throw new u(2, 4, 4005);
                        n = je(a.Na, t.w.id, null, t.bandwidth || null, null), n = S(t.w.U, [n]), t = di(t, e, r, n, 0, null, i, a.presentationTimeOffset)
                    } else a.P ? (n || t.presentationTimeline.yb(a.P), t = yi(t, a)) : (n = e = null, t.T.id && t.w.id && (n = t.T.id + "," + t.w.id, e = i[n]), s = Ti(t, a), e ? (e.xb(s), e.qb(t.presentationTimeline.na() - t.R.start)) : (t.presentationTimeline.Ia(0, s), e = new Ze(s), n && t.Ea && (i[n] = e)), t.Ea && t.R.ub || ti(e, t.R.duration), t = {
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: e.find.bind(e),
                        getSegmentReference: e.get.bind(e)
                    });
                    return {
                        createSegmentIndex: t.createSegmentIndex,
                        findSegmentPosition: t.findSegmentPosition,
                        getSegmentReference: t.getSegmentReference,
                        initSegmentReference: r,
                        presentationTimeOffset: a.presentationTimeOffset
                    }
                }

                function bi(t) {
                    return t.Sa
                }

                function yi(t, e) {
                    var i = t.R.duration,
                        n = e.P,
                        r = e.Aa,
                        a = e.timescale,
                        s = e.wb,
                        o = t.bandwidth || null,
                        u = t.w.id,
                        h = t.w.U;
                    return {
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: function(t) {
                            return 0 > t || i && t >= i ? null : Math.floor(t / n)
                        },
                        getSegmentReference: function(t) {
                            var e = t * n;
                            return 0 > e || i && e >= i ? null : new Ke(t, e, e + n, function() {
                                var i = je(s, u, t + r, o, e * a);
                                return S(h, [i])
                            }, 0, null)
                        }
                    }
                }

                function Ti(t, e) {
                    for (var i = [], n = 0; n < e.F.length; n++) {
                        var r = n + e.Aa;
                        i.push(new Ke(r, e.F[n].start, e.F[n].end, function(t, e, i, n, r, a) {
                            return t = je(t, e, r, i, a), S(n, [t]).map(function(t) {
                                return t.toString()
                            })
                        }.bind(null, e.wb, t.w.id, t.bandwidth || null, t.w.U, r, e.F[n].re + e.Pb), 0, null))
                    }
                    return i
                }

                function wi(t) {
                    var e = Fe(t, bi, "initialization");
                    if (!e) return null;
                    var i = t.w.id,
                        n = t.bandwidth || null,
                        r = t.w.U;
                    return new Ve(function() {
                        var t = je(e, i, null, n, null);
                        return S(r, [t])
                    }, 0, null)
                }

                function Ei() {
                    var t, e = {};
                    for (t in Os) e[t] = !0;
                    for (t in Us) e[t] = !0;
                    return ["application/dash+xml", "application/x-mpegurl", "application/vnd.apple.mpegurl", "application/vnd.ms-sstr+xml"].forEach(function(t) {
                        e[t] = !!Os[t]
                    }), ["mpd", "m3u8", "ism"].forEach(function(t) {
                        e[t] = !!Us[t]
                    }), e
                }

                function ki(t, e, i, n) {
                    var r = n;
                    return r || (n = new h(t).W.split("/").pop().split("."), 1 < n.length && (n = n.pop().toLowerCase(), r = Us[n])), r ? Promise.resolve(r) : (i = N([t], i), i.method = "HEAD", e.request(0, i).then(function(e) {
                        return (e = e.headers["content-type"]) && (e = e.toLowerCase()), (r = Os[e]) ? r : Promise.reject(new u(2, 4, 4e3, t))
                    }, function(t) {
                        return t.severity = 2, Promise.reject(t)
                    }))
                }

                function Si(t, e) {
                    this.f = t, this.i = e, this.c = this.a = 1 / 0, this.b = 1, this.h = 0, this.g = !0
                }

                function Ii() {
                    this.a = this.b = null, this.g = [], this.c = null, this.i = [], this.h = 1, this.j = {}, this.l = 0, this.f = null
                }

                function Ai(t) {
                    return t.a.networkingEngine.request(0, N(t.g, t.b.retryParameters)).then(function(t) {
                        if (this.a) return xi(this, t.data, t.uri)
                    }.bind(t))
                }

                function xi(t, e, i) {
                    var n = G(e),
                        r = new DOMParser,
                        a = null;
                    e = null;
                    try {
                        a = r.parseFromString(n, "text/xml")
                    } catch (s) {}
                    if (a && "MPD" == a.documentElement.tagName && (e = a.documentElement), e && 0 < e.getElementsByTagName("parsererror").length && (e = null), !e) throw new u(2, 4, 4001);
                    i = [i], n = Se(e, "Location").map(Ie).filter(w), 0 < n.length && (i = t.g = n), n = Se(e, "BaseURL").map(Ie), i = S(i, n);
                    var o = Ae(e, "minBufferTime", _e);
                    t.l = Ae(e, "minimumUpdatePeriod", _e, -1);
                    var h = Ae(e, "availabilityStartTime", xe),
                        n = Ae(e, "timeShiftBufferDepth", _e),
                        c = Ae(e, "suggestedPresentationDelay", _e),
                        r = Ae(e, "maxSegmentDuration", _e),
                        a = e.getAttribute("type") || "static";
                    if (t.c) var d = t.c.presentationTimeline;
                    else {
                        var l = Math.max(10, 1.5 * o);
                        d = new Si(h, null != c ? c : l)
                    }
                    var h = _i(t, {
                            Ea: "static" != a,
                            presentationTimeline: d,
                            T: null,
                            R: null,
                            S: null,
                            w: null,
                            bandwidth: void 0,
                            $b: !1
                        }, i, e),
                        c = h.duration,
                        f = h.periods;
                    return d.yc("static" == a), d.qa(c || 1 / 0), d.xc(null != n ? n : 1 / 0), d.yb(r || 1), t.c ? Promise.resolve() : (e = Se(e, "UTCTiming"), Oi(t, i, e, d.$()).then(function(t) {
                        this.a && (d.wc(t), this.c = {
                            presentationTimeline: d,
                            periods: f,
                            offlineSessionIds: [],
                            minBufferTime: o || 0
                        })
                    }.bind(t)))
                }

                function _i(t, e, i, n) {
                    var r = Ae(n, "mediaPresentationDuration", _e),
                        a = [],
                        s = 0;
                    n = Se(n, "Period");
                    for (var o = 0; o < n.length; o++) {
                        var u = n[o],
                            s = Ae(u, "start", _e, s),
                            h = Ae(u, "duration", _e),
                            c = null;
                        if (o != n.length - 1) {
                            var d = Ae(n[o + 1], "start", _e);
                            null != d && (c = d - s)
                        } else null != r && (c = r - s);
                        if (null == c && (c = h), u = Pi(t, e, i, {
                            start: s,
                            duration: c,
                            node: u,
                            ub: null == c || o == n.length - 1
                        }), a.push(u), h = e.T.id, t.i.every(E(h)) && (t.a.filterPeriod(u), t.i.push(h), t.c && t.c.periods.push(u)), null == c) {
                            s = null;
                            break
                        }
                        s += c
                    }
                    return null != r ? {
                        periods: a,
                        duration: r
                    } : {
                        periods: a,
                        duration: s
                    }
                }

                function Pi(t, e, i, n) {
                    e.T = Li(n.node, null, i), e.R = n, e.T.id || (e.T.id = "__shaka_period_" + n.start), Se(n.node, "EventStream").forEach(t.Fd.bind(t, n.start, n.duration)), i = Se(n.node, "AdaptationSet").map(t.Dd.bind(t, e)).filter(w);
                    var r = i.map(function(t) {
                            return t.Qd
                        }).reduce(y, []),
                        a = r.filter(k);
                    if (e.Ea && r.length != a.length) throw new u(2, 4, 4018);
                    var s = i.filter(function(t) {
                        return !t.Ob
                    });
                    if (i.filter(function(t) {
                        return t.Ob
                    }).forEach(function(t) {
                        var e = t.streams[0],
                            i = t.Ob;
                        s.forEach(function(t) {
                            t.id == i && t.streams.forEach(function(t) {
                                t.trickModeVideo = e
                            })
                        })
                    }), r = Ci(s, "video"), a = Ci(s, "audio"), !r.length && !a.length) throw new u(2, 4, 4004);
                    for (a.length || (a = [null]), r.length || (r = [null]), e = [], i = 0; i < a.length; i++)
                        for (var o = 0; o < r.length; o++) Ni(t, a[i], r[o], e);
                    for (t = Ci(s, "text"), r = [], i = 0; i < t.length; i++) r.push.apply(r, t[i].streams);
                    return {
                        startTime: n.start,
                        textStreams: r,
                        variants: e
                    }
                }

                function Ci(t, e) {
                    return t.filter(function(t) {
                        return t.contentType == e
                    })
                }

                function Ni(t, e, i, n) {
                    if (e || i)
                        if (e && i) {
                            var r = e.drmInfos,
                                a = i.drmInfos;
                            if (r.length && a.length ? 0 < Tt(r, a).length : 1)
                                for (var s = Tt(e.drmInfos, i.drmInfos), r = 0; r < e.streams.length; r++)
                                    for (var o = 0; o < i.streams.length; o++) a = i.streams[o].bandwidth + e.streams[r].bandwidth, a = {
                                        id: t.h++,
                                        language: e.language,
                                        primary: e.vb || i.vb,
                                        audio: e.streams[r],
                                        video: i.streams[o],
                                        bandwidth: a,
                                        drmInfos: s,
                                        allowedByApplication: !0,
                                        allowedByKeySystem: !0
                                    }, n.push(a)
                        } else
                            for (s = e || i, r = 0; r < s.streams.length; r++) a = s.streams[r].bandwidth, a = {
                                id: t.h++,
                                language: s.language || "und",
                                primary: s.vb,
                                audio: e ? s.streams[r] : null,
                                video: i ? s.streams[r] : null,
                                bandwidth: a,
                                drmInfos: s.drmInfos,
                                allowedByApplication: !0,
                                allowedByKeySystem: !0
                            }, n.push(a)
                }

                function Ri(e, i) {
                    0 > e.l || (e.f = t.setTimeout(e.ie.bind(e), 1e3 * Math.max(Math.max(3, e.l) - i, 0)))
                }

                function Li(t, e, i) {
                    e = e || {
                        contentType: "",
                        mimeType: "",
                        codecs: "",
                        containsEmsgBoxes: !1,
                        frameRate: void 0
                    }, i = i || e.U;
                    var n = Se(t, "BaseURL").map(Ie),
                        r = t.getAttribute("contentType") || e.contentType,
                        a = t.getAttribute("mimeType") || e.mimeType,
                        s = t.getAttribute("codecs") || e.codecs,
                        o = Ae(t, "frameRate", Le) || e.frameRate,
                        u = !!Se(t, "InbandEventStream").length;
                    return r || (r = Ui(a, s)), {
                        U: S(i, n),
                        Ra: ke(t, "SegmentBase") || e.Ra,
                        pa: ke(t, "SegmentList") || e.pa,
                        Sa: ke(t, "SegmentTemplate") || e.Sa,
                        width: Ae(t, "width", Re) || e.width,
                        height: Ae(t, "height", Re) || e.height,
                        contentType: r,
                        mimeType: a,
                        codecs: s,
                        frameRate: o,
                        containsEmsgBoxes: u || e.containsEmsgBoxes,
                        id: t.getAttribute("id")
                    }
                }

                function Mi(t) {
                    var e = 0 + (t.Ra ? 1 : 0);
                    return e += t.pa ? 1 : 0, (e += t.Sa ? 1 : 0) ? (1 != e && (t.Ra && (t.pa = null), t.Sa = null), !0) : "text" == t.contentType || "application" == t.contentType
                }

                function Di(t, e, i, n) {
                    return e = S(e, [i]), e = N(e, t.b.retryParameters), e.method = n, t.a.networkingEngine.request(0, e).then(function(t) {
                        if ("HEAD" == n) {
                            if (!t.headers || !t.headers.date) return 0;
                            t = t.headers.date
                        } else t = G(t.data);
                        return t = Date.parse(t), isNaN(t) ? 0 : t - Date.now()
                    })
                }

                function Oi(t, e, i, n) {
                    i = i.map(function(t) {
                        return {
                            scheme: t.getAttribute("schemeIdUri"),
                            value: t.getAttribute("value")
                        }
                    });
                    var r = t.b.dash.clockSyncUri;
                    return n && !i.length && r && i.push({
                        scheme: "urn:mpeg:dash:utc:http-head:2014",
                        value: r
                    }), b(i, function(t) {
                        var i = t.value;
                        switch (t.scheme) {
                            case "urn:mpeg:dash:utc:http-head:2014":
                            case "urn:mpeg:dash:utc:http-head:2012":
                                return Di(this, e, i, "HEAD");
                            case "urn:mpeg:dash:utc:http-xsdate:2014":
                            case "urn:mpeg:dash:utc:http-iso:2014":
                            case "urn:mpeg:dash:utc:http-xsdate:2012":
                            case "urn:mpeg:dash:utc:http-iso:2012":
                                return Di(this, e, i, "GET");
                            case "urn:mpeg:dash:utc:direct:2014":
                            case "urn:mpeg:dash:utc:direct:2012":
                                return t = Date.parse(i), isNaN(t) ? 0 : t - Date.now();
                            case "urn:mpeg:dash:utc:http-ntp:2014":
                            case "urn:mpeg:dash:utc:ntp:2014":
                            case "urn:mpeg:dash:utc:sntp:2014":
                                return Promise.reject();
                            default:
                                return Promise.reject()
                        }
                    }.bind(t))["catch"](function() {
                        return 0
                    })
                }

                function Ui(t, e) {
                    return bs[ie(t, e)] ? "text" : t.split("/")[0]
                }

                function ji(t, e, i, n) {
                    this.uri = t, this.type = e, this.ga = i, this.segments = n || null
                }

                function Bi(t, e, i, n) {
                    this.id = t, this.name = e, this.a = i, this.value = n || null
                }

                function Fi(t, e) {
                    this.name = t, this.value = e
                }

                function Hi(t, e, i) {
                    return i = i || null, (t = t.getAttribute(e)) ? t.value : i
                }

                function Vi(t, e) {
                    this.ga = e, this.uri = t
                }

                function Ki(t, e) {
                    return t.filter(function(t) {
                        return t.name == e
                    })
                }

                function qi(t, e) {
                    var i = Ki(t, e);
                    return i.length ? i[0] : null
                }

                function Gi(t, e, i) {
                    return t.filter(function(t) {
                        var n = t.getAttribute("TYPE");
                        return t = t.getAttribute("GROUP-ID"), n.value == e && t.value == i
                    })
                }

                function Xi(t) {
                    this.b = t, this.a = 0
                }

                function Yi(t, e) {
                    e.lastIndex = t.a;
                    var i = (i = e.exec(t.b)) ? {
                        position: i.index,
                        length: i[0].length,
                        Td: i
                    } : null;
                    return t.a != t.b.length && i && i.position == t.a ? (t.a += i.length, i.Td) : null
                }

                function Wi(t) {
                    return t.a == t.b.length ? null : (t = Yi(t, /[^ \t\n]*/gm)) ? t[0] : null
                }

                function zi() {
                    this.a = 0
                }

                function $i(t, e, i) {
                    e = G(e), e = e.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n").trim();
                    var n = e.split(/\n+/m);
                    if (!/^#EXTM3U($|[ \t\n])/m.test(n[0])) throw new u(2, 4, 4015);
                    e = 0;
                    for (var r = [], a = 1; a < n.length;)
                        if (/^#(?!EXT)/m.test(n[a])) a += 1;
                        else {
                            var s = n[a];
                            if (s = Qi(t.a++, s), 0 <= js.indexOf(s.name)) e = 1;
                            else if (0 <= Bs.indexOf(s.name)) {
                                if (1 != e) throw new u(2, 4, 4017);
                                return n = n.splice(a, n.length - a), t = Ji(t, n), new ji(i, e, r, t)
                            }
                            r.push(s), a += 1, "EXT-X-STREAM-INF" == s.name && (s.a.push(new Fi("URI", n[a])), a += 1)
                        }
                    return new ji(i, e, r)
                }

                function Ji(t, e) {
                    var i = [],
                        n = [];
                    return e.forEach(function(t) {
                        /^(#EXT)/.test(t) ? (t = Qi(this.a++, t), n.push(t)) : /^#(?!EXT)/m.test(t) || (i.push(new Vi(t.trim(), n)), n = [])
                    }.bind(t)), i
                }

                function Qi(t, e) {
                    var i = e.match(/^#(EXT[^:]*)(?::(.*))?$/);
                    if (!i) throw new u(2, 4, 4016);
                    var n = i[1],
                        r = i[2],
                        i = [];
                    if (r && 0 <= r.indexOf("="))
                        for (var a, r = new Xi(r), s = /([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g; a = Yi(r, s);) i.push(new Fi(a[1], a[2] || a[3]));
                    else if (r) return new Bi(t, n, i, r);
                    return new Bi(t, n, i)
                }

                function Zi(t) {
                    return new Promise(function(e) {
                        var i = Zi.parse(t);
                        e({
                            uri: t,
                            data: i.data,
                            headers: {
                                "content-type": i.contentType
                            }
                        })
                    })
                }

                function tn() {
                    this.b = this.c = null, this.i = 1, this.g = {}, this.f = {}, this.a = null, this.j = "", this.h = new zi
                }

                function en(t, e, i) {
                    if (e = $i(t.h, e, i), 0 != e.type) throw new u(2, 4, 4022);
                    return t.a = new Si(null, 0), nn(t, e).then(function(t) {
                        return this.c.filterPeriod(t), {
                            presentationTimeline: this.a,
                            periods: [t],
                            offlineSessionIds: [],
                            minBufferTime: 0
                        }
                    }.bind(t))
                }

                function nn(t, e) {
                    var i = Ki(e.ga, "EXT-X-STREAM-INF").map(function(t) {
                            return rn(this, t, e)
                        }.bind(t)),
                        n = Ki(e.ga, "EXT-X-MEDIA").filter(function(t) {
                            return "SUBTITLES" == vn(t, "TYPE")
                        }.bind(t)).map(function(t) {
                            return on(this, t, e)
                        }.bind(t));
                    return Promise.all(i).then(function(t) {
                        return Promise.all(n).then(function(e) {
                            var i = t.reduce(y, []);
                            return ln(this, i), {
                                startTime: 0,
                                variants: i,
                                textStreams: e
                            }
                        }.bind(this))
                    }.bind(t))
                }

                function rn(t, e, i) {
                    var n = Number(vn(e, "BANDWIDTH")),
                        r = Hi(e, "CODECS", "avc1.42E01E,mp4a.40.2").split(","),
                        a = e.getAttribute("RESOLUTION"),
                        s = null,
                        o = null,
                        u = Hi(e, "FRAME-RATE");
                    if (a) var h = a.value.split("x"),
                        s = h[0],
                        o = h[1];
                    var c = mn(t, i);
                    i = Ki(i.ga, "EXT-X-MEDIA");
                    var d = Hi(e, "AUDIO"),
                        l = Hi(e, "VIDEO");
                    d ? i = Gi(i, "AUDIO", d) : l && (i = Gi(i, "VIDEO", l)), i = i.map(function(t) {
                        return un(this, t, r, c)
                    }.bind(t));
                    var f = [],
                        p = [];
                    return Promise.all(i).then(function(t) {
                        if (d ? f = t : l && (p = t), f.length || p.length)
                            if (f.length)
                                if (vn(e, "URI") == f[0].Od) {
                                    t = "audio";
                                    var i = !0
                                } else t = "video";
                            else t = "audio";
                        else i = !1, 1 == r.length ? t = a || u ? "video" : "audio" : (t = "video", r = [r.join(",")]);
                        if (i) i = Promise.resolve();
                        else {
                            i = r;
                            var n = vn(e, "URI");
                            i = hn(this, n, i, t, c, "und", !1, null)
                        }
                        return i
                    }.bind(t)).then(function(t) {
                        return t && ("audio" == t.stream.type ? f = [t] : p = [t]), an(this, f, p, n, s, o, u)
                    }.bind(t))
                }

                function an(t, e, i, n, r, a, s) {
                    i.forEach(function(t) {
                        (t = t.stream) && (t.width = Number(r) || void 0, t.height = Number(a) || void 0, t.frameRate = Number(s) || void 0)
                    }.bind(t)), e.length || (e = [null]), i.length || (i = [null]);
                    for (var o = [], u = 0; u < e.length; u++)
                        for (var h = 0; h < i.length; h++) {
                            var c = e[u] ? e[u].stream : null,
                                d = i[h] ? i[h].stream : null,
                                l = e[u] ? e[u].drmInfos : null,
                                f = i[h] ? i[h].drmInfos : null;
                            if (c && d) {
                                if (!(l.length && f.length ? 0 < Tt(l, f).length : 1)) continue;
                                var p = Tt(l, f)
                            } else c ? p = l : d && (p = f);
                            o.push(sn(t, c, d, n, p))
                        }
                    return o
                }

                function sn(t, e, i, n, r) {
                    return {
                        id: t.i++,
                        language: e ? e.language : "und",
                        primary: !!e && e.primary || !!i && i.primary,
                        audio: e,
                        video: i,
                        bandwidth: n,
                        drmInfos: r,
                        allowedByApplication: !0,
                        allowedByKeySystem: !0
                    }
                }

                function on(t, e, i) {
                    return vn(e, "TYPE"), i = mn(t, i), un(t, e, [], i).then(function(t) {
                        return t.stream
                    })
                }

                function un(t, e, i, n) {
                    if (t.g[e.id]) return Promise.resolve().then(function() {
                        return this.g[e.id]
                    }.bind(t));
                    var r = vn(e, "TYPE").toLowerCase();
                    "subtitles" == r && (r = "text");
                    var a = Vt(Hi(e, "LANGUAGE", "und")),
                        s = Hi(e, "NAME"),
                        o = e.getAttribute("DEFAULT"),
                        u = e.getAttribute("AUTOSELECT"),
                        h = vn(e, "URI");
                    return hn(t, h, i, r, n, a, !!o || !!u, s).then(function(t) {
                        return this.g[e.id] = t
                    }.bind(t))
                }

                function hn(t, e, i, n, r, a, s, o) {
                    var h = e;
                    return e = S([t.j], [e])[0], t.c.networkingEngine.request(0, N([e], t.b.retryParameters)).then(function(t) {
                        if (t = $i(this.h, t.data, t.uri), 1 != t.type) throw new u(2, 4, 4017);
                        r = mn(this, t) || r;
                        var e = null;
                        "text" != n && (e = cn(t));
                        var c = qi(t.ga, "EXT-X-MEDIA-SEQUENCE"),
                            c = dn(this, t, c ? Number(c.value) : 0);
                        this.a.Ia(0, c);
                        var d = c[c.length - 1].endTime - c[0].startTime,
                            l = this.a.Y();
                        (1 / 0 == l || l < d) && this.a.qa(d);
                        var f = fn(n, i),
                            p = void 0;
                        "text" == n && (p = "subtitle");
                        var m = new Ze(c),
                            v = [];
                        t.segments.forEach(function(t) {
                            t = Ki(t.ga, "EXT-X-KEY"), v.push.apply(v, t)
                        });
                        var g = !1,
                            b = [],
                            y = null;
                        if (v.forEach(function(t) {
                            if ("NONE" != vn(t, "METHOD")) {
                                g = !0;
                                var e = vn(t, "KEYFORMAT");
                                (t = (e = qs[e]) ? e(t) : null) && (t.keyIds.length && (y = t.keyIds[0]), b.push(t))
                            }
                        }), g && !b.length) throw new u(2, 4, 4026);
                        return pn(this, n, c[0].a()[0]).then(function(t) {
                            return t = {
                                id: this.i++,
                                createSegmentIndex: Promise.resolve.bind(Promise),
                                findSegmentPosition: m.find.bind(m),
                                getSegmentReference: m.get.bind(m),
                                initSegmentReference: e,
                                presentationTimeOffset: r || 0,
                                mimeType: t,
                                codecs: f,
                                kind: p,
                                encrypted: g,
                                keyId: y,
                                language: a,
                                label: o || null,
                                type: n,
                                primary: s,
                                trickModeVideo: null,
                                containsEmsgBoxes: !1,
                                frameRate: void 0,
                                width: void 0,
                                height: void 0,
                                bandwidth: void 0,
                                roles: []
                            }, this.f[t.id] = m, {
                                stream: t,
                                Be: m,
                                drmInfos: b,
                                Od: h
                            }
                        }.bind(this))
                    }.bind(t))
                }

                function cn(t) {
                    var e = Ki(t.ga, "EXT-X-MAP");
                    if (!e.length) return null;
                    if (1 < e.length) throw new u(2, 4, 4020);
                    var e = e[0],
                        i = vn(e, "URI"),
                        n = S([t.uri], [i])[0];
                    return t = 0, i = null, (e = Hi(e, "BYTERANGE")) && (t = e.split("@"), e = Number(t[0]), t = Number(t[1]), i = t + e - 1), new Ve(function() {
                        return [n]
                    }, t, i)
                }

                function dn(t, e, i) {
                    var n = e.segments,
                        r = [];
                    return n.forEach(function(t) {
                        var a, s = t.ga,
                            o = S([e.uri], [t.uri])[0],
                            u = gn(s).value.split(","),
                            u = Number(u[0]);
                        a = (t = n.indexOf(t)) ? r[t - 1].endTime : 0;
                        var u = a + u,
                            h = 0,
                            c = null;
                        (s = qi(s, "EXT-X-BYTERANGE")) && (s = s.value.split("@"), c = Number(s[0]), h = s[1] ? Number(s[1]) : r[t - 1].M, c = h + c - 1, t == n.length - 1 && (c = null)), r.push(new Ke(i + t, a, u, function() {
                            return [o]
                        }, h, c))
                    }.bind(t)), r
                }

                function ln(t, e) {
                    e.forEach(function(t) {
                        var e = this.a.Y(),
                            i = t.video;
                        t = t.audio, i && this.f[i.id] && ti(this.f[i.id], e), t && this.f[t.id] && ti(this.f[t.id], e)
                    }.bind(t))
                }

                function fn(t, e) {
                    if (1 == e.length) return e[0];
                    if ("text" == t) return "";
                    var i = Fs;
                    "audio" == t && (i = Hs);
                    for (var n = 0; n < i.length; n++)
                        for (var r = 0; r < e.length; r++)
                            if (i[n].test(e[r].trim())) return e[r].trim();
                    throw new u(2, 4, 4025, e)
                }

                function pn(t, e, i) {
                    var n = i.split("."),
                        r = n[n.length - 1];
                    return "text" == e ? Promise.resolve("text/vtt") : (n = Vs, "video" == e && (n = Ks), (e = n[r]) ? Promise.resolve(e) : (i = N([i], t.b.retryParameters), i.method = "HEAD", t.c.networkingEngine.request(1, i).then(function(t) {
                        if (t = t.headers["content-type"], !t) throw new u(2, 4, 4021, r);
                        return t
                    })))
                }

                function mn(t, e) {
                    var i = qi(e.ga, "EXT-X-START");
                    return i ? Number(vn(i, "TIME-OFFSET")) : t.b.hls.defaultTimeOffset
                }

                function vn(t, e) {
                    var i = t.getAttribute(e);
                    if (!i) throw new u(2, 4, 4023, e);
                    return i.value
                }

                function gn(t) {
                    if (t = qi(t, "EXTINF"), !t) throw new u(2, 4, 4024, "EXTINF");
                    return t
                }

                function bn() {}

                function yn(t) {
                    var e = [];
                    if (!t) return e;
                    for (var i = t.childNodes, n = 0; n < i.length; n++) {
                        var r = "span" == i[n].nodeName && "p" == t.nodeName;
                        i[n].nodeType != Node.ELEMENT_NODE || "br" == i[n].nodeName || r || (r = yn(i[n]), e = e.concat(r))
                    }
                    return e.length || e.push(t), e
                }

                function Tn(t, e) {
                    for (var i = t.childNodes, n = 0; n < i.length; n++)
                        if ("br" == i[n].nodeName && 0 < n) i[n - 1].textContent += "\n";
                        else if (0 < i[n].childNodes.length) Tn(i[n], e);
                        else if (e) {
                            var r = i[n].textContent.trim(),
                                r = r.replace(/\s+/g, " ");
                            i[n].textContent = r
                        }
                }

                function wn(t, e, i, n) {
                    for (var r = yn(e), a = 0; a < r.length; a++) {
                        var s = r[a].getAttribute(n);
                        if (s) return s
                    }
                    return r = En, (t = r(e, "style", i) || r(t, "style", i)) ? t.getAttribute(n) : null
                }

                function En(t, e, i) {
                    if (!t || 1 > i.length) return null;
                    var n = null,
                        r = t;
                    for (t = null; r && !(t = r.getAttribute(e)) && (r = r.parentNode, r instanceof Element););
                    if (e = t)
                        for (t = 0; t < i.length; t++)
                            if (i[t].getAttribute("xml:id") == e) {
                                n = i[t];
                                break
                            }
                    return n
                }

                function kn(t, e) {
                    var i = null;
                    if (Gs.test(t)) var i = Gs.exec(t),
                        n = Number(i[1]),
                        r = Number(i[2]),
                        a = Number(i[3]),
                        s = Number(i[4]),
                        s = s + (Number(i[5]) || 0) / e.b,
                        a = a + s / e.frameRate,
                        i = a + 60 * r + 3600 * n;
                    else Xs.test(t) ? i = Sn(Xs, t) : Ys.test(t) ? i = Sn(Ys, t) : Ws.test(t) ? (i = Ws.exec(t), i = Number(i[1]) / e.frameRate) : zs.test(t) ? (i = zs.exec(t), i = Number(i[1]) / e.a) : $s.test(t) && (i = Sn($s, t));
                    return i
                }

                function Sn(t, e) {
                    var i = t.exec(e);
                    return i && "" != i[0] ? (Number(i[4]) || 0) / 1e3 + (Number(i[3]) || 0) + 60 * (Number(i[2]) || 0) + 3600 * (Number(i[1]) || 0) : null
                }

                function In(t, e, i, n) {
                    this.frameRate = Number(t) || 30, this.b = Number(e) || 1, this.a = Number(n), this.a || (this.a = t ? this.frameRate * this.b : 1), i && (t = /^(\d+) (\d+)$/g.exec(i)) && (this.frameRate *= t[1] / t[2])
                }

                function An() {
                    this.a = new bn
                }

                function xn() {}

                function _n(t, e) {
                    var i;
                    (i = /^align:(start|middle|center|end|left|right)$/.exec(e)) ? (t.align = i[1], "center" == i[1] && "center" != t.align && (t.position = "auto", t.align = "middle")) : (i = /^vertical:(lr|rl)$/.exec(e)) ? t.vertical = i[1]: (i = /^size:(\d{1,2}|100)%$/.exec(e)) ? t.size = Number(i[1]) : (i = /^position:(\d{1,2}|100)%(?:,(line-left|line-right|center|start|end))?$/.exec(e)) ? (t.position = Number(i[1]), i[2] && (t.positionAlign = i[2])) : (i = /^line:(\d{1,2}|100)%(?:,(start|end|center))?$/.exec(e)) ? (t.snapToLines = !1, t.line = Number(i[1]), i[2] && (t.lineAlign = i[2])) : (i = /^line:(-?\d+)(?:,(start|end|center))?$/.exec(e)) && (t.snapToLines = !0, t.line = Number(i[1]), i[2] && (t.lineAlign = i[2]))
                }

                function Pn(t) {
                    if (t = Yi(t, /(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3})/g), !t) return null;
                    var e = Number(t[2]),
                        i = Number(t[3]);
                    return 59 < e || 59 < i ? null : Number(t[4]) / 1e3 + i + 60 * e + 3600 * (Number(t[1]) || 0)
                }

                function Cn() {
                    this.a = null
                }

                function Nn(t, e, i) {
                    var n, r, a;
                    return (new Xe).C("payl", ze(function(t) {
                        n = G(t)
                    })).C("iden", ze(function(t) {
                        r = G(t)
                    })).C("sttg", ze(function(t) {
                        a = G(t)
                    })).parse(t), n ? Rn(n, r, a, e, i) : null
                }

                function Rn(t, e, i, n, r) {
                    if ((t = kt(n, r, t)) && e && (t.id = e), t && i)
                        for (e = new Xi(i), i = Wi(e); i;) _n(t, i), Yi(e, /[ \t]+/gm), i = Wi(e);
                    return t
                }

                function Ln(t, e, i, n, r, a) {
                    this.a = t, this.c = e, this.l = i, this.B = n, this.O = r, this.J = a, this.b = new D, this.h = !1, this.g = 1, this.j = this.f = null, this.G = t.readyState, this.i = !1, this.v = this.A = -1, this.o = !1, 0 < t.readyState ? this.fc() : U(this.b, t, "loadedmetadata", this.fc.bind(this)), e = this.hc.bind(this), O(this.b, t, "ratechange", this.rd.bind(this)), O(this.b, t, "waiting", e), this.j = setInterval(e, 250)
                }

                function Mn(t, e) {
                    0 < t.a.readyState ? t.a.currentTime = Fn(t, e) : t.B = e
                }

                function Dn(t) {
                    return 0 < t.a.readyState ? Fn(t, t.a.currentTime) : On(t)
                }

                function On(t) {
                    return t.B ? Fn(t, t.B) : (t = t.c.presentationTimeline, 1 / 0 > t.Y() ? t.na() : t.cb())
                }

                function Un(e, i) {
                    null != e.f && (t.clearInterval(e.f), e.f = null), e.g = i, e.a.playbackRate = e.h || 0 > i ? 0 : i, !e.h && 0 > i && (e.f = t.setInterval(function() {
                        this.a.currentTime += i / 4
                    }.bind(e), 250))
                }

                function jn(t, e) {
                    var i = _t.bind(null, t.a.buffered),
                        n = 1 * Math.max(t.c.minBufferTime || 0, t.l.rebufferingGoal),
                        r = t.c.presentationTimeline,
                        a = r.va(),
                        s = r.Fa(n),
                        o = r.Fa(5),
                        n = r.Fa(n + 5);
                    return e > a ? a : e < r.Fa(0) ? i(o) ? o : n : e >= s || i(e) ? e : n
                }

                function Bn(t, e, i) {
                    t.a.currentTime = i;
                    var n = 0,
                        r = function() {
                            !this.a || 10 <= n++ || this.a.currentTime != e || (this.a.currentTime = i, setTimeout(r, 100))
                        }.bind(t);
                    setTimeout(r, 100)
                }

                function Fn(t, e) {
                    var i = t.c.presentationTimeline.na();
                    return e < i ? i : (i = t.c.presentationTimeline.va(), e > i ? i : e)
                }

                function Hn(t, e, i, n, r, a) {
                    this.a = t, this.g = e, this.A = i, this.l = n, this.h = r, this.B = a, this.c = [], this.j = new D, this.b = !1, this.i = -1, this.f = null, Kn(this)
                }

                function Vn(t) {
                    var e = x(t);
                    return e.eventElement = t.eventElement, e
                }

                function Kn(e) {
                    qn(e), e.f = t.setTimeout(e.G.bind(e), 250)
                }

                function qn(e) {
                    e.f && (t.clearTimeout(e.f), e.f = null)
                }

                function Gn(t, e) {
                    this.a = e, this.b = t, this.g = null, this.i = 1, this.o = Promise.resolve(), this.h = [], this.j = {}, this.c = {}, this.f = this.l = this.v = !1
                }

                function Xn(t) {
                    return t.b.periods[ne(t.b, Dn(t.a.Pa))]
                }

                function Yn(t) {
                    return V(t.c, function(t) {
                        return t.oa || t.stream
                    })
                }

                function Wn(t, e) {
                    var i = {};
                    return i.text = e, Zn(t, i)
                }

                function zn(t, e) {
                    var i = t.c.video;
                    if (i) {
                        var n = i.stream;
                        if (n)
                            if (e) {
                                var r = n.trickModeVideo;
                                if (r) {
                                    var a = i.oa;
                                    a || ($n(t, "video", r, !1), i.oa = n)
                                }
                            } else(a = i.oa) && (i.oa = null, $n(t, "video", a, !0))
                    }
                }

                function $n(t, e, i, n) {
                    var r = t.c[e];
                    if (!r && "text" == e && t.g.ignoreTextStreamFailures) Wn(t, i);
                    else if (r) {
                        var a = re(t.b, i);
                        n && a != r.xa ? Qn(t) : (r.oa && (i.trickModeVideo ? (r.oa = i, i = i.trickModeVideo) : r.oa = null), (a = t.h[a]) && a.Ma && (a = t.j[i.id]) && a.Ma && r.stream != i && ("text" == e && Rt(t.a.K, ie(i.mimeType, i.codecs)), r.stream = i, r.eb = !0, n && (r.ta ? r.kb = !0 : r.ya ? (r.sa = !0, r.kb = !0) : (vr(r), pr(t, r, !0)))))
                    }
                }

                function Jn(t) {
                    var e = Dn(t.a.Pa);
                    Object.keys(t.c).every(function(t) {
                        var i = this.a.K;
                        return "text" == t ? (t = i.a, t = e >= t.b && e < t.a) : (t = Mt(i, t), t = _t(t, e)), t
                    }.bind(t)) || Qn(t)
                }

                function Qn(t) {
                    for (var e in t.c) {
                        var i = t.c[e];
                        i.ta || i.sa || (i.ya ? i.sa = !0 : null == Lt(t.a.K, e) ? null == i.ra && mr(t, i, 0) : (vr(i), pr(t, i, !1)))
                    }
                }

                function Zn(t, e, i) {
                    var n = ne(t.b, Dn(t.a.Pa)),
                        r = V(e, function(t) {
                            return ie(t.mimeType, t.codecs)
                        });
                    return t.a.K.init(r), ir(t), r = H(e), er(t, r).then(function() {
                        if (!this.f)
                            for (var t in e) {
                                var r = e[t];
                                this.c[t] || (this.c[t] = {
                                    stream: r,
                                    type: t,
                                    Ga: null,
                                    ea: null,
                                    oa: null,
                                    eb: !0,
                                    xa: n,
                                    endOfStream: !1,
                                    ya: !1,
                                    ra: null,
                                    sa: !1,
                                    kb: !1,
                                    ta: !1,
                                    Gb: !1,
                                    tb: !1,
                                    rc: i || 0
                                }, mr(this, this.c[t], 0))
                            }
                    }.bind(t))
                }

                function tr(t, e) {
                    var i = t.h[e];
                    if (i) return i.L;
                    i = {
                        L: new _,
                        Ma: !1
                    }, t.h[e] = i;
                    var n = t.b.periods[e].variants.map(function(t) {
                        var e = [];
                        return t.audio && e.push(t.audio), t.video && e.push(t.video), t.video && t.video.trickModeVideo && e.push(t.video.trickModeVideo), e
                    }).reduce(y, []).filter(k);
                    return n.push.apply(n, t.b.periods[e].textStreams), t.o = t.o.then(function() {
                        if (!this.f) return er(this, n)
                    }.bind(t)).then(function() {
                        this.f || (this.h[e].L.resolve(), this.h[e].Ma = !0)
                    }.bind(t))["catch"](function(t) {
                        this.f || (this.h[e].L.reject(), delete this.h[e], this.a.onError(t))
                    }.bind(t)), i.L
                }

                function er(t, e) {
                    e.map(function(t) {
                        return t.id
                    }).filter(k);
                    for (var i = [], n = 0; n < e.length; ++n) {
                        var r = e[n],
                            a = t.j[r.id];
                        a ? i.push(a.L) : (t.j[r.id] = {
                            L: new _,
                            Ma: !1
                        }, i.push(r.createSegmentIndex()))
                    }
                    return Promise.all(i).then(function() {
                        if (!this.f)
                            for (var t = 0; t < e.length; ++t) {
                                var i = this.j[e[t].id];
                                i.Ma || (i.L.resolve(), i.Ma = !0)
                            }
                    }.bind(t))["catch"](function(t) {
                        if (!this.f) return this.j[r.id].L.reject(), delete this.j[r.id], Promise.reject(t)
                    }.bind(t))
                }

                function ir(t) {
                    var e = t.b.presentationTimeline.Y();
                    1 / 0 > e ? t.a.K.qa(e) : t.a.K.qa(Math.pow(2, 32))
                }

                function nr(t, e) {
                    var i = Dn(t.a.Pa),
                        n = e.Ga && e.ea ? t.b.periods[re(t.b, e.Ga)].startTime + e.ea.endTime : Math.max(i, e.rc),
                        r = re(t.b, e.stream),
                        a = ne(t.b, n),
                        s = t.a.K,
                        o = e.type;
                    return "text" == o ? (s = s.a, s = null == s.a || s.a < i ? 0 : s.a - Math.max(i, s.b)) : (s = Mt(s, o), s = Pt(s, i)), o = Math.max(t.i * Math.max(t.b.minBufferTime || 0, t.g.rebufferingGoal), t.i * t.g.bufferingGoal), n >= t.b.presentationTimeline.Y() ? (e.endOfStream = !0, null) : (e.endOfStream = !1, e.xa = a, a != r ? null : s >= o ? .5 : (n = t.a.K, a = e.type, n = "text" == a ? n.a.a : xt(Mt(n, a)), e.ea && e.stream == e.Ga ? (a = e.ea.position + 1, n = rr(t, e, r, a)) : (a = e.ea ? e.stream.findSegmentPosition(Math.max(0, t.b.periods[re(t.b, e.Ga)].startTime + e.ea.endTime - t.b.periods[r].startTime)) : e.stream.findSegmentPosition(Math.max(0, (n || i) - t.b.periods[r].startTime)), null == a ? n = null : (s = null, null == n && (s = rr(t, e, r, Math.max(0, a - 1))), n = s || rr(t, e, r, a))), n ? (e.rc = 0, ar(t, e, i, r, n), null) : 1))
                }

                function rr(t, e, i, n) {
                    return i = t.b.periods[i], (e = e.stream.getSegmentReference(n)) ? (t = t.b.presentationTimeline, n = t.va(), i.startTime + e.endTime < t.na() || i.startTime + e.startTime > n ? null : e) : null
                }

                function ar(t, e, i, n, r) {
                    var a = t.b.periods[n],
                        s = e.stream,
                        o = t.b.periods[n + 1],
                        u = null,
                        u = o ? o.startTime : t.b.presentationTimeline.Y();
                    n = or(t, e, n, u), e.ya = !0, e.eb = !1, o = fr(t, r), Promise.all([n, o]).then(function(t) {
                        if (!this.f && !this.l) return ur(this, e, i, a, s, r, t[1])
                    }.bind(t)).then(function() {
                        this.f || this.l || (e.ya = !1, e.Gb = !1, e.sa || this.a.Ab(), mr(this, e, 0), cr(this, s))
                    }.bind(t))["catch"](function(t) {
                        this.f || this.l || (e.ya = !1, this.b.presentationTimeline.$() && this.g.infiniteRetriesForLiveStreams && (1001 == t.code || 1002 == t.code || 1003 == t.code) ? "text" == e.type && this.g.ignoreTextStreamFailures && 1001 == t.code ? delete this.c.text : (t.severity = 1, this.a.onError(t), mr(this, e, 4)) : 3017 == t.code ? sr(this, e, t) : "text" == e.type && this.g.ignoreTextStreamFailures ? delete this.c.text : (e.tb = !0, t.severity = 2, this.a.onError(t)))
                    }.bind(t))
                }

                function sr(t, e, i) {
                    if (!H(t.c).some(function(t) {
                        return t != e && t.Gb
                    })) {
                        var n = Math.round(100 * t.i);
                        if (20 < n) t.i -= .2;
                        else {
                            if (!(4 < n)) return e.tb = !0, t.l = !0, void t.a.onError(i);
                            t.i -= .04
                        }
                        e.Gb = !0
                    }
                    mr(t, e, 4)
                }

                function or(t, e, i, n) {
                    return e.eb ? (i = Ut(t.a.K, e.type, t.b.periods[i].startTime - e.stream.presentationTimeOffset, n), e.stream.initSegmentReference ? (t = fr(t, e.stream.initSegmentReference).then(function(t) {
                        if (!this.f) return Dt(this.a.K, e.type, t, null, null)
                    }.bind(t))["catch"](function(t) {
                        return e.eb = !0, Promise.reject(t);
                    }), Promise.all([i, t])) : i) : Promise.resolve()
                }

                function ur(t, e, i, n, r, a, s) {
                    return r.containsEmsgBoxes && (new Xe).da("emsg", t.Ed.bind(t, n, a)).parse(s), hr(t, e, i).then(function() {
                        if (!this.f) return Dt(this.a.K, e.type, s, a.startTime + n.startTime, a.endTime + n.startTime)
                    }.bind(t)).then(function() {
                        if (!this.f) return e.Ga = r, e.ea = a, Promise.resolve()
                    }.bind(t))
                }

                function hr(t, e, i) {
                    var n = Lt(t.a.K, e.type);
                    return null == n ? Promise.resolve() : (i = i - n - t.g.bufferBehind, 0 >= i ? Promise.resolve() : t.a.K.remove(e.type, n, n + i).then(function() {}.bind(t)))
                }

                function cr(t, e) {
                    if (!t.v && (t.v = H(t.c).every(function(t) {
                        return "text" == t.type || !t.sa && !t.ta && t.ea
                    }), t.v)) {
                        var i = re(t.b, e);
                        for (t.h[i] || tr(t, i).then(function() {
                            this.a.ac()
                        }.bind(t))["catch"](T), i = 0; i < t.b.periods.length; ++i) tr(t, i)["catch"](T);
                        t.a.wd && t.a.wd()
                    }
                }

                function dr(t, e) {
                    if (e.xa != re(t.b, e.stream)) {
                        var i = e.xa,
                            n = H(t.c);
                        n.every(function(t) {
                            return t.xa == i
                        }) && n.every(lr) && tr(t, i).then(function() {
                            if (!this.f && n.every(function(t) {
                                var e = re(this.b, t.stream);
                                return lr(t) && t.xa == i && e != i
                            }.bind(this))) {
                                var t, e = this.b.periods[i],
                                    r = this.a.bc(e);
                                for (t in this.c)
                                    if (!r[t] && "text" != t) return void this.a.onError(new u(2, 5, 5005));
                                for (t in r)
                                    if (!this.c[t]) {
                                        if ("text" != t) return void this.a.onError(new u(2, 5, 5005));
                                        Zn(this, {
                                            text: r.text
                                        }, e.startTime), delete r[t]
                                    }
                                for (t in this.c)(e = r[t]) ? ($n(this, t, e, !1), mr(this, this.c[t], 0)) : delete this.c[t];
                                this.a.ac()
                            }
                        }.bind(t))["catch"](T)
                    }
                }

                function lr(t) {
                    return !t.ya && null == t.ra && !t.sa && !t.ta
                }

                function fr(t, e) {
                    var i = N(e.a(), t.g.retryParameters);
                    if (e.X || null != e.M) {
                        var n = "bytes=" + e.X + "-";
                        null != e.M && (n += e.M), i.headers.Range = n
                    }
                    return t.a.dd.request(1, i).then(function(t) {
                        return t.data
                    })
                }

                function pr(t, e, i) {
                    e.sa = !1, e.kb = !1, e.ta = !0, Ot(t.a.K, e.type).then(function() {
                        if (!this.f && i) {
                            var t = this.a.K,
                                n = e.type;
                            return "text" == n ? Promise.resolve() : jt(t, n, t.Oc.bind(t, n))
                        }
                    }.bind(t)).then(function() {
                        this.f || (e.Ga = null, e.ea = null, e.ta = !1, e.endOfStream = !1, mr(this, e, 0))
                    }.bind(t))
                }

                function mr(e, i, n) {
                    i.ra = t.setTimeout(e.le.bind(e, i), 1e3 * n)
                }

                function vr(e) {
                    null != e.ra && (t.clearTimeout(e.ra), e.ra = null)
                }

                function gr(t, e) {
                    return new Promise(function(i, n) {
                        var r = new XMLHttpRequest;
                        r.open(e.method, t, !0), r.responseType = "arraybuffer", r.timeout = e.retryParameters.timeout, r.withCredentials = e.allowCrossSiteCredentials, r.onload = function(e) {
                            e = e.target;
                            var r = e.getAllResponseHeaders().split("\r\n").reduce(function(t, e) {
                                var i = e.split(": ");
                                return t[i[0].toLowerCase()] = i.slice(1).join(": "), t
                            }, {});
                            if (200 <= e.status && 299 >= e.status && 202 != e.status) e.responseURL && (t = e.responseURL), i({
                                uri: t,
                                data: e.response,
                                headers: r,
                                fromCache: !!r["x-shaka-from-cache"]
                            });
                            else {
                                var a = null;
                                try {
                                    a = Y(e.response)
                                } catch (s) {}
                                n(new u(401 == e.status || 403 == e.status ? 2 : 1, 1, 1001, t, e.status, a, r))
                            }
                        }, r.onerror = function() {
                            n(new u(1, 1, 1002, t))
                        }, r.ontimeout = function() {
                            n(new u(1, 1, 1003, t))
                        };
                        for (var a in e.headers) r.setRequestHeader(a, e.headers[a]);
                        r.send(e.body)
                    })
                }

                function br() {
                    this.a = null, this.b = [], this.c = {}
                }

                function yr(t, e, i) {
                    return Er(t, e, "readwrite", function(t) {
                        t.put(i)
                    })
                }

                function Tr(t, e, i) {
                    return Er(t, "segment", "readwrite", function(t) {
                        for (var n = 0; n < e.length; n++) t["delete"](e[n]).onsuccess = i || function() {}
                    })
                }

                function wr(t, e) {
                    var i = 0;
                    return Er(t, e, "readonly", function(t) {
                        t.openCursor(null, "prev").onsuccess = function(t) {
                            (t = t.target.result) && (i = t.key + 1)
                        }
                    }).then(function() {
                        return i
                    })
                }

                function Er(t, e, i, n) {
                    var r = {
                        transaction: t.a.transaction([e], i),
                        L: new _
                    };
                    return r.transaction.oncomplete = function() {
                        this.b.splice(this.b.indexOf(r), 1), r.L.resolve()
                    }.bind(t), r.transaction.onabort = function(t) {
                        this.b.splice(this.b.indexOf(r), 1), Sr(r.transaction, r.L, t)
                    }.bind(t), r.transaction.onerror = function(t) {
                        t.preventDefault()
                    }.bind(t), e = r.transaction.objectStore(e), n(e), t.b.push(r), r.L
                }

                function kr(e, i, n) {
                    var r = t.indexedDB.open("shaka_offline_db", 1),
                        a = !1,
                        s = new _;
                    return r.onupgradeneeded = function(t) {
                        a = !0, t = t.target.result;
                        for (var e in i) t.createObjectStore(e, {
                            keyPath: i[e]
                        })
                    }, r.onsuccess = function(t) {
                        n && !a ? (t.target.result.close(), setTimeout(function() {
                            kr(this, i, n - 1).then(s.resolve, s.reject)
                        }.bind(this), 1e3)) : (this.a = t.target.result, s.resolve())
                    }.bind(e), r.onerror = Sr.bind(null, r, s), s
                }

                function Sr(t, e, i) {
                    t.error ? e.reject(new u(2, 9, 9001, t.error)) : e.reject(new u(2, 9, 9002)), i.preventDefault()
                }

                function Ir(t) {
                    var e = Ar(t.periods[0], [], new Si(null, 0)),
                        i = Yt(e, null, null),
                        e = Wt(e, null);
                    return i.push.apply(i, e), {
                        offlineUri: "offline:" + t.key,
                        originalManifestUri: t.originalManifestUri,
                        duration: t.duration,
                        size: t.size,
                        expiration: void 0 == t.expiration ? 1 / 0 : t.expiration,
                        tracks: i,
                        appMetadata: t.appMetadata
                    }
                }

                function Ar(t, e, i) {
                    var n = t.streams.filter(function(t) {
                            return "text" == t.contentType
                        }),
                        r = t.streams.filter(function(t) {
                            return "audio" == t.contentType
                        }),
                        a = t.streams.filter(function(t) {
                            return "video" == t.contentType
                        });
                    return e = _r(r, a, e), n = n.map(Cr), t.streams.forEach(function(t) {
                        t = xr(t), i.Ia(0, t)
                    }), {
                        startTime: t.startTime,
                        variants: e,
                        textStreams: n
                    }
                }

                function xr(t) {
                    return t.segments.map(function(t, e) {
                        return new Ke(e, t.startTime, t.endTime, function() {
                            return [t.uri]
                        }, 0, null)
                    })
                }

                function _r(t, e, i) {
                    var n = [];
                    if (!t.length && !e.length) return n;
                    t.length ? e.length || (e = [null]) : t = [null];
                    for (var r = 0, a = 0; a < t.length; a++)
                        for (var s = 0; s < e.length; s++)
                            if (Pr(t[a], e[s])) {
                                var o = t[a],
                                    u = e[s],
                                    h = i;
                                o = {
                                    id: r++,
                                    language: o ? o.language : "",
                                    primary: !!o && o.primary || !!u && u.primary,
                                    audio: Cr(o),
                                    video: Cr(u),
                                    bandwidth: 0,
                                    drmInfos: h,
                                    allowedByApplication: !0,
                                    allowedByKeySystem: !0
                                }, n.push(o)
                            }
                    return n
                }

                function Pr(t, e) {
                    if (!(t && e && t.variantIds && e.variantIds)) return !0;
                    for (var i = 0; i < t.variantIds.length; i++)
                        if (e.variantIds.some(function(e) {
                            return e == t.variantIds[i]
                        })) return !0;
                    return !1
                }

                function Cr(t) {
                    if (!t) return null;
                    var e = xr(t),
                        e = new Ze(e);
                    return {
                        id: t.id,
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: e.find.bind(e),
                        getSegmentReference: e.get.bind(e),
                        initSegmentReference: t.initSegmentUri ? new Ve(function() {
                            return [t.initSegmentUri]
                        }, 0, null) : null,
                        presentationTimeOffset: t.presentationTimeOffset,
                        mimeType: t.mimeType,
                        codecs: t.codecs,
                        width: t.width || void 0,
                        height: t.height || void 0,
                        frameRate: t.frameRate || void 0,
                        kind: t.kind,
                        encrypted: t.encrypted,
                        keyId: t.keyId,
                        language: t.language,
                        label: t.label || null,
                        type: t.contentType,
                        primary: t.primary,
                        trickModeVideo: null,
                        containsEmsgBoxes: !1,
                        roles: []
                    }
                }

                function Nr() {
                    return t.indexedDB ? new br : null
                }

                function Rr(t, e, i, n) {
                    this.b = {}, this.l = [], this.o = n, this.j = t, this.v = e, this.A = i, this.i = this.a = null, this.f = this.g = this.h = this.c = 0
                }

                function Lr(t, e, i, n, r) {
                    t.b[e] = t.b[e] || [], t.b[e].push({
                        uris: i.a(),
                        X: i.X,
                        M: i.M,
                        Rb: n,
                        Hb: r
                    })
                }

                function Mr(t, e) {
                    t.c = 0, t.h = 0, t.g = 0, t.f = 0, H(t.b).forEach(function(t) {
                        t.forEach(function(t) {
                            null != t.M ? this.c += t.M - t.X + 1 : this.g += t.Rb
                        }.bind(this))
                    }.bind(t)), t.a = e, t.a.size = t.c;
                    var i = H(t.b).map(function(t) {
                        var e = 0,
                            i = function() {
                                if (!this.o) return Promise.reject(new u(2, 9, 9002));
                                if (e >= t.length) return Promise.resolve();
                                var n = t[e++];
                                return Dr(this, n).then(i)
                            }.bind(this);
                        return i()
                    }.bind(t));
                    return t.b = {}, t.i = Promise.all(i).then(function() {
                        return yr(this.j, "manifest", e)
                    }.bind(t)).then(function() {
                        this.l = []
                    }.bind(t)), t.i
                }

                function Dr(t, e) {
                    var i = N(e.uris, t.A);
                    (e.X || null != e.M) && (i.headers.Range = "bytes=" + e.X + "-" + (null == e.M ? "" : e.M));
                    var n;
                    return t.v.request(1, i).then(function(t) {
                        return this.a ? (n = t.data.byteLength, this.l.push(e.Hb.key), e.Hb.data = t.data, yr(this.j, "segment", e.Hb)) : Promise.reject(new u(2, 9, 9002))
                    }.bind(t)).then(function() {
                        if (!this.a) return Promise.reject(new u(2, 9, 9002));
                        null == e.M ? (this.a.size += n, this.f += e.Rb) : this.h += n;
                        var t = (this.h + this.f) / (this.c + this.g),
                            i = Ir(this.a);
                        this.o.progressCallback(i, t)
                    }.bind(t))
                }

                function Or() {
                    this.a = -1
                }

                function Ur(t) {
                    var e = new Si(null, 0);
                    e.qa(t.duration);
                    var i = t.drmInfo ? [t.drmInfo] : [];
                    return {
                        presentationTimeline: e,
                        minBufferTime: 10,
                        offlineSessionIds: t.sessionIds,
                        periods: t.periods.map(function(t) {
                            return Ar(t, i, e)
                        })
                    }
                }

                function jr(t) {
                    if (/^offline:([0-9]+)$/.exec(t)) {
                        var e = {
                            uri: t,
                            data: new ArrayBuffer(0),
                            headers: {
                                "content-type": "application/x-offline-manifest"
                            }
                        };
                        return Promise.resolve(e)
                    }
                    if (e = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(t)) {
                        var i = Number(e[1]),
                            n = Nr();
                        return n ? n.init(to).then(function() {
                            return n.get("segment", i)
                        }).then(function(e) {
                            return n.m().then(function() {
                                if (!e) throw new u(2, 9, 9003, i);
                                return {
                                    uri: t,
                                    data: e.data,
                                    headers: {}
                                }
                            })
                        }) : Promise.reject(new u(2, 9, 9e3))
                    }
                    return Promise.reject(new u(2, 1, 9004, t))
                }

                function Br() {
                    this.a = Promise.resolve(), this.b = this.c = this.f = !1, this.i = new Promise(function(t) {
                        this.g = t
                    }.bind(this))
                }

                function Fr(t) {
                    return t.f || (t.a = t.a.then(function(t) {
                        return this.c = !0, Promise.resolve(t)
                    }.bind(t), function(t) {
                        return this.c = !0, this.b ? (this.g(), Promise.reject(this.h)) : Promise.reject(t)
                    }.bind(t))), t.f = !0, t.a
                }

                function Hr(t, e) {
                    pe.call(this), this.O = !1, this.f = t, this.A = null, this.l = new D, this.Qb = new ae, this.Za = this.c = this.h = this.a = this.v = this.g = this.Xa = this.ka = this.N = this.j = this.o = null, this.Dc = 1e9, this.Wa = [], this.la = !1, this.$a = !0, this.ma = this.J = null, this.G = {}, this.Ya = [], this.B = {}, this.b = $r(this), this.ob = {
                        width: 1 / 0,
                        height: 1 / 0
                    }, this.i = Jr(), this.Va = 0, this.ja = this.b.preferredAudioLanguage, this.Da = this.b.preferredTextLanguage, this.lb = this.mb = "", e && e(this), this.o = new P(this.ee.bind(this)), this.Xa = Kr(this);
                    for (var i = 0; i < this.f.textTracks.length; ++i) {
                        var n = this.f.textTracks[i];
                        n.mode = "disabled", "Shaka Player TextTrack" == n.label && (this.A = n)
                    }
                    this.A || (this.A = this.f.addTextTrack("subtitles", "Shaka Player TextTrack")), this.A.mode = "hidden", O(this.l, this.f, "error", this.yd.bind(this))
                }

                function Vr(t) {
                    function e(t) {
                        return (t.video ? t.video.codecs.split(".")[0] : "") + "-" + (t.audio ? t.audio.codecs.split(".")[0] : "")
                    }
                    var i = {};
                    t.c.periods.forEach(function(t) {
                        t.variants.forEach(function(t) {
                            var n = e(t);
                            n in i || (i[n] = []), i[n].push(t)
                        })
                    });
                    var n = null,
                        r = 1 / 0;
                    q(i, function(t, e) {
                        var i = 0,
                            a = 0;
                        e.forEach(function(t) {
                            i += t.bandwidth, ++a
                        });
                        var s = i / a;
                        s < r && (n = t, r = s)
                    }), t.c.periods.forEach(function(t) {
                        t.variants = t.variants.filter(function(t) {
                            return e(t) == n
                        })
                    })
                }

                function Kr(e) {
                    e.N = new MediaSource;
                    var i = new _;
                    return O(e.l, e.N, "sourceopen", i.resolve), e.f.src = t.URL.createObjectURL(e.N), i
                }

                function qr(t) {
                    if (t.h && t.h.configure(t.b.manifest), t.j && t.j.configure(t.b.drm), t.a) {
                        t.a.configure(t.b.streaming);
                        try {
                            t.c.periods.forEach(t.gb.bind(t))
                        } catch (e) {
                            t.za(e)
                        }
                        ia(t, Xn(t.a))
                    }
                    t.b.abr.enabled && !t.$a ? t.b.abr.manager.enable() : t.b.abr.manager.disable(), t.b.abr.manager.setDefaultEstimate(t.b.abr.defaultBandwidthEstimate), t.b.abr.manager.setRestrictions(t.b.abr.restrictions)
                }

                function Gr(t, e, i) {
                    t.i.switchHistory.push({
                        timestamp: Date.now() / 1e3,
                        id: e.id,
                        type: e.type,
                        fromAdaptation: i
                    }), Xr(t, e)
                }

                function Xr(t, e) {
                    var i = re(t.c, e);
                    t.B[i] || (t.B[i] = {}), t.B[i][e.type] = e.id
                }

                function Yr(t) {
                    t.l && (t.l.ha(t.N, "sourceopen"), t.l.ha(t.f, "loadeddata"), t.l.ha(t.f, "playing"), t.l.ha(t.f, "pause"), t.l.ha(t.f, "ended")), t.f && (t.f.removeAttribute("src"), t.f.load());
                    var e = Promise.all([t.b ? t.b.abr.manager.stop() : null, t.j ? t.j.m() : null, t.ka ? t.ka.m() : null, t.g ? t.g.m() : null, t.v ? t.v.m() : null, t.a ? t.a.m() : null, t.h ? t.h.stop() : null]);
                    return t.j = null, t.ka = null, t.g = null, t.v = null, t.a = null, t.h = null, t.c = null, t.Za = null, t.Xa = null, t.N = null, t.Ya = [], t.B = {}, t.G = {}, t.i = Jr(), e
                }

                function Wr(t) {
                    return t.h ? Yr(t).then(function() {
                        this.O || (this.zc(!1), this.Xa = Kr(this))
                    }.bind(t)) : Promise.resolve()
                }

                function zr() {
                    return {
                        ".drm.servers": "",
                        ".drm.clearKeys": "",
                        ".drm.advanced": {
                            distinctiveIdentifierRequired: !1,
                            persistentStateRequired: !1,
                            videoRobustness: "",
                            audioRobustness: "",
                            serverCertificate: null
                        }
                    }
                }

                function $r(t) {
                    return {
                        drm: {
                            retryParameters: C(),
                            servers: {},
                            clearKeys: {},
                            advanced: {},
                            delayLicenseRequestUntilPlayed: !1
                        },
                        manifest: {
                            retryParameters: C(),
                            dash: {
                                customScheme: function(t) {
                                    if (t) return null
                                },
                                clockSyncUri: "",
                                ignoreDrmInfo: !1
                            },
                            hls: {
                                defaultTimeOffset: 0
                            }
                        },
                        streaming: {
                            retryParameters: C(),
                            infiniteRetriesForLiveStreams: !0,
                            rebufferingGoal: 2,
                            bufferingGoal: 10,
                            bufferBehind: 30,
                            ignoreTextStreamFailures: !1,
                            startAtSegmentBoundary: !1,
                            smallGapLimit: .5,
                            jumpLargeGaps: !1
                        },
                        abr: {
                            manager: t.Qb,
                            enabled: !0,
                            defaultBandwidthEstimate: 5e5,
                            restrictions: {
                                minWidth: 0,
                                maxWidth: 1 / 0,
                                minHeight: 0,
                                maxHeight: 1 / 0,
                                minPixels: 0,
                                maxPixels: 1 / 0,
                                minBandwidth: 0,
                                maxBandwidth: 1 / 0
                            }
                        },
                        preferredAudioLanguage: "",
                        preferredTextLanguage: "",
                        restrictions: {
                            minWidth: 0,
                            maxWidth: 1 / 0,
                            minHeight: 0,
                            maxHeight: 1 / 0,
                            minPixels: 0,
                            maxPixels: 1 / 0,
                            minBandwidth: 0,
                            maxBandwidth: 1 / 0
                        }
                    }
                }

                function Jr() {
                    return {
                        width: NaN,
                        height: NaN,
                        streamBandwidth: NaN,
                        decodedFrames: NaN,
                        droppedFrames: NaN,
                        estimatedBandwidth: NaN,
                        loadLatency: NaN,
                        playTime: 0,
                        bufferingTime: 0,
                        switchHistory: [],
                        stateHistory: []
                    }
                }

                function Qr(t, e, i) {
                    for (var n in e) {
                        var r = e[n],
                            a = i || !1;
                        "text" == n && (a = !0), t.$a ? t.G[n] = {
                            stream: r,
                            Kc: a
                        } : $n(t.a, n, r, a)
                    }
                }

                function Zr(t) {
                    if (t.c) {
                        var e = Date.now() / 1e3;
                        t.la ? t.i.bufferingTime += e - t.Va : t.i.playTime += e - t.Va, t.Va = e
                    }
                }

                function ta(t, e) {
                    function i(t, e) {
                        if (!t) return null;
                        var i = t.findSegmentPosition(e - r.startTime);
                        return null == i ? null : (i = t.getSegmentReference(i)) ? i.startTime + r.startTime : null
                    }
                    var n = Yn(t.a),
                        r = Xn(t.a),
                        a = i(n.video, e),
                        n = i(n.audio, e);
                    return null != a && null != n ? Math.max(a, n) : null != a ? a : null != n ? n : e
                }

                function ea(t, e, i, n, r) {
                    if (!i || 1 > i.length) return t.za(new u(2, 4, 4012)), {};
                    t.b.abr.manager.setVariants(i), t.b.abr.manager.setTextStreams(n);
                    var a = [];
                    r && (a = ["video", "audio"], e.textStreams.length && a.push("text")), r = Yn(t.a);
                    var s = t.a,
                        o = s.c.video || s.c.audio;
                    if (s = o ? s.b.periods[o.xa] : null, e = te(r.audio, r.video, s ? s.variants : e.variants)) {
                        e.allowedByApplication && e.allowedByKeySystem || (a.push("audio"), a.push("video"));
                        for (var h in r) e = r[h], "audio" == e.type && e.language != i[0].language ? a.push(h) : "text" == e.type && 0 < n.length && e.language != n[0].language && a.push(h)
                    }
                    if (a = a.filter(k), 0 < a.length) {
                        i = {};
                        try {
                            i = t.b.abr.manager.chooseStreams(a)
                        } catch (c) {
                            t.za(c)
                        }
                        return i
                    }
                    return {}
                }

                function ia(t, e) {
                    var i, n = {
                            audio: !1,
                            text: !1
                        },
                        r = Qt(e, t.ja, n, t.mb),
                        a = Zt(e, t.Da, n, t.lb),
                        r = ea(t, e, r, a);
                    for (i in r) Gr(t, r[i], !0);
                    Qr(t, r, !0), na(t), r.text && r.audio && n.text && r.text.language != r.audio.language && (t.A.mode = "showing", aa(t))
                }

                function na(t) {
                    Promise.resolve().then(function() {
                        this.O || this.dispatchEvent(new oe("adaptation"))
                    }.bind(t))
                }

                function ra(t) {
                    Promise.resolve().then(function() {
                        this.O || this.dispatchEvent(new oe("trackschanged"))
                    }.bind(t))
                }

                function aa(t) {
                    t.dispatchEvent(new oe("texttrackvisibility"))
                }

                function sa(t) {
                    if (!t || t.constructor != Hr) throw new u(2, 9, 9008);
                    this.a = Nr(), this.f = t, this.i = ha(this), this.b = null, this.v = !1, this.j = null, this.g = -1, this.l = 0, this.c = null, this.h = new Rr(this.a, t.o, t.getConfiguration().streaming.retryParameters, this.i)
                }

                function oa() {
                    return !!t.indexedDB
                }

                function ua(t, e, i, n) {
                    function r() {}
                    var a, s, o, u = t.f.o,
                        h = t.f.getConfiguration();
                    return ki(e, u, h.manifest.retryParameters, n).then(function(t) {
                        return pa(this), o = new t, o.configure(h.manifest), o.start(e, {
                            networkingEngine: u,
                            filterPeriod: this.o.bind(this),
                            onTimelineRegionAdded: function() {},
                            onEvent: function() {},
                            onError: i
                        })
                    }.bind(t)).then(function(t) {
                        return pa(this), a = t, s = new nt(u, i, r, function() {}), s.configure(h.drm), s.init(a, !0)
                    }.bind(t)).then(function() {
                        return pa(this), la(a)
                    }.bind(t)).then(function() {
                        return pa(this), st(s)
                    }.bind(t)).then(function() {
                        return pa(this), o.stop()
                    }.bind(t)).then(function() {
                        return pa(this), {
                            manifest: a,
                            Lc: s
                        }
                    }.bind(t))["catch"](function(t) {
                        if (o) return o.stop().then(function() {
                            throw t
                        });
                        throw t
                    })
                }

                function ha(t) {
                    return {
                        trackSelectionCallback: t.A.bind(t),
                        progressCallback: function(t, e) {
                            if (t || e) return null
                        }
                    }
                }

                function ca(t) {
                    return t.a ? t.a.a ? Promise.resolve() : t.a.init(to) : Promise.reject(new u(2, 9, 9e3))
                }

                function da(t) {
                    var e = t.b ? t.b.m() : Promise.resolve();
                    return t.b = null, t.c = null, t.v = !1, t.j = null, t.g = -1, e
                }

                function la(t) {
                    var e = t.periods.map(function(t) {
                        return t.variants
                    }).reduce(y, []).map(function(t) {
                        var e = [];
                        return t.audio && e.push(t.audio), t.video && e.push(t.video), e
                    }).reduce(y, []).filter(k);
                    return t = t.periods.map(function(t) {
                        return t.textStreams
                    }).reduce(y, []), e.push.apply(e, t), Promise.all(e.map(function(t) {
                        return t.createSegmentIndex()
                    }))
                }

                function fa(t, e, i, n, r) {
                    for (var a = [], s = t.c.presentationTimeline.na(), o = s, u = i.findSegmentPosition(s), h = null != u ? i.getSegmentReference(u) : null; h;) o = t.a.c.segment++, Lr(t.h, i.type, h, (h.endTime - h.startTime) * n / 8, {
                        key: o,
                        data: null,
                        manifestKey: t.g,
                        streamNumber: i.id,
                        segmentNumber: o
                    }), a.push({
                        startTime: h.startTime,
                        endTime: h.endTime,
                        uri: "offline:" + t.g + "/" + i.id + "/" + o
                    }), o = h.endTime + e.startTime, h = i.getSegmentReference(++u);
                    return t.l = Math.max(t.l, o - s), e = null, i.initSegmentReference && (o = t.a.c.segment++, e = "offline:" + t.g + "/" + i.id + "/" + o, Lr(t.h, i.contentType, i.initSegmentReference, 0, {
                        key: o,
                        data: null,
                        manifestKey: t.g,
                        streamNumber: i.id,
                        segmentNumber: -1
                    })), t = [], null != r && t.push(r), {
                        id: i.id,
                        primary: i.primary,
                        presentationTimeOffset: i.presentationTimeOffset || 0,
                        contentType: i.type,
                        mimeType: i.mimeType,
                        codecs: i.codecs,
                        frameRate: i.frameRate,
                        kind: i.kind,
                        language: i.language,
                        label: i.label,
                        width: i.width || null,
                        height: i.height || null,
                        initSegmentUri: e,
                        encrypted: i.encrypted,
                        keyId: i.keyId,
                        segments: a,
                        variantIds: t
                    }
                }

                function pa(t) {
                    if (!t.f) throw new u(2, 9, 9002)
                }

                function ma(t) {
                    io.push(t)
                }

                function va(t) {
                    var e = t.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();
                    if ("function" == typeof Event) var i = new Event(e, t);
                    else i = document.createEvent("Event"), i.initEvent(e, t.bubbles, t.cancelable);
                    t.target.dispatchEvent(i)
                }

                function ga(t, e, i) {
                    if ("input" == t) switch (this.type) {
                        case "range":
                            t = "change"
                    }
                    no.call(this, t, e, i)
                }

                function ba(t) {
                    this.f = [], this.b = [], this.a = [], (new Xe).da("pssh", this.c.bind(this)).parse(t.buffer)
                }

                function ya(t, e) {
                    try {
                        var i = new Ta(t, e);
                        return Promise.resolve(i)
                    } catch (n) {
                        return Promise.reject(n)
                    }
                }

                function Ta(t, e) {
                    this.keySystem = t;
                    for (var i = !1, n = 0; n < e.length; ++n) {
                        var r = e[n],
                            a = {
                                audioCapabilities: [],
                                videoCapabilities: [],
                                persistentState: "optional",
                                distinctiveIdentifier: "optional",
                                initDataTypes: r.initDataTypes,
                                sessionTypes: ["temporary"],
                                label: r.label
                            },
                            s = !1;
                        if (r.audioCapabilities)
                            for (var o = 0; o < r.audioCapabilities.length; ++o) {
                                var u = r.audioCapabilities[o];
                                if (u.contentType) {
                                    s = !0;
                                    var h = u.contentType.split(";")[0];
                                    MSMediaKeys.isTypeSupported(this.keySystem, h) && (a.audioCapabilities.push(u), i = !0)
                                }
                            }
                        if (r.videoCapabilities)
                            for (o = 0; o < r.videoCapabilities.length; ++o) u = r.videoCapabilities[o], u.contentType && (s = !0, h = u.contentType.split(";")[0], MSMediaKeys.isTypeSupported(this.keySystem, h) && (a.videoCapabilities.push(u), i = !0));
                        if (s || (i = MSMediaKeys.isTypeSupported(this.keySystem, "video/mp4")), "required" == r.persistentState && (i = !1), i) return void(this.a = a)
                    }
                    throw r = Error("Unsupported keySystem"), r.name = "NotSupportedError", r.code = DOMException.NOT_SUPPORTED_ERR, r
                }

                function wa(t) {
                    var e = this.mediaKeys;
                    return e && e != t && ka(e, null), delete this.mediaKeys, (this.mediaKeys = t) ? ka(t, this) : Promise.resolve()
                }

                function Ea(t) {
                    this.a = new MSMediaKeys(t), this.b = new D
                }

                function ka(t, e) {
                    function i() {
                        e.msSetMediaKeys(n.a), e.removeEventListener("loadedmetadata", i)
                    }
                    if (j(t.b), !e) return Promise.resolve();
                    O(t.b, e, "msneedkey", Ia);
                    var n = t;
                    try {
                        return 1 <= e.readyState ? e.msSetMediaKeys(t.a) : e.addEventListener("loadedmetadata", i), Promise.resolve()
                    } catch (r) {
                        return Promise.reject(r)
                    }
                }

                function Sa(t) {
                    pe.call(this), this.c = null, this.g = t, this.b = this.a = null, this.f = new D, this.sessionId = "", this.expiration = NaN, this.closed = new _, this.keyStatuses = new _a
                }

                function Ia(t) {
                    var e = document.createEvent("CustomEvent");
                    e.initCustomEvent("encrypted", !1, !1, null), e.initDataType = "cenc";
                    var i = t.initData;
                    if (i) {
                        var n = new ba(i);
                        if (1 >= n.a.length) t = i;
                        else {
                            var r = [];
                            for (t = 0; t < n.a.length; t++) r.push(i.subarray(n.a[t].start, n.a[t].end + 1));
                            for (i = R(r, Aa), t = n = 0; t < i.length; t++) n += i[t].length;
                            for (n = new Uint8Array(n), t = r = 0; t < i.length; t++) n.set(i[t], r), r += i[t].length;
                            t = n
                        }
                    } else t = i;
                    e.initData = t, this.dispatchEvent(e)
                }

                function Aa(t, e) {
                    return it(t, e)
                }

                function xa(t, e) {
                    t.keyStatuses.Kb(e), t.dispatchEvent(new oe("keystatuseschange"))
                }

                function _a() {
                    this.size = 0, this.a = void 0
                }

                function Pa() {
                    return Promise.reject(Error("The key system specified is not supported."))
                }

                function Ca(t) {
                    return t ? Promise.reject(Error("MediaKeys not supported.")) : Promise.resolve()
                }

                function Na() {
                    throw new TypeError("Illegal constructor.")
                }

                function Ra() {
                    throw new TypeError("Illegal constructor.")
                }

                function La(e) {
                    ao = e, so = new Uint8Array([0]).buffer, navigator.requestMediaKeySystemAccess = Da, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = Oa, t.MediaKeys = ja, t.MediaKeySystemAccess = Ua
                }

                function Ma(t) {
                    var e = ao;
                    return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : t
                }

                function Da(t, e) {
                    try {
                        var i = new Ua(t, e);
                        return Promise.resolve(i)
                    } catch (n) {
                        return Promise.reject(n)
                    }
                }

                function Oa(t) {
                    var e = this.mediaKeys;
                    return e && e != t && Ba(e, null), delete this.mediaKeys, (this.mediaKeys = t) && Ba(t, this), Promise.resolve()
                }

                function Ua(t, e) {
                    this.a = this.keySystem = t;
                    var i = !1;
                    "org.w3.clearkey" == t && (this.a = "webkit-org.w3.clearkey", i = !1);
                    for (var n = !1, r = document.getElementsByTagName("video"), a = r.length ? r[0] : document.createElement("video"), s = 0; s < e.length; ++s) {
                        r = e[s];
                        var o = {
                                audioCapabilities: [],
                                videoCapabilities: [],
                                persistentState: "optional",
                                distinctiveIdentifier: "optional",
                                initDataTypes: r.initDataTypes,
                                sessionTypes: ["temporary"],
                                label: r.label
                            },
                            u = !1;
                        if (r.audioCapabilities)
                            for (var h = 0; h < r.audioCapabilities.length; ++h) {
                                var c = r.audioCapabilities[h];
                                if (c.contentType) {
                                    var u = !0,
                                        d = c.contentType.split(";")[0];
                                    a.canPlayType(d, this.a) && (o.audioCapabilities.push(c), n = !0)
                                }
                            }
                        if (r.videoCapabilities)
                            for (h = 0; h < r.videoCapabilities.length; ++h) c = r.videoCapabilities[h], c.contentType && (u = !0, a.canPlayType(c.contentType, this.a) && (o.videoCapabilities.push(c), n = !0));
                        if (u || (n = a.canPlayType("video/mp4", this.a) || a.canPlayType("video/webm", this.a)), "required" == r.persistentState && (i ? (o.persistentState = "required", o.sessionTypes = ["persistent-license"]) : n = !1), n) return void(this.b = o)
                    }
                    throw i = "Unsupported keySystem", "org.w3.clearkey" != t && "com.widevine.alpha" != t || (i = "None of the requested configurations were supported."), i = Error(i), i.name = "NotSupportedError", i.code = DOMException.NOT_SUPPORTED_ERR, i
                }

                function ja(t) {
                    this.g = t, this.b = null, this.a = new D, this.c = [], this.f = {}
                }

                function Ba(t, e) {
                    t.b = e, j(t.a);
                    var i = ao;
                    e && (O(t.a, e, i + "needkey", t.Cd.bind(t)), O(t.a, e, i + "keymessage", t.Bd.bind(t)), O(t.a, e, i + "keyadded", t.zd.bind(t)), O(t.a, e, i + "keyerror", t.Ad.bind(t)))
                }

                function Fa(t, e) {
                    var i = t.f[e];
                    return i ? i : (i = t.c.shift()) ? (i.sessionId = e, t.f[e] = i) : null
                }

                function Ha(t, e, i) {
                    pe.call(this), this.f = t, this.h = !1, this.a = this.b = null, this.c = e, this.g = i, this.sessionId = "", this.expiration = NaN, this.closed = new _, this.keyStatuses = new qa
                }

                function Va(t, e, i) {
                    if (t.h) return Promise.reject(Error("The session is already initialized."));
                    t.h = !0;
                    try {
                        if ("persistent-license" == t.g)
                            if (i) var n = new Uint8Array(W("LOAD_SESSION|" + i));
                            else {
                                var r = W("PERSISTENT|"),
                                    a = new Uint8Array(r.byteLength + e.byteLength);
                                a.set(new Uint8Array(r), 0), a.set(new Uint8Array(e), r.byteLength), n = a
                            } else n = new Uint8Array(e)
                    } catch (s) {
                        return Promise.reject(s)
                    }
                    t.b = new _;
                    var o = Ma("generateKeyRequest");
                    try {
                        t.f[o](t.c, n)
                    } catch (s) {
                        if ("InvalidStateError" != s.name) return t.b = null, Promise.reject(s);
                        setTimeout(function() {
                            try {
                                this.f[o](this.c, n)
                            } catch (t) {
                                this.b.reject(t), this.b = null
                            }
                        }.bind(t), 10)
                    }
                    return t.b
                }

                function Ka(t, e) {
                    t.keyStatuses.Kb(e), t.dispatchEvent(new oe("keystatuseschange"))
                }

                function qa() {
                    this.size = 0, this.a = void 0
                }

                function Ga() {
                    var t = MediaSource.prototype.addSourceBuffer;
                    MediaSource.prototype.addSourceBuffer = function() {
                        var e = t.apply(this, arguments);
                        return e.abort = function() {}, e
                    }
                }

                function Xa() {
                    var t = MediaSource.prototype.endOfStream;
                    MediaSource.prototype.endOfStream = function() {
                        for (var e, i = 0, n = 0; n < this.sourceBuffers.length; ++n) e = this.sourceBuffers[n], e = e.buffered.end(e.buffered.length - 1), i = Math.max(i, e);
                        if (!isNaN(this.duration) && i < this.duration)
                            for (this.Zb = !0, n = 0; n < this.sourceBuffers.length; ++n) e = this.sourceBuffers[n], e.Tb = !1;
                        return t.apply(this, arguments)
                    };
                    var e = MediaSource.prototype.addSourceBuffer;
                    MediaSource.prototype.addSourceBuffer = function() {
                        var t = e.apply(this, arguments);
                        return t.N = this, t.addEventListener("updateend", Ya, !1), this.a || (this.addEventListener("sourceclose", Wa, !1), this.a = !0), t
                    }
                }

                function Ya(t) {
                    var e = t.target,
                        i = e.N;
                    if (i.Zb) {
                        for (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), e.Tb = !0, t = 0; t < i.sourceBuffers.length; ++t)
                            if (0 == i.sourceBuffers[t].Tb) return;
                        i.Zb = !1
                    }
                }

                function Wa(t) {
                    t = t.target;
                    for (var e = 0; e < t.sourceBuffers.length; ++e) t.sourceBuffers[e].removeEventListener("updateend", Ya, !1);
                    t.removeEventListener("sourceclose", Wa, !1)
                }

                function za(t) {
                    if (this.c = [], this.b = [], this.Ba = oo, t) try {
                        t(this.fa.bind(this), this.a.bind(this))
                    } catch (e) {
                        this.a(e)
                    }
                }

                function $a(t) {
                    var e = new za;
                    return e.fa(void 0), e.then(function() {
                        return t
                    })
                }

                function Ja(t) {
                    var e = new za;
                    return e.a(t), e
                }

                function Qa(t) {
                    function e(t, e, i) {
                        t.Ba == oo && (r[e] = i, n++, n == r.length && t.fa(r))
                    }
                    var i = new za;
                    if (!t.length) return i.fa([]), i;
                    for (var n = 0, r = Array(t.length), a = i.a.bind(i), s = 0; s < t.length; ++s) t[s] && t[s].then ? t[s].then(e.bind(null, i, s), a) : e(i, s, t[s]);
                    return i
                }

                function Za(t) {
                    for (var e = new za, i = e.fa.bind(e), n = e.a.bind(e), r = 0; r < t.length; ++r) t[r] && t[r].then ? t[r].then(i, n) : i(t[r]);
                    return e
                }

                function ts(t, e, i) {
                    ho.push(function() {
                        if (i && "function" == typeof i) {
                            try {
                                var t = i(this.jb)
                            } catch (n) {
                                return void e.a(n)
                            }
                            try {
                                var r = t && t.then
                            } catch (n) {
                                return void e.a(n)
                            }
                            t instanceof za ? t == e ? e.a(new TypeError("Chaining cycle detected")) : t.then(e.fa.bind(e), e.a.bind(e)) : r ? es(t, r, e) : e.fa(t)
                        } else 1 == this.Ba ? e.fa(this.jb) : e.a(this.jb)
                    }.bind(t)), null == uo && (uo = ns(is))
                }

                function es(t, e, i) {
                    try {
                        var n = !1;
                        e.call(t, function(t) {
                            if (!n) {
                                n = !0;
                                try {
                                    var e = t && t.then
                                } catch (r) {
                                    return void i.a(r)
                                }
                                e ? es(t, e, i) : i.fa(t)
                            }
                        }, i.a.bind(i))
                    } catch (r) {
                        i.a(r)
                    }
                }

                function is() {
                    for (; ho.length;) {
                        null != uo && (rs(uo), uo = null);
                        var t = ho;
                        ho = [];
                        for (var e = 0; e < t.length; ++e) t[e]()
                    }
                }

                function ns() {
                    return 0
                }

                function rs() {}

                function as() {
                    return {
                        droppedVideoFrames: this.webkitDroppedFrameCount,
                        totalVideoFrames: this.webkitDecodedFrameCount,
                        corruptedVideoFrames: 0,
                        creationTime: NaN,
                        totalFrameDelay: 0
                    }
                }

                function ss(e, i, n) {
                    return new t.TextTrackCue(e, i, n)
                }

                function os(e, i, n) {
                    return new t.TextTrackCue(e + "-" + i + "-" + n, e, i, n)
                }
                var us, hs = this;
                hs.xe = !0, s.prototype.setDefaultEstimate = function(t) {
                    this.b = t
                }, s.prototype.getBandwidthEstimate = function() {
                    return 128e3 > this.a ? this.b : Math.min(a(this.c), a(this.f))
                }, e("shaka.util.Error", u), u.prototype.toString = function() {
                    return "shaka.util.Error " + JSON.stringify(this, null, "  ")
                }, u.Severity = {
                    RECOVERABLE: 1,
                    CRITICAL: 2
                }, u.Category = {
                    NETWORK: 1,
                    TEXT: 2,
                    MEDIA: 3,
                    MANIFEST: 4,
                    STREAMING: 5,
                    DRM: 6,
                    PLAYER: 7,
                    CAST: 8,
                    STORAGE: 9
                }, u.Code = {
                    UNSUPPORTED_SCHEME: 1e3,
                    BAD_HTTP_STATUS: 1001,
                    HTTP_ERROR: 1002,
                    TIMEOUT: 1003,
                    MALFORMED_DATA_URI: 1004,
                    UNKNOWN_DATA_URI_ENCODING: 1005,
                    REQUEST_FILTER_ERROR: 1006,
                    RESPONSE_FILTER_ERROR: 1007,
                    INVALID_TEXT_HEADER: 2e3,
                    INVALID_TEXT_CUE: 2001,
                    UNABLE_TO_DETECT_ENCODING: 2003,
                    BAD_ENCODING: 2004,
                    INVALID_XML: 2005,
                    INVALID_MP4_TTML: 2007,
                    INVALID_MP4_VTT: 2008,
                    BUFFER_READ_OUT_OF_BOUNDS: 3e3,
                    JS_INTEGER_OVERFLOW: 3001,
                    EBML_OVERFLOW: 3002,
                    EBML_BAD_FLOATING_POINT_SIZE: 3003,
                    MP4_SIDX_WRONG_BOX_TYPE: 3004,
                    MP4_SIDX_INVALID_TIMESCALE: 3005,
                    MP4_SIDX_TYPE_NOT_SUPPORTED: 3006,
                    WEBM_CUES_ELEMENT_MISSING: 3007,
                    WEBM_EBML_HEADER_ELEMENT_MISSING: 3008,
                    WEBM_SEGMENT_ELEMENT_MISSING: 3009,
                    WEBM_INFO_ELEMENT_MISSING: 3010,
                    WEBM_DURATION_ELEMENT_MISSING: 3011,
                    WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING: 3012,
                    WEBM_CUE_TIME_ELEMENT_MISSING: 3013,
                    MEDIA_SOURCE_OPERATION_FAILED: 3014,
                    MEDIA_SOURCE_OPERATION_THREW: 3015,
                    VIDEO_ERROR: 3016,
                    QUOTA_EXCEEDED_ERROR: 3017,
                    UNABLE_TO_GUESS_MANIFEST_TYPE: 4e3,
                    DASH_INVALID_XML: 4001,
                    DASH_NO_SEGMENT_INFO: 4002,
                    DASH_EMPTY_ADAPTATION_SET: 4003,
                    DASH_EMPTY_PERIOD: 4004,
                    DASH_WEBM_MISSING_INIT: 4005,
                    DASH_UNSUPPORTED_CONTAINER: 4006,
                    DASH_PSSH_BAD_ENCODING: 4007,
                    DASH_NO_COMMON_KEY_SYSTEM: 4008,
                    DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED: 4009,
                    DASH_CONFLICTING_KEY_IDS: 4010,
                    UNPLAYABLE_PERIOD: 4011,
                    RESTRICTIONS_CANNOT_BE_MET: 4012,
                    NO_PERIODS: 4014,
                    HLS_PLAYLIST_HEADER_MISSING: 4015,
                    INVALID_HLS_TAG: 4016,
                    HLS_INVALID_PLAYLIST_HIERARCHY: 4017,
                    DASH_DUPLICATE_REPRESENTATION_ID: 4018,
                    HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND: 4020,
                    HLS_COULD_NOT_GUESS_MIME_TYPE: 4021,
                    HLS_MASTER_PLAYLIST_NOT_PROVIDED: 4022,
                    HLS_REQUIRED_ATTRIBUTE_MISSING: 4023,
                    HLS_REQUIRED_TAG_MISSING: 4024,
                    HLS_COULD_NOT_GUESS_CODECS: 4025,
                    HLS_KEYFORMATS_NOT_SUPPORTED: 4026,
                    INVALID_STREAMS_CHOSEN: 5005,
                    NO_RECOGNIZED_KEY_SYSTEMS: 6e3,
                    REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE: 6001,
                    FAILED_TO_CREATE_CDM: 6002,
                    FAILED_TO_ATTACH_TO_VIDEO: 6003,
                    INVALID_SERVER_CERTIFICATE: 6004,
                    FAILED_TO_CREATE_SESSION: 6005,
                    FAILED_TO_GENERATE_LICENSE_REQUEST: 6006,
                    LICENSE_REQUEST_FAILED: 6007,
                    LICENSE_RESPONSE_REJECTED: 6008,
                    ENCRYPTED_CONTENT_WITHOUT_DRM_INFO: 6010,
                    NO_LICENSE_SERVER_GIVEN: 6012,
                    OFFLINE_SESSION_REMOVED: 6013,
                    EXPIRED: 6014,
                    LOAD_INTERRUPTED: 7e3,
                    CAST_API_UNAVAILABLE: 8e3,
                    NO_CAST_RECEIVERS: 8001,
                    ALREADY_CASTING: 8002,
                    UNEXPECTED_CAST_ERROR: 8003,
                    CAST_CANCELED_BY_USER: 8004,
                    CAST_CONNECTION_TIMED_OUT: 8005,
                    CAST_RECEIVER_APP_UNAVAILABLE: 8006,
                    STORAGE_NOT_SUPPORTED: 9e3,
                    INDEXED_DB_ERROR: 9001,
                    OPERATION_ABORTED: 9002,
                    REQUESTED_ITEM_NOT_FOUND: 9003,
                    MALFORMED_OFFLINE_URI: 9004,
                    CANNOT_STORE_LIVE_OFFLINE: 9005,
                    STORE_ALREADY_IN_PROGRESS: 9006,
                    NO_INIT_DATA_FOR_OFFLINE: 9007,
                    LOCAL_PLAYER_INSTANCE_REQUIRED: 9008
                };
                var cs = /^(?:([^:\/?#.]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/#?]*?)(?::([0-9]+))?(?=[\/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
                us = h.prototype, us.aa = "", us.Ca = "", us.ca = "", us.Ka = null, us.W = "", us.ua = "", us.toString = function() {
                    var t = [],
                        e = this.aa;
                    if (e && t.push(p(e, ds, !0), ":"), e = this.ca) {
                        t.push("//");
                        var i = this.Ca;
                        i && t.push(p(i, ds, !0), "@"), t.push(encodeURIComponent(e).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), e = this.Ka, null != e && t.push(":", String(e))
                    }
                    return (e = this.W) && (this.ca && "/" != e.charAt(0) && t.push("/"), t.push(p(e, "/" == e.charAt(0) ? fs : ls, !0))), (e = this.a.toString()) && t.push("?", e), (e = this.ua) && t.push("#", p(e, ms)), t.join("")
                }, us.resolve = function(t) {
                    var e = new h(this);
                    "data" === e.aa && (e = new h);
                    var i = !!t.aa;
                    i ? c(e, t.aa) : i = !!t.Ca, i ? e.Ca = t.Ca : i = !!t.ca, i ? e.ca = t.ca : i = null != t.Ka;
                    var n = t.W;
                    if (i) d(e, t.Ka);
                    else if (i = !!t.W) {
                        if ("/" != n.charAt(0))
                            if (this.ca && !this.W) n = "/" + n;
                            else {
                                var r = e.W.lastIndexOf("/"); - 1 != r && (n = e.W.substr(0, r + 1) + n)
                            }
                        if (".." == n || "." == n) n = "";
                        else if (-1 != n.indexOf("./") || -1 != n.indexOf("/.")) {
                            for (var r = !n.lastIndexOf("/", 0), n = n.split("/"), a = [], s = 0; s < n.length;) {
                                var o = n[s++];
                                "." == o ? r && s == n.length && a.push("") : ".." == o ? ((1 < a.length || 1 == a.length && "" != a[0]) && a.pop(), r && s == n.length && a.push("")) : (a.push(o), r = !0)
                            }
                            n = a.join("/")
                        }
                    }
                    return i ? e.W = n : i = "" !== t.a.toString(), i ? l(e, g(t.a)) : i = !!t.ua, i && (e.ua = t.ua), e
                };
                var ds = /[#\/\?@]/g,
                    ls = /[\#\?:]/g,
                    fs = /[\#\?]/g,
                    ps = /[\#\?@]/g,
                    ms = /#/g;
                v.prototype.a = null, v.prototype.c = null, v.prototype.toString = function() {
                    if (this.b) return this.b;
                    if (!this.a) return "";
                    var t, e = [];
                    for (t in this.a)
                        for (var i = encodeURIComponent(t), n = this.a[t], r = 0; r < n.length; r++) {
                            var a = i;
                            "" !== n[r] && (a += "=" + encodeURIComponent(n[r])), e.push(a)
                        }
                    return this.b = e.join("&")
                };
                var vs = 1 / 15;
                e("shaka.net.NetworkingEngine", P), P.RequestType = {
                    MANIFEST: 0,
                    SEGMENT: 1,
                    LICENSE: 2,
                    APP: 3
                };
                var gs = {};
                P.registerScheme = function(t, e) {
                    gs[t] = e
                }, P.unregisterScheme = function(t) {
                    delete gs[t]
                }, P.prototype.Ld = function(t) {
                    this.b.push(t)
                }, P.prototype.registerRequestFilter = P.prototype.Ld, P.prototype.pe = function(t) {
                    var e = this.b;
                    t = e.indexOf(t), 0 <= t && e.splice(t, 1)
                }, P.prototype.unregisterRequestFilter = P.prototype.pe, P.prototype.Ic = function() {
                    this.b = []
                }, P.prototype.clearAllRequestFilters = P.prototype.Ic, P.prototype.Md = function(t) {
                    this.c.push(t)
                }, P.prototype.registerResponseFilter = P.prototype.Md, P.prototype.qe = function(t) {
                    var e = this.c;
                    t = e.indexOf(t), 0 <= t && e.splice(t, 1)
                }, P.prototype.unregisterResponseFilter = P.prototype.qe, P.prototype.Jc = function() {
                    this.c = []
                }, P.prototype.clearAllResponseFilters = P.prototype.Jc, P.prototype.m = function() {
                    this.f = !0, this.b = [], this.c = [];
                    for (var t = [], e = 0; e < this.a.length; ++e) t.push(this.a[e]["catch"](T));
                    return Promise.all(t)
                }, P.prototype.destroy = P.prototype.m, P.prototype.request = function(e, i) {
                    if (this.f) return Promise.reject();
                    i.method = i.method || "GET", i.headers = i.headers || {}, i.retryParameters = i.retryParameters ? x(i.retryParameters) : C(), i.uris = x(i.uris);
                    var n = Date.now(),
                        r = Promise.resolve();
                    return this.b.forEach(function(t) {
                        r = r.then(t.bind(null, e, i))
                    }), r = r["catch"](function(t) {
                        throw new u(2, 1, 1006, t)
                    }), r = r.then(function() {
                        for (var r = Date.now() - n, a = i.retryParameters || {}, s = a.maxAttempts || 1, o = a.backoffFactor || 2, a = null == a.baseDelay ? 1e3 : a.baseDelay, u = this.g(e, i, 0, r), h = 1; h < s; h++) u = u["catch"](function(n, a, s) {
                            if (s && 1 == s.severity) {
                                s = new _;
                                var o = i.retryParameters || {};
                                return t.setTimeout(s.resolve, n * (1 + (2 * Math.random() - 1) * (null == o.fuzzFactor ? .5 : o.fuzzFactor))), s.then(this.g.bind(this, e, i, a, r))
                            }
                            throw s
                        }.bind(this, a, h % i.uris.length)), a *= o;
                        return u
                    }.bind(this)), this.a.push(r), r.then(function(t) {
                        return 0 <= this.a.indexOf(r) && this.a.splice(this.a.indexOf(r), 1), this.h && !t.fromCache && 1 == e && this.h(t.timeMs, t.data.byteLength), t
                    }.bind(this))["catch"](function(t) {
                        return t && (t.severity = 2), 0 <= this.a.indexOf(r) && this.a.splice(this.a.indexOf(r), 1), Promise.reject(t)
                    }.bind(this))
                }, P.prototype.request = P.prototype.request, P.prototype.g = function(t, e, i, n) {
                    if (this.f) return Promise.reject();
                    var r = new h(e.uris[i]),
                        a = r.aa;
                    if (a || (a = location.protocol, a = a.slice(0, -1), c(r, a), e.uris[i] = r.toString()), a = gs[a], !a) return Promise.reject(new u(2, 1, 1e3, r));
                    var s = Date.now();
                    return a(e.uris[i], e, t).then(function(e) {
                        void 0 == e.timeMs && (e.timeMs = Date.now() - s);
                        var i = Date.now(),
                            r = Promise.resolve();
                        return this.c.forEach(function(i) {
                            r = r.then(function() {
                                return Promise.resolve(i(t, e))
                            }.bind(this))
                        }), r = r["catch"](function(t) {
                            var e = 2;
                            throw t instanceof u && (e = t.severity), new u(e, 1, 1007, t)
                        }), r.then(function() {
                            return e.timeMs += Date.now() - i, e.timeMs += n, e
                        })
                    }.bind(this))
                }, M.prototype.push = function(t, e) {
                    this.a.hasOwnProperty(t) ? this.a[t].push(e) : this.a[t] = [e]
                }, M.prototype.get = function(t) {
                    return (t = this.a[t]) ? t.slice() : null
                }, M.prototype.remove = function(t, e) {
                    var i = this.a[t];
                    if (i)
                        for (var n = 0; n < i.length; ++n) i[n] == e && (i.splice(n, 1), --n)
                }, D.prototype.m = function() {
                    return j(this), this.a = null, Promise.resolve()
                }, D.prototype.ha = function(t, e) {
                    if (this.a)
                        for (var i = this.a.get(e) || [], n = 0; n < i.length; ++n) {
                            var r = i[n];
                            r.target == t && (r.ha(), this.a.remove(e, r))
                        }
                }, B.prototype.ha = function() {
                    this.target.removeEventListener(this.type, this.a, !1), this.a = this.target = null
                }, e("shaka.util.StringUtils.fromUTF8", G), e("shaka.util.StringUtils.fromUTF16", X), e("shaka.util.StringUtils.fromBytesAutoDetect", Y), e("shaka.util.StringUtils.toUTF8", W), $.prototype.cancel = function() {
                    null != this.a && (clearTimeout(this.a), this.a = null)
                }, e("shaka.util.Uint8ArrayUtils.toBase64", Q), e("shaka.util.Uint8ArrayUtils.fromBase64", Z), e("shaka.util.Uint8ArrayUtils.fromHex", tt), e("shaka.util.Uint8ArrayUtils.toHex", et), e("shaka.util.Uint8ArrayUtils.equal", it), e("shaka.util.Uint8ArrayUtils.concat", function(t) {
                    for (var e = 0, i = 0; i < arguments.length; ++i) e += arguments[i].length;
                    for (var e = new Uint8Array(e), n = 0, i = 0; i < arguments.length; ++i) e.set(arguments[i], n), n += arguments[i].length;
                    return e
                }), us = nt.prototype, us.m = function() {
                    this.c = !0;
                    var t = this.a.map(function(t) {
                        return (t.ba.close() || Promise.resolve())["catch"](T)
                    });
                    return this.i.reject(), this.f && t.push(this.f.m()), this.l && t.push(this.l.setMediaKeys(null)["catch"](T)), this.O && (clearInterval(this.O), this.O = null), this.B && this.B.cancel(), this.f = this.l = this.j = this.v = this.b = this.B = null, this.a = [], this.o = [], this.ma = this.g = this.h = this.la = null, Promise.all(t)
                }, us.configure = function(t) {
                    this.h = t
                }, us.init = function(t, e) {
                    var i = {},
                        n = [];
                    return this.ka = e, this.o = t.offlineSessionIds, ut(this, t, e || 0 < t.offlineSessionIds.length, i, n), n.length ? ht(this, i, n) : (this.J = !0, Promise.resolve())
                }, us.keySystem = function() {
                    return this.b ? this.b.keySystem : ""
                }, us.bb = function() {
                    var t = this.a.map(function(t) {
                        return t = t.ba.expiration, isNaN(t) ? 1 / 0 : t
                    });
                    return Math.min.apply(Math, t)
                }, us.fd = function(t) {
                    for (var e = new Uint8Array(t.initData), i = 0; i < this.a.length; ++i)
                        if (it(e, this.a[i].initData)) return;
                    mt(this, t.initDataType, e)
                }, us.kc = function(t) {
                    this.h.delayLicenseRequestUntilPlayed && this.l.paused && !this.ja ? this.G.push(t) : vt(this, t)
                }, us.ec = function(t) {
                    t = t.target;
                    var e;
                    for (e = 0; e < this.a.length && this.a[e].ba != t; ++e);
                    if (e != this.a.length) {
                        var i = !1;
                        t.keyStatuses.forEach(function(t, n) {
                            if ("string" == typeof n) {
                                var r = n;
                                n = t, t = r
                            }
                            if ("com.microsoft.playready" == this.b.keySystem && 16 == n.byteLength) {
                                var r = new DataView(n),
                                    a = r.getUint32(0, !0),
                                    s = r.getUint16(4, !0),
                                    o = r.getUint16(6, !0);
                                r.setUint32(0, a, !1), r.setUint16(4, s, !1), r.setUint16(6, o, !1)
                            }
                            "com.microsoft.playready" == this.b.keySystem && "status-pending" == t && (t = "usable"), "status-pending" != t && (this.a[e].loaded = !0, this.a.every(function(t) {
                                return t.loaded
                            }) && this.i.resolve()), "expired" == t && (i = !0), r = et(new Uint8Array(n)), this.A[r] = t
                        }.bind(this));
                        var n = t.expiration - Date.now();
                        (0 > n || i && 1e3 > n) && !this.a[e].ia && (this.a.splice(e, 1), t.close()), J(this.B)
                    }
                }, us.Kd = function() {
                    function t(t, e) {
                        return "expired" == e
                    }!F(this.A) && K(this.A, t) && this.g(new u(2, 6, 6014)), this.Da(this.A)
                }, us.qd = function() {
                    for (var t = 0; t < this.G.length; t++) vt(this, this.G[t]);
                    this.ja = !0, this.G = []
                }, us.Jd = function() {
                    this.a.forEach(function(t) {
                        var e = t.zb,
                            i = t.ba.expiration;
                        isNaN(i) && (i = 1 / 0), i != e && (this.ma(t.ba.sessionId, i), t.zb = i)
                    }.bind(this))
                };
                var bs = {};
                e("shaka.media.TextEngine.registerParser", Et), e("shaka.media.TextEngine.unregisterParser", function(t) {
                    delete bs[t]
                }), e("shaka.media.TextEngine.makeCue", kt), wt.prototype.m = function() {
                    return this.c && It(this, function() {
                        return !0
                    }), this.c = this.f = null, Promise.resolve()
                }, wt.prototype.remove = function(t, e) {
                    return Promise.resolve().then(function() {
                        this.c && (It(this, function(i) {
                            return !(i.startTime >= e || i.endTime <= t)
                        }), null == this.b || e <= this.b || t >= this.a || (t <= this.b && e >= this.a ? this.b = this.a = null : t <= this.b && e < this.a ? this.b = e : t > this.b && e >= this.a && (this.a = t)))
                    }.bind(this))
                }, At.prototype.parseInit = function(t) {
                    this.Oa(t, 0, null, null)
                }, At.prototype.parseMedia = function(t, e) {
                    return this.Oa(t, e.periodStart, e.segmentStart, e.segmentEnd)
                }, us = Ct.prototype, us.m = function() {
                    this.h = !0;
                    var t, e = [];
                    for (t in this.b) {
                        var i = this.b[t],
                            n = i[0];
                        for (this.b[t] = i.slice(0, 1), n && e.push(n.p["catch"](T)), n = 1; n < i.length; ++n) i[n].p["catch"](T), i[n].p.reject()
                    }
                    return this.a && e.push(this.a.m()), Promise.all(e).then(function() {
                        this.g.m(), this.a = this.i = this.N = this.f = this.g = null, this.c = {}, this.b = {}
                    }.bind(this))
                }, us.init = function(t) {
                    for (var e in t) {
                        var i = t[e];
                        "text" == e ? Rt(this, i) : (i = this.N.addSourceBuffer(i), O(this.g, i, "error", this.ke.bind(this, e)), O(this.g, i, "updateend", this.Ja.bind(this, e)), this.c[e] = i, this.b[e] = [])
                    }
                }, us.remove = function(t, e, i) {
                    return "text" == t ? this.a.remove(e, i) : jt(this, t, this.qc.bind(this, t, e, i))
                }, us.endOfStream = function(t) {
                    return Bt(this, function() {
                        t ? this.N.endOfStream(t) : this.N.endOfStream()
                    }.bind(this))
                }, us.qa = function(t) {
                    return Bt(this, function() {
                        this.N.duration = t
                    }.bind(this))
                }, us.Y = function() {
                    return this.N.duration
                }, us.je = function(t, e) {
                    this.c[t].appendBuffer(e)
                }, us.qc = function(t, e, i) {
                    i <= e ? this.Ja(t) : this.c[t].remove(e, i)
                }, us.Ec = function(t) {
                    var e = this.c[t].appendWindowEnd;
                    this.c[t].abort(), this.c[t].appendWindowEnd = e, this.Ja(t)
                }, us.Oc = function(t) {
                    this.f.currentTime -= .001, this.Ja(t)
                }, us.$d = function(t, e) {
                    this.c[t].timestampOffset = e, this.Ja(t)
                }, us.Yd = function(t, e) {
                    this.c[t].appendWindowEnd = e + .04, this.Ja(t)
                }, us.ke = function(t) {
                    this.b[t][0].p.reject(new u(2, 3, 3014, this.f.error ? this.f.error.code : 0))
                }, us.Ja = function(t) {
                    var e = this.b[t][0];
                    e && (e.p.resolve(), Ft(this, t))
                };
                var ys = 1,
                    Ts = 2,
                    ws = {
                        aar: "aa",
                        abk: "ab",
                        afr: "af",
                        aka: "ak",
                        alb: "sq",
                        amh: "am",
                        ara: "ar",
                        arg: "an",
                        arm: "hy",
                        asm: "as",
                        ava: "av",
                        ave: "ae",
                        aym: "ay",
                        aze: "az",
                        bak: "ba",
                        bam: "bm",
                        baq: "eu",
                        bel: "be",
                        ben: "bn",
                        bih: "bh",
                        bis: "bi",
                        bod: "bo",
                        bos: "bs",
                        bre: "br",
                        bul: "bg",
                        bur: "my",
                        cat: "ca",
                        ces: "cs",
                        cha: "ch",
                        che: "ce",
                        chi: "zh",
                        chu: "cu",
                        chv: "cv",
                        cor: "kw",
                        cos: "co",
                        cre: "cr",
                        cym: "cy",
                        cze: "cs",
                        dan: "da",
                        deu: "de",
                        div: "dv",
                        dut: "nl",
                        dzo: "dz",
                        ell: "el",
                        eng: "en",
                        epo: "eo",
                        est: "et",
                        eus: "eu",
                        ewe: "ee",
                        fao: "fo",
                        fas: "fa",
                        fij: "fj",
                        fin: "fi",
                        fra: "fr",
                        fre: "fr",
                        fry: "fy",
                        ful: "ff",
                        geo: "ka",
                        ger: "de",
                        gla: "gd",
                        gle: "ga",
                        glg: "gl",
                        glv: "gv",
                        gre: "el",
                        grn: "gn",
                        guj: "gu",
                        hat: "ht",
                        hau: "ha",
                        heb: "he",
                        her: "hz",
                        hin: "hi",
                        hmo: "ho",
                        hrv: "hr",
                        hun: "hu",
                        hye: "hy",
                        ibo: "ig",
                        ice: "is",
                        ido: "io",
                        iii: "ii",
                        iku: "iu",
                        ile: "ie",
                        ina: "ia",
                        ind: "id",
                        ipk: "ik",
                        isl: "is",
                        ita: "it",
                        jav: "jv",
                        jpn: "ja",
                        kal: "kl",
                        kan: "kn",
                        kas: "ks",
                        kat: "ka",
                        kau: "kr",
                        kaz: "kk",
                        khm: "km",
                        kik: "ki",
                        kin: "rw",
                        kir: "ky",
                        kom: "kv",
                        kon: "kg",
                        kor: "ko",
                        kua: "kj",
                        kur: "ku",
                        lao: "lo",
                        lat: "la",
                        lav: "lv",
                        lim: "li",
                        lin: "ln",
                        lit: "lt",
                        ltz: "lb",
                        lub: "lu",
                        lug: "lg",
                        mac: "mk",
                        mah: "mh",
                        mal: "ml",
                        mao: "mi",
                        mar: "mr",
                        may: "ms",
                        mkd: "mk",
                        mlg: "mg",
                        mlt: "mt",
                        mon: "mn",
                        mri: "mi",
                        msa: "ms",
                        mya: "my",
                        nau: "na",
                        nav: "nv",
                        nbl: "nr",
                        nde: "nd",
                        ndo: "ng",
                        nep: "ne",
                        nld: "nl",
                        nno: "nn",
                        nob: "nb",
                        nor: "no",
                        nya: "ny",
                        oci: "oc",
                        oji: "oj",
                        ori: "or",
                        orm: "om",
                        oss: "os",
                        pan: "pa",
                        per: "fa",
                        pli: "pi",
                        pol: "pl",
                        por: "pt",
                        pus: "ps",
                        que: "qu",
                        roh: "rm",
                        ron: "ro",
                        rum: "ro",
                        run: "rn",
                        rus: "ru",
                        sag: "sg",
                        san: "sa",
                        sin: "si",
                        slk: "sk",
                        slo: "sk",
                        slv: "sl",
                        sme: "se",
                        smo: "sm",
                        sna: "sn",
                        snd: "sd",
                        som: "so",
                        sot: "st",
                        spa: "es",
                        sqi: "sq",
                        srd: "sc",
                        srp: "sr",
                        ssw: "ss",
                        sun: "su",
                        swa: "sw",
                        swe: "sv",
                        tah: "ty",
                        tam: "ta",
                        tat: "tt",
                        tel: "te",
                        tgk: "tg",
                        tgl: "tl",
                        tha: "th",
                        tib: "bo",
                        tir: "ti",
                        ton: "to",
                        tsn: "tn",
                        tso: "ts",
                        tuk: "tk",
                        tur: "tr",
                        twi: "tw",
                        uig: "ug",
                        ukr: "uk",
                        urd: "ur",
                        uzb: "uz",
                        ven: "ve",
                        vie: "vi",
                        vol: "vo",
                        wel: "cy",
                        wln: "wa",
                        wol: "wo",
                        xho: "xh",
                        yid: "yi",
                        yor: "yo",
                        zha: "za",
                        zho: "zh",
                        zul: "zu"
                    };
                e("shaka.abr.SimpleAbrManager", ae), ae.prototype.stop = function() {
                    this.f = null, this.b = !1, this.h = [], this.g = [], this.c = null
                }, ae.prototype.stop = ae.prototype.stop, ae.prototype.init = function(t) {
                    this.f = t
                }, ae.prototype.init = ae.prototype.init, ae.prototype.chooseStreams = function(t) {
                    var e = {};
                    if (-1 < t.indexOf("audio") || -1 < t.indexOf("video")) {
                        var i = this.h,
                            n = se(this.i, i),
                            r = this.a.getBandwidthEstimate();
                        if (i.length && !n.length) throw new u(2, 4, 4012);
                        for (var i = n[0], a = 0; a < n.length; ++a) {
                            var s = n[a],
                                o = (n[a + 1] || {
                                    bandwidth: 1 / 0
                                }).bandwidth / .85;
                            r >= s.bandwidth / .95 && r <= o && (i = s)
                        }(n = i) && n.video && (e.video = n.video), n && n.audio && (e.audio = n.audio)
                    }
                    return -1 < t.indexOf("text") && (e.text = this.g[0]), this.c = Date.now(), e
                }, ae.prototype.chooseStreams = ae.prototype.chooseStreams, ae.prototype.enable = function() {
                    this.b = !0
                }, ae.prototype.enable = ae.prototype.enable, ae.prototype.disable = function() {
                    this.b = !1
                }, ae.prototype.disable = ae.prototype.disable, ae.prototype.segmentDownloaded = function(t, e) {
                    var i = this.a;
                    if (!(16e3 > e)) {
                        var n = 8e3 * e / t,
                            a = t / 1e3;
                        i.a += e, r(i.c, a, n), r(i.f, a, n)
                    }
                    if (null != this.c && this.b) t: {
                        if (this.j) {
                            if (8e3 > Date.now() - this.c) break t
                        } else {
                            if (!(128e3 <= this.a.a)) break t;
                            this.j = !0
                        }
                        i = this.chooseStreams(["audio", "video"]), this.a.getBandwidthEstimate(), this.f(i)
                    }
                }, ae.prototype.segmentDownloaded = ae.prototype.segmentDownloaded, ae.prototype.getBandwidthEstimate = function() {
                    return this.a.getBandwidthEstimate()
                }, ae.prototype.getBandwidthEstimate = ae.prototype.getBandwidthEstimate, ae.prototype.setDefaultEstimate = function(t) {
                    this.a.setDefaultEstimate(t)
                }, ae.prototype.setDefaultEstimate = ae.prototype.setDefaultEstimate, ae.prototype.setRestrictions = function(t) {
                    this.i = t
                }, ae.prototype.setRestrictions = ae.prototype.setRestrictions, ae.prototype.setVariants = function(t) {
                    this.h = t
                }, ae.prototype.setVariants = ae.prototype.setVariants, ae.prototype.setTextStreams = function(t) {
                    this.g = t
                }, ae.prototype.setTextStreams = ae.prototype.setTextStreams, oe.prototype.preventDefault = function() {
                    this.cancelable && (this.defaultPrevented = !0)
                }, oe.prototype.stopImmediatePropagation = function() {
                    this.a = !0
                }, oe.prototype.stopPropagation = function() {};
                var Es = "ended play playing pause pausing ratechange seeked seeking timeupdate volumechange".split(" "),
                    ks = "buffered currentTime duration ended loop muted paused playbackRate seeking videoHeight videoWidth volume".split(" "),
                    Ss = ["loop", "playbackRate"],
                    Is = ["pause", "play"],
                    As = "adaptation buffering emsg error loading unloading texttrackvisibility timelineregionadded timelineregionenter timelineregionexit trackschanged".split(" "),
                    xs = "drmInfo getAudioLanguages getConfiguration getExpiration getManifestUri getPlaybackRate getPlayheadTimeAsDate getTextLanguages getTextTracks getTracks getStats getVariantTracks isBuffering isInProgress isLive isTextTrackVisible keySystem seekRange".split(" "),
                    _s = [
                        ["getConfiguration", "configure"]
                    ],
                    Ps = [
                        ["isTextTrackVisible", "setTextTrackVisibility"]
                    ],
                    Cs = "addTextTrack cancelTrickPlay configure resetConfiguration selectAudioLanguage selectTextLanguage selectTextTrack selectTrack selectVariantTrack setTextTrackVisibility trickPlay".split(" "),
                    Ns = ["load", "unload"];
                us = de.prototype, us.m = function() {
                    return le(this), this.a && (this.a.leave(function() {}, function() {}), this.a = null), this.G = this.B = this.l = null, this.c = this.j = this.h = !1, this.g = this.f = this.b = this.i = null, Promise.resolve()
                }, us.V = function() {
                    return this.c
                }, us.Fb = function() {
                    return this.A
                }, us.init = function() {
                    if (t.chrome && chrome.cast && chrome.cast.isAvailable) {
                        delete t.__onGCastApiAvailable, this.h = !0, this.l();
                        var e = new chrome.cast.SessionRequest(this.J),
                            e = new chrome.cast.ApiConfig(e, this.gd.bind(this), this.sd.bind(this), "origin_scoped");
                        chrome.cast.initialize(e, function() {}, function() {})
                    } else t.__onGCastApiAvailable = function(t) {
                        t && this.init()
                    }.bind(this)
                }, us.Ib = function(t) {
                    this.i = t, this.c && fe(this, {
                        type: "appData",
                        appData: this.i
                    })
                }, us.cast = function(t) {
                    return this.h ? this.j ? this.c ? Promise.reject(new u(1, 8, 8002)) : (this.g = new _, chrome.cast.requestSession(this.Bb.bind(this, t), this.cc.bind(this)), this.g) : Promise.reject(new u(1, 8, 8001)) : Promise.reject(new u(1, 8, 8e3))
                }, us.ab = function() {
                    this.c && (le(this), this.a && (this.a.stop(function() {}, function() {}), this.a = null))
                }, us.get = function(t, e) {
                    if ("video" == t) {
                        if (0 <= Is.indexOf(e)) return this.pc.bind(this, t, e)
                    } else if ("player" == t) {
                        if (0 <= Cs.indexOf(e)) return this.pc.bind(this, t, e);
                        if (0 <= Ns.indexOf(e)) return this.Pd.bind(this, t, e);
                        if (0 <= xs.indexOf(e)) return this.lc.bind(this, t, e)
                    }
                    return this.lc(t, e)
                }, us.set = function(t, e, i) {
                    this.b[t][e] = i, fe(this, {
                        type: "set",
                        targetName: t,
                        property: e,
                        value: i
                    })
                }, us.Bb = function(t, e) {
                    this.a = e, this.a.addUpdateListener(this.dc.bind(this)), this.a.addMessageListener("urn:x-cast:com.google.shaka.v2", this.md.bind(this)), this.dc(), fe(this, {
                        type: "init",
                        initState: t,
                        appData: this.i
                    }), this.g.resolve()
                }, us.cc = function(t) {
                    var e = 8003;
                    switch (t.code) {
                        case "cancel":
                            e = 8004;
                            break;
                        case "timeout":
                            e = 8005;
                            break;
                        case "receiver_unavailable":
                            e = 8006
                    }
                    this.g.reject(new u(2, 8, e, t))
                }, us.lc = function(t, e) {
                    return this.b[t][e]
                }, us.pc = function(t, e) {
                    fe(this, {
                        type: "call",
                        targetName: t,
                        methodName: e,
                        args: Array.prototype.slice.call(arguments, 2)
                    })
                }, us.Pd = function(t, e) {
                    var i = Array.prototype.slice.call(arguments, 2),
                        n = new _,
                        r = this.o.toString();
                    return this.o++, this.f[r] = n, fe(this, {
                        type: "asyncCall",
                        targetName: t,
                        methodName: e,
                        args: i,
                        id: r
                    }), n
                }, us.gd = function(t) {
                    var e = this.v();
                    this.g = new _, this.Bb(e, t)
                }, us.sd = function(t) {
                    this.j = "available" == t, this.l()
                }, us.dc = function() {
                    var t = !!this.a && "connected" == this.a.status;
                    if (this.c && !t) {
                        this.G();
                        for (var e in this.b) this.b[e] = {};
                        le(this)
                    }
                    this.A = (this.c = t) ? this.a.receiver.friendlyName : "", this.l()
                }, us.md = function(t, e) {
                    var i = he(e);
                    switch (i.type) {
                        case "event":
                            var n = i.targetName,
                                r = i.event;
                            this.B(n, new oe(r.type, r));
                            break;
                        case "update":
                            r = i.update;
                            for (n in r) {
                                var i = this.b[n] || {};
                                for (a in r[n]) i[a] = r[n][a]
                            }
                            break;
                        case "asyncComplete":
                            n = i.id;
                            var a = i.error;
                            if (i = this.f[n], delete this.f[n], i)
                                if (a) {
                                    n = new u(a.severity, a.category, a.code);
                                    for (r in a) n[r] = a[r];
                                    i.reject(n)
                                } else i.resolve()
                    }
                }, pe.prototype.addEventListener = function(t, e) {
                    this.nb.push(t, e)
                }, pe.prototype.removeEventListener = function(t, e) {
                    this.nb.remove(t, e)
                }, pe.prototype.dispatchEvent = function(t) {
                    for (var e = this.nb.get(t.type) || [], i = 0; i < e.length; ++i) {
                        t.target = this.Ua, t.currentTarget = this.Ua;
                        var n = e[i];
                        try {
                            n.handleEvent ? n.handleEvent(t) : n.call(this, t)
                        } catch (r) {}
                        if (t.a) break
                    }
                    return t.defaultPrevented
                }, i(me), e("shaka.cast.CastProxy", me), me.prototype.m = function(t) {
                    return t && this.a && this.a.ab(), t = [this.h ? this.h.m() : null, this.b ? this.b.m() : null, this.a ? this.a.m() : null], this.a = this.h = this.i = this.j = this.b = this.c = null, Promise.all(t)
                }, me.prototype.destroy = me.prototype.m, me.prototype.Zc = function() {
                    return this.j
                }, me.prototype.getVideo = me.prototype.Zc, me.prototype.Tc = function() {
                    return this.i
                }, me.prototype.getPlayer = me.prototype.Tc, me.prototype.Fc = function() {
                    return !!this.a && (this.a.h && this.a.j)
                }, me.prototype.canCast = me.prototype.Fc, me.prototype.V = function() {
                    return !!this.a && this.a.V()
                }, me.prototype.isCasting = me.prototype.V, me.prototype.Fb = function() {
                    return this.a ? this.a.Fb() : ""
                }, me.prototype.receiverName = me.prototype.Fb, me.prototype.cast = function() {
                    var t = this.Vb();
                    return this.a.cast(t).then(function() {
                        return this.b.ib()
                    }.bind(this))
                }, me.prototype.cast = me.prototype.cast, me.prototype.Ib = function(t) {
                    this.a.Ib(t)
                }, me.prototype.setAppData = me.prototype.Ib, me.prototype.ne = function() {
                    var t = this.a;
                    if (t.c) {
                        var e = t.v();
                        chrome.cast.requestSession(t.Bb.bind(t, e), t.cc.bind(t))
                    }
                }, me.prototype.suggestDisconnect = me.prototype.ne, me.prototype.ab = function() {
                    this.a.ab()
                }, me.prototype.forceDisconnect = me.prototype.ab, us = me.prototype, us.Vb = function() {
                    var t = {
                        video: {},
                        player: {},
                        playerAfterLoad: {},
                        manifest: this.b.Za,
                        startTime: null
                    };
                    return this.c.pause(), Ss.forEach(function(e) {
                        t.video[e] = this.c[e]
                    }.bind(this)), this.c.ended || (t.startTime = this.c.currentTime), _s.forEach(function(e) {
                        var i = e[1];
                        e = this.b[e[0]](), t.player[i] = e
                    }.bind(this)), Ps.forEach(function(e) {
                        var i = e[1];
                        e = this.b[e[0]](), t.playerAfterLoad[i] = e
                    }.bind(this)), t
                }, us.fe = function() {
                    this.dispatchEvent(new oe("caststatuschanged"))
                }, us.he = function() {
                    _s.forEach(function(t) {
                        var e = t[1];
                        t = this.a.get("player", t[0])(), this.b[e](t)
                    }.bind(this));
                    var t = this.a.get("player", "getManifestUri")(),
                        e = this.a.get("video", "ended"),
                        i = Promise.resolve(),
                        n = this.c.autoplay,
                        r = null;
                    e || (r = this.a.get("video", "currentTime")), t && (this.c.autoplay = !1, i = this.b.load(t, r), i["catch"](function(t) {
                        this.b.dispatchEvent(new oe("error", {
                            detail: t
                        }))
                    }.bind(this)));
                    var a = {};
                    Ss.forEach(function(t) {
                        a[t] = this.a.get("video", t)
                    }.bind(this)), i.then(function() {
                        Ss.forEach(function(t) {
                            this.c[t] = a[t]
                        }.bind(this)), Ps.forEach(function(t) {
                            var e = t[1];
                            t = this.a.get("player", t[0])(), this.b[e](t)
                        }.bind(this)), this.c.autoplay = n, t && this.c.play()
                    }.bind(this))
                }, us.te = function(t) {
                    if ("addEventListener" == t) return this.g.addEventListener.bind(this.g);
                    if ("removeEventListener" == t) return this.g.removeEventListener.bind(this.g);
                    if (this.a.V() && !Object.keys(this.a.b.video).length) {
                        var e = this.c[t];
                        if ("function" != typeof e) return e
                    }
                    return this.a.V() ? this.a.get("video", t) : (e = this.c[t], "function" == typeof e && (e = e.bind(this.c)), e)
                }, us.ve = function(t, e) {
                    this.a.V() ? this.a.set("video", t, e) : this.c[t] = e
                }, us.ue = function(t) {
                    this.a.V() || this.g.dispatchEvent(new oe(t.type, t))
                }, us.Hd = function(t) {
                    return "addEventListener" == t ? this.f.addEventListener.bind(this.f) : "removeEventListener" == t ? this.f.removeEventListener.bind(this.f) : "getNetworkingEngine" == t ? this.b.Wb.bind(this.b) : this.a.V() && !Object.keys(this.a.b.video).length && 0 <= xs.indexOf(t) || !this.a.V() ? (t = this.b[t], t.bind(this.b)) : this.a.get("player", t)
                }, us.Id = function(t) {
                    this.a.V() || this.f.dispatchEvent(t)
                }, us.ge = function(t, e) {
                    this.a.V() && ("video" == t ? this.g.dispatchEvent(e) : "player" == t && this.f.dispatchEvent(e))
                }, i(ge), e("shaka.cast.CastReceiver", ge), ge.prototype.isConnected = function() {
                    return this.i
                }, ge.prototype.isConnected = ge.prototype.isConnected, ge.prototype.ad = function() {
                    return this.f
                }, ge.prototype.isIdle = ge.prototype.ad, ge.prototype.m = function() {
                    var e = this.b ? this.b.m() : Promise.resolve();
                    return null != this.h && t.clearTimeout(this.h), this.l = this.j = this.b = this.a = null, this.i = !1, this.f = !0, this.h = this.g = this.c = null, e.then(function() {
                        cast.receiver.CastReceiverManager.getInstance().stop()
                    })
                }, ge.prototype.destroy = ge.prototype.m, us = ge.prototype, us.jc = function() {
                    this.i = !!cast.receiver.CastReceiverManager.getInstance().getSenders().length, ye(this)
                }, us.mc = function(t, e) {
                    this.Cb(), we(this, {
                        type: "event",
                        targetName: t,
                        event: e
                    }, this.c)
                }, us.Cb = function() {
                    null != this.h && t.clearTimeout(this.h), this.h = t.setTimeout(this.Cb.bind(this), 500);
                    var e = {
                        video: {},
                        player: {}
                    };
                    ks.forEach(function(t) {
                        e.video[t] = this.a[t]
                    }.bind(this)), xs.forEach(function(t) {
                        e.player[t] = this.b[t]()
                    }.bind(this));
                    var i = cast.receiver.CastReceiverManager.getInstance().getSystemVolume();
                    i && (e.video.volume = i.level, e.video.muted = i.muted), we(this, {
                        type: "update",
                        update: e
                    }, this.c)
                }, us.Mc = function() {
                    var t = cast.receiver.CastReceiverManager.getInstance().getSystemVolume();
                    t && we(this, {
                        type: "update",
                        update: {
                            video: {
                                volume: t.level,
                                muted: t.muted
                            }
                        }
                    }, this.c), we(this, {
                        type: "event",
                        targetName: "video",
                        event: {
                            type: "volumechange"
                        }
                    }, this.c)
                }, us.vd = function(t) {
                    var e = he(t.data);
                    switch (e.type) {
                        case "init":
                            Te(this, e.initState, e.appData), this.Cb();
                            break;
                        case "appData":
                            this.l(e.appData);
                            break;
                        case "set":
                            var i = e.targetName,
                                n = e.property,
                                r = e.value;
                            if ("video" == i) {
                                if (e = cast.receiver.CastReceiverManager.getInstance(), "volume" == n) {
                                    e.setSystemVolumeLevel(r);
                                    break
                                }
                                if ("muted" == n) {
                                    e.setSystemVolumeMuted(r);
                                    break
                                }
                            }
                            this.j[i][n] = r;
                            break;
                        case "call":
                            i = e.targetName, n = e.methodName, r = e.args, i = this.j[i], i[n].apply(i, r);
                            break;
                        case "asyncCall":
                            i = e.targetName, n = e.methodName, r = e.args, e = e.id, t = t.senderId, i = this.j[i], i[n].apply(i, r).then(this.vc.bind(this, t, e, null), this.vc.bind(this, t, e))
                    }
                }, us.hd = function(t) {
                    var e = he(t.data);
                    switch (e.type) {
                        case "PLAY":
                            this.a.play(), Ee(this, 0);
                            break;
                        case "PAUSE":
                            this.a.pause(), Ee(this, 0);
                            break;
                        case "SEEK":
                            t = e.currentTime;
                            var i = e.resumeState;
                            null != t && (this.a.currentTime = Number(t)), i && "PLAYBACK_START" == i ? (this.a.play(), Ee(this, 0)) : i && "PLAYBACK_PAUSE" == i && (this.a.pause(), Ee(this, 0));
                            break;
                        case "STOP":
                            this.b.ib().then(function() {
                                Ee(this, 0)
                            }.bind(this));
                            break;
                        case "GET_STATUS":
                            Ee(this, Number(e.requestId));
                            break;
                        case "VOLUME":
                            i = e.volume, t = i.level;
                            var i = i.muted,
                                n = this.a.volume,
                                r = this.a.muted;
                            null != t && (this.a.volume = Number(t)), null != i && (this.a.muted = i), n == this.a.volume && r == this.a.muted || Ee(this, 0);
                            break;
                        case "LOAD":
                            i = e.media.contentId, t = e.currentTime;
                            var a = this.o(i);
                            this.a.autoplay = !0, this.b.load(a, t).then(function() {
                                Ee(this, 0, {
                                    contentId: a,
                                    streamType: this.b.$() ? "LIVE" : "BUFFERED",
                                    contentType: ""
                                })
                            }.bind(this))["catch"](function(t) {
                                var i = "LOAD_FAILED";
                                7 == t.category && 7e3 == t.code && (i = "LOAD_CANCELLED"), we(this, {
                                    requestId: Number(e.requestId),
                                    type: i
                                }, this.g)
                            }.bind(this));
                            break;
                        default:
                            we(this, {
                                requestId: Number(e.requestId),
                                type: "INVALID_REQUEST",
                                reason: "INVALID_COMMAND"
                            }, this.g)
                    }
                }, us.vc = function(t, e, i) {
                    we(this, {
                        type: "asyncComplete",
                        id: e,
                        error: i
                    }, this.c, t)
                };
                var Rs = {
                        IDLE: "IDLE",
                        Cc: "PLAYING",
                        Ac: "BUFFERING",
                        Bc: "PAUSED"
                    },
                    Ls = {
                        "urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b": "org.w3.clearkey",
                        "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": "com.widevine.alpha",
                        "urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95": "com.microsoft.playready",
                        "urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb": "com.adobe.primetime"
                    };
                e("shaka.media.InitSegmentReference", Ve), e("shaka.media.SegmentReference", Ke), e("shaka.util.DataViewReader", qe);
                var Ms = 1;
                qe.Endianness = {
                    we: 0,
                    ye: Ms
                }, qe.prototype.Z = function() {
                    return this.u < this.H.byteLength
                }, qe.prototype.hasMoreData = qe.prototype.Z, qe.prototype.Vc = function() {
                    return this.u
                }, qe.prototype.getPosition = qe.prototype.Vc, qe.prototype.Qc = function() {
                    return this.H.byteLength
                }, qe.prototype.getLength = qe.prototype.Qc, qe.prototype.Eb = function() {
                    try {
                        var t = this.H.getUint8(this.u)
                    } catch (e) {
                        Ge()
                    }
                    return this.u += 1, t
                }, qe.prototype.readUint8 = qe.prototype.Eb, qe.prototype.oc = function() {
                    try {
                        var t = this.H.getUint16(this.u, this.a)
                    } catch (e) {
                        Ge()
                    }
                    return this.u += 2, t
                }, qe.prototype.readUint16 = qe.prototype.oc, qe.prototype.D = function() {
                    try {
                        var t = this.H.getUint32(this.u, this.a)
                    } catch (e) {
                        Ge()
                    }
                    return this.u += 4, t
                }, qe.prototype.readUint32 = qe.prototype.D, qe.prototype.nc = function() {
                    try {
                        var t = this.H.getInt32(this.u, this.a)
                    } catch (e) {
                        Ge()
                    }
                    return this.u += 4, t
                }, qe.prototype.readInt32 = qe.prototype.nc, qe.prototype.Qa = function() {
                    try {
                        if (this.a) var t = this.H.getUint32(this.u, !0),
                            e = this.H.getUint32(this.u + 4, !0);
                        else e = this.H.getUint32(this.u, !1), t = this.H.getUint32(this.u + 4, !1)
                    } catch (i) {
                        Ge()
                    }
                    if (2097151 < e) throw new u(2, 3, 3001);
                    return this.u += 8, e * Math.pow(2, 32) + t
                }, qe.prototype.readUint64 = qe.prototype.Qa, qe.prototype.La = function(t) {
                    this.u + t > this.H.byteLength && Ge();
                    var e = this.H.buffer.slice(this.u, this.u + t);
                    return this.u += t, new Uint8Array(e)
                }, qe.prototype.readBytes = qe.prototype.La, qe.prototype.I = function(t) {
                    this.u + t > this.H.byteLength && Ge(), this.u += t
                }, qe.prototype.skip = qe.prototype.I, qe.prototype.Db = function() {
                    for (var t = this.u; this.Z() && this.H.getUint8(this.u);) this.u += 1;
                    return t = this.H.buffer.slice(t, this.u), this.u += 1, G(t)
                }, qe.prototype.readTerminatedString = qe.prototype.Db, e("shaka.util.Mp4Parser", Xe), Xe.prototype.C = function(t, e) {
                    var i = $e(t);
                    return this.b[i] = 0, this.a[i] = e, this
                }, Xe.prototype.box = Xe.prototype.C, Xe.prototype.da = function(t, e) {
                    var i = $e(t);
                    return this.b[i] = 1, this.a[i] = e, this
                }, Xe.prototype.fullBox = Xe.prototype.da, Xe.prototype.parse = function(t) {
                    for (t = new qe(new DataView(t), 0); t.Z();) this.fb(0, t)
                }, Xe.prototype.parse = Xe.prototype.parse, Xe.prototype.fb = function(t, e) {
                    var i = e.u,
                        n = e.D(),
                        r = e.D();
                    switch (n) {
                        case 0:
                            n = e.H.byteLength - i;
                            break;
                        case 1:
                            n = e.Qa()
                    }
                    var a = this.a[r];
                    if (a) {
                        var s = null,
                            o = null;
                        1 == this.b[r] && (o = e.D(), s = o >>> 24, o &= 16777215), r = i + n - e.u, r = 0 < r ? e.La(r).buffer : new ArrayBuffer(0), r = new qe(new DataView(r), 0), a({
                            Oa: this,
                            version: s,
                            Nc: o,
                            s: r,
                            size: n,
                            start: i + t
                        })
                    } else e.I(i + n - e.u)
                }, Xe.prototype.parseNext = Xe.prototype.fb, Xe.children = Ye, Xe.sampleDescription = We, Xe.allData = ze, e("shaka.media.SegmentIndex", Ze), Ze.prototype.m = function() {
                    return this.a = null, Promise.resolve()
                }, Ze.prototype.destroy = Ze.prototype.m, Ze.prototype.find = function(t) {
                    for (var e = this.a.length - 1; 0 <= e; --e) {
                        var i = this.a[e];
                        if (t >= i.startTime && t < i.endTime) return i.position
                    }
                    return this.a.length && t < this.a[0].startTime ? this.a[0].position : null
                }, Ze.prototype.find = Ze.prototype.find, Ze.prototype.get = function(t) {
                    return this.a.length ? (t -= this.a[0].position, 0 > t || t >= this.a.length ? null : this.a[t]) : null
                }, Ze.prototype.get = Ze.prototype.get, Ze.prototype.xb = function(t) {
                    for (var e, i, n = [], r = i = 0; i < this.a.length && r < t.length;) {
                        var a = this.a[i];
                        e = t[r], a.startTime < e.startTime ? (n.push(a), i++) : (a.startTime > e.startTime || (.1 < Math.abs(a.endTime - e.endTime) ? n.push(e) : n.push(a), i++), r++)
                    }
                    for (; i < this.a.length;) n.push(this.a[i++]);
                    if (n.length)
                        for (i = n[n.length - 1].position + 1; r < t.length;) e = t[r++], e = new Ke((i++), e.startTime, e.endTime, e.a, e.X, e.M), n.push(e);
                    else n = t;
                    this.a = n
                }, Ze.prototype.merge = Ze.prototype.xb, Ze.prototype.qb = function(t) {
                    for (var e = 0; e < this.a.length && !(this.a[e].endTime > t); ++e);
                    this.a.splice(0, e)
                }, Ze.prototype.evict = Ze.prototype.qb;
                var Ds;
                ei.prototype.Z = function() {
                    return this.a.Z()
                }, si.prototype.parse = function(t, e, i, n) {
                    var r;
                    if (e = new ei(new DataView(e)), 440786851 != ii(e).id) throw new u(2, 3, 3008);
                    var a = ii(e);
                    if (408125543 != a.id) throw new u(2, 3, 3009);
                    for (e = a.a.byteOffset, a = new ei(a.a), r = null; a.Z();) {
                        var s = ii(a);
                        if (357149030 == s.id) {
                            r = s;
                            break
                        }
                    }
                    if (!r) throw new u(2, 3, 3010);
                    for (a = new ei(r.a), r = 1e6, s = null; a.Z();) {
                        var o = ii(a);
                        if (2807729 == o.id) r = ai(o);
                        else if (17545 == o.id)
                            if (s = o, 4 == s.a.byteLength) s = s.a.getFloat32(0);
                            else {
                                if (8 != s.a.byteLength) throw new u(2, 3, 3003);
                                s = s.a.getFloat64(0)
                            }
                    }
                    if (null == s) throw new u(2, 3, 3011);
                    if (a = r / 1e9, r = s * a, t = ii(new ei(new DataView(t))), 475249515 != t.id) throw new u(2, 3, 3007);
                    return oi(t, e, a, r, i, n)
                };
                var Os = {},
                    Us = {};
                e("shaka.media.ManifestParser.registerParserByExtension", function(t, e) {
                    Us[t] = e
                }), e("shaka.media.ManifestParser.registerParserByMime", function(t, e) {
                    Os[t] = e
                }), e("shaka.media.PresentationTimeline", Si), Si.prototype.Y = function() {
                    return this.a
                }, Si.prototype.getDuration = Si.prototype.Y, Si.prototype.qa = function(t) {
                    this.a = t
                }, Si.prototype.setDuration = Si.prototype.qa, Si.prototype.Wc = function() {
                    return this.f
                }, Si.prototype.getPresentationStartTime = Si.prototype.Wc, Si.prototype.wc = function(t) {
                    this.h = t
                }, Si.prototype.setClockOffset = Si.prototype.wc, Si.prototype.yc = function(t) {
                    this.g = t
                }, Si.prototype.setStatic = Si.prototype.yc, Si.prototype.Xc = function() {
                    return this.c
                }, Si.prototype.getSegmentAvailabilityDuration = Si.prototype.Xc, Si.prototype.xc = function(t) {
                    this.c = t
                }, Si.prototype.setSegmentAvailabilityDuration = Si.prototype.xc, Si.prototype.Ia = function(t, e) {
                    e.length && (this.b = e.reduce(function(t, e) {
                        return Math.max(t, e.endTime - e.startTime)
                    }, this.b))
                }, Si.prototype.notifySegments = Si.prototype.Ia, Si.prototype.yb = function(t) {
                    this.b = Math.max(this.b, t)
                }, Si.prototype.notifyMaxSegmentDuration = Si.prototype.yb, Si.prototype.$ = function() {
                    return 1 / 0 == this.a && !this.g
                }, Si.prototype.isLive = Si.prototype.$, Si.prototype.wa = function() {
                    return 1 / 0 != this.a && !this.g
                }, Si.prototype.isInProgress = Si.prototype.wa, Si.prototype.na = function() {
                    return this.Fa(0)
                }, Si.prototype.getSegmentAvailabilityStart = Si.prototype.na, Si.prototype.Fa = function(t) {
                    if (1 / 0 == this.c) return 0;
                    var e = this.va();
                    return Math.max(0, Math.min(e - this.c + t, e))
                }, Si.prototype.getSafeAvailabilityStart = Si.prototype.Fa, Si.prototype.va = function() {
                    return this.$() || this.wa() ? Math.min(Math.max(0, (Date.now() + this.h) / 1e3 - this.b - this.f), this.a) : this.a
                }, Si.prototype.getSegmentAvailabilityEnd = Si.prototype.va, Si.prototype.cb = function() {
                    return Math.max(0, this.va() - (this.$() || this.wa() ? this.i : 0))
                }, Si.prototype.getSeekRangeEnd = Si.prototype.cb, e("shaka.dash.DashParser", Ii), us = Ii.prototype, us.configure = function(t) {
                    this.b = t
                }, us.start = function(t, e) {
                    return this.g = [t], this.a = e, Ai(this).then(function() {
                        return this.a && Ri(this, 0), this.c
                    }.bind(this))
                }, us.stop = function() {
                    return this.b = this.a = null, this.g = [], this.c = null, this.i = [], this.j = {}, null != this.f && (t.clearTimeout(this.f), this.f = null), Promise.resolve()
                }, us.update = function() {
                    Ai(this)["catch"](function(t) {
                        this.a && this.a.onError(t)
                    }.bind(this))
                }, us.onExpirationUpdated = function() {}, us.Dd = function(t, e) {
                    t.S = Li(e, t.T, null);
                    var i = !1,
                        n = Se(e, "Role"),
                        r = n.map(function(t) {
                            return t.getAttribute("value")
                        }).filter(w),
                        a = void 0;
                    "text" == t.S.contentType && (a = "subtitle");
                    for (var s = 0; s < n.length; s++) {
                        var o = n[s].getAttribute("schemeIdUri");
                        if (null == o || "urn:mpeg:dash:role:2011" == o) switch (o = n[s].getAttribute("value")) {
                            case "main":
                                i = !0;
                                break;
                            case "caption":
                            case "subtitle":
                                a = o
                        }
                    }
                    var h = null,
                        c = !1;
                    if (Se(e, "EssentialProperty").forEach(function(t) {
                        "http://dashif.org/guidelines/trickmode" == t.getAttribute("schemeIdUri") ? h = t.getAttribute("value") : c = !0
                    }), c) return null;
                    var n = Se(e, "ContentProtection"),
                        d = Me(n, this.b.dash.customScheme, this.b.dash.ignoreDrmInfo),
                        n = Vt(e.getAttribute("lang") || "und"),
                        o = e.getAttribute("label"),
                        s = Se(e, "Representation"),
                        r = s.map(this.Gd.bind(this, t, d, a, n, o, i, r)).filter(function(t) {
                            return !!t
                        });
                    if (!r.length) throw new u(2, 4, 4003);
                    return t.S.contentType && "application" != t.S.contentType || (t.S.contentType = Ui(r[0].mimeType, r[0].codecs), r.forEach(function(e) {
                        e.type = t.S.contentType
                    })), r.forEach(function(t) {
                        d.drmInfos.forEach(function(e) {
                            t.keyId && e.keyIds.push(t.keyId)
                        })
                    }), a = s.map(function(t) {
                        return t.getAttribute("id")
                    }).filter(w), {
                        id: t.S.id || "__fake__" + this.h++,
                        contentType: t.S.contentType,
                        language: n,
                        vb: i,
                        streams: r,
                        drmInfos: d.drmInfos,
                        Ob: h,
                        Qd: a
                    }
                }, us.Gd = function(t, e, i, n, r, a, s, o) {
                    if (t.w = Li(o, t.S, null), !Mi(t.w)) return null;
                    t.bandwidth = Ae(o, "bandwidth", Ne) || void 0;
                    var u = this.Rd.bind(this);
                    if (t.w.Ra) u = ci(t, u);
                    else if (t.w.pa) u = fi(t, this.j);
                    else if (t.w.Sa) u = gi(t, u, this.j, !!this.c);
                    else {
                        var h = t.w.U,
                            c = t.R.duration || 0;
                        u = {
                            createSegmentIndex: Promise.resolve.bind(Promise),
                            findSegmentPosition: function(t) {
                                return 0 <= t && t < c ? 1 : null
                            },
                            getSegmentReference: function(t) {
                                return 1 != t ? null : new Ke(1, 0, c, function() {
                                    return h
                                }, 0, null)
                            },
                            initSegmentReference: null,
                            presentationTimeOffset: 0
                        }
                    }
                    return o = Se(o, "ContentProtection"), o = De(o, this.b.dash.customScheme, e, this.b.dash.ignoreDrmInfo), {
                        id: this.h++,
                        createSegmentIndex: u.createSegmentIndex,
                        findSegmentPosition: u.findSegmentPosition,
                        getSegmentReference: u.getSegmentReference,
                        initSegmentReference: u.initSegmentReference,
                        presentationTimeOffset: u.presentationTimeOffset,
                        mimeType: t.w.mimeType,
                        codecs: t.w.codecs,
                        frameRate: t.w.frameRate,
                        bandwidth: t.bandwidth,
                        width: t.w.width,
                        height: t.w.height,
                        kind: i,
                        encrypted: 0 < e.drmInfos.length,
                        keyId: o,
                        language: n,
                        label: r,
                        type: t.S.contentType,
                        primary: a,
                        trickModeVideo: null,
                        containsEmsgBoxes: t.w.containsEmsgBoxes,
                        roles: s
                    }
                }, us.ie = function() {
                    this.f = null;
                    var t = Date.now();
                    Ai(this).then(function() {
                        this.a && Ri(this, (Date.now() - t) / 1e3)
                    }.bind(this))["catch"](function(t) {
                        this.a && (t.severity = 1, this.a.onError(t), Ri(this, 0))
                    }.bind(this))
                }, us.Fd = function(t, e, i) {
                    var n = i.getAttribute("schemeIdUri") || "",
                        r = i.getAttribute("value") || "",
                        a = Ae(i, "timescale", Re) || 1;
                    Se(i, "Event").forEach(function(i) {
                        var s = Ae(i, "presentationTime", Re) || 0,
                            o = Ae(i, "duration", Re) || 0,
                            s = s / a + t,
                            o = s + o / a;
                        null != e && (s = Math.min(s, t + e), o = Math.min(o, t + e)), i = {
                            schemeIdUri: n,
                            value: r,
                            startTime: s,
                            endTime: o,
                            id: i.getAttribute("id") || "",
                            eventElement: i
                        }, this.a.onTimelineRegionAdded(i)
                    }.bind(this))
                }, us.Rd = function(t, e, i) {
                    return t = N(t, this.b.retryParameters), null != e && (t.headers.Range = "bytes=" + e + "-" + (null != i ? i : "")), this.a.networkingEngine.request(1, t).then(function(t) {
                        return t.data
                    })
                }, Us.mpd = Ii, Os["application/dash+xml"] = Ii, Bi.prototype.toString = function() {
                    function t(t) {
                        return t.name + '="' + t.value + '"'
                    }
                    return this.value ? "#" + this.name + ":" + this.value : 0 < this.a.length ? "#" + this.name + ":" + this.a.map(t).join(",") : "#" + this.name
                }, Bi.prototype.getAttribute = function(t) {
                    var e = this.a.filter(function(e) {
                        return e.name == t
                    });
                    return e.length ? e[0] : null
                };
                var js = "EXT-X-TARGETDURATION EXT-X-MEDIA-SEQUENCE EXT-X-DISCONTINUITY-SEQUENCE EXT-X-PLAYLIST-TYPE EXT-X-MAP EXT-X-I-FRAMES-ONLY".split(" "),
                    Bs = "EXTINF EXT-X-BYTERANGE EXT-X-DISCONTINUITY EXT-X-PROGRAM-DATE-TIME EXT-X-KEY EXT-X-DATERANGE".split(" ");
                e("shaka.net.DataUriPlugin", Zi),
                    Zi.parse = function(e) {
                        var i = e.split(":");
                        if (2 > i.length || "data" != i[0]) throw new u(2, 1, 1004, e);
                        if (i = i.slice(1).join(":").split(","), 2 > i.length) throw new u(2, 1, 1004, e);
                        var n = i[0],
                            i = t.decodeURIComponent(i.slice(1).join(",")),
                            n = n.split(";"),
                            r = null;
                        if (1 < n.length && (r = n[1]), "base64" == r) e = Z(i).buffer;
                        else {
                            if (r) throw new u(2, 1, 1005, e);
                            e = W(i)
                        }
                        return {
                            data: e,
                            contentType: n[0]
                        }
                    }, gs.data = Zi, e("shaka.hls.HlsParser", tn), us = tn.prototype, us.configure = function(t) {
                    this.b = t
                }, us.start = function(t, e) {
                    return this.c = e, this.j = t, this.c.networkingEngine.request(0, N([t], this.b.retryParameters)).then(function(e) {
                        return en(this, e.data, t)
                    }.bind(this))
                }, us.stop = function() {
                    return this.b = this.c = null, this.g = {}, Promise.resolve()
                }, us.update = function() {}, us.onExpirationUpdated = function() {};
                var Fs = [/^(avc)/, /^(hvc)/, /^(vp[8-9])$/, /^(av1)$/, /^(mp4v)/],
                    Hs = [/^(vorbis)/, /^(opus)/, /^(mp4a)/, /^(ac-3)$/, /^(ec-3)$/],
                    Vs = {
                        mp4: "audio/mp4",
                        m4s: "audio/mp4",
                        m4i: "audio/mp4",
                        m4a: "audio/mp4",
                        ts: "video/mp2t"
                    },
                    Ks = {
                        mp4: "video/mp4",
                        m4s: "video/mp4",
                        m4i: "video/mp4",
                        m4v: "video/mp4",
                        ts: "video/mp2t"
                    },
                    qs = {
                        "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed": function(t) {
                            if ("SAMPLE-AES-CENC" != vn(t, "METHOD")) return null;
                            var e = vn(t, "URI"),
                                e = Zi.parse(e),
                                e = new Uint8Array(e.data),
                                e = I("com.widevine.alpha", [{
                                    initDataType: "cenc",
                                    initData: e
                                }]);
                            return (t = Hi(t, "KEYID")) && (e.keyIds = [t.substr(2).toLowerCase()]), e
                        }
                    };
                Us.m3u8 = tn, Os["application/x-mpegurl"] = tn, Os["application/vnd.apple.mpegurl"] = tn, bn.prototype.parseInit = function() {}, bn.prototype.parseMedia = function(t, e) {
                    var i = G(t),
                        n = [],
                        r = new DOMParser,
                        a = null;
                    try {
                        a = r.parseFromString(i, "text/xml")
                    } catch (s) {
                        throw new u(2, 2, 2005)
                    }
                    if (a) {
                        var o = a.getElementsByTagName("tt")[0];
                        if (!o) throw new u(2, 2, 2005);
                        r = o.getAttribute("ttp:frameRate"), a = o.getAttribute("ttp:subFrameRate");
                        var h = o.getAttribute("ttp:frameRateMultiplier"),
                            c = o.getAttribute("ttp:tickRate");
                        if (i = o.getAttribute("xml:space") || "default", "default" != i && "preserve" != i) throw new u(2, 2, 2005);
                        for (i = "default" == i, r = new In(r, a, h, c), a = yn(o.getElementsByTagName("styling")[0]), h = yn(o.getElementsByTagName("layout")[0]), o = yn(o.getElementsByTagName("body")[0]), c = 0; c < o.length; c++) {
                            var d = o[c],
                                l = e.periodStart,
                                f = r,
                                p = a,
                                m = h,
                                v = i;
                            if (d.hasAttribute("begin") || d.hasAttribute("end") || !/^\s*$/.test(d.textContent)) {
                                Tn(d, v);
                                var v = kn(d.getAttribute("begin"), f),
                                    g = kn(d.getAttribute("end"), f),
                                    f = kn(d.getAttribute("dur"), f),
                                    b = d.textContent;
                                if (null == g && null != f && (g = v + f), null == v || null == g) throw new u(2, 2, 2001);
                                (l = kt(v + l, g + l, b)) ? (v = En(d, "region", m), m = l, (g = wn(d, v, p, "tts:extent")) && (f = Js.exec(g)) && (m.size = Number(f[1])), f = wn(d, v, p, "tts:writingMode"), g = !0, "tb" == f || "tblr" == f ? m.vertical = "lr" : "tbrl" == f ? m.vertical = "rl" : g = !1, (f = wn(d, v, p, "tts:origin")) && (f = Js.exec(f)) && (g ? (m.position = Number(f[2]), m.line = Number(f[1])) : (m.position = Number(f[1]), m.line = Number(f[2])), m.snapToLines = !1), (p = wn(d, v, p, "tts:textAlign")) && (m.align = p, "center" == p && ("center" != m.align && (m.align = "middle"), m.position = "auto"), m.positionAlign = Zs[p], m.lineAlign = Qs[p]), p = l) : p = null
                            } else p = null;
                            p && n.push(p)
                        }
                    }
                    return n
                };
                var Gs = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,
                    Xs = /^(?:(\d{2,}):)?(\d{2}):(\d{2})$/,
                    Ys = /^(?:(\d{2,}):)?(\d{2}):(\d{2}\.\d{2,})$/,
                    Ws = /^(\d*\.?\d*)f$/,
                    zs = /^(\d*\.?\d*)t$/,
                    $s = /^(?:(\d*\.?\d*)h)?(?:(\d*\.?\d*)m)?(?:(\d*\.?\d*)s)?(?:(\d*\.?\d*)ms)?$/,
                    Js = /^(\d{1,2}|100)% (\d{1,2}|100)%$/,
                    Qs = {
                        left: "start",
                        center: "center",
                        right: "end",
                        start: "start",
                        end: "end"
                    },
                    Zs = {
                        left: "line-left",
                        center: "center",
                        right: "line-right"
                    };
                Et("application/ttml+xml", bn), An.prototype.parseInit = function(t) {
                    var e = !1;
                    if ((new Xe).C("moov", Ye).C("trak", Ye).C("mdia", Ye).C("minf", Ye).C("stbl", Ye).da("stsd", We).C("stpp", function() {
                        e = !0
                    }).parse(t), !e) throw new u(2, 2, 2007)
                }, An.prototype.parseMedia = function(t, e) {
                    var i = !1,
                        n = [];
                    if ((new Xe).C("mdat", ze(function(t) {
                        i = !0, n = this.a.parseMedia(t.buffer, e)
                    }.bind(this))).parse(t), !i) throw new u(2, 2, 2007);
                    return n
                }, Et('application/mp4; codecs="stpp"', An), xn.prototype.parseInit = function() {}, xn.prototype.parseMedia = function(t, e) {
                    var i = G(t),
                        i = i.replace(/\r\n|\r(?=[^\n]|$)/gm, "\n"),
                        i = i.split(/\n{2,}/m);
                    if (!/^WEBVTT($|[ \t\n])/m.test(i[0])) throw new u(2, 2, 2e3);
                    var n = e.segmentStart;
                    if (0 <= i[0].indexOf("X-TIMESTAMP-MAP")) {
                        var r = i[0].match(/LOCAL:((?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3}))/m),
                            a = i[0].match(/MPEGTS:(\d+)/m);
                        r && a && (n = Pn(new Xi(r[1])), n = e.periodStart + (Number(a[1]) / 9e4 - n))
                    }
                    for (a = [], r = 1; r < i.length; r++) {
                        var s = i[r].split("\n"),
                            o = n;
                        if (1 == s.length && !s[0] || /^NOTE($|[ \t])/.test(s[0])) var h = null;
                        else {
                            h = null, 0 > s[0].indexOf("-->") && (h = s[0], s.splice(0, 1));
                            var c = new Xi(s[0]),
                                d = Pn(c),
                                l = Yi(c, /[ \t]+--\x3e[ \t]+/g),
                                f = Pn(c);
                            if (null == d || !l || null == f) throw new u(2, 2, 2001);
                            if (s = kt(d + o, f + o, s.slice(1).join("\n").trim())) {
                                for (Yi(c, /[ \t]+/gm), o = Wi(c); o;) _n(s, o), Yi(c, /[ \t]+/gm), o = Wi(c);
                                null != h && (s.id = h), h = s
                            } else h = null
                        }
                        h && a.push(h)
                    }
                    return a
                }, Et("text/vtt", xn), Et('text/vtt; codecs="vtt"', xn), Cn.prototype.parseInit = function(t) {
                    var e = !1;
                    if ((new Xe).C("moov", Ye).C("trak", Ye).C("mdia", Ye).da("mdhd", function(t) {
                        0 == t.version ? (t.s.I(4), t.s.I(4), this.a = t.s.D(), t.s.I(4)) : (t.s.I(8), t.s.I(8), this.a = t.s.D(), t.s.I(8)), t.s.I(4)
                    }.bind(this)).C("minf", Ye).C("stbl", Ye).da("stsd", We).C("wvtt", function() {
                        e = !0
                    }).parse(t), !this.a) throw new u(2, 2, 2008);
                    if (!e) throw new u(2, 2, 2008)
                }, Cn.prototype.parseMedia = function(t, e) {
                    var i = 0,
                        n = [],
                        r = [],
                        a = [],
                        s = !1,
                        o = !1,
                        h = !1;
                    if ((new Xe).C("moof", Ye).C("traf", Ye).da("tfdt", function(t) {
                        s = !0, i = t.version ? t.s.Qa() : t.s.D()
                    }).da("trun", function(t) {
                        o = !0;
                        var e = t.version,
                            i = t.Nc;
                        t = t.s;
                        var r = t.D();
                        1 & i && t.I(4), 4 & i && t.I(4);
                        for (var a = [], s = 0; s < r; s++) {
                            var u = {
                                duration: null,
                                Nb: null
                            };
                            256 & i && (u.duration = t.D()), 512 & i && t.I(4), 1024 & i && t.I(4), 2048 & i && (u.Nb = e ? t.nc() : t.D()), a.push(u)
                        }
                        n = a
                    }).C("vtte", function() {
                        r.push(null)
                    }).C("vttc", ze(function(t) {
                        r.push(t.buffer)
                    })).C("mdat", function(t) {
                        h = !0, Ye(t)
                    }).parse(t), !h && !s && !o) throw new u(2, 2, 2008);
                    for (var c = i, d = 0; d < n.length; d++) {
                        var l = n[d],
                            f = r[d];
                        if (l.duration) {
                            var p = l.Nb ? i + l.Nb : c,
                                c = p + l.duration;
                            f && a.push(Nn(f, e.periodStart + p / this.a, e.periodStart + c / this.a))
                        }
                    }
                    return a.filter(w)
                }, Et('application/mp4; codecs="wvtt"', Cn), us = Ln.prototype, us.m = function() {
                    var e = this.b.m();
                    return this.b = null, null != this.f && (t.clearInterval(this.f), this.f = null), null != this.j && (t.clearInterval(this.j), this.j = null), this.J = this.O = this.l = this.c = this.a = null, e
                }, us.rb = function() {
                    return this.g
                }, us.Ab = function() {
                    this.o = !0, this.hc()
                }, us.rd = function() {
                    this.a.playbackRate != (this.h || 0 > this.g ? 0 : this.g) && Un(this, this.a.playbackRate)
                }, us.fc = function() {
                    var t = On(this);.001 > Math.abs(this.a.currentTime - t) ? (O(this.b, this.a, "seeking", this.ic.bind(this)), O(this.b, this.a, "playing", this.gc.bind(this))) : (U(this.b, this.a, "seeking", this.td.bind(this)), this.a.currentTime = t)
                }, us.td = function() {
                    O(this.b, this.a, "seeking", this.ic.bind(this)), O(this.b, this.a, "playing", this.gc.bind(this))
                }, us.hc = function() {
                    if (this.a.readyState) {
                        this.a.readyState != this.G && (this.i = !1, this.G = this.a.readyState);
                        var t = this.l.smallGapLimit,
                            e = this.a.currentTime,
                            i = this.a.buffered;
                        t: {
                            if (i && i.length && !(1 == i.length && 1e-6 > i.end(0) - i.start(0))) {
                                var n = .1;
                                /(Edge\/|Trident\/|Tizen)/.test(navigator.userAgent) && (n = .5);
                                for (var r = 0; r < i.length; r++)
                                    if (i.start(r) > e && (!r || i.end(r - 1) - e <= n)) {
                                        n = r;
                                        break t
                                    }
                            }
                            n = null
                        }
                        if (null == n) {
                            if (3 > this.a.readyState && 0 < this.a.playbackRate)
                                if (this.v != e) this.v = e, this.A = Date.now();
                                else if (this.A < Date.now() - 1e3)
                                    for (this.A = Date.now() + 5e3, n = 0; n < i.length; n++)
                                        if (e >= i.start(n) && e < i.end(n) - .5) {
                                            this.a.currentTime += .1, this.v = this.a.currentTime;
                                            break
                                        }
                        } else if ((n || this.o) && (r = i.start(n), !(r >= this.c.presentationTimeline.cb()))) {
                            var a = r - e,
                                t = a <= t,
                                s = !1;
                            t || this.i || (this.i = !0, a = new oe("largegap", {
                                currentTime: e,
                                gapSize: a
                            }), a.cancelable = !0, this.J(a), this.l.jumpLargeGaps && !a.defaultPrevented && (s = !0)), (t || s) && (n && i.end(n - 1), Bn(this, e, r))
                        }
                    }
                }, us.ic = function() {
                    this.o = !1;
                    var t = this.a.currentTime,
                        e = jn(this, t);.001 < Math.abs(e - t) ? Bn(this, t, e) : (this.i = !1, this.O())
                }, us.gc = function() {
                    var t = this.a.currentTime,
                        e = jn(this, t);.001 < Math.abs(e - t) && Bn(this, t, e)
                }, Hn.prototype.m = function() {
                    var t = this.j ? this.j.m() : Promise.resolve();
                    return this.j = null, qn(this), this.B = this.h = this.l = this.A = this.g = this.a = null, this.c = [], t
                }, Hn.prototype.v = function(t) {
                    if (!this.c.some(function(e) {
                        return e.info.schemeIdUri == t.schemeIdUri && e.info.startTime == t.startTime && e.info.endTime == t.endTime
                    })) {
                        var e = {
                            info: t,
                            status: 1
                        };
                        this.c.push(e);
                        var i = new oe("timelineregionadded", {
                            detail: Vn(t)
                        });
                        this.h(i), this.o(!0, e)
                    }
                }, Hn.prototype.o = function(t, e) {
                    var i = e.info.startTime > this.a.currentTime ? 1 : e.info.endTime < this.a.currentTime ? 3 : 2,
                        n = 2 == e.status,
                        r = 2 == i;
                    i != e.status && ((!t || n || r) && (n || this.h(new oe("timelineregionenter", {
                        detail: Vn(e.info)
                    })), r || this.h(new oe("timelineregionexit", {
                        detail: Vn(e.info)
                    }))), e.status = i)
                }, Hn.prototype.G = function() {
                    this.f = null, Kn(this);
                    var t = ne(this.g, this.a.currentTime);
                    t != this.i && (-1 != this.i && this.B(), this.i = t);
                    var t = Pt(this.a.buffered, this.a.currentTime),
                        e = xt(this.a.buffered) >= this.g.presentationTimeline.va() - .1 || this.a.ended;
                    if (this.b) {
                        var i = 1 * Math.max(this.g.minBufferTime || 0, this.A.rebufferingGoal);
                        (e || t >= i) && 0 != this.b && (this.b = !1, this.l(!1))
                    } else !e && .5 > t && 1 != this.b && (this.b = !0, this.l(!0));
                    this.c.forEach(this.o.bind(this, !1))
                }, us = Gn.prototype, us.m = function() {
                    for (var t in this.c) vr(this.c[t]);
                    return this.g = this.c = this.j = this.h = this.o = this.b = this.a = null, this.f = !0, Promise.resolve()
                }, us.configure = function(t) {
                    this.g = t
                }, us.init = function() {
                    var t = this.a.bc(this.b.periods[ne(this.b, Dn(this.a.Pa))]);
                    return F(t) ? Promise.reject(new u(2, 5, 5005)) : Zn(this, t).then(function() {
                        this.a && this.a.jd && this.a.jd()
                    }.bind(this))
                }, us.le = function(t) {
                    if (!this.f && !t.ya && null != t.ra && !t.ta)
                        if (t.ra = null, t.sa) pr(this, t, t.kb);
                        else {
                            try {
                                var e = nr(this, t);
                                null != e && (mr(this, t, e), t.tb = !1)
                            } catch (i) {
                                return void this.a.onError(i)
                            }
                            e = H(this.c), dr(this, t), e.every(function(t) {
                                return t.endOfStream
                            }) && this.a.K.endOfStream().then(function() {
                                this.b.presentationTimeline.qa(this.a.K.Y())
                            }.bind(this))
                        }
                }, us.Ed = function(t, e, i) {
                    var n = i.s.Db(),
                        r = i.s.Db(),
                        a = i.s.D(),
                        s = i.s.D(),
                        o = i.s.D(),
                        u = i.s.D();
                    i = i.s.La(i.s.H.byteLength - i.s.u), t = t.startTime + e.startTime + s / a, "urn:mpeg:dash:event:2012" == n ? this.a.kd() : this.a.onEvent(new oe("emsg", {
                        detail: {
                            startTime: t,
                            endTime: t + o / a,
                            schemeIdUri: n,
                            value: r,
                            timescale: a,
                            presentationTimeDelta: s,
                            eventDuration: o,
                            id: u,
                            messageData: i
                        }
                    }))
                }, e("shaka.net.HttpPlugin", gr), gs.http = gr, gs.https = gr, us = br.prototype, us.init = function(t, e) {
                    return kr(this, t, e).then(function() {
                        var e = Object.keys(t);
                        return Promise.all(e.map(function(t) {
                            return wr(this, t).then(function(e) {
                                this.c[t] = e
                            }.bind(this))
                        }.bind(this)))
                    }.bind(this))
                }, us.m = function() {
                    return Promise.all(this.b.map(function(t) {
                        try {
                            t.transaction.abort()
                        } catch (e) {}
                        return t.L["catch"](T)
                    })).then(function() {
                        this.a && (this.a.close(), this.a = null)
                    }.bind(this))
                }, us.get = function(t, e) {
                    var i;
                    return Er(this, t, "readonly", function(t) {
                        i = t.get(e)
                    }).then(function() {
                        return i.result
                    })
                }, us.forEach = function(t, e) {
                    return Er(this, t, "readonly", function(t) {
                        t.openCursor().onsuccess = function(t) {
                            (t = t.target.result) && (e(t.value), t["continue"]())
                        }
                    })
                }, us.remove = function(t, e) {
                    return Er(this, t, "readwrite", function(t) {
                        t["delete"](e)
                    })
                };
                var to = {
                    manifest: "key",
                    segment: "key"
                };
                Rr.prototype.m = function() {
                    var t = this.j,
                        e = this.l,
                        i = this.i || Promise.resolve();
                    return e.length && (i = i.then(function() {
                        return Tr(t, e)
                    })), this.b = {}, this.l = [], this.i = this.a = this.A = this.v = this.j = this.o = null, i
                }, us = Or.prototype, us.configure = function() {}, us.start = function(t) {
                    var e = /^offline:([0-9]+)$/.exec(t);
                    if (!e) return Promise.reject(new u(2, 1, 9004, t));
                    var i = Number(e[1]),
                        n = Nr();
                    return this.a = i, n ? n.init(to).then(function() {
                        return n.get("manifest", i)
                    }).then(function(t) {
                        if (!t) throw new u(2, 9, 9003, i);
                        return Ur(t)
                    }).then(function(t) {
                        return n.m().then(function() {
                            return t
                        })
                    }, function(t) {
                        return n.m().then(function() {
                            throw t
                        })
                    }) : Promise.reject(new u(2, 9, 9e3))
                }, us.stop = function() {
                    return Promise.resolve()
                }, us.update = function() {}, us.onExpirationUpdated = function(t, e) {
                    var i = Nr();
                    i.init(to).then(function() {
                        return i.get("manifest", this.a)
                    }.bind(this)).then(function(n) {
                        if (n && !(0 > n.sessionIds.indexOf(t)) && (void 0 == n.expiration || n.expiration > e)) return n.expiration = e, yr(i, "manifest", n)
                    })["catch"](function() {}).then(function() {
                        return i.m()
                    })
                }, Os["application/x-offline-manifest"] = Or, e("shaka.offline.OfflineScheme", jr), gs.offline = jr, Br.prototype.then = function(t) {
                    return this.a = this.a.then(t).then(function(t) {
                        return this.b ? (this.g(), Promise.reject(this.h)) : Promise.resolve(t)
                    }.bind(this)), this
                }, Br.prototype.cancel = function(t) {
                    return this.c ? Promise.resolve() : (this.b = !0, this.h = t, this.i)
                }, i(Hr), e("shaka.Player", Hr), Hr.prototype.m = function() {
                    this.O = !0;
                    var t = Promise.resolve();
                    return this.J && (t = this.J.cancel(new u(2, 7, 7e3))), t.then(function() {
                        var t = Promise.all([this.ma, Yr(this), this.l ? this.l.m() : null, this.o ? this.o.m() : null]);
                        return this.b = this.o = this.Qb = this.l = this.A = this.f = null, t
                    }.bind(this))
                }, Hr.prototype.destroy = Hr.prototype.m, Hr.version = "v2.1.5";
                var eo = {};
                Hr.registerSupportPlugin = function(t, e) {
                    eo[t] = e
                }, Hr.isBrowserSupported = function() {
                    return !!(t.Promise && t.Uint8Array && Array.prototype.forEach && t.MediaSource && t.MediaSource.isTypeSupported && t.MediaKeys && t.navigator && t.navigator.requestMediaKeySystemAccess && t.MediaKeySystemAccess && t.MediaKeySystemAccess.prototype.getConfiguration)
                }, Hr.probeSupport = function() {
                    return bt().then(function(t) {
                        var e = Ei(),
                            i = Nt();
                        t = {
                            manifest: e,
                            media: i,
                            drm: t
                        };
                        for (var n in eo) t[n] = eo[n]();
                        return t
                    })
                }, Hr.prototype.load = function(t, e, i) {
                    var n = this.ib(),
                        r = new Br;
                    this.J = r, this.dispatchEvent(new oe("loading"));
                    var a = Date.now();
                    return Fr(r.then(function() {
                        return n
                    }).then(function() {
                        return this.i = Jr(), O(this.l, this.f, "playing", this.Ta.bind(this)), O(this.l, this.f, "pause", this.Ta.bind(this)), O(this.l, this.f, "ended", this.Ta.bind(this)), ki(t, this.o, this.b.manifest.retryParameters, i)
                    }.bind(this)).then(function(e) {
                        return this.h = new e, this.h.configure(this.b.manifest), e = {
                            networkingEngine: this.o,
                            filterPeriod: this.gb.bind(this),
                            onTimelineRegionAdded: this.xd.bind(this),
                            onEvent: this.hb.bind(this),
                            onError: this.za.bind(this)
                        }, 2 < this.h.start.length ? this.h.start(t, this.o, e.filterPeriod, e.onError, e.onEvent) : this.h.start(t, e)
                    }.bind(this)).then(function(e) {
                        if (e.periods.some(function(t) {
                            return t.variants.some(function(t) {
                                return t.video && t.audio
                            })
                        }) && e.periods.forEach(function(t) {
                            t.variants = t.variants.filter(function(t) {
                                return t.video && t.audio
                            })
                        }), 0 == e.periods.length) throw new u(2, 4, 4014);
                        return this.c = e, this.Za = t, this.j = new nt(this.o, this.za.bind(this), this.ce.bind(this), this.be.bind(this)), this.j.configure(this.b.drm), this.j.init(e, !1)
                    }.bind(this)).then(function() {
                        return this.c.periods.forEach(this.gb.bind(this)), this.Va = Date.now() / 1e3, this.ja = this.b.preferredAudioLanguage, this.Da = this.b.preferredTextLanguage, Promise.all([rt(this.j, this.f), this.Xa])
                    }.bind(this)).then(function() {
                        return this.b.abr.manager.init(this.Lb.bind(this)), this.g = new Ln(this.f, this.c, this.b.streaming, e || null, this.de.bind(this), this.hb.bind(this)), this.v = new Hn(this.f, this.c, this.b.streaming, this.zc.bind(this), this.hb.bind(this), this.ae.bind(this)), this.ka = new Ct(this.f, this.N, this.A), this.a = new Gn(this.c, {
                            Pa: this.g,
                            K: this.ka,
                            dd: this.o,
                            bc: this.ed.bind(this),
                            ac: this.Gc.bind(this),
                            onError: this.za.bind(this),
                            onEvent: this.hb.bind(this),
                            kd: this.ld.bind(this),
                            Ab: this.ud.bind(this)
                        }), this.a.configure(this.b.streaming), Vr(this), this.a.init()
                    }.bind(this)).then(function() {
                        if (this.b.streaming.startAtSegmentBoundary) {
                            var t = ta(this, Dn(this.g));
                            Mn(this.g, t)
                        }
                        this.c.periods.forEach(this.gb.bind(this)), ra(this), na(this);
                        var t = Xn(this.a),
                            e = Qt(t, this.ja);
                        this.b.abr.manager.setVariants(e), t.variants.some(function(t) {
                            return t.primary
                        }), this.Ya.forEach(this.v.v.bind(this.v)), this.Ya = [], U(this.l, this.f, "loadeddata", function() {
                            this.i.loadLatency = (Date.now() - a) / 1e3
                        }.bind(this)), this.J = null
                    }.bind(this)))["catch"](function(t) {
                        return this.J == r && (this.J = null, this.dispatchEvent(new oe("unloading"))), Promise.reject(t)
                    }.bind(this))
                }, Hr.prototype.load = Hr.prototype.load, Hr.prototype.configure = function(t) {
                    t.abr && t.abr.manager && t.abr.manager != this.b.abr.manager && (this.b.abr.manager.stop(), t.abr.manager.init(this.Lb.bind(this))), A(this.b, t, $r(this), zr(), ""), qr(this)
                }, Hr.prototype.configure = Hr.prototype.configure, Hr.prototype.getConfiguration = function() {
                    var t = $r(this);
                    return A(t, this.b, $r(this), zr(), ""), t
                }, Hr.prototype.getConfiguration = Hr.prototype.getConfiguration, Hr.prototype.Sd = function() {
                    var t = $r(this);
                    t.abr && t.abr.manager && t.abr.manager != this.b.abr.manager && (this.b.abr.manager.stop(), t.abr.manager.init(this.Lb.bind(this))), this.b = $r(this), qr(this)
                }, Hr.prototype.resetConfiguration = Hr.prototype.Sd, Hr.prototype.Sc = function() {
                    return this.f
                }, Hr.prototype.getMediaElement = Hr.prototype.Sc, Hr.prototype.Wb = function() {
                    return this.o
                }, Hr.prototype.getNetworkingEngine = Hr.prototype.Wb, Hr.prototype.Rc = function() {
                    return this.Za
                }, Hr.prototype.getManifestUri = Hr.prototype.Rc, Hr.prototype.$ = function() {
                    return !!this.c && this.c.presentationTimeline.$()
                }, Hr.prototype.isLive = Hr.prototype.$, Hr.prototype.wa = function() {
                    return !!this.c && this.c.presentationTimeline.wa()
                }, Hr.prototype.isInProgress = Hr.prototype.wa, Hr.prototype.Ud = function() {
                    var t = 0,
                        e = 0;
                    return this.c && (e = this.c.presentationTimeline, t = e.na(), e = e.cb()), {
                        start: t,
                        end: e
                    }
                }, Hr.prototype.seekRange = Hr.prototype.Ud, Hr.prototype.keySystem = function() {
                    return this.j ? this.j.keySystem() : ""
                }, Hr.prototype.keySystem = Hr.prototype.keySystem, Hr.prototype.drmInfo = function() {
                    return this.j ? this.j.b : null
                }, Hr.prototype.drmInfo = Hr.prototype.drmInfo, Hr.prototype.bb = function() {
                    return this.j ? this.j.bb() : 1 / 0
                }, Hr.prototype.getExpiration = Hr.prototype.bb, Hr.prototype.$c = function() {
                    return this.la
                }, Hr.prototype.isBuffering = Hr.prototype.$c, Hr.prototype.ib = function() {
                    if (this.O) return Promise.resolve();
                    this.dispatchEvent(new oe("unloading"));
                    var t = Promise.resolve();
                    return this.J && (t = this.J.cancel(new u(2, 7, 7e3))), t.then(function() {
                        return this.ma || (this.ma = Wr(this).then(function() {
                            this.ma = null
                        }.bind(this))), this.ma
                    }.bind(this))
                }, Hr.prototype.unload = Hr.prototype.ib, Hr.prototype.rb = function() {
                    return this.g ? this.g.rb() : 0
                }, Hr.prototype.getPlaybackRate = Hr.prototype.rb, Hr.prototype.oe = function(t) {
                    this.g && Un(this.g, t), this.a && zn(this.a, 1 != t)
                }, Hr.prototype.trickPlay = Hr.prototype.oe, Hr.prototype.Hc = function() {
                    this.g && Un(this.g, 1), this.a && zn(this.a, !1)
                }, Hr.prototype.cancelTrickPlay = Hr.prototype.Hc, Hr.prototype.getTracks = function() {
                    return this.Yb().concat(this.Xb())
                }, Hr.prototype.getTracks = Hr.prototype.getTracks, Hr.prototype.Xd = function(t, e) {
                    "text" == t.type ? this.tc(t) : (this.configure({
                        abr: {
                            enabled: !1
                        }
                    }), this.uc(t, e))
                }, Hr.prototype.selectTrack = Hr.prototype.Xd, Hr.prototype.Yb = function() {
                    if (!this.c) return [];
                    var t = ne(this.c, Dn(this.g)),
                        e = this.B[t] || {};
                    return Yt(this.c.periods[t], e.audio, e.video)
                }, Hr.prototype.getVariantTracks = Hr.prototype.Yb, Hr.prototype.Xb = function() {
                    if (!this.c) return [];
                    var t = ne(this.c, Dn(this.g));
                    return Wt(this.c.periods[t], (this.B[t] || {}).text).filter(function(t) {
                        return 0 > this.Wa.indexOf(t.id)
                    }.bind(this))
                }, Hr.prototype.getTextTracks = Hr.prototype.Xb, Hr.prototype.tc = function(t) {
                    if (this.a && (t = $t(Xn(this.a), t))) {
                        Gr(this, t, !1);
                        var e = {};
                        e.text = t, Qr(this, e, !0)
                    }
                }, Hr.prototype.selectTextTrack = Hr.prototype.tc, Hr.prototype.uc = function(t, e) {
                    if (this.a) {
                        var i = {},
                            n = zt(Xn(this.a), t),
                            r = Yn(this.a);
                        if (n) {
                            if (!n.allowedByApplication || !n.allowedByKeySystem) return;
                            n.audio && (Xr(this, n.audio), n.audio != r.audio && (i.audio = n.audio)), n.video && (Xr(this, n.video), n.video != r.video && (i.video = n.video))
                        }
                        H(i).forEach(function(t) {
                            Gr(this, t, !1)
                        }.bind(this)), (n = r.text) && (i.text = n), Qr(this, i, e)
                    }
                }, Hr.prototype.selectVariantTrack = Hr.prototype.uc, Hr.prototype.Pc = function() {
                    return this.a ? Jt(Xn(this.a).variants).map(function(t) {
                        return t.language
                    }).filter(k) : []
                }, Hr.prototype.getAudioLanguages = Hr.prototype.Pc, Hr.prototype.Yc = function() {
                    return this.a ? Xn(this.a).textStreams.map(function(t) {
                        return t.language
                    }).filter(k) : []
                }, Hr.prototype.getTextLanguages = Hr.prototype.Yc, Hr.prototype.Vd = function(t, e) {
                    if (this.a) {
                        var i = Xn(this.a);
                        this.ja = t, this.mb = e || "", ia(this, i)
                    }
                }, Hr.prototype.selectAudioLanguage = Hr.prototype.Vd, Hr.prototype.Wd = function(t, e) {
                    if (this.a) {
                        var i = Xn(this.a);
                        this.Da = t, this.lb = e || "", ia(this, i)
                    }
                }, Hr.prototype.selectTextLanguage = Hr.prototype.Wd, Hr.prototype.bd = function() {
                    return "showing" == this.A.mode
                }, Hr.prototype.isTextTrackVisible = Hr.prototype.bd, Hr.prototype.Zd = function(t) {
                    this.A.mode = t ? "showing" : "hidden", aa(this)
                }, Hr.prototype.setTextTrackVisibility = Hr.prototype.Zd, Hr.prototype.Uc = function() {
                    return this.c ? new Date(1e3 * this.c.presentationTimeline.f + 1e3 * this.f.currentTime) : null
                }, Hr.prototype.getPlayheadTimeAsDate = Hr.prototype.Uc, Hr.prototype.getStats = function() {
                    Zr(this), this.Ta();
                    var t = null,
                        e = null,
                        i = this.f && this.f.getVideoPlaybackQuality ? this.f.getVideoPlaybackQuality() : {};
                    return this.g && this.c && (t = ne(this.c, Dn(this.g)), e = this.B[t], e = ee(e.audio, e.video, this.c.periods[t].variants), t = e.video || {}), t || (t = {}), e || (e = {}), {
                        width: t.width || 0,
                        height: t.height || 0,
                        streamBandwidth: e.bandwidth || 0,
                        decodedFrames: Number(i.totalVideoFrames),
                        droppedFrames: Number(i.droppedVideoFrames),
                        estimatedBandwidth: this.b.abr.manager.getBandwidthEstimate(),
                        loadLatency: this.i.loadLatency,
                        playTime: this.i.playTime,
                        bufferingTime: this.i.bufferingTime,
                        switchHistory: x(this.i.switchHistory),
                        stateHistory: x(this.i.stateHistory)
                    }
                }, Hr.prototype.getStats = Hr.prototype.getStats, Hr.prototype.addTextTrack = function(t, e, i, n, r, a) {
                    if (!this.a) return Promise.reject();
                    for (var s, o = Xn(this.a), u = 0; u < this.c.periods.length; u++)
                        if (this.c.periods[u] == o) {
                            if (u == this.c.periods.length - 1) {
                                if (s = this.c.presentationTimeline.Y() - o.startTime, 1 / 0 == s) return Promise.reject()
                            } else s = this.c.periods[u + 1].startTime - o.startTime;
                            break
                        }
                    var h = {
                        id: this.Dc++,
                        createSegmentIndex: Promise.resolve.bind(Promise),
                        findSegmentPosition: function() {
                            return 1
                        },
                        getSegmentReference: function(e) {
                            return 1 != e ? null : new Ke(1, 0, s, function() {
                                return [t]
                            }, 0, null)
                        },
                        initSegmentReference: null,
                        presentationTimeOffset: 0,
                        mimeType: n,
                        codecs: r || "",
                        kind: i,
                        encrypted: !1,
                        keyId: null,
                        language: e,
                        label: a || null,
                        type: "text",
                        primary: !1,
                        trickModeVideo: null,
                        containsEmsgBoxes: !1,
                        roles: []
                    };
                    return this.Wa.push(h.id), o.textStreams.push(h), Wn(this.a, h).then(function() {
                        if (!this.O) {
                            var t = this.c.periods.indexOf(o),
                                n = Yn(this.a);
                            return n.text && (this.B[t].text = n.text.id), this.Wa.splice(this.Wa.indexOf(h.id), 1), ia(this, o), ra(this), {
                                id: h.id,
                                active: !1,
                                type: "text",
                                bandwidth: 0,
                                language: e,
                                label: a || null,
                                kind: i,
                                width: null,
                                height: null
                            }
                        }
                    }.bind(this))
                }, Hr.prototype.addTextTrack = Hr.prototype.addTextTrack, Hr.prototype.Jb = function(t, e) {
                    this.ob.width = t, this.ob.height = e
                }, Hr.prototype.setMaxHardwareResolution = Hr.prototype.Jb, us = Hr.prototype, us.gb = function(t) {
                    var e = this.a ? Yn(this.a) : {};
                    if (Gt(this.j, e, t), e = 0 < Jt(t.variants).length, qt(t, this.b.restrictions, this.ob) && this.a && Xn(this.a) == t && ra(this), t = 1 > Jt(t.variants).length, !e) throw new u(2, 4, 4011);
                    if (t) throw new u(2, 4, 4012)
                }, us.ee = function(t, e) {
                    this.b.abr.manager.segmentDownloaded(t, e)
                }, us.zc = function(t) {
                    if (Zr(this), this.la = t, this.Ta(), this.g) {
                        var e = this.g;
                        t != e.h && (e.h = t, Un(e, e.g))
                    }
                    this.dispatchEvent(new oe("buffering", {
                        buffering: t
                    }))
                }, us.ae = function() {
                    ra(this)
                }, us.Ta = function() {
                    if (!this.O) {
                        var t = this.la ? "buffering" : this.f.ended ? "ended" : this.f.paused ? "paused" : "playing",
                            e = Date.now() / 1e3;
                        if (this.i.stateHistory.length) {
                            var i = this.i.stateHistory[this.i.stateHistory.length - 1];
                            if (i.duration = e - i.timestamp, t == i.state) return
                        }
                        this.i.stateHistory.push({
                            timestamp: e,
                            state: t,
                            duration: 0
                        })
                    }
                }, us.de = function() {
                    if (this.v) {
                        var t = this.v;
                        t.c.forEach(t.o.bind(t, !0))
                    }
                    this.a && Jn(this.a)
                }, us.ed = function(t) {
                    this.$a = !0, this.b.abr.manager.disable();
                    var e = Qt(t, this.ja, void 0, this.mb),
                        i = Zt(t, this.Da, void 0, this.lb);
                    t = ea(this, t, e, i, !0);
                    for (var n in this.G) t[n] = this.G[n].stream;
                    this.G = {};
                    for (n in t) Gr(this, t[n], !0);
                    return t
                }, us.Gc = function() {
                    this.$a = !1, this.b.abr.enabled && this.b.abr.manager.enable();
                    for (var t in this.G) {
                        var e = this.G[t];
                        $n(this.a, t, e.stream, e.Kc)
                    }
                    this.G = {}
                }, us.ld = function() {
                    this.h && this.h.update && this.h.update()
                }, us.ud = function() {
                    this.g && this.g.Ab()
                }, us.Lb = function(t, e) {
                    var i, n = Yn(this.a);
                    for (i in t) {
                        var r = t[i];
                        n[i] != r ? Gr(this, r, !0) : delete t[i]
                    }
                    if (!F(t) && this.a) {
                        for (i in t) $n(this.a, i, t[i], e || !1);
                        na(this)
                    }
                }, us.za = function(t) {
                    this.O || this.dispatchEvent(new oe("error", {
                        detail: t
                    }))
                }, us.xd = function(t) {
                    this.v ? this.v.v(t) : this.Ya.push(t)
                }, us.hb = function(t) {
                    this.dispatchEvent(t)
                }, us.yd = function() {
                    if (this.f.error) {
                        var t = this.f.error.code;
                        if (1 != t) {
                            var e = this.f.error.msExtendedCode;
                            e && (0 > e && (e += Math.pow(2, 32)), e = e.toString(16)), this.za(new u(2, 3, 3016, t, e, this.f.error.message))
                        }
                    }
                }, us.ce = function(t) {
                    var e = ["output-restricted", "internal-error"],
                        i = Xn(this.a),
                        n = !1,
                        r = 1 == Object.keys(t).length && "00" == Object.keys(t)[0];
                    i.variants.forEach(function(i) {
                        var a = [];
                        i.audio && a.push(i.audio), i.video && a.push(i.video), a.forEach(function(a) {
                            var s = i.allowedByKeySystem;
                            a.keyId && (a = t[r ? "00" : a.keyId], i.allowedByKeySystem = !!a && 0 > e.indexOf(a)), s != i.allowedByKeySystem && (n = !0)
                        })
                    });
                    var a = Yn(this.a);
                    (a = te(a.audio, a.video, i.variants)) && !a.allowedByKeySystem && ia(this, i), n && ra(this)
                }, us.be = function(t, e) {
                    this.h && this.h.onExpirationUpdated && this.h.onExpirationUpdated(t, e), this.dispatchEvent(new oe("expirationupdated"))
                }, e("shaka.offline.Storage", sa), sa.support = oa, sa.prototype.m = function() {
                    var t = this.a,
                        e = this.h ? this.h.m()["catch"](function() {}).then(function() {
                            if (t) return t.m()
                        }) : Promise.resolve();
                    return this.i = this.f = this.h = this.a = null, e
                }, sa.prototype.destroy = sa.prototype.m, sa.prototype.configure = function(t) {
                    A(this.i, t, ha(this), {}, "")
                }, sa.prototype.configure = sa.prototype.configure, sa.prototype.me = function(t, e, i) {
                    function n(t) {
                        a = t
                    }
                    if (this.v) return Promise.reject(new u(2, 9, 9006));
                    this.v = !0;
                    var r, a = null;
                    return ca(this).then(function() {
                        return pa(this), ua(this, t, n, i)
                    }.bind(this)).then(function(i) {
                        if (pa(this), this.c = i.manifest, this.b = i.Lc, this.c.presentationTimeline.$() || this.c.presentationTimeline.wa()) throw new u(2, 9, 9005, t);
                        this.c.periods.forEach(this.o.bind(this)), this.g = this.a.c.manifest++, this.l = 0, i = this.c.periods.map(this.B.bind(this));
                        var n = this.b.b,
                            a = ot(this.b);
                        if (n) {
                            if (!a.length) throw new u(2, 9, 9007, t);
                            n.initData = []
                        }
                        return r = {
                            key: this.g,
                            originalManifestUri: t,
                            duration: this.l,
                            size: 0,
                            expiration: this.b.bb(),
                            periods: i,
                            sessionIds: a,
                            drmInfo: n,
                            appMetadata: e
                        }, Mr(this.h, r)
                    }.bind(this)).then(function() {
                        if (pa(this), a) throw a;
                        return da(this)
                    }.bind(this)).then(function() {
                        return Ir(r)
                    }.bind(this))["catch"](function(t) {
                        return da(this)["catch"](T).then(function() {
                            throw t
                        })
                    }.bind(this))
                }, sa.prototype.store = sa.prototype.me, sa.prototype.remove = function(t) {
                    function e(t) {
                        6013 != t.code && (s = t)
                    }
                    var i = t.offlineUri,
                        n = /^offline:([0-9]+)$/.exec(i);
                    if (!n) return Promise.reject(new u(2, 9, 9004, i));
                    var r, a, s = null,
                        o = Number(n[1]);
                    return ca(this).then(function() {
                        return pa(this), this.a.get("manifest", o)
                    }.bind(this)).then(function(t) {
                        if (pa(this), !t) throw new u(2, 9, 9003, i);
                        return r = t, t = Ur(r), a = new nt(this.f.o, e, function() {}, function() {}), a.configure(this.f.getConfiguration().drm), a.init(t, !0)
                    }.bind(this)).then(function() {
                        return at(a, r.sessionIds)
                    }.bind(this)).then(function() {
                        return a.m()
                    }.bind(this)).then(function() {
                        if (pa(this), s) throw s;
                        var e = r.periods.map(function(t) {
                                return t.streams.map(function(t) {
                                    var e = t.segments.map(function(t) {
                                        return t = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(t.uri), Number(t[1])
                                    });
                                    return t.initSegmentUri && (t = /^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(t.initSegmentUri), e.push(Number(t[1]))), e
                                }).reduce(y, [])
                            }).reduce(y, []),
                            i = 0,
                            n = e.length,
                            a = this.i.progressCallback;
                        return Tr(this.a, e, function() {
                            i++, a(t, i / n)
                        })
                    }.bind(this)).then(function() {
                        return pa(this), this.i.progressCallback(t, 1), this.a.remove("manifest", o)
                    }.bind(this))
                }, sa.prototype.remove = sa.prototype.remove, sa.prototype.list = function() {
                    var t = [];
                    return ca(this).then(function() {
                        return pa(this), this.a.forEach("manifest", function(e) {
                            t.push(Ir(e))
                        })
                    }.bind(this)).then(function() {
                        return t
                    })
                }, sa.prototype.list = sa.prototype.list, sa.prototype.A = function(t) {
                    for (var e, i = [], n = Vt(this.f.getConfiguration().preferredAudioLanguage), r = [0, ys, Ts], a = t.filter(function(t) {
                        return "variant" == t.type
                    }), r = r.map(function(t) {
                        return a.filter(function(e) {
                            return e = Vt(e.language), Ht(t, n, e)
                        })
                    }), s = 0; s < r.length; s++)
                        if (r[s].length) {
                            e = r[s];
                            break
                        }
                    e || (r = a.filter(function(t) {
                        return t.primary
                    }), r.length && (e = r)), e || (e = a, a.map(function(t) {
                        return t.language
                    }).filter(k));
                    var o = e.filter(function(t) {
                        return t.height && 480 >= t.height
                    });
                    return o.length && (o.sort(function(t, e) {
                        return e.height - t.height
                    }), e = o.filter(function(t) {
                        return t.height == o[0].height
                    })), e.sort(function(t, e) {
                        return t.bandwidth - e.bandwidth
                    }), e.length && i.push(e[Math.floor(e.length / 2)]), i.push.apply(i, t.filter(function(t) {
                        return "text" == t.type
                    })), i
                }, sa.prototype.o = function(t) {
                    var e = {};
                    if (this.j) {
                        var i = this.j.filter(function(t) {
                                return "variant" == t.type
                            }),
                            n = null;
                        i.length && (n = zt(t, i[0])), n && (n.video && (e.video = n.video), n.audio && (e.audio = n.audio))
                    }
                    Gt(this.b, e, t), qt(t, this.f.getConfiguration().restrictions, {
                        width: 1 / 0,
                        height: 1 / 0
                    })
                }, sa.prototype.B = function(t) {
                    var e, i, n = Yt(t, null, null),
                        r = Wt(t, null),
                        n = this.i.trackSelectionCallback(n.concat(r));
                    for (this.j || (this.j = n, this.c.periods.forEach(this.o.bind(this))), r = n.length - 1; 0 < r; --r) {
                        var a = !1;
                        for (i = r - 1; 0 <= i; --i)
                            if (n[r].type == n[i].type && n[r].kind == n[i].kind && n[r].language == n[i].language) {
                                a = !0;
                                break
                            }
                        if (a) break
                    }
                    for (a = [], r = 0; r < n.length; r++)(e = zt(t, n[r])) ? (e.audio && ((i = a.filter(function(t) {
                        return t.id == e.audio.id
                    })[0]) ? i.variantIds.push(e.id) : (i = e.video ? e.bandwidth / 2 : e.bandwidth, a.push(fa(this, t, e.audio, i, e.id)))), e.video && ((i = a.filter(function(t) {
                        return t.id == e.video.id
                    })[0]) ? i.variantIds.push(e.id) : (i = e.audio ? e.bandwidth / 2 : e.bandwidth, a.push(fa(this, t, e.video, i, e.id))))) : a.push(fa(this, t, $t(t, n[r]), 0));
                    return {
                        startTime: t.startTime,
                        streams: a
                    }
                }, eo.offline = oa, e("shaka.polyfill.installAll", function() {
                    for (var t = 0; t < io.length; ++t) io[t]()
                });
                var io = [];
                e("shaka.polyfill.register", ma), ma(function() {
                    if (t.Document) {
                        var e = Element.prototype;
                        e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || e.webkitRequestFullscreen, e = Document.prototype, e.exitFullscreen = e.exitFullscreen || e.mozCancelFullScreen || e.msExitFullscreen || e.webkitExitFullscreen, "fullscreenElement" in document || (Object.defineProperty(document, "fullscreenElement", {
                            get: function() {
                                return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement
                            }
                        }), Object.defineProperty(document, "fullscreenEnabled", {
                            get: function() {
                                return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled
                            }
                        })), document.addEventListener("webkitfullscreenchange", va), document.addEventListener("webkitfullscreenerror", va), document.addEventListener("mozfullscreenchange", va), document.addEventListener("mozfullscreenerror", va), document.addEventListener("MSFullscreenChange", va), document.addEventListener("MSFullscreenError", va)
                    }
                }), ma(function() {
                    var e = navigator.userAgent;
                    e && 0 <= e.indexOf("CrKey") && delete t.indexedDB
                });
                var no;
                ma(function() {
                    0 > navigator.userAgent.indexOf("Trident/") || (no = HTMLInputElement.prototype.addEventListener, HTMLInputElement.prototype.addEventListener = ga)
                }), ma(function() {
                    if (4503599627370497 != Math.round(4503599627370497)) {
                        var t = Math.round;
                        Math.round = function(e) {
                            var i = e;
                            return 4503599627370496 >= e && (i = t(e)), i
                        }
                    }
                }), ba.prototype.c = function(t) {
                    if (!(1 < t.version)) {
                        var e = et(t.s.La(16)),
                            i = [];
                        if (0 < t.version)
                            for (var n = t.s.D(), r = 0; r < n; ++r) {
                                var a = et(t.s.La(16));
                                i.push(a)
                            }
                        n = t.s.D(), t.s.I(n), this.b.push.apply(this.b, i), this.f.push(e), this.a.push({
                            start: t.start,
                            end: t.start + t.size - 1
                        })
                    }
                }, Ta.prototype.createMediaKeys = function() {
                    var t = new Ea(this.keySystem);
                    return Promise.resolve(t)
                }, Ta.prototype.getConfiguration = function() {
                    return this.a
                }, Ea.prototype.createSession = function(t) {
                    if ("temporary" != (t || "temporary")) throw new TypeError("Session type " + t + " is unsupported on this platform.");
                    return new Sa(this.a)
                }, Ea.prototype.setServerCertificate = function() {
                    return Promise.resolve(!1)
                }, i(Sa), us = Sa.prototype, us.generateRequest = function(t, e) {
                    this.a = new _;
                    try {
                        this.c = this.g.createSession("video/mp4", new Uint8Array(e), null), O(this.f, this.c, "mskeymessage", this.pd.bind(this)), O(this.f, this.c, "mskeyadded", this.nd.bind(this)), O(this.f, this.c, "mskeyerror", this.od.bind(this)), xa(this, "status-pending")
                    } catch (i) {
                        this.a.reject(i)
                    }
                    return this.a
                }, us.load = function() {
                    return Promise.reject(Error("MediaKeySession.load not yet supported"))
                }, us.update = function(t) {
                    this.b = new _;
                    try {
                        this.c.update(new Uint8Array(t))
                    } catch (e) {
                        this.b.reject(e);
                    }
                    return this.b
                }, us.close = function() {
                    try {
                        this.c.close(), this.closed.resolve(), j(this.f)
                    } catch (t) {
                        this.closed.reject(t)
                    }
                    return this.closed
                }, us.remove = function() {
                    return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"))
                }, us.pd = function(t) {
                    this.a && (this.a.resolve(), this.a = null), this.dispatchEvent(new oe("message", {
                        messageType: void 0 == this.keyStatuses.sb() ? "licenserequest" : "licenserenewal",
                        message: t.message.buffer
                    }))
                }, us.nd = function() {
                    this.a ? (xa(this, "usable"), this.a.resolve(), this.a = null) : this.b && (xa(this, "usable"), this.b.resolve(), this.b = null)
                }, us.od = function() {
                    var t = Error("EME PatchedMediaKeysMs key error");
                    if (t.errorCode = this.c.error, this.a) this.a.reject(t), this.a = null;
                    else if (this.b) this.b.reject(t), this.b = null;
                    else switch (this.c.error.code) {
                            case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:
                            case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:
                                xa(this, "output-not-allowed");
                            default:
                                xa(this, "internal-error")
                        }
                };
                var ro;
                us = _a.prototype, us.Kb = function(t) {
                    this.size = void 0 == t ? 0 : 1, this.a = t
                }, us.sb = function() {
                    return this.a
                }, us.forEach = function(t) {
                    this.a && t(this.a, ro)
                }, us.get = function(t) {
                    if (this.has(t)) return this.a
                }, us.has = function(t) {
                    var e = ro;
                    return !(!this.a || !it(new Uint8Array(t), new Uint8Array(e)))
                }, us.entries = function() {}, us.keys = function() {}, us.values = function() {}, Na.prototype.createSession = function() {}, Na.prototype.setServerCertificate = function() {}, Ra.prototype.getConfiguration = function() {}, Ra.prototype.createMediaKeys = function() {};
                var ao = "";
                Ua.prototype.createMediaKeys = function() {
                    var t = new ja(this.a);
                    return Promise.resolve(t)
                }, Ua.prototype.getConfiguration = function() {
                    return this.b
                }, us = ja.prototype, us.createSession = function(t) {
                    var e = t || "temporary";
                    if ("temporary" != e && "persistent-license" != e) throw new TypeError("Session type " + t + " is unsupported on this platform.");
                    return t = this.b || document.createElement("video"), t.src || (t.src = "about:blank"), e = new Ha(t, this.g, e), this.c.push(e), e
                }, us.setServerCertificate = function() {
                    return Promise.resolve(!1)
                }, us.Cd = function(t) {
                    var e = document.createEvent("CustomEvent");
                    e.initCustomEvent("encrypted", !1, !1, null), e.initDataType = "webm", e.initData = t.initData, this.b.dispatchEvent(e)
                }, us.Bd = function(t) {
                    var e = Fa(this, t.sessionId);
                    e && (t = new oe("message", {
                        messageType: void 0 == e.keyStatuses.sb() ? "licenserequest" : "licenserenewal",
                        message: t.message
                    }), e.b && (e.b.resolve(), e.b = null), e.dispatchEvent(t))
                }, us.zd = function(t) {
                    (t = Fa(this, t.sessionId)) && (Ka(t, "usable"), t.a && t.a.resolve(), t.a = null)
                }, us.Ad = function(t) {
                    var e = Fa(this, t.sessionId);
                    if (e) {
                        var i = Error("EME v0.1b key error");
                        i.errorCode = t.errorCode, i.errorCode.systemCode = t.systemCode, !t.sessionId && e.b ? (i.method = "generateRequest", 45 == t.systemCode && (i.message = "Unsupported session type."), e.b.reject(i), e.b = null) : t.sessionId && e.a ? (i.method = "update", e.a.reject(i), e.a = null) : (i = t.systemCode, t.errorCode.code == MediaKeyError.MEDIA_KEYERR_OUTPUT ? Ka(e, "output-restricted") : 1 == i ? Ka(e, "expired") : Ka(e, "internal-error"))
                    }
                }, i(Ha), us = Ha.prototype, us.Mb = function(t, e) {
                    if (this.a) this.a.then(this.Mb.bind(this, t, e))["catch"](this.Mb.bind(this, t, e));
                    else {
                        if (this.a = t, "webkit-org.w3.clearkey" == this.c) {
                            var i = G(e),
                                n = JSON.parse(i);
                            "oct" != n.keys[0].kty && (this.a.reject(Error("Response is not a valid JSON Web Key Set.")), this.a = null), i = Z(n.keys[0].k), n = Z(n.keys[0].kid)
                        } else i = new Uint8Array(e), n = null;
                        var r = Ma("addKey");
                        try {
                            this.f[r](this.c, i, n, this.sessionId)
                        } catch (a) {
                            this.a.reject(a), this.a = null
                        }
                    }
                }, us.generateRequest = function(t, e) {
                    return Va(this, e, null)
                }, us.load = function(t) {
                    return "persistent-license" == this.g ? Va(this, null, t) : Promise.reject(Error("Not a persistent session."))
                }, us.update = function(t) {
                    var e = new _;
                    return this.Mb(e, t), e
                }, us.close = function() {
                    if ("persistent-license" != this.g) {
                        if (!this.sessionId) return this.closed.reject(Error("The session is not callable.")), this.closed;
                        var t = Ma("cancelKeyRequest");
                        try {
                            this.f[t](this.c, this.sessionId)
                        } catch (e) {}
                    }
                    return this.closed.resolve(), this.closed
                }, us.remove = function() {
                    return "persistent-license" != this.g ? Promise.reject(Error("Not a persistent session.")) : this.close()
                };
                var so;
                us = qa.prototype, us.Kb = function(t) {
                    this.size = void 0 == t ? 0 : 1, this.a = t
                }, us.sb = function() {
                    return this.a
                }, us.forEach = function(t) {
                    this.a && t(this.a, so)
                }, us.get = function(t) {
                    if (this.has(t)) return this.a
                }, us.has = function(t) {
                    var e = so;
                    return !(!this.a || !it(new Uint8Array(t), new Uint8Array(e)))
                }, us.entries = function() {}, us.keys = function() {}, us.values = function() {}, ma(function() {
                    !t.HTMLVideoElement || navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || (HTMLMediaElement.prototype.webkitGenerateKeyRequest ? La("webkit") : HTMLMediaElement.prototype.generateKeyRequest ? La("") : t.MSMediaKeys ? (ro = new Uint8Array([0]).buffer, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = wa, t.MediaKeys = Ea, t.MediaKeySystemAccess = Ta, navigator.requestMediaKeySystemAccess = ya) : (navigator.requestMediaKeySystemAccess = Pa, delete HTMLMediaElement.prototype.mediaKeys, HTMLMediaElement.prototype.mediaKeys = null, HTMLMediaElement.prototype.setMediaKeys = Ca, t.MediaKeys = Na, t.MediaKeySystemAccess = Ra))
                }), ma(function() {
                    if (t.MediaSource) {
                        var e = navigator.vendor,
                            i = navigator.appVersion;
                        !e || !i || 0 > e.indexOf("Apple") || (0 <= i.indexOf("Version/8") ? t.MediaSource = null : 0 <= i.indexOf("Version/9") ? Ga() : 0 <= i.indexOf("Version/10") && (Ga(), Xa()))
                    }
                });
                var oo = 0;
                za.prototype.then = function(t, e) {
                    var i = new za;
                    switch (this.Ba) {
                        case 1:
                            ts(this, i, t);
                            break;
                        case 2:
                            ts(this, i, e);
                            break;
                        case oo:
                            this.c.push({
                                L: i,
                                pb: t
                            }), this.b.push({
                                L: i,
                                pb: e
                            })
                    }
                    return i
                }, za.prototype["catch"] = function(t) {
                    return this.then(void 0, t)
                }, za.prototype.fa = function(t) {
                    if (this.Ba == oo) {
                        for (this.jb = t, this.Ba = 1, t = 0; t < this.c.length; ++t) ts(this, this.c[t].L, this.c[t].pb);
                        this.c = [], this.b = []
                    }
                }, za.prototype.a = function(t) {
                    if (this.Ba == oo) {
                        for (this.jb = t, this.Ba = 2, t = 0; t < this.b.length; ++t) ts(this, this.b[t].L, this.b[t].pb);
                        this.c = [], this.b = []
                    }
                };
                var uo = null,
                    ho = [];
                ma(function(e) {
                    t.setImmediate ? (ns = function(e) {
                        return t.setImmediate(e)
                    }, rs = function(e) {
                        return t.clearImmediate(e)
                    }) : (ns = function(e) {
                        return t.setTimeout(e, 0)
                    }, rs = function(e) {
                        return t.clearTimeout(e)
                    }), t.Promise && !e || (t.Promise = za, t.Promise.resolve = $a, t.Promise.reject = Ja, t.Promise.all = Qa, t.Promise.race = Za, t.Promise.prototype.then = za.prototype.then, t.Promise.prototype["catch"] = za.prototype["catch"])
                }), ma(function() {
                    if (t.HTMLMediaElement) {
                        var e = HTMLMediaElement.prototype.play;
                        HTMLMediaElement.prototype.play = function() {
                            var t = e.apply(this, arguments);
                            return t && t["catch"](function() {}), t
                        }
                    }
                }), ma(function() {
                    if (t.HTMLVideoElement) {
                        var e = HTMLVideoElement.prototype;
                        !e.getVideoPlaybackQuality && "webkitDroppedFrameCount" in e && (e.getVideoPlaybackQuality = as)
                    }
                }), ma(function() {
                    if (!t.VTTCue && t.TextTrackCue) {
                        var e = TextTrackCue.length;
                        if (3 == e) t.VTTCue = ss;
                        else if (6 == e) t.VTTCue = os;
                        else {
                            try {
                                var i = !!ss(1, 2, "")
                            } catch (n) {
                                i = !1
                            }
                            i && (t.VTTCue = ss)
                        }
                    }
                })
            }).call(r, this), "undefined" != typeof t && t.exports ? t.exports = r.shaka : (n = function() {
                return r.shaka
            }.call(e, i, e, t), !(void 0 !== n && (t.exports = n)))
        }()
    }
});