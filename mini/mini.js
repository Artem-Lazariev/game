
let enemies = [
    { x: 9, y: 9 },
    { x: 9, y: 0 },
    { x: 0, y: 10 },
    { x: 0, y: 0 },
]
let spike
let st = false;
let sp = false
let i = 0;

let mov2 = 1
let mov = 1;
let color = []
let table = document.getElementById("grid");
let teleport = {x: 5, y: 5}
for (let y = 0; y < 10; y++) {
    let row = document.createElement("tr");

    for (let x = 0; x < 10; x++) {
        let cell = document.createElement("td");

        // ID у твоєму форматі
        cell.id = `{x:${x},y:${y}}`;

        row.appendChild(cell);
    }

    table.appendChild(row);
}
let score = 0;
let player = { x: 5, y: 5 };

st = true;



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
//..../..
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




        if (distance(player, j) < 20) mov = 1;
        if (r1) {
            j.x += r2 ? -mov : mov;
        } else {
            j.y += r2 ? -mov : mov;
        }

        // clamp
        j.x = Math.max(0, Math.min(9, j.x));
        j.y = Math.max(0, Math.min(9, j.y));

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
        player.x = Math.max(0, Math.min(9, player.x));
        player.y = Math.max(0, Math.min(9, player.y));

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
    if (spike) {

        let pid2 = toCellId(spike.x, spike.y);
        let pcell2 = document.getElementById(pid2);

        if (pcell2) pcell2.style.backgroundColor = "yellow";
        color.push(pid2);
    }
    if (enemies.length === 0) {
        alert("YOU WIN")
        st = false;
    }
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
function toCellId(x, y) {
    return `{x:${Math.round(x)},y:${Math.round(y)}}`;
}
document.getElementById("start").addEventListener("click", function () {

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
        document.getElementById(toCellId(p1.x, p1.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p2.x, p2.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p3.x, p3.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p4.x, p4.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p5.x, p5.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p6.x, p6.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p7.x, p7.y)).style.backgroundColor = "orange";
        document.getElementById(toCellId(p8.x, p8.y)).style.backgroundColor = "orange";
        setTimeout(() => {

                document.getElementById(toCellId(p1.x, p1.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p2.x, p2.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p3.x, p3.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p4.x, p4.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p5.x, p5.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p6.x, p6.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p7.x, p7.y)).style.backgroundColor = "white";
                document.getElementById(toCellId(p8.x, p8.y)).style.backgroundColor = "white";

            }
            ,500)

    }
    move()
})
document.getElementById("rtp").addEventListener("click", function () {
    if (i >= 60){
        let num = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * 100) +1;
        player = {x: num, y: num2};
        i -= 60
        move()
    }
})
function spikeExplosion(center) {
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
    document.getElementById(toCellId(p1.x, p1.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p2.x, p2.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p3.x, p3.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p4.x, p4.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p5.x, p5.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p6.x, p6.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p7.x, p7.y)).style.backgroundColor = "orange";
    document.getElementById(toCellId(p8.x, p8.y)).style.backgroundColor = "orange";
    setTimeout(() => {

            document.getElementById(toCellId(p1.x, p1.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p2.x, p2.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p3.x, p3.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p4.x, p4.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p5.x, p5.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p6.x, p6.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p7.x, p7.y)).style.backgroundColor = "white";
            document.getElementById(toCellId(p8.x, p8.y)).style.backgroundColor = "white";

        }
        ,500)

}

document.getElementById("spike").addEventListener("click", function () {

    if (i >= 30 && !sp) {
        spike = {x: player.x, y: player.y};
        i -= 30;
        sp = true;
        console.log(spike)
        document.getElementById("spike").innerHTML = "activate spike"
    }else{
        if (sp) {
            document.getElementById("spike").innerHTML = "spike - 30"
            spikeExplosion(spike);
            spike = {x: -100, y: -100};
            sp = false;
            i -= 15;
        }
    }

    move();
});
document.getElementById("laser").addEventListener("click", function () {
    if (i >= 30) {

        enemies = enemies.filter(enemy => {
            return enemy.x !== player.x && enemy.y !== player.y;
        });
        const orange = [];
        for (let i = 0 ;i < 100; i++) {
            if (i === player.x || i === player.y) continue;
            let pidd = toCellId(player.x, i);
            let pcelll = document.getElementById(pidd);
            if (pcelll) pcelll.style.backgroundColor = "orange";
            orange.push(pidd);
            pidd = toCellId(i, player.y);
            pcelll = document.getElementById(pidd);
            if (pcelll) pcelll.style.backgroundColor = "orange";
            orange.push(pidd);
        }
        setTimeout(() => {
            for (let i of orange) {

                let cell = document.getElementById(i);
                if (cell) cell.style.backgroundColor = "white";
            }
        }, 500);
        i -= 30
    }

    move();
})

