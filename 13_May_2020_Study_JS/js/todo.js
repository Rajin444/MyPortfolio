const form = document.querySelector(".js-to-do"),
    input = document.querySelector(".js-add-to-do"),
    list = document.querySelector(".js-list");

function addToDo(inputValue){
    const toDo = document.createElement("li");
    toDo.className = "toDo";

    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = "❌";
    deleteBtn.className = "toDo__button";
    deleteBtn.addEventListener("click", clickDelete);

    const label = document.createElement("label");
    label.innerText = inputValue;
    
    //ul -> li -> label
    toDo.appendChild(label);
    toDo.appendChild(deleteBtn);
    list.appendChild(toDo);
}

function clickDelete(event){
    //alert("삭제할꺼니?");
    alert(event.target.parentElement.parentElement);
}

function onSubmit(oziraper){
     //이벤트의 버블링을 막아줘서, 새로고침을 막는 것이야
     oziraper.preventDefault();

     if (input.value === "") {
        //아무것도 입력하지 않은 채 보내면
        //alert("아무것도 안했구나?");
    } else {
        //입력된 TEXT를 할일로 추가해라.
        addToDo(input.value);
        
        //입력된 TEXT를 할일로 추가햇으면 input 공간을 다시 비워줘라.
        input.value = "";
    }
}

function loadToDos() {
    const loadedToDos = localStorage.getItem("toDos");

    if (loadToDos !== null) {
        //ul 태그안에 그려주자~
    } else {
        //ul 태그안에 할일이 없다고 써줍시다.
    }
}

function init() {
    //로컬스토리지에 저장된 to-do-list를 불러온다.
    loadToDos();

}

//submit은 function 안에 있으면, 특정 조건이 되어야만 호출되!
//그러니까 function 밖에 만들어야되!! 그래야지 변화가 있을 때마다 반응해!
//항상 귀를 열고있는 착한놈ㅎ
//addEventListener(행동 ex)click, submit, onmousedown, onmouseup, change,)
form.addEventListener("submit", onSubmit);

init();
