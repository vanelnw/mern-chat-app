import React, {useState,useRef} from 'react'

const FileUpload = ({onFileSelect}) => {
  const fileInput = useRef(null)
  const [previewImage, setPreviewImage] = useState();



    const handleFileInput = (e) => {
        // handle validations
      const file = e.target.files[0];
      const pre = URL.createObjectURL(file);
      setPreviewImage(pre)
      onFileSelect(file)
      console.log(file)
    }

  return (
    <div className="file-uploader" style={{display:"flex" }}>
      <input type="file" onChange={handleFileInput} style={{ width:"50%" }}/>
      {previewImage && (
          <div>
          <img
            className="preview"
            accept="image/*"
            src={previewImage}
            alt=""
            style={{ height: "40px" }} />
          </div>
        )}
    </div>
  )
}

export default FileUpload