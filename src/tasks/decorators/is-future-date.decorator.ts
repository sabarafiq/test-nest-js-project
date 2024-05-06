import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value instanceof Date && value >= today;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be today's date or later`;
        }
      }
    });
  };
}
