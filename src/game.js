// Menu Scene
class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        let title = this.add.text(400, 200, 'Boba Frenzy', { fontSize: '64px', fill: '#fff' });
        title.setOrigin(0.5);

        let startBtn = this.add.text(400, 400, 'Click to Start', { fontSize: '32px', fill: '#0f0' });
        startBtn.setOrigin(0.5);
        startBtn.setInteractive();

        startBtn.on('pointerdown', () => {
            this.scene.start('MainScene');
        });
    }
}

// Game Over Scene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScoreP1 = data.p1;
        this.finalScoreP2 = data.p2;
    }

    create() {
        let text = "It's a Tie!";
        if (this.finalScoreP1 > this.finalScoreP2) text = "Player 1 Wins!";
        if (this.finalScoreP2 > this.finalScoreP1) text = "Player 2 Wins!";

        let title = this.add.text(400, 200, 'Game Over', { fontSize: '64px', fill: '#fff' });
        title.setOrigin(0.5);

        let result = this.add.text(400, 300, text, { fontSize: '48px', fill: '#ff0' });
        result.setOrigin(0.5);

        let subResult = this.add.text(400, 400, `P1: ${this.finalScoreP1} | P2: ${this.finalScoreP2}`, { fontSize: '32px', fill: '#fff' });
        subResult.setOrigin(0.5);

        let restartBtn = this.add.text(400, 500, 'Click to Restart', { fontSize: '32px', fill: '#0f0' });
        restartBtn.setOrigin(0.5);
        restartBtn.setInteractive();

        restartBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

// Main Play Scene
class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // We'll generate texture assets using Graphics to keep it standalone
    }

    create() {
        // --- GAME STATE ---
        this.scoreP1 = 0;
        this.scoreP2 = 0;
        this.timeLeft = 30; // 30 second round

        // --- ASSET GENERATION ---

        // Generate Player 1 Texture (Blue Square)
        let graphics = this.add.graphics();
        graphics.fillStyle(0x3498db, 1);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('player1', 32, 32);
        graphics.clear();

        // Generate Player 2 Texture (Red Square)
        graphics.fillStyle(0xe74c3c, 1);
        graphics.fillRect(0, 0, 32, 32);
        graphics.generateTexture('player2', 32, 32);
        graphics.clear();

        // Generate Boba Texture (Black Circle)
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(8, 8, 8);
        graphics.generateTexture('boba', 16, 16);
        graphics.clear();

        // Generate Wall Texture (Gray Block)
        graphics.fillStyle(0x95a5a6, 1);
        graphics.fillRect(0, 0, 64, 64);
        graphics.generateTexture('wall', 64, 64);
        graphics.destroy();

        // --- LEVEL DESIGN (STATIC OBSTACLES) ---
        this.walls = this.physics.add.staticGroup();
        this.walls.create(400, 300, 'wall');
        this.walls.create(400, 236, 'wall');
        this.walls.create(400, 364, 'wall');
        this.walls.create(200, 150, 'wall');
        this.walls.create(600, 450, 'wall');

        // --- PLAYER SETUP ---

        // Player 1
        this.player1 = this.physics.add.sprite(200, 300, 'player1');
        this.player1.setCollideWorldBounds(true);
        this.player1.setDrag(1000);
        this.player1.setMaxVelocity(300);

        // Player 2
        this.player2 = this.physics.add.sprite(600, 300, 'player2');
        this.player2.setCollideWorldBounds(true);
        this.player2.setDrag(1000);
        this.player2.setMaxVelocity(300);

        // Enable collisions
        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player1, this.walls);
        this.physics.add.collider(this.player2, this.walls);

        // --- BOBA MECHANICS ---
        this.bobas = this.physics.add.group();

        // Spawn a Boba every 2 seconds
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnBoba,
            callbackScope: this,
            loop: true
        });

        // Collection overlap logic
        this.physics.add.overlap(this.player1, this.bobas, (player, boba) => this.collectBoba(1, boba), null, this);
        this.physics.add.overlap(this.player2, this.bobas, (player, boba) => this.collectBoba(2, boba), null, this);

        // --- UI & TIMERS ---
        this.scoreTextP1 = this.add.text(16, 16, 'P1: 0', { fontSize: '32px', fill: '#3498db' });
        this.scoreTextP2 = this.add.text(650, 16, 'P2: 0', { fontSize: '32px', fill: '#e74c3c' });
        this.timerText = this.add.text(350, 16, 'Time: 30', { fontSize: '32px', fill: '#fff' });

        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // --- INPUT SETUP ---

        // Player 1 Keys (WASD)
        this.keysP1 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Player 2 Keys (Arrows)
        this.keysP2 = this.input.keyboard.createCursorKeys();

        this.speed = 2000;
    }

    update() {
        this.handlePlayerMovement(this.player1, this.keysP1);
        this.handlePlayerMovement(this.player2, this.keysP2);
    }

    spawnBoba() {
        // Ensure boba spawns within the screen bounds
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);

        let boba = this.bobas.create(x, y, 'boba');
        // Add a little bounciness just for fun if it ever interacts with walls, though overlap handles collection
        boba.setBounce(1);
    }

    collectBoba(playerId, boba) {
        boba.disableBody(true, true);

        if (playerId === 1) {
            this.scoreP1 += 10;
            this.scoreTextP1.setText(`P1: ${this.scoreP1}`);
        } else if (playerId === 2) {
            this.scoreP2 += 10;
            this.scoreTextP2.setText(`P2: ${this.scoreP2}`);
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}`);
        if (this.timeLeft <= 0) {
            this.scene.start('GameOverScene', { p1: this.scoreP1, p2: this.scoreP2 });
        }
    }

    handlePlayerMovement(player, keys) {
        let ax = 0;
        let ay = 0;

        if (keys.left.isDown) ax -= 1;
        if (keys.right.isDown) ax += 1;
        if (keys.up.isDown) ay -= 1;
        if (keys.down.isDown) ay += 1;

        // Normalize acceleration for diagonal movement
        if (ax !== 0 && ay !== 0) {
            let length = Math.sqrt(ax * ax + ay * ay);
            ax /= length;
            ay /= length;
        }

        player.setAcceleration(ax * this.speed, ay * this.speed);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: document.body,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Top-down, so no gravity
            debug: false
        }
    },
    scene: [MenuScene, MainScene, GameOverScene]
};

const game = new Phaser.Game(config);
