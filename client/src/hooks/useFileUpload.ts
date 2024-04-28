import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToDB } from "@/utils/helpers";
import { FileThatHaveNotBeenUploaded } from "@/utils/types";

const UseFileHook = () => {
  const [file, setFile] = useState<FileThatHaveNotBeenUploaded | any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      return;
    }
    if ((file.file_name, file.created_at, file.action)) {
      console.log(file);
      addToDB(file).then((_) => {
        //naviagte ot overview afetr addinng to index db
        navigate("/");
      });
    } else {
      return;
    }
  }, [file]);

  return {
    setFile,
    file,
  };
};

export default UseFileHook;
