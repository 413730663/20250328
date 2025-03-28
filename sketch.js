let seaweeds = []; // 儲存每條水草的屬性
let colors = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']; // 定義五種顏色

function setup() {
  // 建立透明的 p5.js 畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('z-index', '10'); // 設定畫布在 iframe 上層
  canvas.style('pointer-events', 'none'); // 讓畫布不阻擋 iframe 的操作

  createIframe(); // 建立 iframe

  // 初始化 60 條水草的屬性
  for (let i = 0; i < 60; i++) {
    seaweeds.push({
      height: random(200, 400), // 水草高度增加到 200 到 400
      color: color(random(colors)), // 從五種顏色中隨機選擇
      thickness: random(10, 50), // 水草粗細範圍調整為 10 到 50
      frequency: random(0.01, 0.05), // 搖晃頻率
      swayDirection: random([-1, 1]), // 隨機搖晃方向 (-1 或 1)
      alpha: random(100, 200) // 透明度調整為 100~200
    });
  }
}

function draw() {
  clear(); // 清除背景，讓背景透明
  blendMode(BLEND); // 設定混合模式

  let numSeaweeds = seaweeds.length; // 水草數量
  let spacing = width / numSeaweeds; // 每條水草的水平間距

  for (let j = 0; j < numSeaweeds; j++) {
    let baseX = j * spacing + spacing / 2; // 每條水草的基底位置
    let baseY = height; // 水草的底部
    let heightRange = seaweeds[j].height; // 取得該條水草的高度
    let segments = 20; // 水草分段數量增加到 20
    let segmentHeight = heightRange / segments; // 每段的高度

    // 設定水草顏色和透明度
    let seaweedColor = seaweeds[j].color;
    seaweedColor.setAlpha(seaweeds[j].alpha);
    stroke(seaweedColor); // 設定水草的顏色和透明度
    strokeWeight(seaweeds[j].thickness); // 設定水草的粗細
    noFill(); // 確保水草沒有填充

    // 使用 beginShape 和 vertex 繪製連續的水草
    beginShape();
    let prevX = baseX; // 起始點 X 座標
    let prevY = baseY; // 起始點 Y 座標
    vertex(prevX, prevY); // 起始點

    for (let i = 0; i < segments; i++) {
      // S 型搖曳效果，讓幅度更平滑且自然
      let sway = sin(frameCount * seaweeds[j].frequency + i * 0.3) * (8 - i * 0.3) * seaweeds[j].swayDirection;
      let curve = cos(frameCount * seaweeds[j].frequency + i * 0.2) * (4 - i * 0.2);
      let nextX = prevX + sway + curve; // 計算下一段的 X 座標
      let nextY = prevY - segmentHeight; // 計算下一段的 Y 座標
      vertex(nextX, nextY); // 添加頂點
      prevX = nextX; // 更新起始點 X 座標
      prevY = nextY; // 更新起始點 Y 座標
    }

    endShape(); // 結束繪製水草
  }
}

function windowResized() {  // 當視窗大小改變時
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
}

function createIframe() {
  let iframe = createElement('iframe'); // 建立 iframe 元素
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 設定 iframe 的網址
  iframe.style('position', 'absolute');
  iframe.style('top', '0'); // 距離視窗頂部 0
  iframe.style('left', '0'); // 距離視窗左側 0
  iframe.style('width', '100%'); // 寬度為視窗的 100%
  iframe.style('height', '100%'); // 高度為視窗的 100%
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '1'); // 設定 iframe 在畫布下層
}