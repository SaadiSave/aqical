export type HealthMessage = {
    healthy: string,
    sensitive: string,
} | string

export const enum Pollutant {
    CO, NO2, O3, PM10, PM25, SO2
}

function convConst(pollutant: Pollutant): number {
    const stdMolarVolume = 22.41 * (1013 / 273)

    const molarMass = (p: Pollutant) => {
        switch (p) {
            case Pollutant.SO2:
                return 64.066
            case Pollutant.NO2:
                return 46.0055
            case Pollutant.O3:
                return 48.0
            case Pollutant.CO:
                return 28.01
            default:
                throw new Error("PMX does not have a defined molar mass")
        }
    }

    return molarMass(pollutant) / stdMolarVolume
}

const isPM = (pollutant: Pollutant) => {
    return pollutant === Pollutant.PM10 || pollutant === Pollutant.PM25
}

export const enum Unit {
    Ppb, Ppm, Ugm3
}

export class Value {
    pollutant: Pollutant
    qty: number
    unit: Unit

    constructor(pollutant: Pollutant, qty: number, unit: Unit = Unit.Ugm3) {
        if (isPM(pollutant) && unit !== Unit.Ugm3) throw new Error("The unit for PMX must be Ugm3")

        this.pollutant = pollutant
        this.qty = qty
        this.unit = unit
    }

    convertToUgm3(): Value {
        switch (this.unit) {
            case Unit.Ugm3:
                return new Value(this.pollutant, this.qty)
            case Unit.Ppm:
                return new Value(this.pollutant, this.qty * 1000 * convConst(this.pollutant))
            case Unit.Ppb:
                return new Value(this.pollutant, this.qty * convConst(this.pollutant))
        }
    }
}

export type AqiResult = {
    qualitativeRes?: number
    result: number,
    longRes: string,
    healthMsg: HealthMessage,
    color: string,
}

export type Results = {
    first: AqiResult,
    second: AqiResult | null,
}
