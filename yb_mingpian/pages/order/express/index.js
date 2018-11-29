var t = getApp(), s = t.requirejs("core");

Page({
    data: {
        list: [ [ "acceptTime 2017-12-12", "acceptStation=>qwdqwdqwdwq" ], [ "acceptTime=>2017-12-12", "acceptStation=>qwdqwdqwdwq" ], [ "acceptTime=>2017-12-12", "acceptStation=>qwdqwdqwdwq" ] ]
    },
    onLoad: function(t) {
        this.setData({
            options: t
        }), this.get_list();
    },
    get_list: function() {
        s.get("order/express", this.data.options, function(t) {});
    }
});