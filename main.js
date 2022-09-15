let bgImages = [
    'images/fullband1.png',
    'images/fullband2.png',
    'images/fullband3.png',
    'images/fullband4.png',
    'images/fullband5.png',
];

let imgCount = bgImages.length;

let img = document.getElementById("img");

function randImg() {
    let randnum = Math.floor(Math.random() * imgCount);
    img.style.backgroundImage = 'url("' + bgImages[randnum] + '")';
}

randImg();