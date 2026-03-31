import { useState } from "react";
import {
  Home,
  Brain,
  PenTool,
  Shield,
  FileSearch,
  Code,
  ChevronRight,
  ChevronDown,
  Book,
} from "lucide-react";
import { Link } from "react-router";

const menuItems = [
  { id: "home", icon: Home, label: "Home", active: true, href: "/dashboard" },
  {
    id: "courses",
    icon: Book,
    label: "Courses",
    active: false,
    href: "/courses/",
  },

  {
    id: "ai-tools",
    icon: Brain,
    label: "AI Tools",
    href: "",
    submenu: [
      {
        id: "text-editor",
        icon: PenTool,
        label: "AI-Assisted Text Editor",
        href: "/editor/",
      },
      {
        id: "ai-detection",
        icon: Shield,
        label: "AI Detection",
        href: "/ai-detector/",
      },
      {
        id: "summarizer",
        icon: FileSearch,
        label: "Lecture Summarizer",
        href: "/youtube-summary/",
      },
      {
        id: "code-editor",
        icon: Code,
        label: "Problem solving",
        href: "/problems/",
      },
    ],
  },
];

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["ai-tools"]);

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-700 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  item.active
                    ? "bg-gray-800 text-white border border-gray-700"
                    : "text-white hover:bg-gray-800"
                }`}
                onClick={() => item.submenu && toggleSubmenu(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <Link to={item.href} className="font-medium">
                    {item.label}
                  </Link>
                </div>
                {item.submenu &&
                  (expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
              </div>

              {item.submenu && expandedItems.includes(item.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem.id}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <subItem.icon className="w-4 h-4" />
                      <Link to={subItem.href} className="text-sm">
                        {subItem.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
