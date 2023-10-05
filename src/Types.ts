export interface Parameters {
  chargingPoints: number;
  powerPerChargePointKW: number;
  carEnergy: number;
  arrivalProbability: string;
}

export interface CalculatedConsumption {
  totalEnergyConsumedKWh: number;
  theoreticalMaxPowerDemandKW: number;
  actualMaxPowerDemandKW: number;
  concurrencyFactor: number;
}
