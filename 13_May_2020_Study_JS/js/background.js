const body = document.querySelector("body"),
    locationtext = document.querySelector(".location_text");

//대문자로 정해진 변수는 절대로 변하지 않는다.
const API_KEY = "R7qHyr8iBlsBzXcpa1uEBHJ1Qdh6aQhKsroZL3DU-XE";
const IMGEURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&orientation=landscape&query=coding`;

function saveBackGround(url,city,country,name){
    //하나의 스토리지로 할 수 있겠다.
    //오늘 날짜를 일단 불러오고
    //유통기한을 오늘 날짜 +1 저장해놓고
    //불러올때 유통기한이 오늘보다 작다면 다시요청
    //불러올때 유통기한이 남았으면, 그냥 받아온 값 쓴다.
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    const imageObject = {
        url: url,
        expireDate : expireDate,
        city : city,
        country : country,
        name : name
    };
    localStorage.setItem("background",imageObject);
    //불러와야겠다.
}

function getBackGround(){
    //API URL로 요청하고, 반환받아서, localStorage에 저장하고, fetch(url)
    // 주석된 건 구식 방식이래요~~
    //fetch((IMGEURL)
     //   .then(function(response){
     //       return response.json();
     //   })
     //   .then(function(myJson){
     //       console.log(JSON.stringify(myJson));
     //   });
    //만약에 실패하면 다시 요청한다.

    fetch(IMGEURL)
    .then(response => response.json())
    .then(json=>{
        const image = json;
        if(image.urls == true && image.urls.full && image.location.city && image.location.country && image.location.name){
        const full = image.urls.full;
        const city = image.location.city;
        const country = image.location.country;
        const name = image.location.name;
    
        //불러온 사진URL과 도시이름, 나라이름, NAME을 localStorage에 저장해야한다.
            saveBackGround(full,city,country,name);
        }else{
            //만약에 실패하면 다시 요청한다.
            //실패했어? 다시 돌려봐!!!
            getBackGround();
        }
    });
}

function loadBackGround(){
    //저장된 키값은 변경될 일이 없고, 다시 선언되지 않아야하므로 상수인 const로 선언한다.
    const savedImage = localStorage.getItem("background");
    //저장된 키 값이 있고, 없고로 나눈다.
    if(savedImage == null){
        //로컬 스토리지에 background라는 키 값을 가진 value가 없는 조건
        //얻어오자!!!!!!!!!
    }else{
        //있는 조건
        //그려주자!!!!!!!!
    }
}

function init(){
    loadBackGround();

}

init();