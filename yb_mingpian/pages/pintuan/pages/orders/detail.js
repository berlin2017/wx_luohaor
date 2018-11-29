var app = getApp(), a = app.requirejs("core");

Page({
    onLoad: function(o) {
        this.oid = o.oid, this.showDataInfo();
    },
    onShow: function() {},
    showDataInfo: function() {
        var t = this;
        a.get("Pintuan/ptOrderDetail", {
            id: this.oid
        }, function(o) {
            0 == o.code ? t.setData({
                orderInfo: o.info
            }) : a.alert(o.msg);
        });
    }
});