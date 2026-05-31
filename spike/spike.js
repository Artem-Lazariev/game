let enemies = [];
let color = [];
let spike = {x: -100, y: -100};
let st = true;
let sp = false;
let i = 0; // Твоя валюта

let mov2 = 1;
let mov = 1;
let targ = {x: 0, y: 0};
let table = document.getElementById("grid");
let teleport = {x: 50, y: 50};
let score = 0;
let player = { x: 50, y: 50 };

// ХАРДКОРНИЙ СПАВН: 1156 ворогів у верхньому кутку карти
for (let eX = 1; eX < 35; eX++) {
    for (let eY = 1; eY < 35; eY++) {
        enemies.push({x: eX, y: eY});
    }
}

// Генерація сітки 100х100
for (let y = 0; y < 100; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < 100; x++) {
        let cell = document.createElement("td");
        cell.id = `{x:${x},y:${y}}`;
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function toCellId(x, y) {
    return `{x:${Math.round(x)},y:${Math.round(y)}}`;
}

function move() {
    // Якщо спайк підірвався на цілі
    if (spike.x === targ.x && spike.y === targ.y) {
        const randomNumber = Math.floor(Math.random() * 100);
        const randomNumber2 = Math.floor(Math.random() * 100);
        targ = {x: randomNumber, y: randomNumber2};
    }

    document.getElementById("text").innerHTML = `money: ${i}`;

    // Очищення попереднього кадру
    for (let j of color) {
        let el = document.getElementById(j);
        if (el) el.style.backgroundColor = "white";
    }
    color = [];

    // Рух та інтелект натовпу ворогів
    for (let index = enemies.length - 1; index >= 0; index--) {
        let j = enemies[index];
        let old = {...j};
        let r3 = Math.random() < 0.75;
        let oldDist = r3 ? distance(player, j) : distance(teleport, j);

        let r1 = Math.random() < 0.50;
        let r2 = Math.random() < 0.50;

        if (distance(player, j) > 20) mov = 3;
        if (distance(player, j) > 40) mov = 6;
        if (distance(player, j) < 20) mov = 1;

        if (r1) {
            j.x += r2 ? -mov : mov;
        } else {
            j.y += r2 ? -mov : mov;
        }

        // Clamp (утримання в межах мапи)
        j.x = Math.max(0, Math.min(99, j.x));
        j.y = Math.max(0, Math.min(99, j.y));

        let newDist = r3 ? distance(player, j) : distance(teleport, j);

        if (newDist > oldDist) {
            Object.assign(j, old);
        } else {
            score++;
        }

        player.x = Math.max(0, Math.min(99, player.x));
        player.y = Math.max(0, Math.min(99, player.y));

        // GAME OVER: Якщо ворог затиснув і наступив на гравця
        if (distance(player, j) === 0) {
            console.log("GAME OVER:", i);
            st = false;

            // Ефектний фінальний вибух навколо гравця перед смертю
            let p = {...player};
            let explosion = [
                {x: p.x, y: p.y}, {x: p.x-1, y: p.y}, {x: p.x+1, y: p.y},
                {x: p.x, y: p.y-1}, {x: p.x, y: p.y+1}
            ];
            for (let pos of explosion) {
                let cell = document.getElementById(toCellId(pos.x, pos.y));
                if (cell) cell.style.backgroundColor = "orange";
            }

            setTimeout(() => {
                alert("GAME OVER: ");
            }, 100);
            return;
        }
    }

    if (st) {
        i++;
    }

    // Рендеринг елементів
    for (let j of enemies) {
        let id = toCellId(j.x, j.y);
        let cell = document.getElementById(id);
        if (cell) cell.style.backgroundColor = "red";
        color.push(id);
    }

    let pid = toCellId(teleport.x, teleport.y);
    let pcell = document.getElementById(pid);
    if (pcell) pcell.style.backgroundColor = "blue";
    color.push(pid);

    let pId = toCellId(player.x, player.y);
    let pCell = document.getElementById(pId);
    if (pCell) pCell.style.backgroundColor = "green";
    color.push(pId);

    if (spike) {
        let pid2 = toCellId(spike.x, spike.y);
        let pcell2 = document.getElementById(pid2);
        if (pcell2) pcell2.style.backgroundColor = "yellow";
        color.push(pid2);
    }

    // Пофікшений пошук цілі (targ)
    let pids = toCellId(targ.x, targ.y);
    let pcellTarget = document.getElementById(pids);
    if (pcellTarget) pcellTarget.style.backgroundColor = "darkred";
    color.push(pids);
}

// --- КЕРУВАННЯ ГРАВЦЕМ ---
function handleMovement(dx, dy) {
    if (!st) return;
    player.x += dx;
    player.y += dy;
    move();
}

document.getElementById("w").addEventListener("click", () => handleMovement(0, -mov2));
document.getElementById("s").addEventListener("click", () => handleMovement(0, mov2));
document.getElementById("a").addEventListener("click", () => handleMovement(-mov2, 0));
document.getElementById("d").addEventListener("click", () => handleMovement(mov2, 0));

document.getElementById("e").addEventListener("click", () => { teleport = {...player}; move(); });
document.getElementById("q").addEventListener("click", () => { player = {...teleport}; move(); });

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyW") handleMovement(0, -mov2);
    else if (event.code === "KeyS") handleMovement(0, mov2);
    else if (event.code === "KeyA") handleMovement(-mov2, 0);
    else if (event.code === "KeyD") handleMovement(mov2, 0);
    else if (event.code === "KeyE") { teleport = {...player}; move(); }
    else if (event.code === "KeyQ") { player = {...teleport}; move(); }
});

document.getElementById("start").addEventListener("click", move);

// --- СУПЕРЗДІБНОСТІ З ЦИКЛАМИ ТА ЗАХИСТОМ КРАЇВ КАРТИ ---

// Ульта "C" — Круговий вибух навколо тебе
document.getElementById("c").addEventListener("click", function () {
    if (i >= 30) {
        let p = {...player};
        let positions = [
            {x: p.x - 1, y: p.y}, {x: p.x + 1, y: p.y}, {x: p.x, y: p.y - 1}, {x: p.x, y: p.y + 1},
            {x: p.x + 1, y: p.y + 1}, {x: p.x - 1, y: p.y - 1}, {x: p.x + 1, y: p.y - 1}, {x: p.x - 1, y: p.y + 1}
        ];

        enemies = enemies.filter(enemy => !positions.some(pos => pos.x === enemy.x && pos.y === enemy.y));
        i -= 30;

        for (let pos of positions) {
            let cell = document.getElementById(toCellId(pos.x, pos.y));
            if (cell) cell.style.backgroundColor = "orange";
        }

        setTimeout(() => {
            for (let pos of positions) {
                let cell = document.getElementById(toCellId(pos.x, pos.y));
                if (cell) cell.style.backgroundColor = "white";
            }
        }, 500);
    }
    move();
});

// Рандомний телепорт (RTP)
document.getElementById("rtp").addEventListener("click", function () {
    if (i >= 60){
        player = {
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100)
        };
        i -= 60;
        move();
    }
});

// Функція вибуху Спайка (міни)
function spikeExplosion(center) {
    let positions = [
        {x: center.x - 1, y: center.y}, {x: center.x + 1, y: center.y}, {x: center.x, y: center.y - 1}, {x: center.x, y: center.y + 1},
        {x: center.x + 1, y: center.y + 1}, {x: center.x - 1, y: center.y - 1}, {x: center.x + 1, y: center.y - 1}, {x: center.x - 1, y: center.y + 1}
    ];

    enemies = enemies.filter(enemy => !positions.some(pos => pos.x === enemy.x && pos.y === enemy.y));

    for (let pos of positions) {
        let cell = document.getElementById(toCellId(pos.x, pos.y));
        if (cell) cell.style.backgroundColor = "orange";
    }

    setTimeout(() => {
        for (let pos of positions) {
            let cell = document.getElementById(toCellId(pos.x, pos.y));
            if (cell) cell.style.backgroundColor = "white";
        }
    }, 500);
}

document.getElementById("spike").addEventListener("click", function () {
    if (i >= 30 && !sp) {
        spike = {x: player.x, y: player.y};
        i -= 30;
        sp = true;
        document.getElementById("spike").innerHTML = "activate spike";
    } else if (sp) {
        document.getElementById("spike").innerHTML = "spike - 30";
        spikeExplosion(spike);
        spike = {x: -100, y: -100};
        sp = false;
        i -= 15;
    }
    move();
});

// Лазерна ульта на всю карту (Хрест)
document.getElementById("laser").addEventListener("click", function () {
    if (i >= 30) {
        enemies = enemies.filter(enemy => enemy.x !== player.x && enemy.y !== player.y);
        const orange = [];

        for (let k = 0; k < 100; k++) {
            if (k !== player.x) {
                let pidd = toCellId(k, player.y);
                let pcelll = document.getElementById(pidd);
                if (pcelll) pcelll.style.backgroundColor = "orange";
                orange.push(pidd);
            }
            if (k !== player.y) {
                let pidd = toCellId(player.x, k);
                let pcelll = document.getElementById(pidd);
                if (pcelll) pcelll.style.backgroundColor = "orange";
                orange.push(pidd);
            }
        }

        setTimeout(() => {
            for (let id of orange) {
                let cell = document.getElementById(id);
                if (cell) cell.style.backgroundColor = "white";
            }
        }, 500);
        i -= 30;
    }
    move();
});

// Старт початкового кадру
move();