let enemies = [

];

let st = false;
let i = 0;
function start(dificulty = 1){
    if (!st) {
        enemies = []
        i = 0
    }
    dificulty = 1;
for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {

        if (
            (y === 0 || y === 99) && x % dificulty === 0 ||
            (x === 0 || x === 99) && y % dificulty === 0
        ) {
            enemies.push({ x, y });
        }
        st = true;
    }
}}
let mov2 = 1
let mov = 1;
let color = []
let table = document.getElementById("grid");
let teleport = {x: 50, y: 50}
for (let y = 0; y < 100; y++) {
    let row = document.createElement("tr");

    for (let x = 0; x < 100; x++) {
        let cell = document.createElement("td");

        // ID у твоєму форматі
        cell.id = `{x:${x},y:${y}}`;

        row.appendChild(cell);
    }

    table.appendChild(row);
}
let score = 0;
let player = { x: 50, y: 50 };





function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}



function move() {
// очистка
    document.getElementById("text").innerHTML = `money: ${i}`;
    for (let j of color) {
        let el = document.getElementById(j);
        if (el) el.style.backgroundColor = "white";
    }
    color = [];


    for (let j of enemies) {

        let old = {...j};
        let r3 = Math.random() < 0.75;
        let oldDist
        if (r3) {
            oldDist = distance(player, j);
        }else {
            oldDist = distance(teleport, j)
        }
        let r1 = Math.random() < 0.5;
        let r2 = Math.random() < 0.5;



        if (distance(player, j) > 20) mov = 3;
        if (distance(player, j) > 40) mov = 6;
        if (distance(player, j) < 20) mov = 1;
        if (r1) {
            j.x += r2 ? -mov : mov;
        } else {
            j.y += r2 ? -mov : mov;
        }

        // clamp
        j.x = Math.max(0, Math.min(100, j.x));
        j.y = Math.max(0, Math.min(100, j.y));

        let newDist

        if (r3) {
            newDist = distance(player, j);
        }else {
            newDist = distance(teleport, j)
        }
        if (newDist > oldDist) {
            Object.assign(j, old);
        } else {
            score++;
        }

        // телепорт рухається іноді

        // рух гравця
        player.x = Math.max(0, Math.min(100, player.x));
        player.y = Math.max(0, Math.min(100, player.y));

        // телепорт


        // game over
        if (distance(player, j) === 0) {
            console.log("GAME OVER:", i);
            alert("GAME OVER: ")

            st = false;

            return;
        }
    }
    console.log(enemies, player, score);
    if (st) {
        i++;
    }
    function toCellId(x, y) {
        return `{x:${Math.round(x)},y:${Math.round(y)}}`;
    }

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
}
move()
document.getElementById("w").addEventListener("click", function () {
    player.y -= mov2;
    move()
});
document.getElementById("s").addEventListener("click", function () {

    player.y += mov2;
    move()
})
document.getElementById("a").addEventListener("click", function () {
    player.x -= mov2;
    move()
})
document.getElementById("d").addEventListener("click", function () {
    player.x += mov2;
    move()
})
document.getElementById("e").addEventListener("click", function () {
    teleport ={ ...player};

    move()
})
document.getElementById("q").addEventListener("click", function () {
    player = {...teleport};
    move()
})


document.addEventListener("keydown", (event) => {
    if (event.code === "KeyW") {
        player.y -= mov2;
        move()
    }else if (event.code === "KeyS") {
        player.y += mov2;
        move()
    }else if (event.code === "KeyA") {
        player.x -= mov2;
        move()
    }else if (event.code === "KeyD") {
        player.x += mov2;
        move()
    }else if (event.code === "KeyE") {
        teleport ={ ...player};
        move()
    }else if (event.code === "KeyQ") {
        player = {...teleport};
        move()
    }
    }
)
document.getElementById("start").addEventListener("click", function () {
    start(1);
    move()
})
document.getElementById("c").addEventListener("click",function () {

    if (i >= 30) {


        let player2 = {...player};
        let p1 = {x: player2.x - 1, y: player2.y}
        let p2 = {x: player2.x + 1, y: player2.y}
        let p3 = {x: player2.x, y: player2.y - 1}
        let p4 = {x: player2.x, y: player2.y + 1}
        let p5 = {x: player2.x + 1, y: player2.y + 1}
        let p6 = {x: player2.x - 1, y: player2.y - 1}
        let p7 = {x: player2.x + 1, y: player2.y - 1}
        let p8 = {x: player2.x - 1, y: player2.y + 1}
        let positions = [p1, p2, p3, p4, p5, p6, p7, p8];
        enemies = enemies.filter(enemy => {
            return !positions.some(p => p.x === enemy.x && p.y === enemy.y);
        });
        i -= 30
    }
    move()
})
document.getElementById("rtp").addEventListener("click", function () {
    if (i >= 30){
        let num = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * 100) +1;
        player = {x: num, y: num2};
        teleport = {x: num, y: num2};
        i -= 30
        move()
    }
})