import { ChangeEvent, useState } from 'react';
import FamiliaMobil from '../../assets/familia-mobil.png';
import Badge from '../../components/Badge';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

enum DocumentTypeEnum {
  dni = 'dni',
  ruc = 'ruc',
}
interface IFormInput {
  phoneNumber: string;
  documentNumber: string;
  documentType: DocumentTypeEnum;
  acceptPrivacy: boolean;
  acceptCommunication: boolean;
}

function Seguro() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInput>();
  const [documentValue, setDocumentValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const selectedDocumentType = watch('documentType');

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    const inputValue = e.target.value;

    if (
      e.target.name === 'documentNumber' &&
      (inputValue === '' || re.test(inputValue))
    ) {
      setDocumentValue(inputValue);
    } else if (
      e.target.name === 'phoneNumber' &&
      (inputValue === '' || re.test(inputValue))
    ) {
      setPhoneValue(inputValue);
    }
  };

  const onSelectChange = () => {
    setDocumentValue('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col justify-center gap-2">
          <Badge>Seguro Salud Flexible</Badge>
          <h2 className="max-w-52 text-3xl font-bold leading-9 md:max-w-72">
            Creado para ti y tu familia
          </h2>
        </div>

        <div className="flex">
          <img
            className="rounded-2xl"
            src={FamiliaMobil}
            alt="Foto familia feliz"
            width={180}
          />
        </div>
      </div>

      <div className="w-full border border-[#2B304E] md:hidden"></div>

      <div className="flex flex-col gap-6">
        <p className="text-pretty text-lg font-bold">
          Tu eliges cuanto pagar. Ingresa tus datos, cotiza y recibe nuestra
          asesoria, 100% online
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-14 w-full items-center">
            <div className="h-full w-36 rounded-lg rounded-r-none border border-[#5E6488] p-4">
              <select
                className="h-full w-full"
                {...register('documentType')}
                onChange={onSelectChange}
              >
                <option value="dni">DNI</option>
                <option value="ruc">RUC</option>
              </select>
            </div>
            <div className="h-full w-full rounded-lg rounded-l-none border border-l-0 border-[#5E6488]">
              <input
                {...register('documentNumber', { required: true })}
                className="h-full w-full p-4"
                type="text"
                value={documentValue}
                onChange={onChange}
                placeholder="Nro. de documento"
                maxLength={
                  selectedDocumentType === DocumentTypeEnum.ruc ? 11 : 8
                }
              />
            </div>
          </div>
          {errors.documentNumber ? (
            <p className="text-red-500">Requerido</p>
          ) : null}

          <input
            type="text"
            {...register('phoneNumber', { required: true })}
            maxLength={9}
            onChange={onChange}
            value={phoneValue}
            placeholder="Celular"
            className="h-full w-full rounded-lg border border-[#5E6488] p-4"
          />
          {errors.phoneNumber ? (
            <p className="text-red-500">Requerido</p>
          ) : null}

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
                />
              )}
            />
            <label>Acepto la Politica de Privacidad</label>
          </div>

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
                />
              )}
            />
            <label>Acepto la Politica de Comunicaciones Comerciales</label>
          </div>

          <a className="underline" href="https://google.com" target="_blank">
            Aplican Terminos y Condiciones
          </a>

          <button
            type="submit"
            className="mt-4 rounded-[40px] bg-[#03050F] py-5 text-xl font-bold text-white"
          >
            Cotiza aqui
          </button>
        </form>
      </div>
    </div>
  );
}
export default Seguro;
