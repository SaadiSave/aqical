import { AqiResult, HealthMessage, Pollutant, takeWhile, Value } from "./mod"

type CalcResult = {
    qualitative: number,
    result: number
}

const Ival: Map<number, [number, number]> = new Map([
    [1, [0, 50]],
    [2, [51, 100]],
    [3, [101, 200]],
    [4, [201, 300]],
    [5, [301, 400]],
])

export function getResult(
    list: Value[],
    index: Map<Pollutant, number[]>,
    longResMap: Map<number, string>,
    healthMsgMap: Map<number, HealthMessage>,
    colorMap: Map<number, string>,
    mmaqi: boolean,
): AqiResult {
    const plist = new Map<Pollutant, number>()
    list.map(val => val.convertToUgm3()).forEach(val => {
        plist.set(val.pollutant, (val.pollutant === Pollutant.CO) ? val.qty / 100 : val.qty)
    })

    let { qualitative, result } = calculate(plist, index)

    if (mmaqi) {
        if (result >= 500) qualitative = 7
        if (result >= 775) qualitative = 8
    }

    return {
        qualitativeRes: qualitative,
        result: result,
        longRes: longResMap.get(qualitative)!,
        healthMsg: healthMsgMap.get(qualitative)!,
        color: colorMap.get(qualitative)!,
    }
}

function calculate(plist: Map<Pollutant, number>, index: Map<Pollutant, number[]>): CalcResult {
    const aqis: number[] = []
    const qualitatives: number[] = []

    for (const [pollutant, val] of plist) {
        const thresh = index.get(pollutant)!
        if (val > thresh[4]) {
            aqis.push(Math.round((((401 / thresh[4]) * (val - thresh[4])) + 401)))
            qualitatives.push(6)
        } else {
            let j = takeWhile([...thresh].reverse(), t => t >= val).pop()!
            let y = thresh.indexOf(j) + 1
            qualitatives.push(y)
            if (y !== 0 && val < thresh[y - 1] + 1) {
                j = thresh[y - 1]
                y = thresh.indexOf(j)
            }
            const z = y + 1
            const [Il, Ih] = Ival.get(z) ?? [0, 0]
            let Bl = 0
            if (y !== 0) Bl = thresh[y - 1] + 1
            const Bh = j
            aqis.push(Math.round((((Ih - Il) / (Bh - Bl)) * (val - Bl)) + Il))
        }
    }

    return { qualitative: Math.max(...qualitatives), result: Math.max(...aqis) }
}