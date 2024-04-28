import { createSlice } from "@reduxjs/toolkit/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface UploadedFile {
  fileName: string;
  cloudUrl: string;
}
interface FileThatHaveNotBeenUploaded {
  file: File;
  fileName: string;
  date: string;
  size: string;
  action: string;
}

interface InitalState {
  isSuccess: boolean;
  isLoading: boolean;
  uploadedFile: UploadedFile | null;
  uploadedFiles: UploadedFile[];

  fileToBeDecrypted: any;
  encryptedFile: any;

  fileThatHaveNotBeenUplaoded: FileThatHaveNotBeenUploaded[];
  tempFile: FileThatHaveNotBeenUploaded | null;

  searchedFiles: any[];
  searchQuery: string | null;
}

const initialState: InitalState = {
  isLoading: false,
  isSuccess: false,
  uploadedFile: null,
  uploadedFiles: [],
  fileToBeDecrypted: null,

  encryptedFile: null,

  //file that have not been uploaded
  fileThatHaveNotBeenUplaoded: [],
  //temp file that will be appended to uploadedFiles
  tempFile: null,
  searchedFiles: [],
  searchQuery: null,
};

export const uploadFile = createAsyncThunk(
  "/file,uploadFile",
  async (
    { file, fileName, cloud_provider, encryption_method, file_size }: any,
    { getState }
  ) => {
    try {
      const token = (getState() as RootState).auth.user?.token;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("cloud_provider", cloud_provider);
      formData.append("encryption_method", encryption_method);
      formData.append("file_size", file_size);

      console.log(formData);

      const response = await axios.post(
        "http://localhost:8000/api/v1/file/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `authorization ${token}`,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error uploading file:", error);
      throw error; // Rethrow the error to be caught by the calling code
    }
  }
);

export const getUserFiles = createAsyncThunk(
  "/file/getUserFiles",
  async (_, { getState }) => {
    // Use getState to access the Redux state
    const token = (getState() as RootState).auth.user?.token; // Assuming the token is stored in auth.user.token

    if (!token) {
      throw new Error("Token not found in state");
    }

    try {
      const response = await axios.get("http://localhost:8000/api/v1/file/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Corrected token format
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user files:", error);
      throw error;
    }
  }
);

export const getFile = createAsyncThunk(
  "file/getFile",
  async (id: number, { getState }) => {
    const token = (getState() as RootState).auth.user?.token;

    const response = await axios.get(
      `http://localhost:8000/api/v1/file/${id}`,
      {
        headers: {
          authorization: `authorization ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data;
  }
);

export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async (id: number, { getState }) => {
    const token = (getState() as RootState).auth.user?.token;

    const response = await axios.delete(
      `http://localhost:8000/api/v1/file/${id}`,
      {
        headers: {
          authorization: `authorization ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data;
  }
);

export const fileSlice = createSlice({
  name: "fileSlice",
  initialState,
  reducers: {
    setFileToBeDecrypted: (state, action) => {
      state.fileToBeDecrypted = action.payload;
    },
    removeUploadedFileFromState: (state) => {
      state.uploadedFile = null;
      console.log("deleted file from state", state.uploadedFile);
    },
    removeEncryptedFileFromState: (state) => {
      state.encryptedFile = null;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(uploadFile.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uploadedFile = action.payload;
      })
      .addCase(uploadFile.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getUserFiles.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getUserFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uploadedFiles = action.payload;
      })
      .addCase(getUserFiles.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getFile.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.encryptedFile = action.payload;
      })
      .addCase(getFile.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.uploadedFile = action.payload;
      });
  },
});

export const {
  setFileToBeDecrypted,
  removeUploadedFileFromState,
  removeEncryptedFileFromState,
  setSearchQuery,
} = fileSlice.actions;

export default fileSlice.reducer;
