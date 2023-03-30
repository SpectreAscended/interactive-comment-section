import { authContext } from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage, auth } from '../../firebase';
import {
  ref,
  uploadBytes,
  list,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import './account.scss';
import { updateProfile } from 'firebase/auth';

const Account: React.FC = () => {
  const { userData } = useContext(authContext);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [img, setImg] = useState<string | null>(null);
  const [displayImg, setDisplayImg] = useState<string | null>(null);
  const uid = userData.uid;

  const imagesListRef = ref(storage, `users/${uid}/userImage/`);
  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `users/${uid}/userImage/${crypto.randomUUID() + imageUpload.name}`
    );
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImg(url);

      const user = auth.currentUser;
      if (user) {
        const foo = await updateProfile(user, { photoURL: url });
        console.log('foo', foo);
      }
    } catch (err) {}
  };
  const imageUploadHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImageUpload(e.currentTarget.files[0]);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      setImg(auth.currentUser?.photoURL);
    }
  }, []);

  const deleteImageHandler = async () => {
    const res = await list(imagesListRef);
    const item = res.items[0].fullPath;
    const itemRef = ref(storage, item);
    deleteObject(itemRef);
    setImg(null);
  };

  return (
    <section className="account">
      <h1 className="account__heading">Edit Account</h1>
      <figure className="account__settings--userImg">
        {img ? <img src={img} alt="" className="image" /> : ''}
      </figure>
      <h2 style={{ marginLeft: '1rem' }}>{userData.userName}</h2>
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
            <span>Delete profile image</span>
            <button
              className="account__settings-link"
              onClick={deleteImageHandler}
            >
              Delete image
            </button>
          </li>
          <li className="account__settings-list--item">
            <span>Profile description</span>
            <Link to="description" className="account__settings-link">
              Edit
            </Link>
          </li>
          <li className="account__settings-list--item">
            <span>Delete Account</span>
            <Link
              to="/delete"
              className="account__settings-link"
              style={{
                backgroundColor: 'darkred',
                color: 'var(--color-white)',
              }}
            >
              Delete Account
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Account;
