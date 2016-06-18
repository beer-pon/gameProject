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
  addErrorMassage:(function(lineNumber,message){
      if("" === this.errorMessage){
        this.errorMessage = lineNumber + "  " + message ;
      }else{
        this.errorMessage = this.errorMessage +  "\n" + lineNumber + "  " + message ;
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
  text.replace('/\r\n|\r/g', "\n") ;
  var lines = text.split( '\n' );

  $.each(lines,function(i,line){
    i++ ;
    // ;の前の空白確認
    if( null != line.match(/[^\s]+;/) ){
      errorMessageObj.addErrorMassage("error  :: ",";の前の空白確認");      
      errorMessageObj.addErrorMassage(i,line);      
    }

    // "{"より前に空白以外の文字がある行
    if( null != line.match(/[^\s]+[\s]*{/) ){
      errorMessageObj.addErrorMassage("error  :: ","\{より前に空白以外の文字がある");
      errorMessageObj.addErrorMassage(i,line);      
    }

    // "}"より前に空白以外の文字がある行
    if( null != line.match(/[^\s]+[\s]*}/) ){
      errorMessageObj.addErrorMassage("error  :: ","\}より前に空白以外の文字がある行");
      errorMessageObj.addErrorMassage(i,line);      
    }

    // "("の直後に空白がない行
    if( null != line.match(/\([^\s]+/) ){
      errorMessageObj.addErrorMassage("error  :: ","(の直後に空白がない");
      errorMessageObj.addErrorMassage(i,line);      
    }

    // ")"の直前に空白がない行
    if( null != line.match(/[^\s]+\)/) ){
      errorMessageObj.addErrorMassage("error  :: ",")の直前に空白がない");
      errorMessageObj.addErrorMassage(i,line);      
    }

    // ";"以降にコメント以外がある行 ≒ ";"以降に"/"以外で始まる文字がある行
    if( null != line.match(/;\s*[^/\n\s]/) ){
      errorMessageObj.addErrorMassage("error  :: ",";以降にコメント以外がある。;以降に/以外で始まる文字がある行");
      errorMessageObj.addErrorMassage(i,line);      
    }

    // returnの値を括弧で囲んでる行
    if( null != line.match(/return.*\(/) ){
      errorMessageObj.addErrorMassage("error  :: ","returnの値を括弧で囲んでる");
      errorMessageObj.addErrorMassage(i,line);      
    }

    // 宣言と同時に初期化されていないint/char/long ※配列まで考慮してない
    if( null != line.match(/^\s*(int|char|long)(?!.*=).*$/) ){
      errorMessageObj.addErrorMassage("error  :: ","宣言と同時に初期化されていないint/char/long ※配列まで考慮してない");
      errorMessageObj.addErrorMassage(i,line);
    }
  });
  errorMessageObj.printErrorMassage();
}


