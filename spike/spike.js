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
    if (i >= 60){
        let num = Math.floor(Math.random() * 100) + 1;
        let num2 = Math.floor(Math.random() * 100) +1;
        player = {x: num, y: num2};
        i -= 60
        move()
    }
})
function spikeExplosion(center) {
    let positions = [];

    for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            positions.push({
                x: center.x + dx,
                y: center.y + dy
            });
        }
    }

    enemies = enemies.filter(enemy => {
        return !positions.some(p => p.x === enemy.x && p.y === enemy.y);
    });
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
            spike = null;
            sp = false;
            i -= 15
        }
    }

    move();
});
document.getElementById("laser").addEventListener("click", function () {
    if (i >= 30) {

        enemies = enemies.filter(enemy => {
            return enemy.x !== player.x && enemy.y !== player.y;
        });
        i -= 30
    }
    move();
})
