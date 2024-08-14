import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Card from "./Card";
import Upload from "./Upload";

const Information = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        className="bg-white text-black hover:bg-gray-300 border-2 border-blue-300"
        onClick={() => setOpenModal(true)}
      >
        เพิ่มข้อมูล
      </Button>

      {openModal && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 opacity-75 z-40" // เพิ่ม z-index เพื่อให้ backdrop อยู่เลเยอร์หน้าสุด
            onClick={() => setOpenModal(false)}
          ></div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
            className="relative z-50 mt-16 w-3/5 mx-auto" // ตั้ง z-index ต่ำกว่า backdrop และกำหนดความกว้างเป็น w-96
          >
            <Modal.Header className="h-auto w-auto mr-4 mt-3"></Modal.Header>
            <div className="w-auto p-10 py">
              <Upload />
            </div>
            <div className="flex pb-4 justify-center gap-4">
              <Button className="w-40 bg-green-400">ยืนยัน</Button>
              <Button className="w-40 bg-red-600">ยกเลิก</Button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Information;
