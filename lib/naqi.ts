import { AqiResult, HealthMessage, Pollutant, Value } from "./mod"
import { getResult } from "./common"

const index: Map<Pollutant, number[]> = new Map([
    [Pollutant.PM25, [30, 60, 90, 120, 250]],
    [Pollutant.PM10, [50, 100, 250, 350, 430]],
    [Pollutant.NO2, [40, 80, 180, 280, 400]],
    [Pollutant.O3, [50, 100, 168, 208, 748]],
    [Pollutant.SO2, [40, 80, 380, 800, 1600]],
    [Pollutant.CO, [10, 20, 100, 170, 340]],
])

const longResMap: Map<number, string> = new Map([
    [1, "Good"],
    [2, "Satisfactory"],
    [3, "Moderate"],
    [4, "Poor"],
    [5, "Very Poor"],
    [6, "Severe"],
])

const healthMsgMap: Map<number, HealthMessage> = new Map([
    [1, "Minimal impact."],
    [2, "May cause minor breathing discomfort to sensitive people."],
    [3, "May cause breathing discomfort to the people with lung disease such as asthma" +
    " and discomfort to people with heart disease, children and older adults."],
    [4, "May cause breathing discomfort to people on prolonged exposure and discomfort" +
    " to people with heart disease with short exposure."],
    [5, "May cause respiratory illness to the people on prolonged exposure. Effects may" +
    " be more pronounced in people with lung and heart diseases."],
    [6, "May cause respiratory effects even on healthy people and serious health" +
    " impacts on people with lung/heart diseases. The health impacts may be experienced" +
    " even during light physical activity"],
])

const colorMap: Map<number, string> = new Map([
    [1, "#009933"],
    [2, "#58ff09"],
    [3, "#ffff00"],
    [4, "#ffa500"],
    [5, "#ff0000"],
    [6, "#990000"],
])

export function naqi(list: Value[]): AqiResult {
    return getResult(
        list, index, longResMap, healthMsgMap, colorMap, false,
    )
}
