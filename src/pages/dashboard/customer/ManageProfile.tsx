import { useState } from "react";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";


const ManageProfile = () => {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // Reset message on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    console.log(formData, "fdata");

    try {
      const response = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      setMessage(response?.message || "Password changed successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset form
    } catch (err: any) {
      setMessage(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>

      {message && <p className={`text-center ${error ? "text-red-500" : "text-green-500"}`}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Old Password</span>
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter old password"
            className="input input-bordered w-full"
            value={formData.oldPassword}
            onChange={handleChange}
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
            value={formData.newPassword}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isLoading}>
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ManageProfile;


// import { useGetAllUserQuery } from "../../../redux/features/admin/adminApi";

// const UserManagement = () => {
//   const { data, error, isLoading } = useGetAllUserQuery(undefined);
//   const [updateUserStatus] = useUpdateUserStatusMutation(); // Mutation hook

//   if (isLoading) return <p className="text-center text-lg">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error fetching users</p>;

//   const handleStatusToggle = async (userId: string, isBlocked: boolean) => {
//     try {
//       await updateUserStatus({ userId, isBlocked: !isBlocked }).unwrap();
//       alert(`User status updated successfully!`);
//     } catch (err) {
//       console.error("Error updating user status:", err);
//       alert("Failed to update user status.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="p-3">#</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.data?.map((user, index) => (
//               <tr key={user._id} className="border-b hover:bg-gray-100">
//                 <td className="p-3">{index + 1}</td>
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3">
//                   {user.isBlocked ? (
//                     <span className="badge badge-error">Deactivated</span>
//                   ) : (
//                     <span className="badge badge-success">Active</span>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleStatusToggle(user._id, user.isBlocked)}
//                     className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-error"}`}
//                   >
//                     {user.isBlocked ? "Activate" : "Deactivate"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;
