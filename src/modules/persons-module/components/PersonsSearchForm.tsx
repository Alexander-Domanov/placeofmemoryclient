import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { routes } from '@/common/routing/routes';
import { Button, Input } from '@/ui';
import { FilterCondition } from '@/types';

export const PersonsSearchForm: FC = () => {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [filterConditionBirthDate, setFilterConditionBirthDate] =
    useState<FilterCondition>(FilterCondition.gte);
  const [filterConditionDeathDate, setFilterConditionDeathDate] =
    useState<FilterCondition>(FilterCondition.lte);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (router.query.name) {
      setName(router.query.name as string);
    }

    if (router.query.lastName) {
      setLastName(router.query.lastName as string);
    }
  }, [router.query]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = {
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(birthDate && { birthDate }),
      ...(country && { country }),
      ...(city && { city }),
      ...(deathDate && { deathDate }),
      ...(filterConditionBirthDate && { filterConditionBirthDate }),
      ...(filterConditionDeathDate && { filterConditionDeathDate }),
    };

    router.push({
      pathname: routes.persons.search(),
      query,
    });
  };

  return (
    <form
      className="max-w-2xl md:max-w-full"
      ref={formRef}
      onSubmit={onSubmit}
      action={routes.persons.index}
    >
      <div className="grid grid-cols-[1fr_1fr_2fr] gap-3 sm:grid-cols-2 sm:gap-3">
        <div className="sm:order-1">
          <Input
            type="text"
            id="name"
            value={name}
            label="ІМЯ"
            showErrorMessage={false}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="sm:order-2">
          <Input
            type="text"
            id="lastName"
            value={lastName}
            label="ПРОЗВІШЧА"
            showErrorMessage={false}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="sm:order-5 flex space-x-1">
          <select
            id="filterConditionBirthDate"
            className="block focus:outline-none rounded-md bg-dark-700 text-dark-150 focus:outline-0 px-3 py-2 text-xs border-dark-300 border-[1px]"
            value={filterConditionBirthDate}
            onChange={(e) => {
              setFilterConditionBirthDate(e.target.value as FilterCondition);
            }}
          >
            <option value={FilterCondition.gte}>БОЛЬШ</option>
            <option value={FilterCondition.lte}>МЕНЬШ</option>
          </select>

          <Input
            type="text"
            id="birthDate"
            value={birthDate}
            maxLength={4}
            error={
              yup.number().min(0).max(currentYear).isValidSync(+birthDate) &&
              (!birthDate || birthDate.length === 4)
                ? null
                : 'Няправільны фармат'
            }
            label="ГОД НАРАДЖЭННЯ"
            showErrorMessage={false}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="sm:order-3">
          <Input
            type="text"
            id="country"
            value={country}
            label="КРАІНА"
            showErrorMessage={false}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="sm:order-4">
          <Input
            type="text"
            id="city"
            value={city}
            label="ГОРАД"
            showErrorMessage={false}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="sm:order-6 flex space-x-1">
          <select
            id="filterConditionDeathDate"
            className="block focus:outline-none rounded-md bg-dark-700 text-dark-150 focus:outline-0 px-3 py-2 text-xs border-dark-300 border-[1px]"
            value={filterConditionDeathDate}
            onChange={(e) =>
              setFilterConditionDeathDate(e.target.value as FilterCondition)
            }
          >
            <option value={FilterCondition.gte}>БОЛЬШ</option>
            <option value={FilterCondition.lte}>МЕНЬШ</option>
          </select>

          <Input
            type="text"
            id="deathDate"
            maxLength={4}
            error={
              yup.number().min(0).max(currentYear).isValidSync(+deathDate) &&
              (!deathDate || deathDate.length === 4)
                ? null
                : 'Няправільны фармат'
            }
            value={deathDate}
            label="ГОД СМЕРЦІ"
            showErrorMessage={false}
            onChange={(e) => setDeathDate(e.target.value)}
          />
        </div>

        <Button
          variant="default"
          size="sm"
          className="sm:col-span-2 sm:order-9"
        >
          Пошук
        </Button>
      </div>
    </form>
  );
};
