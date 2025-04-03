import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, id = "portal-root" }) => {
  const [container] = useState(() => {
    const element = document.createElement("div");
    element.setAttribute("id", id);
    return element;
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
};

export default Portal;

/*
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, id = "portal-root" }) => {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Crear el elemento contenedor
    const element = document.createElement("div");
    element.setAttribute("id", id);
    containerRef.current = element;

    setIsMounted(true);

    if (containerRef.current) {
      document.body.appendChild(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  // Solo renderizar el portal cuando el componente esté montado
  return isMounted && containerRef.current ? createPortal(children, containerRef.current) : null;
};

export default Portal;
*/

/*
import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children, id = "react-portal-wrapper" }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  function createWrapperAndAppendToBody(id) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", id);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  useLayoutEffect(() => {
    let element = document.getElementById(id);
    if (!element) {
      element = createWrapperAndAppendToBody(id);
    }
    setWrapperElement(element);
  }, [id]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}*/