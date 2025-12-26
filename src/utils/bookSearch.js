// src/utils/bookSearch.js

export function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097F ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function skeleton(word = "") {
  return word.replace(/[aeiou]/g, "");
}

// edit distance ≤ 1 (very light fuzzy)
export function isFuzzyMatch(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;

  let i = 0, j = 0, mistakes = 0;

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++; j++;
    } else {
      mistakes++;
      if (mistakes > 1) return false;

      if (a.length > b.length) i++;
      else if (a.length < b.length) j++;
      else { i++; j++; }
    }
  }
  return true;
}

// MAIN MATCH LOGIC (LOOSE BUT SAFE)
export function matchesBook(book, rawQuery) {
  const q = normalize(rawQuery);
  if (!q || q.length < 2) return false;

  const hi = normalize(book.title || "");
  const en = normalize(book.title_search || "");
  const author = normalize(book.author || "");

  const words = en.split(" ");
  const qWords = q.split(" ");

  if (hi.includes(q) || en.includes(q) || author.includes(q)) return true;
  if (words.some(w => w.startsWith(q))) return true;

  let hitCount = 0;
  qWords.forEach(qw => {
    if (words.some(w => w.startsWith(qw))) hitCount++;
  });
  if (hitCount >= 1) return true;

  if (q.length >= 4 && words.some(w => isFuzzyMatch(w, q))) return true;
  if (q.length >= 4) {
    const qSkel = skeleton(q);
    if (words.some(w => skeleton(w).includes(qSkel))) return true;
  }

  return false;
}
