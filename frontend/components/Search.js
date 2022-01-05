import { SearchStyles, DropDown, DropDownItem } from "./styles/DropDown";
import { useCombobox, resetIdCounter } from "downshift";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
const SEARCH_PRODUCT_QUERY = gql`
  query SEARCH_PRODUCT_QUERY($searchTerm: String!) {
    searchTerm: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  resetIdCounter();
  const router = useRouter();
  const [
    findItems,
    { data, loading, error },
  ] = useLazyQuery(SEARCH_PRODUCT_QUERY, { fetchPolicy: "no-cache" });
  const findItemsButChill = debounce(findItems, 300);
  const items = data?.searchTerm || [];
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      console.log("Input Changed");
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "Search",
            placeholder: "search for an item",
            id: "search",
            className: "loading",
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>
            please search for another product, no items found for {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
