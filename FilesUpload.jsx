import { useState } from "react";
import { useDropzone } from 'react-dropzone'; //npm i react-dropzone
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome" //npm i @fortawesome/react-fontawesome
import { faFile, faXmarkCircle } from "@fortawesome/free-regular-svg-icons" //npm i @fortawesome/free-regular-svg-icons
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons" //npm i @fortawesome/free-solid-svg-icons

export default function FilesUpload() {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if(acceptedFiles.length > 0) {
                let filesArr = []; 
                acceptedFiles.forEach(file => {
                    if(file.type.split("/")[0] === "image" || file.type === "application/pdf") {
                        filesArr.push(file);
                    }
                });
                setFiles([...files, ...filesArr]);
            }
        },
      });

    const handleDelete = (index) => {
        let newFileArr = files.filter((e, i) => i !== index);
        setFiles([...newFileArr]);
    }

    return <>
        <div className="w-[400px] bg-white rounded-xl p-2 shadow-[0_1px_10px_rgb(0,0,0,0.12)] ">
            <div className="w-full h-[280px] bg-white shadow-[0_1px_10px_rgb(0,0,0,0.05)] rounded-xl relative ">
                <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2  w-full h-full p-10">
                    <div {...getRootProps()} className="w-full h-full flex justify-center content-center">
                        <input {...getInputProps()} />
                        <div role={"button"} className="rounded-xl bg-gray-100 outline-none w-full h-full border-4 border-dashed text-gray-400 hover:text-gray-500 flex justify-center content-center">
                            <div className="mt-10 text-center">
                                <FontAwesomeIcon icon={faCloudArrowUp} className="text-6xl"/>
                                <br/>
                                <br/>
                                <p>วาง หรือ คลิกที่นี่</p>
                                <p>เพื่อเพิ่มเอกสาร</p>
                            </div>
                        </div> 
                    </div>
                </div>       
            </div>
            <div className="w-full h-max bg-white mt-4">
                {files[0] &&
                    files?.map((e, i) => 
                        <div key={i} className="w-full h-max flex justify-between content-center rounded-md bg-gray-100 p-5 mt-2">
                                <a key={i} target="_blank" href={URL.createObjectURL(e)} className="flex my-auto text-gray-400 hover:text-black font-normal">
                                    <div className="mx-2"><FontAwesomeIcon icon={faFile} className="text-xl"/></div>
                                    <p className="text-start mx-2">
                                        {e.name.length > 20? e.name.slice(0,19) + " ..." : e.name}
                                    </p>
                                </a>
                            <div role={"button"} className="text-gray-400 text-xl hover:text-red-400" onClick={() => handleDelete(i)}><FontAwesomeIcon icon={faXmarkCircle}/></div>
                        </div>   
                    )
                }

                <div role={"button"} style={{pointerEvents: files[0]? "" : "none"}} className={`w-full h-max flex justify-between content-center rounded-lg ${files[0]? "bg-blue-500" : "bg-gray-100 text-gray-300"} hover:bg-blue-800 p-3 mt-4 `}>
                    <p className="text-center m-auto">
                        อัพโหลดเอกสาร
                    </p>    
                </div> 
            </div>
        </div>   
    </>
}