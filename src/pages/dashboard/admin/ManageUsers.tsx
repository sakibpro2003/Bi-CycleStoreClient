import { useGetAllUserQuery } from "../../../redux/features/admin/adminApi";

const UserManagement = () => {
  const { data, error, isLoading } = useGetAllUserQuery(undefined);
  console.log(data, "dataaaaaaaaa");

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching users</p>;

  const handleStatusToggle = (userId: string, isBlocked: boolean) => {
    // Implement the API call to update user status here
    console.log(
      `User ID: ${userId}, New Status: ${
        !isBlocked ? "Deactivated" : "Activated"
      }`
    );
    alert(
      `User ID: ${userId} status will be changed to ${
        !isBlocked ? "Deactivated" : "Activated"
      }`
    );
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
            {data?.data?.map((user, index) => (
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
                    className={`btn btn-sm ${
                      user.isBlocked ? "btn-success" : "btn-error"
                    }`}
                  >
                    {user.isBlocked ? "Activate" : "Deactivate"}
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
