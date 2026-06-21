// ============================================================
//  ZOMBIE OUTBREAK — First-Person Zombie Shooter
//  With vertical movement, headshots, wave tracker,
//  Q/E weapon switching, F key zombie tracker + unstuck system
// ============================================================

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioCtx();

function playSound(type) {
    const now = audioCtx.currentTime;
    const g = audioCtx.createGain();
    g.connect(audioCtx.destination);
    switch (type) {
        case 'pistol': {
            const o = audioCtx.createOscillator(); const n = createNoise(0.08);
            o.type = 'square'; o.frequency.setValueAtTime(400, now); o.frequency.exponentialRampToValueAtTime(80, now + 0.08);
            g.gain.setValueAtTime(0.4, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            o.connect(g); n.connect(g); o.start(now); o.stop(now + 0.1); break;
        }
        case 'shotgun': {
            const n = createNoise(0.2); const o = audioCtx.createOscillator();
            o.type = 'sawtooth'; o.frequency.setValueAtTime(200, now); o.frequency.exponentialRampToValueAtTime(40, now + 0.15);
            g.gain.setValueAtTime(0.6, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            o.connect(g); n.connect(g); o.start(now); o.stop(now + 0.25); break;
        }
        case 'smg': {
            const o = audioCtx.createOscillator(); o.type = 'square';
            o.frequency.setValueAtTime(600, now); o.frequency.exponentialRampToValueAtTime(150, now + 0.04);
            g.gain.setValueAtTime(0.25, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            o.connect(g); o.start(now); o.stop(now + 0.06); break;
        }
        case 'rifle': {
            const o = audioCtx.createOscillator(); const n = createNoise(0.1);
            o.type = 'sawtooth'; o.frequency.setValueAtTime(300, now); o.frequency.exponentialRampToValueAtTime(60, now + 0.1);
            g.gain.setValueAtTime(0.5, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            o.connect(g); n.connect(g); o.start(now); o.stop(now + 0.12); break;
        }
        case 'knife': {
            const o = audioCtx.createOscillator(); o.type = 'triangle';
            o.frequency.setValueAtTime(800, now); o.frequency.exponentialRampToValueAtTime(200, now + 0.1);
            g.gain.setValueAtTime(0.2, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            o.connect(g); o.start(now); o.stop(now + 0.12); break;
        }
        case 'hit': {
            const o = audioCtx.createOscillator(); o.type = 'sine';
            o.frequency.setValueAtTime(1200, now); o.frequency.exponentialRampToValueAtTime(300, now + 0.05);
            g.gain.setValueAtTime(0.15, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            o.connect(g); o.start(now); o.stop(now + 0.06); break;
        }
        case 'headshot': {
            const o1 = audioCtx.createOscillator(); const o2 = audioCtx.createOscillator(); const n = createNoise(0.15);
            o1.type = 'square'; o1.frequency.setValueAtTime(1500, now); o1.frequency.exponentialRampToValueAtTime(200, now + 0.08);
            o2.type = 'sawtooth'; o2.frequency.setValueAtTime(800, now); o2.frequency.exponentialRampToValueAtTime(100, now + 0.12);
            g.gain.setValueAtTime(0.5, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            o1.connect(g); o2.connect(g); n.connect(g); o1.start(now); o1.stop(now + 0.1); o2.start(now); o2.stop(now + 0.15); break;
        }
        case 'zombie_die': {
            const o = audioCtx.createOscillator(); o.type = 'sawtooth';
            o.frequency.setValueAtTime(200, now); o.frequency.exponentialRampToValueAtTime(50, now + 0.3);
            g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            o.connect(g); o.start(now); o.stop(now + 0.35); break;
        }
        case 'hurt': {
            const o = audioCtx.createOscillator(); o.type = 'square';
            o.frequency.setValueAtTime(150, now); o.frequency.exponentialRampToValueAtTime(80, now + 0.15);
            g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            o.connect(g); o.start(now); o.stop(now + 0.2); break;
        }
        case 'reload': {
            const o = audioCtx.createOscillator(); o.type = 'sine';
            o.frequency.setValueAtTime(500, now); o.frequency.setValueAtTime(700, now + 0.1); o.frequency.setValueAtTime(600, now + 0.2);
            g.gain.setValueAtTime(0.15, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            o.connect(g); o.start(now); o.stop(now + 0.3); break;
        }
        case 'empty': {
            const o = audioCtx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(800, now);
            g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            o.connect(g); o.start(now); o.stop(now + 0.05); break;
        }
        case 'jump': {
            const o = audioCtx.createOscillator(); o.type = 'sine';
            o.frequency.setValueAtTime(250, now); o.frequency.exponentialRampToValueAtTime(500, now + 0.1);
            g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            o.connect(g); o.start(now); o.stop(now + 0.12); break;
        }
        case 'land': {
            const n = createNoise(0.06); const o = audioCtx.createOscillator(); o.type = 'sine';
            o.frequency.setValueAtTime(100, now); o.frequency.exponentialRampToValueAtTime(50, now + 0.08);
            g.gain.setValueAtTime(0.12, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            o.connect(g); n.connect(g); o.start(now); o.stop(now + 0.1); break;
        }
        case 'weapon_switch': {
            const o = audioCtx.createOscillator(); o.type = 'sine';
            o.frequency.setValueAtTime(600, now); o.frequency.setValueAtTime(800, now + 0.04);
            g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            o.connect(g); o.start(now); o.stop(now + 0.08); break;
        }
        case 'wave_complete': {
            const o1 = audioCtx.createOscillator(); const o2 = audioCtx.createOscillator();
            o1.type = 'sine'; o1.frequency.setValueAtTime(523, now); o1.frequency.setValueAtTime(659, now + 0.15); o1.frequency.setValueAtTime(784, now + 0.3);
            o2.type = 'sine'; o2.frequency.setValueAtTime(659, now + 0.15); o2.frequency.setValueAtTime(784, now + 0.3); o2.frequency.setValueAtTime(1047, now + 0.45);
            g.gain.setValueAtTime(0.15, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            o1.connect(g); o2.connect(g); o1.start(now); o1.stop(now + 0.5); o2.start(now + 0.15); o2.stop(now + 0.6); break;
        }
        case 'tracker_ping': {
            const o = audioCtx.createOscillator(); o.type = 'sine';
            o.frequency.setValueAtTime(1000, now); o.frequency.setValueAtTime(1500, now + 0.05);
            o.frequency.setValueAtTime(1200, now + 0.1); o.frequency.setValueAtTime(1800, now + 0.15);
            g.gain.setValueAtTime(0.12, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            o.connect(g); o.start(now); o.stop(now + 0.25); break;
        }
    }
}

function createNoise(duration) {
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = audioCtx.createBufferSource();
    source.buffer = buffer; source.start(); source.stop(audioCtx.currentTime + duration);
    return source;
}

// ============================================================
//  WEAPON DEFINITIONS
// ============================================================
const WEAPONS = {
    pistol: { name: 'PISTOL', damage: 25, fireRate: 300, magSize: 12, reserveAmmo: 120, reloadTime: 1200, kickStrength: 3, kickRecovery: 0.08, kickClass: 'kickback-light', spread: 0.02, auto: false, range: 1000, isGun: true },
    shotgun: { name: 'SHOTGUN', damage: 15, pellets: 8, fireRate: 800, magSize: 6, reserveAmmo: 36, reloadTime: 2000, kickStrength: 12, kickRecovery: 0.04, kickClass: 'kickback-heavy', spread: 0.08, auto: false, range: 500, isGun: true },
    smg: { name: 'SMG', damage: 12, fireRate: 80, magSize: 30, reserveAmmo: 180, reloadTime: 1500, kickStrength: 2, kickRecovery: 0.12, kickClass: 'kickback-light', spread: 0.04, auto: true, range: 700, isGun: true },
    rifle: { name: 'RIFLE', damage: 40, fireRate: 180, magSize: 20, reserveAmmo: 100, reloadTime: 1800, kickStrength: 6, kickRecovery: 0.06, kickClass: 'kickback-medium', spread: 0.015, auto: true, range: 1200, isGun: true },
    knife: { name: 'KNIFE', damage: 35, fireRate: 400, magSize: Infinity, reserveAmmo: Infinity, reloadTime: 0, kickStrength: 0, kickRecovery: 0, kickClass: 'kickback-knife', spread: 0, auto: false, range: 80, isGun: false }
};
const WEAPON_ORDER = ['pistol', 'shotgun', 'smg', 'rifle', 'knife'];

// ============================================================
//  GAME STATE
// ============================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);

const game = {
    running: false, paused: false, player: null,
    zombies: [], particles: [], bloodSplats: [], decals: [],
    wave: 1, zombiesRemaining: 0, waveTotal: 0, waveKills: 0,
    kills: 0, headshots: 0,
    lastTime: 0, spawnTimer: 0, weaponSwing: 0, weaponBobTime: 0,
    screenShake: { x: 0, y: 0, intensity: 0 },
    kickbackOffset: 0, kickbackRotation: 0,
    waveCooldown: 0,
    // Tracker state
    trackerOpen: false,
    trackerArrowsActive: false,
    trackerArrowsTimer: 0,
    trackerTarget: -1, // index of targeted zombie (-1 = none)
    stuckTimers: [], // per-zombie stuck detection
};

const MAP_SIZE = 40; const TILE = 64; const map = [];
const GRAVITY = 800; const JUMP_FORCE = 350;
const CROUCH_OFFSET = 80; const CROUCH_SPEED_MULT = 0.5;
const WAVE_COOLDOWN_TIME = 3;
const TRACKER_ARROW_DURATION = 8; // seconds arrows stay visible
const STUCK_THRESHOLD = 5; // seconds before zombie is considered stuck
const STUCK_TELEPORT_DIST = 200; // teleport stuck zombie closer

function generateMap() {
    for (let y = 0; y < MAP_SIZE; y++) {
        map[y] = [];
        for (let x = 0; x < MAP_SIZE; x++) {
            if (x === 0 || y === 0 || x === MAP_SIZE - 1 || y === MAP_SIZE - 1) map[y][x] = 1;
            else if (Math.random() < 0.08 && !(x > 18 && x < 22 && y > 18 && y < 22)) map[y][x] = 1;
            else map[y][x] = 0;
        }
    }
}

function createPlayer(startWeapon) {
    return {
        x: MAP_SIZE / 2 * TILE + TILE / 2, y: MAP_SIZE / 2 * TILE + TILE / 2,
        angle: 0, pitch: 0, speed: 3, health: 100, maxHealth: 100,
        currentWeapon: startWeapon,
        weapons: {
            pistol: { ammo: 12, reserve: 120 }, shotgun: { ammo: 6, reserve: 36 },
            smg: { ammo: 30, reserve: 180 }, rifle: { ammo: 20, reserve: 100 },
            knife: { ammo: Infinity, reserve: Infinity },
        },
        lastFire: 0, reloading: false, reloadStart: 0, invincible: 0,
        verticalVel: 0, verticalPos: 0, isGrounded: true,
        isCrouching: false, crouchAmount: 0, wasGrounded: true,
    };
}

// ============================================================
//  INPUT
// ============================================================
const keys = {};
let mouseDown = false, mouseLocked = false;

document.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (game.running && !game.paused) {
        if (e.code === 'KeyR') reload();
        if (e.code === 'Digit1') switchWeapon('pistol');
        if (e.code === 'Digit2') switchWeapon('shotgun');
        if (e.code === 'Digit3') switchWeapon('smg');
        if (e.code === 'Digit4') switchWeapon('rifle');
        if (e.code === 'Digit5') switchWeapon('knife');
        if (e.code === 'KeyQ') cycleWeapon(-1);
        if (e.code === 'KeyE') cycleWeapon(1);
        if (e.code === 'Space') tryJump();
        if (e.code === 'KeyF') toggleTracker();
        // Number keys 6-9 for targeting zombies in tracker
        if (e.code === 'Digit6') targetZombieByIndex(0);
        if (e.code === 'Digit7') targetZombieByIndex(1);
        if (e.code === 'Digit8') targetZombieByIndex(2);
        if (e.code === 'Digit9') targetZombieByIndex(3);
    }
    if (e.code === 'Escape') {
        if (game.trackerOpen) { closeTracker(); }
        else if (game.running) { togglePause(); }
    }
    if (e.code === 'Space') e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.code] = false; });

document.addEventListener('wheel', e => {
    if (game.running && !game.paused && !game.trackerOpen) {
        if (e.deltaY > 0) cycleWeapon(1); else if (e.deltaY < 0) cycleWeapon(-1);
    }
});

canvas.addEventListener('mousedown', e => {
    if (e.button === 0) { mouseDown = true; if (game.running && !game.paused && !game.trackerOpen) fireWeapon(); }
});
canvas.addEventListener('mouseup', e => { if (e.button === 0) mouseDown = false; });
document.addEventListener('pointerlockchange', () => { mouseLocked = document.pointerLockElement === canvas; });
document.addEventListener('mousemove', e => {
    if (mouseLocked && game.running && !game.paused && game.player) {
        game.player.angle += e.movementX * 0.002;
        game.player.pitch = Math.max(-300, Math.min(300, game.player.pitch - e.movementY * 0.5));
    }
});

// ============================================================
//  ZOMBIE TRACKER SYSTEM
// ============================================================
function toggleTracker() {
    if (game.trackerOpen) {
        closeTracker();
    } else {
        openTracker();
    }
}

function openTracker() {
    if (game.zombies.length === 0) return;
    game.trackerOpen = true;
    game.trackerArrowsActive = true;
    game.trackerArrowsTimer = TRACKER_ARROW_DURATION;
    playSound('tracker_ping');
    showTrackerPing();

    // Unstuck zombies that haven't moved
    unstuckZombies();

    // Build tracker list
    buildTrackerList();
    document.getElementById('tracker-overlay').classList.remove('hidden');

    // Release pointer lock so they can click entries
    document.exitPointerLock();
}

function closeTracker() {
    game.trackerOpen = false;
    document.getElementById('tracker-overlay').classList.add('hidden');
    if (game.running && !game.paused) canvas.requestPointerLock();
}

function showTrackerPing() {
    const ping = document.getElementById('tracker-ping');
    ping.classList.remove('hidden', 'show');
    void ping.offsetWidth;
    ping.classList.add('show');
    setTimeout(() => { ping.classList.add('hidden'); ping.classList.remove('show'); }, 1000);
}

function buildTrackerList() {
    const p = game.player;
    const list = document.getElementById('tracker-list');
    list.innerHTML = '';

    // Sort zombies by distance
    const sorted = game.zombies.map((z, i) => {
        const dx = z.x - p.x, dy = z.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        return { zombie: z, index: i, dist, angle };
    }).sort((a, b) => a.dist - b.dist);

    sorted.forEach((zd, displayIdx) => {
        const z = zd.zombie;
        const dist = Math.round(zd.dist / TILE);
        const hp = z.health / z.maxHealth;
        const dir = getDirectionArrow(p.angle, zd.angle);
        const cardinal = getCardinalDir(p.angle, zd.angle);

        const entry = document.createElement('div');
        entry.className = 'tracker-entry';
        entry.innerHTML = `
            <span class="tracker-num">${displayIdx + 1}</span>
            <span class="tracker-type ${z.type}">${z.type.toUpperCase()}</span>
            <div class="tracker-hp-bar">
                <div class="tracker-hp-fill" style="width:${hp * 100}%;background:${hp > 0.5 ? '#00cc00' : hp > 0.25 ? '#cccc00' : '#cc0000'}"></div>
            </div>
            <span class="tracker-info">${cardinal} · ${dist} tiles</span>
            <span class="tracker-dist">${dist}m</span>
            <span class="tracker-dir">${dir}</span>
        `;
        entry.addEventListener('click', () => {
            game.trackerTarget = zd.index;
            closeTracker();
            // Turn player toward zombie
            game.player.angle = zd.angle;
        });
        list.appendChild(entry);
    });

    if (sorted.length === 0) {
        list.innerHTML = '<div style="text-align:center;color:#888;padding:20px;">No zombies found!</div>';
    }
}

function getDirectionArrow(playerAngle, zombieAngle) {
    let diff = zombieAngle - playerAngle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    if (Math.abs(diff) < 0.4) return '⬆';
    if (Math.abs(diff) > 2.7) return '⬇';
    if (diff > 0) return '➡';
    return '⬅';
}

function getCardinalDir(playerAngle, zombieAngle) {
    let diff = zombieAngle - playerAngle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    const deg = diff * 180 / Math.PI;
    if (deg > -22.5 && deg <= 22.5) return 'AHEAD';
    if (deg > 22.5 && deg <= 67.5) return 'FRONT-R';
    if (deg > 67.5 && deg <= 112.5) return 'RIGHT';
    if (deg > 112.5 && deg <= 157.5) return 'BACK-R';
    if (deg > -67.5 && deg <= -22.5) return 'FRONT-L';
    if (deg > -112.5 && deg <= -67.5) return 'LEFT';
    if (deg > -157.5 && deg <= -112.5) return 'BACK-L';
    return 'BEHIND';
}

function targetZombieByIndex(displayIdx) {
    if (game.zombies.length === 0) return;
    const p = game.player;
    const sorted = game.zombies.map((z, i) => {
        const dx = z.x - p.x, dy = z.y - p.y;
        return { index: i, dist: Math.sqrt(dx * dx + dy * dy), angle: Math.atan2(dy, dx) };
    }).sort((a, b) => a.dist - b.dist);

    if (displayIdx < sorted.length) {
        const target = sorted[displayIdx];
        game.trackerTarget = target.index;
        game.player.angle = target.angle;
        game.trackerArrowsActive = true;
        game.trackerArrowsTimer = TRACKER_ARROW_DURATION;
        playSound('tracker_ping');
        showTrackerPing();
        if (game.trackerOpen) closeTracker();
    }
}

function unstuckZombies() {
    const p = game.player;
    for (let i = 0; i < game.zombies.length; i++) {
        const z = game.zombies[i];
        if (!z._lastPos) {
            z._lastPos = { x: z.x, y: z.y };
            z._stuckTime = 0;
            continue;
        }
        const moved = Math.abs(z.x - z._lastPos.x) + Math.abs(z.y - z._lastPos.y);
        if (moved < 5) {
            // Zombie barely moved — likely stuck behind wall
            // Teleport it to a clear tile closer to the player
            teleportZombieCloser(z, p);
        }
    }
}

function teleportZombieCloser(zombie, player) {
    const dx = player.x - zombie.x;
    const dy = player.y - zombie.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Try positions progressively closer to player
    for (let tryDist = dist - STUCK_TELEPORT_DIST; tryDist > 100; tryDist -= 50) {
        const tx = zombie.x + Math.cos(angle) * (dist - tryDist);
        const ty = zombie.y + Math.sin(angle) * (dist - tryDist);
        const mx = Math.floor(tx / TILE), my = Math.floor(ty / TILE);
        if (mx > 0 && my > 0 && mx < MAP_SIZE - 1 && my < MAP_SIZE - 1 && map[my][mx] === 0) {
            // Also check neighbors are clear
            if (map[my - 1][mx] === 0 && map[my + 1][mx] === 0 && map[my][mx - 1] === 0 && map[my][mx + 1] === 0) {
                zombie.x = tx;
                zombie.y = ty;
                spawnParticles(tx, ty, '#44aaff', 8, 3);
                return;
            }
        }
    }

    // Fallback: teleport near player but at safe distance
    for (let attempt = 0; attempt < 20; attempt++) {
        const randAngle = Math.random() * Math.PI * 2;
        const randDist = 150 + Math.random() * 200;
        const tx = player.x + Math.cos(randAngle) * randDist;
        const ty = player.y + Math.sin(randAngle) * randDist;
        const mx = Math.floor(tx / TILE), my = Math.floor(ty / TILE);
        if (mx > 0 && my > 0 && mx < MAP_SIZE - 1 && my < MAP_SIZE - 1 && map[my][mx] === 0) {
            zombie.x = tx;
            zombie.y = ty;
            spawnParticles(tx, ty, '#44aaff', 8, 3);
            return;
        }
    }
}

function updateTrackerArrows() {
    const arrowsDiv = document.getElementById('tracker-arrows');
    arrowsDiv.innerHTML = '';

    if (!game.trackerArrowsActive || game.zombies.length === 0) return;

    game.trackerArrowsTimer -= 1 / 60;
    if (game.trackerArrowsTimer <= 0) {
        game.trackerArrowsActive = false;
        return;
    }

    const p = game.player;
    const fadeAlpha = Math.min(1, game.trackerArrowsTimer / 2);

    // Sort by distance for numbering
    const sorted = game.zombies.map((z, i) => {
        const dx = z.x - p.x, dy = z.y - p.y;
        return { zombie: z, index: i, dist: Math.sqrt(dx * dx + dy * dy), angle: Math.atan2(dy, dx) };
    }).sort((a, b) => a.dist - b.dist);

    sorted.forEach((zd, displayIdx) => {
        let relAngle = zd.angle - p.angle;
        while (relAngle > Math.PI) relAngle -= Math.PI * 2;
        while (relAngle < -Math.PI) relAngle += Math.PI * 2;

        // Only show arrows for zombies NOT in direct view
        if (Math.abs(relAngle) < 0.4) return;

        const dist = Math.round(zd.dist / TILE);
        const isTarget = zd.index === game.trackerTarget;
        const color = isTarget ? '#ff4444' : '#44aaff';

        // Position arrow on screen edge
        let ax, ay, arrow;
        const margin = 60;

        if (relAngle > 0) {
            // Right side
            ax = W - margin;
            ay = H / 2 + Math.tan(Math.min(relAngle, 1.2)) * (H / 3);
            ay = Math.max(margin, Math.min(H - margin, ay));
            arrow = '▶';
        } else {
            // Left side
            ax = margin;
            ay = H / 2 + Math.tan(Math.max(relAngle, -1.2)) * (H / 3);
            ay = Math.max(margin, Math.min(H - margin, ay));
            arrow = '◀';
        }

        if (Math.abs(relAngle) > 2.5) {
            // Behind
            ax = W / 2 + (relAngle > 0 ? 100 : -100);
            ay = H - margin;
            arrow = '▼';
        }

        const el = document.createElement('div');
        el.className = 'tracker-arrow';
        el.style.left = ax + 'px';
        el.style.top = ay + 'px';
        el.style.transform = 'translate(-50%, -50%)';
        el.style.opacity = fadeAlpha;
        el.style.color = color;
        el.innerHTML = `
            <span class="arrow-num">${displayIdx + 1}</span>
            <span class="arrow-icon" style="color:${color}">${arrow}</span>
            <span class="arrow-dist" style="color:${color}">${dist}m</span>
        `;
        arrowsDiv.appendChild(el);
    });
}

function updateStuckDetection(dt) {
    for (const z of game.zombies) {
        if (!z._lastPos) {
            z._lastPos = { x: z.x, y: z.y };
            z._stuckTime = 0;
            z._checkTimer = 0;
            continue;
        }

        z._checkTimer = (z._checkTimer || 0) + dt;
        if (z._checkTimer >= 2) {
            const moved = Math.abs(z.x - z._lastPos.x) + Math.abs(z.y - z._lastPos.y);
            z._lastPos = { x: z.x, y: z.y };
            z._checkTimer = 0;

            if (moved < 10) {
                z._stuckTime = (z._stuckTime || 0) + 2;
                if (z._stuckTime >= STUCK_THRESHOLD) {
                    teleportZombieCloser(z, game.player);
                    z._stuckTime = 0;
                }
            } else {
                z._stuckTime = 0;
            }
        }
    }
}

// ============================================================
//  WEAPON SWITCHING
// ============================================================
function cycleWeapon(direction) {
    const p = game.player;
    if (p.reloading) return;
    const currentIdx = WEAPON_ORDER.indexOf(p.currentWeapon);
    let newIdx = currentIdx + direction;
    if (newIdx < 0) newIdx = WEAPON_ORDER.length - 1;
    if (newIdx >= WEAPON_ORDER.length) newIdx = 0;
    switchWeapon(WEAPON_ORDER[newIdx]);
    playSound('weapon_switch');
}

function switchWeapon(name) {
    const p = game.player;
    if (p.reloading) return;
    if (p.currentWeapon === name) return;
    p.currentWeapon = name; p.reloading = false;
    document.getElementById('reload-indicator').classList.add('hidden');
    updateHUD(); updateWaveHUD();
    const ch = document.getElementById('crosshair');
    ch.classList.toggle('knife-mode', name === 'knife');
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
    const slotMap = { pistol: '1', shotgun: '2', smg: '3', rifle: '4', knife: '5' };
    const el = document.querySelector(`.slot[data-slot="${slotMap[name]}"]`);
    if (el) el.classList.add('active');
}

function tryJump() {
    const p = game.player;
    if (!p.isGrounded) return;
    if (p.isCrouching) { p.isCrouching = false; return; }
    p.verticalVel = JUMP_FORCE; p.isGrounded = false;
    playSound('jump');
}

// ============================================================
//  WEAPON ACTIONS
// ============================================================
function fireWeapon() {
    const p = game.player; const now = performance.now();
    const wDef = WEAPONS[p.currentWeapon]; const wState = p.weapons[p.currentWeapon];
    if (p.reloading) return;
    if (now - p.lastFire < wDef.fireRate) return;
    if (wDef.isGun && wState.ammo <= 0) { playSound('empty'); if (wState.reserve > 0) reload(); return; }
    p.lastFire = now;

    if (wDef.isGun) {
        wState.ammo--; playSound(p.currentWeapon);
        const mf = document.getElementById('muzzle-flash');
        mf.classList.remove('hidden'); setTimeout(() => mf.classList.add('hidden'), 50);
        game.kickbackOffset += wDef.kickStrength;
        game.kickbackRotation += (Math.random() - 0.3) * wDef.kickStrength * 0.3;
        game.screenShake.intensity = wDef.kickStrength * 0.5;
        p.pitch += wDef.kickStrength * 2;
        canvas.classList.remove('kickback-light', 'kickback-medium', 'kickback-heavy', 'kickback-knife');
        void canvas.offsetWidth; canvas.classList.add(wDef.kickClass);
        const ch = document.getElementById('crosshair');
        ch.classList.add('spread'); setTimeout(() => ch.classList.remove('spread'), 150);
        let extraSpread = 0;
        if (!p.isGrounded) extraSpread += 0.03;
        if (p.isCrouching) extraSpread -= 0.01;
        const pellets = wDef.pellets || 1;
        for (let i = 0; i < pellets; i++) {
            const ts = wDef.spread + extraSpread;
            castBullet(p.angle + (Math.random() - 0.5) * ts * 2, p.pitch + (Math.random() - 0.5) * ts * 200, wDef.damage, wDef.range);
        }
    } else {
        playSound('knife'); game.weaponSwing = 1;
        canvas.classList.remove('kickback-knife'); void canvas.offsetWidth; canvas.classList.add('kickback-knife');
        knifeAttack(wDef.damage, wDef.range);
    }
    updateHUD();
}

function castBullet(angle, pitchOffset, damage, range) {
    const p = game.player; const cos = Math.cos(angle), sin = Math.sin(angle);
    const aimPN = (p.pitch + pitchOffset) / 300;
    for (let d = 0; d < range; d += 4) {
        const x = p.x + cos * d, y = p.y + sin * d;
        const mx = Math.floor(x / TILE), my = Math.floor(y / TILE);
        if (mx < 0 || my < 0 || mx >= MAP_SIZE || my >= MAP_SIZE || map[my][mx] === 1) { spawnParticles(x, y, '#ffcc00', 3, 2); break; }
        for (let z = game.zombies.length - 1; z >= 0; z--) {
            const zom = game.zombies[z]; const dx = x - zom.x, dy = y - zom.y;
            if (dx * dx + dy * dy < zom.radius * zom.radius) {
                if (getHitZone(p, zom, aimPN, d) === 'head') {
                    playSound('headshot'); showHeadshotMarker();
                    spawnParticles(zom.x, zom.y, '#ff0000', 20, 8); spawnParticles(zom.x, zom.y, '#ffcc00', 5, 3);
                    game.headshots++; killZombie(z);
                } else {
                    zom.health -= damage; playSound('hit'); showHitMarker();
                    spawnParticles(zom.x, zom.y, '#880000', 8, 4);
                    if (zom.health <= 0) killZombie(z);
                }
                return;
            }
        }
    }
}

function getHitZone(player, zombie, aimPitch, distance) {
    const e = aimPitch + player.verticalPos / 200 + (player.isCrouching ? -0.15 : 0);
    return e > 0.2 + Math.max(0.05, 0.25 - distance / 2000) ? 'head' : 'body';
}

function knifeAttack(damage, range) {
    const p = game.player;
    for (let z = game.zombies.length - 1; z >= 0; z--) {
        const zom = game.zombies[z]; const dx = zom.x - p.x, dy = zom.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range + zom.radius) {
            let diff = Math.atan2(dy, dx) - p.angle;
            while (diff > Math.PI) diff -= Math.PI * 2; while (diff < -Math.PI) diff += Math.PI * 2;
            if (Math.abs(diff) < 0.6) {
                if (p.pitch / 300 > 0.35) {
                    playSound('headshot'); showHeadshotMarker();
                    spawnParticles(zom.x, zom.y, '#ff0000', 20, 8); game.headshots++; killZombie(z);
                } else {
                    zom.health -= damage; playSound('hit'); showHitMarker();
                    spawnParticles(zom.x, zom.y, '#880000', 10, 5);
                    if (zom.health <= 0) killZombie(z);
                }
                break;
            }
        }
    }
}

function reload() {
    const p = game.player; const wDef = WEAPONS[p.currentWeapon]; const wState = p.weapons[p.currentWeapon];
    if (!wDef.isGun || p.reloading || wState.ammo >= wDef.magSize || wState.reserve <= 0) return;
    p.reloading = true; playSound('reload');
    document.getElementById('reload-indicator').classList.remove('hidden');
    setTimeout(() => {
        if (!game.running) return;
        const take = Math.min(wDef.magSize - wState.ammo, wState.reserve);
        wState.ammo += take; wState.reserve -= take; p.reloading = false;
        document.getElementById('reload-indicator').classList.add('hidden'); updateHUD();
    }, wDef.reloadTime);
}

function killZombie(idx) {
    const z = game.zombies[idx]; playSound('zombie_die');
    spawnParticles(z.x, z.y, '#550000', 15, 6);
    game.decals.push({ x: z.x, y: z.y, r: z.radius * 1.5, alpha: 0.7 });
    // Adjust tracker target if needed
    if (game.trackerTarget === idx) game.trackerTarget = -1;
    else if (game.trackerTarget > idx) game.trackerTarget--;
    game.zombies.splice(idx, 1);
    game.kills++; game.waveKills++; game.zombiesRemaining--;
    updateHUD(); updateWaveHUD();
}

function showHitMarker() {
    const hm = document.getElementById('hit-marker');
    hm.classList.remove('hidden'); setTimeout(() => hm.classList.add('hidden'), 150);
}

function showHeadshotMarker() {
    showHitMarker();
    const hs = document.getElementById('headshot-marker');
    hs.classList.remove('hidden', 'show'); void hs.offsetWidth; hs.classList.add('show');
    setTimeout(() => { hs.classList.add('hidden'); hs.classList.remove('show'); }, 600);
}

// ============================================================
//  ZOMBIE AI
// ============================================================
function spawnZombie() {
    let x, y; const side = Math.floor(Math.random() * 4);
    switch (side) {
        case 0: x = TILE * 2; y = TILE * (2 + Math.random() * (MAP_SIZE - 4)); break;
        case 1: x = TILE * (MAP_SIZE - 2); y = TILE * (2 + Math.random() * (MAP_SIZE - 4)); break;
        case 2: x = TILE * (2 + Math.random() * (MAP_SIZE - 4)); y = TILE * 2; break;
        case 3: x = TILE * (2 + Math.random() * (MAP_SIZE - 4)); y = TILE * (MAP_SIZE - 2); break;
    }
    const wave = game.wave; const typeRoll = Math.random();
    let type = 'normal';
    if (wave >= 3 && typeRoll < 0.2) type = 'fast';
    if (wave >= 5 && typeRoll < 0.1) type = 'tank';
    const types = {
        normal: { health: 40 + wave * 5, speed: 0.8 + wave * 0.05, damage: 10, radius: 16 },
        fast: { health: 25 + wave * 3, speed: 1.5 + wave * 0.08, damage: 8, radius: 14 },
        tank: { health: 120 + wave * 15, speed: 0.5 + wave * 0.02, damage: 20, radius: 22 },
    };
    const t = types[type];
    game.zombies.push({
        x, y, health: t.health, maxHealth: t.health, speed: t.speed,
        damage: t.damage, radius: t.radius, type, attackCooldown: 0,
        animPhase: Math.random() * Math.PI * 2,
        _lastPos: { x, y }, _stuckTime: 0, _checkTimer: 0,
    });
}

function updateZombies(dt) {
    const p = game.player;
    for (const z of game.zombies) {
        const dx = p.x - z.x, dy = p.y - z.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        z.animPhase += dt * z.speed * 5;
        if (dist > z.radius + 15) {
            let nx = z.x + Math.cos(angle) * z.speed;
            let ny = z.y + Math.sin(angle) * z.speed;
            const mx = Math.floor(nx / TILE), my = Math.floor(ny / TILE);
            if (mx >= 0 && my >= 0 && mx < MAP_SIZE && my < MAP_SIZE && map[my][mx] === 0) { z.x = nx; z.y = ny; }
            else {
                const mx2 = Math.floor(nx / TILE), my2 = Math.floor(z.y / TILE);
                if (mx2 >= 0 && mx2 < MAP_SIZE && map[my2][mx2] === 0) z.x = nx;
                else { const mx3 = Math.floor(z.x / TILE), my3 = Math.floor(ny / TILE); if (my3 >= 0 && my3 < MAP_SIZE && map[my3][mx3] === 0) z.y = ny; }
            }
            for (const other of game.zombies) {
                if (other === z) continue;
                const sdx = z.x - other.x, sdy = z.y - other.y;
                const sd = Math.sqrt(sdx * sdx + sdy * sdy);
                if (sd < z.radius + other.radius && sd > 0) { z.x += (sdx / sd) * 0.5; z.y += (sdy / sd) * 0.5; }
            }
        } else {
            const jumpDodge = p.verticalPos > 100 ? 0.3 : 1.0;
            z.attackCooldown -= dt;
            if (z.attackCooldown <= 0) { z.attackCooldown = 1; if (Math.random() < jumpDodge) damagePlayer(z.damage); }
        }
    }
}

function damagePlayer(amount) {
    const p = game.player; if (p.invincible > 0) return;
    p.health -= amount * (p.isCrouching ? 0.8 : 1.0); p.invincible = 0.3;
    playSound('hurt');
    const overlay = document.getElementById('damage-overlay');
    overlay.classList.remove('hit'); void overlay.offsetWidth; overlay.classList.add('hit');
    setTimeout(() => overlay.classList.remove('hit'), 300);
    game.screenShake.intensity = 8;
    if (p.health <= 0) { p.health = 0; gameOver(); }
    updateHUD();
}

// ============================================================
//  PARTICLES
// ============================================================
function spawnParticles(x, y, color, count, speed) {
    for (let i = 0; i < count; i++) {
        game.particles.push({
            x, y, vx: (Math.random() - 0.5) * speed * 2, vy: (Math.random() - 0.5) * speed * 2,
            life: 0.3 + Math.random() * 0.4, maxLife: 0.3 + Math.random() * 0.4, color, size: 2 + Math.random() * 3,
        });
    }
}

function updateParticles(dt) {
    for (let i = game.particles.length - 1; i >= 0; i--) {
        const p = game.particles[i]; p.x += p.vx; p.y += p.vy; p.life -= dt;
        if (p.life <= 0) game.particles.splice(i, 1);
    }
}

// ============================================================
//  RAYCASTING RENDERER
// ============================================================
const FOV = Math.PI / 3, HALF_FOV = FOV / 2, NUM_RAYS = 320, RAY_STEP = FOV / NUM_RAYS, MAX_DIST = 800;

function castRay(angle) {
    const sin = Math.sin(angle), cos = Math.cos(angle), p = game.player;
    for (let d = 0; d < MAX_DIST; d += 2) {
        const x = p.x + cos * d, y = p.y + sin * d;
        const mx = Math.floor(x / TILE), my = Math.floor(y / TILE);
        if (mx < 0 || my < 0 || mx >= MAP_SIZE || my >= MAP_SIZE) return { dist: d, side: 0 };
        if (map[my][mx] === 1) { return { dist: d, side: Math.floor((p.x + cos * (d - 2)) / TILE) !== mx ? 0 : 1 }; }
    }
    return { dist: MAX_DIST, side: 0 };
}

function renderScene() {
    const p = game.player, sx = game.screenShake.x, sy = game.screenShake.y;
    const vertOff = -p.verticalPos + p.crouchAmount * CROUCH_OFFSET;
    const tp = p.pitch + vertOff + sy;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, H / 2 + tp);
    skyGrad.addColorStop(0, '#0a0a15'); skyGrad.addColorStop(1, '#1a0505');
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, H / 2 + tp);

    const floorGrad = ctx.createLinearGradient(0, H / 2 + tp, 0, H);
    floorGrad.addColorStop(0, '#1a1a1a'); floorGrad.addColorStop(1, '#0d0d0d');
    ctx.fillStyle = floorGrad; ctx.fillRect(0, H / 2 + tp, W, H);

    const zBuffer = [], stripW = Math.ceil(W / NUM_RAYS) + 1;
    for (let i = 0; i < NUM_RAYS; i++) {
        const ra = p.angle - HALF_FOV + i * RAY_STEP, hit = castRay(ra);
        const cd = hit.dist * Math.cos(ra - p.angle); zBuffer[i] = cd;
        const wh = (TILE * H) / (cd || 1), wt = (H - wh) / 2 + tp;
        const shade = Math.max(0, 1 - cd / MAX_DIST), ss = hit.side ? 0.7 : 1;
        ctx.fillStyle = `rgb(${Math.floor(80 * shade * ss)},${Math.floor(70 * shade * ss)},${Math.floor(65 * shade * ss)})`;
        ctx.fillRect(Math.floor(i * (W / NUM_RAYS)) + sx, wt, stripW, wh);
    }

    // Zombies
    const zrl = [];
    for (const z of game.zombies) {
        const dx = z.x - p.x, dy = z.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx) - p.angle;
        while (angle > Math.PI) angle -= Math.PI * 2; while (angle < -Math.PI) angle += Math.PI * 2;
        if (Math.abs(angle) < HALF_FOV + 0.2) zrl.push({ zombie: z, dist, angle });
    }
    zrl.sort((a, b) => b.dist - a.dist);

    for (const zr of zrl) {
        const z = zr.zombie, cd = zr.dist * Math.cos(zr.angle);
        const screenX = W / 2 + (zr.angle / HALF_FOV) * (W / 2) + sx;
        const sH = (TILE * 1.2 * H) / (cd || 1), sW = sH * 0.6, sT = (H - sH) / 2 + tp;
        const ri = Math.floor((screenX / W) * NUM_RAYS);
        if (ri >= 0 && ri < NUM_RAYS && zBuffer[ri] < cd - 10) continue;
        const shade = Math.max(0.1, 1 - cd / MAX_DIST);
        const isTracked = game.zombies.indexOf(z) === game.trackerTarget;
        drawZombie(screenX, sT, sW, sH, shade, z, isTracked);
    }

    // Particles
    for (const pt of game.particles) {
        const dx = pt.x - p.x, dy = pt.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        let na = Math.atan2(dy, dx) - p.angle;
        while (na > Math.PI) na -= Math.PI * 2; while (na < -Math.PI) na += Math.PI * 2;
        if (Math.abs(na) < HALF_FOV + 0.1 && dist < MAX_DIST) {
            const psx = W / 2 + (na / HALF_FOV) * (W / 2) + sx, psy = H / 2 + tp;
            const scale = Math.max(1, pt.size * (200 / (dist || 1)));
            ctx.fillStyle = pt.color; ctx.globalAlpha = pt.life / pt.maxLife;
            ctx.fillRect(psx - scale / 2, psy - scale / 2, scale, scale); ctx.globalAlpha = 1;
        }
    }
}

function drawZombie(x, top, w, h, shade, zombie, isTracked) {
    const bob = Math.sin(zombie.animPhase) * 3, t = top + bob;
    const hp = zombie.health / zombie.maxHealth;

    // Tracked zombie highlight
    if (isTracked && game.trackerArrowsActive) {
        ctx.strokeStyle = `rgba(68, 170, 255, ${shade * (0.4 + Math.sin(Date.now() / 200) * 0.3)})`;
        ctx.lineWidth = 3;
        ctx.strokeRect(x - w * 0.5, t - 5, w, h + 10);

        // Diamond marker above
        ctx.fillStyle = `rgba(68, 170, 255, ${shade * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(x, t - 20); ctx.lineTo(x + 8, t - 12); ctx.lineTo(x, t - 4); ctx.lineTo(x - 8, t - 12);
        ctx.closePath(); ctx.fill();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath();
    ctx.ellipse(x, t + h, w * 0.4, h * 0.05, 0, 0, Math.PI * 2); ctx.fill();

    const ls = Math.sin(zombie.animPhase) * w * 0.15;
    ctx.fillStyle = sc('#2a3a1a', shade);
    ctx.fillRect(x - w * 0.2 - ls, t + h * 0.65, w * 0.18, h * 0.35);
    ctx.fillRect(x + w * 0.05 + ls, t + h * 0.65, w * 0.18, h * 0.35);

    const bc = zombie.type === 'tank' ? '#4a2020' : zombie.type === 'fast' ? '#4a4a20' : '#2a4a2a';
    ctx.fillStyle = sc(bc, shade); ctx.fillRect(x - w * 0.3, t + h * 0.25, w * 0.6, h * 0.45);

    ctx.strokeStyle = `rgba(255,100,100,${shade * 0.15})`; ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]); ctx.beginPath();
    ctx.moveTo(x - w * 0.35, t + h * 0.25); ctx.lineTo(x + w * 0.35, t + h * 0.25); ctx.stroke(); ctx.setLineDash([]);

    ctx.fillStyle = sc('#1a3a1a', shade * 0.7); ctx.fillRect(x - w * 0.25, t + h * 0.3, w * 0.15, h * 0.2);

    const as = Math.cos(zombie.animPhase) * w * 0.1;
    ctx.fillStyle = sc('#3a5a2a', shade);
    ctx.fillRect(x - w * 0.4, t + h * 0.28 + as, w * 0.12, h * 0.35);
    ctx.fillRect(x + w * 0.28, t + h * 0.28 - as, w * 0.12, h * 0.35);

    ctx.fillStyle = sc('#3a5a2a', shade); ctx.fillRect(x - w * 0.06, t + h * 0.2, w * 0.12, h * 0.08);

    ctx.fillStyle = sc('#4a6a3a', shade); ctx.beginPath(); ctx.arc(x, t + h * 0.14, w * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = sc('#5a7a4a', shade * 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, t + h * 0.14, w * 0.22, 0, Math.PI * 2); ctx.stroke();

    ctx.fillStyle = `rgba(255,${zombie.type === 'fast' ? 255 : 50},0,${shade})`; ctx.beginPath();
    ctx.arc(x - w * 0.09, t + h * 0.12, w * 0.045, 0, Math.PI * 2);
    ctx.arc(x + w * 0.09, t + h * 0.12, w * 0.045, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = sc('#220000', shade); ctx.fillRect(x - w * 0.06, t + h * 0.17, w * 0.12, w * 0.04);

    if (hp < 1) {
        const bw = w * 0.8, bh = 4, bx = x - bw / 2, by = t - 8;
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(bx, by, bw, bh);
        ctx.fillStyle = hp > 0.5 ? '#00cc00' : hp > 0.25 ? '#cccc00' : '#cc0000';
        ctx.fillRect(bx, by, bw * hp, bh);
    }

    if (zombie.type === 'tank') {
        ctx.strokeStyle = `rgba(255,0,0,${shade * 0.3})`; ctx.lineWidth = 2;
        ctx.strokeRect(x - w * 0.35, t + h * 0.2, w * 0.7, h * 0.5);
    }
}

function sc(hex, shade) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${Math.floor(r * shade)},${Math.floor(g * shade)},${Math.floor(b * shade)})`;
}

// ============================================================
//  WEAPON RENDERING
// ============================================================
function renderWeapon() {
    const p = game.player;
    const bobX = Math.sin(game.weaponBobTime) * 8, bobY = Math.abs(Math.cos(game.weaponBobTime)) * 5;
    const kickY = game.kickbackOffset * 4, kickR = game.kickbackRotation;
    const jumpSway = p.verticalVel * 0.02, crouchLower = p.crouchAmount * 20;
    ctx.save();
    ctx.translate(W / 2 + 150 + bobX, H - 120 + bobY + kickY + jumpSway + crouchLower);
    ctx.rotate(kickR * 0.02);
    if (!p.isGrounded) ctx.rotate(p.verticalVel * 0.0001);
    if (WEAPONS[p.currentWeapon].isGun) drawGun(p.currentWeapon); else drawKnife();
    ctx.restore();
}

function drawGun(type) {
    ctx.save(); if (game.weaponSwing > 0) ctx.rotate(-game.weaponSwing * 0.3);
    ctx.fillStyle = '#c4956a'; ctx.fillRect(-15, 20, 30, 45);
    ctx.fillStyle = '#b8896060'; for (let i = 0; i < 4; i++) ctx.fillRect(-12, 25 + i * 8, 8, 6);
    switch (type) {
        case 'pistol':
            ctx.fillStyle = '#333'; ctx.fillRect(-8, -55, 16, 65);
            ctx.fillStyle = '#222'; ctx.fillRect(-5, -70, 10, 20);
            ctx.fillStyle = '#111'; ctx.fillRect(-3, -73, 6, 5);
            ctx.strokeStyle = '#444'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-2, 30, 10, -0.5, Math.PI * 0.8); ctx.stroke();
            ctx.fillStyle = '#2a2a2a'; ctx.fillRect(-7, 10, 14, 15);
            for (let i = 0; i < 5; i++) { ctx.fillStyle = i % 2 ? '#333' : '#292929'; ctx.fillRect(-6, 11 + i * 3, 12, 2); } break;
        case 'shotgun':
            ctx.fillStyle = '#444'; ctx.fillRect(-10, -80, 8, 90); ctx.fillRect(2, -80, 8, 90);
            ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(-6, -80, 4.5, 0, Math.PI * 2); ctx.arc(6, -80, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#553322'; ctx.fillRect(-12, 10, 24, 50);
            ctx.strokeStyle = '#44220088'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-10, 15 + i * 7); ctx.lineTo(10, 18 + i * 7); ctx.stroke(); }
            ctx.fillStyle = '#665544'; ctx.fillRect(-12, -20, 24, 15); break;
        case 'smg':
            ctx.fillStyle = '#3a3a3a'; ctx.fillRect(-7, -60, 14, 70); ctx.fillStyle = '#222'; ctx.fillRect(-4, -75, 8, 20);
            ctx.fillStyle = '#2a2a2a'; ctx.fillRect(-5, 15, 10, 30); ctx.fillStyle = '#444'; ctx.fillRect(-8, -55, 16, 4);
            ctx.fillStyle = '#c4956a'; ctx.fillRect(-6, -15, 12, 15); break;
        case 'rifle':
            ctx.fillStyle = '#383838'; ctx.fillRect(-8, -70, 16, 80); ctx.fillStyle = '#1a1a1a'; ctx.fillRect(-4, -95, 8, 30);
            ctx.fillStyle = '#222'; ctx.fillRect(-5, -65, 10, 8); ctx.fillStyle = '#336699'; ctx.beginPath(); ctx.arc(0, -61, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#2a2a2a'; ctx.fillRect(-6, 15, 12, 35); ctx.fillStyle = '#443322'; ctx.fillRect(-10, 30, 20, 40); break;
    }
    ctx.restore();
}

function drawKnife() {
    ctx.save(); ctx.rotate(-0.3 + game.weaponSwing * 1.2);
    ctx.fillStyle = '#c4956a'; ctx.fillRect(-12, 10, 28, 40);
    ctx.fillStyle = '#b88960'; for (let i = 0; i < 4; i++) ctx.fillRect(-14, 15 + i * 8, 10, 6);
    ctx.fillStyle = '#2a2a2a'; ctx.fillRect(-5, 5, 14, 50);
    ctx.strokeStyle = '#444'; ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(-5, 10 + i * 5); ctx.lineTo(9, 13 + i * 5); ctx.stroke(); }
    ctx.fillStyle = '#555'; ctx.fillRect(-10, 3, 24, 5);
    ctx.fillStyle = '#ccc'; ctx.beginPath();
    ctx.moveTo(-3, 3); ctx.lineTo(8, 3); ctx.lineTo(5, -65); ctx.lineTo(0, -70); ctx.lineTo(-3, -60); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(5, 0); ctx.lineTo(4, -50); ctx.lineTo(1, -55); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(-3, -60); ctx.lineTo(-3, 3); ctx.stroke();
    ctx.restore();
}

// ============================================================
//  MINIMAP
// ============================================================
function renderMinimap() {
    const p = game.player, size = 150, scale = size / (MAP_SIZE * TILE) * 5;
    const ox = W - size - 15, oy = 60;
    ctx.globalAlpha = 0.6; ctx.fillStyle = '#000'; ctx.fillRect(ox, oy, size, size);
    ctx.strokeStyle = '#333'; ctx.strokeRect(ox, oy, size, size);
    const cx = ox + size / 2, cy = oy + size / 2;
    const pmx = Math.floor(p.x / TILE), pmy = Math.floor(p.y / TILE);
    for (let dy = -15; dy <= 15; dy++) for (let dx = -15; dx <= 15; dx++) {
        const mx = pmx + dx, my = pmy + dy;
        if (mx >= 0 && my >= 0 && mx < MAP_SIZE && my < MAP_SIZE && map[my][mx] === 1) {
            ctx.fillStyle = '#555'; ctx.fillRect(cx + dx * TILE * scale, cy + dy * TILE * scale, TILE * scale, TILE * scale);
        }
    }
    ctx.fillStyle = p.isCrouching ? '#ffaa00' : (p.isGrounded ? '#00ff00' : '#44aaff');
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#00ff00'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(p.angle) * 12, cy + Math.sin(p.angle) * 12); ctx.stroke();

    for (let i = 0; i < game.zombies.length; i++) {
        const z = game.zombies[i];
        const zdx = (z.x - p.x) * scale, zdy = (z.y - p.y) * scale;
        if (Math.abs(zdx) < size / 2 && Math.abs(zdy) < size / 2) {
            const isTarget = i === game.trackerTarget && game.trackerArrowsActive;
            if (isTarget) {
                // Pulsing ring for tracked target
                ctx.strokeStyle = `rgba(68,170,255,${0.5 + Math.sin(Date.now() / 150) * 0.5})`;
                ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx + zdx, cy + zdy, 6, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.fillStyle = z.type === 'tank' ? '#ff4444' : z.type === 'fast' ? '#ffff00' : '#ff0000';
            if (game.trackerArrowsActive) ctx.fillStyle = isTarget ? '#44aaff' : ctx.fillStyle;
            ctx.beginPath(); ctx.arc(cx + zdx, cy + zdy, isTarget ? 3 : 2, 0, Math.PI * 2); ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
}

// ============================================================
//  HUD UPDATES
// ============================================================
function updateHUD() {
    const p = game.player, wDef = WEAPONS[p.currentWeapon], wState = p.weapons[p.currentWeapon];
    document.getElementById('health-fill').style.width = (p.health / p.maxHealth * 100) + '%';
    document.getElementById('health-text').textContent = Math.ceil(p.health);
    document.getElementById('weapon-name').textContent = wDef.name;
    if (wDef.isGun) {
        document.getElementById('ammo-current').textContent = wState.ammo;
        document.getElementById('ammo-reserve').textContent = wState.reserve;
        document.getElementById('ammo-display').style.display = '';
    } else document.getElementById('ammo-display').style.display = 'none';
    document.getElementById('kill-count').textContent = game.kills;
}

function updateWaveHUD() {
    const total = game.waveTotal, killed = game.waveKills;
    const alive = game.zombies.length;
    const incoming = Math.max(0, game.zombiesRemaining - alive);
    document.getElementById('wave-number').textContent = game.wave;
    document.getElementById('zombies-killed-count').textContent = killed;
    document.getElementById('zombies-total-count').textContent = total;
    document.getElementById('zombies-alive-count').textContent = alive;
    document.getElementById('zombies-incoming-count').textContent = incoming;
    document.getElementById('wave-progress-fill').style.width = (total > 0 ? (killed / total) * 100 : 0) + '%';

    // Show/hide track hint based on whether zombies are alive
    const hint = document.getElementById('track-hint');
    if (alive > 0) {
        hint.style.display = '';
        hint.textContent = `[F] Track ${alive} zombie${alive !== 1 ? 's' : ''} (6-9 target)`;
    } else {
        hint.style.display = 'none';
    }
}

function updateStanceIndicator() {
    const p = game.player, si = document.getElementById('stance-indicator');
    si.classList.remove('crouching', 'jumping');
    if (!p.isGrounded) { si.textContent = '▲ AIRBORNE'; si.classList.add('jumping'); }
    else if (p.isCrouching) { si.textContent = '▼ CROUCHING'; si.classList.add('crouching'); }
    else si.textContent = '● STANDING';
}

function showWaveCompleteBanner(waveNum) {
    const banner = document.getElementById('wave-complete-banner');
    document.getElementById('wave-complete-num').textContent = waveNum;
    banner.classList.remove('hidden', 'show'); void banner.offsetWidth; banner.classList.add('show');
    setTimeout(() => { banner.classList.add('hidden'); banner.classList.remove('show'); }, 2500);
}

// ============================================================
//  WAVE MANAGEMENT
// ============================================================
function startWave() {
    const count = 5 + game.wave * 3;
    game.waveTotal = count; game.zombiesRemaining = count;
    game.waveKills = 0; game.spawnTimer = 0; game.waveCooldown = 0;
    game.trackerTarget = -1;
    updateWaveHUD();
}

function updateWaveSpawning(dt) {
    if (game.waveKills >= game.waveTotal && game.zombies.length === 0) {
        if (game.waveCooldown === 0) {
            playSound('wave_complete'); showWaveCompleteBanner(game.wave);
            game.player.health = Math.min(game.player.maxHealth, game.player.health + 20);
            game.trackerArrowsActive = false;
            document.getElementById('tracker-arrows').innerHTML = '';
            updateHUD();
        }
        game.waveCooldown += dt;
        if (game.waveCooldown >= WAVE_COOLDOWN_TIME) { game.wave++; startWave(); }
        return;
    }
    if (game.zombiesRemaining > 0 && game.zombies.length < 15 + game.wave * 2) {
        game.spawnTimer -= dt;
        if (game.spawnTimer <= 0) { spawnZombie(); game.spawnTimer = Math.max(0.3, 2 - game.wave * 0.1); }
    }
    updateWaveHUD();
}

// ============================================================
//  PLAYER MOVEMENT
// ============================================================
function updatePlayer(dt) {
    const p = game.player;
    let mx = 0, my = 0;
    if (keys['KeyW'] || keys['ArrowUp']) { mx += Math.cos(p.angle); my += Math.sin(p.angle); }
    if (keys['KeyS'] || keys['ArrowDown']) { mx -= Math.cos(p.angle); my -= Math.sin(p.angle); }
    if (keys['KeyA'] || keys['ArrowLeft']) { mx += Math.cos(p.angle - Math.PI / 2); my += Math.sin(p.angle - Math.PI / 2); }
    if (keys['KeyD'] || keys['ArrowRight']) { mx += Math.cos(p.angle + Math.PI / 2); my += Math.sin(p.angle + Math.PI / 2); }
    const speedMult = p.isCrouching ? CROUCH_SPEED_MULT : 1.0;
    if (mx !== 0 || my !== 0) {
        const len = Math.sqrt(mx * mx + my * my);
        mx = (mx / len) * p.speed * speedMult; my = (my / len) * p.speed * speedMult;
        const nx = p.x + mx, ny = p.y + my;
        let tmx = Math.floor(nx / TILE), tmy = Math.floor(p.y / TILE);
        if (tmx >= 0 && tmx < MAP_SIZE && map[tmy][tmx] === 0) p.x = nx;
        tmx = Math.floor(p.x / TILE); tmy = Math.floor(ny / TILE);
        if (tmy >= 0 && tmy < MAP_SIZE && map[tmy][tmx] === 0) p.y = ny;
        game.weaponBobTime += dt * 8 * speedMult;
    }

    if (!p.isGrounded) {
        p.verticalVel -= GRAVITY * dt; p.verticalPos += p.verticalVel * dt;
        if (p.verticalPos <= 0) {
            p.verticalPos = 0; p.verticalVel = 0; p.isGrounded = true;
            if (!p.wasGrounded) { playSound('land'); game.screenShake.intensity = 3; }
        }
    }
    p.wasGrounded = p.isGrounded;

    const wantCrouch = keys['KeyC'] || keys['ControlLeft'] || keys['ControlRight'];
    if (wantCrouch && p.isGrounded) p.isCrouching = true; else if (!wantCrouch) p.isCrouching = false;
    p.crouchAmount += ((p.isCrouching ? 1 : 0) - p.crouchAmount) * 0.15;

    if (mouseDown && game.running && !game.paused && !game.trackerOpen && WEAPONS[p.currentWeapon].auto) fireWeapon();
    if (p.invincible > 0) p.invincible -= dt;

    game.kickbackOffset *= (1 - WEAPONS[p.currentWeapon].kickRecovery * 2);
    if (game.kickbackOffset < 0.01) game.kickbackOffset = 0;
    game.kickbackRotation *= 0.9; if (Math.abs(game.kickbackRotation) < 0.01) game.kickbackRotation = 0;
    p.pitch *= 0.95;
    game.weaponSwing *= 0.85; if (game.weaponSwing < 0.01) game.weaponSwing = 0;

    if (game.screenShake.intensity > 0) {
        game.screenShake.x = (Math.random() - 0.5) * game.screenShake.intensity;
        game.screenShake.y = (Math.random() - 0.5) * game.screenShake.intensity;
        game.screenShake.intensity *= 0.85;
        if (game.screenShake.intensity < 0.1) { game.screenShake.intensity = 0; game.screenShake.x = 0; game.screenShake.y = 0; }
    }
    updateStanceIndicator();
}

// ============================================================
//  GAME LOOP
// ============================================================
function gameLoop(timestamp) {
    if (!game.running) return;
    if (game.paused) { requestAnimationFrame(gameLoop); return; }
    const dt = Math.min((timestamp - game.lastTime) / 1000, 0.05);
    game.lastTime = timestamp;

    updatePlayer(dt);
    if (!game.trackerOpen) {
        updateZombies(dt);
        updateParticles(dt);
        updateWaveSpawning(dt);
        updateStuckDetection(dt);
    }

    ctx.clearRect(0, 0, W, H);
    renderScene();
    renderWeapon();
    renderMinimap();
    updateTrackerArrows();

    const vig = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.7);
    vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(gameLoop);
}

// ============================================================
//  GAME MANAGEMENT
// ============================================================
function startGame(weapon) {
    generateMap(); game.player = createPlayer(weapon);
    game.zombies = []; game.particles = []; game.bloodSplats = []; game.decals = [];
    game.wave = 1; game.kills = 0; game.headshots = 0;
    game.waveKills = 0; game.waveTotal = 0; game.waveCooldown = 0;
    game.kickbackOffset = 0; game.kickbackRotation = 0;
    game.weaponSwing = 0; game.weaponBobTime = 0;
    game.screenShake = { x: 0, y: 0, intensity: 0 };
    game.trackerOpen = false; game.trackerArrowsActive = false; game.trackerTarget = -1;
    game.running = true; game.paused = false; game.lastTime = performance.now();

    startWave(); switchWeapon(weapon); updateHUD(); updateWaveHUD();

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('wave-complete-banner').classList.add('hidden');
    document.getElementById('tracker-overlay').classList.add('hidden');
    document.getElementById('tracker-arrows').innerHTML = '';

    canvas.requestPointerLock(); audioCtx.resume();
    requestAnimationFrame(gameLoop);
}

function gameOver() {
    game.running = false; document.exitPointerLock();
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('gameover-screen').classList.remove('hidden');
    document.getElementById('final-kills').textContent = game.kills;
    document.getElementById('final-headshots').textContent = game.headshots;
    document.getElementById('final-wave').textContent = game.wave;
}

function togglePause() {
    game.paused = !game.paused;
    if (game.paused) {
        document.exitPointerLock();
        document.getElementById('pause-screen').classList.remove('hidden');
    } else {
        canvas.requestPointerLock();
        document.getElementById('pause-screen').classList.add('hidden');
        game.lastTime = performance.now();
    }
}

// ============================================================
//  EVENT LISTENERS
// ============================================================
let selectedWeapon = 'pistol';
document.querySelectorAll('.weapon-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.weapon-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected'); selectedWeapon = card.dataset.weapon;
    });
});

document.getElementById('start-btn').addEventListener('click', () => startGame(selectedWeapon));
document.getElementById('restart-btn').addEventListener('click', () => startGame(selectedWeapon));
document.getElementById('resume-btn').addEventListener('click', () => togglePause());
document.getElementById('quit-btn').addEventListener('click', () => {
    game.running = false; document.exitPointerLock();
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('start-screen').style.display = 'flex';
});
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('click', () => { if (game.running && !game.paused && !game.trackerOpen) canvas.requestPointerLock(); });