# 📚 Palabras de Lisandro

**App de lectoescritura en español para niños de 5-7 años.**

PWA (Progressive Web App) que enseña a leer y escribir mediante repetición espaciada, con 340 palabras organizadas en 8 niveles progresivos temáticos espaciales.

🚀 **Probala en vivo:** [palabras-de-lisandro.netlify.app](https://palabras-de-lisandro.netlify.app/)

![Estado](https://img.shields.io/badge/estado-activo-brightgreen) ![Licencia](https://img.shields.io/badge/licencia-MIT-blue)

---

## Qué es

Una app pensada para que padres e hijos practiquen lectura y escritura juntos. El niño ve una palabra con su emoji (y a veces una imagen real), escucha la pronunciación, y la escribe letra por letra en el teclado. El sistema adapta la frecuencia de aparición usando repetición espaciada (Half-Life Regression), mostrando más seguido las palabras que cuestan y menos las que ya se dominan.

## Características

**Contenido pedagógico:**
- 340 palabras (300 sustantivos + 40 verbos) distribuidas en 8 niveles de dificultad progresiva (CV → CVC → CCV → CCVC)
- 30 frases para practicar escritura de oraciones completas palabra por palabra
- Sistema de artículos (el/la) que enseña género gramatical español
- Clasificación gramatical en 17 categorías visible para padres
- 32 pares de rimas para mini-juego

**Gamificación:**
- Sistema de combos (x3, x10 🔥, x20 ⚡ MEGA)
- Celebraciones con confetti y frases de aliento argentinas
- Mapa estelar de progreso por niveles
- Racha diaria y estadísticas detalladas

**Accesibilidad visual:**
- Rotación de 5 tipografías (Nunito, Comic Neue, Courier Prime, Indie Flower, Patrick Hand) para gimnasia visual
- Modo mayúsculas, minúsculas o aleatorio
- ~40 imágenes reales de Wikimedia Commons con fallback a emojis
- Sílabas coloreadas como ayuda de decodificación

**Técnico:**
- PWA instalable (funciona offline)
- Pronunciación con Web Speech API (español)
- Repetición espaciada con Half-Life Regression (Settles & Meeder, 2016)
- Compatible con Safari/iOS (fix AudioContext)
- Sin dependencias externas (Vanilla JS)
- Datos guardados en localStorage del navegador

## Cómo usarla

### Opción 1: Online (recomendado)
Entrá a [palabras-de-lisandro.netlify.app](https://palabras-de-lisandro.netlify.app/) desde cualquier navegador. En celular podés "Agregar a pantalla de inicio" para usarla como app nativa.

### Opción 2: Local
```bash
git clone https://github.com/Psflores/palabras-lisandro.git
cd palabras-lisandro
```

Abrí `index.html` directamente en el navegador, o servilo con cualquier servidor local:

```bash
# Con Python
python3 -m http.server 8000

# Con Node.js
npx serve .
```

Después abrí `http://localhost:8000` en el navegador.

## Estructura del proyecto

```
├── index.html      # App principal (HTML + CSS + JS)
├── datos.js        # 340 palabras, 30 frases, artículos, clasificación, imágenes
├── sw.js           # Service Worker (cache network-first)
├── manifest.json   # Manifest PWA
├── favicon.svg     # Ícono
├── icon-192.png    # Ícono PWA 192x192
└── icon-512.png    # Ícono PWA 512x512
```

## Los 8 niveles

| Nivel | Nombre | Descripción |
|-------|--------|-------------|
| 🪐 1 | Planeta Alfa | Palabras familiares cortas |
| 🌍 2 | Planeta Beta | Objetos y lugares cercanos |
| 🔵 3 | Planeta Gamma | Escuela y rutinas |
| ⭐ 4 | Planeta Delta | Familia y vínculos |
| 🟠 5 | Planeta Épsilon | Comida y vida diaria |
| 🩷 6 | Planeta Zeta | Ropa y cuerpo |
| 🟣 7 | Planeta Eta | Naturaleza y mundo |
| 🔴 8 | Planeta Theta | Palabras más largas |

## Panel de padres

La app incluye herramientas para que los padres acompañen el aprendizaje:

- **Clasificación gramatical** visible junto a cada palabra (sustantivo, verbo, animal, persona, etc.)
- **Artículos** (el/la) para enseñar género gramatical
- **Estadísticas** detalladas de progreso, precisión y velocidad
- **Exportar/importar** progreso (backup en JSON)
- **Configuración** de sesión: cantidad de palabras, tiempo, niveles activos, modo visual

## Tecnología

Hecha 100% con HTML, CSS y JavaScript vanilla. Sin frameworks, sin build tools, sin dependencias. Funciona en cualquier navegador moderno.

El algoritmo de repetición espaciada está basado en el paper [Half-Life Regression](https://github.com/duolingo/halflife-regression) de Settles & Meeder (2016), usado en Duolingo.

## Personalización

Podés modificar `datos.js` para agregar tus propias palabras. Cada palabra tiene este formato:

```javascript
{ t: "palabra", s: ["pa", "la", "bra"], n: 3, e: "📝" }
```

- `t`: texto de la palabra
- `s`: array de sílabas separadas
- `n`: nivel (1-8)
- `e`: emoji representativo
- `v`: 1 si es verbo (opcional)
- `ctx`: frase de contexto para verbos (opcional)

## Licencia

MIT — usala, modificala, compartila libremente.

---

Hecho con ❤️ para Lisandro, por su papá Pablo.
