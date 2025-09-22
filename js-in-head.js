const els = {};

document.addEventListener('DOMContentLoaded', () => {
  Object.assign(els, {
    youImg: document.getElementById('yourimg'),
    compImg: document.getElementById('computerimg'),
    youCap: document.getElementById('yourcurrentChoise'),
    compCap: document.getElementById('computercurrentChoise'),
    youScore: document.getElementById('yourScore'),
    compScore: document.getElementById('computerScore'),
    turn: document.getElementById('turn'),
    win: document.getElementById('win'),
    next: document.getElementById('next-round'),
    reset: document.getElementById('reset'),
    btnRock: document.getElementById('btn-rock'),
    btnPaper: document.getElementById('btn-paper'),
    btnScissors: document.getElementById('btn-scissors'),
  });

  // اگر چیزی پیدا نشد، دیباگ
  ['btn-rock','btn-paper','btn-scissors','next-round','reset'].forEach(id=>{
    if(!document.getElementById(id)) console.error('Missing element:', id);
  });

  // حالا وایرینگ رو انجام بده
  els.btnRock.addEventListener('click', ()=>onPlayerPick('rock'));
  els.btnPaper.addEventListener('click', ()=>onPlayerPick('paper'));
  els.btnScissors.addEventListener('click', ()=>onPlayerPick('scissors'));
  els.next.addEventListener('click', nextRound);
  els.reset.addEventListener('click', fullReset);

  renderFromCookies();
  els.next.disabled = true;
  state = 'player_turn';
  setButtonsEnabled(true);
});