import multer from "multer"



export const FileUpload = () => {
    const storage = multer.diskStorage({})

    function fileFilter(req, file, cb) {
        if(file.mimetype.startsWith("image")){
            cb(null, true)
        }else{
            cb(null, false)
        }
        
    }
    const upload = multer({ storage: storage ,fileFilter})
    return upload.single("path")
}

