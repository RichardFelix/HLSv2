///////////////////////////////////////////////////////////////////////
///                initial Javascript                               ///
///////////////////////////////////////////////////////////////////////
function createInitDivs(){
    
    var myAppDiv = document.createElement('div');
        myAppDiv.setAttribute('ng-app', 'myApp');
        myAppDiv.setAttribute('id', 'myAppDiv');
        document.body.appendChild(myAppDiv);
    var controller = document.createElement('div');
        controller.setAttribute('ng-controller', 'myController');
        document.getElementById('myAppDiv').appendChild(controller);
}

window.onload = createInitDivs;

///////////////////////////////////////////////////////////////////////
///                   Wrapper Functions                             ///
///////////////////////////////////////////////////////////////////////
