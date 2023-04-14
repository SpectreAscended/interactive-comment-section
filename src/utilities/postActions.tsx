const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

export const postComment = async (
  content: string,
  currentUser: any,
  method: 'POST' | 'PATCH',
  commentId?: string
) => {
  try {
    if (!currentUser) return;

    const userData = {
      uid: currentUser.uid,
      email: currentUser.email,
      userName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    };

    let postBody = {
      content: content,
      createdAt: new Date(),
      userData,
      rating: 1,
    };

    baseUrl;

    if (method === 'POST') {
      const res = await fetch(`${baseUrl}.json`, {
        method: 'POST',
        headers: { ContentType: 'application/json' },
        body: JSON.stringify(postBody),
      });

      if (!res.ok) {
        throw new Error('Problem posting comment');
      }
    }

    if (method === 'PATCH') {
      console.log(commentId);
      const res = await fetch(`${baseUrl}/${commentId}.json`, {
        method: 'PATCH',
        headers: { ContentType: 'application/json' },
        body: JSON.stringify({ content: content }),
      });

      if (!res.ok) {
        throw new Error('Problem updating comment');
      }
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

  if (currentUser.uid !== commentUid) return;
  try {
    const res = await fetch(`${baseUrl}/${commentId}.json`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Problem deleting comment');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const changeRating = async () => {};
