package MaruBatu;

import numelon.GameService;

public class GameMain {
	public static void main(String[] args){
		
		maruBatuGameService game = new maruBatuGameService();

		// TODO　ゲームスタート
		game.gameStart();
		
		// TODO ゲーム実行
		game.gameExe();
		game.fieldView();

		//　TODO　結果表示
		game.gameEnd();
	}
}
