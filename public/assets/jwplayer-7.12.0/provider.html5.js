webpackJsonpjwplayer([5], {
    8: function(e, t, i) {
        var r, a;
        r = [i(1), i(11), i(2), i(13), i(12)], a = function(e, t, i, r, a) {
            function n(t) {
                if (this._currentTextTrackIndex = -1, t) {
                    if (this._textTracks ? (this._textTracks = e.reject(this._textTracks, function(e) {
                        if (this.renderNatively && "nativecaptions" === e._id) return delete this._tracksById[e._id], !0
                    }, this), delete this._tracksById.nativemetadata) : this._initTextTracks(), t.length) {
                        var r = 0,
                            n = t.length;
                        for (r; r < n; r++) {
                            var s = t[r];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind, !s.label && "captions" === s.kind) {
                                        var c = a.createLabel(s, this._unknownCount);
                                        s.name = c.label, this._unknownCount = c.unknownCount
                                    }
                                } else s._id = a.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id])
                                if ("metadata" === s.kind) s.mode = "hidden", s.oncuechange = L.bind(this), this._tracksById[s._id] = s;
                                else if (E(s.kind)) {
                                    var o, d = s.mode;
                                    if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                    if (s.mode = d, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                        for (var u = this._cuesByTrackId[s._id].cues; o = u.shift();) b(this.renderNatively, s, o);
                                        s.mode = d, this._cuesByTrackId[s._id].loaded = !0
                                    }
                                    A.call(this, s)
                                }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || y.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (i.isEdge() || i.isFF() || i.isSafari()) && (this.addTrackHandler = this.addTrackHandler || _.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))), this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function s(e) {
                if (this.renderNatively) {
                    var t = e === this._itemTracks;
                    t || r.cancelXhr(this._itemTracks), this._itemTracks = e, e && (t || (this.disableTextTrack(), C.call(this), this.addTextTracks(e)))
                }
            }

            function c() {
                return this._currentTextTrackIndex
            }

            function o(t) {
                return this.renderNatively ? void(this._textTracks && (0 === t && e.each(this._textTracks, function(e) {
                    e.mode = e.embedded ? "hidden" : "disabled"
                }), this._currentTextTrackIndex !== t - 1 && (this.disableTextTrack(), this._currentTextTrackIndex = t - 1, this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing"), this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                })))) : void(this.setCurrentSubtitleTrack && this.setCurrentSubtitleTrack(t - 1))
            }

            function d(e) {
                if (e.text && e.begin && e.end) {
                    var t = e.trackid.toString(),
                        i = this._tracksById && this._tracksById[t];
                    i || (i = {
                        kind: "captions",
                        _id: t,
                        data: []
                    }, this.addTextTracks([i]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var a;
                    e.useDTS && (i.source || (i.source = e.source || "mpegts")), a = e.begin + "_" + e.text;
                    var n = this._metaCuesByTextTime[a];
                    if (!n) {
                        n = {
                            begin: e.begin,
                            end: e.end,
                            text: e.text
                        }, this._metaCuesByTextTime[a] = n;
                        var s = r.convertToVTTCues([n])[0];
                        i.data.push(s)
                    }
                }
            }

            function u(e) {
                this._tracksById || this._initTextTracks();
                var t = e.track ? e.track : "native" + e.type,
                    i = this._tracksById[t],
                    r = "captions" === e.type ? "Unknown CC" : "ID3 Metadata",
                    a = e.cue;
                if (!i) {
                    var n = {
                        kind: e.type,
                        _id: t,
                        label: r,
                        embedded: !0
                    };
                    i = I.call(this, n), this.renderNatively || "metadata" === i.kind ? this.setTextTracks(this.video.textTracks) : m.call(this, [i])
                }
                R.call(this, i, a) && (this.renderNatively || "metadata" === i.kind ? b(this.renderNatively, i, a) : i.data.push(a))
            }

            function l(e) {
                var t = this._tracksById[e.name];
                if (t) {
                    t.source = e.source;
                    for (var i = e.captions || [], a = [], n = !1, s = 0; s < i.length; s++) {
                        var c = i[s],
                            o = e.name + "_" + c.begin + "_" + c.end;
                        this._metaCuesByTextTime[o] || (this._metaCuesByTextTime[o] = c, a.push(c), n = !0)
                    }
                    n && a.sort(function(e, t) {
                        return e.begin - t.begin
                    });
                    var d = r.convertToVTTCues(a);
                    Array.prototype.push.apply(t.data, d)
                }
            }

            function h(e, t, i) {
                e && (f(e, t, i), this.instreamMode || (e.addEventListener ? e.addEventListener(t, i) : e["on" + t] = i))
            }

            function f(e, t, i) {
                e && (e.removeEventListener ? e.removeEventListener(t, i) : e["on" + t] = null)
            }

            function T() {
                r.cancelXhr(this._itemTracks);
                var e = this._tracksById && this._tracksById.nativemetadata;
                (this.renderNatively || e) && (x(this.renderNatively, this.video.textTracks), e && (e.oncuechange = null)), this._itemTracks = null, this._textTracks = null, this._tracksById = null, this._cuesByTrackId = null, this._metaCuesByTextTime = null, this._unknownCount = 0, this._activeCuePosition = null, this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), x(this.renderNatively, this.video.textTracks))
            }

            function k(e) {
                this._cachedVTTCues[e] && (this._cachedVTTCues[e] = {}, this._tracksById[e].data = [])
            }

            function g() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "disabled", (e.embedded || "nativecaptions" === e._id) && (e.mode = "hidden"))
                }
            }

            function v() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "showing")
                }
            }

            function y() {
                var t = this.video.textTracks,
                    i = e.filter(t, function(e) {
                        return (e.inuse || !e._id) && E(e.kind)
                    });
                if (!this._textTracks || S.call(this, i)) return void this.setTextTracks(t);
                for (var r = -1, a = 0; a < this._textTracks.length; a++)
                    if ("showing" === this._textTracks[a].mode) {
                        r = a;
                        break
                    }
                r !== this._currentTextTrackIndex && this.setSubtitlesTrack(r + 1)
            }

            function _() {
                this.setTextTracks(this.video.textTracks)
            }

            function m(e) {
                if (e) {
                    this._textTracks || this._initTextTracks();
                    for (var t = 0; t < e.length; t++) {
                        var i = e[t];
                        if (!i.kind || E(i.kind)) {
                            var a = I.call(this, i);
                            A.call(this, a), i.file && (i.data = [], r.loadFile(i, this.addVTTCuesToTrack.bind(this, a), M))
                        }
                    }
                    this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function p(e, t) {
                if (this.renderNatively) {
                    var i = this._tracksById[e._id];
                    if (!i) return this._cuesByTrackId || (this._cuesByTrackId = {}), void(this._cuesByTrackId[e._id] = {
                        cues: t,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[e._id] || !this._cuesByTrackId[e._id].loaded) {
                        var r;
                        for (this._cuesByTrackId[e._id] = {
                            cues: t,
                            loaded: !0
                        }; r = t.shift();) b(this.renderNatively, i, r)
                    }
                }
            }

            function b(e, t, r) {
                if (!i.isIE() || !e || !window.TextTrackCue) return void t.addCue(r);
                var a = new window.TextTrackCue(r.startTime, r.endTime, r.text);
                t.addCue(a)
            }

            function x(t, r) {
                r && r.length && e.each(r, function(e) {
                    if (!(i.isIE() && t && /^(native|subtitle|cc)/.test(e._id))) {
                        e.mode = "disabled", e.mode = "hidden";
                        for (var r = e.cues.length; r--;) e.removeCue(e.cues[r]);
                        e.embedded || (e.mode = "disabled"), e.inuse = !1
                    }
                })
            }

            function E(e) {
                return "subtitles" === e || "captions" === e
            }

            function w() {
                this._textTracks = [], this._tracksById = {}, this._metaCuesByTextTime = {}, this._cuesByTrackId = {}, this._cachedVTTCues = {}, this._unknownCount = 0
            }

            function I(t) {
                var i, r = a.createLabel(t, this._unknownCount),
                    n = r.label;
                if (this._unknownCount = r.unknownCount, this.renderNatively || "metadata" === t.kind) {
                    var s = this.video.textTracks;
                    i = e.findWhere(s, {
                        label: n
                    }), i ? (i.kind = t.kind, i.language = t.language || "") : i = this.video.addTextTrack(t.kind, n, t.language || ""), i["default"] = t["default"], i.mode = "disabled", i.inuse = !0
                } else i = t, i.data = i.data || [];
                return i._id || (i._id = a.createId(t, this._textTracks.length)), i
            }

            function A(e) {
                this._textTracks.push(e), this._tracksById[e._id] = e
            }

            function C() {
                if (this._textTracks) {
                    var t = e.filter(this._textTracks, function(e) {
                        return e.embedded || "subs" === e.groupid
                    });
                    this._initTextTracks(), e.each(t, function(e) {
                        this._tracksById[e._id] = e
                    }), this._textTracks = t
                }
            }

            function L(i) {
                var r = i.currentTarget.activeCues;
                if (r && r.length) {
                    var a = r[r.length - 1].startTime;
                    if (this._activeCuePosition !== a) {
                        var n = [];
                        if (e.each(r, function(e) {
                            e.startTime < a || (e.data || e.value ? n.push(e) : e.text && this.trigger("meta", {
                                metadataTime: a,
                                metadata: JSON.parse(e.text)
                            }))
                        }, this), n.length) {
                            var s = t.parseID3(n);
                            this.trigger("meta", {
                                metadataTime: a,
                                metadata: s
                            })
                        }
                        this._activeCuePosition = a
                    }
                }
            }

            function R(e, t) {
                var i = e.kind;
                this._cachedVTTCues[e._id] || (this._cachedVTTCues[e._id] = {});
                var r, a = this._cachedVTTCues[e._id];
                switch (i) {
                    case "captions":
                    case "subtitles":
                        r = Math.floor(20 * t.startTime);
                        var n = "_" + t.line,
                            s = Math.floor(20 * t.endTime),
                            c = a[r + n] || a[r + 1 + n] || a[r - 1 + n];
                        return !(c && Math.abs(c - s) <= 1) && (a[r + n] = s, !0);
                    case "metadata":
                        var o = t.data ? new Uint8Array(t.data).join("") : t.text;
                        return r = t.startTime + o, !a[r] && (a[r] = t.endTime, !0);
                    default:
                        return !1
                }
            }

            function S(e) {
                if (e.length > this._textTracks.length) return !0;
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    if (!i._id || !this._tracksById[i._id]) return !0
                }
                return !1
            }

            function M(e) {
                i.log("CAPTIONS(" + e + ")")
            }
            var B = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: w,
                addTracksListener: h,
                clearTracks: T,
                clearCueData: k,
                disableTextTrack: g,
                enableTextTrack: v,
                getSubtitlesTrack: c,
                removeTracksListener: f,
                addTextTracks: m,
                setTextTracks: n,
                setupSideloadedTracks: s,
                setSubtitlesTrack: o,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: l,
                addCaptionsCue: d,
                addVTTCue: u,
                addVTTCuesToTrack: p,
                renderNatively: !1
            };
            return B
        }.apply(t, r), !(void 0 !== a && (e.exports = a))
    },
    9: function(e, t) {
        "use strict";

        function i(e) {
            return {
                bitrate: e.bitrate,
                label: e.label,
                width: e.width,
                height: e.height
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.qualityLevel = i
    },
    24: function(e, t, i) {
        var r, a;
        r = [], a = function() {
            function e(e) {
                return e && e.length ? e.end(e.length - 1) : 0
            }
            return {
                endOfRange: e
            }
        }.apply(t, r), !(void 0 !== a && (e.exports = a))
    },
    77: function(e, t, i) {
        var r, a;
        r = [i(109), i(63), i(4), i(1)], a = function(e, t, i, r) {
            function a(e, a) {
                function l(i) {
                    var a = i.target,
                        c = i.initData;
                    if (a.webkitKeys || a.webkitSetMediaKeys(new window.WebKitMediaKeys("com.apple.fps.1_0")), !a.webkitKeys) throw new Error("Could not create MediaKeys");
                    var u = e.fairplay;
                    u.initData = c, t.ajax(u.certificateUrl, function(e) {
                        var t = new Uint8Array(e.response),
                            i = u.extractContentId(d(c));
                        r.isString(i) && (i = o(i));
                        var l = n(c, i, t),
                            h = a.webkitKeys.createSession("video/mp4", l);
                        if (!h) throw new Error("Could not create key session");
                        s(h, "webkitkeymessage", f), s(h, "webkitkeyerror", v), u.session = h
                    }, g, {
                        responseType: "arraybuffer"
                    })
                }

                function f(t) {
                    var i = e.fairplay,
                        a = t.target,
                        n = t.message,
                        s = new XMLHttpRequest;
                    s.responseType = i.licenseResponseType, s.addEventListener("load", T, !1), s.addEventListener("error", y, !1);
                    var c = "";
                    c = r.isFunction(i.processSpcUrl) ? i.processSpcUrl(d(i.initData)) : i.processSpcUrl, s.open("POST", c, !0), r.each(i.licenseRequestHeaders, function(e) {
                        s.setRequestHeader(e.name, e.value)
                    });
                    var o = i.licenseRequestMessage(n, a);
                    s.send(o)
                }

                function T(t) {
                    var i = t.target,
                        a = e.fairplay.extractKey(i.response);
                    r.isFunction(a.then) ? a.then(k) : k(a)
                }

                function k(t) {
                    var i = e.fairplay.session,
                        a = t;
                    r.isString(a) && (a = u(a)), i.update(a)
                }

                function g() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: Failed to retrieve the server certificate"
                    })
                }

                function v() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: Decryption key error was encountered"
                    })
                }

                function y() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: The license request failed"
                    })
                }
                var _ = a.sources[0];
                if (!e.fairplay || e.fairplay.source !== _) {
                    var m = _.drm;
                    m && m.fairplay ? (e.fairplay = r.extend({}, h, m.fairplay), e.fairplay.source = _, e.fairplay.destroy = function() {
                        c(e.video, "webkitneedkey", l);
                        var t = this.session;
                        t && (c(t, "webkitkeymessage", f), c(t, "webkitkeyerror", v)), e.fairplay = null
                    }, s(e.video, "webkitneedkey", l)) : e.fairplay && e.fairplay.destroy()
                }
            }

            function n(e, t, i) {
                var r = 0,
                    a = new ArrayBuffer(e.byteLength + 4 + t.byteLength + 4 + i.byteLength),
                    n = new DataView(a),
                    s = new Uint8Array(a, r, e.byteLength);
                s.set(e), r += e.byteLength, n.setUint32(r, t.byteLength, !0), r += 4;
                var c = new Uint16Array(a, r, t.length);
                c.set(t), r += c.byteLength, n.setUint32(r, i.byteLength, !0), r += 4;
                var o = new Uint8Array(a, r, i.byteLength);
                return o.set(i), new Uint8Array(a, 0, a.byteLength)
            }

            function s(e, t, i) {
                c(e, t, i), e.addEventListener(t, i, !1)
            }

            function c(e, t, i) {
                e && e.removeEventListener(t, i)
            }

            function o(e) {
                for (var t = new ArrayBuffer(2 * e.length), i = new Uint16Array(t), r = 0, a = e.length; r < a; r++) i[r] = e.charCodeAt(r);
                return i
            }

            function d(e) {
                var t = new Uint16Array(e.buffer);
                return String.fromCharCode.apply(null, t)
            }

            function u(e) {
                for (var t = window.atob(e), i = t.length, r = new Uint8Array(new ArrayBuffer(i)), a = 0; a < i; a++) r[a] = t.charCodeAt(a);
                return r
            }
            var l = function(t, i) {
                    e.call(this, t, i);
                    var r = this.init,
                        n = this.load,
                        s = this.destroy;
                    this.init = function(e) {
                        a(this, e), r.call(this, e)
                    }, this.load = function(e) {
                        a(this, e), n.call(this, e)
                    }, this.destroy = function(e) {
                        this.fairplay && this.fairplay.destroy(), s.call(this, e)
                    }
                },
                h = {
                    certificateUrl: "",
                    processSpcUrl: "",
                    licenseResponseType: "arraybuffer",
                    licenseRequestHeaders: [],
                    licenseRequestMessage: function(e) {
                        return e
                    },
                    extractContentId: function(e) {
                        return e.split("skd://")[1]
                    },
                    extractKey: function(e) {
                        return new Uint8Array(e)
                    }
                };
            return l.getName = e.getName, l
        }.apply(t, r), !(void 0 !== a && (e.exports = a))
    },
    109: function(e, t, i) {
        var r, a, n = i(9);
        r = [i(60), i(23), i(2), i(14), i(1), i(4), i(5), i(10), i(3), i(8), i(24)], a = function(e, t, i, r, a, s, c, o, d, u, l) {
            function h(e, t) {
                i.foreach(e, function(e, i) {
                    t.addEventListener(e, i, !1)
                })
            }

            function f(e, t) {
                i.foreach(e, function(e, i) {
                    t.removeEventListener(e, i, !1)
                })
            }

            function T(o, T) {
                function A(e) {
                    return !!(i.isIOS() || i.isSafari() || i.isEdge()) || e && i.isChrome()
                }

                function C(e, t) {
                    Ge.setAttribute(e, t || "")
                }

                function L() {
                    fe(Ge.audioTracks), Ae.setTextTracks(Ge.textTracks), C("jw-loaded", "data")
                }

                function R() {
                    C("jw-loaded", "started")
                }

                function S(e) {
                    Ae.trigger("click", e)
                }

                function M() {
                    De || (H(j()), F(ce(), Ee, xe))
                }

                function B() {
                    F(ce(), Ee, xe)
                }

                function D() {
                    k(Se), Le = !0, Ae.state === c.STALLED ? Ae.setState(c.PLAYING) : Ae.state === c.PLAYING && (Se = setTimeout(se, g)), De && Ge.duration === 1 / 0 && 0 === Ge.currentTime || (H(j()), O(Ge.currentTime), F(ce(), Ee, xe), Ae.state === c.PLAYING && (Ae.trigger(s.JWPLAYER_MEDIA_TIME, {
                        position: Ee,
                        duration: xe
                    }), N()))
                }

                function P() {
                    Ae.trigger("ratechange", {
                        playbackRate: Ge.playbackRate
                    })
                }

                function N() {
                    var e = He.level;
                    if (e.width !== Ge.videoWidth || e.height !== Ge.videoHeight) {
                        if (e.width = Ge.videoWidth, e.height = Ge.videoHeight, ve(), !e.width || !e.height || Be === -1) return;
                        He.reason = He.reason || "auto", He.mode = "hls" === Ie[Be].type ? "auto" : "manual", He.bitrate = 0, e.index = Be, e.label = Ie[Be].label, Ae.trigger("visualQuality", He), He.reason = ""
                    }
                }

                function F(e, t, i) {
                    0 === i || e === Me && i === xe || (Me = e, Ae.trigger(s.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: 100 * e,
                        position: t,
                        duration: i
                    })), ye()
                }

                function O(e) {
                    xe < 0 && (e = -(re() - e)), Ee = e
                }

                function j() {
                    var e = Ge.duration,
                        t = re();
                    if (e === 1 / 0 && t) {
                        var i = t - ie();
                        i !== 1 / 0 && i > v && (e = -i)
                    }
                    return e
                }

                function H(e) {
                    xe = e, Re && e && e !== 1 / 0 && Ae.seek(Re)
                }

                function W() {
                    var e = j();
                    De && e === 1 / 0 && (e = 0), Ae.trigger(s.JWPLAYER_MEDIA_META, {
                        duration: e,
                        height: Ge.videoHeight,
                        width: Ge.videoWidth
                    }), H(e)
                }

                function U() {
                    Le = We = !0, De || ve(), _ && Ae.setTextTracks(Ae._textTracks), J()
                }

                function Y() {
                    C("jw-loaded", "meta"), W()
                }

                function J() {
                    we || i.isIOS() && !We || (we = !0, We = !1, Ae.trigger(s.JWPLAYER_MEDIA_BUFFER_FULL))
                }

                function q() {
                    Ae.setState(c.PLAYING), Ge.hasAttribute("jw-played") || C("jw-played", ""), Ge.hasAttribute("jw-gesture-required") && Ge.removeAttribute("jw-gesture-required"), Ae.trigger(s.JWPLAYER_PROVIDER_FIRST_FRAME, {})
                }

                function V() {
                    Ae.state !== c.COMPLETE && Ge.hasAttribute("jw-played") && Ge.currentTime !== Ge.duration && Ae.setState(c.PAUSED)
                }

                function K() {
                    if (!(De || Ge.paused || Ge.ended || Ae.state === c.LOADING || Ae.state === c.ERROR || Ae.seeking)) return i.isIOS() && Ge.duration - Ge.currentTime <= .1 ? void oe() : void(me() && (Ve = !0, _e()) || Ae.setState(c.STALLED))
                }

                function G() {
                    Ae.trigger(s.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: File could not be played"
                    })
                }

                function Q(e) {
                    var t;
                    return "array" === i.typeOf(e) && e.length > 0 && (t = a.map(e, function(e, t) {
                        return {
                            label: e.label || t
                        }
                    })), t
                }

                function X(e) {
                    Ie = e, Be = z(e);
                    var t = Q(e);
                    t && Ae.trigger(s.JWPLAYER_MEDIA_LEVELS, {
                        levels: t,
                        currentQuality: Be
                    })
                }

                function z(e) {
                    var t = Math.max(0, Be),
                        i = T.qualityLabel;
                    if (e)
                        for (var r = 0; r < e.length; r++)
                            if (e[r]["default"] && (t = r), i && e[r].label === i) return r;
                    return He.reason = "initial choice", He.level = {}, t
                }

                function Z() {
                    var e = Ge.play();
                    e && e["catch"] ? e["catch"](function(e) {
                        console.warn(e), "NotAllowedError" === e.name && Ge.hasAttribute("jw-gesture-required") && Ae.trigger("autoplayFailed")
                    }) : Ge.hasAttribute("jw-gesture-required") && Ae.trigger("autoplayFailed")
                }

                function $(e, t) {
                    Re = 0, pe();
                    var r = document.createElement("source");
                    r.src = Ie[Be].file;
                    var a = Ge.src !== r.src,
                        n = Ge.getAttribute("jw-loaded"),
                        s = Ge.hasAttribute("jw-played");
                    a || "none" === n || "started" === n ? (xe = t, ee(Ie[Be]), Ae.setupSideloadedTracks(Ae._itemTracks), Ge.load()) : (0 === e && Ge.currentTime > 0 && (Re = -1, Ae.seek(e)), Z()), Ee = Ge.currentTime, p && !s && (J(), Ge.paused || Ae.state === c.PLAYING || Ae.setState(c.LOADING)), i.isIOS() && Ae.getFullScreen() && (Ge.controls = !0), e > 0 && Ae.seek(e)
                }

                function ee(t) {
                    Oe = null, je = -1, He.reason || (He.reason = "initial choice", He.level = {}), Le = !1, we = !1, De = e(t), De && (Ae.supportsPlaybackRate = !1), t.preload && t.preload !== Ge.getAttribute("preload") && C("preload", t.preload);
                    var i = document.createElement("source");
                    i.src = t.file;
                    var r = Ge.src !== i.src;
                    r && (C("jw-loaded", "none"), Ge.src = t.file)
                }

                function te() {
                    Ge && (Ae.disableTextTrack(), Ge.removeAttribute("preload"), Ge.removeAttribute("src"), Ge.removeAttribute("jw-loaded"), Ge.removeAttribute("jw-played"), r.emptyElement(Ge), t.style(Ge, {
                        objectFit: ""
                    }), Be = -1, !m && "load" in Ge && Ge.load())
                }

                function ie() {
                    for (var e = Ge.seekable ? Ge.seekable.length : 0, t = 1 / 0; e--;) t = Math.min(t, Ge.seekable.start(e));
                    return t
                }

                function re() {
                    for (var e = Ge.seekable ? Ge.seekable.length : 0, t = 0; e--;) t = Math.max(t, Ge.seekable.end(e));
                    return t
                }

                function ae() {
                    Ae.seeking = !1, Ae.trigger(s.JWPLAYER_MEDIA_SEEKED)
                }

                function ne() {
                    Ae.trigger("volume", {
                        volume: Math.round(100 * Ge.volume)
                    }), Ae.trigger("mute", {
                        mute: Ge.muted
                    })
                }

                function se() {
                    Ge.currentTime === Ee ? K() : Ve = !1
                }

                function ce() {
                    var e = Ge.buffered,
                        t = Ge.duration;
                    return !e || 0 === e.length || t <= 0 || t === 1 / 0 ? 0 : i.between(e.end(e.length - 1) / t, 0, 1)
                }

                function oe() {
                    Ae.state !== c.IDLE && Ae.state !== c.COMPLETE && (pe(), Be = -1, Ae.trigger(s.JWPLAYER_MEDIA_COMPLETE))
                }

                function de(e) {
                    Ne = !0, he(e), i.isIOS() && (Ge.controls = !1)
                }

                function ue() {
                    for (var e = -1, t = 0; t < Ge.audioTracks.length; t++)
                        if (Ge.audioTracks[t].enabled) {
                            e = t;
                            break
                        }
                    Te(e)
                }

                function le(e) {
                    Ne = !1, he(e), i.isIOS() && (Ge.controls = !1)
                }

                function he(e) {
                    Ae.trigger("fullscreenchange", {
                        target: e.target,
                        jwstate: Ne
                    })
                }

                function fe(e) {
                    if (Oe = null, e) {
                        if (e.length) {
                            for (var t = 0; t < e.length; t++)
                                if (e[t].enabled) {
                                    je = t;
                                    break
                                }
                            je === -1 && (je = 0, e[je].enabled = !0), Oe = a.map(e, function(e) {
                                var t = {
                                    name: e.label || e.language,
                                    language: e.language
                                };
                                return t
                            })
                        }
                        Ae.addTracksListener(e, "change", ue), Oe && Ae.trigger("audioTracks", {
                            currentTrack: je,
                            tracks: Oe
                        })
                    }
                }

                function Te(e) {
                    Ge && Ge.audioTracks && Oe && e > -1 && e < Ge.audioTracks.length && e !== je && (Ge.audioTracks[je].enabled = !1, je = e, Ge.audioTracks[je].enabled = !0, Ae.trigger("audioTrackChanged", {
                        currentTrack: je,
                        tracks: Oe
                    }))
                }

                function ke() {
                    return Oe || []
                }

                function ge() {
                    return je
                }

                function ve() {
                    if ("hls" === Ie[0].type) {
                        var e = "video";
                        0 === Ge.videoHeight && (e = "audio"), Ae.trigger("mediaType", {
                            mediaType: e
                        })
                    }
                }

                function ye() {
                    var e = l.endOfRange(Ge.buffered),
                        t = Ge.duration === 1 / 0;
                    t && Je === e ? Ye || (Ye = setTimeout(function() {
                        qe = !0, _e()
                    }, Ue)) : (k(Ye), Ye = null, qe = !1), Je = e
                }

                function _e() {
                    return !(!qe || !Ve) && (Ae.trigger(s.JWPLAYER_MEDIA_ERROR, {
                        message: "The live stream is either down or has ended"
                    }), !0)
                }

                function me() {
                    if (Ge.duration !== 1 / 0) return !1;
                    var e = 2;
                    return l.endOfRange(Ge.buffered) - Ge.currentTime <= e
                }

                function pe() {
                    k(Se), k(Ye), Ye = null
                }
                this.state = c.IDLE, this.seeking = !1, a.extend(this, d, u), this.renderNatively = A(T.renderCaptionsNatively);
                var be, xe, Ee, we, Ie, Ae = this,
                    Ce = {
                        click: S,
                        durationchange: M,
                        ended: oe,
                        error: G,
                        loadstart: R,
                        loadeddata: L,
                        loadedmetadata: Y,
                        canplay: U,
                        playing: q,
                        progress: B,
                        pause: V,
                        seeked: ae,
                        timeupdate: D,
                        ratechange: P,
                        volumechange: ne,
                        webkitbeginfullscreen: de,
                        webkitendfullscreen: le
                    },
                    Le = !1,
                    Re = 0,
                    Se = -1,
                    Me = -1,
                    Be = -1,
                    De = null,
                    Pe = !!T.sdkplatform,
                    Ne = !1,
                    Fe = i.noop,
                    Oe = null,
                    je = -1,
                    He = {
                        level: {}
                    },
                    We = !1,
                    Ue = 3e4,
                    Ye = null,
                    Je = null,
                    qe = !1,
                    Ve = !1,
                    Ke = document.getElementById(o),
                    Ge = Ke ? Ke.querySelector("video, audio") : void 0;
                Ge || (Ge = document.createElement("video"), p && C("jw-gesture-required")), Ge.className = "jw-video jw-reset", this.isSDK = Pe, this.video = Ge, this.supportsPlaybackRate = !0, h(Ce, Ge), C("disableRemotePlayback", ""), C("webkit-playsinline"), C("playsinline"), this.stop = function() {
                    pe(), te(), this.clearTracks(), i.isIE() && Ge.pause(), this.setState(c.IDLE)
                }, this.destroy = function() {
                    Fe = i.noop, f(Ce, Ge), this.removeTracksListener(Ge.audioTracks, "change", ue), this.removeTracksListener(Ge.textTracks, "change", Ae.textTrackChangeHandler), this.remove(), this.off()
                }, this.init = function(e) {
                    Ie = e.sources, Be = z(e.sources), e.sources.length && "hls" !== e.sources[0].type && this.sendMediaType(e.sources), Ee = e.starttime || 0, xe = e.duration || 0, He.reason = "", ee(Ie[Be]), this.setupSideloadedTracks(e.tracks)
                }, this.load = function(e) {
                    X(e.sources), e.sources.length && "hls" !== e.sources[0].type && this.sendMediaType(e.sources), p && !Ge.hasAttribute("jw-played") || Ae.setState(c.LOADING), $(e.starttime || 0, e.duration || 0)
                }, this.play = function() {
                    return Ae.seeking ? (Ae.setState(c.LOADING), void Ae.once(s.JWPLAYER_MEDIA_SEEKED, Ae.play)) : (Fe(), void Z())
                }, this.pause = function() {
                    pe(), Ge.pause(), Fe = function() {
                        var e = Ge.paused && Ge.currentTime;
                        if (e && Ge.duration === 1 / 0) {
                            var t = re(),
                                i = t - ie(),
                                r = i < v,
                                a = t - Ge.currentTime;
                            r && t && (a > 15 || a < 0) && (Ge.currentTime = Math.max(t - 10, t - i))
                        }
                    }, this.setState(c.PAUSED)
                }, this.seek = function(e) {
                    if (e < 0 && (e += ie() + re()), 0 === Re && this.trigger(s.JWPLAYER_MEDIA_SEEK, {
                        position: Ge.currentTime,
                        offset: e
                    }), Le || (Le = !!re()), Le) {
                        Re = 0;
                        try {
                            Ae.seeking = !0, Ge.currentTime = e
                        } catch (t) {
                            Ae.seeking = !1, Re = e
                        }
                    } else Re = e, b && Ge.paused && Z()
                }, this.volume = function(e) {
                    e = i.between(e / 100, 0, 1), Ge.volume = e
                }, this.mute = function(e) {
                    Ge.muted = !!e
                }, this.detachMedia = function() {
                    return pe(), f(Ce, Ge), this.removeTracksListener(Ge.textTracks, "change", this.textTrackChangeHandler), this.disableTextTrack(), Ge
                }, this.attachMedia = function() {
                    h(Ce, Ge), Le = !1, this.seeking = !1, Ge.loop = !1, this.enableTextTrack(), this.addTracksListener(Ge.textTracks, "change", this.textTrackChangeHandler)
                }, this.setContainer = function(e) {
                    be = e, e.insertBefore(Ge, e.firstChild)
                }, this.getContainer = function() {
                    return be
                }, this.remove = function() {
                    te(), pe(), be === Ge.parentNode && be.removeChild(Ge)
                }, this.setVisibility = function(e) {
                    e = !!e, e || x ? t.style(be, {
                        visibility: "visible",
                        opacity: 1
                    }) : t.style(be, {
                        visibility: "",
                        opacity: 0
                    })
                }, this.resize = function(e, i, r) {
                    if (!(e && i && Ge.videoWidth && Ge.videoHeight)) return !1;
                    var a = {
                        objectFit: "",
                        width: "",
                        height: ""
                    };
                    if ("uniform" === r) {
                        var n = e / i,
                            s = Ge.videoWidth / Ge.videoHeight;
                        Math.abs(n - s) < .09 && (a.objectFit = "fill", r = "exactfit")
                    }
                    var c = y || E || w || x && !b;
                    if (c) {
                        var o = -Math.floor(Ge.videoWidth / 2 + 1),
                            d = -Math.floor(Ge.videoHeight / 2 + 1),
                            u = Math.ceil(100 * e / Ge.videoWidth) / 100,
                            l = Math.ceil(100 * i / Ge.videoHeight) / 100;
                        "none" === r ? u = l = 1 : "fill" === r ? u = l = Math.max(u, l) : "uniform" === r && (u = l = Math.min(u, l)), a.width = Ge.videoWidth, a.height = Ge.videoHeight, a.top = a.left = "50%", a.margin = 0, t.transform(Ge, "translate(" + o + "px, " + d + "px) scale(" + u.toFixed(2) + ", " + l.toFixed(2) + ")")
                    }
                    return t.style(Ge, a), !1
                }, this.setFullscreen = function(e) {
                    if (e = !!e) {
                        var t = i.tryCatch(function() {
                            var e = Ge.webkitEnterFullscreen || Ge.webkitEnterFullScreen;
                            e && e.apply(Ge)
                        });
                        return !(t instanceof i.Error) && Ae.getFullScreen()
                    }
                    var r = Ge.webkitExitFullscreen || Ge.webkitExitFullScreen;
                    return r && r.apply(Ge), e
                }, Ae.getFullScreen = function() {
                    return Ne || !!Ge.webkitDisplayingFullscreen
                }, this.setCurrentQuality = function(e) {
                    if (Be !== e && e >= 0 && Ie && Ie.length > e) {
                        Be = e, He.reason = "api", He.level = {}, this.trigger(s.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                            currentQuality: e,
                            levels: Q(Ie)
                        }), T.qualityLabel = Ie[e].label;
                        var t = Ge.currentTime || 0,
                            i = Ge.duration || 0;
                        i <= 0 && (i = xe), Ae.setState(c.LOADING), $(t, i)
                    }
                }, this.setPlaybackRate = function(e) {
                    Ge.playbackRate = Ge.defaultPlaybackRate = e
                }, this.getPlaybackRate = function() {
                    return Ge.playbackRate
                }, this.getCurrentQuality = function() {
                    return Be
                }, this.getQualityLevels = function() {
                    return a.map(Ie, function(e) {
                        return (0, n.qualityLevel)(e)
                    })
                }, this.getName = function() {
                    return {
                        name: I
                    }
                }, this.setCurrentAudioTrack = Te, this.getAudioTracks = ke, this.getCurrentAudioTrack = ge
            }
            var k = window.clearTimeout,
                g = 256,
                v = 120,
                y = i.isIE(),
                _ = i.isIE(9),
                m = i.isMSIE(),
                p = i.isMobile(),
                b = i.isFF(),
                x = i.isAndroidNative(),
                E = i.isIOS(7),
                w = i.isIOS(8),
                I = "html5",
                A = function() {};
            return A.prototype = o, T.prototype = new A, T.getName = function() {
                return {
                    name: "html5"
                }
            }, T
        }.apply(t, r), !(void 0 !== a && (e.exports = a))
    }
});