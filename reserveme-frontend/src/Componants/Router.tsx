import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

import Home from "../Pages/Home";
import Navbar from "./NavBar";
import DashboardLayout from "../Layout/DashboardLayout";
import ReservationPage from "../Pages/ReservationPage";
import AdminHome2 from "../Pages/AdminHome2";
import Login from "../Pages/Login";
import { ErrorComp } from "../Lib/ErrorComp";
import { Test } from "../Pages/Test";
import { Menu } from "../Pages/Menu";
import Register from "../Pages/Register";
import RegisterPoo from "../Pages/RegisterPoo";
import { Signup } from "../Pages/Signup";
import Basic from "../Pages/Register2";
import Register2 from "../Pages/Register2";
import { AddRestaurant } from "./admin/AddRestaurant";
import { ProtectedRoute, isTokenExpired } from "../Layout/ProtectedRoute";
import { NotFound } from "../Pages/NotFound";
import ReservationForm from "./ReservationForm";
import { ReservationModalProvider } from "../services/ReservationModalProvider";
import { MenuClient } from "../Pages/MenuClient";
import LoginHook from "../Pages/LoginHook";

const Router = () => {
  // return (
  //   <BrowserRouter>
  //     <ReservationModalProvider>
  //       <Routes>

  // <Route element={<ProtectedRoute isAllowed={user} redirectPath="/"}>
  //   <Route path="dashboard" element={

  //   <DashboardLayout />}

  //   >
  //     <Route index element={<Navigate to="/dashboard/app" />} />
  //     <Route path="app" element={<AdminHome2 />} />
  //     <Route path="carte" element={<Menu />} />
  //     <Route path="user" element={<ReservationPage />} />
  //     <Route path="test" element={<Test />} />
  //   </Route>
  // </Route>

  //         <Route
  //           path="/"
  //           element={
  //             <>
  //               <Navbar />
  //               <Home />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/connexion"
  //           element={
  //             <>
  //               <Navbar />
  //               <Login />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/menu"
  //           element={
  //             <>
  //               <Navbar />
  //               <MenuClient />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/inscription"
  //           element={
  //             <>
  //               <Navbar />
  //               <Register2 />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/reservation"
  //           element={
  //             <>
  //               <ReservationForm />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/404"
  //           element={
  //             <>
  //               <Navbar />
  //               <NotFound />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/admin/add/restaurant"
  //           element={
  //             <>
  //               <Navbar />
  //               <AddRestaurant />
  //             </>
  //           }
  //         />
  //         <Route
  //           path="/signIn"
  //           element={
  //             <>
  //               <Navbar />
  //               <Signup />
  //             </>
  //           }
  //         />
  //         <Route path="/*" element={<Navigate to="/404" replace />} />
  //         {/* <Route path="404" element={<Page404 />} />
  //       <Route path="*" element={<Navigate to="/404" />} /> */}
  //       </Routes>
  //       <ReservationForm />
  //     </ReservationModalProvider>
  //   </BrowserRouter>
  // );
  return (
    <BrowserRouter>
      <ReservationModalProvider>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/app" />} />
            <Route path="app" element={<AdminHome2 />} />

            <Route path="carte" element={<Menu />} />
            <Route path="user" element={<ReservationPage />} />
            {/* <Route path="user" element={<ErrorComp />} /> */}
            <Route path="test" element={<Test />} />
          </Route>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/connexion"
            element={
              <>
                <Navbar />
                <LoginHook />
              </>
            }
          />
          <Route
            path="/menu"
            element={
              <>
                <Navbar />
                <MenuClient />
              </>
            }
          />
          <Route
            path="/inscription"
            element={
              <>
                <Navbar />
                <Register2 />
              </>
            }
          />
          <Route
            path="/reservation"
            element={
              <>
                <ReservationForm />
              </>
            }
          />
          <Route
            path="/404"
            element={
              <>
                <Navbar />
                <NotFound />
              </>
            }
          />
          <Route
            path="/admin/add/restaurant"
            element={
              <>
                <Navbar />
                <AddRestaurant />
              </>
            }
          />
          <Route
            path="/signIn"
            element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />

          <Route path="/*" element={<Navigate to="/404" replace />} />
        </Routes>
        <ReservationForm />
      </ReservationModalProvider>
    </BrowserRouter>
  );
};

export default Router;
