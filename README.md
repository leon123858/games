# Boba Frenzy (Web Version)

This is a 2D top-down local multiplayer game originally planned for Godot, but pivoted to an HTML5 Canvas game using Phaser 3.

## Implemented Features

* **Project Setup**: Initialized Phaser 3 HTML5 environment.
* **Game Assets**: Basic graphics generated using Phaser shape primitives.
* **Player Controller**: 8-way movement and collisions implemented for two players.
* **Local Multiplayer**: Player 1 uses WASD; Player 2 uses Arrow keys.
* **Core Mechanics**: Boba spawns periodically. Players collide to collect them and gain points.
* **Level Design**: Arena with static block obstacles.
* **UI/UX**: Score HUD, Round timer, Main Menu, and Game Over flow.

## Compilation / Running

To play, simply serve the directory with an HTTP server and open `index.html`.
e.g., `python3 -m http.server 8000` or `npx serve .`
