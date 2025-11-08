import { addThousandsSeparator } from "../util/NumberUtils";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview=({totalBalance,totalExpense,totalIncome})=>{
    const COLORS = ["#ca8a04", "#991b1b", "#166534"];

    const balanceData=[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Expense",amount:totalExpense},
        {name:"Total Income",amount:totalIncome}
    ]

    return(
        <div className="bg-white shadow-lg rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg mb-14">Financial Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />

        </div>
    )
}

export default FinanceOverview;