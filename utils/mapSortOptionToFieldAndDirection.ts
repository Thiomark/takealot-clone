export type SortOption = "lowToHigh" | "highToLow" | "newStock";

export function mapSortOptionToFieldAndDirection(sortOption: SortOption) {
  let sortField: string, sortDirection: "asc" | "desc";
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
      // This default case can actually be omitted because sortOption type is now constrained
      sortField = "created_at";
      sortDirection = "desc";
      break;
  }
  return { sortField, sortDirection };
}
