// fileObj グローバル変数
var fileObj ;
$(function(){
  setFile("selfile","text1");
});
// fileObj 設定
function setFile(fileId,textAreaId){
  fileObj = document.getElementById(fileId);  

  //ファイルオブジェクトのイベント設定
  fileObj.addEventListener("change",function(evt){

    var file = evt.target.files;
    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
  
    //読込終了後の処理
    reader.onload = function(ev){
      //テキストエリアに表示する
      var fileText = reader.result;
      checkCodeRules(fileText);
      $('#' + textAreaId).val(fileText) ;
    }

  },false);

}

function checkCodeRules(text){
}

