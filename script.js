const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets creatre fun to initialize the game
function initGame(){
    currentPlayer="x";
    gameGrid=["","","","","","","","",""];
    //ui pr bhi empty karna pdega
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initializse boxes with css propeerties agin;
        box.classList=`box box${index+1}`;


    });
    newGameBtn.classList.remove(".active");
    gameInfo.innerText=`current Player-${currentPlayer}`;
}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;//updaet on ui
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        //swap karo turn
        swapTurn();
        //check koi jit to nhi gya
        checkGameOver();

    }
}
 function swapTurn(){
    if(currentPlayer=="x")
    {
        currentPlayer="0";
    }
    else
    {
        currentPlayer="x";
    }
    gameInfo.innerText=`current Player-${currentPlayer}`;
 }


 newGameBtn.addEventListener("click",initGame);

 function checkGameOver()
 {
    let answer="";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="") &&( gameGrid[position[0]]===gameGrid[position[1]]) &&
    (gameGrid[position[1]]===gameGrid[position[2]])){


        //check if winner is x
        if(gameGrid[position[0]]==="x")
            answer="x";
        else
        answer="0";
    //disabl pointer events
    boxes.forEach((box)=>{
        box.style.pointerEvents="none";
    })

    // now we kow whoe is
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");

    }
    });
    //it means we have winner
    if(answer!=="")
    {
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;

    }

    //when there is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    });
    if(fillCount===9)
    {
        gameInfo.innerText="Game Tied!"
        newGameBtn.classList.add("active");
    }

 }