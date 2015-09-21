package numelon;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Numelon {
	
	public static void main(String[] args){
		GameService game = new GameService();
		// ゲームスタート
		System.out.println("ゲームスタート");
		int gameCount = 0 ;
		Map<String, Integer> kekka = new HashMap<String,Integer>();
		
		//　相手の数値を決定
		List<Integer> enemyNumberList = new ArrayList<>();
		enemyNumberList = game.EnemyNumberLogic();
		
//		System.out.println("【" + enemyNumberList.get(0) + "】" + "【" + enemyNumberList.get(1)
//				+ "】" + "【" + enemyNumberList.get(2) + "】");

		// ゲームロジック
		while(kekka.size() == 0 || kekka.get("eat") != 3){
			//　予想数値の入力
			List<Integer> mathlist = game.MyNumberInput();

			kekka = game.GameExe(enemyNumberList, mathlist);
			// 結果
			game.GameResult(kekka);
			gameCount++;
		}
		
		System.out.println( gameCount +"回でゲームクリア");
	}
}
