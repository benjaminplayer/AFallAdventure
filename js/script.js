/*
*   TODO:
*    - Multiprocessing with node js
*    - Add solving algorithm
*    - Randomly generate mazes
* 
*/

const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
resetButton.disabled = true;
const speed = 4;
startButton.addEventListener('click', () =>{
    let points = "234,2 234,10 170,10 170,26 202,26 202,42 186,42 186,90 170,90 170,74 154,74 154,90 138,90 138,74 122,74 122,58 106,58 106,42 58,42 58,58 90,58 90,106 122,106 122,122 106,122 106,138 138,138 138,186 122,186 122,234 106,234 106,250 122,250 122,266 90,266 90,298 74,298 74,266 58,266 58,282 42,282 42,266 10,266 10,282 26,282 26,298 58,298 58,314 42,314 42,330 26,330 26,314 10,314 10,362 26,362 26,346 42,346 42,362 58,362 58,330 74,330 74,394 90,394 90,362 106,362 106,378 122,378 122,394 154,394 154,426 138,426 138,442 170,442 170,458 186,458 186,426 170,426 170,394 186,394 186,410 202,410 202,426 314,426 314,442 298,442 298,458 314,458 314,474 282,474 282,458 266,458 266,474 250,474 250,482";
    let arr = create2DArrayFromCoordinates(points);
    arr = middlePoint(arr);
    drawSolution(arr, speed);
});

resetButton.addEventListener('click', () =>{
    if(checkReset())
        reset(speed);
});

function create2DArrayFromCoordinates(points) {
    // Split the input string into an array of coordinate pairs
    let coordinates = points.split(" ");

    // Map each coordinate pair into an array of [x, y]
    let result = coordinates.map(pair => {
        let [x, y] = pair.split(",").map(Number);
        return [x, y];
    });

    return result;
}

function drawSolution(points, speed) {

    //points="234,2 234,10 170,10 170,26 202,26 202,42 186,42 186,90 170,90 170,74 154,74 154,90 138,90 138,74 122,74 122,58 106,58 106,42 58,42 58,58 90,58 90,106 122,106 122,122 106,122 106,138 138,138 138,186 122,186 122,234 106,234 106,250 122,250 122,266 90,266 90,298 74,298 74,266 58,266 58,282 42,282 42,266 10,266 10,282 26,282 26,298 58,298 58,314 42,314 42,330 26,330 26,314 10,314 10,362 26,362 26,346 42,346 42,362 58,362 58,330 74,330 74,394 90,394 90,362 106,362 106,378 122,378 122,394 154,394 154,426 138,426 138,442 170,442 170,458 186,458 186,426 170,426 170,394 186,394 186,410 202,410 202,426 314,426 314,442 298,442 298,458 314,458 314,474 282,474 282,458 266,458 266,474 250,474 250,482"
    let polyPoints = "";
    let poly = document.querySelector("polyline");
    startButton.disabled = true;
    poly.setAttribute("points", "");
    poly.setAttribute('stroke','#ff0000');

        let index = 0;
        let interval = setInterval(() => {
            if (index >= points.length) {
                clearInterval(interval);
                resetButton.disabled = false;
                return;
            }

            polyPoints += " " + points[index];
            poly.setAttribute("points", polyPoints);
    
            index++;
        }, speed);

}


function reset(speed){
    let poly = document.querySelector("polyline");
    let polyPoints = poly.getAttribute('points');
    resetButton.disabled = true;
    let spaceIdx = 0;
    let interval = setInterval(() => {
        if(spaceIdx === -1){
            clearInterval(interval);
            startButton.disabled = false;
            poly.setAttribute('points','');
            return;
        }

        spaceIdx = polyPoints.indexOf(" ");
        polyPoints = polyPoints.substring(spaceIdx+1);
        poly.setAttribute('points', polyPoints);

    },speed)
}

function checkReset(){
    let poly = document.querySelector("polyline");
    return poly.getAttributeNames().includes("points");
}

mazeToGrid();

function mazeToGrid(){
    let svg = document.querySelector(".maze").children[0];
    let walls = document.querySelectorAll('line');
    console.log(walls);
    console.log(parseInt(svg.getAttribute('height')));
    let gridx =  parseInt(svg.getAttribute('height')), gridY = parseInt(svg.getAttribute('height'));
    let x1, x2, y1, y2;
    let grid = [];
    
    for (let i = 0; i < gridx; i++) {
        grid[i] = new Array(gridY).fill(0);
    }
    console.log(grid);

    for(let i = 0; i < walls.length; i++){
        x1 = parseInt(walls[i].getAttribute('x1'));
        x2 = parseInt(walls[i].getAttribute('x2'));
        y1 = parseInt(walls[i].getAttribute('y1'));
        y2 = parseInt(walls[i].getAttribute('y2'));

        //y je isti sam x se spreminja -> za vsak line da v grid 1 kot wall
        if(y1 == y2){
            for(let j = x1; j <=x2; j++){
                console.log(y1);
                grid[y1][j] = 1;
            }
        }
        else if(y1 != y2){
            for(let j = y1; j <= y2; j++){
                grid[j][x1] = 1;
            }
        }
    }

    addStartEnd();

    function addStartEnd(){
        let start = walls[0].getAttribute('y1');
        let end = walls[walls.length-1].getAttribute('y2');
        console.log("y1: "+start);
        console.log("end: "+end)

        let drawnStart = false

        //narderi da 0 da v 2;

        for(let i = 2; i < walls[0].length; i++){
            if(walls[i] == 0){
                
            }
        }

    
    }
    console.log(grid);


}

function middlePoint(points){
    let extra = "";
    let start, end;
    //points[x][y];

    for(let idx = 0; idx < points.length; idx++){
        if(idx === points.length-1)
            break;
        let start = points[idx];
        let end = points[idx+1];
        if(Math.abs(start[0]) == Math.abs(end[0])){ // x1 = x2 -> y spremeni
            extra += points[idx] + " " + start[0]+ "," + ((start[1]+end[1])/2)+" " + points[idx+1]+" ";
        }
        else if(Math.abs(start[1]) == Math.abs(end[1])){
            extra += points[idx] + " " + ((start[0]+end[0])/2) +","+ start[1]+" " + points[idx+1]+" ";
        }

    }
   let points2 = create2DArrayFromCoordinates(extra);
   return points2;
}