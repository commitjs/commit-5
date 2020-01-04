export function attribute(target: any, key: string): any {
  const attributes = Reflect.getOwnMetadata('component:attributes', target) || [];
  Reflect.defineMetadata('component:attributes', attributes.concat(key), target);
}
