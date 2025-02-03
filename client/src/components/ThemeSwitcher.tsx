import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { toggleAppTheme } from "@/features/theme/themeSlice";

import { RootState } from "@/store";


export default function ThemeSwitcher() {
  // selecting the default theme from the state
  const theme = useSelector((state: RootState) => state.appTheme.theme);

  // dispatching an action
  const dispatch = useDispatch();

  // adding dark class to the html element, to apply dark theme, and removing it
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  //toggling the theme
  function toggleTheme() {
    dispatch(toggleAppTheme());
  }
  return (
    <div className="flex">
      <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="clcik to toggle the color theme, from dark to light or viceversa">
        {theme === "light" ? <Sun size={24} aria-label="sun icon" /> : <Moon size={24} aria-label="moon icon" />}
      </Button>
    </div>
  );
}
