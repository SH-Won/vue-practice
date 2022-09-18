import { uploadImageMulter } from "@/services/article";
import Quill from "quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "code-block"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquoto",
  "list",
  "bullet",
  "image",
  "code-block",
];

export const options = {
  modules,
  formats,
};
const BlockEmbed = Quill.import("blots/block/embed");
export class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.classList.add("image");
    const img = document.createElement("img");
    img.setAttribute("src", value.url);
    img.setAttribute("data-id", value.id);
    node.appendChild(img);
    return node;
  }
  static value(node) {
    return {
      id: node.firstChild.getAttribute("data-id"),
      url: node.firstChild.getAttribute("src"),
    };
  }
}
ImageBlot.blotName = "image";
ImageBlot.tagName = "figure";
Quill.register(ImageBlot);

export const uploadMulter = (quill) => {
  const editor = quill;
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", "");
  input.setAttribute("accept", "image/*");
  input.style.fontSize = "16px";
  input.style.display = "none";
  const editorRoot = document.querySelector(".ql-container.ql-snow");
  editorRoot.appendChild(input);

  // IOS 의 경우 실제 input 이 웹 DOM 어딘가에 존재해야 change가 trigger 됨
  input.addEventListener("change", async () => {
    const formData = new FormData();
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    console.log(formData);
    console.log(files);
    const response = await uploadImageMulter(formData);

    if (response.success) {
      const { data } = response;
      const range = editor.getSelection();

      let index = range?.index;
      data.forEach(({ url }) => {
        const value = {
          url: `http://localhost:5000${url}`,
          id: "",
        };
        editor.insertEmbed(index++, "image", value);
      });
      editor.setSelection(++index, 0);
    }
    editorRoot.removeChild(input);
  });
  input.click();
};
