/**
* FileUtile classのコンストラクタ
*/
FileUtil = function(){
	var fileSystem ;
	/*5MB*/
	var fileSize =  5*1024*1024 ;
	var err_message = "";
}

FileUtil.prototype.callFileSystem = function () {
	// File module test
	if(moduleCheck(this.err_message)){
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(window.TEMPORARY, this.fileSize, onInitFs, fileErrorHandler);
	}
}

function onInitFs(fileSystem) {
  console.log('Opened file system: ' + fileSystem.name);
}

/**
* File Error Handler
*/
function fileErrorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.ABORT_ERR :
      msg = 'ABORT_ERR';
      break;
    case FileError.NOT_READABLE_ERR :
      msg = 'NOT_READABLE_ERR';
      break;
    case FileError.ENCODING_ERR  :
      msg = 'ENCODING_ERR';
      break;
    default:
      msg = 'Unknown Error code:' + e.code ;
      break;
  };
	console.log("------------------------------------------------------------");
	console.log("File API ERROR OCCURED ERROR MESSAGE : " + msg ) ;
	console.log("File API ERROR OCCURED ERROR MESSAGE : " + e ) ;
	console.log("------------------------------------------------------------");
}

var FileError = {
	'NOT_FOUND_ERR':'1',
	'SECURITY_ERR':'2',
	'ABORT_ERR':'3',
	'NOT_READABLE_ERR':'4',
	'ENCODING_ERR':'5'
}


//---------------------------------------
//   このモジュールの利用可能判定
//---------------------------------------

/**
* アプリを動かく上で必要なモジュールがあることを確認する
*/
function moduleCheck(err_message){
	var result = true;
	// 利用可能なブラウザ判定
	if(!appliableBrowser()){
		err_message="chromeブラウザを使用してください";
		result = false;
	}

	// File APi  check
	if(!appliableFileApiModule()){
		err_message="File API をサポートしていないブラウザです。バージョンアップもしくはブラウザを変えてください";
		result = false;
	}

	// error log out put
	if(!result){
		console.log(err_message);		
	}

}

/**
* File API のサポート判定
*/
function appliableFileApiModule(){
	var result = false ;
	if(window.File && window.FileReader 
		&& (!window.requestFileSystem || !window.webkitRequestFileSystem) ) {
	    console.log("---------------\nFile APIをサポートしています\n---------------");
	    return true ;			
	}else{
	    console.log("---------------\r\nFile APIをサポートしていません\r\n---------------");
	    return false ;
	}
}

/**
* 利用可能なブラウザ判定
* 現時点では、chromeのみを対象とする
*/
function appliableBrowser(){
	var userAgent = window.navigator.userAgent.toLowerCase();
	var result = false ;
	// chrome 判定
	if (userAgent.indexOf('chrome') != -1) {
		result = true ;
	}
	return result ;
}

