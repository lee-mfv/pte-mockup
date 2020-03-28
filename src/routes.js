/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Add from "@material-ui/icons/Add";
import List from "@material-ui/icons/List";
import Details from "@material-ui/icons/Details";
// import Class from "@material-ui/icons/Class";
import Description from "@material-ui/icons/Description";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import Person from '@material-ui/icons/Person';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
// import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";

import CreateFibrw from "views/Fibrw/CreateFibrw";
import ListFibrw from "views/Fibrw/ListFibrw";
import DetailFibrw from "views/Fibrw/DetailFibrw";

import StudyPlan from "views/Documents/StudyPlan";
import ChecklistPlan from "views/Documents/ChecklistPlan";
import EssaySample from "views/Documents/EssaySample";
import FibVocab from "views/Documents/FibVocab";
import Other from "views/Documents/Other";
import TestPdf from "views/Documents/TestPdf";
import PteStructure from "views/Documents/PteStructure";
import PteStructureTest from "views/Documents/PteStructureTest";

import CreateBlog from "views/Blog/CreateBlog";
import ListBlog from "views/Blog/ListBlog";
import EditBlog from "views/Blog/EditBlog";

import SpeakingNotes from "views/Speaking/SpeakingNotes";
import ReadAloud from "views/Speaking/ReadAloud";
import RepeatSentence from "views/Speaking/RepeatSentence";
import DescribeImage from "views/Speaking/DescribeImage";
import CreateDescribeImage from "views/Speaking/CreateDescribeImage";
import EditDescribeImage from "views/Speaking/EditDescribeImage";
import RetellLecture from "views/Speaking/RetellLecture";

import TienNtnNotes from "views/Users/TienNTN/TienNtnNotes";
import LyTkNotes from "views/Users/LyTK/LyTkNotes";

import UploadImage from "views/Images/UploadImage";
import ListImages from "views/Images/ListImages";
import WordsToTokens from "views/Translation/WordsToTokens";


// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    key: "dashboard",
    has_nested: false,
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    key: "fibrw_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/fibrw/create",
        key: "fibrw_create",
        has_nested: false,
        name: "Create Fibrw",
        icon: Add,
        component: CreateFibrw,
        layout: "/admin"
      },
      {
        path: "/fibrw/list",
        key: "fibrw_list",
        has_nested: false,
        name: "List Fibrw",
        icon: List,
        component: ListFibrw,
        layout: "/admin"
      },
      {
        path: "/fibrw/detail/:id",
        key: "fibrw_detail",
        has_nested: false,
        name: "Detail Fibrw",
        icon: Details,
        component: DetailFibrw,
        layout: "/admin",
        invisible: true,
      },
    ],
    name: "FIB - RW",
    icon: Description,
    layout: "/admin"
  },
  {
    key: "document_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/document/pte-structure",
        key: "document_pte_structure",
        has_nested: false,
        name: "PTE Structure",
        icon: FiberManualRecordIcon,
        component: PteStructure,
        layout: "/admin",
      },
      {
        path: "/document/pte-structure-test",
        key: "document_pte_structure_test",
        has_nested: false,
        name: "PTE Structure Test",
        icon: FiberManualRecordIcon,
        component: PteStructureTest,
        layout: "/admin",
      },
      {
        path: "/document/studyplan",
        key: "document_studyplan",
        has_nested: false,
        name: "Default Study Plan",
        icon: FiberManualRecordIcon,
        component: StudyPlan,
        layout: "/admin",
      },
      {
        path: "/document/checklistplan",
        key: "document_checklistplan",
        has_nested: false,
        name: "PTE MAGIC COURSE CHECKLIST",
        icon: FiberManualRecordIcon,
        component: ChecklistPlan,
        layout: "/admin",
      },
      {
        path: "/document/essaysamples",
        key: "document_essaysamples",
        has_nested: false,
        name: "Essay samples",
        icon: FiberManualRecordIcon,
        component: EssaySample,
        layout: "/admin",
      },
      {
        path: "/document/fibvocab",
        key: "document_fibvocab",
        has_nested: false,
        name: "FIB-L Vocab",
        icon: FiberManualRecordIcon,
        component: FibVocab,
        layout: "/admin",
      },
      {
        path: "/document/other",
        key: "document_other",
        has_nested: false,
        name: "other",
        icon: FiberManualRecordIcon,
        component: Other,
        layout: "/admin",
      },
    ],
    name: "PTEMagic Document",
    icon: Description,
    layout: "/admin"
  },
  {
    key: "blog_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/blog/create",
        key: "blog_create",
        has_nested: false,
        name: "Create Blog",
        icon: FiberManualRecordIcon,
        component: CreateBlog,
        layout: "/admin",
      },
      {
        path: "/blog/list",
        key: "blog_list",
        has_nested: false,
        name: "List Blogs",
        icon: FiberManualRecordIcon,
        component: ListBlog,
        layout: "/admin",
      },
      {
        path: "/blog/edit/:id",
        key: "blog_edit",
        has_nested: false,
        name: "Edit Blog",
        icon: FiberManualRecordIcon,
        component: EditBlog,
        layout: "/admin",
        invisible: true,
      },
      {
        path: "/blog/testpdf",
        key: "blog_edit",
        has_nested: false,
        name: "Test Pdf",
        icon: FiberManualRecordIcon,
        component: TestPdf,
        layout: "/admin",
      },
    ],
    name: "Self Document",
    icon: Description,
    layout: "/admin"
  },
  {
    key: "speaking_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/speaking/notes",
        key: "speaking_notes",
        has_nested: false,
        name: "Notes",
        icon: FiberManualRecordIcon,
        component: SpeakingNotes,
        layout: "/admin",
      },
      {
        path: "/speaking/read-aloud",
        key: "speaking_read_aloud",
        has_nested: false,
        name: "Read Aloud",
        icon: FiberManualRecordIcon,
        component: ReadAloud,
        layout: "/admin",
      },
      {
        path: "/speaking/repeat-sentence",
        key: "speaking_repeat_sentence",
        has_nested: false,
        name: "Repeat Sentence",
        icon: FiberManualRecordIcon,
        component: RepeatSentence,
        layout: "/admin",
      },
      {
        path: "/speaking/describe-image",
        key: "speaking_describe_image",
        has_nested: false,
        name: "Describe Image",
        icon: FiberManualRecordIcon,
        component: DescribeImage,
        layout: "/admin",
      },
      {
        path: "/speaking/describe-image-create",
        key: "speaking_describe_image_create",
        has_nested: false,
        name: "Create Sample DI",
        icon: FiberManualRecordIcon,
        component: CreateDescribeImage,
        layout: "/admin",
        invisible: true,
      },
      {
        path: "/speaking/describe-image-edit/:id",
        key: "speaking_describe_image_edit",
        has_nested: false,
        name: "Edit Sample DI",
        icon: FiberManualRecordIcon,
        component: EditDescribeImage,
        layout: "/admin",
        invisible: true,
      },
      {
        path: "/speaking/retell-lecture",
        key: "speaking_retell_lecture",
        has_nested: false,
        name: "Retell Lecture",
        icon: FiberManualRecordIcon,
        component: RetellLecture,
        layout: "/admin",
      },
    ],
    name: "Speaking",
    icon: PhoneInTalk,
    layout: "/admin"
  },
  {
    key: "user_tienntn_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/tien-nguyen/notes",
        key: "tienntn_notes",
        has_nested: false,
        name: "Notes",
        icon: FiberManualRecordIcon,
        component: TienNtnNotes,
        layout: "/admin",
      },
    ],
    name: "Tien Nguyen",
    icon: Person,
    layout: "/admin"
  },
  {
    key: "user_lytk_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/ly-tran/notes",
        key: "lytk_notes",
        has_nested: false,
        name: "Notes",
        icon: FiberManualRecordIcon,
        component: LyTkNotes,
        layout: "/admin",
      },
    ],
    name: "Ly Tran",
    icon: Person,
    layout: "/admin"
  },
  {
    key: "other_menu",
    has_nested: true,
    sub_menus: [
      {
        path: "/other/images/upload",
        key: "other_menu_image_upload",
        has_nested: false,
        name: "Image - Upload",
        icon: FiberManualRecordIcon,
        component: UploadImage,
        layout: "/admin",
        invisible: true,
      },
      {
        path: "/other/images/list",
        key: "other_menu_image_list",
        has_nested: false,
        name: "Image - List",
        icon: FiberManualRecordIcon,
        component: ListImages,
        layout: "/admin",
      },
      {
        path: "/other-words-2-tokens",
        key: "other_menu_words_to_tokens",
        has_nested: false,
        name: "Words 2 Tokens",
        icon: FiberManualRecordIcon,
        component: WordsToTokens,
        layout: "/admin",
      },
    ],
    name: "Other",
    icon: DevicesOtherIcon,
    layout: "/admin"
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
