export const uploadImage = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "insta-clone");
  data.append("cloud_name", "radheshyam11");

  let result;

  await fetch("https://api.cloudinary.com/v1_1/radheshyam11/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      return error;
    });

  return result;
};
