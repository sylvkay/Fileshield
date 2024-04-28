import { RootState } from "@/redux/store";
import Dashboard from "../dashboard/dashboard";
import Folder from "../folder/folder";
import {
  OverviewBottom,
  OverviewContainer,
  OverviewTop,
  OverviewTopFolders,
} from "./overview.styled";
import { useSelector } from "react-redux";
import { getDataFromDB } from "@/utils/helpers";
import { useEffect, useMemo, useState } from "react";

const Overview = () => {
  const uploadedServerFiles = useSelector(
    (state: RootState) => state.file.uploadedFiles
  );

  const [uploadedLocalFiles, setUploadedLocalFiles] = useState<any[]>([]);

  const getUploadedLocalFiles = async () => {
    try {
      const data = await getDataFromDB();
      setUploadedLocalFiles(data);
    } catch (error) {
      console.error("Error fetching data from the database:", error);
    }
  };

  useEffect(() => {
    getUploadedLocalFiles();
  }, []);

  const providerStatsForServerFiles = useMemo(() => {
    if (!uploadedServerFiles) {
      // Return a default value or handle the case where uploadedServerFiles is null
      return {};
    }
    return uploadedServerFiles.reduce((acc: any, obj: any) => {
      const { cloud_provider, file_size } = obj;
      acc[cloud_provider] = acc[cloud_provider] || {
        count: 0,
        totalFileSize: 0,
      };
      acc[cloud_provider].count++;
      const size = parseFloat(file_size.replace(/[^\d.]/g, ""));
      acc[cloud_provider].totalFileSize += size;
      return acc;
    }, {});
  }, [uploadedServerFiles]);

  const providerStatsForLocalFiles = useMemo(() => {
    return uploadedLocalFiles.reduce(
      (acc: any, obj: any) => {
        const { file_size } = obj;
        const size = parseFloat(file_size.replace(/[^\d.]/g, ""));
        acc.totalFileSize += size;
        acc.fileCount++;
        return acc;
      },
      { totalFileSize: 0, fileCount: 0 }
    );
  }, [uploadedLocalFiles]);

  const folders = [
    {
      folderName: "AWS",
      noOfFiles: providerStatsForServerFiles?.aws?.count || 0,
      fileSize: providerStatsForServerFiles?.aws
        ? `${providerStatsForServerFiles?.aws?.totalFileSize.toFixed(2)} kb`
        : "0 Kb",
      img: "/assets/folder-",
    },
    {
      folderName: "Firebase",
      noOfFiles: providerStatsForServerFiles?.firebase?.count || 0,
      fileSize: providerStatsForServerFiles?.firebase
        ? `${providerStatsForServerFiles?.firebase?.totalFileSize.toFixed(
            2
          )} kb`
        : "0 Kb",
      img: "/assets/folder-",
    },
    {
      folderName: "Local Files",
      noOfFiles: providerStatsForLocalFiles?.fileCount || 0,
      fileSize:
        `${providerStatsForLocalFiles?.totalFileSize.toFixed(2)} kb` || "0 Kb",
      img: "/assets/folder-",
    },
  ];

  return (
    <OverviewContainer>
      <OverviewTop>
        <span>Folders</span>
        <OverviewTopFolders>
          {folders.map((folder, index) => (
            <Folder key={index} {...folder} />
          ))}
        </OverviewTopFolders>
      </OverviewTop>
      <OverviewBottom>
        <Dashboard />
      </OverviewBottom>
    </OverviewContainer>
  );
};

export default Overview;
