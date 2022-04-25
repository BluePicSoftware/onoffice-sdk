import OnOfficeAPIClient from "../client";

const api = new OnOfficeAPIClient("TOKEN", "SECRET");

test("basic api call", async () => {
  const res = await api.searchEstate({
    input: "Aachen",
  });
  expect(res).toStrictEqual({
    error: { code: 22, message: "not authenticated" },
    result: null,
  });
});
