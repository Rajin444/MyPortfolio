const nameContainer = document.querySelector(".myName");

function drowName(name){
    //innerhtml을 비워준다.
    nameContainer.innerHTML = "";
    const drowName = document.createElement("span");
    drowName.className = "name_text";
    drowName.innerHTML = `Hello! ${name}!`;
    nameContainer.appendChild(drowName);
}

function handleSubmit(event){
//이벤트 하는 모든 부분을 번잡하지 않게 여기서 작성해줄 것
// preventDefault() --> 새로고침을 막아줌(오지랖막아줌)
   event.preventDefault();
   const form = event.target; 
   const input = form.querySelector("input");
   const name = input.value;
   //username을 키값으로 받아서 저장
   localStorage.setItem("username",name);
   drowName(name);
}

//이 안에서만 사용 가능, 밖으로 나오면 사용못함.
function drowInput(){
    const input = document.createElement("input");
    input.type = "text";
    input.className = "input_name";
    input.placeholder = "Type your name here!";

    const form = document.createElement("form");
    
    form.addEventListener("submit",handleSubmit);
    form.appendChild(input);
    nameContainer.appendChild(form);
}

function checkName(){
    const name = localStorage.getItem("username");
    if(name == null){
        //처음왔구나?
        //이름을 물어보고
        drowInput(); 
        //username이라는 키값으로 받은 이름을 저장하고 
        //innerhtml로 그 이름을 보여준다.
    }else{
        //또 왔네?
        drowName(name);
        //username 키값으로 저장된 이름을 가져와서 innerhtml로 컴컴
    }
}

function init(){
    checkName();
}

init();