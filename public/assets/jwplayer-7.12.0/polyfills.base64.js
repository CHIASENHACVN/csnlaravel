webpackJsonpjwplayer([12], {
    56: function(r, o, t) {
        var e, n;
        e = [], n = function() {
            function r(r) {
                this.message = r
            }
            var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            r.prototype = new Error, r.prototype.name = "InvalidCharacterError", window.btoa || (window.btoa = function(t) {
                for (var e, n, a = String(t), i = 0, c = o, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & e >> 8 - i % 1 * 8)) {
                    if (n = a.charCodeAt(i += .75), n > 255) throw new r("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    e = e << 8 | n
                }
                return d
            }), window.atob || (window.atob = function(t) {
                var e = String(t).replace(/=+$/, "");
                if (e.length % 4 === 1) throw new r("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var n, a, i = 0, c = 0, d = ""; a = e.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) a = o.indexOf(a);
                return d
            })
        }.apply(o, e), !(void 0 !== n && (r.exports = n))
    }
});