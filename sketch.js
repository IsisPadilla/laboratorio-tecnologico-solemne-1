// VARIABLES GLOBALES
let data; // datos cargados
let years = []; // años unicos
let countries = []; // paises unicos

// COLOR POR PAISES
let colors = { 
  "United States": "#569418ff", 
  "Russia": "#a565dd",
  "United Kingdom": "#8a2be2",
  "France": "#cdff9e",
  "China": "#00a1a8",
  "India": "#8dffb1",
  "Pakistan": "#c07fff",
  "North Korea": "#64baff"
};

// FUNCIONES PRINCIPALES
function preload() { 
  // esto carga los datos
  data = loadJSON("data.json"); // archivo JSON con datos
}

function setup() { // configuración inicial
  createCanvas(6000, 5000); // tamaño del lienzo
  angleMode(DEGREES);// modo de ángulo en grados https://p5js.org/reference/p5/angleMode/?utm_source=chatgpt.com
  noLoop(); // no redibujar

  // convertir a array
  data = Object.values(data);

  // obtener años únicos
  years = []; // resetear años
  for (let i = 0; i < data.length; i++) { // recorrer datos
    let y = data[i].Year; // obtener año
    if (y >= 1945 && y <= 2020 && !years.includes(y)) { // operador logico donde dice que el año debe estar entre 1945 y 2020 y verificar unicidad basado en "&& esto y esto y no esto" 
      //extraido de la entrega final y https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Logical_AND
      years.push(y); // agregar año
    }
  }

  // obtener paises unicos
  countries = [];
  for (let i = 0; i < data.length; i++) { // recorrer datos
    let c = data[i].Entity; // obtener pais
    if (!countries.includes(c)) { // verificar unicidad
      countries.push(c); // agregar pais
    }
  } 

  background(0);  // fondo negro
  translate(width/2, height/2); // mover origen al centro

  // tamaño de los circulos y espaciado
  let circleSize = 15; 
  let spacing = 15;
  let maxRadius = 2000
  let lineLength = 2100
  let innerRadius = 100;
  let textOffset = 20;
  let textSizeYears = 49;

  // dibujar líneas y años
  for (let i = 0; i < years.length; i++) { // para cada año
    let angle = map(i, 0, years.length, -90, 270); // calcular ángulo

    stroke(150,0,255); // color de línea
    strokeWeight(3); // grosor de línea
    line(cos(angle)*innerRadius, sin(angle)*innerRadius, cos(angle)*lineLength, sin(angle)*lineLength); // dibujar línea

    // dibujar texto del año

    push(); // guardar estado
    noStroke(); // sin borde
    fill(200,150,255); // color de texto
    textAlign(CENTER, CENTER); // alinear texto
    textSize(textSizeYears); // tamaño de texto
    translate(cos(angle)*lineLength, sin(angle)*lineLength); // mover a posición
    rotate(angle + 90); // rotar texto
    text(years[i],0,-textOffset); // dibujar texto
    pop();    // restaurar estado
    // https://www.youtube.com/watch?v=o9sgjuh-CBM&ab_channel=TheCodingTrain
  }

  // dibujar circulos
  for (let i = 0; i < years.length; i++) { // para cada año
    let angle = map(i,0,years.length,-90,270); // calcular angulo

    // filtrar datos por año
    let yearData = []; // datos del año
    for (let j = 0; j < data.length; j++) { // para cada dato
      if (data[j].Year === years[i]) { // si el año coincide
        yearData.push(data[j]); // agregar a yearData
      }
    }

  // ordenar yearData por numero de pruebas
    yearData.sort(function(a,b) { //  ordenar por numero de pruebas
      return a["Number of nuclear weapons tests"] - b["Number of nuclear weapons tests"]; //  orden ascendente
    });

    let radialOffset = innerRadius + 20; // desplazamiento radial inicial

    for (let j = 0; j < yearData.length; j++) { // para cada pais en yearData
      let d = yearData[j]; // datos del pais
      let numTests = d["Number of nuclear weapons tests"];  // numero de pruebas
      let country = d.Entity; // pais

      // dibujar círculos para el pais

      for (let k = 0; k < numTests; k++) { // para cada prueba
        let r = radialOffset + k*spacing; // calcular radio
        if (r > maxRadius) { // limitar radio máximo
          r = maxRadius; // limitar radio
        }
        let px = cos(angle)*r; // calcular posicion x
        let py = sin(angle)*r; // calcular posicion y

        noStroke(); // sin borde
        let colorCircle = colors[country]; // obtener color del pais
        if (colorCircle == undefined) { colorCircle = "#ffffff"; } // color por defecto blanco
        fill(colorCircle); // color de relleno
        circle(px, py, circleSize); // dibujar circulo
      }

      radialOffset = radialOffset + numTests*spacing; // actualizar desplazamiento radial
    }
  }
}
