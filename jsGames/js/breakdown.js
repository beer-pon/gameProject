// marubatu グローバル変数
var count = 0;

// プレイヤー定義　定数にする方法がわからない
var player1 = "player1";
var player2 = "player2";

var panelImages = new Object() ;

function creatPanel(count)
{

  changeTypeHidden($('#startButton'));

  var table = $('table');
  var panelCount = 0 ;
  for(var i = 1 ; i <= count ; i++){
    var trTag = createTrTag(i);
    for(var j = 1 ; j <= count ; j++) {
      panelCount++ ;
      var tdTag = createTdTag(trTag,panelCount);
      //trTag.append(tdTag);
    }
    table.append(trTag); 
  }
  
  setPanelImage();
}

function setPanelImage()
{
  var random = generate_randomx(3);
  clearArryObjct( panelImages ) ;
  var count = getCount() ;
  for(var i = 0 ; i <= count ; ++i)
  {
    panelImages[getPanelId(i)] = random[1];
  }
}
function getPanelImageId(id)
{
  return panelImages[getPanelId(id)];
}

function getImageSouce(id)
{
  var path = './image/' ;
  var name = 'image' + getPanelImageId(id) ;
  var jpg = '.jpg' ;
  
  return path + name + jpg ;
}

function createTrTag(id)
{
  var trTag = $('<tr>') ;
  trTag.addClass('trGameLine');
  trTag.attr('id',"line" + id);
  return trTag ;
}

function createTdTag(obj,id)
{
  var tdTag = "<td class='tdGameline' id="+getPanelId(id)+" name='panel' onclick="+'openPanel('+id+')'+"/>";
  obj.append(tdTag);
  return tdTag ;
}

function openPanel(id){
  document.getElementById(getPanelId(id)).innerHTML = "<img src="+"'"+getImageSouce(id)+"' />";
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
function getTdObj(id)
{
  return $('#' + getPanelId(id));
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
