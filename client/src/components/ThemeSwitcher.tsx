import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { toggleAppTheme } from "@/features/theme/themeSlice";

import Moon from "@/components/ui/Moon";
import Sun from "@/components/ui/Sun";

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
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "light" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
