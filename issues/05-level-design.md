# Issue 05: Level Design (Arena)

## Objective
Create a visually appealing, playable bounded arena for the players to fight in.

## Design
* **Map Structure:** `TileMap` node (or `TileMapLayer` in 4.3).
* **Layers:**
    * `Floor`: Background visuals.
    * `Walls/Obstacles`: Collidable tiles that players cannot pass through.
* **Layout:**
    * Rectangular or circular closed arena.
    * Central obstacles to force pathing and strategy.
    * Symmetrical spawn zones for up to 4 players.

## Acceptance Criteria
- [ ] `Arena.tscn` is created with a `TileMapLayer` setup.
- [ ] Collision is correctly configured so players cannot leave the screen or pass through solid obstacles.
- [ ] Includes at least 4 predefined `Marker2D` nodes for player spawn points.
