export function getSegments(stores) {
  const allSegments = new Map();

  for (const store of stores) {
    const segment = store.itensSeguimento[0].seguimento;
    const subSegment = store.itensSeguimento[0].subseguimento;

    allSegments.set(segment, allSegments.get(segment) || new Set());
    allSegments.get(segment).add(subSegment);
  }

  return allSegments;
}