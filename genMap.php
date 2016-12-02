<?php 
    
    class Room{
        public $x1;
        public $x2;
        public $y1;
        public $y2;

        public $width;
        public $height;

        public $center = array();

        public function __construct($x, $y, $w, $h){
            $this->x1 = $x;
            $this->x2 = $x + $w;
            $this->y1 = $y;
            $this->y2 = $y + $h;
            
            $this->width = $w;
            $this->height = $h;

            $this->center["x"] = floor(($this->x1 + $this->x2) / 2);
            $this->center["y"] = floor(($this->y1 + $this->y2) / 2);
        }

        public function intersect($room){
            return($this->x1 <= $room->x2 && $this->x2 >= $room->x1 &&
                $this->y1 <= $room->y2 && $room->y2 >= $room->y1);
        }
    }

    class Map{

        const MIN_ROOM_SIZE = 4;
        const MAX_ROOM_SIZE = 12;
        const MAP_WIDTH     = 50;
        const MAP_HEIGHT    = 50;
        const MAX_ROOMS     = 15;

        public $rooms = array();
        public $matrix;

        public function __construct(){
            $this->createMatrix(50);
            $this->initMatrix();
        }

        private function hcorridor($x1, $x2, $y){
            for($x = min($x1, $x2); $x <= max($x1,$x2); $x++){
                $this->matrix[$x][$y] = 0;
            }
        }

        private function vcorridor($y1, $y2, $x){
            for($y = min($y1, $y2); $y <= max($y1,$y2); $y++){
                $this->matrix[$x][$y] = 0;
            }
        }

        public function placePlayer(){
            $nbRoom = rand(0, count($this->rooms));

            $x = $this->rooms[$nbRoom]->center["x"];
            $y = $this->rooms[$nbRoom]->center["y"];

            $this->matrix[$x][$y] = 2;
        }

        public function placeRooms(){
            
            $nbRooms = rand(6, self::MAX_ROOMS);

            for($i = 0; $i < $nbRooms; $i++){
                
                $w = self::MIN_ROOM_SIZE + rand(0, self::MAX_ROOM_SIZE - self::MIN_ROOM_SIZE + 1);
                $h = self::MIN_ROOM_SIZE + rand(0,self::MAX_ROOM_SIZE - self::MIN_ROOM_SIZE + 1);
                $x = rand(0, self::MAP_WIDTH - $w -1) + 1;
                $y = rand(0, self::MAP_HEIGHT - $h -1) + 1;
                
                $room = new Room($x, $y, $w, $h);

                $failed = false;

                for($j = 0; $j < count($this->rooms); $j++){
                    if($room->intersect($this->rooms[$j])){
                        $failed = true;
                        break;                        
                    }
                }
                
                if(!$failed){


                    $newCenter = $room->center;

                    if(count($this->rooms)){
                        $prevCenter = $this->rooms[count($this->rooms)-1]->center;

                        if(rand(1,2) == 1){
                            $this->hcorridor($prevCenter["x"], $newCenter["x"], $prevCenter["y"]);
                            $this->vcorridor($prevCenter["y"], $newCenter["y"], $prevCenter["x"]);
                        }else{
                            $this->vcorridor($prevCenter["y"], $newCenter["y"], $prevCenter["x"]);
                            $this->hcorridor($prevCenter["x"], $newCenter["x"], $prevCenter["y"]);
                        }

                    }

                    array_push($this->rooms, $room);
                }else{
                    $nbRooms++;
                }

            }
        }

        private function createMatrix($size=50){
            $this->matrix = array();
          
            for($i = 0; $i < $size; $i++){
                $this->matrix[$i] = array();
            }
        }

        private function initMatrix(){
            for ($i=0; $i < count($this->matrix); $i++) { 
                for($j = 0; $j < count($this->matrix); $j++){
                    $this->matrix[$i][$j] = -1;
                }
            }
        }

        public function printMatrixContent(){
            
            for ($i=0; $i < count($this->matrix); $i++) { 

                for($j = 0; $j < count($this->matrix); $j++){
                    echo $this->matrix[$i][$j];
                }
                echo "</br>";
            }
        }

        public function mapToMatrix(){

            if(isset($this->rooms)){

                for($i = 0; $i < count($this->rooms); $i++){
                    for($j = $this->rooms[$i]->x1; $j < $this->rooms[$i]->x2; $j++){

                        for($k = $this->rooms[$i]->y1; $k < $this->rooms[$i]->y2; $k++){

                            if($j == $this->rooms[$i]->center['x']){
                                $this->matrix[$j][$k] = 0;
                            }else if($k == $this->rooms[$i]->center['y']){
                                $this->matrix[$j][$k] = 0;
                            }
                            else if($k == $this->rooms[$i]->y1 || $k+1 == $this->rooms[$i]->y2 || $j == $this->rooms[$i]->x1 || $j+1 == $this->rooms[$i]->x2){
                                $this->matrix[$j][$k] = 1;
                            }else
                                $this->matrix[$j][$k] = 0;
                        }

                    }
                }

            }
        }

    }
    $map   = new Map();

    $map->placeRooms();
    $map->mapToMatrix();
    $map->placePlayer();

    $json = json_encode($map->matrix);
    echo $json;
?>