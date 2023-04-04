import { redirect } from 'react-router-dom';
import { auth } from '../firebase';

const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

const currentUser = auth.currentUser;

export const addComment = async (content: string, currentUser: any) => {
  try {
    // const formData = await request.formData();
    // console.log(content);
    // if (!currentUser) {
    //   throw json({ message: 'Must be logged in to post', status: 500 });
    // }

    if (!currentUser) return;
    console.log(currentUser);

    const userData = {
      uid: currentUser.uid,
      email: currentUser.email,
      userName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    };

    const postBody = {
      content: content,
      createdAt: new Date(),
      userData,
      rating: 1,
    };
    console.log(postBody);
    const res = await fetch(`${baseUrl}.json`, {
      method: 'POST',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify(postBody),
    });

    if (!res.ok) {
      throw new Error('Problem posting comment');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const deleteComment = async (
  commentId: string,
  commentUid: string,
  currentUser: any
) => {
  if (!currentUser) return;

  console.log(currentUser.uid, commentUid, commentId);
  if (currentUser.uid !== commentUid) return;

  try {
    const res = await fetch(`${baseUrl}/${commentId}.json`, {
      method: 'DELETE',
    });
    console.log(res);
    if (!res.ok) {
      throw new Error('Problem deleting comment');
    }

    return redirect('/');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
