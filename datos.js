// 300 PALABRAS PEDAGÓGICAS — 8 niveles progresivos
// Progresión silábica: CV→CVC→CCV→CCVC (basada en investigación de adquisición)
// Cada palabra tiene: texto, emoji, sílabas separadas, nivel
const NIVELES = [
  {id:1, nombre:"Planeta Alfa", emoji:"🌱", color:"#4ade80", desc:"Palabras familiares cortas", planet:"🪐"},
  {id:2, nombre:"Planeta Beta", emoji:"🌿", color:"#34d399", desc:"Objetos y lugares cercanos", planet:"🌍"},
  {id:3, nombre:"Planeta Gamma", emoji:"📚", color:"#60a5fa", desc:"Escuela y rutinas", planet:"🔵"},
  {id:4, nombre:"Planeta Delta", emoji:"💛", color:"#facc15", desc:"Familia y vínculos", planet:"⭐"},
  {id:5, nombre:"Planeta Épsilon", emoji:"🍎", color:"#fb923c", desc:"Comida y vida diaria", planet:"🟠"},
  {id:6, nombre:"Planeta Zeta", emoji:"🧍", color:"#f472b6", desc:"Ropa y cuerpo", planet:"🩷"},
  {id:7, nombre:"Planeta Eta", emoji:"🌍", color:"#a78bfa", desc:"Naturaleza y mundo", planet:"🟣"},
  {id:8, nombre:"Planeta Theta", emoji:"🏆", color:"#f87171", desc:"Palabras más largas", planet:"🔴"}
];

// === RIMAS: pares de palabras que riman, usados en mini-juego de rimas ===
const RIMAS = [
  ["gato","pato"],["casa","masa"],["luna","cuna"],["sol","col"],["mesa","pesa"],
  ["oso","oso"],["pan","van"],["flor","color"],["mar","dar"],["boca","roca"],
  ["pelo","cielo"],["nube","sube"],["pera","espera"],["cama","llama"],["dedo","miedo"],
  ["ola","cola"],["rama","cama"],["cara","clara"],["mano","piano"],["vaca","hamaca"],
  ["silla","orilla"],["estrella","botella"],["zapato","plato"],["cocina","vecina"],["helado","pescado"],
  ["correr","comer"],["saltar","cantar"],["bailar","soñar"],["nadar","volar"],
  ["lavar","pintar"],["sembrar","brillar"],["explorar","inventar"]
];

// === SISTEMA DE ARTÍCULOS ===
// Excepciones a las reglas generales de género en español
const ART_EXCEP = {
  "mamá":"la","papá":"el","agua":"el","mano":"la","mapa":"el",
  "foto":"la","radio":"la","Lisandro":"",
  // Femeninos que NO terminan en -a
  "leche":"la","nube":"la","nieve":"la","llave":"la","clase":"la",
  "carne":"la","fuente":"la","calle":"la","flor":"la","nariz":"la",
  "pared":"la","noche":"la","serpiente":"la","liebre":"la"
};
function getArt(w){
  if(ART_EXCEP.hasOwnProperty(w))return ART_EXCEP[w];
  // Verbos no llevan artículo
  var pw=PALABRAS.find(function(p){return p.t===w});
  if(pw&&pw.v)return '';
  var last=w.charAt(w.length-1);
  if(last==='a'||last==='á')return 'la';
  return 'el';
}
// Contexto para verbos: "¡A correr!" o "Yo corro"
function getVerbCtx(w){
  var pw=PALABRAS.find(function(p){return p.t===w});
  if(!pw||!pw.v)return '';
  return pw.ctx||('¡A '+w+'!');
}

// === CLASIFICACIÓN GRAMATICAL (para padres) ===
// Tipos: verbo, sustantivo, animal, persona, lugar, objeto, alimento, ropa, cuerpo, adjetivo, nombre
var TIPO_MAP = {
  // Personas / familia
  "mamá":"persona","papá":"persona","hijo":"persona","hija":"persona",
  "abuelo":"persona","abuela":"persona","hermano":"persona","hermana":"persona",
  "primo":"persona","prima":"persona","vecino":"persona","amigo":"persona","amiga":"persona",
  "maestra":"persona","Lisandro":"nombre","sobrino":"persona","padrino":"persona",
  "compañero":"persona","trabajador":"persona","astronauta":"persona","explorador":"persona",
  "veterinario":"persona","pirata":"persona","payaso":"persona","extraterrestre":"persona",
  // Animales
  "pez":"animal","oso":"animal","pato":"animal","gato":"animal","perro":"animal",
  "vaca":"animal","sapo":"animal","mono":"animal","lobo":"animal","foca":"animal","loro":"animal",
  "abeja":"animal","hormiga":"animal","mariposa":"animal","pájaro":"animal","caballo":"animal",
  "conejo":"animal","tortuga":"animal","elefante":"animal","dinosaurio":"animal","dragón":"animal",
  "delfín":"animal","ballena":"animal","pingüino":"animal","leopardo":"animal","cocodrilo":"animal",
  "serpiente":"animal","tiburón":"animal","caracol":"animal","canguro":"animal","jirafa":"animal",
  "hipopótamo":"animal","rinoceronte":"animal","insecto":"animal",
  // Lugares
  "casa":"lugar","plaza":"lugar","parque":"lugar","escuela":"lugar","patio":"lugar",
  "cocina":"lugar","bosque":"lugar","playa":"lugar","jardín":"lugar","campo":"lugar",
  "lago":"lugar","calle":"lugar","cueva":"lugar","castillo":"lugar","biblioteca":"lugar",
  "supermercado":"lugar","laboratorio":"lugar",
  // Alimentos
  "pan":"alimento","leche":"alimento","sopa":"alimento","jugo":"alimento",
  "helado":"alimento","galleta":"alimento","chocolate":"alimento","manzana":"alimento",
  "banana":"alimento","pera":"alimento","naranja":"alimento","uva":"alimento","tomate":"alimento",
  "queso":"alimento","arroz":"alimento","fideo":"alimento","pollo":"alimento","carne":"alimento",
  "huevo":"alimento","frutilla":"alimento","sandía":"alimento","durazno":"alimento","limón":"alimento",
  "manteca":"alimento","yogur":"alimento","pizza":"alimento","torta":"alimento","caramelo":"alimento",
  "ensalada":"alimento","milanesa":"alimento","azúcar":"alimento","desayuno":"alimento",
  "almuerzo":"alimento","cena":"alimento","merienda":"alimento","masa":"alimento",
  // Ropa
  "ropa":"ropa","camisa":"ropa","remera":"ropa","pantalón":"ropa","short":"ropa",
  "zapato":"ropa","media":"ropa","campera":"ropa","gorro":"ropa","bufanda":"ropa",
  "bolsillo":"ropa","cinturón":"ropa","zapatilla":"ropa","pijama":"ropa","pollera":"ropa",
  "abrigo":"ropa","guante":"ropa","paraguas":"ropa","bermuda":"ropa","corbata":"ropa",
  // Cuerpo
  "mano":"cuerpo","dedo":"cuerpo","pie":"cuerpo","ojo":"cuerpo","boca":"cuerpo",
  "pelo":"cuerpo","nariz":"cuerpo","oreja":"cuerpo","brazo":"cuerpo","pierna":"cuerpo",
  "rodilla":"cuerpo","barriga":"cuerpo","espalda":"cuerpo","cuello":"cuerpo","cara":"cuerpo",
  "dientes":"cuerpo","lengua":"cuerpo","uña":"cuerpo","codo":"cuerpo","tobillo":"cuerpo",
  "hombro":"cuerpo","muñeca":"cuerpo","pestaña":"cuerpo","ombligo":"cuerpo",
  // Naturaleza
  "agua":"naturaleza","sol":"naturaleza","luna":"naturaleza","mar":"naturaleza",
  "árbol":"naturaleza","hoja":"naturaleza","flor":"naturaleza","nube":"naturaleza",
  "cielo":"naturaleza","lluvia":"naturaleza","nieve":"naturaleza","río":"naturaleza",
  "piedra":"naturaleza","tierra":"naturaleza","fuego":"naturaleza","viento":"naturaleza",
  "estrella":"naturaleza","planeta":"naturaleza","montaña":"naturaleza","arena":"naturaleza",
  "ola":"naturaleza","semilla":"naturaleza","fruta":"naturaleza","rama":"naturaleza",
  "tronco":"naturaleza","pasto":"naturaleza","cascada":"naturaleza","volcán":"naturaleza",
  "girasol":"naturaleza","arcoíris":"naturaleza","relámpago":"naturaleza","nido":"naturaleza",
  // Adjetivos
  "amable":"adjetivo","maravilloso":"adjetivo",
  // Sentimientos/abstractos
  "amor":"sentimiento","abrazo":"sentimiento","beso":"sentimiento","risa":"sentimiento",
  "sonrisa":"sentimiento","alegría":"sentimiento","cariño":"sentimiento","ternura":"sentimiento",
  "ayuda":"sentimiento","silencio":"sentimiento",
  // Muebles / objetos de la casa
  "mesa":"objeto","cama":"objeto","taza":"objeto","silla":"objeto","cuna":"objeto",
  "puerta":"objeto","techo":"objeto","bolsa":"objeto","caja":"objeto","vaso":"objeto",
  "plato":"objeto","globo":"objeto","reloj":"objeto","llave":"objeto","banco":"objeto",
  "ventana":"objeto","botella":"objeto","cuchara":"objeto","tenedor":"objeto","cuchillo":"objeto",
  "servilleta":"objeto","heladera":"objeto","horno":"objeto","mantel":"objeto",
  "refrigerador":"objeto","computadora":"objeto","telescopio":"objeto","instrumento":"objeto",
  // Vehículos / transporte
  "auto":"vehículo","tren":"vehículo","barco":"vehículo","bici":"vehículo",
  "cohete":"vehículo","bicicleta":"vehículo","submarino":"vehículo",
  "helicóptero":"vehículo","ambulancia":"vehículo",
  // Escuela / aprendizaje
  "libro":"escuela","lápiz":"escuela","goma":"escuela","clase":"escuela","tarea":"escuela",
  "recreo":"escuela","mochila":"escuela","cuaderno":"escuela","regla":"escuela",
  "tijera":"escuela","colores":"escuela","dibujo":"escuela","palabra":"escuela",
  "letra":"escuela","número":"escuela","nombre":"escuela","fila":"escuela","cartel":"escuela",
  "pincel":"escuela","pizarra":"escuela","carpeta":"escuela","campana":"escuela",
  "pupitre":"escuela","lectura":"escuela","horario":"escuela","permiso":"escuela",
  "ejemplo":"escuela","pregunta":"escuela","respuesta":"escuela","saludo":"escuela",
  // Juego / diversión
  "juego":"diversión","regalo":"diversión","fiesta":"diversión","pelota":"diversión",
  "robot":"diversión","sorpresa":"diversión","tesoro":"diversión","columpio":"diversión",
  "hamaca":"diversión","cumpleaños":"diversión","dado":"diversión",
  // Tiempo / conceptos
  "domingo":"tiempo","electricidad":"concepto","sombra":"concepto","foto":"objeto",
  // Misceláneos que son objetos genéricos
  "lata":"objeto","polo":"objeto","piso":"objeto","pala":"objeto",
  "rampa":"objeto","mapa":"objeto","rueda":"objeto","cerca":"objeto",
  "vereda":"lugar","fuente":"lugar",
  // Vínculos
  "familia":"persona","paseo":"diversión","visita":"diversión",
  "cuento":"escuela","música":"diversión","baile":"diversión",
  "corazón":"sentimiento","mascota":"animal"
};
function getWordType(w){
  var pw=PALABRAS.find(function(p){return p.t===w});
  if(pw&&pw.v)return{tipo:'verbo',label:'Verbo — acción',color:'#60a5fa',icon:'🏃'};
  if(TIPO_MAP[w])return getTypeInfo(TIPO_MAP[w]);
  return{tipo:'sustantivo',label:'Sustantivo — cosa',color:'var(--acc)',icon:'📦'};
}
function getTypeInfo(tipo){
  var m={
    'persona':{label:'Sustantivo — persona',color:'#f472b6',icon:'👤'},
    'nombre':{label:'Nombre propio',color:'#c084fc',icon:'⭐'},
    'animal':{label:'Sustantivo — animal',color:'#4ade80',icon:'🐾'},
    'lugar':{label:'Sustantivo — lugar',color:'#38bdf8',icon:'📍'},
    'alimento':{label:'Sustantivo — alimento',color:'#fb923c',icon:'🍎'},
    'ropa':{label:'Sustantivo — ropa',color:'#e879f9',icon:'👕'},
    'cuerpo':{label:'Sustantivo — parte del cuerpo',color:'#f87171',icon:'🫀'},
    'naturaleza':{label:'Sustantivo — naturaleza',color:'#34d399',icon:'🌿'},
    'adjetivo':{label:'Adjetivo — cualidad',color:'#fbbf24',icon:'✨'},
    'sentimiento':{label:'Sustantivo — sentimiento',color:'#f9a8d4',icon:'💗'},
    'objeto':{label:'Sustantivo — objeto',color:'#94a3b8',icon:'📦'},
    'vehículo':{label:'Sustantivo — vehículo',color:'#60a5fa',icon:'🚗'},
    'escuela':{label:'Sustantivo — escuela',color:'#a78bfa',icon:'📚'},
    'diversión':{label:'Sustantivo — juego/diversión',color:'#fbbf24',icon:'🎮'},
    'tiempo':{label:'Sustantivo — tiempo',color:'#94a3b8',icon:'📅'},
    'concepto':{label:'Sustantivo — concepto',color:'#94a3b8',icon:'💡'}
  };
  return m[tipo]||{tipo:'sustantivo',label:'Sustantivo — objeto',color:'#94a3b8',icon:'📦'};
}

// IMG_MAP removed — app uses emoji only (faster, offline-friendly, no external dependencies)

const PALABRAS = [
// === NIVEL 1 — Muy simples y familiares (CV-CV, monosílabas) ===
{t:"mamá",s:["ma","má"],n:1,e:"👩"},{t:"papá",s:["pa","pá"],n:1,e:"👨"},{t:"casa",s:["ca","sa"],n:1,e:"🏠"},
{t:"mesa",s:["me","sa"],n:1,e:"🪑"},{t:"cama",s:["ca","ma"],n:1,e:"🛏️"},{t:"mano",s:["ma","no"],n:1,e:"✋"},
{t:"dedo",s:["de","do"],n:1,e:"☝️"},{t:"pie",s:["pie"],n:1,e:"🦶"},{t:"ojo",s:["o","jo"],n:1,e:"👁️"},
{t:"boca",s:["bo","ca"],n:1,e:"👄"},{t:"agua",s:["a","gua"],n:1,e:"💧"},{t:"pan",s:["pan"],n:1,e:"🍞"},
{t:"sol",s:["sol"],n:1,e:"☀️"},{t:"luna",s:["lu","na"],n:1,e:"🌙"},{t:"mar",s:["mar"],n:1,e:"🌊"},
{t:"pez",s:["pez"],n:1,e:"🐟"},{t:"oso",s:["o","so"],n:1,e:"🐻"},{t:"pato",s:["pa","to"],n:1,e:"🦆"},
{t:"gato",s:["ga","to"],n:1,e:"🐱"},{t:"perro",s:["pe","rro"],n:1,e:"🐕"},{t:"jugo",s:["ju","go"],n:1,e:"🧃"},
{t:"leche",s:["le","che"],n:1,e:"🥛"},{t:"sopa",s:["so","pa"],n:1,e:"🍜"},{t:"taza",s:["ta","za"],n:1,e:"☕"},
{t:"silla",s:["si","lla"],n:1,e:"🪑"},
// Nuevas nivel 1
{t:"vaca",s:["va","ca"],n:1,e:"🐄"},{t:"sapo",s:["sa","po"],n:1,e:"🐸"},{t:"mono",s:["mo","no"],n:1,e:"🐒"},
{t:"lobo",s:["lo","bo"],n:1,e:"🐺"},{t:"nido",s:["ni","do"],n:1,e:"🪺"},{t:"ropa",s:["ro","pa"],n:1,e:"👕"},
{t:"lata",s:["la","ta"],n:1,e:"🥫"},{t:"polo",s:["po","lo"],n:1,e:"👕"},{t:"dado",s:["da","do"],n:1,e:"🎲"},
{t:"cuna",s:["cu","na"],n:1,e:"🛒"},{t:"piso",s:["pi","so"],n:1,e:"🏢"},{t:"masa",s:["ma","sa"],n:1,e:"🫓"},
{t:"foca",s:["fo","ca"],n:1,e:"🦭"},{t:"loro",s:["lo","ro"],n:1,e:"🦜"},{t:"pala",s:["pa","la"],n:1,e:"⛏️"},
// === NIVEL 2 — Objetos y entorno ===
{t:"puerta",s:["puer","ta"],n:2,e:"🚪"},{t:"techo",s:["te","cho"],n:2,e:"🏠"},
{t:"auto",s:["au","to"],n:2,e:"🚗"},{t:"tren",s:["tren"],n:2,e:"🚂"},{t:"barco",s:["bar","co"],n:2,e:"⛵"},
{t:"bici",s:["bi","ci"],n:2,e:"🚲"},{t:"plaza",s:["pla","za"],n:2,e:"🏛️"},{t:"parque",s:["par","que"],n:2,e:"🏞️"},
{t:"árbol",s:["ár","bol"],n:2,e:"🌳"},{t:"hoja",s:["ho","ja"],n:2,e:"🍃"},{t:"flor",s:["flor"],n:2,e:"🌸"},
{t:"nube",s:["nu","be"],n:2,e:"☁️"},{t:"cielo",s:["cie","lo"],n:2,e:"🌤️"},{t:"lluvia",s:["llu","via"],n:2,e:"🌧️"},
{t:"nieve",s:["nie","ve"],n:2,e:"❄️"},{t:"río",s:["rí","o"],n:2,e:"🏞️"},{t:"piedra",s:["pie","dra"],n:2,e:"🪨"},
{t:"tierra",s:["tie","rra"],n:2,e:"🌍"},{t:"fuego",s:["fue","go"],n:2,e:"🔥"},{t:"viento",s:["vien","to"],n:2,e:"💨"},
{t:"bolsa",s:["bol","sa"],n:2,e:"👜"},{t:"caja",s:["ca","ja"],n:2,e:"📦"},{t:"vaso",s:["va","so"],n:2,e:"🥤"},
{t:"plato",s:["pla","to"],n:2,e:"🍽️"},
// Nuevas nivel 2
{t:"globo",s:["glo","bo"],n:2,e:"🎈"},{t:"reloj",s:["re","loj"],n:2,e:"⏰"},{t:"llave",s:["lla","ve"],n:2,e:"🔑"},
{t:"banco",s:["ban","co"],n:2,e:"🪑"},{t:"rampa",s:["ram","pa"],n:2,e:"📐"},{t:"sombra",s:["som","bra"],n:2,e:"👤"},
{t:"campo",s:["cam","po"],n:2,e:"🌾"},{t:"lago",s:["la","go"],n:2,e:"🏞️"},{t:"calle",s:["ca","lle"],n:2,e:"🛣️"},
{t:"mapa",s:["ma","pa"],n:2,e:"🗺️"},{t:"rueda",s:["rue","da"],n:2,e:"🛞"},{t:"cueva",s:["cue","va"],n:2,e:"🕳️"},
{t:"cerca",s:["cer","ca"],n:2,e:"🏗️"},{t:"fuente",s:["fuen","te"],n:2,e:"⛲"},{t:"vereda",s:["ve","re","da"],n:2,e:"🛤️"},
// === NIVEL 3 — Escuela y rutinas ===
{t:"libro",s:["li","bro"],n:3,e:"📖"},{t:"lápiz",s:["lá","piz"],n:3,e:"✏️"},{t:"goma",s:["go","ma"],n:3,e:"🧹"},
{t:"clase",s:["cla","se"],n:3,e:"🏫"},{t:"tarea",s:["ta","re","a"],n:3,e:"📝"},{t:"patio",s:["pa","tio"],n:3,e:"🏡"},
{t:"recreo",s:["re","cre","o"],n:3,e:"⛹️"},{t:"escuela",s:["es","cue","la"],n:3,e:"🏫"},{t:"maestra",s:["ma","es","tra"],n:3,e:"👩‍🏫"},
{t:"mochila",s:["mo","chi","la"],n:3,e:"🎒"},{t:"cuaderno",s:["cua","der","no"],n:3,e:"📓"},{t:"regla",s:["re","gla"],n:3,e:"📏"},
{t:"tijera",s:["ti","je","ra"],n:3,e:"✂️"},{t:"colores",s:["co","lo","res"],n:3,e:"🎨"},{t:"dibujo",s:["di","bu","jo"],n:3,e:"🖍️"},
{t:"palabra",s:["pa","la","bra"],n:3,e:"💬"},{t:"letra",s:["le","tra"],n:3,e:"🔤"},{t:"número",s:["nú","me","ro"],n:3,e:"🔢"},
{t:"nombre",s:["nom","bre"],n:3,e:"📛"},{t:"amigo",s:["a","mi","go"],n:3,e:"🤝"},{t:"amiga",s:["a","mi","ga"],n:3,e:"👭"},
{t:"fila",s:["fi","la"],n:3,e:"➡️"},{t:"cartel",s:["car","tel"],n:3,e:"📋"},
// Nuevas nivel 3
{t:"pincel",s:["pin","cel"],n:3,e:"🖌️"},{t:"pizarra",s:["pi","za","rra"],n:3,e:"📋"},{t:"carpeta",s:["car","pe","ta"],n:3,e:"📂"},
{t:"campana",s:["cam","pa","na"],n:3,e:"🔔"},
{t:"pupitre",s:["pu","pi","tre"],n:3,e:"🪑"},{t:"lectura",s:["lec","tu","ra"],n:3,e:"📖"},
{t:"merienda",s:["me","rien","da"],n:3,e:"🧁"},{t:"horario",s:["ho","ra","rio"],n:3,e:"🕐"},
{t:"permiso",s:["per","mi","so"],n:3,e:"🙋"},{t:"saludo",s:["sa","lu","do"],n:3,e:"👋"},
{t:"silencio",s:["si","len","cio"],n:3,e:"🤫"},{t:"pregunta",s:["pre","gun","ta"],n:3,e:"❓"},{t:"respuesta",s:["res","pues","ta"],n:3,e:"💡"},{t:"ejemplo",s:["e","jem","plo"],n:3,e:"📌"},
// === NIVEL 4 — Familia y vínculos ===
{t:"hijo",s:["hi","jo"],n:4,e:"👦"},{t:"hija",s:["hi","ja"],n:4,e:"👧"},{t:"abuelo",s:["a","bue","lo"],n:4,e:"👴"},
{t:"abuela",s:["a","bue","la"],n:4,e:"👵"},{t:"hermano",s:["her","ma","no"],n:4,e:"👦"},{t:"hermana",s:["her","ma","na"],n:4,e:"👧"},
{t:"familia",s:["fa","mi","lia"],n:4,e:"👨‍👩‍👦"},{t:"abrazo",s:["a","bra","zo"],n:4,e:"🤗"},{t:"beso",s:["be","so"],n:4,e:"😘"},
{t:"risa",s:["ri","sa"],n:4,e:"😂"},{t:"sonrisa",s:["son","ri","sa"],n:4,e:"😊"},{t:"juego",s:["jue","go"],n:4,e:"🎮"},
{t:"regalo",s:["re","ga","lo"],n:4,e:"🎁"},{t:"fiesta",s:["fies","ta"],n:4,e:"🎉"},{t:"paseo",s:["pa","se","o"],n:4,e:"🚶"},
{t:"visita",s:["vi","si","ta"],n:4,e:"🏠"},{t:"cuento",s:["cuen","to"],n:4,e:"📖"},{t:"música",s:["mú","si","ca"],n:4,e:"🎵"},
{t:"baile",s:["bai","le"],n:4,e:"💃"},{t:"foto",s:["fo","to"],n:4,e:"📸"},{t:"amor",s:["a","mor"],n:4,e:"❤️"},
{t:"ayuda",s:["a","yu","da"],n:4,e:"🤝"},{t:"Lisandro",s:["Li","san","dro"],n:4,e:"⭐"},
// Nuevas nivel 4
{t:"primo",s:["pri","mo"],n:4,e:"👦"},{t:"prima",s:["pri","ma"],n:4,e:"👧"},{t:"vecino",s:["ve","ci","no"],n:4,e:"🏘️"},
{t:"amable",s:["a","ma","ble"],n:4,e:"😊"},{t:"alegría",s:["a","le","grí","a"],n:4,e:"🥳"},
{t:"cariño",s:["ca","ri","ño"],n:4,e:"💕"},{t:"ternura",s:["ter","nu","ra"],n:4,e:"🥰"},
{t:"mascota",s:["mas","co","ta"],n:4,e:"🐾"},{t:"compañero",s:["com","pa","ñe","ro"],n:4,e:"🤝"},
{t:"columpio",s:["co","lum","pio"],n:4,e:"🎠"},
{t:"hamaca",s:["ha","ma","ca"],n:4,e:"🏖️"},{t:"cumpleaños",s:["cum","ple","a","ños"],n:4,e:"🎂"},{t:"sobrino",s:["so","bri","no"],n:4,e:"👶"},{t:"padrino",s:["pa","dri","no"],n:4,e:"👨"},
// === NIVEL 5 — Comida y vida diaria ===
{t:"helado",s:["he","la","do"],n:5,e:"🍦"},{t:"galleta",s:["ga","lle","ta"],n:5,e:"🍪"},{t:"chocolate",s:["cho","co","la","te"],n:5,e:"🍫"},
{t:"manzana",s:["man","za","na"],n:5,e:"🍎"},{t:"banana",s:["ba","na","na"],n:5,e:"🍌"},{t:"pera",s:["pe","ra"],n:5,e:"🍐"},
{t:"naranja",s:["na","ran","ja"],n:5,e:"🍊"},{t:"uva",s:["u","va"],n:5,e:"🍇"},{t:"tomate",s:["to","ma","te"],n:5,e:"🍅"},
{t:"queso",s:["que","so"],n:5,e:"🧀"},{t:"arroz",s:["a","rroz"],n:5,e:"🍚"},{t:"fideo",s:["fi","de","o"],n:5,e:"🍝"},
{t:"pollo",s:["po","llo"],n:5,e:"🍗"},{t:"carne",s:["car","ne"],n:5,e:"🥩"},{t:"huevo",s:["hue","vo"],n:5,e:"🥚"},
{t:"desayuno",s:["de","sa","yu","no"],n:5,e:"🥞"},{t:"almuerzo",s:["al","muer","zo"],n:5,e:"🍽️"},
{t:"cena",s:["ce","na"],n:5,e:"🌙"},{t:"cocina",s:["co","ci","na"],n:5,e:"👩‍🍳"},{t:"cuchara",s:["cu","cha","ra"],n:5,e:"🥄"},
{t:"tenedor",s:["te","ne","dor"],n:5,e:"🍴"},{t:"cuchillo",s:["cu","chi","llo"],n:5,e:"🔪"},{t:"botella",s:["bo","te","lla"],n:5,e:"🍶"},
{t:"servilleta",s:["ser","vi","lle","ta"],n:5,e:"🧻"},
// Nuevas nivel 5
{t:"frutilla",s:["fru","ti","lla"],n:5,e:"🍓"},{t:"sandía",s:["san","dí","a"],n:5,e:"🍉"},
{t:"durazno",s:["du","raz","no"],n:5,e:"🍑"},{t:"limón",s:["li","món"],n:5,e:"🍋"},
{t:"manteca",s:["man","te","ca"],n:5,e:"🧈"},{t:"yogur",s:["yo","gur"],n:5,e:"🥛"},
{t:"pizza",s:["piz","za"],n:5,e:"🍕"},{t:"torta",s:["tor","ta"],n:5,e:"🎂"},
{t:"caramelo",s:["ca","ra","me","lo"],n:5,e:"🍬"},{t:"ensalada",s:["en","sa","la","da"],n:5,e:"🥗"},
{t:"heladera",s:["he","la","de","ra"],n:5,e:"🧊"},{t:"horno",s:["hor","no"],n:5,e:"🔥"},
{t:"mantel",s:["man","tel"],n:5,e:"🍽️"},{t:"azúcar",s:["a","zú","car"],n:5,e:"🍬"},{t:"milanesa",s:["mi","la","ne","sa"],n:5,e:"🥩"},
// === NIVEL 6 — Ropa y cuerpo ===
{t:"camisa",s:["ca","mi","sa"],n:6,e:"👕"},{t:"remera",s:["re","me","ra"],n:6,e:"👕"},{t:"pantalón",s:["pan","ta","lón"],n:6,e:"👖"},
{t:"short",s:["short"],n:6,e:"🩳"},{t:"zapato",s:["za","pa","to"],n:6,e:"👟"},{t:"media",s:["me","dia"],n:6,e:"🧦"},
{t:"campera",s:["cam","pe","ra"],n:6,e:"🧥"},{t:"gorro",s:["go","rro"],n:6,e:"🧢"},{t:"bufanda",s:["bu","fan","da"],n:6,e:"🧣"},
{t:"bolsillo",s:["bol","si","llo"],n:6,e:"👖"},{t:"pelo",s:["pe","lo"],n:6,e:"💇"},{t:"nariz",s:["na","riz"],n:6,e:"👃"},
{t:"oreja",s:["o","re","ja"],n:6,e:"👂"},{t:"brazo",s:["bra","zo"],n:6,e:"💪"},{t:"pierna",s:["pier","na"],n:6,e:"🦵"},
{t:"rodilla",s:["ro","di","lla"],n:6,e:"🦵"},{t:"barriga",s:["ba","rri","ga"],n:6,e:"😊"},{t:"espalda",s:["es","pal","da"],n:6,e:"🧍"},
{t:"cuello",s:["cue","llo"],n:6,e:"🦒"},{t:"cara",s:["ca","ra"],n:6,e:"😊"},{t:"dientes",s:["dien","tes"],n:6,e:"🦷"},
{t:"lengua",s:["len","gua"],n:6,e:"👅"},{t:"uña",s:["u","ña"],n:6,e:"💅"},
// Nuevas nivel 6
{t:"codo",s:["co","do"],n:6,e:"💪"},{t:"tobillo",s:["to","bi","llo"],n:6,e:"🦶"},
{t:"hombro",s:["hom","bro"],n:6,e:"🧍"},{t:"muñeca",s:["mu","ñe","ca"],n:6,e:"🤚"},
{t:"cinturón",s:["cin","tu","rón"],n:6,e:"👖"},{t:"zapatilla",s:["za","pa","ti","lla"],n:6,e:"👟"},
{t:"pijama",s:["pi","ja","ma"],n:6,e:"🌙"},{t:"pollera",s:["po","lle","ra"],n:6,e:"👗"},
{t:"abrigo",s:["a","bri","go"],n:6,e:"🧥"},{t:"guante",s:["guan","te"],n:6,e:"🧤"},
{t:"paraguas",s:["pa","ra","guas"],n:6,e:"☂️"},{t:"pestaña",s:["pes","ta","ña"],n:6,e:"👁️"},
{t:"ombligo",s:["om","bli","go"],n:6,e:"😊"},{t:"bermuda",s:["ber","mu","da"],n:6,e:"🩳"},{t:"corbata",s:["cor","ba","ta"],n:6,e:"👔"},
// === NIVEL 7 — Naturaleza y mundo ===
{t:"estrella",s:["es","tre","lla"],n:7,e:"⭐"},{t:"planeta",s:["pla","ne","ta"],n:7,e:"🪐"},{t:"montaña",s:["mon","ta","ña"],n:7,e:"⛰️"},
{t:"bosque",s:["bos","que"],n:7,e:"🌲"},{t:"playa",s:["pla","ya"],n:7,e:"🏖️"},{t:"arena",s:["a","re","na"],n:7,e:"🏖️"},
{t:"ola",s:["o","la"],n:7,e:"🌊"},{t:"semilla",s:["se","mi","lla"],n:7,e:"🌱"},{t:"fruta",s:["fru","ta"],n:7,e:"🍎"},
{t:"rama",s:["ra","ma"],n:7,e:"🌿"},{t:"tronco",s:["tron","co"],n:7,e:"🪵"},{t:"pasto",s:["pas","to"],n:7,e:"🌱"},
{t:"jardín",s:["jar","dín"],n:7,e:"🌻"},{t:"insecto",s:["in","sec","to"],n:7,e:"🐛"},{t:"abeja",s:["a","be","ja"],n:7,e:"🐝"},
{t:"hormiga",s:["hor","mi","ga"],n:7,e:"🐜"},{t:"mariposa",s:["ma","ri","po","sa"],n:7,e:"🦋"},{t:"pájaro",s:["pá","ja","ro"],n:7,e:"🐦"},
{t:"caballo",s:["ca","ba","llo"],n:7,e:"🐴"},{t:"conejo",s:["co","ne","jo"],n:7,e:"🐰"},{t:"tortuga",s:["tor","tu","ga"],n:7,e:"🐢"},
{t:"elefante",s:["e","le","fan","te"],n:7,e:"🐘"},{t:"dinosaurio",s:["di","no","sau","rio"],n:7,e:"🦕"},{t:"dragón",s:["dra","gón"],n:7,e:"🐉"},
{t:"cohete",s:["co","he","te"],n:7,e:"🚀"},
// Nuevas nivel 7
{t:"cascada",s:["cas","ca","da"],n:7,e:"🌊"},{t:"volcán",s:["vol","cán"],n:7,e:"🌋"},
{t:"delfín",s:["del","fín"],n:7,e:"🐬"},{t:"ballena",s:["ba","lle","na"],n:7,e:"🐳"},
{t:"pingüino",s:["pin","güi","no"],n:7,e:"🐧"},{t:"leopardo",s:["leo","par","do"],n:7,e:"🐆"},
{t:"cocodrilo",s:["co","co","dri","lo"],n:7,e:"🐊"},{t:"serpiente",s:["ser","pien","te"],n:7,e:"🐍"},
{t:"tiburón",s:["ti","bu","rón"],n:7,e:"🦈"},{t:"caracol",s:["ca","ra","col"],n:7,e:"🐌"},
{t:"girasol",s:["gi","ra","sol"],n:7,e:"🌻"},{t:"arcoíris",s:["ar","co","í","ris"],n:7,e:"🌈"},
{t:"relámpago",s:["re","lám","pa","go"],n:7,e:"⚡"},{t:"canguro",s:["can","gu","ro"],n:7,e:"🦘"},{t:"jirafa",s:["ji","ra","fa"],n:7,e:"🦒"},
// === NIVEL 8 — Avanzado ===
{t:"ventana",s:["ven","ta","na"],n:8,e:"🪟"},{t:"domingo",s:["do","min","go"],n:8,e:"📅"},
{t:"pirata",s:["pi","ra","ta"],n:8,e:"🏴‍☠️"},{t:"tesoro",s:["te","so","ro"],n:8,e:"💰"},{t:"castillo",s:["cas","ti","llo"],n:8,e:"🏰"},
{t:"payaso",s:["pa","ya","so"],n:8,e:"🤡"},{t:"pelota",s:["pe","lo","ta"],n:8,e:"⚽"},
{t:"robot",s:["ro","bot"],n:8,e:"🤖"},{t:"sorpresa",s:["sor","pre","sa"],n:8,e:"🎉"},{t:"corazón",s:["co","ra","zón"],n:8,e:"❤️"},
{t:"bicicleta",s:["bi","ci","cle","ta"],n:8,e:"🚲"},{t:"biblioteca",s:["bi","blio","te","ca"],n:8,e:"📚"},
// Nuevas nivel 8
{t:"astronauta",s:["as","tro","nau","ta"],n:8,e:"👨‍🚀"},{t:"telescopio",s:["te","les","co","pio"],n:8,e:"🔭"},
{t:"submarino",s:["sub","ma","ri","no"],n:8,e:"🚢"},{t:"computadora",s:["com","pu","ta","do","ra"],n:8,e:"💻"},
{t:"refrigerador",s:["re","fri","ge","ra","dor"],n:8,e:"🧊"},{t:"supermercado",s:["su","per","mer","ca","do"],n:8,e:"🏪"},
{t:"hipopótamo",s:["hi","po","pó","ta","mo"],n:8,e:"🦛"},{t:"rinoceronte",s:["ri","no","ce","ron","te"],n:8,e:"🦏"},
{t:"helicóptero",s:["he","li","cóp","te","ro"],n:8,e:"🚁"},{t:"ambulancia",s:["am","bu","lan","cia"],n:8,e:"🚑"},
{t:"trabajador",s:["tra","ba","ja","dor"],n:8,e:"👷"},{t:"electricidad",s:["e","lec","tri","ci","dad"],n:8,e:"⚡"},
{t:"maravilloso",s:["ma","ra","vi","llo","so"],n:8,e:"✨"},{t:"extraterrestre",s:["ex","tra","te","rres","tre"],n:8,e:"👽"},
{t:"laboratorio",s:["la","bo","ra","to","rio"],n:8,e:"🔬"},{t:"explorador",s:["ex","plo","ra","dor"],n:8,e:"🧭"},
{t:"instrumento",s:["ins","tru","men","to"],n:8,e:"🎸"},{t:"veterinario",s:["ve","te","ri","na","rio"],n:8,e:"👩‍⚕️"},
// ═══════════ VERBOS ═══════════
// Nivel 2 — Acciones básicas
{t:"correr",s:["co","rrer"],n:2,e:"🏃",v:1,ctx:"¡A correr!"},{t:"saltar",s:["sal","tar"],n:2,e:"🤸",v:1,ctx:"¡A saltar!"},
{t:"comer",s:["co","mer"],n:2,e:"🍽️",v:1,ctx:"Vamos a comer"},{t:"dormir",s:["dor","mir"],n:2,e:"😴",v:1,ctx:"Hora de dormir"},
{t:"jugar",s:["ju","gar"],n:2,e:"🎮",v:1,ctx:"¡A jugar!"},{t:"leer",s:["le","er"],n:2,e:"📖",v:1,ctx:"Vamos a leer"},
{t:"mirar",s:["mi","rar"],n:2,e:"👀",v:1,ctx:"¡Mirá!"},
// Nivel 3 — Acciones escolares
{t:"pintar",s:["pin","tar"],n:3,e:"🎨",v:1,ctx:"¡A pintar!"},{t:"escribir",s:["es","cri","bir"],n:3,e:"✍️",v:1,ctx:"Vamos a escribir"},
{t:"contar",s:["con","tar"],n:3,e:"🔢",v:1,ctx:"Vamos a contar"},{t:"pensar",s:["pen","sar"],n:3,e:"🤔",v:1,ctx:"¡A pensar!"},
{t:"hablar",s:["ha","blar"],n:3,e:"🗣️",v:1,ctx:"¡A hablar!"},{t:"aprender",s:["a","pren","der"],n:3,e:"🧠",v:1,ctx:"¡A aprender!"},
// Nivel 4 — Acciones familiares/emociones
{t:"abrazar",s:["a","bra","zar"],n:4,e:"🤗",v:1,ctx:"¡Un abrazo!"},{t:"cantar",s:["can","tar"],n:4,e:"🎤",v:1,ctx:"¡A cantar!"},
{t:"bailar",s:["bai","lar"],n:4,e:"💃",v:1,ctx:"¡A bailar!"},{t:"soñar",s:["so","ñar"],n:4,e:"💭",v:1,ctx:"¡A soñar!"},
{t:"reír",s:["re","ír"],n:4,e:"😂",v:1,ctx:"¡A reír!"},{t:"llorar",s:["llo","rar"],n:4,e:"😢",v:1,ctx:"No llorés"},
{t:"querer",s:["que","rer"],n:4,e:"❤️",v:1,ctx:"Te quiero"},
// Nivel 5 — Acciones de cocina/diarias
{t:"cocinar",s:["co","ci","nar"],n:5,e:"👨‍🍳",v:1,ctx:"¡A cocinar!"},{t:"mezclar",s:["mez","clar"],n:5,e:"🥄",v:1,ctx:"¡A mezclar!"},
{t:"probar",s:["pro","bar"],n:5,e:"👅",v:1,ctx:"¡Probá!"},{t:"servir",s:["ser","vir"],n:5,e:"🍽️",v:1,ctx:"¡A servir!"},
// Nivel 6 — Acciones del cuerpo/ropa
{t:"lavar",s:["la","var"],n:6,e:"🧼",v:1,ctx:"¡A lavar!"},{t:"vestir",s:["ves","tir"],n:6,e:"👔",v:1,ctx:"¡A vestirse!"},
{t:"peinar",s:["pei","nar"],n:6,e:"💇",v:1,ctx:"¡A peinar!"},{t:"caminar",s:["ca","mi","nar"],n:6,e:"🚶",v:1,ctx:"¡A caminar!"},
// Nivel 7 — Acciones de naturaleza
{t:"nadar",s:["na","dar"],n:7,e:"🏊",v:1,ctx:"¡A nadar!"},{t:"volar",s:["vo","lar"],n:7,e:"🦅",v:1,ctx:"¡A volar!"},
{t:"trepar",s:["tre","par"],n:7,e:"🧗",v:1,ctx:"¡A trepar!"},{t:"crecer",s:["cre","cer"],n:7,e:"🌱",v:1,ctx:"¡Vas a crecer!"},
{t:"sembrar",s:["sem","brar"],n:7,e:"🌻",v:1,ctx:"¡A sembrar!"},{t:"brillar",s:["bri","llar"],n:7,e:"✨",v:1,ctx:"¡A brillar!"},
// Nivel 8 — Acciones avanzadas
{t:"explorar",s:["ex","plo","rar"],n:8,e:"🧭",v:1,ctx:"¡A explorar!"},{t:"descubrir",s:["des","cu","brir"],n:8,e:"🔍",v:1,ctx:"¡A descubrir!"},
{t:"construir",s:["cons","truir"],n:8,e:"🏗️",v:1,ctx:"¡A construir!"},{t:"imaginar",s:["i","ma","gi","nar"],n:8,e:"💭",v:1,ctx:"¡Imaginá!"},
{t:"inventar",s:["in","ven","tar"],n:8,e:"💡",v:1,ctx:"¡A inventar!"},{t:"transformar",s:["trans","for","mar"],n:8,e:"🔄",v:1,ctx:"¡A transformar!"}
];

// ═══════════ FRASES ═══════════
// Frases personales y simples para practicar escritura de oraciones
// Cada frase tiene: texto completo, palabras separadas, emoji, dificultad (1-3)
const FRASES = [
  // ══════════════════════════════════════════════════
  // NIVEL 1 (d:1) — Frases cortas, 2-4 palabras
  // ══════════════════════════════════════════════════
  // --- Sobre Lisandro ---
  {f:"Me llamo Lisandro.",w:["Me","llamo","Lisandro"],e:"⭐",d:1,cat:"sobre mí"},
  {f:"Soy argentino.",w:["Soy","argentino"],e:"🇦🇷",d:1,cat:"sobre mí"},
  {f:"Nací en Uruguay.",w:["Nací","en","Uruguay"],e:"🇺🇾",d:1,cat:"sobre mí"},
  {f:"Aparicio es mi amigo.",w:["Aparicio","es","mi","amigo"],e:"🤝",d:1,cat:"sobre mí"},
  // --- Me gusta ---
  {f:"Me gusta Minecraft.",w:["Me","gusta","Minecraft"],e:"⛏️",d:1,cat:"me gusta"},
  {f:"Me gusta Roblox.",w:["Me","gusta","Roblox"],e:"🎮",d:1,cat:"me gusta"},
  {f:"Me gusta Fortnite.",w:["Me","gusta","Fortnite"],e:"🎯",d:1,cat:"me gusta"},
  {f:"Me gusta el chocolate.",w:["Me","gusta","el","chocolate"],e:"🍫",d:1,cat:"me gusta"},
  // --- Animales simples ---
  {f:"El gato duerme.",w:["El","gato","duerme"],e:"🐱",d:1,cat:"animales"},
  {f:"El perro corre.",w:["El","perro","corre"],e:"🐕",d:1,cat:"animales"},
  {f:"El pato nada.",w:["El","pato","nada"],e:"🦆",d:1,cat:"animales"},
  {f:"La vaca come.",w:["La","vaca","come"],e:"🐄",d:1,cat:"animales"},
  {f:"El oso duerme.",w:["El","oso","duerme"],e:"🐻",d:1,cat:"animales"},
  {f:"El sapo salta.",w:["El","sapo","salta"],e:"🐸",d:1,cat:"animales"},
  // --- Naturaleza ---
  {f:"El sol brilla.",w:["El","sol","brilla"],e:"☀️",d:1,cat:"naturaleza"},
  {f:"La luna sale.",w:["La","luna","sale"],e:"🌙",d:1,cat:"naturaleza"},
  {f:"El mar es azul.",w:["El","mar","es","azul"],e:"🌊",d:1,cat:"naturaleza"},
  {f:"La flor es rosa.",w:["La","flor","es","rosa"],e:"🌸",d:1,cat:"naturaleza"},
  // --- Familia ---
  {f:"Mamá me quiere.",w:["Mamá","me","quiere"],e:"❤️",d:1,cat:"familia"},
  {f:"Papá es grande.",w:["Papá","es","grande"],e:"👨",d:1,cat:"familia"},
  {f:"Yo tengo hambre.",w:["Yo","tengo","hambre"],e:"🍽️",d:1,cat:"diario"},
  {f:"Quiero un helado.",w:["Quiero","un","helado"],e:"🍦",d:1,cat:"diario"},
  // --- Cosas ---
  {f:"La casa es grande.",w:["La","casa","es","grande"],e:"🏠",d:1,cat:"cosas"},
  {f:"La mesa es baja.",w:["La","mesa","es","baja"],e:"🪑",d:1,cat:"cosas"},
  {f:"La silla es roja.",w:["La","silla","es","roja"],e:"🪑",d:1,cat:"cosas"},
  // --- Concordancia artículo-sustantivo-adjetivo ---
  {f:"El gato negro.",w:["El","gato","negro"],e:"🐱",d:1,cat:"concordancia"},
  {f:"La casa blanca.",w:["La","casa","blanca"],e:"🏠",d:1,cat:"concordancia"},
  {f:"El perro grande.",w:["El","perro","grande"],e:"🐕",d:1,cat:"concordancia"},
  {f:"La luna llena.",w:["La","luna","llena"],e:"🌕",d:1,cat:"concordancia"},
  {f:"El cielo azul.",w:["El","cielo","azul"],e:"🌤️",d:1,cat:"concordancia"},
  {f:"La nube blanca.",w:["La","nube","blanca"],e:"☁️",d:1,cat:"concordancia"},
  // --- Exclamaciones ¡! ---
  {f:"¡Hola!",w:["Hola"],e:"👋",d:1,cat:"puntuación"},
  {f:"¡Vamos!",w:["Vamos"],e:"🏃",d:1,cat:"puntuación"},
  {f:"¡Sí!",w:["Sí"],e:"✅",d:1,cat:"puntuación"},
  {f:"¡Qué lindo!",w:["Qué","lindo"],e:"😍",d:1,cat:"puntuación"},
  {f:"¡Bien hecho!",w:["Bien","hecho"],e:"👏",d:1,cat:"puntuación"},
  // --- Preguntas ¿? ---
  {f:"¿Cómo te llamás?",w:["Cómo","te","llamás"],e:"❓",d:1,cat:"puntuación"},
  {f:"¿Qué hora es?",w:["Qué","hora","es"],e:"⏰",d:1,cat:"puntuación"},
  {f:"¿Tenés hambre?",w:["Tenés","hambre"],e:"🍽️",d:1,cat:"puntuación"},

  // ══════════════════════════════════════════════════
  // NIVEL 2 (d:2) — Frases medianas, 4-6 palabras
  // ══════════════════════════════════════════════════
  // --- Sobre Lisandro ---
  {f:"Voy al colegio Woodside.",w:["Voy","al","colegio","Woodside"],e:"🏫",d:2,cat:"sobre mí"},
  {f:"Mi color favorito es azul.",w:["Mi","color","favorito","es","azul"],e:"🔵",d:2,cat:"sobre mí"},
  // --- Animales ---
  {f:"El pájaro vuela muy alto.",w:["El","pájaro","vuela","muy","alto"],e:"🐦",d:2,cat:"animales"},
  {f:"La mariposa es muy linda.",w:["La","mariposa","es","muy","linda"],e:"🦋",d:2,cat:"animales"},
  {f:"El conejo come zanahoria.",w:["El","conejo","come","zanahoria"],e:"🐰",d:2,cat:"animales"},
  {f:"La tortuga camina despacio.",w:["La","tortuga","camina","despacio"],e:"🐢",d:2,cat:"animales"},
  {f:"El mono trepa al árbol.",w:["El","mono","trepa","al","árbol"],e:"🐒",d:2,cat:"animales"},
  // --- Me gusta ---
  {f:"Me gusta ir al parque.",w:["Me","gusta","ir","al","parque"],e:"🏞️",d:2,cat:"me gusta"},
  {f:"Me gusta leer cuentos.",w:["Me","gusta","leer","cuentos"],e:"📖",d:2,cat:"me gusta"},
  {f:"Me gusta jugar con Legos.",w:["Me","gusta","jugar","con","Legos"],e:"🧱",d:2,cat:"me gusta"},
  {f:"Me gusta comer pizza.",w:["Me","gusta","comer","pizza"],e:"🍕",d:2,cat:"me gusta"},
  // --- Familia ---
  {f:"Mi mamá cocina muy rico.",w:["Mi","mamá","cocina","muy","rico"],e:"👩‍🍳",d:2,cat:"familia"},
  {f:"Mi papá juega conmigo.",w:["Mi","papá","juega","conmigo"],e:"👨",d:2,cat:"familia"},
  {f:"La abuela me da besos.",w:["La","abuela","me","da","besos"],e:"👵",d:2,cat:"familia"},
  {f:"Mi hermana es chiquita.",w:["Mi","hermana","es","chiquita"],e:"👧",d:2,cat:"familia"},
  // --- Diario ---
  {f:"Hoy hace mucho calor.",w:["Hoy","hace","mucho","calor"],e:"🌡️",d:2,cat:"diario"},
  {f:"Vamos a jugar afuera.",w:["Vamos","a","jugar","afuera"],e:"🌳",d:2,cat:"diario"},
  {f:"Mañana voy a la plaza.",w:["Mañana","voy","a","la","plaza"],e:"🏛️",d:2,cat:"diario"},
  {f:"Hoy llueve mucho afuera.",w:["Hoy","llueve","mucho","afuera"],e:"🌧️",d:2,cat:"diario"},
  // --- Naturaleza ---
  {f:"La estrella brilla mucho.",w:["La","estrella","brilla","mucho"],e:"⭐",d:2,cat:"naturaleza"},
  {f:"El río tiene agua fría.",w:["El","río","tiene","agua","fría"],e:"🏞️",d:2,cat:"naturaleza"},
  {f:"La montaña es muy alta.",w:["La","montaña","es","muy","alta"],e:"⛰️",d:2,cat:"naturaleza"},
  // --- Cosas ---
  {f:"El robot es muy genial.",w:["El","robot","es","muy","genial"],e:"🤖",d:2,cat:"cosas"},
  {f:"Mi mochila es de Minecraft.",w:["Mi","mochila","es","de","Minecraft"],e:"🎒",d:2,cat:"cosas"},
  // --- Concordancia ---
  {f:"El gato negro duerme.",w:["El","gato","negro","duerme"],e:"🐱",d:2,cat:"concordancia"},
  {f:"La casa blanca es linda.",w:["La","casa","blanca","es","linda"],e:"🏠",d:2,cat:"concordancia"},
  {f:"El árbol grande da sombra.",w:["El","árbol","grande","da","sombra"],e:"🌳",d:2,cat:"concordancia"},
  {f:"La pelota roja rebota.",w:["La","pelota","roja","rebota"],e:"⚽",d:2,cat:"concordancia"},
  {f:"El libro nuevo es lindo.",w:["El","libro","nuevo","es","lindo"],e:"📖",d:2,cat:"concordancia"},
  {f:"La flor amarilla es bonita.",w:["La","flor","amarilla","es","bonita"],e:"🌻",d:2,cat:"concordancia"},
  // --- Exclamaciones ¡! ---
  {f:"¡Qué día tan lindo!",w:["Qué","día","tan","lindo"],e:"☀️",d:2,cat:"puntuación"},
  {f:"¡Me encanta este juego!",w:["Me","encanta","este","juego"],e:"🎮",d:2,cat:"puntuación"},
  {f:"¡Vamos a la plaza!",w:["Vamos","a","la","plaza"],e:"🏛️",d:2,cat:"puntuación"},
  {f:"¡Mirá esa mariposa!",w:["Mirá","esa","mariposa"],e:"🦋",d:2,cat:"puntuación"},
  {f:"¡Qué rico el helado!",w:["Qué","rico","el","helado"],e:"🍦",d:2,cat:"puntuación"},
  {f:"¡Feliz cumpleaños!",w:["Feliz","cumpleaños"],e:"🎂",d:2,cat:"puntuación"},
  // --- Preguntas ¿? ---
  {f:"¿Querés jugar conmigo?",w:["Querés","jugar","conmigo"],e:"🎮",d:2,cat:"puntuación"},
  {f:"¿Dónde está el gato?",w:["Dónde","está","el","gato"],e:"🐱",d:2,cat:"puntuación"},
  {f:"¿Vamos al parque hoy?",w:["Vamos","al","parque","hoy"],e:"🏞️",d:2,cat:"puntuación"},
  {f:"¿Qué comemos de postre?",w:["Qué","comemos","de","postre"],e:"🍰",d:2,cat:"puntuación"},
  {f:"¿Puedo tomar un jugo?",w:["Puedo","tomar","un","jugo"],e:"🧃",d:2,cat:"puntuación"},
  // --- Textos con propósito (carteles, listas) ---
  {f:"No correr en el pasillo.",w:["No","correr","en","el","pasillo"],e:"🚶",d:2,cat:"cartel"},
  {f:"Lavar las manos antes.",w:["Lavar","las","manos","antes"],e:"🧼",d:2,cat:"cartel"},
  {f:"Tirar la basura aquí.",w:["Tirar","la","basura","aquí"],e:"🗑️",d:2,cat:"cartel"},

  // ══════════════════════════════════════════════════
  // NIVEL 3 (d:3) — Frases largas, 5-8 palabras
  // ══════════════════════════════════════════════════
  // --- Sobre Lisandro ---
  {f:"Mi nombre completo es Lisandro Agustín Flores.",w:["Mi","nombre","completo","es","Lisandro","Agustín","Flores"],e:"📛",d:3,cat:"sobre mí"},
  {f:"Lisandro vive en Buenos Aires con su familia.",w:["Lisandro","vive","en","Buenos","Aires","con","su","familia"],e:"🏠",d:3,cat:"sobre mí"},
  // --- Animales ---
  {f:"El elefante grande toma agua del río.",w:["El","elefante","grande","toma","agua","del","río"],e:"🐘",d:3,cat:"animales"},
  {f:"La tortuga verde camina muy despacio.",w:["La","tortuga","verde","camina","muy","despacio"],e:"🐢",d:3,cat:"animales"},
  {f:"El pingüino negro y blanco nada bien.",w:["El","pingüino","negro","y","blanco","nada","bien"],e:"🐧",d:3,cat:"animales"},
  // --- Familia ---
  {f:"Mi familia y yo vamos al parque los domingos.",w:["Mi","familia","y","yo","vamos","al","parque","los","domingos"],e:"👨‍👩‍👦",d:3,cat:"familia"},
  {f:"La abuela nos cuenta cuentos a la noche.",w:["La","abuela","nos","cuenta","cuentos","a","la","noche"],e:"👵",d:3,cat:"familia"},
  // --- Naturaleza ---
  {f:"Las estrellas brillan en el cielo oscuro.",w:["Las","estrellas","brillan","en","el","cielo","oscuro"],e:"⭐",d:3,cat:"naturaleza"},
  {f:"El arcoíris tiene muchos colores bonitos.",w:["El","arcoíris","tiene","muchos","colores","bonitos"],e:"🌈",d:3,cat:"naturaleza"},
  {f:"Las hojas del árbol se caen en otoño.",w:["Las","hojas","del","árbol","se","caen","en","otoño"],e:"🍂",d:3,cat:"naturaleza"},
  // --- Escuela ---
  {f:"En la escuela aprendo a leer y escribir.",w:["En","la","escuela","aprendo","a","leer","y","escribir"],e:"🏫",d:3,cat:"escuela"},
  {f:"La maestra nos lee un cuento cada día.",w:["La","maestra","nos","lee","un","cuento","cada","día"],e:"👩‍🏫",d:3,cat:"escuela"},
  {f:"En el recreo juego con mis amigos.",w:["En","el","recreo","juego","con","mis","amigos"],e:"⛹️",d:3,cat:"escuela"},
  // --- Concordancia avanzada ---
  {f:"Los gatos negros duermen en la cama.",w:["Los","gatos","negros","duermen","en","la","cama"],e:"🐱",d:3,cat:"concordancia"},
  {f:"Las flores rojas crecen en el jardín.",w:["Las","flores","rojas","crecen","en","el","jardín"],e:"🌹",d:3,cat:"concordancia"},
  {f:"Los perros grandes corren por el parque.",w:["Los","perros","grandes","corren","por","el","parque"],e:"🐕",d:3,cat:"concordancia"},
  {f:"Las nubes blancas pasan por el cielo.",w:["Las","nubes","blancas","pasan","por","el","cielo"],e:"☁️",d:3,cat:"concordancia"},
  // --- Exclamaciones ¡! ---
  {f:"¡Qué lindo día para ir a la playa!",w:["Qué","lindo","día","para","ir","a","la","playa"],e:"🏖️",d:3,cat:"puntuación"},
  {f:"¡Mi equipo ganó el partido de fútbol!",w:["Mi","equipo","ganó","el","partido","de","fútbol"],e:"⚽",d:3,cat:"puntuación"},
  {f:"¡Hoy es el mejor día del mundo!",w:["Hoy","es","el","mejor","día","del","mundo"],e:"🎉",d:3,cat:"puntuación"},
  // --- Preguntas ¿? ---
  {f:"¿Podemos ir a la plaza después de comer?",w:["Podemos","ir","a","la","plaza","después","de","comer"],e:"🏛️",d:3,cat:"puntuación"},
  {f:"¿Por qué la luna sale de noche?",w:["Por","qué","la","luna","sale","de","noche"],e:"🌙",d:3,cat:"puntuación"},
  {f:"¿Cuántos planetas hay en el cielo?",w:["Cuántos","planetas","hay","en","el","cielo"],e:"🪐",d:3,cat:"puntuación"},
  // --- Textos con propósito ---
  {f:"Querida mamá: te quiero mucho.",w:["Querida","mamá","te","quiero","mucho"],e:"💌",d:3,cat:"tarjeta"},
  {f:"Feliz cumpleaños, pasala muy lindo.",w:["Feliz","cumpleaños","pasala","muy","lindo"],e:"🎂",d:3,cat:"tarjeta"},
  {f:"Lista: leche, pan, huevos y queso.",w:["Lista","leche","pan","huevos","y","queso"],e:"📝",d:3,cat:"lista"},
  {f:"Prohibido pisar el pasto del jardín.",w:["Prohibido","pisar","el","pasto","del","jardín"],e:"🚫",d:3,cat:"cartel"},
  {f:"Horario: lunes a viernes de ocho a doce.",w:["Horario","lunes","a","viernes","de","ocho","a","doce"],e:"🕐",d:3,cat:"cartel"}
];

// STICKERS ALBUM - 40 stickers organized in 5 categories
// NOTE: check functions run later when prog/stats are available from index.html
// PALABRAS is an array of {t, s, n, e} objects — use .filter() and .n (not .nivel)
var STICKERS=[
  // Planetas - 8 stickers (one per level at 50% completion)
  {id:'p1',cat:'planetas',name:'Explorador Alfa',icon:'🌱',desc:'Completar 50% del Planeta Alfa',check:function(){var ws=PALABRAS.filter(function(w){return w.n===1});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p2',cat:'planetas',name:'Navegante Beta',icon:'🌿',desc:'Completar 50% del Planeta Beta',check:function(){var ws=PALABRAS.filter(function(w){return w.n===2});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p3',cat:'planetas',name:'Erudito Gamma',icon:'📚',desc:'Completar 50% del Planeta Gamma',check:function(){var ws=PALABRAS.filter(function(w){return w.n===3});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p4',cat:'planetas',name:'Viajero Delta',icon:'💛',desc:'Completar 50% del Planeta Delta',check:function(){var ws=PALABRAS.filter(function(w){return w.n===4});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p5',cat:'planetas',name:'Cosechador Épsilon',icon:'🍎',desc:'Completar 50% del Planeta Épsilon',check:function(){var ws=PALABRAS.filter(function(w){return w.n===5});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p6',cat:'planetas',name:'Estilista Zeta',icon:'🧍',desc:'Completar 50% del Planeta Zeta',check:function(){var ws=PALABRAS.filter(function(w){return w.n===6});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p7',cat:'planetas',name:'Conservador Eta',icon:'🌍',desc:'Completar 50% del Planeta Eta',check:function(){var ws=PALABRAS.filter(function(w){return w.n===7});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  {id:'p8',cat:'planetas',name:'Campeón Theta',icon:'🏆',desc:'Completar 50% del Planeta Theta',check:function(){var ws=PALABRAS.filter(function(w){return w.n===8});var done=ws.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=ws.length*.5}},
  // Animales - 8 stickers
  {id:'a1',cat:'animales',name:'Amiguito Gato',icon:'🐱',desc:'Dominar 5 palabras de animales',check:function(){var animalWords=['gato','perro','pájaro','vaca','oveja','cerdo','caballo','gallina','pato','rana'];var mastered=animalWords.filter(function(w){return prog[w]&&prog[w].hl>=7&&prog[w].sessions>=4}).length;return mastered>=5}},
  {id:'a2',cat:'animales',name:'Observador de Aves',icon:'🦅',desc:'Escribir 10 palabras de naturaleza',check:function(){return(stats.dictadoCorrect||0)>=10}},
  {id:'a3',cat:'animales',name:'Guardián del Bosque',icon:'🌲',desc:'Completar 100 letras escritas',check:function(){return stats.totalLetters>=100}},
  {id:'a4',cat:'animales',name:'Maestro del Océano',icon:'🐳',desc:'3 sesiones sin errores',check:function(){return stats.streak>=3}},
  {id:'a5',cat:'animales',name:'Corredor Rápido',icon:'🐆',desc:'50 palabras correctas en dictado',check:function(){return(stats.dictadoCorrect||0)>=50}},
  {id:'a6',cat:'animales',name:'Salteador Ágil',icon:'🦘',desc:'Alcanzar 200 palabras totales',check:function(){return stats.totalWords>=200}},
  {id:'a7',cat:'animales',name:'Volador Épico',icon:'🦅',desc:'10 sesiones completadas',check:function(){return stats.sessions>=10}},
  {id:'a8',cat:'animales',name:'Cazador Exitoso',icon:'🦁',desc:'Dominar 20 palabras totales',check:function(){var mastered=Object.keys(prog).filter(function(w){return prog[w]&&prog[w].hl>=7&&prog[w].sessions>=4}).length;return mastered>=20}},
  // Logros - 8 stickers
  {id:'l1',cat:'logros',name:'Primer Paso',icon:'👣',desc:'Completar primera palabra',check:function(){return stats.totalWords>=1}},
  {id:'l2',cat:'logros',name:'Racha de Fuego',icon:'🔥',desc:'10 días de racha',check:function(){return stats.streak>=10}},
  {id:'l3',cat:'logros',name:'Combo Dorado',icon:'✨',desc:'Combo x20 alcanzado',check:function(){return(window.maxCombo||0)>=20}},
  {id:'l4',cat:'logros',name:'Perfeccionista',icon:'🎯',desc:'10 palabras perfectas',check:function(){var p=Object.keys(prog).filter(function(w){return prog[w]&&prog[w].correct>=prog[w].sessions&&prog[w].sessions>0}).length;return p>=10}},
  {id:'l5',cat:'logros',name:'Estudioso',icon:'📖',desc:'50 sesiones de práctica',check:function(){return stats.sessions>=50}},
  {id:'l6',cat:'logros',name:'Maratonista',icon:'🏃',desc:'1000 letras escribidas',check:function(){return stats.totalLetters>=1000}},
  {id:'l7',cat:'logros',name:'Leyenda',icon:'👑',desc:'Dominar 40 palabras',check:function(){var mastered=Object.keys(prog).filter(function(w){return prog[w]&&prog[w].hl>=7&&prog[w].sessions>=4}).length;return mastered>=40}},
  {id:'l8',cat:'logros',name:'Superestrella',icon:'⭐',desc:'500 palabras correctas',check:function(){var correct=Object.keys(prog).reduce(function(s,w){return s+(prog[w].correct||0)},0);return correct>=500}},
  // Letras - 8 stickers
  {id:'le1',cat:'letras',name:'Amigo de la A',icon:'🅰️',desc:'3 palabras con A',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('a')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le2',cat:'letras',name:'Aventurero B',icon:'🅱️',desc:'3 palabras con B',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('b')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le3',cat:'letras',name:'Curioso C',icon:'©️',desc:'3 palabras con C',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('c')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le4',cat:'letras',name:'Dueño de D',icon:'🔤',desc:'3 palabras con D',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('d')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le5',cat:'letras',name:'Elegante E',icon:'ℹ️',desc:'3 palabras con E',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('e')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le6',cat:'letras',name:'Famoso F',icon:'🔤',desc:'3 palabras con F',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('f')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le7',cat:'letras',name:'Ganador G',icon:'🔤',desc:'3 palabras con G',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('g')!==-1&&prog[x].seen>0});return w.length>=3}},
  {id:'le8',cat:'letras',name:'Heroico H',icon:'🔤',desc:'3 palabras con H',check:function(){var w=Object.keys(prog).filter(function(x){return x.toLowerCase().indexOf('h')!==-1&&prog[x].seen>0});return w.length>=3}},
  // Especiales - 8 stickers
  {id:'e1',cat:'especiales',name:'Optimista',icon:'😊',desc:'30 días de racha',check:function(){return stats.streak>=30}},
  {id:'e2',cat:'especiales',name:'Dedicado',icon:'💪',desc:'100 sesiones completadas',check:function(){return stats.sessions>=100}},
  {id:'e3',cat:'especiales',name:'Incansable',icon:'⚡',desc:'200 palabras en una semana',check:function(){return(stats.weeklyWords||0)>=200}},
  {id:'e4',cat:'especiales',name:'Veloz',icon:'💨',desc:'100 palabras en dictado',check:function(){return(stats.dictadoCorrect||0)>=100}},
  {id:'e5',cat:'especiales',name:'Sabio',icon:'🧠',desc:'50% de todas las palabras vistas',check:function(){var total=PALABRAS.length;var done=PALABRAS.filter(function(w){return prog[w.t]&&prog[w.t].seen>0}).length;return done>=total*.5}},
  {id:'e6',cat:'especiales',name:'Explorador',icon:'🗺️',desc:'Visitar todos los 8 planetas',check:function(){var visited=0;for(var i=1;i<=8;i++){var ws=PALABRAS.filter(function(w){return w.n===i});if(ws.some(function(w){return prog[w.t]&&prog[w.t].seen>0}))visited++}return visited===8}},
  {id:'e7',cat:'especiales',name:'Persistente',icon:'🎖️',desc:'100 palabras dominadas',check:function(){var mastered=Object.keys(prog).filter(function(w){return prog[w]&&prog[w].hl>=7&&prog[w].sessions>=4}).length;return mastered>=100}},
  {id:'e8',cat:'especiales',name:'Campeón Total',icon:'🏅',desc:'Todas las colecciones completas',check:function(){var unlocked=0;for(var i=0;i<STICKERS.length-1;i++){try{if(STICKERS[i].check())unlocked++}catch(e){}}return unlocked>=39}}
];

// ═══════════ DICTADO PROGRESSIVE LEVELS ═══════════
var DICTADO_NIVELES = [
  {id:1, nombre:"Vocales", emoji:"🔤", desc:"A E I O U", color:"#4ade80"},
  {id:2, nombre:"Consonantes", emoji:"🅱️", desc:"M P S L T N D R C G", color:"#60a5fa"},
  {id:3, nombre:"Sílabas", emoji:"🗣️", desc:"ma pa sa la me pe...", color:"#facc15"},
  {id:4, nombre:"Palabras cortitas", emoji:"⭐", desc:"2-3 letras", color:"#fb923c"},
  {id:5, nombre:"Palabras medianas", emoji:"⭐⭐", desc:"4 letras", color:"#f472b6"},
  {id:6, nombre:"Palabras largas", emoji:"⭐⭐⭐", desc:"5+ letras", color:"#a78bfa"}
];

var SILABAS_DICTADO = [
  "ma","me","mi","mo","mu","pa","pe","pi","po","pu",
  "sa","se","si","so","su","la","le","li","lo","lu",
  "ta","te","ti","to","tu","na","ne","ni","no","nu",
  "da","de","di","do","du","ra","re","ri","ro","ru",
  "ca","co","cu","ga","go","gu","ba","be","bi","bo","bu",
  "fa","fe","fi","fo","fu","ja","je","ji","jo","ju"
];
