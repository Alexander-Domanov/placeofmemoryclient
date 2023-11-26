// import { FC, FormEvent, useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import * as yup from 'yup';
// import { routes } from '@/common/routing/routes';
// import { Button, Input } from '@/ui';
// import { FilterCondition } from '@/types';
// import { useTranslation } from '@/components/internationalization';
//
// export const PersonsSearchForm: FC = () => {
//   const router = useRouter();
//   const { t } = useTranslation();
//
//   const formRef = useRef<HTMLFormElement>(null);
//
//   const [name, setName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [birthDate, setBirthDate] = useState('');
//   const [country, setCountry] = useState('');
//   const [city, setCity] = useState('');
//   const [deathDate, setDeathDate] = useState('');
//   const [filterConditionBirthDate, setFilterConditionBirthDate] =
//     useState<FilterCondition>(FilterCondition.gte);
//   const [filterConditionDeathDate, setFilterConditionDeathDate] =
//     useState<FilterCondition>(FilterCondition.lte);
//
//   const currentYear = new Date().getFullYear();
//
//   useEffect(() => {
//     if (router.query.name) {
//       setName(router.query.name as string);
//     }
//
//     if (router.query.lastName) {
//       setLastName(router.query.lastName as string);
//     }
//
//     if (router.query.birthDate) {
//       setBirthDate(router.query.birthDate as string);
//     }
//
//     if (router.query.country) {
//       setCountry(router.query.country as string);
//     }
//
//     if (router.query.city) {
//       setCity(router.query.city as string);
//     }
//
//     if (router.query.deathDate) {
//       setDeathDate(router.query.deathDate as string);
//     }
//   }, [router.query]);
//
//   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//
//     const query = {
//       ...(name && { name }),
//       ...(lastName && { lastName }),
//       ...(birthDate && { birthDate }),
//       ...(country && { country }),
//       ...(city && { city }),
//       ...(deathDate && { deathDate }),
//       ...(filterConditionBirthDate && { filterConditionBirthDate }),
//       ...(filterConditionDeathDate && { filterConditionDeathDate }),
//       page: 1,
//     };
//
//     router.push({
//       pathname: routes.persons.search(),
//       query,
//     });
//   };
//
//   const onClear = () => {
//     router.push(routes.persons.index);
//   };
//
//   const {
//     name: nameT,
//     lastName: lastNameT,
//     country: countryT,
//     city: cityT,
//     birthDate: birthDateT,
//     deathDate: deathDateT,
//     search: searchT,
//     gte: gteT,
//     lte: lteT,
//     clear: clearT,
//     error: errorT,
//   } = t.people.search.page;
//
//   return (
//     <form
//       className="max-w-3xl md:max-w-full"
//       ref={formRef}
//       onSubmit={onSubmit}
//       action={routes.persons.index}
//     >
//       <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 lg:grid-cols-[1fr_1fr_240px] sm:grid-cols-2 sm:gap-3">
//         <div className="sm:order-1">
//           <Input
//             type="text"
//             id="name"
//             value={name}
//             label={nameT}
//             showErrorMessage={false}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//
//         <div className="sm:order-2">
//           <Input
//             type="text"
//             id="lastName"
//             value={lastName}
//             label={lastNameT}
//             showErrorMessage={false}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//
//         <div className="sm:order-5 grid grid-cols-[93px_1fr] gap-1 sm:grid-cols-[1fr_2fr] sm:col-span-2">
//           <select
//             id="filterConditionBirthDate"
//             className="block focus:outline-none rounded-md bg-dark-700 text-dark-150 focus:outline-0 px-3 py-2 text-xs border-dark-300 border-[1px]"
//             value={filterConditionBirthDate}
//             onChange={(e) => {
//               setFilterConditionBirthDate(e.target.value as FilterCondition);
//             }}
//           >
//             <option value={FilterCondition.gte}>{gteT}</option>
//             <option value={FilterCondition.lte}>{lteT}</option>
//           </select>
//
//           <Input
//             type="text"
//             id="birthDate"
//             value={birthDate}
//             maxLength={4}
//             className="flex-grow"
//             error={
//               yup.number().min(0).max(currentYear).isValidSync(+birthDate) &&
//               (!birthDate || birthDate.length === 4)
//                 ? null
//                 : { errorT }
//             }
//             label={birthDateT}
//             showErrorMessage={false}
//             onChange={(e) => setBirthDate(e.target.value)}
//           />
//         </div>
//
//         <div className="sm:order-3">
//           <Input
//             type="text"
//             id="country"
//             value={country}
//             label={countryT}
//             showErrorMessage={false}
//             onChange={(e) => setCountry(e.target.value)}
//           />
//         </div>
//
//         <div className="sm:order-4">
//           <Input
//             type="text"
//             id="city"
//             value={city}
//             label={cityT}
//             showErrorMessage={false}
//             onChange={(e) => setCity(e.target.value)}
//           />
//         </div>
//
//         <div className="sm:order-6 grid grid-cols-[93px_1fr] gap-1 sm:grid-cols-[1fr_2fr] sm:col-span-2">
//           <select
//             id="filterConditionDeathDate"
//             className="block focus:outline-none rounded-md bg-dark-700 text-dark-150 focus:outline-0 px-3 py-2 text-xs border-dark-300 border-[1px]"
//             value={filterConditionDeathDate}
//             onChange={(e) =>
//               setFilterConditionDeathDate(e.target.value as FilterCondition)
//             }
//           >
//             <option value={FilterCondition.gte}>{gteT}</option>
//             <option value={FilterCondition.lte}>{lteT}</option>
//           </select>
//
//           <Input
//             type="text"
//             id="deathDate"
//             maxLength={4}
//             error={
//               yup.number().min(0).max(currentYear).isValidSync(+deathDate) &&
//               (!deathDate || deathDate.length === 4)
//                 ? null
//                 : { errorT }
//             }
//             value={deathDate}
//             label={deathDateT}
//             showErrorMessage={false}
//             onChange={(e) => setDeathDate(e.target.value)}
//           />
//         </div>
//       </div>
//
//       <div className="flex items-center gap-3 sm:gap-8 mt-4 flex-wrap">
//         <Button variant="default" size="sm" className="sm:w-full">
//           {searchT}
//         </Button>
//
//         <Button
//           variant="default"
//           size="sm"
//           type="button"
//           className="sm:w-full"
//           onClick={onClear}
//         >
//           {clearT}
//         </Button>
//       </div>
//     </form>
//   );
// };
