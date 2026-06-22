// SimpleCraft - A Simple Minecraft-like Game

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = Math.min(window.innerWidth - 60, 900);
canvas.height = 600;

// Game constants
const BLOCK_SIZE = 40;
const WORLD_WIDTH = Math.floor(canvas.width / BLOCK_SIZE) + 2;
const WORLD_HEIGHT = Math.floor(canvas.height / BLOCK_SIZE) + 2;

// Block types
const BLOCKS = {
    0: { name: 'Air', color: 'transparent' },
    1: { name: 'Wood', color: '#8B7355' },
    2: { name: 'Stone', color: '#A9A9A9' },
    3: { name: 'Grass', color: '#90EE90' },
    4: { name: 'Gold', color: '#FFD700' },
    5: { name: 'Red', color: '#FF6347' }
};

// Game state
const gameState = {
    world: [],
    camera: { x: 0, y: 0 },
    player: {
        x: Math.floor(WORLD_WIDTH / 2),
        y: Math.floor(WORLD_HEIGHT / 2),
        health: 100,
        hunger: 100,
        selectedBlock: 1,
        blocksCollected: 0
    },
    time: 0,
    dayNightCycle: 0,
    particles: []
};

// Input handling
const keys = {};
const mouse = { x: 0, y: 0, pressed: false };

document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    // Block selection with number keys
    if (e.key >= '1' && e.key <= '5') {
        const blockNum = parseInt(e.key);
        gameState.player.selectedBlock = blockNum;
        updateBlockButtons();
    }
    
    // Jump with space
    if (e.key === ' ') {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width * canvas.width;
    mouse.y = (e.clientY - rect.top) / rect.height * canvas.height;
});

document.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // Left click - break block
        breakBlock();
    } else if (e.button === 2) { // Right click - place block
        placeBlock();
    }
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

// Initialize world
function initializeWorld() {
    gameState.world = [];
    for (let y = 0; y < WORLD_HEIGHT; y++) {
        gameState.world[y] = [];
        for (let x = 0; x < WORLD_WIDTH; x++) {
            // Generate terrain using simple noise
            const height = Math.sin(x * 0.1) * 3 + 5;
            
            if (y > height) {
                if (y === Math.floor(height)) {
                    gameState.world[y][x] = 3; // Grass on top
                } else if (y > Math.floor(height) && y < Math.floor(height) + 3) {
                    gameState.world[y][x] = 1; // Wood below grass
                } else {
                    gameState.world[y][x] = 2; // Stone deeper
                }
            } else {
                gameState.world[y][x] = 0; // Air
            }
        }
    }
    
    // Add some floating islands
    for (let i = 0; i < 5; i++) {
        const islandX = Math.random() * WORLD_WIDTH;
        const islandY = Math.random() * (WORLD_HEIGHT / 2) + 2;
        
        for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
                const x = Math.floor(islandX + dx);
                const y = Math.floor(islandY + dy);
                if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
                    gameState.world[y][x] = [1, 2, 4][Math.floor(Math.random() * 3)];
                }
            }
        }
    }
}

// Break block
function breakBlock() {
    const blockX = Math.floor(mouse.x / BLOCK_SIZE) + Math.floor(gameState.camera.x);
    const blockY = Math.floor(mouse.y / BLOCK_SIZE) + Math.floor(gameState.camera.y);
    
    if (blockX >= 0 && blockX < WORLD_WIDTH && blockY >= 0 && blockY < WORLD_HEIGHT) {
        if (gameState.world[blockY][blockX] !== 0) {
            gameState.world[blockY][blockX] = 0;
            gameState.player.blocksCollected++;
            createParticles(blockX * BLOCK_SIZE, blockY * BLOCK_SIZE, 5);
            updateBlockCount();
        }
    }
}

// Place block
function placeBlock() {
    const blockX = Math.floor(mouse.x / BLOCK_SIZE) + Math.floor(gameState.camera.x);
    const blockY = Math.floor(mouse.y / BLOCK_SIZE) + Math.floor(gameState.camera.y);
    
    if (blockX >= 0 && blockX < WORLD_WIDTH && blockY >= 0 && blockY < WORLD_HEIGHT) {
        if (gameState.world[blockY][blockX] === 0 && gameState.player.blocksCollected > 0) {
            gameState.world[blockY][blockX] = gameState.player.selectedBlock;
            gameState.player.blocksCollected--;
            createParticles(blockX * BLOCK_SIZE, blockY * BLOCK_SIZE, 3);
            updateBlockCount();
        }
    }
}

// Create particle effect
function createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        gameState.particles.push({
            x: x + Math.random() * BLOCK_SIZE,
            y: y + Math.random() * BLOCK_SIZE,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 1,
            color: BLOCKS[gameState.player.selectedBlock].color
        });
    }
}

// Update particles
function updateParticles() {
    gameState.particles = gameState.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.life -= 0.02;
        return p.life > 0;
    });
}

// Player movement
function updatePlayer() {
    const speed = 2;
    
    if (keys['arrowup'] || keys['w']) {
        gameState.player.y -= speed;
        gameState.player.hunger -= 0.05;
    }
    if (keys['arrowdown'] || keys['s']) {
        gameState.player.y += speed;
        gameState.player.hunger -= 0.05;
    }
    if (keys['arrowleft'] || keys['a']) {
        gameState.player.x -= speed;
        gameState.player.hunger -= 0.05;
    }
    if (keys['arrowright'] || keys['d']) {
        gameState.player.x += speed;
        gameState.player.hunger -= 0.05;
    }
    
    // Clamp player position
    gameState.player.x = Math.max(0, Math.min(WORLD_WIDTH - 1, gameState.player.x));
    gameState.player.y = Math.max(0, Math.min(WORLD_HEIGHT - 1, gameState.player.y));
    
    // Update stats
    gameState.player.hunger = Math.max(0, gameState.player.hunger - 0.02);
    
    if (gameState.player.hunger < 30) {
        gameState.player.health = Math.max(0, gameState.player.health - 0.1);
    }
    
    if (gameState.player.health < 0) {
        resetGame();
    }
    
    // Update camera to follow player
    gameState.camera.x = gameState.player.x - Math.floor(WORLD_WIDTH / 4);
    gameState.camera.y = gameState.player.y - Math.floor(WORLD_HEIGHT / 2);
}

// Render world
function renderWorld() {
    const startX = Math.floor(gameState.camera.x);
    const startY = Math.floor(gameState.camera.y);
    
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw day/night cycle effect
    const dayNightIntensity = Math.sin(gameState.time * 0.01) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(0, 0, 0, ${1 - dayNightIntensity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw blocks
    for (let y = startY; y < startY + Math.ceil(canvas.height / BLOCK_SIZE) + 1; y++) {
        for (let x = startX; x < startX + Math.ceil(canvas.width / BLOCK_SIZE) + 1; x++) {
            if (x >= 0 && x < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT) {
                const block = gameState.world[y][x];
                
                if (block !== 0) {
                    const screenX = (x - startX) * BLOCK_SIZE;
                    const screenY = (y - startY) * BLOCK_SIZE;
                    
                    ctx.fillStyle = BLOCKS[block].color;
                    ctx.fillRect(screenX, screenY, BLOCK_SIZE, BLOCK_SIZE);
                    
                    // Block border
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(screenX, screenY, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
    
    // Draw player
    const playerScreenX = (gameState.player.x - startX) * BLOCK_SIZE;
    const playerScreenY = (gameState.player.y - startY) * BLOCK_SIZE;
    
    ctx.fillStyle = '#FF6B9D';
    ctx.fillRect(playerScreenX + 5, playerScreenY + 5, BLOCK_SIZE - 10, BLOCK_SIZE - 10);
    
    // Player eyes
    ctx.fillStyle = '#FFF';
    ctx.fillRect(playerScreenX + 12, playerScreenY + 12, 5, 5);
    ctx.fillRect(playerScreenX + 23, playerScreenY + 12, 5, 5);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(playerScreenX + 13, playerScreenY + 13, 3, 3);
    ctx.fillRect(playerScreenX + 24, playerScreenY + 13, 3, 3);
    
    // Draw particles
    gameState.particles.forEach(p => {
        const screenX = p.x - startX * BLOCK_SIZE;
        const screenY = p.y - startY * BLOCK_SIZE;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(screenX, screenY, 4, 4);
        ctx.globalAlpha = 1;
    });
    
    // Draw crosshair
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.stroke();
}

// Update UI
function updateStats() {
    document.getElementById('healthFill').style.width = gameState.player.health + '%';
    document.getElementById('hungerFill').style.width = gameState.player.hunger + '%';
}

function updateBlockCount() {
    document.getElementById('blockCount').textContent = gameState.player.blocksCollected;
}

function updateBlockButtons() {
    document.querySelectorAll('.block-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.block) === gameState.player.selectedBlock) {
            btn.classList.add('active');
        }
    });
}

// Reset game
function resetGame() {
    gameState.player.health = 100;
    gameState.player.hunger = 100;
    gameState.player.blocksCollected = 0;
    gameState.player.x = Math.floor(WORLD_WIDTH / 2);
    gameState.player.y = Math.floor(WORLD_HEIGHT / 2);
    initializeWorld();
    updateStats();
    updateBlockCount();
}

// Block buttons
document.querySelectorAll('.block-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        gameState.player.selectedBlock = parseInt(btn.dataset.block);
        updateBlockButtons();
    });
});

// Reset button
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Game loop
function gameLoop() {
    gameState.time++;
    
    updatePlayer();
    updateParticles();
    renderWorld();
    updateStats();
    
    requestAnimationFrame(gameLoop);
}

// Start game
window.addEventListener('load', () => {
    initializeWorld();
    updateBlockCount();
    gameLoop();
});

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = Math.min(window.innerWidth - 60, 900);
    canvas.height = 600;
});
