import { useRef, useState } from "react";
import { FolderBottom, FolderContainer, FolderTop } from "./folder.styled";

import folderLight from "../../assets/folder-light.png";
import folderDark from "../../assets/folder-dark.png";

import optionsLight from "../../assets/options-light.png";
import optionsDark from "../../assets/options-dark.png";

interface Folder {
  folderName: string;
  noOfFiles: number;
  fileSize?: string;
  img: string;
}

const Folder = ({ folderName, noOfFiles, fileSize, img }: Folder) => {
  const folderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <FolderContainer
      ref={folderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FolderTop>
        <img
          src={isHovered ? folderLight : folderDark}
          alt="folder"
          className="folder-file-img"
        />
        <img
          src={isHovered ? optionsLight : optionsDark}
          alt="options"
          className="folder-options"
        />
      </FolderTop>
      <span className="folder-middle">{folderName}</span>
      <FolderBottom>
        <span className="folder-bottom-span">{noOfFiles} files</span>
        <span className="folder-bottom-span">{fileSize}</span>
      </FolderBottom>
    </FolderContainer>
  );
};

export default Folder;
