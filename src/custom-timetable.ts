/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

export type TimetableEvent = {
  id: number,
  color: string,
  title: string,
  weekday: string,
  allDay: boolean,
  startingHour: string | undefined,
  endingHour: string | undefined,
  participants: Array<string>,
  location: string
}

@customElement('custom-timetable')
export class CustomTimetable extends LitElement {
  private static SHORT_WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private static LONG_WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  static override styles = css`
    :host table {
      border-collapse: collapse;
      width: 90%;
    }
    :host thead td {
      background-color: lightgray;
      text-align: center;
      font-weight: 700
    }
    :host td {
      border: solid black;
      width: 14.28%;
      vertical-align: top;
    }
    :host tbody>td>div {
      min-height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    #header-text {
      font-weight: 700;
      font-size: 25px;
    }
    #header-div {
      font-family: Arial, Helvetica, sans-serif;
      margin-bottom: 5px;
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
  @property({type: Boolean})
  weekends = false;

  /**
   * Whether to display long or short weekday names
   */
  @property({type: Boolean, attribute: "long-names"})
  longNames = false;

  /**
   * Whether to start with Sunday or Monday. Ignored if showWeekends is false
   */
  @property({type: Boolean, attribute: "start-with-sunday"})
  startWithSunday = false;

  /**
   * Whether to write the weekday names in all-caps or not
   */
  @property({type: Boolean, attribute: "all-caps-headers"})
  allCapsHeaders = false;
  
  @state()
  events: Array<TimetableEvent> = [];

  override render() {
    return html`
      <div id="header-div">
      <span id="header-text">${this.headerText}</span>
      <button @click=${this._launchRetrieveEventsEvent}>&#8635;</button>
      </div>
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
  
  override connectedCallback(): void {
    super.connectedCallback();
    this._launchRetrieveEventsEvent();
  }

  private _getWeekdayHeaders() {
    let weekdays = this.longNames ? [...CustomTimetable.LONG_WEEKDAYS] : [...CustomTimetable.SHORT_WEEKDAYS];
    if (!this.weekends) {
      weekdays = weekdays.slice(0, -2);
    } else if (this.startWithSunday) {
      weekdays.unshift(weekdays.pop()!);
    }
    if (this.allCapsHeaders) {
      weekdays = weekdays.map((day) => day.toUpperCase());
    }
    return weekdays;
  }

  private _getWeekdaysInOrder() {
    let weekdays = [...CustomTimetable.LONG_WEEKDAYS];
    if (!this.weekends) {
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
        } else if (firstEvent.startingHour !== secondEvent.startingHour) {
          return firstEvent.startingHour!.localeCompare(secondEvent.startingHour!);
        } else if (firstEvent.endingHour !== secondEvent.endingHour) {
          return firstEvent.endingHour!.localeCompare(secondEvent.endingHour!);
        } else {
          return firstEvent.title.localeCompare(secondEvent.title);
        }
      })
  }

  private _launchRetrieveEventsEvent() {
    const event = new CustomEvent('retrieveEvents', {bubbles: true, composed: true, detail: {setEvents: (newEvents: Array<TimetableEvent>) => {this.events = newEvents}}});
    this.dispatchEvent(event);
  }
}

@customElement("custom-timetable-event")
class CustomTimetableEvent extends LitElement {
  static override styles = css`
  :host>div {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    font-size: 12px;
    border-radius: 3px;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  `;

  @property({ type: Object })
  event!: TimetableEvent;

  override render() {
    return html`
    <div style=${'background-color:' + this.event.color}>
    ${this._getEventText()}
    </div>
    `
  }

  private _getEventText() {
    let duration = this.event.allDay 
      ? html`<span>All Day</span>`
      : html`<span>${this.event.startingHour} - ${this.event.endingHour}</span>`
    return html`
      ${duration}<br>
      <span>${this.event.title}</span><br>
      <span>${this.event.participants.join(", ")}</span><br>
      <span>${this.event.location}</span>
    `;
  }
    
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-timetable': CustomTimetable;
    'custom-timetable-event': CustomTimetableEvent;
  }
}
