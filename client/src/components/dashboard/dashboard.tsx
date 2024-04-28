//imports from react
import { useEffect, useState } from "react";

//import File from file folder
import File from "../File/file";

//imports from the store
import { AppDispatch, RootState } from "@/redux/store";

//imports from react-redux
import { useDispatch, useSelector } from "react-redux";

//import styles from the styled file
import {
  DashbaordBottom,
  DashboardContainer,
  DashboardTableContent,
  DashboardTableHeader,
  DashboardTop,
} from "./dashboard.styled";

//importing actions from file slice
import {
  getUserFiles,
  removeEncryptedFileFromState,
  removeUploadedFileFromState,
} from "@/redux/slices/fileSlice";

//importing util functions from helper.js
import { getDataFromDB } from "@/utils/helpers";

const Dashboard = () => {
  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //files from indexDB
  const [filesFromIndexedDB, setFilesFromIndexedDB] = useState<any[]>([]);

  //foundFiles from search
  const [foundFiles, setFoundFiles] = useState<any>(null);
  //files from server
  const uplaodedFiles = useSelector(
    (state: RootState) => state.file.uploadedFiles
  );

  //get search query from state
  const searchQuery = useSelector((state: RootState) => state.file.searchQuery);

  useEffect(() => {
    if (!searchQuery || searchQuery.length === 0) {
      setFoundFiles(null);

      return;
    }

    const allFiles = [...uplaodedFiles, ...filesFromIndexedDB];

    const foundFiles = allFiles.filter((file: any) => {
      return file.file_name.toLowerCase().includes(searchQuery?.toLowerCase());
    });

    if (foundFiles.length > 0) {
      setFoundFiles(foundFiles);
    } else {
      setFoundFiles(null);
    }
  }, [searchQuery, filesFromIndexedDB, uplaodedFiles]);

  //declaring dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  //get the user files from state
  let userFiles: any = useSelector(
    (state: RootState) => state.file.uploadedFiles
  );

  useEffect(() => {
    if (userFiles) {
      setIsLoading(false);
    }
  }, [userFiles]);

  useEffect(() => {
    //remove decrypted file from state
    dispatch(removeEncryptedFileFromState());

    //get list of user files, if authenticated
    dispatch(getUserFiles());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Getting files that haven't been stored in the cloud
      const filesFromIndexDB = await getDataFromDB();

      setFilesFromIndexedDB(filesFromIndexDB);
    };

    fetchData();
  }, [userFiles]);

  return (
    <>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <DashboardContainer>
          <DashboardTop>
            <span className="big-text">Uploaded Files</span>
            <span className="small-text">Files that have been uploaded</span>
          </DashboardTop>
          <DashbaordBottom>
            <DashboardTableHeader>
              <ul>
                <li className="file-name">File name</li>
                <li className="file-size">File size</li>
                <li className="date-uploaded">Date uploaded</li>
                <li className="action">Action</li>
                <li className="action">Downlaod</li>
              </ul>
            </DashboardTableHeader>
            <DashboardTableContent>
              {foundFiles ? (
                <>
                  <span className="table-indicator">Found Files</span>
                  {foundFiles.map((data: any, index: number) => {
                    return (
                      <File
                        {...data}
                        key={index}
                        hasBeenUploadedToCloud={!data?.action}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <>
                    <span className="table-indicator">Cloud Files</span>
                    {userFiles.map((data: any, index: number) => {
                      return <File {...data} key={index} />;
                    })}
                  </>
                  <>
                    <span className="table-indicator">Local Files</span>

                    {filesFromIndexedDB.map((data: any, index: number) => {
                      return (
                        <File
                          {...data}
                          hasBeenUploadedToCloud={false}
                          key={index}
                        />
                      );
                    })}
                  </>
                </>
              )}
            </DashboardTableContent>
          </DashbaordBottom>
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;
