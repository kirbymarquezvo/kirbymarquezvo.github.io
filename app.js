var audio = document.getElementById('audio-player');
var interval = null
var progressBar = document.getElementById('name-progress')
var playButton = document.getElementById('play-button')
var pauseButton = document.getElementById('pause-button')
var progressSlider = document.getElementById('name-container')

var getProgress = function() {
  return (audio.currentTime / audio.duration) * 100
}

var onPlay = function() {
  playButton.classList.add('hidden')
  pauseButton.classList.remove('hidden')

  interval = setInterval(function() {
    progressBar.style.width = getProgress() + '%'
  }, 200)
}

var onPause = function() {
  playButton.classList.remove('hidden')
  pauseButton.classList.add('hidden')

  clearInterval(interval)
}

var startPlayback = function() {
  audio.play()
}

var stopPlayback = function() {
  audio.pause()
}

var setPlayback = function(e) {
  var rect = progressSlider.getBoundingClientRect()

  var durationZero = rect.left
  var endDuration = rect.right - durationZero

  var desiredDuration = (e.clientX - durationZero) / endDuration

  audio.currentTime = Math.round(desiredDuration * audio.duration)

  stopPlayback()
  startPlayback()
}

var checkFinished = function() {
  if (getProgress() === 100) {
    stopPlayback()
    audio.currentTime = 0
  }
}

playButton.addEventListener('click', startPlayback)
pauseButton.addEventListener('click', stopPlayback)
progressSlider.addEventListener('click', setPlayback)
audio.addEventListener('timeupdate', checkFinished)
audio.addEventListener('play', onPlay)
audio.addEventListener('pause', onPause)
