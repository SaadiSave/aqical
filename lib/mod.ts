export { Pollutant, Value, Unit } from "./types"
export type { AqiResult, HealthMessage, Results } from "./types";

export { eaqi } from "./eaqi"
export { naqi } from "./naqi"
export { mmaqi } from "./mmaqi"

export function takeWhile<T>(arr: T[], predicate: (value: T) => boolean): T[] {
    let ret = []
    for (const el of arr) {
        if (predicate(el)) ret.push(el)
        else break
    }
    return ret
}
