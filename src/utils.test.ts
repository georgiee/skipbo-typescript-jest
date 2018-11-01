import { getEnumValuesAndKeys } from "./utils";

test('getEnumValuesAndKeys should export keys and values', () => {
    enum TestEnum { A = 0,B, C}
      
    const {keys, values} = getEnumValuesAndKeys(TestEnum);
    
    expect(keys).toEqual(expect.arrayContaining(["A", "B", "C" ]));
    expect(values).toEqual(expect.arrayContaining([ 0, 1, 2] ));
})