#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<ctime>
#include<csignal>
#include<vector>

using namespace std;

int w = 50, h = 25;
int ballWidth = 2, ballHight = 1;

class ball{
	public:
		int x;
		int y;
		int dx;
		int dy;
		int color;

		ball(){
			x = 2 + rand() % ((w-1) - 2 + 1);	
			y = 2 + rand() % ((h-1) - 2 + 1);
			dx = (rand()%(2)==1)?1:-1;
			dy = (rand()%2 == 1)?1:-1;
			color = 31 + rand() % (7);
		}
		
};

void CreateWall(){
	for(int i = 0; i < w; i++ ) cout << "_"; 
	cout << endl;
	for(int j = 0; j < h-2; j++){
		cout << "|";
		for(int i = 0; i < w-2; i++) cout << " ";
		cout << "|" << endl;
	
	}
	for(int i = 0; i < w; i++){ 
		cout << "-";
	}
	fflush(stdout);
	cout << endl;
}

void print(ball b){
	printf("\033[%d;%dH", b.y, b.x);
	// cout << "0";
	printf("\033[%dm⚽\033[0m", b.color);
	fflush(stdout);
}

void erase(ball b){				// b is copy of object in vector.
	b.x = b.x - b.dx;
	b.y = b.y - b.dy;

	printf("\033[%d;%dH", b.y, b.x);
	if(b.x == 1 || b.x == w || b.y == 1 || b.y == h) return;
	cout << " ";
	fflush(stdout);
}
	
void update(ball& b){			// b is not copy it is refrence to that object
	if(((b.x==2)&&(b.dx==-1)) || ((b.x==w-ballWidth)&&(b.dx==1))) b.dx = -b.dx;
	if(((b.y==2)&&(b.dy==-1)) || ((b.y==h-ballHight)&&(b.dy==1))) b.dy = -b.dy;

	b.x += b.dx;
	b.y += b.dy;
}

bool collision_Occour(ball &b1, ball &b2){
	int next_x1 = b1.x + b1.dx;
	int next_y1 = b1.y + b1.dy;
	int next_x2 = b2.x + b2.dx;
	int next_y2 = b2.y + b2.dy;

	if(next_x1 == next_x2 && next_y1 == next_y2)
		return true;
	return false;
}

void handle_Collision(ball &b1, ball &b2){
	b1.dx = -b1.dx;
	b1.dy = -b1.dy;
	b2.dx = -b2.dx;
	b2.dy = -b2.dy;
}

void handleExit(int sig) {
	printf("\033[%d;1H\033[?25h", h+2);
	fflush(stdout);
	exit(0);
}

int main(){

	// seeding for random
	srand(time(0));

	//handling before termination
	signal(SIGINT, handleExit);

	//intitial setup.
	cout << "\033[2J\033[H";
	cout << "\033[?25l";


	// Boundaries. 
	CreateWall();


	// Balls list
	int ballnumber = 100;
	vector<ball> Balls;
	for(int i = 0; i < ballnumber; i++){
		Balls.emplace_back();
		// usleep(1000);
	}

	while(true){
		for(auto& b: Balls){
			erase(b);
		}

		for(auto &b : Balls)
			print(b);

		for(int i = 0; i < Balls.size(); i++){

			ball &b1 = Balls[i];
			for(int j = i+1; j < Balls.size(); j++){
				ball &b2 = Balls[j];
				if(collision_Occour(b1, b2)){
					handle_Collision(b1, b2);
				}
			}
		}

		for(auto &b : Balls)
			update(b);

		fflush(stdout);
		usleep(100000);
	}
	

	// return 
	return 0;
}
