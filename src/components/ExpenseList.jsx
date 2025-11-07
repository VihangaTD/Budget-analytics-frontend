import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    try {
      await onEmail();
    } finally {
      setLoading(true);
    }
  };

  const handleDownload = async () => {
    try {
      await onDownload();
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 items-center justify-center">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Expense List</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-end gap-2">
          <button
            disabled={loading}
            onClick={handleEmail}
            className="text-sm text-gray-700 items-center justify-center flex py-1 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 hover:text-yellow-500 duration-200 ease-in-out transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail className="text-base mr-1" size={15} /> Email
              </>
            )}
          </button>
          <button
            disabled={loading}
            onClick={handleDownload}
            className="text-sm text-gray-700 items-center justify-center flex py-1 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 hover:text-yellow-500 duration-200 ease-in-out transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="text-base mr-1" size={15} /> Download
              </>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
