import { AqiResult, HealthMessage, Pollutant, Value } from "./mod"
import { getResult } from "./common"

const index: Map<Pollutant, number[]> = new Map([
    [Pollutant.PM25, [10, 25, 50, 75, 150]],
    [Pollutant.PM10, [20, 50, 75, 150, 230]],
    [Pollutant.NO2, [40, 80, 120, 230, 340]],
    [Pollutant.O3, [50, 100, 130, 240, 380]],
    [Pollutant.SO2, [40, 80, 200, 500, 750]],
    [Pollutant.CO, [30, 100, 150, 250, 340]],
])

const longResMap: Map<number, string> = new Map([
    [1, "Good"],
    [2, "Fair"],
    [3, "Moderate"],
    [4, "Poor"],
    [5, "Very Poor"],
    [6, "Extremely Poor"],
    [7, "Hazardous"],
    [8, "Deadly"],
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
        healthy: "Avoid physical activities outdoors. An air purifier is recommended indoors.",
        sensitive: "Do not venture outdoors. An air purifier is essential indoors.",
    }],
    [8, {
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
    [7, "#3b0505"],
    [8, "#000000"],
])

export function mmaqi(list: Value[]): AqiResult {
    return getResult(
        list, index, longResMap, healthMsgMap, colorMap, true,
    )
}
