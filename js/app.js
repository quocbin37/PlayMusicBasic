const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd =$('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next'); 
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

    const app = {
      isphaying: false,
      currentIndex: 0,
      israndom : false,
      songs : [
        {
            name: 'Anh Là Ai',
            singger: 'Dick DT',
            path: './assets/music/AnhLaAi.mp3',
            image: './assets/img/AnhLaAi.jpg'
        },
        {
            name: 'Cầu Vòng Khuyểt',
            singger: 'Tuấn Hưng',
            path: './assets/music/CauVongKhuyet.mp3',
            image: './assets/img/CauVongKhuyet.jpg'
        },
        {
            name: 'Chiếc Khăn Gió Ấm',
            singger: 'Tuấn Hưng',
            path: './assets/music/ChiecKhanGioAm.mp3',
            image: './assets/img/ChiecKhanGioAm.jpg'
        },
        {
            name: 'Chưa Bao Giờ',
            singger: 'Minh Su',
            path: './assets/music/ChuaBaoGio.mp3',
            image: './assets/img/ChuaBaoGio.jpg'
        },
        {
            name: 'Đỉnh Núi tuyết Của Nuối Tiếc',
            singger: 'Đạt Maniac',
            path: './assets/music/DinhNuiTuyetCuaNuoiTiec.mp3',
            image: './assets/img/DinhNuiTuyetCuaNuoiTiec.jpg'
        },
        {
            name: 'Dù Con Đã Khôn Lớn',
            singger: 'Juno',
            path: './assets/music/DuConDaKhonLon.mp3',
            image: './assets/img/DuConDaKhonLon.jpg'
        },
        {
            name: 'Nấu Ăn Cho Em',
            singger: 'Đen Vâu',
            path: './assets/music/NauAnChoEm.mp3',
            image: './assets/img/NauAnChoEm.jpg'
        },
        {
            name: 'Sống Cho Hết Đời Thanh Xuân',
            singger: 'Đạt Maniac',
            path: './assets/music/SongChoHetDoiThanhXuan.mp3',
            image: './assets/img/SongChoHetDoiThanhXuan.jpg'
        },
        {
            name: 'Sống Cho Hết Đời Thanh Xuân 2',
            singger: 'Đạt Maniac',
            path: './assets/music/SongChoHetDoiThanhXuan2.mp3',
            image: './assets/img/SongChoHetDoiThanhXuan2.jpg'
        },
        {
            name: 'Thiên Hà Trước Hiên Nhà',
            singger: 'Đạt Maniac',
            path: './assets/music/ThienHaTruocHienNha.mp3',
            image: './assets/img/ThienHaTruocHienNha.jpg'
        },
        {
            name: 'Vi Yêu Cứ Đâm Đầu',
            singger: 'Đen Vâu - Min',
            path: './assets/music/ViYeuCuDamDau.mp3',
            image: './assets/img/ViYeuCuDamDau.jpg'
        },

      ],
      render: function(){
        const htmls = this.songs.map((song,index) =>{
          return `
            <div class="song ${index === this.currentIndex ? 'active' :''}" data-index=${index}>  
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singger}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
          `
      })
      playlist.innerHTML = htmls.join('');
    },
    definedProperties: function(){
       Object.defineProperty(this, 'currentSong', {
         get: function(){
           return this.songs[this.currentIndex];
         }
       })
    },
    handleEvents: function(){
  
      const cdWidth = cd.offsetWidth;
      
      //xu ly cd quay / dung
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ],{
        duration: 10000, //10 seconds
        iterations: Infinity
      })
      cdThumbAnimate.pause();
      //xu ly thu to nho
      document.onscroll = function(){
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdWidth;
      }
      // xuw ly nut play
      playBtn.onclick =function(){
        if (app.isphaying){
        audio.pause();     
      
      }
      else { 
        audio.play();      
      }
    }
    //khi nut play duoc click
    audio.onplay = function(){
      app.isphaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    
    }
    //khi nut pause duoc click
    audio.onpause = function(){
      app.isphaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    //khi tien do bai hat thay doi
    audio.ontimeupdate = function(){
     if (audio.duration){
       const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
       progress.value = progressPercent;
     }
      
    }
    //xu ly khi tua song
    progress.oninput  = function(e){
      const seekTime = audio.duration / 100 * e.target.value;
      audio.currentTime = seekTime;
    }
    //khi next bai hat
    nextBtn.onclick = function(){
      if (app.israndom){
        app.randomPlay();
        audio.play();
        app.render();
        app.scrollToActiveSong();

      }
      else{
        app.nextSong();
        audio.play();
        app.render();
        app.scrollToActiveSong();
      }
    
    }
    //khie prev bai hat
    prevBtn.onclick = function(){
      if (app.israndom){
        app.randomPlay();
        audio.play();
        app.render();
        app.scrollToActiveSong();

      }
      else{
        app.prevSong();
        audio.play();
        app.render();
        app.scrollToActiveSong();
 
    }
    }
    // random
    randomBtn.onclick = function(){
      app.israndom = !app.israndom;
      randomBtn.classList.toggle('active', app.israndom);
    }
    //xu ly khi audio ended
    audio.onended = function(){
      if (app.isrepeat){
        audio.play();
      }
      else if (app.israndom){
        app.randomPlay();
        audio.play();
      }
      else{
        app.nextSong();
        audio.play();
      }
    }
    //xu ly khi repeat
    repeatBtn.onclick = function(){
      app.isrepeat = !app.isrepeat;
      repeatBtn.classList.toggle('active');
    }
    // click vao thi nghe nhac
    playlist.onclick =function (e){
      const songNode =e.target.closest('.song:not(.active)')
      if (songNode ||e.target.closest('.option') )
    {
      //xử lý khi bấm vào song
         
      if (songNode){
        bin=Number(songNode.getAttribute('data-index'))
        app.currentIndex =bin
        app.loadCurrentSong();
        app.render()   
        audio.play()
           
      }

      //xử lý khi bấm vào song option
      if (e.target.closest('.option') ){

      }
      }
    }
  },
    
    loadCurrentSong: function(){
     

      heading.textContent = this.currentSong.name;
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src = this.currentSong.path;


    },
    nextSong: function(){
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length){
        this.currentIndex = 0;
      }
     
      this.loadCurrentSong();
    },
    prevSong: function(){
      this.currentIndex--;
      if (this.currentIndex < 0){
        this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    },
    randomPlay: function(){
      let newIndex;
      newIndex = Math.floor(Math.random() * this.songs.length);
      do{
        newIndex = Math.floor(Math.random() * this.songs.length);
      }
      while(newIndex === this.currentIndex);
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },
    scrollToActiveSong: function (){
        setTimeout(()=>
        {
            $('.song.active').scrollIntoView(
              {
                behavior: 'smooth',
                block:'nearest'
              }
            );
        },370)
    },
      start: function(){
        // Dinh nghia cac thuoc tinh cho object
        this.definedProperties();
        // Lang nghe xu ly cac su kien
        this.handleEvents();
        // Render playlist
        this.render();
        // Load bai hat hien tai
        this.loadCurrentSong();
      
      },
       
    }
    app.start();