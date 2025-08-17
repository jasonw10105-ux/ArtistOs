import { useState, useEffect } from "react";
import { BarChart2, Inbox, MessageCircle, DollarSign } from "lucide-react"; // Lucide icons

const navItems = [
  { label: "Insights", id: "insights", icon: <BarChart2 className="w-5 h-5" /> },
  { label: "Inquiries", id: "inquiries", icon: <Inbox className="w-5 h-5" /> },
  { label: "Messages", id: "messages", icon: <MessageCircle className="w-5 h-5" /> },
  { label: "Sales", id: "sales", icon: <DollarSign className="w-5 h-5" /> },
];

function Sidebar() {
  const [active, setActive] = useState("insights");

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "insights";
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && window.scrollY >= section.offsetTop - 100) {
          current = item.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">ArtistOS</h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left w-full ${
              active === item.id ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
