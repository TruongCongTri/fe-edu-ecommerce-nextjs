// components/layouts/Sidebar.tsx

import Link from "next/link";

const Sidebar = ({ active, name }: { active: string; name: string }) => {
  const navItems = [
    { label: "Dashboard", href: "/profile-dashboard", key: "dashboard" },
    { label: "Saved Courses", href: "/my-courses/saved", key: "saved" },
    {
      label: "Recent Viewed Courses",
      href: "/my-courses/recent-viewed",
      key: "recent",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold">👋 Welcome</div>
      <div className="p-4 font-bold">{name}</div>
      <ul>
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={`block px-4 py-2 rounded ${
                active === item.key
                  ? "bg-green-100 text-green-600 font-semibold"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
