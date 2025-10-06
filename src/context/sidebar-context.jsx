import { createContext, useContext, useState, useEffect } from "react";

// context yapısının kurulumu
export const SidebarContext = createContext();

// sağlayıcı component (HOC)
export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 🔹 Sidebar açıkken body scroll'u kapat ve scrollbar stilini değiştir
  useEffect(() => {
    if (!isCollapsed) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.add("custom-scrollbar-dark"); // ✅ koyu scrollbar
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("custom-scrollbar-dark"); // ✅ kaldır
    }
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// custom hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("App'i <SidebarProvider> ile sarmalayın");
  }

  return context;
};
