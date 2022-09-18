import {
  updateArticle,
  uploadArticle,
  uploadCloudinary,
} from "@/services/article";

const imageURL = [
  null,
  "https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/html_fj9543.png",
  "https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829883/css_ihlsda.png",
  "https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/js.png_dvlh4m.jpg",
  "https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/react_jwhlhr.png",
  "https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/nodejs_mpfyor.png",
  "https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/mongodb_eahhma.png",
];
export const languages = [
  {
    _id: 1,
    name: "Html",
  },
  {
    _id: 2,
    name: "Css",
  },
  {
    _id: 3,
    name: "JavaScript",
  },
  {
    _id: 4,
    name: "React",
  },
  {
    _id: 5,
    name: "Node",
  },
  {
    _id: 6,
    name: "이슈",
  },
];
const getImageURL = (id) => {
  return imageURL[id];
};
export const upload = async (
  editor,
  modify,
  title,
  selectedLanguage,
  userId,
  article
) => {
  console.log(editor.root);

  const imgElements = editor.root.querySelectorAll(".image > img");
  const addImgElements = [];
  const imageIds = [];
  const paths = [];
  const removeIds = [...article.imageIds];
  imgElements.forEach((element) => {
    const { id } = element.dataset;
    if (!id) {
      const path = element.src.split("/").pop();
      paths.push(path);
      addImgElements.push(element);
    } else {
      const index = removeIds.indexOf(id);
      if (index > -1) {
        removeIds.splice(index, 1);
        imageIds.push(id);
      }
    }
  });

  let isUpload = Promise.resolve();
  if (addImgElements.length !== 0) {
    const data = {
      userId,
      paths,
    };
    await uploadCloudinary(data)
      .then((response) => {
        addImgElements.forEach((element, index) => {
          const { url, id } = response.data[index];
          const parentElement = element.parentElement;
          parentElement.className = "image";
          element.src = url;
          element.setAttribute("data-id", id);
          imageIds.push(id);
        });
        return Promise.resolve();
      })
      .catch((err) => console.log(err));
  }
  return await isUpload
    .then((response) => {
      const data = {
        writer: userId,
        title,
        data: editor.root.innerHTML,
        category: selectedLanguage,
        thumbnail: getImageURL(selectedLanguage),
        imageIds,
        removeIds,
      };
      console.log(data);
      if (modify) {
        data._id = article._id;
        return updateArticle(data);
      }
      return uploadArticle(data);
    })
    .then(async (response) => {
      return response;
    });
};
