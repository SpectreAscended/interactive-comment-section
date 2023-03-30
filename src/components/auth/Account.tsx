import { authContext } from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import './account.scss';

const Account: React.FC = () => {
  const { userData } = useContext(authContext);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  const imagesListRef = ref(storage, 'images/');
  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${crypto.randomUUID() + imageUpload.name}`
    );
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageList(prev => [...prev, url]);
    } catch (err) {}
  };
  const imageUploadHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImageUpload(e.currentTarget.files[0]);
    }
  };
  console.log(imageList);
  useEffect(() => {
    listAll(imagesListRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImageList(prevList => [...prevList, url]);
        });
      });
    });
  }, []);

  return (
    <section className="account">
      <h1 className="account__heading">Edit Account</h1>
      <h2>{userData.userName}</h2>
      <div className="account__settings">
        <ul className="account__settings-list">
          <li className="account__settings-list--item">
            <span>Password</span>
            <Link to="changepassword" className="account__settings-link">
              Change Password
            </Link>
          </li>
          <li className="account__settings-list--item">
            <span>Profile Image</span>
            <form onSubmit={uploadImage} className="account__settings-form">
              <label htmlFor="profile-image" className="account__settings-link">
                <input
                  type="file"
                  id="profile-image"
                  accept="image/gif, image/jpeg, image/webp, image/bmp"
                  onChange={imageUploadHandler}
                  style={{ display: 'none' }}
                />
                Choose image
              </label>

              <button
                className="account__settings-link account__settings-link--primary"
                disabled={!imageUpload}
              >
                Upload image
              </button>
            </form>
          </li>
          <li className="account__settings-list--item">
            <span>Profile description</span>
            <Link to="description" className="account__settings-link">
              Edit
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Account;
