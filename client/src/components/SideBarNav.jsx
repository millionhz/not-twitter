import {
  Key,
  Search,
  PostAdd,
  Person,
  Notifications,
  Upload,
  Edit,
  ManageAccounts,
  ReportProblem,
  Logout,
} from '@mui/icons-material';

const sideBarNav = (userId) => [
  {
    route: `/user/${userId}`,
    icon: <Person sx={{ margin: 1 }} />,
    label: 'My Profile',
  },
  {
    route: '/user/edit',
    icon: <Edit sx={{ margin: 1 }} />,
    label: 'Edit Profile',
  },
  {
    route: '/notifications',
    icon: <Notifications sx={{ margin: 1 }} />,
    label: 'Notifications',
  },
  {
    route: '/post/compose',
    icon: <PostAdd sx={{ margin: 1 }} />,
    label: 'Create Post',
  },
  {
    route: '/image/compose',
    icon: <Upload sx={{ margin: 1 }} />,
    label: 'Upload Image',
  },
  {
    route: '/post/search',
    icon: <Search sx={{ margin: 1 }} />,
    label: 'Search Post',
  },
  {
    route: '/user/search',
    icon: <Search sx={{ margin: 1 }} />,
    label: 'Search User',
  },
  {
    route: '/user/manage',
    icon: <ManageAccounts sx={{ margin: 1 }} />,
    label: 'Manage Users',
  },
  {
    route: '/post/report',
    icon: <ReportProblem sx={{ margin: 1 }} />,
    label: 'Manage Posts',
  },
  {
    route: '/updatepassword',
    icon: <Key sx={{ margin: 1 }} />,
    label: 'Update Password',
  },
  {
    route: '/logout',
    icon: <Logout sx={{ margin: 1 }} />,
    label: 'Logout',
  },
];

export default sideBarNav;
