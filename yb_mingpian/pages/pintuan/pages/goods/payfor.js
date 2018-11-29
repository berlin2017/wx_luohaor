var app = getApp(),
  a = app.requirejs("core");

Page({
  data: {
    addressData: {},
    address: {
      userName: "",
      telNumber: ""
    },
    show: !1,
    freight: 0,
    totalPrice: 0
  },
  onLoad: function (o) {
    if(o.number){
      this.setData({
        number:o.number
      })
    }
    wx.showLoading({
      title: "正在加载",
      mask: !0
    }),
      this.setData({
        goodsNum: app.goodsInfo.num,
        goodsInfo: app.goodsInfo,
        goodsPrice: app.goodsInfo.goodsPrice,
        totalPrice: app.goodsInfo.goodsPrice * app.goodsInfo.num,
        show: !0
      }),
      wx.hideLoading();
  },
  onShow: function (o) { },
  goToPay: function () {
    var o = this;
    console.log(o.data);
    if (!o.data.address.userName) {
      wx.showToast({
        title: "请输入姓名",
        icon: "none"
      });
      return;
    }

    if (!o.data.address.telNumber) {
      wx.showToast({
        title: "请输入手机号",
        icon: "none"
      });
      return;
    }
    var e = {
      pid: o.data.goodsInfo.groupPid,
      isGroup: o.data.goodsInfo.buyType,
      gid: o.data.goodsInfo.id,
      goodsNum: o.data.goodsNum,
      limitTime: o.data.goodsInfo.limitTime,
      address: JSON.stringify(o.data.address),
      totalPrice:
        o.data.goodsInfo.goodsPrice * o.data.goodsNum +
        parseFloat(o.data.freight),
      uid: app.getCache("userinfo").uid,
      user_name: o.data.address.userName,
      user_tel: o.data.address.telNumber
    };
    

    this.data.oid ||
      (wx.showLoading({
        title: "正在提交",
        mask: !0
      }),
        a.get("Pintuan/ptCreateOrder", e, function (i) {
          wx.hideLoading(),
            0 == i.code
              ? (o.setData({
                oid: i.info
              }),
                a.get(
                  "Pintuan/ptPay",
                  {
                    oid: i.info,
                    openid: getApp().getCache("userinfo").openid
                  },
                  function (o) {
                    0 == o.code
                      ? wx.requestPayment({
                        timeStamp: o.info.timeStamp,
                        nonceStr: o.info.nonceStr,
                        package: o.info.package,
                        signType: "MD5",
                        paySign: o.info.paySign,
                        success: function (o) {
                          console.log(o),
                            1 == e.isGroup
                              ? wx.redirectTo({
                                url:
                                  "/yb_mingpian/pages/pintuan/pages/group/detail?id=" +
                                  i.info
                              })
                              : wx.redirectTo({
                                url:
                                  "/yb_mingpian/pages/pintuan/pages/orders/index"
                              });
                        },
                        fail: function (o) {
                          a.alert("您已取消了支付", function () {
                            wx.redirectTo({
                              url:
                                "/yb_mingpian/pages/pintuan/pages/orders/index"
                            });
                          });
                        }
                      })
                      : a.alert(o.msg, function () {
                        wx.redirectTo({
                          url: "/yb_mingpian/pages/pintuan/pages/orders/index"
                        });
                      });
                  }
                ))
              : a.alert(i.msg);
        }));
  },
  getuserName: function (e) {
    var val = e.detail.value;
    var o = this;
    o.setData({
      address: {
        userName: val,
        telNumber: o.data.address.telNumber
      }
    });
  },
  gettelNumber: function (e) {
    var val = e.detail.value;
    var o = this;
    o.setData({
      address: {
        userName: o.data.address.userName,
        telNumber: val
      }
    });
  }
});
