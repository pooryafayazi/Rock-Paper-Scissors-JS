const computerChoisePath = {
    '1' : ['rock', './img/rock.jpg'],
    '2' : ['paper', './img/paper.jpg'],
    '3' : ['scissors', './img/scissors.jpg'],
}

var computerChose = '';
var yourChose = '';
var computerScore = Number(Cookies.get('computerscore') || 0);
var yourScore = Number(Cookies.get('yourscore') || 0);
var gamePlayed = Number(Cookies.get('gameplayed') || 0);


const computerRandomChoise = () => {
    let i = Math.floor(Math.random() * 3 ) + 1;
    // console.log(computerChoise[String(i)][1])
    let imgPath = computerChoisePath[i][1];
    // console.log(imgPath)
    Cookies.set('computerchose', computerChoisePath[String(i)][0])
    gamePlayed++;
    Cookies.set('gameplayed', gamePlayed);
    Cookies.set('computerpath', imgPath);
    return imgPath
}

const clickOnRock = () => {
    document.getElementById("computerimg").src = computerRandomChoise();
    document.getElementById("yourimg").src = './img/rock.jpg';
    Cookies.set('yourchose', 'rock');
    Cookies.set('yourpath', './img/rock.jpg');
    countScore();
}

const clickOnPaper = () => {
    document.getElementById("computerimg").src = computerRandomChoise();
    document.getElementById("yourimg").src = './img/paper.jpg';
    Cookies.set('yourchose', 'paper');
    Cookies.set('yourpath', './img/paper.jpg');
    countScore();

}

const clickOnScissors = () => {
    document.getElementById("computerimg").src = computerRandomChoise();
    document.getElementById("yourimg").src = './img/scissors.jpg';
    Cookies.set('yourchose', 'scissors');
    Cookies.set('yourpath', './img/scissors.jpg');
    countScore();
}

const startGame = () => {
    document.getElementById("yourScore").innerHTML = 'Score' + (Cookies.get('yourscore') || 0);
    document.getElementById("computerScore").innerHTML = 'Score' + (Cookies.get('computerscore') || 0);
    document.getElementById("turn").innerHTML = 'Games Played: ' + (Cookies.get('gameplayed') || 0);

    const y = Cookies.get('yourchose');
    const c = Cookies.get('computerchose');
    document.getElementById("yourcurrentChoise").innerText = y ? ('You: ' + y) : '';
    document.getElementById("computercurrentChoise").innerText = c ? ('Computer: ' + c) : '';
    
    const ypath = Cookies.get('yourpath')
    const cpath = Cookies.get('computerpath');
    document.getElementById("yourimg").src = ypath ?  ypath : './img/question.jpg' ;
    document.getElementById("computerimg").src = cpath ?  cpath : './img/question.jpg';

}



const howIsWon = () => {
    var yours = Cookies.get('yourchose');
    var computers = Cookies.get('computerchose');
    if ( yours === 'rock') {
        if (computers === 'rock'){            
            return 'TIE';
        } else if (computers === 'paper'){            
            return 'COMPUTER';
        } else if (computers === 'scissors'){
            return 'YOU';
        }
    } else if (yours === 'paper') {
        if (computers === 'rock'){
            return 'YOU';
        } else if (computers === 'paper'){
            return 'TIE';
        } else if (computers === 'scissors'){
            return 'COMPUTER';
        }
    } else if ( yours === 'scissors') {
        if (computers === 'rock'){
            return 'COMPUTER';
        } else if (computers === 'paper'){
            return 'YOU';
        } else if (computers === 'scissors'){
            return 'TIE';
        }
    }
}

const countScore = () => {
    var res = howIsWon();
    if (res === 'YOU') {
        yourScore++;
        Cookies.set('yourscore', yourScore);
        document.getElementById('win').innerText = 'WIN: YOU';
    } else if (res === 'COMPUTER') {
        computerScore++;
        Cookies.set('computerscore', computerScore);
        document.getElementById('win').innerText = 'WIN: COMPUTER';
    } else if (res === 'TIE') {
        document.getElementById('win').innerText = 'TIE';
    }

    startGame();
}


const reset = () => {
    yourScore = 0;
    computerScore = 0;
    gamePlayed = 0;
    Cookies.set('yourscore', 0);
    Cookies.set('computerscore', 0);
    Cookies.set('gameplayed', 0);
    Cookies.remove('yourchose');
    Cookies.remove('computerchose');
    Cookies.remove('yourpath');
    Cookies.remove('computerpath');
    document.getElementById('win').innerText = 'WIN';
    startGame();
};
