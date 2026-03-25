
let q =document.getElementById("q")
let a =document.getElementById("a")
let w =document.getElementById("w")
let e =document.getElementById("e")
let s =document.getElementById("s")
let d =document.getElementById("d")
q.addEventListener("mouseenter",function(){
    q.style.width = "60px"
    q.style.height = "60px"
    q.innerHTML = "q - use teleport"
    w.style.display = "none"
    e.style.display = "none"
})
q.addEventListener("mouseleave",function(){
    q.style.width = "20px"
    q.style.height = "20px"
    q.innerHTML = "q"
    w.style.display = "flex"
    e.style.display = "flex"
})
w.addEventListener("mouseenter",function(){
    w.style.width = "60px"
    w.style.height = "60px"
    w.innerHTML = "w - move up"
    q.style.display = "none"
    e.style.display = "none"
})
w.addEventListener("mouseleave",function(){
    w.style.width = "20px"
    w.style.height = "20px"
    w.innerHTML = "w"
    q.style.display = "flex"
    e.style.display = "flex"
})
e.addEventListener("mouseenter",function(){
    e.style.width = "60px"
    e.style.height = "60px"
    e.innerHTML = "e - move teleport"
    q.style.display = "none"
    w.style.display = "none"
})
e.addEventListener("mouseleave",function(){
    e.style.width = "20px"
    e.style.height = "20px"
    e.innerHTML = "e"
    q.style.display = "flex"
    w.style.display = "flex"
})
a.addEventListener("mouseenter",function(){
    a.style.width = "60px"
    a.style.height = "60px"
    a.innerHTML = "a - move left"
    d.style.display = "none"
    s.style.display = "none"
})
a.addEventListener("mouseleave",function(){
    a.style.width = "20px"
    a.style.height = "20px"
    a.innerHTML = "a"
    d.style.display = "flex"
    s.style.display = "flex"
})
d.addEventListener("mouseenter",function(){
    d.style.width = "60px"
    d.style.height = "60px"
    d.innerHTML = "d - move right"
    a.style.display = "none"
    s.style.display = "none"
})
d.addEventListener("mouseleave",function(){
    d.style.width = "20px"
    d.style.height = "20px"
    d.innerHTML = "d"
    a.style.display = "flex"
    s.style.display = "flex"
})
s.addEventListener("mouseenter",function(){
    s.style.width = "60px"
    s.style.height = "60px"
    s.innerHTML = "s - move down"
    a.style.display = "none"
    d.style.display = "none"
})
s.addEventListener("mouseleave",function(){
    s.style.width = "20px"
    s.style.height = "20px"
    s.innerHTML = "s"
    a.style.display = "flex"
    d.style.display = "flex"
})
