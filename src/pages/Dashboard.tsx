import { json, redirect, useNavigate, useLoaderData } from 'react-router-dom';
import { auth } from '../firebase';
import { Comment } from '../types';
import Dashboard from '../components/Dashboard';
import { addComment } from '../utilities/postActions';

const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

const DashboardPage: React.FC = () => {
  const data = useLoaderData() as Comment[];

  return <Dashboard comments={data} />;
};

export default DashboardPage;

export const action = async ({ request }: any) => {
  console.log(request);
  const formData = await request.formData();
  const content = await formData.get('comment-input');
  const currentUser = auth.currentUser;

  if (request.method === 'POST') {
    await addComment(content, currentUser);
    return redirect('/');
  }

  // if (request.method === 'DELETE') {
  //   deleteComment(formData);
  // }

  // try {
  //   const formData = await request.formData();
  //   const currentUser = auth.currentUser;
  //   if (!currentUser) {
  //     throw json({ message: 'Must be logged in to post', status: 500 });
  //   }

  //   const userData = {
  //     uid: currentUser.uid,
  //     email: currentUser.email,
  //     userName: currentUser.displayName,
  //     photoURL: currentUser.photoURL,
  //   };

  //   const postBody = {
  //     content: await formData.get('comment-input'),
  //     createdAt: new Date(),
  //     userData,
  //     rating: 1,
  //   };

  //   const res = await fetch(`${baseUrl}.json`, {
  //     method: 'POST',
  //     headers: { ContentType: 'application/json' },
  //     body: JSON.stringify(postBody),
  //   });

  //   if (!res.ok) {
  //     throw json({ message: 'Problem posting comment', status: 500 });
  //   }

  //   return redirect('/');
  // } catch (err) {
  //   if (err instanceof Error) {
  //     console.error(err.message);
  //   }
  // }
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

// export const deleteAction = async ({ request }: any) => {
//   const currentUser = auth.currentUser;
//   const formData = await request.formData();
//   const commentId = formData.get('comment-id');
//   const commentUid = formData.get('comment-user-id');

//   if (!currentUser) return;

//   if (currentUser.uid !== commentUid) return;

//   try {
//     const res = await fetch(`${baseUrl}/${commentId}.json`, {
//       method: 'DELETE',
//     });
//     if (!res.ok) {
//       throw json({ message: 'Could not delete comment.', status: 500 });
//     }

//     return redirect('/');
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err);
//     }
//   }
// };
