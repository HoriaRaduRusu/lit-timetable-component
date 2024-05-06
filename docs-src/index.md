---
layout: page.11ty.cjs
title: <custom-timetable> ⌲ Home
---

# &lt;custom-timetable>

`<custom-timetable>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<custom-timetable>` is just an HTML element. You can it anywhere you can use HTML!

```html
<custom-timetable></custom-timetable>
```

  </div>
  <div>

<custom-timetable></custom-timetable>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<custom-timetable>` can be configured with attributed in plain HTML.

```html
<custom-timetable name="HTML"></custom-timetable>
```

  </div>
  <div>

<custom-timetable name="HTML"></custom-timetable>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<custom-timetable>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;custom-timetable&gt;</h2>
    <custom-timetable .name=${name}></custom-timetable>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;custom-timetable&gt;</h2>
<custom-timetable name="lit-html"></custom-timetable>

  </div>
</section>
