import LightTheme from "./../../assets/theme/light";
import DarkTheme from "./../../assets/theme/dark";
const storage = {
  getTheme: () => (localStorage.getItem("themeId") === "light" ? LightTheme : DarkTheme),
  setTheme: (themeId: string) => {
    localStorage.setItem("themeId", themeId === "light" ? "dark" : "light");
  }
};
export default storage;
