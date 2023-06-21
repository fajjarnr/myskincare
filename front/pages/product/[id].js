import { ShieldCheckIcon } from '@heroicons/react/outline';
import { CheckIcon, StarIcon } from '@heroicons/react/solid';
import Layout from '../Layout';
import axios from 'axios';
import router from 'next/router';

// const payment = process.env.PAYMENT_GATEWAY;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail({ product }) {
  function createReport(e) {
    e.preventDefault();
    return axios
      .post(`${process.env.PAYMENT_GATEWAY}/payment`, { product })
      .then((res) => {
        if (res.data.url) {
          router.push(res.data.url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    product
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center text-sm">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    /
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center text-sm">
                  <a
                    href={product.id}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {product.name}
                  </a>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {product.price}
              </p>

              <div className="ml-4 pl-4 border-l border-gray-300">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((r) => (
                        <StarIcon
                          key={r}
                          className={classNames(
                            product.rating > r
                              ? 'text-yellow-400'
                              : 'text-gray-200',
                            'flex-shrink-0 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="flex-shrink-0 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <form>
              <div className="mt-10">
                <button
                  type="submit"
                  onClick={createReport}
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const products = await fetch(`${process.env.API_GATEWAY}/product`);
  const data = await products.json();

  const paths = data.Items.map((p) => ({
    params: {
      id: p.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const prod = await fetch(`${process.env.API_GATEWAY}/product/${params.id}`);
  const product = await prod.json();

  return {
    props: {
      product,
    },
  };
}
