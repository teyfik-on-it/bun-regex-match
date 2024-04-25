const input = `
export const useSettingsControllerGetAll = <TData = SettingsControllerGetAllResponse>(variables: SettingsControllerGetAllVariables, options?: Omit<reactQuery.UseQueryOptions<SettingsControllerGetAllResponse, SettingsControllerGetAllError, TData>, "queryKey" | "queryFn" | "initialData">) => { const { fetcherOptions, queryOptions, queryKeyFn } = useAlveWebContext(options); return reactQuery.useQuery<SettingsControllerGetAllResponse, SettingsControllerGetAllError, TData>({
    queryKey: queryKeyFn({ path: "/settings", operationId: "settingsControllerGetAll", variables }),
    queryFn: ({ signal }) => fetchSettingsControllerGetAll({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
}); };
`;

const expectedMatches = [
  'SettingsControllerGetAllResponse',
  'SettingsControllerGetAllVariables',
  'SettingsControllerGetAllResponse',
  'SettingsControllerGetAllError',
  'SettingsControllerGetAllResponse',
  'SettingsControllerGetAllError',
];

const expectedOutput = `
export const useSettingsControllerGetAll = <TData = alveWebComponents.SettingsControllerGetAllResponse>(variables: alveWebComponents.SettingsControllerGetAllVariables, options?: Omit<reactQuery.UseQueryOptions<alveWebComponents.SettingsControllerGetAllResponse, alveWebComponents.SettingsControllerGetAllError, TData>, "queryKey" | "queryFn" | "initialData">) => { const { fetcherOptions, queryOptions, queryKeyFn } = useAlveWebContext(options); return reactQuery.useQuery<alveWebComponents.SettingsControllerGetAllResponse, alveWebComponents.SettingsControllerGetAllError, TData>({
    queryKey: queryKeyFn({ path: "/settings", operationId: "settingsControllerGetAll", variables }),
    queryFn: ({ signal }) => fetchSettingsControllerGetAll({ ...fetcherOptions, ...variables }, signal),
    ...options,
    ...queryOptions
}); };
`;

describe('regex-match', () => {
  const pattern = /(?<=[,:] |TData = |<)(\w+(?:Error|Variables|Response))/g;

  it('should match', () => {
    const matches = input.match(pattern);

    expect(matches).toBeTruthy();
    expect(matches?.sort()).toEqual(expectedMatches.sort());
  });

  it('should match explicit', () => {
    const matches = input.match(pattern);

    expect(matches).toBeTruthy();
    matches?.every((item) => expect(expectedMatches).toContain(item));
  });

  it('should replace', () => {
    expect(input.replace(pattern, 'alveWebComponents.$1')).toBe(expectedOutput);
  });
});
