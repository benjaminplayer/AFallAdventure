
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
resetButton.disabled = true;

startButton.addEventListener('click', () =>{
    let points = "234,2 234,10 170,10 170,26 202,26 202,42 186,42 186,90 170,90 170,74 154,74 154,90 138,90 138,74 122,74 122,58 106,58 106,42 58,42 58,58 90,58 90,106 122,106 122,122 106,122 106,138 138,138 138,186 122,186 122,234 106,234 106,250 122,250 122,266 90,266 90,298 74,298 74,266 58,266 58,282 42,282 42,266 10,266 10,282 26,282 26,298 58,298 58,314 42,314 42,330 26,330 26,314 10,314 10,362 26,362 26,346 42,346 42,362 58,362 58,330 74,330 74,394 90,394 90,362 106,362 106,378 122,378 122,394 154,394 154,426 138,426 138,442 170,442 170,458 186,458 186,426 170,426 170,394 186,394 186,410 202,410 202,426 314,426 314,442 298,442 298,458 314,458 314,474 282,474 282,458 266,458 266,474 250,474 250,482";
    let arr = create2DArrayFromCoordinates(points);
    drawSolution(arr);
});

resetButton.addEventListener('click', () =>{
    if(checkReset())
        reset();
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


function drawSolution(points) {

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
        }, 10);

}

function reset(){
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

    },10)
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
    console.log(svg.getAttribute('height'));
    let grid = [svg.getAttribute('height')][svg.getAttribute('width')];
    console.log(grid);
    let x1;
    let x2;
    let y;




    for(let i = 0; i < walls.length; i++){
        x1 = walls[i].querySelector('x1');
        x2 = walls[i].querySelector('x2');
        y = walls[i].querySelector('y1');



        //y je isti sam x se spreminja -> za vsak line da v grid 1 kot wall
        for(let j = x1; x1 <=x2; j++){
            grid[y][j] = 1;
        }

    }

    
}
