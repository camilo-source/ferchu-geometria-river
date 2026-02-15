/**
 * ═══════════════════════════════════════════════════════════
 * 🏟️ SEASON MANAGER — "La Temporada de Ferchu"
 * Sistema de progresión por jornadas + timer de sesión
 * 1 jornada/día · 2 turnos de 20 min · Examen tras 10 jornadas
 * ═══════════════════════════════════════════════════════════
 */

// ═══ DEFINICIÓN DE LA TEMPORADA ═══
const SEASON = [
    {
        jornada: 1,
        nombre: "Pretemporada — Día 1",
        etapa: "pretemporada",
        tema: "triangulos",
        concepto: "angulos-basicos",
        narrativa: {
            intro: "Bienvenido a las inferiores de River. Hoy arrancamos con lo básico: los ángulos.",
            motivacion: "Todo crack empezó desde abajo. Hoy aprendemos la base de la geometría.",
            cierre_bueno: "¡Gran primer entrenamiento! El DT te tiene en el radar.",
            cierre_malo: "Tranqui, fue el primer día. ¡Mañana volvemos más fuertes!"
        },
        dificultad: [1, 1, 2]
    },
    {
        jornada: 2,
        nombre: "Pretemporada — Día 2",
        etapa: "pretemporada",
        tema: "triangulos",
        concepto: "triangulos-clasificacion",
        narrativa: {
            intro: "Segundo día de pretemporada. Hoy nos metemos con los triángulos.",
            motivacion: "Los triángulos están en todas partes: en la cancha, en las jugadas, en la defensa.",
            cierre_bueno: "¡Enorme! Ya clasificás triángulos como un geómetra profesional.",
            cierre_malo: "Los triángulos pueden ser complicados al principio, ¡pero la vas a sacar!"
        },
        dificultad: [1, 1, 2]
    },
    {
        jornada: 3,
        nombre: "Pretemporada — Día 3",
        etapa: "pretemporada",
        tema: "potenciacion",
        concepto: "potencia-multiplicacion",
        narrativa: {
            intro: "Tercer día de pretemporada. Hoy arrancamos con las potencias.",
            motivacion: "Las potencias son como los pases: hay que dominarlas para jugar bien.",
            cierre_bueno: "¡Enorme! Ya manejás la multiplicación de potencias como un pro.",
            cierre_malo: "Las potencias son duras al principio, pero vas a agarrarles la mano."
        },
        dificultad: [1, 1, 2]
    },
    {
        jornada: 4,
        nombre: "Liga — Fecha 1",
        etapa: "liga",
        tema: "potenciacion",
        concepto: "liga-fecha-1", // Concepto combinado
        narrativa: {
            intro: "¡Arranca la Liga! Fecha 1. Desafío doble: Detectives y Letras.",
            motivacion: "Primero encontrá el exponente perdido. Después, demostrá que jugar con letras es lo mismo que con números.",
            cierre_bueno: "¡Excelente debut! Encontraste lo que faltaba y dominaste el álgebra.",
            cierre_malo: "¡Buen intento! Las letras y los incógnitas son difíciles, pero con práctica salen."
        },
        dificultad: [1, 2, 2]
    },
    {
        jornada: 5,
        nombre: "Liga — Fecha 2",
        etapa: "liga",
        tema: "potenciacion",
        concepto: "potencia-extrema",
        narrativa: {
            intro: "¡Fecha 2 de la Liga! Hoy enfrentamos los ejercicios MÁS DIFÍCILES de potencias.",
            motivacion: "Corchetes, llaves, bases negativas y ecuaciones monstruosas. ¡Es hora de demostrar todo lo que sabés!",
            cierre_bueno: "¡IMPRESIONANTE! Resolviste los ejercicios más difíciles de potencias. ¡Sos un crack absoluto!",
            cierre_malo: "¡Estos son los más difíciles que hay! Que hayas intentado es de valientes. ¡Vamos de vuelta!"
        },
        dificultad: [3, 3, 3]
    },
    {
        jornada: 6,
        nombre: "Liga — Fecha 3",
        etapa: "liga",
        tema: "radicacion",
        concepto: "raiz-cuadrada-basica",
        narrativa: {
            intro: "¡Fecha 3! Hoy arrancamos con RADICACIÓN. ¿Sabés qué es una raíz cuadrada?",
            motivacion: "La raíz es la operación INVERSA de la potencia. Si 5² = 25, entonces √25 = 5. ¡Como deshacer un pase!",
            cierre_bueno: "¡Crack! Ya dominás las raíces cuadradas. El DT está impresionado.",
            cierre_malo: "¡Las raíces son nuevas! Con práctica las vas a dominar. ¡Vamos de vuelta!"
        },
        dificultad: [1, 1, 2]
    },
    {
        jornada: 7,
        nombre: "Liga — Fecha 4",
        etapa: "liga",
        tema: "radicacion",
        concepto: "raiz-superior-e-inversa",
        narrativa: {
            intro: "Fecha 4. Hoy subimos el nivel: raíces cúbicas, de cuarto orden, y operaciones inversas.",
            motivacion: "Si dominás la raíz cuadrada, la cúbica es lo mismo pero con 3. ¡Vos podés!",
            cierre_bueno: "¡Impresionante! Raíces de cualquier índice, las resolvés como un crack.",
            cierre_malo: "¡Las raíces superiores son difíciles! Pero cada intento te hace más fuerte."
        },
        dificultad: [1, 2, 2]
    },
    {
        jornada: 8,
        nombre: "Copa Interna",
        etapa: "copa",
        tema: "radicacion",
        concepto: "raiz-boss",
        narrativa: {
            intro: "¡COPA INTERNA! Todo lo de raíces combinado: exactas e inversas de todos los índices.",
            motivacion: "En la copa se juega con todo. ¡Demostrá que dominás las raíces!",
            cierre_bueno: "¡PASAMOS DE RONDA! Las raíces ya son tuyas.",
            cierre_malo: "¡Llegaste a la Copa! Eso ya es un logro. Seguí practicando."
        },
        dificultad: [2, 3, 3]
    },
    {
        jornada: 9,
        nombre: "Liga — Fecha 5",
        etapa: "liga",
        tema: "triangulos",
        concepto: "angulos-complementarios",
        narrativa: {
            intro: "Fecha 5 de la Liga. Complementarios y suplementarios.",
            motivacion: "Un jugador de River domina la cancha. ¡Y los ángulos dominan las jugadas!",
            cierre_bueno: "¡Victoria! El equipo confía en vos.",
            cierre_malo: "¡Buen intento! Practicá un poco más y la próxima la rompés."
        },
        dificultad: [1, 2, 2]
    },
    {
        jornada: 10,
        nombre: "Liga — Fecha 6",
        etapa: "liga",
        tema: "potenciacion",
        concepto: "potencia-combinados",
        narrativa: {
            intro: "Fecha 6. Combinamos todas las propiedades de potencias.",
            motivacion: "Un crack no domina una sola cosa. Domina todo y lo combina.",
            cierre_bueno: "¡Impecable! Sos el goleador de la Liga.",
            cierre_malo: "¡Las combinaciones son re difíciles! Que hayas llegado hasta acá es un logro enorme."
        },
        dificultad: [2, 3, 3]
    },
    {
        jornada: 11,
        nombre: "Liga — Fecha 7",
        etapa: "liga",
        tema: "triangulos",
        concepto: "paralelas-transversal",
        narrativa: {
            intro: "Fecha 7 de la Liga. Paralelas cortadas por transversal.",
            motivacion: "Las paralelas son como las líneas del campo. ¡Dominá los ángulos que se forman!",
            cierre_bueno: "¡Goleada! Estamos liderando la tabla.",
            cierre_malo: "¡Seguís aprendiendo! Cada ejercicio te hace mejor. Vamos de vuelta."
        },
        dificultad: [2, 3, 3]
    },
    {
        jornada: 12,
        nombre: "Semifinal",
        etapa: "semifinal",
        tema: "potenciacion",
        concepto: "potencia-boss",
        narrativa: {
            intro: "¡SEMIFINAL! Todo River confía en vos. Potencias nivel BOSS.",
            motivacion: "Mirá a tu alrededor: El Monumental está lleno. Es por River. Es por vos.",
            cierre_bueno: "¡CLASIFICADOS A LA FINAL! ¡VAMOS RIVER! 🔴⚪",
            cierre_malo: "¡Llegaste a la Semifinal! Eso ya es un logro enorme. Practicá y volvé más fuerte."
        },
        dificultad: [3, 3, 3]
    },
    {
        jornada: 13,
        nombre: "Semifinal — Vuelta",
        etapa: "semifinal",
        tema: "radicacion",
        concepto: "raiz-boss",
        narrativa: {
            intro: "Vuelta de la semi. Es todo o nada. Repaso total de raíces.",
            motivacion: "Las semifinales son para los valientes. ¡Dale con todo!",
            cierre_bueno: "¡ESTAMOS EN LA FINAAAAL! 🏟️",
            cierre_malo: "¡Tremendo esfuerzo! Estuviste cerca. Un repaso más y la próxima la sacás."
        },
        dificultad: [3, 3, 3]
    },
    {
        jornada: 14,
        nombre: "⭐ FINAL — Copa Libertadores ⭐",
        etapa: "final",
        tema: "mixto",
        concepto: "repaso-general",
        narrativa: {
            intro: "🏆 ES LA FINAL DE LA LIBERTADORES. El Monumental está lleno. 80.000 hinchas esperan.",
            motivacion: "Todo lo que entrenaste fue para este momento. ¡DALE FERCHU, DALE RIVER!",
            cierre_bueno: "🏆🏆🏆 ¡¡¡CAMPEÓN DE LA LIBERTADORES!!! ¡¡¡FERCHU CAMPEÓN!!!",
            cierre_malo: "¡Llegaste a la FINAL de la Libertadores! Eso es increíble. ¡Sos un crack, Ferchu!"
        },
        dificultad: [3, 3, 3]
    }
];

// ═══ ENSEÑANZAS DEL PULPO POR CONCEPTO ═══
const CONCEPT_TEACHINGS = {
    "angulos-basicos": {
        titulo: "📐 ¿Qué son los ÁNGULOS?",
        pasos: [
            { texto: "Un ángulo es la abertura entre dos líneas que se juntan en un punto.", emoji: "📐" },
            { texto: "Se mide en GRADOS (°). Un ángulo recto tiene 90°.", emoji: "📏" },
            { texto: "Agudo = menos de 90° · Obtuso = más de 90° · Llano = 180°", emoji: "🔍" },
            { texto: "¡Los ángulos están en todas partes! En la cancha, en el arco, en los pases ⚽", emoji: "💡" }
        ],
        regla: "AGUDO < 90° | RECTO = 90° | OBTUSO > 90° | LLANO = 180°",
        ejemplo: "Un ángulo de 45° es AGUDO porque es menor que 90°"
    },
    "potencia-multiplicacion": {
        titulo: "✖️ Multiplicación de Potencias",
        pasos: [
            { texto: "Cuando multiplicás potencias con la MISMA BASE, se SUMAN los exponentes.", emoji: "✖️" },
            { texto: "Ejemplo: 3² × 3⁴ = 3²⁺⁴ = 3⁶", emoji: "📝" },
            { texto: "¡La base NO cambia! Solo sumás los numeritos de arriba.", emoji: "⚠️" },
            { texto: "Pensalo como goles: si hacés 2 goles en un partido y 4 en otro, en total hiciste 6.", emoji: "⚽" }
        ],
        regla: "aⁿ × aᵐ = aⁿ⁺ᵐ (misma base → se SUMAN los exponentes)",
        ejemplo: "5³ × 5² = 5³⁺² = 5⁵ = 3125"
    },
    "potencia-division": {
        titulo: "➗ División de Potencias",
        pasos: [
            { texto: "Cuando dividís potencias con la MISMA BASE, se RESTAN los exponentes.", emoji: "➗" },
            { texto: "Ejemplo: 7⁵ ÷ 7² = 7⁵⁻² = 7³", emoji: "📝" },
            { texto: "¡Ojo! El exponente de arriba MENOS el de abajo.", emoji: "⚠️" },
            { texto: "Como en un partido: si tenés 5 jugadores y salen 2, te quedan 3.", emoji: "⚽" }
        ],
        regla: "aⁿ ÷ aᵐ = aⁿ⁻ᵐ (misma base → se RESTAN los exponentes)",
        ejemplo: "10⁶ ÷ 10⁴ = 10⁶⁻⁴ = 10² = 100"
    },
    "potencia-de-potencia": {
        titulo: "💥 Potencia de Potencia",
        pasos: [
            { texto: "Cuando elevás una potencia A OTRA potencia, se MULTIPLICAN los exponentes.", emoji: "💥" },
            { texto: "Ejemplo: (2³)⁴ = 2³ˣ⁴ = 2¹²", emoji: "📝" },
            { texto: "¡Se multiplican, no se suman! Es la potencia MÁS fuerte.", emoji: "⚠️" },
            { texto: "Pensá que es una jugada doble: multiplicás el efecto.", emoji: "⚽" }
        ],
        regla: "(aⁿ)ᵐ = aⁿˣᵐ (se MULTIPLICAN los exponentes)",
        ejemplo: "(3²)³ = 3²ˣ³ = 3⁶ = 729"
    },
    "triangulos-clasificacion": {
        titulo: "📐 Tipos de Triángulos",
        pasos: [
            { texto: "Los triángulos se clasifican por sus LADOS y por sus ÁNGULOS.", emoji: "📐" },
            { texto: "Por LADOS: Equilátero (3 iguales) · Isósceles (2 iguales) · Escaleno (todos distintos)", emoji: "📏" },
            { texto: "Por ÁNGULOS: Acutángulo (todos < 90°) · Rectángulo (1 = 90°) · Obtusángulo (1 > 90°)", emoji: "🔍" },
            { texto: "CLAVE: Los 3 ángulos de un triángulo SIEMPRE suman 180°", emoji: "💡" }
        ],
        regla: "Ángulos del triángulo: α + β + γ = 180°",
        ejemplo: "Si dos ángulos son 60° y 70°, el tercero es 180° - 60° - 70° = 50°"
    },
    "angulos-complementarios": {
        titulo: "🔗 Complementarios y Suplementarios",
        pasos: [
            { texto: "Dos ángulos son COMPLEMENTARIOS cuando suman 90°.", emoji: "🔗" },
            { texto: "Dos ángulos son SUPLEMENTARIOS cuando suman 180°.", emoji: "🔗" },
            { texto: "Complementario de 30° = 60° (porque 30 + 60 = 90)", emoji: "📝" },
            { texto: "Suplementario de 120° = 60° (porque 120 + 60 = 180)", emoji: "📝" }
        ],
        regla: "COMPLEMENTARIOS → suman 90° | SUPLEMENTARIOS → suman 180°",
        ejemplo: "El complementario de 35° es 55° · El suplementario de 110° es 70°"
    },
    "potencia-combinados": {
        titulo: "🔥 Combinando Propiedades de Potencias",
        pasos: [
            { texto: "Ahora combinamos TODO: multiplicación, división y potencia de potencia.", emoji: "🔥" },
            { texto: "Regla 1: aⁿ × aᵐ = aⁿ⁺ᵐ (multiplicar → sumar exponentes)", emoji: "✖️" },
            { texto: "Regla 2: aⁿ ÷ aᵐ = aⁿ⁻ᵐ (dividir → restar exponentes)", emoji: "➗" },
            { texto: "Regla 3: (aⁿ)ᵐ = aⁿˣᵐ (potencia de potencia → multiplicar exponentes)", emoji: "💥" },
            { texto: "ORDEN: Primero resolvé las potencias de potencia, después multiplicación/división.", emoji: "⚠️" }
        ],
        regla: "Orden: (aⁿ)ᵐ primero → luego × y ÷ de potencias",
        ejemplo: "(2³)² × 2⁴ ÷ 2² = 2⁶ × 2⁴ ÷ 2² = 2⁶⁺⁴⁻² = 2⁸"
    },
    "paralelas-transversal": {
        titulo: "═ Paralelas cortadas por Transversal",
        pasos: [
            { texto: "Cuando una recta (transversal) corta a dos paralelas, se forman 8 ángulos.", emoji: "═" },
            { texto: "Ángulos CORRESPONDIENTES son iguales (misma posición en cada cruce).", emoji: "📝" },
            { texto: "Ángulos ALTERNOS INTERNOS son iguales (lados opuestos, entre las paralelas).", emoji: "📝" },
            { texto: "Ángulos COINTERIORES suman 180° (mismo lado, entre las paralelas).", emoji: "⚠️" }
        ],
        regla: "Correspondientes = iguales | Alternos internos = iguales | Cointeriores = 180°",
        ejemplo: "Si un ángulo es 70°, su correspondiente es 70° y su coincidior es 110°"
    },
    "potencia-boss": {
        titulo: "👑 BOSS MODE — Todo Combinado",
        pasos: [
            { texto: "Llegaste al nivel más difícil. Acá se combinan TODAS las propiedades.", emoji: "👑" },
            { texto: "Primero identificá la base de cada potencia.", emoji: "🔍" },
            { texto: "Aplicá las reglas en orden: potencia de potencia → luego × y ÷.", emoji: "📝" },
            { texto: "Un paso a la vez. Hasta Messi la piensa antes de patear.", emoji: "⚽" }
        ],
        regla: "Identificar bases → Aplicar (aⁿ)ᵐ → Luego × y ÷ → Simplificar",
        ejemplo: "(5² × 5³)² ÷ 5⁴ = (5⁵)² ÷ 5⁴ = 5¹⁰ ÷ 5⁴ = 5⁶"
    },
    "potencia-extrema": {
        titulo: "💀 NIVEL EXTREMO — Corchetes, Bases Negativas y Ecuaciones",
        pasos: [
            { texto: "Hoy enfrentamos lo más difícil: ejercicios con {corchetes [paréntesis (anidados)]}.", emoji: "🔒" },
            { texto: "REGLA DE ORO: Siempre resolvé de ADENTRO hacia AFUERA. Primero (), después [], después {}.", emoji: "⚠️" },
            { texto: "BASES NEGATIVAS: (-base)ᵖᵃʳ = POSITIVO | (-base)ⁱᵐᵖᵃʳ = NEGATIVO. ¡Ojo con el signo!", emoji: "⚡" },
            { texto: "ECUACIONES: Si te piden el exponente faltante, armá la ecuación con las propiedades y despejá.", emoji: "🧮" },
            { texto: "¡Vos podés! Estos ejercicios son nivel examen. Si los resolvés, sos un MONSTRUO.", emoji: "💀" }
        ],
        regla: "Adentro→Afuera | (-b)ᵖᵃʳ=+ | (-b)ⁱᵐᵖᵃʳ=- | Ecuación de exponentes: despejá n",
        ejemplo: "{[(y⁸:y³)²]·y⁹}:y⁷ → y⁵→y¹⁰→y¹⁹→y¹² | (-3)⁴=81 | (x·x)²⁰:(xⁿ)⁸=1 → n=5"
    },
    "raiz-cuadrada-basica": {
        titulo: "√ ¿Qué es una RAÍZ CUADRADA?",
        pasos: [
            { texto: "La raíz es la operación INVERSA de la potencia. ¡Deshace lo que hizo la potencia!", emoji: "√" },
            { texto: "Si 5² = 25, entonces √25 = 5. La raíz 'pregunta': ¿qué número al cuadrado da 25?", emoji: "🤔" },
            { texto: "√9 = 3 porque 3² = 9. √49 = 7 porque 7² = 49.", emoji: "📝" },
            { texto: "Pensalo como un gol: si sabés que 3 pases hicieron el gol, la raíz te dice quién los dio ⚽", emoji: "💡" }
        ],
        regla: "√n = x cuando x² = n (¿qué número al cuadrado da n?)",
        ejemplo: "√121 = 11 porque 11 × 11 = 121"
    },
    "raiz-superior-e-inversa": {
        titulo: "∛ Raíces Cúbicas y Superiores",
        pasos: [
            { texto: "La raíz CÚBICA (∛) pregunta: ¿qué número al CUBO da esto?", emoji: "∛" },
            { texto: "∛125 = 5 porque 5³ = 5×5×5 = 125", emoji: "📝" },
            { texto: "También hay raíz de CUARTO (⁴√), de QUINTO (⁵√), etc. Siempre es la inversa de la potencia.", emoji: "🔢" },
            { texto: "⁵√32 = 2 porque 2⁵ = 2×2×2×2×2 = 32. ¡El índice te dice qué potencia deshacés!", emoji: "⚡" }
        ],
        regla: "ⁿ√a = x cuando xⁿ = a (el índice dice qué potencia invertimos)",
        ejemplo: "∛27 = 3 porque 3³ = 27 | ⁴√625 = 5 porque 5⁴ = 625"
    },
    "raiz-boss": {
        titulo: "💀 BOSS MODE — Raíces Combinadas",
        pasos: [
            { texto: "Llegaste al nivel más difícil de raíces. ¡Acá se mezcla todo!", emoji: "💀" },
            { texto: "Raíces cuadradas, cúbicas, de cuarto y quinto orden.", emoji: "🔢" },
            { texto: "Operaciones inversas: si te dan a³ = 343, vos calculás ∛343.", emoji: "🔍" },
            { texto: "Todos los índices mezclados. ¡Todo junto! ¡Vos podés! ⚽", emoji: "🏆" }
        ],
        regla: "Raíces exactas + inversas de todos los índices = BOSS COMPLETO",
        ejemplo: "√225 = 15 | ∛216 = 6 | ⁴√81 = 3"
    },
    "repaso-general": {
        titulo: "🏆 REPASO FINAL — Todo lo que aprendiste",
        pasos: [
            { texto: "Es la final. Repasemos TODO lo que aprendiste en esta temporada.", emoji: "🏆" },
            { texto: "ÁNGULOS: agudo < 90°, recto = 90°, obtuso > 90°. Complementarios = 90°, Suplementarios = 180°.", emoji: "📐" },
            { texto: "TRIÁNGULOS: 3 ángulos suman 180°. Equilátero, Isósceles, Escaleno.", emoji: "📐" },
            { texto: "POTENCIAS: × → sumar exp. | ÷ → restar exp. | (aⁿ)ᵐ → multiplicar exp.", emoji: "🔢" },
            { texto: "RAÍCES: √ invierte la potencia. √25=5 | ∛27=3 | De cualquier índice.", emoji: "√" },
            { texto: "¡Estás listo! Demostrá todo lo que sabés. ¡VAMOS FERCHU!", emoji: "🔴⚪" }
        ],
        regla: "Todo lo aprendido en la temporada: ángulos + potencias + raíces",
        ejemplo: "¡SOS UN CRACK! Aplicá todo lo que el Pulpo te enseñó."
    },
    "potencia-algebraica": {
        titulo: "🕵️‍♂️ Álgebra Nuñeza (Letras)",
        pasos: [
            { texto: "A veces la base no es un número, ¡es una LETRA! (x, y, a).", emoji: "🕵️‍♂️" },
            { texto: "Las reglas son LAS MISMAS: x² · x³ = x⁵ (sumás 2+3).", emoji: "📝" },
            { texto: "Si ves una letra sola como 'a', recordá que es 'a¹'.", emoji: "⚠️" },
            { texto: "¡No te asustes! Es lo mismo, solo que más pro.", emoji: "🧬" }
        ],
        regla: "Las letras se operan igual que los números. xⁿ · xᵐ = xⁿ⁺ᵐ",
        ejemplo: "m⁴ : m² = m²"
    },
    "liga-fecha-1": {
        titulo: "🕵️‍♂️ Misión: El Exponente Perdido",
        pasos: [
            { texto: "Vamos por partes. Primero: ENCONTRAR.", emoji: "🔍" },
            { texto: "Mirá esta jugada: 5² · 5ⁿ = 5⁵. ¿Qué número falta?", emoji: "🤔" },
            { texto: "¡Facil! Como es multiplicación, sumamos. 2 + ? = 5. ¡El exponente es 3!", emoji: "✅" },
            { texto: "LISTO. Ahora, lo mismo pero con letras. x² · x³ = x⁵. ¡Es igual de fácil!", emoji: "🧬" }
        ],
        regla: "Sumá o restá para encontrar el que falta. ¡Las letras juegan igual que los números!",
        ejemplo: "Si xⁿ · x² = x⁵, entonces n = 3"
    }
};

export class SeasonManager {
    constructor() {
        this.storageKey = 'ferchu_season_v1';
        // Always start fresh — no persistence for now
        localStorage.removeItem(this.storageKey);
        this.data = this.load();
    }

    // ═══ PERSISTENCIA ═══
    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) return JSON.parse(saved);
        } catch (e) { /* fresh start */ }

        return {
            currentJornada: 5, // 🔓 START AT JORNADA 5 FOR TESTING
            lastPlayedDate: null,
            matchResults: [], // { jornada, score, total, date, turnosCompleted }
            totalCorrect: 0,
            totalAnswered: 0,
            seasonCompleted: false,
            examTaken: false,
            examScore: null
        };
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (e) { /* silently fail */ }
    }

    // ═══ JORNADA ACTUAL ═══
    getCurrentMatch() {
        const jornada = this.data.currentJornada;
        if (jornada > SEASON.length) return null; // Season complete
        return SEASON[jornada - 1];
    }

    getSeasonData() {
        return SEASON;
    }

    getProgress() {
        return {
            currentJornada: this.data.currentJornada,
            totalJornadas: SEASON.length,
            matchResults: this.data.matchResults,
            promedio: this.data.totalAnswered > 0
                ? Math.round((this.data.totalCorrect / this.data.totalAnswered) * 100)
                : 0,
            seasonCompleted: this.data.seasonCompleted || this.data.currentJornada > SEASON.length,
            examTaken: this.data.examTaken,
            examScore: this.data.examScore
        };
    }

    // ═══ CONTROL DE JORNADA ═══
    canPlayToday() {
        // No daily restriction — can play anytime
        return true;
    }

    isSeasonComplete() {
        return this.data.currentJornada > SEASON.length;
    }

    // ═══ MATCH FLOW ═══
    startMatch(jornadaNum) {
        // If a specific jornada is requested, use that one
        if (jornadaNum && jornadaNum >= 1 && jornadaNum <= SEASON.length) {
            return SEASON[jornadaNum - 1];
        }
        return this.getCurrentMatch();
    }

    endMatch(stats, playedJornada) {
        // stats: { correct, total, turnosCompleted }
        const jornada = playedJornada || this.data.currentJornada;

        this.data.matchResults.push({
            jornada,
            score: stats.correct,
            total: stats.total,
            date: new Date().toISOString(),
            turnosCompleted: stats.turnosCompleted || 2
        });

        this.data.totalCorrect += stats.correct;
        this.data.totalAnswered += stats.total;

        // Advance to next jornada
        this.data.currentJornada++;
        if (this.data.currentJornada > SEASON.length) {
            this.data.seasonCompleted = true;
        }

        this.save();

        // Return result
        const match = SEASON[jornada - 1];
        const percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
        return {
            match,
            percentage,
            isWin: percentage >= 60,
            cierre: percentage >= 60 ? match.narrativa.cierre_bueno : match.narrativa.cierre_malo,
            nextJornada: this.data.currentJornada,
            seasonComplete: this.data.seasonCompleted
        };
    }

    // ═══ EXAM ═══
    recordExamResult(score, total) {
        this.data.examTaken = true;
        this.data.examScore = { score, total, date: new Date().toISOString() };
        this.save();
    }

    // ═══ CONCEPT TEACHING ═══
    getTeaching(conceptId) {
        return CONCEPT_TEACHINGS[conceptId] || null;
    }

    // ═══ NARRATIVE ═══
    getEtapaColor(etapa) {
        const colors = {
            pretemporada: '#4CAF50',
            liga: '#1976D2',
            copa: '#FF9800',
            semifinal: '#9C27B0',
            final: '#D32F2F'
        };
        return colors[etapa] || '#666';
    }

    getEtapaEmoji(etapa) {
        const emojis = {
            pretemporada: '🏃',
            liga: '⚽',
            copa: '🏆',
            semifinal: '🔥',
            final: '⭐'
        };
        return emojis[etapa] || '⚽';
    }

    // ═══ TIMER ═══
    // Timer is managed in UIManager but duration lives here
    getSessionDuration() {
        return 20 * 60; // 20 minutes in seconds
    }

    // Reset (for testing)
    resetSeason() {
        localStorage.removeItem(this.storageKey);
        this.data = this.load();
    }
}
