import { Outlet } from "react-router";


export default function RootLayout() {
  return (
    <div className="scroll-pt-16 font-sans antialiased min-h-screen dark:bg-gray-950"><Outlet/></div>
  );
}
