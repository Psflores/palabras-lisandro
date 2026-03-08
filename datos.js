// 200 PALABRAS PEDAGÓGICAS — 8 niveles progresivos
// Cada palabra tiene: texto, emoji, sílabas separadas, nivel
const NIVELES = [
  {id:1, nombre:"Muy simples", emoji:"🌱", color:"#4ade80", desc:"Palabras familiares cortas"},
  {id:2, nombre:"Entorno", emoji:"🌿", color:"#34d399", desc:"Objetos y lugares cercanos"},
  {id:3, nombre:"Escuela", emoji:"📚", color:"#60a5fa", desc:"Escuela y rutinas"},
  {id:4, nombre:"Familia", emoji:"💛", color:"#facc15", desc:"Familia y vínculos"},
  {id:5, nombre:"Comida", emoji:"🍎", color:"#fb923c", desc:"Comida y vida diaria"},
  {id:6, nombre:"Cuerpo", emoji:"🧍", color:"#f472b6", desc:"Ropa y cuerpo"},
  {id:7, nombre:"Mundo", emoji:"🌍", color:"#a78bfa", desc:"Naturaleza y mundo"},
  {id:8, nombre:"Avanzado", emoji:"🏆", color:"#f87171", desc:"Palabras más largas"}
];

const PALABRAS = [
// === NIVEL 1 — Muy simples y familiares ===
{t:"mamá",s:["ma","má"],n:1,e:"👩"},{t:"papá",s:["pa","pá"],n:1,e:"👨"},{t:"casa",s:["ca","sa"],n:1,e:"🏠"},
{t:"mesa",s:["me","sa"],n:1,e:"🪑"},{t:"cama",s:["ca","ma"],n:1,e:"🛏️"},{t:"mano",s:["ma","no"],n:1,e:"✋"},
{t:"dedo",s:["de","do"],n:1,e:"☝️"},{t:"pie",s:["pie"],n:1,e:"🦶"},{t:"ojo",s:["o","jo"],n:1,e:"👁️"},
{t:"boca",s:["bo","ca"],n:1,e:"👄"},{t:"agua",s:["a","gua"],n:1,e:"💧"},{t:"pan",s:["pan"],n:1,e:"🍞"},
{t:"sol",s:["sol"],n:1,e:"☀️"},{t:"luna",s:["lu","na"],n:1,e:"🌙"},{t:"mar",s:["mar"],n:1,e:"🌊"},
{t:"pez",s:["pez"],n:1,e:"🐟"},{t:"oso",s:["o","so"],n:1,e:"🐻"},{t:"pato",s:["pa","to"],n:1,e:"🦆"},
{t:"gato",s:["ga","to"],n:1,e:"🐱"},{t:"perro",s:["pe","rro"],n:1,e:"🐕"},{t:"jugo",s:["ju","go"],n:1,e:"🧃"},
{t:"leche",s:["le","che"],n:1,e:"🥛"},{t:"sopa",s:["so","pa"],n:1,e:"🍜"},{t:"taza",s:["ta","za"],n:1,e:"☕"},
{t:"silla",s:["si","lla"],n:1,e:"🪑"},
// === NIVEL 2 — Objetos y entorno ===
{t:"puerta",s:["puer","ta"],n:2,e:"🚪"},{t:"piso",s:["pi","so"],n:2,e:"🏢"},{t:"techo",s:["te","cho"],n:2,e:"🏠"},
{t:"auto",s:["au","to"],n:2,e:"🚗"},{t:"tren",s:["tren"],n:2,e:"🚂"},{t:"barco",s:["bar","co"],n:2,e:"⛵"},
{t:"bici",s:["bi","ci"],n:2,e:"🚲"},{t:"plaza",s:["pla","za"],n:2,e:"🏛️"},{t:"parque",s:["par","que"],n:2,e:"🏞️"},
{t:"árbol",s:["ár","bol"],n:2,e:"🌳"},{t:"hoja",s:["ho","ja"],n:2,e:"🍃"},{t:"flor",s:["flor"],n:2,e:"🌸"},
{t:"nube",s:["nu","be"],n:2,e:"☁️"},{t:"cielo",s:["cie","lo"],n:2,e:"🌤️"},{t:"lluvia",s:["llu","via"],n:2,e:"🌧️"},
{t:"nieve",s:["nie","ve"],n:2,e:"❄️"},{t:"río",s:["rí","o"],n:2,e:"🏞️"},{t:"piedra",s:["pie","dra"],n:2,e:"🪨"},
{t:"tierra",s:["tie","rra"],n:2,e:"🌍"},{t:"fuego",s:["fue","go"],n:2,e:"🔥"},{t:"viento",s:["vien","to"],n:2,e:"💨"},
{t:"bolsa",s:["bol","sa"],n:2,e:"👜"},{t:"caja",s:["ca","ja"],n:2,e:"📦"},{t:"vaso",s:["va","so"],n:2,e:"🥤"},
{t:"plato",s:["pla","to"],n:2,e:"🍽️"},
// === NIVEL 3 — Escuela y rutinas ===
{t:"libro",s:["li","bro"],n:3,e:"📖"},{t:"lápiz",s:["lá","piz"],n:3,e:"✏️"},{t:"goma",s:["go","ma"],n:3,e:"🧹"},
{t:"clase",s:["cla","se"],n:3,e:"🏫"},{t:"tarea",s:["ta","re","a"],n:3,e:"📝"},{t:"patio",s:["pa","tio"],n:3,e:"🏡"},
{t:"recreo",s:["re","cre","o"],n:3,e:"⛹️"},{t:"escuela",s:["es","cue","la"],n:3,e:"🏫"},{t:"maestra",s:["ma","es","tra"],n:3,e:"👩‍🏫"},
{t:"mochila",s:["mo","chi","la"],n:3,e:"🎒"},{t:"cuaderno",s:["cua","der","no"],n:3,e:"📓"},{t:"regla",s:["re","gla"],n:3,e:"📏"},
{t:"tijera",s:["ti","je","ra"],n:3,e:"✂️"},{t:"colores",s:["co","lo","res"],n:3,e:"🎨"},{t:"dibujo",s:["di","bu","jo"],n:3,e:"🖍️"},
{t:"palabra",s:["pa","la","bra"],n:3,e:"💬"},{t:"letra",s:["le","tra"],n:3,e:"🔤"},{t:"número",s:["nú","me","ro"],n:3,e:"🔢"},
{t:"nombre",s:["nom","bre"],n:3,e:"📛"},{t:"amigo",s:["a","mi","go"],n:3,e:"🤝"},{t:"amiga",s:["a","mi","ga"],n:3,e:"👭"},
{t:"fila",s:["fi","la"],n:3,e:"➡️"},{t:"banco",s:["ban","co"],n:3,e:"🪑"},{t:"cartel",s:["car","tel"],n:3,e:"📋"},
// === NIVEL 4 — Familia y vínculos ===
{t:"hijo",s:["hi","jo"],n:4,e:"👦"},{t:"hija",s:["hi","ja"],n:4,e:"👧"},{t:"abuelo",s:["a","bue","lo"],n:4,e:"👴"},
{t:"abuela",s:["a","bue","la"],n:4,e:"👵"},{t:"hermano",s:["her","ma","no"],n:4,e:"👦"},{t:"hermana",s:["her","ma","na"],n:4,e:"👧"},
{t:"familia",s:["fa","mi","lia"],n:4,e:"👨‍👩‍👦"},{t:"abrazo",s:["a","bra","zo"],n:4,e:"🤗"},{t:"beso",s:["be","so"],n:4,e:"😘"},
{t:"risa",s:["ri","sa"],n:4,e:"😂"},{t:"sonrisa",s:["son","ri","sa"],n:4,e:"😊"},{t:"juego",s:["jue","go"],n:4,e:"🎮"},
{t:"regalo",s:["re","ga","lo"],n:4,e:"🎁"},{t:"fiesta",s:["fies","ta"],n:4,e:"🎉"},{t:"paseo",s:["pa","se","o"],n:4,e:"🚶"},
{t:"visita",s:["vi","si","ta"],n:4,e:"🏠"},{t:"cuento",s:["cuen","to"],n:4,e:"📖"},{t:"música",s:["mú","si","ca"],n:4,e:"🎵"},
{t:"baile",s:["bai","le"],n:4,e:"💃"},{t:"foto",s:["fo","to"],n:4,e:"📸"},{t:"amor",s:["a","mor"],n:4,e:"❤️"},
{t:"ayuda",s:["a","yu","da"],n:4,e:"🤝"},{t:"Lisandro",s:["Li","san","dro"],n:4,e:"⭐"},
// === NIVEL 5 — Comida y vida diaria ===
{t:"helado",s:["he","la","do"],n:5,e:"🍦"},{t:"galleta",s:["ga","lle","ta"],n:5,e:"🍪"},{t:"chocolate",s:["cho","co","la","te"],n:5,e:"🍫"},
{t:"manzana",s:["man","za","na"],n:5,e:"🍎"},{t:"banana",s:["ba","na","na"],n:5,e:"🍌"},{t:"pera",s:["pe","ra"],n:5,e:"🍐"},
{t:"naranja",s:["na","ran","ja"],n:5,e:"🍊"},{t:"uva",s:["u","va"],n:5,e:"🍇"},{t:"tomate",s:["to","ma","te"],n:5,e:"🍅"},
{t:"queso",s:["que","so"],n:5,e:"🧀"},{t:"arroz",s:["a","rroz"],n:5,e:"🍚"},{t:"fideo",s:["fi","de","o"],n:5,e:"🍝"},
{t:"pollo",s:["po","llo"],n:5,e:"🍗"},{t:"carne",s:["car","ne"],n:5,e:"🥩"},{t:"huevo",s:["hue","vo"],n:5,e:"🥚"},
{t:"desayuno",s:["de","sa","yu","no"],n:5,e:"🥞"},{t:"merienda",s:["me","rien","da"],n:5,e:"🧁"},{t:"almuerzo",s:["al","muer","zo"],n:5,e:"🍽️"},
{t:"cena",s:["ce","na"],n:5,e:"🌙"},{t:"cocina",s:["co","ci","na"],n:5,e:"👩‍🍳"},{t:"cuchara",s:["cu","cha","ra"],n:5,e:"🥄"},
{t:"tenedor",s:["te","ne","dor"],n:5,e:"🍴"},{t:"cuchillo",s:["cu","chi","llo"],n:5,e:"🔪"},{t:"botella",s:["bo","te","lla"],n:5,e:"🍶"},
{t:"servilleta",s:["ser","vi","lle","ta"],n:5,e:"🧻"},
// === NIVEL 6 — Ropa y cuerpo ===
{t:"camisa",s:["ca","mi","sa"],n:6,e:"👕"},{t:"remera",s:["re","me","ra"],n:6,e:"👕"},{t:"pantalón",s:["pan","ta","lón"],n:6,e:"👖"},
{t:"short",s:["short"],n:6,e:"🩳"},{t:"zapato",s:["za","pa","to"],n:6,e:"👟"},{t:"media",s:["me","dia"],n:6,e:"🧦"},
{t:"campera",s:["cam","pe","ra"],n:6,e:"🧥"},{t:"gorro",s:["go","rro"],n:6,e:"🧢"},{t:"bufanda",s:["bu","fan","da"],n:6,e:"🧣"},
{t:"bolsillo",s:["bol","si","llo"],n:6,e:"👖"},{t:"pelo",s:["pe","lo"],n:6,e:"💇"},{t:"nariz",s:["na","riz"],n:6,e:"👃"},
{t:"oreja",s:["o","re","ja"],n:6,e:"👂"},{t:"brazo",s:["bra","zo"],n:6,e:"💪"},{t:"pierna",s:["pier","na"],n:6,e:"🦵"},
{t:"rodilla",s:["ro","di","lla"],n:6,e:"🦵"},{t:"barriga",s:["ba","rri","ga"],n:6,e:"😊"},{t:"espalda",s:["es","pal","da"],n:6,e:"🧍"},
{t:"cuello",s:["cue","llo"],n:6,e:"🦒"},{t:"cara",s:["ca","ra"],n:6,e:"😊"},{t:"dientes",s:["dien","tes"],n:6,e:"🦷"},
{t:"lengua",s:["len","gua"],n:6,e:"👅"},{t:"uña",s:["u","ña"],n:6,e:"💅"},
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
// === NIVEL 8 — Avanzado ===
{t:"ventana",s:["ven","ta","na"],n:8,e:"🪟"},{t:"domingo",s:["do","min","go"],n:8,e:"📅"},{t:"campana",s:["cam","pa","na"],n:8,e:"🔔"},
{t:"pirata",s:["pi","ra","ta"],n:8,e:"🏴‍☠️"},{t:"tesoro",s:["te","so","ro"],n:8,e:"💰"},{t:"castillo",s:["cas","ti","llo"],n:8,e:"🏰"},
{t:"payaso",s:["pa","ya","so"],n:8,e:"🤡"},{t:"pelota",s:["pe","lo","ta"],n:8,e:"⚽"},{t:"muñeca",s:["mu","ñe","ca"],n:8,e:"🧸"},
{t:"robot",s:["ro","bot"],n:8,e:"🤖"},{t:"sorpresa",s:["sor","pre","sa"],n:8,e:"🎉"},{t:"corazón",s:["co","ra","zón"],n:8,e:"❤️"},
{t:"bicicleta",s:["bi","ci","cle","ta"],n:8,e:"🚲"},{t:"biblioteca",s:["bi","blio","te","ca"],n:8,e:"📚"}
];
