import { withMDX } from '@next/mdx';

export default withMDX({
  pageExtensions: ['tsx', 'mdx'],
  // enable `next export`
  output: 'export',
  trailingSlash: false,
});
