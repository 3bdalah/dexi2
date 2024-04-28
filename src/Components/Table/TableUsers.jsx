import { Suspense, lazy, useState, useEffect, useRef } from "react";
import "./Table.css";
const Card = lazy(() => import("../CardPopUp/CardPop"));

function TableUsers() {
  const [showPopup, setShowPopup] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoading] = useState(false);

  const titles = ["developer", "engineer", "designer", "driver", "doctor"];

  const roles = ["Admin", "Member", "Owner"];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&results=5`
    );

    const data = await response.json();

    const mappedUsers = data.results.map((result, index) => ({
      id: index + 1,
      name: `${result.name.first} ${result.name.last}`,
      email: result.email,
      picture: result.picture.medium,
      status: "active",
      title: titles[Math.floor(Math.random() * titles.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
    }));

    setUsers((prevUsers) => [...prevUsers, ...mappedUsers]);
    setLoading(false);
  };

  const loadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
    fetchData();
    setLoading(false);
  };

  const handleEditClick = (user) => {
    setEditedUser(user);
    setShowPopup(true);
  };

  const handleSave = (formData) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? { ...user, ...formData } : user
    );
    setUsers(updatedUsers);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const initialFetchRef = useRef(false);
  useEffect(() => {
    if (!initialFetchRef.current) {
      fetchData();
      initialFetchRef.current = true;
    }
  }, [fetchData]);
  console.log("users,", users);
  return (
    <div className="table-users">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {load && <h4>....loading</h4>}
          {users.map((user) => (
            <tr key={user.id}>
              <td name="username" className="img_with_name">
                {" "}
                <img src={user.picture} alt="user aimge" />{" "}
                <p>
                  <span>{user.name}username</span>
                  <span className="useremail">{user.email}</span>
                </p>
              </td>
              <td name="user title" className="usertitle">
                <span>just dummey long title</span>
                <span>{user.title}</span>
              </td>
              <td name="userstatus" className="userStatus">
                <span>{user.status}</span>
              </td>

              <td name="user email" className="userRole">
                {user.role}
              </td>
              <td>
                <span
                  tabIndex={0}
                  name="button-edit"
                  className="btn-edit"
                  onClick={() => handleEditClick(user)}
                >
                  edit
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close" onClick={handleCancel}>
              close
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              <Card onSave={handleSave} user={editedUser} />
            </Suspense>
          </div>
        </div>
      )}

      <div className="div-loadmore">
        <button className="more" onClick={loadMore}>
          {load ? <h4>....loading</h4> : "load more"}
        </button>
      </div>
    </div>
  );
}

export default TableUsers;
