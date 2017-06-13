"use strict";

class SimpleGantt {

    constructor(target, events, options) {
        this.events = events;

        this.options = {
            start: options.start,
            end: options.end,
            legend: (options.legend !== undefined) ? options.legend : true,
            onClick: (typeof options.onClick !== "function") ? options.onClick : null
        };

        this.ui = {
            base: document.querySelector('#' + target)
        }
        this._buildBase();
        this._buildEvents();
    }

    _buildBase() {
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

        this.events.forEach((el, index) => {
            this.ui.events[index] = document.createElement('div');
            this.ui.events[index].classList.add('simpleGantt-lineHeader');
            this.ui.events[index].innerHTML = el.name;
            this.ui.legend.appendChild(this.ui.events[index]);
        });

        // display legend or not
        if(this.options.legend) {
            this.ui.base.appendChild(this.ui.legend);
        }

        // main
        this.ui.main = document.createElement('div');
        this.ui.main.classList.add('simpleGantt-main');

        // scale
        this.ui.scale = document.createElement('div');
        this.ui.scale.classList.add('simpleGantt-scale');
        this.ui.main.appendChild(this.ui.scale);


        for (let i = this.options.start; i <= this.options.end; i++) {
            let label = document.createElement('li');
            label.innerHTML = i + 'h';
            this.ui.scale.appendChild(label);
        }

        this.ui.base.appendChild(this.ui.main);
    }

    _buildEvents() {
        this.events.forEach((ressource) => {
            let line = document.createElement('div');
            line.classList.add('simpleGantt-line');

            // vertical line css
            line.style.backgroundSize = (100 / (this.options.end - this.options.start + 1)) + '% 100%';


            ressource.events.forEach((event) => {
                let item = document.createElement('span');
                item.style.left = this._calculateEventOffset(event);
                item.style.width = this._calculateEventWidth(event);
                item.style.backgroundColor = event.color;
                item.innerHTML = event.label;

                // attach callback
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.options.onClick(event);
                });
                line.appendChild(item);
            })

            // line
            for (let i = this.options.start; i <= this.options.end; i++) {
                let grid = document.createElement('div');
                line.appendChild(grid);
            }

            this.ui.main.appendChild(line);
        });
    }

    _calculateEventWidth(event) {
        let total = this.options.end - this.options.start + 1;

        let eventStartSplited = event.start.split(':');
        let eventEndSplited = event.end.split(':');

        // get event duration
        let eventDurationHours = eventEndSplited[0] - eventStartSplited[0];
        let eventDurationMinutes = eventEndSplited[1] - eventStartSplited[1]

        // calculate minute
        if(eventDurationMinutes < 0) {
            eventDurationHours = eventDurationHours - 1;
            eventDurationMinutes =  60 + eventDurationMinutes;
        }

        // transform time to decimal value
        let decimalValue = eventDurationHours + ((eventDurationMinutes * 100 / 60) / 100);

        //console.log(event);
        //console.log('hours : ' + eventDurationHours);
        //console.log('minutes : ' + eventDurationMinutes);
        //console.log('decimal : ' + decimalValue);

        return (decimalValue * 100 / total) + '%';
    }

    _calculateEventOffset(event) {
        let decimalStart = this._timeToDecimal(event.start);
        return (decimalStart - this.options.start) * 100 / (this.options.end - this.options.start + 1) + '%';
    }

    _timeToDecimal(time) {
        let splitedTime = time.split(':');
        let decimalValue = ((splitedTime[1] * 100) / 60) / 100;
        return parseInt(splitedTime[0]) + decimalValue;
    }

}

module.exports = SimpleGantt;
