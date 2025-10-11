import React from "react";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
