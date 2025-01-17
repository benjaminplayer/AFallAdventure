const line = [12][12];

const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

startButton.addEventListener('click', () =>{
    let points = "234,2 234,10 170,10 170,26 202,26 202,42 186,42 186,90 170,90 170,74 154,74 154,90 138,90 138,74 122,74 122,58 106,58 106,42 58,42 58,58 90,58 90,106 122,106 122,122 106,122 106,138 138,138 138,186 122,186 122,234 106,234 106,250 122,250 122,266 90,266 90,298 74,298 74,266 58,266 58,282 42,282 42,266 10,266 10,282 26,282 26,298 58,298 58,314 42,314 42,330 26,330 26,314 10,314 10,362 26,362 26,346 42,346 42,362 58,362 58,330 74,330 74,394 90,394 90,362 106,362 106,378 122,378 122,394 154,394 154,426 138,426 138,442 170,442 170,458 186,458 186,426 170,426 170,394 186,394 186,410 202,410 202,426 314,426 314,442 298,442 298,458 314,458 314,474 282,474 282,458 266,458 266,474 250,474 250,482";
    let arr = create2DArrayFromCoordinates(points);
    drawSolution(arr); 
});

resetButton.addEventListener('click', () =>{
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
    poly.setAttribute("points", "");
    poly.setAttribute('stroke','#ff0000');

        let index = 0;
        let interval = setInterval(() => {
            if (index >= points.length) {
                clearInterval(interval);
                return;
            }
    
            polyPoints += " " + points[index]; 
            poly.setAttribute("points", polyPoints);
    
            index++;
        }, 10);

}

function reset(){
    //naredi nov polyline in nrdi stroke white
    let poly = document.querySelector("polyline");
    let polyPoints = poly.getAttribute('points');
    let idx = 1;
    poly.setAttribute('stroke','#fff');
    let points = create2DArrayFromCoordinates(polyPoints);
    polyPoints = "";

    let interval = setInterval(() => {
        if (idx >= points.length) {
            clearInterval(interval);
            return;
        }


        // naredi da odsteva polypoints od zacetka alpa da filla iste z fffff

        polyPoints += " " + points[idx]; 
        poly.setAttribute("points", polyPoints);
        console.log(polyPoints + " =>");
        idx++;
    }, 10);
}

