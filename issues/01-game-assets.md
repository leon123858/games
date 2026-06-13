# Issue 01: Game Assets Collection

## Objective
Acquire or create all necessary visual and audio assets for Boba Frenzy.

## Design
* **Visual Theme:** Bright, colorful, 2D pixel art or clean vector art.
* **Entities:**
    * **Players:** 2-4 distinct character sprites (e.g., different colored cups or cute animals). Needs idle and run animations (4 directions).
    * **Collectibles:** Boba pearls (standard, golden bonus), tea splashes.
    * **Environment:** Arena floor tiles (cafe or table theme), walls/obstacles (cups, saucers, sugar cubes).
* **Audio:**
    * **BGM:** Upbeat, fast-paced arcade music.
    * **SFX:** "Pop" sound for collecting boba, dash sound, collision/bump sound, game over jingle.

## Acceptance Criteria
- [ ] Folder `assets/sprites/` contains player, collectible, and environment sprites.
- [ ] Folder `assets/audio/` contains BGM and SFX.
- [ ] All assets are imported into Godot with correct settings (e.g., 2D pixel nearest neighbor filtering if pixel art).
