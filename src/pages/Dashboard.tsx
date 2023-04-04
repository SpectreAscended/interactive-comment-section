import { json, redirect, useLoaderData } from 'react-router-dom';
import { auth } from '../firebase';
import { Comment } from '../types';
import Dashboard from '../components/Dashboard';

const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

const DashboardPage: React.FC = () => {
  const data = useLoaderData() as Comment[];

  return <Dashboard comments={data} />;
};

export default DashboardPage;

export const action = async ({ request }: any) => {
  try {
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
      content: await data.get('comment-input'),
      createdAt: new Date(),
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

export const loader = async () => {
  try {
    const res = await fetch(`${baseUrl}.json`);
    if (!res.ok) {
      throw json({ message: 'Problem loading comments', status: 500 });
    }
    const data = await res.json();

    if (!data) {
      return null;
    }

    const commentsList = Object.entries(data).map((comment: any) => {
      return { id: comment[0], ...comment[1] };
    });

    return commentsList;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};
