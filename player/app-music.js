var mus = {
    song: {},
    t_id: 0,
    f: {},
    a: $('#media_file'),
    v: $('#vid-stream'),
    track_list: document.createElement('select'),
    format: 'mp3',
    online: false
}

window.addEventListener('load', function() {
    mus.track_list.addEventListener('keydown', function(e) {
        console.log(e)
        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault()
        }
    })
    let base = music.tracks
    let url_folder = 'deemix/' + music.folder + '/'

    let minborder = 3
    let aud = mus.a
    mus.f.now = function() {
        let time = new Date(),
            time_time = time.toLocaleTimeString()
            time_mili = time.getMilliseconds()
        return time_time + ':' + time_mili
    }
    mus.f.connection = function() {
        let ig = new Image()
        let d = new Date().getTime()
        ig.crossOrigin = "Anonymous"
        ig.src = 'https://i.ibb.co/kgKCj77/favicon-V2.png?' + d
        ig.addEventListener('load', function() {
            mus.online = true
        })
        ig.addEventListener('error', function(e) {
            mus.online = false
        })

    }
    for (let i = 0; i < base.length; i++) {
        let s_ = base[i]
        let a = document.createElement('a')
        let o = document.createElement('option')
        a.setAttribute('data-id', i)
        a.setAttribute('data-author', s_.artist)
        a.setAttribute('data-album', s_.album_id)
        o.setAttribute('value', i)
        a.innerText = s_.name
        o.innerText = s_.name
        a.addEventListener('click', function() {
            mus.f.playing(i)
        })
        $('.list').appendChild(a)
        mus.track_list.appendChild(o)
    }
    mus.track_list.setAttribute('multiple', '')
    mus.track_list.addEventListener('change', function(e){
        mus.f.playing(e.target.value)
    })
    $('.select').appendChild(mus.track_list)


    mus.f.rgbToHsl = function([r, g, b]) {
        r /= 255, g /= 255, b /= 255
        var max = Math.max(r, g, b), min = Math.min(r, g, b)
        var h, s, l = (max + min) / 2
        if (max == min) {
            h = s = 0
        } else {
            var d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);     
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break
                case g: h = (b - r) / d + 2; break
                case b: h = (r - g) / d + 4; break
            }
            h /= 6
        }
        return [h, s, l]
    }
    mus.f.getsrcCover = function(hex, size) {
        let url = ''
        if (mus.online) {
            url = 'https://e-cdns-images.dzcdn.net/images/cover/' + hex + '/' + size + 'x' + size + '-000000-80-0-0.jpg'
        } else {
            $('#root-css').innerHTML = `:root{--back:white;--backT8:rgba(255,255,255,0.8);--main:#2284d9;--minborder:${minborder}px;}`
            url = 'player/cover.png'
        }
        return url
    }
    mus.f.setPallete = function(url) {
        let i = document.createElement('img')
        i.style.display = 'none'
        i.setAttribute('crossorigin', 'anonymous')
        $('.hidden').appendChild(i)
        i.src = url
        i.addEventListener('load', function() {
            var colorThief = new ColorThief()
            let color = colorThief.getColor(i)
            let back = mus.f.rgbToHsl(color), backT8
            if (back[2] > 0.66) {
                back = 'black'
                backT8 = 'rgba(0, 0, 0, 0.8)'
            } else {
                back = 'white'
                backT8 = 'rgba(255, 255, 255, 0.8)'
            }
            let css = `
                --back: ${back};
                --backT8: ${backT8};
                --main: rgb(${color});
                --minborder: ${minborder}px;
            `
            css = css.replace(/\n +/g, '\n  ')
            $('#root-css').innerHTML = `:root {${css}}`
            setTimeout(function() {
                i.parentNode.removeChild(i)
            }, 1e1)
        })
    }
    mus.f.volume = function(vol, move) {
        aud.volume = vol
        localStorage.setItem('aud-volume-music-player', vol)
        let fixed_vol = Math.round(vol * 100)
        $('.vol-text').innerText = fixed_vol + '%'
        let tip = $('.info-vol')
        $('#vol-tip-msg').innerText = fixed_vol
        tip.classList.add('tip-visible')
        setTimeout(function() {
            tip.classList.remove('tip-visible')
        }, 2e3)
        if (move) {
            setTimeout(function() {
                $('#range-vol').value = Number(vol)
            }, 2e2)
        }
    }
    mus.f.add_volume = function(vol_add) {
        let to_set_vol = aud.volume + vol_add
        to_set_vol = Math.round(to_set_vol * 1e2) / 1e2
        if (to_set_vol > 0 && to_set_vol < 1) {
            mus.f.volume(to_set_vol, true)
        } else if (to_set_vol <= 0) {
            mus.f.volume(0, true)
        } else {
            mus.f.volume(1, true)
        }
    }
    mus.f.recuva_volume = function(){
        if (localStorage['aud-volume-music-player'] !== undefined) {
            let vol = localStorage['aud-volume-music-player']
            setTimeout(function() {
                $('#range-vol').setAttribute('value', Number(vol))
            }, 1e3)
            mus.f.volume(Number(vol), true)
        }
    }
    $('#range-vol').setAttribute('min', '0')
    $('#range-vol').setAttribute('max', '1')
    $('#range-vol').setAttribute('step', '0.01')
    mus.f.seek_relative = function(time) {
        aud.currentTime += time
    }
    mus.f.seek_absolute = function(time) {
        aud.currentTime = time
    }
    $('.progress-bar').addEventListener('click', function(e) {
        let emt = $('.progress-bar')
        let rect = emt.getBoundingClientRect()
        let x = e.clientX - rect.left
        // let y = e.clientY - rect.top
        let total = emt.clientWidth
        total / 2 > x ? x -= minborder : x += minborder
        let toset = x * aud.duration / total
        mus.f.seek_absolute(toset)
    })

    mus.f.inpse
    mus.f.go = function() {
        if (mus.v.paused) {
            // aud.play()
            mus.v.play()
            $('[bt-icon=play]').setAttribute('playing', 'true')
            mus.f.inpse = setInterval(function() {
                mus.f.revisar()
            }, 750)
        } else {
            // aud.pause()
            mus.v.pause()
            $('[bt-icon=play]').setAttribute('playing', 'false')
            clearInterval(mus.f.inpse)
        }
    }
    mus.f.show_settings = function() {
        $('.main').classList.toggle('s_sett')
    }
    mus.f.show_info = function() {
        $('.main').classList.toggle('force_info')
    }
    mus.f.next = function(sum){
        let new_order
        let this_play = $('a.playing')
        let parnt = this_play.parentNode
        let to_add = 0, new_play_e = this_play
        if (sum < 0) {
            while (to_add > sum) {
                if (new_play_e == parnt.firstChild) {
                    new_play_e = parnt.lastChild
                } else {
                    new_play_e = new_play_e.previousElementSibling
                }
                to_add--
            }
        } else {
            while (to_add < sum) {
                if (new_play_e == parnt.lastChild) {
                    new_play_e = parnt.firstChild
                } else {
                    new_play_e = new_play_e.nextElementSibling
                }
                to_add++
            }
        }
        new_order = new_play_e.getAttribute('data-id')
        new_order = Number(new_order)
        // new_order = mus.t_id + sum
        // new_order + 1 > base.length
        //     ? new_order -= base.length
        //     : new_order < 0
        //         ? new_order = base.length + new_order
        //         : new_order = new_order
        mus.f.playing(new_order)
    }
    mus.f.get_mode = function() {
        let attr = 'data-sig'
        let emt = $('[bt-icon=mode]')
        let mode = emt.getAttribute(attr)
        return [emt, mode, attr]
    }
    mus.f.change_mode = function() {
        let mode = mus.f.get_mode()
        if (mode[1] == 'normal') {
            mode[0].setAttribute(mode[2], 'bucle')
        } else if (mode[1] == 'bucle') {
            mode[0].setAttribute(mode[2], 'random')
            mus.f.sortBy('random')
            $('.list').scrollTop = 0
        } else {
            mode[0].setAttribute(mode[2], 'normal')
            mus.f.sortBy('deffff')
        }
    }
    mus.f.siguiente = function() {
        let mode = mus.f.get_mode()
        if (mode[1] == 'normal') {
            mus.f.next(1)
        } else if (mode[1] == 'bucle') {
            mus.f.next(0)
        } else {
            mus.f.next(1)
            // mus.f.next(Math.floor(Math.random() * base.length) + 1)
        }
    }
    mus.f.revisar = function() {
        let cuanto = aud.currentTime * 1e2 / aud.duration
        cuanto = Math.round(cuanto * 1e2) / 1e2
        $("#time").style.width = cuanto + '%'
        if (cuanto > 99) {
            mus.f.siguiente()
        } else {}
        
    }
    mus.f.list = function () {
        let list = $('.info')
        let attr = 'data-list'
        let status = list.getAttribute(attr)
        let show = 'show'
        if (status == show) {
            list.setAttribute(attr, 'hidd')
        } else {
            list.setAttribute(attr, show)
            setTimeout(function() {
                mus.track_list.focus()
            }, 1e2)
        }
    }
    mus.f.mute = function () {
        if (aud.muted) {
            aud.muted = false
            $('.vol-set').setAttribute('data-muted', 'false')
        } else {
            aud.muted = true
            $('.vol-set').setAttribute('data-muted', 'true')
        }
    }
    mus.f.playing = function(id, play) {
        mus.f.connection()
        mus.song = base[id]
        mus.t_id = id
        setTimeout(function() {
            aud.src = url_folder + mus.song.src + '.' + mus.format
            setTimeout(function() {
                mus.f.recuva_volume()
            }, 5e2)
            let the_list = $('.list')
            let element_song = $('[data-id="' + mus.t_id + '"]')
            the_list.childNodes.forEach(function(s){
                s.classList.remove('playing')
            })
            element_song.classList.add('playing')
            let toscroll = element_song.offsetTop
            toscroll = toscroll - $('.header').offsetHeight - minborder * 2 * 3
            the_list.scrollTop = toscroll
            let toSearchOnYoutube = mus.song.artist.toLowerCase() + ' ' + mus.song.name.toLowerCase()
            toSearchOnYoutube = encodeURIComponent(toSearchOnYoutube)
            toSearchOnYoutube = 'https://www.youtube.com/results?search_query=' + toSearchOnYoutube
            $('.data-song').innerHTML = /*html*/ `
    <a target="_blank" href="${toSearchOnYoutube}" class="inf-name">${mus.song.name}</a>
    <a target="_blank" href="https://www.deezer.com/es/artist/${mus.song.artist_id}" class="inf-author">${mus.song.artist}</a>
    <a target="_blank" href="https://www.deezer.com/es/album/${mus.song.album_id}" class="inf-album">${mus.song.album}</a>
            ` 
            setTimeout(function() {
                if (typeof(play) == 'undefined') {
                    mus.v.muted = false
                    mus.v.pause()
                    setTimeout(function() {
                        try {
                            mus.f.go()
                        } catch (error) {
                            console.error(error)
                        }
                    }, 2e2)
                }
                setTimeout(function() {
                    mus.f.gen_picture()
                }, 5e2)
            }, 5e2)

            $$('#cover-bg, #cover-img').forEach(function(s){
                s.setAttribute('src', mus.f.getsrcCover(mus.song.cover, 500))
            })
            mus.f.setPallete(mus.f.getsrcCover(mus.song.cover, 100))
            mus.f.api_media()
        }, 5e2)
    }
    mus.f.sortBy = function(type) {
        let list = $('.list')
        if (type !== 'random') {
            let items = list.childNodes
            let itemsArr = []
            for (let i in items) {
                if (items[i].nodeType == 1) {
                    itemsArr.push(items[i])
                }
            }
            itemsArr.sort(function(a, b) {
                let val_a = '', val_b = ''
                if (type == 'artist') {
                    val_a = a.getAttribute('data-author')
                    val_b = b.getAttribute('data-author')
                } else if (type == 'song') {
                    val_a = a.innerHTML
                    val_b = b.innerHTML
                } else if (type == 'album') {
                    val_a = a.getAttribute('data-album')
                    val_b = b.getAttribute('data-album')
                } else {
                    // order
                    val_a = a.getAttribute('data-id')
                    let complete_repeat_a = 3 - val_a.length
                    while (complete_repeat_a--) {
                        val_a = '0' + val_a
                    }
                    val_b = b.getAttribute('data-id')
                    let complete_repeat_b = 3 - val_b.length
                    while (complete_repeat_b--) {
                        val_b = '0' + val_b
                    }
                }
                return val_a == val_b
                    ? 0
                    : (val_a > val_b ? 1 : -1)
            })
            for (i = 0; i < itemsArr.length; ++i) {
                list.appendChild(itemsArr[i])
            }
        } else {
            let divs = list.children
            let frag = document.createDocumentFragment()
            while (divs.length) {
                frag.appendChild(divs[Math.floor(Math.random() * divs.length)])
            }
            list.appendChild(frag)

            let this_s = $('a.playing')
            this_s.parentNode.removeChild(this_s)
            list.insertBefore(this_s, list.firstChild)
        }
    }
    mus.f.api_media = function() {
        let available = 'mediaSession' in navigator
        if ($('.player').className.includes('no-visible')) {
            if (available) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: "Unknown",
                    artist: "Desconocido",
                    artwork: [{
                        src: "https://i.ibb.co/MBxQ6jB/disk.jpg",
                        sizes: "640x640"
                    }]
                })
            }
        } else {
            if (available) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: mus.song.name,
                    artist: mus.song.artist,
                    album: mus.song.album,
                    artwork: [{
                        src: mus.f.getsrcCover(mus.song.cover, 500),
                        sizes: "500x500"
                    }]
                })
            }
        }
        if (available){
            navigator.mediaSession.setActionHandler('play',function() {mus.f.go()})
            navigator.mediaSession.setActionHandler('pause',function() {mus.f.go()})
            navigator.mediaSession.setActionHandler('seekbackward',function() {mus.f.seek_relative(-5)})
            navigator.mediaSession.setActionHandler('seekforward',function() {mus.f.seek_relative(5)})
            navigator.mediaSession.setActionHandler('previoustrack',function() {mus.f.next(-1)})
            navigator.mediaSession.setActionHandler('nexttrack',function() {mus.f.siguiente()})
        }
    }
    mus.f.blur = function() {
        $('.player').classList.toggle('no-visible')
        mus.f.api_media()
        $('.main').classList.remove('s_sett')
        $('.list').setAttribute('data-list', 'hidd')
    }
    mus.v.addEventListener('play', function() {
        mus.a.play()
    })
    mus.v.addEventListener('pause', function() {
        mus.a.pause()
    })
    mus.v.addEventListener('volumechange', function() {
        // mus.f.volume(mus.v.volume, true)
    })
    mus.f.altpicture = function() {
        if (!document.pictureInPictureElement) {
            mus.v.requestPictureInPicture()
            $('.player').classList.add('pip')
        } else {
            document.exitPictureInPicture()
            $('.player').classList.remove('pip')
        }
    }
    mus.f.gen_picture = async function() {
        
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = 500

        const video = mus.v
        video.srcObject = canvas.captureStream()
        video.play()
        video.muted = true

        const image = new Image()
        image.crossOrigin = true
        image.src = mus.f.getsrcCover(mus.song.cover, 500)
        await image.decode()

        canvas.getContext('2d').drawImage(image, 0, 0, 500, 500)
        video.addEventListener('enterpictureinpicture', function (event) {
            $('.player').classList.add('pip')
        })
        video.addEventListener('leavepictureinpicture', function () {
            $('.player').classList.remove('pip')
        })
        setTimeout(function () {
            if (!!document.pictureInPictureElement) {
                if (aud.paused) {
                    document.pictureInPictureElement.pause()
                } else {
                    document.pictureInPictureElement.play()
                }
            }
        }, 5e2)
    }
    
    mus.f.connection()
    mus.f.playing(0, '')
    mus.v.setAttribute('controls', '')

    $('[bt-icon=list]').addEventListener('click', mus.f.list)
    $('[bt-icon=sett]').addEventListener('click', mus.f.show_settings)
    $('[bt-icon=play]').addEventListener('click', mus.f.go)
    $('#cover-img').addEventListener('click', mus.f.go)
    $('#cover-img').addEventListener('dblclick', mus.f.blur)
    $('[bt-icon=mode]').addEventListener('click', mus.f.change_mode)
    $('[data-set=prev]').addEventListener('click', function() {mus.f.next(-1)})
    $('[data-set=next]').addEventListener('click', mus.f.siguiente)
    $('#range-vol').addEventListener('input', function(e){
        mus.f.volume(e.target.value, false)
    })

    $('[data-set=ord-aut]').addEventListener('click', function() {mus.f.sortBy('artist')})
    $('[data-set=ord-alb]').addEventListener('click', function() {mus.f.sortBy('album')})
    $('[data-set=ord-tit]').addEventListener('click', function() {mus.f.sortBy('song')})
    $('[data-set=ord-dft]').addEventListener('click', function() {mus.f.sortBy('deffff')})
    
    $('[data-set=btn-dwn]').addEventListener('click', function() {
        let src_file = aud.src
        let bt_down = document.createElement('a')
        bt_down.setAttribute('href', src_file)
        bt_down.setAttribute('download', mus.song.artist + ' - ' + mus.song.name + '.' + mus.format)
        bt_down.setAttribute('target', '_blank')
        bt_down.setAttribute('style', 'opacity:0;position:fixed:top:0;left:0;transform:translateY(-100%)')
        bt_down.innerText = 'download'
        $('.background').appendChild(bt_down)
        setTimeout(function() {
            bt_down.click()
            setTimeout(function() {
                bt_down.parentNode.removeChild(bt_down)
            }, 2e2)
        }, 5e2)
    })
    $('[data-set=btn-opn]').addEventListener('click', function() {
        open(aud.src)
    })
    $('[data-set=btn-fsc]').addEventListener('click', function() {
        document.fullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    })
    $('[data-set=btn-pip]').addEventListener('click', mus.f.altpicture)
    $('[data-set=btn-eye]').addEventListener('click', mus.f.blur)
    $('[data-set=btn-inf]').addEventListener('click', mus.f.show_info)
    $('[data-set=muted]').addEventListener('click', mus.f.mute)


    window.addEventListener('keydown', function(e){
        let kc = e.code
        'Space' == kc && mus.f.go()
        'ArrowDown' == kc && mus.f.siguiente()
        'ArrowUp' == kc && mus.f.next(-1)
        'ArrowLeft' == kc && mus.f.seek_relative(-5)
        'ArrowRight' == kc && mus.f.seek_relative(5)
        'NumpadDivide' == kc && e.ctrlKey && mus.f.list()
        'NumpadDecimal' == kc && !e.ctrlKey && mus.f.mute()
        'NumpadMultiply' == kc && !e.ctrlKey && mus.f.blur()
        'NumpadMultiply' == kc && e.ctrlKey && mus.f.show_info()
        'NumpadDecimal' == kc && e.ctrlKey && mus.f.show_settings()
        'NumpadSubtract' == kc && mus.f.add_volume(-0.05)
        'NumpadAdd' == kc && mus.f.add_volume(0.05)
        'KeyM' == kc && e.ctrlKey && mus.f.change_mode()

    })
})