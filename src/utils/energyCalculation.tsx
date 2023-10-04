import { chargingDemandProbabilities, arrivalProbabilities } from '../CONSTANTS';

interface Parameters {
  chargingPoints: number;
  powerPerChargePointKW: number;
  carEnergy: number;
}

export const energyCalculation = async (payload: Parameters) => {
  // const numChargePoints = 20;
  // const powerPerChargePointKW = 11;
  const totalTicks = 2; // (365 * 24 * 60) / 15; // 1 year in 15-minute intervals
  console.log('========== Start ===========');
  let totalEnergyConsumedKWh = 0,
    theoreticalMaxPowerDemandKW = payload?.chargingPoints * payload?.powerPerChargePointKW,
    actualMaxPowerDemandKW = 0,
    totalPowerDemand = Array(totalTicks).fill(0);

  // Simulate EV arrivals and charging needs
  for (let tick = 0; tick < totalTicks; tick++) {
    // Simulate EV arrival
    const arrivalProb = Math.random();
    console.log(arrivalProb, arrivalProbabilities[tick % arrivalProbabilities.length]);
    if (arrivalProb <= arrivalProbabilities[tick % arrivalProbabilities.length]) {
      // EV arrives, simulate charging demand
      const chargingDemandProb = Math.random();
      let chargingDemandKm = 0;

      for (const demand of chargingDemandProbabilities) {
        if (chargingDemandProb <= demand.probability) {
          chargingDemandKm = demand.range;
          break;
        }
      }

      // Calculate energy consumed
      const energyConsumedKWh = (chargingDemandKm * payload.carEnergy) / 100; // 18kWh per 100km
      totalEnergyConsumedKWh += energyConsumedKWh;

      // Update power demand
      const powerDemandKW = energyConsumedKWh * 4; // 4 times an hour
      for (let i = 0; i < 4; i++) {
        if (tick + i < totalTicks) {
          totalPowerDemand[tick + i] += powerDemandKW;
          actualMaxPowerDemandKW = Math.max(actualMaxPowerDemandKW, totalPowerDemand[tick + i]);
        }
      }
    }
  }

  // Calculate concurrency factor
  const concurrencyFactor = actualMaxPowerDemandKW / theoreticalMaxPowerDemandKW;

  return {
    totalEnergyConsumedKWh,
    theoreticalMaxPowerDemandKW,
    actualMaxPowerDemandKW,
    concurrencyFactor,
  };
};
