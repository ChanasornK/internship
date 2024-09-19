import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiUser, HiViewBoards } from "react-icons/hi";

const Sidebarz = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-full z-50"> {/* Positioned to the right */}
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              <button
                onClick={onClose} // Close the sidebar when Edit Profile is clicked
                className="w-[100%] px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
              >
                <span className="text-sm pl-3">Edit Profile</span>
              </button>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Sidebarz;
