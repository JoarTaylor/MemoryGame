localStorage.clear();

let gameArea = document.getElementById('game-area');
const won = document.querySelector('.won');
const triesCount = document.querySelector('.tries-count');
const scoreCount = document.querySelector('.score-count');
const playAgain = document.querySelector('.play-again');


let cardArray = [];
let contentArray = ['smile', 'angry', 'hungry', 'sad', 'happy', 'tired', 'smile', 'angry', 'hungry', 'sad', 'happy', 'tired'];
let score = 0;

createBoard();
clickCard();

function createBoard() {
    playAgain.classList.toggle('.hide');
    let card;
    let y = contentArray.length, j, temp;
    while(--y > 0) {
        j = Math.floor(Math.random() * (y+1));
        temp = contentArray[j];
        contentArray[j] = contentArray[y];
        contentArray[y] = temp;
    }
      
    for (let i = 0 ; i < 12 ; i++) {
        card = document.createElement('div');
        card.innerHTML = contentArray[i];
        card.classList.toggle('hidden-card');
        card.classList.add('button-styling');
        cardArray.push(card);

        cardArray.forEach((option) => {
            gameArea.appendChild(option);
        })
    } 
}


function clickCard(){
let buttons = document.querySelectorAll('#game-area div');
let buttonsArray = Array.from(buttons);
let checkArr = [];
let checkClasses = [];
let score = 0;
let tries = 0;

for(let i=0; i<buttonsArray.length; i++) {
    buttonsArray[i].addEventListener('click', () => {
        buttonsArray[i].classList.toggle('hidden-card');
        let buttonObject = {
            button: buttonsArray[i].innerHTML,
            id: i
        }
        checkArr.push(buttonObject);
        checkClasses.push(i);
        let lastTwo = checkClasses.slice(-2);
        let firstClick = lastTwo[0];
        let secondClick = lastTwo[1];
        
        if(checkArr.length % 2 === 0) {
        if(((checkArr[checkArr.length - 1].button === checkArr[checkArr.length - 2].button) && (firstClick != secondClick)) ){
            //check that two consecutive buttons does not have same index
            if(localStorage.getItem(checkArr[checkArr.length - 1].id) ==  checkArr[checkArr.length - 1].id || localStorage.getItem(checkArr[checkArr.length - 2].id) == checkArr[checkArr.length - 2].id) {
                
                buttonsArray[lastTwo[0]].classList.toggle('hidden-card');   
                buttonsArray[lastTwo[1]].classList.toggle('hidden-card');
                
            } else {
            localStorage.setItem(checkArr[checkArr.length - 1].id, checkArr[checkArr.length - 1].id);
            localStorage.setItem(checkArr[checkArr.length - 2].id, checkArr[checkArr.length - 2].id);
            score++;
            tries++;
            triesCount.innerHTML = tries;
            scoreCount.innerHTML = score;
            }
        } else if ((firstClick != secondClick) ){
            setTimeout(() => {
                buttonsArray[lastTwo[0]].classList.toggle('hidden-card');
            buttonsArray[lastTwo[1]].classList.toggle('hidden-card');
              }, "850")
            tries++;
            triesCount.innerHTML = tries;
        }
    }

    if(score==6){
        won.innerHTML = 'Game Completed!';
        playAgain.classList.toggle('hide');
        playAgain.addEventListener('click', () => {
            location.reload();
        })
    }      
    })
}
}




