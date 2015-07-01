
function convertData(data, keys){
    var pts = new Array();
    for (var i = 0; i < data.length; i++){ 
        var temp = {};
        for ( var j = 0; j < keys.length; j++){
            var cur = Number(data[i][keys[j]]);    
                if (isNaN(cur)){
                    cur = [i, data[i][keys[j]]];
                }
            temp[keys[j]]=cur;
        }
        pts.push(temp);
                    
    }
    return pts;
}


function findMaxMinValue(data, xColumn, yColumn, keys){

    var minX = 0, minY = 0, maxX = 0, maxY = 0;
    
    for(var i = 0; i < data.length; i++){
        curX = data[i][keys[xColumn]];
        curX = Array.isArray(curX) ? curX[0] : curX;
        minX = curX < minX ? curX : minX;
        maxX = curX > maxX ? curX : maxX;
        
         for(var j = 0; j < yColumn.length; j++){
             curY = data[i][keys[yColumn[j]]]
             curY = Array.isArray(curY) ? curY[0] : curY;
             minY = curY < minY ? curY : minY;
             maxY = curY > maxY ? curY : maxY;
         }   
    }

    var result = {minX: minX, minY: minY, maxX: maxX, maxY: maxY};
    
    return result;
}
function scale(data, xColumn, yColumn, keys, minMax, logview){
    logview = (logview==="true")
    
    var result = new Array();
    
	if(logview){
			minMax.minY = minMax.minY == 0 ? 0 : Math.log10(minMax.minY);
			var temp = minMax.maxY == 0 ? 0 : parseInt(Math.log10(minMax.maxY));
			minMax.maxY = temp + 1;
	}
    
    for (var i = 0; i < data.length; i++){
        var temp = {};
        var current = data[i];
        var curX = current[keys[xColumn]];
        curX  = Array.isArray(curX)? linearlize(curX[0], minMax.minX, minMax.maxX, 100): linearlize(curX, minMax.minX, minMax.maxX, 100);
        temp[keys[xColumn]] = curX;
        if(logview){
            for(var j = 0; j < yColumn.length; j ++){
                var key = keys[yColumn[j]];
                var curY = current[key];
                curY = Array.isArray(curY)? curY[0] : curY;
                curY = Math.log10(curY);
                curY = linearlize(curY,minMax.minY,minMax.maxY,95);
                temp[key]=curY;
            }
        }else{
             for(var j = 0; j < yColumn.length; j ++){
                var key = keys[yColumn[j]];
                var curY = current[key];
                curY = Array.isArray(curY)? curY[0] : curY;
                curY = linearlize(curY,minMax.minY,minMax.maxY,95);
                temp[key]= 95 - curY;
            }  
        }
        result.push(temp);
    }
    return result;
}

function makeXTicks(data, minMax, xColumn, keys){
    var isStrings = Array.isArray(data[0][keys[xColumn]]);
    var result = new Array();
    if(isStrings){
        for(var i = 0; i < data.length; i++){
            var cur = data[i][keys[xColumn]];
            var pos = linearlize(cur[0],minMax.minX,minMax.maxX,100);
            result.push({
                text: cur[1],
                x: pos
            })
        }
    } else{
        for(var i = 0; i <= 10; i++){
            var curValue = minMax.minX + (minMax.maxX-minMax.minX)*i/10; 
            curValue = parseInt(curValue);
            var pos = linearlize(curValue,minMax.minX,minMax.maxX,100);
            result.push({
                text: curValue,
                x: pos
            })
        }
    } 
    return result;
}

function makeYticks(data, minMax, yColumn, keys, logview){
    logview = (logview==="true");
    var result = new Array();
    if(logview){
        var maxY = minMax.maxY == 0 ? 1 : Math.log10(minMax.maxY) + 1;
        var minY = minMax.minY == 0 ? 0 : Math.log10(minMax.minY);
        for(var i = minY; i <= maxY; i++){
            var cur = Math.pow(10,i)/2;
            var pos = 95 - linearlize(cur, minY, maxY, 95);
            result.push({
                text: cur,
                y: pos
            })
            cur = Math.pow(10,i);
            pos = 95 - linearlize(cur, minY, maxY, 95);
            result.push({
                text: cur,
                y: pos
            })
        }
    }else{
        for(var i = 0; i <= 10; i++){
            var curValue = minMax.minY + (minMax.maxY-minMax.minY)*i/10;
            curValue = parseInt(curValue);
            var pos = 95 - linearlize(curValue, minMax.minY, minMax.maxY,95);
            result.push({
              text : curValue,
              y: pos
            })
        }
    }
    return result;
}

function createPolyLinePts(pts,xColumn, yColumn, keys){
    var result = new Array;
    for(var i = 0; i < yColumn.length; i++){
        
        
        
        
    }
    return result;
}



function linearlize(data, min, max, size){
	return ((data - min) / (max - min)) * size ;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function linearColor(dimension){
	var colors = ["blue", "green", "orange", "brown", "yellow", "red", "pink", "black", "grey", "white"];
	var remain = dimension%7;
	return colors[remain];

}