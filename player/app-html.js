var $$ = (d) => {return document.querySelectorAll(d)}
var $ = (d) => {return $$(d)[0]}
(function(){
  let elmnt = document.getElementsByClassName('app')[0]
  /*
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {elmnt.innerHTML = this.responseText}
      if (this.status == 404) {elmnt.innerHTML = "Page not found."}
    }
  }    
  xhttp.open("GET", 'player.html', true)
  xhttp.send()
  let htmlELM = new DOMParser().parseFromString(html, 'text/xml')
  document.getElementsByClassName('app')[0].appendChild(htmlELM.firstChild)
  document.getElementsByClassName('app')[0].innerHTML = html
  */

  // ===========================================================
  // ||                GET DATA FROM DEEZER API               ||
  // ===========================================================

  // let xmlhttp=new XMLHttpRequest(),gg,url="https://api.deezer.com/playlist/9095516902";xmlhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){gg=JSON.parse(this.responseText)}};xmlhttp.open("GET",url,true);xmlhttp.send();
  // let d=gg.tracks.data,_i=0,Hh=[];while(_i<d.length){let p=d[_i],r,n=_i+1,t={};if(n<10){r='00'+n}else if(n<100){r='0'+n}else{r=n.toString()}t.src='song_mus_['+r+']',t.id=p.id.toString(),t.name=p.title,t.artist=p.artist.name,t.artist_id=p.artist.id,t.album=p.album.title,t.album_id=p.album.id,t.cover=p.md5_image;Hh.push(t);_i++}console.log('const base =\n'+JSON.stringify(Hh,undefined,3))

  elmnt.innerHTML = /*html*/ `
<div class="player">
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
            <div class="vol-set">
              <a class="icon">
                <i class="bi bi-volume-up-fill"></i>
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
          </div>
          <div class="keyboard"></div>
        </div>
      </div>
      <div class="info" data-list="hidd">
        <div class="cover-cont">
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