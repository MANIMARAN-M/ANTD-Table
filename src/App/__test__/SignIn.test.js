import { render, fireEvent, cleanup } from "@testing-library/react";
import SearchBox from "../SearchTest/SearchBox";

afterEach(cleanup);
it("rendered correctly", () => {
  const { queryAllByTestId, queryByPlaceholderText } = render(<SearchBox />);
  expect(queryAllByTestId("search-button")).toBeTruthy();
  expect(queryByPlaceholderText("Search")).toBeTruthy();
});
test("Sample test", () => {
  expect(2 + 2).toBe(4);
});
describe("Input Values", () => {
  it("update on change", () => {
    const { queryByPlaceholderText } = render(<SearchBox />);
    const SearchInput = queryByPlaceholderText("Search");
    fireEvent.change(SearchInput, { target: { value: "test" } });
    expect(SearchInput.value).toBe("test");
  });
});
describe("Search button", () => {
  it("does not trigger requestSearch function", () => {
    const requestSearch = jest.fn();
    const { queryByTestId } = render(
      <SearchBox requestSearch={requestSearch} />
    );
    fireEvent.click(queryByTestId("search-button"));
    expect(requestSearch).not.toHaveBeenCalled();
  });
});
describe("with data inside the query", () => {
  it("with data inside the querys", () => {
    const requestSearch = jest.fn();
    const { queryByTestId, queryByPlaceholderText } = render(
      <SearchBox requestSearch={requestSearch} />
    );
    const SearchInput = queryByPlaceholderText("Search");
    fireEvent.change(SearchInput, { target: { value: "test" } });
    fireEvent.click(queryByTestId("search-button"));
    expect(SearchInput.value).toBe("test");
    // expect(requestSearch).toHaveBeenCalledTimes(1);
  });
});
describe("take a snapshot", () => {
  it("should take a snapshot", () => {
    const { asFragment } = render(<SearchBox />);
    expect(asFragment(<SearchBox />)).toMatchSnapshot();
  });
});
