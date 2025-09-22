const MAP = {
  1: ['rock', './img/rock.jpg'],
  2: ['paper', './img/paper.jpg'],
  3: ['scissors', './img/scissors.jpg'],
};

let state = 'ready';           // 'ready' | 'player_turn' | 'locked'
let yourScore = Number(Cookies.get('yourscore') || 0);
let computerScore = Number(Cookies.get('computerscore') || 0);
let gamePlayed = Number(Cookies.get('gameplayed') || 0);

const els = {
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
};

function setButtonsEnabled(enabled){
  [els.btnRock, els.btnPaper, els.btnScissors].forEach(b=>{
    b.disabled = !enabled;
  });
}

function randomComputer(){
  const i = Math.floor(Math.random()*3)+1;
  const [name, path] = MAP[i];
  Cookies.set('computerchose', name);
  Cookies.set('computerpath', path);
  return { name, path };
}

function decide(yours, computers){
  if (yours === computers) return 'TIE';
  const win = (yours==='rock'&&computers==='scissors') ||
              (yours==='paper'&&computers==='rock') ||
              (yours==='scissors'&&computers==='paper');
  return win ? 'YOU' : 'COMPUTER';
}

function updateScoreboard(result){
  if (result==='YOU'){ yourScore++; Cookies.set('yourscore', yourScore); }
  else if (result==='COMPUTER'){ computerScore++; Cookies.set('computerscore', computerScore); }
  // بازی فقط یک بار به ازای هر راند شمرده شود
  gamePlayed++; Cookies.set('gameplayed', gamePlayed);

  els.youScore.textContent = yourScore;
  els.compScore.textContent = computerScore;
  els.turn.textContent = gamePlayed;

  els.win.className = 'result-big ' + (result==='YOU'?'win':result==='COMPUTER'?'lose':'tie');
  els.win.textContent = result==='TIE' ? 'Tie' : (result==='YOU'?'You Win!':'Computer Wins!');
}

function renderFromCookies(){
  const y = Cookies.get('yourchose');
  const c = Cookies.get('computerchose');
  const ypath = Cookies.get('yourpath');
  const cpath = Cookies.get('computerpath');
  els.youCap.textContent = y ? ('You: ' + y) : '';
  els.compCap.textContent = c ? ('Computer: ' + c) : '';
  els.youImg.src = ypath || './img/question.jpg';
  els.compImg.src = cpath || './img/question.jpg';
  els.youScore.textContent = Cookies.get('yourscore') || 0;
  els.compScore.textContent = Cookies.get('computerscore') || 0;
  els.turn.textContent = Cookies.get('gameplayed') || 0;
}

function onPlayerPick(name){
  if (state !== 'player_turn') return;     // جلوگیری از کلیک‌های پشت‌سرهم
  state = 'locked';
  setButtonsEnabled(false);

  // ثبت انتخاب YOU
  const path = name==='rock' ? './img/rock.jpg'
             : name==='paper' ? './img/paper.jpg'
             : './img/scissors.jpg';
  Cookies.set('yourchose', name);
  Cookies.set('yourpath', path);
  els.youImg.src = path;
  els.youCap.textContent = 'You: ' + name;

  // انتخاب کامپیوتر
  const comp = randomComputer();
  els.compImg.src = comp.path;
  els.compCap.textContent = 'Computer: ' + comp.name;

  // نتیجه
  const result = decide(name, comp.name);
  updateScoreboard(result);

  // فعال شدن «Round بعدی»
  els.next.disabled = false;
}

function nextRound(){
  // تمیز کردن انتخاب‌ها (اختیاری: تصاویر سؤال بمانند)
  Cookies.remove('yourchose'); Cookies.remove('computerchose');
  Cookies.remove('yourpath'); Cookies.remove('computerpath');

  els.win.className = 'result-big';
  els.win.textContent = 'Ready';
  els.youCap.textContent = '';
  els.compCap.textContent = '';
  els.youImg.src = './img/question.jpg';
  els.compImg.src = './img/question.jpg';

  els.next.disabled = true;
  state = 'player_turn';
  setButtonsEnabled(true);
}

function fullReset(){
  yourScore = 0; computerScore = 0; gamePlayed = 0;
  Cookies.set('yourscore', 0);
  Cookies.set('computerscore', 0);
  Cookies.set('gameplayed', 0);
  Cookies.remove('yourchose'); Cookies.remove('computerchose');
  Cookies.remove('yourpath'); Cookies.remove('computerpath');
  renderFromCookies();
  els.win.className = 'result-big';
  els.win.textContent = 'Ready';
  els.next.disabled = true;
  state = 'player_turn';
  setButtonsEnabled(true);
}

/* Wire-up */
document.addEventListener('DOMContentLoaded', ()=>{
  // دکمه‌های YOU
  els.btnRock.addEventListener('click', ()=>onPlayerPick('rock'));
  els.btnPaper.addEventListener('click', ()=>onPlayerPick('paper'));
  els.btnScissors.addEventListener('click', ()=>onPlayerPick('scissors'));

  // کنترل‌ها
  els.next.addEventListener('click', nextRound);
  els.reset.addEventListener('click', fullReset);

  // بار اول
  renderFromCookies();
  els.next.disabled = true;
  state = 'player_turn';
  setButtonsEnabled(true);
});
