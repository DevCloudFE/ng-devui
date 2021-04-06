import { cloneDeep, groupBy, map } from 'lodash-es';

export function resolveRoutesConfig(lang, routesConfig) {
  const componentsDataDisplay = [];
  const routesWithData = map(routesConfig, (route) => {
    if (!route.data) {
      route.data = {};
    }
    return route;
  });
  const groupedRoutesObj = groupBy(routesWithData,
    (route) => {
      if (lang === 'en-us') {
        return (route as any).data.enType || 'General';
      }
      return (route as any).data.type || '通用';
    });
  for (const key in groupedRoutesObj) {
    if (key) {
      const group = groupedRoutesObj[key].map((item) => {
        if (item.data.name) {
          if (lang === 'en-us') {
            return {
              title: item.data.name,
              link: item.path,
              enType: item.data.enType || 'General',
              name: item.data.name,
              lowerName: item.data.name.toLocaleLowerCase()
            };
          }
          return {
            title: item.data.name + ' ' + item.data.cnName,
            link: item.path,
            enType: item.data.enType || 'General',
            name: item.data.name,
            lowerName: item.data.name.toLocaleLowerCase()
          };
        } else {
          return {};
        }
      }
      ).filter((item) => Object.keys(item).length !== 0)
        .sort(function (s1, s2) {
          const prev = (s1.title).toUpperCase();
          const next = (s2.title).toUpperCase();
          if (prev < next) {
            return -1;
          }
          if (prev > next) {
            return 1;
          }
          return 0;
        });
      componentsDataDisplay.push({ title: key, children: group, open: true });
    }
  }

  return componentsDataDisplay;
}

export function filterData(event, data) {
  const res = cloneDeep(data).filter(catalog => {
    catalog.children = catalog.children.filter(item => {
      return item.title.toLowerCase().includes(event.toLowerCase());
    });
    return catalog.children.length;
  });
  return res;
}
