export const checkImage = (file) =>{
    let err="";
    if(!file) return err = "Please select image.";

    if(file.size > 1024 * 1024) // 1megabyte
        err="Image size must be less than 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        err="Image format not correct."

    return err;
}

export const imageUpload = async(images) =>{
    let imgArr = [];
    for(const item of images){
        const formData = new FormData();

        if(item.camera){
            formData.append("file", item.camera);
        }else{
            formData.append("file", item);
        }

        formData.append("upload_preset", "Divyanshu");
        formData.append("cloud_name", "dttij4pqb");

        const res = await fetch("https://api.cloudinary.com/v1_1/dttij4pqb/upload",{
            method:"POST",
            body:formData
        })

        const data = await res.json();
        imgArr.push({public_id: data.public_id, url: data.secure_url});
    }
    return imgArr;
}