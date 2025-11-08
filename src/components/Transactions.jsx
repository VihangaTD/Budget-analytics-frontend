import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";

const Transactions=({transactions,onMore,type,title})=>{
    return(
        <div className="bg-white shadow-lg rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
                <button 
                    onClick={onMore}
                    className="mr-1 text-sm sm:text-base flex items-center cursor-pointer bg-green-100 p-2 rounded-lg text-green-600 font-semibold hover:bg-green-200 hover:text-green-700 transition-all duration-400 ease-in-out">
                    More <ArrowRight className="text-base " size={15}/>
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0,5)?.map(item=>(
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions;