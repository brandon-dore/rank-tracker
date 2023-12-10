import { PropsWithChildren } from "react";
import { AppBar } from "../AppBar";

export const PageContainer = (props: PropsWithChildren) => {
  return (
    <div className="pageContainer">
      <AppBar />
      {props.children}
    </div>
  );
};
