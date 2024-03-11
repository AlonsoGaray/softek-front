/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FamiliaDesktop from '@/assets/familia-desktop.png';
import FamiliaMobil from '@/assets/familia-mobil.png';
import Badge from '@/components/Badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { paths } from '@/utils/constants';

enum DocumentTypeEnum {
  dni = 'DNI',
  ruc = 'RUC',
}
interface IFormInput {
  phoneNumber: string;
  documentNumber: string;
  documentType: DocumentTypeEnum;
  acceptPrivacy: boolean;
  acceptCommunication: boolean;
}

function Seguro() {
  const navigate = useNavigate();

  const [documentType, setDocumentType] = useLocalStorage(
    'documentType',
    DocumentTypeEnum.dni,
  );
  const [documentNumber, setDocumentNumber] = useLocalStorage(
    'documentNumber',
    '',
  );
  const [phoneNumber, setPhoneNumber] = useLocalStorage('phoneNumber', '');
  const [acceptPrivacy, setAcceptPrivacy] = useLocalStorage(
    'acceptPrivacy',
    '',
  );
  const [acceptCommunication, setAcceptCommunication] = useLocalStorage(
    'acceptCommunication',
    '',
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      phoneNumber: phoneNumber,
      documentNumber: documentNumber,
      documentType: documentType,
      acceptPrivacy: acceptPrivacy,
      acceptCommunication: acceptCommunication,
    },
  });

  const [documentValue, setDocumentValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const selectedDocumentType = watch('documentType');
  const documentNumberLength =
    selectedDocumentType === DocumentTypeEnum.ruc ? 11 : 8;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setDocumentNumber(data.documentNumber);
    setPhoneNumber(data.phoneNumber);
    setDocumentType(data.documentType);
    setAcceptPrivacy(data.acceptPrivacy);
    setAcceptCommunication(data.acceptCommunication);
    navigate(paths.PLANES);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    const inputValue = e.target.value;

    if (
      (e.target.name === 'documentNumber' || e.target.name === 'phoneNumber') &&
      (inputValue === '' || re.test(inputValue))
    ) {
      e.target.name === 'documentNumber'
        ? setDocumentValue(inputValue)
        : setPhoneValue(inputValue);
    }
  };

  const onSelectChange = () => {
    setDocumentValue('');
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-6 md:flex-row md:gap-24 lg:gap-32">
      <div className="hidden md:flex">
        <img
          className="rounded-2xl"
          src={FamiliaDesktop}
          alt="Foto familia feliz"
          width={600}
        />
      </div>
      <div className="flex flex-col gap-6 md:max-w-[360px]">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center gap-2">
            <Badge>Seguro Salud Flexible</Badge>
            <h2 className="max-w-52 text-3xl font-bold leading-9 md:max-w-72">
              Creado para ti y tu familia
            </h2>
          </div>

          <div className="flex md:hidden">
            <img
              className="rounded-2xl"
              src={FamiliaMobil}
              alt="Foto familia feliz"
              width={180}
            />
          </div>
        </div>

        <div className="w-full border border-[#2B304E] md:hidden"></div>

        <div className="mb-16 flex flex-col gap-6 md:mb-0">
          <p className="text-pretty text-lg font-bold md:text-sm">
            Tu eliges cuanto pagar. Ingresa tus datos, cotiza y recibe nuestra
            asesoria, 100% online
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-14 w-full items-center">
              <div className="h-full w-36 rounded-lg rounded-r-none border border-[#5E6488] p-4">
                <select
                  className="h-full w-full"
                  {...register('documentType')}
                  onChange={onSelectChange}
                  defaultValue={documentType}
                >
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                </select>
              </div>
              <div className="h-full w-full rounded-lg rounded-l-none border border-l-0 border-[#5E6488]">
                <input
                  {...register('documentNumber', {
                    required: 'Campo requerido',
                    minLength: {
                      value: documentNumberLength,
                      message: `El documento debe tener al menos ${documentNumberLength} caracteres`,
                    },
                  })}
                  className="h-full w-full p-4"
                  type="text"
                  value={documentValue}
                  onChange={onChange}
                  placeholder="Nro. de documento"
                  maxLength={documentNumberLength}
                />
              </div>
            </div>
            {errors.documentNumber && (
              <p className="text-red-500">{errors.documentNumber.message}</p>
            )}

            <input
              type="text"
              {...register('phoneNumber', {
                required: 'Campo requerido',
                minLength: {
                  value: 9,
                  message: `El celular debe tener al menos 9 caracteres`,
                },
              })}
              maxLength={9}
              onChange={onChange}
              value={phoneValue}
              placeholder="Celular"
              className="h-full w-full rounded-lg border border-[#5E6488] p-4"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}

            <div className="flex w-full justify-start gap-3">
              <Controller
                name="acceptPrivacy"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange } }) => (
                  <input
                    onChange={(e) => onChange(e.target.checked)}
                    type="checkbox"
                    checked={acceptPrivacy}
                    onClick={() => setAcceptPrivacy((prev: any) => !prev)}
                  />
                )}
              />
              <label>Acepto la Politica de Privacidad</label>
            </div>
            {errors.acceptPrivacy && (
              <p className="text-red-500">Debes aceptar las politicas</p>
            )}

            <div className="flex w-full justify-start gap-3">
              <Controller
                name="acceptCommunication"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange } }) => (
                  <input
                    onChange={(e) => onChange(e.target.checked)}
                    type="checkbox"
                    checked={acceptCommunication}
                    onClick={() => setAcceptCommunication((prev: any) => !prev)}
                  />
                )}
              />
              <label>Acepto la Politica de Comunicaciones Comerciales</label>
            </div>
            {errors.acceptCommunication && (
              <p className="text-red-500">Debes aceptar las politicas</p>
            )}

            <a className="underline" href="https://google.com" target="_blank">
              Aplican Terminos y Condiciones
            </a>

            <button
              type="submit"
              className="mt-4 rounded-[40px] bg-[#03050F] py-5 text-xl font-bold text-white md:w-fit md:px-10"
            >
              Cotiza aqui
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Seguro;
