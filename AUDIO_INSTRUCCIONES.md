# APP LISO — Sistema de Audio: Estado Actual e Instrucciones de Mejora

> Última actualización: 22 marzo 2026 — **Migrado a voz Elena Argentina (edge-tts)**
> Archivo: `/Users/psflores/Desktop/APP LISO/Palabras/AUDIO_INSTRUCCIONES.md`

---

## ¿Qué es APP LISO?

PWA (Progressive Web App) de lectoescritura para Lisandro. Funciona desde el navegador, sin instalación. Tiene actividades de palabras, sílabas, dictado y frases. Está deployada en Netlify y también en Vercel.

- Archivo principal: `index.html` (todo-en-uno: HTML + JS + CSS)
- Backup del original antes del patch de audio: `index.html.bak`
- Service worker: `sw.js`

---

## Estado Actual del Sistema de Audio

### Arquitectura (ya implementada)

Toda la reproducción de audio en la app pasa por una única función: `speakWord(text)`.

**Flujo actual:**

```
speakWord(texto)
  ↓
  1. normalizeAudioName(texto)  →  genera nombre de archivo: "mamá" → "mama.mp3"
  ↓
  2. new Audio('audio/' + filename)  →  intenta cargar el MP3 pre-generado
  ↓
  ✅ Si carga en < 800ms  →  reproduce el MP3 (voz Paulina, es_MX)
  ❌ Si error o timeout  →  speakWordFallback(texto)  →  Web Speech API del navegador
```

### Funciones clave en `index.html`

```javascript
// Normaliza texto → nombre de archivo MP3
function normalizeAudioName(text){
  var s = text.toLowerCase();
  var map = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u','ñ':'n'};
  s = s.replace(/[áéíóúüñ]/g, function(c){ return map[c]||c; });
  s = s.replace(/[^a-z0-9]/g, '_').replace(/^_+|_+$/g, '');
  return s + '.mp3';
}

// Función principal de audio
function speakWord(text){
  if(!cfg.sound)return;
  var filename = normalizeAudioName(text);
  var audio = new Audio('audio/' + filename);
  audio.playbackRate = 1.0;
  audio.onerror = function(){ speakWordFallback(text); };
  var played = false;
  audio.oncanplaythrough = function(){
    if(!played){ played=true; audio.play().catch(function(){ speakWordFallback(text); }); }
  };
  setTimeout(function(){
    if(!played){ played=true; speakWordFallback(text); }
  }, 800);
  audio.load();
}

// Fallback: Web Speech API (acento americano/browser, inferior)
function speakWordFallback(text){
  if(!('speechSynthesis' in window))return;
  window.speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 0.55;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  window.speechSynthesis.speak(utterance);
}
```

`speakWord` está exportada globalmente (`window.speakWord = speakWord`) y es llamada desde múltiples lugares en el HTML.

---

## Archivos de Audio Pre-generados

### Carpeta: `/Users/psflores/Desktop/APP LISO/Palabras/audio/`

| Categoría | Cantidad | Ejemplos |
|-----------|----------|---------|
| Palabras  | 340      | `abeja.mp3`, `mama.mp3`, `chocolate.mp3` |
| Sílabas   | 61       | `ma.mp3`, `pa.mp3`, `be.mp3`, `co.mp3` |
| Frases    | 111      | `me_llamo_lisandro.mp3`, `el_gato_duerme.mp3` |
| **Total** | **511**  | + `_mapping.json` |

### Voz usada: Elena (es-AR-ElenaNeural) ✅ ACTUALIZADO 22/03/2026

- Motor: **edge-tts** (Microsoft Azure Neural TTS, 100% gratis, sin cuenta ni API key)
- Voz: `es-AR-ElenaNeural` — español **argentino**, voz neural de alta calidad
- Velocidad: `rate='-15%'` (un poco más lento, ideal para lectoescritura)
- Formato: MP3 directo (sin conversión AIFF)
- **Calidad notablemente superior a la voz Paulina anterior**
- Instalación: `pip3 install edge-tts --break-system-packages`

### Script generador: `/tmp/gen_elena.py`

```python
import asyncio, json, os, edge_tts

AUDIO_DIR = '/Users/psflores/Desktop/APP LISO/Palabras/audio'
VOICE = 'es-AR-ElenaNeural'
RATE = '-15%'

async def gen_one(text, filename):
    out = os.path.join(AUDIO_DIR, filename)
    communicate = edge_tts.Communicate(text, voice=VOICE, rate=RATE)
    await communicate.save(out)

async def main():
    with open(os.path.join(AUDIO_DIR, '_mapping.json'), 'r') as f:
        mapping = json.load(f)
    for text, fname in mapping.items():
        await gen_one(text, fname)

asyncio.run(main())
```

> **Para regenerar** (agregar palabras nuevas o cambiar voz): agregar entradas al `_mapping.json` y volver a correr el script. Solo regenera lo que pises.

### Naming convention (cómo texto → nombre de archivo)

```
"mamá"        → mama.mp3
"me llamo"    → me_llamo.mp3
"¿Qué es?"   → _que_es_.mp3   ← ojo: signos de puntuación se convierten en _
"chocolate"   → chocolate.mp3
"sílaba BA"   → ba.mp3
```

Regla: todo minúsculas → quitar acentos → reemplazar todo no alfanumérico por `_` → trim underscores del inicio/fin → agregar `.mp3`

### Índice: `audio/_mapping.json`

Contiene 511 entradas. Ejemplo:
```json
{
  "mamá": "mama.mp3",
  "abeja": "abeja.mp3",
  "me llamo Lisandro": "me_llamo_lisandro.mp3"
}
```

---

## Categorías de Audio en la App (qué textos se pronuncian)

La app pronuncia audio en estos contextos, todos pasando por `speakWord()`:

1. **Palabras del juego principal** — words del array `PALABRAS` en `datos.js`
2. **Sílabas del dictado** — del array `SILABAS_DICTADO` en `datos.js`
3. **Frases** — del array `FRASES` (frases cortas del tipo "el gato duerme")
4. **Botón 🔊** — cualquier lugar donde el usuario toca el ícono de audio
5. **Auto-reproducción** — se pronuncia automáticamente al mostrar una palabra/sílaba nueva
6. **Dictado** — `speakWord(DIC.word)` cuando empieza un dictado o se repite
7. **Lectura** — `speakWord(sentences[RD.sentenceIdx])` en modo lectura de oraciones

---

## 🆓 Herramientas de Voz Gratuitas (Alternativas a ElevenLabs)

### ⭐ RECOMENDADO: edge-tts (Microsoft Edge Neural TTS — 100% gratis)

La mejor opción gratuita disponible hoy. Usa el motor de voz neural de Microsoft Edge sin necesidad de cuenta ni API key. Calidad notablemente superior a `say` de macOS.

**Instalación:**
```bash
pip3 install edge-tts
```

**Uso desde terminal (una sola voz):**
```bash
edge-tts --voice es-AR-ElenaNeural --text "chocolate" --write-media chocolate.mp3
```

**Uso desde Python (para batch de 511 archivos):**
```python
import asyncio
import edge_tts

async def gen(text, output_path):
    communicate = edge_tts.Communicate(text, voice="es-AR-ElenaNeural", rate="-10%")
    await communicate.save(output_path)

asyncio.run(gen("mamá", "audio/mama.mp3"))
```

**Voces en español disponibles (las mejores):**

| Voz | Variante | Acento | Nota |
|-----|----------|--------|------|
| `es-AR-ElenaNeural` | es-AR | 🇦🇷 **Argentina** | ← ideal para Lisandro |
| `es-AR-TomasNeural` | es-AR | 🇦🇷 Argentina (masculino) | |
| `es-MX-DaliaNeural` | es-MX | 🇲🇽 Mexicana (femenina) | muy natural |
| `es-MX-JorgeNeural` | es-MX | 🇲🇽 Mexicano (masculino) | |
| `es-ES-ElviraNeural` | es-ES | 🇪🇸 España | |

> Para una app de niños argentinos, `es-AR-ElenaNeural` es la elección más natural.

**Para reemplazar Paulina por Elena en todo el proyecto:**  
Modificar `gen_paulina.py` para usar `edge-tts` en lugar de `say -v Paulina`. El resto del sistema (naming, speakWord, etc.) no cambia.

---

### ElevenLabs (gratis con límite)

- Plan gratuito: **10.000 caracteres/mes**
- Para 511 audios cortos alcanza, pero se agota rápido si se regenera seguido
- La app ya tuvo problemas con ElevenLabs: el plan gratuito no permite acceder a voces compartidas en español
- Requiere cuenta en https://elevenlabs.io
- API key en header: `xi-api-key: TU_KEY`
- En la sesión anterior se usó `voice_id = EXAVITQu4vr4xnSDxMaL` (Sarah, inglés) — **no usar para español**
- Para español nativo buscar en Voice Library voces con `es` como idioma

---

### Google Cloud TTS (gratis hasta cierto límite)

- **WaveNet / Neural2**: 1 millón de caracteres gratis por mes (luego $4/millón)
- Tiene `es-419-Neural2-C` (español latinoamericano) y `es-AR-*` (argentino)
- Requiere cuenta Google Cloud + habilitar la API + API key
- Más complejo de configurar que edge-tts pero calidad similar

---

### Coqui TTS (open source, sin límites, corre local)

- Motor de TTS 100% local, sin internet ni cuentas
- Tiene modelos en español: `tts_models/es/css10/vits`
- Se instala con `pip install TTS` pero requiere ~2GB de espacio y es lento en CPU
- Ideal si se quiere total independencia del cloud
- Documentación: https://github.com/coqui-ai/TTS

---

## 🆕 MEJORA PENDIENTE: Dictado con Sonido Fonético + Sonido Común

### ¿Qué se quiere lograr?

Actualmente el dictado solo reproduce el sonido completo de la sílaba o letra: `speakWord("ba")` → dice *"ba"*.

La mejora propuesta es que para el **dictado** se escuchen **dos sonidos en secuencia**:
1. **Sonido fonético** — el sonido que hace la letra por sí sola (el fonema): *"b..."*
2. **Sonido común** — la sílaba o palabra completa: *"ba"*

Esto sigue el **método fónico** usado en lectoescritura: primero se identifica el fonema del consonante, luego se une con la vocal para formar la sílaba.

**Ejemplo para nivel 3 (sílabas):**
- Dictado muestra: **BA**
- Audio: primero reproduce *"b"* (sonido del fonema), luego *"ba"* (sílaba completa)
- Ayuda al niño a analizar los componentes sonoros antes de escribir

**Ejemplo para nivel 2 (consonantes):**
- Dictado muestra: **M**
- Audio: reproduce *"mmm"* (el fonema, no el nombre de la letra), luego *"m"* (nombre)

---

### Implementación sugerida

#### Paso 1: Crear carpeta de fonemas

```
audio/fonetico/
  b_fonetico.mp3    ← sonido del fonema /b/
  c_fonetico.mp3    ← sonido del fonema /k/
  d_fonetico.mp3
  f_fonetico.mp3
  g_fonetico.mp3
  j_fonetico.mp3
  l_fonetico.mp3
  ll_fonetico.mp3
  m_fonetico.mp3
  n_fonetico.mp3
  p_fonetico.mp3
  r_fonetico.mp3
  rr_fonetico.mp3
  s_fonetico.mp3
  t_fonetico.mp3
  v_fonetico.mp3
  x_fonetico.mp3
  y_fonetico.mp3
  z_fonetico.mp3
  ch_fonetico.mp3
  ñ_fonetico.mp3
  qu_fonetico.mp3
```

Para generar con edge-tts (Elena argentina), el fonema se puede lograr generando la letra sola a velocidad muy lenta:
```python
edge-tts --voice es-AR-ElenaNeural --rate "-30%" --text "b" --write-media audio/fonetico/b_fonetico.mp3
```
> Nota: para fonemas puros (sin vocal), puede ser mejor grabar manualmente o usar un fonema textual como "bh" o ajustar con ffmpeg para cortar el audio.

#### Paso 2: Mapear sílaba → consonante inicial

En `index.html`, agregar un mapeo de sílaba a su consonante (para extraer el fonema):

```javascript
var FONEMA_MAP = {
  'ba':'b','be':'b','bi':'b','bo':'b','bu':'b',
  'ma':'m','me':'m','mi':'m','mo':'m','mu':'m',
  'pa':'p','pe':'p','pi':'p','po':'p','pu':'p',
  'sa':'s','se':'s','si':'s','so':'s','su':'s',
  'ta':'t','te':'t','ti':'t','to':'t','tu':'t',
  // ... completar para todas las sílabas en SILABAS_DICTADO
};
```

#### Paso 3: Nueva función `speakDictadoFonetico(word)`

Agregar en `index.html`, cerca de `speakWord`:

```javascript
function speakDictadoFonetico(word){
  if(!cfg.sound) return;
  var w = word.toLowerCase();
  var fonema = FONEMA_MAP[w] || null;

  if(fonema){
    // 1. Reproducir fonema
    var f = new Audio('audio/fonetico/' + fonema + '_fonetico.mp3');
    f.onerror = function(){ speakWord(word); }; // si no hay fonema, ir directo al completo
    f.oncanplaythrough = function(){
      f.play().then(function(){
        // 2. Cuando termina el fonema, reproducir la sílaba completa
        f.onended = function(){
          setTimeout(function(){ speakWord(word); }, 300);
        };
      }).catch(function(){ speakWord(word); });
    };
    setTimeout(function(){
      // timeout de seguridad
      speakWord(word);
    }, 2000);
    f.load();
  } else {
    // Sin fonema disponible → reproducir normal
    speakWord(word);
  }
}
```

#### Paso 4: Modificar el dictado para usar la nueva función

En `renderDictadoWord()` y `dictStartWrite()`, cambiar las líneas de `speakWord` así:

```javascript
// ANTES (líneas ~1916 y ~1966 en index.html):
setTimeout(function(){ speakWord(DIC.word); }, 400);

// DESPUÉS (solo para niveles 2 y 3, que son letras y sílabas):
setTimeout(function(){
  if(DIC.level <= 3){
    speakDictadoFonetico(DIC.word);
  } else {
    speakWord(DIC.word);
  }
}, 400);
```

El botón 🔊 puede quedar con `speakWord` para que el usuario pueda escuchar solo el sonido completo cuando quiera.

---

### Archivos a tocar para esta mejora

```
index.html          ← agregar FONEMA_MAP + speakDictadoFonetico() + modificar renderDictadoWord() y dictStartWrite()
audio/fonetico/     ← carpeta nueva con ~22 MP3 de fonemas
```

---

## Voces Alternativas de macOS (si quieres cambiar sin instalar nada)

Si Paulina no convence y no querés instalar edge-tts:

| Voz | Variante | Acento |
|-----|----------|--------|
| `Paulina` | es_MX | Mexicano (actual) |
| `Sandy` | es_MX | Mexicano |
| `Flo` | es_MX | Mexicano |
| `Shelley` | es_MX | Mexicano |
| `Mónica` | es_ES | Español de España |
| `Jorge` | es_ES | Español de España (masculino) |

Para generar con otra voz: cambiar `'Paulina'` por el nombre en `gen_paulina.py` y volver a correr el script.

---

## Deploy

La app está en Netlify. Para actualizar:

1. Los archivos principales son `index.html` + carpeta `audio/`
2. En Cowork hay un MCP de Netlify disponible: `mcp__1dd547e8...netlify-deploy-services-updater`
3. También hay ZIPs de deploy históricos en la carpeta: `deploy-*.zip`

**Pendiente al momento de escribir este archivo:** Deploy aún no realizado. Pablo estaba escuchando las muestras de Paulina antes de aprobar el deploy.

---

## Posibles Mejoras Futuras

- [x] **Cambiar voz a Elena Argentina** (`edge-tts`, `es-AR-ElenaNeural`) — ✅ COMPLETADO 22/03/2026
- [ ] **Dictado fonético** — implementar `speakDictadoFonetico()` (ver sección arriba)
- [ ] Ajustar velocidad de reproducción (`audio.playbackRate`) — actualmente `1.0`, puede bajar a `0.85`
- [ ] Reducir timeout de fallback de 800ms → 500ms
- [ ] Agregar audio para `numeros.html` (página de números — sin audio MP3 actualmente)
- [ ] Sonidos de refuerzo: "¡Muy bien!", "¡Bravo!" con voz de Paulina/Elena
- [x] **Verificar caché de audio offline** — ✅ COMPLETADO 22/03/2026 — sw.js ahora usa cache-first para `/audio/` (palabras-audio-v2)

---

## Archivos Importantes

```
/Users/psflores/Desktop/APP LISO/Palabras/
├── index.html                  ← app principal (PATCHED con sistema de audio MP3)
├── index.html.bak              ← backup pre-patch (Web Speech API puro)
├── AUDIO_INSTRUCCIONES.md      ← este archivo
├── datos.js                    ← PALABRAS, SILABAS_DICTADO arrays
├── datos_lectura.js            ← frases de lectura
├── audio/
│   ├── _mapping.json           ← índice texto→archivo (511 entradas)
│   ├── abeja.mp3               ← palabras (340)
│   ├── ma.mp3                  ← sílabas (61)
│   ├── me_llamo_lisandro.mp3   ← frases (111)
│   └── fonetico/               ← (NO EXISTE AÚN) fonemas para dictado
└── sw.js                       ← service worker

/Users/psflores/ep03_work/
└── gen_paulina.py              ← script para regenerar/agregar audios con Paulina
```
