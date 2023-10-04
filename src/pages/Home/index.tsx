import { useState } from 'react';
import Results from './results';
import Header from '../../components/Header';
import { energyCalculation } from '../../utils/energyCalculation';

function Home() {
  let [parameters, setParameters] = useState({
    chargingPoints: 20,
    arrivalProbability: '100%',
    carEnergy: 18,
    powerPerChargePointKW: 11,
  });
  const numbersArray = Array.from({ length: 19 }, (_, index) => (index + 2) * 10);

  const onCalculateClick = async () => {
    let results = await energyCalculation(parameters);
    console.log(results);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Header></Header>
      <div className="grid grid-cols-2 gap-x-7 gap-y-4">
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold	text-base text-black">Charging Points</span>
          </label>
          <input type="number" placeholder="" value={parameters.chargingPoints} className="label-text input input-bordered input-lg input-bordered w-full max-w-xs bg-white font-mono	text-black" />
        </div>
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold	text-base text-black">Arrival Probability</span>
          </label>
          <select className="select select-lg select-bordered w-full select-lg max-w-xs bg-white font-mono text-black">
            {numbersArray.map((probability) => (
              <option selected={probability === 100 ? true : false}>{probability}%</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text font-mono font-bold text-base	text-black">Car Energy (Kwh)</span>
          </label>
          <input type="number" placeholder="" value={parameters.carEnergy} className="label-text input input-bordered input-lg input-bordered w-full max-w-xs bg-white font-mono	text-black" />
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
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button className="btn w-5/12 rounded-full mt-4 btn-primary" onClick={onCalculateClick}>
          Calculate
        </button>
      </div>

      <Results />
    </div>
  );
}

export default Home;
