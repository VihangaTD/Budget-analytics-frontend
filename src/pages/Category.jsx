import { Plus, Triangle } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const[loading,setLoading] = useState(false);
  const[categoryData,setCategoryData] = useState([]);
  const[openAddCategoryModal,setOpenAddCategoryModal] = useState(false);
  const[openEditCategoryModal,setOpenEditCategoryModal] = useState(false);
  const[selecctedCategory,setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async()=>{
    if(loading) return;

    setLoading(true);

    try {
        const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
        if(response.status === 200){
            console.log('categories',response.data);
            setCategoryData(response.data);
        }
    } catch (error) {
        console.log("Somthing went wrong",error);
        toast.error(error.message);
    } finally{
        setLoading(false);
    }
  }

//Fetch categories on component mount
useEffect(()=>{
    fetchCategoryDetails();
},[]);

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">

        {/* Add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button 
            onClick={()=>setOpenAddCategoryModal(true)}
            className="flex items-center cursor-pointer bg-green-100 p-2 rounded-lg text-green-600 font-semibold hover:bg-green-200 hover:text-green-700 transition-all duration-400 ease-in-out">
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* Category list */}
        <CategoryList categories={categoryData}/>

        {/* Adding category modal */}
        <Modal 
          title="Add Category"
          isOpen={openAddCategoryModal}
          onClose={()=>setOpenAddCategoryModal(false)}
          >
          <AddCategoryForm/>
        </Modal >
        {/* updating category modal */}
      </div>
    </Dashboard>
  );
};

export default Category;
