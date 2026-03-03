import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Common
      login: "Login",
      email: "Email",
      password: "Password",
      approve: "Approve",
      reject: "Reject",
      pendingTINs: "Pending TINs",
      approvedTINs: "Approved TINs",
      rejectedTINs: "Rejected TINs",
      dashboard: "Dashboard",
      adminDashboard: "Admin Dashboard",
      applyForTIN: "Apply for TIN",
      verifyTIN: "Verify TIN",
      profile: "Profile",
      logout: "Logout",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      status: "Status",
      actions: "Actions",
      
      // TIN
      tinNumber: "TIN Number",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      
      // User
      user: "User",
      nationalId: "National ID",
      phone: "Phone",
      region: "Region",
      address: "Address",
      dateApplied: "Date Applied",
      
      // Messages
      loginSuccess: "Login successful!",
      loginFailed: "Login failed. Please try again.",
      tinApproved: "TIN approved successfully",
      tinRejected: "TIN rejected successfully",
      noPending: "No pending TIN applications",
      
      // Language
      language: "Language",
      english: "English",
      amharic: "Amharic",
      
      // Theme
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      
      // Analytics
      analytics: "Analytics",
      totalApplications: "Total Applications",
      thisMonth: "This Month",
      approvalRate: "Approval Rate",
      recentActivity: "Recent Activity",
    },
  },
  am: {
    translation: {
      // Common
      login: "ግባ",
      email: "ኢሜይል",
      password: "የይለፍ ቃል",
      approve: "አጽድቅ",
      reject: "አትርጋ",
      pendingTINs: "የሚጠበቁ ታክስ መለያዎች",
      approvedTINs: "የተፈቀዱ ታክስ መለያዎች",
      rejectedTINs: "የተከለከሉ ታክስ መለያዎች",
      dashboard: "ዳሽቦርድ",
      adminDashboard: "የአስተዳዳሪ ዳሽቦርድ",
      applyForTIN: "ለቲን ያመልክቱ",
      verifyTIN: "ቲን ያረጋግጡ",
      profile: "መገለጫ",
      logout: "ውጣ",
      submit: "አስገባ",
      cancel: "ሰርዝ",
      save: "አስቀምጥ",
      delete: "ሰርዝ",
      edit: "አስተካክል",
      view: "ተመልከት",
      search: "ፈልግ",
      filter: "ማጣሪያ",
      status: "ሁኔታ",
      actions: "ድርጊቶች",
      
      // TIN
      tinNumber: "የቲን ቁጥር",
      pending: "በመጠባበቅ ላይ",
      approved: "የተፈቀደ",
      rejected: "የተከለከለ",
      
      // User
      user: "ተጠቃሚ",
      nationalId: "የብሔራዊ መታወቂያ",
      phone: "ስልክ",
      region: "ክልል",
      address: "አድራሻ",
      dateApplied: "የተመለከተበት ቀን",
      
      // Messages
      loginSuccess: "መግባት ተሳክቷል!",
      loginFailed: "መግባት አልተሳካም። እባክዎ ይሞክሩ።",
      tinApproved: "ቲን በተሳካ ሁኔታ ተፈቅዷል",
      tinRejected: "ቲን ተቀባይነት አላገኘም",
      noPending: "በመጠባበቅ ላይ የሚገኙ ማመልከቻዎች የሉም",
      
      // Language
      language: "ቋንቋ",
      english: "English",
      amharic: "አማርኛ",
      
      // Theme
      lightMode: "ብርሃን ሁነታ",
      darkMode: "ጨለማ ሁነታ",
      
      // Analytics
      analytics: "ትንታኔ",
      totalApplications: "ጠቅላላ ማመልከቻዎች",
      thisMonth: "በዚህ ወር",
      approvalRate: "የማፅደቅ መጠን",
      recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Save language change to localStorage
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
