window.addEventListener('DOMContentLoaded', (event) => {
    main();
});

const val = [null,null,null,null,null,null,null,null,null];
let turn = 0;

function main(){

  let button = document.getElementsByClassName("btn")[0];


   button.setAttribute("onclick","startGame();");
}

function startGame(){
  let x = document.getElementsByTagName('div');

  for (let i = 3; i <12; i++){
    let idx = i - 3;
    x[i].setAttribute("class","square");
    x[i].setAttribute("id", "b"+ idx);

  }

  for(let i = 3; i <12; i++){
    x[i].addEventListener("click",function(){select(this.getAttribute("id"));});
  }

}

function select(box){

  box = parseInt(box[1],10);
  let k = box;
  box += 3;
  if(turn < 9 && val[k] == null){
    turn++;
    if(turn % 2 == 0){
      val[k] = "O";
      document.getElementsByTagName('div')[box].classList.add("hover");
      document.getElementsByTagName('div')[box].classList.add("0");
      document.getElementsByTagName('div')[box].innerHTML = "O";
    }else {
      val[k] = "X";
      document.getElementsByTagName('div')[box].classList.add("hover");
      document.getElementsByTagName('div')[box].classList.add("X");
      document.getElementsByTagName('div')[box].innerHTML = "X";
    }

    let results = tally();
    results.forEach((el) =>{
      if(el === "X" || el === "O"){ winner(el);}
   })


    if(turn === 9){
      tally();

      if(results[0] === "no match" && results[0] === results[1]  && results[1] === results[2]){
      stat = document.getElementById("status").innerHTML = "It's a Draw!";}

      endGame();

    }

  }

}



function winner(winer){
  let stat = document.getElementById("status");
  stat.classList.add("you-won");

  winer === "X" ? stat.innerHTML = "Congratulations! X is the Winner" : stat.innerHTML = "Congratulations! O is the Winner";
  endGame();
}

function endGame(){
  let button = document.getElementsByTagName("button")[0];
  button.innerHTML= "Star Over";
  button.setAttribute("onclick","restart();");
}

function restart(){

  resetLayout();

  resetButton();

  resetVal();

  turn = 0;

  // return 0;

}

function resetButton(){
  document.getElementsByTagName("button")[0].innerHTML= "New game";
  document.getElementsByTagName("button")[0].setAttribute("onclick","startGame()");

}

function resetVal(){
  for(let i = 0; i < val.length; i++){
    val[i] = null;
  }
}

function resetLayout(){
  let x = document.getElementsByTagName('div');


  for (let i = 3; i <12; i++){
    x[i].innerHTML === "X" ? x[i].classList.remove("X") : x[i].classList.remove("O");
    x[i].innerHTML = "";
    x[i].setAttribute("id", "");
    x[i].classList.remove("square");
    x[i].classList.remove("hover");

  }

  let stat = document.getElementById("status");
  stat.innerHTML = "Move your mouse over a square and click to play an X or an O.";
  stat.classList.remove("you-won");


}

function HOP(list,start,end,increment,pointer,baseCondition){
  let base = 0;
  for(let i = start; i < end; i+= increment){
    if (baseCondition) base = i;
    if(list[i] === list[i + pointer - base] && list[i + pointer - base] === list[i + pointer + pointer - base - base]){
      return list[i];
    }

  }

  return "no match";

}

function tally(){


  let col = HOP(val,0,3,1,3,false);
  let row = HOP(val,0,9,3,1,false);
  let dia = HOP(val,0,3,2,4,true);

  return [col,row,dia];

}
