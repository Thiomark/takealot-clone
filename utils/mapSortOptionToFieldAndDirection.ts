/**
 * Maps a sort option to a sort field and direction.
 * @param {string} sortOption - The sort option (e.g., 'lowToHigh', 'highToLow', 'newStock', 'latest')
 * @returns {Object} - Object containing the sort field and sort direction
 */
export function mapSortOptionToFieldAndDirection(sortOption: string) {
  let sortField, sortDirection;
  switch (sortOption) {
    case "lowToHigh":
      sortField = "price";
      sortDirection = "asc";
      break;
    case "highToLow":
      sortField = "price";
      sortDirection = "desc";
      break;
    case "newStock":
      sortField = "created_at";
      sortDirection = "desc";
      break;
    default:
      sortField = "created_at";
      sortDirection = "desc";
      break;
  }
  return { sortField, sortDirection };
}
