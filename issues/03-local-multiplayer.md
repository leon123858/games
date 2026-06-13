# Issue 03: Local Multiplayer Input Setup

## Objective
Configure Godot's Input Map to support multiple local players using gamepads and keyboard.

## Design
* **Input Actions:** Define device-specific actions instead of global ones.
    * `p1_move_up`, `p1_move_down`, `p1_dash`, etc. (Keyboard WASD)
    * `p2_move_up`, `p2_move_down`, `p2_dash`, etc. (Keyboard Arrows)
    * `joy1_move_up`, `joy1_dash` (Gamepad 0)
    * `joy2_move_up`, `joy2_dash` (Gamepad 1)
* **Input Handling Script:** A global `InputManager` or player spawner script that assigns an input scheme to a spawned player instance based on connected devices.

## Acceptance Criteria
- [ ] Input Map is populated with actions for at least 2 keyboard layouts and 4 gamepads.
- [ ] Player instances can dynamically listen to their assigned input scheme (e.g., `Input.get_vector(up_action, down_action...)`).
- [ ] Verified that 2+ players can move independently on the same screen.
