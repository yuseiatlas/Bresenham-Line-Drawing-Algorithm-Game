var para = document.getElementById("para");
var menu = document.getElementById("menu");
var submit = document.getElementById("submit");
var solve = document.getElementById("solve");
var next=document.getElementById("next");
var custom = document.getElementById("custom");
var table = document.getElementById("gameTable");
var levelDecoration=null;
var rows = 0,
columns = 0,
score = 0,
level=0,
overall = 0;

// hide/show custom input based on drop-down menu choice
menu.onchange = function() {
    //if choice is "Custom" show the input fields and labels
    //else hides them again
    if (menu.options[menu.selectedIndex].value == "5") {
        document.getElementById("rows").removeAttribute("hidden");
        document.getElementById("columns").removeAttribute("hidden");
        document.getElementById("label1").removeAttribute("hidden");
        document.getElementById("label2").removeAttribute("hidden");
    } else {
        document.getElementById("rows").setAttribute("hidden", "hidden");
        document.getElementById("columns").setAttribute("hidden", "hidden");
        document.getElementById("label1").setAttribute("hidden", "hidden");
        document.getElementById("label2").setAttribute("hidden", "hidden");
        submit.click();
    }
}

//starting a new games based on the difficulty level chosen by the user
submit.addEventListener("click", function() {
    //making the solve button visible
    solve.removeAttribute("hidden");
    next.setAttribute("hidden", "hidden");
    var difficulty = menu.options[menu.selectedIndex].value;
    var html = "";
    var margin=0;
    //generating the correct html rows/columns that corresponds to the 
    //chosen difficulty level
    switch (parseInt(difficulty)) {
        case 1: //Beginner
        if(levelDecoration!=null)
        levelDecoration.setAttribute("style", "color:lime; font-weight:bolder;");
        rows = 1+Math.round(Math.random()+level);
        if (rows != 1) 
        columns = 2+Math.round(Math.random()+level);
        else columns =3;
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < columns; j++) {
                html += "<td> </td>";
            }
            html += "</tr>";
        }
        //margin=550;
        break;
        case 2: //Intermidiate
        if(level==0)
            level=7; //start at level 7 if the user chose intermidate difficulty
        if(levelDecoration!=null)
        levelDecoration.setAttribute("style", "color:green; font-weight:bold;");
        rows = 4+Math.round(Math.random()+level);
        columns = 6+Math.round(Math.random()+level);
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < columns; j++) {
                html += "<td> </td>";
                console.log("beginner");
            }
            html += "</tr>";
        }
        //margin=500;
        break;
        case 3: //Hard
        if(level==0)
            level=12; //start at level 12 if the user chose hard difficulty
        if(levelDecoration!=null)
        levelDecoration.setAttribute("style", "color:orange; font-weight:bold;");
        rows = 6+Math.round(Math.random()+level);
        columns = 8+Math.round(Math.random()+level);
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < columns; j++) {
                html += "<td> </td>";
                console.log("beginner");
            }
            html += "</tr>";
        }
        //margin=450;
        break;
        case 4: //Hell
        if(level==0)
        level=17; //start at level 17 if the user chose hell difficulty
        if(levelDecoration!=null)
        levelDecoration.setAttribute("style", "color:red; font-weight:bold;");
        rows = 8+Math.round(Math.random()+level);
        columns = 12+Math.round(Math.random()+level);
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < columns; j++) {
                html += "<td> </td>";
            }
            html += "</tr>";
        }
       // margin=400;
        break;
        case 5: //Custom difficulty level
        rows = document.getElementById("rows").value;
        columns = document.getElementById("columns").value;
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < columns; j++) {
                html += "<td> </td>";
            }
            html += "</tr>";
        }
        //margin=columns*500/columns;
        break;
        case 6: //Custom difficulty level
        rows = Math.round(Math.random()*30);
        columns = Math.round(Math.random()*30);
        console.log("rows: "+rows);
        console.log("columns: "+columns);
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < columns; j++) {
                html += "<td> </td>";
            }
            html += "</tr>";
        }
        //margin=columns*500/columns;
        break;
        default:
        console.log("default");
        break;
    }
    margin=getMargin(columns);
    table.innerHTML = html;
    document.getElementById("data").style.marginLeft = margin+"px";
    
    drawStart(0,0); //makes the first and last block black
    drawStart(rows-1,columns-1);
});

//initializing the first game
submit.click();

//initiates the solving operation of the bresenham line algorithm
//updates the score accordingly
solve.addEventListener("click", function() {
   bresenhamLine(0, 0, rows - 1, columns - 1);
   calculateScore();
   next.removeAttribute("hidden");
});

next.addEventListener("click", function(){
    submit.click();
});

//colors the clicked on cell in the table
document.onclick = function(event) {
    var target = event.target

    if (target.nodeName === "TD") {
        if(!target.hasAttribute("class") || target.getAttribute("class").includes("undo")){
            target.setAttribute("class", "clicked");
        }
        else{// if(target.getAttribute("class").includes("clicked")){
            target.setAttribute("class", target.getAttribute("class").replace("clicked","undo"));
            console.log(target.getAttribute("class"));

        }
    }
};

//calculates points for the Bresenham Line algorithm
var  bresenhamLine = function(x0, y0, x1, y1) {
    if (x0 == x1 && y0 == y1) {
        draw(x0, y0);
        return;
    }

    var dx = x1 - x0;
    var sx = (dx < 0) ? -1 : 1;
    var dy = y1 - y0;
    var sy = (dy < 0) ? -1 : 1;

    if (Math.abs(dy) < Math.abs(dx)) {
        var m = dy / dx;
        var b = y0 - m * x0;

        while (x0 != x1) {
            draw(x0, parseInt(Math.round(m * x0 + b)));
            x0 += sx;
        }
    } else {
        var m = dx / dy;
        var b = x0 - m * y0;

        while (y0 != y1) {
            draw(parseInt(Math.round(m * y0 + b)), y0);
            y0 += sy;
        }
    }

    draw(x1, y1);
};

//traversing the table to color the correct cells for the Bresenham Algorithm
function draw(x, y) {
	if(table.rows[x].cells[y].hasAttribute("class")){
        table.rows[x].cells[y].setAttribute("class", table.rows[x].cells[y].getAttribute("class") + " final");
        console.log("hello");
    }
    else{
    	table.rows[x].cells[y].setAttribute("class", "final");
    }
}
//Color the start and end square black
function drawStart(x, y) {
    if(table.rows[x].cells[y].hasAttribute("class")){
        table.rows[x].cells[y].setAttribute("class", table.rows[x].cells[y].getAttribute("class") + " start");
        console.log("hello");
    }
    else{
        table.rows[x].cells[y].setAttribute("class", "start");
    }
}

//function that calculates the users score and the overall possible score
//calculates the winning percentage accordingly
function calculateScore() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            if(table.rows[i].cells[j].getAttribute("class")!=null &&
                table.rows[i].cells[j].getAttribute("class").includes("start")){
                continue;
            }else if (table.rows[i].cells[j].getAttribute("class") == "clicked final") { //correct solution
                score++;
                overall++;
            } else if ( table.rows[i].cells[j].getAttribute("class")!=null &&
            table.rows[i].cells[j].getAttribute("class").includes("final")) { //required solution not chosen by the user 
                overall++;
            } else if (table.rows[i].cells[j].getAttribute("class") == "clicked") { //cells not in the solution chosen by the
                //score--;                                                            //user
            }
        }
    }
    var rate = score * 100 / overall;
    if(isNaN(rate)) rate=0;
    increaseLevel(level); //increading difficulty depending on the level
    para.innerHTML = "<span id=\"level\">LEVEL: "+(++level)+"</span><br>Current Score: " + 
                        score+ " out of " + overall + "<br>Success rate: " + roundQuarter(rate) + "%";

    levelDecoration=document.getElementById("level");
}

//Rounding off results to the nearest quarter
function roundQuarter(num) {
    return Math.round(num * 4) / 4;
}
//increasing he level every 5 levels
function increaseLevel(level){
    menu.setAttribute("disabled", "disabled");
    if(level<6){
        menu.options[0].selected='selected';
    }else if(level<11){
        menu.options[1].selected='selected';
    }else if(level<16){
        menu.options[2].selected='selected';
    }else{
        menu.options[3].selected='selected';
    }
}
//sets margin depending on the number of columns
function getMargin(columns){
    console.log(50*columns/2);
    console.log(window.innerWidth/2);
    return Math.abs((window.innerWidth/2)-(50*columns/2));
}