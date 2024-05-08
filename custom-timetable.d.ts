/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement, PropertyValues } from 'lit';
export type TimetableEvent = {
    id: number;
    color: string;
    title: string;
    weekday: string;
    allDay: boolean;
    startingHour: string | undefined;
    endingHour: string | undefined;
    participants: Array<string>;
    location: string;
};
export declare class CustomTimetable extends LitElement {
    private static SHORT_WEEKDAYS;
    private static LONG_WEEKDAYS;
    static styles: import("lit").CSSResult;
    /**
     * The header of the timetable.
     */
    headerText: string;
    /**
     * Whether or not the refresh button should be displayed
     */
    refreshEnabled: boolean;
    /**
     * Whether to display weekends or not
     */
    weekends: boolean;
    /**
     * Whether to display long or short weekday names
     */
    longNames: boolean;
    /**
     * Whether to start with Sunday or Monday. Ignored if showWeekends is false
     */
    startWithSunday: boolean;
    /**
     * Whether to write the weekday names in all-caps or not
     */
    allCapsHeaders: boolean;
    /**
     * The events to display in the timetable, written in JSON
     */
    displayedEvents: string | undefined;
    styleSrc: string | undefined;
    events: Array<TimetableEvent>;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    protected willUpdate(_changedProperties: PropertyValues): void;
    private _getWeekdayHeaders;
    private _getWeekdaysInOrder;
    private _getEventsForWeekdayInOrder;
    private _launchRetrieveEventsEvent;
}
declare class CustomTimetableEvent extends LitElement {
    static styles: import("lit").CSSResult;
    event: TimetableEvent;
    render(): import("lit-html").TemplateResult<1>;
    private _getEventText;
}
declare global {
    interface HTMLElementTagNameMap {
        'custom-timetable': CustomTimetable;
        'custom-timetable-event': CustomTimetableEvent;
    }
}
export {};
//# sourceMappingURL=custom-timetable.d.ts.map