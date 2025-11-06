import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 items-center justify-center">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings overtime and analyze your income trends.
          </p>
        </div>
        <button
          className="mr-1 flex items-center cursor-pointer bg-green-100 p-2 rounded-lg text-green-600 font-semibold hover:bg-green-200 hover:text-green-700 transition-all duration-400 ease-in-out"
          onClick={onAddIncome}
        >
          <Plus size={15} className="text-lg" /> Add Income
        </button>
      </div>
      <div className="w-full mt-10 ">
        {/* create line chart */}
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
