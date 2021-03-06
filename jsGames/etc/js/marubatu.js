// marubatu グローバル変数
var count = 0;

// プレイヤー定義　定数にする方法がわからない…
var player1 = "○";
var player2 = "×";

// marubatu 共通関数
function inputPanel(id)
{
  var obj = getObj(id) ;
  var player = getNowPlayer() ;
  var panel = "" ;

  if(player == player1){
    var panel = "<div class='panel'>"+"○"+"<\/div>" ;
    obj.Value = player1 ;
  }else{
    var panel = "<div class='panel'>"+"×"+"<\/div>" ;    
    obj.Value = player2 ;
  }
  obj.innerHTML = panel ;
  // オンクリックイベントを無効化
  obj.onclick ="";
  //勝敗判定
  judgeGameEnd(id,player) ;
}

function gameReset()
{
  window.location.reload();
}

function endGame(player)
{
    var result = getObj('gameResult');
    if( isPlayer(player) ){
      result.innerHTML = player+"の勝ちです";
    }else{
      result.innerHTML = "引き分けです";      
    }
}

//オブジェクト　ゲットメソッド
function getObj(id)
{
  return document.getElementById(id);
}

function getCount()
{
  return document.getElementsByClassName('panel').length;
}

function getNowPlayer()
{
  return (getCount() % 2 == 0) ? player1 : player2 ;
}

function getPanelValue(id)
{
 return getObj(id).Value;
}

//オブジェクト　判定用メソッド
function isPlayer(player)
{
  return (player == player1 || player == player2) ;
}

function islineClear(i,j,k)
{
  var player = getNowPlayer();
  if((i == j) && (j == k) && isPlayer(i) )
  {
    return true ;
  }
  return false ;
}

function judgeGameEnd(id,player)
{  
  if(judgeWin(player))
  {
    endGame(player);
  }else if(judgeDrow())
  {
    endGame("");    
  }
}

function judgeDrow()
{
  return getCount() == 9  ;
}

function judgeWin(player)
{
  var panel1 = getPanelValue('1');
  var panel2 = getPanelValue('2');
  var panel3 = getPanelValue('3');
  var panel4 = getPanelValue('4');
  var panel5 = getPanelValue('5');
  var panel6 = getPanelValue('6');
  var panel7 = getPanelValue('7');
  var panel8 = getPanelValue('8');
  var panel9 = getPanelValue('9');

  // 横列
  if( islineClear(panel1,panel2,panel3) || islineClear(panel4,panel5,panel6) || islineClear(panel7,panel8,panel9) )
  {
    return true ;
  }else if(islineClear(panel1,panel4,panel7) || islineClear(panel2,panel5,panel8) || islineClear(panel3,panel6,panel9)){
  //　縦列
    return true ;
  }else if(islineClear(panel1,panel5,panel9) || islineClear(panel3,panel5,panel7)){
  //　ななめ列
    return true ;
  }else{
    return false ;    
  }
}

//　マウス操作のイベント
function mouseOver(id)
{
 var obj = getObj(id);
  obj.style.backgroundColor = "lavender" ;
}

function mouseOut(id)
{
  var obj = getObj(id);   
  obj.style.backgroundColor = "white" ;
}

