	// these are controles and song name and img
	const play = document.getElementById("play");
	const music = document.querySelector('audio');
	const img = document.querySelector('.bigImg');
	const artist = document.querySelector('.artist-name');
	const title = document.querySelector('.song-name');
	const prev = document.getElementById('prev');
	const next = document.getElementById('next');


	// these are progress and timing and duration components
	let progress = document.getElementById('progress');
	let total_duration = document.getElementById('duration');
	let current_time = document.getElementById('current-time');
	const progress_bar = document.getElementById('progress-div');

	// modal components
	const modal = document.getElementById("myModal");
	const listBox = document.getElementById("box1");
	const getlist = document.getElementById("list");
	const closebtn = document.getElementById("close1");
	const songsList = document.querySelector(".songs-list");


    //object containing songs info
    const songs = [
    {
    	name:'object-1',
    	title:'Scam 1998',
    	artist:'Achint Thakkar'
    },
    {
    	name:'object-2',
    	title:'Butter',
    	artist:'BTS'
    },
    {
    	name:'object-3',
    	title:'Light Switch',
    	artist:'Charlie Puth'
    },
    {
    	name:'object-4',
    	title:'Industry Baby',
    	artist:'Lil Nas X'
    },
    {
    	name:'object-5',
    	title:'Love Me',
    	artist:'Ellie Goulding'
    },
    {
    	name:'object-6',
    	title:'Baby',
    	artist:'Justin Bieber'
    },
    {
    	name:'object-7',
    	title:'The Specture',
    	artist:'Allen Walker'
    },
    {
    	name:'object-8',
    	title:'Women',
    	artist:'Doja Cat'
    },
    {
    	name:'object-9',
    	title:'Lavitating',
    	artist:'Dua Lipa'
    }
    ];

	// by default song is pausd
	let isPlaying = false;

	// for play function
	const playMusic = () => {
		isPlaying = true;
		music.play();
		play.classList.replace ("uil-play","uil-pause");
		img.classList.add("anime");
	}

	// for pause function
	const pauseMusic = () => {
		isPlaying = false;
		music.pause();
		play.classList.replace ("uil-pause","uil-play");
		img.classList.remove("anime");
	}


	play.addEventListener('click',()=>{
		if (isPlaying) {
			pauseMusic();
		}else{
			playMusic();
		}
	})

	//changing the music data

	const loadSong = (song)=>{
		title.textContent = song.title;
		artist.textContent = song.artist;
		img.src = "images/"+song.name+".png";
		music.src = "music/"+song.name+".mp3";
	}

	var songIndex = 0;

	const nextSong = () =>{
		songIndex = (songIndex + 1) % songs.length;
		loadSong(songs[songIndex]);
		playMusic();
	}

	const prevSong = () =>{
		songIndex = (songIndex - 1 + songs.length) % songs.length;
		loadSong(songs[songIndex]);
		playMusic();
	}

	// js work for progress
	music.addEventListener('timeupdate',(event)=>{
		const {currentTime,duration} = event.srcElement;
		let progress_time = (currentTime / duration) * 100;
		progress.style.width = `${progress_time}%`;

		// for duration work

		let min_duration = Math.floor( duration / 60 );
		let sec_duration = Math.floor(duration % 60);

		if ( sec_duration < 10) {
			let tot_duration = `${min_duration}:0${sec_duration}`;
			if (duration) {
				total_duration.textContent = `${tot_duration}`;
			}
		}else{
			let tot_duration = `${min_duration}:${sec_duration}`;
			if (duration) {
				total_duration.textContent = `${tot_duration}`;
			}
		}

		

	    //this id for current time
	    let min_currentTime = Math.floor(currentTime / 60);
	    let sec_currentTime = Math.floor(currentTime % 60);

	    if ( sec_currentTime<10) {
	    	let tot_currentTime = `${min_currentTime}:0${sec_currentTime}`;
	    	current_time.textContent = `${tot_currentTime}`;
	    }else{
	    	let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
	    	current_time.textContent = `${tot_currentTime}`;
	    }
	})

	// progress onclick functnality
	progress_bar.addEventListener('click',(event)=>{
		const {duration} = music;
		let change_currentTime = (event.offsetX / event.srcElement.clientWidth)*duration;
		music.currentTime = change_currentTime;
		
	})

	// turn on next song if current song ends
	music.addEventListener('ended',nextSong);


	// songs changing by controles 
	next.addEventListener('click',nextSong);
	prev.addEventListener('click',prevSong);



	// this javacript is for modal

	// to open playlist modal
	getlist.onclick=function() {
		modal.style.display="flex";
		listBox.style.display="block";
	}

    // to close the modal    
    closebtn.onclick = function(){
    	modal.style.display="none";
    	listBox.style.display="none";
    }


    //this is for creating and putting songs into the plalist

    for (let i = 0; i < songs.length; i++) {
    	const thisSong = songs[i];
    	songsList.innerHTML = songsList.innerHTML+'<div no="'+i+'" class="song-box"><img src="images/'+thisSong.name+'.png" class="list-song-img"><span class="list-song-text-box"><div class="list-song-title">'+thisSong.title+'</div><div class="list-song-artist">'+thisSong.artist+'</div></span></div>'
    }


    // i am initializing this here because i cant declare it before creation in above for loop i created this elements
    const listSongs = document.querySelectorAll(".song-box");

    listSongs.forEach(element => {
    	element.addEventListener('click',()=>{
    		loadSong(songs[element.getAttribute("no")]);
    		modal.style.display="none";
    		listBox.style.display="none";
    		playMusic();
    		songIndex = element.getAttribute("no");
    	})
    });


