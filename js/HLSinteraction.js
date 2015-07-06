function onclickcall(evt){
    
    var classes = evt.getAttribute("class");
    var parentDiv = evt.parentNode.parentNode.parentNode.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);
    console.log(classes);
}