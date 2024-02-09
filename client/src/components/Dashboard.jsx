import NavBar from './NavBar';

function Dashboard() {
  return (
    <div className="w-full bg-white">
      <NavBar currentRoute="/dashboard" />
      <div className="w-full h-screen flex items-center justify-center text-3xl font-bold">
        Dashboard Page Coming Soon
      </div>
    </div>
  );
}

export default Dashboard;
