import Icon from "../../ui/Icon";

export function SearchBar() {
  return (
    <div className='w-4/12 '>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-blue sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <Icon
            name='search'
            className='text-blue'
            strokeWidth={0.9}
            size={20}
          />
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full pr-24 py-4 ps-14 pe-24 text-lg text-blue border border-none rounded-lg bg-blue-200 font-semibold font-OpenSans  placeholder:text-blue placeholder: focus:border-none'
          placeholder='Search outlets/products'
          required
        />
      </div>
    </div>
  );
}
