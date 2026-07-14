const small_menu = document.getElementById('yt_menu_btn');
const menu_reveal = document.getElementById('yt_menu');
const menu = document.getElementById('menu');
const navElements = document.getElementById('nav_elements');

function moreOpen() {
    if(menu_reveal.style.display === 'flex'){
        menu_reveal.style.display = 'none';
    } else {
        menu_reveal.style.display = 'flex';
    }
    
}

let song_name;
let song_type;
let song_artist;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');

const current = document.getElementById('current');
const duration = document.getElementById('duration');

let playing = false;

// play & pause

playBtn.onclick = () => {
    if(playing){
        audio.pause();
        playBtn.innerHTML = '▶';
    } else {
        audio.play();
        playBtn.innerHTML = '❚❚'
    }

    playing = !playing;
}

//Duration
audio.addEventListener('loadedmetadata', ()=>{
    progress.max = Math.floor(audio.duration);

    duration.innerHTML = format(audio.duration);
});

// update progress
audio.addEventListener("timeupdate", ()=> {
    progress.value = Math.floor(audio.currentTime);

    current.innerHTML = format(audio.currentTime);
});

// Seek

progress.oninput = ()=> {
    audio.currentTime = progress.value;
};

// Song End
audio.onended = ()=> {
    playing = false;

    playBtn.innerHTML = '▶';
};

// Format Time
function format(time){
    let min = Math.floor(time/60);

    let sec = Math.floor(time%60);

    if (sec<10) sec = '0'+sec;

    return min+":"+sec
}

audio.addEventListener('timeupdate', ()=> {
    progress.value = audio.currentTime;

    const percent = (audio.currentTime / audio.duration) * 100;

    progress.style.background =
        `linear-gradient(to right,
        #22c55e 0%,
        #22c55e ${percent}%,
        #444444c4 ${percent}%,
        #444 100%)`;
});


const song_Title = document.getElementById("song_Title");
const song_Artist = document.getElementById("song_Artist");

function loadSong(title, artist, src) {

    audio.src = src;
    audio.load();

    song_Title.textContent = title;
    song_Artist.textContent = artist;

    progress.value = 0;
    current.textContent = "0:00";

    audio.play();

    playing = true;
    playBtn.innerHTML = "❚❚";
}

// function loadSong(title, artist, src) {

//     audio.pause();

//     playing = false;
//     playBtn.innerHTML = "▶";

//     audio.src = src;
//     audio.load();

//     song_Title.textContent = title;
//     song_Artist.textContent = artist;

//     progress.value = 0;
//     current.textContent = "0:00";
// }

const trackCards = document.querySelectorAll(".track_card");

trackCards.forEach(card => {

    card.addEventListener("click", () => {

        // Reset all play icons
        document.querySelectorAll(".play_track").forEach(btn => {
            btn.textContent = "▶";
        });

        // Change only clicked track icon
        card.querySelector(".play_track").textContent = "❚❚";

        // Get the clicked track
        const track = card.querySelector(".track");

        // Load song
        loadSong(
            track.dataset.title,
            track.dataset.artist,
            track.dataset.src
        );

    });

});


// const songTitle = document.getElementById('songTitle');
// const songArtist = document.getElementById('songArtist');
// const playTrack = document.getElementById('play_track');

// function loadSong(title, artist, src) {

//     audio.pause();

//     playing = false;
//     playBtn.innerHTML = '▶';

//     playTrack.innerHTML = '❚❚';

//     audio.src = src;
//     audio.load();

//     song_Title.textContent = title;
//     song_Artist.textContent = artist;

//     progress.value = 0;
//     current.textContent = "0:00"

// }

// const tracks = document.querySelectorAll('.track');

// tracks.forEach(track => {
//     track.addEventListener("click", () => {
//         loadSong(
//             track.dataset.title,
//             track.dataset.artist,
//             track.dataset.src
//         );
//     });
// });

// const trackCards = document.querySelectorAll('.track_card')

// trackCards.forEach(card => {
//     card.addEventListener("click", ()=> {
//         document.querySelectorAll(".play_track").forEach(btn => {
//             btn.textContent = "▶";
//         });

//         card.querySelector(".play_track").textContent = "❚❚";

//         const track = card.querySelector('.track');

//         loadSong(
//             track.dataset.title,
//             track.dataset.artist,
//             track.dataset.src
//         );
//     });
// });