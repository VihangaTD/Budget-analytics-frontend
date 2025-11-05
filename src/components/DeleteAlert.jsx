import { Loader, LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert=({content,onDelete})=>{

    const[loading,setLoading] = useState(false);
    
    const handleDelete = async()=>{
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="mr-1 flex py-1 px-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 duration-200 ease-in-out transition-all cursor-pointer"
                >
                    {loading ?(
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin"/>
                            Deleting..
                        </>
                    ):(
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;