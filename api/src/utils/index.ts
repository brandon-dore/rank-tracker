export const paginationIsValid = (page: number, pageSize: number) => {
  return !(
    isNaN(Number(page)) ||
    isNaN(Number(pageSize)) ||
    Number(page) <= 0 ||
    Number(pageSize) <= 0
  );
};
