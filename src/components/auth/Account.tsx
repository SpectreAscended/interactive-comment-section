import { authContext } from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage, auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import {
  ref,
  uploadBytes,
  list,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import Modal from '../UI/Modal';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { uiActions } from '../../store/uiSlice';
import { useAppSelector } from '../../hooks/stateHooks';
import { AnimatePresence } from 'framer-motion';
import './account.scss';

// TODO add error handling

const Account: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { userData, updateUserImage } = useContext(authContext);
  const [imageUpload, setImageUpload] = useState<Blob | null>(null);
  const [img, setImg] = useState<string | null>(null);
  const uid = userData.uid;

  const dispatch = useDispatch();
  const modalOpen = useAppSelector(state => state.ui.modalOpen);

  useEffect(() => {
    if (auth.currentUser) {
      setImg(auth.currentUser?.photoURL);
    } else {
      setImg(null);
    }
  }, [auth.currentUser]);

  const deleteImage = async () => {
    try {
      if (error) {
        setError(null);
      }
      const res = await list(imagesListRef);
      const item = res.items[0].fullPath;
      const itemRef = ref(storage, item);
      deleteObject(itemRef);
      updateUserImage('');
      setImg(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
      setError('Problem deleting image.');
    }
  };

  const imagesListRef = ref(storage, `users/${uid}/userImage/`);
  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) {
      setError(null);
    }

    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `users/${uid}/userImage/${crypto.randomUUID() + imageUpload.name}`
    );
    try {
      if (img != null) {
        deleteImage();
      }

      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImg(url);

      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { photoURL: url });
        updateUserImage(url);
      }
      setImageUpload(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
      setError('Problem uploading image.');
    }
  };

  const imageUploadHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImageUpload(e.currentTarget.files[0]);
    }
  };

  const proceedPromptHandler = async () => {
    deleteImage();
    dispatch(uiActions.closeModal());
  };

  const deleteImageHandler = async () => {
    dispatch(uiActions.openModal());
  };

  return (
    <section className="account">
      <AnimatePresence initial={false} mode="sync">
        {modalOpen && (
          <Modal
            title="Delete Image"
            message="Are you sure?"
            onSecondary={() => {
              dispatch(uiActions.closeModal());
            }}
            onPrimary={proceedPromptHandler}
          />
        )}
      </AnimatePresence>
      <h1 className="account__heading">Edit Account</h1>
      {error && <p className="error-message">{error}</p>}
      <aside className="account__settings--user-profile">
        <figure className="account__settings--userImg">
          {img ? (
            <img
              src={img}
              alt={`${userData.userName} profile image`}
              className="image"
            />
          ) : (
            ''
          )}
        </figure>
        <h3>{userData.userName}</h3>
      </aside>
      <div className="account__settings">
        <ul className="account__settings-list">
          <li className="account__settings-list--item" title="Change password">
            <span>Password</span>
            <Link to="changepassword" className="account__settings-link">
              Change Password
            </Link>
          </li>
          <li
            className="account__settings-list--item"
            title="Click upload image to set your user image"
          >
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
                {img ? 'Change' : 'Choose'} image
              </label>

              <button
                className="account__settings-link account__settings-link--primary"
                disabled={!imageUpload}
              >
                Upload image
              </button>
            </form>
          </li>
          <li
            className="account__settings-list--item"
            title="Delete your profile image"
          >
            <span>Delete Profile Image</span>
            <button
              className="account__settings-link"
              disabled={img == null}
              onClick={deleteImageHandler}
            >
              Delete image
            </button>
          </li>
          <li
            className="account__settings-list--item"
            title="Write a short biography about yourself"
          >
            <span>Profile Description</span>
            <Link to="description" className="account__settings-link">
              Edit
            </Link>
          </li>
          <li
            className="account__settings-list--item"
            title="Delete your account. Warning: This can not be undone"
          >
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
