import { useGetAllUserQuery, useChangeUserStatusMutation } from "../../../redux/features/admin/adminApi";
import { useState } from "react";
import { toast } from "react-toastify"; // Import a toast library (optional)
import { TShowUser } from "./types/showUser.type";

const UserManagement = () => {
  const { data, error, isLoading, refetch } = useGetAllUserQuery(undefined);
  const [changeUserStatus, { isLoading: isUpdating }] = useChangeUserStatusMutation();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null); // Track which user is updating

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isUpdating) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching users</p>;

  const handleStatusToggle = async (userId: string, isBlocked: boolean) => {
    setLoadingUserId(userId); // Set loading state for this user

    try {
      const response = await changeUserStatus({ userId, isBlocked: !isBlocked }).unwrap();
      if(response){
        toast.success(`User ${!isBlocked ? "deactivated" : "activated"} successfully`);
      }
      refetch(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setLoadingUserId(null); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white text-black shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 border-b-4 border-yellow-500 pb-2">User Management</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border border-yellow-500 shadow-md">
          <thead>
            <tr className="bg-yellow-500 text-black">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user:TShowUser, index:number) => (
              <tr key={user._id} className="border-b hover:bg-yellow-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.isBlocked ? (
                    <span className="px-2 py-1 text-sm font-semibold bg-red-500 text-white rounded">Deactivated</span>
                  ) : (
                    <span className="px-2 py-1 text-sm font-semibold bg-green-500 text-white rounded">Active</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(user._id, user.isBlocked)}
                    className={`btn btn-sm ${user.isBlocked ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white font-bold px-3 py-1 rounded transition duration-300 shadow-lg ${loadingUserId === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loadingUserId === user._id} // Disable button while updating
                  >
                    {loadingUserId === user._id ? "Processing..." : user.isBlocked ? "Activate" : "Deactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
