import HomePage from "../pages/HomePage/HomePage";
import BoyarMapPage from "../pages/YmapPage/YmapPage";
import BoyarMapExportPage from '../pages/BoyarMapExportPage/BoyarMapExportPage';
import PaymentsPage from '../pages/PaymentsPage/PaymentsPage';
const routes= {
  HOME_PAGE: {
    path: "/",
    component: HomePage
  },
    BOYARMAP_PAGE: {
    path: "/boyarmap",
    component: BoyarMapPage
  },
  BOYARMAP_EXPORT_PAGE: {
    path: "/boyarmapexport",
    component: BoyarMapExportPage
  },
  PAYMANTS_PAGE:{
    path:'/payments',
    component: PaymentsPage
  }
};
export default routes