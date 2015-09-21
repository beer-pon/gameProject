package MaruBatu;

import java.util.ArrayList;
import java.util.List;

public class player {
	private int userId ;
	private Position position;
	private List<Position> positionList = new ArrayList<Position>();
	
	public player(int userId){
		this.userId = userId;
	}
	
	public void setUserId(int i){
		this.userId = i ;
	}
	
	public int getUserId(){
		return this.userId ;
	}
	
	public void setPositon(Position pos){
		this.position = pos;
	}
	
	public Position getPosition(){
		return this.position;
	}
	
	public List<Position> getPositionlist(){
		return positionList;
	}
	
	public void addPositionlist(Position pos){
		positionList.add(pos);
	}
}
