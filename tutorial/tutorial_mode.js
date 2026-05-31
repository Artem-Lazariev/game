let enemies = [
    {x: 25, y: 25},
    {x: 25, y: 50},
    {x: 25, y: 75},
    {x: 50, y: 25},
    {x: 75, y:25},
    {x:75, y:50},
    {x:75, y:75},
    {x:50, y:75},
    {x:25, y:75},
]
let color = []
let spike = {x: -100, y: -100}
let st = true;
let sp = false
let i = 100000000;

let mov2 = 1
let mov = 1;
let targ = {x: 0, y: 0}
let table = document.getElementById("grid");
let teleport = {x: 50, y: 50}
let score = 0;
let player = { x: 50, y: 50 };



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



        // телепорт рухається іноді

        // рух гравця
        player.x = Math.max(0, Math.min(99, player.x));
        player.y = Math.max(0, Math.min(99, player.y));

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
document.getElementById("c").addEventListener("click", function () {
    if (i >= 30) {
        let p = {...player};

        // Масив точок кругового вибуху навколо гравця
        let positions = [
            {x: p.x - 1, y: p.y},     {x: p.x + 1, y: p.y},
            {x: p.x,     y: p.y - 1}, {x: p.x,     y: p.y + 1},
            {x: p.x + 1, y: p.y + 1}, {x: p.x - 1, y: p.y - 1},
            {x: p.x + 1, y: p.y - 1}, {x: p.x - 1, y: p.y + 1}
        ];

        // Фільтруємо ворогів (видаляємо тих, хто потрапив під вибух)
        enemies = enemies.filter(enemy => {
            return !positions.some(pos => pos.x === enemy.x && pos.y === enemy.y);
        });

        i -= 30;

        // Цикл №1: Фарбуємо в помаранчевий тільки ті ID, які реально існують
        for (let pos of positions) {
            let cell = document.getElementById(toCellId(pos.x, pos.y));
            if (cell) {
                cell.style.backgroundColor = "orange";
            }
        }

        // Цикл №2: Через 500мс повертаємо білий колір
        setTimeout(() => {
            for (let pos of positions) {
                let cell = document.getElementById(toCellId(pos.x, pos.y));
                if (cell) {
                    cell.style.backgroundColor = "white";
                }
            }
        }, 500);
    }

    move();
});
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
    let p = {...center};

    // Твої 8 точок навколо центру вибуху
    let positions = [
        {x: p.x - 1, y: p.y},     {x: p.x + 1, y: p.y},
        {x: p.x,     y: p.y - 1}, {x: p.x,     y: p.y + 1},
        {x: p.x + 1, y: p.y + 1}, {x: p.x - 1, y: p.y - 1},
        {x: p.x + 1, y: p.y - 1}, {x: p.x - 1, y: p.y + 1}
    ];

    // Фільтрація ворогів (твоя логіка, працює ідеально)
    enemies = enemies.filter(enemy => {
        return !positions.some(pos => pos.x === enemy.x && pos.y === enemy.y);
    });

    // ОПТИМІЗАЦІЯ №1: Фарбуємо в помаранчевий через один цикл із перевіркою ID
    for (let pos of positions) {
        let cell = document.getElementById(toCellId(pos.x, pos.y));
        if (cell) {
            cell.style.backgroundColor = "orange";
        }
    }

    // ОПТИМІЗАЦІЯ №2: Повертаємо білий колір через 500мс теж через один цикл
    setTimeout(() => {
        for (let pos of positions) {
            let cell = document.getElementById(toCellId(pos.x, pos.y));
            if (cell) {
                cell.style.backgroundColor = "white";
            }
        }
    }, 500);
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

