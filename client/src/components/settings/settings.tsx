import React, { useEffect, useState } from "react";
import InputField from "../inputField/inputField.tsx";
import {
  SettingsContainer,
  SettingsInnerContainer,
  SettingsInputContainer,
} from "./settings.styled";

import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";

//import from react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { ChangeUserPassword } from "@/redux/slices/authSlice.ts";

import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  //get error from state
  const changePasswordError = useSelector(
    (state: RootState) => state.auth.changePasswordError
  );

  //check if there is error and toast the error for users
  useEffect(() => {
    if (changePasswordError) {
      toast.error(changePasswordError, {
        position: "top-right", // Adjust position if needed
      });
    }
  }, [changePasswordError]);

  ///declaring dispatch
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Password do not match", {
        position: "top-right", // Adjust position if needed
      });
      return;
    }

    if (formData.newPassword.length === 0) {
      toast.error("Please input new password", {
        position: "top-right", // Adjust position if needed
      });
      return;
    }

    const result = await dispatch(ChangeUserPassword(formData));

    if (result.type === "auth/change-password/fulfilled") {
      toast.success("Password successfully changed", {
        position: "top-right", // Adjust position if needed
      });

      navigate("/");
    }
  };

  return (
    <SettingsContainer>
      <SettingsInnerContainer>
        <span>Change Username</span>

        <SettingsInputContainer>
          <InputField
            value={formData.oldPassword}
            name="oldPassword"
            placeholder="Old Password"
            label="Old Password"
            onChange={handleChange}
            type="password"
          />
          <InputField
            value={formData.newPassword}
            name="newPassword"
            placeholder="New password"
            label="New Password"
            onChange={handleChange}
            type="password"
          />
          <InputField
            value={formData.confirmNewPassword}
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            label="Confirm New Password"
            onChange={handleChange}
            type="password"
          />
        </SettingsInputContainer>

        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </SettingsInnerContainer>
    </SettingsContainer>
  );
};

export default Settings;
