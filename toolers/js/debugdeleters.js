// fileObj グローバル変数
var fileObj ;
$(function(){
  setFile("selfile","text1");
});

var errorMessageObj = {
  messageField:null,
  errorMessage:"",
  setField:(function(id){
    this.messageField=$('#'+id);
    }
  ),
  addErrorMassage:(function(message){
      if("" === this.errorMessage){
        this.errorMessage = message ;
      }else{
        this.errorMessage = this.errorMessage +  "\n" + message ;
      }
    }
  ),
  printErrorMassage:(function(){
    if(null === this.messageField){
      alert("error");        
    }else{
      this.messageField.val(this.errorMessage);
    }
  }),
  clearMassage:(function(){
    this.errorMessage = "" ;
  }),
};

// fileObj 設定
function setFile(fileId,textAreaId){
  fileObj = document.getElementById(fileId);  
  //ファイルオブジェクトのイベント設定
  fileObj.addEventListener("change",function(evt){
  errorMessageObj.setField("result");
  errorMessageObj.clearMassage();

    var file = evt.target.files;
    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
  
    //読込終了後の処理
    reader.onload = function(ev){
      //テキストエリアに表示する
      var fileText = reader.result;
      $('#' + textAreaId).val(fileText) ;
      checkCodeRules(fileText);
    }

  },false);

}

function checkCodeRules(text){
  // error文言を格納するオブジェクト
  var startDebug = "#ifdef DEBUG" ;
  var endDebug = "#endif" ;
  var outputFlg = true ;

  text.replace('/\r\n|\r/g', "\n") ;
  var lines = text.split( '\n' );

  $.each(lines,function(i,line){
    i++ ;
    // ;の前の空白確認
    if( ~line.indexOf("#ifdef DEBUG")){
      outputFlg = false ;
    }

    if(outputFlg){
      errorMessageObj.addErrorMassage(line);      
    }

    if( ~line.indexOf("#endif") ){
      outputFlg = true ;
    }

  });
  errorMessageObj.printErrorMassage();
}


