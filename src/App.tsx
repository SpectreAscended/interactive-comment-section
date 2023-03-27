// import CommentCard from './components/CommentCard';
// import CommentInput from './components/CommentInput';
// import Header from './components/Header';
import DUMMY_DATA from './store/DUMMY_DATA';
import RootLayout from './pages/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <RootLayout />,
      },
    ],
  },
]);

const App: React.FC = () => {
  const data = DUMMY_DATA;

  return <RouterProvider router={router} />;

  // return (
  //   <>
  //     <Header />
  //     <main>
  //       <section>
  //         <ul>
  //           {data.map(comment => {
  //             return (
  //               <li key={comment.id}>
  //                 <CommentCard comment={comment} />
  //               </li>
  //             );
  //           })}
  //           <CommentInput />
  //         </ul>
  //       </section>
  //     </main>
  //   </>
  // );
};

export default App;
