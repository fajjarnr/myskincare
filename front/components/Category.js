/* This example requires Tailwind CSS v2.0+ */
const categories = [
  {
    name: 'New Arrivals',
    href: '#',
    imageSrc:
      'https://images.somethinc.com/uploads/DF324D0A-653E-4201-B282-0372F526F00E.jpeg',
  },
  {
    name: 'Productivity',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
  },
  {
    name: 'Workspace',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
  },
  {
    name: 'Accessories',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
  },
];

export default function Category() {
  return (
    <div className="py-16 sm:py-24 xl:max-w-7xl xl:mx-auto xl:px-8">
      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
            <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-4 xl:gap-x-8">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="relative w-96 h-40 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-90 xl:w-auto"
                >
                  <span aria-hidden="true" className="absolute inset-0">
                    <img
                      src={category.imageSrc}
                      className="w-full h-full object-center object-cover"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
