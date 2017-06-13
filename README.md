# Simple Gantt

## Install

Import CSS:

```html
<link rel="stylesheet" href="simple-gantt.css">
```

Import JS:

```html
<script src="simple-gantt.js"></script>
```

## Use

Init events:
```javascript
var events = [{
        name: "Ressource 1",
        events: [{
            id : 1,
            start : "10:00",
            end : "12:00",
            label: "Event 1",
            color: "#42a5f5"
        }, {
            id : 2,
            start : "14:00",
            end : "15:00",
            label: "Event 2",
            color: "#66bb6a"
        }]
    }, {
        name: "Ressource 2",
        events: [{
            id : 3,
            start : "15:00",
            end : "16:00",
            label: "Event 3",
            color: "#ffca28"
        }, {
            id : 4,
            start : "12:30",
            end : "13:30",
            label: "Event 4",
            color: "#ef5350"
        }]
    }];
```
Set options:

```javascript
let options = {
    start: 6,
    end: 21,
    legend: true,
    onClick: function(event) {
        alert(event.label);
    }
}
```
Then instanciate:

```javascript
var gantt = new SimpleGantt('gantt', events, options);
```
