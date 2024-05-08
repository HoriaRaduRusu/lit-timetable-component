# custom-timetable
Custom timetable is a simple but highly customizable UI element showing a timetable for a week. The events are displayed by day and sorted in the following way:
- Events that happen all day are before ones that don't
- Events that don't happen all day are sorted by starting hour
- Events that start at the same hour are sorted by ending hour
- Events that happen all day, or start and end at the same hours are sorted alphabetically by title

## Install

Add custom-timteable to your project:
```
npm i custom-timetable
```

Or load the ES module directly through unpkg

```html
<script type="module" src="https://unpkg.com/custom-timetable"></script>
```

## Usage

Import into your module script:
```javascript
import { CustomTimetable } from "custom-timetable"
```

or add to your html page:
```html
<script type="module" src="path/to/custom-timetable.bundled.js]"></script>
```

## Use it in your HTML
```html
<custom-timetable></custom-timetable>
```

## Component API
### Properties
#### headertext ###
The text to use in the header. Default is 'Timetable'
```html
<custom-timetable headertext="My Schedule"></custom-timetable>
```

#### refresh-enabled ####
Whether or not to show the refresh button. Default is false
```html
<custom-timetable refresh-enabled></custom-timetable>
```

#### weekends ####
Whether or not to show weekends. Default is false
```html
<custom-timetable weekends></custom-timetable>
```

#### long-names ####
Whether to show the weekday names in a long format. Default is false (short format)
```html
<custom-timetable long-names></custom-timetable>
```

#### start-with-sunday ####
Whether or not to start the week on Sunday. Default is false (starting with Monday). If weekends is false, this value is ignored (since Sunday is not displayed).
```html
<custom-timetable start-with-sunday></custom-timetable>
```

#### all-caps-headers ####
Whether or not to show the headers in all caps. Default is false
```html
<custom-timetable all-caps-headers></custom-timetable>
```

#### displayed-events ####
Events to display by default, in JSON Array format. Default is empty
```html
<custom-timetable displayed-events='[{"id": 1, "color": "#ff0", "title": "event title", "weekday": "Monday", "allDay": true, "participants":["George"], "location": "Somewhere"}]'></custom-timetable>
```
Object format that needs to be sent:
```javascript
{
  id: number, // Unique id
  color: string, // Background color to be displayed
  title: string, // Title of the event
  weekday: string, // Weekday when the event happens, needs to be one of the following: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  allDay: boolean, // Whether or not this event happens all day
  startingHour: string | undefined, // If allDay is false, the hour at which the event starts
  endingHour: string | undefined, // If allDay is false, the hour at which the event ends
  participants: Array<string>, // A list of participants
  location: string // The location where the event happens
}
```

#### style-src ####
Source of style file that can change this component. Default is none
```html
<custom-timetable style-src="style.css"></custom-timetable>
```

### Events
#### retrieveEvents ####
This event is fired if refreshing events is enabled, when the component is added to the DOM and whenever the refresh button included in the component is pressed. The event contains a detail object, containing a setEvents function that takes as an argument a list of TimetableEvents as defined prior. Here is an example of how to handle this event in a simplistic manner
```javascript
function handleRetrieveEvents(event) {
        event.detail.setEvents([{
          id: 1,
          color: "#f00",
          title: "Test Title",
          weekday: "Monday",
          allDay: false,
          startingHour: "18:00",
          endingHour: "20:00",
          participants: ["George", "Mihai"],
          location: "In town"
        }]);
      }
      window.addEventListener("retrieveEvents", handleRetrieveEvents);
```

## Credits
custom-timetable was built using [Lit](https://lit.dev/).

## License
[BSD 3-Clause License](https://github.com/HoriaRaduRusu/lit-timetable-component/blob/main/LICENSE)