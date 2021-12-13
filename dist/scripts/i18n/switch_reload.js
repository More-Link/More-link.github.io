"use strict";

/**
 * Created by JasonD on 16/12/12.
 */
define(function () {
    var reloadArr = [];

    return {
        registerReloader: function registerReloader(reloadFunctionName) {
            reloadArr.push(reloadFunctionName);
        },
        reloadAll: function reloadAll() {
            for (var i in reloadArr) {
                reloadArr[i] instanceof Function && reloadArr[i]();
            }
        }
    };
});