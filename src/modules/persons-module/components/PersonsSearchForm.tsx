import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { routes } from '@/common/routing/routes';
import { Button, Input } from '@/ui';

export const PersonsSearchForm: FC = () => {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [deathDate, setDeathDate] = useState('');

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

    router.push({
      pathname: routes.persons.search(),
      query: {
        name,
        lastName,
        birthDate,
        country,
        city,
        deathDate,
      },
    });
  };

  return (
    <form
      className="max-w-2xl md:max-w-full text-black"
      ref={formRef}
      onSubmit={onSubmit}
      action={routes.persons.index}
    >
      <div className="grid grid-cols-[1fr_1fr_150px] gap-6 sm:grid-cols-2 sm:gap-3">
        <div className="sm:order-1">
          <Input
            type="text"
            id="name"
            value={name}
            label="ІМЯ"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="sm:order-2">
          <Input
            type="text"
            id="lastName"
            value={lastName}
            label="ПРОЗВІШЧА"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="sm:order-5">
          <Input
            type="text"
            id="birthDate"
            value={birthDate}
            label="ГОД НАРАДЖЭННЯ"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="sm:order-3">
          <Input
            type="text"
            id="country"
            value={country}
            label="КРАІНА"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="sm:order-4">
          <Input
            type="text"
            id="city"
            value={city}
            label="ГОРАД"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="sm:order-6">
          <Input
            type="text"
            id="deathDate"
            value={deathDate}
            label="ГОД СМЕРЦІ"
            onChange={(e) => setDeathDate(e.target.value)}
          />
        </div>
      </div>

      <Button variant="default" size="sm">
        Search
      </Button>
    </form>
  );
};
