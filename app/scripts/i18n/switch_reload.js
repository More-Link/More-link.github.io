/**
 * Created by JasonD on 16/12/12.
 */
define(()=>{
    var reloadArr = [];

    return {
        registerReloader:function (reloadFunctionName) {
            reloadArr.push(reloadFunctionName);
        },
        reloadAll: function () {
            for (var i in reloadArr) reloadArr[i] instanceof Function && reloadArr[i]();
        }
    }
})