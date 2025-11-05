import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { FastForward, Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";


const Income=()=>{
    useUser();

    const[incomeData,setIncomeData] = useState([]);
    const[categories,setCategories] = useState([]);
    const[loading,setLoading] = useState(false);
    const[openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
    const[openDeleteAlert,setOpenDeleteAlert] = useState({
        show:false,
        data:null,
    })

    //fetch income degtails from api
    const fetchIncomeDetails=async()=>{
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200){
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch incomes details",error);
            toast.error(error.response?.data?.message || "Failed to fetch incomes data");
        }finally{
            setLoading(false);
        }
    }

    //fetch caategories for income
    const fetchIncomeCategory=async()=>{
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE('income'));
            if(response.status === 200){
                console.log('income categories',response.data)
                setCategories(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch income categories',error);
            toast.error(error.data?.message || 'Failed to fetch income categories');
        }
    }

    //save the income details
    const handleAddIncome=async(income)=>{
        const {name,amount,date,icon,categoryId} = income;

        //validation
        if(!name.trim()){
            toast.error("Please enter a name");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount)<= 0 ){
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if(!date){
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if(date > today){
            toast.error("Date cannot be in the future");
            return;
        }

        if(!categoryId){
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
                name,
                amount:Number(amount),
                date,
                icon,
                categoryId,
            })

            if(response.status === 201){
                setOpenAddIncomeModal(false);
                toast.success("Income added sucessfully");
                fetchIncomeDetails();
                fetchIncomeCategory();
            }
        } catch (error) {
            console.log("Error adding income",error);
            toast.error(error.response?.data?.message || "Failed to adding income");
        }
    }

    useEffect(()=>{
        fetchIncomeDetails();
        fetchIncomeCategory();
    },[])

    //delete income details
    const deleteIncome=async(id)=>{
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show:false,data:null});
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.log("Error deleting income",error);
            toast.error(error.response?.data?.message || "Failed to delete income")
        } 
    }

    return(
       <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* Overview for income with line chart */}
                        <button 
                            className="mr-1 flex items-center cursor-pointer bg-green-100 p-2 rounded-lg text-green-600 font-semibold hover:bg-green-200 hover:text-green-700 transition-all duration-400 ease-in-out"
                            onClick={()=>setOpenAddIncomeModal(true)}    
                        >
                            <Plus size={15} className="text-lg"/> Add Income
                        </button>

                        <IncomeOverview transactions={incomeData}/>

                    </div>

                    <IncomeList transactions={incomeData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}/>

                    {/* Add income modal */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={()=>setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm 
                            onAddIncome={(income)=>handleAddIncome(income)}
                            categories={categories}
                            />
                    </Modal>

                    {/* Delete income modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                        title="Delete Income"
                    >
                        <DeleteAlert 
                            content="Are you sure want to delete this income details?"
                            onDelete={()=>deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </div>
        </Dashboard>
    )
}

export default Income;