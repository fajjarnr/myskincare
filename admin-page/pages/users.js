import Link from 'next/link';
import Layout from './Layout';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function User({ users }) {
  const { Items } = users;

  return (
    <Layout page="User">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto"></div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Items.map(({ id, name, email, role }) => (
                      <tr key={id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-gray-50">
                          <span
                            className={classNames(
                              role === 'admin'
                                ? 'bg-green-500 px-1 py-1 rounded-lg'
                                : 'bg-blue-400 px-1 py-1 rounded-lg'
                            )}
                          >
                            {role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const prod = await fetch(`${process.env.API_GATEWAY}/users`);
  const users = await prod.json();

  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}
