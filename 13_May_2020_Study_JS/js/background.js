const body = document.querySelector("body") ,
// style을 넣어줄 변수
locationText = document.querySelector(".location_text");

const API_KEY = "R7qHyr8iBlsBzXcpa1uEBHJ1Qdh6aQhKsroZL3DU-XE";

const IMAGEURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&orientation=landscape&query=coding`;

function saveBackGround(url,city,country,name){
   
    //저장하기전에 기존에 있는 값을 지워줄께~
    const savedImage = localStorage.getItem("background");
    if(savedImage !== null){
        localStorage.removeItem("background");
    }
    const expireDate = new Date();
  
    expireDate.setDate(expireDate.getDate() + 1);
    
    
    const imageObject = {
        url : url,
        expireDate : expireDate,
        city : city,
        country : country,
        name : name
    };

    //JSON으로 변환해서 불러와야한다.
    // 불러와야겠다.
    localStorage.setItem("background",JSON.stringify(imageObject));
    

}




function getBackGround(){
// API URL로 요청하고, 반환받아서, localStorage에 저장하고,
//     fetch(IMAGEURL)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });

fetch(IMAGEURL)
.then(response => response.json())
.then(json=>{
    const image = json;
    if(image.urls && image.urls.full && image.location.city && image.location.country && image.location.name){
     // 불러된 사진 URL과, 도시 이름과, 나라이름과, NAME을 locationStorage에 저장해야함
    const full = image.urls.full;
    const city = image.location.city;
    const country = image.location.country;
    const name = image.location.name;
    saveBackGround(full,city,country,name);
    }else{
        // 만약에 실패하면 다시 요청한다.
        // 다시 돌려!!!~~
        getBackGround();
    }
   
});
  
}

function loadBackGround(){
    // 저장된 키값은 변경될 일이 없고, 다시 선언되지 않아야 하므로
    // 상수인 const로 선언
    const savedImage = localStorage.getItem("background");
    if(savedImage === null){
        // 로컬 스토리지에 있는 background라는 키값을 가진 value가 없는 조건
        // 얻어와라
        getBackGround();
    }else {
        const parsedImageObject = JSON.parse(savedImage);
        //console.log(parsedImageObject.expireDate);
        // 있는 조건
        // 그려줘라
        // 불러올 때 유통기한이 오늘보다 작다면 다시 요청
        const today = new Date();
        if(today > parsedImageObject.expireDate){
            getBackGround();
        }else{
            body.style.background=`url(${parsedImageObject.url})`;
            locationText.innerHTML = `${parsedImageObject.name},${parsedImageObject.city},${parsedImageObject.country}` 
        }
        // 불러올 때 유통기한이 남았으면, 그냥 받아온 값 쓴다.
        // 오늘 날짜를 일단 불러오고
        // 유통기한을 오늘 날짜 + 1로 저장해놓고

        //savedImage는 String화가되서 하나의 문자열로 인식이 된다.
    }
}

function init(){

    loadBackGround();

}

init();