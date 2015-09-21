package MaruBatu;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class Field {
	private PositionService positionService = new PositionService();

	//field number
	private static Position pos1 = new Position(1,1);
	private static Position pos2 = new Position(1,2);
	private static Position pos3 = new Position(1,3);
	private static Position pos4 = new Position(2,1);
	private static Position pos5 = new Position(2,2);
	private static Position pos6 = new Position(2,3);
	private static Position pos7 = new Position(3,1);
	private static Position pos8 = new Position(3,2);
	private static Position pos9 = new Position(3,3);
	
	private static String maru = "○";
	private static String batu = "×";
	
	//field element
	private static List<Position> basePositionList = Arrays.asList(pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9);
	
	//input element
	private List<Position> myPositionList = new ArrayList<Position>();
	private List<Position> enemyPositionList = new ArrayList<Position>();
	
	private static Field field = new Field();

	public static Field getInstance(){
		return field ;
	}

	private Field(){
	}
	
	public void fieldView(){
		System.out.println("+-+-+-+");
		System.out.println("+(1,1)+(1,2)+(1,3)+");
		System.out.println("+(2,1+(2,2)+(2,3)+");
		System.out.println("+(3,1+(3,2)+(3,3)+");
		System.out.println("+-+-+-+");		
	}
	
	public void fieldBattleView(){
		System.out.println("+-+-+-+");
		System.out.println("＋" + getMaruBatu(pos1) + "＋" + getMaruBatu(pos2) + "＋" + getMaruBatu(pos3) + "+");
		System.out.println("＋" + getMaruBatu(pos4) + "＋" + getMaruBatu(pos5) + "＋" + getMaruBatu(pos6) + "+");
		System.out.println("＋" + getMaruBatu(pos7) + "＋" + getMaruBatu(pos8) + "＋" + getMaruBatu(pos9) + "+");
		System.out.println("+-+-+-+");
	}
	
	public void addMyPositionList(Position pos){
		this.myPositionList.add(pos);
	}
	
	public List<Position> getMyPositionList(){
		return this.myPositionList;
	}
		
	public void addEnemyPositionList(Position pos){
		this.enemyPositionList.add(pos);
	}
	
	public List<Position> getEnemyPositionList(){
		return this.enemyPositionList;
	}
	
	public List<Position> getBasePositionList(){
		return this.basePositionList;
	}

	public List<Position> getAllPositionList(){
		List<Position> allPosions = new ArrayList<Position>();
		allPosions.addAll(this.myPositionList);
		allPosions.addAll(this.enemyPositionList);
		return allPosions;
	}
	
	private String getMaruBatu(Position pos){
		for(Position mypos:myPositionList){
			if(positionService.positionEqual(mypos, pos)){
				return maru;
			}
		}
		for(Position enemypos:enemyPositionList){
			if(positionService.positionEqual(enemypos, pos)){
				return batu;
			}
		}
		String i = positionService.getPositionStringNumber(pos);
		return  i;
	}
	
	public Position getPositionNumber(int i){
		Position pos = new Position();
		switch (i) {
		case 1: pos.setPosition(1, 1);
		break;
		case 2: pos.setPosition(1, 2);
		break;
		case 3: pos.setPosition(1, 3);
		break;
		case 4: pos.setPosition(2, 1);
		break;
		case 5: pos.setPosition(2, 2);
		break;
		case 6: pos.setPosition(2, 3);
		break;
		case 7: pos.setPosition(3, 1);
		break;
		case 8: pos.setPosition(3, 2);
		break;
		case 9: pos.setPosition(3, 3);
		break;
		default:
			break;
		}
		
		return pos ;
	}


}
