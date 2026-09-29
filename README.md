# Iron & Oath — War and Politics in Westeros

A single-file, fan-made strategy game interface set in a stylised Westeros. It turns the original starter voxel demo into a dense political war-room: select provinces, read ravens, raise levies, march hosts, answer courtly threats, and advance the campaign turn by turn.

> This is an unofficial fan project for private experimentation. It is not affiliated with or endorsed by the rights holders of *A Song of Ice and Fire* or *Game of Thrones*.

## Run it

Open `index.html` directly in a modern browser, or serve the repository with a tiny local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What is in the game

- **Interactive Westeros map** — region polygons for the North, Vale, Riverlands, Westerlands, Crownlands, Reach, Stormlands, Dorne, and Iron Islands.
- **Political, army, and trade layers** — switch overlays to inspect borders, marching routes, hostile hosts, ports, and sea lanes.
- **Province detail** — click a region, castle, army, or house row to inspect its seat, ruling house, garrison, power, loyalty, supply, and readiness.
- **Strategic actions** — march a host, raise levies, or spend ravens to change the balance of a province.
- **Court decisions** — answer a black-wax letter from the Vale or choose how to address the selected lord.
- **Turn economy** — ending a turn collects taxes, replenishes ravens and command, consumes supplies, and can trigger an early frost.
- **Campaign chronicle** — every meaningful action is recorded in the maester's log.
- **Responsive war-room UI** — desktop three-column layout collapses into a mobile-friendly command screen.
- **No dependencies or external assets** — all HTML, CSS, SVG map artwork, and game logic live in `index.html`.

## Controls

- Click a **province**, **settlement**, **army marker**, or **house** to select a theatre.
- Use **+**, **−**, and **⌂** to zoom or reset the map.
- Switch between **Political**, **Armies**, and **Trade routes** map layers.
- Use **March host**, **Raise levies**, and **Send a raven** from the province panel.
- Use **Read the letter** to make a political decision.
- Use **End the turn** to advance the campaign.
- Use the top navigation to move between the realm, council, war-room, and chronicle views.

## Files

```text
index.html   # Complete game: structure, styling, SVG map, and interaction logic
styles.css   # Original starter stylesheet, no longer required by index.html
game.js      # Original starter demo logic, no longer required by index.html
```
