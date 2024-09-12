export default (
  items: any[],
  ignoreFile: string,
  basePath: string,
): { path: string; name: string; file: boolean; children?: number }[] => {
  const result: { path: string; name: string; file: boolean; children?: number }[] = [];

  function traverse(items: any[]) {
    for (const item of items) {
      // check if the item is ignored

      result.push({
        path: item.path,
        name: item.name,
        file: !item.children,
        children: item.children ? item.children.length : 0,
      });
      if (item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(items);
  return result;
};
