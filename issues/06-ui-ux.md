# Issue 06: UI and UX

## Objective
Implement menus, in-game HUD, and game flow transitions.

## Design
* **Main Menu (`MainMenu.tscn`):**
    * Title label: "Boba Frenzy"
    * Buttons: "Play", "Quit".
* **HUD (`HUD.tscn`):**
    * Display round timer at the top center.
    * Display player scores in the corners (color-coded to the players).
* **Game Over Screen (`GameOver.tscn`):**
    * Announces the winner based on the highest score.
    * Buttons: "Rematch", "Main Menu".

## Acceptance Criteria
- [ ] Main Menu scene is functional and transitions to the game scene.
- [ ] HUD accurately reflects real-time scores and timer from `GameManager`.
- [ ] Game Over screen triggers automatically when the timer ends, displaying the correct winner.
- [ ] UI is responsive and anchor points are set correctly for different resolutions.
