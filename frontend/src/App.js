import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import ApplyPage from "@/pages/ApplyPage";
import Login from "@/pages/auth/Login";
import OtpVerify from "@/pages/auth/OtpVerify";
import SetupPassword from "@/pages/auth/SetupPassword";

import AmbassadorLayout from "@/pages/ambassador/AmbassadorLayout";
import AmbHome from "@/pages/ambassador/Home";
import AmbTasks from "@/pages/ambassador/Tasks";
import AmbLeaderboard from "@/pages/ambassador/Leaderboard";
import AmbReferrals from "@/pages/ambassador/Referrals";
import AmbPayouts from "@/pages/ambassador/Payouts";
import AmbProfile from "@/pages/ambassador/Profile";

import AdminLayout from "@/pages/admin/AdminLayout";
import AdminApplicants from "@/pages/admin/Applicants";
import AdminDirectory from "@/pages/admin/Directory";
import AdminTasks from "@/pages/admin/Tasks";
import AdminLeaderboard from "@/pages/admin/MasterLeaderboard";
import AdminReferralCodes from "@/pages/admin/ReferralCodes";
import AdminReferralUtilization from "@/pages/admin/ReferralUtilization";
import AdminAnalytics from "@/pages/admin/Analytics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Navigate to="/apply" replace />} />
          <Route path="/apply" element={<ApplyPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<OtpVerify />} />
          <Route path="/setup-password" element={<SetupPassword />} />

          <Route path="/dashboard" element={<AmbassadorLayout />}>
            <Route index element={<AmbHome />} />
            <Route path="tasks" element={<AmbTasks />} />
            <Route path="leaderboard" element={<AmbLeaderboard />} />
            <Route path="referrals" element={<AmbReferrals />} />
            <Route path="payouts" element={<AmbPayouts />} />
            <Route path="profile" element={<AmbProfile />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="applicants" replace />} />
            <Route path="applicants" element={<AdminApplicants />} />
            <Route path="directory" element={<AdminDirectory />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="leaderboard" element={<AdminLeaderboard />} />
            <Route path="referral-codes" element={<AdminReferralCodes />} />
            <Route path="referral-utilization" element={<AdminReferralUtilization />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
