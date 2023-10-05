import { CalculatedConsumption } from '../../Types';

const Results = (props: CalculatedConsumption) => {
  const headings = ['Total Energy Consumed (KWh)', 'Theoretical Max Power Demand (KW)', 'Actual Max Power Demand (KW)', 'Concurrency Factor'];
  return (
    <>
      <div className="mt-5 flex justify-between grid grid-cols-2 gap-3">
        {Object.keys(props).map((parameter, index) => (
          <div className="card bg-base-100 shadow-xl w-full bg-white ">
            <div className="card-body bg-lime-300 rounded-lg p-4">
              <div className="text-black">
                <b>{headings[index]}</b>
              </div>
              <div className="flex justify-center text-black font-mono text-xl">{props?.[parameter]}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
