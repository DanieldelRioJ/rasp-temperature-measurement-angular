export function cleanObject(object: any): Partial<any> {
    Object.keys(object).forEach(
        (key) => object[key] == null && delete object[key],
    );
    return object;
}
