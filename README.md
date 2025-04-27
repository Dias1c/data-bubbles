# Data Bubbles

📊🫧 Bubble chart for data visualization, like in [cryptobubbles.net](https://cryptobubbles.net/)

Demo is here: [https://dias1c.github.io/data-bubbles/](https://dias1c.github.io/data-bubbles/)

## TODO

- [ ] Settings, edit bubbles by UI
- [ ] ? Bubbles Preview

  - [ ] Cache images (key is name, value: img_src)
  - [ ] Setting bubbles
  - [~] Sizes calculation (Max squares in the box algorighm)
  - [ ] Min size of bubbles
  - [x] Image size calculation
  - [ ] Clickable bubbles
  - [ ] Scale must be using in calcuation for simulation

- [ ] Share data-bubbles loaded from URL

- [ ] Requests to DataBubbles
- [ ] postMessage (Support IFrame)
- [ ] Wiki (Documentation)

## Ideas

- [ ] Add Color Picker button [https://www.google.com/search?q=color+picker]
- [ ] Add Description about editing styles in share
- [ ] Set Scale on Share / Settings

- [ ] Орентация в пространстве

```js
window.addEventListener("deviceorientation", function (event) {
  const { alpha, beta, gamma } = event;

  console.log("alpha (компас):", alpha); // 0–360° - направление относительно севера
  console.log("beta (наклон вперед-назад):", beta); // -180° (назад) до 180° (вперед)
  console.log("gamma (наклон влево-вправо):", gamma); // -90° (влево) до 90° (вправо)

  if (beta > 10) {
    console.log("Телефон наклонён вперёд");
  } else if (beta < -10) {
    console.log("Телефон наклонён назад");
  }

  if (gamma > 10) {
    console.log("Телефон наклонён вправо");
  } else if (gamma < -10) {
    console.log("Телефон наклонён влево");
  }
  setStates({ alpha, beta, gamma });
});
```

- [ ] New color Props for bubbles
  - Color Bubble
  - Color Text
