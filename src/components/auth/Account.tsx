import { authContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Account: React.FC = () => {
  const { userData } = useContext(authContext);

  return (
    <section className="account">
      <h1 className="account__heading">Edit Account</h1>
      <h2>{userData.userName}</h2>
      <Link to="changepassword">Change Password</Link>
    </section>
  );
};

export default Account;
