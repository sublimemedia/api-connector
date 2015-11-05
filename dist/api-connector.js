(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'bluebird'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('bluebird'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Promise);
        global.apiConnector = mod.exports;
    }
})(this, function (exports, _bluebird) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _Promise = _interopRequireDefault(_bluebird);

    function Connect(settings, apis, debug) {
        for (var i = 0, length = apis.length; i < length; i++) {
            var api = apis[i] && typeof apis[i] === 'function' && apis[i](settings, debug);
            if (api && api.find) {
                this.api = api.find();

                if (this.api) {
                    setMethods(this, api);
                    break;
                }
            }
        }

        if (!this.api) {
            this.initialize = function () {
                return _Promise['default'].reject();
            };
        }

        this.initialized = this.initialize();
    }

    function setMethods(ctx, methods) {
        for (var key in methods) {
            if (methods.hasOwnProperty(key)) {
                ctx[key] = methods[key];
            }
        }
    }

    function findApiInFrames(apiName) {
        var win = window,
            attempts = 0;

        while (attempts++ < 15 && !win[apiName] && (win.parent && win.parent !== win || win.opener)) {
            win = win.parent && win.parent !== win ? win.parent : win.opener;
        }

        return win[apiName];
    }

    function parsedTime(date) {
        var parsed = {};

        parsed.hours = Math.floor(date / 3600000); // 3600000 = 1000 ms/sec * 60 sec/min * 60 min/hr
        date %= 3600000;
        parsed.mins = Math.floor(date / 60000); // 60000 = 1000 ms/sec * 60 sec/min
        date %= 60000;
        parsed.secs = (date / 1000).toFixed(2); // 1000 = 1000 ms/sec

        return parsed;
    }

    var blankMap = {
        version: null,
        learnerId: null,
        learnerName: null,
        location: null,
        credit: null,
        lessonStatus: null,
        successStatus: null,
        entry: null,
        exit: null,
        score: null,
        scoreRaw: null,
        scoreMax: null,
        scoreMin: null,
        scoreScaled: null,
        totalTime: null,
        sessionTime: null,
        mode: null,
        suspendData: null,
        launchData: null,
        scaledPassingScore: null,
        maximumTimeAllowed: null,
        timeLimitAction: null,
        audioLevel: null,
        language: null,
        deliverySpeed: null,
        audioCaptioning: null
    };

    exports.blankMap = blankMap;
    exports.parsedTime = parsedTime;
    exports.Connect = Connect;
    exports.findApiInFrames = findApiInFrames;
});