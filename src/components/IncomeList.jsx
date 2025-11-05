import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList=({transactions,onDelete})=>{
    return(
        <div className=" bg-white shadow-lg rounded-2xl p-6 items-center justify-center">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg">
                    Income Sources
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-end gap-2">
                    <button className="text-sm items-center justify-center flex py-1 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 hover:text-yellow-500 duration-200 ease-in-out transition-all cursor-pointer">
                        <Mail className="text-base mr-1" size={15}/>Email
                    </button>
                    <button className="text-sm items-center justify-center flex py-1 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 hover:text-yellow-500 duration-200 ease-in-out transition-all cursor-pointer">
                        <Download className="text-base mr-1" size={15}/>Download
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Display the incomes */}
                {transactions?.map((income)=>(
                    <TransactionInfoCard 
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={()=>onDelete(income.id)}
                        />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;