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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user:TShowUser, index:string) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.isBlocked ? (
                    <span className="badge badge-error">Deactivated</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(user._id, user.isBlocked)}
                    className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-error"} ${
                      loadingUserId === user._id ? "btn-disabled" : ""
                    }`}
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

