import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Footer from './Footer/Footer';

import Demo from '../public/images/home/demo.png';

import Bao from '../public/images/people/bao.jpeg';
import Hung from '../public/images/people/hung.jpeg';
import JasonBeh from '../public/images/people/jason-beh.jpeg';
import JasonYu from '../public/images/people/jason-yu.jpeg';
import JianZhe from '../public/images/people/jian-zhe.jpg';
import LiewGuan from '../public/images/people/liew-guan.jpeg';
import Marcus from '../public/images/people/marcus.jpeg';
import Nam from '../public/images/people/nam.jpeg';
import Vinh from '../public/images/people/vinh.jpeg';

import NavBar from './NavBar';

const features = [
  {
    name: 'Incident Report Annotation',
    description:
      'Registered cybersecurity experts will be able to dive deep into incident reports and provide explanations using our in-built annotation tools.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Graph Visualisation',
    description:
      'Using sophisticated graph visualisation techniques, users will be able to visualise the cyber attack sequences and gain new insights to enhance protection.',
    icon: LockClosedIcon,
  },
  {
    name: 'Multi-User Collaboration',
    description:
      'Teamwork makes the dreamwork to create the most comprehensive library of attackflows.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Version Control',
    description:
      'Our system supports version control which allows cybersecurity experts to view previous versions as references.',
    icon: FingerPrintIcon,
  },
];

const people = [
  {
    name: 'Gia Bao Hoang',
    studentID: 'a1814824',
    image: Bao,
  },
  {
    name: 'Hung Yee Wong',
    studentID: 'a1815836',
    image: Hung,
  },
  {
    name: 'Jie Shen Beh',
    studentID: 'a1834032',
    image: JasonBeh,
  },
  {
    name: 'Jiajun Yu',
    studentID: 'a1806320',
    image: JasonYu,
  },
  {
    name: 'Jian Zhe Chan',
    studentID: 'a1813851',
    image: JianZhe,
  },
  {
    name: 'Guan Chern Liew',
    studentID: 'a1837053',
    image: LiewGuan,
  },
  {
    name: 'Marcus Hoang',
    studentID: 'a1814303',
    image: Marcus,
  },
  {
    name: 'Hoang Nam Trinh',
    studentID: 'a1807377',
    image: Nam,
  },
  {
    name: 'Vinh Diem Nguyen',
    studentID: 'a1838114',
    image: Vinh,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <main className="isolate">
        <NavBar transparent currentRoute="/backTest" />
        {/* Hero section */}
        <div className="relative pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0D184F] to-[#0D184F] opacity-20 sm:left-[calc(20%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  AttackFlow
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Discover how to protect yourself from cyber attacks today by
                  exploring one of our published attackflows.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/library"
                    className="text-xl relative inline-flex items-center gap-x-1.5 rounded-full bg-primary-blue px-8 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                  >
                    Explore
                  </Link>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src={Demo}
                    alt="App screenshot"
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0D184F] to-[#0D184F] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-blue">
              Security is everything
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Features
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our aim is to provide open-source educational content
              (Attackflows) that summarises complicated cyber attacks for
              non-cybersecurity experts.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-blue">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* People section */}
        <div className="bg-white py-32">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We’re a dynamic group of individuals who are passionate about
                what we do.
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <img
                    className="mx-auto h-56 w-56 rounded-full"
                    src={person.image}
                    alt={person.name}
                  />
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {person.studentID}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
