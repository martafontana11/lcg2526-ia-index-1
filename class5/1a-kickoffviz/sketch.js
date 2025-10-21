//variabili globali
let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;
let stars_valid = [];
let star_value= [];

function isStarSizeValid(value){
  //se il dato ingresso è corretto o meno
  //restituire un booleano
  return value > 0;
}

//caricare asset prima che la pagina web venga caricata
function preload() {
  table = loadTable("../assets/datasets/stars.csv", "csv", "header");
  star_img = loadImage("../assets/img/star.png");
}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  //filtrare i dati
  //tramite isStarSizeValid
  //applichiamo la funzione di filtro
  
  //scorriamo i valori con un ciclo
  //e filtriamo
  for(let i=0; i < table.getRowCount(); i++){
    let star_value = table.getNum(i,"starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
    }
  }
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

function meanOfAnArray(arrayInput){
  // corpo della funzione
  let mediaArray = 0;
  for(let i=0; i < arrayInput.length; i++){
   mediaArray += arrayInput[i]; // mediaArray = mediaArray + arrayInput[i] stesso modo di scrivere cose
  }
  return mediaArray/arrayInput.length;
  // si pssono fare operazioni matematiche anche in return 
}

function drawStarSizePlot (arrayDiStelle){
  push();
  let xMin = 30;
  let yMin = 20;
  let yMaxChart = height/2;
  let xMaxChart = width-20;
  line(xMin, yMaxChart, xMaxChart, yMaxChart);
  line(30, yMaxChart, xMin, 20);
  push();
  translate(xMin-10, yMin);
  rotate(-PI/2);
  translate(-xMin*2,-yMin);
  text("Size", xMin, yMin);
  // oppure text("Size", 0, 0);
  pop();
  // rappresentare dimensioni stelle
  for(let i=0; i<arrayDiStelle.length;i++){
    // definire le coordinate x e y delle stelle
    // map --> rado un valore lo rimappiamo in un intervall
    let x = map(i, 0, arrayDiStelle.length, xMin+5, xMaxChart-5)
    let y = map(arrayDiStelle[i], min(arrayDiStelle), max(arrayDiStelle), yMaxChart+5, yMin-5);
    image(star_img,x,y,arrayDiStelle[i], arrayDiStelle[i]);
  }
  pop();

}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  
     //disegnare la stella più piccola
     // e la stella più grossa
     //stars_valid
   // image(star_img, 50, 50, min(stars_valid), min(stars_valid));
  // image(star_img, 100, 100, max(stars_valid), max(stars_valid));



  // drawStarsFromFile();

  // 1 rappresentare le statistiche
  // 1.A quante stelle valide ci sono
  // stars_valid.leght ---> quanto è lungo l'array
  text("Stelle valide" + stars_valid.length, 20, height/2+30);
  // 1.B il valor medio delle dimensioni delle stelle
  //sommare tutte le dimensioni e dividere per lunghezza
  let mediaDimensioni = 0;
  // ciclo for per scorrere array
  // poi divido
  // (capisco che può essere utile scrivere una funzione se voglio riutilizzare il codice tante volte)
  // function meanOfAnArray() in alto
  mediaDimensioni = meanOfAnArray(stars_valid);
  text("Media delle dimensioni" + mediaDimensioni.toFixed(2), 20, height/2+60);


  // 1.C la deviazione standerd, quanto variano dimensione

  // 2. disegnare il grafico
  drawStarSizePlot(stars_valid);
}
