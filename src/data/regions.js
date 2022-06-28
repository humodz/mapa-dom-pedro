export function getRegions(stores) {
    const allRegions = stores.map(it => it.pavimento[0]);
    const uniqueRegions = new Set(allRegions);
    return [...uniqueRegions];
}