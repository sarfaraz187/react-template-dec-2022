import { useState } from 'react';
import Results from './results';
import Header from '../../components/Header';
import { energyCalculation } from '../../utils/energyCalculation';

function Home() {
  const defaultParameters = {
    chargingPoints: 20,
    arrivalProbability: '100%',
    carEnergy: 18,
    powerPerChargePointKW: 11,
  };
  const resultsParameters = {
    totalEnergyConsumedKWh: 0,
    theoreticalMaxPowerDemandKW: 0,
    actualMaxPowerDemandKW: 0,
    concurrencyFactor: 0,
  };

  let [parameters, setParameters] = useState(defaultParameters),
    [calculatedParams, setCalculatedParams] = useState(resultsParameters);

  const numbersArray = Array.from({ length: 19 }, (_, index) => (index + 2) * 10),
    onCalculateClick = async () => {
      console.clear();
      let results = await energyCalculation(parameters);
      console.log(results);
      setCalculatedParams(results);
    };

  const onParametersChange = (value: number | string, fromEvent: string) => {
    console.log(fromEvent, value);
    setParameters((prevState) => ({ ...prevState, [fromEvent]: value }));
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Header></Header>
      <div className="grid grid-cols-2 gap-x-7 gap-y-4">
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold	text-base text-black">Charging Points</span>
          </label>
          <input
            type="number"
            placeholder=""
            value={parameters.chargingPoints}
            className="label-text input input-bordered input-lg input-bordered w-full max-w-xs bg-white font-mono	text-black"
            onChange={(event) => onParametersChange(event.target.value, 'chargingPoints')}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold	text-base text-black">Arrival Probability</span>
          </label>
          <select className="select select-lg select-bordered w-full select-lg max-w-xs bg-white font-mono text-black" onChange={(event) => onParametersChange(event.target.value, 'carEnergy')}>
            {numbersArray.map((probability) => (
              <option selected={probability === 100 ? true : false}>{probability}%</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold text-base	text-black">Car Energy (Kwh)</span>
          </label>
          <input
            type="number"
            placeholder=""
            value={parameters.carEnergy}
            className="label-text input input-bordered input-lg input-bordered w-full max-w-xs bg-white font-mono	text-black"
            onChange={(event) => onParametersChange(event.target.value, 'arrivalProbability')}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold	text-black text-base">Charging power (KW)</span>
          </label>
          <input
            type="number"
            placeholder=""
            value={parameters.powerPerChargePointKW}
            className="label-text input input-bordered input-lg input-bordered w-full max-w-xs bg-white font-mono text-black "
            onChange={(event) => onParametersChange(event.target.value, 'powerPerChargePointKW')}
          />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <button className="btn w-5/12 rounded-full mt-4 btn-neutral w-40 mr-4 text-white" onClick={onCalculateClick}>
          Calculate
        </button>
        <button
          className="btn w-5/12 rounded-full mt-4 btn-neutral w-40 text-white"
          onClick={() => {
            setParameters(defaultParameters);
            setCalculatedParams(resultsParameters);
          }}
        >
          Reset
        </button>
      </div>

      <Results
        totalEnergyConsumedKWh={calculatedParams.totalEnergyConsumedKWh}
        theoreticalMaxPowerDemandKW={calculatedParams.theoreticalMaxPowerDemandKW}
        actualMaxPowerDemandKW={calculatedParams.actualMaxPowerDemandKW}
        concurrencyFactor={calculatedParams.concurrencyFactor}
      />
    </div>
  );
}

export default Home;
