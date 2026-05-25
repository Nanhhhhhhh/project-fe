import { createBrowserRouter } from 'react-router';
import MainLayout from './layouts/MainLayout.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import ProductList from './pages/ProductList.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import Profile from './pages/Profile.tsx';
import OrderDetail from './pages/OrderDetail.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Support from './pages/Support.tsx';
import AdminLayout from './layouts/AdminLayout.tsx';
import Dashboard from './pages/admin/Dashboard.tsx';
import ManageCustomers from './pages/admin/ManageCustomers.tsx';
import ManageOrders from './pages/admin/ManageOrders.tsx';
import ManageProducts from './pages/admin/ManageProducts.tsx';
import ManagePromotions from './pages/admin/ManagePromotions.tsx';
import ManageStaff from './pages/admin/ManageStaff.tsx';
import ManageSupport from './pages/admin/ManageSupport.tsx';
import AdminAccount from './pages/admin/AdminAccount.tsx';
import StaffLayout from './layouts/StaffLayout.tsx';
import StaffOrders from './pages/staff/StaffOrders.tsx';
import StaffAccount from './pages/staff/StaffAccount.tsx';
import NotFound from './pages/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: ProductList },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'profile', Component: Profile },
      { path: 'orders/:id', Component: OrderDetail },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: 'support', Component: Support },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'customers', Component: ManageCustomers },
      { path: 'orders', Component: ManageOrders },
      { path: 'products', Component: ManageProducts },
      { path: 'promotions', Component: ManagePromotions },
      { path: 'staff', Component: ManageStaff },
      { path: 'support', Component: ManageSupport },
      { path: 'account', Component: AdminAccount },
    ],
  },
  {
    path: '/staff',
    Component: StaffLayout,
    children: [
      { index: true, Component: StaffOrders },
      { path: 'customers', Component: ManageCustomers },
      { path: 'orders', Component: StaffOrders },
      { path: 'products', Component: ManageProducts },
      { path: 'promotions', Component: ManagePromotions },
      { path: 'support', Component: ManageSupport },
      { path: 'account', Component: StaffAccount },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);