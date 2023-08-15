import { BlogData } from '../../../types';
import pollingBlog from './polling';
import pollingAllBlog from './promiseAll';

const blogs: BlogData[] = [
  pollingBlog,
  pollingAllBlog
]

export default blogs;