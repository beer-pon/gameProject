// marubatu グローバル変数
var count = 0;

// プレイヤー定義　定数にする方法がわからない
var player1 = "player1";
var player2 = "player2";

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
  document.getElementById('test').innerHTML = "<p>"+id+"</p>";
}

function setPanelEvent(){
  var count = getCount();
  for( var i = 1; i <= count ; i++){
    var panelId = getPanelId(i);
    var obj = document.getElementById(panelId);
    addEvent(obj,'mouseover',mouseOver(panelId));
    obj.onmouseover = mouseOver(panelId);
    obj.onmouseout = mouseOut(panelId);    
  }
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
