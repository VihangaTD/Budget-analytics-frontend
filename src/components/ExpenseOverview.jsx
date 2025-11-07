import { useEffect, useState } from "react";
import { prepareLineChartData } from "../util/prepareLineChartData";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 items-center justify-center">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time and analyze your expense trends.
          </p>
        </div>
        <button
          className="mr-1 flex items-center cursor-pointer bg-red-100 p-2 rounded-lg text-red-600 font-semibold hover:bg-red-200 hover:text-red-700 transition-all duration-400 ease-in-out"
          onClick={onAddExpense}
        >
          <Plus size={15} className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="w-full mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
