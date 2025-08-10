import App from '@/App';
import AdminDashboardPage from '@/page/admin/dashboard/page';
import AdminQuestionsPage from '@/page/admin/questions/page';
import AdminUsersPage from '@/page/admin/users/page';
import ForgotPage from '@/page/auth/forgot/page';
import LoginPage from '@/page/auth/login/page';
import RegisterPage from '@/page/auth/register/page';
import DashboardPage from '@/page/dashboard/page';
import ResultPage from '@/page/exam/result/page';
import StartExamPage from '@/page/exam/start/page';
import TestPage from '@/page/exam/test/page';
import RootLayout from '@/page/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router';
export default function Route() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: RootLayout,
      children: [
        {
          index: true,
          Component: App,
        },
        {
          path: '/admin/dashboard',
          Component: AdminDashboardPage,
        },
        {
          path: '/admin/questions',
          Component: AdminQuestionsPage,
        },
        {
          path: '/admin/users',
          Component: AdminUsersPage,
        },
        {
          path: '/auth/register',
          Component: RegisterPage,
        },
        {
          path: '/auth/login',
          Component: LoginPage,
        },
        {
          path: '/auth/forgot',
          Component: ForgotPage,
        },
        {
          path: '/dashboard',
          Component: DashboardPage,
        },
        {
          path: '/exam/result',
          Component: ResultPage,
        },
        {
          path: '/exam/start/',
          Component: StartExamPage,
        },
        {
          path: '/exam/test',
          Component: TestPage,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
