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

// === IMÁGENES REALES (Wikimedia Commons) ===
// Fotos reales para las palabras más visuales — fallback a emoji si no carga
var IMG_MAP = {
  // Animales
  "gato":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/200px-Cat_November_2010-1a.jpg",
  "perro":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/200px-YellowLabradorLooking_new.jpg",
  "pato":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg/200px-Anas_platyrhynchos_male_female_quadrat.jpg",
  "vaca":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/200px-Cow_female_black_white.jpg",
  "oso":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/200px-2010-kodiak-bear-1.jpg",
  "caballo":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nokota_Horses_croance.jpg/200px-Nokota_Horses_croance.jpg",
  "mariposa":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Papilio_machaon_-_Swallowtail_-_02.jpg/200px-Papilio_machaon_-_Swallowtail_-_02.jpg",
  "elefante":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/200px-African_Bush_Elephant.jpg",
  "tortuga":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Florida_Box_Turtle_Digon3_re-edited.jpg/200px-Florida_Box_Turtle_Digon3_re-edited.jpg",
  "conejo":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/200px-Oryctolagus_cuniculus_Rcdo.jpg",
  "delfín":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/200px-Tursiops_truncatus_01.jpg",
  "jirafa":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/200px-Giraffe_Mikumi_National_Park.jpg",
  "pingüino":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Emperor_Penguin_Manchot_empereur.jpg/200px-Emperor_Penguin_Manchot_empereur.jpg",
  "loro":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Amazona_aestiva_-_Painted_Parrot.jpg/200px-Amazona_aestiva_-_Painted_Parrot.jpg",
  "sapo":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Bufo_bufo_03_by-dpc.jpg/200px-Bufo_bufo_03_by-dpc.jpg",
  "mono":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg/200px-Bonnet_macaque_%28Macaca_radiata%29_Photograph_By_Shantanu_Kuveskar.jpg",
  "pájaro":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/200px-Eopsaltria_australis_-_Mogo_Campground.jpg",
  "abeja":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Apis_mellifera_Western_honey_bee.jpg/200px-Apis_mellifera_Western_honey_bee.jpg",
  // Alimentos
  "manzana":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/200px-Red_Apple.jpg",
  "banana":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/200px-Banana-Single.jpg",
  "naranja":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/200px-Orange-Fruit-Pieces.jpg",
  "tomate":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/200px-Tomato_je.jpg",
  "pizza":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/200px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",
  "helado":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_nut_topping_and_chocolate_sauce.jpg/200px-Ice_cream_with_whipped_cream%2C_nut_topping_and_chocolate_sauce.jpg",
  "chocolate":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chocolate_%28blue_background%29.jpg/200px-Chocolate_%28blue_background%29.jpg",
  "huevo":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chicken_egg_2009-06-04.jpg/200px-Chicken_egg_2009-06-04.jpg",
  "queso":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Queso.png/200px-Queso.png",
  "pan":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/200px-Fresh_made_bread_05.jpg",
  "leche":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/200px-Milk_glass.jpg",
  // Naturaleza
  "árbol":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/200px-Ash_Tree_-_geograph.org.uk_-_590710.jpg",
  "flor":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/200px-Sunflower_from_Silesia2.jpg",
  "montaña":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/200px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
  "luna":"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/200px-FullMoon2010.jpg",
  "mar":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Maldives_The_Sea.jpg/200px-Maldives_The_Sea.jpg",
  "playa":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bondi_Beach.jpg/200px-Bondi_Beach.jpg",
  // Objetos / vehículos
  "auto":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Hybrid_1.8.jpg/200px-2019_Toyota_Corolla_Hybrid_1.8.jpg",
  "tren":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Paris_Metro_MP_89_Stock.jpg/200px-Paris_Metro_MP_89_Stock.jpg",
  "bicicleta":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_de_France_2005.jpg/200px-Tour_de_France_2005.jpg",
  "reloj":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Alarm_Clocks_20101105a.jpg/200px-Alarm_Clocks_20101105a.jpg",
  "libro":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Open_book_nridge_0.jpg/200px-Open_book_nridge_0.jpg",
  "pelota":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Football_Pallo_valridge.jpg/200px-Football_Pallo_valridge.jpg",
  "casa":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Wooden_house_in_Chakvi.jpg/200px-Wooden_house_in_Chakvi.jpg"
};
// Assign images to word objects
function assignImages(){
  PALABRAS.forEach(function(w){if(IMG_MAP[w.t])w.img=IMG_MAP[w.t]});
}

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
assignImages();

// ═══════════ FRASES ═══════════
// Frases personales y simples para practicar escritura de oraciones
// Cada frase tiene: texto completo, palabras separadas, emoji, dificultad (1-3)
const FRASES = [
  // === Nivel 1 — Sobre Lisandro (personales) ===
  {f:"Me llamo Lisandro",w:["Me","llamo","Lisandro"],e:"⭐",d:1,cat:"sobre mí"},
  {f:"Soy argentino",w:["Soy","argentino"],e:"🇦🇷",d:1,cat:"sobre mí"},
  {f:"Nací en Uruguay",w:["Nací","en","Uruguay"],e:"🇺🇾",d:1,cat:"sobre mí"},
  {f:"Me gusta Minecraft",w:["Me","gusta","Minecraft"],e:"⛏️",d:1,cat:"me gusta"},
  {f:"Me gusta Roblox",w:["Me","gusta","Roblox"],e:"🎮",d:1,cat:"me gusta"},
  {f:"Me gusta Fortnite",w:["Me","gusta","Fortnite"],e:"🎯",d:1,cat:"me gusta"},
  {f:"Me gusta el chocolate",w:["Me","gusta","el","chocolate"],e:"🍫",d:1,cat:"me gusta"},
  {f:"Aparicio es mi amigo",w:["Aparicio","es","mi","amigo"],e:"🤝",d:1,cat:"sobre mí"},
  {f:"Voy al colegio Woodside",w:["Voy","al","colegio","Woodside"],e:"🏫",d:2,cat:"sobre mí"},
  {f:"Mi nombre completo es Lisandro Agustín Flores",w:["Mi","nombre","completo","es","Lisandro","Agustín","Flores"],e:"📛",d:3,cat:"sobre mí"},
  // === Nivel 2 — Frases simples del entorno ===
  {f:"El gato duerme",w:["El","gato","duerme"],e:"🐱",d:1,cat:"animales"},
  {f:"La casa es grande",w:["La","casa","es","grande"],e:"🏠",d:1,cat:"cosas"},
  {f:"El sol brilla",w:["El","sol","brilla"],e:"☀️",d:1,cat:"naturaleza"},
  {f:"La luna sale",w:["La","luna","sale"],e:"🌙",d:1,cat:"naturaleza"},
  {f:"El perro corre",w:["El","perro","corre"],e:"🐕",d:1,cat:"animales"},
  {f:"Yo tengo hambre",w:["Yo","tengo","hambre"],e:"🍽️",d:1,cat:"diario"},
  {f:"Mamá me quiere",w:["Mamá","me","quiere"],e:"❤️",d:1,cat:"familia"},
  {f:"Papá es grande",w:["Papá","es","grande"],e:"👨",d:1,cat:"familia"},
  // === Nivel 3 — Frases más largas ===
  {f:"El pájaro vuela alto",w:["El","pájaro","vuela","alto"],e:"🐦",d:2,cat:"animales"},
  {f:"Me gusta ir al parque",w:["Me","gusta","ir","al","parque"],e:"🏞️",d:2,cat:"me gusta"},
  {f:"Hoy hace mucho calor",w:["Hoy","hace","mucho","calor"],e:"🌡️",d:2,cat:"diario"},
  {f:"Mi mamá cocina rico",w:["Mi","mamá","cocina","rico"],e:"👩‍🍳",d:2,cat:"familia"},
  {f:"Quiero un helado",w:["Quiero","un","helado"],e:"🍦",d:1,cat:"diario"},
  {f:"La mariposa es linda",w:["La","mariposa","es","linda"],e:"🦋",d:2,cat:"animales"},
  {f:"Vamos a jugar afuera",w:["Vamos","a","jugar","afuera"],e:"🌳",d:2,cat:"diario"},
  {f:"El robot es genial",w:["El","robot","es","genial"],e:"🤖",d:2,cat:"cosas"},
  {f:"Me gusta leer cuentos",w:["Me","gusta","leer","cuentos"],e:"📖",d:2,cat:"me gusta"},
  {f:"La estrella brilla mucho",w:["La","estrella","brilla","mucho"],e:"⭐",d:2,cat:"naturaleza"}
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
// ===== READING COMPREHENSION DATA (LECTURA) =====
// 20 texts organized in 3 difficulty levels (ANEP Tramo 2 curriculum)
// Each text includes: vocabulary, prediction question, and 3-4 comprehension questions

var TEXTOS = [
  // ===== LEVEL 1 (Fácil) - 8 very short texts =====
  {
    id: 'l1_gato',
    titulo: 'El gato de Lucía',
    tipo: 'narrativo',
    nivel: 1,
    emoji: '🐱',
    imagen: '🐱🏠',
    texto: 'Lucía tiene un gato. El gato se llama Michi. Michi es blanco y pequeño. Le gusta dormir en el sofá.',
    vocabulario: [
      {palabra: 'pequeño', significado: 'Algo que no es grande, chiquito'}
    ],
    prediccion: '¿De qué crees que trata este cuento?',
    opcionesPrediccion: ['De un gato', 'De un auto', 'De la escuela'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cómo se llama el gato?', opciones: ['Michi', 'Toby', 'Luna'], correcta: 0},
      {tipo: 'literal', pregunta: '¿De qué color es Michi?', opciones: ['Negro', 'Blanco', 'Marrón'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Michi es un gato tranquilo o nervioso?', opciones: ['Tranquilo', 'Nervioso', 'Enojado'], correcta: 0}
    ]
  },
  {
    id: 'l1_perro',
    titulo: 'Mi perro se llama Toby',
    tipo: 'narrativo',
    nivel: 1,
    emoji: '🐕',
    imagen: '🐕👦',
    texto: 'Mi perro se llama Toby. Toby es grande y marrón. Le encanta jugar con una pelota roja. Todos los días corremos juntos en el parque.',
    vocabulario: [
      {palabra: 'encanta', significado: 'Le gusta mucho, le fascina'}
    ],
    prediccion: '¿De quién habla este cuento?',
    opcionesPrediccion: ['De un perro', 'De un gato', 'De un pájaro'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De qué color es Toby?', opciones: ['Negro', 'Marrón', 'Blanco'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Con qué le gusta jugar a Toby?', opciones: ['Con una pelota roja', 'Con un zapato', 'Con una cuerda'], correcta: 0},
      {tipo: 'inferencial', pregunta: '¿Dónde corren juntos?', opciones: ['En la casa', 'En el parque', 'En la escuela'], correcta: 1}
    ]
  },
  {
    id: 'l1_sol_luna',
    titulo: 'El sol y la luna',
    tipo: 'informativo',
    nivel: 1,
    emoji: '☀️',
    imagen: '☀️🌙',
    texto: 'El sol es grande y amarillo. Sale por la mañana. La luna es blanca y redonda. Sale por la noche. El sol nos da luz y calor durante el día. La luna brilla en la noche oscura.',
    vocabulario: [
      {palabra: 'brilla', significado: 'Emite luz, resplandece'},
      {palabra: 'oscura', significado: 'Sin luz, de noche'}
    ],
    prediccion: '¿De qué trata este texto?',
    opcionesPrediccion: ['Del sol y la luna', 'De las estrellas', 'De los colores'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De qué color es el sol?', opciones: ['Blanco', 'Amarillo', 'Azul'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Cuándo sale la luna?', opciones: ['Por la mañana', 'Por la noche', 'Al mediodía'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Cuándo tenemos más luz?', opciones: ['Con la luna', 'Con el sol', 'Nunca'], correcta: 1}
    ]
  },
  {
    id: 'l1_manzana',
    titulo: 'La manzana roja',
    tipo: 'descriptivo',
    nivel: 1,
    emoji: '🍎',
    imagen: '🍎',
    texto: 'La manzana es una fruta. Es roja y redonda. Tiene un palito verde en la punta. Es dulce y sabrosa. Las manzanas crecen en los árboles. A muchos niños les encanta comer manzanas.',
    vocabulario: [
      {palabra: 'sabrosa', significado: 'Que tiene buen sabor, deliciosa'},
      {palabra: 'crece', significado: 'Aumenta de tamaño, se hace más grande'}
    ],
    prediccion: '¿Qué fruta describe este texto?',
    opcionesPrediccion: ['Una manzana', 'Una naranja', 'Un plátano'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De qué color es la manzana?', opciones: ['Amarilla', 'Roja', 'Verde'], correcta: 1},
      {tipo: 'literal', pregunta: '¿De qué color es el palito de la manzana?', opciones: ['Rojo', 'Verde', 'Marrón'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Es la manzana sabrosa o amarga?', opciones: ['Sabrosa', 'Amarga', 'Sin sabor'], correcta: 0}
    ]
  },
  {
    id: 'l1_escuela',
    titulo: 'Yo voy a la escuela',
    tipo: 'narrativo',
    nivel: 1,
    emoji: '🎒',
    imagen: '🏫📚',
    texto: 'Todos los días voy a la escuela. Mi mochila es azul. Llevo mis libros y cuadernos. En la escuela tengo muchos amigos. Aprendo a leer y a escribir. Me gusta mucho la escuela.',
    vocabulario: [
      {palabra: 'mochila', significado: 'Bolsa que se carga en la espalda para guardar cosas'}
    ],
    prediccion: '¿A dónde va el niño?',
    opcionesPrediccion: ['A la escuela', 'Al parque', 'Al supermercado'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De qué color es la mochila?', opciones: ['Roja', 'Azul', 'Verde'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué lleva en la mochila?', opciones: ['Juguetes', 'Libros y cuadernos', 'Ropa'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Le gusta la escuela?', opciones: ['Sí', 'No', 'No dice'], correcta: 0}
    ]
  },
  {
    id: 'l1_lluvia',
    titulo: 'La lluvia',
    tipo: 'poema',
    nivel: 1,
    emoji: '🌧️',
    imagen: '🌧️☔',
    texto: 'Cae la lluvia del cielo,\npitter patter, qué consuelo.\nEl agua moja las flores,\ny trae alegría a los colores.',
    vocabulario: [
      {palabra: 'consuelo', significado: 'Alivio, tranquilidad'}
    ],
    prediccion: '¿De qué habla este poema?',
    opcionesPrediccion: ['De la lluvia', 'Del viento', 'Del sol'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De dónde cae la lluvia?', opciones: ['Del árbol', 'Del cielo', 'Del mar'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué moja la lluvia?', opciones: ['Las flores', 'Las casas', 'El cielo'], correcta: 0},
      {tipo: 'inferencial', pregunta: '¿La lluvia es importante para las flores?', opciones: ['Sí', 'No', 'Quizás'], correcta: 0}
    ]
  },
  {
    id: 'l1_adivinanza',
    titulo: '¿Quién soy?',
    tipo: 'adivinanza',
    nivel: 1,
    emoji: '🐔',
    imagen: '🐔',
    texto: 'Tengo dos alas pero no vuelo. Tengo plumas y soy amarilla. Canto por la mañana con mi voz fuerte. Pongo huevos todos los días. ¿Quién soy?',
    vocabulario: [
      {palabra: 'alas', significado: 'Partes del cuerpo que permiten volar'},
      {palabra: 'plumas', significado: 'Partes del cuerpo de los pájaros'}
    ],
    prediccion: '¿Qué animal es esta adivinanza?',
    opcionesPrediccion: ['Una gallina', 'Un pato', 'Un loro'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De qué color es el animal?', opciones: ['Blanca', 'Amarilla', 'Roja'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Cuántas alas tiene?', opciones: ['Una', 'Dos', 'Tres'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Este animal puede volar?', opciones: ['Sí', 'No', 'A veces'], correcta: 1}
    ]
  },
  {
    id: 'l1_familia',
    titulo: 'La familia de Tomás',
    tipo: 'narrativo',
    nivel: 1,
    emoji: '👨‍👩‍👦',
    imagen: '👨‍👩‍👦‍👦',
    texto: 'Mi papá se llama Carlos. Mi mamá se llama María. Tengo una hermana que se llama Ana. Vivimos en una casa grande. Mi familia es muy importante para mí. Me encanta jugar con mi hermana.',
    vocabulario: [
      {palabra: 'hermana', significado: 'Hija de los mismos padres'}
    ],
    prediccion: '¿De qué habla Tomás?',
    opcionesPrediccion: ['De su familia', 'De su escuela', 'De sus amigos'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cómo se llama el papá?', opciones: ['Juan', 'Carlos', 'Pedro'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Cómo se llama la hermana?', opciones: ['Ana', 'María', 'Rosa'], correcta: 0},
      {tipo: 'inferencial', pregunta: '¿Tomás ama a su familia?', opciones: ['Sí', 'No', 'No sabe'], correcta: 0}
    ]
  },

  // ===== LEVEL 2 (Medio) - 6 medium texts =====
  {
    id: 'l2_cumpleaños',
    titulo: 'El cumpleaños de Ana',
    tipo: 'narrativo',
    nivel: 2,
    emoji: '🎂',
    imagen: '🎂🎉',
    texto: 'Hoy es el cumpleaños de Ana. Ella cumple 7 años. Su mamá preparó un pastel de chocolate muy grande. Sus amigos vinieron a celebrar. Jugaron en el parque y comieron muchas golosinas. Ana recibió regalos bonitos. Fue un día muy especial para ella.',
    vocabulario: [
      {palabra: 'cumpleaños', significado: 'Día en que nació una persona'},
      {palabra: 'golosinas', significado: 'Dulces y caramelos'}
    ],
    prediccion: '¿Qué tipo de celebración es esta?',
    opcionesPrediccion: ['Un cumpleaños', 'Una boda', 'Un picnic'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cuántos años cumple Ana?', opciones: ['5', '7', '9'], correcta: 1},
      {tipo: 'literal', pregunta: '¿De qué sabor fue el pastel?', opciones: ['Fresa', 'Chocolate', 'Vainilla'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Le gustó el día a Ana?', opciones: ['No sabemos', 'Sí, fue especial', 'No le gustó'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Dónde jugaron los niños?', opciones: ['En la casa', 'En el parque', 'En la escuela'], correcta: 1}
    ]
  },
  {
    id: 'l2_granja',
    titulo: 'Los animales de la granja',
    tipo: 'informativo',
    nivel: 2,
    emoji: '🐄',
    imagen: '🐄🐑🐷',
    texto: 'En la granja hay muchos animales. Las vacas dan leche. Las ovejas dan lana para hacer ropa. Los cerdos son rosados y les gusta el barro. Los caballos corren muy rápido. Los patos nadan en el agua. El granjero cuida de todos los animales.',
    vocabulario: [
      {palabra: 'granja', significado: 'Terreno con animales y plantas que se cultivan'},
      {palabra: 'lana', significado: 'Fibra que sale del cuerpo de las ovejas'}
    ],
    prediccion: '¿Dónde ocurre esta historia?',
    opcionesPrediccion: ['En la ciudad', 'En la granja', 'En el bosque'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Qué dan las vacas?', opciones: ['Lana', 'Leche', 'Huevos'], correcta: 1},
      {tipo: 'literal', pregunta: '¿De qué color son los cerdos?', opciones: ['Negros', 'Marrones', 'Rosados'], correcta: 2},
      {tipo: 'inferencial', pregunta: '¿Quién cuida a los animales?', opciones: ['El granjero', 'El veterinario', 'El alcalde'], correcta: 0},
      {tipo: 'inferencial', pregunta: '¿Por qué los caballos corren rápido?', opciones: ['Tienen miedo', 'Es su naturaleza', 'Están enojados'], correcta: 1}
    ]
  },
  {
    id: 'l2_arcoiris',
    titulo: 'El arcoíris',
    tipo: 'informativo',
    nivel: 2,
    emoji: '🌈',
    imagen: '🌈☔',
    texto: 'Después de la lluvia, el cielo se llena de colores bonitos. El arcoíris es un puente de luz. Tiene siete colores diferentes. El rojo está afuera. Luego viene el naranja. Después el amarillo. En medio está el verde. Después el azul y el índigo. El violeta está al final. El arcoíris es muy hermoso y raro.',
    vocabulario: [
      {palabra: 'arcoíris', significado: 'Fenómeno natural con siete colores después de la lluvia'},
      {palabra: 'hermoso', significado: 'Bonito, lindo'}
    ],
    prediccion: '¿Cuándo ves un arcoíris?',
    opcionesPrediccion: ['Cuando llueve', 'Después de la lluvia', 'Cuando es de noche'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cuántos colores tiene el arcoíris?', opciones: ['5', '7', '9'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Cuál es el primer color del arcoíris?', opciones: ['Naranja', 'Rojo', 'Amarillo'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Es común ver arcoíris?', opciones: ['Sí, siempre', 'No, es raro', 'Solo de noche'], correcta: 1}
    ]
  },
  {
    id: 'l2_fabula_raton',
    titulo: 'El ratón y el gato',
    tipo: 'fábula',
    nivel: 2,
    emoji: '🐭',
    imagen: '🐭🐱',
    texto: 'Un pequeño ratón vivía en una casa. Un día vio a un gato durmiendo. El ratón fue muy cuidadoso y comió el queso que había en la despensa. Pero el gato se despertó. El ratón corrió rápidamente hacia su agujero. El gato lo persiguió pero no pudo atraparlo. El ratón aprendió que debe ser muy cuidadoso y prudente. Moraleja: La prudencia nos salva de los peligros.',
    vocabulario: [
      {palabra: 'prudencia', significado: 'Cuidado y cautela en las acciones'},
      {palabra: 'moraleja', significado: 'Enseñanza o consejo que se extrae de una historia'}
    ],
    prediccion: '¿Quiénes son los personajes principales?',
    opcionesPrediccion: ['Un ratón y un gato', 'Dos gatos', 'Dos ratones'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Qué comió el ratón?', opciones: ['Pan', 'Queso', 'Carne'], correcta: 1},
      {tipo: 'literal', pregunta: '¿A dónde corrió el ratón?', opciones: ['Hacia la puerta', 'Hacia su agujero', 'Hacia el techo'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Pudo el gato atrapar al ratón?', opciones: ['Sí', 'No', 'Casi'], correcta: 1}
    ]
  },
  {
    id: 'l2_casa',
    titulo: 'Mi casa',
    tipo: 'descriptivo',
    nivel: 2,
    emoji: '🏠',
    imagen: '🏠🚪',
    texto: 'Mi casa tiene cinco habitaciones. En la sala vemos televisión en familia. En la cocina mi mamá prepara comidas deliciosas. En el comedor comemos juntos. En los dormitorios dormimos cómodamente. En el baño nos lavamos. Mi casa es muy bonita. Las paredes son de color azul claro.',
    vocabulario: [
      {palabra: 'habitaciones', significado: 'Cuartos o espacios de la casa'},
      {palabra: 'comedor', significado: 'Cuarto donde se come'}
    ],
    prediccion: '¿De qué trata este texto?',
    opcionesPrediccion: ['De una ciudad', 'De una casa', 'De una tienda'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cuántas habitaciones tiene la casa?', opciones: ['3', '5', '7'], correcta: 1},
      {tipo: 'literal', pregunta: '¿De qué color son las paredes?', opciones: ['Blanco', 'Azul claro', 'Verde'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Es importante el comedor?', opciones: ['No', 'Sí, para comer', 'Quizás'], correcta: 1}
    ]
  },
  {
    id: 'l2_estaciones',
    titulo: 'Las estaciones',
    tipo: 'informativo',
    nivel: 2,
    emoji: '🍂',
    imagen: '🌞🌸🍂❄️',
    texto: 'El año tiene cuatro estaciones. La primavera trae flores nuevas. El verano es caluroso y vamos a la playa. El otoño es fresco y caen las hojas. El invierno es frío y a veces nieva. Cada estación tiene su belleza especial. La naturaleza cambia con las estaciones.',
    vocabulario: [
      {palabra: 'estaciones', significado: 'Cada una de las cuatro divisiones del año'},
      {palabra: 'caluroso', significado: 'Que hace mucho calor'}
    ],
    prediccion: '¿Cuántas estaciones hay?',
    opcionesPrediccion: ['2', '4', '6'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cuál es la estación más fría?', opciones: ['Otoño', 'Invierno', 'Verano'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Dónde vamos en verano?', opciones: ['A la montaña', 'A la playa', 'Al bosque'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Es importante conocer las estaciones?', opciones: ['No', 'Sí', 'A veces'], correcta: 1}
    ]
  },

  // ===== LEVEL 3 (Difícil) - 6 longer texts =====
  {
    id: 'l3_semilla',
    titulo: 'El viaje de la semilla',
    tipo: 'narrativo',
    nivel: 3,
    emoji: '🌱',
    imagen: '🌱🌿🌳',
    texto: 'Una pequeña semilla cayó en el suelo oscuro. Hacía frío y la semilla esperaba pacientemente. La lluvia llegó y mojó la tierra. El calor del sol empezó a calentar. La semilla se despertó y comenzó a crecer. Primero salió una pequeña raíz. Luego un brote verde asomó por la tierra. Los días pasaban y la planta crecía. Finalmente, un árbol grande y fuerte se levantaba hacia el cielo. De aquella pequeña semilla nació un hermoso árbol que daría sombra y frutos a muchas personas.',
    vocabulario: [
      {palabra: 'semilla', significado: 'Parte pequeña de una planta que puede dar origen a una nueva planta'},
      {palabra: 'raíz', significado: 'Parte subterránea de la planta que absorbe agua'},
      {palabra: 'brote', significado: 'Pequeña rama o vástago que sale de una planta'}
    ],
    prediccion: '¿Qué crece en esta historia?',
    opcionesPrediccion: ['Una flor', 'Un árbol', 'Una piedra'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Dónde cayó la semilla?', opciones: ['En el agua', 'En el suelo', 'En el aire'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué parte salió primero de la semilla?', opciones: ['Las hojas', 'La raíz', 'Las flores'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Qué necesitó la semilla para crecer?', opciones: ['Lluvia y sol', 'Viento', 'Oscuridad'], correcta: 0},
      {tipo: 'inferencial', pregunta: '¿Cuál es la lección de esta historia?', opciones: ['Las semillas son pequeñas', 'Con tiempo y cuidado todo crece', 'Los árboles no son útiles'], correcta: 1}
    ]
  },
  {
    id: 'l3_tortuga_liebre',
    titulo: 'La tortuga y la liebre',
    tipo: 'fábula',
    nivel: 3,
    emoji: '🐢',
    imagen: '🐢🐰',
    texto: 'Una liebre rápida se reía de la tortuga lenta. La liebre le propuso una carrera. Al comenzar la carrera, la liebre corrió muy rápido. Se sentía tan segura de ganar que decidió descansar bajo un árbol. La liebre se durmió profundamente. Mientras tanto, la tortuga seguía caminando lentamente pero sin parar. Pasó junto a la liebre dormida y continuó su camino. Cuando la liebre se despertó, corrió lo más rápido que pudo, pero era demasiado tarde. La tortuga ya había cruzado la meta. La liebre perdió la carrera. Moraleja: La perseverancia y la constancia vencen la prisa y la arrogancia.',
    vocabulario: [
      {palabra: 'perseverancia', significado: 'Firmeza y constancia en realizar algo'},
      {palabra: 'arrogancia', significado: 'Soberbia y exceso de confianza'},
      {palabra: 'meta', significado: 'Objetivo o línea de llegada'}
    ],
    prediccion: '¿Quién gana la carrera?',
    opcionesPrediccion: ['La liebre', 'La tortuga', 'No sé'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Dónde se durmió la liebre?', opciones: ['En el río', 'Bajo un árbol', 'En la meta'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué hizo la tortuga mientras la liebre dormía?', opciones: ['Se durmió', 'Siguió caminando', 'Se fue'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Por qué ganó la tortuga?', opciones: ['Era más rápida', 'Era constante', 'La liebre no quiso correr'], correcta: 1}
    ]
  },
  {
    id: 'l3_mercado',
    titulo: 'Un día en el mercado',
    tipo: 'narrativo',
    nivel: 3,
    emoji: '🛒',
    imagen: '🛒🍎🥕',
    texto: 'El sábado por la mañana, mi abuela me llevó al mercado. El mercado estaba lleno de gente y colores. Había puestos con frutas brillantes, verduras frescas y flores hermosas. Mi abuela llevaba una canasta grande. Primero compramos manzanas rojas y jugosas. Luego compramos zanahorias naranjas para hacer una sopa deliciosa. El vendedor de frutas nos dio un descuento especial porque somos clientes antiguos. Después fuimos al puesto de flores y mi abuela compró rosas blancas. Finalmente, regresamos a casa con la canasta llena. Mi abuela preparó una comida deliciosa con los ingredientes del mercado.',
    vocabulario: [
      {palabra: 'mercado', significado: 'Lugar donde se vende y compra productos'},
      {palabra: 'descuento', significado: 'Reducción del precio de algo'},
      {palabra: 'ingredientes', significado: 'Cosas que se mezclan para preparar comida'}
    ],
    prediccion: '¿A dónde fueron?',
    opcionesPrediccion: ['A la escuela', 'Al mercado', 'Al parque'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Quién llevó al niño al mercado?', opciones: ['La mamá', 'La abuela', 'El papá'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué compraron primero?', opciones: ['Zanahorias', 'Manzanas', 'Flores'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Por qué les dieron descuento?', opciones: ['No sé', 'Porque eran clientes antiguos', 'Porque era sábado'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Qué hizo la abuela con lo que compró?', opciones: ['Lo vendió', 'Lo preparó en comida', 'Lo regaló'], correcta: 1}
    ]
  },
  {
    id: 'l3_planetas',
    titulo: 'Los planetas',
    tipo: 'informativo',
    nivel: 3,
    emoji: '🪐',
    imagen: '🌍🪐☀️',
    texto: 'En el cielo nocturno hay muchas cosas fascinantes. El sol es una estrella que nos da luz y calor. Alrededor del sol giran los planetas. Vivimos en el planeta Tierra. Mercurio es el más cercano al sol y es pequeño. Venus es un planeta caliente con nubes densas. Marte es rojo y tiene montañas muy altas. Júpiter es el planeta más grande y tiene anillos de colores. Saturno tiene anillos hermosos. Todos los planetas giran alrededor del sol en órbitas diferentes.',
    vocabulario: [
      {palabra: 'planeta', significado: 'Cuerpo celeste que gira alrededor del sol'},
      {palabra: 'órbita', significado: 'Camino curvo que describe un cuerpo celeste'},
      {palabra: 'estrella', significado: 'Cuerpo celeste que emite luz propia'}
    ],
    prediccion: '¿De qué trata este texto?',
    opcionesPrediccion: ['De las estrellas', 'De los planetas', 'De la luna'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Cuál es el planeta más grande?', opciones: ['Tierra', 'Marte', 'Júpiter'], correcta: 2},
      {tipo: 'literal', pregunta: '¿En cuál de estos planetas vivimos?', opciones: ['Mercurio', 'Venus', 'Tierra'], correcta: 2},
      {tipo: 'inferencial', pregunta: '¿Por qué giran los planetas?', opciones: ['Por la gravedad del sol', 'Por el viento', 'Por casualidad'], correcta: 0},
      {tipo: 'inferencial', pregunta: '¿Cuál es el planeta más caliente?', opciones: ['Mercurio', 'Venus', 'Marte'], correcta: 1}
    ]
  },
  {
    id: 'l3_pajarito',
    titulo: 'El pajarito perdido',
    tipo: 'narrativo',
    nivel: 3,
    emoji: '🐦',
    imagen: '🐦🏠',
    texto: 'Un pequeño pajarito se escapó de su jaula. Volaba sin rumbo fijo por la ciudad. Pasaba por las ventanas de las casas. Los niños lo perseguían pero no podían atraparlo. El pajarito tenía miedo y no sabía a dónde ir. Volaba de árbol en árbol buscando alimento. Una niña pequeña lo vio en su balcón. En lugar de atraparlo, le puso una ramita con semillas. El pajarito comió las semillas y se calmó. La niña abrió la jaula y dejó al pajarito entrar. El pajarito regresó a su hogar. Desde ese día, el pajarito se acercaba al balcón cada mañana a visitar a la niña.',
    vocabulario: [
      {palabra: 'escapó', significado: 'Se fue corriendo o volando para evitar algo'},
      {palabra: 'alimento', significado: 'Comida que necesitan los seres vivos'}
    ],
    prediccion: '¿Qué le pasó al pajarito?',
    opcionesPrediccion: ['Se perdió', 'Voló alto', 'Comió semillas'],
    respuestaPrediccion: 0,
    preguntas: [
      {tipo: 'literal', pregunta: '¿De dónde se escapó el pajarito?', opciones: ['De un árbol', 'De una jaula', 'De un nido'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué puso la niña en el balcón?', opciones: ['Agua', 'Una ramita con semillas', 'Pan'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Por qué entró el pajarito a la jaula?', opciones: ['Tenía miedo', 'Confía en la niña', 'Estaba cansado'], correcta: 2},
      {tipo: 'inferencial', pregunta: '¿Cuál es la lección?', opciones: ['Los pájaros son veloces', 'La amabilidad los acerca', 'Los pájaros vuelan'], correcta: 1}
    ]
  },
  {
    id: 'l3_monstruo',
    titulo: 'El monstruo de la cueva',
    tipo: 'narrativo',
    nivel: 3,
    emoji: '👹',
    imagen: '👹🏔️',
    texto: 'En la montaña vivía un monstruo grande y peludo. Todos le tenían miedo. Los aldeanos corrían cuando lo veían. Pero nadie realmente lo conocía. Un día, un niño valiente se acercó a la cueva del monstruo. El monstruo salió rugiendo, pero el niño no corrió. El monstruo estaba sorprendido. El niño le ofreció un poco de comida. El monstruo comió y gruñó contento. Desde ese día, el niño visitaba al monstruo regularmente. Descubrió que el monstruo era amigable y estaba muy solo. Les contó a los aldeanos lo que descubrió. Todos comprendieron que no debían juzgar al monstruo por su aspecto. El monstruo se convirtió en un amigo de toda la aldea.',
    vocabulario: [
      {palabra: 'aldea', significado: 'Pueblo pequeño'},
      {palabra: 'valiente', significado: 'Que tiene valor y no tiene miedo'},
      {palabra: 'juzgar', significado: 'Formar una opinión sobre algo o alguien'}
    ],
    prediccion: '¿Qué tipo de historia es?',
    opcionesPrediccion: ['De miedo', 'De amistad', 'De viajes'],
    respuestaPrediccion: 1,
    preguntas: [
      {tipo: 'literal', pregunta: '¿Dónde vivía el monstruo?', opciones: ['En un castillo', 'En una cueva', 'En un bosque'], correcta: 1},
      {tipo: 'literal', pregunta: '¿Qué le ofreció el niño al monstruo?', opciones: ['Juguetes', 'Comida', 'Ropa'], correcta: 1},
      {tipo: 'inferencial', pregunta: '¿Por qué estaba solo el monstruo?', opciones: ['Perdió su familia', 'Era amigable', 'La gente le tenía miedo'], correcta: 2},
      {tipo: 'inferencial', pregunta: '¿Cuál es la lección principal?', opciones: ['Los monstruos son malos', 'No juzgues por la apariencia', 'Los niños son valientes'], correcta: 1}
    ]
  }
];
