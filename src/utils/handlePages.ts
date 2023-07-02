export function handlePages(
  pages: number[],
  currentPage = 1,
  pagesAround = 25
) {
  const start = currentPage - pagesAround > 0 ? currentPage - pagesAround : 0;
  const final = currentPage + pagesAround;

  const lastPage = pages[pages.length - 1];

  const slicedPages = pages
    .slice(start, final)
    .filter((page) => page !== currentPage);

  if (!slicedPages.includes(lastPage))
    slicedPages.push(pages[pages.length - 1]);

  return slicedPages.map((page) => page.toString());
}
