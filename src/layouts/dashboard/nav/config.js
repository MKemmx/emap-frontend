// Icons
import { AiOutlineCalendar, AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineFeedback, MdMeetingRoom } from 'react-icons/md';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { GiRoad } from 'react-icons/gi';
import { HiLocationMarker, HiOutlineUserGroup } from 'react-icons/hi';

// component
import SvgColor from '../../../components/svg-color';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <AiOutlineDashboard color="#F4F4F4" size={25} />,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: <HiOutlineUserGroup color="#F4F4F4" size={25} />,
  },
  {
    title: 'Building Management',
    path: '#',
    icon: <BsBuilding color="#F4F4F4" size={25} />,
    children: [
      {
        title: 'building',
        path: '/dashboard/building',
        icon: <BsBuilding color="#F4F4F4" size={25} />,
      },
      {
        title: 'building-coordinates',
        path: '/dashboard/building-coordinate',
        icon: <HiLocationMarker color="#F4F4F4" size={25} />,
      },
    ],
  },
  {
    title: 'Room Management',
    path: '#',
    icon: <MdMeetingRoom color="#F4F4F4" size={25} />,
    children: [
      {
        title: 'Room',
        path: '/dashboard/room',
        icon: <MdMeetingRoom color="#F4F4F4" size={25} />,
      },
      {
        title: 'room-coordinate',
        path: '/dashboard/room-coordinate',
        icon: <HiLocationMarker color="#F4F4F4" size={25} />,
      },
    ],
  },
  {
    title: 'event',
    path: '/dashboard/event',
    icon: <AiOutlineCalendar color="#F4F4F4" size={25} />,
  },
  {
    title: 'feedback',
    path: '/dashboard/feedback',
    icon: <MdOutlineFeedback color="#F4F4F4" size={25} />,
  },
  {
    title: 'Audit Trails',
    path: '/dashboard/audit-trail',
    icon: <GiRoad color="#F4F4F4" size={25} />,
  },
  {
    title: 'Map',
    path: '/dashboard/map',
    icon: <BsMap color="#F4F4F4" size={25} />,
  },
];

export default navConfig;
