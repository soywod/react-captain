import ts from "@wessberg/rollup-plugin-ts"

import pkg from "./package.json"

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  external: [
    "localforage",
    "lodash/fp/getOr",
    "lodash/fp/invokeMap",
    "lodash/fp/isBoolean",
    "lodash/fp/isNil",
    "lodash/fp/isNumber",
    "lodash/fp/noop",
    "react",
    "uuid",
  ],
  plugins: [ts()],
}
