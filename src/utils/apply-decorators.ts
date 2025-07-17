// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyDecorators(target: any, propertyKey: string | symbol, decorators: Array<PropertyDecorator>) {
  decorators.forEach((decorator) => {
    decorator(target, propertyKey);
  });
}
