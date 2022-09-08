let side = document.getElementById('side');
let btn = document.getElementById('btn');
let ulList = document.getElementById('ulList')


btn.onclick = function() {
    side.classList.toggle('hideSidebar');
    ulList.classList.toggle('hideUlLink');
}