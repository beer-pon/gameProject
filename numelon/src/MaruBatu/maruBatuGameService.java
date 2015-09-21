package MaruBatu;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class maruBatuGameService {
	
	Position pos = new Position();
	PositionService positionService = new PositionService();
	Field field = Field.getInstance();

	//　ゲームスタート
	public void gameStart(){
		System.out.println("ゲームスタート");
	}
	
	//　ゲームロジック 
	public void gameLogic(){
		
		// 位置の入力
		do {
			pos = positionService.inputPosition();			
		} while (!positionCheck(pos));
		
		//　今回の位置情報の登録
		field.addMyPositionList(pos);
		
		fieldView();
						
	}
	
	// ゲーム実行
	public void gameExe(){
		boolean wincheck = false;
		player user1 = new player(1);
		player user2 = new player(2);
		while(!wincheck){
			gameLogic();
			wincheck = winFlg(1);
		}
	}
	
	//　ゲーム終了
	public void gameEnd(){
		System.out.println("ゲーム終了");		
	}
	
	// 入力済みの場所だったらエラーを返す
	public boolean positionCheck(Position pos){
		List<Position> allPositions = field.getAllPositionList();
		for(Position position : allPositions){
			if(positionService.positionEqual(position, pos)){
				System.out.println("NG");
				return false;
			}
		}
		System.out.println("OK");
		return true ;
	}
	
	//　勝敗判定
	private boolean winFlg(int playerId){
		List<Position> poslist = new ArrayList<>();
		List<Position> baselist = field.getBasePositionList();

		// 1:player
		// 2:enemy
		if(playerId == 1){
			poslist = field.getAllPositionList();
		} else {
			poslist = field.getAllPositionList();			
		}
		
		int size = poslist.size();

		if(size < 3){
			return false;
		}
		
		List<Integer> hitlist = new ArrayList<Integer>();
		Integer hitNumber = 0;
		for(Position posi : poslist){
			hitNumber = positionService.getPositionNumber(posi);
			hitlist.add(hitNumber);			
		}
		return winLogic(hitlist); 
	}
	
	// 横勝利判定
	public Boolean winLogic(List<Integer> poslist){
	
		if(poslist.contains(1) && poslist.contains(2) && poslist.contains(3)){
			return true;
		} else if(poslist.contains(1) && poslist.contains(2) && poslist.contains(3)){
			return true;
		}else if(poslist.contains(4) && poslist.contains(5) && poslist.contains(6)){
			return true;
		}else if(poslist.contains(7) && poslist.contains(8) && poslist.contains(9)){
			return true;
		}else if(poslist.contains(1) && poslist.contains(4) && poslist.contains(7)){
			return true;
		}else if(poslist.contains(2) && poslist.contains(5) && poslist.contains(8)){
			return true;
		}else if(poslist.contains(3) && poslist.contains(6) && poslist.contains(9)){
			return true;
		}else if(poslist.contains(1) && poslist.contains(5) && poslist.contains(9)){
			return true;
		}else if(poslist.contains(3) && poslist.contains(5) && poslist.contains(7)){
			return true;
		}
		return false ;
	}

	//　フィールド表示
	public void fieldView(){
		field.fieldBattleView();
	}
}
