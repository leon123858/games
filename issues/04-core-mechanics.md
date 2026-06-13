# Issue 04: Core Game Mechanics (The "Boba" Loop)

## Objective
Implement the main gameplay loop: spawning boba, players collecting it, and keeping score.

## Design
* **Boba Spawner:**
    * A `Node2D` or `Marker2D` network acting as spawn points.
    * A `Timer` that triggers boba spawning at random intervals.
* **Boba Entity (`Boba.tscn`):**
    * `Area2D` with a `Sprite2D` and `CollisionShape2D`.
    * Emits a `collected(player_id, points)` signal on `body_entered`.
* **Game Manager (`GameManager.gd`):**
    * Singleton/Autoload that tracks `player_scores` dictionary.
    * Manages the round timer (e.g., 60 seconds per round).
    * Handles end-of-round state.

## Acceptance Criteria
- [ ] Boba items spawn dynamically within the arena bounds over time.
- [ ] Players trigger the collection when touching a boba item (boba disappears).
- [ ] Score is tracked per player.
- [ ] Round timer functions and stops gameplay when reaching zero.
