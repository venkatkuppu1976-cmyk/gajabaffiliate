import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { VersionProvider } from "@/hooks/useVersion";

import ApplyPage from "@/pages/ApplyPage";
import Login from "@/pages/auth/Login";
import OtpVerify from "@/pages/auth/OtpVerify";
import SetupPassword from "@/pages/auth/SetupPassword";

import AmbassadorLayout from "@/pages/ambassador/AmbassadorLayout";
import AmbHome from "@/pages/ambassador/Home";
import AmbTasks from "@/pages/ambassador/Tasks";
import AmbLeaderboard from "@/pages/ambassador/Leaderboard";
import AmbPayouts from "@/pages/ambassador/Payouts";
import AmbProfile from "@/pages/ambassador/Profile";
import AmbPerformance from "@/pages/ambassador/Performance";
import AmbTier from "@/pages/ambassador/Tier";
import AmbInbox from "@/pages/ambassador/Inbox";
import AmbAnnouncements from "@/pages/ambassador/Announcements";
import AmbSupport from "@/pages/ambassador/Support";
import AmbAccountSettings from "@/pages/ambassador/AccountSettings";

import AdminLayout from "@/pages/admin/AdminLayout";
import AdminApplicants from "@/pages/admin/Applicants";
import AdminDirectory from "@/pages/admin/Directory";
import AdminTasks from "@/pages/admin/Tasks";
import AdminLeaderboard from "@/pages/admin/MasterLeaderboard";
import AdminReferralUtilization from "@/pages/admin/ReferralUtilization";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminAffiliateUrls from "@/pages/admin/AffiliateUrls";
import AdminAnnouncements from "@/pages/admin/Announcements";
import AdminSupport from "@/pages/admin/Support";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <VersionProvider>
          <Toaster position="top-center" richColors />
          <Routes>
          <Route path="/" element={<Navigate to="/apply" replace />} />
          <Route path="/apply" element={<ApplyPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<OtpVerify />} />
          <Route path="/setup-password" element={<SetupPassword />} />

          <Route path="/dashboard" element={<AmbassadorLayout />}>
            <Route index element={<AmbHome />} />
            <Route path="performance" element={<AmbPerformance />} />
            <Route path="tier" element={<AmbTier />} />
            <Route path="tasks" element={<AmbTasks />} />
            <Route path="leaderboard" element={<AmbLeaderboard />} />
            <Route path="payouts" element={<AmbPayouts />} />
            <Route path="inbox" element={<AmbInbox />} />
            <Route path="announcements" element={<AmbAnnouncements />} />
            <Route path="profile" element={<AmbProfile />} />
            <Route path="support" element={<AmbSupport />} />
            <Route path="settings" element={<AmbAccountSettings />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="applicants" replace />} />
            <Route path="applicants" element={<AdminApplicants />} />
            <Route path="directory" element={<AdminDirectory />} />
            <Route path="affiliate-urls" element={<AdminAffiliateUrls />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="leaderboard" element={<AdminLeaderboard />} />
            <Route path="utilization" element={<AdminReferralUtilization />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>
        </Routes>
        </VersionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
