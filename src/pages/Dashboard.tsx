import { json, redirect, useLoaderData } from 'react-router-dom';
import { auth } from '../firebase';
import { Comment } from '../types';
import Dashboard from '../components/Dashboard';
import { addComment, deleteComment } from '../utilities/postActions';

const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

const DashboardPage: React.FC = () => {
  const data = useLoaderData() as Comment[];

  return <Dashboard comments={data} />;
};

export default DashboardPage;

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const currentUser = auth.currentUser;

  if (request.method === 'POST') {
    const content = await formData.get('comment-input');
    await addComment(content, currentUser, 'POST');
    return redirect('/');
  }

  if (request.method === 'PATCH') {
    const content = await formData.get('comment-input');
    const commentId = await formData.get('comment-id');
    await addComment(content, currentUser, 'PATCH', commentId);
    return redirect('/');
  }

  if (request.method === 'DELETE') {
    const commentId = await formData.get('comment-id');
    const commentUid = await formData.get('comment-uid');

    await deleteComment(commentId, commentUid, currentUser);
    return redirect('/');
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
