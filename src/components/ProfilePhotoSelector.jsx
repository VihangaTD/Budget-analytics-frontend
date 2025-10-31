import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector=({image,setImage})=>{

    const inputRef = useRef(null);
    const[previewUrl,setPreviewUrl]=useState(null);

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
        e.target.value = null;
    }

    const handleRemoveImage = (e)=>{
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);

        if(inputRef.current){
            inputRef.current.value = null;
        }
    }

    const onChooseFile= (e)=>{
        e.preventDefault();
        inputRef.current?.click();
    }

    return(
        <div className="flex justify-center mb-6">
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-yellow-200 rounded-full relative">
                    <User className="text-yellow-600 size-{35}"/>
                    <button 
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center text-yellow-600 rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <Upload size={15}/>
                    </button>
                </div>
            ):(
                <div className="relative">
                    <img src={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover" />
                    <button 
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <Trash size={15}/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;