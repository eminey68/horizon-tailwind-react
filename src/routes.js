import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Reservations from "views/admin/reservations"; 
import ResourceDetail from "views/admin/resource-detail"; 

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
  MdEventAvailable, 
} from "react-icons/md";

// SİSTEME GİREN KİŞİNİN ROLÜNÜ OKUYORUZ
const userRole = localStorage.getItem("userRole") || "student";

const routes = [
  {
    name: "Anasayfa",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Kaynaklar (Lab/Oda)",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    // İSİM KISMI ROL'E GÖRE OTOMATİK DEĞİŞİYOR!
    name: userRole === "admin" ? "Gelen Talepler" : "Rezervasyonlarım",
    layout: "/admin",
    path: "reservations",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <Reservations />,
  },
  {
    name: "Profilim",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Giriş Yap",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Kaynak Detay",
    layout: "/admin",
    path: "resource-detail",
    component: <ResourceDetail />,
  },
];
export default routes;