package MaruBatu;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class PositionService {
	
	// 位置情報が一致した場合trueで返す
	public boolean positionEqual(Position pos1,Position pos2){
		if(pos1.getX() == pos2.getX() && pos1.getY() == pos2.getY()){
			return true ;
		}
		return false;
	}

	// 位置情報の入力
	public Position inputPosition(){
		Position position = new Position();
		position.setX(enterIntNumber());
		position.setY(enterIntNumber());
		return position ;
	}
	
	// 入力処理
	private int scanEnterIntMath() {
		int x;
		System.out.println("input integer:(1,2,3) ");
		InputStreamReader isr = new InputStreamReader(System.in);
		BufferedReader br = new BufferedReader(isr);
		try {
			String buf = br.readLine();
			x = Integer.parseInt(buf);
		} catch (Exception e) {
			x = -1;
		}
		if (x < 0 || x > 3) {
			x = -2;
		}
		return x;
	}
	
	public int enterIntNumber(){
		int x = 0;
		do {
			x = scanEnterIntMath();
		} while (x <= 0);		
		return x ;
	}
	
	public int getPositionNumber(Position pos){
		Position posi = new Position();
		int number = 0;
		for(int i = 1 ; i <= 3 ; i++){
			for(int ii = 1 ; ii <= 3 ; ii++){
				number++;
				posi.setPosition(i, ii);
				if(positionEqual(pos, posi)){
					return number ;
				}
			}			
		}
		return 0 ;
	}
	
	public String getPositionStringNumber(Position pos){
		String i = "(" + pos.getX() + "," + pos.getY() + ")" ;
		return i ;
	}



}
