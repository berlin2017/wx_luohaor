function _defineProperty(e, t, o) {
  return t in e ? Object.defineProperty(e, t, {
    value: o,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = o, e;
}

var app = getApp(),
  a = app.requirejs("core");

Page({
  data: {
    num: 1,
    show: !1,
    display: !1
  },
  onGotUserInfo: function(e) {
    var t = this.id,
      o = this,
      a = app.getCache("userinfo");
    o.setData({
      display: !1
    }), a || app.getUserInfo(e.detail.userInfo, function(e) {
      1e3 != e ? o.getDetail(t) : o.setData({
        display: !0
      });
    });
  },
  onLoad: function(e) {
    this.id = e.id;
    // this.id = 72;
  },
  onShow: function() {
    var e = this.id;
    app.getCache("userinfo") ? (this.getDetail(e), this.setData({
      display: !1
    })) : this.setData({
      display: !0
    });
  },
  getDetail: function(f) {
    var d = this;
    a.get("Pintuan/ptGroupDetail", {
      id: f,
      uid: getApp().getCache("userinfo").uid
    }, function(e) {
      if (console.log(e), 0 == e.code) {
        var t, o = "";
        if (0 < e.info.leftTime) {
          var i = --e.info.leftTime,
            n = Math.floor(i / 60 / 60),
            r = Math.floor((i - 60 * n * 60) / 60),
            s = i % 60;
          n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), s < 10 && (s = "0" + s), o = n + ":" + r + ":" + s,
            console.log("a:" + o), d.setTimeData(e.info.leftTime, f);
        }
        // e.info.groupStatus = "拼团中"
        e.info.groupMember.forEach(function(item,index){
          item.createTime = new Date(item.createTime*1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        });
        for (var p = [], u = e.info.goods.groupNum - 1; 0 <= u; u--) e.info.groupMember[u] ? p[u] = e.info.groupMember[u] : p[u] = {};
        d.setData((_defineProperty(t = {
            groupMember: p
          }, "groupMember", p), _defineProperty(t, "groupInfo", e.info), _defineProperty(t, "leftTime", o),
          _defineProperty(t, "leftnum", e.info.goods.groupNum - e.info.leftNum), _defineProperty(t, "show", !0),
          t));
      } else a.alert(e.msg);
    }, !0);
  },
  setTimeData: function(r, s) {
    var p = this;
    s = s;
    setInterval(function() {
      var e = --r,
        t = Math.floor(e / 60 / 60),
        o = Math.floor((e - 60 * t * 60) / 60),
        i = e % 60;
      t < 10 && (t = "0" + t), o < 10 && (o = "0" + o), i < 10 && (i = "0" + i);
      var n = t + ":" + o + ":" + i;
      0 == t && 0 == o && 0 == i && a.get("Pintuan/ptGroupDetail", {
        id: s
      }, function(e) {
       
        for (var t = [], o = e.info.goods.groupNum - 1; 0 <= o; o--) e.info.groupMember[o] ? t[o] = e.info.groupMember[o] : t[o] = {};
        p.setData({
          groupMember: t,
          groupInfo: e.info
        });
      }), p.setData({
        leftTime: n
      });
    }, 1e3);
  },
  onShareAppMessage: function(e) {
    console.log(e);
    var t = "/yb_mingpian/pages/pintuan/pages/group/detail?id=" + this.data.groupInfo.id;
    return {
      title: this.data.groupInfo.goods.name,
      path: t,
      success: function(e) {
        console.log(t), console.log(e);
      }
    };
  },
  goToHome: function() {
    a.jump("/yb_mingpian/pages/index/index", 2);
  },
  showGoodsDetail: function(e) {
    var t = e.currentTarget.dataset.id;
    app.redirect("goods/detail", "gid=" + t);
  },
  goToBuy: function() {
    var e = this.data.groupInfo.goods;
    var that  = this;
    e.num = this.data.num, e.goodsPrice = this.data.groupInfo.goods.gprice, e.buyType = 1,
      e.groupPid = this.data.groupInfo.id, app.goodsInfo = e, app.redirect("goods/payfor?number=" + that.data.groupInfo.group_number);
  },
  selectProp: function(e) {
    var t = e.currentTarget.dataset,
      o = t.pid,
      a = t.pname,
      i = t.name,
      n = this.propValue ? this.propValue : [];
    n[o] = {
      pname: a,
      name: i
    }, this.propValue = n, this.setData({
      propValue: n
    });
  },
  minus: function() {
    var e = 1 < this.data.num ? --this.data.num : 1;
    this.setData({
      num: e
    });
  },
  plus: function() {
    var e = ++this.data.num;
    this.setData({
      num: e
    });
  },
  showModal: function(e) {
    var t = "open" == e.currentTarget.dataset.statu;
    app.showModal(this), this.setData({
      showModalStatus: t
    });
  },
  back: function() {
    wx.navigateBack({

    })
  }
});