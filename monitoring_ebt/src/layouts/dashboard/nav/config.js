// component
import SvgColor from '../../../components/svg-color';
import { API_URL_DOWNLOAD } from '../../../utils/URL';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard-EBT-DTNTF/app',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'Efisiensi',
    path: '/dashboard-EBT-DTNTF/efisiensi',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Data',
    path: '/dashboard-EBT-DTNTF/data',
    icon: icon('ic_data'),

  },
  {
    title: 'Download',
    path: '/download',
    icon: icon('ic_download'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
