const WEATHER_API_KEY = "de9fe96171cca297607c9ee1b75cb96a";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";
// 하나의 함수에 하나의 기능을 담아주었다.

const sunriseContainer = document.querySelector(".js-weather .sunrise__text"),
weatherContainer = document.querySelector(".js-weather .weather__text");

function getWeather(crd){
    const WEATHER_API_URL = `${WEATHER_API}lat=${crd.latitude}&lon=${crd.longitude}&appid=${WEATHER_API_KEY}&units=metric`;
    fetch(WEATHER_API_URL)
    .then(response=>response.json())
    .then(json => {
        const currentTemp = json.main.temp;
        const Mycountry = json.sys.country;

        //타임 스탬프를 -> 현재시간으로 변환 
        //(*1000 해라~ : 이유는 밀리세컨드가 들어가야 시간이 반환되는데 밀리세컨드로 반환이 되서 시간을 알기위해서 필수!)
        const sunriseTime = new Date(json.sys.sunrise * 1000);

        //현재시간을 -> 타임스탬프 
        const practiceTimestamp = new Date().getTime() / 1000;
        //타임스탬프는 언제 쓰느냐~? api를 사용할 때 많이 요구한다.
        //console.log(Math.floor(practiceTimestamp));

        const sunriseHours = sunriseTime.getHours();
        const sunriseMinutes = sunriseTime.getMinutes();
        const sunrise = `${sunriseHours}시 ${sunriseMinutes}분`;
       
        weatherContainer.innerText = `현재 기온 : ${currentTemp}`;
        sunriseContainer.innerText = `${Mycountry}, sunrise : ${sunrise}`;

       //console.log(`현재시간은 : ${currentTemp}, 나는 지금 ${myCountry}에 있고, ${sunriseTime}`);
       //console.log(`현재 기온은 : ${currentTemp.toFixed(1)}, 나는 지금 ${myCountry}에 있고, 해는 ${sunrise}에 뜹니다.`);
        }
    );
    //console.log(crd); -> 확인해보니까 잘들어온다~
}

function getPosition() {
    // 위치조회하는 메서드

    function success(pos) {
        const crd = {
            // 배열로 만들어서 넣어줘야되네..
            latitude : pos.coords.latitude,
            longitude : pos.coords.longitude
        };

        //API를 쓸 때는 예제코드부터 쓴다(필요없어지면 주석처리하자~)
          // console.log(pos);
        // console.log('Your current position is:');
        // console.log('Latitude : ' + crd.latitude);
        // console.log('Longitude: ' + crd.longitude);

        localStorage.setItem("coords",JSON.stringify(crd));
        // 날씨정보를 불러와야 함
        getWeather(crd);
        //위도 경도 던져주기 parsedMyLocation == crd
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);

}

//날씨를 받아오는 기능
function loadWeather(){
    const myLocation = localStorage.getItem("coords");

    if(myLocation !== null){
        //날씨정보를 불러와라
        const parsedMyLocation = JSON.parse(myLocation);
        //parsedMyLocation와 crd는 결국 같은 요소,이름이 다른 쌍둥이임.
        getWeather(parsedMyLocation);
    }else{
        //위치 조회부터 하자
        getPosition();
    }
}

function init(){
    //현재 날씨 호출
    loadWeather();

}

init();
