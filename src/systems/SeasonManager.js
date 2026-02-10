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
        tema: "triangulos",
        concepto: "angulos-complementarios",
        narrativa: {
            intro: "¡Arranca la Liga! Primer partido oficial. Complementarios y suplementarios.",
            motivacion: "Un jugador de River domina la cancha. ¡Y los ángulos dominan las jugadas!",
            cierre_bueno: "¡Victoria en la Fecha 1! El equipo confía en vos.",
            cierre_malo: "¡Buen intento! Practicá un poco más y la próxima la rompés. La Liga recién empieza."
        },
        dificultad: [1, 2, 2]
    },
    {
        jornada: 5,
        nombre: "Liga — Fecha 2",
        etapa: "liga",
        tema: "potenciacion",
        concepto: "potencia-division",
        narrativa: {
            intro: "Fecha 2 de la Liga. Hoy sumamos la división de potencias.",
            motivacion: "Dividir potencias es como hacer un caño: con práctica sale perfecto.",
            cierre_bueno: "¡3 puntos más! Estamos arriba en la tabla.",
            cierre_malo: "¡Muy bien el esfuerzo! Con un poco más de práctica vas a dominarlas."
        },
        dificultad: [1, 2, 2]
    },
    {
        jornada: 6,
        nombre: "Copa Interna",
        etapa: "copa",
        tema: "potenciacion",
        concepto: "potencia-de-potencia",
        narrativa: {
            intro: "¡Clasificaste a la Copa Interna! Hoy: potencia de potencia.",
            motivacion: "En la copa no perdonan. Hay que dominar cada propiedad.",
            cierre_bueno: "¡Pasamos de ronda! La Copa es nuestra.",
            cierre_malo: "¡Seguimos en la Copa la próxima! Lo importante es que aprendiste un montón."
        },
        dificultad: [2, 2, 3]
    },
    {
        jornada: 7,
        nombre: "Liga — Fecha 3",
        etapa: "liga",
        tema: "potenciacion",
        concepto: "potencia-combinados",
        narrativa: {
            intro: "Fecha 3. Combinamos todas las propiedades de potencias.",
            motivacion: "Un crack no domina una sola cosa. Domina todo y lo combina.",
            cierre_bueno: "¡Impecable! Sos el goleador de la Liga.",
            cierre_malo: "¡Las combinaciones son re difíciles! Que hayas llegado hasta acá es un logro enorme."
        },
        dificultad: [2, 3, 3]
    },
    {
        jornada: 8,
        nombre: "Liga — Fecha 4",
        etapa: "liga",
        tema: "triangulos",
        concepto: "paralelas-transversal",
        narrativa: {
            intro: "Fecha 4. Paralelas cortadas por transversal.",
            motivacion: "Las paralelas son como las líneas del campo. ¡Dominá los ángulos que se forman!",
            cierre_bueno: "¡Goleada! Estamos liderando la tabla.",
            cierre_malo: "¡Seguís aprendiendo! Cada ejercicio te hace mejor. Vamos de vuelta."
        },
        dificultad: [2, 3, 3]
    },
    {
        jornada: 9,
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
        jornada: 10,
        nombre: "Semifinal — Vuelta",
        etapa: "semifinal",
        tema: "triangulos",
        concepto: "angulos-basicos",
        narrativa: {
            intro: "Vuelta de la semi. Es todo o nada. Repaso total de geometría.",
            motivacion: "Las semifinales son para los valientes. ¡Dale con todo!",
            cierre_bueno: "¡ESTAMOS EN LA FINAAAAL! 🏟️",
            cierre_malo: "¡Tremendo esfuerzo! Estuviste cerca. Un repaso más y la próxima la sacás."
        },
        dificultad: [3, 3, 3]
    },
    {
        jornada: 11,
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
    "repaso-general": {
        titulo: "🏆 REPASO FINAL — Todo lo que aprendiste",
        pasos: [
            { texto: "Es la final. Repasemos TODO lo que aprendiste en esta temporada.", emoji: "🏆" },
            { texto: "ÁNGULOS: agudo < 90°, recto = 90°, obtuso > 90°. Complementarios = 90°, Suplementarios = 180°.", emoji: "📐" },
            { texto: "TRIÁNGULOS: 3 ángulos suman 180°. Equilátero, Isósceles, Escaleno.", emoji: "📐" },
            { texto: "POTENCIAS: × → sumar exp. | ÷ → restar exp. | (aⁿ)ᵐ → multiplicar exp.", emoji: "🔢" },
            { texto: "¡Estás listo! Demostrá todo lo que sabés. ¡VAMOS FERCHU!", emoji: "🔴⚪" }
        ],
        regla: "Todo lo aprendido en 10 jornadas de entrenamiento",
        ejemplo: "¡SOS UN CRACK! Aplicá todo lo que el Pulpo te enseñó."
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
            currentJornada: 1,
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
