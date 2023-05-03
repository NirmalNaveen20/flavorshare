export const uploadToCloudnary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "favorfeed");
    data.append("cloud_name", "dlvsulz8t");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlvsulz8t/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const fileData = await res.json();
    console.log("url : ", fileData.url.toString());
    return fileData.url.toString();
    
  } else {
    console.log("error");
  }
};
