import React, { useEffect, useState } from "react";
import {
  User,
  Lock,
  Bell,
  Mail,
  CreditCard,
  Globe,
  Shield,
  HelpCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ChangePasswordForm from "../components/ChangePasswordForm";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { user,resetAuthState } = useAuthStore();
  const [activeSection, setActiveSection] = useState("account");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [accountForm, setAccountForm] =useState({
    'displayName': user?.displayName || '',
    'email': user?.email || ''
  })
  useEffect(() => {
    document.title = "Settings | HypeDrop";
  }, []);
  useEffect(()=>{
    resetAuthState()
  },[])
  const { success, error, isLoading, updateDisplayname_email } = useAuthStore();
  const handleChange = (e)=>{
    const {id, value} = e.target
    setAccountForm(prev =>({
      ...prev,
      [id]: value
    }))
  }
  const handleSubmit = async () => {
    try {
      await updateDisplayname_email(accountForm.displayName, accountForm.email, user._id)
      toast.success('Saved')
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)

    }
  };
  const settingsSections = [
    {
      id: "account",
      icon: <User className="w-5 h-5" />,
      title: "Account Settings",
      description: "Manage your profile information",
    },
    {
      id: "security",
      icon: <Lock className="w-5 h-5" />,
      title: "Security",
      description: "Change password and security settings",
    },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5" />,
      title: "Notifications",
      description: "Configure your notification preferences",
    },
    {
      id: "privacy",
      icon: <Shield className="w-5 h-5" />,
      title: "Privacy",
      description: "Manage your privacy settings",
    },
    {
      id: "billing",
      icon: <CreditCard className="w-5 h-5" />,
      title: "Billing",
      description: "Update payment methods and view invoices",
    },
    {
      id: "support",
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help & Support",
      description: "Get help with your account",
    },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
              >
                {user?.profilePicture ? (
                  <motion.img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-500" />
                )}
              </motion.div>
              <div>
                <h3 className="font-medium">
                  {user?.userName || user?.stageName}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  id='displayName'
                  onChange={handleChange}
                  defaultValue={user?.displayName || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id='email'
                  onChange={handleChange}
                  defaultValue={user?.email || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                {isLoading ? (
                  <span className="flex gap-2 items-center">
                    <Loader2 size={24} />
                    <span> Saving</span>
                  </span>
                ) : (
                  " Save Changes"
                )}
              </motion.button>
            </div>
          </motion.div>
        );
      case "security":
        return <ChangePasswordForm />;
      case "notifications":
        return (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {[
              {
                title: "Push Notifications",
                description: "Receive notifications in the app",
                state: notificationsEnabled,
                setState: setNotificationsEnabled,
              },
              {
                title: "Email Notifications",
                description: "Receive notifications via email",
                state: emailNotifications,
                setState: setEmailNotifications,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={() => item.setState(!item.state)}
                    className="sr-only peer"
                  />
                  <motion.div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"
                    whileTap={{ scale: 0.95 }}
                  />
                </label>
              </motion.div>
            ))}
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-64"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="text-gray-400 mb-4"
            >
              {settingsSections.find((s) => s.id === activeSection)?.icon}
            </motion.div>
            <h3 className="text-xl font-medium text-gray-700">
              {settingsSections.find((s) => s.id === activeSection)?.title}
            </h3>
            <p className="text-gray-500">This section is under development</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Settings" />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Settings sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                {/* Mobile & Desktop Navigation */}
                <div className="relative">
                  {/* Mobile horizontal scroll */}
                  <motion.div
                    className="md:hidden flex gap-2 w-full overflow-x-auto pb-2 scrollbar-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {settingsSections.map((section) => (
                      <motion.button
                        key={`mobile-${section.id}`}
                        onClick={() => setActiveSection(section.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`whitespace-nowrap flex items-center px-4 py-2 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? "bg-purple-100 text-purple-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`mr-2 ${
                            activeSection === section.id
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          {section.icon}
                        </span>
                        {section.title}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Desktop vertical navigation */}
                  <motion.div
                    className="hidden md:block space-y-1"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {settingsSections.map((section) => (
                      <motion.button
                        key={`desktop-${section.id}`}
                        onClick={() => setActiveSection(section.id)}
                        whileHover={{ x: 5 }}
                        className="w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-100"
                        aria-current={
                          activeSection === section.id ? "page" : undefined
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <motion.span
                            animate={{
                              color:
                                activeSection === section.id
                                  ? "#9333ea"
                                  : "#6b7280",
                            }}
                          >
                            {section.icon}
                          </motion.span>
                          <motion.span
                            animate={{
                              color:
                                activeSection === section.id
                                  ? "#9333ea"
                                  : "#374151",
                              fontWeight:
                                activeSection === section.id ? 500 : 400,
                            }}
                          >
                            {section.title}
                          </motion.span>
                        </div>
                        <AnimatePresence>
                          {activeSection === section.id && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                            >
                              <ChevronRight className="w-4 h-4 text-purple-600" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Settings content */}
              <motion.div
                layout
                className="flex-1 bg-white rounded-lg shadow-sm p-6"
              >
                <motion.div layout>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {
                      settingsSections.find((s) => s.id === activeSection)
                        ?.title
                    }
                  </h2>
                  <p className="text-gray-500 mb-6">
                    {
                      settingsSections.find((s) => s.id === activeSection)
                        ?.description
                    }
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderSectionContent()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
