import { chargingDemandProbabilities, arrivalProbabilities } from '../CONSTANTS';

interface Parameters {
  chargingPoints: number;
  powerPerChargePointKW: number;
  carEnergy: number;
}

const getChargingPointDemand = async () => {
  // EV arrives, simulate charging demand.
  const evChargingDemand = 0.007 + Math.random() * (0.1 - 0.007);
  let closestDemandProbability = closestRange(chargingDemandProbabilities, evChargingDemand);
  console.log(closestDemandProbability);
  return closestDemandProbability?.range;
};

export const energyCalculation = async (payload: Parameters) => {
  const totalTicks = (365 * 24 * 60) / 15; // 1 year in 15-minute intervals
  console.log('=============== Start ===============');
  let totalEnergyConsumedKWh = 0,
    theoreticalMaxPowerDemandKW = payload?.chargingPoints * payload?.powerPerChargePointKW,
    actualMaxPowerDemandKW = 0,
    totalPowerDemand = Array(totalTicks).fill(0);

  // Simulate EV arrivals and charging needs
  for (let tick = 0; tick < totalTicks; tick++) {
    // Probability of a car arriving.
    const arrivalProb = Math.random();

    // Checking for every 15 min interval
    if (arrivalProb <= arrivalProbabilities[tick % arrivalProbabilities.length]) {
      let chargingDemandKm = await getChargingPointDemand();
      console.log('Charging Demand Km :', chargingDemandKm);
      // Calculate energy consumed.
      const energyConsumedKWh = (chargingDemandKm * payload.carEnergy) / 100; // 18kWh per 100km
      totalEnergyConsumedKWh += energyConsumedKWh;

      // Update power demand.
      const powerDemandKW = energyConsumedKWh * 4; // 4 times an hour
      for (let i = 0; i < 4; i++) {
        if (tick + i < totalTicks) {
          totalPowerDemand[tick + i] += powerDemandKW;
          actualMaxPowerDemandKW = Math.max(actualMaxPowerDemandKW, totalPowerDemand[tick + i]);
        }
      }
    }
  }

  // Calculate concurrency factor.
  const concurrencyFactor = actualMaxPowerDemandKW / theoreticalMaxPowerDemandKW;

  return {
    totalEnergyConsumedKWh,
    theoreticalMaxPowerDemandKW,
    actualMaxPowerDemandKW,
    concurrencyFactor,
  };
};

function closestRange(arr: any, target: number) {
  if (arr.length === 0) return {};
  let closest = arr[0]?.probability;
  let rangeObj = {};
  for (let i = 1; i < arr.length; i++) {
    const currentNumber = arr[i]?.probability,
      currentDifference = Math.abs(currentNumber - target),
      closestDifference = Math.abs(closest - target);
    // console.log(currentDifference < closestDifference, currentDifference, closestDifference);
    if (currentDifference < closestDifference) {
      closest = currentNumber;
      rangeObj = arr[i];
    }
  }
  return rangeObj;
}
