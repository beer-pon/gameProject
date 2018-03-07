  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    errorMessageObj.setField("result");
    errorMessageObj.clearMassage();

    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(files[0]);

    //読込終了後の処理
    reader.onload = function(ev) {
      //テキストエリアに表示する
      var fileText = reader.result;
      $('#text1').val(fileText);
      checkCodeRules(fileText);
    }
  }



  // fileObj グローバル変数
  var fileObj;
  $(function() {
    setFile("selfile", "text1");

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

  });

  var errorMessageObj = {
    messageField: null,
    errorMessage: "",
    setField: (function(id) {
      this.messageField = $('#' + id);
    }),
    addErrorMassage: (function(lineNumber, message) {
      if ("" === this.errorMessage) {
        this.errorMessage = lineNumber + "  " + message;
      } else {
        this.errorMessage = this.errorMessage + "\n" + lineNumber + "  " + message;
      }
    }),
    printErrorMassage: (function() {
      if (null === this.messageField) {
        alert("error");
      } else {
        this.messageField.val(this.errorMessage);
        linedtextArea();
      }
    }),
    clearMassage: (function() {
      this.errorMessage = "";
    }),
  };

  // fileObj 設定
  function setFile(fileId, textAreaId) {
    fileObj = document.getElementById(fileId);
    //ファイルオブジェクトのイベント設定
    fileObj.addEventListener("change", function(evt) {
      errorMessageObj.setField("result");
      errorMessageObj.clearMassage();

      var file = evt.target.files;
      //FileReaderの作成
      var reader = new FileReader();
      //テキスト形式で読み込む
      reader.readAsText(file[0]);

      //読込終了後の処理
      reader.onload = function(ev) {
        //テキストエリアに表示する
        var fileText = reader.result;
        $('#' + textAreaId).val(fileText);
        checkCodeRules(fileText);
      }

    }, false);

  }

  function checkCodeRules(text) {
    // error文言を格納するオブジェクト
    text.replace('/\r\n|\r/g', "\n");
    var lines = text.split('\n');
    var commentFlg = false;

    $.each(lines, function(i, line) {
      i++;
      // コメント分のチェック (//)もしくは（/** **/）が一行の場合
      if (commentChek(line)) {
        return true;
      }

      // コメントアウトスタートチェック (/*)
      if (commentOutStartCheck(line)) {
        commentFlg = true;
      }

      // コメントアウトエンドチェック（*/）
      if (commentOutEndCheck(line)) {
        commentFlg = false;
      }

      if (commentFlg) {
        return true;
      }

      // ;の前の空白確認
      if (null != line.match(/[^\s]+;/)) {
        errorMessageObj.addErrorMassage("error  :: ", ";の前の空白確認");
        errorMessageObj.addErrorMassage(i, line);
      }

      // "{"より前に空白以外の文字がある行
      if (null != line.match(/[^\s]+[\s]*{/)) {
        errorMessageObj.addErrorMassage("error  :: ", "\{より前に空白以外の文字がある");
        errorMessageObj.addErrorMassage(i, line);
      }

      // "}"より前に空白以外の文字がある行
      if (null != line.match(/[^\s]+[\s]*}/)) {
        errorMessageObj.addErrorMassage("error  :: ", "\}より前に空白以外の文字がある行");
        errorMessageObj.addErrorMassage(i, line);
      }

      // "("の直後に空白がない行
      if (null != line.match(/\([^\s]+/)) {
        errorMessageObj.addErrorMassage("error  :: ", "(の直後に空白がない");
        errorMessageObj.addErrorMassage(i, line);
      }

      // ")"の直前に空白がない行
      if (null != line.match(/[^\s]+\)/)) {
        errorMessageObj.addErrorMassage("error  :: ", ")の直前に空白がない");
        errorMessageObj.addErrorMassage(i, line);
      }

      // ";"以降にコメント以外がある行 ≒ ";"以降に"/"以外で始まる文字がある行
      if (null != line.match(/;\s*[^/\n\s]/)) {
        errorMessageObj.addErrorMassage("error  :: ", ";以降にコメント以外がある。;以降に/以外で始まる文字がある行");
        errorMessageObj.addErrorMassage(i, line);
      }

      // returnの値を括弧で囲んでる行
      if (null != line.match(/return.*\(/)) {
        errorMessageObj.addErrorMassage("error  :: ", "returnの値を括弧で囲んでる");
        errorMessageObj.addErrorMassage(i, line);
      }

      // 宣言と同時に初期化されていないint/char/long ※配列まで考慮してない
      if (null != line.match(/^\s*(int|char|long)(?!.*=).*$/)) {
        errorMessageObj.addErrorMassage("error  :: ", "宣言と同時に初期化されていないint/char/long ※配列まで考慮してない");
        errorMessageObj.addErrorMassage(i, line);
      }
    });
    errorMessageObj.printErrorMassage();
  }

  // 一行コメントのチェック（//）or (/** **/)が一行
  function commentChek(text) {
    // 空欄の後"//"もしくは”//” で始まる行
    if (null != text.match(/^\s*\/\//)) {
      return true;
    }
    // /* */ で閉じている行
    if (commentOutStartCheck(text) && commentOutEndCheck(text)) {
      return true;
    }
    return false;
  }

  // コメント (/*)の判定
  function commentOutStartCheck(text) {
    return null != text.match(/^\s*\/\*/);
  }

  function commentOutEndCheck(text) {
    return null != text.match(/.*\*\/$/)
  }

  function linedtextArea() {
    $(".lined").linedtextarea();
  }