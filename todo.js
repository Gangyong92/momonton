const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDo = document.querySelector(".js-toDo"),
  toDoList = toDo.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let removeElementIds = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  removeElementIds.push(parseInt(li.id)); // 제거할 li id 획득
  toDoList.removeChild(li);
  //  toDos가 filterFn 함수 인자로 넘어가서 조건을 만족하는 값들을 반환해줌
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // li.id는 HTML에서 가져올때 string임
  });
  toDos = cleanToDos;
  if (toDos.length === 0) {
    // toDos가 없는 경우 삭제한 element id 재활용 하지 않음
    // 초기화
    removeElementIds = [];
  }
  saveToDos();
}

function saveToDos() {
  // local storage는 string만 저장가능. 변수 값을 string으로 변환해줘야함
  // JSON.stringify로 string 변환
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // li 추가, 삭제버튼 추가
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  let newId;
  if (removeElementIds.length === 0) {
    // 제거한 element id가 없는 경우
    newId = toDos.length + 1;
  } else {
    // 제거한 element id가 있는 경우(FIFO에 쌓인 순서대로 빼서 재활용)
    newId = removeElementIds.shift();
  }
  delBtn.innerHTML = "❌"; // HTML에 charset 추가해야 나타남
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos(); // 기존에 일치하는 데이터가 있으면 local storage에 저장안되는듯
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // submit 후 보여지는 내용 삭제
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos); // objec로 변환
    parseToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    }); // array에 있는 것들을 각각에 한번씩 함수를 실행
    // 함수를 바깥으로 뺄 수도 있음
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
