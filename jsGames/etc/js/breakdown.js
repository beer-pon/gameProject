// marubatu グローバル変数
var count = 0;

// プレイヤー定義　定数にする方法がわからない
var player1 = "player1";
var player2 = "player2";
var nowPlayer = player1;

var clickCount = 0 ;
var selectImageId = -1;
var panelImages = new Object() ;

/**
* テーブル要素を作成する
*/
function creatPanel(count)
{
  // スタートボタンを隠す
  changeTypeHidden($('#startButton'));

  var table = $('table');
  var panelCount = 0 ;
  for(var i = 0 ; i <= count-1 ; i++){
    var trTag = createTrTag(i);
    for(var j = 0 ; j <= count-1 ; j++) {
      var tdTag = createTdTag(trTag,panelCount);
      panelCount++ ;
    }
    table.append(trTag); 
  }
  
  setPanelImage();
}

/**
*パネルと画像の紐づけを行う
*/
function setPanelImage()
{
  var random = generate_randomx(16);
  clearArryObjct( panelImages ) ;
  var count = getCount() ;
  for(var i=0 ; i <= count ; ++i)
  {
    var j = random[i];
    if(j>=8)
    {
      j = j-8 ;
    }
    panelImages[getPanelId(i)] = j;
  }
}

/**
*パネルに紐づく画像のIDを取得する
*/
function getPanelImageId(id)
{
  return panelImages[getPanelId(id)];
}

/**
*画像のソースを取得する
*/
function getImageSouce(id)
{
  var path = './image/' ;
  var name = 'image' + getPanelImageId(id) ;
  var jpg = '.jpg' ;
  
  return path + name + jpg ;
}

/**
*TRタグの生成
*/
function createTrTag(id)
{
  var trTag = $('<tr>') ;
  trTag.addClass('trGameLine');
  trTag.attr('id',"line" + id);
  return trTag ;
}

/**
*TDタグの生成
*/
function createTdTag(obj,id)
{
  var tdTag = "<td class='tdGameline' id="+getPanelId(id)+" name='panel' onclick="+'openPanel('+id+')'+"/>";
  obj.append(tdTag);
  return tdTag ;
}

/**
*パネルクリック時のイベント
*/
function openPanel(id){
  var imageSouce = getImageSouce(id) ;
  var imageId = getPanelImageId(id);
  if(clickCount==0)
  {
    clickCount++;
    document.getElementById(getPanelId(id)).innerHTML = "<img class='panelImage' src="+"'"+imageSouce+"' />";
    selectImageId=imageId;
  }else if(clickCount==1){
    clickCount++;
    document.getElementById(getPanelId(id)).innerHTML = "<img class='panelImage' src="+"'"+imageSouce+"' />";
    if(selectImageId==imageId)
    {
      //一致した場合もう一度
      selectImageId=-1;
      clickCount=0;
      alert("正解");
    }else{
      //一致していない場合プレイヤー交代
      selectImageId=-1;
      clickCount=0;
      changePlayer();
    }
  }else{
    alert("error");
    clickCount=0;
  }
}

function changePlayer()
{
  if(nowPlayer==player1)
  {
    nowPlayer=player2; 
  }else{
    nowPlayer=player1;
  }
  var obj = $('#playerInfo');
  obj.val(nowPlayer);
}

function getPanelId(id){
  return "panel" + id ;
}

function getCount()
{
  return $("*[name=panel]").length;
}

function changeTypeHidden(obj)
{
  obj.attr("type","hidden");
}

//オブジェクト　ゲットメソッド
function getTdObj(name)
{
  return $('#' + name);
}

// オブジェクトクリアメソッド
function clearArryObjct( obj )
{
  if (obj != null){
    for( var key in obj){
      delete obj[key] ;
    }
  }
}

/**
*重複しない乱数配列の生成
*/
function generate_randomx(count) {
  //生成した乱数を格納する配列を初期化
  var generated = new Array();
  //生成した乱数を格納している配列の長さ（生成した乱数の数）
  var generatedCount = generated.length;
  //パラメータ count の数だけ Math.random()で乱数を発生
  for(var i = 0 ; i < count; i++){
    var candidate = Math.floor(Math.random() * count);
    //今まで生成された乱数と同じ場合は再度乱数を発生
    for(var j = 0; j < generatedCount; j++) {
      if(candidate == generated[j]){
        candidate = Math.floor(Math.random() * count);
        j= -1;
      }
    }
    generated[i] = candidate; 
    generatedCount++;
  }
  return generated;  
}

