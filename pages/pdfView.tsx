import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const InvoicePDF = dynamic(() => import('./pdf'), {
  ssr: false,
});

const View = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className='w-screen h-screen grid place-content-center bg-slate-400 relative'>
      <InvoicePDF />
    </div>
  );
};

export default View;
