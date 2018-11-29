function _defineProperty(t, e, a) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: a,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (t[e] = a),
    t
  );
}

var app = getApp(),
  a = app.requirejs("core"),
  WxParse = app.requirejs("wxParse/wxParse");
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    scrollTop: 0,
    num: 1,
    show: !1,
    countdown: {
      d: "00",
      h: "00",
      m: "00",
      s: "00"
    },
    Rotation: true
  },
  onLoad: function(t) {
    var p = this,
      e = (this.gid = t.gid ? t.gid : t.id);
    console.log(e);
    var u = wx.getSystemInfoSync();
    a.get(
      "Pintuan/ptGoodsDetail",
      {
        gid: 7,
        uid: app.getCache("userinfo").uid
      },
      function(t) {
        if ((console.log(t), 0 == t.code)) {
          var e;
          t.info.intro &&
            WxParse.wxParse("wxParseData", "html", t.info.intro, p, "0"),
            p.setData({
              windowHeight: u.windowHeight,
              goodsDetail: t.info
            });
          console.log(t.info);
          p.countTime(t.info.countdown);
          p.playAudio(t.info.music);
          var o = t.info.groupList;
          if (0 < o.length) {
            for (var i = 0; i < o.length; i++) {
              t = --o[i].leftTime;
              var r = Math.floor(t / 60 / 60),
                n = Math.floor((t - 60 * r * 60) / 60),
                s = t % 60;
              r < 10 && (r = "0" + r),
                n < 10 && (n = "0" + n),
                s < 10 && (s = "0" + s),
                (o[i].leftTimeStr = r + ":" + n + ":" + s);
            }
            p.setTimeData(o);
          }
          p.setData(
            (_defineProperty(
              (e = {
                groupList: o
              }),
              "groupList",
              o
            ),
            _defineProperty(e, "show", !0),
            e)
          );
        } else a.alert(t.msg);
      },
      !0
    );
  },
  onShow: function () {
    innerAudioContext.play();
  },
  onUnload: function() {
    innerAudioContext.stop();
  },
  onShareAppMessage: function(t) {
    return {
      title: this.goodsDetail.name,
      path:
        "/yb_mingpian/pages/pintuan/pages/goods/detail?gid=" +
        this.goodsDetail.id,
      success: function(t) {
        console.log(t);
      }
    };
  },
  setTimeData: function(t) {
    var r = this,
      n = t;
    setInterval(function() {
      for (var t = 0; t < n.length; t++) {
        var e = --n[t].leftTime,
          a = Math.floor(e / 60 / 60),
          o = Math.floor((e - 60 * a * 60) / 60),
          i = e % 60;
        a < 10 && (a = "0" + a),
          o < 10 && (o = "0" + o),
          i < 10 && (i = "0" + i),
          (n[t].leftTimeStr = a + ":" + o + ":" + i);
      }
      r.setData({
        groupList: n
      });
    }, 1e3);
  },
  joinGroup: function(t) {
    var e = t.currentTarget.dataset.id;
    app.redirect("group/detail", "id=" + e);
  },
  goHome: function() {
    a.jump("/yb_mingpian/pages/pintuan/pages/index/index", 2);
  },
  goToBuy: function() {
    var t = this.data.goodsDetail;
    (t.num = this.data.num),
      (t.goodsPrice = this.data.goodsPrice),
      (t.buyType = this.data.buyType),
      (t.groupPid = 0),
      (app.goodsInfo = t),
      app.redirect("goods/payfor");
  },
  selectProp: function(t) {
    var e = t.currentTarget.dataset,
      a = e.pid,
      o = e.pname,
      i = e.name,
      r = this.propValue ? this.propValue : [];
    (r[a] = {
      pname: o,
      name: i
    }),
      (this.propValue = r),
      this.setData({
        propValue: r
      });
  },
  minus: function() {
    var t = 1 < this.data.num ? --this.data.num : 1;
    this.setData({
      num: t
    });
  },
  plus: function() {
    var t = ++this.data.num;
    this.setData({
      num: t
    });
  },
  playAudio(src) {
    innerAudioContext.autoplay = true;
    innerAudioContext.src = src;
    innerAudioContext.onPlay(() => {
      console.log("开始播放");
      this.setData({
        Rotation: true
      });
    });
    innerAudioContext.onPause(() => {
      console.log("暂停播放");
      this.setData({
        Rotation: false
      });
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },
  toggerAudio() {
    if (innerAudioContext.paused) {
      innerAudioContext.play();
    } else {
      innerAudioContext.pause();
    }
  },
  countTime(time) {
    var that = this;
    var now = Math.round(new Date() / 1000);
    var end = time; //设置截止时间
    var leftTime = end - now; //时间差

    var day, hour, minute, second;
    if (leftTime >= 0) {
      day = Math.floor(leftTime / (60 * 60 * 24));
      18;
      hour = Math.floor(leftTime / (60 * 60)) - day * 24;
      19;
      minute = Math.floor(leftTime / 60) - day * 24 * 60 - hour * 60;
      20;
      second =
        Math.floor(leftTime) -
        day * 24 * 60 * 60 -
        hour * 60 * 60 -
        minute * 60;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      that.setData({
        countdown: {
          d: day,
          h: hour,
          m: minute,
          s: second
        }
      });
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.countTime, 1000);
    } else {
      console.log("已截止");
      that.setData({
        countdown: {
          d: "00",
          h: "00",
          m: "00",
          s: "00"
        }
      });
    }
  },

  showModal: function(t) {
    var e = t.currentTarget.dataset.type,
      a = "open" == t.currentTarget.dataset.statu,
      o =
        "group" == e
          ? this.data.goodsDetail.gprice
          : this.data.goodsDetail.price,
      i = "group" == e ? 1 : 0;
    app.showModal(this),
      this.setData({
        // showModalStatus: a,
        goodsPrice: o,
        buyType: i
      });
      this.goToBuy()
  },
  scrolltolower: function() {},
  showServer: function(t) {}
});
