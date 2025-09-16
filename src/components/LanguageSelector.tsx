import { useLocalization } from "@/contexts/LocalizationContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useLocalization();
  
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" }
  ];
  
  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "hero" : "outline"}
            size="sm"
            onClick={() => setLanguage(lang.code as any)}
            className="text-xs"
          >
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
}