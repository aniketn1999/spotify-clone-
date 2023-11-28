// creating variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let gif = document.getElementById('gif')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'))
let myProgressBar = document.getElementById('myProgressBar')
let next = document.getElementById('next') 
let previous = document.getElementById('previous') 
// console.log(songItemPlay);


let songs = [
    {songName: "Annihilate - Metro Booming", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Calling", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Cupid", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "funny laugh", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "The homeless", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Parado", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Self love", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sunflower", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "All the way live", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Under the influence", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// handling play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})

// Handling progress bar
audioElement.addEventListener('timeupdate', () => {
    progress = (audioElement.currentTime/audioElement.duration)*100
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100
})

// handling songs lists functionalities
songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
});




const makeAllPlays = () => {
    songItemPlay.forEach((element, i) => {
        element.classList.remove('fa-pause-circle') 
        element.classList.add('fa-play-circle')
    });
}

songItemPlay.forEach((element, i) => {
    element.addEventListener('click', (e) => {
        // console.log(element);
        // console.log(e.target);
        makeAllPlays()
        songIndex = parseInt(element.id)
        element.classList.remove('fa-play-circle')
        element.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex + 1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
        masterSongName.innerText = songs[i].songName
        // console.log(songIndex);
        // songs[i].songName.style. = 'green';
    })
});

// Handling next/prev click
const nextSong = (e) => {
    songIndex = (songIndex + 1) % songs.length
    // console.log(songIndex);
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
    masterSongName.innerText = songs[songIndex].songName
    songItemPlay.forEach((element, i) => {
    console.log(parseInt(element.id));
    });
}
next.addEventListener('click', nextSong)

audioElement.addEventListener('ended', nextSong)

previous.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length)%songs.length
    // console.log(songIndex);
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity = 1
    masterSongName.innerText = songs[songIndex].songName
})