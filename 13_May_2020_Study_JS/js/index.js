//const는 변경이 불가능, let은 변경이 가능하다.
//상수는 const로 사용 변수는 let으로 사용
const hello = document.querySelector("h1");

hello.className = "prac";
hello.innerHTML = "연습입니다.";