import { useFormAction, json, redirect } from 'react-router-dom';
import { auth } from '../firebase';
import CommentList from '../components/CommentList';

const CommentSectionPage: React.FC = () => {
  return <CommentList />;
};

export default CommentSectionPage;

export const action = async ({ request }: any) => {
  try {
    const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;
    const data = await request.formData();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw json({ message: 'Must be logged in to post', status: 500 });
    }

    const userData = {
      uid: currentUser.uid,
      email: currentUser.email,
      userName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    };

    const postBody = {
      commentBody: await data.get('comment-input'),
      date: new Date(),
      userData,
      rating: 1,
    };

    const res = await fetch(`${baseUrl}.json`, {
      method: 'POST',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify(postBody),
    });

    if (!res.ok) {
      throw json({ message: 'Problem posting comment', status: 500 });
    }

    return redirect('/');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
