const canvas = document.getElementById("jsCanvas");
// ctx(context)는 캔버스 안의 픽셀을 다루는 것
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

// 캔버스를 픽셀을 조절할 수 있는 사이즈(가로 세로)를 지정해줘야 그림 그릴 수 있음
// 화면 크기에 상관 없이 캔버스 사이즈에 맞게 픽셀들을 지정할 수 있음
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// strokeStyle 도형의 윤관선 색을 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// 이후 그려질 선의 두께를 설정 
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  // 이벤트 대상 객체(캔버스)에서의 상대적 마우스 X, Y좌표 위치를 반환 
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    // 마우스가 움직이는 내내 선이 그려짐
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event){
  // 마우스에서 손을 떼지 않으면 페인팅이 계속 진행 중
  painting = true;
} 

function handleColorClick(event){
  const bgcolor = event.target.style.backgroundColor;
  ctx.strokeStyle = bgcolor;
  ctx.fillStyle = bgcolor;

}


function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;

}

function handleModeClick (){
  
  if(filling === true ){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }

}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS🎨";
  link.click();
  console.log(link);
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}