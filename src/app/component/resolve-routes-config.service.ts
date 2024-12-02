import { cloneDeep, groupBy, map } from 'lodash-es';

export function resolveRoutesConfig(lang, routesConfig) {
  const componentsDataDisplay = [];
  const routesWithData = map(routesConfig, (route) => {
    if (!route.data) {
      route.data = {};
    }
    return route;
  });
  const groupedRoutesObj = groupBy(routesWithData, (route) => {
    if (lang === 'en-us') {
      return (route as any).data.enType || 'General';
    }
    return (route as any).data.type || '通用';
  });
  for (const key in groupedRoutesObj) {
    if (key) {
      let componentsNoDisplay = true;
      const group = groupedRoutesObj[key]
        .map((item) => {
          if (item.data.name) {
            const enType = item.data.enType || 'General';
            const res: any = {
              link: item.path,
              enType: enType,
              name: item.data.name,
              lowerName: item.data.name.replace(/\W/g, '').toLocaleLowerCase(),
              folderName: enType.replace(/\W/g, '-').toLocaleLowerCase(),
              nodisplay: item.data.nodisplay || false,
              banner: item.data.bannerName,
            };
            if (lang === 'en-us') {
              res.title = item.data.name;
            } else {
              res.title = item.data.name + ' ' + item.data.cnName;
            }
            if (!res.nodisplay && componentsNoDisplay) {
              componentsNoDisplay = false;
            }
            return res;
          } else {
            return {};
          }
        })
        .filter((item) => Object.keys(item).length !== 0)
        .sort((s1, s2) => {
          const prev = s1.title.toUpperCase();
          const next = s2.title.toUpperCase();
          if (prev < next) {
            return -1;
          }
          if (prev > next) {
            return 1;
          }
          return 0;
        });
      componentsDataDisplay.push({ title: key, children: group, open: true, nodisplay: componentsNoDisplay });
    }
  }

  return componentsDataDisplay;
}

export function filterData(event, data) {
  const res = cloneDeep(data).filter((catalog) => {
    catalog.children = catalog.children.filter((item) => {
      const result = Array.isArray(event) ? event.includes(item.title.toLowerCase()) : undefined;
      return typeof event === 'string' ? item.title.toLowerCase().includes(event.toLowerCase()) : result;
    });
    return catalog.children.length;
  });
  return res;
}
