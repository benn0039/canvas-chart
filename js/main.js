
document.addEventListener("DOMContentLoaded", init);

function init() {

    var newElem = document.createElement('script');
    newElem.addEventListener("load", drawEverything);

    var jj = document.querySelector('#jj');
    newElem.setAttribute('src', 'js/cheese.js');
    jj.appendChild(newElem);
}

function drawEverything() {
    drawMeSomePie();
    drawMeABar();  
}


function drawMeSomePie() {
    // 
    var canvas = document.querySelector('#pie-graph'),
        context = canvas.getContext('2d');
    var recordCount = cheese.segments.length,
        totalValue = 0,
        factor = 0,
        roundTheWorld = Math.PI * 2,
        x = canvas.width / 2,
        y = canvas.height / 2,
        baselineRadius = 300,
        adjustedRadius = baselineRadius,
        startAngle = 0,
        endAngle = 0,
        midAngle = 0,
        minMax = [],
        biggestValue = 0,
        smallestValue = 0,
        bigFactor = .9,
        smallFactor = 1.1;


    // get the aggregate value
    for (var i = 0; i < recordCount; i++) {
        totalValue += cheese.segments[i].value;
        // create simple array for finding biggest and smallest values
        minMax.push(cheese.segments[i].value);
    }
    // find biggest and smallest value in array
    biggestValue = Math.max.apply(null, minMax);
    smallestValue = Math.min.apply(null, minMax);
    //array no longer needed
    minMax = 0;

    factor = roundTheWorld / totalValue;

    // Cycle through each record and draw portions.
    for (i = 0; i < recordCount; i++) {

        // check for and apply different radius value
        if (biggestValue === cheese.segments[i].value) {
            adjustedRadius = baselineRadius * bigFactor;
        }
        if (smallestValue === cheese.segments[i].value) {
            adjustedRadius = baselineRadius * smallFactor;
        }
        // 
        endAngle += cheese.segments[i].value * factor;
        context.fillStyle = cheese.segments[i].color;
        context.strokeStyle = '#ffffff';
        context.lineWidth = 5;
        context.moveTo(x, y);
        context.beginPath();
        context.arc(x, y, adjustedRadius, startAngle, endAngle, false);
        context.lineTo(x, y);
        context.fill();
        context.stroke();
        

        // Draw leader
        midAngle = (startAngle + endAngle) / 2;
        context.save();
        context.translate(x, y);
        context.strokeStyle = "#333";
        context.lineWidth = 1;
        context.beginPath();
        var dx = Math.cos(midAngle) * (adjustedRadius * .5);
        var dy = Math.sin(midAngle) * (adjustedRadius * .5);
        context.moveTo(dx, dy);
        dx = Math.cos(midAngle) * (adjustedRadius + 50);
        dy = Math.sin(midAngle) * (adjustedRadius + 50);
        context.lineTo(dx, dy);
        context.stroke();

        //recalculate for caption position
        dx = Math.cos(midAngle) * (adjustedRadius + 80);
        dy = Math.sin(midAngle) * (adjustedRadius + 80);

        // add data caption for each leader
        context.fillStyle = "#333333";
        context.font = '20pt Calibri';
        context.textAlign = 'center';
        context.fillText(cheese.segments[i].label, dx, dy);
        context.restore();

        startAngle = endAngle;
        adjustedRadius = baselineRadius;
    }
}


function drawMeABar() {
    var canvas = document.querySelector('#bar-graph'),
        context = canvas.getContext('2d');
    var offset = 0,
        barWidth = 0,
        recordCount = cheese.segments.length,
        // need to double the factor again to account for HIDPI
        factor = 10,
        height = 0,
        lineLength = canvas.width * .8,
        margin = canvas.width * .1,
        currentPosition = 0,
        gridPosition = 0,
        gridStep = 0,
        gridlineColor= "";
    
        gridStep = lineLength / 10;
        gridlineColor = '#ffffff';
        gridPosition = gridStep;
    // available room number of records, equal number of offset plus leading offset
    barWidth = lineLength / ((recordCount * 2) + 1);
    offset = barWidth;
    

    // draw gridlines
    context.strokeStyle = 'rgba(196, 196, 196, 0.5)';
    context.lineWidth = 1;
    for (var i = 0; i < 9; i++) {
        context.beginPath();
        context.moveTo(margin - 15, margin + lineLength - gridPosition);
        context.lineTo(margin + lineLength, margin + lineLength - gridPosition);
        context.stroke();
        gridPosition += gridStep;
    }
    
    // set first position for bars
    currentPosition = offset + margin;
    
    // draw bars
    for (var i = 0; i < recordCount; i++) {

        height = factor * cheese.segments[i].value;
        context.beginPath();
        context.rect(currentPosition, lineLength -1 + margin, barWidth, -height);
        context.lineWidth = 4;
        context.fillStyle = 'rgba(224,132,11,0.6)';// 'rgba(151,187,205,0.5)'
        context.strokeStyle = 'rgba(224,132,11,0.8)';
        context.fill();
        context.stroke();
        
        // draw labels
        context.font = '20pt Calibri';
        context.fillStyle = '#333333';
        context.textAlign = 'center';
        context.fillText(cheese.segments[i].label, currentPosition + (offset / 2), lineLength - height);
        currentPosition += offset + barWidth;
    }
    
    //draw axis lines
    context.strokeStyle = '#333333';
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(margin, lineLength + margin);
    context.lineTo(lineLength + margin, lineLength + margin);
    context.stroke();

    context.beginPath();
    context.moveTo(margin, lineLength + margin);
    context.lineTo(margin, margin);
    context.stroke();
}