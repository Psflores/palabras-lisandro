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
