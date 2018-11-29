var _showdown = require("./showdown.js"), _showdown2 = _interopRequireDefault(_showdown), _html2json = require("./html2json.js"), _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function wxParse() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', i = arguments[3], r = arguments[4], o = i, s = {};
    if ("html" == a) s = _html2json2.default.html2json(t, e); else if ("md" == a || "markdown" == a) {
        var n = new _showdown2.default.Converter().makeHtml(t);
        s = _html2json2.default.html2json(n, e), console.log(JSON.stringify(s, " ", " "));
    }
    s.view = {}, void (s.view.imagePadding = 0) !== r && (s.view.imagePadding = r);
    var d = {};
    d[e] = s, o.setData(d), o.wxParseImgLoad = wxParseImgLoad, o.wxParseImgTap = wxParseImgTap;
}

function wxParseImgTap(e) {
    console.log(e);
    var a = e.target.dataset.src, t = e.target.dataset.from;
    void 0 !== t && 0 < t.length && wx.previewImage({
        current: a,
        urls: this.data[t].imageUrls
    });
}

function wxParseImgLoad(e) {
    var a = e.target.dataset.from, t = e.target.dataset.idx;
    void 0 !== a && 0 < a.length && calMoreImageInfo(e, t, this, a);
}

function calMoreImageInfo(e, a, t, i) {
    var r = t.data[i];
    if (r && 0 != r.images.length) {
        var o = r.images, s = wxAutoImageCal(e.detail.width, e.detail.height, t, i);
        o[a].width = s.imageWidth, o[a].height = s.imageheight, r.images = o;
        var n = {};
        n[i] = r, t.setData(n);
    }
}

function wxAutoImageCal(t, i, r, o) {
    var s = 0, n = 0, d = 0, m = {};
    return wx.getSystemInfo({
        success: function(e) {
            var a = r.data[o].view.imagePadding;
            s = e.windowWidth - 2 * a, e.windowHeight, s < t ? (d = (n = s) * i / t, m.imageWidth = n, 
            m.imageheight = d) : (m.imageWidth = t, m.imageheight = i);
        }
    }), m;
}

function wxParseTemArray(e, a, t, i) {
    for (var r = [], o = i.data, s = null, n = 0; n < t; n++) {
        var d = o[a + n].nodes;
        r.push(d);
    }
    e = e || "wxParseTemArray", (s = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(s);
}

function emojisInit() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", t = arguments[2];
    _html2json2.default.emojisInit(e, a, t);
}

module.exports = {
    wxParse: wxParse,
    wxParseTemArray: wxParseTemArray,
    emojisInit: emojisInit
};