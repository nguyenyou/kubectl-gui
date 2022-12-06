import { filterNameAtom } from '@/atoms'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'

const SideBar = () => {
  const [filterName, setFilterName] = useAtom(filterNameAtom)

  const handleRemoveSearch = () => {
    setFilterName('')
  }

  return (
    <div className='fixed left-[160px] right-0 top-0 h-[44px] bg-primary-900 px-3'>
      <div className='flex h-full items-center justify-between'>
        <div className='relative inline-block w-auto'>
          <input
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className='rounded border border-primary-700 bg-primary-900 py-1 pr-7 pl-2 text-primary-400 focus:border-primary-600 focus:outline-none'
            placeholder='Filter'
            autoCapitalize='off'
            autoCorrect='off'
            autoComplete='off'
          />
          {filterName && (
            <button
              onClick={handleRemoveSearch}
              className='absolute right-[8px] top-[6px] inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-600 active:bg-primary-700'
            >
              <XMarkIcon className='h-3 w-3' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
