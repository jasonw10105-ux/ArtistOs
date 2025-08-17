import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Insights', path: '/insights', icon: <InsightsIcon /> },
  { label: 'Inquiries', path: '/inquiries', icon: <InquiryIcon /> },
  { label: 'Messages', path: '/messages', icon: <MessageIcon /> },
  { label: 'Sales', path: '/sales', icon: <SalesIcon /> },
];

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <nav>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
