// ============================================================
//  ZOMBIE OUTBREAK — First-Person Zombie Shooter
//  With vertical movement, headshots, wave tracker,
//  Q/E weapon switching, F key zombie tracker + unstuck system
//  REALISTIC FIRST-PERSON WEAPON MODELS
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
    trackerOpen: false, trackerArrowsActive: false, trackerArrowsTimer: 0, trackerTarget: -1,
};

const MAP_SIZE = 40; const TILE = 64; const map = [];
const GRAVITY = 800; const JUMP_FORCE = 350;
const CROUCH_OFFSET = 80; const CROUCH_SPEED_MULT = 0.5;
const WAVE_COOLDOWN_TIME = 3;
const TRACKER_ARROW_DURATION = 8;
const STUCK_THRESHOLD = 5;
const STUCK_TELEPORT_DIST = 200;

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
        lastFire: 0, reloading: false, invincible: 0,
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
        if (e.code === 'Digit6') targetZombieByIndex(0);
        if (e.code === 'Digit7') targetZombieByIndex(1);
        if (e.code === 'Digit8') targetZombieByIndex(2);
        if (e.code === 'Digit9') targetZombieByIndex(3);
    }
    if (e.code === 'Escape') {
        if (game.trackerOpen) closeTracker();
        else if (game.running) togglePause();
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
//  TRACKER SYSTEM
// ============================================================
function toggleTracker() { if (game.trackerOpen) closeTracker(); else openTracker(); }

function openTracker() {
    if (game.zombies.length === 0) return;
    game.trackerOpen = true; game.trackerArrowsActive = true; game.trackerArrowsTimer = TRACKER_ARROW_DURATION;
    playSound('tracker_ping'); showTrackerPing(); unstuckZombies(); buildTrackerList();
    document.getElementById('tracker-overlay').classList.remove('hidden');
    document.exitPointerLock();
}

function closeTracker() {
    game.trackerOpen = false;
    document.getElementById('tracker-overlay').classList.add('hidden');
    if (game.running && !game.paused) canvas.requestPointerLock();
}

function showTrackerPing() {
    const ping = document.getElementById('tracker-ping');
    ping.classList.remove('hidden', 'show'); void ping.offsetWidth; ping.classList.add('show');
    setTimeout(() => { ping.classList.add('hidden'); ping.classList.remove('show'); }, 1000);
}

function buildTrackerList() {
    const p = game.player, list = document.getElementById('tracker-list');
    list.innerHTML = '';
    const sorted = game.zombies.map((z, i) => {
        const dx = z.x - p.x, dy = z.y - p.y;
        return { zombie: z, index: i, dist: Math.sqrt(dx * dx + dy * dy), angle: Math.atan2(dy, dx) };
    }).sort((a, b) => a.dist - b.dist);

    sorted.forEach((zd, di) => {
        const z = zd.zombie, dist = Math.round(zd.dist / TILE), hp = z.health / z.maxHealth;
        const dir = getDirectionArrow(p.angle, zd.angle), cardinal = getCardinalDir(p.angle, zd.angle);
        const entry = document.createElement('div');
        entry.className = 'tracker-entry';
        entry.innerHTML = `<span class="tracker-num">${di + 1}</span><span class="tracker-type ${z.type}">${z.type.toUpperCase()}</span><div class="tracker-hp-bar"><div class="tracker-hp-fill" style="width:${hp * 100}%;background:${hp > 0.5 ? '#00cc00' : hp > 0.25 ? '#cccc00' : '#cc0000'}"></div></div><span class="tracker-info">${cardinal} · ${dist} tiles</span><span class="tracker-dist">${dist}m</span><span class="tracker-dir">${dir}</span>`;
        entry.addEventListener('click', () => { game.trackerTarget = zd.index; closeTracker(); game.player.angle = zd.angle; });
        list.appendChild(entry);
    });
    if (sorted.length === 0) list.innerHTML = '<div style="text-align:center;color:#888;padding:20px;">No zombies found!</div>';
}

function getDirectionArrow(pa, za) {
    let d = za - pa; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
    if (Math.abs(d) < 0.4) return '⬆'; if (Math.abs(d) > 2.7) return '⬇'; return d > 0 ? '➡' : '⬅';
}

function getCardinalDir(pa, za) {
    let d = (za - pa) * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360;
    if (d > -22.5 && d <= 22.5) return 'AHEAD'; if (d > 22.5 && d <= 67.5) return 'FRONT-R';
    if (d > 67.5 && d <= 112.5) return 'RIGHT'; if (d > 112.5 && d <= 157.5) return 'BACK-R';
    if (d > -67.5 && d <= -22.5) return 'FRONT-L'; if (d > -112.5 && d <= -67.5) return 'LEFT';
    if (d > -157.5 && d <= -112.5) return 'BACK-L'; return 'BEHIND';
}

function targetZombieByIndex(di) {
    if (game.zombies.length === 0) return;
    const p = game.player;
    const sorted = game.zombies.map((z, i) => ({ index: i, dist: Math.sqrt((z.x - p.x) ** 2 + (z.y - p.y) ** 2), angle: Math.atan2(z.y - p.y, z.x - p.x) })).sort((a, b) => a.dist - b.dist);
    if (di < sorted.length) {
        game.trackerTarget = sorted[di].index; game.player.angle = sorted[di].angle;
        game.trackerArrowsActive = true; game.trackerArrowsTimer = TRACKER_ARROW_DURATION;
        playSound('tracker_ping'); showTrackerPing();
        if (game.trackerOpen) closeTracker();
    }
}

function unstuckZombies() {
    for (const z of game.zombies) {
        if (!z._lastPos) { z._lastPos = { x: z.x, y: z.y }; z._stuckTime = 0; continue; }
        if (Math.abs(z.x - z._lastPos.x) + Math.abs(z.y - z._lastPos.y) < 5) teleportZombieCloser(z, game.player);
    }
}

function teleportZombieCloser(zombie, player) {
    const dx = player.x - zombie.x, dy = player.y - zombie.y;
    const dist = Math.sqrt(dx * dx + dy * dy), angle = Math.atan2(dy, dx);
    for (let td = dist - STUCK_TELEPORT_DIST; td > 100; td -= 50) {
        const tx = zombie.x + Math.cos(angle) * (dist - td), ty = zombie.y + Math.sin(angle) * (dist - td);
        const mx = Math.floor(tx / TILE), my = Math.floor(ty / TILE);
        if (mx > 0 && my > 0 && mx < MAP_SIZE - 1 && my < MAP_SIZE - 1 && map[my][mx] === 0 && map[my - 1][mx] === 0 && map[my + 1][mx] === 0 && map[my][mx - 1] === 0 && map[my][mx + 1] === 0) {
            zombie.x = tx; zombie.y = ty; spawnParticles(tx, ty, '#44aaff', 8, 3); return;
        }
    }
    for (let a = 0; a < 20; a++) {
        const ra = Math.random() * Math.PI * 2, rd = 150 + Math.random() * 200;
        const tx = player.x + Math.cos(ra) * rd, ty = player.y + Math.sin(ra) * rd;
        const mx = Math.floor(tx / TILE), my = Math.floor(ty / TILE);
        if (mx > 0 && my > 0 && mx < MAP_SIZE - 1 && my < MAP_SIZE - 1 && map[my][mx] === 0) {
            zombie.x = tx; zombie.y = ty; spawnParticles(tx, ty, '#44aaff', 8, 3); return;
        }
    }
}

function updateTrackerArrows() {
    const ad = document.getElementById('tracker-arrows'); ad.innerHTML = '';
    if (!game.trackerArrowsActive || game.zombies.length === 0) return;
    game.trackerArrowsTimer -= 1 / 60;
    if (game.trackerArrowsTimer <= 0) { game.trackerArrowsActive = false; return; }
    const p = game.player, fa = Math.min(1, game.trackerArrowsTimer / 2);
    const sorted = game.zombies.map((z, i) => ({ zombie: z, index: i, dist: Math.sqrt((z.x - p.x) ** 2 + (z.y - p.y) ** 2), angle: Math.atan2(z.y - p.y, z.x - p.x) })).sort((a, b) => a.dist - b.dist);
    sorted.forEach((zd, di) => {
        let ra = zd.angle - p.angle;
        while (ra > Math.PI) ra -= Math.PI * 2; while (ra < -Math.PI) ra += Math.PI * 2;
        if (Math.abs(ra) < 0.4) return;
        const dist = Math.round(zd.dist / TILE), isT = zd.index === game.trackerTarget, color = isT ? '#ff4444' : '#44aaff';
        let ax, ay, arrow, margin = 60;
        if (Math.abs(ra) > 2.5) { ax = W / 2 + (ra > 0 ? 100 : -100); ay = H - margin; arrow = '▼'; }
        else if (ra > 0) { ax = W - margin; ay = Math.max(margin, Math.min(H - margin, H / 2 + Math.tan(Math.min(ra, 1.2)) * (H / 3))); arrow = '▶'; }
        else { ax = margin; ay = Math.max(margin, Math.min(H - margin, H / 2 + Math.tan(Math.max(ra, -1.2)) * (H / 3))); arrow = '◀'; }
        const el = document.createElement('div');
        el.className = 'tracker-arrow';
        el.style.cssText = `left:${ax}px;top:${ay}px;transform:translate(-50%,-50%);opacity:${fa};color:${color}`;
        el.innerHTML = `<span class="arrow-num">${di + 1}</span><span class="arrow-icon" style="color:${color}">${arrow}</span><span class="arrow-dist" style="color:${color}">${dist}m</span>`;
        ad.appendChild(el);
    });
}

function updateStuckDetection(dt) {
    for (const z of game.zombies) {
        if (!z._lastPos) { z._lastPos = { x: z.x, y: z.y }; z._stuckTime = 0; z._checkTimer = 0; continue; }
        z._checkTimer = (z._checkTimer || 0) + dt;
        if (z._checkTimer >= 2) {
            const moved = Math.abs(z.x - z._lastPos.x) + Math.abs(z.y - z._lastPos.y);
            z._lastPos = { x: z.x, y: z.y }; z._checkTimer = 0;
            if (moved < 10) { z._stuckTime = (z._stuckTime || 0) + 2; if (z._stuckTime >= STUCK_THRESHOLD) { teleportZombieCloser(z, game.player); z._stuckTime = 0; } }
            else z._stuckTime = 0;
        }
    }
}

// ============================================================
//  WEAPON SWITCHING
// ============================================================
function cycleWeapon(dir) {
    const p = game.player; if (p.reloading) return;
    let idx = WEAPON_ORDER.indexOf(p.currentWeapon) + dir;
    if (idx < 0) idx = WEAPON_ORDER.length - 1; if (idx >= WEAPON_ORDER.length) idx = 0;
    switchWeapon(WEAPON_ORDER[idx]); playSound('weapon_switch');
}

function switchWeapon(name) {
    const p = game.player; if (p.reloading || p.currentWeapon === name) return;
    p.currentWeapon = name; p.reloading = false;
    document.getElementById('reload-indicator').classList.add('hidden');
    updateHUD(); updateWaveHUD();
    document.getElementById('crosshair').classList.toggle('knife-mode', name === 'knife');
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
    const m = { pistol: '1', shotgun: '2', smg: '3', rifle: '4', knife: '5' };
    const el = document.querySelector(`.slot[data-slot="${m[name]}"]`);
    if (el) el.classList.add('active');
}

function tryJump() {
    const p = game.player; if (!p.isGrounded) return;
    if (p.isCrouching) { p.isCrouching = false; return; }
    p.verticalVel = JUMP_FORCE; p.isGrounded = false; playSound('jump');
}

// ============================================================
//  WEAPON ACTIONS
// ============================================================
function fireWeapon() {
    const p = game.player, now = performance.now(), wDef = WEAPONS[p.currentWeapon], wState = p.weapons[p.currentWeapon];
    if (p.reloading || now - p.lastFire < wDef.fireRate) return;
    if (wDef.isGun && wState.ammo <= 0) { playSound('empty'); if (wState.reserve > 0) reload(); return; }
    p.lastFire = now;
    if (wDef.isGun) {
        wState.ammo--; playSound(p.currentWeapon);
        document.getElementById('muzzle-flash').classList.remove('hidden');
        setTimeout(() => document.getElementById('muzzle-flash').classList.add('hidden'), 50);
        game.kickbackOffset += wDef.kickStrength;
        game.kickbackRotation += (Math.random() - 0.3) * wDef.kickStrength * 0.3;
        game.screenShake.intensity = wDef.kickStrength * 0.5;
        p.pitch += wDef.kickStrength * 2;
        canvas.classList.remove('kickback-light', 'kickback-medium', 'kickback-heavy', 'kickback-knife');
        void canvas.offsetWidth; canvas.classList.add(wDef.kickClass);
        document.getElementById('crosshair').classList.add('spread');
        setTimeout(() => document.getElementById('crosshair').classList.remove('spread'), 150);
        let es = 0; if (!p.isGrounded) es += 0.03; if (p.isCrouching) es -= 0.01;
        for (let i = 0; i < (wDef.pellets || 1); i++) {
            const ts = wDef.spread + es;
            castBullet(p.angle + (Math.random() - 0.5) * ts * 2, p.pitch + (Math.random() - 0.5) * ts * 200, wDef.damage, wDef.range);
        }
    } else {
        playSound('knife'); game.weaponSwing = 1;
        canvas.classList.remove('kickback-knife'); void canvas.offsetWidth; canvas.classList.add('kickback-knife');
        knifeAttack(wDef.damage, wDef.range);
    }
    updateHUD();
}

function castBullet(angle, po, damage, range) {
    const p = game.player, cos = Math.cos(angle), sin = Math.sin(angle), apn = (p.pitch + po) / 300;
    for (let d = 0; d < range; d += 4) {
        const x = p.x + cos * d, y = p.y + sin * d, mx = Math.floor(x / TILE), my = Math.floor(y / TILE);
        if (mx < 0 || my < 0 || mx >= MAP_SIZE || my >= MAP_SIZE || map[my][mx] === 1) { spawnParticles(x, y, '#ffcc00', 3, 2); break; }
        for (let z = game.zombies.length - 1; z >= 0; z--) {
            const zom = game.zombies[z], dx = x - zom.x, dy = y - zom.y;
            if (dx * dx + dy * dy < zom.radius * zom.radius) {
                if (getHitZone(p, apn, d) === 'head') {
                    playSound('headshot'); showHeadshotMarker(); spawnParticles(zom.x, zom.y, '#ff0000', 20, 8);
                    spawnParticles(zom.x, zom.y, '#ffcc00', 5, 3); game.headshots++; killZombie(z);
                } else {
                    zom.health -= damage; playSound('hit'); showHitMarker(); spawnParticles(zom.x, zom.y, '#880000', 8, 4);
                    if (zom.health <= 0) killZombie(z);
                }
                return;
            }
        }
    }
}

function getHitZone(p, apn, d) {
    return apn + p.verticalPos / 200 + (p.isCrouching ? -0.15 : 0) > 0.2 + Math.max(0.05, 0.25 - d / 2000) ? 'head' : 'body';
}

function knifeAttack(damage, range) {
    const p = game.player;
    for (let z = game.zombies.length - 1; z >= 0; z--) {
        const zom = game.zombies[z], dx = zom.x - p.x, dy = zom.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range + zom.radius) {
            let diff = Math.atan2(dy, dx) - p.angle;
            while (diff > Math.PI) diff -= Math.PI * 2; while (diff < -Math.PI) diff += Math.PI * 2;
            if (Math.abs(diff) < 0.6) {
                if (p.pitch / 300 > 0.35) { playSound('headshot'); showHeadshotMarker(); spawnParticles(zom.x, zom.y, '#ff0000', 20, 8); game.headshots++; killZombie(z); }
                else { zom.health -= damage; playSound('hit'); showHitMarker(); spawnParticles(zom.x, zom.y, '#880000', 10, 5); if (zom.health <= 0) killZombie(z); }
                break;
            }
        }
    }
}

function reload() {
    const p = game.player, wDef = WEAPONS[p.currentWeapon], wState = p.weapons[p.currentWeapon];
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
    playSound('zombie_die'); const z = game.zombies[idx];
    spawnParticles(z.x, z.y, '#550000', 15, 6);
    game.decals.push({ x: z.x, y: z.y, r: z.radius * 1.5, alpha: 0.7 });
    if (game.trackerTarget === idx) game.trackerTarget = -1;
    else if (game.trackerTarget > idx) game.trackerTarget--;
    game.zombies.splice(idx, 1); game.kills++; game.waveKills++; game.zombiesRemaining--;
    updateHUD(); updateWaveHUD();
}

function showHitMarker() { const h = document.getElementById('hit-marker'); h.classList.remove('hidden'); setTimeout(() => h.classList.add('hidden'), 150); }
function showHeadshotMarker() {
    showHitMarker(); const h = document.getElementById('headshot-marker');
    h.classList.remove('hidden', 'show'); void h.offsetWidth; h.classList.add('show');
    setTimeout(() => { h.classList.add('hidden'); h.classList.remove('show'); }, 600);
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
    const wave = game.wave, tr = Math.random(); let type = 'normal';
    if (wave >= 3 && tr < 0.2) type = 'fast'; if (wave >= 5 && tr < 0.1) type = 'tank';
    const types = {
        normal: { health: 40 + wave * 5, speed: 0.8 + wave * 0.05, damage: 10, radius: 16 },
        fast: { health: 25 + wave * 3, speed: 1.5 + wave * 0.08, damage: 8, radius: 14 },
        tank: { health: 120 + wave * 15, speed: 0.5 + wave * 0.02, damage: 20, radius: 22 },
    };
    const t = types[type];
    game.zombies.push({ x, y, health: t.health, maxHealth: t.health, speed: t.speed, damage: t.damage, radius: t.radius, type, attackCooldown: 0, animPhase: Math.random() * Math.PI * 2, _lastPos: { x, y }, _stuckTime: 0, _checkTimer: 0 });
}

function updateZombies(dt) {
    const p = game.player;
    for (const z of game.zombies) {
        const dx = p.x - z.x, dy = p.y - z.y, dist = Math.sqrt(dx * dx + dy * dy), angle = Math.atan2(dy, dx);
        z.animPhase += dt * z.speed * 5;
        if (dist > z.radius + 15) {
            let nx = z.x + Math.cos(angle) * z.speed, ny = z.y + Math.sin(angle) * z.speed;
            const mx = Math.floor(nx / TILE), my = Math.floor(ny / TILE);
            if (mx >= 0 && my >= 0 && mx < MAP_SIZE && my < MAP_SIZE && map[my][mx] === 0) { z.x = nx; z.y = ny; }
            else { const mx2 = Math.floor(nx / TILE), my2 = Math.floor(z.y / TILE); if (mx2 >= 0 && mx2 < MAP_SIZE && map[my2][mx2] === 0) z.x = nx; else { const mx3 = Math.floor(z.x / TILE), my3 = Math.floor(ny / TILE); if (my3 >= 0 && my3 < MAP_SIZE && map[my3][mx3] === 0) z.y = ny; } }
            for (const o of game.zombies) { if (o === z) continue; const sx = z.x - o.x, sy = z.y - o.y, sd = Math.sqrt(sx * sx + sy * sy); if (sd < z.radius + o.radius && sd > 0) { z.x += (sx / sd) * 0.5; z.y += (sy / sd) * 0.5; } }
        } else {
            z.attackCooldown -= dt;
            if (z.attackCooldown <= 0) { z.attackCooldown = 1; if (Math.random() < (p.verticalPos > 100 ? 0.3 : 1)) damagePlayer(z.damage); }
        }
    }
}

function damagePlayer(amt) {
    const p = game.player; if (p.invincible > 0) return;
    p.health -= amt * (p.isCrouching ? 0.8 : 1); p.invincible = 0.3; playSound('hurt');
    const o = document.getElementById('damage-overlay'); o.classList.remove('hit'); void o.offsetWidth; o.classList.add('hit');
    setTimeout(() => o.classList.remove('hit'), 300); game.screenShake.intensity = 8;
    if (p.health <= 0) { p.health = 0; gameOver(); } updateHUD();
}

// ============================================================
//  PARTICLES
// ============================================================
function spawnParticles(x, y, color, count, speed) {
    for (let i = 0; i < count; i++) game.particles.push({ x, y, vx: (Math.random() - 0.5) * speed * 2, vy: (Math.random() - 0.5) * speed * 2, life: 0.3 + Math.random() * 0.4, maxLife: 0.3 + Math.random() * 0.4, color, size: 2 + Math.random() * 3 });
}
function updateParticles(dt) { for (let i = game.particles.length - 1; i >= 0; i--) { const p = game.particles[i]; p.x += p.vx; p.y += p.vy; p.life -= dt; if (p.life <= 0) game.particles.splice(i, 1); } }

// ============================================================
//  RAYCASTING RENDERER
// ============================================================
const FOV = Math.PI / 3, HALF_FOV = FOV / 2, NUM_RAYS = 320, RAY_STEP = FOV / NUM_RAYS, MAX_DIST = 800;

function castRay(angle) {
    const s = Math.sin(angle), c = Math.cos(angle), p = game.player;
    for (let d = 0; d < MAX_DIST; d += 2) {
        const x = p.x + c * d, y = p.y + s * d, mx = Math.floor(x / TILE), my = Math.floor(y / TILE);
        if (mx < 0 || my < 0 || mx >= MAP_SIZE || my >= MAP_SIZE) return { dist: d, side: 0 };
        if (map[my][mx] === 1) return { dist: d, side: Math.floor((p.x + c * (d - 2)) / TILE) !== mx ? 0 : 1 };
    }
    return { dist: MAX_DIST, side: 0 };
}

function renderScene() {
    const p = game.player, sx = game.screenShake.x, sy = game.screenShake.y;
    const vo = -p.verticalPos + p.crouchAmount * CROUCH_OFFSET, tp = p.pitch + vo + sy;
    const sg = ctx.createLinearGradient(0, 0, 0, H / 2 + tp); sg.addColorStop(0, '#0a0a15'); sg.addColorStop(1, '#1a0505'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H / 2 + tp);
    const fg = ctx.createLinearGradient(0, H / 2 + tp, 0, H); fg.addColorStop(0, '#1a1a1a'); fg.addColorStop(1, '#0d0d0d'); ctx.fillStyle = fg; ctx.fillRect(0, H / 2 + tp, W, H);
    const zBuf = [], sw = Math.ceil(W / NUM_RAYS) + 1;
    for (let i = 0; i < NUM_RAYS; i++) {
        const ra = p.angle - HALF_FOV + i * RAY_STEP, hit = castRay(ra), cd = hit.dist * Math.cos(ra - p.angle); zBuf[i] = cd;
        const wh = (TILE * H) / (cd || 1), wt = (H - wh) / 2 + tp, shade = Math.max(0, 1 - cd / MAX_DIST), ss = hit.side ? 0.7 : 1;
        ctx.fillStyle = `rgb(${Math.floor(80 * shade * ss)},${Math.floor(70 * shade * ss)},${Math.floor(65 * shade * ss)})`; ctx.fillRect(Math.floor(i * (W / NUM_RAYS)) + sx, wt, sw, wh);
    }
    const zrl = [];
    for (const z of game.zombies) { const dx = z.x - p.x, dy = z.y - p.y, dist = Math.sqrt(dx * dx + dy * dy); let a = Math.atan2(dy, dx) - p.angle; while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; if (Math.abs(a) < HALF_FOV + 0.2) zrl.push({ zombie: z, dist, angle: a }); }
    zrl.sort((a, b) => b.dist - a.dist);
    for (const zr of zrl) {
        const z = zr.zombie, cd = zr.dist * Math.cos(zr.angle), screenX = W / 2 + (zr.angle / HALF_FOV) * (W / 2) + sx;
        const sH = (TILE * 1.2 * H) / (cd || 1), sW = sH * 0.6, sT = (H - sH) / 2 + tp;
        const ri = Math.floor((screenX / W) * NUM_RAYS); if (ri >= 0 && ri < NUM_RAYS && zBuf[ri] < cd - 10) continue;
        drawZombie(screenX, sT, sW, sH, Math.max(0.1, 1 - cd / MAX_DIST), z, game.zombies.indexOf(z) === game.trackerTarget);
    }
    for (const pt of game.particles) {
        const dx = pt.x - p.x, dy = pt.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        let na = Math.atan2(dy, dx) - p.angle; while (na > Math.PI) na -= Math.PI * 2; while (na < -Math.PI) na += Math.PI * 2;
        if (Math.abs(na) < HALF_FOV + 0.1 && dist < MAX_DIST) { const psx = W / 2 + (na / HALF_FOV) * (W / 2) + sx, psy = H / 2 + tp, scale = Math.max(1, pt.size * (200 / (dist || 1))); ctx.fillStyle = pt.color; ctx.globalAlpha = pt.life / pt.maxLife; ctx.fillRect(psx - scale / 2, psy - scale / 2, scale, scale); ctx.globalAlpha = 1; }
    }
}

function drawZombie(x, top, w, h, shade, zombie, isTracked) {
    const bob = Math.sin(zombie.animPhase) * 3, t = top + bob, hp = zombie.health / zombie.maxHealth;
    if (isTracked && game.trackerArrowsActive) {
        ctx.strokeStyle = `rgba(68,170,255,${shade * (0.4 + Math.sin(Date.now() / 200) * 0.3)})`; ctx.lineWidth = 3;
        ctx.strokeRect(x - w * 0.5, t - 5, w, h + 10);
        ctx.fillStyle = `rgba(68,170,255,${shade * 0.8})`; ctx.beginPath();
        ctx.moveTo(x, t - 20); ctx.lineTo(x + 8, t - 12); ctx.lineTo(x, t - 4); ctx.lineTo(x - 8, t - 12); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(x, t + h, w * 0.4, h * 0.05, 0, 0, Math.PI * 2); ctx.fill();
    const ls = Math.sin(zombie.animPhase) * w * 0.15;
    ctx.fillStyle = sc('#2a3a1a', shade); ctx.fillRect(x - w * 0.2 - ls, t + h * 0.65, w * 0.18, h * 0.35); ctx.fillRect(x + w * 0.05 + ls, t + h * 0.65, w * 0.18, h * 0.35);
    const bc = zombie.type === 'tank' ? '#4a2020' : zombie.type === 'fast' ? '#4a4a20' : '#2a4a2a';
    ctx.fillStyle = sc(bc, shade); ctx.fillRect(x - w * 0.3, t + h * 0.25, w * 0.6, h * 0.45);
    ctx.strokeStyle = `rgba(255,100,100,${shade * 0.15})`; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(x - w * 0.35, t + h * 0.25); ctx.lineTo(x + w * 0.35, t + h * 0.25); ctx.stroke(); ctx.setLineDash([]);
    const as = Math.cos(zombie.animPhase) * w * 0.1;
    ctx.fillStyle = sc('#3a5a2a', shade); ctx.fillRect(x - w * 0.4, t + h * 0.28 + as, w * 0.12, h * 0.35); ctx.fillRect(x + w * 0.28, t + h * 0.28 - as, w * 0.12, h * 0.35);
    ctx.fillStyle = sc('#3a5a2a', shade); ctx.fillRect(x - w * 0.06, t + h * 0.2, w * 0.12, h * 0.08);
    ctx.fillStyle = sc('#4a6a3a', shade); ctx.beginPath(); ctx.arc(x, t + h * 0.14, w * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = sc('#5a7a4a', shade * 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, t + h * 0.14, w * 0.22, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(255,${zombie.type === 'fast' ? 255 : 50},0,${shade})`; ctx.beginPath(); ctx.arc(x - w * 0.09, t + h * 0.12, w * 0.045, 0, Math.PI * 2); ctx.arc(x + w * 0.09, t + h * 0.12, w * 0.045, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = sc('#220000', shade); ctx.fillRect(x - w * 0.06, t + h * 0.17, w * 0.12, w * 0.04);
    if (hp < 1) { const bw = w * 0.8, bx = x - bw / 2, by = t - 8; ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(bx, by, bw, 4); ctx.fillStyle = hp > 0.5 ? '#00cc00' : hp > 0.25 ? '#cccc00' : '#cc0000'; ctx.fillRect(bx, by, bw * hp, 4); }
    if (zombie.type === 'tank') { ctx.strokeStyle = `rgba(255,0,0,${shade * 0.3})`; ctx.lineWidth = 2; ctx.strokeRect(x - w * 0.35, t + h * 0.2, w * 0.7, h * 0.5); }
}

function sc(hex, shade) { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return `rgb(${Math.floor(r * shade)},${Math.floor(g * shade)},${Math.floor(b * shade)})`; }

// ============================================================
//  REALISTIC FIRST-PERSON WEAPON RENDERING
// ============================================================

// Helper: draw a rounded rectangle
function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// Helper: draw a realistic hand with wrist, palm, and fingers
function drawHand(x, y, gripWidth, gripAngle, side) {
    // side: 1 = right hand (trigger hand), -1 = left hand (support)
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(gripAngle);

    const skinBase = '#c49a6c';
    const skinDark = '#a67c52';
    const skinLight = '#d4a87a';
    const nailColor = '#dbb99a';

    // Wrist / forearm
    ctx.fillStyle = skinBase;
    roundRect(-gripWidth / 2 - 4, 15, gripWidth + 8, 55, 8);
    ctx.fill();

    // Wrist shadow
    ctx.fillStyle = skinDark;
    roundRect(-gripWidth / 2 - 2, 50, gripWidth + 4, 12, 4);
    ctx.fill();

    // Sleeve hint
    ctx.fillStyle = '#2a2a2a';
    roundRect(-gripWidth / 2 - 6, 55, gripWidth + 12, 20, 5);
    ctx.fill();
    ctx.fillStyle = '#333';
    roundRect(-gripWidth / 2 - 5, 58, gripWidth + 10, 15, 4);
    ctx.fill();

    // Palm
    ctx.fillStyle = skinBase;
    roundRect(-gripWidth / 2, 0, gripWidth, 22, 5);
    ctx.fill();

    // Palm highlight
    ctx.fillStyle = skinLight;
    ctx.globalAlpha = 0.3;
    roundRect(-gripWidth / 2 + 2, 2, gripWidth - 4, 8, 3);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Fingers wrapping around grip
    for (let i = 0; i < 4; i++) {
        const fy = -5 - i * 9;
        const fw = gripWidth * 0.28;
        const fh = 8;
        const fx = -gripWidth / 2 - fw + 3;

        // Finger
        ctx.fillStyle = i % 2 === 0 ? skinBase : skinDark;
        roundRect(fx, fy, fw + gripWidth + 2, fh, 4);
        ctx.fill();

        // Knuckle highlights
        ctx.fillStyle = skinLight;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(fx + fw / 2, fy + fh / 2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Fingertip on other side
        ctx.fillStyle = skinBase;
        roundRect(gripWidth / 2 - 3, fy + 1, fw - 2, fh - 2, 3);
        ctx.fill();

        // Fingernail
        ctx.fillStyle = nailColor;
        roundRect(gripWidth / 2 + fw - 8, fy + 2, 5, fh - 4, 2);
        ctx.fill();
    }

    // Thumb (on side facing camera)
    ctx.fillStyle = skinBase;
    ctx.beginPath();
    ctx.ellipse(gripWidth / 2 + 5, 8, 7, 12, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Thumb nail
    ctx.fillStyle = nailColor;
    ctx.beginPath();
    ctx.ellipse(gripWidth / 2 + 8, 2, 4, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// Draw a trigger finger separately (for pistol/rifle grip)
function drawTriggerFinger(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = '#c49a6c';
    roundRect(-3, 0, 7, 22, 3);
    ctx.fill();
    // Fingernail
    ctx.fillStyle = '#dbb99a';
    roundRect(-1, 18, 5, 4, 2);
    ctx.fill();
    ctx.restore();
}

function renderWeapon() {
    const p = game.player;
    const bobX = Math.sin(game.weaponBobTime) * 6;
    const bobY = Math.abs(Math.cos(game.weaponBobTime)) * 4;
    const kickY = game.kickbackOffset * 5;
    const kickR = game.kickbackRotation;
    const jumpSway = p.verticalVel * 0.015;
    const crouchLower = p.crouchAmount * 15;

    const baseX = W / 2 + 160 + bobX;
    const baseY = H - 100 + bobY + kickY + jumpSway + crouchLower;

    ctx.save();
    ctx.translate(baseX, baseY);
    ctx.rotate(kickR * 0.015);
    if (!p.isGrounded) ctx.rotate(p.verticalVel * 0.00008);

    if (WEAPONS[p.currentWeapon].isGun) drawRealisticGun(p.currentWeapon);
    else drawRealisticKnife();

    ctx.restore();
}

function drawRealisticGun(type) {
    const swing = game.weaponSwing;
    ctx.save();
    if (swing > 0) ctx.rotate(-swing * 0.15);

    switch (type) {
        case 'pistol': drawPistol(); break;
        case 'shotgun': drawShotgun(); break;
        case 'smg': drawSMG(); break;
        case 'rifle': drawRifle(); break;
    }
    ctx.restore();
}

function drawPistol() {
    // === RIGHT HAND (gripping) ===
    drawHand(0, 30, 20, 0, 1);

    // === TRIGGER FINGER ===
    drawTriggerFinger(5, -8, 0.4);

    // === GUN BODY ===

    // Grip (behind hand)
    ctx.fillStyle = '#1a1a1a';
    roundRect(-10, 5, 20, 40, 3);
    ctx.fill();
    // Grip texture lines
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.moveTo(-8, 10 + i * 4); ctx.lineTo(8, 10 + i * 4); ctx.stroke();
    }
    // Grip panels (checkered)
    ctx.fillStyle = '#252525';
    roundRect(-9, 8, 7, 30, 2); ctx.fill();
    roundRect(2, 8, 7, 30, 2); ctx.fill();

    // Frame / receiver
    ctx.fillStyle = '#2a2a2a';
    roundRect(-10, -15, 20, 25, 2);
    ctx.fill();

    // Slide
    const slideGrad = ctx.createLinearGradient(-10, -65, 10, -65);
    slideGrad.addColorStop(0, '#333');
    slideGrad.addColorStop(0.3, '#444');
    slideGrad.addColorStop(0.7, '#3a3a3a');
    slideGrad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = slideGrad;
    roundRect(-10, -65, 20, 55, 2);
    ctx.fill();

    // Slide serrations (rear)
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
        ctx.beginPath(); ctx.moveTo(-9, -12 - i * 4); ctx.lineTo(9, -12 - i * 4); ctx.stroke();
    }

    // Ejection port
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(3, -45, 6, 15);

    // Barrel
    ctx.fillStyle = '#222';
    roundRect(-5, -80, 10, 18, 2);
    ctx.fill();

    // Muzzle
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(0, -80, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, -80, 3, 0, Math.PI * 2);
    ctx.fill();

    // Front sight
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-2, -83, 4, 5);
    // Front sight dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(0, -81, 1.2, 0, Math.PI * 2); ctx.fill();

    // Rear sight
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-7, -14, 4, 5);
    ctx.fillRect(3, -14, 4, 5);
    // Rear sight dots
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(-5, -12, 1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -12, 1, 0, Math.PI * 2); ctx.fill();

    // Trigger guard
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -2, 12, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Trigger
    ctx.fillStyle = '#222';
    ctx.fillRect(-1.5, -5, 3, 10);

    // Magazine base
    ctx.fillStyle = '#1a1a1a';
    roundRect(-8, 40, 16, 5, 1);
    ctx.fill();

    // Subtle highlight on slide top
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(-8, -63, 16, 3);
}

function drawShotgun() {
    // === LEFT HAND (pump grip) ===
    ctx.save();
    ctx.translate(-15, -25);
    drawHand(0, 0, 26, 0.05, -1);
    ctx.restore();

    // === RIGHT HAND (stock grip) ===
    drawHand(5, 35, 22, 0, 1);
    drawTriggerFinger(8, -5, 0.3);

    // === GUN BODY ===

    // Stock
    const stockGrad = ctx.createLinearGradient(-14, 25, 14, 25);
    stockGrad.addColorStop(0, '#5a3a1e');
    stockGrad.addColorStop(0.3, '#6b4422');
    stockGrad.addColorStop(0.7, '#5a3a1e');
    stockGrad.addColorStop(1, '#4a2e15');
    ctx.fillStyle = stockGrad;
    roundRect(-14, 20, 28, 60, 4);
    ctx.fill();

    // Wood grain on stock
    ctx.strokeStyle = 'rgba(90,50,20,0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(-12, 25 + i * 5 + Math.sin(i) * 2);
        ctx.quadraticCurveTo(0, 27 + i * 5, 12, 25 + i * 5 - Math.sin(i) * 2);
        ctx.stroke();
    }

    // Buttplate
    ctx.fillStyle = '#222';
    roundRect(-13, 72, 26, 6, 2);
    ctx.fill();

    // Receiver
    ctx.fillStyle = '#333';
    roundRect(-12, -10, 24, 35, 3);
    ctx.fill();

    // Receiver detail
    ctx.fillStyle = '#2a2a2a';
    roundRect(-10, -5, 20, 15, 2);
    ctx.fill();

    // Trigger guard
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(3, 5, 10, 0.3, Math.PI - 0.3); ctx.stroke();

    // Trigger
    ctx.fillStyle = '#222';
    ctx.fillRect(1, 0, 3, 9);

    // Pump / forend
    const pumpGrad = ctx.createLinearGradient(-13, -40, 13, -40);
    pumpGrad.addColorStop(0, '#6b4422');
    pumpGrad.addColorStop(0.5, '#7a5030');
    pumpGrad.addColorStop(1, '#5a3a1e');
    ctx.fillStyle = pumpGrad;
    roundRect(-13, -45, 26, 30, 4);
    ctx.fill();

    // Pump grooves
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(-11, -42 + i * 5); ctx.lineTo(11, -42 + i * 5); ctx.stroke();
    }

    // Barrel(s)
    ctx.fillStyle = '#3a3a3a';
    roundRect(-6, -100, 12, 60, 3);
    ctx.fill();

    // Barrel channel line
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, -100); ctx.lineTo(0, -45); ctx.stroke();

    // Barrel highlight
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(-4, -95, 3, 50);

    // Muzzle
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(0, -100, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(0, -100, 4, 0, Math.PI * 2); ctx.fill();

    // Bead sight
    ctx.fillStyle = '#cc8800';
    ctx.beginPath(); ctx.arc(0, -102, 2, 0, Math.PI * 2); ctx.fill();

    // Magazine tube (under barrel)
    ctx.fillStyle = '#2a2a2a';
    roundRect(-4, -85, 8, 40, 2);
    ctx.fill();

    // Loading gate
    ctx.fillStyle = '#282828';
    ctx.fillRect(-8, 10, 6, 8);
}

function drawSMG() {
    // === LEFT HAND (front grip) ===
    ctx.save();
    ctx.translate(-8, -30);
    drawHand(0, 0, 18, 0, -1);
    ctx.restore();

    // === RIGHT HAND (pistol grip) ===
    drawHand(3, 30, 18, 0.05, 1);
    drawTriggerFinger(6, -5, 0.35);

    // === GUN BODY ===

    // Pistol grip
    ctx.fillStyle = '#1e1e1e';
    roundRect(-8, 10, 18, 35, 3);
    ctx.fill();
    // Grip texture
    ctx.fillStyle = '#252525';
    for (let i = 0; i < 6; i++) {
        ctx.fillRect(-6, 14 + i * 4, 14, 2);
    }

    // Lower receiver
    ctx.fillStyle = '#2e2e2e';
    roundRect(-9, -15, 18, 30, 2);
    ctx.fill();

    // Mag well
    ctx.fillStyle = '#252525';
    ctx.fillRect(-6, 10, 12, 8);

    // Magazine (stick mag)
    ctx.fillStyle = '#222';
    roundRect(-5, 15, 10, 35, 2);
    ctx.fill();
    // Mag base
    ctx.fillStyle = '#1a1a1a';
    roundRect(-6, 46, 12, 4, 1);
    ctx.fill();

    // Upper receiver
    const upperGrad = ctx.createLinearGradient(-9, -60, 9, -60);
    upperGrad.addColorStop(0, '#333');
    upperGrad.addColorStop(0.4, '#3e3e3e');
    upperGrad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = upperGrad;
    roundRect(-9, -65, 18, 55, 2);
    ctx.fill();

    // Bolt / charging handle area
    ctx.fillStyle = '#282828';
    ctx.fillRect(6, -40, 4, 15);

    // Picatinny rail on top
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(-7, -63, 14, 4);
    for (let i = 0; i < 7; i++) {
        ctx.fillStyle = i % 2 ? '#2e2e2e' : '#262626';
        ctx.fillRect(-6 + i * 2, -63, 1.5, 4);
    }

    // Barrel shroud / suppressor
    ctx.fillStyle = '#2a2a2a';
    roundRect(-5, -90, 10, 28, 3);
    ctx.fill();

    // Barrel shroud holes
    ctx.fillStyle = '#1a1a1a';
    for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.arc(-2, -72 - i * 6, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(2, -75 - i * 6, 2, 0, Math.PI * 2); ctx.fill();
    }

    // Muzzle
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath(); ctx.arc(0, -90, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath(); ctx.arc(0, -90, 3, 0, Math.PI * 2); ctx.fill();

    // Front sight post
    ctx.fillStyle = '#222';
    ctx.fillRect(-1.5, -94, 3, 6);

    // Rear sight
    ctx.fillStyle = '#222';
    ctx.fillRect(-5, -17, 3, 5);
    ctx.fillRect(2, -17, 3, 5);

    // Trigger guard
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(2, 0, 9, 0.3, Math.PI - 0.3); ctx.stroke();

    // Trigger
    ctx.fillStyle = '#222';
    ctx.fillRect(0, -3, 3, 8);

    // Folding stock (collapsed)
    ctx.fillStyle = '#333';
    roundRect(-10, -10, 3, 50, 1);
    ctx.fill();

    // Sling mount
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath(); ctx.arc(-9, -8, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath(); ctx.arc(-9, -8, 1.5, 0, Math.PI * 2); ctx.fill();
}

function drawRifle() {
    // === LEFT HAND (handguard grip) ===
    ctx.save();
    ctx.translate(-10, -45);
    drawHand(0, 0, 22, 0.03, -1);
    ctx.restore();

    // === RIGHT HAND (pistol grip) ===
    drawHand(5, 35, 20, 0.02, 1);
    drawTriggerFinger(8, -3, 0.3);

    // === GUN BODY ===

    // Pistol grip
    ctx.fillStyle = '#1e1e1e';
    roundRect(-8, 12, 18, 38, 3);
    ctx.fill();
    ctx.fillStyle = '#252525';
    roundRect(-7, 15, 7, 28, 2); ctx.fill();
    roundRect(2, 15, 7, 28, 2); ctx.fill();

    // Buffer tube / stock
    ctx.fillStyle = '#2a2a2a';
    roundRect(-6, 5, 12, 55, 2);
    ctx.fill();

    // Adjustable stock
    ctx.fillStyle = '#222';
    roundRect(-10, 40, 20, 25, 3);
    ctx.fill();
    // Stock texture
    ctx.fillStyle = '#282828';
    roundRect(-8, 43, 16, 8, 2); ctx.fill();
    roundRect(-8, 53, 16, 8, 2); ctx.fill();
    // Buttpad
    ctx.fillStyle = '#1a1a1a';
    roundRect(-9, 60, 18, 5, 2);
    ctx.fill();

    // Lower receiver
    ctx.fillStyle = '#2e2e2e';
    roundRect(-10, -15, 20, 30, 2);
    ctx.fill();

    // Magazine well
    ctx.fillStyle = '#262626';
    ctx.fillRect(-7, 8, 14, 8);

    // Magazine (STANAG style)
    ctx.fillStyle = '#222';
    ctx.save();
    ctx.translate(0, 20);
    ctx.rotate(0.05);
    roundRect(-6, 0, 12, 40, 2);
    ctx.fill();
    // Mag ribs
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
        ctx.beginPath(); ctx.moveTo(-5, 5 + i * 6); ctx.lineTo(5, 5 + i * 6); ctx.stroke();
    }
    ctx.fillStyle = '#1a1a1a';
    roundRect(-7, 37, 14, 4, 1); ctx.fill();
    ctx.restore();

    // Upper receiver
    const rcvGrad = ctx.createLinearGradient(-10, -50, 10, -50);
    rcvGrad.addColorStop(0, '#333');
    rcvGrad.addColorStop(0.4, '#3a3a3a');
    rcvGrad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = rcvGrad;
    roundRect(-10, -55, 20, 45, 2);
    ctx.fill();

    // Ejection port
    ctx.fillStyle = '#1a1a1a';
    roundRect(5, -40, 5, 14, 1);
    ctx.fill();

    // Forward assist
    ctx.fillStyle = '#282828';
    ctx.beginPath(); ctx.arc(8, -30, 3, 0, Math.PI * 2); ctx.fill();

    // Charging handle
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(-3, -14, 6, 4);

    // Flat top rail
    ctx.fillStyle = '#2e2e2e';
    ctx.fillRect(-8, -55, 16, 4);
    for (let i = 0; i < 9; i++) {
        ctx.fillStyle = i % 2 ? '#323232' : '#282828';
        ctx.fillRect(-7 + i * 1.7, -55, 1.2, 4);
    }

    // SCOPE
    ctx.fillStyle = '#222';
    roundRect(-6, -60, 12, 10, 3); ctx.fill();
    // Scope tube
    ctx.fillStyle = '#1e1e1e';
    roundRect(-5, -68, 10, 20, 4); ctx.fill();
    // Scope lens (front)
    ctx.fillStyle = '#224466';
    ctx.beginPath(); ctx.arc(0, -68, 4.5, 0, Math.PI * 2); ctx.fill();
    // Lens reflection
    ctx.fillStyle = 'rgba(100,180,255,0.3)';
    ctx.beginPath(); ctx.arc(-1, -69, 2, 0, Math.PI * 2); ctx.fill();
    // Scope lens (rear)
    ctx.fillStyle = '#334455';
    ctx.beginPath(); ctx.arc(0, -50, 4, 0, Math.PI * 2); ctx.fill();
    // Scope adjustment turrets
    ctx.fillStyle = '#282828';
    ctx.fillRect(5, -62, 5, 5);
    ctx.fillRect(-2, -63, 4, 3);

    // Handguard / free-float rail
    ctx.fillStyle = '#2e2e2e';
    roundRect(-9, -80, 18, 28, 3);
    ctx.fill();

    // M-LOK slots
    ctx.fillStyle = '#222';
    for (let i = 0; i < 3; i++) {
        roundRect(-8, -76 + i * 8, 5, 5, 1); ctx.fill();
        roundRect(3, -76 + i * 8, 5, 5, 1); ctx.fill();
    }

    // Barrel
    ctx.fillStyle = '#2a2a2a';
    roundRect(-4, -110, 8, 33, 2);
    ctx.fill();

    // Muzzle brake
    ctx.fillStyle = '#333';
    roundRect(-5, -118, 10, 10, 2);
    ctx.fill();
    // Brake ports
    ctx.fillStyle = '#222';
    ctx.fillRect(-4, -116, 3, 2);
    ctx.fillRect(1, -116, 3, 2);
    ctx.fillRect(-4, -112, 3, 2);
    ctx.fillRect(1, -112, 3, 2);

    // Muzzle hole
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(0, -118, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(0, -118, 2, 0, Math.PI * 2); ctx.fill();

    // Gas block / front sight
    ctx.fillStyle = '#2a2a2a';
    roundRect(-6, -85, 12, 5, 1);
    ctx.fill();

    // Trigger guard
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(3, 2, 10, 0.3, Math.PI - 0.3); ctx.stroke();

    // Trigger
    ctx.fillStyle = '#222';
    ctx.fillRect(1, -2, 3, 8);

    // Sling mount (rear)
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath(); ctx.arc(-9, 35, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath(); ctx.arc(-9, 35, 1.5, 0, Math.PI * 2); ctx.fill();
}

function drawRealisticKnife() {
    const swing = game.weaponSwing;
    ctx.save();
    ctx.rotate(-0.25 + swing * 1.0);

    // === HAND ===
    drawHand(0, 20, 16, 0.1, 1);

    // === KNIFE ===

    // Handle / grip
    const handleGrad = ctx.createLinearGradient(-6, 5, 8, 5);
    handleGrad.addColorStop(0, '#1a1a1a');
    handleGrad.addColorStop(0.3, '#2a2a2a');
    handleGrad.addColorStop(0.7, '#222');
    handleGrad.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = handleGrad;
    roundRect(-6, -5, 14, 55, 4);
    ctx.fill();

    // Handle texture (G10 style)
    ctx.fillStyle = '#252525';
    for (let i = 0; i < 9; i++) {
        ctx.fillRect(-5, -2 + i * 5.5, 12, 3);
    }

    // Handle jimping (thumb rest)
    ctx.fillStyle = '#303030';
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(-5, -3 + i * 4, 3, 2);
    }

    // Lanyard hole
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(1, 46, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath(); ctx.arc(1, 46, 1.5, 0, Math.PI * 2); ctx.fill();

    // Guard / bolster
    ctx.fillStyle = '#444';
    roundRect(-10, -8, 22, 6, 2);
    ctx.fill();
    // Guard bevel
    ctx.fillStyle = '#555';
    ctx.fillRect(-9, -7, 20, 2);

    // === BLADE ===
    const bladeGrad = ctx.createLinearGradient(-4, -70, 6, -70);
    bladeGrad.addColorStop(0, '#999');
    bladeGrad.addColorStop(0.15, '#ccc');
    bladeGrad.addColorStop(0.4, '#bbb');
    bladeGrad.addColorStop(0.6, '#aaa');
    bladeGrad.addColorStop(1, '#888');

    // Blade shape (clip point / bowie style)
    ctx.fillStyle = bladeGrad;
    ctx.beginPath();
    ctx.moveTo(-4, -8);       // spine start (left)
    ctx.lineTo(8, -8);        // spine start (right)
    ctx.lineTo(8, -60);       // spine runs up
    ctx.lineTo(5, -70);       // clip point begins
    ctx.lineTo(1, -78);       // tip
    ctx.lineTo(-3, -68);      // edge curves
    ctx.lineTo(-4, -8);       // back to start
    ctx.closePath();
    ctx.fill();

    // Blade edge (sharp edge highlight)
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, -78);   // tip
    ctx.lineTo(-3, -68);
    ctx.lineTo(-4, -8);
    ctx.stroke();

    // Spine (thicker back edge)
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(8, -8);
    ctx.lineTo(8, -60);
    ctx.lineTo(5, -70);
    ctx.lineTo(1, -78);
    ctx.stroke();

    // Fuller / blood groove
    ctx.strokeStyle = 'rgba(100,100,100,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(2, -12);
    ctx.lineTo(5, -55);
    ctx.stroke();

    // Blade reflection / polish line
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(6, -12);
    ctx.lineTo(6, -55);
    ctx.lineTo(3, -65);
    ctx.lineTo(0, -60);
    ctx.closePath();
    ctx.fill();

    // Secondary bevel near edge
    ctx.strokeStyle = 'rgba(200,200,200,0.3)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-2, -12);
    ctx.lineTo(-2, -65);
    ctx.lineTo(1, -75);
    ctx.stroke();

    // Clip point false edge
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(5, -70);
    ctx.lineTo(1, -78);
    ctx.stroke();

    ctx.restore();
}

// ============================================================
//  MINIMAP
// ============================================================
function renderMinimap() {
    const p = game.player, size = 150, scale = size / (MAP_SIZE * TILE) * 5, ox = W - size - 15, oy = 60;
    ctx.globalAlpha = 0.6; ctx.fillStyle = '#000'; ctx.fillRect(ox, oy, size, size);
    ctx.strokeStyle = '#333'; ctx.strokeRect(ox, oy, size, size);
    const cx = ox + size / 2, cy = oy + size / 2, pmx = Math.floor(p.x / TILE), pmy = Math.floor(p.y / TILE);
    for (let dy = -15; dy <= 15; dy++) for (let dx = -15; dx <= 15; dx++) {
        const mx = pmx + dx, my = pmy + dy;
        if (mx >= 0 && my >= 0 && mx < MAP_SIZE && my < MAP_SIZE && map[my][mx] === 1) { ctx.fillStyle = '#555'; ctx.fillRect(cx + dx * TILE * scale, cy + dy * TILE * scale, TILE * scale, TILE * scale); }
    }
    ctx.fillStyle = p.isCrouching ? '#ffaa00' : (p.isGrounded ? '#00ff00' : '#44aaff');
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#00ff00'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(p.angle) * 12, cy + Math.sin(p.angle) * 12); ctx.stroke();
    for (let i = 0; i < game.zombies.length; i++) {
        const z = game.zombies[i], zdx = (z.x - p.x) * scale, zdy = (z.y - p.y) * scale;
        if (Math.abs(zdx) < size / 2 && Math.abs(zdy) < size / 2) {
            const isT = i === game.trackerTarget && game.trackerArrowsActive;
            if (isT) { ctx.strokeStyle = `rgba(68,170,255,${0.5 + Math.sin(Date.now() / 150) * 0.5})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx + zdx, cy + zdy, 6, 0, Math.PI * 2); ctx.stroke(); }
            ctx.fillStyle = isT ? '#44aaff' : (z.type === 'tank' ? '#ff4444' : z.type === 'fast' ? '#ffff00' : '#ff0000');
            ctx.beginPath(); ctx.arc(cx + zdx, cy + zdy, isT ? 3 : 2, 0, Math.PI * 2); ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
}

// ============================================================
//  HUD
// ============================================================
function updateHUD() {
    const p = game.player, wDef = WEAPONS[p.currentWeapon], wState = p.weapons[p.currentWeapon];
    document.getElementById('health-fill').style.width = (p.health / p.maxHealth * 100) + '%';
    document.getElementById('health-text').textContent = Math.ceil(p.health);
    document.getElementById('weapon-name').textContent = wDef.name;
    if (wDef.isGun) { document.getElementById('ammo-current').textContent = wState.ammo; document.getElementById('ammo-reserve').textContent = wState.reserve; document.getElementById('ammo-display').style.display = ''; }
    else document.getElementById('ammo-display').style.display = 'none';
    document.getElementById('kill-count').textContent = game.kills;
}

function updateWaveHUD() {
    const total = game.waveTotal, killed = game.waveKills, alive = game.zombies.length, incoming = Math.max(0, game.zombiesRemaining - alive);
    document.getElementById('wave-number').textContent = game.wave;
    document.getElementById('zombies-killed-count').textContent = killed;
    document.getElementById('zombies-total-count').textContent = total;
    document.getElementById('zombies-alive-count').textContent = alive;
    document.getElementById('zombies-incoming-count').textContent = incoming;
    document.getElementById('wave-progress-fill').style.width = (total > 0 ? (killed / total) * 100 : 0) + '%';
    const hint = document.getElementById('track-hint');
    if (alive > 0) { hint.style.display = ''; hint.textContent = `[F] Track ${alive} zombie${alive !== 1 ? 's' : ''} (6-9 target)`; }
    else hint.style.display = 'none';
}

function updateStanceIndicator() {
    const p = game.player, si = document.getElementById('stance-indicator');
    si.classList.remove('crouching', 'jumping');
    if (!p.isGrounded) { si.textContent = '▲ AIRBORNE'; si.classList.add('jumping'); }
    else if (p.isCrouching) { si.textContent = '▼ CROUCHING'; si.classList.add('crouching'); }
    else si.textContent = '● STANDING';
}

function showWaveCompleteBanner(n) {
    const b = document.getElementById('wave-complete-banner');
    document.getElementById('wave-complete-num').textContent = n;
    b.classList.remove('hidden', 'show'); void b.offsetWidth; b.classList.add('show');
    setTimeout(() => { b.classList.add('hidden'); b.classList.remove('show'); }, 2500);
}

// ============================================================
//  WAVE MANAGEMENT
// ============================================================
function startWave() {
    const c = 5 + game.wave * 3; game.waveTotal = c; game.zombiesRemaining = c;
    game.waveKills = 0; game.spawnTimer = 0; game.waveCooldown = 0; game.trackerTarget = -1; updateWaveHUD();
}

function updateWaveSpawning(dt) {
    if (game.waveKills >= game.waveTotal && game.zombies.length === 0) {
        if (game.waveCooldown === 0) { playSound('wave_complete'); showWaveCompleteBanner(game.wave); game.player.health = Math.min(game.player.maxHealth, game.player.health + 20); game.trackerArrowsActive = false; document.getElementById('tracker-arrows').innerHTML = ''; updateHUD(); }
        game.waveCooldown += dt; if (game.waveCooldown >= WAVE_COOLDOWN_TIME) { game.wave++; startWave(); } return;
    }
    if (game.zombiesRemaining > 0 && game.zombies.length < 15 + game.wave * 2) { game.spawnTimer -= dt; if (game.spawnTimer <= 0) { spawnZombie(); game.spawnTimer = Math.max(0.3, 2 - game.wave * 0.1); } }
    updateWaveHUD();
}

// ============================================================
//  PLAYER MOVEMENT
// ============================================================
function updatePlayer(dt) {
    const p = game.player; let mx = 0, my = 0;
    if (keys['KeyW'] || keys['ArrowUp']) { mx += Math.cos(p.angle); my += Math.sin(p.angle); }
    if (keys['KeyS'] || keys['ArrowDown']) { mx -= Math.cos(p.angle); my -= Math.sin(p.angle); }
    if (keys['KeyA'] || keys['ArrowLeft']) { mx += Math.cos(p.angle - Math.PI / 2); my += Math.sin(p.angle - Math.PI / 2); }
    if (keys['KeyD'] || keys['ArrowRight']) { mx += Math.cos(p.angle + Math.PI / 2); my += Math.sin(p.angle + Math.PI / 2); }
    const sm = p.isCrouching ? CROUCH_SPEED_MULT : 1;
    if (mx !== 0 || my !== 0) {
        const l = Math.sqrt(mx * mx + my * my); mx = (mx / l) * p.speed * sm; my = (my / l) * p.speed * sm;
        let tmx = Math.floor((p.x + mx) / TILE), tmy = Math.floor(p.y / TILE);
        if (tmx >= 0 && tmx < MAP_SIZE && map[tmy][tmx] === 0) p.x += mx;
        tmx = Math.floor(p.x / TILE); tmy = Math.floor((p.y + my) / TILE);
        if (tmy >= 0 && tmy < MAP_SIZE && map[tmy][tmx] === 0) p.y += my;
        game.weaponBobTime += dt * 8 * sm;
    }
    if (!p.isGrounded) { p.verticalVel -= GRAVITY * dt; p.verticalPos += p.verticalVel * dt; if (p.verticalPos <= 0) { p.verticalPos = 0; p.verticalVel = 0; p.isGrounded = true; if (!p.wasGrounded) { playSound('land'); game.screenShake.intensity = 3; } } }
    p.wasGrounded = p.isGrounded;
    const wc = keys['KeyC'] || keys['ControlLeft'] || keys['ControlRight'];
    if (wc && p.isGrounded) p.isCrouching = true; else if (!wc) p.isCrouching = false;
    p.crouchAmount += ((p.isCrouching ? 1 : 0) - p.crouchAmount) * 0.15;
    if (mouseDown && game.running && !game.paused && !game.trackerOpen && WEAPONS[p.currentWeapon].auto) fireWeapon();
    if (p.invincible > 0) p.invincible -= dt;
    game.kickbackOffset *= (1 - WEAPONS[p.currentWeapon].kickRecovery * 2); if (game.kickbackOffset < 0.01) game.kickbackOffset = 0;
    game.kickbackRotation *= 0.9; if (Math.abs(game.kickbackRotation) < 0.01) game.kickbackRotation = 0;
    p.pitch *= 0.95; game.weaponSwing *= 0.85; if (game.weaponSwing < 0.01) game.weaponSwing = 0;
    if (game.screenShake.intensity > 0) { game.screenShake.x = (Math.random() - 0.5) * game.screenShake.intensity; game.screenShake.y = (Math.random() - 0.5) * game.screenShake.intensity; game.screenShake.intensity *= 0.85; if (game.screenShake.intensity < 0.1) { game.screenShake.intensity = 0; game.screenShake.x = 0; game.screenShake.y = 0; } }
    updateStanceIndicator();
}

// ============================================================
//  GAME LOOP
// ============================================================
function gameLoop(ts) {
    if (!game.running) return; if (game.paused) { requestAnimationFrame(gameLoop); return; }
    const dt = Math.min((ts - game.lastTime) / 1000, 0.05); game.lastTime = ts;
    updatePlayer(dt);
    if (!game.trackerOpen) { updateZombies(dt); updateParticles(dt); updateWaveSpawning(dt); updateStuckDetection(dt); }
    ctx.clearRect(0, 0, W, H); renderScene(); renderWeapon(); renderMinimap(); updateTrackerArrows();
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
    game.wave = 1; game.kills = 0; game.headshots = 0; game.waveKills = 0; game.waveTotal = 0; game.waveCooldown = 0;
    game.kickbackOffset = 0; game.kickbackRotation = 0; game.weaponSwing = 0; game.weaponBobTime = 0;
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
    canvas.requestPointerLock(); audioCtx.resume(); requestAnimationFrame(gameLoop);
}

function gameOver() {
    game.running = false; document.exitPointerLock();
    document.getElementById('hud').classList.add('hidden'); document.getElementById('gameover-screen').classList.remove('hidden');
    document.getElementById('final-kills').textContent = game.kills; document.getElementById('final-headshots').textContent = game.headshots; document.getElementById('final-wave').textContent = game.wave;
}

function togglePause() {
    game.paused = !game.paused;
    if (game.paused) { document.exitPointerLock(); document.getElementById('pause-screen').classList.remove('hidden'); }
    else { canvas.requestPointerLock(); document.getElementById('pause-screen').classList.add('hidden'); game.lastTime = performance.now(); }
}

// ============================================================
//  EVENT LISTENERS
// ============================================================
let selectedWeapon = 'pistol';
document.querySelectorAll('.weapon-card').forEach(card => {
    card.addEventListener('click', () => { document.querySelectorAll('.weapon-card').forEach(c => c.classList.remove('selected')); card.classList.add('selected'); selectedWeapon = card.dataset.weapon; });
});
document.getElementById('start-btn').addEventListener('click', () => startGame(selectedWeapon));
document.getElementById('restart-btn').addEventListener('click', () => startGame(selectedWeapon));
document.getElementById('resume-btn').addEventListener('click', () => togglePause());
document.getElementById('quit-btn').addEventListener('click', () => { game.running = false; document.exitPointerLock(); document.getElementById('pause-screen').classList.add('hidden'); document.getElementById('hud').classList.add('hidden'); document.getElementById('start-screen').style.display = 'flex'; });
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('click', () => { if (game.running && !game.paused && !game.trackerOpen) canvas.requestPointerLock(); });