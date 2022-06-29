export function getSegments(shops) {
  const allSegments = new Map();

  for (const shop of shops) {
    const segment = shop.itensSeguimento[0].seguimento;
    const subSegment = shop.itensSeguimento[0].subseguimento;

    allSegments.set(segment, allSegments.get(segment) || new Set());
    allSegments.get(segment).add(subSegment);
  }

  return allSegments;
}