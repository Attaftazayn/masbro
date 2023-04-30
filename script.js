const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const levels = document.querySelector(".container1");
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai = false;
let skor = 0;

function difficultyLevel() {
  const ele = document.getElementsByName("level");
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].id;
    }
  }
}

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(101, 1000)
    const difficulty = difficultyLevel();
  if (difficulty === "easy") {
    show = 500;
    hide = 1500;
  } else if (difficulty === "medium") {
    show = 200;
    hide = 1000;
  } else {
    show = 100;
    hide = 800;
  }
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, 15000);
}

function pukul(e) {
    if (!e.isTrusted) {
    return;
  }
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play ();
  papanSkor.textContent = skor;
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});
