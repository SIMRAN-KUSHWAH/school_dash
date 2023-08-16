import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Add Student',
    icon: IconMoodHappy,
    href: '/ui/Addstudent',
  },
  {
    id: uniqueId(),
    title: 'Add Staff',
    icon: IconAperture,
    href: '/ui/Addstaff',
  }, {
    id: uniqueId(),
    title: 'Add Notice / Events',
    icon: IconTypography,
    href: '/ui/Addnotice',
  },
  {
    id: uniqueId(),
    title: 'Add Exam Time Table',
    icon: IconCopy,
    href: '/ui/Addexamtt',
  },
  
  
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login Users',
    icon: IconLogin,
    href: '/auth/UserLogin',
  },
  {
    id: uniqueId(),
    title: 'Register Parents',
    icon: IconUserPlus,
    href: '/auth/RegisterParents',
  },

  {
    navlabel: true,
    subheader: 'Fess',
  },
  {
    id: uniqueId(),
    title: 'Fess Payment',
    icon: IconTypography,
    href: '/auth/fessPayment',
  },
  {
    id: uniqueId(),
    title: 'Fess Slip',
    icon: IconCopy,
    href: '/auth/fessSlip',
  },

  {
    navlabel: true,
    subheader: 'Study',
  },
  {
    id: uniqueId(),
    title: 'Study Material',
    icon: IconCopy,
    href: '/ui/study',
  },
  {
    id: uniqueId(),
    title: 'Dout Box',
    icon: IconLogin,
    href: '/ui/doubts',
  },
  {
    id: uniqueId(),
    title: 'Exam Result',
    icon: IconUserPlus,
    href: '/ui/result',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'All Notice / Events',
    icon: IconCopy,
    href: '/Notice',
  },
  {
    id: uniqueId(),
    title: 'All Events',
    icon: IconCopy,
    href: '/Event',
  },
  {
    id: uniqueId(),
    title: 'All Students',
    icon: IconMoodHappy,
    href: '/AllStudent',
  },
  {
    id: uniqueId(),
    title: 'All Staff',
    icon: IconAperture,
    href: '/AllStaff',
  },
  {
    id: uniqueId(),
    title: 'All Students Attendence',
    icon: IconMoodHappy,
    href: '/StudentAttendence',
  },
  {
    id: uniqueId(),
    title: 'All Staff Attendence',
    icon: IconAperture,
    href: '/StaffAttendence',
  },
];

export default Menuitems;
