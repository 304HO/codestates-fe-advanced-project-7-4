declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

export type ThemeType = {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  background: string;
  color: string;
  setTheme?: () => void;
};
