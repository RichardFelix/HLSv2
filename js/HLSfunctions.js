
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

function findMaxminSumValue(data, xColumn, yColumn, keys){

    var minX = 0, minSumY = 0, maxX = 0, maxSumY = 0;
    
    for(var i = 0; i < data.length; i++){
        var curX = data[i][keys[xColumn]];
        curX = Array.isArray(curX) ? curX[0] : curX;
        minX = curX < minX ? curX : minX;
        maxX = curX > maxX ? curX : maxX;
        
        var temp = 0;
         for(var j = 0; j < yColumn.length; j++){
             var curY = data[i][keys[yColumn[j]]]
             curY = Array.isArray(curY) ? curY[0] : curY;
             temp = temp + curY;
         }   
        minSumY = temp < minSumY ? temp : minSumY;
        maxSumY = temp > maxSumY ? temp : maxSumY;
    }

    var result = {minX: minX, minY: minSumY, maxX: maxX, maxY: maxSumY};
    
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

function scaleStackChart(data, xColumn, yColumn, keys, minMax){
    
    var result = new Array();
    var barSize = 100/(2*data.length);
    for (var i = 0; i < data.length; i++){
        var temp = {};
        var current = data[i];
        var curX = current[keys[xColumn]];
        curX  = Array.isArray(curX)? linearlize(curX[0], minMax.minX, minMax.maxX, 100): linearlize(curX, minMax.minX, minMax.maxX, 100);
        temp[keys[xColumn]] = curX - barSize/2;
        var totalY = 0;
        for(var j = 0; j < yColumn.length; j ++){
            var key = keys[yColumn[j]];
            var curY = current[key];
            curY = Array.isArray(curY)? curY[0] : curY;
            totalY = totalY + curY;
            curY = linearlize(totalY,minMax.minY,minMax.maxY,95);
            temp[key]= 95 - curY;
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
    var result = new Array();
    
    for(var i = 0; i < yColumn.length; i++){
        var tmp = "0,0 "
        var temp = "";
        for(var j = 0; j < pts.length; j++){
            var curX = pts[j][keys[xColumn]];
            var curY = pts[j][keys[yColumn[i]]];
            temp = temp + curX + "," + curY +" ";
            if(j != pts.length-1)
                tmp = tmp + curX + "," + curY +" ";
        }
        result.push({path:temp, animation:tmp});
    }
    return result;
}

function createBarChartPts(pts, xColumn, yColumn, keys){
    var result = new Array();
    var barSize = 100/(pts.length*(yColumn.length+0.5)-0.5);
    for(var i = 0; i < yColumn.length; i++){
        var temp = new Array();
        var key = keys[yColumn[i]];
        for(var j = 0; j < pts.length; j++){
            var curX = barSize * i + yColumn.length * barSize * j + barSize/2 * j;
            var curY = pts[j][key];
            temp.push({
              x:curX,
              y:curY
            });
        }
        result.push(temp);
    }
    return result;
}

function createStackChartPts(pts,xColumn,keys){
    var key = keys[xColumn];
    for(var i = 0; i < pts.length; i++){
        
        
        
        
        
    }
    return pts;
}


function createXBarTicks(data,pts,xColumn, keys){
    var result = new Array();
    var key = keys[xColumn];
    var barSize = 100/(pts.length*(pts.length+0.5)-0.5);

    var isStrings = Array.isArray(data[0][key]);
    
    if (isStrings){
        for(var i = 0; i < data.length; i++){
            var pos = 0;
            for(var j = 0; j < pts.length; j++){
                pos = pts[j][i].x + pos;
            }
            pos = pos / pts.length;
            result.push({            
                text: data[i][key][1],
                x: pos
            });
        }    
    } else {
        var allX = new Array();
        for (var i = 0; i < data.length; i++)
            allX.push(data[i][key]);
        allX.sort();
        for(var i = 0; i < allX.length; i++){
            var pos = 0;
            for(var j = 0; j < pts.length; j++){
                pos = pts[j][i].x + pos;
            }
            pos = pos / pts.length;
            result.push({            
                text: allX[i],
                x: pos
            });
        }  
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
	var colors = ["blue", "green", "orange", "yellow", "brown", "red", "pink"];
	var remain = dimension%7;
	return colors[remain];

}