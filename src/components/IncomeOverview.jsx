import { useEffect, useState } from "react";
import { prepareLineChartData } from "../util/prepareLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 items-center justify-center">
      <div className="flex items-center justify-between ">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings overtime and analyze your income trends.
          </p>
        </div>
        <button
          className="mr-1 text-xs sm:text-base flex items-center cursor-pointer bg-green-100 p-2 rounded-lg text-green-600 font-semibold hover:bg-green-200 hover:text-green-700 transition-all duration-400 ease-in-out"
          onClick={onAddIncome}
        >
          <Plus size={15} className="text-sm sm:text-lg" /> Add Income
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
