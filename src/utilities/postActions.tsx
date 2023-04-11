const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

export const addComment = async (content: string, currentUser: any) => {
  try {
    if (!currentUser) return;

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
