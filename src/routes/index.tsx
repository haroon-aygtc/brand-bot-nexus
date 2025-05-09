import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/home";
import Dashboard from "../pages/admin/dashboard";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import ApiTester from "../pages/ApiTester";

// Admin pages
import SettingsPage from "../pages/admin/settings";

// User & Role Management page
import UserManagementPage from "../pages/admin/user-management";


// Import other admin components as they become available
// For now, we'll redirect to dashboard for missing components

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Auth Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      {/* <Route path="/auth/signup" element={<Navigate to="/auth/register" replace />} /> */}

      {/* Legacy Routes - Redirect to new auth paths */}
      {/* <Route path="/login" element={<Navigate to="/auth/login" replace />} /> */}
      {/* <Route path="/register" element={<Navigate to="/auth/register" replace />} /> */}
      {/* <Route path="/signup" element={<Navigate to="/auth/register" replace />} /> */}

      {/* API Tester Route */}
      <Route path="/api-tester" element={<ApiTester />} />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={<Dashboard />}
      />

      {/* Widget Config */}
      <Route
        path="/admin/widget-config"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "widget" }} replace />
        }
      />

      {/* Context Rules Routes */}
      <Route
        path="/admin/context-rules"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "context" }} replace />
        }
      />
      <Route
        path="/admin/context-rules/create"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "context", subTab: "rule-editor" }} replace />
        }
      />
      <Route
        path="/admin/context-rules/manage"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "context", subTab: "rules-list" }} replace />
        }
      />
      <Route
        path="/admin/context-rules/test"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "context", subTab: "test" }} replace />
        }
      />

      {/* follow up */}
      <Route
        path="/admin/follow-up"
        element={<UserManagementPage />}
      />

      {/* Templates Routes */}
      <Route
        path="/admin/templates"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "templates" }} replace />
        }
      />
      <Route
        path="/admin/templates/create"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "templates", subTab: "create" }} replace />
        }
      />
      <Route
        path="/admin/templates/manage"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "templates", subTab: "all" }} replace />
        }
      />

      {/* Scraping Routes */}
      <Route
        path="/admin/scraping"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping" }} replace />
        }
      />
      <Route
        path="/admin/scraping/configurator"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping", subTab: "configurator" }} replace />
        }
      />
      <Route
        path="/admin/scraping/selectors"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping", subTab: "selectors" }} replace />
        }
      />
      <Route
        path="/admin/scraping/history"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping", subTab: "history" }} replace />
        }
      />
      <Route
        path="/admin/scraping/problems"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping", subTab: "problems" }} replace />
        }
      />
      <Route
        path="/admin/scraping/visualization"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping", subTab: "visualization" }} replace />
        }
      />
      <Route
        path="/admin/scraping/advanced"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "scraping", subTab: "advanced" }} replace />
        }
      />

      {/* Embed Code */}
      <Route
        path="/admin/embed-code"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "embed" }} replace />
        }
      />

      {/* Analytics */}
      <Route
        path="/admin/analytics"
        element={
          <Navigate to="/admin/dashboard" state={{ activeTab: "analytics" }} replace />
        }
      />

      {/* User & Role Management */}
      <Route
        path="/admin/user-management"
        element={<UserManagementPage />}
      />
      <Route
        path="/admin/user-management/roles"
        element={<UserManagementPage />}
      />

      {/* Redirects for old user and role management routes */}
      <Route
        path="/admin/users"
        element={
          <Navigate to="/admin/user-management" replace />
        }
      />
      <Route
        path="/admin/users/*"
        element={
          <Navigate to="/admin/user-management" replace />
        }
      />
      <Route
        path="/admin/roles"
        element={
          <Navigate to="/admin/user-management/roles" replace />
        }
      />
      <Route
        path="/admin/roles/*"
        element={
          <Navigate to="/admin/user-management/roles" replace />
        }
      />

      {/* Settings */}
      <Route
        path="/admin/settings"
        element={<SettingsPage />}
      />

      {/* Catch-all admin route */}
      <Route
        path="/admin/*"
        element={
          <Navigate to="/admin/dashboard" replace />
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
