/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

export type TimetableEvent = {
  id: number,
  color: string,
  title: string,
  weekday: string,
  allDay: boolean,
  startingHour: string,
  endingHour: string,
  participants: string,
  location: string
}

@customElement('custom-timetable')
export class CustomTimetable extends LitElement {
  private static SHORT_WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private static LONG_WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  static override styles = css`
    :host table {
      border-collapse: collapse;
      width: 50%;
    }
    :host thead td {
      background-color: lightgray;
      text-align: center;
    }
    :host td {
      border: solid black;
      width: 7.14%;
    }
    :host tbody>td>div {
      min-height: 50px;
    }
  `;

  /**
   * The header of the timetable.
   */
  @property()
  headerText = 'Timetable';

  /**
   * Whether to display weekends or not
   */
  @state()
  showWeekends = true;

  /**
   * Whether to display long or short weekday names
   */
  @state()
  longWeekdayNames = false;

  /**
   * Whether to start with Sunday or Monday. Ignored if showWeekends is false
   */
  @state()
  startWithSunday = true;

  /**
   * Whether to write the weekday names in all-caps or not
   */
  @state()
  allCapsWeekdayNames = false;

  /**
   * Function that returns a list of events to be displayed
   */
  @property()
  retrieveEvents: (() => Array<TimetableEvent>) | undefined;
  
  @property({attribute: false})
  events: Array<TimetableEvent> = [];

  override render() {
    return html`
      <h3>${this.headerText}</h3>
      <table>
        <thead>
          ${this._getWeekdayHeaders().map((weekday) => html`<td>${weekday}</td>`)}
        </thead>
        <tbody>
          ${this._getWeekdaysInOrder().map((weekday) => html`
            <td>
              <div>
                ${this._getEventsForWeekdayInOrder(weekday).map((event) => html`
                  <custom-timetable-event .event=${event}></custom-timetable-event>`)}
              </div>
            </td>
          `)}
        </tbody>
      </table>
    `;
  }
  
  protected override firstUpdated(_changedProperties: PropertyValues): void {
    if (this.retrieveEvents !== undefined) {
      this.events = this.retrieveEvents();
    }
  }

  private _getWeekdayHeaders() {
    let weekdays = this.longWeekdayNames ? [...CustomTimetable.LONG_WEEKDAYS] : [...CustomTimetable.SHORT_WEEKDAYS];
    if (!this.showWeekends) {
      weekdays = weekdays.slice(0, -2);
    } else if (this.startWithSunday) {
      weekdays.unshift(weekdays.pop()!);
    }
    if (this.allCapsWeekdayNames) {
      weekdays = weekdays.map((day) => day.toUpperCase());
    }
    return weekdays;
  }

  private _getWeekdaysInOrder() {
    let weekdays = [...CustomTimetable.LONG_WEEKDAYS];
    if (!this.showWeekends) {
      weekdays = weekdays.slice(0, -2);
    } else if (this.startWithSunday) {
      weekdays.unshift(weekdays.pop()!);
    }
    return weekdays;
  }

  private _getEventsForWeekdayInOrder(weekday: string) {
    return this.events
      .filter((event) => event.weekday === weekday)
      .sort((firstEvent, secondEvent) => {
        if (firstEvent.allDay){
          if (secondEvent.allDay) {
            return firstEvent.title.localeCompare(secondEvent.title);
          }
          return -1;
        } else if (secondEvent.allDay) {
          return 1;
        } else if (firstEvent.startingHour < secondEvent.startingHour) {
          return -1;
        } else if (firstEvent.startingHour > secondEvent.startingHour) {
          return 1;
        } else {
          return firstEvent.title.localeCompare(secondEvent.title);
        }
      })
  }

}

@customElement("custom-timetable-event")
class CustomTimetableEvent extends LitElement {
  @property({ type: Object })
  event!: TimetableEvent;


    
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-timetable': CustomTimetable;
    'custom-timetable-event': CustomTimetableEvent;
  }
}
