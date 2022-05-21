import type { AqiResult, HealthMessage } from "./mod"
import { Pollutant, takeWhile, Value } from "./mod"

const index: Map<Pollutant, number[]> = new Map([
    [Pollutant.PM25, [10, 20, 25, 50, 75, 800]],
    [Pollutant.PM10, [20, 40, 50, 100, 150, 1200]],
    [Pollutant.NO2, [40, 90, 120, 230, 340, 1000]],
    [Pollutant.O3, [50, 100, 130, 240, 380, 800]],
    [Pollutant.SO2, [100, 200, 350, 500, 750, 1250]],
])

const longResMap: Map<number, string> = new Map([
    [1, "Good"],
    [2, "Fair"],
    [3, "Moderate"],
    [4, "Poor"],
    [5, "Very Poor"],
    [6, "Extremely Poor"],
    [7, "Deadly"],
])

const healthMsgMap: Map<number, HealthMessage> = new Map([
    [1, {
        healthy: "The air quality is good. Enjoy your usual outdoor activities.",
        sensitive: "The air quality is good. Enjoy your usual outdoor activities.",
    }],
    [2, {
        healthy: "Enjoy your usual outdoor activities.",
        sensitive: "Enjoy your usual outdoor activities.",
    }],
    [3, {
        healthy: "Enjoy your usual outdoor activities.",
        sensitive: "Consider reducing intense outdoor activities, if you experience symptoms.",
    }],
    [4, {
        healthy: "Consider reducing intense activities outdoors, if you experience" +
            " symptoms such as sore eyes, a cough or sore throat.",
        sensitive: "Consider reducing physical activities, particularly outdoors," +
            " especially if you experience symptoms.",
    }],
    [5, {
        healthy: "Consider reducing intense activities outdoors, if you experience" +
            " symptoms such as sore eyes, a cough or sore throat.",
        sensitive: "Reduce physical activities, particularly outdoors, especially if" +
            " you experience symptoms.",
    }],
    [6, {
        healthy: "Reduce physical activities outdoors.",
        sensitive: "Avoid physical activities outdoors.",
    }],
    [7, {
        healthy: "If you are still alive, leave the polluted area immediately.",
        sensitive: "If you are still alive, leave the polluted area immediately.",
    }],
])

const colorMap: Map<number, string> = new Map([
    [1, "#50f0e6"],
    [2, "#50ccaa"],
    [3, "#f0e641"],
    [4, "#ff5050"],
    [5, "#960032"],
    [6, "#7d2181"],
    [7, "#000000"],
])

export function eaqi(list: Value[]): AqiResult {
    const plist = new Map<Pollutant, number>()
    list.filter((val) => val.pollutant != Pollutant.CO)
        .map((val) => val.convertToUgm3())
        .forEach((val) => plist.set(val.pollutant, val.qty))

    const idx = calculate(plist)

    return {
        result: idx,
        longRes: longResMap.get(idx)!,
        healthMsg: healthMsgMap.get(idx)!,
        color: colorMap.get(idx)!,
    }
}

function calculate(plist: Map<Pollutant, number>): number {
    const aqis = []

    for (const [p, v] of plist) {
        const thresh = index.get(p)!

        if (v > thresh[5]) return 7

        const taken: number[] = takeWhile(thresh, val => val <= v)

        aqis.push(taken.length + 1)
    }

    return Math.max(...aqis)
}
