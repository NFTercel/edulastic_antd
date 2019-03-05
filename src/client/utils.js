// @ts-check
import React, { useState, useEffect } from "react";
import { load } from "loaderjs";

const getExtension = url => {
  const parts = url.split(".");
  return parts[parts.length - 1];
};

/**
 * cleaning up during unmounting
 * @param {string|string[]} resources
 */
const cleanupResources = resources => {
  const resourcesArray = Array.isArray(resources) ? resources : [resources];
  for (const res of resourcesArray) {
    let entries = null;
    if (getExtension(res) === "js") {
      entries = document.body.querySelectorAll(`script[src="${res}"]`).entries();
    } else if (getExtension(res) === "css") {
      entries = document.head.querySelectorAll(`link[href="${res}"]`).entries();
    }
    if (!entries) {
      continue;
    }
    for (const [, el] of entries) {
      el.remove();
    }
  }
};

/**
 *
 * @param {string|string[]} resources
 */
export const useResources = resources => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    load(resources).then(() => {
      setLoaded(true);
    });
    return () => {
      cleanupResources(resources);
    };
  }, []);
  return loaded;
};

export function WithResources({ resources, fallBack, children }) {
  const loaded = useResources(resources);
  if (!loaded) {
    return fallBack;
  }
  return children;
}

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
