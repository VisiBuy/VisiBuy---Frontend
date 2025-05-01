import { TPaginationProps } from "../../models/paginationProps";
import { Button } from "../../ui/Button";
import Icon from "../../ui/Icon";
import { useCallback, useEffect, useMemo, useState } from "react";

export function Pagination<T>({
  setQueryParam,
  queryParams,
  queryBuilder,
  totalPages,
  isFetching,
}: TPaginationProps<T>) {
  const [currentGroup, setCurrentGroup] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalGroups = Math.ceil(totalPages / itemsPerPage);
  //console.log(totalPages,'pagination')
  // Calculate start and end index for current group
  const startIndex = (currentGroup - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalPages);
  useEffect(() => {
    setCurrentPage(pagesArray[startIndex]); // select first page on new group load
  }, [currentGroup, totalPages]);
  useEffect(() => {
    setQueryParam({
      ...queryBuilder.buildQuery(queryParams),
      page: currentPage,
    });
  }, [currentPage]);
  const setFirstPage = useCallback(() => {
    setCurrentGroup(1);
  }, []);
  const setLastPage = useCallback(() => {
    setCurrentGroup(totalGroups);
  }, []);
  const handleNextGroup = useCallback(() => {
    if (currentGroup < totalGroups) {
      setCurrentGroup((prev) => prev + 1);
    }
  }, [currentGroup]);
  const handlePrevGroup = useCallback(() => {
    if (currentGroup > 1) {
      setCurrentGroup((prev) => prev - 1);
    }
  }, [currentGroup]);
  const handleSelectedPage = useCallback((e: any) => {
    setCurrentPage(+e.target.value);
    setQueryParam({
      ...queryBuilder.buildQuery(queryParams),
      page: +e.target.value,
    });
  }, []);
  const pagesArray = useMemo(
    () =>
      Array(totalPages)
        .fill(null)
        .map((_, index) => index + 1),
    [totalPages]
  );
  return (
    <div className='flex space-x-4 mt-4 pt-8 justify-center lg:justify-end'>
      <Button
        disabled={
          isFetching ||
          totalPages === 0 ||
          totalGroups <= 1 ||
          currentGroup === 1
        }
        size='icon'
        onClick={setFirstPage}
        className='rounded-full h-14 w-14 bg-light-gray border-light-gray '
      >
        <Icon name='chevrons-left' size={25} className='text-light-gray-600' />
      </Button>
      <Button
        disabled={isFetching || currentGroup <= 1}
        size='icon'
        onClick={handlePrevGroup}
        className='rounded-full h-14 w-14 bg-light-gray border-light-gray '
      >
        <Icon name='chevron-left' size={25} className='text-light-gray-600' />
      </Button>
      {totalPages > 0 &&
        pagesArray.slice(startIndex, endIndex).map((pageNum, index) => (
          <Button
            size='icon'
            paginationLinks={pageNum === currentPage ? "active" : "default"}
            key={pageNum}
            className='text-2xl rounded-full h-14 w-14'
            onClick={handleSelectedPage}
            value={pageNum}
          >
            {pageNum}
          </Button>
        ))}
      <Button
        disabled={isFetching || currentGroup === totalGroups}
        size='icon'
        onClick={handleNextGroup}
        className='rounded-full h-14 w-14 bg-light-gray border-light-gray '
      >
        <Icon name='chevron-right' size={25} className='text-light-gray-600' />
      </Button>
      <Button
        disabled={
          isFetching ||
          totalPages === 0 ||
          totalGroups <= 1 ||
          totalGroups === currentGroup
        }
        size='icon'
        onClick={setLastPage}
        className='rounded-full h-14 w-14 bg-light-gray border-light-gray '
      >
        <Icon name='chevrons-right' size={25} className='text-light-gray-600' />
      </Button>
    </div>
  );
}
