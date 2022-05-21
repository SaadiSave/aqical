import { eaqi, mmaqi, naqi, Pollutant, Unit, Value } from "./mod"

function intoValues(arr: [Pollutant, number][]): Value[] {
    return arr.map(([p, v]: [Pollutant, number]) => new Value(p, v, Unit.Ugm3))
}

function assertEq(one: any, two: any) {
    if (one !== two) alert(`Failed assertion, as ${one} != ${two}`)
}

export function testEAQI() {
    const testCases: [Value[], number][] = [
        [intoValues([
            [Pollutant.PM25, 20],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 60],
        ]), 3],
        [intoValues([
            [Pollutant.PM25, 19],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 60],
        ]), 2],
    ]

    for (const [vals, res] of testCases) {
        assertEq(eaqi(vals).result, res)
    }
}

export function testNAQI() {
    const testCases: [Value[], number][] = [
        [intoValues([
            [Pollutant.PM25, 20],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 60],
            [Pollutant.CO, 70],
        ]), 75],
        [intoValues([
            [Pollutant.PM25, 20],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 80],
            [Pollutant.CO, 70],
        ]), 100],
        [intoValues([
            [Pollutant.PM25, 251],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 80],
            [Pollutant.CO, 70],
        ]), 403],
    ]

    for (const [vals, res] of testCases) {
        assertEq(naqi(vals).result, res)
    }
}

export function testMMAQI() {
    const testCases: [Value[], number][] = [
        [intoValues([
            [Pollutant.PM25, 20],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 60],
            [Pollutant.CO, 70],
        ]), 83],
        [intoValues([
            [Pollutant.PM25, 20],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 80],
            [Pollutant.CO, 70],
        ]), 100],
        [intoValues([
            [Pollutant.PM25, 251],
            [Pollutant.PM10, 30],
            [Pollutant.NO2, 40],
            [Pollutant.O3, 50],
            [Pollutant.SO2, 80],
            [Pollutant.CO, 70],
        ]), 671],
    ]

    for (const [vals, res] of testCases) {
        assertEq(mmaqi(vals).result, res)
    }
}