/*import { library, config } from '@fortawesome/fontawesome-svg-core';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

// Crear un objeto con todos los iconos disponibles
export const allIcons = {
  ...solidIcons,
  ...regularIcons,
  ...brandIcons
};

// Tipo para autocompletado
export type IconName = keyof typeof allIcons;

// Agregar iconos a la librería bajo demanda
export const addIconsToLibrary = (...iconNames: IconName[]) => {
  const iconsToAdd = iconNames
    .map(name => allIcons[name])
    .filter(Boolean);
  
  if (iconsToAdd.length) {
    library.add(...iconsToAdd);
  }
};

// Agregar los iconos más comunes por defecto
addIconsToLibrary(
  'faCheck', 'faTimes', 'faExclamation', 
  'faInfo', 'faLightbulb', 'faDollarSign', 
  'faHeadphones'
);*/