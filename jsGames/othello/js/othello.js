$(function() {
    othello.init();
})

//--------------------------------
//  private game method
//--------------------------------
window.othello = (function() {
    var BLACK = "black";
    var WHITE = "white";
    var NONE = "";
    var BORD_SIZE = 8;
    var nowPlayerColor;

    var gameController = {
        init: function() {
            nowPlayerColor = BLACK;
            this.initSetEvent();
            //初期配置
            cellController.clearAllCellImg();
            cellController.setCellColorImg(5, 4, WHITE);
            cellController.setCellColorImg(4, 5, WHITE);
            cellController.setCellColorImg(5, 5, BLACK);
            cellController.setCellColorImg(4, 4, BLACK);
        },
        gameClickEvent: function(event) {
            var currentTarget = event.currentTarget;
            if (othelloLogic.validation(currentTarget)) {
                alert("ここには置けません");
            } else {
                cellController.setCellColorImgByTarget(currentTarget, nowPlayerColor)
                othelloLogic.reverse(currentTarget);
                othelloLogic.checkWin();
                this.changePlayer();
            }
        },
        initSetEvent: function() {
            var that = this;
            this.eventClear();
            $(".td-cell").find("div").on("click", function(event) { that.gameClickEvent(event) });
        },
        eventClear: function() {
            $(".td-cell").find("div").off("click");
        },
        changePlayer: function() {
            if (BLACK == nowPlayerColor) {
                nowPlayerColor = WHITE;
            } else {
                nowPlayerColor = BLACK;
            }
            gameScore.view();
        },
    }

    // cellに対する操作
    var cellController = (function() {
        var BLACK_IMG_TAG = "<img class='cell' color='" + BLACK + "' src='./img/koma/othello_black.png'></img>";
        var WHITE_IMG_TAG = "<img class='cell' color='" + WHITE + "' src='./img/koma/othello_white.png'></img>";

        function _getTargetCell(x, y) {
            return $("#" + x + "-" + y);
        };

        function _setCellImg(target, color) {
            var targetObj = $(target);
            if (BLACK == color) {
                targetObj.append(BLACK_IMG_TAG);
            } else {
                targetObj.append(WHITE_IMG_TAG);
            }
            targetObj.off("click");
        };
        return {
            setCellColorImg: function(x, y, color) {
                var target = _getTargetCell(x, y);
                return _setCellImg(target, color);
            },
            setCellColorImgByTarget(target, color) {
                return _setCellImg(target, color);
            },
            clearCellColorImg: function(target) {
                $(target).find("img").remove();
            },
            clearAllCellImg: function() {
                $("#bord").find("img").remove();
            },
            getTargetCell: function(x, y) {
                return _getTargetCell(x, y);
            }
        }
    })();

    // オセロのロジック
    var othelloLogic = (function() {
        // 検索の際の方向
        var serachDirection = [-1, 0, 1];
        // 指定された方向でひっくり返せるかどうか検索する
        // retrun ひっくり返せるオブジェクトのリストを返す
        function _doSearch(x, y, moveX, moveY, searchColor) {
            var result = [];
            var targetX = _addNum(x, moveX);
            var targetY = _addNum(y, moveY);
            var targetColor = _getColor(targetX, targetY);

            // 隣のマスが同じ色か色の設定が無ければ捜査終了
            if (NONE == targetColor || searchColor == targetColor) {
                return result;
            } else {
                result.push(cellController.getTargetCell(targetX, targetY));
            }

            while (true) {
                targetX = _addNum(targetX, moveX);
                targetY = _addNum(targetY, moveY);
                // x か　ｙがサイズオーバーしたら終了
                if (targetX > BORD_SIZE || targetX < 0 ||
                    targetY > BORD_SIZE || targetY < 0) {
                    break;
                }

                targetColor = _getColor(targetX, targetY);
                if (NONE == targetColor) {
                    break;
                } else if (searchColor == targetColor) {
                    // 自分の色で挟んだらそこまでの内容を返す
                    return result;
                }
                // ターゲットの色が無色でも検索している色でもなければターゲットを追加
                result.push(cellController.getTargetCell(targetX, targetY));
            }
            return [];
        }

        // ひっくり返せるかどうか検索
        // retrun ひっくり返せるオブジェクトのリストを返す
        function _search(target, searchColor) {
            var id = $(target).attr("id");
            var targetX = id.split("-")[0];
            var targetY = id.split("-")[1];
            var reverseList = [];
            for (var dirX of serachDirection) {
                for (var dirY of serachDirection) {
                    var temp = _doSearch(targetX, targetY, dirX, dirY, searchColor);
                    if (temp.length > 0) {
                        reverseList = reverseList.concat(temp);
                    }
                }
            }
            return reverseList;
        }

        // ひっくり返せればtrueを返す
        function _isAbleReternPosition(target, searchColor) {
            var result = _search(target, searchColor);
            if (result.length > 0) {
                return true;
            }
            return false;
        }

        function _doReverse(target, reversColor) {
            var result = _search(target, reversColor);
            $.each(result, function(i, e) {
                cellController.clearCellColorImg(e);
                cellController.setCellColorImgByTarget(e, reversColor);
            });
        }

        function _getColor(x, y) {
            var target = cellController.getTargetCell(x, y);
            var color = NONE;
            if (target) {
                var targetColor = $(target).find("img").attr("color");
                if (BLACK == targetColor) {
                    color = BLACK;
                } else if (WHITE == targetColor) {
                    color = WHITE;
                }
            }
            return color;
        }

        function _addNum(a, b) {
            return parseInt(a) + parseInt(b);
        }

        return {
            // errorの場合　true
            validation: function(target) {
                var targetObj = $(target);
                // すでに駒が置かれている場合
                if (targetObj.find("img").length != 0) {
                    return true;
                }
                // ひっくり返す条件の判定
                if (!_isAbleReternPosition(target, nowPlayerColor)) {
                    return true;
                }
                return false;
            },
            reverse: function(target) {
                _doReverse(target, nowPlayerColor);
            },
            checkWin: function() {
                //勝敗判定ロジックを実装予定
                console.log("call checkWin");
            }
        }

    })();

    // ゲームスコア　管理、表示
    var gameScore = {
        scoreBordObj: undefined,
        whiteScoreObj: undefined,
        BlackScoreObj: undefined,
        remainScoreObj: undefined,
        playerViewObj: undefined,
        blackScore: 0,
        whiteScore: 0,
        remainScore: 0,
        baseCnt: 64,
        init: function() {
            this.blackScore = 0;
            this.whiteScore = 0;
            this.remainScore = 64;
            this.scoreBordObj = $("#score-bord");
            this.whiteScoreObj = $("#white-score-view");
            this.BlackScoreObj = $("#black-score-view");
            this.remainScoreObj = $("#remain-score-view");
            this.playerViewObj = $("#next-player-view");
            this.view();
        },
        view: function() {
            this._update();
            this.whiteScoreObj.text(this.whiteScore);
            this.BlackScoreObj.text(this.blackScore);
            this.remainScoreObj.text(this.remainScore);
            this.playerViewObj.text(nowPlayerColor);
        },
        //-------------------
        // private logic
        //-------------------
        _update: function() {
            this.blackScore = this._blackCnt();
            this.whiteScore = this._whiteCnt();
            this.remainScore = eval(this.baseCnt - this.blackScore - this.whiteScore);
        },
        _blackCnt: function() {
            return this._getCnt(BLACK);
        },
        _whiteCnt: function() {
            return this._getCnt(WHITE);
        },
        _getCnt: function(color) {
            var cnt = 0;
            $.each($("#bord").find("img"), function(i, e) {
                if ($(e).attr("color") == color) {
                    cnt++;
                }
            })
            return cnt;
        }
    };

    // 補助機能用
    var AuxiliaryFunction = {
        init: function() {
            this._setEvent();
        },
        _setEvent: function() {
            this._setResetEvent();
            this._setPassEvent();
        },
        _setResetEvent: function() {
            function reset() {
                gameController.init();
                gameScore.init();
            }
            $('#function-reset').on("click", function() { reset() });
        },
        _setPassEvent: function() {
            function pass() {
                gameController.changePlayer();
            }
            $('#function-pass').on("click", function() { pass() });
        }
    }

    // window.othello return
    return {
        init: function() {
            gameController.init();
            gameScore.init();
            AuxiliaryFunction.init();
        }
    }
}());