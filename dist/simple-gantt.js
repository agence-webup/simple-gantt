(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleGantt = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleGantt = function () {
    function SimpleGantt(target, events, options) {
        _classCallCheck(this, SimpleGantt);

        this.events = events;

        this.options = {
            start: options.start,
            end: options.end,
            legend: options.legend !== undefined ? options.legend : true,
            onClick: typeof options.onClick !== "function" ? options.onClick : null
        };

        this.ui = {
            base: document.querySelector('#' + target)
        };
        this._buildBase();
        this._buildEvents();
    }

    _createClass(SimpleGantt, [{
        key: "_buildBase",
        value: function _buildBase() {
            var _this = this;

            // base
            this.ui.base.classList.add('simpleGantt');

            // legend
            this.ui.legend = document.createElement('div');
            this.ui.legend.classList.add('simpleGantt-legend');

            this.ui.header = document.createElement('div');
            this.ui.header.classList.add('simpleGantt-header');

            this.ui.legend.appendChild(this.ui.header);

            // events legend
            this.ui.events = {};

            this.events.forEach(function (el, index) {
                _this.ui.events[index] = document.createElement('div');
                _this.ui.events[index].classList.add('simpleGantt-lineHeader');
                _this.ui.events[index].innerHTML = el.name;
                _this.ui.legend.appendChild(_this.ui.events[index]);
            });

            // display legend or not
            if (this.options.legend) {
                this.ui.base.appendChild(this.ui.legend);
            }

            // main
            this.ui.main = document.createElement('div');
            this.ui.main.classList.add('simpleGantt-main');

            // scale
            this.ui.scale = document.createElement('div');
            this.ui.scale.classList.add('simpleGantt-scale');
            this.ui.main.appendChild(this.ui.scale);

            for (var i = this.options.start; i <= this.options.end; i++) {
                var label = document.createElement('li');
                label.innerHTML = i + 'h';
                this.ui.scale.appendChild(label);
            }

            this.ui.base.appendChild(this.ui.main);
        }
    }, {
        key: "_buildEvents",
        value: function _buildEvents() {
            var _this2 = this;

            this.events.forEach(function (ressource) {
                var line = document.createElement('div');
                line.classList.add('simpleGantt-line');

                // vertical line css
                line.style.backgroundSize = 100 / (_this2.options.end - _this2.options.start + 1) + '% 100%';

                ressource.events.forEach(function (event) {
                    var item = document.createElement('span');
                    item.style.left = _this2._calculateEventOffset(event);
                    item.style.width = _this2._calculateEventWidth(event);
                    item.style.backgroundColor = event.color;
                    item.innerHTML = event.label;

                    // attach callback
                    item.addEventListener('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this2.options.onClick(event);
                    });
                    line.appendChild(item);
                });

                // line
                for (var i = _this2.options.start; i <= _this2.options.end; i++) {
                    var grid = document.createElement('div');
                    line.appendChild(grid);
                }

                _this2.ui.main.appendChild(line);
            });
        }
    }, {
        key: "_calculateEventWidth",
        value: function _calculateEventWidth(event) {
            var total = this.options.end - this.options.start + 1;

            var eventStartSplited = event.start.split(':');
            var eventEndSplited = event.end.split(':');

            // get event duration
            var eventDurationHours = eventEndSplited[0] - eventStartSplited[0];
            var eventDurationMinutes = eventEndSplited[1] - eventStartSplited[1];

            // calculate minute
            if (eventDurationMinutes < 0) {
                eventDurationHours = eventDurationHours - 1;
                eventDurationMinutes = 60 + eventDurationMinutes;
            }

            // transform time to decimal value
            var decimalValue = eventDurationHours + eventDurationMinutes * 100 / 60 / 100;

            //console.log(event);
            //console.log('hours : ' + eventDurationHours);
            //console.log('minutes : ' + eventDurationMinutes);
            //console.log('decimal : ' + decimalValue);

            return decimalValue * 100 / total + '%';
        }
    }, {
        key: "_calculateEventOffset",
        value: function _calculateEventOffset(event) {
            var decimalStart = this._timeToDecimal(event.start);
            return (decimalStart - this.options.start) * 100 / (this.options.end - this.options.start + 1) + '%';
        }
    }, {
        key: "_timeToDecimal",
        value: function _timeToDecimal(time) {
            var splitedTime = time.split(':');
            var decimalValue = splitedTime[1] * 100 / 60 / 100;
            return parseInt(splitedTime[0]) + decimalValue;
        }
    }]);

    return SimpleGantt;
}();

module.exports = SimpleGantt;

},{}]},{},[1])(1)
});