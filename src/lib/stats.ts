let totalWordsRefined = 14204;

export function getWordsRefined(): number {
  return totalWordsRefined;
}

export function addWordsRefined(count: number): number {
  if (count > 0) {
    totalWordsRefined += count;
  }
  return totalWordsRefined;
}

export function setWordsRefined(count: number): void {
  if (count >= 0) {
    totalWordsRefined = count;
  }
}

