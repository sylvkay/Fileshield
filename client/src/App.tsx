//import react
import React, { useEffect } from "react";

//react router imports
import { Routes, Route, Navigate } from "react-router-dom";

//importing various components
import Login from "./components/login/login";
import BaseLayout from "./layouts/baseLayout/baseLayout";
import Dashboard from "./components/dashboard/dashboard";
import FileUpload from "./components/fileUpload/fileUpload";
import Overview from "./components/overview/overview";
import EncryptionDecryption from "./components/encryptionDecryption/encryptionDecryption";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Signup from "./components/signup/signup";
import { openDB } from "idb";
import { ToastContainer } from "react-toastify";
import Settings from "./components/settings/settings";

//declaration
const App: React.FC = () => {
  //initializing indexedDB
  //   initialize db if it hasnt been before
  useEffect(() => {
    const initializeDB = async () => {
      const db = await openDB("FileShield", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("UnuploadedFileArray")) {
            db.createObjectStore("UnuploadedFileArray", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
    };

    initializeDB(); // Await or handle the promise returned by initializeDB
  }, []);

  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="/"
            element={user ? <Overview /> : <Navigate to="/login" />}
          />
          <Route
            path="/record-management"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/file-upload"
            element={user ? <FileUpload /> : <Navigate to="/login" />}
          />
          <Route
            //FIXME - give better name for STATUS
            path="/decryption-encryption/:status/:hasBeenUploadedToCloud"
            element={user ? <EncryptionDecryption /> : <Navigate to="/login" />}
          />
          <Route
            //FIXME - give better name for STATUS
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
