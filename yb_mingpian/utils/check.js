var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

function n(o, r, i, u) {
    var e;
    if (s.isArray(r)) s.each(r, function(r, e) {
        i || l.test(o) ? u(o, e) : n(o + "[" + ("object" === (void 0 === e ? "undefined" : t(e)) ? r : "") + "]", e, i, u);
    }); else if (i || "object" !== s.type(r)) u(o, r); else for (e in r) n(o + "[" + e + "]", r[e], i, u);
}

function r(n) {
    var t = n.length, r = s.type(n);
    return !s.isWindow(n) && (!(1 !== n.nodeType || !t) || "array" === r || "function" !== r && (0 === t || "number" == typeof t && 0 < t && t - 1 in n));
}

var t = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : _typeof(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : _typeof(n);
}, e = {}, i = [], o = i.push, u = i.indexOf, f = e.toString, a = e.hasOwnProperty, c = "1.10.2".trim, l = /\[\]$/, s = {
    isFunction: function(n) {
        return "function" === s.type(n);
    },
    isArray: Array.isArray || function(n) {
        return "array" === s.type(n);
    },
    isWindow: function(n) {
        return null != n && n == n.window;
    },
    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    type: function(n) {
        return null == n ? String(n) : "object" === (void 0 === n ? "undefined" : t(n)) || "function" == typeof n ? e[f.call(n)] || "object" : void 0 === n ? "undefined" : t(n);
    },
    isPlainObject: function(n) {
        var t;
        if (!n || "object" !== s.type(n) || n.nodeType || s.isWindow(n)) return !1;
        try {
            if (n.constructor && !a.call(n, "constructor") && !a.call(n.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            return !1;
        }
        if (s.support.ownLast) for (t in n) return a.call(n, t);
        for (t in n) ;
        return void 0 === t || a.call(n, t);
    },
    isEmptyObject: function(n) {
        var t;
        for (t in n) return !1;
        return !0;
    },
    each: function(n, t, e) {
        var o = 0, i = n.length, u = r(n);
        if (e) {
            if (u) for (;o < i && !1 !== t.apply(n[o], e); o++) ; else for (o in n) if (!1 === t.apply(n[o], e)) break;
        } else if (u) for (;o < i && !1 !== t.call(n[o], o, n[o]); o++) ; else for (o in n) if (!1 === t.call(n[o], o, n[o])) break;
        return n;
    },
    trim: c && !c.call("\ufeff?") ? function(n) {
        return null == n ? "" : c.call(n);
    } : function(n) {
        return null == n ? "" : (n + "").replace(l, "");
    },
    makeArray: function(n, t) {
        var e = t || [];
        return null != n && (r(Object(n)) ? s.merge(e, "string" == typeof n ? [ n ] : n) : o.call(e, n)), 
        e;
    },
    inArray: function(n, t, r) {
        var e;
        if (t) {
            if (u) return u.call(t, n, r);
            for (e = t.length, r = r ? r < 0 ? Math.max(0, e + r) : r : 0; r < e; r++) if (r in t && t[r] === n) return r;
        }
        return -1;
    },
    merge: function(n, t) {
        var r = t.length, e = n.length, o = 0;
        if ("number" == typeof r) for (;o < r; o++) n[e++] = t[o]; else for (;void 0 !== t[o]; ) n[e++] = t[o++];
        return n.length = e, n;
    },
    isMobile: function(n) {
        return "" !== s.trim(n) && /^1[3|4|5|7|8][0-9]\d{8}$/.test(s.trim(n));
    },
    toFixed: function(n, t) {
        var r = parseInt(t) || 0;
        if (r < -20 || 100 < r) throw new RangeError("Precision of " + r + " fractional digits is out of range");
        var e = Number(n);
        if (isNaN(e)) return "NaN";
        var o, i = "";
        if (e <= 0 && (i = "-", e = -e), e >= Math.pow(10, 21)) return i + e.toString();
        if (o = 0 == (t = Math.round(e * Math.pow(10, r))) ? "0" : t.toString(), 0 == r) return i + o;
        var u = o.length;
        return u <= r && (o = Math.pow(10, r + 1 - u).toString().substring(1) + o, u = r + 1), 
        0 < r && (o = o.substring(0, u - r) + "." + o.substring(u - r)), i + o;
    },
    extend: function() {
        var n, r, e, o, i, u, f = arguments[0] || {}, c = 1, a = arguments.length, l = !1;
        for ("boolean" == typeof f && (l = f, f = arguments[1] || {}, c = 2), "object" === (void 0 === f ? "undefined" : t(f)) || s.isFunction(f) || (f = {}), 
        a === c && (f = this, --c); c < a; c++) if (null != (n = arguments[c])) for (r in n) e = f[r], 
        f !== (o = n[r]) && (l && o && (s.isPlainObject(o) || (i = s.isArray(o))) ? (i ? (i = !1, 
        u = e && s.isArray(e) ? e : []) : u = e && s.isPlainObject(e) ? e : {}, f[r] = s.extend(l, u, o)) : void 0 !== o && (f[r] = o));
        return f;
    },
    param: function(t, r) {
        var e, o = [], i = function(n, t) {
            t = s.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t);
        };
        if (void 0 === r && (r = !1), s.isArray(t) || t.jquery && !s.isPlainObject(t)) s.each(t, function() {
            i(this.name, this.value);
        }); else for (e in t) n(e, t[e], r, i);
        return o.join("&").replace(/%20/g, "+");
    }
};

module.exports = s;