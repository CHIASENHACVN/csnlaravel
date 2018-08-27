webpackJsonpjwplayer([9], {
    61: function(t, e, i) {
        var n, a;
        n = [i(2), i(23), i(1), i(4), i(5), i(15), i(10), i(3)], a = function(t, e, i, n, a, o, r, u) {
            function l(d, f) {
                function y() {
                    window.YT && window.YT.loaded ? (Q = window.YT, h()) : setTimeout(y, 100)
                }

                function v() {
                    s && (s.off(), s = null)
                }

                function g() {
                    var t = Y && Y.parentNode;
                    return t ? t : (F || (window.jwplayer(d).onReady(h), F = !0), !1)
                }

                function h() {
                    Q && g() && G && G.apply(R)
                }

                function E() {
                    if (_ && _.getPlayerState) {
                        var t = _.getPlayerState();
                        null !== t && void 0 !== t && t !== W && w({
                            data: t
                        });
                        var e = Q.PlayerState;
                        t === e.PLAYING ? L() : t === e.BUFFERING && A()
                    }
                }

                function p(t) {
                    return Math.round(10 * t) / 10
                }

                function L() {
                    A(), R.trigger(n.JWPLAYER_MEDIA_TIME, {
                        position: p(_.getCurrentTime()),
                        duration: _.getDuration()
                    })
                }

                function A() {
                    var t = 0;
                    _ && _.getVideoLoadedFraction && (t = Math.round(100 * _.getVideoLoadedFraction())), k !== t && (k = t, R.trigger(n.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: t
                    }))
                }

                function m() {
                    R.state !== a.IDLE && R.state !== a.COMPLETE && R.trigger(n.JWPLAYER_MEDIA_COMPLETE)
                }

                function D() {
                    R.trigger(n.JWPLAYER_MEDIA_META, {
                        duration: _.getDuration(),
                        width: Y.clientWidth,
                        height: Y.clientHeight
                    })
                }

                function b() {
                    var t = arguments,
                        e = t.length - 1;
                    return function() {
                        for (var i = e, n = t[e].apply(this, arguments); i--;) n = t[i].call(this, n);
                        return n
                    }
                }

                function I(t, e) {
                    if (!t) throw new Error("invalid Youtube ID");
                    var n = Y.parentNode;
                    if (n) {
                        var a = {
                            height: "100%",
                            width: "100%",
                            videoId: t,
                            playerVars: i.extend({
                                html5: 1,
                                autoplay: 0,
                                controls: 0,
                                showinfo: 0,
                                rel: 0,
                                modestbranding: 0,
                                playsinline: 1,
                                origin: location.protocol + "//" + location.hostname
                            }, e),
                            events: {
                                onReady: P,
                                onStateChange: w,
                                onPlaybackQualityChange: S,
                                onError: V
                            }
                        };
                        R.setVisibility(!0), _ = new Q.Player(Y, a), Y = _.getIframe(), G = null
                    }
                }

                function P() {
                    O && (O.apply(R), O = null)
                }

                function w(e) {
                    var o = Q.PlayerState;
                    switch (W = e.data) {
                        case o.UNSTARTED:
                            return void(t.isAndroid() && _.playVideo());
                        case o.ENDED:
                            return void m();
                        case o.PLAYING:
                            return i.isFunction(_.unloadModule) && _.unloadModule("captions"), J = !1, D(), R.trigger(n.JWPLAYER_MEDIA_LEVELS, {
                                levels: R.getQualityLevels(),
                                currentQuality: R.getCurrentQuality()
                            }), void R.setState(a.PLAYING);
                        case o.PAUSED:
                            return void R.setState(a.PAUSED);
                        case o.BUFFERING:
                            return void(R.seeking ? R.setState(a.LOADING) : R.setState(a.STALLED));
                        case o.CUED:
                            return R.setState(a.IDLE), void(t.isAndroid() && _.playVideo())
                    }
                }

                function S() {
                    W !== Q.PlayerState.ENDED && R.play(), R.trigger(n.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                        currentQuality: R.getCurrentQuality(),
                        levels: R.getQualityLevels()
                    })
                }

                function V() {
                    R.trigger(n.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading YouTube: Video could not be played"
                    })
                }

                function T() {
                    c && R.setVisibility(!0)
                }

                function N() {
                    clearInterval(U), _ && _.stopVideo && t.tryCatch(function() {
                        _.stopVideo(), _.clearVideo()
                    })
                }

                function M(e) {
                    O = null;
                    var i = e.sources[0].file,
                        n = t.youTubeID(i);
                    if (R.volume(f.volume), R.mute(f.mute), R.setVisibility(!0), !Q || !_) return G = function() {
                        I(n)
                    }, void y();
                    if (!_.getPlayerState) {
                        var a = function() {
                            R.load(e)
                        };
                        return void(O = O ? b(a, O) : a)
                    }
                    var o = _.getVideoData(),
                        r = o && o.video_id;
                    if (r !== n) {
                        J ? (N(), _.cueVideoById(n)) : _.loadVideoById(n);
                        var u = _.getPlayerState(),
                            l = Q.PlayerState;
                        u !== l.UNSTARTED && u !== l.CUED || T()
                    } else _.getCurrentTime() > 0 && _.seekTo(0), D()
                }
                this.state = a.IDLE, i.extend(this, u);
                var C, R = this,
                    Q = window.YT,
                    _ = null,
                    Y = document.createElement("div"),
                    k = -1,
                    F = !1,
                    G = null,
                    O = null,
                    U = -1,
                    W = -1,
                    J = c;
                this.setState = function(t) {
                    clearInterval(U), t !== a.IDLE && t !== a.COMPLETE && (U = setInterval(E, 250), t === a.PLAYING ? this.seeking = !1 : t !== a.LOADING && t !== a.STALLED || A()), r.setState.apply(this, arguments)
                }, !Q && s && s.getStatus() === o.loaderstatus.NEW && (s.on(n.COMPLETE, y), s.on(n.ERROR, v), s.load()), Y.id = d + "_youtube", this.init = function(t) {
                    M(t)
                }, this.destroy = function() {
                    this.remove(), this.off(), C = Y = Q = R = null
                }, this.load = function(t) {
                    this.setState(a.LOADING), M(t), R.play()
                }, this.stop = function() {
                    N(), this.setState(a.IDLE)
                }, this.play = function() {
                    J || (_ && _.playVideo ? _.playVideo() : O = O ? b(this.play, O) : this.play)
                }, this.pause = function() {
                    J || _.pauseVideo && _.pauseVideo()
                }, this.seek = function(t) {
                    J || _.seekTo && (this.seeking = !0, _.seekTo(t))
                }, this.volume = function(t) {
                    if (i.isNumber(t)) {
                        var e = Math.min(Math.max(0, t), 100);
                        _ && _.getVolume && _.setVolume(e)
                    }
                }, this.mute = function(e) {
                    var i = t.exists(e) ? !!e : !f.mute;
                    _ && _.mute && (i ? _.mute() : _.unMute())
                }, this.setContainer = function(t) {
                    C = t, t.appendChild(Y), this.setVisibility(!0)
                }, this.getContainer = function() {
                    return C
                }, this.remove = function() {
                    N(), Y && C && C === Y.parentNode && C.removeChild(Y), G = O = _ = null
                }, this.setVisibility = function(t) {
                    t = !!t, t ? (e.style(Y, {
                        display: "block"
                    }), e.style(C, {
                        visibility: "visible",
                        opacity: 1
                    })) : c || e.style(C, {
                        opacity: 0
                    })
                }, this.resize = function() {
                    return !1
                }, this.getCurrentQuality = function() {
                    if (!_) return -1;
                    if (_.getAvailableQualityLevels) {
                        var t = _.getPlaybackQuality(),
                            e = _.getAvailableQualityLevels();
                        return e.indexOf(t)
                    }
                    return -1
                }, this.getQualityLevels = function() {
                    if (_) {
                        if (!i.isFunction(_.getAvailableQualityLevels)) return [];
                        var t = _.getAvailableQualityLevels();
                        if (2 === t.length && i.contains(t, "auto")) return {
                            label: i.without(t, "auto")
                        };
                        var e = i.map(t, function(t) {
                            return {
                                label: t
                            }
                        });
                        return e.reverse()
                    }
                }, this.setCurrentQuality = function(t) {
                    if (_ && _.getAvailableQualityLevels) {
                        var e = _.getAvailableQualityLevels();
                        if (e.length) {
                            var i = e[e.length - t - 1];
                            _.setPlaybackQuality(i)
                        }
                    }
                }, this.getName = l.getName
            }
            var s = new o(window.location.protocol + "//www.youtube.com/iframe_api"),
                c = t.isMobile();
            return l.getName = function() {
                return {
                    name: "youtube"
                }
            }, l.register = function(t) {
                t.api.registerProvider(l)
            }, l
        }.apply(e, n), !(void 0 !== a && (t.exports = a))
    }
});