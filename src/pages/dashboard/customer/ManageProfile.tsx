import { useState } from "react";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useUpdateUserInfoMutation } from "../../../redux/features/orders/ordersApi";
import { toast } from "react-toastify";

const ManageProfile = () => {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    gender: "Male",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updateUserInfo({
        userPayload: profileData,
      }).unwrap();
      if(response){
        toast.success("Profile updated successfully")
      }
      console.log("Profile Updated Successfully:", response);
    } catch (err) {
      console.error("Profile Update Failed:", err);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setMessage("All fields are required!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    try {
      const response = await changePassword(passwordData).unwrap();
      setMessage(response?.message || "Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setMessage(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Update Profile</Tab>
          <Tab>Change Password</Tab>
        </TabList>

        <TabPanel>
          <div className="max-w-md mx-auto mt-10 bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Update Profile
            </h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={profileData.gender}
                  onChange={(e) =>
                    setProfileData({ ...profileData, gender: e.target.value })
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-Binary</option>
                  <option>Other</option>
                  <option>Prefer Not to Say</option>
                </select>
              </div>

              <div className="form-control mb-3">
                
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Update Profile
              </button>
            </form>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="max-w-md mx-auto mt-10 bg-base-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Change Password
            </h2>
            {message && (
              <p
                className={`text-center ${
                  error ? "text-red-500" : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Old Password</span>
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Enter old password"
                  className="input input-bordered w-full"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  className="input input-bordered w-full"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="input input-bordered w-full"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ManageProfile;
