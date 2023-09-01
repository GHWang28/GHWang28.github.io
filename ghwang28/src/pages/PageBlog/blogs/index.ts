import { BlogData } from '../../../types';
import pollingBlog from './polling';
import promiseAllBlog from './promiseAll';
import promisePoolBlog from './promisePool';

const blogs: BlogData[] = [
  pollingBlog,
  promiseAllBlog,
  promisePoolBlog
]

export default blogs;