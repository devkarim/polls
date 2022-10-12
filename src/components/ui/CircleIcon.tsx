interface CircleIconProps {
  icon: ReactElement;
}

const CircleIcon: React.FC<CircleIconProps> = ({ icon }) => {
  return (
    <div className="bg-black text-white dark:bg-white dark:text-black rounded-full p-3 w-fit text-3xl">
      {icon}
    </div>
  );
};

export default CircleIcon;
