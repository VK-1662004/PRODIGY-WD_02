document.addEventListener('DOMContentLoaded', function () {
  const playButton = document.querySelector('.play');
  const resetButton = document.querySelector('.reset');
  const lapButton = document.querySelector('.lap');
  const lapsList = document.querySelector('.laps');
  const minDisplay = document.querySelector('.text.min');
  const secDisplay = document.querySelector('.text.sec');
  const msecDisplay = document.querySelector('.text.msec');

  let timer;
  let isRunning = false;
  let isPlay = false;
  let seconds = 0;
  let milliseconds = 0;
  let laps = [];

  playButton.addEventListener('click', play);
  resetButton.addEventListener('click', reset);
  lapButton.addEventListener('click', lap);

  function play() {
      if (!isPlay) {
          playButton.innerHTML = 'Pause';
          timer = setInterval(updateTimer, 10);
          isPlay = true;
      } else {
          playButton.innerHTML = 'Play';
          clearInterval(timer);
          isPlay = false;
      }
      toggleButton();
  }
  

  function reset() {
      playButton.innerHTML = 'Play';
      clearInterval(timer);
      isPlay = false;
      seconds = 0;
      milliseconds = 0;
      laps = [];
      updateDisplay();
      updateLaps();
      toggleButton();
  }

  function lap() {
      laps.push(formatTime(seconds, milliseconds));
      updateLaps();
  }

  function updateTimer() {
      milliseconds += 10;
      if (milliseconds === 1000) {
          milliseconds = 0;
          seconds++;
      }
      updateDisplay();
  }

  function updateDisplay() {
      minDisplay.innerText = pad(Math.floor(seconds / 60));
      secDisplay.innerText = pad(seconds % 60);
      msecDisplay.innerText = pad(milliseconds);
  }

  function updateLaps() {
      lapsList.innerHTML = '';
      laps.forEach((lap, index) => {
          const li = document.createElement('li');
          li.innerText = `Lap ${index + 1}: ${lap}`;
          lapsList.appendChild(li);
      });
  }

  function toggleButton() {
      lapButton.classList.toggle('hidden');
      resetButton.classList.toggle('hidden');
  }

  function formatTime(seconds, milliseconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return (
          pad(minutes) + ' : ' +
          pad(remainingSeconds) + ' : ' +
          pad(milliseconds)
      );
  }

  function pad(value) {
      return value < 10 ? '0' + value : value;
  }
  
});
