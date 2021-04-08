let table;
let imgs = [];

let kanjiNumber;
let kanji;
let meaning;
let kana;
let urls;

function preload() {
  for (let i = 0; i < 8; i++) {
    imgs.push(createImg("", "img"));
  }
  
  table = loadTable("https://raw.githubusercontent.com/Michael-Strohmeier/kanji-img/main/parser/kanji_with_image_link.csv", "csv", "header");
}

function mousePressed() {  
  kanjiNumber += 1;
  
  kanji = table.getString(kanjiNumber, 1);
  meaning = table.getString(kanjiNumber, 3);
  kana = table.getString(kanjiNumber, 4);
  urls = table.getString(kanjiNumber, 5).replace(/[\[\]']+/g,'').split(",");
  
  for (let i = 0; i < 8; i++) {
    imgs[i].attribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:".concat(urls[i]));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  kanjiCard = new KanjiCard(windowWidth / 2, windowHeight / 2);
  
  kanjiNumber = 0;
  kanji = table.getString(kanjiNumber, 1);
  meaning = table.getString(kanjiNumber, 3);
  kana = table.getString(kanjiNumber, 4);
  urls = table.getString(kanjiNumber, 5).replace(/[\[\]']+/g,'').split(",");
    
  let imgSize = 100;
  for (let i = 0; i < 8; i++) {
    imgs[i].attribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:".concat(urls[i]));
    imgs[i].size(100, 100);
    imgs[i].position(windowWidth / 2 + int(i/2) * imgSize - 200, (i % 2) * imgSize + windowHeight / 2 + 50);
  }
}

function draw() {
  background(240, 235, 220, 255);
  kanjiCard.draw();
}

class KanjiCard {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.textSize = 100;
  }
  
  draw() {
    push();
    textAlign(CENTER, CENTER);
    translate(0, -100);
    
    textSize(this.textSize / 2.4);
    fill(221, 172, 82, 225);
    text(kana, this.x, this.y - this.textSize / 1.25);
    
    textSize(this.textSize);
    fill(216, 77, 106);
    text(kanji, this.x, this.y);
    
    textSize(this.textSize / 2.7);
    fill(216, 77, 106, 225);
    text(meaning, this.x, this.y + this.textSize / 1.4);
    
    pop();
  }
}
