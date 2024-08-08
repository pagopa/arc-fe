/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [
  { name: 'api', input: './generated/data-contracts.ts', output: './generated/zod-schema.ts' },
  { name: 'checkout', input: './generated/checkout/data-contracts.ts', output: './generated/checkout/zod-schema.ts' }
];
