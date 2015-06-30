
function convertData(data){
    var pts = new Array;
    var keys = Object.keys(data[0]);
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


function findMaxMinValue(data, xColumn, yColumn){
    xColumn = xColumn==null ? 0 : xColumn;
    yColumn = yColumn==null ? [-1] : yColumn;
    
    var keys = Object.keys(data[0]);
    var minX = 0, minY = 0, maxX = 0, maxY = 0;
    
    for(var i = 0; i < data.length; i++){
        curX = data[i][keys[xColumn]];
        curX = Array.isArray(curX) ? curX[0] : curX;
        minX = curX < minX ? curX : minX;
        maxX = curX > maxX ? curX : maxX;
        
        if(yColumn == -1)
        {
         for(var j = 0; j < keys.length; j++){
             if (j == xColumn)
                 continue;
             curY = data[i][keys[j]]
             curY = Array.isArray(curY) ? curY[0] : curY;
             minY = curY < minY ? curY : minY;
             maxY = curY > maxY ? curY : maxY;
         }   
        }else{
            for(var j = 0; j < yColumn.length; j++){
                curY = data[i][keys[j]]
                curY = Array.isArray(curY) ? curY[0] : curY;
                minY = curY < minY ? curY : minY;
                maxY = curY > maxY ? curY : maxY;
            }
        }    
    }
    var result = {minX: minX, minY: minY, maxX: maxX, maxY: maxY};
    
    return result;
}

function scale(data, minX, minY, maxX, maxY, logview){
    logview = (logview==="true")
    
	if(logview){
			logminY = minY == 0 ? 0 : Math.log10(minY);
			var temp = maxY == 0 ? 0 : parseInt(Math.log10(maxY));
			logmaxY = temp + 1;
	}

	for( var i = 0; i < data.length; i++){
		if (logview){
			data[i].x = linearlize(data[i], minX, maxX) + margin.left;
			var temp = data[i].y == 0 ? 0 : Math.log10(data[i].y);
			data[i].y = height - linearlize(temp, logminY, logmaxY, height) + margin.top;
		}
		else{
			data[i].x = linearlize(data[i].x, minX, maxX, width) + margin.left;
			data[i].y = height - linearlize(data[i].y, minY, maxY, height) + margin.top;
		}
	}
	return data;
}

function linearlize(data, min, max, size){
	return ((data - min) / (max - min)) * size ;
}