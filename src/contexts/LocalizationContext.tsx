import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

// Define the structure of our translations
interface Translations {
  navigation: {
    home: string;
    report: string;
    dashboard: string;
    alerts: string;
    forum: string;
    emergency: string;
    signin: string;
    signup: string;
    profile: string;
    logout: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    start_reporting: string;
    view_dashboard: string;
  };
  features: {
    geotagged_reporting: string;
    geotagged_description: string;
    community_network: string;
    community_description: string;
    ai_alerts: string;
    ai_description: string;
  };
  stats: {
    reports: string;
    alerts: string;
    signals: string;
    users: string;
  };
  report: {
    title: string;
    description: string;
    hazard_type: string;
    location: string;
    use_current_location: string;
    description_label: string;
    describe_observation: string;
    media_upload: string;
    drop_media: string;
    take_photo: string;
    guidelines: string;
    be_accurate: string;
    include_photos: string;
    report_immediately: string;
    safety_first: string;
    privacy: string;
    consent_public: string;
    blur_faces: string;
    privacy_note: string;
    submit_report: string;
    verification_note: string;
  };
  dashboard: {
    title: string;
    description: string;
    filters: string;
    export_data: string;
    live_map: string;
    recent_alerts: string;
    interactive_map: string;
    showing_reports: string;
  };
  alerts: {
    title: string;
    description: string;
    subscribe: string;
    hazard_type: string;
    all_types: string;
    severity: string;
    all_levels: string;
    critical: string;
    high: string;
    medium: string;
    expiring_soon: string;
    no_alerts: string;
    no_alerts_message: string;
    subscribe_alerts: string;
  };
  forum: {
    title: string;
    description: string;
    new_thread: string;
    search_discussions: string;
    all_topics: string;
    preparedness: string;
    technology: string;
    reporting: string;
    community: string;
    create_discussion: string;
    share_thoughts: string;
    thread_title: string;
    discuss_content: string;
    post_thread: string;
    load_more: string;
  };
  emergency: {
    title: string;
    description: string;
    emergency_hotline: string;
    call_now: string;
    emergency_contacts: string;
    official_response: string;
    hazard_types: string;
    select_hazard: string;
    all_hazards: string;
    tsunami: string;
    storm_surge: string;
    flooding: string;
    high_waves: string;
    preparedness_resources: string;
    downloadable_guides: string;
    search_resources: string;
    essential_tips: string;
    quick_reminders: string;
    tsunami_warning: string;
    move_inland: string;
    evacuate_before_storm: string;
    high_waves_caution: string;
    general_preparedness: string;
    emergency_kit: string;
  };
  auth: {
    welcome_back: string;
    signin_description: string;
    email: string;
    password: string;
    signin_button: string;
    no_account: string;
    signup_link: string;
    create_account: string;
    signup_description: string;
    full_name: string;
    confirm_password: string;
    signup_button: string;
    have_account: string;
    signin_link: string;
    user_profile: string;
    manage_account: string;
    account_settings: string;
    update_info: string;
    location: string;
    city_state: string;
    notification_preferences: string;
    email_notifications: string;
    sms_alerts: string;
    push_notifications: string;
    save_changes: string;
    logout: string;
  };
}

// Define available languages
type Language = "en" | "hi";

// Define the context structure
interface LocalizationContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Language mappings
const languages: Record<Language, Translations> = {
  en,
  hi
};

// Provider component
export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  
  const translations = languages[language];
  
  // Translation function
  const t = (key: string): string => {
    // Split the key by dots to navigate the object structure
    const keys = key.split(".");
    let result: any = translations;
    
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        // Return the key if translation not found
        return key;
      }
    }
    
    return result as string;
  };
  
  return (
    <LocalizationContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to use the localization context
export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};