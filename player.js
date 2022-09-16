let now_playing = document.querySelector('.now-playing');
let video_name = document.querySelector('.video-name');

let playpause_btn = document.querySelector('.playpause-video');
let next_btn = document.querySelector('.next-video');
let prev_btn = document.querySelector('.prev-video');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_video = document.createElement('video');

let video_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const video_list = [
    {
        bg: 'images/colossus.png',
        img: 'images/colossus.png',
        name: 'Colossus',
        video: 'videos/cave.mp4'
    },
    {
        bg: 'images/axial-flux.png',
        img: 'images/axial-flux.png',
        name: 'Axial Flux',
        video: 'videos/forest.mp4'
    },
    {
        bg: 'images/baal-hammon.png',
        img: 'images/baal-hammon.png',
        name: 'Ba`al Hammon',
        video: 'videos/moon.mp4'
    },
    {
        bg: 'images/anubis.png',
        img: 'images/anubis.png',
        name: 'Anubis',
        video: 'videos/sunrise.mp4'
    },
    {
        bg: 'images/leviathan.png',
        img: 'images/leviathan.png',
        name: 'Leviathan',
        video: 'videos/auroa.mp4'
    }
];

loadVideo(video_index);

function loadVideo(video_index) {
    clearInterval(updateTimer);
    reset();

    curr_video.src = video_list[video_index].video;
    curr_video.load();

    // document.body.style.backgroundImage = "url(" + video_list[video_index].bg + ")";
    video_name.textContent = video_list[video_index].name;
    //now_playing.textContent = "Playing video " + (video_index + 1) + " of " + video_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_video.addEventListener('ended', nextVideo);
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomVideo() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatVideo() {
    let current_index = video_index;
    loadVideo(current_index);
    playVideo();
}
function playpauseVideo() {
    isPlaying ? pauseVideo() : playVideo();
}
function playVideo() {
    curr_video.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}
function pauseVideo() {
    curr_video.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}
function nextVideo() {
    if (video_index < video_list.length - 1 && isRandom === false) {
        video_index += 1;
    } else if (video_index < video_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * video_list.length);
        video_index = random_index;
    } else {
        video_index = 0;
    }
    loadVideo(video_index);
    playVideo();
}
function prevVideo() {
    if (video_index > 0) {
        video_index -= 1;
    } else {
        video_index = video_list.length - 1;
    }
    loadVideo(video_index);
    playVideo();
}
function seekTo() {
    let seekto = curr_video.duration * (seek_slider.value / 100);
    curr_video.currentTime = seekto;
}
function setVolume() {
    curr_video.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_video.duration)) {
        seekPosition = curr_video.currentTime * (100 / curr_video.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_video.currentTime / 60);
        let currentSeconds = Math.floor(curr_video.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_video.duration / 60);
        let durationSeconds = Math.floor(curr_video.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}