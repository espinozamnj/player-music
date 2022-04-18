// ===========================================================
// ||                GET DATA FROM DEEZER API               ||
// ===========================================================

// if(location.href.includes("playlist")){let playlist=location.href.match(/\d+$/)[0],xmlhttp=new XMLHttpRequest,gg,url="https://api.deezer.com/playlist/"+playlist;xmlhttp.onreadystatechange=function(){if(4==this.readyState&&200==this.status){gg=JSON.parse(this.responseText);let carpet={folder:gg.title.split("- ")[1].split(" ")[0]},d=gg.tracks.data,_i=0,Hh=[];for(;_i<d.length;){let p=d[_i],r,n=_i+1,t={};r=n<10?"00"+n:n<100?"0"+n:n.toString(),t.src="song_mus_["+r+"]",t.id=p.id.toString(),t.name=p.title,t.artist=p.artist.name,t.artist_id=p.artist.id,t.album=p.album.title,t.album_id=p.album.id,t.cover=p.md5_image,Hh.push(t),_i++}carpet.tracks=Hh,console.log("const music = "+JSON.stringify(carpet,void 0,3))}},xmlhttp.open("GET",url,!0),xmlhttp.send()}
// if(location.href.includes("track")){let track=location.href.match(/\d+$/)[0],xmlhttp=new XMLHttpRequest,gg,url="https://api.deezer.com/track/"+track;xmlhttp.onreadystatechange=function(){if(4==this.readyState&&200==this.status){gg=JSON.parse(this.responseText);let carpet={src:"song_mus_[001]",id:gg.id,name:gg.title,artist:gg.artist.name,artist_id:gg.artist.id,album:gg.album.title,album_id:gg.album.id,cover:gg.md5_image};console.log(JSON.stringify(carpet,void 0,3))}},xmlhttp.open("GET",url,!0),xmlhttp.send()}

var $$ = (d) => {return document.querySelectorAll(d)}
var $ = (d) => {return $$(d)[0]}
(function(){
  let elmnt = document.getElementsByClassName('app')[0]
  elmnt.innerHTML = /*html*/ `<div class="player">
  <div class="hidden">
    <style id="root-css"></style>
    <div class="background">
      <img id="cover-bg"/>
    </div>
    <div class="select"></div>
    <audio id="media_file"></audio>
    <video id="vid-stream"></video>
  </div>
  <div class="media">
    <div class="header">
      <div class="menu-icon">
        <a class="icon" bt-icon="list">
        <i class="bi bi-music-note-list"></i>
        </a>
      </div>
      <div class="title-song"></div>
      <div bt-icon="sett">
        <a class="icon">
          <i class="bi bi-three-dots"></i>
        </a>
      </div>
    </div>
    <div class="main">
      <div class="sett">
        <div class="about">
          <div class="vol-control">
            <div class="vol-set" data-muted="false">
              <a class="icon">
                <span data-set="muted">
                  <i class="bi bi-volume-up-fill"></i>
                  <i class="bi bi-volume-mute-fill"></i>
                </span>
                <input type="range" id="range-vol">
                <span class="vol-text"></span>
              </a>
            </div>
          </div>
          <div class="options">
            <a class="icon" data-set="ord-aut">
              <i class="bi bi-person-fill"></i>
              <span>Order by autor</span>
            </a>
            <a class="icon" data-set="ord-alb">
              <i class="bi bi-disc-fill"></i>
              <span>Order by album</span>
            </a>
            <a class="icon" data-set="ord-tit">
              <i class="bi bi-sort-alpha-down"></i>
              <span>Order by title</span>
            </a>
            <a class="icon" data-set="ord-dft">
              <i class="bi bi-list-ul"></i>
              <span>Order by default</span>
            </a>
            <a class="icon" data-set="btn-dwn">
              <i class="bi bi-file-earmark-arrow-down-fill"></i>
              <span>Download</span>
            </a>
            <a class="icon" data-set="btn-opn">
              <i class="bi bi-box-arrow-up-right"></i>
              <span>Open file</span>
            </a>
            <a class="icon" data-set="btn-fsc">
              <i class="bi bi-fullscreen"></i>
              <span>Fullscreen mode</span>
            </a>
            <a class="icon" data-set="btn-pip">
              <i class="bi bi-pip"></i>
              <span>Mini player mode</span>
            </a>
            <!-- <a class="icon" data-set="btn-ytp">
              <i class="bi bi-youtube"></i>
              <span>Search with YouTube</span>
            </a> -->
            <a class="icon" data-set="btn-eye">
              <i class="bi bi-eye-slash-fill"></i>
              <span>Hidden</span>
            </a>
            <a class="icon" data-set="btn-inf">
              <i class="bi bi-info-circle"></i>
              <span>Info</span>
            </a>
          </div>
          <div class="keyboard">
            <div class="shortcut">
              <div class="key-action">Play / Pause</div>
              <div class="key-code"><span>Space</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Next track</div>
              <div class="key-code"><span><i class="bi bi-caret-down-fill"></i></span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Previous track</div>
              <div class="key-code"><span><i class="bi bi-caret-up-fill"></i></span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Backward</div>
              <div class="key-code"><span><i class="bi bi-caret-left-fill"></i></span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Forward</div>
              <div class="key-code"><span><i class="bi bi-caret-right-fill"></i></span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Volumen +</div>
              <div class="key-code"><span>+</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Volumen -</div>
              <div class="key-code"><span>-</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Toggle view list</div>
              <div class="key-code"><span>Ctrl</span><span>/</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Toggle view hidden</div>
              <div class="key-code"><span>*</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Toggle view info</div>
              <div class="key-code"><span>Ctrl</span><span>*</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Toggle view about</div>
              <div class="key-code"><span>Ctrl</span><span>.</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Toogle mute</div>
              <div class="key-code"><span>.</span></div>
            </div>
            <div class="shortcut">
              <div class="key-action">Toogle mode next</div>
              <div class="key-code"><span>Ctrl</span><span>M</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="info" data-list="hidd">
        <div class="cover-cont">
          <div class="info-vol">
            <i class="bi bi-volume-up-fill"></i>
            <span id="vol-tip-msg"></span>
          </div>
          <img id="cover-img" title="double click to hidden">
        </div>
        <div class="data">
          <div class="data-song"></div>
          <div class="list"></div>
        </div>
      </div>
    </div>
    <div class="controls">  
      <div class="progress-bar">
        <span id="time"></span>
      </div>
      <div class="buttons">
        <a class="icon" bt-icon="mode" data-sig="normal">
          <i class="bi bi-arrow-repeat"></i>
          <i class="bi bi-caret-right-square"></i>
          <i class='bi bi-shuffle'></i>
        </a>
        <a class="icon" data-set="prev">
          <i class="bi bi-skip-start-fill"></i>
        </a>
        <a class="icon" bt-icon="play" playing="false">
          <i class='bi bi-play-fill'></i>
          <i class='bi bi-pause-fill'></i>
        </a>
        <a class="icon" data-set="next">
          <i class="bi bi-skip-end-fill"></i>
        </a>
      </div>
    </div>
  </div>
</div>`
})()