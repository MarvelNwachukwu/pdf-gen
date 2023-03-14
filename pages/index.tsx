import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { checkNipAndGetCompanyName } from '../api/checkNip';
import { PDfContext, updateApp } from './_app';

const Home: NextPage = () => {
  const [formField, setFormField] = useState({
    name: '',
    pesel: '',
    company_pesel: '',
  });

  const [inputs, setInputs] = useState<
    {
      id: number;
      value: string;
      pesel: string;
    }[]
  >([]);

  const [templateConcat, setTemplateConcat] = useState<string>(
    `${formField.name} ${
      formField.pesel
    } is signing a legally binding document with ${inputs.map(
      (signee) => ` ${signee.value} Pesel: ${signee.pesel}`
    )}
      Company Pesel: ${formField?.company_pesel}
    `
  );

  const addInput = () => {
    const newInput = { id: inputs.length + 1, value: '', pesel: '' };
    setInputs([...inputs, newInput]);
  };

  // checkNipAndGetCompanyName('9581663036')
  //   .then((companyName) => console.log(companyName))
  //   .catch((error) => console.error(error));

  useEffect(() => {
    updateApp(templateConcat);
  }, [templateConcat]);

  useEffect(() => {
    setTemplateConcat(
      `${formField.name} ${
        formField.pesel
      } is signing a legally binding document with ${inputs.map(
        (signee) => ` ${signee.value} Pesel: ${signee.pesel}
        Company Pesel: ${formField?.company_pesel}
        `
      )}`
    );
  }, [formField, inputs]);

  // console.log(useContext(PDfContext));
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Welcome to{' '}
          <a className='text-blue-600' href='https://nextjs.org'>
            PDF-Generator
          </a>
        </h1>

        <p className='mt-3 text-2xl'>Get started by filling the form</p>

        <form className='mt-32 mb-8 flex flex-col max-w-4xl gap-y-8 gap-x-4 sm:w-full'>
          <div className='grid grid-cols-2 gap-x-4'>
            <input
              type='text'
              placeholder='Your name'
              className='w-full py-3 px-2 bg-slate-200 rounded-md'
              onChange={(input) => {
                setFormField({ ...formField, name: input.currentTarget.value });
              }}
              autoComplete='name'
            />
            <input
              type='text'
              placeholder={`Your Pesel`}
              className='w-full py-3 px-2 bg-slate-200 rounded-md'
              onChange={(input) => {
                setFormField({
                  ...formField,
                  pesel: input.currentTarget.value,
                });
              }}
              autoComplete='phone'
            />
          </div>

          {inputs.map((input) => (
            <div key={input.id} className='grid grid-cols-2 gap-x-4'>
              <input
                value={input.value}
                placeholder={`Name ${input.id}`}
                onChange={(e) => {
                  const newInputs = [...inputs];
                  newInputs[input.id - 1].value = e.target.value;
                  setInputs(newInputs);
                }}
                className='w-full py-3 px-2 bg-slate-200 rounded-md'
              />
              <input
                value={input.pesel}
                placeholder={`Pesel ${input.id}`}
                onChange={(e) => {
                  const newInputs = [...inputs];
                  newInputs[input.id - 1].pesel = e.target.value;
                  setInputs(newInputs);
                }}
                className='w-full py-3 px-2 bg-slate-200 rounded-md'
              />
            </div>
          ))}

          <input
            type='text'
            placeholder={`Company Pesel`}
            className='w-full py-3 px-2 bg-slate-200 rounded-md'
            onChange={(input) => {
              setFormField({ ...formField, company_pesel: input.target.value });
            }}
            autoComplete=''
          />
        </form>

        <aside className='w-full max-w-4xl flex justify-between mb-8'>
          {/* <button
            className='h-12 w-1/3 bg-red-500 text-white'
            onClick={() => {
              if (additionalSigner >= 1) {
                setAdditionalSigner((prevState) => prevState - 1);
              }
            }}
          >
            Remove Signer
          </button> */}
          <button
            className='h-12 w-1/3 bg-blue-500 text-white'
            onClick={addInput}
          >
            Add Signer
          </button>
        </aside>
        <article className='bg-gray-200 w-full h-max py-10 px-16 mb-8 max-w-4xl'>
          {`
              ${formField.name} ${
            formField.pesel
          } is signing a legally binding document with ${inputs.map(
            (signee) => ` ${signee.value} Pesel: ${signee.pesel}
            `
          )}

            Company Pesel: ${formField?.company_pesel}
            `}
        </article>
        <Link
          href={{
            pathname: '/pdfView',
            // query: formField,
          }}
        >
          <button className='bg-blue-500 text-white px-8 py-4 rounded-md'>
            Generate PDF
          </button>
        </Link>
      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center justify-center gap-2'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
