import Layout from './Layout';

import { ArchiveIcon, UsersIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function Home({ dashboard }) {
  const { product, campaign, users } = dashboard;

  return (
    <Layout>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Dashboard
        </h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <ArchiveIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                Total Products
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {product.Count}
              </p>
              <p>
                <span className="sr-only">by</span>
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/products"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                    <span className="sr-only"> stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>

          <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <ArchiveIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                Total Campaign
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {campaign.Count}
              </p>
              <p>
                <span className="sr-only">by</span>
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/campaign"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                    <span className="sr-only"> stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>

          <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                Total Users
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {users.Count}
              </p>
              <p>
                <span className="sr-only">by</span>
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href="/users"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                    <span className="sr-only"> stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const prod = await fetch(`${process.env.API_GATEWAY}/dashboard`);
  const dashboard = await prod.json();

  return {
    props: {
      dashboard,
    },
    // revalidate: 10,
  };
}
