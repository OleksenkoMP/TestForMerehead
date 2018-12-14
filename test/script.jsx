var objsFromJSON = readJSON();
var objPerPage = 5;
var pos = [['firstName', 'firstSurname', 'firstDesc'],
            ['secondName', 'secondSurname', 'secondDesc'],
                ['thirdName', 'thirdSurname', 'thirdDesc'],
                    ['fourthName', 'fourthSurname', 'fourthDesc'],
                        ['fifthName', 'fifthSurname', 'fifthDesc']];

if (!localStorage.getItem('lastPage')){
    var currentPage = 1;
} else {
    var currentPage = localStorage.getItem('lastPage');
}
if (objsFromJSON.length%objPerPage == 0) {
    var maxPages = objsFromJSON.length / objPerPage;
} else {
    var maxPages = (objsFromJSON.length - objsFromJSON.length % objPerPage)/objPerPage + 1;
}

preLoader(true);
pages();

function preLoader(loading) {
    if (loading) {
        ReactDOM.render(
            <img src={"u_1.png"}/>,
            document.getElementById("img")
        );
        for (var i = 0; i<5;i++){
            for (var j = 0; j < 3; j++) {
                forRender(<p/>,pos[i][j]);
            }
        }
        setTimeout(()=> {
            preLoader(false)
        }, 500)
    } else {
        ReactDOM.render(
            <img src={""}/>,
            document.getElementById("img")
        );
        pagesCutting();
    }

}
function readJSON() {
    var request = new XMLHttpRequest();
    request.open("GET","../users.json", false);
    request.send(null);
    var jsonData = JSON.parse(request.responseText);
    return jsonData.users;
}
function pages() {
    ReactDOM.render(
        <div>
            <button onClick={setPageNumber1}>1</button>
            <button onClick={setPageNumber2}>2</button>
            <button onClick={setPageNumber3}>3</button>
            <button onClick={setPageNumber4}>4</button>
        </div>,
        document.getElementById('pages')
    );

}
function setPageNumber1() {
    currentPage = 1;
    localStorage.setItem('lastPage', currentPage);
    preLoader(true);
}
function setPageNumber2() {
    currentPage = 2;
    localStorage.setItem('lastPage', currentPage);
    preLoader(true);
}
function setPageNumber3() {
    currentPage = 3;
    localStorage.setItem('lastPage', currentPage);
    preLoader(true);
}
function setPageNumber4() {
    currentPage = 4;
    localStorage.setItem('lastPage', currentPage);
    preLoader(true);
}
function pagesCutting() {
    for (var i = objPerPage * (currentPage - 1); i < objPerPage * currentPage; i++) {
        var strForPrint = [objsFromJSON[i].name, objsFromJSON[i].surname, objsFromJSON[i].desc];
        for (var j = 0; j < 3; j++) {
            var element = React.createElement('td', {}, strForPrint[j]);
            forRender(element, pos[i % objPerPage][j]);
        }
    }
}
function forRender(element, position) {
    ReactDOM.render(
        element,
        document.getElementById(position)
    );
}