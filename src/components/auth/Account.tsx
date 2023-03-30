import { authContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes } from 'firebase/storage';

const Account: React.FC = () => {
  const { userData } = useContext(authContext);
  const [imageUpload, setImageUpload] = useState<any>(null);

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${crypto.randomUUID() + imageUpload.name}`
    );
    try {
      await uploadBytes(imageRef, imageUpload);
      alert('image uploaded');
    } catch (err) {}
  };
  const imageUploadHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImageUpload(e.currentTarget.files[0]);
    }
  };

  return (
    <section className="account">
      <h1 className="account__heading">Edit Account</h1>
      <h2>{userData.userName}</h2>
      <Link to="changepassword">Change Password</Link>
      <form onSubmit={uploadImage}>
        <input type="file" onChange={imageUploadHandler} />
        <button>Upload image</button>
      </form>
    </section>
  );
};

export default Account;
