import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddFilmModalFormComponent from "../../components/addFilm";

export default function NewReview() {
  const [mainTitle, setMainTitle] = useState("");
  const [filmTitle, setFilmTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [filesUrls, setFilesUrls] = useState([]);
  const [previewFiles, setPreviewFile] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef([]);

  const tagCloud = [
    { title: "The Shashlik Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  const updatePreviewFiles = useCallback(
    (files) => {
      console.log("previewFiles", previewFiles);
      setPreviewFile([...previewFiles, ...files]);
    },
    [previewFiles]
  );

  useEffect(() => {
    console.log("useEffect previewFiles", previewFiles);
  }, [previewFiles]);

  const postFile = async (file) => {
    const url = "https://api.cloudinary.com/v1_1/dpd2rrpsn/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xbwuu5wk");

    return await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.url;
      });
  };

  const uploadFiles = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const res = await postFile(files[i]);
      ref.current = [...ref.current, res];
    }
    console.log("ref.current", ref.current);
    setFilesUrls([...filesUrls, ...ref.current]);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      updatePreviewFiles(files);
      uploadFiles(files);
    },
    [updatePreviewFiles, uploadFiles]
  );

  const {
    fileRejections, // Error files
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    // accept: "image/jpeg,image/png",
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    maxFiles: 3,
  });

  const removeImage = (i) => {
    setPreviewFile(previewFiles.filter((x) => x.name !== i));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const response = await fetch("api/prisma/post", {
    //   method: "POST",
    //   body: JSON,
    // }
    // );
  };

  return (
    <>
      <AddFilmModalFormComponent isOpen={setOpen} isActive={open} />
      <div className="mt-5 flex shadow-md justify-center h-full overflow-scroll">
        <form className="w-3/5" onSubmit={handleSubmit}>
          <div className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="flex flex-col px-4 py-3 sm:py-4">
              <label
                htmlFor="mainTitle"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Название рецензии:
              </label>
              <input
                id="mainTitle"
                name="mainTitle"
                type="text"
                value={mainTitle}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => setMainTitle(event.target.value)}
              />
            </div>
            <div className="flex flex-col px-4 py-3 sm:py-4">
              <label
                htmlFor="filmTitle"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Название фильма:
              </label>
              <Autocomplete
                freeSolo
                c
                className="block w-full mb-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="filmTitle"
                value={filmTitle}
                name="filmTitle"
                disableClearable
                options={tagCloud.map(
                  (option) => option.title + ", " + option.year
                )}
                onChange={(event, newValue) => {
                  setFilmTitle(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    size="small"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                }}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Add new film
              </button>
            </div>

            <div className="flex flex-col px-4 py-3 sm:py-4">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="mb-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Загрузите постер:
                </label>
                <div className=" flex  w-full h-full justify-center items-center bg-white px-2">
                  <div className="p-3 w-full h-full flex flex-col justify-center items-center rounded-md">
                    <div
                      {...getRootProps({
                        role: "button",
                      })}
                      className="w-full h-40 overflow-hidden shadow-md border-2 justify-center items-center rounded-md cursor-pointer  text-black border-gray-400 border-dotted"
                    >
                      <input
                        {...getInputProps()}
                        type="file"
                        className="flex h-full w-full items-center justify-center"
                        multiple={true}
                      />
                      {isDragActive ? (
                        <p className=" h-full w-full bg-gray-50 text-md text-green-500 flex justify-center items-center top-0">
                          Drop your media files here
                        </p>
                      ) : (
                        <p className=" h-full w-full bg-gray-50  text-sm flex justify-center items-center top-0">
                          Drag and drop some files here, or click to select
                          files
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {previewFiles.map((file, key) => {
                        return (
                          <div
                            key={key}
                            className="w-full h-16 flex items-center justify-between rounded p-3 bg-gray-100"
                          >
                            <div className="flex flex-row items-center gap-2">
                              <div className="h-12 w-12 ">
                                <img
                                  className="w-full h-full rounded"
                                  src={file.preview}
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

            <div className="min-h-32 flex flex-col items-center justify-center px-4 py-3 sm:py-4">
              <label
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
                htmlFor="reviewText"
              >
                Текст рецензии:
              </label>
              <textarea
                id="title"
                type="text"
                rows={5}
                value={reviewText}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => setReviewText(event.target.value)}
              ></textarea>

              <Autocomplete
                multiple
                id="tags-outlined"
                className="border-none hover:border-none rounded-md bg-transparent py-1.5 focus:ring-0 active:border-none sm:text-sm sm:leading-6  w-full"
                options={tagCloud}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Добавьте #тег" />
                )}
              />
            </div>
            <div className="flex flex-col px-4 py-1 sm:p-4">
              <label
                htmlFor="rating"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Оценка:
              </label>
              <div className="flex justify-center items-center">
                <Rating
                  name="customized-10"
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  max={10}
                  defaultValue={0}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <div className="flex justify-center  w-full border-1 border-gray-200 ">
                <p className="text-white font-md w-8 shadow-md bg-yellow-400 border rounded-full text-center">
                  {rating}
                </p>
              </div>
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
    </>
  );
}
