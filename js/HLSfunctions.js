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
                var curY = current[keys[yColumn[j]]];
                curY = Array.isArray(curY)? curY[0] : curY;
                curY = Math.log10(curY);
                curY = linearlize(curY,minMax.minY,minMax.maxY,95);
                temp[keys[yColumn[j]]]=curY;
            }
        }else{
             for(var j = 0; j < yColumn.length; j ++){
                var curY = current[keys[yColumn[j]]];
                curY = Array.isArray(curY)? curY[0] : curY;
                curY = linearlize(curY,minMax.minY,minMax.maxY,95);
                temp[keys[yColumn[j]]]= 95 - curY;
            }  
        }
        result.push(temp);
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