const Skeletoncard = () => {
  return (
    <>
      <div className="w-full bg-white rounded-md px-4 py-5 mb-2">
        <div className="animate-pulse">
          <h3 className="w-[4rem] h-2 bg-slate-700 rounded-md "></h3>
          <div className="flex justify-between mt-5">
            <div className="w-16 h-12 flex flex-col gap-4">
              <h2 className="w-[8rem] h-2 bg-slate-700 rounded-md"></h2>
              <h3 className="w-[3rem] h-2 bg-slate-700 rounded-md "></h3>
              <h3 className="w-[2rem] h-2 bg-slate-700 rounded-md "></h3>
            </div>
            <div className="w-14 h-14">
              <div className="w-10 h-10 rounded-full bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeletoncard;
