type IProps = {
    children: React.ReactNode;
    handleModal: () => void;
    modal: boolean;
  };
  
  const ModalsContainer = ({ children, modal, handleModal }: IProps) => {
    return (
      <div className="w-full">
        <div
          className={`${
            modal
              ? 'opacity-100 w-full fixed h-screen z-[101] right-0 top-0 bottom-0 m-auto'
              : 'opacity-0 -z-50'
          }`}
          onClick={handleModal}
        ></div>
        <div
         onClick={handleModal}
          className={`max-w-[450px] fixed mx-auto z-[105] h-fit m-auto right-0 left-0 top-0 bottom-0 rounded ${
            modal
              ? 'opacity-100 duration-300 z-[102]'
              : 'bottom-0 right-0 left-0 opacity-0 duration-300 pointer-events-none'
          }`}
        >
          {children}
        </div>
      </div>
    );
  };
  
  export default ModalsContainer;
  