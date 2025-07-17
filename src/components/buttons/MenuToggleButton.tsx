'use client';

type MenuToggleButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const MenuToggleButton = ({ isOpen, onClick }: MenuToggleButtonProps) => {
  return (
    <button
      className="md:hidden text-2xl text-blue-600 focus:outline-none"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      Menu<i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
    </button>
  );
};

export default MenuToggleButton;
