package numelon;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class GameService {
	public GameService(){
	}

	// ゲームロジック
	public Map<String, Integer> GameExe(List<Integer> enemyNumberList,List<Integer> mathlist){
		Map<String, Integer> kekka = new HashMap<String, Integer>();
		Integer eat = 0;
		Integer bite = 0;
		
		//　結果格納
		for(int i =0 ; i <= 2 ; i++){
			if(enemyNumberList.get(i) == mathlist.get(i)){
				System.out.println("eat;" + mathlist.get(i));
				eat++;
			}else if(enemyNumberList.contains(mathlist.get(i))){
				System.out.println("bite;" + mathlist.get(i));
				bite++;
			}
		}
		
		kekka.put("eat", eat);
		kekka.put("bite", bite);
		return kekka;
	}
	
	// 相手の数値を決めるロジック
	public List<Integer> EnemyNumberLogic() {
		List<Integer> enemyNumbers = new ArrayList<>();
		Random random = new Random();
		while (enemyNumbers.size() <= 2) {
			int number = random.nextInt(10);
			if (!enemyNumbers.contains(number)) {
				enemyNumbers.add((Integer) number);
			}
		}
		return enemyNumbers;
	}
	
	public List<Integer> MyNumberInput(){
		List<Integer> myNumbers = new ArrayList<>();
		// 入力受付
		for (int i = 1; i <= 3; i++) {
			System.out.println(i + "番の数を入力して下さい");
			Integer math = ScanEnterIntMath();
			if (math == -1) {
				i--;
				System.out.println("入力値が不正です、入力し直してください");
			} else if (math == -2 ) {
				i--;
				System.out.println("入力値が不正です、数字は0~9で入力してください");
			} else if(myNumbers.contains(math)){
				i--;
				System.out.println("入力値が不正です、同じ数字は選択できません");
			}else{
				myNumbers.add(math);				
			}
		}
		System.out.println("【" + myNumbers.get(0) + "】" + "【" + myNumbers.get(1)
				+ "】" + "【" + myNumbers.get(2) + "】");
		
		return myNumbers ;
	}

	// 入力処理
	public Integer ScanEnterIntMath() {
		Integer x;
		System.out.print("input integer: ");
		InputStreamReader isr = new InputStreamReader(System.in);
		BufferedReader br = new BufferedReader(isr);
		try {
			String buf = br.readLine();
			x = Integer.parseInt(buf);
		} catch (Exception e) {
			x = -1;
		}
		if (x < 0 || x >= 10) {
			x = -2;
		}
		return x;
	}
	
	// ゲーム結果
	public void GameResult(Map<String, Integer> kekka) {
		System.out.println( kekka.get("eat") + "eat	" + kekka.get("bite") + "bite");
	}

}
