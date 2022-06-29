export function getRegions(shops) {
    const allRegions = shops.map(it => it.pavimento[0]);
    const uniqueRegions = new Set(allRegions);
    return [...uniqueRegions];
}