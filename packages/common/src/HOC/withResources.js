// @ts-check
import React, { useState, useEffect } from "react";
import { load } from "loaderjs";

const NAMESPACE = "edulaticV2LoadedResources";
window[NAMESPACE] = {};

/**
 *
 * @param {string|string[]} resources
 */
const handleLoadedResources = resources => {
  const allResources = Array.isArray(resources) ? resources : [resources];
  for (let r of resources) {
    window[NAMESPACE][r] = true;
  }
};

/**
 *
 * @param {string|string[]} resources
 */
const getResourcesNotLoaded = resources => {
  const allResources = Array.isArray(resources) ? resources : [resources];
  return allResources.filter(x => !window[NAMESPACE][x]);
};

/**
 *
 * @param {string|string[]} resources
 * @param {Function=} onLoaded
 */
export const useResources = (resources, onLoaded) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const resourcesToLoad = getResourcesNotLoaded(resources);
    if (resourcesToLoad.length > 0) {
      load(resources).then(() => {
        setLoaded(true);
        handleLoadedResources(resources);
        if (onLoaded) {
          onLoaded();
        }
      });
    } else {
      setLoaded(true);
      if (onLoaded) {
        onLoaded();
      }
    }
  }, []);
  return loaded;
};

export function WithResourcesHOC({ resources, fallBack }) {
  return function resourceLoaded(WrappedComponent) {
    return props => {
      const loaded = useResources(resources);

      if (!loaded) {
        return fallBack;
      }
      return <WrappedComponent {...props} />;
    };
  };
}

export function WithResources({ resources, fallBack, children, onLoaded }) {
  const loaded = useResources(resources, onLoaded);
  if (!loaded) {
    return fallBack;
  }
  return children;
}
