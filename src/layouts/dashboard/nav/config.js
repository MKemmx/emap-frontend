// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Building Management',
    path: '#',
    icon: icon('ic_user'),
    children: [
      {
        title: 'building',
        path: '/dashboard/building',
        icon: icon('ic_user'),
      },
      {
        title: 'building-coordinates',
        path: '/dashboard/building-coordinate',
        icon: icon('ic_user'),
      },
    ],
  },
  {
    title: 'Room Management',
    path: '#',
    icon: icon('ic_user'),
    children: [
      {
        title: 'Room',
        path: '/dashboard/room',
        icon: icon('ic_user'),
      },
      {
        title: 'room-coordinate',
        path: '/dashboard/building-coordinate',
        icon: icon('ic_user'),
      },
    ],
  },
  {
    title: 'event',
    path: '/dashboard/event',
    icon: icon('ic_user'),
  },
  {
    title: 'feedback',
    path: '/dashboard/feedback',
    icon: icon('ic_user'),
  },
  {
    title: 'Audit Trails',
    path: '/dashboard/audit-trail',
    icon: icon('ic_user'),
  },
  {
    title: 'Map',
    path: '/dashboard/map',
    icon: icon('ic_user'),
  },
];

export default navConfig;
