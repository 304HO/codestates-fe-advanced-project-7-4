import { useState } from "react";

const useInput = () => {
  const [state, setState] = useState<string>("");
  // const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputChange = (e: any) => {
    setState(e.target.value);
  };
  return [state, inputChange];
};

export default useInput;
