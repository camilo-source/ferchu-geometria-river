/**
 * ═══════════════════════════════════════════════════════════
 * 🎯 INPUT COMPONENTS - Campos mejorados TDAH-friendly
 * ═══════════════════════════════════════════════════════════
 */

// Input numérico grande y claro
export function createNumberInput(id, placeholder = "Tu respuesta", min = 0, max = 360) {
    return `
        <div class="input-container" style="margin: 2rem 0;">
            <label for="${id}" style="
                display: block;
                font-size: 1.3rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: var(--text-primary);
                text-align: center;
            ">
                Tu respuesta:
            </label>
            <input 
                type="number" 
                id="${id}"
                placeholder="${placeholder}"
                min="${min}"
                max="${max}"
                class="answer-input"
                style="
                    font-size: 3rem;
                    padding: 1.5rem 2rem;
                    text-align: center;
                    width: 100%;
                    max-width: 350px;
                    margin: 0 auto;
                    display: block;
                    border: 4px solid var(--primary);
                    border-radius: 20px;
                    background: #FFFFFF;
                    color: var(--text-primary);
                    font-family: var(--font-number);
                    font-weight: 700;
                    box-shadow: 0 4px 20px rgba(211, 47, 47, 0.15);
                    transition: all 0.3s ease;
                "
                onblur="this.style.transform='scale(1)'"
                onfocus="this.style.transform='scale(1.05)'; this.style.borderColor='var(--primary-dark)'"
            />
        </div>
    `;
}

// Botones de opción mejorados
export function createOptionButton(value, label, name = "option") {
    return `
        <button 
            type="button"
            class="option-btn"
            data-value="${value}"
            style="
                font-size: 1.5rem;
                padding: 1.5rem 2.5rem;
                min-width: 200px;
                background: #FFFFFF;
                color: var(--text-primary);
                border: 3px solid rgba(211, 47, 47, 0.3);
                border-radius: 15px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            "
            onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-3px)'"
            onmouseout="this.style.borderColor='rgba(211, 47, 47, 0.3)'; this.style.transform='translateY(0)'"
        >
            ${label}
        </button>
    `;
}

// CSS para estado seleccionado (se aplica dinámicamente)
export const selectedButtonStyle = `
    background: var(--primary) !important;
    color: white !important;
    border-color: var(--primary-dark) !important;
    transform: scale(1.05) !important;
`;
