// ----- Sequencer -----

class Sequencer {
  constructor() {
    this.boxes = document.querySelectorAll(".box");
    this.playButton = document.querySelector(".play");
    this.kickSound = document.querySelector(".kick-sound");
    this.clapSound = document.querySelector(".clap-sound");
    this.openHatSound = document.querySelector(".open-hat-sound");
    this.closedHatSound = document.querySelector(".closed-hat-sound");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activateBox() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 16;
    const activeBoxes = document.querySelectorAll(`.b${step}`);
    // Looping over the boxes

    activeBoxes.forEach((bar) => {
        
      if (bar.classList.contains("active")) {
        bar.style.animation = `playTrackActive 0.3s alternate ease-in-out 2`;

        if (bar.classList.contains("open-hat-box")) {
          this.openHatSound.currentTime = 0;
          this.openHatSound.play();
        }
        if (bar.classList.contains("closed-hat-box")) {
          this.closedHatSound.currentTime = 0;
          this.closedHatSound.play();
        }
        if (bar.classList.contains("clap-box")) {
          this.clapSound.currentTime = 0;
          this.clapSound.play();
        }
        if (bar.classList.contains("kick-box")) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
      } else {
        bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      }

    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    //check if it's playing
    if (this.isPlaying) {
      //clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateBtn() {
    if (this.isPlaying) {
      this.playButton.innerHTML = '<i class="fas fa-stop"></i>';
      this.playButton.classList.add("active");
    } else if (this.isPlaying === null) {
      this.playButton.innerHTML =
        '<i class="fa fa-play" aria-hidden="true"></i>';
      this.playButton.classList.remove("active");
    }
  }

  changeTempo(e) {
    const tempoVal = document.querySelector(".tempo-val");
    tempoVal.innerText = e.target.value;
  }

  updateTempo(e) {
    // We need to clear interval and start again the sequencer
    // for it to change bpm and interval

    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const sequencer = new Sequencer();

// ----- EVENT LISTENERS -----

sequencer.boxes.forEach((box) => {
  box.addEventListener("click", sequencer.activateBox);
  box.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

sequencer.playButton.addEventListener("click", function () {
  sequencer.start();
  sequencer.updateBtn();
});

// Tempo Slider
sequencer.tempoSlider.addEventListener("input", (e) => {
  sequencer.changeTempo(e);
});

sequencer.tempoSlider.addEventListener("change", (e) => {
  sequencer.updateTempo(e);
});
