import Link from 'next/link';
import { StarIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductList({ data }) {
  const { Items } = data;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {Items.map(({ id, name, imageUrl, rating, price }) => (
            <div
              key={id}
              className="group relative p-4 border-r border-b border-gray-200 sm:p-6"
            >
              <Link href={`product/${id}`}>
                <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                  <img
                    src={imageUrl}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="pt-10 pb-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {name}
                    </a>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{rating} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((r) => (
                        <StarIcon
                          key={r}
                          className={classNames(
                            rating > r ? 'text-yellow-400' : 'text-gray-200',
                            'flex-shrink-0 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
