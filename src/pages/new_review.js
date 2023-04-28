import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function NewReview() {
  const [title, setTitle] = useState("");
  const [filmTitle, setFilmTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //здесь нужен код для добавления рецензии в бд через призму
  };



  return (
    <div className="mt-5 flex justify-center w-full h-full overflow-scroll">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="flex flex-col px-4 py-3 sm:py-4">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Название рецензии:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="flex flex-col px-4 py-3 sm:py-4">
            <label
              htmlFor="bookTitle"
              className="mb-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Название фильма:
            </label>
            <input
              id="FilmTitle"
              type="text"
              value={filmTitle}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => setFilmTitle(event.target.value)}
            />
          </div>
          <div className="flex flex-col px-4 py-3 sm:py-4">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Загрузите постер:
              </label>
              <div className=" flex w-full justify-center items-center bg-white px-2">
                <div className="p-3 w-full rounded-md">
                  <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">
                    {message}
                  </span>
                  <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer  text-black border-gray-400 border-dotted">
                    <input
                      type="file"
                      onChange={handleFile}
                      className="h-full w-full opacity-0 z-10 absolute"
                      multiple="multiple"
                      name="files[]"
                    />
                    <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                      <div className="flex flex-col">
                        <i className="mdi mdi-folder-open text-[30px] text-black text-center"></i>
                        <span className="text-[12px]">{`Drag and Drop a file`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {files.map((file, key) => {
                      return (
                        <div
                          key={key}
                          className="w-full h-16 flex items-center justify-between rounded p-3 bg-gray-100"
                        >
                          <div className="flex flex-row items-center gap-2">
                            <div className="h-12 w-12 ">
                              <img
                                className="w-full h-full rounded"
                                src={URL.createObjectURL(file)}
                              />
                            </div>
                            <span className="text-black truncate w-44">
                              {file.name}
                            </span>
                          </div>
                          <div
                            onClick={() => {
                              removeImage(file.name);
                            }}
                            className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm"
                          >
                            <i className="mdi mdi-trash-can text-white text-[14px]">
                              X
                            </i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-full flex flex-col px-4 py-3 sm:py-4">
            <label
              className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              htmlFor="reviewText"
            >
              Текст рецензии:
            </label>
            <ReactQuill
              className="text-black"
              modules={modules}
              formats={formats}
              theme="snow"
            />
          </div>

          <div className="flex flex-col px-4 py-1 sm:p-4">
            <label
              htmlFor="rating"
              className="mb-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Оценка:
            </label>
            <input
              id="rating"
              type="range"
              min="0"
              max="10"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />

            <p className="text-black w-full text-center">{rating}</p>
          </div>
          <div className="flex justify-center px-4 py-3 sm:py-4">
            <button
              className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              type="submit"
            >
              Опубликовать рецензию
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
