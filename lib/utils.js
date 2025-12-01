/**
 * Small utility helpers for validog
 */

/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
const levenshteinDistance = (a, b) => {
    const alen = a.length;
    const blen = b.length;
    if (alen === 0) return blen;
    if (blen === 0) return alen;

    const matrix = Array.from({ length: blen + 1 }, (_, i) => [i]);
    for (let j = 0; j <= alen; j++) matrix[0][j] = j;

    for (let i = 1; i <= blen; i++) {
        for (let j = 1; j <= alen; j++) {
            const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[blen][alen];
};

/**
 * Parse a lifespan string and return an average lifespan number.
 * Supports formats like "10-12", "10 - 12 years", "12", or null/undefined.
 * Returns null when parsing fails.
 * @param {string} lifespan
 * @returns {number|null}
 */
const parseLifespanAverage = (lifespan) => {
    if (!lifespan || typeof lifespan !== 'string') return null;
    // Extract digits and ranges, handle en-dash/em-dash
    const cleaned = lifespan.replace(/[^0-9\-–—]/g, '');
    // Normalize different dash characters to '-'
    const normalized = cleaned.replace(/[–—]/g, '-').trim();
    if (normalized.length === 0) return null;

    const parts = normalized.split('-').map(s => s.trim()).filter(Boolean);
    if (parts.length === 1) {
        const n = parseInt(parts[0], 10);
        return Number.isFinite(n) ? n : null;
    }
    if (parts.length >= 2) {
        const a = parseInt(parts[0], 10);
        const b = parseInt(parts[1], 10);
        if (Number.isFinite(a) && Number.isFinite(b)) return (a + b) / 2;
    }
    return null;
};

module.exports = {
    levenshteinDistance,
    parseLifespanAverage
};
