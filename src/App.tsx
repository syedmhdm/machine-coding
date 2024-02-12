function App() {
  return (
    <div className='flex h-screen bg-slate-600'>
      <div className='flex flex-col gap-5 p-5 bg-slate-800'>
        <div className='flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-slate-700'>
          1
        </div>
        <div className='flex items-center justify-center w-10 h-10 text-center rounded-full cursor-pointer bg-slate-700'>
          2
        </div>
        <div className='flex items-center justify-center w-10 h-10 text-center rounded-full cursor-pointer bg-slate-700'>
          3
        </div>
        <div className='flex items-center justify-center w-10 h-10 text-center rounded-full cursor-pointer bg-slate-700'>
          4
        </div>
        <div className='flex items-center justify-center w-10 h-10 text-center rounded-full cursor-default ring-2 ring-slate-400 bg-slate-700'>
          5
        </div>
        <div className='flex items-center justify-center w-10 h-10 text-center rounded-full cursor-pointer bg-slate-700'>
          6
        </div>
      </div>
      <div className='bg-slate-900 grow'>main page</div>
    </div>
  );
}

export default App;
