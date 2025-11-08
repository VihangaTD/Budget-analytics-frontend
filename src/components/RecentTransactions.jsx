import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-4">

      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>
        <button
          onClick={onMore}
          className="mr-1 text-sm sm:text-base flex items-center cursor-pointer bg-green-100 p-2 rounded-lg text-green-600 font-semibold hover:bg-green-200 hover:text-green-700 transition-all duration-400 ease-in-out"
        >
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.name}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
