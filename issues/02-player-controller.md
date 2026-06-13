# Issue 02: Player Controller

## Objective
Implement a top-down 2D player controller for smooth movement and interaction.

## Design
* **Node Type:** `CharacterBody2D`
* **Movement:** 8-way directional movement using `Vector2.move_toward` for smooth acceleration and friction.
* **Actions:**
    * **Dash:** A quick burst of speed with a short cooldown.
    * **Bump:** Players can bump into each other, slightly knocking the other player back.
* **Structure:**
    * `Player.tscn` (Scene)
        * `Sprite2D` (or `AnimatedSprite2D`)
        * `CollisionShape2D` (Circle or Capsule)
        * `DashTimer` (Node)
    * `player.gd` (Script handling velocity and input).

## Acceptance Criteria
- [ ] `Player.tscn` is created with proper collisions.
- [ ] `player.gd` script allows smooth movement via input actions.
- [ ] Dash mechanic is implemented and functional.
- [ ] Players can push/knock back each other using basic physics interactions.
